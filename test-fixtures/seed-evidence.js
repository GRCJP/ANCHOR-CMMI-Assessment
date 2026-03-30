/**
 * Anchor Platform — Evidence Seed Script
 * Paste into browser console OR load as a <script> tag to pre-populate
 * all three agency self-assessment localStorage keys with realistic data.
 *
 * Usage:
 *   Browser console: copy-paste entire file contents
 *   Or: <script src="test-fixtures/seed-evidence.js"></script>
 */
(function () {

  // ── MDOT ─────────────────────────────────────────────────────────────────
  var mdot = {
    'GV.OC-01': {
      answers: [
        'MDOT operates under Information Security Policy v2.5, signed by the Deputy Secretary for Information Technology in January 2026. The policy was last formally reviewed in November 2025 by the CISO and IT Security Office. The version history dates back to 2019 with major revisions in 2022 and 2025 to incorporate cloud governance provisions for our AWS GovCloud and Azure Government environments.',
        'The CISO is responsible for policy maintenance with support from the IT Security Officer. The policy requires annual review at minimum, with an out-of-cycle review triggered by any major infrastructure change, new regulatory requirement, or significant security incident. The most recent review cycle took approximately 6 weeks and involved legal, privacy, and operations stakeholders.',
        'Sections covering remote access and cloud workload security are currently under revision to address our expanding SaaS footprint. We expect to finalize those updates by Q2 2026. All other sections are fully implemented and actively enforced through HR onboarding, annual attestation, and our AUP acknowledgment process.'
      ],
      evidence: 'MDOT_Information_Security_Policy_v2.5_Jan2026.pdf'
    },
    'GV.RM-01': {
      answers: [
        'MDOT maintains an enterprise risk register organized by business function and IT system tier managed in ServiceNow GRC. Each risk entry includes threat description, likelihood and impact rating, risk owner, and current treatment status.',
        'Risk posture is formally reviewed quarterly by the Risk Management Committee which includes the CISO, Deputy CIO, General Counsel, and representatives from each major IT program office. The quarterly review produces a risk report submitted to the IT Steering Committee.',
        'Three highest-priority active risks: (1) No centralized SIEM — Splunk procurement in progress. (2) Patch management delays on legacy infrastructure — 97-day avg CVE patch time on traffic management servers. (3) Third-party access controls — several MSPs have persistent VPN access with insufficient monitoring. PAM pilot underway.'
      ],
      evidence: 'MDOT_Risk_Register_Enterprise_Q1_2026.xlsx'
    },
    'GV.RR-01': {
      answers: [
        'Formally assigned cybersecurity roles at MDOT include: CISO, IT Security Officer, System Owners, Data Custodians, and Security Liaisons in each of five major program offices. A dedicated Privacy Officer does not yet exist — privacy responsibilities are shared between Legal and the IT Security Officer.',
        'All MDOT employees, contractors, and temporary staff complete the Maryland Security Awareness Training through DBM within 30 days of hire and annually thereafter. A Rules of Behavior agreement is required for anyone with privileged access or access to sensitive transportation operations data. Non-compliance triggers an access suspension workflow.',
        'The CISO has authority to declare a cybersecurity incident and activate the Incident Response Plan. In the CISO\'s absence, the Deputy CIO holds that authority. The escalation chain is documented in the IRP and distributed to all IT leadership.'
      ],
      evidence: 'MDOT_Cybersecurity_RACI_Matrix_2026.pdf'
    },
    'GV.PO-01': {
      answers: [
        'MDOT has a formal policy review schedule documented in the IT Governance Framework requiring annual review at minimum. Policies covering access control, incident response, and cloud security have a 6-month supplemental review trigger for any major environmental change. The schedule is tracked in ServiceNow.',
        'Policy updates go through a three-stage approval process: IT Security Office drafts revisions, Legal and Privacy review for compliance, then Deputy Secretary for IT provides final approval. Published to MDOT intranet with mandatory staff acknowledgment workflow.',
        'The last comprehensive review was completed November 2025. Updates included revised cloud security requirements, updated MFA enforcement language, and new sections on AI-assisted tools and shadow IT, driven by the updated DoIT cybersecurity standards issued August 2025.'
      ],
      evidence: 'MDOT_Policy_Review_Log_2024-2026.xlsx'
    },
    'GV.SC-01': {
      answers: [
        'MDOT includes cybersecurity requirements in all IT vendor contracts through a standard Security Addendum. Requirements include maintaining a documented security program, providing SOC 2 Type II reports annually, reporting security incidents within 72 hours, and complying with Maryland data security standards.',
        'New vendors requesting access to MDOT systems or data undergo a pre-onboarding security review including a vendor security questionnaire and review of SOC 2, ISO 27001, or FedRAMP documentation. High-risk vendors require additional technical review and CISO approval.',
        'Vendor and contractor access is provisioned through our IAM system with time-limited accounts and Duo MFA required. Access reviews occur quarterly and automatically expires after 90 days without renewal. CyberArk PAM is being deployed to enforce just-in-time privileged access for vendors, expected Q3 2026.'
      ],
      evidence: 'MDOT_Vendor_Security_Addendum_Template_v1.2.pdf'
    },
    'ID.AM-01': {
      answers: [
        'MDOT maintains its hardware and software asset inventory in ServiceNow CMDB, integrated with Microsoft Intune for endpoint management and Tenable for vulnerability scanning. Automated discovery runs weekly; unrecognized devices trigger alerts to network operations. The inventory is manually reconciled against physical asset records quarterly.',
        'The CMDB includes on-premises servers, workstations, network infrastructure, and Azure Government cloud resources. SaaS applications are tracked in a shadow IT register. Approximately 15% of contracted IT services are managed outside direct visibility — a current risk register item.',
        'A current network diagram is maintained by the Network Operations team, last updated March 2026. The diagram shows the primary data center, SHA operations network, and Azure Government connectivity. Security zones are defined and documented. Mandatory update requirement exists after any major infrastructure change.'
      ],
      evidence: 'MDOT_Hardware_Asset_Inventory_CMDB_Apr2026.xlsx'
    },
    'ID.AM-02': {
      answers: [
        'MDOT\'s Data Classification Policy defines four tiers: Public, Internal Use, Sensitive/Controlled (PII, financial data), and Restricted (law enforcement data, critical infrastructure operational data). Each tier has documented handling, storage, and transmission requirements.',
        'Sensitive data categories include employee PII subject to Maryland\'s Personal Information Protection Act, financial transaction records for toll and fare systems, and limited CJI shared under MOUs with MSP and DPSCS. PII is inventoried in our data map maintained by the Privacy Coordinator. Sensitive data at rest is encrypted using AES-256.',
        'Data handling requirements are documented for each classification tier and incorporated into system security plans, covering storage encryption requirements, TLS 1.2+ for transmission, prohibition on unencrypted email for Sensitive data, and NIST 800-88 secure disposal.'
      ],
      evidence: 'MDOT_Data_Classification_Policy_v1.8.pdf'
    },
    'ID.RA-01': {
      answers: [
        'Most recent formal risk assessment completed September 2025 using NIST SP 800-30 methodology for IT infrastructure risk and FIPS 199 categorization for system impact levels, conducted by the IT Security Office with a contracted third-party assessor.',
        'Results were formally documented and presented to the IT Steering Committee in October 2025. Findings were prioritized using a 5×5 likelihood-impact matrix. The top 10 findings were reviewed by the Deputy Secretary for IT who approved a remediation roadmap with specific owners and target dates.',
        'Three highest-priority findings: (1) Absence of centralized SIEM — rated High/Critical; Splunk procurement approved. (2) Incomplete MFA enforcement — rated High/High; rollout 60% complete. (3) Third-party access control gaps — rated Medium/High; PAM pilot in progress.'
      ],
      evidence: 'MDOT_Risk_Assessment_Report_FY2025.pdf'
    },
    'ID.RA-02': {
      answers: [
        'MDOT conducts vulnerability scans using Tenable Nessus. Authenticated scans of all servers and network devices run weekly. Workstation scans run monthly via the Intune-integrated Tenable agent. CISA KEV entries are cross-referenced against our inventory within 24 hours of publication.',
        'Scan scope covers all on-premises Windows and Linux servers, network infrastructure, Azure Government IaaS workloads via the Tenable.io cloud connector, and our traffic management OT environment (quarterly passive scanning to avoid operational disruption). SaaS applications are assessed through configuration review.',
        'Our SLA is 15 days for critical CVEs and 30 days for high. In the past 90 days, remediation rate for critical CVEs was 78%. The gap is driven by legacy server dependencies in traffic operations systems requiring change-window coordination with SHA operations.'
      ],
      evidence: 'MDOT_Nessus_Scan_Summary_Apr2026.pdf'
    },
    'PR.AA-01': {
      answers: [
        'MFA is enforced for all remote access via VPN (Cisco AnyConnect + Duo), all Microsoft 365 applications, and our Azure Government management portal. MFA is also required for all privileged account logins to domain controllers and production servers. On-premises workstation logins for general staff are not currently MFA-protected — this is a known gap.',
        'MDOT uses Duo Security as our primary MFA solution integrated with Azure AD and VPN concentrator. Approximately 2,400 licensed Duo users. Hardware tokens issued to approximately 80 staff without smartphones. PIV/CAC smart cards used for a subset of systems with FISMA requirements.',
        'Primary MFA gap: on-premises workstation authentication for general staff. Additionally, approximately 12% of service accounts used for system-to-system integration are exempt from MFA due to technical limitations. These accounts are compensated with IP restriction and enhanced logging.'
      ],
      evidence: 'MDOT_MFA_Enforcement_Policy_Duo_Config.pdf'
    },
    'PR.AT-01': {
      answers: [
        'MDOT uses the Maryland Cybersecurity Awareness Training through DBM supplemented by KnowBe4 for phishing simulation. Annual comprehensive training plus role-specific training for admins semi-annually. Content updated quarterly with current threat intelligence covering phishing, ransomware, and data handling.',
        'Training is mandatory for all employees, contractors with network access, and temporary staff. Non-completion after 30 days past due results in access flagged for review. Monthly non-compliance reports go to division directors.',
        'Most recent training cycle (January 2026) achieved 94% completion across approximately 2,400 staff. Monthly phishing simulations through KnowBe4 — most recent (March 2026) had 11% click rate, down from 23% when the program launched in 2023.'
      ],
      evidence: 'MDOT_Security_Awareness_Training_Completions_Q1_2026.xlsx'
    },
    'PR.DS-01': {
      answers: [
        'New user accounts are provisioned through a ServiceNow workflow requiring manager approval, system owner approval, and IT Security Office review for privileged access within 2 business days. Separations trigger automated account disable within 4 hours and full deprovisioning within 24 hours of separation date.',
        'User access rights are reviewed semi-annually through SailPoint Identity IQ access recertification. Excessive or unnecessary access is removed within 5 business days. Most recent recertification (January 2026) removed 340 accounts and 1,200 access entitlement changes.',
        'Privileged accounts are managed through CyberArk (pilot covering 40% of systems). Domain admin accounts are separate from daily-use accounts. Service accounts have 90-day password rotation enforced. Shared accounts are prohibited by policy with exceptions requiring CISO approval and enhanced logging.'
      ],
      evidence: 'MDOT_Access_Control_Policy_v3.0.pdf'
    },
    'PR.IR-01': {
      answers: [
        'MDOT uses SCCM for patch management on Windows endpoints and servers, supplemented by ManageEngine for network devices and Linux systems. Azure Update Manager handles Azure Government workloads. Coverage spans operating systems, Microsoft applications, third-party software in SCCM catalog, and network device firmware.',
        'Critical-severity patches must be applied within 30 days of release; high-severity within 60 days. Patches are tested in pre-production for 5 business days before production rollout. Emergency patches for CISA KEV entries are expedited to a 72-hour deployment target.',
        'Patch compliance for the past 90 days: 81% for workstations, 73% for servers. The server gap is primarily legacy traffic management systems running Windows Server 2012 R2 awaiting FY2027 modernization. These systems have compensating controls in the POA&M.'
      ],
      evidence: 'MDOT_Patch_Compliance_Report_Jan-Mar2026.xlsx'
    },
    'PR.PS-01': {
      answers: [
        'MDOT uses CIS Benchmark Level 1 as the baseline hardening standard for Windows servers and workstations, and CIS Benchmark for network infrastructure. New systems must pass a hardening validation check before production promotion. DISA STIGs applied for systems with federal connectivity requirements.',
        'Hardening is applied during provisioning using Group Policy Objects for Windows systems and Ansible playbooks for Linux servers. Azure cloud resources deployed using hardened base images from our approved image catalog. Any deviation from baseline requires a formal exception request with compensating controls.',
        'Configuration drift is monitored using Tenable compliance scanning (CIS benchmark checks weekly on all production servers). Most recent scan showed 91% of servers meeting the hardening baseline. The 9% gap is concentrated in two legacy application servers scheduled for decommission Q3 2026.'
      ],
      evidence: 'MDOT_CIS_Benchmark_Hardening_Standard_v2.pdf'
    },
    'DE.CM-01': {
      answers: [
        'MDOT does not yet have a fully deployed SIEM. Splunk Enterprise is licensed and approximately 40% deployed. The Splunk environment is hosted in our Hanover data center with a cloud tier in Azure. Prior to Splunk, log management was through individual system logging with no centralized correlation or alerting. This is a critical gap in our risk register.',
        'Current Splunk log sources: Active Directory, Azure AD, Windows Security Event logs (~60% of servers), Palo Alto firewall logs, and Cisco VPN logs. Not yet onboarded: workstation endpoint logs, email gateway, IIS application logs, and OT network logs. Full onboarding projected August 2026.',
        'Monitoring is business hours only (7am–6pm) with on-call for after-hours critical alerts. No 24/7 SOC coverage yet. Evaluating MSSP options. Current log retention is 90 days hot storage with 12-month archive in Azure Blob.'
      ],
      evidence: 'MDOT_Splunk_SIEM_Config_Overview.pdf'
    },
    'DE.AE-01': {
      answers: [
        'Alert triage is handled by two senior security analysts supported by the IT Security Officer during business hours with on-call rotation for critical after-hours alerts. For the 40% of log sources feeding Splunk, alerts are generated from correlation rules and reviewed by analysts.',
        'SLA for critical Splunk alerts is 30 minutes to initial triage during business hours; high-severity is 2 hours. These SLAs are aspirational — actual response times are not yet formally measured. After-hours critical alerts page the on-call engineer; high alerts queue for next business day.',
        'Security events are documented in ServiceNow as security incidents. Splunk-generated incidents are automatically created via the SOAR integration. Currently 23 open security incidents in various stages of investigation.'
      ],
      evidence: 'MDOT_SOC_Alert_Triage_Procedures_v1.1.pdf'
    },
    'RS.MA-01': {
      answers: [
        'MDOT\'s Incident Response Plan v3.2 was approved in October 2025. Substantially revised from v3.0 to incorporate Azure-specific playbooks, updated Maryland PIPA notification requirements, and revised ransomware escalation procedures. Explicitly references current tools including Splunk and CyberArk pilot.',
        'Named IRP roles: Incident Commander (CISO), Technical Lead (IT Security Officer), Communications Coordinator (PIO and Legal), Legal/Privacy Advisor (Deputy AG for IT), IT Operations Lead (Deputy CIO). Tier 1 and 2 incidents require Secretary notification within 2 hours. PIPA breach notification procedures included in the IRP appendix with 72-hour reporting timelines.',
        'Four-tier severity scale: Tier 4 (individual user issue) through Tier 1 (enterprise-wide impact, ransomware, confirmed data breach). Law enforcement notification thresholds defined for incidents involving CJIS-related data. Escalation decision tree covers DoIT, CISA, and Governor\'s office notification thresholds.'
      ],
      evidence: 'MDOT_Incident_Response_Plan_v3.2_2025.pdf'
    },
    'RS.MA-02': {
      answers: [
        'MDOT conducted a tabletop exercise in November 2025 simulating a ransomware attack originating from a compromised vendor VPN account. Participants included the CISO, Deputy CIO, IT Security Officer, General Counsel, PIO, and SHA operations representatives. Facilitated by contracted cybersecurity firm.',
        'Key findings: (1) Communication breakdown between IT Security and SHA operations during containment — OT isolation procedure unclear, caused 45-minute delay. (2) External notification timeline unclear — unclear trigger for Governor\'s office vs. DoIT-only notification. (3) Backup restoration procedure never tested — team unsure of recovery time for traffic management database.',
        'Corrective actions tracked in a post-exercise action plan. IRP updated January 2026 to clarify OT isolation procedures and notification decision tree. Backup restoration testing scheduled May 2026. Follow-up tabletop planned October 2026. Action plan reviewed monthly by IT Security Officer.'
      ],
      evidence: 'MDOT_IR_Tabletop_Exercise_AAR_Nov2025.pdf'
    },
    'RC.RP-01': {
      answers: [
        'MDOT maintains a Disaster Recovery Plan v2.0 and Business Continuity Plan, both approved August 2025 and updated to reflect our Azure Government hybrid environment and TMS co-location. The DRP covers IT system recovery; the BCP covers operational continuity for ferry, transit, and highway operations.',
        'RTOs and RPOs defined in our BIA: Traffic Management System — RTO 4hr, RPO 1hr. Financial systems — RTO 8hr, RPO 4hr. M365/email — RTO 2hr, RPO 15min (Azure geo-redundancy). Targets were validated against recovery architecture in the Q4 2025 DRP test.',
        'Production data backed up daily using Veeam to Frederick co-location with replication to Azure Blob storage. Critical system backups run every 4 hours. Backups stored in isolated Azure storage account with no internet-facing access to protect against ransomware. Retention: 30 days Veeam, 12 months Azure cold storage. Restoration tests conducted semi-annually.'
      ],
      evidence: 'MDOT_Disaster_Recovery_Plan_v2.0_2025.pdf'
    },
    'RC.RP-02': {
      answers: [
        'MDOT completed a DRP tabletop exercise in December 2025 focused on TMS restoration from backup following ransomware. Partial functional test — initiated restoration process from backup and validated the recovery sequence without failing over production systems.',
        'TMS restoration simulation achieved the 4-hour RTO target. The financial system restoration sequence revealed the recovery runbook referenced a decommissioned server — the runbook had not been updated, and financial system recovery would have exceeded its 8-hour RTO by approximately 3 hours.',
        'Corrective actions: runbook updated immediately after the test; quarterly runbook accuracy attestation now required from all system owners. Full financial system functional recovery test scheduled June 2026.'
      ],
      evidence: 'MDOT_DRP_Test_Results_Q4_2025.pdf'
    }
  };

  // ── DPSCS ─────────────────────────────────────────────────────────────────
  var dpscs = {
    'GV.OC-01': {
      answers: [
        'DPSCS maintains Information Security Policy v3.1, signed by the Secretary of Public Safety in February 2026. The policy covers all correctional facilities, parole and probation offices, and administrative headquarters. It incorporates CJIS Security Policy requirements as a baseline for all systems that process criminal justice information.',
        'The CISO is designated policy owner with oversight from the Deputy Secretary for Administration. The policy requires annual review and mandatory out-of-cycle review following any CJIS Policy update, major system change, or incident involving criminal justice information. Most recent full review completed December 2025.',
        'Implementation gaps exist in sections covering access control for correctional facility floor systems and monitoring of contractor access to inmate management systems, documented in our active POA&M. PAM solution procurement in progress with expected Q4 2026 closure.'
      ],
      evidence: 'DPSCS_Information_Security_Policy_v3.1_2026.pdf'
    },
    'GV.RM-01': {
      answers: [
        'DPSCS maintains a risk register covering major IT systems, correctional operations technology, and CJIS-connected systems in a SharePoint-based tracker. Risks are categorized by system, functional area, and regulatory driver (CJIS, HIPAA for medical records, state data security standards).',
        'Risk posture reviewed semi-annually by the DPSCS IT Security Committee including the CISO, facility IT directors, legal counsel, and Deputy Secretary for Administration. Most recent review conducted March 2026. Significant risks are escalated to the Secretary\'s office in the quarterly IT governance briefing.',
        'Three highest-priority risks: (1) No PAM solution — domain admins use shared accounts on critical correctional systems. (2) Incomplete EDR coverage — 35% of correctional facility workstations run legacy OS not supported by current EDR. (3) Delayed patching on facility servers — 24/7 operational constraints make patching windows difficult.'
      ],
      evidence: 'DPSCS_Risk_Register_Apr2026.xlsx'
    },
    'GV.RR-01': {
      answers: [
        'DPSCS has not yet completed a formal RACI matrix for cybersecurity responsibilities across all facilities. The CISO and IT Security Officer roles are formally defined. System owners are identified in system documentation but not consolidated into a single governance document. A cybersecurity roles and responsibilities framework is being developed, expected Q3 2026.'
      ]
    },
    'GV.PO-01': {
      answers: [
        'DPSCS has a policy review schedule targeting annual review for all IT security policies. In practice, several policies have not been reviewed in 18–24 months due to CISO turnover in 2024. Eight security policies are past due for review. The incoming CISO (started January 2026) has established a 6-month remediation plan.'
      ]
    },
    'GV.SC-01': {
      answers: [
        'DPSCS requires vendors with access to CJIS systems to undergo FBI-mandated security awareness training and execute a CJIS Security Addendum. For non-CJIS vendors, a standard security addendum requires compliance with DPSCS security standards, incident notification within 24 hours, and right-to-audit provisions.',
        'New vendors accessing CJIS systems must document their CJIS compliance posture including training records. We do not have a formal annual vendor security reassessment program — identified as a gap in the 2024 risk assessment.',
        'Vendor access is provisioned through individual named accounts (not shared). VPN access required for all remote vendor connections. No automated session recording or just-in-time access controls for vendor privileged sessions yet — PAM solution in procurement will address this. MFA enforced for vendor VPN via Duo.'
      ],
      evidence: 'DPSCS_Vendor_Contract_Security_Addendum.pdf'
    },
    'ID.AM-01': {
      answers: [
        'DPSCS maintains a hardware asset inventory through Active Directory, SCCM for managed workstations, and manual spreadsheet tracking for correctional facility equipment. The inventory is not fully consolidated. Approximately 30% of assets — primarily older facility hardware — are tracked manually with accuracy issues.',
        'Inventory covers managed workstations, servers, and network equipment at headquarters and 12 major correctional facilities. Mobile devices tracked through Intune MDM. Does not comprehensively cover contractor-supplied equipment or OT systems (door control, surveillance). CMDB consolidation included in FY2027 modernization plan.',
        'An enterprise network diagram exists connecting headquarters to correctional facilities via MPLS, last updated September 2025. Facility-level diagrams maintained locally by facility IT staff and not always centrally accessible. Enterprise diagram does not show all security zones at the facility level.'
      ],
      evidence: 'DPSCS_Asset_Inventory_Partial_Apr2026.xlsx'
    },
    'ID.AM-02': {
      answers: [
        'DPSCS has a data classification policy that has not been updated since 2022 and does not fully address newer data types including body camera footage and electronic monitoring data. Existing policy defines Restricted (CJIS, inmate medical records), Sensitive (inmate records, HR data), and Internal classifications. A policy update is in progress.'
      ]
    },
    'ID.RA-01': {
      answers: [
        'DPSCS completed a formal risk assessment in October 2024 using the FIPS 199 framework for system categorization and a modified NIST 800-30 approach. The assessment covered all major IT systems and was conducted by the IT Security Office with external support from a DoIT-contracted security consultant.',
        'Results were presented to the IT Security Committee and the Secretary\'s office in November 2024. Ten findings were prioritized for remediation. Seven of ten have been remediated or have active remediation projects. Three remain open pending procurement or major infrastructure changes.',
        'Highest-priority findings: (1) Shared privileged accounts on correctional management systems — PAM in procurement. (2) No EDR on legacy facility workstations — EDR rollout 65% complete. (3) Inmate management network not segmented from administrative network at two facilities — network segmentation project approved for FY2026.'
      ],
      evidence: 'DPSCS_FIPS199_Risk_Assessment_2024.pdf'
    },
    'ID.RA-02': {
      answers: [
        'DPSCS conducts vulnerability scans quarterly using a DoIT-managed Tenable service covering headquarters servers and primary CJIS-connected systems. Correctional facility servers scanned semi-annually due to operational constraints — scheduling authenticated scans at 24/7 facilities requires coordination to avoid disruption.'
      ]
    },
    'PR.AA-01': {
      answers: [
        'MFA is currently enforced only for remote VPN access and CJIS system logins at DPSCS. The FBI CJIS Security Policy mandates MFA for all CJIS system access, which we are compliant with. General on-premises system access for staff in correctional facilities does not currently require MFA. Extending MFA to all staff logons is a 2026 priority but faces challenges with shared workstation usage in correctional environments.'
      ]
    },
    'PR.AT-01': {
      answers: [
        'All DPSCS employees including correctional officers, parole agents, and administrative staff complete CJIS Security Awareness Training annually as mandated by the FBI CJIS Security Policy, supplemented by DPSCS-specific cybersecurity training through DBM. Non-completion results in CJIS access suspension.',
        'Training is mandatory for all employees and contractors with system access. The CJIS training requirement is enforced through FBI CJIS audit. Correctional officers with limited desktop access complete training on shared kiosks during scheduled training periods.',
        'Most recent training cycle (FY2025) achieved 89% completion. The 11% gap is primarily correctional officers on extended medical leave or long-term assignment rotations. DPSCS does not currently conduct phishing simulations — planned for FY2026 pending budget approval.'
      ],
      evidence: 'DPSCS_Security_Training_Completion_FY2025.xlsx'
    },
    'PR.DS-01': {
      answers: [
        'New user accounts at DPSCS are provisioned through a paper-based access request form submitted by the employee\'s supervisor, reviewed by facility IT, and executed by the IT Help Desk. When an employee separates, HR notifies IT via email to deactivate accounts. Target is same-day but actual deactivation averages 2–3 business days.',
        'User access reviews are conducted annually. The December 2025 review identified 340 accounts with excessive access and 87 accounts that should have been deactivated. These were remediated in January 2026. Evaluating identity governance tools to automate access certification.',
        'Privileged accounts are managed inconsistently. Domain admin accounts at some facilities are used by multiple IT staff without individual accountability. No PAM solution — our highest-priority security investment for FY2026. Compensating controls include enhanced logging on domain controller activity and monthly manual review of privileged account usage logs.'
      ],
      evidence: 'DPSCS_Access_Control_Policy_v2.0.pdf'
    },
    'PR.IR-01': {
      answers: [
        'DPSCS uses WSUS for Windows patch management at headquarters and SCCM at three major facilities. Seven correctional facilities rely on manual patching managed by facility IT staff, creating significant inconsistency. No unified patch management coverage across the enterprise.',
        'Policy requires critical patches within 30 days. In practice this target is rarely met for facility servers due to 24/7 operational challenges. Average time to patch critical CVEs is approximately 75 days enterprise-wide — headquarters achieves 30-day compliance but facilities average 110 days.',
        'Patch compliance reporting is done manually through a monthly spreadsheet. No automated enterprise-wide dashboard. Several servers at two facilities are running end-of-life OS versions that can no longer receive security patches.'
      ],
      evidence: 'DPSCS_Patch_Log_Q1_2026.xlsx'
    },
    'PR.PS-01': {
      answers: [
        'DPSCS does not have a formally documented system hardening standard consistently applied across all facilities. Headquarters servers follow informal CIS Benchmark guidance but facility servers vary significantly. Identified as a finding in our 2024 risk assessment. Development of a formal hardening baseline is included in the FY2026 security program plan.'
      ]
    },
    'DE.CM-01': {
      answers: [
        'DPSCS does not currently have a SIEM deployed. Log management is handled through Windows Event Forwarding to a central log server at headquarters, reviewed by the IT Security Officer reactively with no automated alerting or correlation capability. Correctional facility log data is not centrally collected. This is our most critical security gap.'
      ]
    },
    'DE.AE-01': {
      answers: [
        'Alert triage at DPSCS is handled by the IT Security Officer and two IT administrators on a best-effort basis with no formal triage process or documented SLA. Security events are identified primarily through user reports, automated system error logs, and periodic manual review of Active Directory and server event logs. Without a SIEM, there is no systematic correlation or alerting capability.'
      ]
    },
    'RS.MA-01': {
      answers: [
        'DPSCS has an Incident Response Plan v2.1, last updated September 2024. Developed with DoIT assistance and covers detection, containment, eradication, recovery, and post-incident review. Includes specific procedures for CJIS-related incidents including FBI notification requirements within 24 hours of confirmed breach.',
        'Named roles: Incident Commander (CISO), Technical Lead (IT Security Officer), Operations Coordinator (Deputy Secretary for Administration), Legal Advisor (Deputy AG), Communications Lead (PIO). Ransomware events trigger immediate escalation to the Secretary and DoIT.',
        'Severity levels: Critical (ransomware, confirmed CJIS breach, facility operations disruption), High (potential breach, significant compromise), Medium (isolated malware), Low (policy violation, failed access attempts). Critical and High require Secretary notification within 1 hour.'
      ],
      evidence: 'DPSCS_Incident_Response_Plan_v2.1_2024.pdf'
    },
    'RS.MA-02': {
      answers: [
        'The DPSCS IRP has not been formally tested through a tabletop exercise or functional drill within the past 12 months. The last exercise was conducted in 2022 prior to CISO turnover. A ransomware tabletop is planned for June 2026 with DoIT facilitation support.'
      ]
    },
    'RC.RP-01': {
      answers: [
        'DPSCS has a combined BCP/DRP document from 2023. Critical systems include the Inmate Management System, CJIS-connected terminals, and the offender supervision tracking system. RTOs are defined but have not been validated through testing.',
        'Defined RTOs: Inmate Management System — 8hr (RPO 4hr). CJIS-connected systems — 24hr (RPO 4hr). Electronic monitoring systems — 4hr given public safety implications.',
        'System backups performed daily using Windows Server Backup to NAS at headquarters. A subset of critical systems replicate to a state data center offsite. Backups are NOT stored in an isolated environment — accessible from the production network, creating ransomware risk. No backup restoration tests performed in the past 12 months.'
      ],
      evidence: 'DPSCS_BCP_DRP_Document_2023.pdf'
    },
    'RC.RP-02': {
      answers: [
        'DPSCS has not conducted a formal DRP or BCP test within the past 24 months. This is a known gap acknowledged in our risk register. The incoming CISO has committed to a tabletop BCP exercise in Q3 2026 as part of the first-year security improvement plan.'
      ]
    }
  };

  // ── MSDE ──────────────────────────────────────────────────────────────────
  var msde = {
    'GV.OC-01': {
      answers: [
        'MSDE operates under Information Security Policy v4.0, approved by the State Superintendent in January 2026. Substantially revised in 2025 to incorporate updated DoIT cybersecurity standards, FERPA data protection obligations, LEA data sharing agreement requirements, and cloud-based student information system security provisions.',
        'The Deputy Superintendent for Operations maintains policy ownership with day-to-day management by the CISO. Annual review involves Legal (FERPA/COPPA compliance), Privacy Officer, HR, and Student Data Governance representatives. Updates require Superintendent sign-off with staff acknowledgment via HR portal within 30 days of publication.',
        'The policy is fully implemented with no significant gaps. Minor updates made during the November 2025 annual review cycle addressed AI tools governance, approved software sections, and student data sharing provisions for new LEA data governance agreements executed in 2025.'
      ],
      evidence: 'MSDE_Information_Security_Policy_v4.0_2026.pdf'
    },
    'GV.RM-01': {
      answers: [
        'MSDE maintains a risk register in Archer GRC organized by student data systems, educator certification systems, financial and grants management, and administrative IT. Each entry includes threat description, likelihood/impact ratings (1–5), risk owner, current treatment, and target remediation date. Reviewed by the Risk and Compliance Committee quarterly.',
        'The Risk and Compliance Committee meets quarterly and includes the CISO, Deputy Superintendent for Operations, Privacy Officer, General Counsel, and Director of Student Data Governance. A risk posture summary is presented to the Superintendent annually in October. Risks above threshold severity are escalated per Maryland agency notification requirements.',
        'Three highest-priority risks: (1) Third-party student data processors — 240+ LEAs and 40+ vendors require continuous monitoring; annual vendor security reviews implemented for all Tier 1 processors. (2) Phishing targeting educator accounts — monthly simulations with 8% click rate in most recent drill. (3) Multi-tenant M365 complexity — managing configurations across LEA shared tenants requires careful governance.'
      ],
      evidence: 'MSDE_Risk_Register_FY2026.xlsx'
    },
    'GV.RR-01': {
      answers: [
        'MSDE has formally documented cybersecurity roles including: CISO, IT Security Manager, Privacy Officer (FERPA compliance), System Owners for each major system, Data Stewards for student data categories, and Security Liaisons in each of five program divisions. All role descriptions are in the MSDE IT Governance Framework updated January 2026.',
        'All MSDE staff, contractors, and LEA partners complete mandatory security awareness training at hire and annually. Rules of Behavior signed at onboarding and renewed annually via DocuSign workflow. Privileged users complete an enhanced acknowledgment covering specific privileged access obligations.',
        'The CISO has authority to declare incidents and initiate the IRP. In absence, the IT Security Manager or Deputy Superintendent for Operations can declare. Authority is clearly documented in the IRP and IT Governance Framework. Staff are informed of incident reporting obligations including the 24-hour reporting line for potential student data incidents.'
      ],
      evidence: 'MSDE_Cybersecurity_Org_Chart_RACI_2026.pdf'
    },
    'GV.PO-01': {
      answers: [
        'MSDE has a formal policy review schedule documented in the IT Policy Management Procedure and tracked in Archer requiring annual review. Policies have automated 60-day pre-review reminders sent to owners. Any policy not reviewed within 13 months is automatically flagged as overdue and escalated to the CISO.',
        'Updates go through a three-stage process: drafting by IT Security, review by Legal and Privacy, final approval by Deputy Superintendent. Published to the MSDE policy portal within 5 business days of approval. Staff with affected access rights receive targeted notification and must acknowledge changes.',
        'All security policies were reviewed in the September 2025 annual cycle. New policy added for AI and Generative AI Use. Student Data Security Policy updated for new LEA agreement templates. Cloud Services Policy expanded for M365 Copilot governance. No policies have lapsed. Primary driver was the updated DoIT cybersecurity standards released August 2025.'
      ],
      evidence: 'MSDE_Policy_Review_Schedule_Log_2026.xlsx'
    },
    'GV.SC-01': {
      answers: [
        'MSDE has a comprehensive vendor security assessment program for all vendors processing student data. Tier 1 vendors must execute the MSDE Student Data Privacy Agreement mandating FERPA, COPPA, Maryland student data privacy law compliance. SOC 2 Type II reports or equivalent third-party assessments required annually for Tier 1 vendors.',
        'Vendor onboarding includes the MSDE Vendor Security Assessment Questionnaire. Tier 1 vendors must provide evidence of: annual third-party security assessments, encryption at rest and in transit, data retention and deletion procedures, 72-hour breach notification capability, and employee background checks for staff accessing student data.',
        'Vendor access is provisioned through individually named MFA-required accounts. Vendor sessions monitored through Azure AD Conditional Access logs. LEA data sharing governed by LEA Data Security Agreements with annual attestation from LEA IT directors confirming their data security posture.'
      ],
      evidence: 'MSDE_Vendor_Security_Assessment_Program_v2.pdf'
    },
    'ID.AM-01': {
      answers: [
        'MSDE maintains its asset inventory through Microsoft Intune (all managed endpoints and mobile devices), the Azure portal (cloud resources), and ServiceNow CMDB for servers and network infrastructure. These three systems are integrated — Intune-discovered devices automatically sync to the CMDB. IT Asset Manager reviews and reconciles monthly. Discovery scans run weekly.',
        'Inventory covers all MSDE-managed endpoints (approximately 650 devices), all Azure cloud resources, all SaaS applications (Cloud Application Inventory reviewed quarterly), and key network infrastructure. Contractor-managed systems are inventoried in a separate contractor asset register. Comprehensive coverage of student-facing systems and the educator certification platform.',
        'MSDE maintains a current network diagram updated February 2026 showing the enterprise network, Azure Government connectivity, M365 tenant architecture, and boundary protections. Includes security zones, trust boundaries, and LEA integration points. IT architecture team updates within 30 days of any significant network change.'
      ],
      evidence: 'MSDE_Asset_Inventory_CMDB_M365_Intune_Mar2026.xlsx'
    },
    'ID.AM-02': {
      answers: [
        'MSDE\'s Data Classification Policy defines four tiers: Public, Internal, Sensitive/Controlled (student PII, educator PII, financial data), and Restricted (IEP records, disciplinary records, student mental health data). FERPA categories are incorporated into the Sensitive and Restricted tiers with specific handling requirements. Last updated October 2025.',
        'All individual student records are Sensitive at minimum; IEP, disciplinary, and mental health records are Restricted. Student data is inventoried in the MSDE Student Data Map maintained by the Privacy Officer, identifying all systems that store or process student data. Sensitive data encrypted at rest using AES-256 in all systems.',
        'Data handling requirements documented in the Data Handling Standard: storage encryption (AES-256 for Sensitive/Restricted), TLS 1.2+ for transmission, no unencrypted email for Sensitive/Restricted data, MFA required for systems with Restricted data access, DoD 5220.22-M for physical disposal, cryptographic erasure for cloud storage.'
      ],
      evidence: 'MSDE_Data_Classification_FERPA_Policy_v3.pdf'
    },
    'ID.RA-01': {
      answers: [
        'MSDE completed its annual risk assessment in September 2025 using the NIST SP 800-30 methodology covering all major systems with focus on student data systems and the educator certification platform. Conducted by IT Security team with independent review by contracted security consultant.',
        'Results presented to the Risk and Compliance Committee in October 2025 and to the Superintendent in November. Findings rated using a quantitative likelihood-impact matrix. All High and Critical findings have assigned remediation owners and target dates tracked in Archer.',
        'Highest-priority findings: (1) Third-party data processor oversight across 240+ vendors — addressed through annual vendor security review program. (2) Phishing risk for educator M365 accounts — addressed through monthly simulations. (3) LEA network connectivity lateral movement risk — addressed through network segmentation review completed Q4 2025.'
      ],
      evidence: 'MSDE_Annual_Risk_Assessment_Report_2025.pdf'
    },
    'ID.RA-02': {
      answers: [
        'MSDE conducts vulnerability scans using Tenable.io. Authenticated scans of all servers and cloud resources run weekly. Endpoint vulnerability assessment via Tenable agent deployed through Intune on all managed devices. CISA KEV and Microsoft MSRC advisories are triaged within 24 hours. Monthly web application scans on public-facing portals.',
        'Scan scope covers all MSDE-managed servers, Azure IaaS workloads, and approximately 650 managed endpoints. SaaS application security assessed through vendor SOC 2 reviews rather than direct scanning.',
        'Our SLA: critical vulnerabilities — 15 days for internet-facing systems, 30 days for internal. High — 30 days and 60 days respectively. In the past 90 days: 100% remediation of critical vulnerabilities on internet-facing systems, 94% for internal. The 6% gap relates to two servers awaiting vendor patches for application dependencies.'
      ],
      evidence: 'MSDE_Tenable_Vulnerability_Scan_Mar2026.pdf'
    },
    'PR.AA-01': {
      answers: [
        'MFA is enforced for all MSDE user accounts through Azure Active Directory Conditional Access — all staff, contractors, LEA partners with portal access, and all administrative accounts. MFA required for all cloud application access and on-premises applications using modern authentication. Hardware FIDO2 keys issued to 45 privileged users.',
        'MSDE uses Microsoft Authenticator as the primary MFA method, with FIDO2 security keys for privileged accounts and phishing-resistant MFA for systems processing Restricted student data. All MFA policy changes require CISO approval.',
        'There are no known gaps in MFA enforcement for staff accounts. All 500+ staff accounts have MFA enrolled and enforced via Conditional Access with zero exceptions. Service principals for system-to-system API integrations use certificate-based authentication and IP restriction instead of MFA and are inventoried in our service account register.'
      ],
      evidence: 'MSDE_MFA_Conditional_Access_Policy_AzureAD.pdf'
    },
    'PR.AT-01': {
      answers: [
        'MSDE uses KnowBe4 for security awareness training and phishing simulation. Training is conducted quarterly — a comprehensive annual module plus three quarterly updates. Content tailored to MSDE-specific risks: student data handling, FERPA awareness, phishing targeting education sector accounts, and safe M365 use. Content reviewed and updated quarterly.',
        'Training mandatory for all employees and contractors. New employees complete the full module within 2 weeks of hire. Non-completion after 30 days triggers access restriction on non-essential systems. Completion rates reported to division directors monthly and reviewed by CISO quarterly.',
        'Most recent annual training cycle (January 2026) achieved 98% completion. The 2% gap represents three staff on extended leave. Monthly phishing simulations — most recent (March 2026) had 8% click rate, down from 31% when the program launched in 2022. Staff who click receive immediate targeted micro-training.'
      ],
      evidence: 'MSDE_Security_Awareness_KnowBe4_Completions_2026.xlsx'
    },
    'PR.DS-01': {
      answers: [
        'User provisioning is fully automated through SailPoint IdentityNow integrated with HR. New employees are provisioned based on role and department automatically when created in HR. Separations are processed within 1 hour of HR recording the separation date — accounts disabled and access revoked automatically. This eliminates the manual provisioning delays that were a recurring audit finding prior to 2023.',
        'Access recertification conducted quarterly for all users with access to student data systems and annually for general access. SailPoint sends automated tasks to system owners and managers. Access not recertified within the deadline is automatically revoked. Most recent recertification (January 2026) had 97% on-time completion and removed 89 access entitlements.',
        'Privileged accounts managed through CyberArk PAM deployed in 2024. All domain administrator and Azure subscription owner accounts managed by CyberArk with session recording, just-in-time provisioning, and password vaulting. Service accounts have automated 60-day rotation. Shared privileged accounts prohibited — all privileged access attributed to named individuals.'
      ],
      evidence: 'MSDE_Access_Control_IAM_Policy_v2.5.pdf'
    },
    'PR.IR-01': {
      answers: [
        'MSDE uses Microsoft Intune for endpoint patch management and Azure Update Manager for cloud workloads. Intune enforces compliance policies requiring critical updates within 7 days on all managed endpoints. Azure Update Manager uses automated patching rings (test, pilot, broad). Third-party application patching via Intune Winget-based automated deployment.',
        'Patch SLA: 7 days for critical and 14 days for high-severity on internet-facing systems. Internal systems: 15 days critical, 30 days high. Emergency patches for CISA KEV entries deployed within 48 hours.',
        'Patch compliance for past 90 days: 99% for critical on managed endpoints, 97% for servers. The 3% server gap relates to two application servers requiring vendor coordination for patch testing. All missed patches have compensating controls documented. Monthly compliance reports provided to CISO.'
      ],
      evidence: 'MSDE_Intune_Patch_Compliance_Report_Q1_2026.xlsx'
    },
    'PR.PS-01': {
      answers: [
        'MSDE applies CIS Benchmark Level 2 hardening to all servers and Level 1 to workstations, using Microsoft Security Compliance Toolkit and custom Intune configuration profiles. Azure resources deployed using hardened Bicep templates validated against CIS Azure Benchmark. Hardening standard documented in MSDE System Configuration Standard v3, updated July 2025.',
        'New systems provisioned from hardened base images in Azure Compute Gallery. Workstations enrolled in Intune during provisioning and receive CIS Level 1 configuration profiles. Servers deployed from hardened VM images with post-deployment validation scripts confirming baseline compliance before production promotion.',
        'Configuration drift monitoring through Microsoft Defender for Cloud continuous compliance assessment and weekly Tenable CIS benchmark scans. Non-compliant configurations generate Sentinel alerts tracked in ServiceNow. Most recent scan (March 2026): 97% of endpoints and 95% of servers meeting baseline. Remaining gaps in legacy application dependencies awaiting Q2 2026 modernization.'
      ],
      evidence: 'MSDE_CIS_Hardening_Baselines_v3.pdf'
    },
    'DE.CM-01': {
      answers: [
        'MSDE uses Microsoft Sentinel deployed in Azure Government in 2024 with 24/7 monitoring coverage through a retained MSSP (Microsoft Security Expert service). All critical log sources are onboarded including Azure AD, M365, Defender for Endpoint, Azure NSGs, on-premises Active Directory via Azure Arc, and student data portal application logs.',
        'Log sources in Sentinel include: Azure AD (all sign-ins and admin activity), M365 (Exchange, SharePoint, Teams, OneDrive), Defender for Endpoint (all 650 managed endpoints), Palo Alto firewall logs, Azure NSG flow logs, on-premises AD via Azure Arc, and email security gateway logs. Coverage is effectively 100% of the MSDE managed environment.',
        'Monitoring is 24/7 through the MSSP with MSDE IT Security handling tier-2 investigation during business hours. Log retention: 90 days hot in Sentinel, 2-year archive in Azure Data Explorer. Custom detection rules developed for student data exfiltration, unusual LEA data access patterns, and FERPA-related access anomalies.'
      ],
      evidence: 'MSDE_Sentinel_SIEM_Configuration_Mar2026.pdf'
    },
    'DE.AE-01': {
      answers: [
        'Alert triage is a shared responsibility between MSDE\'s IT Security team (tier-2 investigation) and the Microsoft Security Expert MSSP (24/7 tier-1 monitoring). The MSSP triages all Sentinel alerts and escalates High and Critical alerts to the MSDE IT Security team. Low and Medium alerts are handled by the MSSP with daily summary reporting.',
        'SLA for Critical Sentinel alerts: 15-minute MSSP triage with immediate MSDE IT Security Manager escalation. High alerts: 1-hour triage with same-day MSDE notification. These SLAs are contractually defined and measured monthly. Past quarter: MTTD 4.2 minutes, MTTR 47 minutes — both within target.',
        'All security events tracked in ServiceNow Security Incident Response. Incidents created automatically from Sentinel via SOAR integration. Full lifecycle documented in each incident record. Post-incident reviews conducted within 5 business days of closure for all High and Critical incidents. Lessons learned incorporated into Sentinel detection rules and IRP quarterly.'
      ],
      evidence: 'MSDE_SOC_Alert_Triage_SLA_Procedures.pdf'
    },
    'RS.MA-01': {
      answers: [
        'MSDE\'s Incident Response Plan v5.0 was approved by the Superintendent in September 2025. Substantially updated from v4.0 to incorporate the Sentinel MSSP workflow, updated FERPA breach notification procedures, and specific playbooks for ransomware, student data breach, and LEA notification scenarios.',
        'Named IRP roles: Incident Commander (CISO), Technical Lead (IT Security Manager), Privacy Lead (Privacy Officer — mandatory for any student data incident), Communications Lead (Communications Director), Legal Advisor (Deputy AG), External Coordination Lead (Deputy Superintendent for DoIT/CISA/law enforcement). Authority chains documented with alternates.',
        'Three-tier severity: Critical (confirmed student data breach, ransomware, enterprise system outage), High (potential breach, significant compromise), Standard (isolated incidents). Critical triggers Superintendent notification within 30 minutes, DoIT within 1 hour, FERPA breach determination within 24 hours. Student data breaches require LEA notification within 72 hours per LEA Data Security Agreements.'
      ],
      evidence: 'MSDE_Incident_Response_Plan_v5.0_2025.pdf'
    },
    'RS.MA-02': {
      answers: [
        'MSDE conducted a full-day tabletop exercise in January 2026 simulating a student data breach from a compromised LEA administrator account. Participants included CISO, IT Security Manager, Privacy Officer, General Counsel, Communications Director, Deputy Superintendent, and a DoIT cybersecurity team observer facilitating.',
        'Exercise ran smoothly for detection and containment phases. Key findings: (1) FERPA breach notification determination process took 6+ hours vs. the 2-hour target — Privacy Officer and Legal needed more clarity on trigger criteria. (2) LEA notification templates did not account for MSDE-as-breached-party scenarios.',
        'Post-exercise corrective actions: (1) FERPA breach determination checklist that can be completed in 60 minutes — incorporated in IRP v5.1 (February 2026). (2) New LEA notification templates for MSDE-as-breached-party — done. (3) Practice session with Legal and Privacy on determination checklist — completed March 2026.'
      ],
      evidence: 'MSDE_IR_Exercise_Tabletop_AAR_Jan2026.pdf'
    },
    'RC.RP-01': {
      answers: [
        'MSDE\'s BCP v3.1 and DRP are combined in a single document approved August 2025. Substantially updated to reflect full migration to Azure Government and M365 — the previous version still referenced decommissioned on-premises Exchange and a physical data center. Both plans are current and reflect the actual MSDE environment.',
        'RTOs and RPOs defined in the BIA for all Tier 1 and 2 systems. Student Data Platform: RTO 4hr, RPO 1hr (Azure geo-redundancy). Educator Certification: RTO 8hr, RPO 4hr. M365/communication: RTO 1hr, RPO 15min. Financial: RTO 8hr, RPO 2hr. All RTOs validated through the December 2025 DRP test.',
        'All production data backed up using Azure Backup with geo-redundant storage. Student data systems protected by Azure SQL geo-replication with 1-hour RPO. All backups stored in Azure Government immutable blob storage with 30-day legal hold — prevents ransomware from deleting backup data. Restoration tests conducted semi-annually in June and December.'
      ],
      evidence: 'MSDE_Business_Continuity_DRP_v3.1_2025.pdf'
    },
    'RC.RP-02': {
      answers: [
        'MSDE conducted a full DRP test in December 2025 covering restoration of the Student Data Platform and Educator Certification System from Azure Backup. The test involved failing over the Student Data Platform to the Azure paired region, verifying data integrity, and executing the Educator Certification recovery runbook in a test environment.',
        'Student Data Platform was restored and validated within 2.5 hours — well within the 4-hour RTO. Data integrity validation confirmed 100% consistency. Educator Certification System restoration took 6.5 hours vs. the 8-hour RTO — within target but tighter than expected due to an SSL certificate renewal step not in the runbook.',
        'The missing SSL certificate step was added to the runbook immediately. All systems met RPO targets. Post-test report delivered to the Risk and Compliance Committee in January 2026. The next DRP test is scheduled June 2026 and will add the Financial System to scope.'
      ],
      evidence: 'MSDE_BCP_Test_Results_Restoration_Dec2025.pdf'
    }
  };

  // ── Review States ─────────────────────────────────────────────────────────
  var reviewMdot = {
    'GV.OC-01': 'accepted', 'GV.RM-01': 'accepted', 'GV.RR-01': 'accepted',
    'GV.PO-01': 'accepted', 'GV.SC-01': 'reviewing', 'ID.AM-01': 'accepted',
    'ID.AM-02': 'reviewing', 'ID.RA-01': 'accepted', 'ID.RA-02': 'reviewing',
    'PR.AA-01': 'reviewing', 'PR.AT-01': 'accepted', 'PR.DS-01': 'accepted',
    'PR.IR-01': 'reviewing', 'PR.PS-01': 'accepted'
  };

  var reviewDpscs = {
    'GV.OC-01': 'reviewing', 'GV.RM-01': 'reviewing'
  };

  var reviewMsde = {
    'GV.OC-01': 'accepted', 'GV.RM-01': 'accepted', 'GV.RR-01': 'accepted',
    'GV.PO-01': 'accepted', 'GV.SC-01': 'accepted', 'ID.AM-01': 'accepted',
    'ID.AM-02': 'accepted', 'ID.RA-01': 'accepted', 'ID.RA-02': 'accepted',
    'PR.AA-01': 'accepted', 'PR.AT-01': 'accepted', 'PR.DS-01': 'accepted',
    'PR.IR-01': 'accepted', 'PR.PS-01': 'accepted', 'DE.CM-01': 'accepted',
    'DE.AE-01': 'accepted', 'RS.MA-01': 'accepted', 'RS.MA-02': 'accepted',
    'RC.RP-01': 'accepted', 'RC.RP-02': 'accepted'
  };

  // ── Write to localStorage ─────────────────────────────────────────────────
  localStorage.setItem('anchor_selfassessment_mdot',  JSON.stringify(mdot));
  localStorage.setItem('anchor_selfassessment_dpscs', JSON.stringify(dpscs));
  localStorage.setItem('anchor_selfassessment_msde',  JSON.stringify(msde));
  localStorage.setItem('anchor_review_mdot',          JSON.stringify(reviewMdot));
  localStorage.setItem('anchor_review_dpscs',         JSON.stringify(reviewDpscs));
  localStorage.setItem('anchor_review_msde',          JSON.stringify(reviewMsde));

  console.log('%c✅ Anchor Platform — evidence seed loaded', 'color:#059669;font-weight:bold;font-size:14px;');
  console.log('  MDOT:  ' + Object.keys(mdot).length + ' controls seeded, ' + Object.keys(reviewMdot).length + ' reviewed');
  console.log('  DPSCS: ' + Object.keys(dpscs).length + ' controls seeded, ' + Object.keys(reviewDpscs).length + ' reviewed');
  console.log('  MSDE:  ' + Object.keys(msde).length + ' controls seeded, all accepted (complete agency)');

})();
