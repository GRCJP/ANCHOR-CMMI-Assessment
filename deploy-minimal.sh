#!/bin/bash

# Minimal CyberAssess Deployment - S3 Only
# Works with basic S3 permissions and local storage for data

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="anchor"
S3_BUCKET="${PROJECT_NAME}-minimal-$(date +%s)"

echo -e "${BLUE}🚀 Deploying Minimal Anchor Platform (S3 Only)${NC}"
echo -e "${BLUE}📍 Region: us-east-1${NC}"
echo -e "${BLUE}💰 Cost: $0-5/month (S3 storage only)${NC}"
echo -e "${BLUE}🔒 Using S3 storage with local data management${NC}"

# Check AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured.${NC}"
    exit 1
fi

# Get account info
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS Account: ${ACCOUNT_ID}${NC}"

# Function to create S3 bucket
create_s3_bucket() {
    echo -e "${YELLOW}📦 Creating S3 bucket...${NC}"
    
    if aws s3 ls s3://$S3_BUCKET 2>&1 | grep -q "NoSuchBucket"; then
        aws s3 mb s3://$S3_BUCKET --region us-east-1
        echo -e "${GREEN}✅ S3 bucket created: ${S3_BUCKET}${NC}"
    else
        echo -e "${YELLOW}⚠️  S3 bucket already exists: ${S3_BUCKET}${NC}"
    fi
}

# Function to deploy frontend to S3
deploy_frontend() {
    echo -e "${YELLOW}🌐 Deploying frontend to S3...${NC}"
    
    # Sync files to S3
    aws s3 sync . s3://$S3_BUCKET \
        --exclude "aws-lambdas/*" \
        --exclude ".git/*" \
        --exclude "node_modules/*" \
        --exclude "*.md" \
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

# Function to create local configuration
create_local_config() {
    echo -e "${YELLOW}⚙️ Creating local configuration...${NC}"
    
    # Create configuration file
    cat > cyberassess-config.json << EOF
{
  "app": {
    "name": "Anchor Platform",
    "version": "2.4.1",
    "mode": "local",
    "storage": "local"
  },
  "aws": {
    "s3_bucket": "$S3_BUCKET",
    "region": "us-east-1",
    "account_id": "$ACCOUNT_ID"
  },
  "demo": {
    "users": {
      "admin": {
        "email": "admin@anchor.com",
        "password": "Anchor123!",
        "role": "admin",
        "name": "Anchor Administrator"
      },
      "assessor": {
        "email": "assessor@anchor.com",
        "password": "Anchor123!",
        "role": "assessor",
        "name": "J. Williams"
      },
      "agency": {
        "email": "agency@anchor.com",
        "password": "Anchor123!",
        "role": "agency_rep",
        "name": "Lisa Harmon"
      }
    }
  }
}
EOF
    
    echo -e "${GREEN}✅ Local configuration created${NC}"
}

# Function to display access information
show_access_info() {
    echo -e "${GREEN}🎉 Minimal Anchor Platform deployment completed!${NC}"
    echo ""
    echo -e "${BLUE}📱 Access Information:${NC}"
    echo -e "${YELLOW}   S3 Bucket: ${S3_BUCKET}${NC}"
    echo -e "${YELLOW}   Direct URL: https://s3.console.aws.amazon.com/s3/bucket/${S3_BUCKET}${NC}"
    echo -e "${YELLOW}   Open index.html or login.html to start${NC}"
    echo ""
    echo -e "${BLUE}👤 Demo Accounts (Local Authentication):${NC}"
    echo -e "${YELLOW}   Administrator: admin@anchor.com / Anchor123!${NC}"
    echo -e "${YELLOW}   Assessor:      assessor@anchor.com / Anchor123!${NC}"
    echo -e "${YELLOW}   Agency Rep:    agency@anchor.com / Anchor123!${NC}"
    echo ""
    echo -e "${BLUE}📊 Features Available:${NC}"
    echo -e "${YELLOW}   • Static website hosting (S3)${NC}"
    echo -e "${YELLOW}   • Local authentication system${NC}"
    echo -e "${YELLOW}   • Local data storage (localStorage)${NC}"
    echo -e "${YELLOW}   • File upload simulation${NC}"
    echo -e "${YELLOW}   • Email notification simulation${NC}"
    echo ""
    echo -e "${BLUE}🔧 Next Steps:${NC}"
    echo -e "${YELLOW}   1. Access the S3 bucket to view the application${NC}"
    echo -e "${YELLOW}   2. Open login.html to test authentication${NC}"
    echo -e "${YELLOW}   3. Test all features with demo accounts${NC}"
    echo -e "${YELLOW}   4. For cloud features, request additional AWS permissions${NC}"
    echo ""
    echo -e "${BLUE}💰 Cost: $0-5/month (S3 storage only)${NC}"
    echo -e "${BLUE}🔒 Completely isolated from your existing portfolio${NC}"
}

# Main deployment
main() {
    echo -e "${BLUE}🔧 Starting minimal Anchor Platform deployment...${NC}"
    
    # Create S3 bucket
    create_s3_bucket
    
    # Deploy frontend
    deploy_frontend
    
    # Create local configuration
    create_local_config
    
    # Show access info
    show_access_info
}

# Execute deployment
main "$@"
