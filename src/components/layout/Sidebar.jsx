import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  MessageSquareText, 
  BookMarked, 
  History, 
  ShieldCheck, 
  Scale, 
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  activeDoc, 
  onOpenDisclaimer,
  onOpenUpload
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'analysis',
      label: 'Document Intelligence',
      icon: FileSearch,
      badge: activeDoc ? `${activeDoc.clauseRisks.length} Risks` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'chat',
      label: 'AI Legal Assistant',
      icon: MessageSquareText,
      badge: 'Interactive',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'citations',
      label: 'Bare Acts & Precedents',
      icon: BookMarked,
      badge: '5 Acts',
      badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600/40'
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800/80 bg-slate-950/70 p-4 flex flex-col justify-between hidden md:flex">
      
      <div className="space-y-6">
        {/* Active Workspace Pill */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/60 p-3 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium flex items-center gap-1.5 text-slate-300">
              <Scale className="h-3.5 w-3.5 text-amber-400" />
              Jurisdiction
            </span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>
          <p className="text-xs font-semibold text-white truncate">Republic of India</p>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
            <span>Grounding Model:</span>
            <span className="font-mono text-amber-400/90 font-medium">BNS & ICA v2.4</span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="space-y-1">
          <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Document Status Card */}
        {activeDoc && (
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Selected Case File</span>
              <span className="text-amber-400 text-[10px] font-mono">{activeDoc.pages} Pages</span>
            </div>
            <div className="text-xs font-semibold text-slate-200 line-clamp-2">
              {activeDoc.title}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{activeDoc.groundingConfidence}% Grounded in Acts</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer & Regulatory Status */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-2.5 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-amber-300 font-medium mb-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Advocates Act Grounding</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            AI research aid designed for qualified legal professionals.
          </p>
          <button
            onClick={onOpenDisclaimer}
            className="mt-2 text-[10px] text-amber-400 hover:text-amber-300 underline font-medium"
          >
            Read Legal Disclaimer →
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>NyayaAI v2.0-Prod</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Live
          </span>
        </div>
      </div>

    </aside>
  );
}
