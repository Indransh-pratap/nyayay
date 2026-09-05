import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  MessageSquareText, 
  BookMarked, 
  Scale, 
  FileCheck2, 
  ShieldCheck, 
  AlertTriangle,
  FolderOpen,
  Scroll,
  FileBarChart,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  activeDoc, 
  onOpenDisclaimer, 
  onOpenUpload,
  onNavigateToSubTab,
  onExportMemo,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  const sections = [
    {
      title: "WORKSPACE",
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          onClick: () => {
            setActiveTab('dashboard');
            setIsMobileMenuOpen && setIsMobileMenuOpen(false);
          },
          isActive: activeTab === 'dashboard'
        },
        {
          id: 'analysis',
          label: 'Documents',
          icon: FolderOpen,
          onClick: () => {
            setActiveTab('analysis');
            setIsMobileMenuOpen && setIsMobileMenuOpen(false);
          },
          isActive: activeTab === 'analysis',
          count: '4'
        },
        {
          id: 'chat',
          label: 'AI Legal Assistant',
          icon: MessageSquareText,
          onClick: () => {
            setActiveTab('chat');
            setIsMobileMenuOpen && setIsMobileMenuOpen(false);
          },
          isActive: activeTab === 'chat'
        }
      ]
    },
    {
      title: "LEGAL RESEARCH",
      items: [
        {
          id: 'citations',
          label: 'Bare Acts',
          icon: BookMarked,
          onClick: () => {
            setActiveTab('citations');
            setIsMobileMenuOpen && setIsMobileMenuOpen(false);
          },
          isActive: activeTab === 'citations'
        },
        {
          id: 'precedents',
          label: 'Supreme Court Cases',
          icon: Scale,
          onClick: () => {
            setActiveTab('citations');
            setIsMobileMenuOpen && setIsMobileMenuOpen(false);
          },
          isActive: false
        }
      ]
    },
    {
      title: "TOOLS",
      items: [
        {
          id: 'clause-risk',
          label: 'Clause Analysis',
          icon: ShieldCheck,
          onClick: () => {
            if (onNavigateToSubTab) {
              onNavigateToSubTab('risks');
            } else {
              setActiveTab('analysis');
            }
            setIsMobileMenuOpen && setIsMobileMenuOpen(false);
          },
          isActive: false
        },
        {
          id: 'export-memo',
          label: 'Compliance',
          icon: FileBarChart,
          onClick: () => {
            if (onExportMemo) onExportMemo();
            setIsMobileMenuOpen && setIsMobileMenuOpen(false);
          },
          isActive: false
        }
      ]
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 space-y-6">
      <div className="space-y-6">
        
        {/* Navigation Sections */}
        <div className="space-y-5">
          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 pb-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                {sec.title}
              </div>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[14px] sm:text-[15px] font-medium transition-all text-left group ${
                        item.isActive
                          ? 'bg-legal-surface-elevated text-white border-l-2 border-gold-primary'
                          : 'text-slate-400 hover:bg-legal-surface hover:text-slate-200 border-l-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors ${
                          item.isActive ? 'text-gold-primary' : 'text-slate-500 group-hover:text-slate-300'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.count && (
                        <span className="text-[12px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-white/5">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Footer & Advocates Act Compliance */}
      <div className="pt-4 border-t border-white/10 space-y-2 text-[13px] text-slate-400">
        <div className="flex items-center justify-between">
          <span>Advocates Act, 1961</span>
          <span className="text-emerald-400 text-xs">● Live</span>
        </div>
        <button
          onClick={onOpenDisclaimer}
          className="text-xs text-slate-500 hover:text-gold-primary transition-colors block text-left"
        >
          Compliance notice & disclaimer
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed 250px) */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#070B14] hidden md:block h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-[#070B14] h-full z-10 border-r border-white/10 overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
