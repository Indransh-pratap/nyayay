/**
 * Comprehensive Indian Legal Precedents, Statutes, and Bare Act Cross-References
 */

export const BARE_ACTS = [
  {
    id: "act-ica-1872",
    name: "Indian Contract Act, 1872",
    shortCode: "ICA 1872",
    category: "Commercial & Civil",
    year: 1872,
    totalSections: 238,
    keyProvisions: [
      {
        section: "Section 10",
        title: "What agreements are contracts",
        description: "All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void.",
        relevance: "Fundamental threshold of contractual validity in Indian law."
      },
      {
        section: "Section 11",
        title: "Who are competent to contract (Capacity / Minors)",
        description: "Every person is competent to contract who is of the age of majority according to the law to which he is subject, and who is of sound mind and is not disqualified from contracting by any law.",
        landmarkCase: "Mohori Bibee v. Dharmodas Ghose (1903) 30 IA 114 (PC)",
        principle: "Agreements entered into by a minor are void ab initio (void from inception) and unenforceable.",
        relevance: "Directly protects minors from contractual liability and obligations."
      },
      {
        section: "Section 27",
        title: "Agreement in restraint of trade, void",
        description: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void. Exception: One who sells the goodwill of a business may agree with the buyer to refrain from carrying on a similar business.",
        landmarkCase: "Percept D'Mark (India) Pvt Ltd v. Zaheer Khan (2006) 4 SCC 227",
        principle: "Post-termination restrictive covenants and non-compete clauses are strictly void under Section 27.",
        relevance: "Commonly flagged risk in employment, vendor, and MSA contracts."
      },
      {
        section: "Section 28",
        title: "Agreements in restraint of legal proceedings, void",
        description: "Every agreement by which any party thereto is restricted absolutely from enforcing his rights under or in respect of any contract, by the usual legal proceedings in the ordinary tribunals, or which limits the time within which he may thus enforce his rights, is void to that extent.",
        relevance: "Guarantees right of access to judicial forums or valid arbitration."
      },
      {
        section: "Section 73",
        title: "Compensation for loss or damage caused by breach of contract",
        description: "When a contract has been broken, the party who suffers by such breach is entitled to receive from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things.",
        landmarkCase: "Hadley v. Baxendale & Union of India v. Raman Iron Foundry (1974)",
        relevance: "Foundation for general damages assessment and mitigation obligation."
      },
      {
        section: "Section 74",
        title: "Compensation for breach of contract where penalty stipulated for",
        description: "When a contract has been broken, if a sum is named in the contract as the amount to be paid in case of such breach, or if the contract contains any other stipulation by way of penalty, the party complaining of the breach is entitled to receive reasonable compensation not exceeding the amount so named.",
        landmarkCase: "Maula Bux v. Union of India (1969) 2 SCC 554; Kailash Nath Associates v. DDA (2015) 4 SCC 136",
        principle: "Stipulated liquidated damages cannot operate as punitive penalties; claimant must prove reasonable actual loss unless impossible to assess.",
        relevance: "Used to challenge exorbitant lock-in penalties and one-sided indemnity claims."
      }
    ]
  },
  {
    id: "act-aca-1996",
    name: "Arbitration and Conciliation Act, 1996",
    shortCode: "ACA 1996",
    category: "Dispute Resolution",
    year: 1996,
    amendments: "2015, 2019, 2021",
    keyProvisions: [
      {
        section: "Section 7",
        title: "Arbitration Agreement",
        description: "An agreement by the parties to submit to arbitration all or certain disputes which have arisen or which may arise between them in respect of a defined legal relationship.",
        relevance: "Mandatory writing requirement and clear intention to arbitrate."
      },
      {
        section: "Section 11(6)",
        title: "Appointment of Arbitrators by High Court / Supreme Court",
        description: "Where under an appointment procedure agreed upon by the parties, a party fails to act as required under that procedure, the appointment shall be made, upon request of a party, by the Supreme Court or the High Court.",
        landmarkCase: "Perkins Eastman Architects DPC v. HSCC (India) Ltd (2020) 20 SCC 760",
        principle: "A party interested in the dispute or having an interest in the outcome is ineligible to unilaterally appoint a sole arbitrator.",
        relevance: "Directly invalidates unilateral arbitrator appointment clauses."
      },
      {
        section: "Section 12(5) & Seventh Schedule",
        title: "Ineligibility of Arbitrator due to Conflict of Interest",
        description: "Any person whose relationship with the parties or counsel or the subject-matter of the dispute falls under any of the categories specified in the Seventh Schedule shall be ineligible to be appointed as an arbitrator.",
        landmarkCase: "TRF Ltd v. Energo Engineering Projects Ltd (2017) 8 SCC 377",
        relevance: "Statutory bar preventing employees, advisors, or directors from acting as arbitrators."
      },
      {
        section: "Section 29A",
        title: "Time limit for arbitral award",
        description: "The award in matters other than international commercial arbitration shall be made within a period of twelve months from the date of completion of pleadings.",
        relevance: "Expedited mandate for Indian arbitrations introduced in 2015/2019 amendments."
      },
      {
        section: "Section 34",
        title: "Application for setting aside arbitral award",
        description: "Recourse to a Court against an arbitral award may be made only by an application for setting aside such award in accordance with sub-section (2) and sub-section (3).",
        landmarkCase: "Associate Builders v. DDA (2015) 3 SCC 49; Ssangyong Engineering (2019)",
        relevance: "Defines public policy of India, patent illegality, and jurisdictional review limits."
      }
    ]
  },
  {
    id: "act-bns-2023",
    name: "Bharatiya Nyaya Sanhita, 2023 (formerly Indian Penal Code, 1860)",
    shortCode: "BNS 2023 / IPC",
    category: "Criminal Law",
    year: 2023,
    keyProvisions: [
      {
        section: "Section 318 BNS (Section 420 IPC)",
        title: "Cheating and dishonestly inducing delivery of property",
        description: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
        relevance: "Core offense cited in commercial criminal complaints."
      },
      {
        section: "Section 316 BNS (Section 405/406 IPC)",
        title: "Criminal breach of trust",
        description: "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property.",
        relevance: "Frequently contested alongside cheating in contractual defaults."
      },
      {
        section: "Section 61 BNS (Section 120B IPC)",
        title: "Criminal Conspiracy",
        description: "When two or more persons agree to do, or cause to be done, an illegal act, or an act which is not illegal by illegal means.",
        relevance: "Joint liability across corporate directors and signatories."
      }
    ]
  },
  {
    id: "act-const-1950",
    name: "Constitution of India, 1950",
    shortCode: "Constitution of India",
    category: "Constitutional Law",
    year: 1950,
    keyProvisions: [
      {
        section: "Article 14",
        title: "Equality before law",
        description: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
        landmarkCase: "E.P. Royappa v. State of Tamil Nadu (1974) 4 SCC 3",
        relevance: "Protection against state arbitrariness and unreasonableness."
      },
      {
        section: "Article 21",
        title: "Protection of life and personal liberty",
        description: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
        landmarkCase: "Maneka Gandhi v. Union of India (1978) 1 SCC 248; K.S. Puttaswamy v. UOI (2017) 10 SCC 1",
        relevance: "Encompasses right to privacy, right to speedy trial, and fair procedure."
      },
      {
        section: "Article 32 & 226",
        title: "Remedies for enforcement of Fundamental Rights / High Court Writs",
        description: "Empowers the Supreme Court and High Courts to issue directions, orders or writs (habeas corpus, mandamus, prohibition, quo warranto, certiorari).",
        relevance: "Primary constitutional remedy for arbitrary state action or judicial excess."
      },
      {
        section: "Article 136",
        title: "Special Leave to Appeal by the Supreme Court",
        description: "The Supreme Court may, in its discretion, grant special leave to appeal from any judgment, decree, determination, sentence or order in any cause or matter passed or made by any court or tribunal.",
        relevance: "Extraordinary discretionary appellate jurisdiction invoked in SLPs."
      }
    ]
  },
  {
    id: "act-dpdp-2023",
    name: "Digital Personal Data Protection Act, 2023",
    shortCode: "DPDP Act 2023",
    category: "Technology & Privacy",
    year: 2023,
    keyProvisions: [
      {
        section: "Section 6",
        title: "Consent requirements and Notice",
        description: "Consent given by the Data Principal shall be free, specific, informed, unconditional and unambiguous with a clear affirmative action.",
        relevance: "Mandates itemized notices in 22 scheduled official languages."
      },
      {
        section: "Section 8",
        title: "General obligations of Data Fiduciary",
        description: "Obligation to implement reasonable security safeguards to prevent personal data breach and notify the Data Protection Board and affected principals upon breach.",
        relevance: "High monetary penalties up to ₹250 Crore for security lapses."
      },
      {
        section: "Section 9",
        title: "Processing of personal data of children (Minors)",
        description: "Data Fiduciaries must obtain verifiable consent of parents before processing data of children (below 18 years) and are prohibited from tracking, behavioral monitoring, or targeted advertising directed at children.",
        relevance: "Strict statutory protection of minors' digital privacy under Indian law."
      }
    ]
  }
];

