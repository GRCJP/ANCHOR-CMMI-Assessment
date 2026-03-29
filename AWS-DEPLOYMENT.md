# AWS Deployment Instructions

## Quick Start Guide

### 1. Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 14+ installed

### 2. Setup AWS CLI
```bash
# Install AWS CLI (if not already installed)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure
# Enter your AWS Access Key ID and Secret Access Key
# Set default region: us-east-1
```

### 3. Deploy the Platform
```bash
# Clone the repository
git clone <repository-url>
cd cyberassess-platform

# Install dependencies
npm install

# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

### 4. Manual Setup Steps

#### 4.1 Create IAM Role for Lambda Functions
```bash
# Create IAM role policy document
cat > lambda-trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

# Create IAM role
aws iam create-role \
    --role-name cyberassess-lambda-role \
    --assume-role-policy-document file://lambda-trust-policy.json \
    --description "Role for CyberAssess Lambda functions"

# Attach necessary policies
aws iam attach-role-policy \
    --role-name cyberassess-lambda-role \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Create custom policy for Lambda functions
cat > lambda-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cognito-idp:AdminInitiateAuth",
                "cognito-idp:AdminGetUser",
                "cognito-idp:AdminCreateUser",
                "cognito-idp:AdminSetUserPassword",
                "cognito-idp:CreateUserPool",
                "cognito-idp:CreateUserPoolClient"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:BatchWriteItem"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/cyberassess-data"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::cyberassess-demo",
                "arn:aws:s3:::cyberassess-demo/*",
                "arn:aws:s3:::cyberassess-evidence",
                "arn:aws:s3:::cyberassess-evidence/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendTemplatedEmail"
            ],
            "Resource": "*"
        }
    ]
}
EOF

# Create and attach custom policy
aws iam create-policy \
    --policy-name CyberAssessLambdaPolicy \
    --policy-document file://lambda-policy.json

aws iam attach-role-policy \
    --role-name cyberassess-lambda-role \
    --policy-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/CyberAssessLambdaPolicy
```

#### 4.2 Deploy Lambda Functions
```bash
# Package Lambda functions
npm run package-lambdas

# Deploy each Lambda function
aws lambda create-function \
    --function-name cyberassess-auth \
    --runtime nodejs18.x \
    --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/cyberassess-lambda-role \
    --handler index.handler \
    --zip-file fileb://auth-lambda.zip \
    --environment Variables={USER_POOL_ID=your-user-pool-id,CLIENT_ID=your-client-id}

aws lambda create-function \
    --function-name cyberassess-data \
    --runtime nodejs18.x \
    --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/cyberassess-lambda-role \
    --handler index.handler \
    --zip-file fileb://data-lambda.zip \
    --environment Variables={DYNAMODB_TABLE=cyberassess-data}

aws lambda create-function \
    --function-name cyberassess-upload \
    --runtime nodejs18.x \
    --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/cyberassess-lambda-role \
    --handler index.handler \
    --zip-file fileb://upload-lambda.zip \
    --environment Variables={EVIDENCE_BUCKET=cyberassess-evidence,DYNAMODB_TABLE=cyberassess-data}

aws lambda create-function \
    --function-name cyberassess-email \
    --runtime nodejs18.x \
    --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/cyberassess-lambda-role \
    --handler index.handler \
    --zip-file fileb://email-lambda.zip \
    --environment Variables={EMAIL_FROM=noreply@cyberassess.com}

aws lambda create-function \
    --function-name cyberassess-setup \
    --runtime nodejs18.x \
    --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/cyberassess-lambda-role \
    --handler index.handler \
    --zip-file fileb://setup-lambda.zip \
    --environment Variables={DYNAMODB_TABLE=cyberassess-data}
```

#### 4.3 Setup API Gateway
```bash
# Create REST API
api_id=$(aws apigateway create-rest-api --name CyberAssessAPI --description 'CyberAssess Platform API' --query 'id' --output text)

# Get root resource ID
root_resource_id=$(aws apigateway get-resources --rest-api-id $api_id --query 'items[0].id' --output text)

# Create resources
auth_resource=$(aws apigateway create-resource --rest-api-id $api_id --parent-id $root_resource_id --path-part 'auth' --query 'id' --output text)
data_resource=$(aws apigateway create-resource --rest-api-id $api_id --parent-id $root_resource_id --path-part 'data' --query 'id' --output text)
upload_resource=$(aws apigateway create-resource --rest-api-id $api_id --parent-id $root_resource_id --path-part 'upload' --query 'id' --output text)
email_resource=$(aws apigateway create-resource --rest-api-id $api_id --parent-id $root_resource_id --path-part 'email' --query 'id' --output text)

