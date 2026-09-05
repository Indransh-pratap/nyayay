import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Scale, 
  FileText, 
  ShieldCheck, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Loader2,
  Trash2,
  Download,
  ArrowRight
} from 'lucide-react';
import { MOCK_CHAT_RESPONSES, generateDynamicLegalResponse } from '../../data/mockChatQA';

const CAPABILITY_CARDS = [
  {
    id: "cap-risk",
    title: "Analyze Risky Clauses",
    desc: "Scan for unilateral terms, excessive penalties, and void covenants",
    query: "What clauses are risky?"
  },
  {
    id: "cap-laws",
    title: "Find Applicable Laws",
    desc: "Map provisions to BNS 2023, Contract Act, and Arbitration Act",
    query: "Which Indian laws apply?"
  },
  {
    id: "cap-precedents",
    title: "Find Supreme Court Precedents",
    desc: "Retrieve binding ratio decidendi from landmark judgments",
    query: "Find relevant Supreme Court cases"
  },
  {
    id: "cap-explain",
    title: "Explain a Clause",
    desc: "Break down legal terms into clear, plain language",
    query: "Explain this clause simply"
  }
];

const SUGGESTED_QUESTIONS = [
  "What clauses are risky?",
  "Which Indian laws apply?",
  "Find relevant Supreme Court cases",
  "Explain this clause simply"
];

