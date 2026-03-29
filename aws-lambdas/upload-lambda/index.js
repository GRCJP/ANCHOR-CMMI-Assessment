const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: ''
    };
  }

  try {
    const { fileName, fileType, fileSize, assessmentId, userId, fileData, action } = JSON.parse(event.body);
    const evidenceBucket = process.env.EVIDENCE_BUCKET;
    const tableName = process.env.DYNAMODB_TABLE;

    if (action === 'getPresignedUrl') {
      // Generate presigned URL for direct upload
      const uniqueFileName = `${assessmentId}/${Date.now()}-${fileName}`;
      
      const params = {
        Bucket: evidenceBucket,
        Key: uniqueFileName,
        Expires: 300, // 5 minutes
        ContentType: fileType,
        Metadata: {
          uploadedBy: userId,
          assessmentId: assessmentId,
          originalName: fileName
        }
      };

      const uploadUrl = s3.getSignedUrl('putObject', params);

      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          success: true,
          uploadUrl: uploadUrl,
          fileName: uniqueFileName
        })
      };
    }

    if (action === 'confirmUpload') {
      // Called after successful upload to save metadata
      if (!fileName || !assessmentId) {
        return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ success: false, error: 'File name and assessment ID required' })
        };
      }

      // Save metadata to DynamoDB
      const evidenceId = `evidence_${Date.now()}`;
      
      await dynamodb.put({
        TableName: tableName,
        Item: {
          id: evidenceId,
          type: 'evidence',
          fileName: fileName,
          filePath: fileName,
          fileSize: fileSize,
          uploadedBy: userId,
          assessmentId: assessmentId,
          uploaded: new Date().toISOString()
        }
      }).promise();

      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          success: true,
          evidenceId: evidenceId
        })
      };
    }

    // Legacy direct upload method (for smaller files)
    if (fileData) {
      // Validate file size (2MB limit)
      if (fileSize > 2 * 1024 * 1024) {
        return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ error: 'File size exceeds 2MB limit' })
        };
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];

      if (!allowedTypes.includes(fileType)) {
        return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ error: 'File type not allowed' })
        };
      }

      // Generate unique file name
      const uniqueFileName = `${assessmentId}/${Date.now()}-${fileName}`;

      // Upload to S3
      const uploadResult = await s3.putObject({
        Bucket: evidenceBucket,
        Key: uniqueFileName,
        Body: Buffer.from(fileData, 'base64'),
        ContentType: fileType,
        Metadata: {
          uploadedBy: userId,
          assessmentId: assessmentId,
          originalName: fileName
        }
      }).promise();

      // Save metadata to DynamoDB
      const evidenceId = `evidence_${Date.now()}`;
      
      await dynamodb.put({
        TableName: tableName,
        Item: {
          id: evidenceId,
          type: 'evidence',
          fileName: fileName,
          filePath: uniqueFileName,
          fileSize: fileSize,
          uploadedBy: userId,
          assessmentId: assessmentId,
          uploaded: new Date().toISOString(),
          s3VersionId: uploadResult.VersionId
        }
      }).promise();

      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          success: true,
          fileName: fileName,
          filePath: uniqueFileName,
          evidenceId: evidenceId
        })
      };
    }

    if (action === 'delete') {
      // Delete file from S3 and metadata from DynamoDB
      if (!fileName) {
        return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ success: false, error: 'File name required' })
        };
      }

      // Delete from S3
      await s3.deleteObject({
        Bucket: evidenceBucket,
        Key: fileName
      }).promise();

      // Find and delete from DynamoDB
      const evidence = await dynamodb.scan({
        TableName: tableName,
        FilterExpression: 'filePath = :filePath AND type = :type',
        ExpressionAttributeValues: {
          ':filePath': fileName,
          ':type': 'evidence'
        }
      }).promise();

      if (evidence.Items.length > 0) {
        await dynamodb.delete({
          TableName: tableName,
          Key: { id: evidence.Items[0].id }
        }).promise();
      }

      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({ success: true })
      };
    }

    if (action === 'getDownloadUrl') {
      // Generate presigned URL for download
      if (!fileName) {
        return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ success: false, error: 'File name required' })
        };
      }

      const params = {
        Bucket: evidenceBucket,
        Key: fileName,
        Expires: 300 // 5 minutes
      };

      const downloadUrl = s3.getSignedUrl('getObject', params);

      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          success: true,
          downloadUrl: downloadUrl
        })
      };
    }

    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({ success: false, error: 'Invalid action' })
    };

  } catch (error) {
    console.error('Upload lambda error:', error);
    
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'File operation failed'
      })
    };
  }
};
