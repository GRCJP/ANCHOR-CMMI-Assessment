const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

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
    const { action, email, password, token } = JSON.parse(event.body);
    const userPoolId = process.env.USER_POOL_ID;
    const clientId = process.env.CLIENT_ID;

    switch (action) {
      case 'login':
        const loginResult = await cognitoidentityserviceprovider.adminInitiateAuth({
          UserPoolId: userPoolId,
          ClientId: clientId,
          AuthFlow: 'ADMIN_NO_SRP_AUTH',
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password
          }
        }).promise();

        // Get user details to include role
        const user = await cognitoidentityserviceprovider.adminGetUser({
          UserPoolId: userPoolId,
          Username: email
        }).promise();

        const customAttributes = {};
        user.UserAttributes.forEach(attr => {
          if (attr.Name.startsWith('custom:')) {
            customAttributes[attr.Name] = attr.Value;
          }
        });

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            token: loginResult.AuthenticationResult.IdToken,
            refreshToken: loginResult.AuthenticationResult.RefreshToken,
            user: {
              email: email,
              name: user.UserAttributes.find(attr => attr.Name === 'name')?.Value || email,
              role: customAttributes['custom:role'] || 'assessor',
              userId: user.Username
            }
          })
        };

      case 'validate':
        if (!token) {
          return {
            statusCode: 401,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Token required' })
          };
        }

        // For demo purposes, we'll decode the JWT token
        // In production, you'd validate the token properly
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          return {
            statusCode: 401,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Invalid token format' })
          };
        }

        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
        
        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            valid: true,
            user: {
              email: payload.email,
              name: payload.name,
              role: payload['custom:role'] || 'assessor',
              userId: payload.sub
            }
          })
        };

      case 'refresh':
        if (!token) {
          return {
            statusCode: 401,
            headers: headers,
            body: JSON.stringify({ success: false, error: 'Refresh token required' })
          };
        }

        const refreshResult = await cognitoidentityserviceprovider.adminInitiateAuth({
          UserPoolId: userPoolId,
          ClientId: clientId,
          AuthFlow: 'REFRESH_TOKEN_AUTH',
          AuthParameters: {
            REFRESH_TOKEN: token
          }
        }).promise();

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({
            success: true,
            token: refreshResult.AuthenticationResult.IdToken
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
    console.error('Auth lambda error:', error);
    
    return {
      statusCode: 401,
      headers: headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Authentication failed'
      })
    };
  }
};
