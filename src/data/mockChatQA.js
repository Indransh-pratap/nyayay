/**
 * Rich AI Legal Assistant Responses mapped to Indian Law, Bare Acts, and Document Context.
 * Each response includes evidence grounding score, statutory citations, landmark case laws, and structured takeaways.
 */

export const PRESET_PROMPTS = [
  {
    id: "p1",
    label: "Summarize in simple terms",
    query: "Summarize this document in simple terms",
    icon: "FileText",
    desc: "Plain language executive breakdown of rights, duties & risks"
  },
  {
    id: "p2",
    label: "Most important sections",
    query: "What are the most important sections?",
    icon: "Layers",
    desc: "Key statutory and contractual provisions flagged"
  },
  {
    id: "p3",
    label: "Rights provided by law",
    query: "What rights does this law provide?",
    icon: "ShieldAlert",
    desc: "Legal protections, statutory remedies, and entitlements"
  },
  {
    id: "p4",
    label: "Application to minors",
    query: "Does this provision apply to minors?",
    icon: "HelpCircle",
    desc: "Enforceability under Section 11 ICA and DPDP Act § 9"
  },
  {
    id: "p5",
    label: "Supporting legal sources",
    query: "Show me the legal sources supporting this answer",
    icon: "BookOpen",
    desc: "Bare Acts, Supreme Court citations & statutory grounding"
  }
];

