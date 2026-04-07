import React, { useState, useRef, useCallback, useMemo } from "react";
import { FileText, Upload, Type, Shield, AlertTriangle, Loader2, X, CheckCircle2, Lock, Eye, BookOpen, Search, AlertCircle, Clock, DollarSign, Wrench, XCircle, ShieldAlert, Globe, Scale, FileWarning, CalendarClock, Banknote, CheckSquare } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSectionT } from "@/hooks/useSectionT";
import { useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";

import { toast } from "sonner";

type InputMode = "upload";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

function getFileExtension(name: string): string {
  return name.slice(name.lastIndexOf(".")).toLowerCase();
}

function isFileAllowed(file: File): boolean {
  if (ALLOWED_TYPES.includes(file.type)) return true;
  return ALLOWED_EXTENSIONS.includes(getFileExtension(file.name));
}

interface AnalysisSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
  colorClass: string;
  iconColorClass: string;
  isPremium: boolean;
}

const SECTION_CONFIG: Record<string, { icon: React.ReactNode; colorClass: string; iconColorClass: string; isPremium: boolean }> = {
  "dokument na prvi pogled": { icon: <Eye className="h-5 w-5" />, colorClass: "border-blue-500/30 bg-blue-50 dark:bg-blue-950/20", iconColorClass: "text-blue-500", isPremium: false },
  "jednostavno objasnjenje": { icon: <BookOpen className="h-5 w-5" />, colorClass: "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20", iconColorClass: "text-emerald-500", isPremium: false },
  "detaljna analiza": { icon: <Search className="h-5 w-5" />, colorClass: "border-purple-500/30 bg-purple-50 dark:bg-purple-950/20", iconColorClass: "text-purple-500", isPremium: true },
  "sta je stvarno bitno": { icon: <AlertCircle className="h-5 w-5" />, colorClass: "border-amber-500/30 bg-amber-50 dark:bg-amber-950/20", iconColorClass: "text-amber-500", isPremium: true },
  "rokovi i hitnost": { icon: <Clock className="h-5 w-5" />, colorClass: "border-red-500/30 bg-red-50 dark:bg-red-950/20", iconColorClass: "text-red-500", isPremium: true },
  "finansijska analiza": { icon: <DollarSign className="h-5 w-5" />, colorClass: "border-green-500/30 bg-green-50 dark:bg-green-950/20", iconColorClass: "text-green-600", isPremium: true },
  "konkretne opcije": { icon: <Wrench className="h-5 w-5" />, colorClass: "border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/20", iconColorClass: "text-indigo-500", isPremium: true },
  "ako nista ne uradis": { icon: <XCircle className="h-5 w-5" />, colorClass: "border-orange-500/30 bg-orange-50 dark:bg-orange-950/20", iconColorClass: "text-orange-500", isPremium: true },
  "rizici i ceste greske": { icon: <ShieldAlert className="h-5 w-5" />, colorClass: "border-rose-500/30 bg-rose-50 dark:bg-rose-950/20", iconColorClass: "text-rose-500", isPremium: true },
  "sazetak na nasem jeziku": { icon: <Globe className="h-5 w-5" />, colorClass: "border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/20", iconColorClass: "text-cyan-500", isPremium: true },
  "pravna napomena": { icon: <Scale className="h-5 w-5" />, colorClass: "border-muted bg-muted/30", iconColorClass: "text-muted-foreground", isPremium: false },
};

