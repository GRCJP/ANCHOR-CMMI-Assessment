/**
 * intake-workflow.js — Anchor Platform
 * Functional Intake & Scoping submit/draft logic for agency assessment pages.
 *
 * Loaded in: agency-mdot.html, agency-dpscs.html, agency-msde.html
 * Each page sets window.AGENCY_KEY = 'mdot' | 'dpscs' | 'msde' before this runs.
 *
 * Exposed globals: saveIntakeDraft(), submitIntakeForm(), loadIntakeState()
 */

(function () {
  'use strict';

  /* ── Pipeline stage config ───────────────────────────────────────── */
  const STAGES = ['intake', 'evidence', 'csf', 'risk', 'poam', 'sar'];

  const STAGE_META = {
    intake:   { label: 'Intake',     num: 1 },
    evidence: { label: 'Evidence',   num: 2 },
    csf:      { label: 'CSF Scoring',num: 3 },
    risk:     { label: 'Risk / CMMI',num: 4 },
    poam:     { label: 'POA&M',      num: 5 },
    sar:      { label: 'SAR',        num: 6 }
  };

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function fmtDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function addDays(iso, n) {
    const d = new Date(iso + 'T12:00:00');
    d.setDate(d.getDate() + n);
    return d.toISOString().split('T')[0];
  }

  function daysLeft(iso) {
    if (!iso) return null;
    const now = new Date(); now.setHours(0,0,0,0);
    const tgt = new Date(iso + 'T12:00:00');
    return Math.ceil((tgt - now) / 86400000);
  }

  function getAgencyKey() {
    return (window.AGENCY_KEY || '').toLowerCase();
  }

  function showNotify(msg, type) {
    if (typeof window.notify === 'function') {
      window.notify(msg);
    } else {
      console.log('[Intake]', msg);
    }
  }

  /* ── Collect form data ───────────────────────────────────────────── */
  function collectIntakeFormData() {
    var key = getAgencyKey();
    var scopeScores = window.scopeScores || { fte: 3, itc: 3, data: 3 };
    var total = (scopeScores.fte || 0) + (scopeScores.itc || 0) + (scopeScores.data || 0);
    var cat = total <= 4 ? 'SMALL' : total <= 6 ? 'MEDIUM' : total <= 8 ? 'LARGE' : 'EXTRA LARGE';

    var startDate = (document.getElementById('sq-start') || {}).value || '';
    var endDate   = (document.getElementById('sq-end')   || {}).value || '';
    var evidenceDueDate = startDate ? addDays(startDate, 21) : '';

    var authUser = '';
    try {
      var sess = JSON.parse(localStorage.getItem('anchorSession') || '{}');
      authUser = sess.name || sess.displayName || sess.user || 'Assessor';
    } catch(e) {}

    return {
      agencyKey:        key,
      agencyName:       (document.getElementById('sq-agency-name')   || {}).value || '',
      contactName:      (document.getElementById('sq-contact-name')  || {}).value || '',
      contactEmail:     (document.getElementById('sq-primary-email') || {}).value || '',
      contactPhone:     (document.getElementById('sq-contact-phone') || {}).value || '',
      assessmentId:     (document.getElementById('sq-agency-id')     || {}).value || '',
      wave:             (document.getElementById('sq-wave')           || {}).value || '',
      pod:              (document.getElementById('sq-pod')            || {}).value || '',
      leadAssessor:     (document.getElementById('sq-assessor')       || {}).value || '',
      teamSize:         (document.getElementById('sq-teamsize')       || {}).value || '',
      execBranch:       (document.getElementById('sq-execbranch')     || {}).value || '',
      startDate:        startDate,
      endDate:          endDate,
      evidenceDueDate:  evidenceDueDate,
      scopeScore:       total,
      scopeCategory:    cat,
      submittedBy:      authUser,
      pipelineStage:    'evidence'
    };
  }

  /* ── Save Draft ──────────────────────────────────────────────────── */
  window.saveIntakeDraft = function () {
    var key = getAgencyKey();
    if (!key) return;
    var data = collectIntakeFormData();
    data.status = 'draft';
    data.savedAt = new Date().toISOString();
    localStorage.setItem('anchor_intake_' + key, JSON.stringify(data));
    showNotify('Draft saved. Return to complete and submit.');
  };

  /* ── Submit Intake ───────────────────────────────────────────────── */
  window.submitIntakeForm = function () {
    var key = getAgencyKey();
    if (!key) return;
    var data = collectIntakeFormData();

    // Validate required fields
    var missing = [];
    if (!data.agencyName)    missing.push('Agency Name');
    if (!data.contactEmail)  missing.push('Contact Email');
    if (!data.startDate)     missing.push('Start Date');
    if (!data.endDate)       missing.push('End Date');
    if (missing.length) {
      showNotify('Please complete required fields: ' + missing.join(', '));
      return;
    }

    data.status      = 'submitted';
    data.submittedAt = new Date().toISOString();

    // Persist intake record
    localStorage.setItem('anchor_intake_' + key, JSON.stringify(data));

    // Update pipeline tracker → advance to Evidence Collection
    updatePipelineTracker('evidence');

    // Update agency timeline bar dates
    updateAgencyTimelineBar(data);

    // Advance h-stepper (steps 1–2 done, step 3 active)
    advanceHStepper(1);

    // Write back to assessment key so dashboard picks it up
    writeBackToDashboard(key, data);

    // Add PM notification
    appendPMNotification(key, data);

    // Lock the form to prevent re-submission
    lockIntakeForm();

    showNotify('Intake submitted. Assessment advanced to Evidence Collection.');
  };

  /* ── Update Pipeline Tracker ─────────────────────────────────────── */
  function updatePipelineTracker(activeStageId) {
    var activeIdx = STAGES.indexOf(activeStageId);
    if (activeIdx < 0) return;

    STAGES.forEach(function (stageId, i) {
      var el = document.getElementById('pipe-step-' + stageId);
      if (!el) return;
      var circleEl = el.querySelector('span:first-child');
      var labelEl  = el.querySelector('span:nth-child(2)');
      var meta     = STAGE_META[stageId] || {};

      if (i < activeIdx) {
        // Done
        el.style.background = '#dbeafe';
        el.style.border     = '1.5px solid #3b82f6';
        if (circleEl) {
          circleEl.style.background = '#3b82f6';
          circleEl.style.color      = '#fff';
          circleEl.textContent      = '✓';
        }
        if (labelEl) labelEl.style.color = '#1d4ed8';
        // Remove Active badge if present
        var badge = el.querySelector('.pipe-active-badge');
        if (badge) badge.remove();

      } else if (i === activeIdx) {
        // Active
        el.style.background = '#fef3c7';
        el.style.border     = '1.5px solid #f59e0b';
        if (circleEl) {
          circleEl.style.background = '#f59e0b';
          circleEl.style.color      = '#fff';
          circleEl.textContent      = '▶';
        }
        if (labelEl) {
          labelEl.style.color = '#92400e';
          // Add Active badge after label if not present
          if (!el.querySelector('.pipe-active-badge')) {
            var badge = document.createElement('span');
            badge.className = 'pipe-active-badge';
            badge.style.cssText = 'font-size:.62rem;background:#f59e0b;color:#fff;padding:1px 5px;border-radius:10px;';
            badge.textContent = 'Active';
            labelEl.parentNode.insertBefore(badge, labelEl.nextSibling);
          }
        }

      } else {
        // Pending
        el.style.background = '#f8fafc';
        el.style.border     = '1.5px solid #cbd5e0';
        if (circleEl) {
          circleEl.style.background = '#94a3b8';
          circleEl.style.color      = '#fff';
          circleEl.textContent      = String(meta.num || (i + 1));
        }
        if (labelEl) labelEl.style.color = '#64748b';
        var badge = el.querySelector('.pipe-active-badge');
        if (badge) badge.remove();
      }

      // Update connector after this step
      var connEl = document.getElementById('pipe-conn-' + (i + 1));
      if (connEl) {
        connEl.style.background = (i < activeIdx) ? '#3b82f6' : '#e2e8f0';
      }
    });
  }

  /* ── Update Agency Timeline Bar ──────────────────────────────────── */
  function updateAgencyTimelineBar(data) {
    var startEl  = document.getElementById('tl-start-date');
    var evDueEl  = document.getElementById('tl-evidence-date');
    var evBadge  = document.getElementById('tl-evidence-status');
    var endEl    = document.getElementById('tl-completion-date');

    if (startEl)  startEl.textContent  = fmtDate(data.startDate);
    if (evDueEl)  evDueEl.textContent  = fmtDate(data.evidenceDueDate);
    if (endEl)    endEl.textContent    = fmtDate(data.endDate);

    if (evBadge) {
      var left = daysLeft(data.evidenceDueDate);
      if (left === null) return;
      if (left > 0) {
        evBadge.textContent = '⚡ Active — ' + left + ' days left';
        evBadge.style.background = '#f59e0b';
        evBadge.style.color      = '#fff';
      } else if (left === 0) {
        evBadge.textContent = '⚠️ Due today';
        evBadge.style.background = '#dc2626';
        evBadge.style.color      = '#fff';
      } else {
        evBadge.textContent = '❌ Overdue by ' + Math.abs(left) + ' days';
        evBadge.style.background = '#dc2626';
        evBadge.style.color      = '#fff';
      }
    }
  }

  /* ── Advance H-Stepper ───────────────────────────────────────────── */
  function advanceHStepper(completedUpToIndex) {
    var steps = document.querySelectorAll('#questionnaire .h-stepper .h-step');
    steps.forEach(function (step, i) {
      step.classList.remove('done', 'active');
      if (i <= completedUpToIndex) {
        step.classList.add('done');
        var circle = step.querySelector('.h-step-circle');
        if (circle) circle.textContent = '✓';
      } else if (i === completedUpToIndex + 1) {
        step.classList.add('active');
      }
    });
  }

  /* ── Write Back to Dashboard ─────────────────────────────────────── */
  function writeBackToDashboard(agencyKey, intakeData) {
    var dashKey = 'assessment_' + agencyKey;
    var existing = {};
    try { existing = JSON.parse(localStorage.getItem(dashKey) || '{}'); } catch(e) {}
    var updated = Object.assign({}, existing, {
      stage:    'Evidence Collection',
      progress: '5%',
      status:   'In Progress',
      pod:      intakeData.pod || existing.pod || '',
      intakeSubmittedAt: intakeData.submittedAt
    });
    localStorage.setItem(dashKey, JSON.stringify(updated));
  }

  /* ── Append PM Notification ──────────────────────────────────────── */
  function appendPMNotification(agencyKey, intakeData) {
    var existing = [];
    try { existing = JSON.parse(localStorage.getItem('pm_notifications') || '[]'); } catch(e) {}
    // Remove any existing notification for this agency
    existing = existing.filter(function (n) { return n.agencyKey !== agencyKey; });
    existing.unshift({
      id:        agencyKey + '_' + Date.now(),
      agencyKey: agencyKey,
      agencyName: intakeData.agencyName,
      message:   'Intake & Scoping submitted by ' + (intakeData.submittedBy || 'assessor') + '.',
      stage:     'Evidence Collection',
      timestamp: intakeData.submittedAt,
      dismissed: false
    });
    localStorage.setItem('pm_notifications', JSON.stringify(existing));
  }

  /* ── Lock Form After Submit ──────────────────────────────────────── */
  function lockIntakeForm() {
    // Lock form inputs
    var fields = document.querySelectorAll('#questionnaire input, #questionnaire select, #questionnaire textarea');
    fields.forEach(function (f) { f.disabled = true; f.style.opacity = '0.7'; });

    // Swap buttons: hide primary action buttons, show locked indicator
    var submitBtn = document.getElementById('intake-submit-btn');
    var draftBtn  = document.getElementById('intake-draft-btn');
    var lockedDiv = document.getElementById('intake-locked-indicator');
    var unlockBtn = document.getElementById('intake-unlock-btn');

    if (submitBtn) submitBtn.style.display = 'none';
    if (draftBtn)  draftBtn.style.display  = 'none';
    if (lockedDiv) lockedDiv.style.display = 'flex';
    if (unlockBtn) unlockBtn.style.display = 'inline-flex';
  }

  /* ── Unlock Form (for editing after submit) ──────────────────────── */
  window.unlockIntakeForm = function () {
    var key = getAgencyKey();
    if (!key) return;

    // Reset status back to draft
    try {
      var data = JSON.parse(localStorage.getItem('anchor_intake_' + key) || '{}');
      data.status = 'draft';
      localStorage.setItem('anchor_intake_' + key, JSON.stringify(data));
    } catch(e) {}

    // Re-enable fields
    var fields = document.querySelectorAll('#questionnaire input, #questionnaire select, #questionnaire textarea');
    fields.forEach(function (f) { f.disabled = false; f.style.opacity = ''; });

    // Show buttons again
    var submitBtn = document.getElementById('intake-submit-btn');
    var draftBtn  = document.getElementById('intake-draft-btn');
    var lockedDiv = document.getElementById('intake-locked-indicator');
    var unlockBtn = document.getElementById('intake-unlock-btn');

    if (submitBtn) submitBtn.style.display = '';
    if (draftBtn)  draftBtn.style.display  = '';
    if (lockedDiv) lockedDiv.style.display = 'none';
    if (unlockBtn) unlockBtn.style.display = 'none';

    showNotify('Intake unlocked for editing. Re-submit when done.');
  };

  /* ── Load Saved State on Page Load ──────────────────────────────── */
  window.loadIntakeState = function () {
    var key = getAgencyKey();
    if (!key) return;
    var data = {};
    try { data = JSON.parse(localStorage.getItem('anchor_intake_' + key) || '{}'); } catch(e) {}

    if (!data.status) return; // Nothing saved yet

    // Restore form field values
    var fieldMap = {
      'sq-agency-name':   data.agencyName,
      'sq-contact-name':  data.contactName,
      'sq-primary-email': data.contactEmail,
      'sq-contact-phone': data.contactPhone,
      'sq-agency-id':     data.assessmentId,
      'sq-wave':          data.wave,
      'sq-pod':           data.pod,
      'sq-assessor':      data.leadAssessor,
      'sq-teamsize':      data.teamSize,
      'sq-execbranch':    data.execBranch,
      'sq-start':         data.startDate,
      'sq-end':           data.endDate
    };
    Object.keys(fieldMap).forEach(function (id) {
      var el = document.getElementById(id);
      if (el && fieldMap[id]) el.value = fieldMap[id];
    });

    if (data.status === 'submitted') {
      // Restore submitted state visuals
      updatePipelineTracker('evidence');
      updateAgencyTimelineBar(data);
      advanceHStepper(1);
      lockIntakeForm();
    }
  };

  /* ── Dismiss PM notification (called from dashboard) ──────────────── */
  window.dismissPMNotification = function (id) {
    try {
      var notifs = JSON.parse(localStorage.getItem('pm_notifications') || '[]');
      notifs = notifs.map(function (n) {
        if (n.id === id) n.dismissed = true;
        return n;
      });
      localStorage.setItem('pm_notifications', JSON.stringify(notifs));
      var el = document.getElementById('pm-notif-' + id);
      if (el) el.style.display = 'none';
    } catch(e) {}
  };

  /* ── Auto-init on DOMContentLoaded ──────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.loadIntakeState);
  } else {
    // Already loaded — run after brief tick so AGENCY_KEY is set
    setTimeout(window.loadIntakeState, 50);
  }

})();
