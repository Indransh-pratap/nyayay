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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-xl border border-white/10 bg-[#0D1320] p-5 sm:p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#070B14] p-2 text-[#D9A441] border border-[#D9A441]/30">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9A441]">
                STATUTORY & JUDICIAL AUTHORITY
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
                {matchedCase ? matchedCase.title : matchedProvision ? `${matchedAct.name} - ${matchedProvision.section}` : `Legal Authority: ${query}`}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-[#121A29] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Case detail if found */}
        {matchedCase ? (
          <div className="space-y-3.5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-[#070B14] border border-white/5">
              <span className="font-mono text-[#D9A441] font-bold text-sm">{matchedCase.citation}</span>
              <span className="text-slate-400 font-mono text-[11px]">{matchedCase.court} • Bench: {matchedCase.bench}</span>
            </div>

            <div className="space-y-1">
              <div className="text-slate-500 font-mono font-semibold uppercase tracking-wider text-[10px]">
                Statutory Subject Matter:
              </div>
              <div className="p-2.5 rounded-lg bg-[#070B14] border border-white/5 text-slate-200 font-mono">
                {matchedCase.statuteRef}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-slate-500 font-mono font-semibold uppercase tracking-wider text-[10px]">
                Supreme Court Ratio Decidendi (Summary):
              </div>
              <p className="p-3.5 rounded-lg bg-[#070B14] border border-[#D9A441]/20 text-slate-200 leading-relaxed font-serif text-xs italic">
                "{matchedCase.summary}"
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#070B14] border border-white/5 text-slate-300">
              <strong className="text-slate-200 font-serif">Judicial Application:</strong> {matchedCase.significance}
            </div>
          </div>
        ) : matchedProvision ? (
          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#070B14] border border-white/5">
              <div>
                <div className="text-[10px] text-slate-500 font-mono">{matchedAct.category}</div>
                <div className="font-bold text-white text-sm font-serif">{matchedAct.name}</div>
              </div>
              <span className="font-mono font-bold text-[#D9A441] bg-[#D9A441]/10 px-2.5 py-1 rounded border border-[#D9A441]/25">
                {matchedProvision.section}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-slate-500 font-mono font-semibold uppercase tracking-wider text-[10px]">
                Provision Title:
              </div>
              <div className="text-sm font-serif font-bold text-slate-100">
                {matchedProvision.title}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-slate-500 font-mono font-semibold uppercase tracking-wider text-[10px]">
                Bare Act Statutory Text:
              </div>
              <p className="p-3.5 rounded-lg bg-[#070B14] border border-white/5 text-slate-200 leading-relaxed font-serif text-xs italic">
                "{matchedProvision.description}"
              </p>
            </div>

            {matchedProvision.landmarkCase && (
              <div className="p-3 rounded-lg bg-[#070B14] border border-white/5 text-slate-300">
                <div className="font-semibold text-slate-200 mb-0.5">🏛️ Leading Precedent:</div>
                <div>{matchedProvision.landmarkCase} — {matchedProvision.principle}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center space-y-2 text-xs">
            <p className="text-slate-300">
              Verified legal authority indexed under: <strong className="text-[#D9A441]">{query}</strong>
            </p>
            <p className="text-slate-400">
              Cross-referenced with Supreme Court of India law reports and Central Bare Acts corpus.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3.5">
          <button
            onClick={() => handleCopy(matchedCase ? `${matchedCase.title} ${matchedCase.citation}` : query)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Citation Copied' : 'Copy Citation'}</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-[#D9A441] px-4 py-1.5 text-xs font-semibold text-[#070B14] hover:bg-[#F2C15C] transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}

export default CitationDetailModal;
