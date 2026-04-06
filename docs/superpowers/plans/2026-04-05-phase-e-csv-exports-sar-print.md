# Phase E: CSV Exports + SAR Print Isolation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all stub export buttons with real CSV downloads and fix SAR printing to open a clean new window instead of printing the whole page.

**Architecture:** All changes are confined to 4 HTML files. CSV exports use the Blob API (same pattern as `src/js/agency-assessment.js:downloadCSV`). SRTM data is read from `localStorage` using the existing `anchor_srtm_{agencyKey}` keys and cross-referenced with `SRTM_DATA` (globally available in each agency page). SAR print opens a new window, writes the modal's inner HTML, then calls `print()` on that window. No new libraries or files.

**Tech Stack:** Vanilla JS, Blob API, localStorage, `window.open()`, HTML Blob download pattern.

---

## File Map

| File | Lines changed | What changes |
|------|--------------|--------------|
| `agency-msde.html` | ~2457, ~692, ~760, ~1132, ~3326 | Replace `exportSrtm()` stub; wire 2nd SRTM button; wire POA&M button; add `exportPoam()`; replace `window.print()` |
| `agency-dpscs.html` | ~2220, ~691, ~759, ~1090, ~2480 | Same + add missing POA&M export button |
| `agency-mdot.html` | ~2541, ~692, ~760, ~1195, ~2850 | Same as MSDE pattern |
| `main-dashboard.html` | ~274, add near bottom of `<script>` | Wire Export Trend Report button; add `downloadCsv()` + `exportTrendReport()` |

---

## Shared Code (copy exactly for each file)

### `downloadCsv(filename, rows)` — add once per file inside the `<script>` block

