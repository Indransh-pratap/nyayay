import React, { useState } from 'react';
import { 
  BookOpen, 
  Scale, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  FileText,
  X,
  Copy,
  Check
} from 'lucide-react';
import { BARE_ACTS, LANDMARK_JUDGMENTS } from '../../data/mockCitations';

export function CitationsPanel({ 
  selectedCitationQuery, 
  onCloseQuery 
}) {
  const [activeTab, setActiveTab] = useState('acts'); // 'acts' | 'cases'
  const [searchQuery, setSearchQuery] = useState(selectedCitationQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Commercial & Civil', 'Dispute Resolution', 'Criminal Law', 'Constitutional Law', 'Technology & Privacy'];

  const filteredActs = BARE_ACTS.filter((act) => {
    const matchesCat = selectedCategory === 'All' || act.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.keyProvisions.some(p => p.section.toLowerCase().includes(searchQuery.toLowerCase()) || p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const filteredCases = LANDMARK_JUDGMENTS.filter((c) => {
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.statuteRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Bare Acts & Supreme Court Cases
          </h1>
          <p className="text-[15px] text-slate-300">
            Verified statutory sections and landmark judgments backing NyayaAI.
          </p>
        </div>

        {/* Toggle between Acts & Cases */}
        <div className="flex items-center rounded-lg bg-legal-surface p-1 border border-white/10 self-start">
          <button
            onClick={() => setActiveTab('acts')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-[14px] font-medium transition-colors ${
              activeTab === 'acts'
                ? 'bg-gold-primary text-[#070B14] font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Bare Acts ({BARE_ACTS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-[14px] font-medium transition-colors ${
              activeTab === 'cases'
                ? 'bg-gold-primary text-[#070B14] font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="h-4 w-4" />
            <span>Supreme Court Cases ({LANDMARK_JUDGMENTS.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="relative w-full">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search statutes, sections (e.g. § 27 ICA, § 12(5) ACA), or case names (e.g. Perkins Eastman)..."
            className="w-full h-12 rounded-xl border border-white/10 bg-legal-surface pl-11 pr-4 text-[15px] text-white placeholder-slate-500 focus:border-gold-primary/70 focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {activeTab === 'acts' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-gold-primary/15 text-gold-primary border border-gold-primary/30 font-semibold'
                    : 'bg-legal-surface text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 1. BARE ACTS LIST */}
      {activeTab === 'acts' && (
        <div className="space-y-6">
          {filteredActs.map((act) => (
            <div 
              key={act.id}
              className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-gold-primary uppercase">
                    {act.category} · Year {act.year}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-1">
                    {act.name}
                  </h3>
                </div>
                <span className="text-[13px] text-slate-400">
                  {act.keyProvisions.length} Key Provisions Indexed
                </span>
              </div>

              {/* Provisions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {act.keyProvisions.map((prov, pIdx) => (
                  <div 
                    key={pIdx}
                    className="rounded-lg border border-white/5 bg-legal-canvas p-5 space-y-3 hover:border-white/15 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-gold-primary bg-gold-primary/10 px-2.5 py-0.5 rounded">
                          {prov.section}
                        </span>
                        <button
                          onClick={() => handleCopy(`${act.name} - ${prov.section}: ${prov.title}\n${prov.description}`, `${act.id}-${pIdx}`)}
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          {copiedId === `${act.id}-${pIdx}` ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedId === `${act.id}-${pIdx}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <h4 className="font-serif font-bold text-[16px] text-slate-100">
                        {prov.title}
                      </h4>

                      <p className="text-[14px] text-slate-300 leading-relaxed font-serif italic bg-legal-surface p-3.5 rounded border border-white/5">
                        "{prov.description}"
                      </p>

                      {prov.landmarkCase && (
                        <div className="text-[13px] text-slate-300 pt-1">
                          🏛️ Landmark Precedent: <span className="text-white font-serif font-medium">{prov.landmarkCase}</span>
                        </div>
                      )}

                      {prov.principle && (
                        <p className="text-[13px] text-slate-400 leading-relaxed">
                          {prov.principle}
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-emerald-400 font-mono pt-2 border-t border-white/5 mt-2 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{prov.relevance}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 2. SUPREME COURT PRECEDENTS LIST */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCases.map((caseItem) => (
            <div 
              key={caseItem.id}
              className="rounded-xl border border-white/10 bg-legal-surface p-6 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-gold-primary">
                    {caseItem.court} · {caseItem.year}
                  </span>
                  <span className="font-mono text-slate-300">
                    {caseItem.citation}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-white">
                  {caseItem.title}
                </h3>

                <div className="text-xs text-gold-primary font-mono">
                  {caseItem.statuteRef}
                </div>

                <p className="text-[14px] text-slate-300 leading-relaxed pt-1">
                  {caseItem.summary}
                </p>

                <div className="p-3.5 rounded-lg bg-legal-canvas border border-white/5 text-[13px] text-slate-400">
                  <strong className="text-slate-200 font-serif">Judicial Ratio:</strong> {caseItem.significance}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/10 mt-2 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {caseItem.tags.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs text-slate-500">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleCopy(`${caseItem.title} - ${caseItem.citation}\n${caseItem.summary}`, caseItem.id)}
                  className="text-[13px] text-gold-primary hover:text-gold-hover flex items-center gap-1 font-medium transition-colors"
                >
                  {copiedId === caseItem.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedId === caseItem.id ? 'Copied' : 'Copy Citation'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CitationsPanel;
