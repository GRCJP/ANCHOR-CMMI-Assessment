// Anchor Platform — Login page controller
// Uses AnchorAuth (aws-auth.js) which calls real AWS Cognito

document.addEventListener('DOMContentLoaded', () => {

  // If already authenticated, go straight to the landing page
  if (window.anchorAuth.isAuthenticated()) {
    window.location.replace(window.anchorAuth.getLandingPage());
    return;
  }

  // Handle ?logout and ?session=expired query params
  const params = new URLSearchParams(window.location.search);
  if (params.get('logout') === 'true')     showBanner('info',    'You have been signed out.');
  if (params.get('session') === 'expired') showBanner('warning', 'Your session expired. Please sign in again.');

  // Fill demo credential buttons
  document.querySelectorAll('.btn-fill-demo').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.demo-account');
      document.getElementById('email').value    = card.dataset.email;
      document.getElementById('password').value = card.dataset.password;
      document.getElementById('password').focus();
    });
  });

  // Form submit
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleLogin();
  });

  // Enter key in inputs
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') handleLogin();
  });

  // Forgot password
  const fp = document.querySelector('.forgot-password');
  if (fp) fp.addEventListener('click', (e) => {
    e.preventDefault();
    showBanner('info', 'Use the demo accounts below, or contact admin@anchor.com to reset your password.');
  });
});

async function handleLogin() {
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) { showBanner('error', 'Please enter both email and password.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showBanner('error', 'Please enter a valid email address.'); return; }

  setLoading(true);
  clearBanner();

  const result = await window.anchorAuth.login(email, password);

  setLoading(false);

  if (result.success) {
    showBanner('success', 'Signed in — redirecting…');
    setTimeout(() => {
      window.location.replace(window.anchorAuth.getLandingPage());
    }, 800);
  } else {
    showBanner('error', result.error || 'Invalid email or password.');
  }
}

// ── UI helpers ───────────────────────────────────────────────────────────────

function setLoading(on) {
  const btn     = document.getElementById('loginBtn');
  const overlay = document.getElementById('loadingOverlay');
  const btnText = btn?.querySelector('.btn-text');
  const btnSpin = btn?.querySelector('.btn-loading');
  if (btn)     btn.disabled          = on;
  if (btnText) btnText.style.display = on ? 'none'  : 'block';
  if (btnSpin) btnSpin.style.display = on ? 'flex'  : 'none';
  if (overlay) overlay.style.display = on ? 'flex'  : 'none';
}

function showBanner(type, msg) {
  clearBanner();
  const colors = {
    error:   { bg:'#fef2f2', border:'#fca5a5', text:'#991b1b', icon:'⚠️' },
    success: { bg:'#f0fdf4', border:'#bbf7d0', text:'#15803d', icon:'✅' },
    info:    { bg:'#eff6ff', border:'#bfdbfe', text:'#1d4ed8', icon:'ℹ️' },
    warning: { bg:'#fffbeb', border:'#fde68a', text:'#92400e', icon:'⚠️' }
  };
  const c = colors[type] || colors.info;
  const div = document.createElement('div');
  div.id = 'login-banner';
  div.style.cssText = `background:${c.bg};border:1px solid ${c.border};color:${c.text};padding:12px 16px;border-radius:8px;margin-bottom:16px;display:flex;align-items:center;gap:8px;font-size:.85rem;`;
  div.innerHTML = `<span>${c.icon}</span><span>${msg}</span>`;
  const form = document.getElementById('loginForm');
  form.parentNode.insertBefore(div, form);
}

function clearBanner() {
  const el = document.getElementById('login-banner');
  if (el) el.remove();
}