```javascript
function downloadCsv(filename, rows) {
  var csv = rows.map(function(r) {
    return r.map(function(c) {
      var s = String(c == null ? '' : c);
      return /[,"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(',');
  }).join('\n');
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

### `printSar()` — add once per agency file

```javascript
function printSar() {
  var content = document.querySelector('#sar-modal > div');
  if (!content) return;
  var w = window.open('', '_blank', 'width=900,height=700');
  if (!w) {
    notify('Pop-up blocked — using standard print. For best results, allow pop-ups for this page.');
    window.print();
    return;
  }
  w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Security Assessment Report</title><style>' +
    'body{margin:1in;font-family:system-ui,sans-serif;font-size:11pt;color:#000;background:#fff;}' +
    'table{width:100%;border-collapse:collapse;page-break-inside:avoid;}' +
    'th,td{border:1px solid #ccc;padding:6px 8px;font-size:9pt;}' +
    'th{background:#1e3a5f;color:#fff;}' +
    'h1,h2,h3{page-break-after:avoid;}' +
    '.sar-section{page-break-before:always;}' +
    'button{display:none!important;}' +
    '@page{size:letter;margin:1in;}' +
    '</style></head><body>' + content.innerHTML + '</body></html>');
  w.document.close();
  w.focus();
  w.print();
  w.close();
}
```

---

## Task 1: agency-msde.html — CSV exports

**Files:**
- Modify: `agency-msde.html`

Key lines (verify before editing — line numbers may shift):
- `exportSrtm()` stub: line ~2457
- "Export SRTM" button (calls exportSrtm already): line ~692
- "Export Full SRTM" button (inline notify stub): line ~760
- "Export POA&M" button (inline notify stub): line ~1132
- localStorage key: `anchor_srtm_msde`
- Agency prefix for filenames: `MSDE`

- [ ] **Step 1: Replace the `exportSrtm()` stub**

Find this at line ~2457:
```javascript
function exportSrtm() { notify('SRTM exported: MSDE_NIST_CSF_SRTM_Assessment.xlsx — All controls, procedures, observations, and evidence included.'); }
```

Replace with:
```javascript
function exportSrtm() {
  var raw = {};
  try { raw = JSON.parse(localStorage.getItem('anchor_srtm_msde') || '{}'); } catch(e) {}
  if (!Object.keys(raw).length) { notify('No assessment data found — complete the CSF Assessment first.'); return; }
  var today = new Date().toISOString().split('T')[0];
  var rows = [['Control ID','CSF Function','Control Name','Result','CMMI Score','Observations']];
  SRTM_DATA.forEach(function(fn) {
    fn.controls.forEach(function(ctrl) {
      var st = raw[ctrl.id] || {};
      var obs = st.obs || Object.values(st.procs||{}).map(function(p){return p.obs||'';}).filter(Boolean).join('; ');
      rows.push([ctrl.id, fn.fn, ctrl.name, st.result||'', (st.cmmi===undefined||st.cmmi==='')?'':st.cmmi, obs]);
    });
  });
  downloadCsv('MSDE_SRTM_Export_' + today + '.csv', rows);
}
```

- [ ] **Step 2: Add `exportPoam()` function** (add directly after `exportSrtm()`)

```javascript
function exportPoam() {
  var raw = {};
  try { raw = JSON.parse(localStorage.getItem('anchor_srtm_msde') || '{}'); } catch(e) {}
  var today = new Date().toISOString().split('T')[0];
  var rows = [['Item #','Control ID','Finding Description','CSF Function','Priority','Owner','Due Date','Status']];
  var item = 1;
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().split('T')[0]; }
  SRTM_DATA.forEach(function(fn) {
    fn.controls.forEach(function(ctrl) {
      var st = raw[ctrl.id] || {};
      if ((st.result||'').toUpperCase() !== 'NOT MET') return;
      var cmmi = parseFloat(st.cmmi) || 0;
      var priority = cmmi <= 1 ? 'P1' : cmmi <= 2 ? 'P2' : 'P3';
      var owner = (fn.fn === 'GOVERN' || fn.fn === 'RESPOND') ? 'CISO' : 'IT Director';
      var duedays = priority === 'P1' ? 90 : priority === 'P2' ? 180 : 270;
      var obs = st.obs || Object.values(st.procs||{}).map(function(p){return p.obs||'';}).filter(Boolean).join('; ');
      rows.push([item++, ctrl.id, obs || ctrl.name + ' — remediation required', fn.fn, priority, owner, addDays(duedays), 'Open']);
    });
  });
  if (rows.length === 1) { notify('No open POA\u0026M items — all controls are MET or N/A.'); return; }
  downloadCsv('MSDE_POAM_Export_' + today + '.csv', rows);
}
```

- [ ] **Step 3: Add `downloadCsv()` helper** (add before `exportSrtm()`)

Use the shared `downloadCsv` code from the top of this plan.

- [ ] **Step 4: Wire the "Export Full SRTM" button** (line ~760)

Find:
```html
<button class="btn btn-primary btn-sm" onclick="notify('Assessment scoring exported: MSDE_CSF_SRTM_Scoring.xlsx')">Export Full SRTM</button>
```
Replace `onclick` value with `"exportSrtm()"`:
```html
<button class="btn btn-primary btn-sm" onclick="exportSrtm()">Export Full SRTM</button>
```

- [ ] **Step 5: Wire the "Export POA&M" button** (line ~1132)

Find:
```html
<button class="btn btn-outline" onclick="notify('POA&M exported: MSDE_POAM_v2.xlsx')">Export POA&amp;M</button>
```
Replace with:
```html
<button class="btn btn-outline" onclick="exportPoam()">Export POA&amp;M</button>
```

- [ ] **Step 6: Manual verify** — open `http://localhost:8080/agency-msde.html`, go to CSF Assessment, score 2–3 controls (mix of MET and NOT MET), then:
  - Click "Export SRTM" → should download `MSDE_SRTM_Export_YYYY-MM-DD.csv` with scored rows
  - Click "Export POA&M" in POA&M tab → should download `MSDE_POAM_Export_YYYY-MM-DD.csv` with only NOT MET rows
  - With empty localStorage: click either button → should show notify message, no download

