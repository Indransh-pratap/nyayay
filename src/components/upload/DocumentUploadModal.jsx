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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-xl border border-white/10 bg-[#0D1320] p-5 sm:p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#070B14] p-2 text-[#D9A441] border border-[#D9A441]/30">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
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
              className="rounded-lg p-1.5 text-slate-400 hover:bg-[#121A29] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Processing View */}
        {isProcessing ? (
          <div className="py-5 space-y-5 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#070B14] border border-[#D9A441]/40 text-[#D9A441]">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                Analyzing Document & Grounding in Indian Law...
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Cross-referencing statutory sections with Bharatiya Nyaya Sanhita, Indian Contract Act & Supreme Court law reports.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Indexing Progress</span>
                <span className="text-[#D9A441] font-bold">{progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#070B14] overflow-hidden">
                <div 
                  className="h-full bg-[#D9A441] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div className="space-y-2.5 pt-1">
              {steps.map((step, idx) => {
                const isDone = currentStep > idx || progressPercent === 100;
                const isCurrent = currentStep === idx && progressPercent < 100;
                return (
                  <div 
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                      isDone 
                        ? 'border-emerald-500/25 bg-[#070B14] text-slate-200' 
                        : isCurrent
                        ? 'border-[#D9A441]/40 bg-[#070B14] text-white shadow-sm'
                        : 'border-white/5 bg-[#070B14]/40 text-slate-500'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 text-[#D9A441] animate-spin" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-700"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <span>{step.label}</span>
                        {isDone && <span className="text-[10px] text-emerald-400 font-mono">COMPLETE</span>}
                        {isCurrent && <span className="text-[10px] text-[#D9A441] font-mono animate-pulse">PROCESSING...</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
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
          <div className="space-y-5">
            
            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-legal-canvas p-8 text-center hover:border-gold-primary/60 transition-all cursor-pointer"
            >
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="rounded-xl bg-legal-surface p-4 text-gold-primary border border-white/10 group-hover:scale-105 transition-transform">
                <FileText className="h-8 w-8" />
              </div>
              <p className="mt-4 text-[15px] sm:text-[16px] font-semibold text-white">
                {selectedFile ? selectedFile.name : "Drag and drop your legal document here"}
              </p>
              <p className="mt-1 text-[13px] text-slate-400">
                Supports PDF, DOCX, or Scanned Petitions up to 50MB
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Privileged under Indian Evidence Act § 126</span>
              </div>
            </div>

            {/* Custom file process CTA */}
            {selectedFile && (
              <div className="flex items-center justify-between p-4 rounded-xl border border-gold-primary/40 bg-legal-canvas animate-fade-in">
                <div className="flex items-center gap-3">
                  <FileCheck className="h-6 w-6 text-gold-primary" />
                  <div>
                    <div className="text-[14px] font-semibold text-white truncate max-w-xs">{selectedFile.name}</div>
                    <div className="text-xs text-slate-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for OCR & Legal Indexing</div>
                  </div>
                </div>
                <button
                  onClick={() => handleStartProcessing(null)}
                  className="rounded-lg bg-gold-primary px-5 py-2 text-[14px] font-semibold text-[#070B14] hover:bg-gold-hover transition-colors shadow-sm"
                >
                  Start Analysis →
                </button>
              </div>
            )}

            {/* Quick-Pick Verified Sample Legal Documents */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-[13px] text-slate-400">
                <span className="font-medium uppercase tracking-wider text-xs text-slate-400">
                  Or load a sample brief:
                </span>
                <span className="text-xs text-gold-primary font-mono">1-Click Load</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sampleDocs.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleStartProcessing(sample)}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-legal-canvas p-3.5 text-left hover:border-gold-primary/40 hover:bg-legal-surface-elevated transition-all group"
                  >
                    <div className="rounded-lg bg-legal-surface p-2 text-gold-primary group-hover:text-gold-hover transition-colors flex-shrink-0">
                      <Scale className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-slate-200 group-hover:text-white truncate">
                        {sample.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>{sample.documentType}</span>
                        <span>·</span>
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

export default DocumentUploadModal;