function matchSectionKey(heading: string): string | null {
  const lower = heading.toLowerCase().replace(/[^\w\sčćžšđ]/gi, "").trim();
  for (const key of Object.keys(SECTION_CONFIG)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

function parseAnalysisSections(text: string): AnalysisSection[] {
  const sections: AnalysisSection[] = [];
  const lines = text.split("\n");
  let currentTitle = "";
  let currentKey: string | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (currentKey && currentLines.length > 0) {
      const cfg = SECTION_CONFIG[currentKey];
      sections.push({
        id: currentKey,
        icon: cfg.icon,
        title: currentTitle,
        content: currentLines.join("\n").trim(),
        colorClass: cfg.colorClass,
        iconColorClass: cfg.iconColorClass,
        isPremium: cfg.isPremium,
      });
    }
    currentLines = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentTitle = line.replace(/^##\s*/, "").trim();
      currentKey = matchSectionKey(currentTitle);
    } else {
      currentLines.push(line);
    }
  }
  flush();

  if (sections.length === 0 && text.trim()) {
    sections.push({
      id: "full",
      icon: <FileText className="h-5 w-5" />,
      title: "Rezultat analize",
      content: text,
      colorClass: "border-border bg-card",
      iconColorClass: "text-foreground",
      isPremium: false,
    });
  }

  return sections;
}

/* ── Extract summary info from the first section ── */
function extractSummaryFromSections(sections: AnalysisSection[]): {
  docType: string;
  action: string;
  financial: string;
  deadline: string;
} {
  const firstSection = sections.find((s) => s.id === "dokument na prvi pogled");
  const urgencySection = sections.find((s) => s.id === "rokovi i hitnost");
  const financeSection = sections.find((s) => s.id === "finansijska analiza");
  const actionSection = sections.find((s) => s.id === "konkretne opcije");

  const extractFirstLine = (content: string | undefined) => {
    if (!content) return "—";
    const lines = content.split("\n").filter((l) => l.trim().length > 5);
    const first = lines[0]?.replace(/^[-*•]\s*/, "").replace(/\*\*/g, "").trim();
    return first?.slice(0, 80) || "—";
  };

  // Try to extract document type from first section
  let docType = "Dokument";
  if (firstSection) {
    const tipMatch = firstSection.content.match(/tip[a]?\s*dokumenta[:\s]*([^\n]+)/i);
    if (tipMatch) docType = tipMatch[1].replace(/\*\*/g, "").trim().slice(0, 50);
    else docType = extractFirstLine(firstSection.content);
  }

  // Action needed
  let action = "Pogledaj analizu";
  if (urgencySection) {
    if (urgencySection.content.includes("🚨")) action = "Hitna akcija potrebna";
    else if (urgencySection.content.includes("⚡")) action = "Preporučena akcija";
    else if (urgencySection.content.includes("✅")) action = "Nije potrebna akcija";
    else action = extractFirstLine(urgencySection.content);
  }

  // Financial
  let financial = "Pogledaj finansijsku analizu";
  if (financeSection) {
    const amountMatch = financeSection.content.match(/(\d+[.,]?\d*)\s*€/);
    if (amountMatch) financial = `${amountMatch[0]} identificirano`;
    else financial = extractFirstLine(financeSection.content);
  }

  // Deadline
  let deadline = "Nema vidljivog roka";
  if (urgencySection) {
    const dateMatch = urgencySection.content.match(/\d{1,2}\.\d{1,2}\.\d{2,4}/);
    if (dateMatch) deadline = `Rok: ${dateMatch[0]}`;
    else if (urgencySection.content.toLowerCase().includes("nema")) deadline = "Nema vidljivog roka";
    else deadline = extractFirstLine(urgencySection.content);
  }

  return { docType, action, financial, deadline };
}

export default function DokumentenCheck() {
  const { t } = useLanguage();
  const st = useSectionT();
  const navigate = useNavigate();
  const [mode, setMode] = useState<InputMode>("upload");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewName, setPreviewName] = React.useState<string>('');
  const [confirmed, setConfirmed] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const submittingRef = useRef(false);

  const isPremium = false;

  const clearFile = useCallback(() => {
    setFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [filePreviewUrl]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!isFileAllowed(selected)) {
      setError("Podržani su samo PDF, JPG i PNG fajlovi.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("Fajl je prevelik za analizu. Molimo pokušajte s manjim dokumentom (maks. 10 MB).");
      return;
    }
    setError(null);
    setFile(selected);
    setAnalysis(null);
    setFilePreviewUrl(selected.type.startsWith("image/") ? URL.createObjectURL(selected) : null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (submittingRef.current || loading) return;
    if (!confirmed) { setError("Molimo potvrdite checkbox prije analize."); return; }
    if (!isPremium) { setShowPaywall(true); return; }
    if (!file) { setError("Nije odabran dokument niti unešen tekst."); return; }

    submittingRef.current = true;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      let payload: { text?: string; imageBase64?: string; mimeType?: string } = {};

      if (file) {
        const buffer = await file.arrayBuffer();
        const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
        const mimeType = file.type || (file.name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "image/jpeg");
        payload = { imageBase64: base64, mimeType };
      }

      const { data, error: fnError } = await supabase.functions.invoke("document-check", { body: payload });

      if (fnError) throw new Error("Greška na serveru pri analizi dokumenta. Pokušajte ponovo za nekoliko trenutaka.");
      if (data?.success === false) throw new Error(data.message || "Dokument nije moguće obraditi. Pokušajte s drugim fajlom.");
      if (!data?.analysis) throw new Error("Dokument nije moguće obraditi. Pokušajte s drugim fajlom.");

      setAnalysis(data.analysis);
    } catch (err: any) {
      const message = err.message || "Greška na serveru pri analizi dokumenta.";
      if (message.includes("Edge Function") || message.includes("FunctionsHttpError") || message.includes("fetch")) {
        setError("Greška na serveru pri analizi dokumenta. Pokušajte ponovo za nekoliko trenutaka.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  }, [confirmed, mode, textInput, file, isPremium, loading]);

  const handleClear = useCallback(() => {
    clearFile();
    setTextInput("");
    setAnalysis(null);
    setError(null);
    setConfirmed(false);
    setShowPaywall(false);
    setLoading(false);
    submittingRef.current = false;
  }, [clearFile]);

  const handleBack = useCallback(() => { navigateBackOrHome(navigate); }, [navigate]);

  const sections = useMemo(() => analysis ? parseAnalysisSections(analysis) : [], [analysis]);
  const summary = useMemo(() => sections.length > 0 ? extractSummaryFromSections(sections) : null, [sections]);

  return (
    <>
      {/* ── HEADER ── */}
      <section className="border-b bg-primary py-10 sm:py-14">
        <div className="container max-w-4xl px-4">
          <PageNavBar onBack={handleBack} />
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            {t("index.nav.docCheck")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 max-w-xl leading-relaxed">{st("docCheck.subtitle")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-block rounded-full bg-[hsl(var(--gold))]/20 px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
              2.99€ po dokumentu bez pretplate
            </span>
            <span className="inline-block rounded-full bg-[hsl(var(--success))]/20 px-3 py-1 text-xs font-semibold text-[hsl(var(--success))]">
              Premium uključuje 1 provjeru dnevno
            </span>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container max-w-4xl px-4 space-y-8">
          {/* ── Privacy notice ── */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 rounded-2xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-5 sm:p-6">
            <Shield className="mt-0.5 h-6 w-6 shrink-0 text-[hsl(var(--gold))]" />
            <div>
              <p className="font-bold text-foreground">{st("docCheck.privacyTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{st("docCheck.privacyDesc")}</p>
            </div>
          </motion.div>

          {/* ── Upload mode only — text mode removed ── */}

          {/* ── Input area ── */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
            {(
              <div>
                <label className="mb-3 block text-sm font-bold">{st("docCheck.uploadLabel")}</label>
                {!file ? (
                  <div style={{display:'flex', flexDirection:'column', gap:'12px', width:'100%'}}>

                    <label style={{
                      position:'relative' as const,
                      display:'flex', flexDirection:'column' as const, alignItems:'center',
                      justifyContent:'center', minHeight:'130px', width:'100%',
                      border:'2px dashed #EAB308', borderRadius:'12px',
                      cursor:'pointer', padding:'20px', boxSizing:'border-box' as const,
                      backgroundColor:'#fefce8'
                    }}>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        style={{
                          position:'absolute' as const, inset:0,
                          width:'100%', height:'100%',
                          opacity:0, cursor:'pointer', zIndex:10
                        }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            setSelectedFile(f);
                            setPreviewName(f.name);
                            handleFileSelect(e);
                          }
                        }}
                      />
                      <span style={{fontSize:'40px'}}>📷</span>
                      <strong style={{marginTop:'8px', fontSize:'16px'}}>Kamera</strong>
                      <span style={{color:'#6b7280', fontSize:'13px', marginTop:'4px'}}>
                        Fotografiši dokument
                      </span>
                    </label>

                    <label style={{
                      position:'relative' as const,
                      display:'flex', flexDirection:'column' as const, alignItems:'center',
                      justifyContent:'center', minHeight:'130px', width:'100%',
                      border:'2px dashed #9ca3af', borderRadius:'12px',
                      cursor:'pointer', padding:'20px', boxSizing:'border-box' as const,
                      backgroundColor:'#f9fafb'
                    }}>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,image/*"
                        style={{
                          position:'absolute' as const, inset:0,
                          width:'100%', height:'100%',
                          opacity:0, cursor:'pointer', zIndex:10
                        }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            setSelectedFile(f);
                            setPreviewName(f.name);
                            handleFileSelect(e);
                          }
                        }}
                      />
                      <span style={{fontSize:'40px'}}>📁</span>
                      <strong style={{marginTop:'8px', fontSize:'16px'}}>Fajl sa uređaja</strong>
                      <span style={{color:'#6b7280', fontSize:'13px', marginTop:'4px'}}>
                        PDF, JPG, PNG
                      </span>
                    </label>

                    {previewName !== '' && (
                      <div style={{
                        padding:'12px 16px', backgroundColor:'#f0fdf4',
                        border:'1px solid #86efac', borderRadius:'10px',
                        display:'flex', alignItems:'center', justifyContent:'space-between'
                      }}>
                        <span style={{fontSize:'14px', color:'#166534'}}>
                          ✅ {previewName}
                        </span>
                        <button
                          onClick={() => { setSelectedFile(null); setPreviewName(''); clearFile(); }}
                          style={{
                            background:'none', border:'none', color:'#6b7280',
                            fontSize:'18px', cursor:'pointer', padding:'0 4px'
                          }}
                        >×</button>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="rounded-xl border bg-muted/30 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => { clearFile(); setSelectedFile(null); setPreviewName(''); }} className="h-8 w-8 p-0"><X className="h-4 w-4" /></Button>
                    </div>
                    {filePreviewUrl && <img src={filePreviewUrl} alt="Vorschau" className="mt-4 max-h-64 rounded-lg border object-contain" />}
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Confirm checkbox ── */}
          <div className="flex items-start gap-4 rounded-2xl border bg-card p-5">
            <Checkbox id="confirm" checked={confirmed} onCheckedChange={(v) => setConfirmed(v === true)} className="mt-0.5" />
            <label htmlFor="confirm" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
              {st("docCheck.confirmLabel")}
            </label>
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3">
            <Button onClick={handleAnalyze} disabled={loading || !confirmed || !file} className="gap-2 rounded-xl px-6">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? st("docCheck.analyzing") : st("docCheck.analyzeBtn")}
            </Button>
            {(analysis || textInput || file || error) && (
              <Button variant="outline" onClick={handleClear} className="rounded-xl">{st("docCheck.reset")}</Button>
            )}
          </div>

          {/* ── Error ── */}
          {error && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertTriangle className="h-5 w-5 shrink-0" /> {error}
            </motion.div>
          )}

          {/* ── Paywall ── */}
          {showPaywall && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center rounded-2xl border border-[hsl(var(--gold))]/20 bg-[#0f1f3d] p-10 text-center">
              <Lock className="h-10 w-10 text-[hsl(var(--gold))] mb-4" />
              <p className="text-lg font-bold text-white mb-2">Dokumenten-Check</p>
              <p className="text-sm text-white/60 mb-6 max-w-sm">2.99€ po dokumentu bez pretplate · Premium uključuje 1 provjeru dnevno</p>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button onClick={() => navigate("/pricing")}
                  className="rounded-full bg-[hsl(var(--gold))] px-6 py-3.5 text-[#0f1f3d] font-bold transition-all hover:opacity-90">
                  BalkanLink Premium — 9.99€/mj.
                </button>
                <button onClick={() => { toast.info("Einzelkauf wird bald verfügbar sein"); setShowPaywall(false); }}
                  className="rounded-full bg-[#0f1f3d] px-6 py-3.5 text-sm font-bold text-white border border-white/20 transition-all hover:bg-[#0f1f3d]/80">
                  Einzelprüfung — 2.99€
                </button>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════
              RESULTS — Summary Card + Section Cards
          ══════════════════════════════════════════════════════ */}
          {sections.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

              {/* ── TOP SUMMARY CARD ── */}
              {summary && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent p-6 sm:p-8 shadow-lg"
                >
                  <h2 className="text-lg font-black tracking-tight text-foreground mb-5 flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-[hsl(var(--gold))]" />
                    Pregled dokumenta
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Doc type */}
                    <div className="flex items-start gap-3 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                      <FileWarning className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-500/80 mb-1">Tip dokumenta</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.docType}</p>
                      </div>
                    </div>
                    {/* Action */}
                    <div className={`flex items-start gap-3 rounded-xl p-4 border ${
                      summary.action.includes("Hitna") ? "bg-red-500/10 border-red-500/20" :
                      summary.action.includes("Preporučena") ? "bg-amber-500/10 border-amber-500/20" :
                      "bg-emerald-500/10 border-emerald-500/20"
                    }`}>
                      <AlertCircle className={`h-5 w-5 mt-0.5 shrink-0 ${
                        summary.action.includes("Hitna") ? "text-red-500" :
                        summary.action.includes("Preporučena") ? "text-amber-500" :
                        "text-emerald-500"
                      }`} />
                      <div>
                        <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          summary.action.includes("Hitna") ? "text-red-500/80" :
                          summary.action.includes("Preporučena") ? "text-amber-500/80" :
                          "text-emerald-500/80"
                        }`}>Potrebna akcija</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.action}</p>
                      </div>
                    </div>
                    {/* Financial */}
                    <div className="flex items-start gap-3 rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                      <Banknote className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-green-600/80 mb-1">Finansijski uticaj</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.financial}</p>
                      </div>
                    </div>
                    {/* Deadline */}
                    <div className="flex items-start gap-3 rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                      <CalendarClock className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-purple-500/80 mb-1">Rok</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.deadline}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── SECTION CARDS ── */}
              {sections.map((section, idx) => {
                const locked = section.isPremium && !isPremium;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`relative rounded-2xl border ${section.colorClass} overflow-hidden shadow-sm`}
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-black/5 dark:border-white/5">
                      <span className={section.iconColorClass}>{section.icon}</span>
                      <h3 className="text-base font-bold tracking-tight text-foreground">{section.title}</h3>
                      {locked && <Lock className="ml-auto h-4 w-4 text-[hsl(var(--gold))]" />}
                    </div>

                    {/* Card content */}
                    <div className={`px-6 py-5 sm:py-6 ${locked ? "relative" : ""}`}>
                      {locked && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-b-2xl">
                          <Lock className="h-7 w-7 text-[hsl(var(--gold))] mb-3" />
                          <p className="text-sm font-bold text-foreground mb-3">{st("docCheck.lockText")}</p>
                          <button onClick={() => navigate("/premium")}
                            className="rounded-full bg-[hsl(var(--gold))] px-5 py-2.5 text-xs font-bold text-[#0f1f3d] transition-all hover:opacity-90">
                            {st("docCheck.premiumCta")}
                          </button>
                        </div>
                      )}
                      <div className={`prose prose-sm max-w-none dark:prose-invert
                        prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-li:text-muted-foreground prose-li:leading-relaxed
                        prose-p:text-muted-foreground prose-p:leading-relaxed
                        ${locked ? "blur-sm select-none pointer-events-none min-h-[100px]" : ""}`}
                      >
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* ── Disclaimer ── */}
          <div className="rounded-2xl border border-border/40 bg-muted/20 p-5 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong>{st("docCheck.disclaimerTitle")}</strong> {st("docCheck.disclaimerText")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
