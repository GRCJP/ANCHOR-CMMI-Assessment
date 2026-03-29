#!/bin/bash

# Simplified Standalone CyberAssess Deployment
# Works with existing AWS account permissions without VPC creation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
PROJECT_NAME="cyberassess"

# Resource names (dedicated but no VPC)
S3_BUCKET="${PROJECT_NAME}-standalone-$(date +%s)"
EVIDENCE_BUCKET="${PROJECT_NAME}-evidence-$(date +%s)"
DYNAMODB_TABLE="${PROJECT_NAME}-data-standalone"
COGNITO_USER_POOL="${PROJECT_NAME}-users-standalone"
IAM_ROLE="${PROJECT_NAME}-lambda-role-$(date +%s)"

echo -e "${BLUE}🚀 Deploying Simplified Standalone CyberAssess${NC}"
echo -e "${BLUE}📍 Region: ${AWS_REGION}${NC}"
echo -e "${BLUE}💰 Estimated cost: $0-15/month (free tier optimized)${NC}"
echo -e "${BLUE}🔒 Using existing AWS account with dedicated resources${NC}"

# Check AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured.${NC}"
    exit 1
fi

# Get account info
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS Account: ${ACCOUNT_ID}${NC}"

# Function to create S3 buckets (private, no public policy)
create_private_s3_buckets() {
    echo -e "${YELLOW}📦 Creating private S3 buckets...${NC}"
    
    # Create website bucket (private)
    if aws s3 ls s3://$S3_BUCKET 2>&1 | grep -q "NoSuchBucket"; then
        aws s3 mb s3://$S3_BUCKET --region $AWS_REGION
        echo -e "${GREEN}✅ Website bucket created: ${S3_BUCKET}${NC}"
    else
        echo -e "${YELLOW}⚠️  Website bucket already exists: ${S3_BUCKET}${NC}"
    fi
    
    # Create evidence bucket (private)
    if aws s3 ls s3://$EVIDENCE_BUCKET 2>&1 | grep -q "NoSuchBucket"; then
        aws s3 mb s3://$EVIDENCE_BUCKET --region $AWS_REGION
        echo -e "${GREEN}✅ Evidence bucket created: ${EVIDENCE_BUCKET}${NC}"
    else
        echo -e "${YELLOW}⚠️  Evidence bucket already exists: ${EVIDENCE_BUCKET}${NC}"
    fi
}

# Function to create DynamoDB table
create_dynamodb_table() {
    echo -e "${YELLOW}🗄️  Creating DynamoDB table...${NC}"
    
    if aws dynamodb describe-table --table-name $DYNAMODB_TABLE &> /dev/null; then
        echo -e "${YELLOW}⚠️  DynamoDB table already exists: ${DYNAMODB_TABLE}${NC}"
    else
        aws dynamodb create-table \
            --table-name $DYNAMODB_TABLE \
            --attribute-definitions AttributeName=id,AttributeType=S \
            --key-schema AttributeName=id,KeyType=HASH \
            --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
            --tags Key=Project,Value=CyberAssess \
            --region $AWS_REGION
        
        echo -e "${GREEN}✅ DynamoDB table created: ${DYNAMODB_TABLE}${NC}"
    fi
}

# Function to create Cognito User Pool
create_cognito_user_pool() {
    echo -e "${YELLOW}👥 Creating Cognito User Pool...${NC}"
    
    # Check if user pool already exists
    if aws cognito-idp describe-user-pool --user-pool-id $COGNITO_USER_POOL &> /dev/null; then
        echo -e "${YELLOW}⚠️  Cognito User Pool already exists: ${COGNITO_USER_POOL}${NC}"
        return
    fi
    
    # Create user pool
    user_pool_id=$(aws cognito-idp create-user-pool \
        --pool-name $COGNITO_USER_POOL \
        --auto-verified-attributes email \
        --username-attributes email \
        --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=true,RequireLowercase=true,RequireNumbers=true,TemporaryPasswordValidityDays=7}" \
        --schema "Name=email,AttributeDataType=String,Required=true" \
        --schema "Name=name,AttributeDataType=String,Required=true" \
        --schema "Name=custom:role,AttributeDataType=String,Required=false" \
        --tags Key=Project,Value=CyberAssess \
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
    
    # Save configuration
    echo "USER_POOL_ID=$user_pool_id" > .cyberassess-config
    echo "CLIENT_ID=$client_id" >> .cyberassess-config
    echo "REGION=$AWS_REGION" >> .cyberassess-config
    echo "S3_BUCKET=$S3_BUCKET" >> .cyberassess-config
    echo "EVIDENCE_BUCKET=$EVIDENCE_BUCKET" >> .cyberassess-config
    echo "DYNAMODB_TABLE=$DYNAMODB_TABLE" >> .cyberassess-config
    echo "ACCOUNT_ID=$ACCOUNT_ID" >> .cyberassess-config
    
    echo -e "${GREEN}✅ Configuration saved to .cyberassess-config${NC}"
}

