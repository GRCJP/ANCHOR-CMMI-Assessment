const AWS = require('aws-sdk');
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
    const { action, data, assessmentId, userId, agencyId } = JSON.parse(event.body);
    const tableName = process.env.DYNAMODB_TABLE;

    switch (action) {
      case 'getAssessments':
        const assessments = await dynamodb.scan({
          TableName: tableName,
          FilterExpression: 'contains(assessors, :userId) OR type = :type',
          ExpressionAttributeValues: {
            ':userId': userId,
            ':type': 'assessment'
          }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            data: assessments.Items.filter(item => item.type === 'assessment')
          })
        };

      case 'getAssessment':
        if (!assessmentId) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Assessment ID required' })
          };
        }

        const assessment = await dynamodb.get({
          TableName: tableName,
          Key: { id: assessmentId }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            data: assessment.Item
          })
        };

      case 'saveAssessment':
        if (!assessmentId || !data) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Assessment ID and data required' })
          };
        }

        await dynamodb.put({
          TableName: tableName,
          Item: {
            id: assessmentId,
            type: 'assessment',
            ...data,
            lastModified: new Date().toISOString(),
            modifiedBy: userId
          }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ success: true })
        };

      case 'getEvidence':
        if (!assessmentId) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Assessment ID required' })
          };
        }

        const evidence = await dynamodb.scan({
          TableName: tableName,
          FilterExpression: 'assessmentId = :assessmentId AND type = :type',
          ExpressionAttributeValues: {
            ':assessmentId': assessmentId,
            ':type': 'evidence'
          }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            data: evidence.Items
          })
        };

      case 'saveEvidence':
        if (!data) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Evidence data required' })
          };
        }

        const evidenceId = data.id || `evidence_${Date.now()}`;
        
        await dynamodb.put({
          TableName: tableName,
          Item: {
            id: evidenceId,
            type: 'evidence',
            ...data,
            uploaded: new Date().toISOString(),
            uploadedBy: userId
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

      case 'deleteEvidence':
        if (!data.evidenceId) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Evidence ID required' })
          };
        }

        await dynamodb.delete({
          TableName: tableName,
          Key: { id: data.evidenceId }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ success: true })
        };

      case 'getUsers':
        // Only admins can get all users
        const user = await getUserRole(userId, tableName);
        if (user.role !== 'admin') {
          return {
            statusCode: 403,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Admin access required' })
          };
        }

        const users = await dynamodb.scan({
          TableName: tableName,
          FilterExpression: 'type = :type',
          ExpressionAttributeValues: {
            ':type': 'user'
          }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            data: users.Items
          })
        };

      case 'saveUser':
        if (!data) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'User data required' })
          };
        }

        const userIdToSave = data.id || `user_${Date.now()}`;
        
        await dynamodb.put({
          TableName: tableName,
          Item: {
            id: userIdToSave,
            type: 'user',
            ...data,
            created: new Date().toISOString(),
            createdBy: userId
          }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ 
            success: true,
            userId: userIdToSave
          })
        };

      case 'logActivity':
        if (!data) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Activity data required' })
          };
        }

        const activityId = `activity_${Date.now()}`;
        
        await dynamodb.put({
          TableName: tableName,
          Item: {
            id: activityId,
            type: 'activity',
            ...data,
            timestamp: new Date().toISOString()
          }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ success: true })
        };

      default:
        return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ success: false, error: 'Invalid action' })
        };
    }
  } catch (error) {
    console.error('Data lambda error:', error);
    
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Database operation failed'
      })
    };
  }
};

// Helper function to get user role
async function getUserRole(userId, tableName) {
  try {
    const result = await dynamodb.get({
      TableName: tableName,
      Key: { id: userId }
    }).promise();
    
    return result.Item || { role: 'assessor' };
  } catch (error) {
    return { role: 'assessor' };
  }
}