export function LegalChatbot({ 
  activeDoc, 
  onOpenCitation, 
  onOpenDisclaimer, 
  onExportMemo 
}) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI legal retrieval and statutory synthesis
    setTimeout(() => {
      let responseData = MOCK_CHAT_RESPONSES[textToSend];
      if (!responseData) {
        responseData = generateDynamicLegalResponse(textToSend, activeDoc);
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: responseData.confidence || 98.6,
        grounding: responseData.grounding || "Evidence grounded in Indian statutes & law reports",
        text: responseData.answer,
        citations: responseData.citations || [],
        relatedSections: responseData.relatedSections || []
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 900);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col">
      <div className="flex flex-col flex-1 h-[calc(100vh-8.5rem)] rounded-xl border border-white/10 bg-legal-canvas shadow-sm overflow-hidden animate-fade-in">
        
        {/* Top Chat Header - Clean & Simple */}
      <div className="flex items-center justify-between border-b border-white/10 bg-legal-surface px-6 py-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-serif font-bold text-white tracking-tight">
              NyayaAI Legal Assistant
            </h1>
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Grounded in Indian Law
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Active document: <span className="text-slate-200 font-medium">{activeDoc?.title || "Master Services Agreement"}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              title="Clear conversation"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-legal-surface-elevated px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          )}
          <button
            onClick={onExportMemo}
            title="Export conversation as Legal Brief"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-legal-surface-elevated px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-gold-primary" />
            <span>Export Brief</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area - Centered Reading Column (Max 800px) */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
        <div className="max-w-[800px] mx-auto space-y-8">
          
          {/* Welcome State when no messages yet */}
          {messages.length === 0 && (
            <div className="space-y-8 py-4 animate-fade-in">
              
              {/* Simple Human Greeting */}
              <div className="space-y-3 text-center sm:text-left">
                <h2 className="text-2xl font-serif font-bold text-white">
                  How can I help with this document?
                </h2>
                <p className="text-[15px] text-slate-300 leading-relaxed max-w-2xl">
                  Ask questions about your document and get clear answers grounded in Indian law and Supreme Court precedents.
                </p>
                <div className="pt-1 text-[13px] text-slate-400">
                  <span className="font-medium text-slate-300">Grounded in: </span>
                  Indian Contract Act, 1872 · Arbitration & Conciliation Act, 1996 · Bharatiya Nyaya Sanhita, 2023
                </div>
              </div>

              {/* 4 Simple Capability Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CAPABILITY_CARDS.map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => handleSendMessage(cap.query)}
                    className="text-left p-4 rounded-xl border border-white/10 bg-legal-surface hover:bg-legal-surface-elevated hover:border-gold-primary/40 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-semibold text-slate-100 text-[15px] group-hover:text-gold-primary transition-colors">
                        {cap.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-gold-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[13px] text-slate-400 mt-1 leading-normal">
                      {cap.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* Suggested Questions Section */}
              <div className="space-y-3 pt-2">
                <div className="text-[13px] font-medium uppercase tracking-wider text-slate-400">
                  Suggested questions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-left px-4 py-3 rounded-lg border border-white/10 bg-legal-surface text-[14px] text-slate-300 hover:text-white hover:border-white/20 hover:bg-legal-surface-elevated transition-colors flex items-center justify-between"
                    >
                      <span>• {q}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Conversation Messages */}
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div 
                key={msg.id}
                className={`flex gap-4 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${
                  isAi 
                    ? 'bg-legal-surface border-gold-primary/40 text-gold-primary' 
                    : 'bg-legal-surface-elevated border-white/10 text-slate-200'
                }`}>
                  {isAi ? <Scale className="h-5 w-5" /> : <div className="text-xs font-mono font-bold">YOU</div>}
                </div>

                {/* Message Bubble Container */}
                <div className={`space-y-3 flex-1 min-w-0 ${
                  !isAi ? 'max-w-[85%]' : ''
                }`}>
                  
                  {/* AI Metadata header */}
                  {isAi && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-emerald-400 font-medium">
                        Evidence grounded · {msg.confidence}%
                      </span>
                      <span>·</span>
                      <span>Indian statutes & precedents</span>
                    </div>
                  )}

                  {/* Body Content with 16px font and 1.7 line height */}
                  <div className={`rounded-xl p-6 text-[16px] leading-[1.7] ${
                    isAi
                      ? 'border border-white/10 bg-legal-surface text-slate-200 shadow-sm'
                      : 'bg-legal-surface-elevated border border-gold-primary/30 text-white font-medium shadow-sm ml-auto'
                  }`}>
                    <div className="whitespace-pre-wrap font-sans space-y-3">
                      {msg.text.split('\n\n').map((para, i) => {
                        if (para.startsWith('### ')) {
                          return (
                            <h3 key={i} className="text-xl font-serif font-bold text-white pt-2 pb-1 border-b border-white/10">
                              {para.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (para.startsWith('#### ')) {
                          return (
                            <h4 key={i} className="text-[16px] font-serif font-semibold text-gold-primary pt-2 pb-0.5">
                              {para.replace('#### ', '')}
                            </h4>
                          );
                        }
                        if (para.startsWith('> ')) {
                          return (
                            <div key={i} className="p-4 rounded-lg bg-legal-canvas border-l-2 border-gold-primary text-slate-300 text-[15px] my-3 leading-relaxed">
                              {para.replace('> ', '')}
                            </div>
                          );
                        }
                        return <p key={i} className="text-slate-300 leading-[1.7]">{para}</p>;
                      })}
                    </div>
                  </div>

                  {/* Sources Used Section (Clean cards with View source ->) */}
                  {isAi && msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 space-y-2.5">
                      <div className="text-[13px] font-semibold text-slate-400 uppercase tracking-wide">
                        Sources used
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.citations.map((cite, cIdx) => (
                          <div 
                            key={cIdx} 
                            className="rounded-xl border border-white/10 bg-legal-surface p-4 text-[14px] space-y-1.5 hover:border-white/20 transition-colors"
                          >
                            <div className="font-serif font-bold text-slate-100">
                              {cite.title}
                            </div>
                            {cite.citation && (
                              <div className="text-xs text-slate-400 font-mono">{cite.citation}</div>
                            )}
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {cite.text}
                            </p>
                            <button
                              onClick={() => onOpenCitation && onOpenCitation(cite.title)}
                              className="text-[13px] text-gold-primary hover:text-gold-hover flex items-center gap-1.5 pt-1 font-medium transition-colors"
                            >
                              <span>View source</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Action Bar */}
                  {isAi && (
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy response'}</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 items-start animate-fade-in">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-gold-primary/40 bg-legal-surface text-gold-primary">
                <Scale className="h-5 w-5 animate-pulse" />
              </div>
              <div className="rounded-xl border border-white/10 bg-legal-surface p-5 space-y-1.5 max-w-md">
                <div className="flex items-center gap-2 text-[14px] font-medium text-slate-200">
                  <Loader2 className="h-4 w-4 animate-spin text-gold-primary" />
                  <span>Reviewing statutes and precedent records...</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Verifying provisions against the Indian Contract Act and Supreme Court ratios.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sticky Bottom Chat Input - 54-58px height, 16px font */}
      <div className="border-t border-white/10 bg-legal-surface p-4 sm:px-6">
        <div className="max-w-[800px] mx-auto space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask a question about this document..."
                disabled={isTyping}
                className="w-full h-14 rounded-xl border border-white/10 bg-legal-canvas px-5 text-[16px] text-white placeholder-slate-500 focus:border-gold-primary/70 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 disabled:opacity-50 transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="flex items-center justify-center h-14 w-14 rounded-xl bg-gold-primary text-[#070B14] font-bold hover:bg-gold-hover transition-all shadow-sm disabled:opacity-30 active:scale-95 flex-shrink-0"
              aria-label="Send question"
            >
              {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Answers are grounded in Indian law.</span>
            <button
              onClick={onOpenDisclaimer}
              className="hover:text-gold-primary transition-colors underline"
            >
              Advocates Act notice
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default LegalChatbot;