# Create methods and integrations (simplified - use AWS Console for detailed setup)
echo "API Gateway setup requires manual configuration in AWS Console"
echo "Create POST methods for each resource and integrate with corresponding Lambda functions"
```

#### 4.4 Setup SES (Email)
```bash
# Verify email domain (for production)
aws ses verify-email-identity --email-address noreply@cyberassess.com

# Or verify domain (recommended)
aws ses verify-domain-identity --domain cyberassess.com

# Check verification status
aws ses get-identity-verification-attributes --identities noreply@cyberassess.com
```

#### 4.5 Initialize Demo Data
```bash
# Invoke setup Lambda to initialize demo data
aws lambda invoke \
    --function-name cyberassess-setup \
    --payload '{"action":"initializeData"}' \
    setup-response.json

cat setup-response.json
```

### 5. Frontend Configuration

#### 5.1 Update AWS Configuration
Edit `src/js/aws-config.js` with your actual values:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

#### 5.2 Update API Gateway URL
Edit `src/js/aws-api.js`:
```javascript
constructor() {
  this.apiBase = 'https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod';
  this.auth = new AWSAuth();
}
```

### 6. Access Your Application

#### 6.1 S3 Website URL
```bash
# Get S3 website URL
aws s3 website s3://cyberassess-demo
```

#### 6.2 Test Demo Accounts
- **Admin**: admin@demo.com / Demo123!
- **Assessor**: assessor@demo.com / Demo123!
- **Agency**: agency@demo.com / Demo123!

### 7. Monitoring and Maintenance

#### 7.1 Set Up CloudWatch Alarms
```bash
# Create billing alert
aws cloudwatch put-metric-alarm \
    --alarm-name AWS-Billing-Alert \
    --alarm-description "AWS billing alert" \
    --metric-name EstimatedCharges \
    --namespace AWS/Billing \
    --statistic Maximum \
    --period 21600 \
    --threshold 10 \
    --comparison-operator GreaterThanThreshold \
    --evaluation-periods 1

# Create Lambda error alert
aws cloudwatch put-metric-alarm \
    --alarm-name Lambda-Errors \
    --alarm-description "Lambda function errors" \
    --metric-name Errors \
    --namespace AWS/Lambda \
    --statistic Sum \
    --period 300 \
    --threshold 5 \
    --comparison-operator GreaterThanThreshold \
    --evaluation-periods 1
```

#### 7.2 Cost Monitoring
```bash
# Check current month costs
aws ce get-cost-and-usage \
    --time-period Start=$(date -d 'first day of this month' -I),End=$(date -I) \
    --granularity MONTHLY \
    --metrics BlendedCost \
    --group-by Type=DIMENSION,Key=SERVICE
```

### 8. Troubleshooting

#### 8.1 Common Issues
- **CORS Errors**: Update API Gateway CORS configuration
- **Permission Denied**: Check IAM role permissions
- **Lambda Timeouts**: Increase function timeout to 30 seconds
- **SES Email**: Verify domain/email identity

#### 8.2 Logs and Debugging
```bash
# View Lambda logs
aws logs tail /aws/lambda/cyberassess-auth --follow

# View API Gateway logs
aws logs tail /aws/api-gateway/cyberassess --follow

# Check DynamoDB table
aws dynamodb scan --table-name cyberassess-data --max-items 5
```

### 9. Security Considerations

- Enable VPC endpoints for private connectivity
- Use AWS KMS for encryption at rest
- Enable S3 bucket logging
- Set up CloudTrail for audit logging
- Regular security updates and patches

### 10. Production Readiness

- Set up multi-environment deployment (dev/staging/prod)
- Implement CI/CD pipeline
- Add automated testing
- Set up disaster recovery
- Configure backup strategies

## Support

For issues or questions:
1. Check AWS CloudWatch logs
2. Review IAM permissions
3. Verify resource configurations
4. Consult AWS documentation

## Cost Optimization Tips

- Use Lambda reserved concurrency for predictable costs
- Enable S3 Intelligent-Tiering
- Use DynamoDB on-demand capacity
- Monitor and right-size resources
- Set up billing alerts
