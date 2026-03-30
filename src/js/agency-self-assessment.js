// Anchor Platform — Agency Self-Assessment (NIST CSF 2.0)
// 21 controls. Each has an assessor-interview context paragraph,
// 2–4 targeted questions, and a clearly specified artifact requirement.
// Agency reps answer in their own words — assessors do the scoring.

(function () {

  // ── Control Bank ──────────────────────────────────────────────────────────

  const CONTROLS = [

    // ══════════════════════════════════════════════════════
    // GOVERN
    // ══════════════════════════════════════════════════════

    {
      id: 'GV.OC-01', fn: 'GOVERN', fnColor: '#6d28d9', fnBg: '#ede9fe',
      label: 'Information Security Policy',
      artifact: 'Current, signed Information Security Policy — PDF or DOCX',
      context: 'Your Information Security Policy is the foundation of your entire cybersecurity program. It establishes what is expected of all staff, how security decisions are made, and how your agency approaches risk. Assessors review this policy to confirm it is current (reviewed within 2 years), formally approved by agency leadership, and actively enforced — not just a document sitting on a shelf. Policies that haven\'t been updated to reflect current technology, cloud environments, or evolving threats are one of the most common findings in state agency assessments.',
      questions: [
        'Does your agency have a current Information Security Policy? Provide the version number and the date it was most recently reviewed and formally approved by agency leadership.',
        'Who is responsible for maintaining, enforcing, and updating the policy? Describe the role (e.g., CISO, IT Security Officer, Deputy Secretary for IT) and how often that person or team reviews the policy for needed updates.',
        'Are there sections of the policy that are not yet fully implemented or are under active revision? If so, briefly describe those gaps and any plans or timelines for addressing them.'
      ]
    },
    {
      id: 'GV.RM-01', fn: 'GOVERN', fnColor: '#6d28d9', fnBg: '#ede9fe',
      label: 'Risk Management Framework',
      artifact: 'Risk Register or Risk Management Framework document — PDF or XLSX',
      context: 'Risk management is how your agency identifies, evaluates, and prioritizes cybersecurity threats before they become incidents. Assessors look for evidence of a structured, repeatable process — not just awareness that risks exist. A maintained risk register shows that your agency actively tracks threats, has assigned ownership for each risk, and revisits the register as conditions change. Agencies without a formal risk management process tend to be reactive rather than proactive, which significantly elevates their exposure.',
      questions: [
        'Does your agency maintain a formal risk register or risk management documentation? Describe how it is structured — for example, is it organized by system, by business function, or by threat category?',
        'How frequently is the risk posture formally reviewed, and who participates in that process? (Examples: quarterly review with CISO and IT leadership; annual review during budget cycle.)',
        'Describe two or three of the highest-priority cybersecurity risks your agency is currently tracking. For each, briefly note what mitigation or remediation is in place or planned.'
      ]
    },
    {
      id: 'GV.RR-01', fn: 'GOVERN', fnColor: '#6d28d9', fnBg: '#ede9fe',
      label: 'Cybersecurity Roles & Responsibilities',
      artifact: 'Org Chart or RACI Matrix showing cybersecurity responsibilities — PDF or PNG',
      context: 'Clear ownership of cybersecurity responsibilities is essential for accountability. Assessors look for evidence that specific roles — not just generic IT staff — are formally assigned cybersecurity duties. This includes knowing who is the agency\'s designated security point of contact, who can declare an incident, who approves access, and who is accountable to the Secretary or DoIT. Without defined ownership, critical tasks fall through the cracks, especially during incidents or audits. Assessors also check whether staff have formally acknowledged their individual responsibilities through signed agreements or annual attestations.',
      questions: [
        'Which cybersecurity roles are formally assigned within your agency? List the titles that exist (e.g., CISO, IT Security Officer, System Owner, Privacy Officer) and briefly describe each role\'s primary responsibility.',
        'How are all employees — including contractors and temporary staff — informed of their individual cybersecurity responsibilities? Are staff required to sign a Rules of Behavior agreement or complete an annual acknowledgment?',
        'Who has the authority to declare a cybersecurity incident and initiate the agency\'s incident response procedures? How is that authority communicated across the organization?'
      ]
    },
    {
      id: 'GV.PO-01', fn: 'GOVERN', fnColor: '#6d28d9', fnBg: '#ede9fe',
      label: 'Policy Review & Maintenance Cycle',
      artifact: 'Policy review log or document version history showing review dates — PDF or XLSX',
      context: 'Policies that exist but are never reviewed quickly become irrelevant. Assessors evaluate whether your agency has a defined schedule for reviewing all security policies and whether that schedule is actually followed. This matters because technology changes, new threats emerge, personnel turn over, and regulations evolve — all of which may require policy updates. A review log or version history provides objective evidence that policies are actively maintained, not just created once and forgotten.',
      questions: [
        'Does your agency have a defined policy review schedule (e.g., annual, every two years, or following a significant change)? Is this schedule formally documented in the policy itself or in a separate governance document?',
        'How are policy updates approved and communicated to staff once finalized? Describe the approval chain and how employees are notified of changes.',
        'When were your security policies last comprehensively reviewed? Were any updates made at that time, and what drove those changes?'
      ]
    },
    {
      id: 'GV.SC-01', fn: 'GOVERN', fnColor: '#6d28d9', fnBg: '#ede9fe',
      label: 'Supply Chain & Vendor Risk',
      artifact: 'Sample vendor contract with security provisions, or vendor security assessment questionnaire — PDF',
      context: 'State agencies rely on dozens of third-party vendors, managed service providers, and SaaS platforms — each one a potential entry point into your environment. Supply chain risk is one of the fastest-growing attack vectors nationally, and DoIT specifically looks at how agencies manage vendor cybersecurity obligations. Assessors review whether contracts include security requirements, whether vendors undergo any security review before onboarding, and whether vendor access to agency systems is controlled and monitored. The absence of security provisions in vendor contracts is a high-severity finding.',
      questions: [
        'Does your agency require vendors, contractors, and managed service providers to meet defined cybersecurity standards as a condition of their contract? Describe what those requirements look like (e.g., SOC 2 certification, security addendum, minimum control requirements).',
        'How does your agency review or assess a vendor\'s security posture before granting them access to agency systems or data? Is there a formal intake process or questionnaire?',
        'How is vendor and contractor access to agency systems provisioned, monitored, and revoked? Are third-party accounts subject to the same access control and MFA requirements as agency staff?'
      ]
    },

    // ══════════════════════════════════════════════════════
    // IDENTIFY
    // ══════════════════════════════════════════════════════

    {
      id: 'ID.AM-01', fn: 'IDENTIFY', fnColor: '#1d4ed8', fnBg: '#dbeafe',
      label: 'Asset Inventory & Network Architecture',
      artifact: 'Current hardware/software asset inventory export AND current network diagram — XLSX or PDF, PNG',
      context: 'You cannot protect what you don\'t know you have. A complete, current asset inventory — covering hardware, software, cloud services, and network infrastructure — is the starting point for almost every other security control. Assessors check whether your inventory is actively maintained (not a snapshot from two years ago), whether it covers cloud and SaaS environments, and whether a current network diagram exists showing how systems connect and where security boundaries are enforced. Agencies frequently discover unknown or unmanaged devices and systems during this phase.',
      questions: [
        'How does your agency maintain its hardware and software asset inventory? What tool or system is used (e.g., SCCM, ServiceNow CMDB, Tenable, spreadsheet), and how frequently is it updated?',
        'Does the inventory include cloud-hosted infrastructure, SaaS applications, contractor-managed systems, and third-party services that process or store agency data?',
        'Does your agency have a current network diagram showing system connectivity, security zones, and network boundaries? When was it last updated, and who is responsible for keeping it current?'
      ]
    },
    {
      id: 'ID.AM-02', fn: 'IDENTIFY', fnColor: '#1d4ed8', fnBg: '#dbeafe',
      label: 'Data Classification',
      artifact: 'Data Classification Policy — PDF or DOCX',
      context: 'Not all data requires the same level of protection. A data classification policy establishes a shared vocabulary for how your agency categorizes its information assets — distinguishing public information from sensitive business data, and sensitive data from highly restricted data like CJIS, PHI, or PII subject to breach notification laws. Assessors look for evidence that the classification scheme is actually applied — that staff know what kind of data they handle, how to label it, and what they\'re allowed to do with it. Mishandling of sensitive data is one of the most common breach vectors for government agencies.',
      questions: [
        'Does your agency have a data classification policy? Describe the classification levels used (e.g., Public, Internal Use, Sensitive/Controlled, Restricted/Confidential) and give an example of the type of data that falls into each level.',
        'How is sensitive data — such as PII, CJIS criminal justice information, PHI, or federal tax information — identified, labeled, and tracked across your systems and shared drives?',
        'Are there documented data handling requirements tied to each classification level covering storage, transmission, access controls, and secure disposal?'
      ]
    },
    {
      id: 'ID.RA-01', fn: 'IDENTIFY', fnColor: '#1d4ed8', fnBg: '#dbeafe',
      label: 'Risk Assessment',
      artifact: 'Most recent formal Risk Assessment Report — PDF',
      context: 'A risk assessment is a structured process for identifying threats, evaluating vulnerabilities, and determining which risks require immediate action versus long-term treatment. It is different from a risk register — the assessment is the analysis that feeds the register. Assessors look at the recency of the assessment, the methodology used, whether results were shared with leadership, and — critically — whether findings actually drove remediation. An assessment that produces a report that no one acts on provides little security value.',
      questions: [
        'When was your most recent formal cybersecurity risk assessment conducted? What methodology or framework was used (e.g., NIST SP 800-30, FIPS 199, NIST RMF, vendor-led assessment)?',
        'Were the results formally documented and presented to agency leadership or the CISO? How were findings prioritized for remediation?',
        'What were the two or three highest-priority findings from the most recent assessment, and what actions have been taken or are planned in response?'
      ]
    },
    {
      id: 'ID.RA-02', fn: 'IDENTIFY', fnColor: '#1d4ed8', fnBg: '#dbeafe',
      label: 'Vulnerability Scanning',
      artifact: 'Most recent vulnerability scan report (summary acceptable) — PDF',
      context: 'Vulnerability scanning is a technical control that identifies known weaknesses in your systems before attackers do. It is separate from patch management — scanning tells you what needs to be patched; patch management is the process of applying the fix. Assessors look at scan frequency, scope (are all systems included?), how results are tracked, and how quickly critical vulnerabilities are remediated. Agencies that scan infrequently or only scan a subset of their environment often have significant blind spots. DoIT expects agencies to have a defined vulnerability management program, not just occasional scans.',
      questions: [
        'Does your agency conduct regular vulnerability scans of your IT environment? What scanning tool is used (e.g., Tenable Nessus, Qualys, Rapid7, DoIT-managed service), and how frequently are scans performed?',
        'What is the scope of your scanning — does it cover all servers, workstations, network devices, cloud environments, and internet-facing systems, or only a subset?',
        'How are scan findings tracked and prioritized for remediation? What is your defined timeframe for remediating critical and high-severity vulnerabilities, and what was your remediation rate for those findings in the past 90 days?'
      ]
    },

    // ══════════════════════════════════════════════════════
    // PROTECT
    // ══════════════════════════════════════════════════════

    {
      id: 'PR.AA-01', fn: 'PROTECT', fnColor: '#047857', fnBg: '#d1fae5',
      label: 'Multi-Factor Authentication (MFA)',
      artifact: 'MFA configuration screenshot or MFA enforcement policy — PNG or PDF',
      context: 'Compromised credentials are the leading cause of breaches and ransomware attacks against government agencies nationwide. Multi-Factor Authentication (MFA) is the single highest-impact control for preventing unauthorized access — it stops attackers even when passwords are stolen or guessed. Assessors look beyond whether MFA exists to understand coverage: Is it enforced for all users, or only remote access? Are admin and privileged accounts covered? Are cloud portals and email protected? Partial MFA coverage — for example, only VPN users — leaves large portions of the environment exposed. This is one of the most scrutinized controls in the assessment.',
      questions: [
        'Is MFA currently enforced in your agency? Describe which user groups are covered — all staff, privileged/admin accounts only, remote access only, cloud applications, email, or another specific scope.',
        'What MFA solution or technology is used (e.g., Duo Security, Microsoft Authenticator, RSA SecurID, PIV/CAC smart cards)? Is it centrally managed?',
        'Are there any user accounts, access types, or systems where MFA is not yet enforced? Describe those gaps specifically and provide any planned remediation timeline or mitigation currently in place.'
      ]
    },
    {
      id: 'PR.AT-01', fn: 'PROTECT', fnColor: '#047857', fnBg: '#d1fae5',
      label: 'Security Awareness Training',
      artifact: 'Training completion records for the most recent cycle — XLSX or PDF',
      context: 'The majority of cybersecurity incidents begin with a human action — clicking a phishing link, using a weak password, or mishandling sensitive data. Security awareness training is the control that directly addresses human risk. Assessors review the program\'s content (is it current and relevant?), frequency (annual is minimum; quarterly or ongoing is better), whether it\'s mandatory for all staff including contractors, and completion rates. A program with an 80% completion rate means one in five employees has never been trained — a significant gap. Phishing simulation results, if available, are also highly informative.',
      questions: [
        'What cybersecurity awareness training program does your agency use, and how often is training conducted? Is the content updated regularly to reflect current threats such as phishing, ransomware, and social engineering?',
        'Is security awareness training mandatory for all employees, contractors, and privileged users? What happens if someone does not complete training within the required window?',
        'What was the overall completion rate for the most recent training cycle? Does your agency conduct phishing simulation exercises, and if so, what were the results of the most recent simulation?'
      ]
    },
    {
      id: 'PR.DS-01', fn: 'PROTECT', fnColor: '#047857', fnBg: '#d1fae5',
      label: 'Access Control & Least Privilege',
      artifact: 'Access Control Policy — PDF or DOCX',
      context: 'The principle of least privilege means users and systems should have only the access they need to do their job — nothing more. Overprivileged accounts are one of the most exploited weaknesses in breached environments because they allow attackers to move laterally and escalate privileges once inside. Assessors specifically examine the provisioning and deprovisioning process (how quickly is access removed when someone leaves?), how often access is reviewed, and whether privileged accounts — administrators, service accounts, shared credentials — are managed separately from standard user accounts. Privileged accounts with no additional controls are a critical finding.',
      questions: [
        'How does your agency provision new user accounts and revoke access when employees leave or change roles? Describe the process and approximate timeframe from separation to account deactivation.',
        'How frequently are user access rights formally reviewed and re-certified? Who is responsible for approving continued access, and what happens when access is found to be excessive?',
        'How are privileged accounts (domain admins, local admins, service accounts, shared accounts) inventoried, controlled, and monitored? Are they subject to stricter controls than standard accounts, such as a Privileged Access Management (PAM) tool, separate credentials, or just-in-time access?'
      ]
    },
    {
      id: 'PR.IR-01', fn: 'PROTECT', fnColor: '#047857', fnBg: '#d1fae5',
      label: 'Patch Management',
      artifact: 'Patch management logs covering the most recent 90 days — XLSX or PDF',
      context: 'Unpatched systems are one of the most reliable entry points for attackers. Many of the most damaging ransomware attacks in recent years exploited known vulnerabilities that had patches available for months or years. Patch management is not just about applying Windows updates — it covers all software including browsers, third-party applications, firmware, and network devices. Assessors look at the defined patch cycle, how long critical and high-severity patches sit unaddressed, whether exceptions are documented, and whether the process covers the full environment including cloud and remote systems. A 90-day log gives assessors concrete evidence of the actual patching cadence.',
      questions: [
        'What patch management process and tooling does your agency use (e.g., WSUS, SCCM/Endpoint Configuration Manager, Intune, third-party managed service)? Does it cover all operating systems, applications, browsers, and firmware?',
        'What is your defined target timeframe for applying critical-severity patches after they are released? What about high-severity patches?',
        'What was your patch compliance rate for critical and high-severity vulnerabilities over the past 90 days? Are exceptions (systems that cannot be patched immediately) documented, tracked, and compensating controls applied?'
      ]
    },
    {
      id: 'PR.PS-01', fn: 'PROTECT', fnColor: '#047857', fnBg: '#d1fae5',
      label: 'System Hardening & Secure Configuration',
      artifact: 'Hardening standard or baseline configuration documentation — PDF or DOCX',
      context: 'Out-of-the-box system configurations are designed for ease of use and compatibility — not security. Default settings often include unnecessary services, open ports, default credentials, and disabled logging. System hardening is the practice of configuring systems according to a security baseline (such as CIS Benchmarks or DISA STIGs) to minimize the attack surface. Assessors look for evidence that a hardening standard exists and is applied consistently to all system types — servers, workstations, network devices, and cloud resources. Systems that have never been hardened or are running default configurations represent significant unmitigated risk.',
      questions: [
        'Does your agency use a documented hardening or secure configuration standard for your systems? Which standard or framework do you follow — for example, CIS Benchmarks, DISA STIGs, vendor security guides, or an agency-developed baseline?',
        'How is the hardening standard applied when new systems are deployed? Is it part of an automated build process (e.g., golden image, Group Policy, cloud configuration templates), or applied manually?',
        'Are existing systems periodically audited for configuration drift — that is, checked to confirm they still meet the hardening baseline after updates or changes? How often is this done and who is responsible?'
      ]
    },

    // ══════════════════════════════════════════════════════
    // DETECT
    // ══════════════════════════════════════════════════════

    {
      id: 'DE.CM-01', fn: 'DETECT', fnColor: '#b45309', fnBg: '#fef3c7',
      label: 'Security Monitoring & SIEM',
      artifact: 'SIEM configuration documentation or monitoring dashboard screenshot — PDF or PNG',
      context: 'You cannot respond to a threat you never detected. Security monitoring — particularly through a Security Information and Event Management (SIEM) platform — aggregates logs from across your environment and correlates events to identify suspicious activity. Assessors evaluate not just whether a SIEM exists, but how broadly it is deployed: Are endpoint, network, cloud, and identity logs all feeding into it? Is monitoring continuous or only during business hours? How long are logs retained? Gaps in log sources mean blind spots. Assessors also look at whether alerts are tuned to reduce noise — an alert-flooded team is effectively not monitoring. Log retention of at least 90 days (12 months preferred) is a minimum for effective incident investigation.',
      questions: [
        'Does your agency have a SIEM or centralized log monitoring solution deployed? What product or service is used (e.g., Splunk, Microsoft Sentinel, IBM QRadar, LogRhythm, a DoIT-managed SOC)?',
        'Which systems and data sources currently feed into the monitoring solution? List the log sources (e.g., Active Directory, firewalls, endpoints, cloud platforms, VPN, email gateway) and identify any major systems that are NOT currently monitored.',
        'Is monitoring continuous (24/7) or limited to business hours? If monitoring is managed by a third-party SOC or MSSP, identify the provider. What is your current log retention period — how far back can logs be searched in an investigation?'
      ]
    },
    {
      id: 'DE.AE-01', fn: 'DETECT', fnColor: '#b45309', fnBg: '#fef3c7',
      label: 'Alert Triage & Event Analysis',
      artifact: 'Monitoring procedures document or sample alert triage log — PDF or DOCX',
      context: 'Having a monitoring solution only provides value if someone is actually reviewing and acting on the alerts it generates. Alert fatigue — where analysts are overwhelmed by volume and begin ignoring alerts — is a well-documented failure mode. Assessors look at who is responsible for triage, whether there is a defined process and timeline for acting on high and critical alerts, and how events are escalated and documented from initial detection through closure. Assessors also want to understand your average time-to-triage for critical alerts — organizations that take days to respond to critical alerts have limited ability to contain incidents before they escalate.',
      questions: [
        'Who is responsible for reviewing, triaging, and acting on security alerts? Is there a dedicated security operations function, a shared IT responsibility, or a contracted MSSP? Describe the coverage model (24/7, business hours, on-call).',
        'What is your defined response time for critical and high-severity security alerts — from alert generation to initial triage and investigation? Is this documented as a service level objective?',
        'How are security events documented from initial detection through investigation and closure? What system is used to track open incidents and ensure they are resolved?'
      ]
    },

    // ══════════════════════════════════════════════════════
    // RESPOND
    // ══════════════════════════════════════════════════════

    {
      id: 'RS.MA-01', fn: 'RESPOND', fnColor: '#b91c1c', fnBg: '#fee2e2',
      label: 'Incident Response Plan',
      artifact: 'Current Incident Response Plan — PDF or DOCX',
      context: 'When a cybersecurity incident occurs — a ransomware attack, a data breach, a compromised account — the worst time to figure out what to do is in the moment. An Incident Response Plan (IRP) provides a pre-defined playbook: who does what, who is notified, how systems are isolated, how the public and regulators are informed, and how evidence is preserved. Assessors look for plans that are specific, current, and rehearsed. A generic plan downloaded from the internet that was never adapted to the agency\'s actual environment provides little real-world value. Key elements include defined severity levels, specific escalation paths to DoIT and the Governor\'s office if needed, and breach notification procedures for impacted individuals.',
      questions: [
        'Does your agency have a documented Incident Response Plan? When was it last updated and formally approved? Does it reflect your current IT environment, including cloud services and remote work scenarios?',
        'Does the IRP assign specific named roles (e.g., Incident Commander, Communications Lead, Legal/Privacy Advisor) with clearly defined responsibilities during an incident? Is there a defined process for escalating to agency leadership, DoIT, and law enforcement?',
        'How does the IRP classify incidents by severity? Describe the thresholds that would trigger escalation to the CISO, the agency Secretary, DoIT, or external parties such as CISA. Does the plan include breach notification procedures for incidents involving PII or other regulated data?'
      ]
    },
    {
      id: 'RS.MA-02', fn: 'RESPOND', fnColor: '#b91c1c', fnBg: '#fee2e2',
      label: 'Incident Response Testing',
      artifact: 'Most recent IR exercise results or after-action report — PDF',
      context: 'An untested Incident Response Plan is an assumption — not a capability. Organizations that have never exercised their IRP routinely discover during an actual incident that the plan doesn\'t reflect current staff, that key contacts are wrong, that communication channels don\'t work, or that containment procedures conflict with operational priorities. Assessors view IR exercise history as a direct indicator of incident readiness. Tabletop exercises are the minimum expectation; functional exercises that actually test containment and recovery procedures are stronger evidence. Assessors also look at whether lessons learned from exercises are formally captured and whether the IRP is updated accordingly — a plan that never changes after testing suggests the exercises are superficial.',
      questions: [
        'Has the Incident Response Plan been formally tested within the past 12 months? What type of exercise was conducted — tabletop discussion, functional simulation, red team/purple team exercise, or full operational drill? Who participated?',
        'What were the key findings or gaps identified during the most recent exercise? Were there failures in communication, unclear role assignments, missing contact information, or technical gaps in containment procedures?',
        'Were corrective actions formally assigned, tracked, and closed following the exercise? Was the IRP updated to reflect the lessons learned?'
      ]
    },

    // ══════════════════════════════════════════════════════
    // RECOVER
    // ══════════════════════════════════════════════════════

    {
      id: 'RC.RP-01', fn: 'RECOVER', fnColor: '#0e7490', fnBg: '#cffafe',
      label: 'Disaster Recovery & Business Continuity Plan',
      artifact: 'Disaster Recovery Plan (DRP) or Business Continuity Plan (BCP) — current version — PDF',
      context: 'A Disaster Recovery Plan addresses how your agency restores IT systems and data after a disruptive event — whether that\'s ransomware, hardware failure, a natural disaster, or a prolonged outage. A Business Continuity Plan is broader, covering how the agency continues to deliver services during and after a disruption. Assessors review both the quality and currency of these documents. Key elements include Recovery Time Objectives (RTO — how long until systems are back online) and Recovery Point Objectives (RPO — how much data can be lost). Plans that don\'t reflect current systems, that lack specific RTOs and RPOs, or that don\'t account for cloud and SaaS dependencies are frequently cited as findings. Backup integrity — whether backups are tested and whether they are stored offline and isolated from the production network — is particularly critical given the prevalence of ransomware.',
      questions: [
        'Does your agency have a documented Disaster Recovery Plan (DRP) and/or Business Continuity Plan (BCP)? When were they last updated, and do they reflect your current IT environment including cloud services?',
        'What are the defined Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) for your most critical systems and services? How were those targets determined, and have they been validated through testing?',
        'How are system backups managed — what is backed up, how frequently, and where are backups stored? Are backups maintained offline or in an isolated environment to protect against ransomware? Are backup restorations tested regularly to confirm they work?'
      ]
    },
    {
      id: 'RC.RP-02', fn: 'RECOVER', fnColor: '#0e7490', fnBg: '#cffafe',
      label: 'DR / BCP Testing',
      artifact: 'Most recent DR or BCP test results documentation — PDF',
      context: 'Just as with incident response, a recovery plan that has never been tested is a hope, not a plan. Assessors view DR/BCP test history as critical evidence of actual recovery capability. Many agencies discover during their first test that backup restoration takes far longer than expected, that RTO targets are unrealistic, or that certain systems were never included in the backup scope. Agencies that have tested and refined their plans are measurably better positioned to recover from ransomware, hardware failures, and natural disasters. Assessors look at both the test itself and what happened afterward — did findings drive plan updates and infrastructure improvements, or did the report get filed away?',
      questions: [
        'Has the Disaster Recovery Plan or Business Continuity Plan been formally tested within the past 12 months? What type of test was performed — tabletop walkthrough, partial failover of specific systems, or full recovery exercise?',
        'Were critical systems successfully recovered within the defined RTO and RPO targets during the most recent test? If not, describe what fell short and by how much.',
        'What gaps or failures were identified during testing? Describe the corrective actions taken or planned — for example, infrastructure improvements, backup process changes, or updated documentation.'
      ]
    }

  ]; // end CONTROLS

  const FN_LABELS = {
    GOVERN:   'Governance & Risk Management',
    IDENTIFY: 'Asset & Risk Identification',
    PROTECT:  'Protective Measures',
    DETECT:   'Detection Capabilities',
    RESPOND:  'Incident Response',
    RECOVER:  'Recovery & Continuity'
  };

  const FN_ORDER = ['GOVERN','IDENTIFY','PROTECT','DETECT','RESPOND','RECOVER'];

  // ── Storage ───────────────────────────────────────────────────────────────
  function getAgencySlug() {
    const p = window.location.pathname;
    if (p.includes('mdot'))  return 'mdot';
    if (p.includes('dpscs')) return 'dpscs';
    if (p.includes('msde'))  return 'msde';
    return 'unknown';
  }

  const STORAGE_KEY = 'anchor_selfassessment_' + getAgencySlug();

  function loadAnswers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function saveAnswers(a) { localStorage.setItem(STORAGE_KEY, JSON.stringify(a)); }

  function isAnswered(ctrl, answers) {
    const d = answers[ctrl.id];
    return !!(d && d.answers && d.answers.some(a => a && a.trim().length > 0));
  }

  function isComplete(ctrl, answers) {
    const d = answers[ctrl.id];
    if (!d) return false;
    const allAnswered = ctrl.questions.every((_, i) => d.answers && d.answers[i] && d.answers[i].trim().length > 0);
    return allAnswered && !!d.evidence;
  }

  // ── Progress (no re-render) ───────────────────────────────────────────────
  function updateProgress(answers) {
    const total    = CONTROLS.length;
    const answered = CONTROLS.filter(c => isAnswered(c, answers)).length;
    const complete = CONTROLS.filter(c => isComplete(c, answers)).length;
    const pct      = Math.round((answered / total) * 100);

    const bar    = document.getElementById('sa-progress-bar');
    const label  = document.getElementById('sa-progress-label');
    const pctEl  = document.getElementById('sa-progress-pct');
    const compEl = document.getElementById('sa-complete-count');
    if (bar)    bar.style.width = pct + '%';
    if (label)  label.textContent = answered + ' of ' + total + ' controls with responses';
    if (pctEl)  pctEl.textContent = pct + '%';
    if (compEl) compEl.textContent = complete + ' of ' + total + ' fully complete (all answers + artifact uploaded)';

    FN_ORDER.forEach(fn => {
      const fnCtrls = CONTROLS.filter(c => c.fn === fn);
      const done    = fnCtrls.filter(c => isAnswered(c, answers)).length;
      const badge   = document.getElementById('sa-fn-count-' + fn);
      if (badge) {
        badge.textContent       = done + ' / ' + fnCtrls.length;
        badge.style.background  = done === fnCtrls.length ? '#d1fae5' : '';
        badge.style.color       = done === fnCtrls.length ? '#065f46' : '';
      }
    });

    CONTROLS.forEach(ctrl => {
      const dot = document.getElementById('sa-dot-' + ctrl.id);
      if (!dot) return;
      if (isComplete(ctrl, answers))       { dot.textContent = '✅'; dot.title = 'Complete — all questions answered and artifact uploaded'; }
      else if (isAnswered(ctrl, answers))  { dot.textContent = '📝'; dot.title = 'In progress — artifact still needed'; }
      else                                  { dot.textContent = '○';  dot.title = 'Not started'; }
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function renderSection() {
    const section = document.getElementById('self-assessment');
    if (!section) return;

    const answers  = loadAnswers();
    const total    = CONTROLS.length;
    const answered = CONTROLS.filter(c => isAnswered(c, answers)).length;
    const complete = CONTROLS.filter(c => isComplete(c, answers)).length;
    const pct      = Math.round((answered / total) * 100);
    const byFn     = {};
    CONTROLS.forEach(c => { (byFn[c.fn] = byFn[c.fn] || []).push(c); });

    let html = `
      <div class="page-header">
        <h1>Agency Self-Assessment — NIST CSF 2.0</h1>
        <p>Your assessor uses your responses to evaluate your agency's cybersecurity posture across all six NIST CSF 2.0 functions. Answer each question in your own words — be as specific and honest as possible. There are no wrong answers; partial or in-progress implementations are expected. Upload the requested artifact for each control. Your responses save automatically as you type.</p>
      </div>

      <!-- Progress Card -->
      <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:20px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:12px;">
          <div>
            <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:4px;">
              <span id="sa-progress-pct" style="font-size:2rem;font-weight:800;color:#1e293b;">${pct}%</span>
              <span id="sa-progress-label" style="font-size:.82rem;color:#64748b;">${answered} of ${total} controls with responses</span>
            </div>
            <div id="sa-complete-count" style="font-size:.74rem;color:#059669;font-weight:600;">${complete} of ${total} fully complete (all answers + artifact uploaded)</div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <button class="btn btn-outline btn-sm" onclick="saveSelfAssessmentDraft()">💾 Save Draft</button>
            <button class="btn btn-primary btn-sm" onclick="submitSelfAssessment()">📤 Submit to Assessor</button>
          </div>
        </div>
        <div style="background:#e2e8f0;border-radius:99px;height:8px;overflow:hidden;">
          <div id="sa-progress-bar" style="height:100%;width:${pct}%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);border-radius:99px;transition:width .4s ease;"></div>
        </div>
      </div>

      <!-- Legend -->
      <div style="display:flex;gap:16px;margin-bottom:22px;flex-wrap:wrap;font-size:.73rem;color:#475569;">
        <span>○ Not started</span>
        <span>📝 Answers in progress — artifact still needed</span>
        <span>✅ Fully complete — all answers + artifact uploaded</span>
      </div>
    `;

    FN_ORDER.forEach(fn => {
      const ctrls = byFn[fn];
      if (!ctrls) return;
      const c0     = ctrls[0];
      const fnDone = ctrls.filter(c => isAnswered(c, answers)).length;

      html += `
        <div style="background:#fff;border:1px solid var(--border);border-radius:10px;margin-bottom:20px;overflow:hidden;">
          <div style="background:${c0.fnBg};border-bottom:2px solid ${c0.fnColor}30;padding:13px 20px;display:flex;align-items:center;gap:10px;">
            <span style="background:${c0.fnColor};color:#fff;font-size:.65rem;font-weight:900;padding:4px 10px;border-radius:5px;letter-spacing:.06em;">${fn}</span>
            <span style="font-size:.84rem;font-weight:700;color:${c0.fnColor};">${FN_LABELS[fn]}</span>
            <span id="sa-fn-count-${fn}" style="margin-left:auto;font-size:.71rem;font-weight:700;color:${c0.fnColor};border:1.5px solid ${c0.fnColor}40;padding:2px 9px;border-radius:10px;">${fnDone} / ${ctrls.length}</span>
          </div>
      `;

      ctrls.forEach((ctrl, idx) => {
        const d      = answers[ctrl.id] || {};
        const ans    = d.answers || [];
        const evFile = d.evidence || '';
        const isLast = idx === ctrls.length - 1;
        const done   = isComplete(ctrl, answers);
        const inProg = !done && isAnswered(ctrl, answers);

        html += `
          <div id="sarow-${ctrl.id}" style="padding:20px 22px;${isLast ? '' : 'border-bottom:1px solid #f1f5f9;'}">

            <!-- Control header -->
            <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;">
              <span id="sa-dot-${ctrl.id}" style="font-size:1.1rem;margin-top:2px;cursor:default;" title="${done ? 'Complete' : inProg ? 'In progress' : 'Not started'}">${done ? '✅' : inProg ? '📝' : '○'}</span>
              <div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:2px;">
                  <span style="font-size:.65rem;font-weight:800;background:${ctrl.fnColor}15;color:${ctrl.fnColor};padding:3px 8px;border-radius:4px;border:1px solid ${ctrl.fnColor}30;">${ctrl.id}</span>
                  <span style="font-size:.88rem;font-weight:700;color:#0f172a;">${ctrl.label}</span>
                </div>
              </div>
            </div>

            <!-- Assessor context -->
            <div style="background:${ctrl.fnBg};border-left:3px solid ${ctrl.fnColor};border-radius:0 6px 6px 0;padding:10px 14px;margin-bottom:16px;font-size:.78rem;color:#334155;line-height:1.6;">
              <span style="font-size:.65rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:${ctrl.fnColor};display:block;margin-bottom:4px;">What your assessor is looking for</span>
              ${ctrl.context}
            </div>

            <!-- Questions -->
            <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:18px;">
        `;

        ctrl.questions.forEach((q, qi) => {
          const val = (ans[qi] || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
          html += `
              <div>
                <label style="display:block;font-size:.8rem;font-weight:600;color:#1e293b;margin-bottom:6px;line-height:1.45;">
                  <span style="display:inline-block;background:${ctrl.fnColor};color:#fff;font-size:.65rem;font-weight:800;width:18px;height:18px;border-radius:50%;text-align:center;line-height:18px;margin-right:6px;">${qi + 1}</span>${q}
                </label>
                <textarea
                  id="satxt-${ctrl.id}-${qi}"
                  rows="3"
                  placeholder="Enter your response here — be specific. The more detail you provide, the more accurately your assessor can evaluate this control."
                  onchange="setSAAnswer('${ctrl.id}',${qi},this.value)"
                  oninput="setSAAnswer('${ctrl.id}',${qi},this.value)"
                  style="width:100%;padding:9px 11px;border:1px solid #cbd5e1;border-radius:7px;font-size:.78rem;color:#334155;resize:vertical;line-height:1.55;box-sizing:border-box;font-family:inherit;">${val}</textarea>
              </div>
          `;
        });

        html += `
            </div>

            <!-- Artifact Upload -->
            <div style="background:#f8fafc;border:1.5px solid ${evFile ? ctrl.fnColor + '70' : '#e2e8f0'};border-radius:8px;padding:13px 16px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;">
              <div style="flex:1;min-width:200px;">
                <div style="font-size:.67rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin-bottom:3px;">Required Artifact</div>
                <div style="font-size:.8rem;font-weight:600;color:#1e293b;">${ctrl.artifact}</div>
                <div id="saev-${ctrl.id}" style="margin-top:4px;font-size:.72rem;${evFile ? 'color:#059669;font-weight:600;' : 'color:#94a3b8;'}">
                  ${evFile ? 'Uploaded: ' + evFile : 'No file uploaded yet — upload using the button'}
                </div>
              </div>
              <label style="display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:7px;border:1.5px solid ${evFile ? ctrl.fnColor : '#cbd5e1'};background:${evFile ? ctrl.fnColor + '10' : '#fff'};color:${evFile ? ctrl.fnColor : '#475569'};font-size:.75rem;font-weight:600;cursor:pointer;white-space:nowrap;flex-shrink:0;">
                ${evFile ? '🔄 Replace File' : '📎 Upload Artifact'}
                <input type="file" id="safile-${ctrl.id}" accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
                  onchange="handleSAFile('${ctrl.id}',this)" style="display:none;" />
              </label>
            </div>

          </div>
        `;
      });

      html += `</div>`; // close function card
    });

    html += `
      <div style="display:flex;justify-content:flex-end;gap:10px;padding-top:8px;margin-top:4px;">
        <button class="btn btn-outline" onclick="saveSelfAssessmentDraft()">💾 Save Draft</button>
        <button class="btn btn-primary" onclick="submitSelfAssessment()">📤 Submit Self-Assessment to Assessor</button>
      </div>
    `;

    section.innerHTML = html;
  }

  // ── Public API ────────────────────────────────────────────────────────────

  window.setSAAnswer = function (ctrlId, qIndex, value) {
    const answers = loadAnswers();
    if (!answers[ctrlId])         answers[ctrlId] = {};
    if (!answers[ctrlId].answers) answers[ctrlId].answers = [];
    answers[ctrlId].answers[qIndex] = value;
    saveAnswers(answers);
    updateProgress(answers);
  };

  window.handleSAFile = function (ctrlId, input) {
    if (!input.files || !input.files.length) return;
    const file    = input.files[0];
    const answers = loadAnswers();
    if (!answers[ctrlId]) answers[ctrlId] = {};
    answers[ctrlId].evidence = file.name;
    saveAnswers(answers);

    // Update artifact status div by direct ID (added to rendered HTML as id="saev-{ctrlId}")
    const statusDiv = document.getElementById('saev-' + ctrlId);
    if (statusDiv) {
      statusDiv.textContent = 'Uploaded: ' + file.name;
      statusDiv.style.color      = '#059669';
      statusDiv.style.fontWeight = '600';
    }

    // Update upload label styling
    const ctrl = CONTROLS.find(c => c.id === ctrlId);
    const row  = document.getElementById('sarow-' + ctrlId);
    if (row && ctrl) {
      const lbl = row.querySelector('label[style*="cursor:pointer"]');
      if (lbl) {
        lbl.style.borderColor = ctrl.fnColor;
        lbl.style.background  = ctrl.fnColor + '10';
        lbl.style.color       = ctrl.fnColor;
        // Update the label text (first text node before the file input)
        const txt = Array.from(lbl.childNodes).find(n => n.nodeType === 3);
        if (txt) txt.textContent = ' Replace File';
        // Update the artifact container border too
        const artifactBox = lbl.closest('div[style*="background:#f8fafc"]');
        if (artifactBox) artifactBox.style.borderColor = ctrl.fnColor + '70';
      }
    }

    // Sync to evidence tracker if it's currently rendered
    updateEvidenceProgress(answers);
    const evRow = document.getElementById('evrow-' + ctrlId);
    if (evRow) {
      const evStatus = document.getElementById('ev-status-' + ctrlId);
      const evFile   = document.getElementById('ev-file-'   + ctrlId);
      if (evStatus) {
        evStatus.textContent       = 'Submitted';
        evStatus.style.background  = '#d1fae5';
        evStatus.style.color       = '#065f46';
        evStatus.style.border      = '1px solid #6ee7b7';
      }
      if (evFile) { evFile.textContent = file.name; evFile.style.color = '#64748b'; }
    }

    updateProgress(answers);
    if (typeof notify === 'function') notify('Artifact uploaded: ' + file.name);
  };

  window.saveSelfAssessmentDraft = function () {
    if (typeof notify === 'function') notify('💾 Draft saved — your responses are preserved and will be here when you return.');
  };

  window.submitSelfAssessment = function () {
    const answers   = loadAnswers();
    const answered  = CONTROLS.filter(c => isAnswered(c, answers)).length;
    const remaining = CONTROLS.length - answered;
    if (answered === 0) {
      if (typeof notify === 'function') notify('⚠️ No responses entered yet. Please complete the questionnaire before submitting.');
      return;
    }
    if (remaining > 0) {
      if (typeof notify === 'function') notify('⚠️ ' + remaining + ' control' + (remaining > 1 ? 's' : '') + ' still have no responses. Submitting your current responses...');
    }
    setTimeout(function () {
      if (typeof notify === 'function') notify('✅ Self-assessment submitted to the Assurit assessment team. Your assessor will review your responses and may follow up with additional questions.');
    }, remaining > 0 ? 1600 : 0);
  };

  // ── Evidence Section — Agency Rep View ───────────────────────────────────
  // Replaces the assessor-side evidence section with a clean artifact
  // submission tracker linked to the self-assessment control bank.

  const AGENCY_DEADLINES = {
    mdot:  'Apr 28, 2026',
    dpscs: 'May 12, 2026',
    msde:  'Completed Mar 14, 2026'
  };

  function setupEvidenceSection() {
    try {
      const session = JSON.parse(localStorage.getItem('anchor_session') || '{}');
      if (!session || session.role !== 'agency_rep') return;
    } catch (e) { return; }

    const section = document.getElementById('evidence');
    if (!section) return;

    // Hide all existing assessor-side children
    Array.from(section.children).forEach(function (child) {
      child.style.display = 'none';
    });

    const view = document.createElement('div');
    view.id = 'agency-evidence-view';
    section.insertBefore(view, section.firstChild);

    renderEvidenceView();
  }

  function renderEvidenceView() {
    const view = document.getElementById('agency-evidence-view');
    if (!view) return;

    const answers  = loadAnswers();
    const slug     = getAgencySlug();
    const deadline = AGENCY_DEADLINES[slug] || 'TBD';
    const total    = CONTROLS.length;
    const submitted = CONTROLS.filter(function (c) { return answers[c.id] && answers[c.id].evidence; }).length;
    const pct      = Math.round((submitted / total) * 100);
    const pending  = total - submitted;

    const byFn = {};
    CONTROLS.forEach(function (c) { (byFn[c.fn] = byFn[c.fn] || []).push(c); });

    // Build function rows HTML
    let tableRows = '';
    FN_ORDER.forEach(function (fn) {
      const ctrls = byFn[fn];
      if (!ctrls) return;
      const c0 = ctrls[0];

      // Function group header row
      tableRows += `
        <tr>
          <td colspan="5" style="background:${c0.fnBg};padding:8px 14px;border-bottom:1px solid ${c0.fnColor}20;">
            <span style="font-size:.65rem;font-weight:900;background:${c0.fnColor};color:#fff;padding:2px 8px;border-radius:4px;letter-spacing:.05em;">${fn}</span>
            <span style="font-size:.74rem;font-weight:600;color:${c0.fnColor};margin-left:8px;">${FN_LABELS[fn]}</span>
          </td>
        </tr>
      `;

      ctrls.forEach(function (ctrl) {
        const d       = answers[ctrl.id] || {};
        const evFile  = d.evidence || '';
        const hasFile = !!evFile;

        tableRows += `
          <tr id="evrow-${ctrl.id}">
            <td style="white-space:nowrap;">
              <span style="font-size:.65rem;font-weight:800;color:${ctrl.fnColor};background:${ctrl.fnColor}12;border:1px solid ${ctrl.fnColor}25;padding:2px 7px;border-radius:3px;">${ctrl.id}</span>
            </td>
            <td style="font-size:.78rem;font-weight:500;color:#1e293b;">${ctrl.label}</td>
            <td style="font-size:.74rem;color:#475569;">${ctrl.artifact}</td>
            <td>
              <span id="ev-status-${ctrl.id}" style="font-size:.68rem;font-weight:700;padding:3px 9px;border-radius:10px;white-space:nowrap;${hasFile
                ? 'background:#d1fae5;color:#065f46;border:1px solid #6ee7b7;'
                : 'background:#fef3c7;color:#92400e;border:1px solid #fcd34d;'}">
                ${hasFile ? 'Submitted' : 'Pending'}
              </span>
              ${hasFile ? `<div id="ev-file-${ctrl.id}" style="font-size:.68rem;color:#64748b;margin-top:3px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${evFile}">${evFile}</div>` : `<div id="ev-file-${ctrl.id}" style="font-size:.68rem;color:#94a3b8;margin-top:3px;">No file uploaded</div>`}
            </td>
            <td style="white-space:nowrap;">
              <label style="display:inline-block;padding:4px 12px;font-size:.72rem;font-weight:600;border-radius:5px;cursor:pointer;
                ${hasFile
                  ? 'border:1px solid #94a3b8;background:#f1f5f9;color:#475569;'
                  : 'border:1px solid #3b82f6;background:#eff6ff;color:#1d4ed8;'}">
                ${hasFile ? 'Replace' : 'Upload'}
                <input type="file" accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
                  onchange="handleEvidenceTableFile('${ctrl.id}', this)"
                  style="display:none;" />
              </label>
            </td>
          </tr>
        `;
      });
    });

    view.innerHTML = `
      <div class="page-header">
        <h1>Evidence Submission Tracker</h1>
        <p>Upload one supporting artifact for each of the 21 NIST CSF controls in your self-assessment. Your assessor uses these documents alongside your written responses to evaluate each control. Track your progress toward the submission deadline below.</p>
      </div>

      <!-- Summary stats -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;">
        <div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:16px 18px;">
          <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;margin-bottom:4px;">Artifacts Submitted</div>
          <div style="font-size:1.9rem;font-weight:800;color:#1e293b;line-height:1;">${submitted}<span style="font-size:1rem;font-weight:500;color:#94a3b8;"> / ${total}</span></div>
          <div style="font-size:.72rem;color:#64748b;margin-top:4px;">${pct}% of required artifacts uploaded</div>
        </div>
        <div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:16px 18px;">
          <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;margin-bottom:4px;">Controls Pending</div>
          <div style="font-size:1.9rem;font-weight:800;${pending > 0 ? 'color:#b45309;' : 'color:#059669;'}line-height:1;">${pending}</div>
          <div style="font-size:.72rem;color:#64748b;margin-top:4px;">${pending > 0 ? 'Artifacts still required' : 'All artifacts submitted'}</div>
        </div>
        <div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:16px 18px;">
          <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;margin-bottom:4px;">Submission Deadline</div>
          <div style="font-size:1.1rem;font-weight:800;color:#1e293b;line-height:1.3;margin-top:4px;">${deadline}</div>
          <div style="font-size:.72rem;color:#64748b;margin-top:4px;">All artifacts due by this date</div>
        </div>
      </div>

      <!-- Progress bar -->
      <div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:16px 18px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:.78rem;font-weight:700;color:#374151;">Artifact Submission Progress</span>
          <span id="ev-pct-label" style="font-size:.82rem;font-weight:800;color:#1e293b;">${pct}%</span>
        </div>
        <div style="background:#e2e8f0;border-radius:99px;height:10px;overflow:hidden;">
          <div id="ev-progress-bar" style="height:100%;width:${pct}%;background:${pct === 100 ? '#10b981' : 'linear-gradient(90deg,#3b82f6,#6366f1)'};border-radius:99px;transition:width .4s ease;"></div>
        </div>
        <div style="font-size:.72rem;color:#64748b;margin-top:6px;">${submitted} of ${total} required artifacts uploaded — ${pending} remaining</div>
      </div>

      <!-- Artifact tracker table -->
      <div style="background:#fff;border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:20px;">
        <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:.84rem;font-weight:700;color:#1e293b;">Control Artifact Requirements</div>
          <div style="font-size:.72rem;color:#64748b;">One artifact required per control</div>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f8fafc;border-bottom:1px solid var(--border);">
                <th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;white-space:nowrap;">Control</th>
                <th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;">Name</th>
                <th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;">Required Artifact</th>
                <th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;white-space:nowrap;">Status</th>
                <th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;white-space:nowrap;">Action</th>
              </tr>
            </thead>
            <tbody style="font-size:.78rem;">
              ${tableRows}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Additional documents upload -->
      <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:20px 22px;">
        <div style="font-size:.84rem;font-weight:700;color:#1e293b;margin-bottom:4px;">Submit Additional Documents</div>
        <p style="font-size:.78rem;color:#64748b;margin-bottom:16px;">Upload supplementary documents not tied to a specific control — for example, supporting SOPs, configuration exports, or additional policy documents your assessor may find useful.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
          <div>
            <label style="font-size:.74rem;font-weight:700;color:#374151;display:block;margin-bottom:5px;">Document Category</label>
            <select id="ev-add-category" style="width:100%;border:1px solid #d1d5db;border-radius:6px;padding:8px 10px;font-size:.78rem;font-family:inherit;color:#374151;">
              <option value="">Select a category</option>
              <option>Supporting Policy Document</option>
              <option>System Configuration Export</option>
              <option>Audit or Compliance Report</option>
              <option>Vendor Security Documentation</option>
              <option>Training or Certification Record</option>
              <option>Other Supporting Evidence</option>
            </select>
          </div>
          <div>
            <label style="font-size:.74rem;font-weight:700;color:#374151;display:block;margin-bottom:5px;">Related CSF Function</label>
            <select id="ev-add-fn" style="width:100%;border:1px solid #d1d5db;border-radius:6px;padding:8px 10px;font-size:.78rem;font-family:inherit;color:#374151;">
              <option value="">Select a function</option>
              <option>GOVERN</option>
              <option>IDENTIFY</option>
              <option>PROTECT</option>
              <option>DETECT</option>
              <option>RESPOND</option>
              <option>RECOVER</option>
            </select>
          </div>
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:.74rem;font-weight:700;color:#374151;display:block;margin-bottom:5px;">Description</label>
          <textarea id="ev-add-notes" rows="2"
            placeholder="Briefly describe what this document covers and the time period it applies to."
            style="width:100%;border:1px solid #d1d5db;border-radius:6px;padding:8px 10px;font-size:.78rem;font-family:inherit;color:#374151;resize:vertical;box-sizing:border-box;"></textarea>
        </div>
        <div onclick="agencyUploadClick()" style="border:2px dashed #d1d5db;border-radius:8px;padding:24px;text-align:center;cursor:pointer;background:#fafafa;transition:border-color .2s;"
          onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#d1d5db'">
          <div style="font-size:.82rem;font-weight:600;color:#374151;margin-bottom:4px;">Click to browse or drag and drop files here</div>
          <div style="font-size:.72rem;color:#94a3b8;">PDF, DOCX, XLSX, PNG, JPG — 50MB maximum per file</div>
        </div>
        <div id="ev-uploaded-files" style="margin-top:10px;"></div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">
          <button class="btn btn-outline btn-sm" onclick="notify('Draft saved.')">Save Draft</button>
          <button class="btn btn-primary btn-sm" onclick="agencySubmitEvidence()">Submit to Assessor</button>
        </div>
      </div>
    `;
  }

  window.handleEvidenceTableFile = function (ctrlId, input) {
    if (!input.files || !input.files.length) return;
    const file    = input.files[0];
    const answers = loadAnswers();
    if (!answers[ctrlId]) answers[ctrlId] = {};
    answers[ctrlId].evidence = file.name;
    saveAnswers(answers);

    // Update row without re-render
    const statusEl = document.getElementById('ev-status-' + ctrlId);
    const fileEl   = document.getElementById('ev-file-'   + ctrlId);
    if (statusEl) {
      statusEl.textContent    = 'Submitted';
      statusEl.style.background  = '#d1fae5';
      statusEl.style.color       = '#065f46';
      statusEl.style.border      = '1px solid #6ee7b7';
    }
    if (fileEl) {
      fileEl.textContent = file.name;
      fileEl.style.color = '#64748b';
    }

    // Update upload label
    const row = document.getElementById('evrow-' + ctrlId);
    if (row) {
      const lbl = row.querySelector('label[style*="cursor:pointer"]');
      if (lbl) {
        lbl.style.borderColor = '#94a3b8';
        lbl.style.background  = '#f1f5f9';
        lbl.style.color       = '#475569';
        lbl.childNodes[0].textContent = 'Replace';
      }
    }

    // Refresh summary progress
    updateEvidenceProgress(answers);

    // Also sync to questionnaire progress
    updateProgress(answers);

    if (typeof notify === 'function') notify('Artifact uploaded: ' + file.name);
  };

  function updateEvidenceProgress(answers) {
    const total     = CONTROLS.length;
    const submitted = CONTROLS.filter(function (c) { return answers[c.id] && answers[c.id].evidence; }).length;
    const pct       = Math.round((submitted / total) * 100);
    const pending   = total - submitted;

    const bar   = document.getElementById('ev-progress-bar');
    const label = document.getElementById('ev-pct-label');
    if (bar) {
      bar.style.width      = pct + '%';
      bar.style.background = pct === 100 ? '#10b981' : 'linear-gradient(90deg,#3b82f6,#6366f1)';
    }
    if (label) label.textContent = pct + '%';
  }

  // ── Assessor Submissions View ─────────────────────────────────────────────
  // Visible to assessors only. Reads agency_rep localStorage submissions and
  // displays them in the Evidence Collection section with review controls.

  function setupAssessorSubmissionsView() {
    try {
      const session = JSON.parse(localStorage.getItem('anchor_session') || '{}');
      const assessorRoles = ['assessor', 'lead_assessor', 'admin'];
      if (!session || !assessorRoles.includes(session.role)) return;
    } catch (e) { return; }

    const section = document.getElementById('evidence');
    if (!section) return;

    const container = document.createElement('div');
    container.id = 'assessor-submissions-card';

    // Insert after page-header, before lifecycle card
    const pageHeader = section.querySelector('.page-header');
    if (pageHeader && pageHeader.nextSibling) {
      section.insertBefore(container, pageHeader.nextSibling);
    } else {
      section.appendChild(container);
    }

    renderAssessorSubmissionsCard();
  }

  function renderAssessorSubmissionsCard() {
    const container = document.getElementById('assessor-submissions-card');
    if (!container) return;

    const answers     = loadAnswers();
    const reviewKey   = 'anchor_review_' + getAgencySlug();
    let reviewState   = {};
    try { reviewState = JSON.parse(localStorage.getItem(reviewKey)) || {}; } catch(e) {}

    const total       = CONTROLS.length;
    const submitted   = CONTROLS.filter(function (c) {
      const d = answers[c.id];
      return d && (d.evidence || (d.answers && d.answers.some(function (a) { return a && a.trim(); })));
    }).length;
    const withArtifacts = CONTROLS.filter(function (c) { return answers[c.id] && answers[c.id].evidence; }).length;
    const accepted      = Object.values(reviewState).filter(function (v) { return v === 'accepted'; }).length;

    // Build table rows — only show controls with any submission
    var rows = '';
    FN_ORDER.forEach(function (fn) {
      const ctrls = CONTROLS.filter(function (c) { return c.fn === fn; });
      ctrls.forEach(function (ctrl) {
        const d          = answers[ctrl.id] || {};
        const hasAnswers = d.answers && d.answers.some(function (a) { return a && a.trim(); });
        const hasArtifact = !!d.evidence;
        if (!hasAnswers && !hasArtifact) return;

        const review = reviewState[ctrl.id] || 'new';
        // Accepted items move to Evidence Tracker — hide from Submitted Artifacts
        if (review === 'accepted') return;

        const reviewStyles = {
          accepted:  'background:#d1fae5;color:#065f46;border:1px solid #6ee7b7;',
          returned:  'background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;',
          reviewing: 'background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd;',
          new:       'background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;'
        };
        const reviewLabel = { accepted: 'Accepted', returned: 'Returned', reviewing: 'Under Review', new: 'New' };

        const answersSummary = (d.answers || []).map(function (a, i) {
          if (!a || !a.trim()) return '';
          const truncated = a.length > 220 ? a.substring(0, 220) + '…' : a;
          return '<div style="margin-bottom:6px;"><span style="font-weight:700;font-size:.68rem;color:#94a3b8;">Q' + (i + 1) + '</span> <span style="font-size:.74rem;color:#334155;line-height:1.5;">' + truncated.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</span></div>';
        }).join('');

        rows += '<tr id="asr-row-' + ctrl.id + '" style="border-bottom:1px solid #f1f5f9;">' +
          '<td style="padding:12px 14px;vertical-align:top;white-space:nowrap;">' +
            '<span style="font-size:.65rem;font-weight:800;color:' + ctrl.fnColor + ';background:' + ctrl.fnColor + '12;border:1px solid ' + ctrl.fnColor + '25;padding:2px 7px;border-radius:3px;">' + ctrl.id + '</span>' +
            '<div style="font-size:.65rem;color:' + ctrl.fnColor + ';font-weight:700;margin-top:4px;">' + ctrl.fn + '</div>' +
          '</td>' +
          '<td style="padding:12px 14px;vertical-align:top;">' +
            '<div style="font-size:.78rem;font-weight:600;color:#1e293b;max-width:160px;">' + ctrl.label + '</div>' +
          '</td>' +
          '<td style="padding:10px 14px;vertical-align:top;max-width:380px;">' +
            (hasAnswers
              ? '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:8px 10px;">' + answersSummary + '</div>'
              : '<span style="font-size:.72rem;color:#94a3b8;">No written responses submitted</span>') +
          '</td>' +
          '<td style="padding:12px 14px;vertical-align:top;white-space:nowrap;">' +
            (hasArtifact
              ? '<div style="font-size:.73rem;font-weight:600;color:#059669;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;text-decoration:underline;" title="' + d.evidence + '" onclick="showArtifactPreview(\'' + d.evidence.replace(/'/g,"\\'") + '\',\'' + ctrl.id + '\',\'' + ctrl.label.replace(/'/g,"\\'") + '\')">' + d.evidence + '</div><div style="font-size:.65rem;color:#94a3b8;margin-top:2px;">Click to preview</div>'
              : '<span style="font-size:.72rem;color:#f59e0b;font-weight:600;">Not yet uploaded</span>') +
          '</td>' +
          '<td style="padding:12px 14px;vertical-align:top;white-space:nowrap;">' +
            '<span style="font-size:.68rem;font-weight:700;padding:3px 9px;border-radius:10px;' + (reviewStyles[review] || reviewStyles.new) + '">' + (reviewLabel[review] || 'New') + '</span>' +
          '</td>' +
          '<td style="padding:10px 14px;vertical-align:top;white-space:nowrap;">' +
            '<div style="display:flex;flex-direction:column;gap:4px;">' +
              '<button onclick="setSubmissionReview(\'' + ctrl.id + '\',\'accepted\')" style="font-size:.68rem;padding:3px 10px;border-radius:5px;border:1px solid #10b981;background:' + (review === 'accepted' ? '#d1fae5' : '#fff') + ';color:#065f46;cursor:pointer;font-weight:600;">Accept</button>' +
              '<button onclick="setSubmissionReview(\'' + ctrl.id + '\',\'reviewing\')" style="font-size:.68rem;padding:3px 10px;border-radius:5px;border:1px solid #3b82f6;background:' + (review === 'reviewing' ? '#dbeafe' : '#fff') + ';color:#1d4ed8;cursor:pointer;font-weight:600;">Under Review</button>' +
              '<button onclick="setSubmissionReview(\'' + ctrl.id + '\',\'returned\')" style="font-size:.68rem;padding:3px 10px;border-radius:5px;border:1px solid #ef4444;background:' + (review === 'returned' ? '#fee2e2' : '#fff') + ';color:#991b1b;cursor:pointer;font-weight:600;">Return</button>' +
            '</div>' +
          '</td>' +
        '</tr>';
      });
    });

    if (!rows) {
      container.innerHTML =
        '<div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:20px;border-left:4px solid #e2e8f0;">' +
          '<div style="font-size:.84rem;font-weight:700;color:#1e293b;margin-bottom:6px;">Submitted Artifacts</div>' +
          '<p style="font-size:.78rem;color:#94a3b8;margin:0;">No agency submissions received yet. The agency representative has not submitted responses or artifacts for this assessment cycle. Submissions will appear here as the agency completes their self-assessment questionnaire.</p>' +
        '</div>';
      return;
    }

    container.innerHTML =
      '<div style="background:#fff;border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:20px;border-left:4px solid #3b82f6;">' +

        // Header
        '<div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">' +
          '<div>' +
            '<div style="font-size:.84rem;font-weight:700;color:#1e293b;">Submitted Artifacts</div>' +
            '<div style="font-size:.74rem;color:#64748b;margin-top:2px;">Pending and under-review submissions from the agency representative — accepted artifacts move to Evidence Tracker</div>' +
          '</div>' +
          '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
            '<div style="text-align:center;padding:6px 14px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;">' +
              '<div style="font-size:1.1rem;font-weight:800;color:#1e293b;">' + submitted + '<span style="font-size:.7rem;color:#94a3b8;font-weight:500;"> / ' + total + '</span></div>' +
              '<div style="font-size:.65rem;color:#64748b;font-weight:600;white-space:nowrap;">Controls Responded</div>' +
            '</div>' +
            '<div style="text-align:center;padding:6px 14px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;">' +
              '<div style="font-size:1.1rem;font-weight:800;color:#059669;">' + withArtifacts + '</div>' +
              '<div style="font-size:.65rem;color:#64748b;font-weight:600;white-space:nowrap;">Artifacts Uploaded</div>' +
            '</div>' +
            '<div style="text-align:center;padding:6px 14px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;">' +
              '<div style="font-size:1.1rem;font-weight:800;color:#3b82f6;">' + accepted + '</div>' +
              '<div style="font-size:.65rem;color:#64748b;font-weight:600;white-space:nowrap;">Accepted</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        // Table
        '<div style="overflow-x:auto;">' +
          '<table style="width:100%;border-collapse:collapse;">' +
            '<thead>' +
              '<tr style="background:#f8fafc;border-bottom:1px solid var(--border);">' +
                '<th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;white-space:nowrap;">Control</th>' +
                '<th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;">Name</th>' +
                '<th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;">Agency Responses</th>' +
                '<th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;white-space:nowrap;">Artifact</th>' +
                '<th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;white-space:nowrap;">Review Status</th>' +
                '<th style="padding:9px 14px;text-align:left;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;white-space:nowrap;">Actions</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody style="font-size:.78rem;">' +
              rows +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>';
  }

  window.setSubmissionReview = function (ctrlId, status) {
    const reviewKey = 'anchor_review_' + getAgencySlug();
    let reviewState = {};
    try { reviewState = JSON.parse(localStorage.getItem(reviewKey)) || {}; } catch(e) {}
    reviewState[ctrlId] = status;
    localStorage.setItem(reviewKey, JSON.stringify(reviewState));
    renderAssessorSubmissionsCard();
    renderLiveEvidenceTracker && (function () {
      // sync Evidence Tracker too
      const cards = document.querySelectorAll('.content-card, .card');
      cards.forEach(function (c) {
        const t = c.querySelector('.card-title, h3, h4');
        if (t && t.textContent.includes('Evidence Tracker')) {
          renderLiveEvidenceTracker(c);
          updateEvidenceLifecycleStats && updateEvidenceLifecycleStats();
        }
      });
    })();
    const labels = { accepted: 'Submission accepted — moved to Evidence Tracker.', reviewing: 'Marked as Under Review.', returned: 'Submission returned for revision.' };
    if (typeof notify === 'function') notify(labels[status] || 'Review status updated.');
  };

  // ── Artifact Preview Modal ────────────────────────────────────────────────
  window.showArtifactPreview = function (filename, ctrlId, ctrlLabel) {
    // Remove existing modal if any
    var existing = document.getElementById('artifact-preview-overlay');
    if (existing) existing.remove();

    // Determine file icon / color based on extension
    var ext = (filename.split('.').pop() || '').toLowerCase();
    var iconMap = {
      pdf:  { icon: '📄', color: '#dc2626', bg: '#fef2f2', label: 'PDF Document' },
      xlsx: { icon: '📊', color: '#16a34a', bg: '#f0fdf4', label: 'Excel Spreadsheet' },
      xls:  { icon: '📊', color: '#16a34a', bg: '#f0fdf4', label: 'Excel Spreadsheet' },
      docx: { icon: '📝', color: '#2563eb', bg: '#eff6ff', label: 'Word Document' },
      doc:  { icon: '📝', color: '#2563eb', bg: '#eff6ff', label: 'Word Document' },
      pptx: { icon: '📑', color: '#ea580c', bg: '#fff7ed', label: 'PowerPoint' },
      png:  { icon: '🖼️', color: '#7c3aed', bg: '#f5f3ff', label: 'Image' },
      jpg:  { icon: '🖼️', color: '#7c3aed', bg: '#f5f3ff', label: 'Image' }
    };
    var meta = iconMap[ext] || { icon: '📎', color: '#64748b', bg: '#f8fafc', label: 'Document' };

    // Simulated page count / size for realism
    var fakeSizes = { pdf: '2.4 MB · 14 pages', xlsx: '890 KB · 3 sheets', xls: '890 KB · 3 sheets',
      docx: '1.1 MB · 8 pages', doc: '1.1 MB · 8 pages', pptx: '3.2 MB · 22 slides',
      png: '512 KB · image', jpg: '768 KB · image' };
    var fakeSize = fakeSizes[ext] || '1.0 MB';

    var overlay = document.createElement('div');
    overlay.id = 'artifact-preview-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);';
    overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML =
      '<div style="background:#fff;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.35);width:520px;max-width:92vw;overflow:hidden;animation:fadeInUp .18s ease;">' +
        // Modal header
        '<div style="background:#1e293b;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">' +
          '<div style="display:flex;align-items:center;gap:10px;">' +
            '<div style="width:32px;height:32px;border-radius:7px;background:#334155;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">' + meta.icon + '</div>' +
            '<div>' +
              '<div style="font-size:.82rem;font-weight:700;color:#f8fafc;">Artifact Preview</div>' +
              '<div style="font-size:.68rem;color:#94a3b8;">' + meta.label + ' · ' + fakeSize + '</div>' +
            '</div>' +
          '</div>' +
          '<button onclick="document.getElementById(\'artifact-preview-overlay\').remove()" style="background:none;border:none;color:#94a3b8;font-size:1.2rem;cursor:pointer;padding:4px 8px;border-radius:5px;line-height:1;" title="Close">✕</button>' +
        '</div>' +
        // Document thumbnail area
        '<div style="background:' + meta.bg + ';padding:28px 24px;display:flex;flex-direction:column;align-items:center;gap:16px;border-bottom:1px solid #e2e8f0;">' +
          '<div style="width:260px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.1);overflow:hidden;">' +
            // Simulated document header bar
            '<div style="background:' + meta.color + ';height:8px;width:100%;"></div>' +
            '<div style="padding:18px 20px;">' +
              '<div style="height:10px;background:#1e293b;border-radius:3px;width:75%;margin-bottom:12px;"></div>' +
              '<div style="height:7px;background:#94a3b8;border-radius:2px;width:55%;margin-bottom:18px;"></div>' +
              '<div style="display:flex;gap:8px;margin-bottom:14px;">' +
                '<div style="width:48px;height:48px;background:' + meta.bg + ';border-radius:6px;border:1px solid ' + meta.color + '40;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">' + meta.icon + '</div>' +
                '<div style="flex:1;padding-top:4px;">' +
                  '<div style="height:7px;background:#cbd5e1;border-radius:2px;margin-bottom:6px;width:80%;"></div>' +
                  '<div style="height:6px;background:#e2e8f0;border-radius:2px;width:60%;"></div>' +
                '</div>' +
              '</div>' +
              '<div style="height:5px;background:#e2e8f0;border-radius:2px;margin-bottom:5px;"></div>' +
              '<div style="height:5px;background:#e2e8f0;border-radius:2px;margin-bottom:5px;width:90%;"></div>' +
              '<div style="height:5px;background:#e2e8f0;border-radius:2px;margin-bottom:5px;width:85%;"></div>' +
              '<div style="height:5px;background:#e2e8f0;border-radius:2px;width:70%;"></div>' +
            '</div>' +
          '</div>' +
          '<div style="font-size:.72rem;color:#475569;text-align:center;max-width:320px;">' +
            '<span style="font-weight:700;color:#1e293b;">' + filename + '</span>' +
          '</div>' +
        '</div>' +
        // Control info
        '<div style="padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:.65rem;font-weight:800;color:' + meta.color + ';background:' + meta.bg + ';border:1px solid ' + meta.color + '40;padding:2px 8px;border-radius:3px;">' + ctrlId + '</span>' +
          '<span style="font-size:.75rem;color:#334155;font-weight:600;">' + ctrlLabel + '</span>' +
        '</div>' +
        // Action footer
        '<div style="padding:14px 20px;display:flex;justify-content:flex-end;gap:8px;">' +
          '<button onclick="document.getElementById(\'artifact-preview-overlay\').remove()" style="font-size:.76rem;padding:7px 16px;border-radius:7px;border:1px solid #e2e8f0;background:#fff;color:#475569;cursor:pointer;font-weight:600;">Close</button>' +
          '<button onclick="setSubmissionReview(\'' + ctrlId + '\',\'reviewing\');document.getElementById(\'artifact-preview-overlay\').remove();" style="font-size:.76rem;padding:7px 16px;border-radius:7px;border:1px solid #3b82f6;background:#eff6ff;color:#1d4ed8;cursor:pointer;font-weight:600;">Mark Under Review</button>' +
          '<button onclick="setSubmissionReview(\'' + ctrlId + '\',\'accepted\');document.getElementById(\'artifact-preview-overlay\').remove();" style="font-size:.76rem;padding:7px 16px;border-radius:7px;border:none;background:#10b981;color:#fff;cursor:pointer;font-weight:700;">Accept Artifact</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
  };

  // ── Live Selectable Evidence Tracker (Assessor) ──────────────────────────
  // Replaces the hardcoded static Evidence Tracker table with a live,
  // checkbox-selectable version driven by CONTROLS + localStorage.
  // Only runs for assessor / lead_assessor / admin roles.

  // Maps control IDs to the legacy E-NNN item numbers for continuity
  const EV_ITEM_MAP = {
    'GV.OC-01':'E-001','GV.RM-01':'E-002','GV.RR-01':'E-003','GV.PO-01':'E-004',
    'GV.SC-01':'E-005','ID.AM-01':'E-006','ID.AM-02':'E-007','ID.RA-01':'E-008',
    'ID.RA-02':'E-009','PR.AA-01':'E-010','PR.AT-01':'E-011','PR.DS-01':'E-012',
    'PR.IR-01':'E-013','PR.PS-01':'E-014','DE.CM-01':'E-015','DE.AE-01':'E-016',
    'RS.MA-01':'E-017','RS.MA-02':'E-018','RC.RP-01':'E-019','RC.RP-02':'E-020'
  };

  function setupLiveEvidenceTracker() {
    try {
      const session = JSON.parse(localStorage.getItem('anchor_session') || '{}');
      const assessorRoles = ['assessor', 'lead_assessor', 'admin'];
      if (!session || !assessorRoles.includes(session.role)) return;
    } catch(e) { return; }

    // Find the Evidence Tracker card
    var trackerCard = null;
    document.querySelectorAll('.card').forEach(function(card) {
      var t = card.querySelector('.card-title');
      if (t && t.textContent.trim() === 'Evidence Tracker') trackerCard = card;
    });
    if (!trackerCard) return;

    renderLiveEvidenceTracker(trackerCard);
    updateEvidenceLifecycleStats();
  }

  function renderLiveEvidenceTracker(card) {
    const answers     = loadAnswers();
    const reviewKey   = 'anchor_review_' + getAgencySlug();
    var reviewState   = {};
    try { reviewState = JSON.parse(localStorage.getItem(reviewKey)) || {}; } catch(e) {}

    const total      = CONTROLS.length;
    const submitted  = CONTROLS.filter(function(c) { return answers[c.id] && answers[c.id].evidence; }).length;
    const accepted   = CONTROLS.filter(function(c) { return reviewState[c.id] === 'accepted'; }).length;
    const reviewing  = CONTROLS.filter(function(c) { return reviewState[c.id] === 'reviewing'; }).length;

    // Build table rows
    var rows = CONTROLS.map(function(ctrl) {
      const d         = answers[ctrl.id] || {};
      const hasFile   = !!d.evidence;
      const hasAnswer = d.answers && d.answers.some(function(a){ return a && a.trim(); });
      const review    = reviewState[ctrl.id] || 'new';
      const itemNum   = EV_ITEM_MAP[ctrl.id] || '—';

      // Status badge
      var statusHtml;
      if (hasFile) {
        statusHtml = '<span class="badge badge-green">Submitted</span>';
      } else if (hasAnswer) {
        statusHtml = '<span class="badge badge-orange">Partial</span>';
      } else {
        statusHtml = '<span class="badge" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;">Pending</span>';
      }

      // Review state badge
      const rStyles = {
        accepted:  'background:#d1fae5;color:#065f46;border:1px solid #6ee7b7;',
        returning: 'background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;',
        reviewing: 'background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd;',
        new:       'background:#f1f5f9;color:#94a3b8;border:1px solid #e2e8f0;'
      };
      const rLabel = { accepted:'Accepted', returned:'Returned', reviewing:'Under Review', new:'—' };
      const rStyle = rStyles[review] || rStyles.new;

      // Action dropdown
      var actionHtml = hasFile || hasAnswer
        ? '<select onchange="setEvidenceReview(\'' + ctrl.id + '\',this.value);this.value=\'\';" ' +
          'style="font-size:.68rem;border:1px solid #d1d5db;border-radius:5px;padding:3px 6px;background:#fff;color:#374151;cursor:pointer;">' +
          '<option value="">Action…</option>' +
          '<option value="accepted">✓ Accept</option>' +
          '<option value="reviewing">⏳ Under Review</option>' +
          '<option value="returned">↩ Return</option>' +
          '</select>'
        : '<span style="font-size:.68rem;color:#d1d5db;">—</span>';

      return '<tr id="evtr-' + ctrl.id.replace(/\./g,'-') + '" data-ctrl="' + ctrl.id + '">' +
        '<td style="width:28px;padding:8px 6px 8px 14px;">' +
          '<input type="checkbox" class="ev-row-check" data-ctrl="' + ctrl.id + '" ' +
          'style="width:14px;height:14px;cursor:pointer;accent-color:#3b82f6;">' +
        '</td>' +
        '<td style="white-space:nowrap;font-size:.72rem;font-weight:700;color:#64748b;">' + itemNum + '</td>' +
        '<td>' +
          '<div style="display:flex;align-items:center;gap:6px;">' +
            '<span style="font-size:.62rem;font-weight:800;color:' + ctrl.fnColor + ';background:' + ctrl.fnColor + '12;border:1px solid ' + ctrl.fnColor + '25;padding:1px 6px;border-radius:3px;white-space:nowrap;">' + ctrl.id + '</span>' +
            '<span style="font-size:.78rem;font-weight:500;color:#1e293b;">' + ctrl.label + '</span>' +
          '</div>' +
        '</td>' +
        '<td><span class="fn-tag fn-' + ctrl.fn.toLowerCase() + '">' + ctrl.fn + '</span></td>' +
        '<td style="font-size:.72rem;color:#475569;max-width:180px;">' + ctrl.artifact.split('—')[0].trim() + '</td>' +
        '<td>' + statusHtml + '</td>' +
        '<td style="font-size:.72rem;color:#475569;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + (d.evidence||'') + '">' +
          (d.evidence ? d.evidence : '<span style="color:#d1d5db;">—</span>') +
        '</td>' +
        '<td>' +
          '<span style="font-size:.68rem;font-weight:700;padding:2px 8px;border-radius:10px;' + rStyle + '">' + (rLabel[review]||'—') + '</span>' +
        '</td>' +
        '<td>' + actionHtml + '</td>' +
      '</tr>';
    }).join('');

    card.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px;">' +
        '<div class="card-title" style="margin:0;">Evidence Tracker</div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<span style="font-size:.72rem;color:#64748b;">' + submitted + ' / ' + total + ' submitted &nbsp;·&nbsp; ' + accepted + ' accepted &nbsp;·&nbsp; ' + reviewing + ' under review</span>' +
          '<button onclick="batchEvidenceAction(\'accepted\')" class="btn btn-outline btn-sm" id="ev-batch-accept" disabled style="font-size:.68rem;opacity:.4;">Accept Selected</button>' +
          '<button onclick="batchEvidenceAction(\'reviewing\')" class="btn btn-outline btn-sm" id="ev-batch-review" disabled style="font-size:.68rem;opacity:.4;">Under Review</button>' +
          '<button onclick="batchEvidenceAction(\'returned\')" class="btn btn-outline btn-sm" id="ev-batch-return" disabled style="font-size:.68rem;opacity:.4;">Return Selected</button>' +
        '</div>' +
      '</div>' +

      // Select-all banner (hidden until rows checked)
      '<div id="ev-selection-bar" style="display:none;background:#eff6ff;border:1px solid #93c5fd;border-radius:6px;padding:8px 14px;margin-bottom:10px;font-size:.78rem;color:#1d4ed8;display:flex;align-items:center;gap:10px;">' +
        '<span id="ev-sel-count">0 items selected</span>' +
        '<button onclick="selectAllEvidence(true)" style="font-size:.72rem;color:#3b82f6;background:none;border:none;cursor:pointer;text-decoration:underline;">Select all ' + total + '</button>' +
        '<button onclick="selectAllEvidence(false)" style="font-size:.72rem;color:#64748b;background:none;border:none;cursor:pointer;text-decoration:underline;">Clear</button>' +
      '</div>' +

      '<div class="table-wrap">' +
        '<table>' +
          '<thead><tr>' +
            '<th style="width:28px;padding:8px 6px 8px 14px;"><input type="checkbox" id="ev-select-all" onchange="selectAllEvidence(this.checked)" style="width:14px;height:14px;cursor:pointer;accent-color:#3b82f6;"></th>' +
            '<th style="white-space:nowrap;">#</th>' +
            '<th>Evidence Item</th>' +
            '<th>NIST Function</th>' +
            '<th>Required Artifact</th>' +
            '<th>Status</th>' +
            '<th>Filename</th>' +
            '<th>Review</th>' +
            '<th>Action</th>' +
          '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>' +

      '<div class="btn-row" style="margin-top:12px;">' +
        '<button class="btn btn-outline btn-sm" onclick="notify(\'Evidence tracker exported: ' + getAgencySlug().toUpperCase() + '_Evidence_Log.xlsx\')">Export Tracker</button>' +
        '<button class="btn btn-outline btn-sm" onclick="refreshEvidenceTracker()">↻ Refresh</button>' +
      '</div>';

    // Wire up row checkboxes
    card.querySelectorAll('.ev-row-check').forEach(function(cb) {
      cb.addEventListener('change', onEvidenceRowCheck);
    });
  }

  function onEvidenceRowCheck() {
    const checked = document.querySelectorAll('.ev-row-check:checked');
    const count   = checked.length;
    const bar     = document.getElementById('ev-selection-bar');
    const countEl = document.getElementById('ev-sel-count');
    const btnA    = document.getElementById('ev-batch-accept');
    const btnR    = document.getElementById('ev-batch-review');
    const btnRet  = document.getElementById('ev-batch-return');

    if (bar) bar.style.display = count > 0 ? 'flex' : 'none';
    if (countEl) countEl.textContent = count + ' item' + (count !== 1 ? 's' : '') + ' selected';
    [btnA, btnR, btnRet].forEach(function(btn) {
      if (!btn) return;
      btn.disabled = count === 0;
      btn.style.opacity = count > 0 ? '1' : '.4';
    });

    // Sync select-all checkbox state
    const all = document.querySelectorAll('.ev-row-check');
    const allCb = document.getElementById('ev-select-all');
    if (allCb) {
      allCb.checked = all.length > 0 && checked.length === all.length;
      allCb.indeterminate = count > 0 && count < all.length;
    }
  }

  window.selectAllEvidence = function(checked) {
    document.querySelectorAll('.ev-row-check').forEach(function(cb) { cb.checked = checked; });
    onEvidenceRowCheck();
  };

  window.setEvidenceReview = function(ctrlId, status) {
    if (!status) return;
    const reviewKey = 'anchor_review_' + getAgencySlug();
    var reviewState = {};
    try { reviewState = JSON.parse(localStorage.getItem(reviewKey)) || {}; } catch(e) {}
    reviewState[ctrlId] = status;
    localStorage.setItem(reviewKey, JSON.stringify(reviewState));

    // Refresh just the review badge + action cell for this row
    var trackerCard = null;
    document.querySelectorAll('.card').forEach(function(card) {
      var t = card.querySelector('.card-title');
      if (t && t.textContent.trim() === 'Evidence Tracker') trackerCard = card;
    });
    if (trackerCard) renderLiveEvidenceTracker(trackerCard);

    // Also refresh the assessor submissions card
    renderAssessorSubmissionsCard();

    const labels = { accepted:'Submission accepted.', reviewing:'Marked Under Review.', returned:'Returned for revision.' };
    if (typeof notify === 'function') notify(labels[status] || 'Review status updated.');
  };

  window.batchEvidenceAction = function(status) {
    const checked = document.querySelectorAll('.ev-row-check:checked');
    if (!checked.length) return;
    const reviewKey = 'anchor_review_' + getAgencySlug();
    var reviewState = {};
    try { reviewState = JSON.parse(localStorage.getItem(reviewKey)) || {}; } catch(e) {}
    checked.forEach(function(cb) { reviewState[cb.dataset.ctrl] = status; });
    localStorage.setItem(reviewKey, JSON.stringify(reviewState));

    var trackerCard = null;
    document.querySelectorAll('.card').forEach(function(card) {
      var t = card.querySelector('.card-title');
      if (t && t.textContent.trim() === 'Evidence Tracker') trackerCard = card;
    });
    if (trackerCard) renderLiveEvidenceTracker(trackerCard);
    renderAssessorSubmissionsCard();

    const labels = { accepted:'accepted', reviewing:'marked Under Review', returned:'returned for revision' };
    if (typeof notify === 'function') notify(checked.length + ' item' + (checked.length !== 1 ? 's' : '') + ' ' + (labels[status] || 'updated') + '.');
  };

  window.refreshEvidenceTracker = function() {
    var trackerCard = null;
    document.querySelectorAll('.card').forEach(function(card) {
      var t = card.querySelector('.card-title');
      if (t && t.textContent.trim() === 'Evidence Tracker') trackerCard = card;
    });
    if (trackerCard) {
      renderLiveEvidenceTracker(trackerCard);
      updateEvidenceLifecycleStats();
      if (typeof notify === 'function') notify('Evidence tracker refreshed.');
    }
  };

  function updateEvidenceLifecycleStats() {
    const answers    = loadAnswers();
    const reviewKey  = 'anchor_review_' + getAgencySlug();
    var reviewState  = {};
    try { reviewState = JSON.parse(localStorage.getItem(reviewKey)) || {}; } catch(e) {}

    const total     = CONTROLS.length;
    const submitted = CONTROLS.filter(function(c){ return answers[c.id] && answers[c.id].evidence; }).length;
    const accepted  = CONTROLS.filter(function(c){ return reviewState[c.id] === 'accepted'; }).length;
    const pending   = total - submitted;

    // Update the 4 stat cards in evidence section
    var statCards = (document.getElementById('evidence') || document.body).querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
      statCards[0].querySelector('.stat-value') && (statCards[0].querySelector('.stat-value').textContent = total);
      statCards[1].querySelector('.stat-value') && (statCards[1].querySelector('.stat-value').textContent = submitted);
      statCards[1].querySelector('.stat-sub')   && (statCards[1].querySelector('.stat-sub').textContent = Math.round(submitted/total*100) + '% received');
      statCards[2].querySelector('.stat-value') && (statCards[2].querySelector('.stat-value').textContent = pending);
      statCards[3].querySelector('.stat-value') && (statCards[3].querySelector('.stat-value').textContent = accepted);
      statCards[3].querySelector('.stat-label') && (statCards[3].querySelector('.stat-label').textContent = 'Accepted');
      statCards[3].querySelector('.stat-sub')   && (statCards[3].querySelector('.stat-sub').textContent = 'Assessor confirmed');
    }

    // Update lifecycle progress bar
    var pctEl = document.querySelector('#evidence [style*="width:38%"]') ||
                document.querySelector('#evidence .stat-value');
    var bars = (document.getElementById('evidence') || document.body).querySelectorAll('[style*="height:10px"]');
    if (bars.length) {
      var pct = Math.round(submitted / total * 100);
      bars[0].querySelector('div') && (bars[0].querySelector('div').style.width = pct + '%');
    }
  }

  // ── CSF Workbook Integration (Assessor) ──────────────────────────────────
  // Injects agency self-assessment responses into the SRTM Assessment Workbook
  // and replaces the blank Interview Questionnaire with actual agency answers.
  // Only runs for assessor / lead_assessor / admin roles.

  function setupAssessorCsfIntegration() {
    try {
      const session = JSON.parse(localStorage.getItem('anchor_session') || '{}');
      const assessorRoles = ['assessor', 'lead_assessor', 'admin'];
      if (!session || !assessorRoles.includes(session.role)) return;
    } catch(e) { return; }

    // Rename the "Interview Questionnaire" tab label to "Agency Responses"
    document.querySelectorAll('.tab').forEach(function (tab) {
      const oc = tab.getAttribute('onclick') || '';
      if (oc.indexOf('t2-interview') !== -1) {
        tab.textContent = 'Agency Responses';
      }
    });

    // Update the info-box inside #t2-interview to reflect new purpose
    const iqInfoBox = document.querySelector('#t2-interview .info-box');
    if (iqInfoBox) {
      iqInfoBox.textContent = 'Agency self-assessment responses submitted through the agency portal. Review each control\'s written answers and uploaded artifact before applying CMMI scoring in the Assessment Workbook.';
    }

    // Watch for SRTM initialization — initSrtm() is lazy and only runs
    // when the CSF section is first opened. MutationObserver detects it.
    const srtmContents = document.getElementById('srtm-domain-contents');
    if (!srtmContents) return;

    var injected = false;
    var observer = new MutationObserver(function (mutations, obs) {
      if (srtmContents.children.length > 0 && !injected) {
        injected = true;
        obs.disconnect();
        // Small delay to let SRTM finish rendering all domain content divs
        setTimeout(function () {
          injectSrtmResponsePanels();
          renderAgencyResponsesIQTab();
        }, 80);
      }
    });
    observer.observe(srtmContents, { childList: true });
  }

  // Injects a "Agency Submitted" response panel at the top of each
  // SRTM control body that has matching self-assessment answers.
  function injectSrtmResponsePanels() {
    const answers = loadAnswers();

    CONTROLS.forEach(function (ctrl) {
      const d = answers[ctrl.id] || {};
      const hasAnswers = d.answers && d.answers.some(function (a) { return a && a.trim(); });
      const hasArtifact = !!d.evidence;
      if (!hasAnswers && !hasArtifact) return;

      const safe = ctrl.id.replace(/\./g, '-');
      const body = document.getElementById('sbody-' + safe);
      if (!body) return;
      if (body.querySelector('.agency-resp-panel')) return; // Don't double-inject

      // Auto-populate the first "Evidence / Artifacts" input in this control
      // with the agency-submitted artifact filename so the assessor doesn't
      // have to retype it.
      if (hasArtifact) {
        const evInput = body.querySelector('input[placeholder*="Artifacts"]');
        if (evInput && !evInput.value) evInput.value = d.evidence;
      }

      // Build answers HTML
      var ansHtml = '';
      if (hasAnswers) {
        (d.answers || []).forEach(function (a, i) {
          if (!a || !a.trim()) return;
          const q = ctrl.questions[i] || ('Question ' + (i + 1));
          const truncQ = q.length > 100 ? q.substring(0, 100) + '…' : q;
          ansHtml +=
            '<div style="margin-bottom:10px;">' +
              '<div style="font-size:.68rem;font-weight:700;color:#64748b;margin-bottom:3px;">Q' + (i + 1) + ': ' + truncQ.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</div>' +
              '<div style="font-size:.77rem;color:#1e293b;line-height:1.55;background:#fff;border:1px solid #e2e8f0;border-radius:5px;padding:7px 10px;">' + a.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>') + '</div>' +
            '</div>';
        });
      }

      var artifactHtml = hasArtifact
        ? '<div style="display:inline-flex;align-items:center;gap:6px;background:#d1fae5;border:1px solid #6ee7b7;border-radius:5px;padding:4px 10px;font-size:.73rem;font-weight:600;color:#065f46;">' +
            '<span style="font-size:.7rem;">📎</span>' + d.evidence.replace(/</g,'&lt;') +
          '</div>'
        : '<span style="font-size:.73rem;color:#f59e0b;font-weight:600;">Artifact not yet uploaded</span>';

      var panel = document.createElement('div');
      panel.className = 'agency-resp-panel';
      panel.style.cssText = 'background:#eff6ff;border:1.5px solid #93c5fd;border-radius:8px;padding:12px 16px;margin-bottom:16px;';
      panel.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;flex-wrap:wrap;">' +
          '<div style="font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#1d4ed8;">Agency Self-Assessment Response</div>' +
          artifactHtml +
        '</div>' +
        (ansHtml || '<span style="font-size:.74rem;color:#94a3b8;">No written responses submitted for this control.</span>');

      body.insertBefore(panel, body.firstChild);
    });
  }

  // Replaces the blank IQ container with the agency's actual self-assessment
  // responses, grouped by CSF function, with stat card updates.
  function renderAgencyResponsesIQTab() {
    const container = document.getElementById('iq-container');
    if (!container) return;

    const answers  = loadAnswers();
    const total    = CONTROLS.length;
    const responded = CONTROLS.filter(function (c) {
      const d = answers[c.id];
      return d && d.answers && d.answers.some(function (a) { return a && a.trim(); });
    }).length;
    const withArtifact = CONTROLS.filter(function (c) { return answers[c.id] && answers[c.id].evidence; }).length;
    const complete = CONTROLS.filter(function (c) { return isComplete(c, answers); }).length;

    // Update stat cards
    const el = function(id) { return document.getElementById(id); };
    if (el('iq-total'))     { el('iq-total').textContent = total; el('iq-total').closest('.stat-card').querySelector('.stat-label').textContent = 'Total Controls'; el('iq-total').closest('.stat-card').querySelector('.stat-sub').textContent = 'NIST CSF 2.0'; }
    if (el('iq-answered'))  { el('iq-answered').textContent = responded; el('iq-answered').closest('.stat-card').querySelector('.stat-label').textContent = 'Controls Answered'; el('iq-answered').closest('.stat-card').querySelector('.stat-sub').textContent = 'Written responses received'; }
    if (el('iq-pending'))   { el('iq-pending').textContent = total - responded; el('iq-pending').closest('.stat-card').querySelector('.stat-label').textContent = 'No Response Yet'; el('iq-pending').closest('.stat-card').querySelector('.stat-sub').textContent = 'Awaiting agency input'; }
    if (el('iq-personnel')) { el('iq-personnel').textContent = withArtifact; el('iq-personnel').closest('.stat-card').querySelector('.stat-label').textContent = 'Artifacts Uploaded'; el('iq-personnel').closest('.stat-card').querySelector('.stat-sub').textContent = 'Supporting documents'; }

    // Hide the filter/export toolbar (interview-mode only)
    const filterEl = document.getElementById('iq-filter');
    if (filterEl && filterEl.parentElement) filterEl.parentElement.style.display = 'none';

    // Rename the card title to reflect agency responses context
    const card = container.closest ? container.closest('.card') : null;
    if (card) {
      const titleEl = card.querySelector('.card-title');
      if (titleEl) titleEl.textContent = 'Agency Self-Assessment Responses — ' + getAgencySlug().toUpperCase();
    }

    if (responded === 0) {
      container.innerHTML =
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:32px;text-align:center;color:#94a3b8;">' +
          '<div style="font-size:2rem;margin-bottom:12px;">📋</div>' +
          '<div style="font-size:.88rem;font-weight:700;color:#374151;margin-bottom:6px;">No Agency Responses Yet</div>' +
          '<div style="font-size:.78rem;">The agency representative has not yet submitted responses through the self-assessment portal. Once submitted, their answers will appear here for your review.</div>' +
        '</div>';
      return;
    }

    var html = '';
    FN_ORDER.forEach(function (fn) {
      const ctrls = CONTROLS.filter(function (c) { return c.fn === fn; });
      const c0    = ctrls[0];
      const fnResponded = ctrls.filter(function (c) {
        const d = answers[c.id];
        return d && d.answers && d.answers.some(function (a) { return a && a.trim(); });
      }).length;

      html +=
        '<div style="background:#fff;border:1px solid var(--border);border-radius:10px;margin-bottom:16px;overflow:hidden;">' +
          '<div style="background:' + c0.fnBg + ';border-bottom:2px solid ' + c0.fnColor + '30;padding:11px 18px;display:flex;align-items:center;gap:10px;">' +
            '<span style="background:' + c0.fnColor + ';color:#fff;font-size:.65rem;font-weight:900;padding:3px 9px;border-radius:4px;letter-spacing:.06em;">' + fn + '</span>' +
            '<span style="font-size:.82rem;font-weight:700;color:' + c0.fnColor + ';">' + FN_LABELS[fn] + '</span>' +
            '<span style="margin-left:auto;font-size:.71rem;font-weight:700;color:' + c0.fnColor + ';border:1.5px solid ' + c0.fnColor + '40;padding:2px 9px;border-radius:10px;">' + fnResponded + ' / ' + ctrls.length + ' responded</span>' +
          '</div>';

      ctrls.forEach(function (ctrl, idx) {
        const d          = answers[ctrl.id] || {};
        const hasAnswers = d.answers && d.answers.some(function (a) { return a && a.trim(); });
        const hasArtifact = !!d.evidence;
        const isLast     = idx === ctrls.length - 1;

        if (!hasAnswers && !hasArtifact) {
          html +=
            '<div style="padding:14px 20px;' + (isLast ? '' : 'border-bottom:1px solid #f1f5f9;') + 'display:flex;align-items:center;gap:10px;">' +
              '<span style="font-size:.65rem;font-weight:800;color:' + ctrl.fnColor + ';background:' + ctrl.fnColor + '12;border:1px solid ' + ctrl.fnColor + '25;padding:2px 7px;border-radius:3px;">' + ctrl.id + '</span>' +
              '<span style="font-size:.78rem;color:#94a3b8;">' + ctrl.label + '</span>' +
              '<span style="margin-left:auto;font-size:.69rem;color:#94a3b8;font-style:italic;">No response submitted</span>' +
            '</div>';
          return;
        }

        var qHtml = '';
        (d.answers || []).forEach(function (a, qi) {
          if (!a || !a.trim()) return;
          const q = ctrl.questions[qi] || '';
          qHtml +=
            '<div style="margin-bottom:12px;">' +
              '<div style="font-size:.72rem;font-weight:700;color:#64748b;margin-bottom:5px;line-height:1.4;">' +
                '<span style="display:inline-flex;align-items:center;justify-content:center;width:17px;height:17px;border-radius:50%;background:' + ctrl.fnColor + ';color:#fff;font-size:.6rem;font-weight:800;margin-right:5px;">' + (qi + 1) + '</span>' +
                q.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') +
              '</div>' +
              '<div style="font-size:.78rem;color:#1e293b;line-height:1.6;background:#f8fafc;border-left:3px solid ' + ctrl.fnColor + ';padding:8px 12px;border-radius:0 5px 5px 0;">' +
                a.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>') +
              '</div>' +
            '</div>';
        });

        html +=
          '<div style="padding:16px 20px;' + (isLast ? '' : 'border-bottom:1px solid #f1f5f9;') + '">' +
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">' +
              '<span style="font-size:.65rem;font-weight:800;color:' + ctrl.fnColor + ';background:' + ctrl.fnColor + '12;border:1px solid ' + ctrl.fnColor + '25;padding:2px 7px;border-radius:3px;">' + ctrl.id + '</span>' +
              '<span style="font-size:.84rem;font-weight:700;color:#0f172a;">' + ctrl.label + '</span>' +
              (hasArtifact
                ? '<span style="margin-left:auto;font-size:.69rem;font-weight:600;color:#065f46;background:#d1fae5;border:1px solid #6ee7b7;padding:2px 8px;border-radius:10px;">📎 ' + d.evidence.replace(/</g,'&lt;') + '</span>'
                : '<span style="margin-left:auto;font-size:.69rem;color:#f59e0b;font-weight:600;">Artifact pending</span>') +
            '</div>' +
            (qHtml || '<span style="font-size:.74rem;color:#94a3b8;">No written responses submitted.</span>') +
          '</div>';
      });

      html += '</div>';
    });

    container.innerHTML = html;
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    renderSection();
    setupEvidenceSection();
    setupAssessorSubmissionsView();
    setupLiveEvidenceTracker();
    setupAssessorCsfIntegration();

    // Agency reps land on self-assessment, not the assessor intake form
    try {
      const session = JSON.parse(localStorage.getItem('anchor_session') || '{}');
      if (session && session.role === 'agency_rep') {
        setTimeout(function () {
          const navEl = document.querySelector('[onclick*="self-assessment"]');
          if (typeof showSection === 'function') showSection('self-assessment', navEl);
        }, 50);
      }
    } catch (e) {}
  });

})();
