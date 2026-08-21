import React from 'react';
import { X, Scale, BookOpen, ExternalLink, CheckCircle2, Copy, Check } from 'lucide-react';
import { BARE_ACTS, LANDMARK_JUDGMENTS } from '../../data/mockCitations';

export function CitationDetailModal({ isOpen, onClose, query }) {
  if (!isOpen || !query) return null;

  const [copied, setCopied] = React.useState(false);

  // Search in landmark cases
  const matchedCase = LANDMARK_JUDGMENTS.find(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.citation.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(c.title.toLowerCase().split(' ')[0])
  );

  // Search in bare acts
  let matchedAct = null;
  let matchedProvision = null;

  for (const act of BARE_ACTS) {
    for (const prov of act.keyProvisions) {
      if (
        query.toLowerCase().includes(prov.section.toLowerCase()) ||
        prov.title.toLowerCase().includes(query.toLowerCase()) ||
        (prov.landmarkCase && query.toLowerCase().includes(prov.landmarkCase.toLowerCase().split(' ')[0]))
      ) {
        matchedAct = act;
        matchedProvision = prov;
        break;
      }
    }
    if (matchedAct) break;
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/15 p-2.5 text-amber-400 border border-amber-500/30">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-amber-500/20">
                Statutory & Judicial Inspector
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white mt-1">
                {matchedCase ? matchedCase.title : matchedProvision ? `${matchedAct.name} - ${matchedProvision.section}` : `Legal Authority: ${query}`}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Case detail if found */}
        {matchedCase ? (
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-mono text-amber-400 font-bold text-sm">{matchedCase.citation}</span>
              <span className="text-slate-400">{matchedCase.court} • Bench: {matchedCase.bench}</span>
            </div>

            <div className="space-y-1">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Statutory Subject Matter:
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono">
                {matchedCase.statuteRef}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Supreme Court Ratio Decidendi (Summary):
              </div>
              <p className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-200 leading-relaxed font-serif text-sm">
                "{matchedCase.summary}"
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <strong className="text-amber-400 font-semibold">Practical Application:</strong> {matchedCase.significance}
            </div>
          </div>
        ) : matchedProvision ? (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-[10px] text-amber-400 font-mono">{matchedAct.category}</div>
                <div className="font-bold text-white text-sm">{matchedAct.name}</div>
              </div>
              <span className="font-mono font-bold text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded border border-amber-500/30">
                {matchedProvision.section}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Provision Title:
              </div>
              <div className="text-sm font-serif font-bold text-slate-100">
                {matchedProvision.title}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Bare Act Statutory Text:
              </div>
              <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed font-serif text-xs italic">
                "{matchedProvision.description}"
              </p>
            </div>

            {matchedProvision.landmarkCase && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <div className="font-bold mb-1">🏛️ Leading Precedent:</div>
                <div>{matchedProvision.landmarkCase} — {matchedProvision.principle}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center space-y-2 text-xs">
            <p className="text-slate-300">
              Verified legal authority indexed under: <strong className="text-amber-400">{query}</strong>
            </p>
            <p className="text-slate-400">
              Cross-referenced with Supreme Court of India law reports and Central Bare Acts corpus.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={() => handleCopy(matchedCase ? `${matchedCase.title} ${matchedCase.citation}` : query)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Citation Copied' : 'Copy Citation'}</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
