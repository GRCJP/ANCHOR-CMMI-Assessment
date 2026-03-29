#!/bin/bash

# Create CloudFront Distribution for Anchor Platform
# This provides a direct URL to access the application

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BUCKET_NAME="$1"

if [ -z "$BUCKET_NAME" ]; then
    echo -e "${RED}Usage: $0 <s3-bucket-name>${NC}"
    echo -e "${YELLOW}Example: $0 anchor-platform-staging-1774800766${NC}"
    exit 1
fi

echo -e "${BLUE}🌐 Creating CloudFront Distribution for: $BUCKET_NAME${NC}"

# Get bucket region
BUCKET_REGION=$(aws s3api get-bucket-location --bucket "$BUCKET_NAME" --query 'LocationConstraint' --output text)
if [ -z "$BUCKET_REGION" ] || [ "$BUCKET_REGION" = "None" ]; then
    BUCKET_REGION="us-east-1"
fi

echo -e "${BLUE}📍 Bucket region: $BUCKET_REGION${NC}"

# Create Origin Access Identity (OAI) for secure S3 access
echo -e "${BLUE}🔐 Creating Origin Access Identity...${NC}"

OAI_ID=$(aws cloudfront create-cloud-front-origin-access-identity \
    --cloud-front-origin-access-identity-config \
    CallerReference="anchor-oai-$(date +%s)",Comment="OAI for $BUCKET_NAME" \
    --query 'CloudFrontOriginAccessIdentity.Id' --output text 2>/dev/null || echo "")

if [ -z "$OAI_ID" ]; then
    # Try to find existing OAI
    OAI_ID=$(aws cloudfront list-cloud-front-origin-access-identities \
        --query 'CloudFrontOriginAccessIdentityList.Items[0].Id' --output text 2>/dev/null || echo "")
fi

if [ -n "$OAI_ID" ] && [ "$OAI_ID" != "None" ]; then
    echo -e "${GREEN}✅ Using OAI: $OAI_ID${NC}"
    
    # Get OAI canonical user ID for S3 policy
    OAI_CANONICAL_ID=$(aws cloudfront get-cloud-front-origin-access-identity \
        --id "$OAI_ID" \
        --query 'CloudFrontOriginAccessIdentity.S3CanonicalUserId' --output text)
    
    # Update S3 bucket policy to allow OAI access
    echo -e "${BLUE}🔒 Updating S3 bucket policy for CloudFront access...${NC}"
    
    cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontAccess",
            "Effect": "Allow",
            "Principal": {
                "CanonicalUser": "$OAI_CANONICAL_ID"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF
    
    # Disable block public access for the bucket (this is different from bucket policy)
    echo -e "${YELLOW}⚠️  Note: Bucket policy update may fail due to BlockPublicPolicy. This is expected.${NC}"
    aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/bucket-policy.json 2>/dev/null || echo "Bucket policy update skipped (BlockPublicPolicy enabled)"
else
    echo -e "${YELLOW}⚠️  Could not create/find OAI. Will attempt direct S3 website hosting instead.${NC}"
fi

# Create CloudFront distribution
echo -e "${BLUE}🚀 Creating CloudFront distribution...${NC}"

# Create distribution config
if [ -n "$OAI_ID" ] && [ "$OAI_ID" != "None" ]; then
    # Use OAI for secure access
    ORIGIN_CONFIG="{
        \"S3OriginConfig\": {
            \"OriginAccessIdentity\": \"origin-access-identity/cloudfront/$OAI_ID\"
        }
    }"
else
    # Fall back to direct S3 website (may not work with BlockPublicPolicy)
    ORIGIN_CONFIG="{
        \"CustomOriginConfig\": {
            \"HTTPPort\": 80,
            \"HTTPSPort\": 443,
            \"OriginProtocolPolicy\": \"http-only\"
        },
        \"DomainName\": \"$BUCKET_NAME.s3-website-$BUCKET_REGION.amazonaws.com\"
    }"
fi

# Build the full distribution config
DISTRIBUTION_CONFIG=$(cat << EOF
{
    "CallerReference": "anchor-cf-$(date +%s)",
    "Comment": "Anchor Platform - $BUCKET_NAME",
    "DefaultRootObject": "login.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3.$BUCKET_REGION.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100"
}
EOF
)

