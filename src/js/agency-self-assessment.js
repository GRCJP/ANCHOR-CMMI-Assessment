// Anchor Platform — Agency Self-Assessment (NIST CSF 2.0)
// 20 controls. Each has an assessor-interview context paragraph,
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
    if (p.includes('mdot'))        return 'mdot';
    if (p.includes('dpscs'))       return 'dpscs';
    if (p.includes('msde'))        return 'msde';
    if (p.includes('mdh'))         return 'mdh';
    if (p.includes('labor'))       return 'labor';
    if (p.includes('comptroller')) return 'comptroller';
    return 'unknown';
  }

  const STORAGE_KEY = 'anchor_selfassessment_' + getAgencySlug();

  /* ── Demo seed data — realistic answers for the first 8 controls ────────── */
  var DEMO_SEEDS = {
    mdot: {
      'GV.OC-01': { answers: [
        'Yes. MDOT maintains an approved Information Security Policy, currently at version 4.1, last reviewed and signed by the Deputy Secretary for IT on October 3, 2024. The policy aligns with NIST SP 800-53 Rev. 5 and DOIT-ITRM-POLICY-001.',
        'The agency CISO (Ms. Lisa Harmon) is the policy owner and is responsible for annual review, updates, and enforcement. The policy review process involves the IT Security team, Legal, HR, and senior agency leadership. Reviews are conducted annually or when a material change occurs.',
        'Sections covering cloud security addenda and AI/ML governance are currently being updated to reflect the adoption of AWS GovCloud and Azure Government in FY2024. Target completion is Q1 2026 pending legal review.'
      ], evidence: 'MDOT_InfoSec_Policy_v4.1_2024.pdf' },
      'GV.RM-01': { answers: [
        'Yes. MDOT maintains a formal Risk Register organized by business function and system tier. The register currently tracks 47 active risk items across three impact categories: Enterprise IT, Transportation Systems (OT/ICS), and Third-Party/Vendor risks.',
        'The Risk Register is reviewed quarterly by the IT Security team and presented to the CIO at the biannual IT Governance Committee meeting. The CISO and system owners participate in risk scoring updates. Emergency reviews are triggered by significant incidents or system changes.',
        'Top three current risks: (1) Ransomware targeting legacy OT/ICS systems — mitigation is active network segmentation project, 70% complete. (2) Third-party vendor access control gaps — mitigation is vendor access review underway. (3) Unpatched systems in decommission queue — mitigation is accelerated patching sprint ongoing.'
      ], evidence: 'MDOT_Risk_Register_Q4_2024.xlsx' },
      'GV.RR-01': { answers: [
        'Formally assigned cybersecurity roles include: CISO (Lisa Harmon), IT Security Officer (2 FTEs), System Owners (14 designated), Privacy Officer, and a Security Operations team of 4. Contractors performing privileged functions are required to sign individual Role Acknowledgment forms.',
        'All employees — including contractors — complete annual security awareness training through the statewide DoIT LMS platform and must sign a Rules of Behavior agreement before system access is granted. Annual re-attestation is required.',
        'The CISO has sole authority to declare a Severity 1 or Severity 2 cybersecurity incident. In her absence, the IT Security Officer assumes that authority. The incident declaration authority and escalation chain are documented in IRP-v4.1 and communicated to all system owners annually.'
      ], evidence: 'MDOT_Cybersecurity_RACI_2024.pdf' },
      'GV.PO-01': { answers: [
        'MDOT maintains a formal Policy Management Framework requiring all security policies to be reviewed annually. This schedule is documented in the Policy Governance Standard (PGS-2023-001) and tracked in the agency\'s policy register maintained by the CISO office.',
        'Policy updates are approved by the CISO, reviewed by legal counsel, and require Deputy Secretary sign-off for Tier 1 policies. Approved updates are communicated to all staff via the agency intranet, email notification, and annual security training refresh.',
        'The last comprehensive policy review cycle was completed in October 2024. Updates were made to the Cloud Acceptable Use Policy and the Remote Access Policy to reflect expanded use of Azure Government and mandatory MFA requirements for privileged accounts.'
      ], evidence: 'MDOT_Policy_Review_Log_2024.pdf' },
      'ID.AM-01': { answers: [
        'MDOT maintains a centralized hardware and software asset inventory managed through ServiceNow CMDB. The inventory covers 847 hardware assets, 1,243 licensed software titles, and 18 cloud service subscriptions. Last full reconciliation was completed November 2024.',
        'The current network diagram (updated September 2024) reflects three network segments: Administrative, Operations, and DMZ. The OT/ICS network interfaces are documented with isolation controls. Network diagrams are maintained by the Network Architecture team in the IT asset repository.',
        'Top three current risks in inventory management: legacy servers in decommission queue (47 systems), shadow IT SaaS adoption in two business units (under review), and OT asset documentation gaps for field sensor equipment (remediation plan in place).'
      ], evidence: 'MDOT_Asset_Inventory_Nov2024.xlsx' },
      'PR.AA-01': { answers: [
        'MDOT uses Microsoft Active Directory with Role-Based Access Control (RBAC) for all enterprise systems. Privileged access is managed through CyberArk PAM. Access provisioning requires supervisor approval via ServiceNow ticket and is reviewed by the Security team within 24 hours.',
        'User access is reviewed quarterly for privileged accounts and annually for standard users. The most recent privileged access review (Q4 2024) resulted in 23 accounts being modified and 8 terminated. Reviews are documented in the access management log.',
        'MFA is currently enforced for all remote access via Cisco AnyConnect with Duo Security. On-premises access for standard users is pending MFA rollout (Phase 2 — target Q2 2026). All administrative and cloud accounts are MFA-protected.'
      ], evidence: 'MDOT_Access_Control_Config_2024.docx' },
      'DE.CM-01': { answers: [
        'MDOT deployed CrowdStrike Falcon for endpoint detection on all 847 managed endpoints (100% coverage). A Splunk SIEM receives logs from network devices, endpoints, and cloud platforms. The Security Operations team monitors alerts during business hours; after-hours monitoring is escalated via automated paging.',
        'In Q4 2024, the SIEM generated 1,247 security alerts. All were triaged and documented. Three were escalated to incident status: two phishing attempts (contained) and one unauthorized external access attempt (blocked by firewall). MTTR for Severity 1 was 2.4 hours.',
        'Vulnerability scanning is performed weekly using Tenable.io across all internet-facing systems and monthly for internal systems. The most recent scan (December 2024) identified 12 critical findings — 9 remediated, 3 in active remediation with POA&M entries created.'
      ], evidence: 'MDOT_SOC_Q4_2024_Report.pdf' }
    },
    dpscs: {
      'GV.OC-01': { answers: [
        'DPSCS maintains an approved Information Security Policy at version 3.2, last formally reviewed and approved by the CIO on August 15, 2024. The policy incorporates CJIS Security Policy requirements given the agency\'s law enforcement data obligations.',
        'The IT Security Director serves as policy owner and coordinates with the CJIS Compliance Officer for any CJIS-related provisions. Policy review involves IT leadership, Legal, HR, and the Maryland Statewide Criminal Justice Information Systems (CJIS) liaison.',
        'A new section on cloud data residency for CJIS data is currently under development following the agency\'s planned migration of non-CJIS workloads to Azure Government. Target approval is Q2 2026.'
      ], evidence: 'DPSCS_InfoSec_Policy_v3.2.pdf' },
      'GV.RM-01': { answers: [
        'DPSCS maintains a Risk Register tracking 61 items categorized by system (Offender Management System, Network Infrastructure, CJIS Systems, Physical Security Integration). Risk owners are assigned at the system level.',
        'Risk reviews occur monthly for CJIS-related items (per CJIS policy requirement) and quarterly for all other risks. The CIO chairs a monthly IT Risk Review meeting. The CJIS Compliance Officer conducts separate biannual CJIS-specific risk assessments.',
        'Priority risks: (1) CJIS data exposure through non-compliant mobile devices — mitigation is MDM rollout in progress. (2) Offender Management System end-of-life in 2027 — migration planning underway. (3) Insider threat from correctional staff with system access — privileged access review enhanced quarterly.'
      ], evidence: 'DPSCS_Risk_Register_2024.xlsx' }
    },
    msde: {
      'GV.OC-01': { answers: [
        'MSDE maintains an approved Information Security Policy version 2.8, last reviewed September 10, 2024, and signed by the Deputy State Superintendent for Operations. The policy reflects FERPA obligations and student data privacy requirements under Maryland\'s Student Data Privacy Act.',
        'The Chief Information Security Officer (CISO) and the Student Data Privacy Officer jointly maintain the policy. Annual reviews involve IT, Legal, the Privacy team, and the Superintendent\'s office. Staff sign annual acknowledgment forms through the MSDE HR system.',
        'The section on AI/ML tools in educational settings is being expanded following increased adoption of AI tutoring platforms. A separate AI Acceptable Use Policy is in draft and targeted for Q1 2026 Board approval.'
      ], evidence: 'MSDE_InfoSec_Policy_v2.8_2024.pdf' },
      'GV.RM-01': { answers: [
        'MSDE maintains a Risk Register with 38 active risk items organized by category: Student Data Systems, Administrative IT, Third-Party Ed-Tech Vendors, and Physical/Network Infrastructure. Risks are rated using a 5x5 likelihood-impact matrix.',
        'Risk reviews are conducted biannually — in January and July — by the CISO, Privacy Officer, and IT leadership. Critical risks trigger monthly status reviews. The Board of Education receives an annual cybersecurity risk summary.',
        'Current top risks: (1) Ed-tech vendor compliance gaps — 12 of 34 vendors have not completed required privacy assessments. (2) Phishing targeting school administrators — addressed through enhanced awareness training. (3) Student information system (SIS) unpatched components — vendor patch applied Q3 2024, verified complete.'
      ], evidence: 'MSDE_Risk_Register_Q4_2024.xlsx' }
    }
  };

  function seedDemoAnswersIfEmpty(slug) {
    try {
      var existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (existing && Object.keys(existing).length > 0) return; // already has data
      var sess = JSON.parse(localStorage.getItem('anchor_session') || '{}');
      if (!sess.demoMode) return; // only seed in demo mode
      var seeds = DEMO_SEEDS[slug];
      if (!seeds) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
    } catch(e) {}
  }

  function loadAnswers() {
    seedDemoAnswersIfEmpty(getAgencySlug());
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
      if (isComplete(ctrl, answers))       { dot.textContent = ''; dot.title = 'Complete — all questions answered and artifact uploaded'; }
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

    // Determine role for welcome banner
    let agencyRepRole = false;
    try { const s = JSON.parse(localStorage.getItem('anchor_session') || '{}'); agencyRepRole = s.role === 'agency_rep'; } catch(e) {}

    let html = `
      ${agencyRepRole ? `
      <div style="background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%);border-radius:12px;padding:24px 28px;margin-bottom:24px;color:#fff;">
        <div style="display:flex;align-items:flex-start;gap:16px;">
          <div style="font-size:2rem;flex-shrink:0;">🏛️</div>
          <div>
            <div style="font-size:1.05rem;font-weight:800;margin-bottom:6px;">Welcome to Your Cybersecurity Self-Assessment</div>
            <div style="font-size:.84rem;opacity:.92;line-height:1.6;margin-bottom:14px;">This portal is your agency's official submission point for the Maryland DoIT Cybersecurity Assessment Program. Your responses and evidence directly inform your agency's cybersecurity maturity rating and the resulting Security Assessment Report (SAR).</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
              <div style="background:rgba(255,255,255,.12);border-radius:8px;padding:12px 14px;">
                <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;opacity:.8;margin-bottom:4px;">Step 1 — Questionnaire</div>
                <div style="font-size:.8rem;opacity:.9;">Answer each control question below in your own words. Be specific — partial implementations are expected.</div>
              </div>
              <div style="background:rgba(255,255,255,.12);border-radius:8px;padding:12px 14px;">
                <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;opacity:.8;margin-bottom:4px;">Step 2 — Evidence Upload</div>
                <div style="font-size:.8rem;opacity:.9;">Upload the requested artifact for each control. Use the Evidence Collection tab to submit documents directly to your assessor.</div>
              </div>
              <div style="background:rgba(255,255,255,.12);border-radius:8px;padding:12px 14px;">
                <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;opacity:.8;margin-bottom:4px;">Step 3 — Submit</div>
                <div style="font-size:.8rem;opacity:.9;">Use the Submit to Assessor button when complete. Your assessor will review and may follow up with questions.</div>
              </div>
            </div>
          </div>
        </div>
      </div>` : ''}
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
        <span> Fully complete — all answers + artifact uploaded</span>
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
              <span id="sa-dot-${ctrl.id}" style="font-size:1.1rem;margin-top:2px;cursor:default;" title="${done ? 'Complete' : inProg ? 'In progress' : 'Not started'}">${done ? '' : inProg ? '📝' : '○'}</span>
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
                ${evFile ? 'Replace File' : 'Upload Artifact'}
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
    // Mark current answers as a draft so they survive page reloads
    var answers = loadAnswers();
    if (!answers._submitted) {
      answers._draftSavedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
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

    // Persist submitted flag alongside answers
    var submittedData = answers;
    submittedData._submitted = true;
    submittedData._submittedAt = new Date().toISOString();
    submittedData._submittedBy = (function () {
      try { var s = JSON.parse(localStorage.getItem('anchor_session') || '{}'); return s.name || s.email || 'Agency Rep'; } catch(e) { return 'Agency Rep'; }
    })();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submittedData));

    setTimeout(function () {
      if (typeof notify === 'function') notify(' Self-assessment submitted to the Assurit assessment team. Your assessor will review your responses and may follow up with additional questions.');

      // Lock the form to prevent re-submission
      var section = document.getElementById('self-assessment');
      if (section) {
        // Disable all textareas and file inputs
        section.querySelectorAll('textarea, input[type="file"]').forEach(function (el) {
          el.disabled = true;
          el.style.opacity = '0.65';
          el.style.pointerEvents = 'none';
        });
        // Replace submit/draft buttons with locked indicator
        section.querySelectorAll('button').forEach(function (btn) {
          if (btn.textContent.indexOf('Submit') !== -1 || btn.textContent.indexOf('Save Draft') !== -1) {
            btn.disabled = true;
            btn.style.opacity = '0.45';
            btn.title = 'Self-assessment already submitted';
          }
        });
        // Insert success banner at top of section if not already present
        if (!section.querySelector('#sa-submitted-banner')) {
          var banner = document.createElement('div');
          banner.id = 'sa-submitted-banner';
          banner.style.cssText = 'background:#d1fae5;border:1.5px solid #6ee7b7;border-radius:10px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;gap:12px;';
          banner.innerHTML = '<span style="font-size:1.4rem;"></span><div><div style="font-size:.88rem;font-weight:700;color:#065f46;">Self-Assessment Submitted</div><div style="font-size:.76rem;color:#047857;margin-top:2px;">Your responses have been submitted to the Assurit assessment team. The form is now locked. Contact your assessor if you need to make changes.</div></div>';
          section.insertBefore(banner, section.firstChild);
        }
      }
    }, remaining > 0 ? 1600 : 0);
  };

  // Restore submitted state on load (locks form if already submitted)
  function restoreSubmittedState() {
    try {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (!stored._submitted) return;
      var section = document.getElementById('self-assessment');
      if (!section) return;
      // Wait briefly for renderSection to finish
      setTimeout(function () {
        section.querySelectorAll('textarea, input[type="file"]').forEach(function (el) {
          el.disabled = true;
          el.style.opacity = '0.65';
          el.style.pointerEvents = 'none';
        });
        section.querySelectorAll('button').forEach(function (btn) {
          if (btn.textContent.indexOf('Submit') !== -1 || btn.textContent.indexOf('Save Draft') !== -1) {
            btn.disabled = true;
            btn.style.opacity = '0.45';
            btn.title = 'Self-assessment already submitted';
          }
        });
        if (!section.querySelector('#sa-submitted-banner')) {
          var banner = document.createElement('div');
          banner.id = 'sa-submitted-banner';
          banner.style.cssText = 'background:#d1fae5;border:1.5px solid #6ee7b7;border-radius:10px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;gap:12px;';
          var ts = stored._submittedAt ? ' on ' + new Date(stored._submittedAt).toLocaleString() : '';
          banner.innerHTML = '<span style="font-size:1.4rem;"></span><div><div style="font-size:.88rem;font-weight:700;color:#065f46;">Self-Assessment Submitted</div><div style="font-size:.76rem;color:#047857;margin-top:2px;">Submitted by ' + (stored._submittedBy || 'Agency Rep') + ts + '. The form is locked. Contact your assessor if you need to make changes.</div></div>';
          section.insertBefore(banner, section.firstChild);
        }
      }, 100);
    } catch (e) {}
  }

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
        const d         = answers[ctrl.id] || {};
        const evFiles   = d.evidenceFiles || (d.evidence ? [d.evidence] : []);
        const evThumbs  = d.evidenceThumbs || {};
        const hasFile   = evFiles.length > 0;
        const fileListHtml = evFiles.length
          ? evFiles.map(function(f) { return buildFileThumbHtml(f, evThumbs[f]); }).join('')
          : `<div id="ev-file-${ctrl.id}" style="font-size:.68rem;color:#94a3b8;margin-top:2px;">No file uploaded</div>`;

        tableRows += `
          <tr id="evrow-${ctrl.id}">
            <td style="white-space:nowrap;padding:8px 14px;">
              <span style="font-size:.65rem;font-weight:800;color:${ctrl.fnColor};background:${ctrl.fnColor}12;border:1px solid ${ctrl.fnColor}25;padding:2px 7px;border-radius:3px;">${ctrl.id}</span>
            </td>
            <td style="font-size:.78rem;font-weight:500;color:#1e293b;padding:8px 14px;">${ctrl.label}</td>
            <td style="font-size:.74rem;color:#475569;padding:8px 14px;">${ctrl.artifact}</td>
            <td style="padding:8px 14px;">
              <span id="ev-status-${ctrl.id}" style="font-size:.68rem;font-weight:700;padding:3px 9px;border-radius:10px;white-space:nowrap;${hasFile
                ? 'background:#d1fae5;color:#065f46;border:1px solid #6ee7b7;'
                : 'background:#fef3c7;color:#92400e;border:1px solid #fcd34d;'}">
                ${hasFile ? 'Submitted' : 'Pending'}
              </span>
              <div id="ev-filelist-${ctrl.id}" style="margin-top:2px;">${fileListHtml}</div>
            </td>
            <td style="white-space:nowrap;padding:8px 14px;">
              <label style="display:inline-block;padding:4px 12px;font-size:.72rem;font-weight:600;border-radius:5px;cursor:pointer;border:1px solid #3b82f6;background:#eff6ff;color:#1d4ed8;">
                ${hasFile ? 'Add File' : 'Upload'}
                <input type="file" multiple accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
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
        <p>Upload one supporting artifact for each of the 20 NIST CSF controls in your self-assessment. Your assessor uses these documents alongside your written responses to evaluate each control. Track your progress toward the submission deadline below.</p>
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
          <button class="btn btn-outline btn-sm" onclick="typeof notify==='function'&&notify('Draft saved.')">Save Draft</button>
          <button class="btn btn-primary btn-sm" onclick="agencySubmitEvidence()">Submit to Assessor</button>
        </div>
      </div>
    `;

    // Browsers strip 'multiple' from <input type="file"> when injected via innerHTML.
    // Set it programmatically after render.
    Array.from(view.querySelectorAll('input[onchange*="handleEvidenceTableFile"]')).forEach(function(i) {
      i.multiple = true;
    });
  }

  // ── File-type badge helper ────────────────────────────────────────────────
  function getFileTypeInfo(ext) {
    var map = {
      pdf:  { label: 'PDF',  bg: '#fee2e2', color: '#991b1b' },
      xlsx: { label: 'XLSX', bg: '#d1fae5', color: '#065f46' },
      xls:  { label: 'XLS',  bg: '#d1fae5', color: '#065f46' },
      docx: { label: 'DOCX', bg: '#dbeafe', color: '#1e40af' },
      doc:  { label: 'DOC',  bg: '#dbeafe', color: '#1e40af' },
      pptx: { label: 'PPTX', bg: '#fef3c7', color: '#92400e' },
      png:  { label: 'PNG',  bg: '#ede9fe', color: '#5b21b6' },
      jpg:  { label: 'JPG',  bg: '#ede9fe', color: '#5b21b6' },
      jpeg: { label: 'JPEG', bg: '#ede9fe', color: '#5b21b6' },
      gif:  { label: 'GIF',  bg: '#ede9fe', color: '#5b21b6' },
      txt:  { label: 'TXT',  bg: '#f1f5f9', color: '#475569' },
      csv:  { label: 'CSV',  bg: '#d1fae5', color: '#065f46' }
    };
    return map[ext] || { label: (ext || 'FILE').toUpperCase().slice(0,6), bg: '#f1f5f9', color: '#475569' };
  }

  // ── Build thumbnail/badge HTML for a single file ──────────────────────────
  function buildFileThumbHtml(f, thumb) {
    var ext = (f.split('.').pop() || '').toLowerCase();
    var safeName = f.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    if (thumb && thumb.type === 'image' && thumb.data) {
      return '<div style="margin-top:4px;display:flex;align-items:center;gap:6px;">' +
        '<img src="' + thumb.data + '" onclick="openEvidencePreview(\'' + safeName + '\',\'' + thumb.data + '\')"' +
        ' style="width:52px;height:38px;object-fit:cover;border-radius:4px;cursor:pointer;border:2px solid #10b981;box-shadow:0 1px 4px rgba(0,0,0,.15);"' +
        ' title="Click to preview: ' + f + '">' +
        '<span style="font-size:.65rem;color:#059669;font-weight:500;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + f + '">' + f + '</span>' +
        '</div>';
    }
    var ti = getFileTypeInfo(ext);
    return '<div style="margin-top:3px;display:flex;align-items:center;gap:5px;">' +
      '<span style="font-size:.6rem;font-weight:800;padding:2px 6px;border-radius:3px;background:' + ti.bg + ';color:' + ti.color + ';flex-shrink:0;letter-spacing:.02em;">' + ti.label + '</span>' +
      '<span style="font-size:.65rem;color:#059669;font-weight:500;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + f + '">' + f + '</span>' +
      '</div>';
  }

  // ── Lightbox for image evidence preview ───────────────────────────────────
  window.openEvidencePreview = function (name, src) {
    var old = document.getElementById('ev-preview-modal');
    if (old) old.remove();
    var modal = document.createElement('div');
    modal.id = 'ev-preview-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';
    modal.innerHTML =
      '<div style="max-width:90vw;max-height:90vh;background:#1e293b;border-radius:10px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.6);">' +
        '<div style="background:#0f172a;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">' +
          '<div style="display:flex;align-items:center;gap:8px;">' +
            '<span style="background:#10b981;color:#fff;font-size:.6rem;font-weight:800;padding:2px 7px;border-radius:3px;">ARTIFACT PREVIEW</span>' +
            '<span style="color:#e2e8f0;font-size:.82rem;font-weight:600;">' + name + '</span>' +
          '</div>' +
          '<button onclick="document.getElementById(\'ev-preview-modal\').remove()" style="background:#475569;color:#fff;border:none;padding:4px 12px;border-radius:5px;cursor:pointer;font-size:.78rem;">✕ Close</button>' +
        '</div>' +
        '<div style="padding:16px;text-align:center;overflow:auto;max-height:calc(90vh - 60px);">' +
          '<img src="' + src + '" style="max-width:100%;max-height:calc(90vh - 100px);object-fit:contain;border-radius:4px;">' +
        '</div>' +
      '</div>';
    modal.onclick = function (e) { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  };

  // ── Evidence file upload handler (with thumbnail generation) ──────────────
  window.handleEvidenceTableFile = function (ctrlId, input) {
    if (!input.files || !input.files.length) return;
    var files   = Array.from(input.files);
    var answers = loadAnswers();
    if (!answers[ctrlId]) answers[ctrlId] = {};

    var existing      = answers[ctrlId].evidenceFiles || (answers[ctrlId].evidence ? [answers[ctrlId].evidence] : []);
    var existingThumbs = answers[ctrlId].evidenceThumbs || {};
    var remaining     = files.length;

    files.forEach(function (file) {
      if (existing.indexOf(file.name) === -1) existing.push(file.name);

      if (file.type.startsWith('image/')) {
        // Generate real canvas thumbnail
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.onload = function () {
            var canvas = document.createElement('canvas');
            var maxW = 160, maxH = 120;
            var w = img.width, h = img.height;
            if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
            if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            existingThumbs[file.name] = { type: 'image', data: canvas.toDataURL('image/jpeg', 0.8) };
            remaining--;
            if (remaining <= 0) finalizeUpload();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        var ext = (file.name.split('.').pop() || '').toLowerCase();
        existingThumbs[file.name] = { type: ext };
        remaining--;
        if (remaining <= 0) finalizeUpload();
      }
    });

    function finalizeUpload() {
      answers[ctrlId].evidenceFiles  = existing;
      answers[ctrlId].evidence       = existing[0];
      answers[ctrlId].evidenceThumbs = existingThumbs;
      saveAnswers(answers);

      // Update status badge
      var statusEl = document.getElementById('ev-status-' + ctrlId);
      if (statusEl) {
        statusEl.textContent      = 'Submitted';
        statusEl.style.background = '#d1fae5';
        statusEl.style.color      = '#065f46';
        statusEl.style.border     = '1px solid #6ee7b7';
      }

      // Update file list with thumbnails/badges
      var fileListEl = document.getElementById('ev-filelist-' + ctrlId);
      if (fileListEl) {
        fileListEl.innerHTML = existing.map(function (f) {
          return buildFileThumbHtml(f, existingThumbs[f]);
        }).join('');
      }

      // Update upload label
      var row = document.getElementById('evrow-' + ctrlId);
      if (row) {
        var lbl = row.querySelector('label');
        if (lbl && lbl.childNodes[0]) lbl.childNodes[0].textContent = 'Add File';
      }

      updateEvidenceProgress(answers);
      updateProgress(answers);

      var addedNames = files.map(function(f){ return f.name; }).join(', ');
      if (typeof notify === 'function') notify('Uploaded: ' + addedNames + (files.length > 1 ? ' (' + files.length + ' files)' : ''));
    }

    // If all files were non-image (sync), trigger immediately
    if (remaining <= 0) finalizeUpload();
  };

  function updateEvidenceProgress(answers) {
    const total     = CONTROLS.length;
    const submitted = CONTROLS.filter(function (c) {
      var d = answers[c.id] || {};
      return (d.evidenceFiles && d.evidenceFiles.length > 0) || !!d.evidence;
    }).length;
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
  /* ── Artifact content templates keyed by control function prefix ───────── */
  var ARTIFACT_CONTENT = {
    'GV': { title:'Governance & Risk Policy', section:'Policy Document', rows:[
      ['Document ID','GOV-POL-2024-001'],['Classification','INTERNAL — CONTROLLED'],
      ['Effective Date','January 1, 2024'],['Review Cycle','Annual'],
      ['Owner','CISO / Deputy Secretary for IT'],['Status','APPROVED']
    ], body:'This policy establishes the governance framework for cybersecurity risk management across all agency systems and data assets. All personnel with access to state information systems are subject to the requirements outlined herein. The agency Head shall designate an Information Security Officer (ISO) responsible for policy implementation and oversight. Risk assessments shall be conducted annually or upon significant system change.' },
    'ID': { title:'Asset Inventory & Risk Assessment', section:'Assessment Report', rows:[
      ['Report ID','RA-2024-Q4-001'],['Assessment Type','Annual Risk Assessment'],
      ['Scope','All agency information systems'],['Assessor','Information Security Team'],
      ['Completion Date','December 15, 2024'],['Risk Rating','MODERATE']
    ], body:'This document identifies and catalogs hardware and software assets within the agency environment. A total of 847 assets have been inventoried across 14 network segments. Critical systems include the Benefits Management System (BMS) classified as HIGH impact per FIPS 199. Threat scenarios were evaluated using NIST SP 800-30 methodology. Three high-severity findings require immediate remediation action.' },
    'PR': { title:'Access Control & Protection Procedures', section:'Standard Operating Procedure', rows:[
      ['SOP Number','SOP-PR-2024-007'],['Version','3.2'],
      ['Last Reviewed','November 8, 2024'],['Approved By','Deputy CISO'],
      ['Applies To','All privileged and standard user accounts'],['Next Review','November 2025']
    ], body:'This procedure governs the provisioning, modification, and termination of user access to agency systems. All access requests must be submitted via the ServiceNow ticketing system with supervisor approval. Privileged accounts require secondary approval from the ISO and must be reviewed quarterly. Multi-factor authentication (MFA) is mandatory for all remote access and cloud platform logins. Access logs are retained for a minimum of 365 days.' },
    'DE': { title:'Continuous Monitoring & Detection Log', section:'Security Operations Report', rows:[
      ['Report Period','Q4 2024 (Oct–Dec)'],['Tool','Splunk SIEM + CrowdStrike EDR'],
      ['Alerts Generated','1,247'],['Investigated','1,247 (100%)'],
      ['Escalated Incidents','3'],['False Positive Rate','94.2%']
    ], body:'Continuous monitoring is performed 24×7 via automated SIEM correlation rules. During Q4, three security incidents were escalated to the Computer Security Incident Response Team (CSIRT): two phishing attempts (contained) and one unauthorized access attempt (blocked by firewall rule). All indicators of compromise (IOCs) were shared with the Maryland Cybersecurity Operations Center (MCOC) within the required 2-hour window. Vulnerability scans are executed weekly on all agency-facing systems.' },
    'RS': { title:'Incident Response Plan & After-Action Report', section:'IR Documentation', rows:[
      ['Plan Version','IRP-v4.1'],['Last Tabletop Exercise','October 22, 2024'],
      ['Incident Categories Covered','7 of 7'],['RTO','4 hours (Tier 1 systems)'],
      ['Stakeholder Notification SLA','2 hours to MCOC, 24 hours to Agency Head'],['Next Review','Q1 2025']
    ], body:'The Agency Incident Response Plan (IRP) defines roles, responsibilities, and procedures for detecting, containing, eradicating, and recovering from cybersecurity incidents. Four incident response retainers are active with Assurit Consulting Group for forensic support. After-action reports are required within 5 business days of any Severity 1 or Severity 2 incident. The October 2024 tabletop exercise revealed a gap in third-party notification procedures — remediation is in progress (POA&M Item IR-2024-11).' },
    'RC': { title:'Business Continuity & Disaster Recovery Plan', section:'BC/DR Documentation', rows:[
      ['Plan ID','BCDR-2024-001'],['Last Full Test','September 14, 2024'],
      ['Recovery Point Objective','4 hours'],['Recovery Time Objective','8 hours'],
      ['Backup Frequency','Daily incremental / Weekly full'],['Off-Site Storage','AWS S3 GovCloud (us-gov-east-1)']
    ], body:'This plan documents the procedures required to restore agency mission-critical systems following a disruptive event. All Tier 1 applications have documented runbooks stored in the agency Configuration Management Database (CMDB). Backup restoration was successfully tested on September 14, 2024 with a 6.5-hour actual recovery time — within the 8-hour RTO. The next DR test is scheduled for March 2025 to validate updated runbooks following the network segmentation project.' }
  };

  window.showArtifactPreview = function (filename, ctrlId, ctrlLabel) {
    var existing = document.getElementById('artifact-preview-overlay');
    if (existing) existing.remove();

    var ext = (filename.split('.').pop() || '').toLowerCase();
    var iconMap = {
      pdf:  { icon: '📄', color: '#dc2626', bg: '#fef2f2', label: 'PDF Document',        badge: '#dc2626' },
      xlsx: { icon: '📊', color: '#16a34a', bg: '#f0fdf4', label: 'Excel Spreadsheet',   badge: '#16a34a' },
      xls:  { icon: '📊', color: '#16a34a', bg: '#f0fdf4', label: 'Excel Spreadsheet',   badge: '#16a34a' },
      docx: { icon: '📝', color: '#2563eb', bg: '#eff6ff', label: 'Word Document',        badge: '#2563eb' },
      doc:  { icon: '📝', color: '#2563eb', bg: '#eff6ff', label: 'Word Document',        badge: '#2563eb' },
      pptx: { icon: '📑', color: '#ea580c', bg: '#fff7ed', label: 'PowerPoint',           badge: '#ea580c' },
      png:  { icon: 'IMG', color: '#7c3aed', bg: '#f5f3ff', label: 'Image',                badge: '#7c3aed' },
      jpg:  { icon: 'IMG', color: '#7c3aed', bg: '#f5f3ff', label: 'Image',                badge: '#7c3aed' }
    };
    var meta = iconMap[ext] || { icon: 'DOC', color: '#64748b', bg: '#f8fafc', label: 'Document', badge: '#64748b' };
    var fakeSizes = { pdf:'2.4 MB · 14 pages', xlsx:'890 KB · 3 sheets', xls:'890 KB · 3 sheets',
      docx:'1.1 MB · 8 pages', doc:'1.1 MB · 8 pages', pptx:'3.2 MB · 22 slides',
      png:'512 KB', jpg:'768 KB' };
    var fakeSize = fakeSizes[ext] || '1.0 MB';

    // Pick document content by control function prefix (GV, ID, PR, DE, RS, RC)
    var fnKey = (ctrlId || '').split('.')[0].toUpperCase();
    var content = ARTIFACT_CONTENT[fnKey] || ARTIFACT_CONTENT['GV'];

    // Build metadata table rows
    var metaRows = content.rows.map(function (r) {
      return '<tr><td style="padding:3px 10px 3px 0;font-size:.68rem;font-weight:700;color:#64748b;white-space:nowrap;">' + r[0] + '</td>' +
             '<td style="padding:3px 0;font-size:.68rem;color:#1e293b;font-weight:600;">' + r[1] + '</td></tr>';
    }).join('');

    // Build spreadsheet grid for xlsx/xls
    var isSpreadsheet = (ext === 'xlsx' || ext === 'xls');
    var spreadsheetHTML = '';
    if (isSpreadsheet) {
      var headers = ['Control ID','Requirement','Status','Evidence Ref','Last Tested','Finding'];
      var sampleData = [
        [ctrlId,'Access controls enforced','Implemented','AD-Policy-v3.2','2024-11-20','No Finding'],
        ['PR.AA-02','Least privilege applied','Partially Impl','Access-Review-Q4','2024-10-15','Minor Gap'],
        ['PR.AA-03','MFA enforced for remote','Implemented','MFA-Config-2024','2024-12-01','No Finding'],
        ['PR.DS-01','Data-at-rest encrypted','Implemented','Encrypt-Config','2024-09-30','No Finding'],
        ['PR.DS-02','Data-in-transit secured','Implemented','TLS-Audit-2024','2024-11-05','No Finding']
      ];
      spreadsheetHTML = '<table style="width:100%;border-collapse:collapse;font-size:.6rem;">' +
        '<tr style="background:#16a34a;color:#fff;">' + headers.map(function(h){
          return '<th style="padding:4px 6px;text-align:left;font-weight:700;white-space:nowrap;">' + h + '</th>';
        }).join('') + '</tr>' +
        sampleData.map(function(row, i) {
          return '<tr style="background:' + (i%2===0?'#fff':'#f0fdf4') + ';">' +
            row.map(function(cell, ci) {
              var color = ci===5 ? (cell==='No Finding'?'#16a34a':'#d97706') : '#1e293b';
              var fw = ci===0||ci===2 ? '700' : '400';
              return '<td style="padding:3px 6px;border-bottom:1px solid #e2e8f0;color:'+color+';font-weight:'+fw+';">' + cell + '</td>';
            }).join('') + '</tr>';
        }).join('') + '</table>';
    }

    var docPreviewHTML = isSpreadsheet
      ? '<div style="overflow-x:auto;">' + spreadsheetHTML + '</div>'
      : '<div style="font-size:.68rem;line-height:1.55;color:#374151;">' + content.body + '</div>';

    var overlay = document.createElement('div');
    overlay.id = 'artifact-preview-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.72);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);padding:20px;';
    overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML =
      '<div style="background:#fff;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.4);width:640px;max-width:96vw;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;">' +
        // Header bar
        '<div style="background:#1e293b;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">' +
          '<div style="display:flex;align-items:center;gap:10px;">' +
            '<div style="width:34px;height:34px;border-radius:8px;background:' + meta.color + ';display:flex;align-items:center;justify-content:center;font-size:1.1rem;">' + meta.icon + '</div>' +
            '<div>' +
              '<div style="font-size:.85rem;font-weight:700;color:#f8fafc;max-width:380px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + filename + '</div>' +
              '<div style="font-size:.68rem;color:#94a3b8;">' + meta.label + ' &nbsp;·&nbsp; ' + fakeSize + ' &nbsp;·&nbsp; Uploaded via Anchor Portal</div>' +
            '</div>' +
          '</div>' +
          '<button onclick="document.getElementById(\'artifact-preview-overlay\').remove()" style="background:rgba(255,255,255,.1);border:none;color:#e2e8f0;font-size:1rem;cursor:pointer;padding:5px 9px;border-radius:6px;line-height:1;font-weight:700;" title="Close">✕</button>' +
        '</div>' +
        // Control info strip
        '<div style="background:#f1f5f9;padding:9px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:10px;flex-shrink:0;">' +
          '<span style="font-size:.62rem;font-weight:800;background:' + meta.color + ';color:#fff;padding:2px 8px;border-radius:3px;letter-spacing:.03em;">' + ctrlId + '</span>' +
          '<span style="font-size:.75rem;color:#334155;font-weight:700;">' + ctrlLabel + '</span>' +
          '<span style="margin-left:auto;font-size:.65rem;color:#64748b;">Evidence submission — pending assessor review</span>' +
        '</div>' +
        // Document preview
        '<div style="flex:1;overflow-y:auto;background:#fafafa;">' +
          // Document page
          '<div style="margin:20px auto;width:94%;max-width:580px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,.08);overflow:hidden;">' +
            // Document top bar (letterhead)
            '<div style="background:' + meta.color + ';height:6px;"></div>' +
            '<div style="padding:20px 24px 16px;">' +
              // Agency letterhead
              '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:2px solid #e2e8f0;">' +
                '<div>' +
                  '<div style="font-size:.62rem;font-weight:700;color:#64748b;letter-spacing:.08em;text-transform:uppercase;">State of Maryland — DoIT</div>' +
                  '<div style="font-size:.9rem;font-weight:800;color:#1e293b;margin-top:2px;">' + content.title + '</div>' +
                  '<div style="font-size:.68rem;color:#64748b;margin-top:2px;">' + content.section + ' &nbsp;|&nbsp; Anchor Platform Assessment</div>' +
                '</div>' +
                '<div style="text-align:right;">' +
                  '<div style="font-size:.62rem;color:#94a3b8;">Assessment ID</div>' +
                  '<div style="font-size:.7rem;font-weight:700;color:#1e293b;">ANCH-2024-MD-001</div>' +
                  '<div style="margin-top:4px;font-size:.6rem;background:#dcfce7;color:#15803d;padding:2px 7px;border-radius:3px;font-weight:700;display:inline-block;">CONTROLLED DOCUMENT</div>' +
                '</div>' +
              '</div>' +
              // Metadata table
              '<div style="margin-bottom:14px;">' +
                '<div style="font-size:.65rem;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Document Information</div>' +
                '<table>' + metaRows + '</table>' +
              '</div>' +
              // Divider
              '<div style="border-top:1px dashed #e2e8f0;margin-bottom:14px;"></div>' +
              // Body content
              '<div>' +
                '<div style="font-size:.65rem;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">' +
                  (isSpreadsheet ? 'Control Compliance Matrix — Sample Data' : 'Document Summary') +
                '</div>' +
                docPreviewHTML +
              '</div>' +
              // Footer watermark
              '<div style="margin-top:18px;padding-top:10px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;">' +
                '<div style="font-size:.58rem;color:#cbd5e1;">Generated by Anchor Platform · Assurit Consulting Group · Maryland DoIT</div>' +
                '<div style="font-size:.58rem;color:#cbd5e1;">Page 1 of ' + (isSpreadsheet ? '3' : '14') + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        // Action footer
        '<div style="padding:12px 20px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px;flex-shrink:0;background:#fff;">' +
          '<button onclick="document.getElementById(\'artifact-preview-overlay\').remove()" style="font-size:.76rem;padding:7px 16px;border-radius:7px;border:1px solid #e2e8f0;background:#fff;color:#475569;cursor:pointer;font-weight:600;">Close</button>' +
          '<button onclick="setSubmissionReview(\'' + ctrlId + '\',\'reviewing\');document.getElementById(\'artifact-preview-overlay\').remove();" style="font-size:.76rem;padding:7px 16px;border-radius:7px;border:1px solid #3b82f6;background:#eff6ff;color:#1d4ed8;cursor:pointer;font-weight:600;">Mark Under Review</button>' +
          '<button onclick="setSubmissionReview(\'' + ctrlId + '\',\'accepted\');document.getElementById(\'artifact-preview-overlay\').remove();" style="font-size:.76rem;padding:7px 16px;border-radius:7px;border:none;background:#10b981;color:#fff;cursor:pointer;font-weight:700;">Accept Artifact ✓</button>' +
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
        returned:  'background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;',
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

    // Fallback: if SRTM was already initialized before observer was set up
    if (srtmContents.children.length > 0 && !injected) {
      injected = true;
      observer.disconnect();
      setTimeout(function () {
        injectSrtmResponsePanels();
        renderAgencyResponsesIQTab();
      }, 80);
    }
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
        ? '<div style="display:inline-flex;align-items:center;gap:6px;background:#d1fae5;border:1px solid #6ee7b7;border-radius:5px;padding:4px 10px;font-size:.73rem;font-weight:600;color:#065f46;">Evidence on file</div>'
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
                ? '<span style="margin-left:auto;font-size:.69rem;font-weight:600;color:#065f46;background:#d1fae5;border:1px solid #6ee7b7;padding:2px 8px;border-radius:10px;">Evidence on file</span>'
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
    restoreSubmittedState();
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

// ── Global fallbacks for evidence section onclick handlers ────────────────
// These are defined here as defaults; individual agency pages may override them.
if (typeof window.agencyUploadClick !== 'function') {
  window.agencyUploadClick = function () {
    const input = document.getElementById('agency-evidence-upload');
    if (input) input.click();
  };
}
if (typeof window.agencySubmitEvidence !== 'function') {
  window.agencySubmitEvidence = function () {
    if (typeof notify === 'function') notify('Submitting evidence to assessor…');
  };
}