---

## Task 2: agency-msde.html — SAR print isolation + commit

**Files:**
- Modify: `agency-msde.html`

- [ ] **Step 1: Add `printSar()` function** (add after `exportPoam()` in the `<script>` block)

Use the shared `printSar` code from the top of this plan.

- [ ] **Step 2: Replace the `window.print()` button** (line ~3326)

Find:
```html
<button onclick="window.print()" style="background:#2563a8;color:#fff;border:none;padding:5px 14px;border-radius:5px;cursor:pointer;font-size:.8rem;">&#128438; Print / Save PDF</button>
```
Replace with:
```html
<button onclick="printSar()" style="background:#2563a8;color:#fff;border:none;padding:5px 14px;border-radius:5px;cursor:pointer;font-size:.8rem;">&#128438; Print / Save PDF</button>
```

- [ ] **Step 3: Manual verify** — open the SAR tab, click "Generate SAR" to populate the modal, then click "Print / Save PDF". A new window should open showing only the SAR document (no sidebar, no nav). Browser print dialog should appear.

- [ ] **Step 4: Commit**

```bash
git add agency-msde.html
git commit -m "Phase E: Real CSV exports + SAR print isolation for MSDE"
```

---

## Task 3: agency-dpscs.html — CSV exports + SAR print + commit

**Files:**
- Modify: `agency-dpscs.html`

Key lines:
- `exportSrtm()` stub: line ~2220
- "Export SRTM" button (calls exportSrtm): line ~691
- "Export Full SRTM" button (inline notify): line ~759
- POA&M export button: **MISSING — must add**
- `window.print()` button: line ~2480
- localStorage key: `anchor_srtm_dpscs`
- Agency prefix: `DPSCS`

- [ ] **Step 1: Add `downloadCsv()` helper** (add before `exportSrtm()` stub at line ~2220)

Use the shared `downloadCsv` code from the top of this plan.

- [ ] **Step 2: Replace `exportSrtm()` stub** (line ~2220)

Find:
```javascript
function exportSrtm() { notify('SRTM exported: DPSCS_NIST_CSF_SRTM_Assessment.xlsx — All controls, procedures, observations, and evidence included.'); }
```
Replace with the same function body as Task 1 Step 1, but with `anchor_srtm_dpscs` and filename prefix `DPSCS`:
```javascript
function exportSrtm() {
  var raw = {};
  try { raw = JSON.parse(localStorage.getItem('anchor_srtm_dpscs') || '{}'); } catch(e) {}
  if (!Object.keys(raw).length) { notify('No assessment data found — complete the CSF Assessment first.'); return; }
  var today = new Date().toISOString().split('T')[0];
  var rows = [['Control ID','CSF Function','Control Name','Result','CMMI Score','Observations']];
  SRTM_DATA.forEach(function(fn) {
    fn.controls.forEach(function(ctrl) {
      var st = raw[ctrl.id] || {};
      var obs = st.obs || Object.values(st.procs||{}).map(function(p){return p.obs||'';}).filter(Boolean).join('; ');
      rows.push([ctrl.id, fn.fn, ctrl.name, st.result||'', (st.cmmi===undefined||st.cmmi==='')?'':st.cmmi, obs]);
    });
  });
  downloadCsv('DPSCS_SRTM_Export_' + today + '.csv', rows);
}
```

- [ ] **Step 3: Add `exportPoam()` function** (add after `exportSrtm()`)