export const MOCK_CHAT_RESPONSES = {
  // 1. Plain language summary
  "Summarize this document in simple terms": {
    confidence: 98.4,
    grounding: "Grounding verified against Indian Contract Act, 1872 & ACA 1996",
    answer: `### 📄 Plain Language Executive Summary

This document is a **commercial IT & Cloud Infrastructure Agreement** between **AeroVance Cloud Solutions Pvt. Ltd.** (the Service Provider) and **Apex Logistics India Ltd.** (the Customer).

Here is what you need to know in straightforward terms:

1. **Core Business Deal**: AeroVance will host and maintain cloud data infrastructure for Apex Logistics.
2. **⚠️ Major Red Flag 1 - Unfair Dispute Clause**: If a disagreement arises, only AeroVance's Managing Director gets to choose the judge/arbitrator. Under Indian law (*Perkins Eastman Supreme Court judgment*), this is **illegal and unenforceable**.
3. **⚠️ Major Red Flag 2 - Extreme Non-Compete**: The contract tries to stop you from buying similar software from anyone in India for **3 years after the contract ends**. Under **Section 27 of the Indian Contract Act**, this clause is **100% void**.
4. **⚠️ Major Red Flag 3 - One-Sided Liability**: Apex Logistics is required to pay infinite compensation if data is breached, while AeroVance takes on minimal mutual responsibility.
5. **⚠️ Major Red Flag 4 - Penalty Fees**: The agreement demands a flat ₹2.5 Crore penalty if you exit early, which Indian courts will not enforce unless actual provable loss is shown.

---

> **💡 Practical Counsel Action**: Do not sign in its current form. Request institutional arbitration (MCIA/DIAC), delete the post-termination non-compete, and cap indemnity at 12 months' trailing contract value.`,
    citations: [
      {
        type: "Statute",
        title: "Indian Contract Act, 1872 - Section 27",
        court: "Parliament of India",
        text: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void."
      },
      {
        type: "Case Precedent",
        title: "Perkins Eastman Architects DPC v. HSCC (India) Ltd",
        citation: "(2020) 20 SCC 760",
        court: "Supreme Court of India",
        text: "A party having an interest in the dispute or its outcome cannot unilaterally appoint a sole arbitrator."
      },
      {
        type: "Statute",
        title: "Arbitration & Conciliation Act, 1996 - Section 12(5)",
        court: "Bare Act",
        text: "Any person whose relationship with the parties falls under Seventh Schedule is ineligible to be arbitrator."
      }
    ],
    relatedSections: ["ICA 1872 § 27", "ACA 1996 § 12(5)", "ICA 1872 § 74"]
  },

  // 2. Most important sections
  "What are the most important sections?": {
    confidence: 99.1,
    grounding: "Grounding verified against Indian Contract Act & Arbitration Act",
    answer: `### ⚖️ Critical Sections & Clauses Identified

The document analysis engine has indexed **4 high-stakes sections** requiring immediate legal review:

| Section / Clause | Subject | Legal Risk / Validity Under Indian Law | Statutory Grounding |
| :--- | :--- | :--- | :--- |
| **Clause 14.2** | Sole Arbitrator Appointment | 🔴 **Critical Illegality** — Unilateral appointment by MD | *Perkins Eastman (2020)*; Sec 12(5) ACA 1996 |
| **Clause 9.1** | Post-Termination Non-Compete | 🔴 **Void Ab Initio** — Restraint of trade for 36 months | Section 27, Indian Contract Act, 1872 |
| **Clause 11.4** | Uncapped Asymmetrical Indemnity | 🟡 **High Commercial Exposure** — Client solely indemnifies | Section 73 & 124, Indian Contract Act |
| **Clause 13.1** | Flat Liquidated Damages (₹2.5 Cr) | 🟡 **Legally Vulnerable** — Punitive penalty doctrine | Section 74 ICA; *Maula Bux (1969)* |

#### Detailed Statutory Highlights:
* **Arbitration (Clause 14)**: Fails to comply with the 2015/2019 Amendments to the Arbitration and Conciliation Act. If invoked, the High Court under **Section 11(6)** will set aside the Vendor's nominee.
* **Restraint of Trade (Clause 9)**: Indian jurisprudence (*Percept D'Mark v. Zaheer Khan*) makes no exception for "reasonable" post-employment or post-contract vendor non-competes.`,
    citations: [
      {
        type: "Statute",
        title: "Arbitration and Conciliation Act, 1996 - Section 11(6)",
        court: "Statutory Provision",
        text: "Empowers High Court / Supreme Court to appoint an independent arbitrator when the agreed procedure fails."
      },
      {
        type: "Case Precedent",
        title: "Percept D'Mark (India) Pvt Ltd v. Zaheer Khan",
        citation: "(2006) 4 SCC 227",
        court: "Supreme Court of India",
        text: "Under Section 27, a restrictive covenant extending beyond the term of the agreement is void and unenforceable."
      },
      {
        type: "Case Precedent",
        title: "Kailash Nath Associates v. DDA",
        citation: "(2015) 4 SCC 136",
        court: "Supreme Court of India",
        text: "Section 74 damages are compensatory, not penal; proof of actual loss is mandatory where possible."
      }
    ],
    relatedSections: ["ACA § 11(6)", "ICA § 27", "ICA § 74", "ACA § 12(5)"]
  },

  // 3. Rights provided by law
  "What rights does this law provide?": {
    confidence: 97.9,
    grounding: "Grounding verified against Indian Contract Act & Constitution of India",
    answer: `### 🛡️ Statutory Rights & Legal Protections Available

Under the governing laws of India (the Indian Contract Act 1872, the Arbitration & Conciliation Act 1996, and the Constitution of India), you are granted several non-waivable statutory rights:

1. **Right to an Independent & Impartial Arbitral Tribunal**:
   * Under **Section 12(5) and the Seventh Schedule of the Arbitration Act**, you cannot be forced to submit to an arbitrator hand-picked by the counterparty's executive.
   * You have the statutory right to petition the High Court under **Section 11(6)** to appoint a neutral former Judge or senior advocate.

2. **Right to Free Trade & Commercial Freedom**:
   * Under **Section 27 of the Indian Contract Act** and **Article 19(1)(g) of the Constitution of India**, your right to practice any lawful trade or business is protected. Any clause attempting to freeze your business post-termination is dead letter law.

3. **Protection Against Punitive Penalties**:
   * Under **Section 74 of the Contract Act**, the counterparty cannot simply confiscate ₹2.5 Crore on whim. They are strictly limited to *reasonable compensation* for actual proven damages (*Maula Bux doctrine*).

4. **Right to Judicial Redress & Writs**:
   * Under **Section 28 of the Contract Act**, any clause that seeks to extinguish or unduly curtail your time-limit to approach courts or tribunals is void.`,
    citations: [
      {
        type: "Statute",
        title: "Constitution of India - Article 19(1)(g)",
        court: "Constitutional Mandate",
        text: "All citizens shall have the right to practise any profession, or to carry on any occupation, trade or business."
      },
      {
        type: "Statute",
        title: "Indian Contract Act, 1872 - Section 28",
        court: "Bare Act",
        text: "Agreements in restraint of legal proceedings are void."
      },
      {
        type: "Case Precedent",
        title: "Vidya Drolia v. Durga Trading Corp",
        citation: "(2021) 2 SCC 1",
        court: "Supreme Court of India (3-Judge Bench)",
        text: "Arbitration agreements must conform to mandatory public policy and fair dispute mechanisms."
      }
    ],
    relatedSections: ["Art. 19(1)(g)", "ICA § 27", "ICA § 28", "ACA § 12(5)"]
  },

  // 4. Application to minors
  "Does this provision apply to minors?": {
    confidence: 99.7,
    grounding: "Grounding verified against Section 11 ICA 1872 & DPDP Act 2023 § 9",
    answer: `### 👶 Enforceability Regarding Minors Under Indian Law

**Direct Answer**: **NO. These contractual provisions and restrictive obligations CANNOT be legally enforced against a minor (a person under 18 years of age) under Indian law.**

Here is the authoritative statutory and judicial breakdown:

#### 1. Contractual Incapacity (Indian Contract Act, 1872)
* **Section 11 of the Indian Contract Act, 1872** explicitly states that only persons who have attained the age of majority (18 years under the Majority Act, 1875) are competent to contract.
* **Landmark Precedent**: In the historic ruling of ***Mohori Bibee v. Dharmodas Ghose (1903) 30 IA 114 (Privy Council)***, it was established that a contract entered into by a minor is **void ab initio** (void from the very beginning, null and having no legal existence).
* No estoppel can be pleaded against a minor, nor can damages or specific performance be awarded against a minor.

#### 2. Digital & Data Protection for Minors (DPDP Act, 2023)
* If this software processes user data of individuals under 18, **Section 9 of the Digital Personal Data Protection Act, 2023** imposes strict statutory mandates:
  * **Verifiable Parental Consent** is mandatory before processing any data of a child.
  * **Absolute Prohibition** on tracking, behavioral monitoring, or serving targeted advertisements to minors.
  * Violation attracts penalties up to **₹200 Crore (INR 2 Billion)** under the DPDP Act Schedule.

> **📌 Legal Conclusion**: Minors cannot execute this agreement, cannot be bound by the non-compete or indemnity clauses, and their data requires explicit guardian verification under Indian statutory law.`,
    citations: [
      {
        type: "Case Precedent",
        title: "Mohori Bibee v. Dharmodas Ghose",
        citation: "(1903) 30 IA 114",
        court: "Privy Council / Law Reports",
        text: "Agreements entered into by a minor are void ab initio and unenforceable at law; no estoppel or damages lie against a minor."
      },
      {
        type: "Statute",
        title: "Indian Contract Act, 1872 - Section 11",
        court: "Bare Act",
        text: "Every person is competent to contract who is of the age of majority according to the law to which he is subject."
      },
      {
        type: "Statute",
        title: "Digital Personal Data Protection Act, 2023 - Section 9",
        court: "Bare Act",
        text: "Data Fiduciaries shall obtain verifiable consent of parent before processing personal data of children."
      }
    ],
    relatedSections: ["ICA § 11", "DPDP Act § 9", "Majority Act 1875 § 3"]
  },

  // 5. Supporting legal sources
  "Show me the legal sources supporting this answer": {
    confidence: 99.5,
    grounding: "Grounding verified against Supreme Court of India Law Reports & Central Acts",
    answer: `### 📚 Authoritative Legal Sources & Statutory Authorities

The analysis and risk evaluations provided for this document are grounded in the following primary sources of Indian Law:

#### I. Central Statutory Acts (Bare Acts)
1. **The Indian Contract Act, 1872 (Act No. 9 of 1872)**
   * **Section 10 & 11**: Competence to contract (Capacity of parties, Minors).
   * **Section 27**: Void agreements in restraint of trade, profession, or business.
   * **Section 73 & 74**: Assessment of direct vs remote damages; liquidated damages as reasonable compensation vs punitive penalties.
2. **The Arbitration and Conciliation Act, 1996 (Act No. 26 of 1996 as amended)**
   * **Section 11(6)**: Judicial appointment of neutral arbitrators upon failure of party procedure.
   * **Section 12(5) r/w Seventh Schedule**: Non-waivable statutory disqualification of conflicted arbitrators.
   * **Section 29A**: Statutory timeline of 12 months for arbitral awards.
3. **The Constitution of India, 1950**
   * **Article 19(1)(g)**: Fundamental freedom to practice trade and profession.
   * **Article 21**: Right to fair procedure, speedy justice, and personal liberty.
   * **Article 136**: Special leave jurisdiction of the Supreme Court.

---

#### II. Binding Supreme Court of India Precedents
* 🏛️ ***Perkins Eastman Architects DPC v. HSCC (India) Ltd (2020) 20 SCC 760*** — Bench of Lalit & Saran, JJ.
  * *Ratio*: Unilateral appointment of sole arbitrator by an interested entity is void.
* 🏛️ ***Percept D'Mark (India) Pvt Ltd v. Zaheer Khan (2006) 4 SCC 227*** — Bench of Lakshmanan & Kabir, JJ.
  * *Ratio*: Post-termination non-compete covenants are null and void under Section 27.
* 🏛️ ***Kailash Nath Associates v. Delhi Development Authority (2015) 4 SCC 136*** — Bench of Nariman & Gogoi, JJ.
  * *Ratio*: Liquidated damages under Section 74 require proof of actual loss unless impossible to quantify.
* 🏛️ ***Vidya Drolia v. Durga Trading Corporation (2021) 2 SCC 1*** — 3-Judge Bench.
  * *Ratio*: Four-fold test for subject-matter arbitrability under Indian arbitration law.`,
    citations: [
      {
        type: "Case Precedent",
        title: "Perkins Eastman Architects DPC v. HSCC (India) Ltd",
        citation: "(2020) 20 SCC 760",
        court: "Supreme Court of India",
        text: "Interest in the outcome invalidates unilateral arbitrator appointment authority."
      },
      {
        type: "Statute",
        title: "Indian Contract Act, 1872 - Section 27, 73, 74",
        court: "Central Bare Act",
        text: "Statutory provisions governing restraints on trade, consequential damages, and liquidated damages."
      },
      {
        type: "Case Precedent",
        title: "Kailash Nath Associates v. DDA",
        citation: "(2015) 4 SCC 136",
        court: "Supreme Court of India",
        text: "Section 74 cannot be used for unjust enrichment without actual proven loss."
      }
    ],
    relatedSections: ["ICA § 27", "ACA § 12(5)", "ICA § 74", "Const. Art 136"]
  }
};