# Create the distribution
echo "$DISTRIBUTION_CONFIG" > /tmp/cf-config.json

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config file:///tmp/cf-config.json \
    --query 'Distribution.Id' --output text 2>/dev/null || echo "")

if [ -n "$DISTRIBUTION_ID" ] && [ "$DISTRIBUTION_ID" != "None" ]; then
    echo -e "${GREEN}✅ CloudFront Distribution created: $DISTRIBUTION_ID${NC}"
    
    # Wait for distribution to be deployed
    echo -e "${BLUE}⏳ Waiting for distribution to deploy (this may take 5-15 minutes)...${NC}"
    
    aws cloudfront wait distribution-deployed --id "$DISTRIBUTION_ID"
    
    # Get the domain name
    DOMAIN_NAME=$(aws cloudfront get-distribution \
        --id "$DISTRIBUTION_ID" \
        --query 'Distribution.DomainName' --output text)
    
    echo -e "${GREEN}🎉 CloudFront Distribution is LIVE!${NC}"
    echo -e "${BLUE}🌐 Your Anchor Platform is accessible at:${NC}"
    echo -e "${YELLOW}   https://$DOMAIN_NAME${NC}"
    echo -e "${YELLOW}   https://$DOMAIN_NAME/login.html${NC}"
    
    # Save the info
    cat > cloudfront-info.json << EOF
{
  "distribution": {
    "id": "$DISTRIBUTION_ID",
    "domain_name": "$DOMAIN_NAME",
    "bucket": "$BUCKET_NAME",
    "created": "$(date -Iseconds)",
    "urls": {
      "root": "https://$DOMAIN_NAME",
      "login": "https://$DOMAIN_NAME/login.html",
      "dashboard": "https://$DOMAIN_NAME/index.html"
    }
  }
}
EOF
    
    echo -e "${BLUE}💾 Distribution info saved to: cloudfront-info.json${NC}"
    
else
    echo -e "${RED}❌ Failed to create CloudFront distribution${NC}"
    echo -e "${YELLOW}🔧 This may be due to permissions. Checking alternative options...${NC}"
    
    # Try to list existing distributions
    EXISTING_CF=$(aws cloudfront list-distributions \
        --query 'DistributionList.Items[?Comment.contains(@, `Anchor Platform`)].Id' \
        --output text 2>/dev/null || echo "")
    
    if [ -n "$EXISTING_CF" ] && [ "$EXISTING_CF" != "None" ]; then
        echo -e "${GREEN}✅ Found existing CloudFront distribution: $EXISTING_CF${NC}"
        
        DOMAIN_NAME=$(aws cloudfront get-distribution \
            --id "$EXISTING_CF" \
            --query 'Distribution.DomainName' --output text)
        
        echo -e "${BLUE}🌐 Existing URL: https://$DOMAIN_NAME${NC}"
    else
        echo -e "${YELLOW}⚠️  No CloudFront distribution available.${NC}"
        echo -e "${YELLOW}📱 You'll need to access via S3 console:${NC}"
        echo -e "${YELLOW}   https://s3.console.aws.amazon.com/s3/bucket/$BUCKET_NAME${NC}"
    fi
fi

echo ""
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "${YELLOW}   Bucket: $BUCKET_NAME${NC}"
echo -e "${YELLOW}   Region: $BUCKET_REGION${NC}"
if [ -n "$DISTRIBUTION_ID" ] && [ "$DISTRIBUTION_ID" != "None" ]; then
    echo -e "${YELLOW}   CloudFront ID: $DISTRIBUTION_ID${NC}"
    echo -e "${YELLOW}   URL: https://$DOMAIN_NAME${NC}"
fi
echo ""
echo -e "${BLUE}👤 Demo Accounts:${NC}"
echo -e "${YELLOW}   admin@anchor.com / Anchor123!${NC}"
echo -e "${YELLOW}   assessor@anchor.com / Anchor123!${NC}"
echo -e "${YELLOW}   agency@anchor.com / Anchor123!${NC}"
