#!/bin/bash

# GitHub-AWS Deployment Setup Script
# This script helps you set up GitHub secrets and test the deployment pipeline

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 GitHub-AWS Deployment Setup for Anchor Platform${NC}"
echo -e "${BLUE}===============================================${NC}"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Not in a git repository. Please run this from the root of your Anchor Platform project.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git repository found${NC}"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI not found. Installing...${NC}"
    
    # Install GitHub CLI
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo -e "${RED}❌ Please install Homebrew first: https://brew.sh${NC}"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        curl -fsSL https://github.com/cli/cli/releases/latest/download/gh_*_linux_amd64.tar.gz | tar xzf - && sudo mv gh_* /usr/local/bin/gh
    else
        echo -e "${RED}❌ Please install GitHub CLI manually: https://cli.github.com${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ GitHub CLI installed${NC}"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI configured${NC}"

# Get AWS account info
AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS Account: $AWS_ACCOUNT${NC}"

# Check if we're authenticated with GitHub
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}🔐 Authenticating with GitHub...${NC}"
    gh auth login
fi

echo -e "${GREEN}✅ GitHub authenticated${NC}"

# Get repository info
REPO_NAME=$(basename $(git rev-parse --show-toplevel))
REPO_OWNER=$(gh repo view --json owner --jq '.owner.login')
FULL_REPO="$REPO_OWNER/$REPO_NAME"

echo -e "${GREEN}✅ Repository: $FULL_REPO${NC}"

# Function to set GitHub secret
set_github_secret() {
    local secret_name=$1
    local secret_value=$2
    
    echo -e "${BLUE}🔒 Setting GitHub secret: $secret_name${NC}"
    
    if gh secret set "$secret_name" --body "$secret_value"; then
        echo -e "${GREEN}✅ Secret set successfully${NC}"
    else
        echo -e "${RED}❌ Failed to set secret: $secret_name${NC}"
        return 1
    fi
}

# Set AWS credentials as GitHub secrets
echo -e "${BLUE}🔧 Setting up GitHub secrets for AWS deployment...${NC}"

# Get AWS credentials from current profile
AWS_ACCESS_KEY=$(aws configure get aws_access_key_id)
AWS_SECRET_KEY=$(aws configure get aws_secret_access_key)

if [ -z "$AWS_ACCESS_KEY" ] || [ -z "$AWS_SECRET_KEY" ]; then
    echo -e "${RED}❌ AWS credentials not found in current profile${NC}"
    echo -e "${YELLOW}Please run 'aws configure' to set up your credentials${NC}"
    exit 1
fi

# Set secrets
set_github_secret "AWS_ACCESS_KEY_ID" "$AWS_ACCESS_KEY"
set_github_secret "AWS_SECRET_ACCESS_KEY" "$AWS_SECRET_KEY"

# Set optional Lambda role secret (if you have one)
echo -e "${BLUE}🔧 Checking for Lambda execution role...${NC}"
LAMBDA_ROLE=$(aws iam list-roles --query 'Roles[?contains(RoleName, `Lambda`) && contains(RoleName, `Execution`)].Arn' --output text | head -1)

if [ -n "$LAMBDA_ROLE" ] && [ "$LAMBDA_ROLE" != "None" ]; then
    echo -e "${GREEN}✅ Found Lambda role: $LAMBDA_ROLE${NC}"
    set_github_secret "LAMBDA_EXECUTION_ROLE_ARN" "$LAMBDA_ROLE"
else
    echo -e "${YELLOW}⚠️  No Lambda execution role found. You can set this up later if needed.${NC}"
fi

# Create branches if they don't exist
echo -e "${BLUE}🌿 Setting up branches...${NC}"

# Create develop branch if it doesn't exist
if ! git show-ref --verify --quiet refs/heads/develop; then
    echo -e "${YELLOW}Creating develop branch...${NC}"
    git checkout -b develop
    git push -u origin develop
    git checkout main
else
    echo -e "${GREEN}✅ Develop branch already exists${NC}"
fi

# Add and commit the workflow files
echo -e "${BLUE}📝 Committing workflow files...${NC}"