Same as Task 1 Step 2, but with `anchor_srtm_dpscs` and filename prefix `DPSCS`:
```javascript
function exportPoam() {
  var raw = {};
  try { raw = JSON.parse(localStorage.getItem('anchor_srtm_dpscs') || '{}'); } catch(e) {}
  var today = new Date().toISOString().split('T')[0];
  var rows = [['Item #','Control ID','Finding Description','CSF Function','Priority','Owner','Due Date','Status']];
  var item = 1;
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().split('T')[0]; }
  SRTM_DATA.forEach(function(fn) {
    fn.controls.forEach(function(ctrl) {
      var st = raw[ctrl.id] || {};
      if ((st.result||'').toUpperCase() !== 'NOT MET') return;
      var cmmi = parseFloat(st.cmmi) || 0;
      var priority = cmmi <= 1 ? 'P1' : cmmi <= 2 ? 'P2' : 'P3';
      var owner = (fn.fn === 'GOVERN' || fn.fn === 'RESPOND') ? 'CISO' : 'IT Director';
      var duedays = priority === 'P1' ? 90 : priority === 'P2' ? 180 : 270;
      var obs = st.obs || Object.values(st.procs||{}).map(function(p){return p.obs||'';}).filter(Boolean).join('; ');
      rows.push([item++, ctrl.id, obs || ctrl.name + ' — remediation required', fn.fn, priority, owner, addDays(duedays), 'Open']);
    });
  });
  if (rows.length === 1) { notify('No open POA\u0026M items — all controls are MET or N/A.'); return; }
  downloadCsv('DPSCS_POAM_Export_' + today + '.csv', rows);
}
```

- [ ] **Step 4: Add `printSar()` function** (add after `exportPoam()`)

Use the shared `printSar` code from the top of this plan (identical across all agency files).

- [ ] **Step 5: Wire "Export Full SRTM" button** (line ~759)

Find:
```html
<button class="btn btn-primary btn-sm" onclick="notify('Assessment scoring exported: DPSCS_CSF_SRTM_Scoring.xlsx')">Export Full SRTM</button>
```
Replace onclick:
```html
<button class="btn btn-primary btn-sm" onclick="exportSrtm()">Export Full SRTM</button>
```

- [ ] **Step 6: Add missing POA&M export button** — insert a `btn-row` div in the POA&M section. Find this closing structure (around line ~1126):
```html
            </table>
          </div>
        </div>
      </section>

      
<!-- POAM DETAIL MODAL
```
Insert between `</div>` (end of card) and `</section>`:
```html
            </table>
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn-outline" onclick="exportPoam()">Export POA&amp;M</button>
          <button class="btn btn-outline" onclick="notify('POA&amp;M synced with ServiceNow GRC')">Sync to GRC</button>
        </div>
      </section>
```

- [ ] **Step 7: Wire the `window.print()` button** (line ~2480)

Find:
```html
<button onclick="window.print()" style="background:#2563a8;color:#fff;border:none;padding:5px 14px;border-radius:5px;cursor:pointer;font-size:.8rem;">&#128438; Print / Save PDF</button>
```
Replace with:
```html
<button onclick="printSar()" style="background:#2563a8;color:#fff;border:none;padding:5px 14px;border-radius:5px;cursor:pointer;font-size:.8rem;">&#128438; Print / Save PDF</button>
```

- [ ] **Step 8: Manual verify** — same checks as MSDE (SRTM CSV, POA&M CSV, SAR print new window)

- [ ] **Step 9: Commit**

```bash
git add agency-dpscs.html
git commit -m "Phase E: Real CSV exports + SAR print isolation for DPSCS"
```

---

## Task 4: agency-mdot.html — CSV exports + SAR print + commit

**Files:**
- Modify: `agency-mdot.html`

Key lines:
- `exportSrtm()` stub: line ~2541 (multi-line stub — find by `function exportSrtm`)
- "Export SRTM" button (calls exportSrtm): line ~692
- "Export Full SRTM" button (inline notify): line ~760
- "Export POA&M" button (inline notify): line ~1195
- `window.print()` button: line ~2850
- localStorage key: `anchor_srtm_mdot`
- Agency prefix: `MDOT`

- [ ] **Step 1: Add `downloadCsv()` helper** (find `function exportSrtm` at line ~2541, insert `downloadCsv` immediately before it)

