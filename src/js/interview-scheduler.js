// Interview Scheduler — ANCHOR Platform
// Shared across all agency assessment pages (MSDE, MDOT, DPSCS)

(function () {
  'use strict';

  const IS = window.AnchorInterviewScheduler = {};
  let _slug   = '';
  let _nextId = 5;

  function lsKey()  { return 'anchor_interviews_' + _slug; }
  function load()   { try { const r = localStorage.getItem(lsKey()); return r ? JSON.parse(r) : null; } catch(e) { return null; } }
  function save(d)  { try { localStorage.setItem(lsKey(), JSON.stringify(d)); } catch(e) {} }

  // ── Init ──────────────────────────────────────────────────────────────────
  IS.init = function (slug, seedData) {
    _slug = slug;
    if (!load()) save(seedData || []);
    const data = load() || [];
    const maxNum = data.reduce(function (m, i) {
      var n = parseInt((i.id || '').replace('INT-', '')) || 0;
      return Math.max(m, n);
    }, 0);
    _nextId = maxNum + 1;
    IS.render();
    // Close modal on backdrop click
    const modal = document.getElementById('is-modal');
    if (modal) {
      modal.addEventListener('click', function (e) { if (e.target === modal) IS.closeModal(); });
    }
  };

  IS.render = function () {
    var data = load() || [];
    renderTable(data);
    renderStats(data);
    renderAppendixB(data);
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  function renderStats(data) {
    var personnel = new Set(data.map(function (i) { return i.name; }).filter(Boolean)).size;
    var set = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
    set('iq-personnel', personnel);
    set('is-sched-count', data.filter(function (i) { return i.status === 'Scheduled' || i.status === 'In Progress'; }).length);
    set('is-done-count',  data.filter(function (i) { return i.status === 'Completed'; }).length);
  }

  // ── Formatters ────────────────────────────────────────────────────────────
  function fmtDate(d) {
    if (!d) return '—';
    try { return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch(e) { return d; }
  }
  function fmtTime(t) {
    if (!t) return '';
    try {
      var parts = t.split(':'), h = parseInt(parts[0]), m = parts[1];
      return (h % 12 || 12) + ':' + m + ' ' + (h >= 12 ? 'PM' : 'AM');
    } catch(e) { return t; }
  }
  function statusBadge(s) {
    var styles = {
      'Scheduled':   'background:#dbeafe;color:#1e40af;',
      'In Progress': 'background:#fef3c7;color:#92400e;',
      'Completed':   'background:#d1fae5;color:#065f46;',
      'Cancelled':   'background:#fee2e2;color:#991b1b;'
    };
    return '<span style="font-size:.68rem;font-weight:700;padding:2px 10px;border-radius:10px;white-space:nowrap;' + (styles[s] || 'background:#f3f4f6;color:#374151;') + '">' + s + '</span>';
  }

  // ── Table ─────────────────────────────────────────────────────────────────
  function renderTable(data) {
    var tbody = document.getElementById('is-tbody');
    if (!tbody) return;
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:28px;">No interviews scheduled yet. Click <strong style="color:#1a3a5c;">+ Schedule Interview</strong> above to add one.</td></tr>';
      return;
    }
    tbody.innerHTML = data.map(function (i) {
      var doneBtn = i.status !== 'Completed'
        ? '<button onclick="AnchorInterviewScheduler.markComplete(\'' + i.id + '\')" title="Mark complete" style="font-size:.75rem;padding:5px 10px;border:1.5px solid #6ee7b7;background:#d1fae5;color:#065f46;border-radius:6px;cursor:pointer;font-weight:700;white-space:nowrap;">✓ Done</button>'
        : '<span style="font-size:.72rem;color:#065f46;font-weight:700;padding:5px 8px;">✓ Complete</span>';
      return '<tr>' +
        '<td style="white-space:nowrap;"><div style="display:flex;gap:5px;align-items:center;">' +
          '<button onclick="AnchorInterviewScheduler.openModal(\'' + i.id + '\')" style="font-size:.78rem;padding:5px 12px;border:1.5px solid #2563a8;background:#eff6ff;color:#1d4ed8;border-radius:6px;cursor:pointer;font-weight:700;">✏ Edit</button>' +
          '<button onclick="AnchorInterviewScheduler.deleteInterview(\'' + i.id + '\')" title="Remove" style="font-size:.78rem;padding:5px 8px;border:1.5px solid #fca5a5;background:#fff;color:#dc2626;border-radius:6px;cursor:pointer;font-weight:700;">✕</button>' +
          '</div></td>' +
        '<td><strong style="font-size:.82rem;">' + i.id + '</strong></td>' +
        '<td><div style="font-weight:600;font-size:.84rem;">' + (i.name || '—') + '</div>' +
          (i.email ? '<div style="font-size:.7rem;color:#64748b;">' + i.email + '</div>' : '') + '</td>' +
        '<td style="font-size:.82rem;">' + (i.role || '—') + '</td>' +
        '<td style="font-size:.82rem;white-space:nowrap;">' + fmtDate(i.date) +
          (i.time ? '<div style="font-size:.72rem;color:#64748b;">' + fmtTime(i.time) + '</div>' : '') + '</td>' +
        '<td>' + statusBadge(i.status) + '&nbsp;' + doneBtn + '</td>' +
        '</tr>';
    }).join('');
  }

  // ── Appendix B sync ───────────────────────────────────────────────────────
  function renderAppendixB(data) {
    var tbody = document.getElementById('appendix-b-tbody');
    if (!tbody) return;
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:16px;">No interviews scheduled.</td></tr>';
      return;
    }
    tbody.innerHTML = data.map(function (i) {
      return '<tr><td>' + i.id + '</td><td>' + (i.name || '—') + '</td><td>' + (i.role || '—') + '</td><td style="white-space:nowrap;">' + fmtDate(i.date) + '</td><td style="font-size:.78rem;">' + (i.controls || '—') + '</td></tr>';
    }).join('');
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  IS.markComplete = function (id) {
    var data = load() || [];
    var item = data.find(function (i) { return i.id === id; });
    if (item) { item.status = 'Completed'; save(data); IS.render(); }
    if (typeof notify === 'function') notify('Interview marked as completed.');
  };

  IS.deleteInterview = function (id) {
    if (!confirm('Remove this interview from the schedule?')) return;
    save((load() || []).filter(function (i) { return i.id !== id; }));
    IS.render();
  };

  // ── Modal ─────────────────────────────────────────────────────────────────
  IS.openModal = function (id) {
    var modal = document.getElementById('is-modal');
    if (!modal) return;
    var data = load() || [];
    var item = id ? data.find(function (i) { return i.id === id; }) : null;
    var g = function (elId) { return document.getElementById(elId); };
    g('is-modal-id').value       = id || '';
    g('is-modal-name').value     = (item && item.name)     || '';
    g('is-modal-role').value     = (item && item.role)     || '';
    g('is-modal-email').value    = (item && item.email)    || '';
    g('is-modal-date').value     = (item && item.date)     || '';
    g('is-modal-time').value     = (item && item.time)     || '';
    g('is-modal-controls').value = (item && item.controls) || '';
    g('is-modal-status').value   = (item && item.status)   || 'Scheduled';
    g('is-modal-notes').value    = (item && item.notes)    || '';
    g('is-modal-title').textContent = id ? 'Edit Interview' : 'Schedule Interview';
    modal.style.display = 'flex';
    setTimeout(function () { var el = g('is-modal-name'); if (el) el.focus(); }, 80);
  };

  IS.closeModal = function () {
    var modal = document.getElementById('is-modal');
    if (modal) modal.style.display = 'none';
  };

  IS.saveModal = function () {
    var g   = function (id) { return document.getElementById(id); };
    var id       = g('is-modal-id').value;
    var name     = g('is-modal-name').value.trim();
    var role     = g('is-modal-role').value.trim();
    var email    = g('is-modal-email').value.trim();
    var date     = g('is-modal-date').value;
    var time     = g('is-modal-time').value;
    var controls = g('is-modal-controls').value.trim();
    var status   = g('is-modal-status').value;
    var notes    = g('is-modal-notes').value.trim();

    if (!name) { alert('Interviewee name is required.'); return; }
    if (!date) { alert('Interview date is required.'); return; }

    var data = load() || [];
    if (id) {
      var item = data.find(function (i) { return i.id === id; });
      if (item) Object.assign(item, { name: name, role: role, email: email, date: date, time: time, controls: controls, status: status, notes: notes });
    } else {
      var newId = 'INT-' + String(_nextId).padStart(3, '0');
      _nextId++;
      data.push({ id: newId, name: name, role: role, email: email, date: date, time: time, controls: controls, status: status, notes: notes });
    }

    save(data);
    IS.closeModal();
    IS.render();
    if (typeof notify === 'function') notify(id ? 'Interview updated.' : 'Interview scheduled.');
  };

})();
