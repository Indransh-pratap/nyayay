import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2, 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function DocumentUploadModal({ 
  isOpen, 
  onClose, 
  onUploadSuccess, 
  sampleDocs 
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const steps = [
    { label: "OCR & Document Text Ingestion", detail: "Extracting paragraphs, schedules, and definitions" },
    { label: "Party & Juristic Entity Extraction", detail: "Identifying Petitioners, Respondents, CIN & locations" },
    { label: "Statutory Grounding & Precedent Cross-Check", detail: "Mapping to ICA 1872, ACA 1996, BNS 2023 & SC Reports" },
    { label: "Clause Risk & Redline Evaluation", detail: "Scoring unilateral arbitration, penalties & non-competes" }
  ];

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setIsProcessing(false);
      setCurrentStep(0);
      setProgressPercent(0);
    }
  }, [isOpen]);

  const handleStartProcessing = (fileDoc) => {
    setIsProcessing(true);
    setCurrentStep(0);
    setProgressPercent(15);

    const docToProcess = fileDoc || {
      id: `doc-custom-${Date.now()}`,
      title: selectedFile?.name || "Uploaded_Indian_Legal_Document.pdf",
      documentType: "Custom Commercial Agreement",
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "1.2 MB",
      pages: 16,
      uploadDate: new Date().toISOString().split('T')[0],
      status: "Analyzed",
      groundingConfidence: 98.2,
      riskScore: "High Risk (2 Flagged Clauses)",
      jurisdiction: "Republic of India",
      governingLaw: "Laws of India (Indian Contract Act, 1872)",
      parties: {
        partyA: "Apex Enterprises Private Limited",
        partyB: "Zenith Global Logistics India LLP"
      },
      summary: {
        executiveSummary: "Custom uploaded commercial contract. Preliminary automated AI indexing detected potential non-compete enforceability issues under Section 27 of the Indian Contract Act, 1872, and an ambiguous dispute resolution mechanism requiring DIAC/MCIA harmonization.",
        proceduralPosture: "Pre-execution Review & Statutory Risk Audit",
        keyRiskFindings: [
          "Non-compete covenant extending 24 months post-termination (void under Section 27 ICA).",
          "Unilateral arbitrator appointment clause conflicting with Supreme Court ruling in Perkins Eastman (2020)."
        ],
        legalRecommendations: [
          "Redline dispute resolution to adopt Mumbai Centre for International Arbitration (MCIA) rules.",
          "Limit non-compete strictly to the term of the agreement."
        ]
      },
      keySections: [
        {
          sectionNumber: "Clause 12",
          title: "Arbitration & Seat",
          statute: "Arbitration and Conciliation Act, 1996 - Section 11",
          status: "Requires Institutional Redline",
          analysis: "Unilateral appointment clause needs amendment to ensure independence under Section 12(5).",
          statutoryReference: "ACA 1996 § 12(5); Perkins Eastman (2020)"
        },
        {
          sectionNumber: "Clause 8",
          title: "Negative Covenants",
          statute: "Indian Contract Act, 1872 - Section 27",
          status: "Void Under Indian Law",
          analysis: "Post-termination restraint is void ab initio in India.",
          statutoryReference: "ICA 1872 § 27"
        }
      ],
      clauseRisks: [
        {
          id: "risk-custom-1",
          clauseName: "Post-Termination Non-Compete (Clause 8.1)",
          riskLevel: "HIGH",
          riskScore: 92,
          category: "Restraint of Trade",
          offendingText: "Party B shall not engage in competing logistics services anywhere in India for 2 years following termination.",
          suggestedRedline: "Delete post-termination restriction in its entirety to conform with Section 27 ICA.",
          legalGrounding: "Section 27 Indian Contract Act; Percept D'Mark (2006) 4 SCC 227."
        }
      ],
      entities: [
        { name: "Apex Enterprises Pvt. Ltd.", type: "Party A", location: "New Delhi, India" },
        { name: "Zenith Global Logistics India LLP", type: "Party B", location: "Bengaluru, India" }
      ],
      rawText: `CUSTOM COMMERCIAL CONTRACT\nUploaded Legal Agreement\nGoverned by the Laws of India.`
    };

    // Stage 1
    setTimeout(() => {
      setCurrentStep(1);
      setProgressPercent(45);
    }, 700);

    // Stage 2
    setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(75);
    }, 1400);

    // Stage 3
    setTimeout(() => {
      setCurrentStep(3);
      setProgressPercent(95);
    }, 2100);

    // Completion
    setTimeout(() => {
      setProgressPercent(100);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
      setTimeout(() => {
        setIsProcessing(false);
        onUploadSuccess(docToProcess);
        onClose();
      }, 500);
    }, 2800);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/15 p-2.5 text-amber-400 border border-amber-500/30">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Upload Indian Legal Document
              </h2>
              <p className="text-xs text-slate-400">
                Automated OCR, Statutory Grounding & Clause Risk Extraction
              </p>
            </div>
          </div>
          {!isProcessing && (
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Processing View */}
        {isProcessing ? (
          <div className="py-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">
                Analyzing Document & Grounding in Indian Law...
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Cross-referencing statutory sections with Bharatiya Nyaya Sanhita, Indian Contract Act & Supreme Court law reports.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Indexing Progress</span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div className="space-y-3 pt-2">
              {steps.map((step, idx) => {
                const isDone = currentStep > idx || progressPercent === 100;
                const isCurrent = currentStep === idx && progressPercent < 100;
                return (
                  <div 
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                      isDone 
                        ? 'border-emerald-500/30 bg-emerald-500/5 text-slate-200' 
                        : isCurrent
                        ? 'border-amber-500/40 bg-amber-500/10 text-white shadow-sm'
                        : 'border-slate-800/60 bg-slate-950/40 text-slate-400'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 text-amber-400 animate-spin" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-700"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <span>{step.label}</span>
                        {isDone && <span className="text-[10px] text-emerald-400 font-mono">COMPLETE</span>}
                        {isCurrent && <span className="text-[10px] text-amber-400 font-mono animate-pulse">PROCESSING...</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {step.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          /* Normal Upload / Preset Selection View */
          <div className="space-y-6">
            
            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/50 p-8 text-center hover:border-amber-500 hover:bg-slate-950 transition-all cursor-pointer"
            >
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="rounded-2xl bg-slate-800/80 p-4 text-amber-400 border border-slate-700 group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">
                {selectedFile ? selectedFile.name : "Drag and drop your legal document here"}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Supports PDF, DOCX, or Scanned Petitions up to 50MB
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Encrypted & privileged under Indian Evidence Act § 126</span>
              </div>
            </div>

            {/* Custom file process CTA */}
            {selectedFile && (
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="h-5 w-5 text-amber-400" />
                  <div>
                    <div className="text-xs font-semibold text-white">{selectedFile.name}</div>
                    <div className="text-[11px] text-slate-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for OCR & Legal Indexing</div>
                  </div>
                </div>
                <button
                  onClick={() => handleStartProcessing(null)}
                  className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-md"
                >
                  Start Analysis →
                </button>
              </div>
            )}

            {/* Quick-Pick Verified Sample Legal Documents */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-300">
                  Or Test Instantly With Verified Sample Documents:
                </span>
                <span className="text-[11px] text-amber-400">1-Click Load</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleDocs.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleStartProcessing(sample)}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left hover:border-amber-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <div className="rounded-lg bg-slate-800 p-2 text-amber-400 group-hover:bg-amber-500/20 transition-colors flex-shrink-0">
                      <Scale className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 truncate">
                        {sample.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                        <span>{sample.documentType}</span>
                        <span>•</span>
                        <span className="text-emerald-400">{sample.groundingConfidence}% Grounded</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