/**
 * Fallback AI response generator for dynamic user queries
 */
export function generateDynamicLegalResponse(query, document) {
  const q = query.toLowerCase();

  if (q.includes("bail") || q.includes("arrest") || q.includes("custody") || q.includes("439") || q.includes("satender")) {
    return {
      confidence: 99.1,
      grounding: "Grounding verified against Bharatiya Nagarik Suraksha Sanhita, 2023 & CrPC 1973",
      answer: `### ⚖️ Criminal Bail & Liberty Assessment under Indian Law

Under Indian criminal jurisprudence, particularly the landmark guidelines in ***Satender Kumar Antil v. CBI (2022) 10 SCC 51*** and Article 21 of the Constitution:

1. **Bail is the Rule, Jail is the Exception**:
   * Pre-trial custody should not be turned into punitive incarceration where investigation is completed and charge sheet is filed (*Sanjay Chandra v. CBI*).
2. **Commercial Disputes vs Criminal Offenses**:
   * When an alleged dispute arises from contractual delay or non-performance under the Indian Contract Act, the Supreme Court has repeatedly cautioned against criminalizing civil breaches under Section 420 IPC / Section 318 BNS (*Hridaya Ranjan Prasad Verma v. State of Bihar*).
3. **Speedy Trial as Fundamental Right**:
   * When there are dozens of prosecution witnesses and prolonged incarceration of 12+ months, the accused is entitled to regular bail under Section 439 CrPC / Section 483 BNSS to prevent violation of Article 21.`,
      citations: [
        {
          type: "Case Precedent",
          title: "Satender Kumar Antil v. CBI",
          citation: "(2022) 10 SCC 51",
          court: "Supreme Court of India",
          text: "Categorization of offenses and mandatory adherence to bail guidelines without unnecessary custody."
        },
        {
          type: "Statute",
          title: "Constitution of India - Article 21",
          court: "Constitutional Right",
          text: "Protection of life and personal liberty except according to procedure established by law."
        }
      ],
      relatedSections: ["BNSS § 483", "CrPC § 439", "BNS § 318", "Art. 21"]
    };
  }

  if (q.includes("indemnity") || q.includes("liability") || q.includes("cap") || q.includes("damage")) {
    return {
      confidence: 97.5,
      grounding: "Grounding verified against Indian Contract Act, 1872 § 73, 74 & 124",
      answer: `### 📑 Analysis of Indemnity & Liability Structure

Under **Sections 124 & 125 of the Indian Contract Act, 1872**:

1. **Scope of Indemnity**: An indemnity protects against loss caused by the conduct of the promisor or any third person. However, an uncapped indemnity leaves the indemnifying party exposed to unpredictable catastrophic claims.
2. **Direct vs Indirect Losses**: Under **Section 73 of the ICA 1872**, damages are limited to losses that *naturally arose in the usual course of things*. Remote and indirect losses are excluded by statute.
3. **Recommended Redline**:
   * Cap aggregate liability to 1x or 2x total contract value (or 12 months' trailing fees).
   * Carve out mutual exceptions strictly for: (a) gross negligence/willful misconduct, and (b) third-party IP infringement.`,
      citations: [
        {
          type: "Statute",
          title: "Indian Contract Act, 1872 - Section 73",
          court: "Central Bare Act",
          text: "Compensation for loss or damage caused by breach of contract naturally arising in the usual course."
        },
        {
          type: "Statute",
          title: "Indian Contract Act, 1872 - Section 124",
          court: "Central Bare Act",
          text: "Contract of indemnity defined."
        }
      ],
      relatedSections: ["ICA § 73", "ICA § 74", "ICA § 124"]
    };
  }

  if (q.includes("arbitrat") || q.includes("clause 14") || q.includes("perkins") || q.includes("dispute")) {
    return {
      confidence: 98.8,
      grounding: "Grounding verified against Arbitration and Conciliation Act, 1996 § 11 & § 12(5)",
      answer: `### ⚖️ Arbitration Clause Validity Assessment

The arbitration mechanism in this agreement raises critical legal enforceability concerns under Indian Law:

1. **Perkins Eastman Rule**:
   * In ***Perkins Eastman Architects DPC v. HSCC (India) Ltd (2020) 20 SCC 760***, the Supreme Court held that a party who has an interest in the outcome of the dispute cannot unilaterally appoint a sole arbitrator.
2. **Statutory Bar (Section 12(5) & 7th Schedule)**:
   * The Managing Director or any officer of either party is statutorily disqualified from acting as or unilaterally selecting the arbitrator unless agreed post-dispute in writing.
3. **Remedy**:
   * If either party initiates arbitration, the counterparty can approach the High Court under **Section 11(6)** to replace the unilateral appointee with an independent judicial arbitrator.
   * **Best Practice**: Update clause to adopt institutional arbitration (e.g., *MCIA Rules* or *DIAC Rules*).`,
      citations: [
        {
          type: "Case Precedent",
          title: "Perkins Eastman Architects v. HSCC Ltd",
          citation: "(2020) 20 SCC 760",
          court: "Supreme Court of India",
          text: "Unilateral appointment of sole arbitrator by an interested party is invalid."
        },
        {
          type: "Statute",
          title: "Arbitration & Conciliation Act, 1996 - Section 12(5)",
          court: "Bare Act",
          text: "Statutory ineligibility based on Seventh Schedule conflicts."
        }
      ],
      relatedSections: ["ACA § 11(6)", "ACA § 12(5)", "ACA § 29A"]
    };
  }

  // Generic intelligent legal response
  return {
    confidence: 96.8,
    grounding: "Grounding verified against Indian Jurisprudence & Active Document Context",
    answer: `### ⚖️ Legal AI Analysis on "${query}"

Based on the indexed document **${document?.title || "Active Legal Document"}** and applicable Indian statutes:

1. **Document Context**: The document is governed by **${document?.governingLaw || "Laws of India"}**.
2. **Statutory Compliance**: The provisions under review must satisfy the core tests under the **Indian Contract Act, 1872**, the **Arbitration and Conciliation Act, 1996**, and relevant regulatory guidelines.
3. **Risk Exposure**:
   * Ensure any restrictive covenants adhere to **Section 27 ICA** (no post-termination restraint).
   * Verify that dispute resolution clauses are mutual and conform to the *Perkins Eastman* doctrine.
   * Confirm that liquidated damages represent a genuine pre-estimate under **Section 74 ICA**.

> 💡 **Next Steps**: You can click on any citation pill below to view the full Bare Act text or landmark judgment summary.`,
    citations: [
      {
        type: "Statute",
        title: "Indian Contract Act, 1872 - Section 10 & 73",
        court: "Bare Act",
        text: "Fundamental requirements for lawful contract formation and damages assessment."
      },
      {
        type: "Case Precedent",
        title: "Vidya Drolia v. Durga Trading Corp",
        citation: "(2021) 2 SCC 1",
        court: "Supreme Court of India",
        text: "Judicial test for validity of dispute resolution agreements under Indian Law."
      }
    ],
    relatedSections: ["ICA 1872 § 10", "ICA 1872 § 73", "ACA 1996 § 11"]
  };
}
