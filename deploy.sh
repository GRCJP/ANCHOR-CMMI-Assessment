#!/bin/bash

# AWS Deployment Script for CyberAssess Platform
# This script deploys the entire application to AWS infrastructure

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION=${AWS_REGION:-"us-east-1"}
PROJECT_NAME="cyberassess"
S3_BUCKET="${PROJECT_NAME}-demo"
EVIDENCE_BUCKET="${PROJECT_NAME}-evidence"
API_GATEWAY_NAME="${PROJECT_NAME}-api"
DYNAMODB_TABLE="${PROJECT_NAME}-data"
COGNITO_USER_POOL="${PROJECT_NAME}-users"

echo -e "${BLUE}🚀 Starting AWS deployment for CyberAssess Platform${NC}"

# Check AWS CLI is installed and configured
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Please install AWS CLI first.${NC}"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI configured successfully${NC}"

# Function to create S3 bucket if it doesn't exist
create_s3_bucket() {
    local bucket_name=$1
    local bucket_type=$2
    
    echo -e "${YELLOW}📦 Creating S3 bucket: ${bucket_name}${NC}"
    
    if aws s3 ls s3://$bucket_name 2>&1 | grep -q "NoSuchBucket"; then
        aws s3 mb s3://$bucket_name --region $AWS_REGION
        
        if [ "$bucket_type" = "website" ]; then
            # Configure for static website hosting
            aws s3 website s3://$bucket_name \
                --index-document index.html \
                --error-document error.html
            
            # Set bucket policy for public read access
            cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${bucket_name}/*"
        }
    ]
}
EOF
            
            aws s3api put-bucket-policy \
                --bucket $bucket_name \
                --policy file://bucket-policy.json
            
            rm bucket-policy.json
        fi
        
        echo -e "${GREEN}✅ Bucket created: ${bucket_name}${NC}"
    else
        echo -e "${YELLOW}⚠️  Bucket already exists: ${bucket_name}${NC}"
    fi
}

# Function to create DynamoDB table
create_dynamodb_table() {
    echo -e "${YELLOW}🗄️  Creating DynamoDB table: ${DYNAMODB_TABLE}${NC}"
    
    if aws dynamodb describe-table --table-name $DYNAMODB_TABLE &> /dev/null; then
        echo -e "${YELLOW}⚠️  DynamoDB table already exists: ${DYNAMODB_TABLE}${NC}"
    else
        aws dynamodb create-table \
            --table-name $DYNAMODB_TABLE \
            --attribute-definitions AttributeName=id,AttributeType=S \
            --key-schema AttributeName=id,KeyType=HASH \
            --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
            --region $AWS_REGION
        
        echo -e "${GREEN}✅ DynamoDB table created: ${DYNAMODB_TABLE}${NC}"
    fi
}

# Function to create Cognito User Pool
create_cognito_user_pool() {
    echo -e "${YELLOW}👥 Creating Cognito User Pool: ${COGNITO_USER_POOL}${NC}"
    
    # Check if user pool already exists
    if aws cognito-idp describe-user-pool --user-pool-id $COGNITO_USER_POOL &> /dev/null; then
        echo -e "${YELLOW}⚠️  Cognito User Pool already exists: ${COGNITO_USER_POOL}${NC}"
    else
        # Create user pool
        user_pool_id=$(aws cognito-idp create-user-pool \
            --pool-name $COGNITO_USER_POOL \
            --auto-verified-attributes email \
            --username-attributes email \
            --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=true,RequireLowercase=true,RequireNumbers=true,TemporaryPasswordValidityDays=7}" \
            --schema "Name=email,AttributeDataType=String,Required=true" \
            --schema "Name=name,AttributeDataType=String,Required=true" \
            --schema "Name=custom:role,AttributeDataType=String,Required=false" \
            --region $AWS_REGION \
            --query 'UserPool.Id' \
            --output text)
        
        echo -e "${GREEN}✅ Cognito User Pool created: ${user_pool_id}${NC}"
        
        # Create user pool client
        client_id=$(aws cognito-idp create-user-pool-client \
            --user-pool-id $user_pool_id \
            --client-name ${PROJECT_NAME}-web \
            --generate-secret \
            --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH \
            --token-validity AccessToken=1 IdToken=1 RefreshToken=30 \
            --region $AWS_REGION \
            --query 'UserPoolClient.ClientId' \
            --output text)
        
        echo -e "${GREEN}✅ Cognito User Pool Client created: ${client_id}${NC}"
        
        # Save configuration for later use
        echo "USER_POOL_ID=$user_pool_id" > .aws-config
        echo "CLIENT_ID=$client_id" >> .aws-config
        echo "REGION=$AWS_REGION" >> .aws-config
        
        echo -e "${GREEN}✅ Configuration saved to .aws-config${NC}"
    fi
}

# Function to create demo users
create_demo_users() {
    echo -e "${YELLOW}👤 Creating demo users${NC}"
    
    # Load configuration
    if [ -f .aws-config ]; then
        source .aws-config
    else
        echo -e "${RED}❌ AWS configuration not found. Please run user pool creation first.${NC}"
        exit 1
    fi
    
    # Demo users
    declare -A demo_users=(
        ["admin@demo.com"]="Demo Administrator|admin"
        ["assessor@demo.com"]="J. Williams|assessor"
        ["agency@demo.com"]="Lisa Harmon|agency_rep"
    )
    
    for email in "${!demo_users[@]}"; do
        IFS='|' read -r name role <<< "${demo_users[$email]}"
        
        echo -e "${BLUE}Creating user: ${email} (${role})${NC}"
        
        # Create user
        aws cognito-idp admin-create-user \
            --user-pool-id $USER_POOL_ID \
            --username $email \
            --user-attributes Name=email,Value=$email Name=name,Value="$name" Name=custom:role,Value=$role \
            --temporary-password Demo123! \
            --message-action SUPPRESS \
            --region $AWS_REGION
        
        # Set permanent password
        aws cognito-idp admin-set-user-password \
            --user-pool-id $USER_POOL_ID \
            --username $email \
            --password Demo123! \
            --permanent \
            --region $AWS_REGION
        
        echo -e "${GREEN}✅ User created: ${email}${NC}"
    done
}

# Function to deploy Lambda functions
deploy_lambda_functions() {
    echo -e "${YELLOW}⚡ Deploying Lambda functions${NC}"
    
    # Create Lambda functions
    functions=("auth-lambda" "data-lambda" "upload-lambda" "email-lambda")
    
    for func in "${functions[@]}"; do
        echo -e "${BLUE}Deploying: ${func}${NC}"
        
        # Create deployment package
        cd "aws-lambdas/${func}"
        zip -r "../../${func}.zip" .
        cd ../..
        
        # Check if function exists
        if aws lambda get-function --function-name "${PROJECT_NAME}-${func}" &> /dev/null; then
            # Update existing function
            aws lambda update-function-code \
                --function-name "${PROJECT_NAME}-${func}" \
                --zip-file fileb://${func}.zip \
                --region $AWS_REGION
        else
            # Create new function
            aws lambda create-function \
                --function-name "${PROJECT_NAME}-${func}" \
                --runtime nodejs18.x \
                --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/${PROJECT_NAME}-lambda-role \
                --handler index.handler \
                --zip-file fileb://${func}.zip \
                --region $AWS_REGION
        fi
        
        # Cleanup
        rm ${func}.zip
        
        echo -e "${GREEN}✅ Function deployed: ${func}${NC}"
    done
}

# Function to deploy frontend to S3
deploy_frontend() {
    echo -e "${YELLOW}🌐 Deploying frontend to S3${NC}"
    
    # Build frontend (if needed)
    echo -e "${BLUE}Syncing files to S3...${NC}"
    
    # Sync all files to S3
    aws s3 sync . s3://$S3_BUCKET \
        --exclude "aws-lambdas/*" \
        --exclude ".git/*" \
        --exclude "node_modules/*" \
        --exclude "*.md" \
        --exclude ".aws-config" \
        --exclude "*.zip" \
        --content-type "text/html" \
        --exclude "*" \
        --include "*.html" \
        --include "*.css" \
        --include "*.js" \
        --include "*.json" \
        --include "*.png" \
        --include "*.jpg" \
        --include "*.svg" \
        --include "*.ico"
    
    # Set correct content types
    aws s3 sync s3://$S3_BUCKET s3://$S3_BUCKET \
        --content-type "text/css" \
        --exclude "*" \
        --include "*.css"
    
    aws s3 sync s3://$S3_BUCKET s3://$S3_BUCKET \
        --content-type "application/javascript" \
        --exclude "*" \
        --include "*.js"
    
    echo -e "${GREEN}✅ Frontend deployed to S3${NC}"
}

# Function to setup API Gateway
setup_api_gateway() {
    echo -e "${YELLOW}🌐 Setting up API Gateway${NC}"
    
    # This is a simplified version - in production, you'd use CloudFormation or AWS CDK
    echo -e "${BLUE}API Gateway setup requires manual configuration in AWS Console${NC}"
    echo -e "${YELLOW}Please configure API Gateway with the following Lambda functions:${NC}"
    
    functions=("auth-lambda" "data-lambda" "upload-lambda" "email-lambda")
    for func in "${functions[@]}"; do
        echo -e "  - ${PROJECT_NAME}-${func}"
    done
}

# Function to setup SES
setup_ses() {
    echo -e "${YELLOW}📧 Setting up SES${NC}"
    
    # Verify email address for sending
    echo -e "${BLUE}Please verify an email address in SES for sending notifications${NC}"
    echo -e "${YELLOW}In AWS Console > SES > Verified identities, verify: noreply@cyberassess.com${NC}"
}

# Main deployment flow
main() {
    echo -e "${BLUE}🔧 Starting deployment process...${NC}"
    
    # Create S3 buckets
    create_s3_bucket $S3_BUCKET "website"
    create_s3_bucket $EVIDENCE_BUCKET "storage"
    
    # Create DynamoDB table
    create_dynamodb_table
    
    # Create Cognito User Pool
    create_cognito_user_pool
    
    # Create demo users
    create_demo_users
    
    # Deploy Lambda functions (requires IAM role setup first)
    echo -e "${YELLOW}⚠️  Lambda deployment requires IAM role setup first${NC}"
    echo -e "${BLUE}Please create an IAM role 'cyberassess-lambda-role' with appropriate permissions${NC}"
    
    # Deploy frontend
    deploy_frontend
    
    # Setup API Gateway
    setup_api_gateway
    
    # Setup SES
    setup_ses
    
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}📱 Your application is available at: http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com${NC}"
    echo -e "${YELLOW}⚠️  Remember to:${NC}"
    echo -e "  1. Configure API Gateway endpoints"
    echo -e "  2. Set up SES email verification"
    echo -e "  3. Create IAM role for Lambda functions"
    echo -e "  4. Update environment variables in Lambda functions"
}

# Run deployment
main "$@"
