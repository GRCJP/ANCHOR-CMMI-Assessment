# Anchor Platform - GitHub to AWS Deployment Guide

This guide shows how to set up automated deployment from GitHub to AWS for the Anchor Platform.

## 🚀 Overview

The deployment pipeline automatically:
- ✅ Tests and validates your code changes
- ✅ Deploys to staging (develop branch) or production (main branch)
- ✅ Uploads Lambda functions for backend deployment
- ✅ Creates unique S3 buckets for each deployment
- ✅ Tracks deployment metadata
- ✅ Cleans up old deployments

## 📋 Prerequisites

### 1. GitHub Repository Setup
- Your code should be in a GitHub repository
- Create these branches: `main` (production) and `develop` (staging)
- Ensure your repository has the proper file structure

### 2. AWS Account Setup
- AWS CLI configured with appropriate permissions
- S3 bucket creation permissions
- Lambda function deployment permissions (if using backend)

### 3. GitHub Secrets Configuration
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

#### Required AWS Credentials:
```
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
```

#### Optional: For Lambda Deployment
```
LAMBDA_EXECUTION_ROLE_ARN=arn:aws:iam::account:role/your-lambda-role
```

## 🔧 Setup Instructions

### Step 1: Configure GitHub Actions

1. The workflow file is already created at `.github/workflows/deploy.yml`
2. Push your code to GitHub to trigger the first deployment

### Step 2: Set Up Branch Protection (Recommended)

```bash
# Protect main branch
git checkout main
git branch --merged main
git branch -d develop  # if exists
git checkout -b develop
git push -u origin develop
git checkout main
```

### Step 3: Test the Pipeline

1. **Staging Deployment** (push to `develop` branch):
```bash
git checkout develop
git add .
git commit -m "Update staging deployment"
git push origin develop
```

2. **Production Deployment** (push to `main` branch):
```bash
git checkout main
git merge develop
git push origin main
```

## 📊 Deployment Process

### Automatic Triggers

| Event | Branch | Environment | Action |
|-------|--------|-------------|--------|
| Push | `develop` | Staging | Deploy to staging S3 bucket |
| Push | `main` | Production | Deploy to production S3 bucket |
| Pull Request | `main` | - | Run tests only |
| Manual | Any | Selected | Deploy to selected environment |

### Deployment Steps

1. **Code Validation**
   - HTML validation
   - CSS syntax checking
   - JavaScript syntax checking

2. **S3 Deployment**
   - Create unique bucket with timestamp
   - Upload all frontend files
   - Set correct content types
   - Upload Lambda function packages

3. **Metadata Tracking**
   - Save deployment information
   - Create GitHub deployment record
   - Track commit and branch information

## 🌐 Accessing Deployed Applications

### Staging Environment
- URL: `https://s3.console.aws.amazon.com/s3/bucket/anchor-platform-staging-{timestamp}`
- Access: Open S3 console → Navigate to bucket → Open `login.html`

### Production Environment
- URL: `https://s3.console.aws.amazon.com/s3/bucket/anchor-platform-prod-{timestamp}`
- Access: Same as staging but with production data

## 🔍 Monitoring Deployments

### GitHub Actions Dashboard
- Go to your repository → Actions tab
- See real-time deployment progress
- View logs and error messages

### Deployment Metadata
Each deployment creates a `deployment-info.json` file with:
```json
{
  "deployment": {
    "commit": "abc123...",
    "branch": "main",
    "timestamp": "2026-03-29T12:00:00Z",
    "bucket": "anchor-platform-prod-1234567890",
    "url": "https://s3.console.aws.amazon.com/s3/bucket/anchor-platform-prod-1234567890",
    "environment": "production",
    "actor": "username",
    "version": "2.4.1"
  }
}
```

## 🔄 Development Workflow

### Daily Development
```bash
# Work on feature branch
git checkout -b feature/new-feature
# Make changes...
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Create pull request to develop
# Tests run automatically
# Merge to develop triggers staging deployment
```

### Production Release
```bash
# Merge develop to main
git checkout main
git merge develop
git push origin main

# Triggers production deployment
```

## 🧹 Cleanup and Maintenance

### Automatic Cleanup
- Production deployments keep only the latest 3 buckets
- Old buckets are automatically deleted
- Lambda packages are cleaned up with old deployments

### Manual Cleanup
```bash
# List all Anchor Platform buckets
aws s3 ls | grep "anchor-platform"

# Delete specific bucket (be careful!)
aws s3 rb s3://bucket-name --force
```

## 📧 Lambda Function Deployment

The pipeline packages Lambda functions but doesn't deploy them automatically (due to AWS permissions). Manual deployment steps:

1. **Download Lambda packages** from S3 bucket
2. **Deploy using AWS CLI**:
```bash
aws lambda update-function-code \
  --function-name anchor-auth \
  --zip-file fileb://auth-lambda.zip

aws lambda update-function-code \
  --function-name anchor-data \
  --zip-file fileb://data-lambda.zip
```

## 🔐 Security Considerations

### GitHub Secrets
- Never commit AWS credentials to repository
- Use GitHub Secrets for sensitive data
- Rotate keys regularly

### AWS Permissions
- Principle of least privilege
- Separate IAM roles for different environments
- Monitor access logs

### Branch Protection
- Protect main branch from direct pushes
- Require pull requests for production changes
- Enable required status checks

## 🚨 Troubleshooting

### Common Issues

#### 1. AWS Credentials Error
```
Error: Unable to locate credentials
```
**Solution**: Check GitHub Secrets configuration

#### 2. S3 Bucket Already Exists
```
Error: BucketAlreadyExists
```
**Solution**: Pipeline creates unique buckets with timestamps

#### 3. Lambda Deployment Fails
```
Error: AccessDenied
```
**Solution**: Check IAM permissions for Lambda functions

#### 4. HTML Validation Fails
```
Error: HTML validation failed
```
**Solution**: Fix HTML syntax errors before pushing

### Debugging Steps

1. **Check GitHub Actions logs**
2. **Verify AWS credentials in GitHub Secrets**
3. **Test AWS CLI locally**: `aws s3 ls`
4. **Check file permissions and syntax**
5. **Review deployment metadata in S3 bucket**

## 📈 Best Practices

### Development
- Use feature branches for new features
- Commit frequently with descriptive messages
- Test locally before pushing

### Deployment
- Use staging environment for testing
- Review changes before production deployment
- Monitor deployment success/failure

### Security
- Rotate AWS credentials regularly
- Use different credentials for different environments
- Monitor AWS CloudTrail logs

### Performance
- Optimize file sizes before deployment
- Use appropriate content types
- Monitor S3 storage costs

## 🎯 Next Steps

1. **Set up GitHub Secrets** with your AWS credentials
2. **Push to develop branch** to test staging deployment
3. **Review staging deployment** in S3 console
4. **Merge to main** for production deployment
5. **Monitor deployment** in GitHub Actions

Your Anchor Platform is now ready for automated GitHub-to-AWS deployment! 🚀
