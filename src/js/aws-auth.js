const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Cognito configuration
const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID
};

class AWSAuth {
  constructor() {
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    this.currentUser = null;
  }

  async login(email, password) {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password
    });

    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.currentUser = cognitoUser;
          const token = result.getIdToken().getJwtToken();
          const payload = result.getIdToken().payload;
          
          // Store in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('currentUser', JSON.stringify({
            email: payload.email,
            name: payload.name,
            role: payload['custom:role'] || 'assessor',
            userId: payload.sub
          }));
          
          resolve({
            success: true,
            token: token,
            user: {
              email: payload.email,
              name: payload.name,
              role: payload['custom:role'] || 'assessor',
              userId: payload.sub
            }
          });
        },
        onFailure: (err) => {
          resolve({
            success: false,
            error: err.message || 'Authentication failed'
          });
        }
      });
    });
  }

  async logout() {
    if (this.currentUser) {
      this.currentUser.signOut();
      this.currentUser = null;
    }
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    // Redirect to login
    window.location.href = 'login.html';
  }

  getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  getCurrentUserId() {
    const user = this.getCurrentUser();
    return user ? user.userId : null;
  }

  getCurrentUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Check if user has required role
  hasRole(requiredRole) {
    const userRole = this.getCurrentUserRole();
    if (!userRole) return false;
    
    const roleHierarchy = {
      'admin': 3,
      'assessor': 2,
      'agency_rep': 1
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }

  // Initialize auth state on page load
  init() {
    if (this.isAuthenticated()) {
      this.updateUIForAuthenticatedUser();
    } else {
      this.updateUIForUnauthenticatedUser();
    }
  }

  updateUIForAuthenticatedUser() {
    const user = this.getCurrentUser();
    
    // Update user avatar and info
    const avatarElements = document.querySelectorAll('.avatar');
    avatarElements.forEach(el => {
      el.textContent = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
      el.setAttribute('aria-label', user.name);
    });

    // Show/hide navigation based on role
    this.updateNavigationForRole(user.role);
    
    // Add logout functionality
    this.addLogoutHandlers();
  }

  updateUIForUnauthenticatedUser() {
    // Redirect to login if not on login page
    if (!window.location.pathname.includes('login.html')) {
      window.location.href = 'login.html';
    }
  }

  updateNavigationForRole(role) {
    // Hide/show navigation items based on role
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      const requiredRole = item.getAttribute('data-role');
      if (requiredRole && !this.hasRole(requiredRole)) {
        item.style.display = 'none';
      }
    });
  }

  addLogoutHandlers() {
    // Add logout to any logout buttons
    const logoutButtons = document.querySelectorAll('[data-action="logout"]');
    logoutButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    });
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AWSAuth;
} else {
  window.AWSAuth = AWSAuth;
}
