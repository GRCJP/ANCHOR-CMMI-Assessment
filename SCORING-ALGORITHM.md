# ANCHOR Platform — CMMI Scoring Algorithm Reference

## Overview

The ANCHOR Platform scores each agency assessment using the **NIST CSF 2.0** control framework mapped to **CMMI Maturity Levels (ML 0–5)**. Every control in the Security Requirements Traceability Matrix (SRTM) is independently scored, and those scores are aggregated upward from procedure → control → CSF function → overall agency maturity.

---

## Scoring Hierarchy

```
Assessment
└── CSF Function (GOVERN / IDENTIFY / PROTECT / DETECT / RESPOND / RECOVER)
    └── Control (e.g., GV.OC-01)
        └── Procedure (e.g., GV.OC-01a, GV.OC-01b)
```

---

## Level 1 — Procedure Scoring

Each control has 1–3 assessment procedures (sub-items labeled `a`, `b`, `c`). For each procedure the assessor records:

| Field | Options |
|---|---|
| **Implementation Status** | Implemented / Partially Implemented / Planned / Not Implemented |
| **Assessment Result** | MET / NOT MET / N/A |
| **Observation Statement** | Free-text finding |
| **Evidence / Artifacts** | File references |

Procedure-level results feed into the parent control result but do **not** independently carry a CMMI score — the CMMI level is assigned at the control level by the assessor.

---

## Level 2 — Control Scoring

For each control, the assessor sets two values:

### Overall Assessment Result

| Value | Meaning |
|---|---|
| `MET` | All procedures assessed; control is fully satisfied |
| `NOT MET` | One or more procedures have gaps; remediation required |
| `N/A` | Control is not applicable to this agency's environment |

### CMMI Maturity Level (0–5)

| ML | Label | Description |
|---|---|---|
| **0** | Nonexistent | No process in place; complete absence of recognizable controls |
| **1** | Performed | Ad hoc activities occur but are not planned or tracked |
| **2** | Managed | Processes are planned, tracked, and performed on a repeatable basis |
| **3** | Defined | Processes are standardized, documented, and consistently applied |
| **4** | Measured | Processes are quantitatively measured and controlled |
| **5** | Optimized | Continuous improvement based on quantitative feedback |

> **Note:** A control can be marked `MET` with ML 2 (e.g., the control requirement is met but only through ad-hoc practice). It can also be `NOT MET` with ML 2 (processes exist but the specific outcome is not yet achieved).

---

## Level 3 — CSF Function Aggregation

For each of the 6 CSF functions, the platform computes:

```
Function Avg CMMI = SUM(CMMI scores for all scored controls in function)
                   ÷ COUNT(controls with a CMMI score in function)
```

**Controls with no CMMI score assigned are excluded** from the average (they do not count as 0 — they are simply skipped until scored).

| Metric | Formula |
|---|---|
| Controls Met | COUNT where result = `MET` |
| Controls Not Met | COUNT where result = `NOT MET` |
| Controls N/A | COUNT where result = `N/A` |
| Unscored | Total controls − (Met + Not Met + N/A) |
| Avg CMMI | SUM(cmmi) ÷ COUNT(scored) |

---

## Level 4 — Overall Agency Score

```
Overall Avg CMMI = SUM(CMMI scores for ALL scored controls across all functions)
                  ÷ COUNT(all controls with a CMMI score)
```

This is a **flat average** across all 23 controls — it is NOT a weighted average by function. Every control contributes equally regardless of which CSF function it belongs to.

### Example (partial assessment)

| Control | Result | CMMI |
|---|---|---|
| GV.OC-01 | MET | 3 |
| GV.RM-01 | MET | 3 |
| GV.PO-01 | NOT MET | 2 |
| ID.AM-01 | MET | 4 |
| PR.AA-01 | MET | 3 |
| DE.CM-01 | NOT MET | 1 |

```
Overall Avg CMMI = (3 + 3 + 2 + 4 + 3 + 1) ÷ 6 = 2.67
```

The Scoring Summary tab shows:
- **GOVERN** avg: (3+3+2) ÷ 3 = 2.67
- **IDENTIFY** avg: 4 ÷ 1 = 4.0
- **PROTECT** avg: 3 ÷ 1 = 3.0
- **DETECT** avg: 1 ÷ 1 = 1.0
- **Overall**: (3+3+2+4+3+1) ÷ 6 = **2.67**

---

## Progress Tracking

### SRTM Progress Bar (CSF Assessment section)

```
Assessed % = COUNT(controls where result ∈ {MET, NOT MET, N/A})
             ÷ TOTAL_CONTROLS (23) × 100
```

### Questionnaire Progress Bar (Agency Self-Assessment)

```
Fully Complete % = COUNT(controls where ALL questions answered AND evidence file uploaded)
                  ÷ TOTAL_CONTROLS × 100
```

---

## Radar Chart (Scoring Summary)

The radar chart plots **Avg CMMI per CSF function** (scale 0–5) against a **target line** (default target = 3.0 for all functions, customizable per agency type).

The dashed green line = target. The solid blue polygon = current assessment scores.

---

## MET / NOT MET Determination Guidance

The assessor uses the following criteria when setting the overall control result:

| Scenario | Recommended Result |
|---|---|
| All procedures are Implemented and evidence confirmed | MET |
| All procedures implemented but evidence incomplete | NOT MET |
| One or more procedures are Partially Implemented | NOT MET (or MET at ML 2 with observation) |
| Control is irrelevant to the agency (e.g., no mainframes) | N/A |
| No process exists at all | NOT MET, ML 0 |

---

## CMMI Level Assignment Tips

| Observed Pattern | Suggested ML |
|---|---|
| No documentation, entirely reactive | 1 |
| Policy exists, not consistently followed | 2 |
| Policy + procedure + consistent practice | 3 |
| Metrics tracked, regular reviews | 4 |
| Continuous improvement loop, lessons applied | 5 |

Assessors should assign ML based on **evidence and interview findings**, not solely on self-reported agency responses.

---

## Data Storage

All SRTM scores are persisted per-agency in `localStorage`:

| Key | Content |
|---|---|
| `anchor_srtm_mdot` | `{ "GV.OC-01": { result: "MET", cmmi: 3, procs: { "GV.OC-01a": { impl: "Implemented", result: "MET" } } } }` |
| `anchor_srtm_dpscs` | Same structure for DPSCS |
| `anchor_srtm_msde` | Same structure for MSDE |

Scores persist across page reloads and are restored automatically when returning to the CSF Assessment section.

---

*ANCHOR Platform — Maryland DoIT Office of Security Management*
*Scoring Reference v2.0 | NIST CSF 2.0 / CMMI ML 0–5*
