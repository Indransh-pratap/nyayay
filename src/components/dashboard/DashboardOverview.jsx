import React from 'react';
import { 
  FileText, 
  ShieldAlert, 
  Scale, 
  Sparkles, 
  Upload, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  FileCheck2,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight
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
  const stats = [
    {
      label: "Statutory Grounding Index",
      value: "98.8%",
      subtext: "Verified against Indian Bare Acts & SC Judgments",
      icon: ShieldAlert,
      color: "from-emerald-500/20 to-emerald-700/5",
      border: "border-emerald-500/30",
      textColor: "text-emerald-400"
    },
    {
      label: "Active Indexed Documents",
      value: "4 Case Files",
      subtext: "MSA, Criminal SLP, Lease Deed, DPDP Audit",
      icon: FileText,
      color: "from-amber-500/20 to-amber-700/5",
      border: "border-amber-500/30",
      textColor: "text-amber-400"
    },
    {
      label: "High-Risk Clauses Flagged",
      value: "7 Identified",
      subtext: "Unilateral arbitration, non-competes, penalty clauses",
      icon: AlertTriangle,
      color: "from-rose-500/20 to-rose-700/5",
      border: "border-rose-500/30",
      textColor: "text-rose-400"
    },
    {
      label: "Bare Acts Mapped",
      value: "5 Central Acts",
      subtext: "BNS 2023, ICA 1872, ACA 1996, DPDP 2023, Const.",
      icon: Scale,
      color: "from-blue-500/20 to-blue-700/5",
      border: "border-blue-500/30",
      textColor: "text-blue-400"
    }
  ];

  const recentPrecedents = [
    {
      case: "Perkins Eastman Architects DPC v. HSCC (India) Ltd",
      citation: "(2020) 20 SCC 760",
      court: "Supreme Court of India",
      principle: "Unilateral arbitrator appointment by interested party is void under Section 12(5) ACA.",
      impact: "Directly applied to MSA Clause 14.2"
    },
    {
      case: "Satender Kumar Antil v. CBI",
      citation: "(2022) 10 SCC 51",
      court: "Supreme Court of India",
      principle: "Comprehensive bail guidelines reiterating bail as rule and pre-trial custody limits.",
      impact: "Directly applied to SLP (Crl.) No. 4412/2024"
    },
    {
      case: "Kailash Nath Associates v. Delhi Development Authority",
      citation: "(2015) 4 SCC 136",
      court: "Supreme Court of India",
      principle: "Liquidated damages require proof of actual damage; punitive forfeiture prohibited under Sec 74 ICA.",
      impact: "Directly applied to Lease Deed Lock-in Penalty"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Specialized Legal Intelligence for Indian Jurisprudence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Welcome to <span className="text-amber-400">NyayaAI</span> Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Upload commercial agreements, court pleadings, lease deeds, or compliance memos to instantly extract statutory sections, redline unconscionable clauses, and consult our Indian Law AI Assistant grounded in verified Supreme Court precedents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onUploadClick}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Document</span>
            </button>
            <button
              onClick={() => onNavigateToChat()}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-all shadow-sm"
            >
              <Cpu className="h-4 w-4 text-amber-400" />
              <span>Open AI Legal Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`rounded-xl border ${stat.border} bg-gradient-to-br ${stat.color} bg-slate-900/60 p-4 backdrop-blur-sm shadow-sm transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className={`rounded-lg bg-slate-800/80 p-2 ${stat.textColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className={`mt-3 text-2xl font-serif font-bold ${stat.textColor}`}>
                {stat.value}
              </div>
              <p className="mt-1 text-[11px] text-slate-400 leading-tight">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pre-loaded Sample Case Files / Documents Launchpad */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-400" />
              Pre-Loaded Legal Documents & Case Files
            </h2>
            <p className="text-xs text-slate-400">
              Select any verified sample document to explore deep analysis and grounded chat
            </p>
          </div>
          <button
            onClick={onUploadClick}
            className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>+ Upload Custom Doc</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => {
            const isSelected = activeDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc);
                }}
                className={`group relative rounded-xl border p-5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-slate-900/90 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Active In Workspace</span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-slate-800 p-2.5 text-amber-400 border border-slate-700 mt-0.5 group-hover:scale-105 transition-transform">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 pr-16">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-700">
                      {doc.documentType}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                      {doc.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                      {doc.summary.executiveSummary}
                    </p>
                  </div>
                </div>

                {/* Key metadata chips */}
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80 text-[11px]">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400 border border-emerald-500/20">
                    {doc.groundingConfidence}% Grounded
                  </span>
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 font-medium text-amber-300 border border-amber-500/20">
                    {doc.riskScore}
                  </span>
                  <span className="text-slate-400 ml-auto font-mono text-[10px]">
                    {doc.pages} Pages • {doc.fileSize}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="mt-3 flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    Governing Law: <strong className="text-slate-300">{doc.governingLaw.split('(')[0]}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDoc(doc);
                        onNavigateToAnalysis();
                      }}
                      className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors"
                    >
                      <span>Analyze</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDoc(doc);
                        onNavigateToChat();
                      }}
                      className="rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 px-3 py-1 text-xs font-medium text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Live Supreme Court Precedent Feeds & Statutory Citations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Landmark Precedents Applied */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-400 border border-amber-500/20">
                <Scale className="h-4 w-4" />
              </div>
              <h3 className="font-serif font-bold text-white text-sm">
                Supreme Court Precedents Applied in Active Analyses
              </h3>
            </div>
            <button
              onClick={onNavigateToCitations}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
            >
              <span>View All Precedents</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentPrecedents.map((item, i) => (
              <div key={i} className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-amber-300">
                    {item.case}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                    {item.citation}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {item.principle}
                </p>
                <div className="text-[11px] text-emerald-400/90 font-medium flex items-center gap-1 pt-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Statutory Compliance Widget */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400 border border-emerald-500/20">
                <FileCheck2 className="h-4 w-4" />
              </div>
              <h3 className="font-serif font-bold text-white text-sm">
                Indian Bare Acts Verification
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Real-time cross-referencing against verified Central Acts of India:
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-300">Arbitration & Conciliation Act 1996</span>
                <span className="text-emerald-400 font-mono text-[10px]">§ 11, 12(5), 29A</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-300">Indian Contract Act, 1872</span>
                <span className="text-emerald-400 font-mono text-[10px]">§ 11, 27, 73, 74</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-300">Bharatiya Nyaya Sanhita, 2023</span>
                <span className="text-emerald-400 font-mono text-[10px]">§ 318, 316, 61</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="font-medium text-slate-300">DPDP Act, 2023 (Child Privacy)</span>
                <span className="text-emerald-400 font-mono text-[10px]">§ 6, 8, 9</span>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToCitations}
            className="w-full rounded-xl border border-amber-500/30 bg-amber-500/10 py-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors text-center"
          >
            Explore Bare Acts Repository →
          </button>
        </div>

      </div>

    </div>
  );
}
