#!/bin/bash

# Integrated CyberAssess Deployment for Existing AWS Portfolio
# This script integrates CyberAssess into your existing AWS account with minimal new resources

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get existing AWS configuration
AWS_REGION=$(aws configure get region || echo "us-east-1")
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Resource names with account prefix for uniqueness
PROJECT_NAME="cyberassess"
S3_BUCKET="${PROJECT_NAME}-${ACCOUNT_ID}"
EVIDENCE_BUCKET="${PROJECT_NAME}-evidence-${ACCOUNT_ID}"
DYNAMODB_TABLE="${PROJECT_NAME}-data"
COGNITO_USER_POOL="${PROJECT_NAME}-users-${ACCOUNT_ID}"
API_GATEWAY_NAME="${PROJECT_NAME}-api"

echo -e "${BLUE}🚀 Integrating CyberAssess into existing AWS account: ${ACCOUNT_ID}${NC}"
echo -e "${BLUE}📍 Region: ${AWS_REGION}${NC}"
echo -e "${BLUE}💰 Estimated additional cost: $0-5/month (free tier optimized)${NC}"

# Check AWS CLI is configured
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
                --index-document login.html \
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
        echo "S3_BUCKET=$S3_BUCKET" >> .aws-config
        echo "EVIDENCE_BUCKET=$EVIDENCE_BUCKET" >> .aws-config
        echo "DYNAMODB_TABLE=$DYNAMODB_TABLE" >> .aws-config
        
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
        
        # Create user (ignore if exists)
        aws cognito-idp admin-create-user \
            --user-pool-id $USER_POOL_ID \
            --username $email \
            --user-attributes Name=email,Value=$email Name=name,Value="$name" Name=custom:role,Value=$role \
            --temporary-password Demo123! \
            --message-action SUPPRESS \
            --region $AWS_REGION 2>/dev/null || echo "User already exists"
        
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

# Function to find or create Lambda execution role
get_lambda_role() {
    # Try to find existing Lambda execution role
    local existing_role=$(aws iam list-roles --query 'Roles[?contains(RoleName, `Lambda`) && contains(RoleName, `Execution`)].Arn' --output text | head -1)
    
    if [ -n "$existing_role" ]; then
        echo $existing_role
        return
    fi
    
    # Try to find any Lambda role
    existing_role=$(aws iam list-roles --query 'Roles[?contains(RoleName, `Lambda`)].Arn' --output text | head -1)
    
    if [ -n "$existing_role" ]; then
        echo $existing_role
        return
    fi
    
    # Create minimal Lambda role
    echo -e "${YELLOW}⚠️  No Lambda role found. Creating minimal role...${NC}"
    
    # Create trust policy
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
    
    # Create role
    local role_name="cyberassess-lambda-execution-${ACCOUNT_ID}"
    aws iam create-role \
        --role-name $role_name \
        --assume-role-policy-document file://lambda-trust-policy.json \
        --description "Minimal role for CyberAssess Lambda functions" \
        --region $AWS_REGION
    
    # Attach basic execution policy
    aws iam attach-role-policy \
        --role-name $role_name \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    # Wait for role to be ready
    echo -e "${BLUE}Waiting for IAM role to be ready...${NC}"
    sleep 10
    
    # Get role ARN
    local role_arn=$(aws iam get-role --role-name $role_name --query 'Role.Arn' --output text)
    echo $role_arn
    
    rm lambda-trust-policy.json
}

# Function to deploy Lambda functions
deploy_lambda_functions() {
    echo -e "${YELLOW}⚡ Deploying Lambda functions${NC}"
    
    # Get Lambda execution role
    local lambda_role=$(get_lambda_role)
    echo -e "${BLUE}Using Lambda role: ${lambda_role}${NC}"
    
    # Load configuration
    if [ -f .aws-config ]; then
        source .aws-config
    else
        echo -e "${RED}❌ AWS configuration not found.${NC}"
        exit 1
    fi
    
    # Create deployment packages
    echo -e "${BLUE}Creating Lambda deployment packages...${NC}"
    npm run package-lambdas
    
    # Deploy functions
    functions=("auth" "data" "upload" "email" "setup")
    
    for func in "${functions[@]}"; do
        echo -e "${BLUE}Deploying: ${func}${NC}"
        
        local function_name="cyberassess-${func}"
        local zip_file="${func}-lambda.zip"
        
        # Check if function exists
        if aws lambda get-function --function-name $function_name &> /dev/null; then
            # Update existing function
            aws lambda update-function-code \
                --function-name $function_name \
                --zip-file fileb://$zip_file \
                --region $AWS_REGION
            
            # Update environment variables
            case $func in
                "auth")
                    aws lambda update-function-configuration \
                        --function-name $function_name \
                        --environment Variables="{USER_POOL_ID=$USER_POOL_ID,CLIENT_ID=$CLIENT_ID}" \
                        --region $AWS_REGION
                    ;;
                "data"|"upload"|"setup")
                    aws lambda update-function-configuration \
                        --function-name $function_name \
                        --environment Variables="{DYNAMODB_TABLE=$DYNAMODB_TABLE}" \
                        --region $AWS_REGION
                    ;;
                "upload")
                    aws lambda update-function-configuration \
                        --function-name $function_name \
                        --environment Variables="{DYNAMODB_TABLE=$DYNAMODB_TABLE,EVIDENCE_BUCKET=$EVIDENCE_BUCKET}" \
                        --region $AWS_REGION
                    ;;
                "email")
                    aws lambda update-function-configuration \
                        --function-name $function_name \
                        --environment Variables="{EMAIL_FROM=noreply@cyberassess.com}" \
                        --region $AWS_REGION
                    ;;
            esac
        else
            # Create new function
            local env_vars="{}"
            
            case $func in
                "auth")
                    env_vars="{USER_POOL_ID=$USER_POOL_ID,CLIENT_ID=$CLIENT_ID}"
                    ;;
                "data"|"upload"|"setup")
                    env_vars="{DYNAMODB_TABLE=$DYNAMODB_TABLE}"
                    ;;
                "upload")
                    env_vars="{DYNAMODB_TABLE=$DYNAMODB_TABLE,EVIDENCE_BUCKET=$EVIDENCE_BUCKET}"
                    ;;
                "email")
                    env_vars="{EMAIL_FROM=noreply@cyberassess.com}"
                    ;;
            esac
            
            aws lambda create-function \
                --function-name $function_name \
                --runtime nodejs18.x \
                --role $lambda_role \
                --handler index.handler \
                --zip-file fileb://$zip_file \
                --environment Variables=$env_vars \
                --timeout 30 \
                --region $AWS_REGION
        fi
        
        # Cleanup
        rm $zip_file
        
        echo -e "${GREEN}✅ Function deployed: ${func}${NC}"
    done
}