Use the shared `downloadCsv` code from the top of this plan.

- [ ] **Step 2: Replace the `exportSrtm()` function body**

Find the full function (it may span multiple lines — search for `function exportSrtm` and replace the entire function):
```javascript
function exportSrtm() {
  var raw = {};
  try { raw = JSON.parse(localStorage.getItem('anchor_srtm_mdot') || '{}'); } catch(e) {}
  if (!Object.keys(raw).length) { notify('No assessment data found — complete the CSF Assessment first.'); return; }
  var today = new Date().toISOString().split('T')[0];
  var rows = [['Control ID','CSF Function','Control Name','Result','CMMI Score','Observations']];
  SRTM_DATA.forEach(function(fn) {
    fn.controls.forEach(function(ctrl) {
      var st = raw[ctrl.id] || {};
      var obs = st.obs || Object.values(st.procs||{}).map(function(p){return p.obs||'';}).filter(Boolean).join('; ');
      rows.push([ctrl.id, fn.fn, ctrl.name, st.result||'', (st.cmmi===undefined||st.cmmi==='')?'':st.cmmi, obs]);
    });
  });
  downloadCsv('MDOT_SRTM_Export_' + today + '.csv', rows);
}
```

- [ ] **Step 3: Add `exportPoam()` function** (add after `exportSrtm()`)

```javascript
function exportPoam() {
  var raw = {};
  try { raw = JSON.parse(localStorage.getItem('anchor_srtm_mdot') || '{}'); } catch(e) {}
  var today = new Date().toISOString().split('T')[0];
  var rows = [['Item #','Control ID','Finding Description','CSF Function','Priority','Owner','Due Date','Status']];
  var item = 1;
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().split('T')[0]; }
  SRTM_DATA.forEach(function(fn) {
    fn.controls.forEach(function(ctrl) {
      var st = raw[ctrl.id] || {};
      if ((st.result||'').toUpperCase() !== 'NOT MET') return;
      var cmmi = parseFloat(st.cmmi) || 0;
      var priority = cmmi <= 1 ? 'P1' : cmmi <= 2 ? 'P2' : 'P3';
      var owner = (fn.fn === 'GOVERN' || fn.fn === 'RESPOND') ? 'CISO' : 'IT Director';
      var duedays = priority === 'P1' ? 90 : priority === 'P2' ? 180 : 270;
      var obs = st.obs || Object.values(st.procs||{}).map(function(p){return p.obs||'';}).filter(Boolean).join('; ');
      rows.push([item++, ctrl.id, obs || ctrl.name + ' — remediation required', fn.fn, priority, owner, addDays(duedays), 'Open']);
    });
  });
  if (rows.length === 1) { notify('No open POA\u0026M items — all controls are MET or N/A.'); return; }
  downloadCsv('MDOT_POAM_Export_' + today + '.csv', rows);
}
```

- [ ] **Step 4: Add `printSar()` function** (add after `exportPoam()`)

Use the shared `printSar` code from the top of this plan.

- [ ] **Step 5: Wire "Export Full SRTM" button** (line ~760)

Find:
```html
<button class="btn btn-primary btn-sm" onclick="notify('Assessment scoring exported: MDOT_CSF_SRTM_Scoring.xlsx')">Export Full SRTM</button>
```
Replace onclick:
```html
<button class="btn btn-primary btn-sm" onclick="exportSrtm()">Export Full SRTM</button>
```

- [ ] **Step 6: Wire "Export POA&M" button** (line ~1195)

Find:
```html
<button class="btn btn-outline" onclick="notify('POA&M exported: MDOT_POAM_v1.xlsx')">Export POA&amp;M</button>
```
Replace with:
```html
<button class="btn btn-outline" onclick="exportPoam()">Export POA&amp;M</button>
```

- [ ] **Step 7: Wire the `window.print()` button** (line ~2850)

