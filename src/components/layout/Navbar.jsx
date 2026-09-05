import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, 
  Sparkles, 
  Upload, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  Sun, 
  Moon, 
  AlertTriangle, 
  Download,
  ChevronDown,
  Check,
  Search,
  User,
  Menu,
  X
} from 'lucide-react';

export function Navbar({ 
  activeDoc, 
  onUploadClick, 
  onCitationsClick, 
  onDocSelect, 
  allDocs, 
  isDarkMode, 
  setIsDarkMode,
  onOpenDisclaimer,
  onExportMemo,
  onNavigateToChat,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);
  const [searchDocQuery, setSearchDocQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDocDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDocs = (allDocs || []).filter(doc => 
    doc.title.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
    doc.documentType.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 w-full glass-header">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4 max-w-[1600px] mx-auto">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-legal-surface-elevated transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2.5 select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-legal-surface border border-gold-primary/30 text-gold-primary">
              <Scale className="h-5 w-5" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-white">
              Nyaya<span className="text-gold-primary">AI</span>
            </span>
          </div>
        </div>

        {/* Center: Active Document Context & Switcher */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-2" ref={dropdownRef}>
          <div className="relative w-full">
            <button
              onClick={() => setDocDropdownOpen(!docDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-legal-surface px-3.5 py-2 text-[14px] text-slate-300 hover:border-white/20 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <FileText className="h-4 w-4 text-gold-primary flex-shrink-0" />
                <span className="font-medium text-slate-200 truncate group-hover:text-white">
                  {activeDoc?.title || "Select Document"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 text-[13px]">
                {activeDoc && (
                  <span className="text-emerald-400 font-medium">
                    {activeDoc.groundingConfidence}% grounded
                  </span>
                )}
                <span className="text-slate-500 hover:text-slate-300 text-xs">Change</span>
                <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${docDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {docDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full min-w-[360px] rounded-xl border border-white/10 bg-legal-surface p-2 shadow-2xl z-50 animate-fade-in">
                <div className="p-2 border-b border-white/10 mb-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={searchDocQuery}
                      onChange={(e) => setSearchDocQuery(e.target.value)}
                      placeholder="Search documents..."
                      className="w-full rounded-lg border border-white/10 bg-legal-canvas pl-9 pr-3 py-1.5 text-[14px] text-white placeholder-slate-500 focus:border-gold-primary/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                  {filteredDocs.map((doc) => {
                    const isSelected = activeDoc?.id === doc.id;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => {
                          onDocSelect(doc);
                          setDocDropdownOpen(false);
                          setSearchDocQuery('');
                        }}
                        className={`w-full text-left flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors ${
                          isSelected
                            ? 'bg-gold-primary/10 text-white'
                            : 'hover:bg-legal-surface-elevated text-slate-300'
                        }`}
                      >
                        <div className="truncate">
                          <div className="font-medium text-slate-200 truncate">{doc.title}</div>
                          <div className="text-[13px] text-slate-400 mt-0.5">
                            {doc.documentType} · {doc.pages} pages · {doc.groundingConfidence}% grounded
                          </div>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-gold-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Simplified Actions */}
        <div className="flex items-center gap-3">
          {/* Ask AI Action */}
          {onNavigateToChat && (
            <button
              onClick={() => onNavigateToChat(activeDoc)}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-legal-surface px-3.5 py-2 text-[14px] font-medium text-slate-300 hover:border-white/20 hover:text-white transition-colors"
            >
              <Sparkles className="h-4 w-4 text-gold-primary" />
              <span>Ask AI</span>
            </button>
          )}

          {/* Primary Action: Upload Document */}
          <button
            onClick={onUploadClick}
            className="flex items-center gap-2 rounded-lg bg-gold-primary px-4 py-2 text-[14px] font-semibold text-[#070B14] hover:bg-gold-hover transition-colors shadow-sm"
          >
            <Upload className="h-4 w-4 text-[#070B14]" />
            <span>Upload Document</span>
          </button>

          {/* Profile Pill */}
          <div className="flex items-center pl-1">
            <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-legal-surface px-3 py-1.5 text-[14px]">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-legal-surface-elevated text-gold-primary text-xs font-semibold">
                SC
              </div>
              <span className="hidden xl:inline text-slate-300 text-[13px]">Chambers</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
export default Navbar;