# Function to deploy frontend to S3
deploy_frontend() {
    echo -e "${YELLOW}🌐 Deploying frontend to S3${NC}"
    
    # Sync all files to S3
    echo -e "${BLUE}Syncing files to S3...${NC}"
    
    aws s3 sync . s3://$S3_BUCKET \
        --exclude "aws-lambdas/*" \
        --exclude ".git/*" \
        --exclude "node_modules/*" \
        --exclude "*.md" \
        --exclude ".aws-config" \
        --exclude "*.zip" \
        --exclude "deploy*.sh" \
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

# Function to initialize demo data
initialize_demo_data() {
    echo -e "${YELLOW}🎯 Initializing demo data${NC}"
    
    # Invoke setup Lambda to initialize demo data
    aws lambda invoke \
        --function-name cyberassess-setup \
        --payload '{"action":"initializeData"}' \
        setup-response.json
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Demo data initialized successfully${NC}"
        cat setup-response.json | jq .
    else
        echo -e "${YELLOW}⚠️  Demo data initialization may have failed. Check Lambda logs.${NC}"
    fi
    
    rm -f setup-response.json
}

# Function to display access information
show_access_info() {
    echo -e "${GREEN}🎉 Integration completed successfully!${NC}"
    echo -e "${BLUE}📱 Your CyberAssess platform is available at:${NC}"
    echo -e "${YELLOW}   http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com/login.html${NC}"
    echo ""
    echo -e "${BLUE}👤 Demo accounts:${NC}"
    echo -e "${YELLOW}   Administrator: admin@demo.com / Demo123!${NC}"
    echo -e "${YELLOW}   Assessor:      assessor@demo.com / Demo123!${NC}"
    echo -e "${YELLOW}   Agency Rep:    agency@demo.com / Demo123!${NC}"
    echo ""
    echo -e "${BLUE}📊 AWS Resources Created:${NC}"
    echo -e "${YELLOW}   • S3 Bucket: ${S3_BUCKET}${NC}"
    echo -e "${YELLOW}   • Evidence Bucket: ${EVIDENCE_BUCKET}${NC}"
    echo -e "${YELLOW}   • DynamoDB Table: ${DYNAMODB_TABLE}${NC}"
    echo -e "${YELLOW}   • Cognito User Pool: ${COGNITO_USER_POOL}${NC}"
    echo -e "${YELLOW}   • 5 Lambda Functions${NC}"
    echo ""
    echo -e "${BLUE}💰 Cost Impact:${NC}"
    echo -e "${YELLOW}   • Additional monthly cost: $0-5 (free tier optimized)${NC}"
    echo -e "${YELLOW}   • Consolidated with your existing AWS billing${NC}"
    echo ""
    echo -e "${BLUE}🔧 Next Steps:${NC}"
    echo -e "${YELLOW}   1. Test the demo accounts above${NC}"
    echo -e "${YELLOW}   2. Optionally configure API Gateway endpoints${NC}"
    echo -e "${YELLOW}   3. Optionally set up custom domain${NC}"
    echo -e "${YELLOW}   4. Add CloudWatch monitoring to existing dashboards${NC}"
}

# Main deployment flow
main() {
    echo -e "${BLUE}🔧 Starting integrated deployment into existing AWS portfolio...${NC}"
    
    # Create S3 buckets
    create_s3_bucket $S3_BUCKET "website"
    create_s3_bucket $EVIDENCE_BUCKET "storage"
    
    # Create DynamoDB table
    create_dynamodb_table
    
    # Create Cognito User Pool
    create_cognito_user_pool
    
    # Create demo users
    create_demo_users
    
    # Deploy Lambda functions
    deploy_lambda_functions
    
    # Deploy frontend
    deploy_frontend
    
    # Initialize demo data
    initialize_demo_data
    
    # Show access information
    show_access_info
}

# Handle command line arguments
case "${1:-}" in
    "buckets-only")
        create_s3_bucket $S3_BUCKET "website"
        create_s3_bucket $EVIDENCE_BUCKET "storage"
        ;;
    "frontend-only")
        deploy_frontend
        ;;
    "lambda-only")
        deploy_lambda_functions
        ;;
    "demo-only")
        create_demo_users
        initialize_demo_data
        ;;
    *)
        main
        ;;
esac
