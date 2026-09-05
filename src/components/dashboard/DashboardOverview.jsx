import React, { useState } from 'react';
import { 
  FileText, 
  Scale, 
  Sparkles, 
  Upload, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  BookOpen, 
  Check
} from 'lucide-react';

export function DashboardOverview({ 
  documents, 
  activeDoc, 
  onSelectDoc, 
  onUploadClick, 
  onNavigateToAnalysis, 
  onNavigateToChat,
  onNavigateToCitations
}) {
  const [expandedDocId, setExpandedDocId] = useState(null);

  const toggleDocDetails = (docId, e) => {
    e.stopPropagation();
    setExpandedDocId(expandedDocId === docId ? null : docId);
  };

  const recentPrecedents = [
    {
      case: "Perkins Eastman Architects DPC v. HSCC (India) Ltd",
      citation: "(2020) 20 SCC 760",
      court: "Supreme Court of India",
      principle: "Unilateral arbitrator appointment by an interested party is void under Section 12(5) of the Arbitration Act."
    },
    {
      case: "Satender Kumar Antil v. CBI",
      citation: "(2022) 10 SCC 51",
      court: "Supreme Court of India",
      principle: "Guidelines reiterating bail as the default rule and establishing strict boundaries on pre-trial custody."
    },
    {
      case: "Kailash Nath Associates v. Delhi Development Authority",
      citation: "(2015) 4 SCC 136",
      court: "Supreme Court of India",
      principle: "Liquidated damages require proof of actual loss; punitive forfeiture is prohibited under Section 74 of the Contract Act."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      
      {/* 1. Spacious Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Legal Workspace
          </h1>
          <p className="text-[15px] text-slate-300 max-w-2xl leading-relaxed">
            Review case files, verify compliance against Indian statutes, and consult legal AI.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[13px] text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Evidence grounded · 98.8% verified against Indian statutes</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => onNavigateToChat(activeDoc)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-legal-surface px-4 py-2.5 text-[14px] font-medium text-slate-200 hover:border-white/20 hover:text-white transition-colors"
          >
            <Sparkles className="h-4 w-4 text-gold-primary" />
            <span>Ask Legal AI</span>
          </button>
          <button
            onClick={onUploadClick}
            className="flex items-center gap-2 rounded-lg bg-gold-primary px-4 py-2.5 text-[14px] font-semibold text-[#070B14] hover:bg-gold-hover transition-colors shadow-sm"
          >
            <Upload className="h-4 w-4 text-[#070B14]" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics - 3 Calm, High-Readability Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-1.5">
          <div className="text-[13px] font-medium uppercase tracking-wider text-slate-400">
            Active Documents
          </div>
          <div className="text-3xl font-serif font-bold text-white">
            {documents.length}
          </div>
          <p className="text-[13px] text-slate-400 pt-1">
            Indexed in current chamber session
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-1.5">
          <div className="text-[13px] font-medium uppercase tracking-wider text-slate-400">
            Evidence Grounding
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-400">
            98.8%
          </div>
          <p className="text-[13px] text-slate-400 pt-1">
            Verified across Bare Acts & SC rulings
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-1.5">
          <div className="text-[13px] font-medium uppercase tracking-wider text-slate-400">
            Flagged Clauses
          </div>
          <div className="text-3xl font-serif font-bold text-rose-400">
            7
          </div>
          <p className="text-[13px] text-slate-400 pt-1">
            Potential legal risks identified
          </p>
        </div>
      </div>

      {/* 3. Documents Section with Progressive Disclosure */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white">
              Documents
            </h2>
            <p className="text-[14px] text-slate-400 mt-0.5">
              Select a brief to review risk analysis or consult the AI assistant
            </p>
          </div>
          <button
            onClick={onUploadClick}
            className="text-[14px] font-medium text-gold-primary hover:text-gold-hover transition-colors"
          >
            + Upload new file
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {documents.map((doc) => {
            const isSelected = activeDoc?.id === doc.id;
            const isExpanded = expandedDocId === doc.id;

            return (
              <div
                key={doc.id}
                onClick={() => onSelectDoc(doc)}
                className={`rounded-xl border p-6 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-gold-primary/50 bg-legal-surface-elevated shadow-md'
                    : 'border-white/10 bg-legal-surface hover:border-white/20'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[12px] font-mono text-slate-400">
                    <span className="uppercase tracking-wider font-semibold text-gold-primary">
                      {doc.documentType}
                    </span>
                    {isSelected && (
                      <span className="text-emerald-400 font-sans flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" />
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-gold-primary transition-colors">
                    {doc.title}
                  </h3>

                  <div className="text-[14px] text-slate-400">
                    <span className="text-emerald-400 font-medium">{doc.groundingConfidence}% grounded</span>
                    <span className="mx-2">·</span>
                    <span>{doc.pages} pages</span>
                    <span className="mx-2">·</span>
                    <span>{doc.fileSize}</span>
                  </div>

                  {/* Progressive Disclosure: Accordion for extra details */}
                  {isExpanded && (
                    <div className="pt-3 mt-2 border-t border-white/10 space-y-2 text-[13px] text-slate-300 animate-fade-in">
                      <p className="leading-relaxed">
                        {doc.summary.executiveSummary}
                      </p>
                      <div className="text-xs text-slate-400 pt-1">
                        <strong className="text-slate-300">Governing Law:</strong> {doc.governingLaw}
                      </div>
                      <div className="text-xs text-rose-400">
                        {doc.clauseRisks?.length || 0} flagged clauses in this agreement
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={(e) => toggleDocDetails(doc.id, e)}
                    className="text-[13px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? "Hide details" : "View details"}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDoc(doc);
                        onNavigateToAnalysis(doc);
                      }}
                      className="rounded-lg bg-gold-primary px-3.5 py-1.5 text-[13px] font-semibold text-[#070B14] hover:bg-gold-hover transition-colors"
                    >
                      Analyze
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDoc(doc);
                        onNavigateToChat(doc);
                      }}
                      className="rounded-lg border border-white/10 bg-legal-canvas px-3.5 py-1.5 text-[13px] font-medium text-slate-200 hover:text-white hover:border-white/20 transition-colors"
                    >
                      Ask AI
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Precedents & Legal Research Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Supreme Court Precedents Applied */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-legal-surface p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <Scale className="h-5 w-5 text-gold-primary" />
              <h3 className="font-serif font-bold text-white text-lg">
                Supreme Court Precedents
              </h3>
            </div>
            <button
              onClick={onNavigateToCitations}
              className="text-[13px] text-gold-primary hover:text-gold-hover flex items-center gap-1 font-medium transition-colors"
            >
              <span>View all cases</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentPrecedents.map((item, i) => (
              <div 
                key={i} 
                className="rounded-lg border border-white/5 bg-legal-canvas p-4 space-y-1.5 hover:border-white/15 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-serif font-semibold text-[15px] text-slate-100">
                    {item.case}
                  </span>
                  <span className="font-mono text-xs text-gold-primary">
                    {item.citation}
                  </span>
                </div>
                <p className="text-[13px] text-slate-400 leading-relaxed">
                  {item.principle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Central Bare Acts Verification */}
        <div className="rounded-xl border border-white/10 bg-legal-surface p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              <h3 className="font-serif font-bold text-white text-lg">
                Bare Acts
              </h3>
            </div>
            
            <p className="text-[13px] text-slate-400 leading-relaxed">
              Statutory references verified against the Central Acts of India:
            </p>

            <div className="space-y-2 text-[14px]">
              <div className="p-3 rounded-lg bg-legal-canvas border border-white/5 flex items-center justify-between">
                <span className="text-slate-200">Arbitration Act 1996</span>
                <span className="text-emerald-400 text-xs font-mono">§ 11, 12(5)</span>
              </div>
              <div className="p-3 rounded-lg bg-legal-canvas border border-white/5 flex items-center justify-between">
                <span className="text-slate-200">Contract Act 1872</span>
                <span className="text-emerald-400 text-xs font-mono">§ 27, 74</span>
              </div>
              <div className="p-3 rounded-lg bg-legal-canvas border border-white/5 flex items-center justify-between">
                <span className="text-slate-200">Bharatiya Nyaya Sanhita</span>
                <span className="text-emerald-400 text-xs font-mono">§ 316, 318</span>
              </div>
              <div className="p-3 rounded-lg bg-legal-canvas border border-white/5 flex items-center justify-between">
                <span className="text-slate-200">DPDP Act 2023</span>
                <span className="text-emerald-400 text-xs font-mono">§ 6, 9</span>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToCitations}
            className="w-full rounded-lg border border-gold-primary/30 bg-gold-primary/10 py-2.5 text-[13px] font-semibold text-gold-primary hover:bg-gold-primary/20 transition-colors text-center"
          >
            Explore Bare Acts Repository →
          </button>
        </div>

      </div>

    </div>
  );
}

export default DashboardOverview;

