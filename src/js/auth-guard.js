// Anchor Platform — Auth Guard
// Loaded in <head> after aws-auth.js.
// Uses DOMContentLoaded for body attribute reads.
// Body is hidden via inline style until auth check passes (prevents flash).

(function () {
  const auth = window.anchorAuth;

  // Hide body immediately to prevent flash of unstyled/unauthorized content
  const _hideStyle = document.createElement('style');
  _hideStyle.textContent = 'body { visibility: hidden !important; }';
  document.head.appendChild(_hideStyle);

  function _revealBody() {
    _hideStyle.remove();
    if (document.body) document.body.style.visibility = '';
  }

  // Fast unauthenticated check — no DOM needed, runs immediately
  if (!auth.isAuthenticated()) {
    document.addEventListener('DOMContentLoaded', () => {
      window.location.replace('index.html?session=expired');
    });
    return;
  }

  // DOM-dependent checks run after body is available
  document.addEventListener('DOMContentLoaded', () => {
    const body          = document.body;
    const requireAuth   = body.getAttribute('data-require-auth')   === 'true';
    const requireAgency = body.getAttribute('data-require-agency');
    const requireAdmin  = body.getAttribute('data-require-admin')  === 'true';

    if (!requireAuth) return;

    const role   = auth.getRole();
    const agency = auth.getAgency();

    // Agency-scoped pages: agency reps only see their own agency
    if (requireAgency && role === 'agency_rep') {
      if (agency !== requireAgency.toUpperCase()) {
        window.location.replace(auth.getLandingPage());
        return;
      }
    }

    // Non-agency pages: redirect agency_rep to their agency page
    if (!requireAgency && role === 'agency_rep') {
      window.location.replace(auth.getLandingPage());
      return;
    }

    // Admin-only pages
    if (requireAdmin && role !== 'admin') {
      window.location.replace(auth.getLandingPage());
      return;
    }

    // All checks passed — populate UI, then reveal body
    auth.hydrateUI();
    wireLogoutButtons();
    applyRoleVisibility();
    _revealBody();
  });

  function wireLogoutButtons() {
    document.querySelectorAll('[onclick*="logout"]').forEach(el => {
      el.onclick = (e) => { e.preventDefault(); auth.logout(); };
    });
    document.querySelectorAll('[data-action="logout"]').forEach(el => {
      el.addEventListener('click', (e) => { e.preventDefault(); auth.logout(); });
    });
  }

  function applyRoleVisibility() {
    const role = auth.getRole();

    // data-visible-to="admin lead_assessor" → hide from other roles
    document.querySelectorAll('[data-visible-to]').forEach(el => {
      const allowed = el.getAttribute('data-visible-to').split(' ');
      if (!allowed.includes(role)) el.style.display = 'none';
    });

    // If the currently active nav item is now hidden, activate the first visible button
    // (exclude <a> links like ← Dashboard which have no onclick handler)
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav && activeNav.style.display === 'none') {
      const firstVisible = document.querySelector('.topnav button.nav-item:not([style*="display: none"]):not([style*="display:none"])');
      if (firstVisible) {
        firstVisible.classList.add('active');
        activeNav.classList.remove('active');
        firstVisible.click();
      }
    }

    // data-write-only → disabled for agency_rep / doit_reviewer
    if (role === 'doit_reviewer' || role === 'agency_rep') {
      document.querySelectorAll('[data-write-only]').forEach(el => {
        el.disabled = true;
        el.style.opacity = '0.4';
        el.title = 'Read-only access';
      });
    }

    // data-agency-context → filled with the rep's agency name
    if (role === 'agency_rep') {
      document.querySelectorAll('[data-agency-context]').forEach(el => {
        el.textContent = auth.getAgency();
      });
    }
  }
})();
