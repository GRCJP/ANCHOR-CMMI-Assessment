#!/bin/bash

# Standalone CyberAssess Deployment - Completely Independent AWS Infrastructure
# This script creates a totally separate setup with no mixing with existing portfolio

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Standalone configuration
AWS_PROFILE="${AWS_PROFILE:-cyberassess}"
AWS_REGION="${AWS_REGION:-us-east-1}"
PROJECT_NAME="cyberassess"

# Resource names (completely dedicated)
S3_BUCKET="${PROJECT_NAME}-standalone"
EVIDENCE_BUCKET="${PROJECT_NAME}-evidence-standalone"
DYNAMODB_TABLE="${PROJECT_NAME}-data-standalone"
COGNITO_USER_POOL="${PROJECT_NAME}-users-standalone"
VPC_ID="${PROJECT_NAME}-vpc"
SUBNET_PUBLIC="${PROJECT_NAME}-public-subnet"
SUBNET_PRIVATE="${PROJECT_NAME}-private-subnet"
SECURITY_GROUP="${PROJECT_NAME}-sg"
IAM_ROLE="${PROJECT_NAME}-lambda-role"

echo -e "${BLUE}🚀 Deploying Standalone CyberAssess Platform${NC}"
echo -e "${BLUE}🔧 AWS Profile: ${AWS_PROFILE}${NC}"
echo -e "${BLUE}📍 Region: ${AWS_REGION}${NC}"
echo -e "${BLUE}💰 Estimated cost: $0-15/month (free tier optimized)${NC}"
echo -e "${BLUE}🔒 Complete isolation from existing portfolio${NC}"

# Use specified AWS profile
if [ "$AWS_PROFILE" != "default" ]; then
    export AWS_PROFILE=$AWS_PROFILE
    echo -e "${GREEN}✅ Using AWS profile: ${AWS_PROFILE}${NC}"
fi

# Check AWS CLI is configured
if ! AWS_PROFILE=$AWS_PROFILE aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS profile '${AWS_PROFILE}' not configured.${NC}"
    echo -e "${YELLOW}Please run: aws configure --profile ${AWS_PROFILE}${NC}"
    exit 1
fi

# Get account info
ACCOUNT_ID=$(AWS_PROFILE=$AWS_PROFILE aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS Account: ${ACCOUNT_ID}${NC}"

# Function to create dedicated VPC
create_vpc() {
    echo -e "${YELLOW}🌐 Creating dedicated VPC...${NC}"
    
    # Check if VPC already exists
    existing_vpc=$(AWS_PROFILE=$AWS_PROFILE aws ec2 describe-vpcs \
        --filters Name=tag:Name,Values=$VPC_ID \
        --query 'Vpcs[0].VpcId' \
        --output text 2>/dev/null || echo "")
    
    if [ -n "$existing_vpc" ] && [ "$existing_vpc" != "None" ]; then
        echo -e "${YELLOW}⚠️  VPC already exists: ${existing_vpc}${NC}"
        echo $existing_vpc
        return
    fi
    
    # Create VPC
    vpc_id=$(AWS_PROFILE=$AWS_PROFILE aws ec2 create-vpc \
        --cidr-block 10.0.0.0/16 \
        --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value='$VPC_ID'},{Key=Project,Value=CyberAssess}]' \
        --query 'Vpc.VpcId' \
        --output text)
    
    echo -e "${GREEN}✅ VPC created: ${vpc_id}${NC}"
    echo $vpc_id
}

