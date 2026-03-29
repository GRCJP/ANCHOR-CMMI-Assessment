# Restore Baseline Version - Anchor Platform

This document explains how to restore the application to the stable baseline version (v1.0-baseline) if issues occur.

## 📌 Baseline Information

**Version:** v1.0-baseline  
**Commit:** 7dcb617  
**Date:** March 29, 2026  
**S3 Bucket:** anchor-platform-staging-1774815589  
**CloudFront URL:** https://d2p72makkjzikf.cloudfront.net  

## ✅ What's Included in Baseline

- ✅ Interactive Intake & Scoping forms fully functional
- ✅ Anchor Platform branding applied throughout
- ✅ Navigation to main-dashboard.html working correctly
- ✅ Step numbering corrected (Evidence Collection = Step 1)
- ✅ All sections with tabs and interactive elements restored
- ✅ CSS and JavaScript properly deployed to AWS S3
- ✅ CloudFront distribution configured with correct MIME types
- ✅ Public access permissions configured

## 🔄 Restore from Git

### Option 1: Restore Code Only (Recommended for minor issues)

```bash
# View available tags
git tag -l

# Restore to baseline version
git checkout v1.0-baseline

# Or create a new branch from baseline
git checkout -b restore-from-baseline v1.0-baseline

# If you want to make this the new main
git checkout main
git reset --hard v1.0-baseline
git push origin main --force
```

### Option 2: View Baseline Commit

```bash
# View the baseline commit details
git show v1.0-baseline

# Compare current state with baseline
git diff v1.0-baseline

# View files changed since baseline
git diff --name-only v1.0-baseline
```

## 🌐 Restore AWS Deployment

### Full Redeployment to AWS

If the AWS deployment is broken, redeploy from the baseline:

```bash
# 1. Checkout baseline version
git checkout v1.0-baseline

# 2. Trigger GitHub Actions deployment
gh workflow run deploy.yml --ref main

# Or manually deploy using AWS CLI
aws s3 sync . s3://anchor-platform-staging-1774815589 \
  --exclude ".git/*" \
  --exclude "node_modules/*" \
  --exclude "*.md" \
  --exclude ".github/*"

# 3. Fix content types
aws s3 cp s3://anchor-platform-staging-1774815589/src/css/ \
  s3://anchor-platform-staging-1774815589/src/css/ \
  --recursive --content-type "text/css" --metadata-directive REPLACE

aws s3 cp s3://anchor-platform-staging-1774815589/src/js/ \
  s3://anchor-platform-staging-1774815589/src/js/ \
  --recursive --content-type "application/javascript" --metadata-directive REPLACE

aws s3 cp s3://anchor-platform-staging-1774815589/ \
  s3://anchor-platform-staging-1774815589/ \
  --recursive --exclude "*" --include "*.html" \
  --content-type "text/html" --metadata-directive REPLACE

# 4. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E13LQ3H0WHT1IM \
  --paths "/*"
```

### Quick CloudFront Cache Clear

If only the cache is stale:

```bash
aws cloudfront create-invalidation \
  --distribution-id E13LQ3H0WHT1IM \
  --paths "/*"
```

## 🔧 Troubleshooting

### Issue: CSS/JS Not Loading

**Symptoms:** Page shows unstyled text, no formatting

**Fix:**
```bash
# Re-apply correct content types
aws s3 cp s3://anchor-platform-staging-1774815589/src/css/ \
  s3://anchor-platform-staging-1774815589/src/css/ \
  --recursive --content-type "text/css" --metadata-directive REPLACE

aws s3 cp s3://anchor-platform-staging-1774815589/src/js/ \
  s3://anchor-platform-staging-1774815589/src/js/ \
  --recursive --content-type "application/javascript" --metadata-directive REPLACE

# Clear CloudFront cache
aws cloudfront create-invalidation --distribution-id E13LQ3H0WHT1IM --paths "/*"
```

### Issue: Access Denied Errors

**Symptoms:** XML error message with "Access Denied"

**Fix:**
```bash
# Disable S3 Block Public Access
aws s3api put-public-access-block \
  --bucket anchor-platform-staging-1774815589 \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Apply public read policy
aws s3api put-bucket-policy \
  --bucket anchor-platform-staging-1774815589 \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::anchor-platform-staging-1774815589/*"
    }]
  }'
```

### Issue: CloudFront Pointing to Wrong Bucket

**Fix:**
```bash
# Get current CloudFront config
aws cloudfront get-distribution-config --id E13LQ3H0WHT1IM > /tmp/cf-config.json

# Update the origin (manual edit required)
# Edit /tmp/cf-config.json and change Origins.Items[0].DomainName to:
# "anchor-platform-staging-1774815589.s3.us-east-1.amazonaws.com"

# Apply the updated config
aws cloudfront update-distribution \
  --id E13LQ3H0WHT1IM \
  --distribution-config file:///tmp/cf-config.json \
  --if-match <ETag-from-get-command>
```

## 📋 Baseline File Checklist

Core HTML files:
- ✅ login.html (entry point)
- ✅ main-dashboard.html (agency dashboard)
- ✅ agency-mdot.html (MDOT assessment page)
- ✅ agency-mdh.html
- ✅ agency-msde.html
- ✅ agency-dpscs.html
- ✅ agency-labor.html
- ✅ agency-comptroller.html

CSS files (src/css/):
- ✅ main.css
- ✅ components.css
- ✅ accessibility.css
- ✅ agency.css
- ✅ master-tracker.css

JavaScript files (src/js/):
- ✅ app.js
- ✅ login.js
- ✅ navigation.js
- ✅ data.js
- ✅ agency-assessment.js
- ✅ master-tracker.js
- ✅ aws-auth.js
- ✅ aws-api.js

## 🔗 Quick Links

- **GitHub Repository:** https://github.com/GRCJP/ANCHOR-CMMI-Assessment
- **CloudFront URL:** https://d2p72makkjzikf.cloudfront.net
- **S3 Console:** https://s3.console.aws.amazon.com/s3/bucket/anchor-platform-staging-1774815589
- **CloudFront Console:** https://console.aws.amazon.com/cloudfront/v3/home#/distributions/E13LQ3H0WHT1IM

## 📞 Support Commands

```bash
# View all tags
git tag -l

# View commit history
git log --oneline --graph --all

# Check current branch/commit
git status
git log -1

# List all CloudFront distributions
aws cloudfront list-distributions --query 'DistributionList.Items[*].[Id,DomainName]' --output table

# List S3 buckets
aws s3 ls | grep anchor-platform
```

---

**Last Updated:** March 29, 2026  
**Maintained By:** Anchor Platform Team