if [ -n "$(git status --porcelain)" ]; then
    git add .github/workflows/
    git add GITHUB-AWS-DEPLOYMENT.md
    git commit -m "Add GitHub Actions workflow for AWS deployment"
    git push
    echo -e "${GREEN}✅ Workflow files committed${NC}"
else
    echo -e "${GREEN}✅ No changes to commit${NC}"
fi

# Test the workflow by triggering it
echo -e "${BLUE}🧪 Testing the deployment workflow...${NC}"

# Create a test commit to trigger the workflow
echo "Test deployment at $(date)" > test-deployment.txt
git add test-deployment.txt
git commit -m "Test deployment workflow"
git push origin develop

echo -e "${GREEN}✅ Test commit pushed to develop branch${NC}"

# Wait for workflow to start
echo -e "${BLUE}⏳ Waiting for GitHub Actions to start...${NC}"
sleep 10

# Check workflow status
echo -e "${BLUE}📊 Checking workflow status...${NC}"

# Get the latest workflow run
WORKFLOW_RUN=$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')

if [ -n "$WORKFLOW_RUN" ]; then
    echo -e "${GREEN}✅ Workflow started successfully!${NC}"
    echo -e "${BLUE}📱 Monitor your deployment at:${NC}"
    echo -e "${YELLOW}   https://github.com/$FULL_REPO/actions${NC}"
    
    # Wait for workflow to complete (timeout after 5 minutes)
    echo -e "${BLUE}⏳ Monitoring workflow completion (timeout: 5 minutes)...${NC}"
    
    for i in {1..30}; do
        STATUS=$(gh run view "$WORKFLOW_RUN" --json status --jq '.status')
        CONCLUSION=$(gh run view "$WORKFLOW_RUN" --json conclusion --jq '.conclusion')
        
        echo -e "${BLUE}   Status: $STATUS | Conclusion: $CONCLUSION${NC}"
        
        if [ "$CONCLUSION" = "success" ]; then
            echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
            
            # Get the deployment URL
            echo -e "${BLUE}📱 Getting deployment information...${NC}"
            
            # Wait a bit for the deployment info to be available
            sleep 5
            
            # Try to get the S3 bucket name from the workflow logs
            STAGING_BUCKET=$(gh run view "$WORKFLOW_RUN" --json --jq '.jobs[0].steps[] | select(.name == "Create staging S3 bucket") | .conclusion' | head -1)
            
            if [ "$STAGING_BUCKET" = "success" ]; then
                echo -e "${GREEN}✅ Staging deployment completed!${NC}"
                echo -e "${BLUE}📱 To access: Open GitHub Actions → Click on the workflow run → View logs → Find the S3 bucket URL${NC}"
            fi
            
            break
        elif [ "$CONCLUSION" = "failure" ]; then
            echo -e "${RED}❌ Deployment failed!${NC}"
            echo -e "${BLUE}🔧 Check the workflow logs for details: https://github.com/$FULL_REPO/actions${NC}"
            break
        elif [ "$STATUS" = "in_progress" ]; then
            echo -e "${BLUE}   Still running... ($i/30)${NC}"
            sleep 10
        else
            echo -e "${YELLOW}   Status: $STATUS${NC}"
            sleep 10
        fi
    done
    
    if [ "$CONCLUSION" != "success" ]; then
        echo -e "${YELLOW}⚠️  Workflow may still be running. Check GitHub Actions for details.${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Workflow may still be starting. Check GitHub Actions for details.${NC}"
fi

# Clean up test file
git reset --hard HEAD~1
git push --force-with-lease origin develop

echo -e "${GREEN}🎉 Setup completed!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo -e "${YELLOW}   1. Monitor your deployment at: https://github.com/$FULL_REPO/actions${NC}"
echo -e "${YELLOW}   2. Once staging is working, merge develop to main for production${NC}"
echo -e "${YELLOW}   3. Access your deployed app via the S3 console URL in the workflow logs${NC}"
echo ""
echo -e "${BLUE}📚 Documentation: GITHUB-AWS-DEPLOYMENT.md${NC}"
echo -e "${BLUE}🔧 GitHub Secrets: https://github.com/$FULL_REPO/settings/secrets/actions${NC}"
echo ""
echo -e "${GREEN}✅ Your Anchor Platform is now connected to GitHub with automated AWS deployment!${NC}"
