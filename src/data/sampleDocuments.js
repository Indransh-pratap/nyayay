/**
 * Realistic Indian Legal Documents with Full AI Analysis Profiles,
 * Clause Risks, Extracted Entities, Key Statutory Sections, and Document Full-Text.
 */

export const SAMPLE_DOCUMENTS = [
  {
    id: "doc-msa-2024",
    title: "Master Services & Cloud Infrastructure Agreement (MSA)",
    documentType: "Commercial Agreement",
    fileSize: "1.4 MB",
    pages: 14,
    uploadDate: "2024-11-18",
    status: "Analyzed",
    groundingConfidence: 98.6,
    riskScore: "High Risk (3 Critical Clauses)",
    jurisdiction: "Republic of India",
    governingLaw: "Laws of India (Indian Contract Act, 1872 & Arbitration Act, 1996)",
    parties: {
      partyA: "AeroVance Cloud Solutions Pvt. Ltd. (Service Provider / Vendor)",
      partyB: "Apex Logistics India Ltd. (Customer / Client)"
    },
    summary: {
      executiveSummary: "This Master Services Agreement governs enterprise cloud hosting, data pipeline integration, and software support provided by AeroVance to Apex Logistics. While core operational terms are standard, the contract contains severe legal risks including a unilateral sole-arbitrator appointment clause void under Supreme Court precedent (*Perkins Eastman*), an uncapped client indemnity with no reverse indemnity, and a 3-year nationwide post-termination non-compete covenant void under Section 27 of the Indian Contract Act, 1872.",
      proceduralPosture: "Pre-execution Contractual Review / Redlining Stage",
      keyRiskFindings: [
        "Clause 14.2 empowers Vendor's Managing Director to unilaterally appoint the Sole Arbitrator, violating Section 12(5) of the Arbitration & Conciliation Act, 1996.",
        "Clause 11.4 imposes an unlimited, uncapped data breach indemnity exclusively on the Customer with no mutual liability cap.",
        "Clause 9.1 enforces a 36-month post-termination restriction prohibiting Customer from procuring similar services from competitors across India, rendering it void ab initio under Section 27, Indian Contract Act.",
        "Liquidated damages clause (Clause 13.1) prescribes a flat ₹2.5 Crore penalty irrespective of actual damages, conflicting with Section 74 of the Contract Act and *Maula Bux* doctrine."
      ],
      legalRecommendations: [
        "Redline Clause 14.2 to adopt institutional arbitration (e.g., MCIA or DIAC Rules) or mutual appointment with DIAC default.",
        "Insert mutual limitation of liability cap tied to 12 months' trailing fees paid under the applicable SOW.",
        "Strike out Clause 9.1 non-compete restraint in its entirety.",
        "Amend Section 13.1 liquidated damages to reflect 'genuine pre-estimate of loss' with requirement of substantiated proof."
      ]
    },
    keySections: [
      {
        sectionNumber: "Clause 14",
        title: "Dispute Resolution & Governing Law",
        statute: "Arbitration and Conciliation Act, 1996 - Section 11 & Section 12(5)",
        status: "Critical Violation",
        analysis: "Clause 14.2 stipulates that all disputes shall be referred to a sole arbitrator appointed solely by the Managing Director of Vendor. This is barred under *Perkins Eastman (2020)* and *TRF Ltd (2017)*, which mandate that an interested party cannot unilaterally dictate the arbitral tribunal.",
        statutoryReference: "ACA 1996 § 12(5) r/w Seventh Schedule; Perkins Eastman (2020) 20 SCC 760"
      },
      {
        sectionNumber: "Clause 9",
        title: "Non-Solicitation & Restrictive Covenants",
        statute: "Indian Contract Act, 1872 - Section 27",
        status: "Void Under Indian Law",
        analysis: "Under Indian law, negative covenants extending beyond the term of the agreement (post-termination non-compete) are void ab initio. Unlike UK/US law, Indian courts do not apply the 'rule of reasonableness' to post-term covenants.",
        statutoryReference: "ICA 1872 § 27; Percept D'Mark v. Zaheer Khan (2006) 4 SCC 227"
      },
      {
        sectionNumber: "Clause 11",
        title: "Indemnification & Third-Party Claims",
        statute: "Indian Contract Act, 1872 - Section 124 & Section 125",
        status: "Severe Asymmetry",
        analysis: "Requires Client to indemnify Vendor for all regulatory penalties, cybersecurity incidents, and indirect damages without any carve-outs for Vendor's gross negligence or willful misconduct.",
        statutoryReference: "ICA 1872 § 124-125"
      },
      {
        sectionNumber: "Clause 13",
        title: "Default Penalties & Liquidated Damages",
        statute: "Indian Contract Act, 1872 - Section 74",
        status: "Legally Vulnerable",
        analysis: "Fixes an arbitrary punitive fine of ₹25,000,000 without requiring proof of actual damage. Under *Kailash Nath Associates (2015)*, reasonable compensation must be proven where damage is assessable.",
        statutoryReference: "ICA 1872 § 74; Kailash Nath Associates v. DDA (2015) 4 SCC 136"
      }
    ],
    clauseRisks: [
      {
        id: "risk-1",
        clauseName: "Unilateral Arbitrator Appointment (Clause 14.2)",
        riskLevel: "HIGH",
        riskScore: 94,
        category: "Dispute Resolution & Enforceability",
        offendingText: "All disputes arising out of this Agreement shall be referred to arbitration by a Sole Arbitrator appointed unilaterally and exclusively by the Managing Director of the Service Provider.",
        suggestedRedline: "Any dispute arising out of or in connection with this Agreement shall be referred to arbitration administered by the Mumbai Centre for International Arbitration (MCIA) in accordance with MCIA Rules. The seat and venue shall be Mumbai, India.",
        legalGrounding: "Direct violation of Section 12(5) ACA 1996 and Perkins Eastman Architects (2020) 20 SCC 760."
      },
      {
        id: "risk-2",
        clauseName: "Post-Termination Non-Compete (Clause 9.1)",
        riskLevel: "HIGH",
        riskScore: 91,
        category: "Restraint of Trade",
        offendingText: "Customer agrees that for a period of thirty-six (36) months following termination, Customer shall not directly or indirectly procure, license, or develop similar cloud infrastructure services anywhere within the territory of India.",
        suggestedRedline: "[DELETE IN ENTIRETY] Replace with reasonable employee non-solicitation during the active term and 12 months thereafter.",
        legalGrounding: "Declared void ab initio under Section 27 Indian Contract Act; confirmed in Percept D'Mark (2006) 4 SCC 227."
      },
      {
        id: "risk-3",
        clauseName: "Uncapped Asymmetric Indemnity (Clause 11.4)",
        riskLevel: "MEDIUM",
        riskScore: 78,
        category: "Liability & Indemnification",
        offendingText: "Customer shall defend, indemnify and hold harmless Service Provider against any and all losses, regulatory fines, and damages arising from data processed on the platform without limitation.",
        suggestedRedline: "Each party shall indemnify the other against direct damages arising from third-party IP infringement or gross negligence, subject to the aggregate liability cap specified in Clause 12.",
        legalGrounding: "Indian Contract Act 1872 Section 73 & Section 124."
      },
      {
        id: "risk-4",
        clauseName: "Punitive Forfeiture & Liquidated Damages (Clause 13.1)",
        riskLevel: "MEDIUM",
        riskScore: 65,
        category: "Damages & Penalties",
        offendingText: "In the event of early convenience termination by Customer, Customer shall immediately pay liquidated damages in the amount of ₹2,50,00,000 as agreed pre-estimated penalty.",
        suggestedRedline: "Customer shall pay actual documented direct wind-down costs and unpaid pro-rata fees up to the effective termination date.",
        legalGrounding: "Section 74 Indian Contract Act 1872; Maula Bux v. Union of India (1969) 2 SCC 554."
      }
    ],
    entities: [
      { name: "AeroVance Cloud Solutions Pvt. Ltd.", type: "Service Provider / Party A", location: "Bengaluru, Karnataka, India", cin: "U72900KA2019PTC128450" },
      { name: "Apex Logistics India Ltd.", type: "Customer / Party B", location: "Bandra Kurla Complex, Mumbai, India", cin: "L63090MH2012PLC231109" },
      { name: "Managing Director of AeroVance", type: "Unilaterally Named Arbitral Appointing Authority", status: "Ineligible under Section 12(5)" },
      { name: "High Court of Judicature at Bombay", type: "Designated Judicial Forum", status: "Supervisory Jurisdiction" },
      { name: "₹ 2,50,00,000 (INR 2.5 Crore)", type: "Contested Liquidated Damages Amount", status: "High Risk Penalty" },
      { name: "36 Months", type: "Post-Termination Restraint Duration", status: "Void under Section 27 ICA" }
    ],
    rawText: `MASTER SERVICES & CLOUD INFRASTRUCTURE AGREEMENT

THIS AGREEMENT is entered into this 18th day of November, 2024 at Bengaluru, India.

BETWEEN:
AeroVance Cloud Solutions Private Limited, a company incorporated under the Companies Act, 2013 having its registered office at Tech Park, Outer Ring Road, Bengaluru 560103 (hereinafter referred to as the "Service Provider");

AND:
Apex Logistics India Limited, a company incorporated under the Companies Act, 2013 having its registered office at One BKC, Bandra Kurla Complex, Mumbai 400051 (hereinafter referred to as the "Customer").

1. SCOPE OF SERVICES
Service Provider shall provide enterprise cloud data hosting, AI API pipelines, and high-availability server infrastructure as set forth in Schedule A.

9. RESTRICTIVE COVENANTS & NON-COMPETE
9.1 Customer agrees that during the term and for a period of thirty-six (36) months following termination of this Agreement, Customer shall not directly or indirectly procure, license, build, or deploy competing cloud infrastructure systems within the territory of India.

11. INDEMNIFICATION
11.4 Customer shall defend, indemnify and hold harmless Service Provider, its affiliates, directors and officers from and against any and all claims, liabilities, losses, regulatory fines (including DPDP Act penalties), and expenses without limitation, arising from Customer data uploaded onto the platform.

13. TERMINATION & LIQUIDATED DAMAGES
13.1 In the event of early termination by Customer for convenience, Customer shall pay liquidated damages of INR 2,50,00,000 (Two Crore Fifty Lakh Rupees) within fourteen (14) days of notice.

14. GOVERNING LAW & DISPUTE RESOLUTION
14.1 This Agreement shall be governed by and construed in accordance with the laws of India.
14.2 All disputes, claims, or controversies shall be referred to and finally resolved by arbitration of a Sole Arbitrator appointed unilaterally and exclusively by the Managing Director of the Service Provider. The venue and seat shall be Bengaluru, India.`
  },
  {
    id: "doc-slp-2024",
    title: "Special Leave Petition (Criminal) - SLP (Crl.) No. 4412/2024",
    documentType: "Supreme Court Petition",
    fileSize: "2.1 MB",
    pages: 28,
    uploadDate: "2024-11-12",
    status: "Analyzed",
    groundingConfidence: 99.2,
    riskScore: "High Urgency / Bail Matter",
    jurisdiction: "Supreme Court of India, New Delhi",
    governingLaw: "Constitution of India (Art. 136), Bharatiya Nagarik Suraksha Sanhita 2023 / CrPC 1973",
    parties: {
      partyA: "Arjun Sharma (Petitioner / Accused)",
      partyB: "State of NCT of Delhi & Anr. (Respondents)"
    },
    summary: {
      executiveSummary: "Special Leave Petition under Article 136 of the Constitution of India challenging the High Court of Delhi's order denying regular bail under Section 439 CrPC / Section 483 BNSS in FIR No. 204/2023 registered under Section 420 (Cheating), 406 (Breach of Trust), and 120B IPC / Sections 318, 316, 61 BNS. The Petitioner has been in continuous judicial custody for 14 months where charge sheet has been filed, 45 witnesses cited, and trial is unlikely to conclude soon.",
      proceduralPosture: "Special Leave to Appeal before the Supreme Court of India",
      keyRiskFindings: [
        "Prolonged incarceration violating fundamental right to speedy trial under Article 21 (*Satender Kumar Antil* & *Manish Sisodia*).",
        "Dispute arises purely from a commercial software supply contract; attempt by Respondent No. 2 to criminalize a civil recovery dispute.",
        "Investigation complete and charge sheet filed; custodial interrogation no longer required (*Sanjay Chandra v. CBI*)."
      ],
      legalRecommendations: [
        "Emphasize the 4-fold test in *Satender Kumar Antil (2022)* Category D economic offenses.",
        "Cite *Mohd. Ibrahim v. State of Bihar (2009)* to demonstrate absence of mens rea or fraudulent inducement at contract inception.",
        "Offer stringent bail conditions: passport deposit, weekly reporting, substantial surety."
      ]
    },
    keySections: [
      {
        sectionNumber: "Article 136",
        title: "Special Leave Jurisdiction",
        statute: "Constitution of India, 1950",
        status: "Constitutional Remedy",
        analysis: "Invokes the plenary discretionary jurisdiction of the Supreme Court against perverse High Court bail refusal.",
        statutoryReference: "Constitution of India Art. 136; Mathai @ Joby v. George (2010)"
      },
      {
        sectionNumber: "Article 21",
        title: "Right to Life & Personal Liberty (Speedy Trial)",
        statute: "Constitution of India, 1950",
        status: "Fundamental Right Grounding",
        analysis: "Pre-trial detention cannot operate as punitive imprisonment when the trial will take years due to 45 prosecution witnesses.",
        statutoryReference: "Art. 21; Satender Kumar Antil v. CBI (2022) 10 SCC 51"
      },
      {
        sectionNumber: "Section 318 BNS / 420 IPC",
        title: "Cheating vs Civil Breach of Contract",
        statute: "Bharatiya Nyaya Sanhita 2023 / Indian Penal Code 1860",
        status: "Statutory Defense",
        analysis: "Failure to fulfill commercial contractual promise does not constitute cheating unless fraudulent intent existed ab initio.",
        statutoryReference: "Hridaya Ranjan Prasad Verma v. State of Bihar (2000) 4 SCC 168"
      }
    ],
    clauseRisks: [
      {
        id: "risk-slp-1",
        clauseName: "Constitutional Violation - Article 21 Incarceration",
        riskLevel: "HIGH",
        riskScore: 96,
        category: "Constitutional & Fundamental Rights",
        offendingText: "The Hon'ble High Court erred in overlooking that the Petitioner has suffered 14 months pre-trial detention while co-accused have been enlarged on bail.",
        suggestedRedline: "Grounds for immediate enlargement on regular bail with parity doctrine.",
        legalGrounding: "Satender Kumar Antil (2022) 10 SCC 51; Manish Sisodia v. Directorate of Enforcement (2024)."
      }
    ],
    entities: [
      { name: "Arjun Sharma", type: "Petitioner / Accused", location: "New Delhi, India" },
      { name: "State of NCT of Delhi", type: "Respondent No. 1 / Prosecuting Authority", location: "New Delhi" },
      { name: "Apex Retailers Ltd.", type: "Respondent No. 2 / Complainant", location: "Delhi" },
      { name: "FIR No. 204/2023 (PS Barakhamba Road)", type: "Criminal Impugned Proceeding", status: "Charge Sheet Filed" },
      { name: "14 Months", type: "Pre-trial Custody Duration", status: "Violation of Art 21" }
    ],
    rawText: `IN THE SUPREME COURT OF INDIA
CRIMINAL APPELLATE JURISDICTION
SPECIAL LEAVE PETITION (CRIMINAL) NO. 4412 OF 2024

IN THE MATTER OF:
Arjun Sharma, S/o Late Shri R.K. Sharma ... PETITIONER
VERSUS
State of NCT of Delhi & Anr. ... RESPONDENTS

PETITION UNDER ARTICLE 136 OF THE CONSTITUTION OF INDIA SEEKING SPECIAL LEAVE TO APPEAL AGAINST THE IMPUGNED ORDER DATED 14.10.2024 PASSED BY THE HIGH COURT OF DELHI IN BAIL APPLN. NO. 3201/2024.

1. That the Petitioner is a law-abiding citizen and former Director of TransLogix Solutions Ltd., who has been languishing in Tihar Central Jail for over 14 months in connection with FIR No. 204/2023.

2. That the entire dispute stems from an alleged delay in delivery of supply chain software, which is purely a civil contractual dispute governed by the Indian Contract Act, 1872.

3. That the Hon'ble High Court failed to appreciate that the investigation is complete, the charge-sheet has been submitted citing 45 witnesses, and there is zero risk of evidence tampering or flight risk, squarely attracting the dictum of this Hon'ble Court in Satender Kumar Antil v. CBI (2022) 10 SCC 51.`
  },
  {
    id: "doc-lease-2024",
    title: "Commercial Lease Deed & Indenture (Cyber City, Gurugram)",
    documentType: "Real Estate & Commercial Lease",
    fileSize: "1.8 MB",
    pages: 18,
    uploadDate: "2024-11-05",
    status: "Analyzed",
    groundingConfidence: 97.4,
    riskScore: "Medium Risk (2 Vulnerabilities)",
    jurisdiction: "State of Haryana, India",
    governingLaw: "Transfer of Property Act, 1882 & Haryana Stamp Act",
    parties: {
      partyA: "Bharat Commercial Towers REIT (Lessor)",
      partyB: "Nova Health Innovations LLP (Lessee)"
    },
    summary: {
      executiveSummary: "Commercial lease deed for 25,000 sq. ft. Grade-A office space in Gurugram, Haryana with a 5-year tenure and 3-year mandatory lock-in period. Key areas of legal scrutiny include an onerous rent acceleration clause during lock-in default, vague Force Majeure rent-abatement provisions, and unilateral power of Lessor to re-enter premises without court decree.",
      proceduralPosture: "Pre-execution Review / Lease Negotiation",
      keyRiskFindings: [
        "Clause 7.2 demands entire unexpired lock-in rent (₹4.5 Crore) upon early lessee exit, which violates the doctrine against punitive penalties under Section 74 Contract Act (*Kailash Nath*).",
        "Clause 16 denies rent abatement during government-mandated pandemic or lockdown closures unless premises suffer structural damage."
      ],
      legalRecommendations: [
        "Limit lock-in exit liability to security deposit forfeiture (3 months' rent) rather than full accelerated tenure rent.",
        "Harmonize Force Majeure with standard pandemic/epidemic business disruption carve-outs per *Ramanand v. Dr. Girry Arora (Delhi HC 2020)*."
      ]
    },
    keySections: [
      {
        sectionNumber: "Section 105 & 108",
        title: "Lease Rights and Liabilities of Lessor & Lessee",
        statute: "Transfer of Property Act, 1882",
        status: "Statutory Standard",
        analysis: "Governs quiet enjoyment, repair obligations, and determination of lease under Indian property law.",
        statutoryReference: "Transfer of Property Act, 1882 § 105, 108"
      },
      {
        sectionNumber: "Section 74",
        title: "Lock-in Period Rent Forfeiture",
        statute: "Indian Contract Act, 1872",
        status: "Penalty Vulnerability",
        analysis: "Demanding 36 months' rent without duty to mitigate damages (re-leasing) is legally unenforceable.",
        statutoryReference: "ICA 1872 § 74; Maula Bux (1969)"
      }
    ],
    clauseRisks: [
      {
        id: "risk-lease-1",
        clauseName: "Accelerated Rent on Lock-in Breach (Clause 7.2)",
        riskLevel: "HIGH",
        riskScore: 88,
        category: "Damages & Forfeiture",
        offendingText: "If Lessee vacates during the 36-month Lock-in Period, Lessee shall immediately deposit the full gross rent for the entire remainder of the Lock-in Period.",
        suggestedRedline: "Lessee's liability upon early termination during lock-in shall be strictly limited to forfeiture of the 3-month Security Deposit.",
        legalGrounding: "Section 74 Indian Contract Act; Kailash Nath Associates (2015)."
      }
    ],
    entities: [
      { name: "Bharat Commercial Towers REIT", type: "Lessor / Landlord", location: "Gurugram, Haryana" },
      { name: "Nova Health Innovations LLP", type: "Lessee / Tenant", location: "New Delhi" },
      { name: "₹ 15,00,000 / month (INR 15 Lakhs)", type: "Monthly Base Rent", status: "Subject to 5% annual escalation" },
      { name: "36 Months", type: "Mandatory Lock-in Period", status: "Subject to Section 74 Review" }
    ],
    rawText: `COMMERCIAL LEASE DEED & INDENTURE
This INDENTURE made this 5th day of November, 2024 at Gurugram, Haryana.
BETWEEN: Bharat Commercial Towers REIT (Lessor) AND Nova Health Innovations LLP (Lessee).
1. PREMISES & TERM: Demised Premises comprising 25,000 sq.ft. on 7th Floor, Tower B, Cyber City, Gurugram for a term of 5 years.
7. LOCK-IN PERIOD: Both parties agree to an irrevocable lock-in period of 36 months. If Lessee vacates during this period, Lessee shall immediately pay the total unexpired rent for the remainder of the lock-in period.
16. FORCE MAJEURE: Rent shall continue to be payable notwithstanding any epidemic, lockdown, or government directive unless structural destruction occurs.`
  },
  {
    id: "doc-dpdp-2024",
    title: "Digital Personal Data Protection (DPDP) Act Compliance Memo",
    documentType: "Regulatory Compliance Audit",
    fileSize: "980 KB",
    pages: 12,
    uploadDate: "2024-10-29",
    status: "Analyzed",
    groundingConfidence: 99.4,
    riskScore: "Low Risk (Compliant with 1 Action Item)",
    jurisdiction: "Union of India (Central Jurisdiction)",
    governingLaw: "Digital Personal Data Protection Act, 2023 & IT Act, 2000",
    parties: {
      partyA: "PaySetu FinTech Solutions Pvt. Ltd. (Data Fiduciary)",
      partyB: "Data Principals & Customers (Indian Citizens)"
    },
    summary: {
      executiveSummary: "Compliance audit evaluating PaySetu's consumer lending and payment mobile application against the Digital Personal Data Protection Act, 2023 (DPDP Act) and CERT-In Cyber Security Directions. Identifies mandatory requirements for multilingual consent notices (in 22 scheduled languages), parental consent mechanisms for users under 18 (minors), and strict data minimization.",
      proceduralPosture: "Statutory Compliance & Regulatory Readiness",
      keyRiskFindings: [
        "Current onboarding flow lacks verifiable parental consent for users under 18, risking violation of Section 9 DPDP Act (penalties up to ₹200 Crore).",
        "Consent notice currently presented only in English; must support all 22 official Eighth Schedule Indian languages per Section 6(1)."
      ],
      legalRecommendations: [
        "Implement Aadhaar-based or digilocker-linked parental age verification gate for minor users.",
        "Deploy multilingual consent architecture across Hindi, Tamil, Telugu, Marathi, Bengali, and English."
      ]
    },
    keySections: [
      {
        sectionNumber: "Section 6 & 8",
        title: "Consent Architecture & Security Safeguards",
        statute: "Digital Personal Data Protection Act, 2023",
        status: "Statutory Obligation",
        analysis: "Mandates unconditional, affirmative consent and robust technical security measures to prevent breaches.",
        statutoryReference: "DPDP Act 2023 § 6, 8"
      },
      {
        sectionNumber: "Section 9",
        title: "Processing Data of Children (Minors)",
        statute: "Digital Personal Data Protection Act, 2023",
        status: "Critical Statutory Bar",
        analysis: "Prohibits tracking, targeted ads, or processing children's data without verifiable parental consent.",
        statutoryReference: "DPDP Act 2023 § 9; Mohori Bibee doctrine on minors"
      }
    ],
    clauseRisks: [
      {
        id: "risk-dpdp-1",
        clauseName: "Lack of Verifiable Parental Consent for Minors (Section 9)",
        riskLevel: "HIGH",
        riskScore: 89,
        category: "Regulatory Privacy Compliance",
        offendingText: "Application permits registration of all users aged 16 and above via mobile OTP without verifying age of majority (18 years) or guardian authorization.",
        suggestedRedline: "Incorporate age-gate requiring guardian consent verification for users below 18 years in compliance with Section 9 DPDP Act 2023.",
        legalGrounding: "Section 9 DPDP Act 2023 r/w Section 11 Indian Contract Act (Competency of Minors)."
      }
    ],
    entities: [
      { name: "PaySetu FinTech Solutions Pvt. Ltd.", type: "Data Fiduciary", location: "Bengaluru, India" },
      { name: "Data Protection Board of India (DPBI)", type: "Regulatory Authority", location: "New Delhi" },
      { name: "CERT-In (Indian Computer Emergency Response Team)", type: "Cyber Incident Reporting Body", location: "New Delhi" },
      { name: "₹ 200 Crore (INR 200,00,00,000)", type: "Maximum Statutory Penalty for Child Data Violation", status: "Schedule to DPDP Act" }
    ],
    rawText: `DIGITAL PERSONAL DATA PROTECTION ACT, 2023 - AUDIT MEMORANDUM
CLIENT: PaySetu FinTech Solutions Pvt. Ltd.
DATE: 29th October, 2024
1. EXECUTIVE SUMMARY: Assessment of PaySetu Mobile App v4.2 under DPDP Act 2023.
2. CONSENT NOTICE: Section 6 requires multilingual notice in 22 languages. Current app supports only English.
3. MINOR USER DATA: Section 9 prohibits processing personal data of children under 18 years without verifiable parental consent. App currently has no age verification barrier.`
  }
];
