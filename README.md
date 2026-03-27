# Assurit CyberAssess Platform

Maryland DoIT Cybersecurity Assessment Platform implementing the ANCHOR Framework for statewide cybersecurity assessments across ~90 agencies.

## Overview

This platform provides a comprehensive cybersecurity assessment tool that combines NIST CSF 2.0, CMMI maturity scoring, and the ANCHOR Framework methodology to standardize and streamline security assessments across Maryland state agencies.

## Features

### Core Assessment Workflow
- **Pre-Assessment Questionnaire** - Automated scoring and pod assignment
- **Agency Intake & Scoping** - Structured data collection and assessment setup
- **NIST CSF Control Mapping** - Comprehensive control framework alignment
- **Evidence Collection** - Document management and review workflow
- **Risk & CMMI Scoring** - Automated risk assessment and maturity modeling
- **POA&M Remediation** - Plan of Action and Milestones tracking
- **SAR Dashboard** - Security Assessment Reporting
- **Agency Master Tracker** - Statewide assessment oversight

### Agency-Facing Capabilities
- **CSF Intake Portal** - Self-service evidence submission
- **Real-time Scoring** - Live maturity assessment feedback
- **Document Upload** - Secure evidence management
- **Progress Tracking** - Transparent assessment status

### Management Features
- **2-Year Pipeline** - Strategic assessment scheduling
- **Workflow Templates** - Standardized assessment processes
- **Resource Management** - Pod assignment and capacity planning
- **Reporting & Analytics** - Comprehensive dashboards and insights

## Technology Stack

### Frontend
- **HTML5** - Semantic, accessible markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript ES6+** - Modular, component-based architecture
- **Chart.js** - Interactive data visualization

### Accessibility
- **WCAG 2.1 AA** compliance
- **ARIA** labels and landmarks
- **Keyboard navigation** support
- **Screen reader** optimization
- **High contrast** mode support

### Architecture
- **Modular CSS** - Separated concerns (main, components, accessibility)
- **Component-based JS** - Reusable, maintainable code
- **Local storage** - Client-side data persistence
- **Responsive design** - Mobile-first approach

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GRCJP/Sample-ANCHOR-CMMI-Assessment.git
cd Sample-ANCHOR-CMMI-Assessment
```

2. Start a local development server:
```bash
# Using Python (built-in)
python -m http.server 8080

# Or using Node.js (if installed)
npx http-server -p 8080

# Or using the provided script
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

### File Structure

```
├── index-new.html          # Main application entry point
├── index.html              # Original single-file version
├── package.json            # Project configuration
├── README.md               # This file
├── src/
│   ├── css/
│   │   ├── main.css        # Core layout and design
│   │   ├── components.css  # UI components
│   │   └── accessibility.css # Accessibility enhancements
│   └── js/
│       ├── app.js          # Main application controller
│       ├── navigation.js   # Navigation management
│       └── data.js         # Data management and persistence
└── assets/                 # Static assets (images, icons, etc.)
```

## Usage

### Navigation
- **Sidebar Navigation** - Main section navigation
- **Keyboard Shortcuts**:
  - `Alt + 1-9` - Quick section navigation
  - `Alt + ←/→` - Previous/next section
  - `Alt + Home/End` - First/last section
  - `Ctrl + /` - Show help
  - `Tab` - Navigate interactive elements
  - `Esc` - Close modals

### Assessment Workflow
1. **Pre-Assessment** - Complete agency questionnaire
2. **Intake** - Define scope and collect basic information
3. **Mapping** - Align controls with NIST CSF
4. **Evidence Collection** - Gather and review documentation
5. **Scoring** - Assess risk and maturity levels
6. **Remediation** - Create and track POA&M items
7. **Reporting** - Generate comprehensive SAR

### Data Management
- **Auto-save** - Data automatically saved every 30 seconds
- **Export** - JSON and CSV export functionality
- **Import** - Data import from previous assessments
- **Validation** - Real-time data validation and error reporting

## Accessibility

This platform is designed to be fully accessible:

- **Semantic HTML** - Proper use of headings, landmarks, and roles
- **ARIA Labels** - Comprehensive screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Logical focus flow and trapping
- **High Contrast** - Support for high contrast mode
- **Reduced Motion** - Respects user's motion preferences
- **Screen Reader** - Optimized for assistive technologies

### Testing Accessibility
```bash
npm run test  # Run accessibility tests
```

## Configuration

### Customization
- **Agency Information** - Update agency details in data.js
- **Scoring Weights** - Modify questionnaire scoring in data.js
- **Color Scheme** - Update CSS variables in main.css
- **Assessment Framework** - Configure NIST CSF mappings

### Environment Variables
Create a `.env` file for environment-specific settings:
```env
APP_TITLE=Assurit CyberAssess
AGENCY_NAME=Maryland Department of Transportation
FRAMEWORK_VERSION=NIST CSF 2.0
```

## Development

### Code Style
- **ES6+ JavaScript** - Modern JavaScript features
- **Modular CSS** - Organized, maintainable styles
- **Semantic HTML** - Accessible, meaningful markup
- **Component Architecture** - Reusable, testable components

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Testing
```bash
npm run test        # Run accessibility tests
npm run lint        # Check code style
npm run validate    # Validate HTML and accessibility
```

## Security

### Data Protection
- **Client-side Storage** - Data stored in browser localStorage
- **No Server Storage** - No data transmitted to external servers
- **Secure Upload** - File upload validation and sanitization
- **Input Validation** - Comprehensive input sanitization

### Best Practices
- **HTTPS** - Use secure connections in production
- **Content Security Policy** - Implement CSP headers
- **Regular Updates** - Keep dependencies updated
- **Security Testing** - Regular security assessments

## Support

### Documentation
- **User Guide** - Comprehensive user documentation
- **Developer Guide** - Technical documentation
- **API Reference** - JavaScript API documentation

### Contact
- **Support Email** - support@assurit.com
- **Documentation** - https://docs.assurit.com
- **Issues** - GitHub Issues for bug reports

## License

MIT License - see LICENSE file for details.

## Version History

### v1.0.0 (Current)
- Initial release
- Full ANCHOR Framework implementation
- Complete accessibility compliance
- Comprehensive assessment workflow

### Planned Features
- **Multi-language Support** - Internationalization
- **Advanced Analytics** - Enhanced reporting capabilities
- **Integration APIs** - External system integration
- **Mobile App** - Native mobile applications

---

**Assurit CyberAssess Platform** - Transforming cybersecurity assessment through standardization, accessibility, and innovation.
