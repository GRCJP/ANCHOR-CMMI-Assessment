const AWS = require('aws-sdk');
const ses = new AWS.SES();

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
    const { to, subject, templateName, templateData, action } = JSON.parse(event.body);

    switch (action) {
      case 'sendEmail':
        if (!to || (!templateName && !subject)) {
          return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Recipient and template/subject required' })
          };
        }

        let params;

        if (templateName) {
          // Send templated email
          params = {
            Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
            Template: templateName,
            TemplateData: JSON.stringify(templateData || {})
          };
          
          await ses.sendTemplatedEmail(params).promise();
        } else {
          // Send regular email
          params = {
            Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
            Message: {
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data: templateData?.html || templateData?.text || ''
                },
                Text: {
                  Charset: 'UTF-8',
                  Data: templateData?.text || ''
                }
              },
              Subject: {
                Charset: 'UTF-8',
                Data: subject
              }
            },
            Source: process.env.EMAIL_FROM || 'noreply@cyberassess.com'
          };
          
          await ses.sendEmail(params).promise();
        }

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ success: true })
        };

      case 'sendAssessmentNotification':
        // Specific notification for assessment events
        const assessmentData = templateData;
        
        const assessmentParams = {
          Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: generateAssessmentEmailHTML(assessmentData)
              },
              Text: {
                Charset: 'UTF-8',
                Data: generateAssessmentEmailText(assessmentData)
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: `Assessment Update: ${assessmentData.agency} - ${assessmentData.status}`
            }
          },
          Source: process.env.EMAIL_FROM || 'noreply@cyberassess.com'
        };
        
        await ses.sendEmail(assessmentParams).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ success: true })
        };

      case 'sendEvidenceRequest':
        // Notification for evidence requests
        const evidenceData = templateData;
        
        const evidenceParams = {
          Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: generateEvidenceRequestHTML(evidenceData)
              },
              Text: {
                Charset: 'UTF-8',
                Data: generateEvidenceRequestText(evidenceData)
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: `Evidence Request: ${evidenceData.agency} Assessment`
            }
          },
          Source: process.env.EMAIL_FROM || 'noreply@cyberassess.com'
        };
        
        await ses.sendEmail(evidenceParams).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ success: true })
        };

      case 'sendReminder':
        // Generic reminder notification
        const reminderData = templateData;
        
        const reminderParams = {
          Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: generateReminderHTML(reminderData)
              },
              Text: {
                Charset: 'UTF-8',
                Data: generateReminderText(reminderData)
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: `Reminder: ${reminderData.title}`
            }
          },
          Source: process.env.EMAIL_FROM || 'noreply@cyberassess.com'
        };
        
        await ses.sendEmail(reminderParams).promise();

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
    console.error('Email lambda error:', error);
    
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Email sending failed'
      })
    };
  }
};

// Helper functions to generate email content
function generateAssessmentEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Assessment Update</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
        .content { margin-bottom: 30px; }
        .status { padding: 10px; border-radius: 4px; text-align: center; font-weight: bold; margin: 20px 0; }
        .status.in-progress { background-color: #fef3c7; color: #92400e; }
        .status.complete { background-color: #d1fae5; color: #065f46; }
        .status.scheduled { background-color: #dbeafe; color: #1e40af; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Anchor Platform</div>
          <h2>Assessment Update</h2>
        </div>
        <div class="content">
          <p>Hello ${data.recipientName},</p>
          <p>There has been an update to the cybersecurity assessment for <strong>${data.agency}</strong>.</p>
          
          <div class="status ${data.status.toLowerCase().replace(' ', '-')}">
            Status: ${data.status}
          </div>
          
          <p><strong>Assessor:</strong> ${data.assessor}</p>
          <p><strong>Started:</strong> ${data.started}</p>
          <p><strong>Target End:</strong> ${data.targetEnd}</p>
          <p><strong>Progress:</strong> ${data.progress}%</p>
          
          <p>You can view the full assessment details by logging into the Anchor platform.</p>
        </div>
        <div class="footer">
          <p>This is an automated message from the Anchor platform.</p>
          <p>If you have questions, please contact your assessment team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAssessmentEmailText(data) {
  return `
Assessment Update - ${data.agency}

Hello ${data.recipientName},

There has been an update to the cybersecurity assessment for ${data.agency}.

Status: ${data.status}
Assessor: ${data.assessor}
Started: ${data.started}
Target End: ${data.targetEnd}
Progress: ${data.progress}%

You can view the full assessment details by logging into the Anchor platform.

This is an automated message from the Anchor platform.
If you have questions, please contact your assessment team.
  `;
}

function generateEvidenceRequestHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Evidence Request</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
        .evidence-list { margin: 20px 0; }
        .evidence-item { padding: 10px; margin: 5px 0; background-color: #f8fafc; border-left: 4px solid #2563eb; }
        .deadline { color: #dc2626; font-weight: bold; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Anchor Platform</div>
          <h2>Evidence Request</h2>
        </div>
        <div class="content">
          <p>Hello ${data.recipientName},</p>
          <p>We are requesting the following evidence items for the <strong>${data.agency}</strong> cybersecurity assessment.</p>
          
          <div class="evidence-list">
            ${data.evidenceItems.map(item => `
              <div class="evidence-item">
                <strong>${item.name}</strong><br>
                ${item.description}
              </div>
            `).join('')}
          </div>
          
          <p class="deadline">Please submit these items by: <strong>${data.deadline}</strong></p>
          
          <p>You can upload evidence through the Anchor platform or contact your assessor directly.</p>
        </div>
        <div class="footer">
          <p>This is an automated message from the Anchor platform.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateEvidenceRequestText(data) {
  return `
Evidence Request - ${data.agency}

Hello ${data.recipientName},

We are requesting the following evidence items for the ${data.agency} cybersecurity assessment.

${data.evidenceItems.map(item => `
- ${item.name}: ${item.description}
`).join('')}

Please submit these items by: ${data.deadline}

You can upload evidence through the Anchor platform or contact your assessor directly.

This is an automated message from the Anchor platform.
  `;
}

function generateReminderHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Reminder</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
        .reminder-box { padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Anchor Platform</div>
          <h2>Reminder</h2>
        </div>
        <div class="content">
          <p>Hello ${data.recipientName},</p>
          
          <div class="reminder-box">
            <h3>${data.title}</h3>
            <p>${data.message}</p>
          </div>
          
          <p>${data.actionText || 'Please take the necessary action at your earliest convenience.'}</p>
        </div>
        <div class="footer">
          <p>This is an automated message from the Anchor platform.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateReminderText(data) {
  return `
Reminder: ${data.title}

Hello ${data.recipientName},

${data.title}

${data.message}

${data.actionText || 'Please take the necessary action at your earliest convenience.'}

This is an automated message from the Anchor platform.
  `;
}
