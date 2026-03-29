// Anchor Platform — Auth Guard
// Include AFTER aws-auth.js on every protected page.
// Reads data-require-auth and data-require-agency from <body> tag.
//
// Usage on main-dashboard.html:
//   <body data-require-auth="true">
//
// Usage on agency-mdot.html:
//   <body data-require-auth="true" data-require-agency="MDOT">

(function () {
  const body    = document.body || document.documentElement;
  const auth    = window.anchorAuth;

  const requireAuth   = body.getAttribute('data-require-auth')   === 'true';
  const requireAgency = body.getAttribute('data-require-agency'); // e.g. "MDOT"
  const requireAdmin  = body.getAttribute('data-require-admin')  === 'true';

  if (!requireAuth) return;   // page opted out of protection

  // Not logged in → login
  if (!auth.isAuthenticated()) {
    window.location.replace('index.html?session=expired');
    return;
  }

  const role   = auth.getRole();
  const agency = auth.getAgency();

  // Agency-scoped pages: agency reps only see their own agency
  if (requireAgency) {
    if (role === 'agency_rep' && agency !== requireAgency.toUpperCase()) {
      // Send them to their correct agency page
      window.location.replace(auth.getLandingPage());
      return;
    }
    // DoIT reviewer can view any agency page (read-only — enforced by UI)
    // Admin / assessors can view any agency page — no restriction
  }

  // Admin-only pages
  if (requireAdmin && role !== 'admin') {
    window.location.replace(auth.getLandingPage());
    return;
  }

  // Passed all checks — populate UI
  document.addEventListener('DOMContentLoaded', () => {
    auth.hydrateUI();
    wireLogoutButtons();
    applyRoleVisibility();
  });

  function wireLogoutButtons() {
    document.querySelectorAll('[onclick*="logout"]').forEach(el => {
      el.onclick = (e) => { e.preventDefault(); auth.logout(); };
    });
    // Also support <a data-action="logout">
    document.querySelectorAll('[data-action="logout"]').forEach(el => {
      el.addEventListener('click', (e) => { e.preventDefault(); auth.logout(); });
    });
  }

  function applyRoleVisibility() {
    const role = auth.getRole();

    // Hide elements the current role should not see
    // Usage: <div data-visible-to="admin lead_assessor">
    document.querySelectorAll('[data-visible-to]').forEach(el => {
      const allowed = el.getAttribute('data-visible-to').split(' ');
      if (!allowed.includes(role)) el.style.display = 'none';
    });

    // Hide elements the current role should not interact with
    // Usage: <button data-write-only>  (hidden for agency_rep / doit_reviewer)
    if (role === 'doit_reviewer' || role === 'agency_rep') {
      document.querySelectorAll('[data-write-only]').forEach(el => {
        el.disabled = true;
        el.style.opacity = '0.4';
        el.title = 'Read-only access';
      });
    }

    // Show agency rep their agency name in context
    if (role === 'agency_rep') {
      const agency = auth.getAgency();
      document.querySelectorAll('[data-agency-context]').forEach(el => {
        el.textContent = agency;
      });
    }
  }
})();
