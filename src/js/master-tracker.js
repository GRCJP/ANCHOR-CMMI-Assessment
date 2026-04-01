/**
 * Master Tracker specific functionality for Anchor Platform
 * Handles agency overview, charts, and navigation to individual assessments
 */

class MasterTracker {
  constructor() {
    this.charts = {};
    this.agencies = this.getAgencyData();
    this.init();
  }

  init() {
    this.initializeCharts();
    this.setupAgencyNavigation();
    this.setupRealTimeUpdates();
    this.initializeFilters();
  }

  getAgencyData() {
    return {
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
        stage: 'Evidence Collection'
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
      }
    };
  }

  initializeCharts() {
    this.initMaturityChart();
    this.initFindingsChart();
    this.initTimelineChart();
    this.initPipelineGantt();
  }

  initMaturityChart() {
    const ctx = document.getElementById('maturityChart');
    if (!ctx) return;

    const maturityData = this.calculateMaturityDistribution();

    this.charts.maturity = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['ML 1\nInitial', 'ML 2\nManaged', 'ML 3\nDefined', 'ML 4\nMeasured', 'ML 5\nOptimizing'],
        datasets: [{
          label: 'Agencies',
          data: maturityData,
          backgroundColor: ['#dc2626', '#ea580c', '#d97706', '#16a34a', '#0d9488'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} agencies`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
            title: {
              display: true,
              text: '# Agencies'
            }
          }
        }
      }
    });
  }

  calculateMaturityDistribution() {
    const distribution = [0, 0, 0, 0, 0];
    
    Object.values(this.agencies).forEach(agency => {
      if (agency.maturity !== null) {
        const level = Math.floor(agency.maturity);
        if (level >= 1 && level <= 5) {
          distribution[level - 1]++;
        }
      }
    });
    
    return distribution;
  }

  initFindingsChart() {
    const ctx = document.getElementById('findingsChart');
    if (!ctx) return;

    const findingsData = this.calculateFindingsByFunction();

    this.charts.findings = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
        datasets: [{
          data: findingsData,
          backgroundColor: [
            '#7c3aed',
            '#2563a8',
            '#16a34a',
            '#d97706',
            '#dc2626',
            '#0d9488'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 8,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed} critical findings`;
              }
            }
          }
        }
      }
    });
  }

  calculateFindingsByFunction() {
    // Simulated findings distribution across NIST functions
    return [3, 2, 4, 1, 2, 0];
  }

  initTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    const timelineData = this.generateTimelineData();

    this.charts.timeline = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: timelineData.labels,
        datasets: [
          {
            label: 'Scheduled Start',
            data: timelineData.starts,
            backgroundColor: '#2563a8',
            borderRadius: 4
          },
          {
            label: 'Target End',
            data: timelineData.ends,
            backgroundColor: '#16a34a',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: false,
            title: {
              display: true,
              text: 'Assessment Timeline (Next 90 Days)'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Assessments'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

  generateTimelineData() {
    // Deterministic demo data representing a realistic 12-week assessment cycle
    const weeks = [
      'Week 1', 'Week 2', 'Week 3', 'Week 4',
      'Week 5', 'Week 6', 'Week 7', 'Week 8',
      'Week 9', 'Week 10', 'Week 11', 'Week 12'
    ];
    // Assessment starts: heavier in early weeks, tapering off
    const starts = [3, 2, 1, 2, 1, 0, 1, 0, 0, 1, 0, 0];
    // Assessment completions: ramp up after initial weeks
    const ends   = [0, 0, 1, 0, 1, 2, 1, 2, 1, 1, 2, 1];

    return { labels: weeks, starts, ends };
  }

  initPipelineGantt() {
    const container = document.getElementById('pipeline-gantt');
    if (!container) return;

    const agencies = Object.entries(this.agencies);
    const totalWeeks = 12;
    
    const ganttHTML = agencies.map(([id, agency]) => {
      if (agency.status === 'Scheduled') return '';
      
      const startWeek = this.getWeekFromDate(agency.started);
      const endWeek = this.getWeekFromDate(agency.targetEnd);
      const duration = endWeek - startWeek;
      
      const left = (startWeek / totalWeeks * 100).toFixed(1);
      const width = (duration / totalWeeks * 100).toFixed(1);
      
      const color = agency.status === 'Complete' ? '#16a34a' : '#2563a8';
      
      return `
        <div class="gantt-row">
          <div class="gantt-label">${agency.name.split(' ')[0]}</div>
          <div class="gantt-bar-wrap">
            <div class="gantt-bar" style="left:${left}%;width:${width}%;background:${color};">
              ${agency.assessor}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="gantt-header">
        <div class="gantt-label-spacer">Agency</div>
        ${Array.from({length: totalWeeks}, (_, i) => 
          `<div class="gantt-week">W${i + 1}</div>`
        ).join('')}
      </div>
      ${ganttHTML}
    `;
  }

  getWeekFromDate(dateString) {
    const date = new Date(dateString);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.floor((date - startOfYear) / (7 * 24 * 60 * 60 * 1000));
    return Math.max(0, weekNumber - 14); // Adjust for current week offset
  }

  setupAgencyNavigation() {
    // Add click handlers to agency links
    document.querySelectorAll('[onclick*="openAgencyAssessment"]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const agencyId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        this.navigateToAgency(agencyId);
      });
    });
  }

  navigateToAgency(agencyId) {
    const agency = this.agencies[agencyId];
    if (!agency) {
      console.error(`Agency ${agencyId} not found`);
      return;
    }

    // Store navigation context
    sessionStorage.setItem('masterTrackerContext', JSON.stringify({
      from: 'master-tracker',
      timestamp: new Date().toISOString()
    }));

    // Navigate to agency assessment
    window.location.href = `agency-${agencyId}.html`;
  }

  setupRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
      this.updateAgencyProgress();
      this.refreshCharts();
    }, 30000);
  }

  updateAgencyProgress() {
    // Simulate progress updates for active assessments
    Object.values(this.agencies).forEach(agency => {
      if (agency.status === 'In Progress' && agency.progress < 100) {
        // Random progress increment
        const increment = Math.random() * 2;
        agency.progress = Math.min(100, agency.progress + increment);
      }
    });

    // Update UI
    this.updateProgressBars();
  }

  updateProgressBars() {
    Object.entries(this.agencies).forEach(([id, agency]) => {
      const progressBar = document.querySelector(`[data-agency="${id}"] .progress-bar`);
      if (progressBar) {
        progressBar.style.width = `${agency.progress}%`;
      }
    });
  }

  refreshCharts() {
    // Update chart data with latest information
    if (this.charts.maturity) {
      this.charts.maturity.data.datasets[0].data = this.calculateMaturityDistribution();
      this.charts.maturity.update();
    }

    if (this.charts.findings) {
      this.charts.findings.data.datasets[0].data = this.calculateFindingsByFunction();
      this.charts.findings.update();
    }
  }

  initializeFilters() {
    // Add filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterType = button.getAttribute('data-filter');
        this.applyFilter(filterType);
      });
    });
  }

  applyFilter(filterType) {
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
      const status = row.querySelector('.status-dot');
      const statusClass = status.className;
      
      let shouldShow = true;
      
      switch (filterType) {
        case 'active':
          shouldShow = statusClass.includes('dot-active');
          break;
        case 'complete':
          shouldShow = statusClass.includes('dot-complete');
          break;
        case 'pending':
          shouldShow = statusClass.includes('dot-pending');
          break;
        case 'all':
        default:
          shouldShow = true;
      }
      
      row.style.display = shouldShow ? '' : 'none';
    });
  }

  // Export functionality
  exportMasterData() {
    const exportData = {
      timestamp: new Date().toISOString(),
      agencies: this.agencies,
      summary: this.generateSummary()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `master-tracker-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  generateSummary() {
    const agencies = Object.values(this.agencies);
    
    return {
      totalAgencies: agencies.length,
      activeAssessments: agencies.filter(a => a.status === 'In Progress').length,
      completedAssessments: agencies.filter(a => a.status === 'Complete').length,
      scheduledAssessments: agencies.filter(a => a.status === 'Scheduled').length,
      averageMaturity: agencies
        .filter(a => a.maturity !== null)
        .reduce((sum, a) => sum + a.maturity, 0) / agencies.filter(a => a.maturity !== null).length,
      totalCriticalFindings: agencies
        .filter(a => a.critical !== null)
        .reduce((sum, a) => sum + a.critical, 0)
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.masterTracker = new MasterTracker();
});
