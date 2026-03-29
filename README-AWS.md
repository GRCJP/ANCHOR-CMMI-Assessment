# CyberAssess Platform - AWS Cloud Implementation

A professional cybersecurity assessment platform deployed on AWS cloud infrastructure, providing authentication, user management, and secure evidence storage for Maryland DoIT agencies.

## 🚀 Quick Start

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 14+ installed

### Installation

1. **Clone and Setup**
```bash
git clone <repository-url>
cd cyberassess-platform
npm install
```

2. **Configure AWS**
```bash
aws configure
# Enter your AWS Access Key ID and Secret Access Key
# Set default region: us-east-1
```

3. **Deploy to AWS**
```bash
npm run deploy
```

4. **Access Your Platform**
- URL: `http://cyberassess-demo.s3-website-us-east-1.amazonaws.com`
- Login with demo accounts below

## 🎯 Demo Accounts

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Administrator** | admin@demo.com | Demo123! | Full system access |
| **Assessor** | assessor@demo.com | Demo123! | Assessment management |
| **Agency Rep** | agency@demo.com | Demo123! | Agency-specific access |

## 🏗️ Architecture

### AWS Services Used
- **S3**: Static website hosting & file storage
- **AWS Cognito**: User authentication & management
- **DynamoDB**: NoSQL database for assessment data
- **Lambda**: Serverless backend functions
- **API Gateway**: REST API endpoints
- **SES**: Email notifications

### Infrastructure Overview
```
Frontend (S3 + CloudFront)
    ↓
API Gateway
    ↓
Lambda Functions (Auth, Data, Upload, Email)
    ↓
DynamoDB (Database) + S3 (File Storage)
```

## 📁 Project Structure

```
cyberassess-platform/
├── login.html                 # Login page
├── index.html                 # Main dashboard
├── agency-*.html             # Agency-specific pages
├── src/
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript modules
│   │   ├── aws-auth.js       # AWS authentication
│   │   ├── aws-api.js        # API integration
│   │   ├── login.js          # Login functionality
│   │   └── app.js            # Main application
├── aws-lambdas/              # Lambda functions
│   ├── auth-lambda/          # Authentication
│   ├── data-lambda/          # Data management
│   ├── upload-lambda/        # File uploads
│   ├── email-lambda/         # Email notifications
│   └── setup-lambda/         # Demo data setup
├── deploy.sh                 # Deployment script
└── package.json              # Project configuration
```

## 🔧 Deployment Commands

### Full Deployment
```bash
npm run deploy              # Deploy everything
npm run deploy-init         # Initialize infrastructure
npm run deploy-lambda       # Deploy Lambda functions
npm run deploy-frontend     # Deploy frontend only
npm run setup-demo          # Setup demo data
```

### Lambda Functions
```bash
npm run package-lambdas     # Package all Lambda functions
npm run package-auth        # Package auth function
npm run package-data        # Package data function
npm run package-upload      # Package upload function
npm run package-email       # Package email function
npm run package-setup       # Package setup function
```

## 🔐 Security Features

### Authentication
- AWS Cognito with secure password policies
- Role-based access control (RBAC)
- JWT token authentication
- Session management

### Data Protection
- Encrypted data transmission (HTTPS)
- Secure file storage with access controls
- Audit logging for all activities
- Input validation and sanitization

### Access Control
- **Admin**: Full system access and user management
- **Assessor**: Assessment creation and management
- **Agency Rep**: Agency-specific data access

## 💰 Cost Optimization

### Free Tier Usage
- **S3**: 5GB storage + 100K requests/month
- **Lambda**: 1M requests/month + 400K GB-sec compute
- **DynamoDB**: 25GB storage + 25 RCUs/WCUs
- **Cognito**: 50K MAU free
- **SES**: 62K emails/month (verified domain)

### Estimated Monthly Cost
- **Demo Usage**: $0-5 (well within free tier)
- **Production**: $15-50 (based on usage)

## 📊 Features

### Core Functionality
- ✅ **User Authentication** - Secure login with AWS Cognito
- ✅ **Assessment Management** - Create and track cybersecurity assessments
- ✅ **Evidence Collection** - Secure file upload and management
- ✅ **Risk Scoring** - CMMI maturity assessment
- ✅ **Reporting** - SAR generation and dashboard
- ✅ **Email Notifications** - Automated alerts and reminders

### Assessment Framework
- **NIST CSF 2.0** - Cybersecurity framework alignment
- **CMMI** - Capability maturity model integration
- **ANCHOR Framework** - Maryland DoIT assessment methodology
- **Evidence-based** - Documented assessment approach

### User Experience
- **Responsive Design** - Works on desktop and mobile
- **Accessibility** - WCAG 2.1 AA compliant
- **Real-time Updates** - Live progress tracking
- **Professional UI** - Modern, intuitive interface

## 🛠️ Configuration

### Environment Variables
```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# AWS Resources
S3_BUCKET=cyberassess-demo
EVIDENCE_BUCKET=cyberassess-evidence
DYNAMODB_TABLE=cyberassess-data
COGNITO_USER_POOL=cyberassess-users

# Email Configuration
EMAIL_FROM=noreply@cyberassess.com
```

### Customization
- Modify `package.json` for AWS resource names
- Update demo users in `deploy.sh`
- Customize branding in CSS files
- Configure assessment templates

## 🧪 Testing

### Local Development
```bash
npm start                 # Start local server
# Access at http://localhost:8080/login.html
```

### Testing Demo Accounts
1. Login with any demo account
2. Navigate through assessment workflows
3. Test file upload functionality
4. Verify role-based access controls

## 📈 Monitoring

### AWS CloudWatch
- Lambda function metrics
- API Gateway request tracking
- S3 access logs
- DynamoDB performance metrics

### Cost Monitoring
```bash
# Check current month costs
aws ce get-cost-and-usage --time-period Start=$(date -d 'first day of last month' -I),End=$(date -I) --granularity MONTHLY --metrics BlendedCost
```

## 🔄 Maintenance

### Regular Tasks
- **Weekly**: Review usage and costs
- **Monthly**: Update demo data, check security patches
- **Quarterly**: Review access logs, update dependencies

### Backup and Recovery
- DynamoDB automatic backups enabled
- S3 versioning for file storage
- Lambda function versioning
- Infrastructure as Code (IaC) for reproducibility

## 🤝 Support

### Troubleshooting
1. **Login Issues**: Check Cognito user pool configuration
2. **File Upload**: Verify S3 bucket permissions
3. **Data Loading**: Check DynamoDB table access
4. **Email Delivery**: Verify SES domain verification

### Common Issues
- **CORS Errors**: Update API Gateway CORS configuration
- **Permission Denied**: Check IAM role permissions
- **Timeout Errors**: Increase Lambda function timeout
- **Storage Full**: Monitor S3 bucket usage

## 📝 Development

### Adding New Features
1. Create Lambda function in `aws-lambdas/`
2. Update API Gateway endpoints
3. Add frontend integration in `src/js/`
4. Test with demo accounts

### Code Standards
- Use ES6+ JavaScript
- Follow accessibility guidelines
- Implement proper error handling
- Add comprehensive logging

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Additional Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
- [NIST CSF 2.0](https://csrc.nist.gov/publications/detail/sp/800-53/5-1-1/rev-5)
- [CMMI Institute](https://cmmiinstitute.com/)
- [Maryland DoIT](https://doit.maryland.gov/)

---

**Platform Version**: 2.4.1  
**Last Updated**: 2026-03-29  
**Infrastructure**: AWS Cloud (Free Tier Optimized)