# Function to create subnets
create_subnets() {
    local vpc_id=$1
    echo -e "${YELLOW}🔗 Creating subnets...${NC}"
    
    # Create public subnet
    public_subnet_id=$(AWS_PROFILE=$AWS_PROFILE aws ec2 create-subnet \
        --vpc-id $vpc_id \
        --cidr-block 10.0.1.0/24 \
        --availability-zone ${AWS_REGION}a \
        --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value='$SUBNET_PUBLIC'},{Key=Project,Value=CyberAssess},{Key=Type,Value=Public}]' \
        --query 'Subnet.SubnetId' \
        --output text)
    
    # Create private subnet
    private_subnet_id=$(AWS_PROFILE=$AWS_PROFILE aws ec2 create-subnet \
        --vpc-id $vpc_id \
        --cidr-block 10.0.2.0/24 \
        --availability-zone ${AWS_REGION}b \
        --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value='$SUBNET_PRIVATE'},{Key=Project,Value=CyberAssess},{Key=Type,Value=Private}]' \
        --query 'Subnet.SubnetId' \
        --output text)
    
    echo -e "${GREEN}✅ Subnets created: ${public_subnet_id}, ${private_subnet_id}${NC}"
    echo "${public_subnet_id},${private_subnet_id}"
}

# Function to create security group
create_security_group() {
    local vpc_id=$1
    echo -e "${YELLOW}🔒 Creating security group...${NC}"
    
    sg_id=$(AWS_PROFILE=$AWS_PROFILE aws ec2 create-security-group \
        --group-name $SECURITY_GROUP \
        --description "CyberAssess standalone security group" \
        --vpc-id $vpc_id \
        --tag-specifications 'ResourceType=security-group,Tags=[{Key=Name,Value='$SECURITY_GROUP'},{Key=Project,Value=CyberAssess}]' \
        --query 'GroupId' \
        --output text)
    
    # Add rules for Lambda functions
    AWS_PROFILE=$AWS_PROFILE aws ec2 authorize-security-group-egress \
        --group-id $sg_id \
        --protocol all \
        --cidr 0.0.0.0/0
    
    echo -e "${GREEN}✅ Security group created: ${sg_id}${NC}"
    echo $sg_id
}

# Function to create dedicated IAM role
create_dedicated_iam_role() {
    echo -e "${YELLOW}👤 Creating dedicated IAM role...${NC}"
    
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
    AWS_PROFILE=$AWS_PROFILE aws iam create-role \
        --role-name $IAM_ROLE \
        --assume-role-policy-document file://lambda-trust-policy.json \
        --description "Dedicated role for CyberAssess Lambda functions" \
        --tags Key=Project,Value=CyberAssess \
        --output text
    
    # Attach policies
    AWS_PROFILE=$AWS_PROFILE aws iam attach-role-policy \
        --role-name $IAM_ROLE \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    # Create custom policy for CyberAssess
    cat > cyberassess-lambda-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cognito-idp:*"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:*"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/${DYNAMODB_TABLE}"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "arn:aws:s3:::${S3_BUCKET}",
                "arn:aws:s3:::${S3_BUCKET}/*",
                "arn:aws:s3:::${EVIDENCE_BUCKET}",
                "arn:aws:s3:::${EVIDENCE_BUCKET}/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ses:*"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:*"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}
EOF
    
    # Create and attach custom policy
    AWS_PROFILE=$AWS_PROFILE aws iam create-policy \
        --policy-name CyberAssessStandaloneLambdaPolicy \
        --policy-document file://cyberassess-lambda-policy.json \
        --tags Key=Project,Value=CyberAssess \
        --output text
    
    policy_arn="arn:aws:iam::${ACCOUNT_ID}:policy/CyberAssessStandaloneLambdaPolicy"
    AWS_PROFILE=$AWS_PROFILE aws iam attach-role-policy \
        --role-name $IAM_ROLE \
        --policy-arn $policy_arn
    
    # Wait for role to be ready
    echo -e "${BLUE}Waiting for IAM role to be ready...${NC}"
    sleep 15
    
    # Get role ARN
    role_arn=$(AWS_PROFILE=$AWS_PROFILE aws iam get-role \
        --role-name $IAM_ROLE \
        --query 'Role.Arn' \
        --output text)
    
    echo -e "${GREEN}✅ IAM role created: ${role_arn}${NC}"
    
    # Cleanup
    rm lambda-trust-policy.json cyberassess-lambda-policy.json
    
    echo $role_arn
}