Find:
```html
<button onclick="window.print()" style="background:#2563a8;color:#fff;border:none;padding:5px 14px;border-radius:5px;cursor:pointer;font-size:.8rem;">&#128438; Print / Save PDF</button>
```
Replace with:
```html
<button onclick="printSar()" style="background:#2563a8;color:#fff;border:none;padding:5px 14px;border-radius:5px;cursor:pointer;font-size:.8rem;">&#128438; Print / Save PDF</button>
```

- [ ] **Step 8: Manual verify** — same checks as MSDE

- [ ] **Step 9: Commit**

```bash
git add agency-mdot.html
git commit -m "Phase E: Real CSV exports + SAR print isolation for MDOT"
```

---

## Task 5: main-dashboard.html — Statewide summary CSV + commit

**Files:**
- Modify: `main-dashboard.html`

Key lines:
- "Export Trend Report" button: line ~274 (inline `onclick="notify(...)"`)
- `computeSrtmStats()` already exists (added in Phase D)
- `AGENCY_MATURITY` constant already exists (at line ~2905)

- [ ] **Step 1: Add `downloadCsv()` helper** — find the `computeSrtmStats` function (around line ~2911) and add `downloadCsv` immediately before it:

Use the shared `downloadCsv` code from the top of this plan.

- [ ] **Step 2: Add `exportTrendReport()` function** — add after `computeSrtmStats()`:

```javascript
function exportTrendReport() {
  var agencies = [
    { key: 'msde',  name: 'Maryland State Department of Education (MSDE)' },
    { key: 'dpscs', name: 'Dept. of Public Safety & Correctional Services (DPSCS)' },
    { key: 'mdot',  name: 'Maryland Dept. of Transportation (MDOT)' }
  ];
  var today = new Date().toISOString().split('T')[0];
  var rows = [['Agency','Avg CMMI Score','Controls Assessed','MET','NOT MET','N/A','Open POA&M Items']];
  agencies.forEach(function(a) {
    var s = computeSrtmStats(a.key);
    if (s) {
      rows.push([a.name, s.avgCmmi, s.totalControls, s.met, s.notMet, s.na, s.poamCount]);
    } else {
      rows.push([a.name, AGENCY_MATURITY[a.key] || '—', '—', '—', '—', '—', '—']);
    }
  });
  downloadCsv('MD_Statewide_SRTM_Summary_' + today + '.csv', rows);
}
```

- [ ] **Step 3: Wire the "Export Trend Report" button** (line ~274)

Find:
```html
<button class="btn btn-outline btn-sm" onclick="notify(' Trend report exported: MD_Statewide_Trend_Report_Q1_2026.pdf')">Export Trend Report</button>
```
Replace with:
```html
<button class="btn btn-outline btn-sm" onclick="exportTrendReport()">Export Trend Report</button>
```

- [ ] **Step 4: Manual verify** — open `http://localhost:8080/main-dashboard.html`:
  - With no SRTM data in localStorage: click "Export Trend Report" → CSV downloads with agency names, CMMI fallback values (2.7, 2.3, 3.4), and `—` for control counts
  - After scoring controls in at least one agency: click again → that agency row shows real counts

- [ ] **Step 5: Commit**

```bash
git add main-dashboard.html
git commit -m "Phase E: Statewide summary CSV export on main dashboard"
```

---

## Final Verification Checklist

- [ ] MSDE "Export SRTM" (both buttons) → downloads real CSV
- [ ] MSDE "Export POA&M" → downloads CSV of NOT MET controls only
- [ ] MSDE "Print / Save PDF" → new window opens with clean SAR content, print dialog appears
- [ ] DPSCS same three checks above
- [ ] MDOT same three checks above
- [ ] Dashboard "Export Trend Report" → downloads statewide CSV
- [ ] All empty-state fallbacks show notify() instead of crashing
- [ ] Popup-blocked: if browser blocks popup, falls back to window.print() gracefully
