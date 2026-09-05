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
  Check, 
  MessageSquareText,
  Clock,
  MapPin,
  Calendar,
  Building,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export function DocumentAnalysisView({ 
  document, 
  activeSubTab: controlledSubTab,
  setActiveSubTab: setControlledSubTab,
  onNavigateToChat, 
  onOpenCitation, 
  onExportMemo 
}) {
  const [localSubTab, setLocalSubTab] = useState('summary');
  const activeSubTab = controlledSubTab !== undefined ? controlledSubTab : localSubTab;
  const setActiveSubTab = (tab) => {
    if (setControlledSubTab) setControlledSubTab(tab);
    setLocalSubTab(tab);
  };

  const [copiedId, setCopiedId] = useState(null);
  const [selectedClauseId, setSelectedClauseId] = useState(document?.clauseRisks?.[0]?.id || null);

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <FileText className="h-12 w-12 text-slate-600" />
        <h3 className="text-lg font-serif font-semibold text-slate-300">No Legal Document Selected</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Please select a sample legal document or upload a new file from the workspace dashboard to view statutory analysis.
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
    { id: 'summary', label: 'Executive Summary', icon: FileText },
    { id: 'sections', label: 'Key Sections', icon: Scale, count: document.keySections?.length },
    { id: 'risks', label: 'Clause Risks & Redlines', icon: AlertTriangle, count: document.clauseRisks?.length },
    { id: 'entities', label: 'Parties & Entities', icon: Users },
    { id: 'split', label: 'Transcript Viewer', icon: Eye }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Master Document Header */}
      <div className="rounded-xl border border-white/10 bg-legal-surface p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-primary">
              <span>{document.documentType}</span>
              <span>·</span>
              <span className="text-emerald-400 font-medium">{document.groundingConfidence}% grounded</span>
              <span>·</span>
              <span className="text-rose-400 font-medium">{document.riskScore}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {document.title}
            </h1>
            
            <p className="text-[14px] text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              <span>Jurisdiction: <strong className="text-slate-200">{document.jurisdiction}</strong></span>
              <span>·</span>
              <span>Governing Law: <strong className="text-slate-200">{document.governingLaw}</strong></span>
              <span>·</span>
              <span>{document.pages} pages ({document.fileSize})</span>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigateToChat(document)}
              className="flex items-center gap-2 rounded-lg bg-gold-primary px-4 py-2.5 text-[14px] font-semibold text-[#070B14] hover:bg-gold-hover transition-colors shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-[#070B14]" />
              <span>Ask AI About This File</span>
            </button>
            <button
              onClick={onExportMemo}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-legal-surface-elevated px-4 py-2.5 text-[14px] font-medium text-slate-200 hover:border-white/20 hover:text-white transition-colors"
            >
              <Download className="h-4 w-4 text-gold-primary" />
              <span>Export Legal Brief</span>
            </button>
          </div>

        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-4 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-legal-surface-elevated text-gold-primary border border-gold-primary/30 font-semibold'
                    : 'text-slate-400 hover:bg-legal-surface-elevated/50 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-gold-primary' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count !== null && (
                  <span className="ml-1 text-xs font-mono text-slate-500">
                    ({tab.count})
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
            <div className="rounded-xl border border-white/10 bg-legal-surface p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-gold-primary" />
                  Executive Legal Summary
                </h3>
                <span className="text-xs text-emerald-400">
                  Counsel Synthesis
                </span>
              </div>
              
              <p className="text-[15px] sm:text-[16px] text-slate-200 leading-[1.7]">
                {document.summary.executiveSummary}
              </p>

              <div className="rounded-lg bg-legal-canvas border border-white/5 p-4 space-y-1">
                <div className="text-slate-500 font-mono font-semibold uppercase tracking-wider text-[11px]">
                  Procedural Posture / Stage
                </div>
                <div className="text-slate-200 font-serif text-[15px] font-medium">
                  {document.summary.proceduralPosture}
                </div>
              </div>
            </div>

            {/* Key Risk Findings */}
            <div className="rounded-xl border border-rose-500/20 bg-legal-surface p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                <h3 className="text-lg font-serif font-bold text-rose-300 flex items-center gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  Critical Vulnerabilities ({document.summary.keyRiskFindings?.length || 0})
                </h3>
                <span className="text-xs text-rose-400">
                  Requires Review
                </span>
              </div>

              <div className="space-y-3">
                {document.summary.keyRiskFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-lg bg-legal-canvas border border-white/5 text-[14px] text-slate-300">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 font-mono font-bold text-xs flex-shrink-0 mt-0.5 border border-rose-500/20">
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
            <div className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <Sparkles className="h-5 w-5 text-gold-primary" />
                <h3 className="text-lg font-serif font-bold text-white">
                  Counsel Recommendations
                </h3>
              </div>

              <div className="space-y-3">
                {document.summary.legalRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-legal-canvas border border-white/5 text-[14px] text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateToChat(document)}
                className="w-full mt-2 rounded-lg bg-gold-primary/10 hover:bg-gold-primary/20 border border-gold-primary/30 py-2.5 text-[14px] font-semibold text-gold-primary flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Interrogate Findings in AI Chat</span>
              </button>
            </div>

            {/* Quick Parties Summary */}
            <div className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-4 shadow-sm">
              <h4 className="text-[12px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-white/10 pb-3">
                <Building className="h-4 w-4 text-gold-primary" />
                Contracting Parties
              </h4>
              <div className="space-y-3 text-[14px]">
                <div className="p-3 rounded-lg bg-legal-canvas border border-white/5 text-slate-300">
                  <div className="text-xs text-slate-500 font-mono">Party A</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{document.parties.partyA}</div>
                </div>
                <div className="p-3 rounded-lg bg-legal-canvas border border-white/5 text-slate-300">
                  <div className="text-xs text-slate-500 font-mono">Party B</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{document.parties.partyB}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. KEY STATUTORY SECTIONS TAB */}
      {activeSubTab === 'sections' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2.5">
                <Scale className="h-5 w-5 text-gold-primary" />
                Statutory Cross-References
              </h3>
              <p className="text-[14px] text-slate-400 mt-0.5">
                Clauses mapped against Central Acts and Supreme Court precedent doctrines
              </p>
            </div>
            <span className="text-[13px] text-emerald-400">
              {document.keySections?.length} Sections Evaluated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {document.keySections.map((sec, idx) => (
              <div 
                key={idx}
                className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-mono font-bold text-gold-primary">
                      {sec.sectionNumber}
                    </span>
                    <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded ${
                      sec.status.includes('Critical') || sec.status.includes('Void')
                        ? 'text-rose-400'
                        : 'text-gold-primary'
                    }`}>
                      {sec.status}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-lg text-white">
                    {sec.title}
                  </h4>

                  <div className="text-[13px] text-slate-400">
                    Statute: <span className="text-slate-200 font-medium">{sec.statute}</span>
                  </div>

                  <p className="text-[14px] text-slate-300 leading-relaxed pt-1">
                    {sec.analysis}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between text-[13px]">
                  <span className="text-slate-400 font-mono truncate max-w-[240px]">
                    {sec.statutoryReference}
                  </span>
                  <button
                    onClick={() => onOpenCitation(sec.statutoryReference)}
                    className="text-gold-primary hover:text-gold-hover flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>Inspect Statute</span>
                    <ExternalLink className="h-3.5 w-3.5" />
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
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                Clause Risk Matrix & Redlines
              </h3>
              <p className="text-[14px] text-slate-400 mt-0.5">
                Side-by-side clause risk rating, offending text, suggested redline, and statutory grounding
              </p>
            </div>
            <span className="text-[13px] text-rose-400">
              {document.clauseRisks?.length || 0} Clauses Flagged
            </span>
          </div>

          <div className="space-y-5">
            {document.clauseRisks.map((risk) => (
              <div 
                key={risk.id}
                className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-4 shadow-sm hover:border-white/20 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                      risk.riskLevel === 'HIGH'
                        ? 'text-rose-400 bg-rose-500/10'
                        : 'text-gold-primary bg-gold-primary/10'
                    }`}>
                      {risk.riskLevel} RISK (Score: {risk.riskScore}/100)
                    </span>
                    <h4 className="text-lg font-serif font-bold text-white">
                      {risk.clauseName}
                    </h4>
                  </div>
                  <span className="text-[13px] text-slate-400">
                    Category: <strong className="text-slate-200">{risk.category}</strong>
                  </span>
                </div>

                {/* Offending vs Suggested Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  
                  {/* Current Offending Text */}
                  <div className="rounded-lg border border-rose-500/20 bg-legal-canvas p-5 space-y-2">
                    <div className="flex items-center justify-between text-[13px] font-semibold text-rose-400">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4" />
                        Current Offending Clause
                      </span>
                    </div>
                    <p className="text-[14px] text-slate-300 leading-relaxed font-mono bg-legal-surface p-4 rounded border border-white/5">
                      "{risk.offendingText}"
                    </p>
                  </div>

                  {/* Suggested Redline */}
                  <div className="rounded-lg border border-emerald-500/20 bg-legal-canvas p-5 space-y-2">
                    <div className="flex items-center justify-between text-[13px] font-semibold text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        Recommended Legal Redline
                      </span>
                      <button
                        onClick={() => handleCopyText(risk.suggestedRedline, risk.id)}
                        className="text-xs flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {copiedId === risk.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === risk.id ? 'Copied' : 'Copy Redline'}</span>
                      </button>
                    </div>
                    <p className="text-[14px] text-emerald-300/90 leading-relaxed font-mono bg-legal-surface p-4 rounded border border-white/5">
                      {risk.suggestedRedline}
                    </p>
                  </div>

                </div>

                {/* Legal Grounding Footer */}
                <div className="rounded-lg bg-legal-canvas border border-white/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Scale className="h-4 w-4 text-gold-primary flex-shrink-0" />
                    <span><strong className="text-slate-200">Statutory Authority:</strong> {risk.legalGrounding}</span>
                  </div>
                  <button
                    onClick={() => onOpenCitation(risk.legalGrounding)}
                    className="text-gold-primary hover:text-gold-hover font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>View Authority</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. JURISTIC ENTITIES & PARTIES TAB */}
      {activeSubTab === 'entities' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2.5">
                <Users className="h-5 w-5 text-gold-primary" />
                Parties & Entities
              </h3>
              <p className="text-[14px] text-slate-400 mt-0.5">
                Identified corporate entities, authorities, dates, and amounts in this brief
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {document.entities.map((ent, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-legal-surface p-5 space-y-2.5 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-medium text-gold-primary uppercase">
                    {ent.type}
                  </span>
                  {ent.status && (
                    <span className="text-rose-400 font-mono">
                      {ent.status}
                    </span>
                  )}
                </div>

                <div className="font-serif font-bold text-[16px] text-white pt-1">
                  {ent.name}
                </div>

                {ent.location && (
                  <div className="text-[13px] text-slate-400 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>{ent.location}</span>
                  </div>
                )}

                {ent.cin && (
                  <div className="text-[13px] font-mono text-slate-400 pt-1">
                    CIN: <span className="text-slate-200">{ent.cin}</span>
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
          <div className="lg:col-span-7 rounded-xl border border-white/10 bg-legal-surface p-6 space-y-4 shadow-sm max-h-[680px] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-gold-primary" />
                <span className="font-serif font-bold text-[15px] text-slate-200">
                  Document Transcript ({document.pages} Pages)
                </span>
              </div>
              <span className="text-[13px] text-slate-400">
                Indexed Text
              </span>
            </div>

            <div className="font-serif text-[14px] leading-[1.7] text-slate-300 whitespace-pre-wrap space-y-4">
              <div className="p-5 rounded-lg bg-legal-canvas border border-white/5 text-slate-200 leading-relaxed font-mono text-[13px]">
                {document.rawText}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-[13px] text-slate-300 flex items-center gap-2.5">
              <Info className="h-4 w-4 text-gold-primary flex-shrink-0" />
              <span>Full text indexed and cross-referenced with Central Bare Acts.</span>
            </div>
          </div>

          {/* Right: Live Selected Clause Inspector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-gold-primary/30 bg-legal-surface p-6 space-y-4 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[15px] font-serif font-bold text-slate-200 flex items-center gap-2">
                  <Scale className="h-4 w-4 text-gold-primary" />
                  Statutory Annotator
                </span>
                <span className="text-xs text-emerald-400">
                  Grounded
                </span>
              </div>

              {document.clauseRisks && document.clauseRisks.length > 0 ? (
                <div className="space-y-4 text-[14px]">
                  <div className="space-y-1">
                    <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      Flagged Clause:
                    </div>
                    <div className="text-[16px] font-serif font-bold text-white">
                      {document.clauseRisks[0].clauseName}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-legal-canvas border border-rose-500/25 text-rose-200 space-y-1">
                    <div className="text-xs font-mono font-bold uppercase text-rose-400">
                      Problematic Text:
                    </div>
                    <p className="font-mono text-[13px] leading-relaxed">
                      "{document.clauseRisks[0].offendingText}"
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-legal-canvas border border-emerald-500/25 text-emerald-200 space-y-1">
                    <div className="text-xs font-mono font-bold uppercase text-emerald-400">
                      Suggested Indian Law Redline:
                    </div>
                    <p className="font-mono text-[13px] leading-relaxed">
                      {document.clauseRisks[0].suggestedRedline}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-legal-canvas border border-white/5 text-slate-300 space-y-1">
                    <div className="text-xs font-mono font-bold uppercase text-gold-primary">
                      Supreme Court Precedent Grounding:
                    </div>
                    <p className="text-[13px] leading-relaxed">
                      {document.clauseRisks[0].legalGrounding}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateToChat(document)}
                    className="w-full py-3 rounded-lg bg-gold-primary text-[#070B14] font-semibold text-[14px] hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Interrogate Clause in AI Chat</span>
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

export default DocumentAnalysisView;
