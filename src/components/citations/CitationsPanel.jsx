import React, { useState } from 'react';
import { 
  BookOpen, 
  Scale, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  FileText,
  Building2,
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
  const [activeDetailItem, setActiveDetailItem] = useState(null);
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
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
                Indian Jurisprudence Knowledge Base
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Indian Bare Acts & Landmark Supreme Court Judgments
            </h1>
            <p className="text-xs text-slate-400">
              Verified legal authorities, statutory sections, and binding precedents backing NyayaAI's reasoning
            </p>
          </div>

          {/* Toggle between Acts & Cases */}
          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 self-start">
            <button
              onClick={() => setActiveTab('acts')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'acts'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Central Bare Acts ({BARE_ACTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'cases'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Supreme Court Precedents ({LANDMARK_JUDGMENTS.length})</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search statutes, sections (e.g. Section 27, Section 12(5)), or case laws (e.g. Perkins, Satender)..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {activeTab === 'acts' && (
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 1. BARE ACTS LIST */}
      {activeTab === 'acts' && (
        <div className="space-y-6">
          {filteredActs.map((act) => (
            <div 
              key={act.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-slate-700">
                    {act.category} • Year {act.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-1">
                    {act.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {act.keyProvisions.length} Key Provisions Indexed
                </span>
              </div>

              {/* Provisions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {act.keyProvisions.map((prov, pIdx) => (
                  <div 
                    key={pIdx}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-2 hover:border-slate-700 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          {prov.section}
                        </span>
                        <button
                          onClick={() => handleCopy(`${act.name} - ${prov.section}: ${prov.title}\n${prov.description}`, `${act.id}-${pIdx}`)}
                          className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1"
                        >
                          {copiedId === `${act.id}-${pIdx}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-slate-200">
                        {prov.title}
                      </h4>

                      <p className="text-xs text-slate-400 leading-relaxed font-serif italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                        "{prov.description}"
                      </p>

                      {prov.landmarkCase && (
                        <div className="text-[11px] text-amber-300/90 font-medium pt-1">
                          🏛️ Landmark Precedent: <span className="text-white">{prov.landmarkCase}</span>
                        </div>
                      )}

                      {prov.principle && (
                        <p className="text-[11px] text-slate-300">
                          {prov.principle}
                        </p>
                      )}
                    </div>

                    <div className="text-[10px] text-emerald-400 font-medium pt-2 border-t border-slate-800/60 mt-2 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCases.map((caseItem) => (
            <div 
              key={caseItem.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-slate-700">
                    {caseItem.court} • {caseItem.year}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {caseItem.citation}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-white">
                  {caseItem.title}
                </h3>

                <div className="text-xs text-amber-300 font-mono">
                  {caseItem.statuteRef}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {caseItem.summary}
                </p>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-amber-400">Judicial Significance:</strong> {caseItem.significance}
                </div>
              </div>

              {/* Tags & Action */}
              <div className="pt-3 border-t border-slate-800/80 mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {caseItem.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleCopy(`${caseItem.title} - ${caseItem.citation}\n${caseItem.summary}`, caseItem.id)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                >
                  {copiedId === caseItem.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
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