# Function to create S3 buckets
create_s3_buckets() {
    echo -e "${YELLOW}📦 Creating dedicated S3 buckets...${NC}"
    
    # Create website bucket
    if AWS_PROFILE=$AWS_PROFILE aws s3 ls s3://$S3_BUCKET 2>&1 | grep -q "NoSuchBucket"; then
        AWS_PROFILE=$AWS_PROFILE aws s3 mb s3://$S3_BUCKET --region $AWS_REGION
        
        # Configure for static website hosting
        AWS_PROFILE=$AWS_PROFILE aws s3 website s3://$S3_BUCKET \
            --index-document login.html \
            --error-document error.html
        
        # Set bucket policy
        cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${S3_BUCKET}/*"
        }
    ]
}
EOF
        
        AWS_PROFILE=$AWS_PROFILE aws s3api put-bucket-policy \
            --bucket $S3_BUCKET \
            --policy file://bucket-policy.json
        
        rm bucket-policy.json
        
        echo -e "${GREEN}✅ Website bucket created: ${S3_BUCKET}${NC}"
    else
        echo -e "${YELLOW}⚠️  Website bucket already exists: ${S3_BUCKET}${NC}"
    fi
    
    # Create evidence bucket
    if AWS_PROFILE=$AWS_PROFILE aws s3 ls s3://$EVIDENCE_BUCKET 2>&1 | grep -q "NoSuchBucket"; then
        AWS_PROFILE=$AWS_PROFILE aws s3 mb s3://$EVIDENCE_BUCKET --region $AWS_REGION
        echo -e "${GREEN}✅ Evidence bucket created: ${EVIDENCE_BUCKET}${NC}"
    else
        echo -e "${YELLOW}⚠️  Evidence bucket already exists: ${EVIDENCE_BUCKET}${NC}"
    fi
}

# Function to create DynamoDB table
create_dynamodb_table() {
    echo -e "${YELLOW}🗄️  Creating dedicated DynamoDB table...${NC}"
    
    if AWS_PROFILE=$AWS_PROFILE aws dynamodb describe-table --table-name $DYNAMODB_TABLE &> /dev/null; then
        echo -e "${YELLOW}⚠️  DynamoDB table already exists: ${DYNAMODB_TABLE}${NC}"
    else
        AWS_PROFILE=$AWS_PROFILE aws dynamodb create-table \
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
    echo -e "${YELLOW}👥 Creating dedicated Cognito User Pool...${NC}"
    
    # Check if user pool already exists
    if AWS_PROFILE=$AWS_PROFILE aws cognito-idp describe-user-pool --user-pool-id $COGNITO_USER_POOL &> /dev/null; then
        echo -e "${YELLOW}⚠️  Cognito User Pool already exists: ${COGNITO_USER_POOL}${NC}"
        return
    fi
    
    # Create user pool
    user_pool_id=$(AWS_PROFILE=$AWS_PROFILE aws cognito-idp create-user-pool \
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
    client_id=$(AWS_PROFILE=$AWS_PROFILE aws cognito-idp create-user-pool-client \
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
    echo "AWS_PROFILE=$AWS_PROFILE" >> .cyberassess-config
    
    echo -e "${GREEN}✅ Configuration saved to .cyberassess-config${NC}"
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
    
    # Get IAM role ARN
    role_arn=$(AWS_PROFILE=$AWS_PROFILE aws iam get-role \
        --role-name $IAM_ROLE \
        --query 'Role.Arn' \
        --output text)
    
    # Package functions
    echo -e "${BLUE}Packaging Lambda functions...${NC}"
    npm run package-lambdas
    
    # Deploy each function
    functions=("auth" "data" "upload" "email" "setup")
    
    for func in "${functions[@]}"; do
        echo -e "${BLUE}Deploying: ${func}${NC}"
        
        local function_name="cyberassess-standalone-${func}"
        local zip_file="${func}-lambda.zip"
        
        # Check if function exists
        if AWS_PROFILE=$AWS_PROFILE aws lambda get-function --function-name $function_name &> /dev/null; then
            # Update existing function
            AWS_PROFILE=$AWS_PROFILE aws lambda update-function-code \
                --function-name $function_name \
                --zip-file fileb://$zip_file \
                --region $AWS_REGION
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
            
            AWS_PROFILE=$AWS_PROFILE aws lambda create-function \
                --function-name $function_name \
                --runtime nodejs18.x \
                --role $role_arn \
                --handler index.handler \
                --zip-file fileb://$zip_file \
                --environment Variables=$env_vars \
                --timeout 30 \
                --tags Project=CyberAssess \
                --region $AWS_REGION
        fi
        
        # Cleanup
        rm $zip_file
        
        echo -e "${GREEN}✅ Function deployed: ${func}${NC}"
    done
}

# Function to deploy frontend
deploy_frontend() {
    echo -e "${YELLOW}🌐 Deploying frontend...${NC}"
    
    # Sync files to S3
    AWS_PROFILE=$AWS_PROFILE aws s3 sync . s3://$S3_BUCKET \
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
        AWS_PROFILE=$AWS_PROFILE aws cognito-idp admin-create-user \
            --user-pool-id $USER_POOL_ID \
            --username $email \
            --user-attributes Name=email,Value=$email Name=name,Value="$name" Name=custom:role,Value=$role \
            --temporary-password CyberAssess123! \
            --message-action SUPPRESS \
            --region $AWS_REGION 2>/dev/null || echo "User already exists"
        
        # Set permanent password
        AWS_PROFILE=$AWS_PROFILE aws cognito-idp admin-set-user-password \
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
    
    # Invoke setup Lambda
    AWS_PROFILE=$AWS_PROFILE aws lambda invoke \
        --function-name cyberassess-standalone-setup \
        --payload '{"action":"initializeData"}' \
        setup-response.json
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Demo data initialized successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Demo data initialization may have failed.${NC}"
    fi
    
    rm -f setup-response.json
}

# Function to display access information
show_access_info() {
    echo -e "${GREEN}🎉 Standalone deployment completed!${NC}"
    echo -e "${BLUE}📱 Your CyberAssess platform is available at:${NC}"
    echo -e "${YELLOW}   http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com/login.html${NC}"
    echo ""
    echo -e "${BLUE}👤 Demo accounts:${NC}"
    echo -e "${YELLOW}   Administrator: admin@cyberassess.com / CyberAssess123!${NC}"
    echo -e "${YELLOW}   Assessor:      assessor@cyberassess.com / CyberAssess123!${NC}"
    echo -e "${YELLOW}   Agency Rep:    agency@cyberassess.com / CyberAssess123!${NC}"
    echo ""
    echo -e "${BLUE}🔧 AWS Profile: ${AWS_PROFILE}${NC}"
    echo -e "${BLUE}📊 Resources Created:${NC}"
    echo -e "${YELLOW}   • VPC: ${VPC_ID}${NC}"
    echo -e "${YELLOW}   • S3 Buckets: ${S3_BUCKET}, ${EVIDENCE_BUCKET}${NC}"
    echo -e "${YELLOW}   • DynamoDB: ${DYNAMODB_TABLE}${NC}"
    echo -e "${YELLOW}   • Cognito: ${COGNITO_USER_POOL}${NC}"
    echo -e "${YELLOW}   • IAM Role: ${IAM_ROLE}${NC}"
    echo -e "${YELLOW}   • 5 Lambda Functions${NC}"
    echo ""
    echo -e "${BLUE}💰 Cost: $0-15/month (free tier optimized)${NC}"
    echo -e "${BLUE}🔒 Complete isolation from your existing portfolio${NC}"
}

# Main deployment
main() {
    echo -e "${BLUE}🔧 Starting standalone CyberAssess deployment...${NC}"
    
    # Create dedicated infrastructure
    vpc_id=$(create_vpc)
    subnets=$(create_subnets $vpc_id)
    sg_id=$(create_security_group $vpc_id)
    role_arn=$(create_dedicated_iam_role)
    
    # Create AWS resources
    create_s3_buckets
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
