import React, { useState } from 'react';
import { Scale, Sparkles, Upload, FileText, BookOpen, ShieldCheck, Sun, Moon, AlertTriangle, Download } from 'lucide-react';

export function Navbar({ 
  activeDoc, 
  onUploadClick, 
  onCitationsClick, 
  onDocSelect, 
  allDocs, 
  isDarkMode, 
  setIsDarkMode,
  onOpenDisclaimer,
  onExportMemo
}) {
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-amber-700/10 border border-amber-500/40 text-amber-400 shadow-gold-glow">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Nyaya<span className="text-amber-400">AI</span>
              </span>
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                न्याय AI 2.0
              </span>
              <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Indian Law Grounded
              </span>
            </div>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              Indian Legal Intelligence & Document Analysis Platform
            </p>
          </div>
        </div>

        {/* Center: Active Document Selector Dropdown */}
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <button
              onClick={() => setDocDropdownOpen(!docDropdownOpen)}
              className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-850 hover:text-white transition-all shadow-sm max-w-md truncate"
            >
              <FileText className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
              <span className="text-slate-400 font-medium">Active:</span>
              <span className="font-semibold text-slate-200 truncate">{activeDoc?.title || "Select Document"}</span>
              <span className="ml-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-amber-400/90 border border-slate-700">
                {activeDoc?.groundingConfidence}% Match
              </span>
            </button>

            {docDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-96 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-fade-in"
                onMouseLeave={() => setDocDropdownOpen(false)}
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Switch Active Legal Document
                </div>
                <div className="space-y-1 mt-1 max-h-64 overflow-y-auto">
                  {allDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        onDocSelect(doc);
                        setDocDropdownOpen(false);
                      }}
                      className={`w-full text-left flex items-start gap-2.5 rounded-lg p-2 text-xs transition-colors ${
                        activeDoc?.id === doc.id
                          ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200'
                          : 'hover:bg-slate-800/70 text-slate-300'
                      }`}
                    >
                      <FileText className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-200 truncate">{doc.title}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{doc.documentType}</span>
                          <span>•</span>
                          <span className="text-emerald-400">{doc.groundingConfidence}% Grounded</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick upload button */}
          <button
            onClick={onUploadClick}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/10 active:scale-95"
          >
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload PDF / Doc</span>
          </button>

          {/* Export Legal Memo */}
          <button
            onClick={onExportMemo}
            title="Export Legal Brief / Memo"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline">Export Memo</span>
          </button>

          {/* Bare Acts & Precedents */}
          <button
            onClick={onCitationsClick}
            title="Indian Bare Acts & Citations Repository"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-amber-300 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden xl:inline">Statutes & Precedents</span>
          </button>

          {/* Disclaimer trigger */}
          <button
            onClick={onOpenDisclaimer}
            title="Advocates Act Disclaimer"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-amber-400 transition-colors"
          >
            <AlertTriangle className="h-4 w-4" />
          </button>

          {/* Dark / Light mode toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to Light Parchment Mode" : "Switch to Dark Judicial Mode"}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
