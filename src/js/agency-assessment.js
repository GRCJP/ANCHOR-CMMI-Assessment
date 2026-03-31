/**
 * Agency Assessment specific functionality
 * Handles individual agency assessment workflows and data management
 */

class AgencyAssessment {
  constructor() {
    this.agencyId = this.getCurrentAgency();
    this.agencyData = this.getAgencyData();
    this.charts = {};
    this.init();
  }

  getCurrentAgency() {
    // Extract agency ID from current page or URL
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '');
    
    if (pageName.startsWith('agency-')) {
      return pageName.replace('agency-', '');
    }
    
    // Fallback to session storage
    return sessionStorage.getItem('currentAgency') || 'mdot';
  }

  getAgencyData() {
    const agencies = {
      mdot: {
        name: 'Maryland Dept. of Transportation (MDOT)',
        status: 'In Progress',
        assessor: 'J. Williams',
        started: '2026-04-07',
        targetEnd: '2026-05-19',
        maturity: 2.5,
        critical: 4,
        progress: 65,
        complexity: 'High',
        stage: 'Evidence Collection',
        questionnaire: {
          complexityScore: 46,
          podAssignment: 'Large',
          agencySize: 'Large (500+)',
          itComplexity: 'Complex (multi-site + cloud)',
          cloudEnvironments: ['AWS GovCloud', 'Azure Government'],
          otIcs: 'Yes - limited interfaces',
          sensitiveData: ['PII', 'Financial'],
          mfaCoverage: 'Partial',
          siemDeployed: false,
          irPlanTested: false,
          selfAssessedCmmi: 2
        },
        stages: {
          questionnaire: { completed: true, progress: 100 },
          intake: { completed: true, progress: 100 },
          mapping: { completed: true, progress: 100 },
          evidence: { completed: false, progress: 65 },
          risk: { completed: false, progress: 0 },
          poam: { completed: false, progress: 0 },
          sar: { completed: false, progress: 0 }
        },
        findings: [
          {
            id: 'F-001',
            title: 'No SIEM/continuous monitoring',
            function: 'DETECT',
            severity: 'Critical',
            status: 'In Progress',
            description: 'Real-time threat visibility is critical for MDOT operations'
          },
          {
            id: 'F-002',
            title: 'MFA not enforced for privileged accounts',
            function: 'PROTECT',
            severity: 'Critical',
            status: 'In Progress',
            description: 'Credential compromise could expose entire infrastructure'
          },
          {
            id: 'F-003',
            title: '40% asset inventory gap',
            function: 'IDENTIFY',
            severity: 'Critical',
            status: 'Open',
            description: 'Unknown attack surface creates unmanaged risk'
          },
          {
            id: 'F-004',
            title: 'IR Plan not tested since 2022',
            function: 'RESPOND',
            severity: 'Critical',
            status: 'Addressed',
            description: 'Unproven recovery ability for ransomware events'
          }
        ],
        evidence: {
          total: 58,
          collected: 38,
          pending: 20
        },
        maturity: {
          govern: 2.4,
          identify: 2.8,
          protect: 3.1,
          detect: 2.2,
          respond: 2.6,
          recover: 2.0
        }
      },
      mdh: {
        name: 'Maryland Dept. of Health (MDH)',
        status: 'In Progress',
        assessor: 'S. Patel',
        started: '2026-04-14',
        targetEnd: '2026-05-26',
        maturity: 2.8,
        critical: 2,
        progress: 45,
        complexity: 'High',
        stage: 'Risk Assessment'
      },
      msde: {
        name: 'Maryland Dept. of Education (MSDE)',
        status: 'Complete',
        assessor: 'J. Williams',
        started: '2026-02-03',
        targetEnd: '2026-03-17',
        maturity: 3.1,
        critical: 1,
        progress: 100,
        complexity: 'Medium',
        stage: 'SAR Delivered'
      },
      dpscs: {
        name: 'Dept. of Public Safety & Corr. Services',
        status: 'In Progress',
        assessor: 'R. Okafor',
        started: '2026-04-21',
        targetEnd: '2026-06-02',
        maturity: 2.3,
        critical: 6,
        progress: 30,
        complexity: 'Very High',
        stage: 'Intake & Scoping'
      },
      labor: {
        name: 'Maryland Dept. of Labor',
        status: 'Scheduled',
        assessor: 'T. Adams',
        started: '2026-05-05',
        targetEnd: '2026-06-16',
        maturity: null,
        critical: null,
        progress: 0,
        complexity: 'Medium',
        stage: 'Scheduled'
      },
      comptroller: {
        name: 'Office of the Comptroller',
        status: 'Scheduled',
        assessor: 'J. Williams',
        started: '2026-05-12',
        targetEnd: '2026-06-23',
        maturity: null,
        critical: null,
        progress: 0,
        complexity: 'Medium',
        stage: 'Scheduled'
      }
    };

    return agencies[this.agencyId] || agencies.mdot;
  }

  init() {
    this.updatePageTitle();
    this.initializeCharts();
    this.setupNavigation();
    this.setupActivityTracking();
    this.loadAgencyData();
  }

  updatePageTitle() {
    const titleElement = document.getElementById('topbar-title');
    if (titleElement) {
      titleElement.innerHTML = `${this.agencyData.name} Assessment<span>Current Stage: ${this.agencyData.stage}</span>`;
    }

    document.title = `${this.agencyData.name} Assessment | Anchor Platform`;
  }

  initializeCharts() {
    this.initMaturityRadarChart();
    this.initProgressChart();
    this.initTimelineChart();
  }

  initMaturityRadarChart() {
    const ctx = document.getElementById('maturityRadarChart');
    if (!ctx || !this.agencyData.maturity) return;

    const maturity = this.agencyData.maturity;
    
    this.charts.maturity = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
        datasets: [
          {
            label: 'Current',
            data: [maturity.govern, maturity.identify, maturity.protect, maturity.detect, maturity.respond, maturity.recover],
            backgroundColor: 'rgba(37, 99, 168, 0.15)',
            borderColor: '#2563a8',
            pointBackgroundColor: '#2563a8',
            borderWidth: 2
          },
          {
            label: 'Target',
            data: [4, 3, 4, 4, 3, 3],
            backgroundColor: 'rgba(39, 174, 96, 0.1)',
            borderColor: '#27ae60',
            borderDash: [5, 4],
            pointBackgroundColor: '#27ae60',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1
            },
            pointLabels: {
              font: {
                size: 11
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  initProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;

    const stages = this.agencyData.stages;
    const stageNames = Object.keys(stages);
    const progressData = stageNames.map(stage => stages[stage].progress);

    this.charts.progress = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Questionnaire', 'Intake', 'Mapping', 'Evidence', 'Risk', 'POA&M', 'SAR'],
        datasets: [{
          label: 'Progress %',
          data: progressData,
          backgroundColor: progressData.map(p => p === 100 ? '#16a34a' : p > 0 ? '#2563a8' : '#e5e7eb'),
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  initTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    const startDate = new Date(this.agencyData.started);
    const targetDate = new Date(this.agencyData.targetEnd);
    const currentDate = new Date();
    
    const totalDays = Math.ceil((targetDate - startDate) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, totalDays - daysElapsed);

    this.charts.timeline = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Assessment Timeline'],
        datasets: [
          {
            label: 'Days Elapsed',
            data: [daysElapsed],
            backgroundColor: '#2563a8',
            borderRadius: 4
          },
          {
            label: 'Days Remaining',
            data: [daysRemaining],
            backgroundColor: '#e5e7eb',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  setupNavigation() {
    // Add back to master tracker functionality
    const backButtons = document.querySelectorAll('[onclick*="goToMasterTracker"]');
    backButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.goToMasterTracker();
      });
    });

    // Setup section navigation
    this.setupSectionNavigation();
  }

  setupSectionNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const sectionId = this.getSectionFromNavItem(item);
        if (sectionId) {
          this.navigateToSection(sectionId, item);
        }
      });

      // Keyboard navigation
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  }

  getSectionFromNavItem(item) {
    const onclick = item.getAttribute('onclick');
    if (onclick) {
      const match = onclick.match(/'([^']+)'/);
      return match ? match[1] : null;
    }
    return null;
  }

  navigateToSection(sectionId, element) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
      section.setAttribute('aria-hidden', 'true');
    });

    // Remove active state from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-expanded', 'false');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.setAttribute('aria-hidden', 'false');
    }

    // Update nav item
    if (element) {
      element.classList.add('active');
      element.setAttribute('aria-expanded', 'true');
    }

    // Update page title
    this.updateSectionTitle(sectionId);
    
    // Initialize section-specific functionality
    this.initializeSection(sectionId);
  }

  updateSectionTitle(sectionId) {
    const titles = {
      overview: 'Assessment Dashboard',
      questionnaire: 'Pre-Assessment Questionnaire',
      intake: 'Intake & Scoping',
      mapping: 'NIST CSF Mapping',
      evidence: 'Evidence Collection',
      risk: 'Risk & CMMI Scoring',
      poam: 'POA&M Remediation',
      sar: 'SAR Dashboard'
    };

    const title = titles[sectionId] || 'Assessment';
    const titleElement = document.getElementById('topbar-title');
    if (titleElement) {
      titleElement.innerHTML = `${title} - ${this.agencyData.name}<span>Current Stage: ${this.agencyData.stage}</span>`;
    }
  }

  initializeSection(sectionId) {
    // Initialize section-specific charts or functionality
    switch (sectionId) {
      case 'evidence':
        this.initializeEvidenceSection();
        break;
      case 'risk':
        this.initializeRiskSection();
        break;
      case 'poam':
        this.initializePoamSection();
        break;
      case 'sar':
        this.initializeSarSection();
        break;
    }
  }

  initializeEvidenceSection() {
    // Evidence data is rendered in static HTML; no dynamic load needed
    console.log('Evidence section initialized');
  }

  initializeRiskSection() {
    // Charts are initialized via initAgencyCharts() on page load
    console.log('Risk section initialized');
  }

  initializePoamSection() {
    // POA&M data is rendered in static HTML
    console.log('POA&M section initialized');
  }

  initializeSarSection() {
    // SAR charts are initialized via initAgencyCharts() on page load
    console.log('SAR section initialized');
  }

  setupActivityTracking() {
    // Track user activities for audit trail
    this.logActivity('Page loaded', 'overview');
  }

  logActivity(action, section) {
    const activity = {
      timestamp: new Date().toISOString(),
      action: action,
      section: section,
      user: (window.anchorAuth && window.anchorAuth.getSession()?.name) || 'Unknown',
      agencyId: this.agencyId
    };

    // Store activity (in real app, would send to server)
    console.log('Activity logged:', activity);
  }

  loadAgencyData() {
    // Load agency-specific data from storage or API
    this.updateAgencyUI();
  }

  updateAgencyUI() {
    // Update UI elements with agency data
    this.updateProgressIndicators();
    this.updateFindingsList();
    this.updateEvidenceCount();
  }

  updateProgressIndicators() {
    // Update progress bars and indicators
    const progressElements = document.querySelectorAll('[data-progress]');
    progressElements.forEach(element => {
      const progress = this.agencyData.progress;
      element.style.width = `${progress}%`;
      element.setAttribute('aria-valuenow', progress);
    });
  }

  updateFindingsList() {
    // Update findings table
    if (this.agencyData.findings) {
      this.renderFindingsTable(this.agencyData.findings);
    }
  }

  renderFindingsTable(findings) {
    const tableBody = document.querySelector('#findings-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = findings.map(finding => `
      <tr>
        <td>${finding.id}</td>
        <td>${finding.title}</td>
        <td><span class="fn-tag fn-${finding.function.toLowerCase()}">${finding.function}</span></td>
        <td><span class="badge badge-${this.getSeverityClass(finding.severity)}">${finding.severity}</span></td>
        <td><span class="badge badge-${this.getStatusClass(finding.status)}">${finding.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="viewFinding('${finding.id}')">View</button>
        </td>
      </tr>
    `).join('');
  }

  getSeverityClass(severity) {
    switch (severity) {
      case 'Critical': return 'red';
      case 'High': return 'orange';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'gray';
    }
  }

  getStatusClass(status) {
    switch (status) {
      case 'Open': return 'red';
      case 'In Progress': return 'orange';
      case 'Addressed': return 'green';
      case 'Closed': return 'green';
      default: return 'gray';
    }
  }

  updateEvidenceCount() {
    // Update evidence collection counts
    if (this.agencyData.evidence) {
      const collectedElement = document.querySelector('[data-evidence-collected]');
      const totalElement = document.querySelector('[data-evidence-total]');
      
      if (collectedElement) {
        collectedElement.textContent = this.agencyData.evidence.collected;
      }
      if (totalElement) {
        totalElement.textContent = this.agencyData.evidence.total;
      }
    }
  }

  goToMasterTracker() {
    // Store current assessment state
    sessionStorage.setItem('lastAssessment', JSON.stringify({
      agencyId: this.agencyId,
      timestamp: new Date().toISOString(),
      progress: this.agencyData.progress
    }));

    // Navigate back to master tracker
    window.location.href = 'main-dashboard.html';
  }

  // Data management methods
  saveAssessmentProgress() {
    const assessmentData = {
      agencyId: this.agencyId,
      data: this.agencyData,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage (in real app, would save to server)
    localStorage.setItem(`assessment_${this.agencyId}`, JSON.stringify(assessmentData));
  }

  exportAssessmentData() {
    const exportData = {
      agency: this.agencyData,
      timestamp: new Date().toISOString(),
      exportedBy: (window.anchorAuth && window.anchorAuth.getSession()?.name) || 'Unknown'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.agencyId}-assessment-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.agencyAssessment = new AgencyAssessment();
});
