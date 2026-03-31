// Anchor Platform — AWS Cognito Auth
// Browser-compatible (uses amazon-cognito-identity-js CDN)

const ANCHOR_CONFIG = {
  region:     'us-east-1',
  userPoolId: 'us-east-1_lraXA8aSx',
  clientId:   '76fkks429itoh7topumn95vii4',
  cfDomain:   'https://dqf6m8xu3v66j.cloudfront.net'
};

// Map Cognito group → internal role key
const GROUP_ROLE_MAP = {
  Admins:        'admin',
  LeadAssessors: 'lead_assessor',
  Assessors:     'assessor',
  AgencyPOCs:    'agency_rep',
  DoITReviewers: 'doit_reviewer'
};

// Role → landing page
const ROLE_LANDING = {
  admin:         'main-dashboard.html',
  lead_assessor: 'main-dashboard.html',
  assessor:      'main-dashboard.html',
  doit_reviewer: 'main-dashboard.html',
  agency_rep:    null   // resolved dynamically from custom:agency
};

class AnchorAuth {
  constructor() {
    this.poolData = {
      UserPoolId: ANCHOR_CONFIG.userPoolId,
      ClientId:   ANCHOR_CONFIG.clientId
    };
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
  }

  // ── Login ──────────────────────────────────────────────────────────────────
  login(email, password) {
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password
    });
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: this.userPool
    });

    return new Promise((resolve) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const payload  = result.getIdToken().payload;
          const groups   = payload['cognito:groups'] || [];
          const role     = GROUP_ROLE_MAP[groups[0]] || 'assessor';
          const agency   = payload['custom:agency']       || '';
          const dispRole = payload['custom:display_role'] || role;

          const session = {
            email:        payload.email,
            name:         payload.name || email,
            role,
            agency,
            display_role: dispRole,
            groups,
            idToken:      result.getIdToken().getJwtToken(),
            loginTime:    new Date().toISOString()
          };

          localStorage.setItem('anchor_session', JSON.stringify(session));
          resolve({ success: true, session });
        },
        onFailure: (err) => {
          resolve({ success: false, error: err.message || 'Authentication failed' });
        },
        newPasswordRequired: () => {
          resolve({ success: false, error: 'Password reset required — contact your administrator.' });
        }
      });
    });
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  logout() {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) currentUser.signOut();
    localStorage.removeItem('anchor_session');
    window.location.href = 'index.html?logout=true';
  }

  // ── Session helpers ────────────────────────────────────────────────────────
  getSession() {
    try {
      const raw = localStorage.getItem('anchor_session');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  isAuthenticated() {
    return !!this.getSession();
  }

  getRole() {
    const s = this.getSession();
    return s ? s.role : null;
  }

  getAgency() {
    const s = this.getSession();
    return s ? (s.agency || '').toUpperCase() : null;
  }

  // ── Role checks ────────────────────────────────────────────────────────────
  isAdmin()        { return this.getRole() === 'admin'; }
  isLeadAssessor() { return ['admin','lead_assessor'].includes(this.getRole()); }
  isAssessor()     { return ['admin','lead_assessor','assessor'].includes(this.getRole()); }
  isAgencyRep()    { return this.getRole() === 'agency_rep'; }
  isDoITReviewer() { return this.getRole() === 'doit_reviewer'; }

  canWrite()    { return this.isAssessor(); }
  canManage()   { return this.isLeadAssessor(); }
  canAdminAll() { return this.isAdmin(); }

  // ── Role-based landing page ────────────────────────────────────────────────
  getLandingPage() {
    const role   = this.getRole();
    const agency = this.getAgency();
    if (role === 'agency_rep') {
      if (!agency) return 'index.html?error=no_agency';
      const agencySlug = agency.toLowerCase().replace(/[^a-z]/g, '');
      return `agency-${agencySlug}.html`;
    }
    return ROLE_LANDING[role] || 'main-dashboard.html';
  }

  // ── Auth guard (call on every protected page load) ─────────────────────────
  // Usage: AnchorAuth.guard()  or  AnchorAuth.guard({ requireAgency:'MDOT' })
  guard(opts = {}) {
    if (!this.isAuthenticated()) {
      window.location.replace('index.html?session=expired');
      return false;
    }
    // Agency-scoped pages: agency rep can only see their own agency
    if (opts.requireAgency) {
      const myAgency = this.getAgency();
      if (this.isAgencyRep() && myAgency !== opts.requireAgency.toUpperCase()) {
        window.location.replace(this.getLandingPage());
        return false;
      }
    }
    // Admin-only pages
    if (opts.requireAdmin && !this.isAdmin()) {
      window.location.replace(this.getLandingPage());
      return false;
    }
    return true;
  }

  // ── Populate UI elements from session ─────────────────────────────────────
  hydrateUI() {
    const s = this.getSession();
    if (!s) return;

    const initials = s.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    set('user-name',   s.name);
    set('user-email',  s.email);
    set('user-role',   s.display_role || s.role);
    set('user-avatar', initials);

    const av = document.getElementById('user-avatar') || document.querySelector('.avatar');
    if (av) {
      av.textContent = initials;
      av.title = `${s.name} · ${s.display_role || s.role}`;
    }
  }

  // ── API helper methods (used by aws-api.js) ───────────────────────────────
  getAuthHeaders() {
    const s = this.getSession();
    const token = s?.idToken || '';
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  getCurrentUserId() {
    const s = this.getSession();
    return s?.email || s?.sub || null;
  }
}

// Singleton — available globally
window.anchorAuth = new AnchorAuth();