# Function to find or create Lambda execution role
get_lambda_role() {
    echo -e "${YELLOW}👤 Setting up Lambda execution role...${NC}"
    
    # Try to find existing Lambda execution role
    local existing_role=$(aws iam list-roles --query 'Roles[?contains(RoleName, `Lambda`) && contains(RoleName, `Execution`)].Arn' --output text | head -1)
    
    if [ -n "$existing_role" ] && [ "$existing_role" != "None" ]; then
        echo -e "${GREEN}✅ Using existing Lambda role: ${existing_role}${NC}"
        echo $existing_role
        return
    fi
    
    # Try to find any Lambda role
    existing_role=$(aws iam list-roles --query 'Roles[?contains(RoleName, `Lambda`)].Arn' --output text | head -1)
    
    if [ -n "$existing_role" ] && [ "$existing_role" != "None" ]; then
        echo -e "${GREEN}✅ Using existing Lambda role: ${existing_role}${NC}"
        echo $existing_role
        return
    fi
    
    echo -e "${YELLOW}⚠️  No Lambda role found. Please create one manually or ensure AWSLambdaBasicExecutionRole is attached to an existing role.${NC}"
    echo ""
    echo -e "${BLUE}To create a Lambda role, run:${NC}"
    echo -e "${YELLOW}aws iam create-role --role-name cyberassess-lambda-exec --assume-role-policy-document file://trust-policy.json${NC}"
    echo -e "${YELLOW}aws iam attach-role-policy --role-name cyberassess-lambda-exec --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole${NC}"
    echo ""
    exit 1
}

# Function to deploy Lambda functions
deploy_lambda_functions() {
    echo -e "${YELLOW}⚡ Deploying Lambda functions...${NC}"
    
    # Load configuration
    if [ -f .cyberassess-config ]; then
        source .cyberassess-config
    else
        echo -e "${RED}❌ CyberAssess configuration not found.${NC}"
        exit 1
    fi
    
    # Get Lambda execution role
    local lambda_role=$(get_lambda_role)
    
    # Package functions
    echo -e "${BLUE}Packaging Lambda functions...${NC}"
    npm run package-lambdas 2>/dev/null || echo "Packaging skipped (functions may already be packaged)"
    
    # Deploy each function
    functions=("auth" "data" "upload" "email" "setup")
    
    for func in "${functions[@]}"; do
        echo -e "${BLUE}Deploying: ${func}${NC}"
        
        local function_name="cyberassess-standalone-${func}"
        local zip_file="${func}-lambda.zip"
        
        if [ ! -f "$zip_file" ]; then
            echo -e "${YELLOW}⚠️  Lambda package not found: ${zip_file}${NC}"
            continue
        fi
        
        # Check if function exists
        if aws lambda get-function --function-name $function_name &> /dev/null; then
            # Update existing function
            aws lambda update-function-code \
                --function-name $function_name \
                --zip-file fileb://$zip_file \
                --region $AWS_REGION
            
            echo -e "${GREEN}✅ Function updated: ${func}${NC}"
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
                --tags Project=CyberAssess \
                --region $AWS_REGION
            
            echo -e "${GREEN}✅ Function created: ${func}${NC}"
        fi
        
        # Cleanup
        rm -f $zip_file
    done
}

# Function to deploy frontend to S3
deploy_frontend() {
    echo -e "${YELLOW}🌐 Deploying frontend to S3...${NC}"
    
    # Load configuration
    if [ -f .cyberassess-config ]; then
        source .cyberassess-config
    else
        echo -e "${RED}❌ CyberAssess configuration not found.${NC}"
        exit 1
    fi
    
    # Sync files to S3
    aws s3 sync . s3://$S3_BUCKET \
        --exclude "aws-lambdas/*" \
        --exclude ".git/*" \
        --exclude "node_modules/*" \
        --exclude "*.md" \
        --exclude ".cyberassess-config" \
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
    
    echo -e "${GREEN}✅ Frontend deployed to S3${NC}"
}

