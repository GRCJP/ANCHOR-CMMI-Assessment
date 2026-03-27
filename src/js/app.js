/**
 * Main application controller for Assurit CyberAssess Platform
 * Handles navigation, initialization, and core functionality
 */

class CyberAssessApp {
  constructor() {
    this.currentSection = 'sq';
    this.charts = {};
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAccessibility();
    this.loadInitialSection();
    this.initializeComponents();
  }

  setupEventListeners() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const sectionId = item.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (sectionId) {
          this.showSection(sectionId, item);
        }
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModals();
      }
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
    });

    // Mobile menu toggle
    this.setupMobileMenu();
  }

  setupAccessibility() {
    // Add ARIA labels dynamically
    this.addAriaLabels();
    
    // Setup focus management
    this.setupFocusManagement();
    
    // Setup screen reader announcements
    this.setupScreenReaderAnnouncements();
  }

  addAriaLabels() {
    // Sidebar navigation
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.setAttribute('aria-label', 'Main navigation');
    }

    // Main content area
    const main = document.getElementById('main');
    if (main) {
      main.setAttribute('role', 'main');
    }

    // Sections
    document.querySelectorAll('.section').forEach(section => {
      section.setAttribute('role', 'region');
      section.setAttribute('aria-labelledby', `section-${section.id}-title`);
    });

    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      const sectionId = item.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (sectionId) {
        item.setAttribute('role', 'button');
        item.setAttribute('aria-controls', sectionId);
        item.setAttribute('tabindex', '0');
      }
    });

    // Forms
    document.querySelectorAll('form').forEach(form => {
      form.setAttribute('novalidate', '');
    });

    // Tables
    document.querySelectorAll('table').forEach(table => {
      table.setAttribute('role', 'table');
    });
  }

  setupFocusManagement() {
    // Trap focus in modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal.open');
        if (modal) {
          this.trapFocus(e, modal);
        }
      }
    });
  }

  setupScreenReaderAnnouncements() {
    // Create live region for announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'announcer';
    document.body.appendChild(announcer);
  }

  announce(message) {
    const announcer = document.getElementById('announcer');
    if (announcer) {
      announcer.textContent = message;
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  }

  showSection(id, element) {
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
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.setAttribute('aria-hidden', 'false');
      this.currentSection = id;
    }

    // Update nav item
    if (element) {
      element.classList.add('active');
      element.setAttribute('aria-expanded', 'true');
    }

    // Update page title
    this.updatePageTitle(id);
    
    // Initialize section-specific functionality
    this.initializeSection(id);
    
    // Announce navigation change
    this.announce(`Navigated to ${this.getSectionName(id)}`);
  }

  getSectionName(id) {
    const titles = {
      sq: 'Pre-Assessment Questionnaire',
      s1: 'Intake and Scoping',
      s2: 'NIST CSF Control Mapping',
      s3: 'Evidence Collection',
      s4: 'Risk and CMMI Scoring',
      s5: 'POA and Remediation',
      s6: 'SAR Dashboard',
      s7: 'Agency Master Tracker',
      sp: 'Assessment Pipeline',
      sa: 'Agency Portal',
      sw: 'Workflow Templates',
      settings: 'Settings and Integration',
      sai: 'Agency CSF Intake'
    };
    return titles[id] || id;
  }

  updatePageTitle(id) {
    const titles = {
      sq: 'Pre-Assessment Questionnaire',
      s1: 'ASSESS — Intake & Scoping',
      s2: 'ASSESS — NIST CSF Control Mapping',
      s3: 'NORMALIZE — Evidence Collection',
      s4: 'NORMALIZE — Risk & CMMI Scoring',
      s5: 'CONSOLIDATE — POA&M & Remediation',
      s6: 'REPORT — SAR Dashboard',
      s7: 'OPTIMIZE — Agency Master Tracker',
      sp: '2-Year Assessment Pipeline',
      sa: 'Agency Portal (MDOT View)',
      sw: 'Assessment Configuration',
      settings: 'Settings & Integration',
      sai: 'Agency CSF Intake & Evidence Upload'
    };

    const ctxMap = {
      sa: 'MDOT — Agency Representative View',
      sw: 'Assessment Configuration',
      sp: 'Program Management Office (PMO)'
    };

    const title = titles[id] || id;
    const context = ctxMap[id] || 'Maryland Dept. of Transportation (MDOT)';
    
    const titleElement = document.getElementById('topbar-title');
    if (titleElement) {
      titleElement.innerHTML = `${title}<span>${context}</span>`;
    }

    // Update document title
    document.title = `${title} | Assurit CyberAssess`;
  }

  initializeSection(id) {
    // Initialize charts for specific sections
    switch (id) {
      case 's4':
        setTimeout(() => this.initRiskCharts(), 100);
        break;
      case 's5':
        setTimeout(() => this.initPoamCharts(), 100);
        break;
      case 's6':
        setTimeout(() => this.initSarCharts(), 100);
        break;
      case 's7':
        setTimeout(() => this.initAgencyCharts(), 100);
        break;
      case 'sp':
        setTimeout(() => this.initPipelineCharts(), 100);
        break;
      case 'sai':
        setTimeout(() => this.initSaiPortal(), 100);
        break;
    }
  }

  setupMobileMenu() {
    // Create mobile menu toggle button
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '☰';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    
    // Add toggle to header
    const topbar = document.querySelector('.topbar');
    if (topbar) {
      topbar.insertBefore(toggle, topbar.firstChild);
    }

    // Toggle functionality
    toggle.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isExpanded);
      toggle.innerHTML = isExpanded ? '☰' : '✕';
      
      this.announce(isExpanded ? 'Menu closed' : 'Menu opened');
    });
  }

  handleTabNavigation(e) {
    // Handle tab navigation for accessibility
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  closeModals() {
    document.querySelectorAll('.modal.open').forEach(modal => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  loadInitialSection() {
    // Load the initial section based on URL hash or default
    const hash = window.location.hash.slice(1);
    const initialSection = hash && document.getElementById(hash) ? hash : 'sq';
    
    const navItem = document.querySelector(`.nav-item[onclick*="${initialSection}"]`);
    this.showSection(initialSection, navItem);
  }

  initializeComponents() {
    // Initialize tooltips
    this.initTooltips();
    
    // Initialize dropdowns
    this.initDropdowns();
    
    // Initialize file uploads
    this.initFileUploads();
  }

  initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target);
      });
      
      element.addEventListener('mouseleave', (e) => {
        this.hideTooltip(e.target);
      });
      
      element.addEventListener('focus', (e) => {
        this.showTooltip(e.target);
      });
      
      element.addEventListener('blur', (e) => {
        this.hideTooltip(e.target);
      });
    });
  }

  showTooltip(element) {
    const text = element.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup';
    tooltip.textContent = text;
    tooltip.setAttribute('role', 'tooltip');
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    tooltip.style.transform = 'translateX(-50%)';
    
    element._tooltip = tooltip;
  }

  hideTooltip(element) {
    if (element._tooltip) {
      element._tooltip.remove();
      element._tooltip = null;
    }
  }

  initDropdowns() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (trigger && menu) {
        trigger.addEventListener('click', () => {
          const isOpen = menu.style.display === 'block';
          menu.style.display = isOpen ? 'none' : 'block';
          trigger.setAttribute('aria-expanded', !isOpen);
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target)) {
            menu.style.display = 'none';
            trigger.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }

  initFileUploads() {
    document.querySelectorAll('.upload-zone').forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });
      
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        this.handleFileUpload(e.dataTransfer.files, zone);
      });
      
      zone.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = (e) => this.handleFileUpload(e.target.files, zone);
        input.click();
      });
    });
  }

  handleFileUpload(files, zone) {
    Array.from(files).forEach(file => {
      const uploadItem = this.createUploadItem(file);
      const list = zone.querySelector('.upload-list') || this.createUploadList(zone);
      list.appendChild(uploadItem);
      
      // Simulate upload progress
      this.simulateUpload(uploadItem, file);
    });
  }

  createUploadList(zone) {
    const list = document.createElement('div');
    list.className = 'upload-list';
    zone.appendChild(list);
    return list;
  }

  createUploadItem(file) {
    const item = document.createElement('div');
    item.className = 'upload-item';
    item.innerHTML = `
      <div class="fi-icon">📄</div>
      <div class="fi-name">${file.name}</div>
      <div class="fi-size">${this.formatFileSize(file.size)}</div>
      <span class="badge badge-blue fi-status">Uploading...</span>
    `;
    return item;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  simulateUpload(item, file) {
    setTimeout(() => {
      const status = item.querySelector('.fi-status');
      status.className = 'badge badge-green fi-status';
      status.textContent = 'Uploaded';
      
      this.announce(`File ${file.name} uploaded successfully`);
    }, 1500);
  }

  // Chart initialization methods (to be implemented in chart modules)
  initRiskCharts() {
    console.log('Initializing risk charts...');
  }

  initPoamCharts() {
    console.log('Initializing POA&M charts...');
  }

  initSarCharts() {
    console.log('Initializing SAR charts...');
  }

  initAgencyCharts() {
    console.log('Initializing agency charts...');
  }

  initPipelineCharts() {
    console.log('Initializing pipeline charts...');
  }

  initSaiPortal() {
    console.log('Initializing SAI portal...');
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.cyberAssessApp = new CyberAssessApp();
});

// Export for module usage
export default CyberAssessApp;
