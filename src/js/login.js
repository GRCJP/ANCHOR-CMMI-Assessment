// Login page JavaScript - Demo Mode
class LoginManager {
  constructor() {
    this.demoUsers = {
      'admin@anchor.com': { password: 'Anchor123!', name: 'Anchor Administrator', role: 'admin' },
      'assessor@anchor.com': { password: 'Anchor123!', name: 'J. Williams', role: 'assessor' },
      'agency@anchor.com': { password: 'Anchor123!', name: 'Lisa Harmon', role: 'agency_rep' }
    };
    this.initializeEventListeners();
    this.checkForExistingSession();
  }

  initializeEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // Demo account fill buttons
    const fillButtons = document.querySelectorAll('.btn-fill-demo');
    fillButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const demoAccount = e.target.closest('.demo-account');
        const email = demoAccount.dataset.email;
        const password = demoAccount.dataset.password;
        this.fillDemoCredentials(email, password);
      });
    });

    // Enter key to submit
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT') {
          this.handleLogin();
        }
      }
    });

    // Forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
      forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleForgotPassword();
      });
    }
  }

  async checkForExistingSession() {
    // Check if user is already logged in via localStorage
    const session = localStorage.getItem('anchor_session');
    if (session) {
      try {
        const user = JSON.parse(session);
        if (user && user.email) {
          this.redirectToDashboard();
          return;
        }
      } catch (e) {
        localStorage.removeItem('anchor_session');
      }
    }

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('logout') === 'true') {
      this.showSuccessMessage('You have been successfully logged out.');
    }

    if (urlParams.get('session') === 'expired') {
      this.showErrorMessage('Your session has expired. Please log in again.');
    }
  }

  async handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Basic validation
    if (!email || !password) {
      this.showErrorMessage('Please enter both email and password.');
      return;
    }

    // Email validation
    if (!this.isValidEmail(email)) {
      this.showErrorMessage('Please enter a valid email address.');
      return;
    }

    // Show loading state
    this.setLoadingState(true);
    this.hideErrorMessage();

    try {
      // Demo authentication
      const user = this.demoUsers[email];
      if (user && user.password === password) {
        // Create session
        const session = {
          email: email,
          name: user.name,
          role: user.role,
          loginTime: new Date().toISOString()
        };
        
        // Store in localStorage
        localStorage.setItem('anchor_session', JSON.stringify(session));
        
        // Store remember preference
        if (remember) {
          localStorage.setItem('rememberEmail', email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        // Show success and redirect
        this.showSuccessMessage('Login successful! Redirecting...');
        
        // Log activity
        console.log('Login successful:', { email, role: user.role });

        // Redirect after a short delay
        setTimeout(() => {
          this.redirectToDashboard();
        }, 1000);

      } else {
        // Show error
        this.showErrorMessage('Invalid email or password. Please try again.');
        console.log('Login failed:', { email });
      }

    } catch (error) {
      console.error('Login error:', error);
      this.showErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      this.setLoadingState(false);
    }
  }

  fillDemoCredentials(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    
    // Add visual feedback
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    emailInput.style.backgroundColor = '#f0f9ff';
    passwordInput.style.backgroundColor = '#f0f9ff';
    
    setTimeout(() => {
      emailInput.style.backgroundColor = '';
      passwordInput.style.backgroundColor = '';
    }, 500);

    // Focus on password field for security
    passwordInput.focus();
    
    // Log demo account usage
    this.logActivity('demo_account_selected', 'authentication', {
      email: email
    });
  }

  handleForgotPassword() {
    // For demo purposes, show a message
    this.showInfoMessage('For demo purposes, use the demo accounts listed below or contact your administrator.');
  }

  setLoadingState(isLoading) {
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoading = loginBtn.querySelector('.btn-loading');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (isLoading) {
      loginBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
      loadingOverlay.style.display = 'flex';
    } else {
      loginBtn.disabled = false;
      btnText.style.display = 'block';
      btnLoading.style.display = 'none';
      loadingOverlay.style.display = 'none';
    }
  }

  showErrorMessage(message) {
    const errorElement = document.getElementById('loginError');
    const errorText = errorElement.querySelector('.error-text');
    
    errorText.textContent = message;
    errorElement.style.display = 'flex';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      this.hideErrorMessage();
    }, 10000);

    // Announce to screen readers
    this.announceToScreenReader(`Error: ${message}`);
  }

  hideErrorMessage() {
    const errorElement = document.getElementById('loginError');
    errorElement.style.display = 'none';
  }

  showSuccessMessage(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #16a34a;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    successDiv.innerHTML = `
      <span class="success-icon">✅</span>
      <span class="success-text">${message}</span>
    `;

    const loginForm = document.getElementById('loginForm');
    loginForm.parentNode.insertBefore(successDiv, loginForm);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);

    // Announce to screen readers
    this.announceToScreenReader(`Success: ${message}`);
  }

  showInfoMessage(message) {
    // Create a temporary info message
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info-message';
    infoDiv.style.cssText = `
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #2563eb;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    infoDiv.innerHTML = `
      <span class="info-icon">ℹ️</span>
      <span class="info-text">${message}</span>
    `;

    const loginForm = document.getElementById('loginForm');
    loginForm.parentNode.insertBefore(infoDiv, loginForm);

    // Auto-hide after 8 seconds
    setTimeout(() => {
      infoDiv.remove();
    }, 8000);

    // Announce to screen readers
    this.announceToScreenReader(`Info: ${message}`);
  }

  announceToScreenReader(message) {
    // Create a live region for screen reader announcements
    let liveRegion = document.getElementById('screen-reader-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'screen-reader-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  redirectToDashboard() {
    // Clear any stored navigation state that might cause redirects
    sessionStorage.removeItem('lastVisitedPage');
    localStorage.removeItem('activeAssessment');
    
    // Redirect to main portfolio dashboard
    window.location.href = 'main-dashboard.html';
  }

  async logActivity(action, section, details = {}) {
    try {
      // This would call the AWS API to log activity
      // For now, we'll just log to console
      console.log('Activity logged:', {
        action: action,
        section: section,
        details: details,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }
}

// Initialize login manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LoginManager();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  // Refresh session check when navigating back
  const loginManager = new LoginManager();
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
