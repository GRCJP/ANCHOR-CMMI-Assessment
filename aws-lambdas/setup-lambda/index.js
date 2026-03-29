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
    const { action, data } = JSON.parse(event.body);
    const tableName = process.env.DYNAMODB_TABLE;

    switch (action) {
      case 'initializeData':
        // Initialize demo data for the platform
        const initialAssessments = [
          {
            id: 'assessment_mdot',
            type: 'assessment',
            agency: 'Maryland Dept. of Transportation (MDOT)',
            status: 'In Progress',
            assessor: 'J. Williams',
            started: '2026-04-07',
            targetEnd: '2026-05-19',
            maturity: 2.5,
            critical: 4,
            progress: 65,
            complexity: 'High',
            stage: 'Evidence Collection',
            assessors: ['assessor@demo.com']
          },
          {
            id: 'assessment_mdh',
            type: 'assessment',
            agency: 'Maryland Dept. of Health (MDH)',
            status: 'In Progress',
            assessor: 'S. Patel',
            started: '2026-04-14',
            targetEnd: '2026-05-26',
            maturity: 2.8,
            critical: 3,
            progress: 45,
            complexity: 'Medium',
            stage: 'Evidence Collection',
            assessors: ['assessor@demo.com']
          },
          {
            id: 'assessment_msde',
            type: 'assessment',
            agency: 'Maryland Dept. of Education (MSDE)',
            status: 'Complete',
            assessor: 'J. Williams',
            started: '2026-02-03',
            targetEnd: '2026-03-17',
            maturity: 3.1,
            critical: 2,
            progress: 100,
            complexity: 'Medium',
            stage: 'Complete',
            assessors: ['assessor@demo.com']
          },
          {
            id: 'assessment_dpscs',
            type: 'assessment',
            agency: 'Dept. of Public Safety & Corr. Services',
            status: 'In Progress',
            assessor: 'R. Okafor',
            started: '2026-04-21',
            targetEnd: '2026-06-02',
            maturity: 2.3,
            critical: 5,
            progress: 30,
            complexity: 'High',
            stage: 'Evidence Collection',
            assessors: ['assessor@demo.com']
          },
          {
            id: 'assessment_labor',
            type: 'assessment',
            agency: 'Maryland Dept. of Labor',
            status: 'Scheduled',
            assessor: 'T. Adams',
            started: '2026-05-05',
            targetEnd: '2026-06-16',
            maturity: null,
            critical: 0,
            progress: 0,
            complexity: 'Low',
            stage: 'Scheduled',
            assessors: ['assessor@demo.com']
          },
          {
            id: 'assessment_comptroller',
            type: 'assessment',
            agency: 'Office of the Comptroller',
            status: 'Scheduled',
            assessor: 'J. Williams',
            started: '2026-05-12',
            targetEnd: '2026-06-23',
            maturity: null,
            critical: 0,
            progress: 0,
            complexity: 'Low',
            stage: 'Scheduled',
            assessors: ['assessor@demo.com']
          }
        ];

        // Batch write assessments
        const batchWriteParams = {
          RequestItems: {
            [tableName]: initialAssessments.map(assessment => ({
              PutRequest: {
                Item: {
                  ...assessment,
                  created: new Date().toISOString(),
                  lastModified: new Date().toISOString()
                }
              }
            }))
          }
        };

        await dynamodb.batchWrite(batchWriteParams).promise();

        // Create sample evidence data
        const sampleEvidence = [
          {
            id: 'evidence_mdot_1',
            type: 'evidence',
            fileName: 'MDOT_Security_Policy_2026.pdf',
            filePath: 'mdot/MDOT_Security_Policy_2026.pdf',
            fileSize: 1048576,
            uploadedBy: 'assessor@demo.com',
            assessmentId: 'assessment_mdot',
            uploaded: '2026-04-10T10:00:00Z',
            category: 'Policy',
            status: 'Verified'
          },
          {
            id: 'evidence_mdot_2',
            type: 'evidence',
            fileName: 'Network_Diagram_MDOT.pdf',
            filePath: 'mdot/Network_Diagram_MDOT.pdf',
            fileSize: 2097152,
            uploadedBy: 'assessor@demo.com',
            assessmentId: 'assessment_mdot',
            uploaded: '2026-04-12T14:30:00Z',
            category: 'Network',
            status: 'Verified'
          },
          {
            id: 'evidence_mdh_1',
            type: 'evidence',
            fileName: 'MDH_Contingency_Plan.pdf',
            filePath: 'mdh/MDH_Contingency_Plan.pdf',
            fileSize: 1572864,
            uploadedBy: 'assessor@demo.com',
            assessmentId: 'assessment_mdh',
            uploaded: '2026-04-15T09:15:00Z',
            category: 'Policy',
            status: 'Under Review'
          }
        ];

        const evidenceBatchParams = {
          RequestItems: {
            [tableName]: sampleEvidence.map(evidence => ({
              PutRequest: {
                Item: evidence
              }
            }))
          }
        };

        await dynamodb.batchWrite(evidenceBatchParams).promise();

        // Create sample findings
        const sampleFindings = [
          {
            id: 'finding_mdot_1',
            type: 'finding',
            assessmentId: 'assessment_mdot',
            title: 'MFA Not Enforced for Privileged Accounts',
            description: 'Multi-factor authentication is not enforced for administrative and privileged accounts.',
            severity: 'Critical',
            status: 'Open',
            category: 'Access Control',
            recommendation: 'Enable MFA for all privileged accounts immediately.',
            created: '2026-04-08T11:00:00Z',
            createdBy: 'assessor@demo.com'
          },
          {
            id: 'finding_mdot_2',
            type: 'finding',
            assessmentId: 'assessment_mdot',
            title: 'Missing Security Incident Response Plan',
            description: 'No formal security incident response plan has been documented or tested.',
            severity: 'High',
            status: 'Open',
            category: 'Incident Response',
            recommendation: 'Develop and implement a comprehensive incident response plan.',
            created: '2026-04-09T13:45:00Z',
            createdBy: 'assessor@demo.com'
          },
          {
            id: 'finding_mdh_1',
            type: 'finding',
            assessmentId: 'assessment_mdh',
            title: 'Insufficient Network Segmentation',
            description: 'Critical systems are not properly segmented from general network traffic.',
            severity: 'Medium',
            status: 'In Progress',
            category: 'Network Security',
            recommendation: 'Implement network segmentation to isolate critical systems.',
            created: '2026-04-16T10:30:00Z',
            createdBy: 'assessor@demo.com'
          }
        ];

        const findingsBatchParams = {
          RequestItems: {
            [tableName]: sampleFindings.map(finding => ({
              PutRequest: {
                Item: finding
              }
            }))
          }
        };

        await dynamodb.batchWrite(findingsBatchParams).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            message: 'Demo data initialized successfully',
            counts: {
              assessments: initialAssessments.length,
              evidence: sampleEvidence.length,
              findings: sampleFindings.length
            }
          })
        };

      case 'getDashboardData':
        // Get dashboard summary data
        const assessments = await dynamodb.scan({
          TableName: tableName,
          FilterExpression: 'type = :type',
          ExpressionAttributeValues: {
            ':type': 'assessment'
          }
        }).promise();

        const evidence = await dynamodb.scan({
          TableName: tableName,
          FilterExpression: 'type = :type',
          ExpressionAttributeValues: {
            ':type': 'evidence'
          }
        }).promise();

        const findings = await dynamodb.scan({
          TableName: tableName,
          FilterExpression: 'type = :type',
          ExpressionAttributeValues: {
            ':type': 'finding'
          }
        }).promise();

        // Calculate summary statistics
        const summary = {
          totalAssessments: assessments.Items.length,
          inProgressAssessments: assessments.Items.filter(a => a.status === 'In Progress').length,
          completedAssessments: assessments.Items.filter(a => a.status === 'Complete').length,
          totalEvidence: evidence.Items.length,
          criticalFindings: findings.Items.filter(f => f.severity === 'Critical').length,
          highFindings: findings.Items.filter(f => f.severity === 'High').length,
          averageProgress: assessments.Items.reduce((sum, a) => sum + (a.progress || 0), 0) / assessments.Items.length
        };

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            data: {
              summary: summary,
              recentAssessments: assessments.Items.slice(0, 5),
              criticalFindings: findings.Items.filter(f => f.severity === 'Critical'),
              recentEvidence: evidence.Items.slice(0, 10)
            }
          })
        };

      case 'clearData':
        // Clear all demo data (for reset purposes)
        const allItems = await dynamodb.scan({ TableName: tableName }).promise();
        
        if (allItems.Items.length > 0) {
          const deleteParams = {
            RequestItems: {
              [tableName]: allItems.Items.map(item => ({
                DeleteRequest: {
                  Key: { id: item.id }
                }
              }))
            }
          };
          
          await dynamodb.batchWrite(deleteParams).promise();
        }

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            message: `Cleared ${allItems.Items.length} items from database`
          })
        };

      default:
        return {
          statusCode: 400,
          headers: headers,
          body: JSON.stringify({ success: false, error: 'Invalid action' })
        };
    }
  } catch (error) {
    console.error('Setup lambda error:', error);
    
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Setup operation failed'
      })
    };
  }
};
