import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Scale, 
  FileText, 
  ShieldCheck, 
  BookOpen, 
  Copy, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  AlertCircle, 
  Layers, 
  HelpCircle, 
  ShieldAlert, 
  Loader2,
  Trash2,
  ChevronDown,
  Download,
  Info,
  CornerDownRight
} from 'lucide-react';
import { PRESET_PROMPTS, MOCK_CHAT_RESPONSES, generateDynamicLegalResponse } from '../../data/mockChatQA';

export function LegalChatbot({ 
  activeDoc, 
  onOpenCitation, 
  onOpenDisclaimer,
  onExportMemo 
}) {
  const [messages, setMessages] = useState([
    {
      id: "welcome-msg",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: 99.4,
      grounding: "Grounding initialized against Indian Bare Acts (BNS, ICA, ACA, DPDP) & Supreme Court Law Reports",
      text: `### ⚖️ Namaste & Welcome to NyayaAI Legal Assistant

I am your specialized **Indian Legal AI Research & Contract Intelligence Assistant**. I am currently indexed on **${activeDoc ? activeDoc.title : "Indian Jurisprudence"}** (${activeDoc ? activeDoc.governingLaw : "Central Bare Acts"}).

#### How I Can Assist You:
* **Statutory Compliance**: Verify clauses against the *Indian Contract Act 1872*, *Arbitration & Conciliation Act 1996*, and *Bharatiya Nyaya Sanhita 2023*.
* **Precedent Retrieval**: Ground queries in binding Supreme Court of India precedents (*Perkins Eastman*, *Vidya Drolia*, *Satender Kumar Antil*).
* **Clause Risk Analysis**: Identify one-sided indemnities, void non-competes (Sec. 27 ICA), or punitive penalties.

*Select one of the suggested legal prompts below or type your custom query:*`,
      citations: [
        {
          type: "Statute",
          title: "Indian Contract Act, 1872",
          court: "Central Bare Act",
          text: "Core legislation governing contract validity, consent, consideration, damages, and void agreements."
        },
        {
          type: "Statute",
          title: "Arbitration & Conciliation Act, 1996",
          court: "Central Bare Act",
          text: "Statutory framework governing domestic and international commercial arbitrations in India."
        }
      ],
      relatedSections: ["ICA 1872", "ACA 1996", "BNS 2023", "DPDP 2023"]
    }
  ]);

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

    // Simulate AI reasoning and streaming delay
    setTimeout(() => {
      // Find preset response or dynamically generate
      let responseData = MOCK_CHAT_RESPONSES[textToSend];
      if (!responseData) {
        responseData = generateDynamicLegalResponse(textToSend, activeDoc);
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: responseData.confidence || 98.4,
        grounding: responseData.grounding || "Evidence Grounded in Indian Law",
        text: responseData.answer,
        citations: responseData.citations || [],
        relatedSections: responseData.relatedSections || []
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1100);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 99.4,
        grounding: "Chat history cleared. Active context: " + (activeDoc?.title || "Indian Legal Corpus"),
        text: `### 🔄 Chat Workspace Reset\n\nAsk any question regarding **${activeDoc ? activeDoc.title : "Indian Law"}**, statutory provisions, or clause validity.`,
        citations: [],
        relatedSections: ["ICA 1872", "ACA 1996"]
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl overflow-hidden animate-fade-in">
      
      {/* Top Chat Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-3.5 gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-500/15 p-2 text-amber-400 border border-amber-500/30">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-serif font-bold text-white">
                NyayaAI Legal Research Assistant
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3" />
                Evidence-Grounded in Indian Law
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Active Context: <span className="text-slate-300 font-medium">{activeDoc?.title || "General Indian Legal Corpus"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportMemo}
            title="Export conversation as Legal Brief"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export Brief</span>
          </button>
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Quick-Chips Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/50 px-4 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-amber-400" />
          Example Prompts:
        </span>
        {PRESET_PROMPTS.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => handleSendMessage(prompt.query)}
            disabled={isTyping}
            className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs text-slate-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all whitespace-nowrap disabled:opacity-50"
          >
            <span>{prompt.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div 
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div className={`flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl border ${
                isAi 
                  ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}>
                {isAi ? <Scale className="h-4 w-4" /> : <div className="text-xs font-bold font-serif">Adv</div>}
              </div>

              {/* Message Bubble */}
              <div className={`space-y-3 max-w-[90%] sm:max-w-[85%] ${
                isAi ? 'flex-1' : ''
              }`}>
                
                {/* AI Grounding Header Tag */}
                {isAi && msg.grounding && (
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      <ShieldCheck className="h-3 w-3" />
                      {msg.confidence}% Evidence Grounded
                    </span>
                    <span className="text-slate-400 font-mono text-[10px] truncate max-w-md">
                      {msg.grounding}
                    </span>
                  </div>
                )}

                {/* Body Content */}
                <div className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-md ${
                  isAi
                    ? 'border border-slate-800 bg-slate-950/70 text-slate-200 prose-invert'
                    : 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-medium shadow-amber-500/10'
                }`}>
                  <div className="whitespace-pre-wrap font-sans space-y-2">
                    {msg.text.split('\n\n').map((para, i) => {
                      if (para.startsWith('### ')) {
                        return <h3 key={i} className="text-base font-serif font-bold text-amber-300 mt-2 mb-1">{para.replace('### ', '')}</h3>;
                      }
                      if (para.startsWith('#### ')) {
                        return <h4 key={i} className="text-sm font-serif font-bold text-white mt-2 mb-1">{para.replace('#### ', '')}</h4>;
                      }
                      if (para.startsWith('> ')) {
                        return (
                          <div key={i} className="p-3 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-amber-200 text-xs italic my-2">
                            {para.replace('> ', '')}
                          </div>
                        );
                      }
                      return <p key={i} className="leading-relaxed">{para}</p>;
                    })}
                  </div>
                </div>

                {/* Citations & Precedent Cards (For AI Responses) */}
                {isAi && msg.citations && msg.citations.length > 0 && (
                  <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                        Supporting Statutory & Case Precedents ({msg.citations.length})
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Verified Supreme Court / Central Acts</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.citations.map((cite, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5 text-xs space-y-1 hover:border-amber-500/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-slate-200 truncate text-[11px]">
                              {cite.title}
                            </span>
                            <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-mono text-amber-400 border border-slate-700">
                              {cite.type}
                            </span>
                          </div>
                          {cite.citation && (
                            <div className="text-[10px] font-mono text-slate-400">{cite.citation}</div>
                          )}
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                            "{cite.text}"
                          </p>
                          <button
                            onClick={() => onOpenCitation(cite.title)}
                            className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-1 font-medium"
                          >
                            <span>Inspect Full Text</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Bar (Copy / Feedback / Timestamp) */}
                {isAi && (
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 px-1">
                    <span>Generated at {msg.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy Legal Memo'}</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {/* Typing Loading Indicator */}
        {isTyping && (
          <div className="flex gap-3 items-start animate-fade-in">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
              <Scale className="h-4 w-4 animate-pulse" />
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-2 max-w-md">
              <div className="flex items-center gap-2 text-xs font-serif text-amber-300">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Grounding in Bare Acts & Supreme Court Precedents...</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Synthesizing statutory sections, calculating evidence grounding score, and formulating counsel guidance.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div className="border-t border-slate-800 bg-slate-950/90 p-4 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask any question about ${activeDoc ? activeDoc.title : "Indian law"}...`}
              disabled={isTyping}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20 disabled:opacity-40 active:scale-95 flex-shrink-0"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>AI generated responses are grounded in verified Indian statutes and law reports.</span>
          <button
            onClick={onOpenDisclaimer}
            className="text-amber-400/80 hover:text-amber-300 underline"
          >
            Advocates Act Notice
          </button>
        </div>
      </div>

    </div>
  );
}
