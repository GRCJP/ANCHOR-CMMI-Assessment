/**
 * Navigation module for Assurit CyberAssess Platform
 * Handles all navigation-related functionality
 */

class NavigationManager {
  constructor(app) {
    this.app = app;
    this.currentSection = 'sq';
    this.sectionHistory = [];
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupBreadcrumbs();
    this.setupQuickNavigation();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Alt + number keys for quick navigation
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        this.quickNavigate(parseInt(e.key));
      }

      // Ctrl + / for help
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        this.showNavigationHelp();
      }

      // Alt + Arrow keys for section navigation
      if (e.altKey) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.navigateToPreviousSection();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.navigateToNextSection();
            break;
          case 'Home':
            e.preventDefault();
            this.navigateToSection('sq');
            break;
          case 'End':
            e.preventDefault();
            this.navigateToSection('settings');
            break;
        }
      }
    });
  }

  setupBreadcrumbs() {
    // Create breadcrumb navigation
    const breadcrumbContainer = document.createElement('nav');
    breadcrumbContainer.className = 'breadcrumb-nav';
    breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb navigation');
    
    const topbar = document.querySelector('.topbar');
    if (topbar) {
      topbar.appendChild(breadcrumbContainer);
    }
    
    this.updateBreadcrumbs();
  }

  updateBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb-nav');
    if (!breadcrumbContainer) return;

    const breadcrumbData = this.getBreadcrumbData();
    const breadcrumbs = breadcrumbData.map((item, index) => {
      const isLast = index === breadcrumbData.length - 1;
      const element = document.createElement(isLast ? 'span' : 'a');
      element.textContent = item.label;
      
      if (!isLast) {
        element.href = `#${item.id}`;
        element.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigateToSection(item.id);
        });
        element.setAttribute('aria-label', `Navigate to ${item.label}`);
      } else {
        element.setAttribute('aria-current', 'page');
      }
      
      return element;
    });

    breadcrumbContainer.innerHTML = '';
    breadcrumbs.forEach((crumb, index) => {
      breadcrumbContainer.appendChild(crumb);
      if (index < breadcrumbs.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = ' / ';
        separator.setAttribute('aria-hidden', 'true');
        breadcrumbContainer.appendChild(separator);
      }
    });
  }

  getBreadcrumbData() {
    const sectionMap = {
      sq: { label: 'Pre-Assessment', parent: null },
      s1: { label: 'Intake & Scoping', parent: 'sq' },
      s2: { label: 'NIST CSF Mapping', parent: 's1' },
      s3: { label: 'Evidence Collection', parent: 's2' },
      s4: { label: 'Risk & CMMI Scoring', parent: 's3' },
      s5: { label: 'POA&M Remediation', parent: 's4' },
      s6: { label: 'SAR Dashboard', parent: 's5' },
      s7: { label: 'Agency Tracker', parent: 's6' },
      sp: { label: 'Pipeline', parent: null },
      sa: { label: 'Agency Portal', parent: null },
      sw: { label: 'Workflows', parent: null },
      settings: { label: 'Settings', parent: null },
      sai: { label: 'CSF Intake', parent: null }
    };

    const breadcrumbs = [];
    let currentId = this.currentSection;

    while (currentId && sectionMap[currentId]) {
      const section = sectionMap[currentId];
      breadcrumbs.unshift({ id: currentId, label: section.label });
      currentId = section.parent;
    }

    return breadcrumbs;
  }

  setupQuickNavigation() {
    // Add quick navigation shortcuts
    const quickNav = document.createElement('div');
    quickNav.className = 'quick-nav';
    quickNav.setAttribute('aria-label', 'Quick navigation');
    quickNav.innerHTML = `
      <button class="quick-nav-toggle" aria-expanded="false">
        <span class="sr-only">Quick navigation</span>
        ⚡
      </button>
      <div class="quick-nav-menu" role="menu">
        <div role="menuitem">
          <a href="#sq" data-section="sq">Pre-Assessment</a>
        </div>
        <div role="menuitem">
          <a href="#s1" data-section="s1">Intake</a>
        </div>
        <div role="menuitem">
          <a href="#s4" data-section="s4">Risk Scoring</a>
        </div>
        <div role="menuitem">
          <a href="#s6" data-section="s6">SAR Dashboard</a>
        </div>
        <div role="menuitem">
          <a href="#sp" data-section="sp">Pipeline</a>
        </div>
        <div role="menuitem">
          <a href="#settings" data-section="settings">Settings</a>
        </div>
      </div>
    `;

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.appendChild(quickNav);
    }

    // Setup toggle functionality
    const toggle = quickNav.querySelector('.quick-nav-toggle');
    const menu = quickNav.querySelector('.quick-nav-menu');

    toggle.addEventListener('click', () => {
      const isOpen = menu.style.display === 'block';
      menu.style.display = isOpen ? 'none' : 'block';
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    // Setup menu item clicks
    menu.querySelectorAll('a[data-section]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        this.navigateToSection(sectionId);
        menu.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!quickNav.contains(e.target)) {
        menu.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  navigateToSection(sectionId) {
    // Add to history
    if (this.sectionHistory[this.sectionHistory.length - 1] !== sectionId) {
      this.sectionHistory.push(sectionId);
    }

    // Update URL hash
    window.location.hash = sectionId;

    // Find and click the navigation item
    const navItem = document.querySelector(`.nav-item[onclick*="${sectionId}"]`);
    if (navItem) {
      navItem.click();
    } else {
      // Fallback: show section directly
      const section = document.getElementById(sectionId);
      if (section) {
        this.app.showSection(sectionId, navItem);
      }
    }

    this.currentSection = sectionId;
    this.updateBreadcrumbs();
  }

  navigateToPreviousSection() {
    if (this.sectionHistory.length > 1) {
      this.sectionHistory.pop(); // Remove current
      const previousSection = this.sectionHistory.pop(); // Get previous
      if (previousSection) {
        this.navigateToSection(previousSection);
      }
    }
  }

  navigateToNextSection() {
    const sectionOrder = ['sq', 's1', 's2', 's3', 's4', 's5', 's6', 's7'];
    const currentIndex = sectionOrder.indexOf(this.currentSection);
    
    if (currentIndex !== -1 && currentIndex < sectionOrder.length - 1) {
      const nextSection = sectionOrder[currentIndex + 1];
      this.navigateToSection(nextSection);
    }
  }

  quickNavigate(number) {
    const sectionMap = {
      1: 'sq',
      2: 's1',
      3: 's2',
      4: 's3',
      5: 's4',
      6: 's5',
      7: 's6',
      8: 's7',
      9: 'sp'
    };

    const sectionId = sectionMap[number];
    if (sectionId) {
      this.navigateToSection(sectionId);
    }
  }

  showNavigationHelp() {
    const helpModal = this.createHelpModal();
    document.body.appendChild(helpModal);
    helpModal.showModal();
  }

  createHelpModal() {
    const modal = document.createElement('dialog');
    modal.className = 'help-modal';
    modal.setAttribute('aria-label', 'Navigation help');
    
    modal.innerHTML = `
      <div class="modal-content">
        <header>
          <h2>Navigation Help</h2>
          <button class="close-btn" aria-label="Close help">✕</button>
        </header>
        <main>
          <h3>Keyboard Shortcuts</h3>
          <dl>
            <dt><kbd>Alt</kbd> + <kbd>1-9</kbd></dt>
            <dd>Quick navigate to sections</dd>
            
            <dt><kbd>Alt</kbd> + <kbd>←</kbd> / <kbd>→</kbd></dt>
            <dd>Navigate to previous/next section</dd>
            
            <dt><kbd>Alt</kbd> + <kbd>Home</kbd></dt>
            <dd>Go to first section (Pre-Assessment)</dd>
            
            <dt><kbd>Alt</kbd> + <kbd>End</kbd></dt>
            <dd>Go to last section (Settings)</dd>
            
            <dt><kbd>Ctrl</kbd> + <kbd>/</kbd></dt>
            <dd>Show this help dialog</dd>
            
            <dt><kbd>Tab</kbd></dt>
            <dd>Navigate through interactive elements</dd>
            
            <dt><kbd>Enter</kbd> / <kbd>Space</kbd></dt>
            <dd>Activate buttons and links</dd>
            
            <dt><kbd>Esc</kbd></dt>
            <dd>Close modals and dialogs</dd>
          </dl>
          
          <h3>Section Overview</h3>
          <ol>
            <li><strong>Pre-Assessment</strong> - Agency questionnaire and scoring</li>
            <li><strong>Intake & Scoping</strong> - Agency information and assessment setup</li>
            <li><strong>NIST CSF Mapping</strong> - Control mapping and evidence requirements</li>
            <li><strong>Evidence Collection</strong> - Document gathering and review</li>
            <li><strong>Risk & CMMI Scoring</strong> - Risk assessment and maturity scoring</li>
            <li><strong>POA&M Remediation</strong> - Plan of action and milestones</li>
            <li><strong>SAR Dashboard</strong> - Security assessment reporting</li>
            <li><strong>Agency Tracker</strong> - Master agency tracking system</li>
          </ol>
        </main>
        <footer>
          <button class="btn btn-primary">Got it!</button>
        </footer>
      </div>
    `;

    // Setup event listeners
    const closeBtn = modal.querySelector('.close-btn');
    const gotItBtn = modal.querySelector('footer button');

    const closeModal = () => {
      modal.close();
      modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);
    gotItBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    return modal;
  }

  // Section validation and access control
  canNavigateToSection(sectionId) {
    // Implement access control logic here
    // For now, all sections are accessible
    return true;
  }

  validateSectionTransition(fromSection, toSection) {
    // Implement validation logic for section transitions
    // For example, ensure required data is entered before proceeding
    
    const validationRules = {
      's1': ['sq'], // Requires pre-assessment completion
      's2': ['s1'], // Requires intake completion
      's3': ['s2'], // Requires mapping completion
      's4': ['s3'], // Requires evidence collection
      's5': ['s4'], // Requires risk scoring
      's6': ['s5'], // Requires POA&M completion
      's7': ['s6']  // Requires SAR completion
    };

    const requiredSections = validationRules[toSection];
    if (!requiredSections) return true;

    // Check if required sections are completed
    // This would integrate with form validation and data persistence
    return true;
  }

  // Progress tracking
  updateProgress() {
    const sections = ['sq', 's1', 's2', 's3', 's4', 's5', 's6', 's7'];
    const completedSections = sections.filter(section => this.isSectionCompleted(section));
    const progressPercentage = (completedSections.length / sections.length) * 100;

    // Update progress indicator
    const progressIndicator = document.querySelector('.progress-indicator');
    if (progressIndicator) {
      progressIndicator.style.width = `${progressPercentage}%`;
      progressIndicator.setAttribute('aria-valuenow', Math.round(progressPercentage));
      progressIndicator.textContent = `${Math.round(progressPercentage)}% complete`;
    }
  }

  isSectionCompleted(sectionId) {
    // Implement section completion logic
    // This would check form data, required fields, etc.
    return false; // Placeholder
  }
}

export default NavigationManager;
