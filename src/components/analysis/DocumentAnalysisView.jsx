import React, { useState } from 'react';
import { 
  FileText, 
  ShieldAlert, 
  Scale, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Download, 
  BookOpen, 
  Layers, 
  Users, 
  Eye, 
  CornerDownRight, 
  Check, 
  MessageSquareText,
  Clock,
  MapPin,
  IndianRupee,
  Calendar,
  Building,
  Info
} from 'lucide-react';

export function DocumentAnalysisView({ 
  document, 
  onNavigateToChat, 
  onOpenCitation, 
  onExportMemo 
}) {
  const [activeSubTab, setActiveSubTab] = useState('summary');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedClauseId, setSelectedClauseId] = useState(document?.clauseRisks?.[0]?.id || null);

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <FileText className="h-12 w-12 text-slate-600" />
        <h3 className="text-lg font-serif font-semibold text-slate-300">No Document Selected</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Please select a sample legal document or upload a new file from the dashboard to view analysis.
        </p>
      </div>
    );
  }

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: FileText, count: null },
    { id: 'sections', label: 'Key Statutory Sections', icon: Scale, count: document.keySections?.length },
    { id: 'risks', label: 'Clause Risk & Redlines', icon: AlertTriangle, count: document.clauseRisks?.length, alert: true },
    { id: 'entities', label: 'Parties & Legal Entities', icon: Users, count: document.entities?.length },
    { id: 'split', label: 'Interactive Document Viewer', icon: Eye, count: 'Sync' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Master Document Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
                {document.documentType}
              </span>
              <span className="rounded bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {document.groundingConfidence}% Statutory Grounding
              </span>
              <span className="rounded bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-300 border border-rose-500/20">
                {document.riskScore}
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              {document.title}
            </h1>
            
            <p className="text-xs text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Jurisdiction: <strong className="text-slate-300">{document.jurisdiction}</strong></span>
              <span>•</span>
              <span>Governing Law: <strong className="text-slate-300">{document.governingLaw}</strong></span>
              <span>•</span>
              <span>Size: <strong className="text-slate-300">{document.fileSize} ({document.pages} pgs)</strong></span>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateToChat(document)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask AI About This Doc</span>
            </button>
            <button
              onClick={onExportMemo}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-all shadow-sm"
            >
              <Download className="h-4 w-4 text-amber-400" />
              <span>Export Legal Brief</span>
            </button>
          </div>

        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-1 border-t border-slate-800 pt-4 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                    tab.alert 
                      ? 'bg-rose-500/20 text-rose-300' 
                      : isActive 
                      ? 'bg-amber-400/20 text-amber-300' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Tab Content Panes */}

      {/* 1. EXECUTIVE SUMMARY TAB */}
      {activeSubTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Plain language summary box */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-400" />
                  AI Executive Plain Language Summary
                </h3>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-slate-700">
                  Plain-English Counsel Synthesis
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {document.summary.executiveSummary}
              </p>

              <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 space-y-2 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Procedural Posture / Stage
                </div>
                <div className="text-amber-300 font-medium font-serif text-sm">
                  {document.summary.proceduralPosture}
                </div>
              </div>
            </div>

            {/* Key Risk Findings */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 space-y-4">
              <h3 className="text-base font-serif font-bold text-rose-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                Critical Legal Vulnerabilities Identified
              </h3>

              <div className="space-y-3">
                {document.summary.keyRiskFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-xs text-slate-300">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right column: Actionable Recommendations & Quick Chat */}
          <div className="space-y-6">
            
            {/* Legal Recommendations */}
            <div className="rounded-2xl border border-amber-500/30 bg-slate-900/60 p-6 space-y-4">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                Actionable Counsel Guidance
              </h3>

              <div className="space-y-3">
                {document.summary.legalRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-xs text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateToChat(document)}
                className="w-full mt-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 py-2.5 text-xs font-semibold text-amber-300 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Interrogate Findings in AI Chat</span>
              </button>
            </div>

            {/* Quick Parties Summary */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building className="h-3.5 w-3.5 text-amber-400" />
                Contracting Parties / Litigants
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="text-[10px] text-amber-400 font-medium">Party A</div>
                  <div className="font-semibold">{document.parties.partyA}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="text-[10px] text-amber-400 font-medium">Party B</div>
                  <div className="font-semibold">{document.parties.partyB}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. KEY STATUTORY SECTIONS TAB */}
      {activeSubTab === 'sections' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <Scale className="h-4 w-4 text-amber-400" />
                Statutory Cross-References & Section Analyses
              </h3>
              <p className="text-xs text-slate-400">
                Clauses mapped against relevant Central Acts, Bare Act Sections, and Supreme Court precedent doctrines
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              {document.keySections?.length} Sections Evaluated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {document.keySections.map((sec, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {sec.sectionNumber}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      sec.status.includes('Critical') || sec.status.includes('Void')
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}>
                      {sec.status}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-sm text-white">
                    {sec.title}
                  </h4>

                  <div className="text-xs font-medium text-slate-400">
                    Statute: <span className="text-slate-300 font-semibold">{sec.statute}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {sec.analysis}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono truncate max-w-[240px]">
                    {sec.statutoryReference}
                  </span>
                  <button
                    onClick={() => onOpenCitation(sec.statutoryReference)}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium flex-shrink-0"
                  >
                    <span>Inspect Statute</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CLAUSE RISKS & REDLINES TAB */}
      {activeSubTab === 'risks' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                Clause Risk Matrix & AI-Generated Redlines
              </h3>
              <p className="text-xs text-slate-400">
                Detailed clause-by-clause risk severity rating, offending text, suggested redline, and statutory grounding
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {document.clauseRisks.map((risk) => (
              <div 
                key={risk.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-lg hover:border-slate-700 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      risk.riskLevel === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {risk.riskLevel} RISK (Score: {risk.riskScore}/100)
                    </span>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-white">
                      {risk.clauseName}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Category: <strong className="text-slate-300">{risk.category}</strong>
                  </span>
                </div>

                {/* Offending vs Suggested Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  
                  {/* Current Offending Text */}
                  <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-rose-400">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Current Offending Clause
                      </span>
                      <span className="text-[10px] font-mono text-rose-400/80">Draft Wording</span>
                    </div>
                    <p className="text-xs text-rose-200/90 leading-relaxed font-mono bg-slate-950/60 p-3 rounded-lg border border-rose-500/20">
                      "{risk.offendingText}"
                    </p>
                  </div>

                  {/* Suggested Redline */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Recommended Legal Redline
                      </span>
                      <button
                        onClick={() => handleCopyText(risk.suggestedRedline, risk.id)}
                        className="text-[10px] font-sans flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                      >
                        {copiedId === risk.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedId === risk.id ? 'Copied' : 'Copy Redline'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed font-mono bg-slate-950/60 p-3 rounded-lg border border-emerald-500/20">
                      {risk.suggestedRedline}
                    </p>
                  </div>

                </div>

                {/* Legal Grounding Footer */}
                <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Scale className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span><strong>Statutory & Precedent Grounding:</strong> {risk.legalGrounding}</span>
                  </div>
                  <button
                    onClick={() => onOpenCitation(risk.legalGrounding)}
                    className="text-amber-400 hover:text-amber-300 text-[11px] font-medium flex items-center gap-1 flex-shrink-0"
                  >
                    <span>View Authority</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. JURISTIC ENTITIES & PARTIES TAB */}
      {activeSubTab === 'entities' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-400" />
                Extracted Juristic Entities, Claims & Metadata
              </h3>
              <p className="text-xs text-slate-400">
                Automated Named Entity Recognition (NER) for Indian corporate entities, tribunals, dates, and amounts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {document.entities.map((ent, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-slate-700">
                    {ent.type}
                  </span>
                  {ent.status && (
                    <span className="text-[10px] font-medium text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                      {ent.status}
                    </span>
                  )}
                </div>

                <div className="font-serif font-bold text-sm text-white pt-1">
                  {ent.name}
                </div>

                {ent.location && (
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    <span>{ent.location}</span>
                  </div>
                )}

                {ent.cin && (
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    CIN: <span className="text-slate-300">{ent.cin}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE DOCUMENT SPLIT VIEWER */}
      {activeSubTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Left: Simulated PDF text reader with highlighted clauses */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl max-h-[650px] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" />
                <span className="font-serif font-bold text-xs text-slate-200">
                  Simulated Document Transcript ({document.pages} Pages)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Click highlighted text to inspect AI analysis
              </span>
            </div>

            <div className="font-serif text-xs leading-relaxed text-slate-300 whitespace-pre-wrap space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-slate-200">
                {document.rawText}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
              <Info className="h-4 w-4 flex-shrink-0" />
              <span>Full optical OCR scan synchronized with Indian Case Law knowledge graph.</span>
            </div>
          </div>

          {/* Right: Live Selected Clause Inspector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-amber-500/40 bg-slate-900/80 p-5 space-y-4 sticky top-20 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                  <Scale className="h-4 w-4 text-amber-400" />
                  Live Statutory Annotator
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Real-time Grounding
                </span>
              </div>

              {document.clauseRisks && document.clauseRisks.length > 0 ? (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Flagged Clause:
                    </div>
                    <div className="text-sm font-serif font-bold text-white">
                      {document.clauseRisks[0].clauseName}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
                    <div className="text-[10px] font-bold uppercase text-rose-400 mb-1">
                      Problematic Text:
                    </div>
                    <p className="font-mono text-[11px] leading-relaxed">
                      "{document.clauseRisks[0].offendingText}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                    <div className="text-[10px] font-bold uppercase text-emerald-400 mb-1">
                      Suggested Indian Law Redline:
                    </div>
                    <p className="font-mono text-[11px] leading-relaxed">
                      {document.clauseRisks[0].suggestedRedline}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                    <div className="text-[10px] font-bold uppercase text-amber-400 mb-1">
                      Supreme Court Ruling Grounding:
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {document.clauseRisks[0].legalGrounding}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateToChat(document)}
                    className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Ask AI About This Clause</span>
                  </button>
                </div>
              ) : null}

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