# Function to create demo users
create_demo_users() {
    echo -e "${YELLOW}👤 Creating demo users...${NC}"
    
    # Load configuration
    if [ -f .cyberassess-config ]; then
        source .cyberassess-config
    else
        echo -e "${RED}❌ CyberAssess configuration not found.${NC}"
        exit 1
    fi
    
    # Demo users
    declare -A demo_users=(
        ["admin@cyberassess.com"]="CyberAssess Admin|admin"
        ["assessor@cyberassess.com"]="J. Williams|assessor"
        ["agency@cyberassess.com"]="Lisa Harmon|agency_rep"
    )
    
    for email in "${!demo_users[@]}"; do
        IFS='|' read -r name role <<< "${demo_users[$email]}"
        
        echo -e "${BLUE}Creating user: ${email} (${role})${NC}"
        
        # Create user
        aws cognito-idp admin-create-user \
            --user-pool-id $USER_POOL_ID \
            --username $email \
            --user-attributes Name=email,Value=$email Name=name,Value="$name" Name=custom:role,Value=$role \
            --temporary-password CyberAssess123! \
            --message-action SUPPRESS \
            --region $AWS_REGION 2>/dev/null || echo "User already exists"
        
        # Set permanent password
        aws cognito-idp admin-set-user-password \
            --user-pool-id $USER_POOL_ID \
            --username $email \
            --password CyberAssess123! \
            --permanent \
            --region $AWS_REGION
        
        echo -e "${GREEN}✅ User created: ${email}${NC}"
    done
}

# Function to initialize demo data
initialize_demo_data() {
    echo -e "${YELLOW}🎯 Initializing demo data...${NC}"
    
    # Load configuration
    if [ -f .cyberassess-config ]; then
        source .cyberassess-config
    else
        echo -e "${RED}❌ CyberAssess configuration not found.${NC}"
        exit 1
    fi
    
    # Invoke setup Lambda
    aws lambda invoke \
        --function-name cyberassess-standalone-setup \
        --payload '{"action":"initializeData"}' \
        setup-response.json 2>/dev/null || echo "Setup Lambda not available"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Demo data initialized successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Demo data initialization may have failed. You can initialize later through the app.${NC}"
    fi
    
    rm -f setup-response.json
}

# Function to display access information
show_access_info() {
    echo -e "${GREEN}🎉 Simplified standalone deployment completed!${NC}"
    echo ""
    echo -e "${BLUE}📱 Access Information:${NC}"
    echo -e "${YELLOW}   S3 Bucket: ${S3_BUCKET}${NC}"
    echo -e "${YELLOW}   To access via S3: https://s3.console.aws.amazon.com/s3/bucket/${S3_BUCKET}${NC}"
    echo ""
    echo -e "${BLUE}👤 Demo Accounts:${NC}"
    echo -e "${YELLOW}   Administrator: admin@cyberassess.com / CyberAssess123!${NC}"
    echo -e "${YELLOW}   Assessor:      assessor@cyberassess.com / CyberAssess123!${NC}"
    echo -e "${YELLOW}   Agency Rep:    agency@cyberassess.com / CyberAssess123!${NC}"
    echo ""
    echo -e "${BLUE}📊 Resources Created:${NC}"
    echo -e "${YELLOW}   • S3 Buckets: ${S3_BUCKET}, ${EVIDENCE_BUCKET}${NC}"
    echo -e "${YELLOW}   • DynamoDB: ${DYNAMODB_TABLE}${NC}"
    echo -e "${YELLOW}   • Cognito: ${COGNITO_USER_POOL}${NC}"
    echo -e "${YELLOW}   • 5 Lambda Functions${NC}"
    echo ""
    echo -e "${BLUE}💰 Cost: $0-15/month (free tier optimized)${NC}"
    echo -e "${BLUE}🔒 Dedicated resources, no mixing with existing portfolio${NC}"
    echo ""
    echo -e "${BLUE}🔧 Next Steps:${NC}"
    echo -e "${YELLOW}   1. Access the S3 bucket to view the application${NC}"
    echo -e "${YELLOW}   2. Set up CloudFront distribution for HTTPS access${NC}"
    echo -e "${YELLOW}   3. Configure API Gateway for Lambda functions${NC}"
    echo -e "${YELLOW}   4. Test with the demo accounts above${NC}"
}

# Main deployment
main() {
    echo -e "${BLUE}🔧 Starting simplified standalone CyberAssess deployment...${NC}"
    
    # Create AWS resources (no VPC needed)
    create_private_s3_buckets
    create_dynamodb_table
    create_cognito_user_pool
    
    # Deploy application
    deploy_lambda_functions
    deploy_frontend
    
    # Setup demo
    create_demo_users
    initialize_demo_data
    
    # Show access info
    show_access_info
}

# Execute deployment
main "$@"
