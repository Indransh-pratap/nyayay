import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { DocumentAnalysisView } from './components/analysis/DocumentAnalysisView';
import { LegalChatbot } from './components/chat/LegalChatbot';
import { CitationsPanel } from './components/citations/CitationsPanel';
import { DocumentUploadModal } from './components/upload/DocumentUploadModal';
import { LegalDisclaimerModal } from './components/layout/LegalDisclaimer';
import { CitationDetailModal } from './components/citations/CitationDetailModal';
import { ExportMemoModal } from './components/common/ExportMemoModal';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { fetchDocuments, fetchHealth } from './services/api';
import { LayoutDashboard, FileSearch, MessageSquareText, BookMarked, Upload } from 'lucide-react';

export function App() {
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS);
  const [activeDoc, setActiveDoc] = useState(SAMPLE_DOCUMENTS[0]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'analysis' | 'chat' | 'citations'
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [backendStatus, setBackendStatus] = useState('connecting');

  // Check FastAPI backend connection on mount
  useEffect(() => {
    async function loadData() {
      try {
        const health = await fetchHealth();
        if (health && health.status === 'healthy') {
          setBackendStatus('connected');
          const serverDocs = await fetchDocuments();
          if (serverDocs && serverDocs.length > 0) {
            setDocuments(serverDocs);
            setActiveDoc(serverDocs[0]);
          }
        } else {
          setBackendStatus('offline-mode');
        }
      } catch (e) {
        setBackendStatus('offline-mode');
      }
    }
    loadData();
  }, []);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isExportMemoOpen, setIsExportMemoOpen] = useState(false);
  const [inspectorQuery, setInspectorQuery] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [analysisSubTab, setAnalysisSubTab] = useState('summary');

  // Apply dark mode class to html element
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.remove('bg-slate-50', 'text-slate-900');
    document.body.classList.add('bg-[#070B14]', 'text-[#F5F7FA]');
  }, [isDarkMode]);

  const handleUploadSuccess = (newDoc) => {
    // Add if not already in list
    setDocuments((prev) => {
      const exists = prev.find((d) => d.id === newDoc.id);
      if (exists) return prev;
      return [newDoc, ...prev];
    });
    setActiveDoc(newDoc);
    setAnalysisSubTab('summary');
    setActiveTab('analysis');
  };

  const handleSelectDoc = (doc) => {
    setActiveDoc(doc);
  };

  const handleNavigateToAnalysis = (doc, subTab = 'summary') => {
    if (doc) setActiveDoc(doc);
    setAnalysisSubTab(subTab);
    setActiveTab('analysis');
  };

  const handleNavigateToChat = (doc) => {
    if (doc) setActiveDoc(doc);
    setActiveTab('chat');
  };

  const handleOpenCitation = (query) => {
    setInspectorQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-[#F5F7FA] selection:bg-[#D9A441] selection:text-[#070B14] font-sans antialiased">
      
      {/* Top Navigation */}
      <Navbar
        activeDoc={activeDoc}
        allDocs={documents}
        onDocSelect={handleSelectDoc}
        onUploadClick={() => setIsUploadOpen(true)}
        onCitationsClick={() => setActiveTab('citations')}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onExportMemo={() => setIsExportMemoOpen(true)}
        onNavigateToChat={handleNavigateToChat}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeDoc={activeDoc}
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          onOpenUpload={() => setIsUploadOpen(true)}
          onNavigateToSubTab={(subTab) => handleNavigateToAnalysis(activeDoc, subTab)}
          onExportMemo={() => setIsExportMemoOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Dynamic Center Stage */}
        <main className="flex-1 overflow-y-auto w-full">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <DashboardOverview
              documents={documents}
              activeDoc={activeDoc}
              onSelectDoc={handleSelectDoc}
              onUploadClick={() => setIsUploadOpen(true)}
              onNavigateToAnalysis={handleNavigateToAnalysis}
              onNavigateToChat={handleNavigateToChat}
              onNavigateToCitations={() => setActiveTab('citations')}
            />
          )}

          {/* Document Intelligence & Analysis Tab */}
          {activeTab === 'analysis' && (
            <DocumentAnalysisView
              document={activeDoc}
              activeSubTab={analysisSubTab}
              setActiveSubTab={setAnalysisSubTab}
              onNavigateToChat={handleNavigateToChat}
              onOpenCitation={handleOpenCitation}
              onExportMemo={() => setIsExportMemoOpen(true)}
            />
          )}

          {/* AI Legal Assistant Chatbot Tab */}
          {activeTab === 'chat' && (
            <LegalChatbot
              activeDoc={activeDoc}
              onOpenCitation={handleOpenCitation}
              onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
              onExportMemo={() => setIsExportMemoOpen(true)}
            />
          )}

          {/* Bare Acts & Landmark Precedents Tab */}
          {activeTab === 'citations' && (
            <CitationsPanel
              selectedCitationQuery={inspectorQuery}
              onCloseQuery={() => setInspectorQuery(null)}
            />
          )}

        </main>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden border-t border-white/10 bg-[#0D1320]/95 backdrop-blur-md px-4 py-2 flex items-center justify-around z-30">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'dashboard' ? 'text-[#D9A441]' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'analysis' ? 'text-[#D9A441]' : 'text-slate-400'
          }`}
        >
          <FileSearch className="h-4 w-4" />
          <span>Analysis</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'chat' ? 'text-[#D9A441]' : 'text-slate-400'
          }`}
        >
          <MessageSquareText className="h-4 w-4" />
          <span>Assistant</span>
        </button>
        <button
          onClick={() => setActiveTab('citations')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'citations' ? 'text-[#D9A441]' : 'text-slate-400'
          }`}
        >
          <BookMarked className="h-4 w-4" />
          <span>Bare Acts</span>
        </button>
      </div>

      {/* Modals & Portals */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
        sampleDocs={SAMPLE_DOCUMENTS}
      />

      <LegalDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <CitationDetailModal
        isOpen={!!inspectorQuery}
        onClose={() => setInspectorQuery(null)}
        query={inspectorQuery}
      />

      <ExportMemoModal
        isOpen={isExportMemoOpen}
        onClose={() => setIsExportMemoOpen(false)}
        document={activeDoc}
      />

    </div>
  );
}

export default App;