export const LANDMARK_JUDGMENTS = [
  {
    id: "case-perkins-2020",
    title: "Perkins Eastman Architects DPC v. HSCC (India) Ltd",
    citation: "(2020) 20 SCC 760",
    court: "Supreme Court of India",
    bench: "U.U. Lalit, Vineet Saran, JJ.",
    year: 2020,
    statuteRef: "Arbitration and Conciliation Act, 1996 - Section 11(6) & 12(5)",
    summary: "The Supreme Court held that a person who has an interest in the outcome or decision of the dispute must not have the power to appoint a sole arbitrator. Unilateral arbitrator appointment clauses are void and unenforceable.",
    significance: "Crucial precedent for striking down one-sided corporate arbitration clauses in commercial contracts.",
    tags: ["Arbitration", "Independence of Arbitrators", "Section 11", "Commercial Contracts"]
  },
  {
    id: "case-vidya-drolia-2021",
    title: "Vidya Drolia and Others v. Durga Trading Corporation",
    citation: "(2021) 2 SCC 1",
    court: "Supreme Court of India (3-Judge Bench)",
    bench: "N.V. Ramana, Sanjiv Khanna, Krishna Murari, JJ.",
    year: 2021,
    statuteRef: "Arbitration & Conciliation Act, 1996 - Section 8, 11 & Transfer of Property Act, 1882",
    summary: "Established a 4-fold test for non-arbitrability in India: actions in rem, actions affecting third-party rights, disputes governed by specialized sovereign tribunals, and matters non-arbitrable by mandatory statutory implication.",
    significance: "Settled the long-standing debate on landlord-tenant disputes and intellectual property arbitrability.",
    tags: ["Arbitrability", "Landlord-Tenant", "Section 8", "Public Policy"]
  },
  {
    id: "case-satender-antil-2022",
    title: "Satender Kumar Antil v. Central Bureau of Investigation",
    citation: "(2022) 10 SCC 51",
    court: "Supreme Court of India",
    bench: "S.K. Kaul, M.M. Sundresh, JJ.",
    year: 2022,
    statuteRef: "Code of Criminal Procedure, 1973 - Section 41, 41A, 88, 170, 204, 437, 439",
    summary: "Issued landmark comprehensive guidelines on arrest and bail categorizing offenses into Category A (bailable/7 yrs), Category B (serious/economic), Category C (special acts), and Category D (economic offenses). Reiterated bail as rule and jail as exception.",
    significance: "Binding precedent cited in all High Court and Supreme Court bail petitions and SLPs.",
    tags: ["Criminal Law", "Bail Guidelines", "Article 21", "Section 41A CrPC"]
  },
  {
    id: "case-puttaswamy-2017",
    title: "Justice K.S. Puttaswamy (Retd.) v. Union of India",
    citation: "(2017) 10 SCC 1",
    court: "Supreme Court of India (9-Judge Constitution Bench)",
    bench: "J.S. Khehar, C.J. et al.",
    year: 2017,
    statuteRef: "Constitution of India - Article 21, Part III",
    summary: "Unanimously affirmed that the Right to Privacy is a fundamental right guaranteed under Article 21 of the Constitution of India. Established the 3-fold proportionality test: Legality, Legitimate State Aim, and Proportionality.",
    significance: "The constitutional cornerstone for India's Digital Personal Data Protection Act, 2023.",
    tags: ["Privacy", "Fundamental Rights", "Data Protection", "Article 21"]
  },
  {
    id: "case-kailash-nath-2015",
    title: "Kailash Nath Associates v. Delhi Development Authority",
    citation: "(2015) 4 SCC 136",
    court: "Supreme Court of India",
    bench: "R.F. Nariman, Ranjan Gogoi, JJ.",
    year: 2015,
    statuteRef: "Indian Contract Act, 1872 - Section 74",
    summary: "Held that forfeiture of earnest money or liquidated damages can only occur if the party complaining of breach has suffered actual loss, unless it is impossible or impracticable to prove actual damage.",
    significance: "Restricted unilateral forfeiture clauses and unreasonable liquidated damages across commercial tenders and contracts.",
    tags: ["Contract Act", "Section 74", "Liquidated Damages", "Earnest Money"]
  },
  {
    id: "case-mohori-bibee-1903",
    title: "Mohori Bibee v. Dharmodas Ghose",
    citation: "(1903) 30 IA 114 (Privy Council)",
    court: "Judicial Committee of the Privy Council",
    bench: "Lord Macnaghten et al.",
    year: 1903,
    statuteRef: "Indian Contract Act, 1872 - Section 10 & 11",
    summary: "Authoritatively laid down the doctrine that a contract entered into with a minor is void ab initio and no estoppel or restitution under Section 64/65 can be claimed against the minor.",
    significance: "Timeless landmark on minor's capacity and protection of minors under Indian civil jurisprudence.",
    tags: ["Capacity to Contract", "Minors", "Section 11", "Void Ab Initio"]
  }
];
