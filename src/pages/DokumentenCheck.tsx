import { useState, useRef, useCallback, useMemo } from "react";
import { FileText, Upload, Type, Shield, AlertTriangle, Loader2, X, CheckCircle2, ChevronLeft, Lock, Eye, BookOpen, Search, AlertCircle, Clock, DollarSign, Wrench, XCircle, ShieldAlert, Globe, Scale } from "lucide-react";
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
import { IS_ADMIN_PREVIEW } from "@/lib/config";
import { toast } from "sonner";

type InputMode = "upload" | "text";

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
  color: string;
  isPremium: boolean;
}

const SECTION_CONFIG: Record<string, { icon: React.ReactNode; color: string; isPremium: boolean }> = {
  "dokument na prvi pogled": { icon: <Eye className="h-5 w-5" />, color: "border-blue-500/30 bg-blue-500/5", isPremium: false },
  "jednostavno objasnjenje": { icon: <BookOpen className="h-5 w-5" />, color: "border-emerald-500/30 bg-emerald-500/5", isPremium: false },
  "detaljna analiza": { icon: <Search className="h-5 w-5" />, color: "border-purple-500/30 bg-purple-500/5", isPremium: true },
  "sta je stvarno bitno": { icon: <AlertCircle className="h-5 w-5" />, color: "border-amber-500/30 bg-amber-500/5", isPremium: true },
  "rokovi i hitnost": { icon: <Clock className="h-5 w-5" />, color: "border-red-500/30 bg-red-500/5", isPremium: true },
  "finansijska analiza": { icon: <DollarSign className="h-5 w-5" />, color: "border-green-500/30 bg-green-500/5", isPremium: true },
  "konkretne opcije": { icon: <Wrench className="h-5 w-5" />, color: "border-indigo-500/30 bg-indigo-500/5", isPremium: true },
  "ako nista ne uradis": { icon: <XCircle className="h-5 w-5" />, color: "border-orange-500/30 bg-orange-500/5", isPremium: true },
  "rizici i ceste greske": { icon: <ShieldAlert className="h-5 w-5" />, color: "border-rose-500/30 bg-rose-500/5", isPremium: true },
  "sazetak na nasem jeziku": { icon: <Globe className="h-5 w-5" />, color: "border-cyan-500/30 bg-cyan-500/5", isPremium: true },
  "pravna napomena": { icon: <Scale className="h-5 w-5" />, color: "border-muted bg-muted/30", isPremium: false },
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
        color: cfg.color,
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

  // Fallback: if no sections parsed, return entire text as one block
  if (sections.length === 0 && text.trim()) {
    sections.push({
      id: "full",
      icon: <FileText className="h-5 w-5" />,
      title: "Rezultat analize",
      content: text,
      color: "border-border bg-card",
      isPremium: false,
    });
  }

  return sections;
}

export default function DokumentenCheck() {
  const { t } = useLanguage();
  const st = useSectionT();
  const navigate = useNavigate();
  const [mode, setMode] = useState<InputMode>("text");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const submittingRef = useRef(false);

  const isPremium = IS_ADMIN_PREVIEW;

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
    if (mode === "text" && !textInput.trim()) { setError("Nije odabran dokument niti unešen tekst."); return; }
    if (mode === "upload" && !file) { setError("Nije odabran dokument niti unešen tekst."); return; }

    submittingRef.current = true;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    console.log("[DocCheck] Starting analysis:", { mode, fileType: file?.type, fileSize: file?.size, textLength: textInput.length });

    try {
      let payload: { text?: string; imageBase64?: string; mimeType?: string } = {};

      if (mode === "text") {
        payload = { text: textInput.trim() };
      } else if (file) {
        if (file.type.startsWith("image/")) {
          const buffer = await file.arrayBuffer();
          const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
          payload = { imageBase64: base64, mimeType: file.type };
        } else {
          const textContent = await file.text();
          if (textContent.trim().length > 50 && !textContent.includes("\x00")) {
            payload = { text: textContent.trim().slice(0, 8000) };
          } else {
            const buffer = await file.arrayBuffer();
            const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
            payload = { imageBase64: base64, mimeType: "application/pdf" };
          }
        }
      }

      const { data, error: fnError } = await supabase.functions.invoke("document-check", { body: payload });

      if (fnError) {
        console.error("[DocCheck] Function error:", fnError);
        throw new Error("Greška na serveru pri analizi dokumenta. Pokušajte ponovo za nekoliko trenutaka.");
      }
      if (data?.success === false) {
        throw new Error(data.message || "Dokument nije moguće obraditi. Pokušajte s drugim fajlom.");
      }
      if (!data?.analysis) {
        throw new Error("Dokument nije moguće obraditi. Pokušajte s drugim fajlom.");
      }

      setAnalysis(data.analysis);
      console.log("[DocCheck] Analysis successful, length:", data.analysis.length);
    } catch (err: any) {
      console.error("[DocCheck] Error:", err);
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

  return (
    <>
      <section className="border-b bg-primary py-10">
        <div className="container max-w-3xl">
          <button onClick={handleBack} className="back-button">
            <ChevronLeft className="h-4 w-4" /> {st("guide.back")}
          </button>
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("index.nav.docCheck")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80">{st("docCheck.subtitle")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-block rounded-full bg-[hsl(var(--gold))]/20 px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
              2.99€ po dokumentu bez pretplate
            </span>
            <span className="inline-block rounded-full bg-[hsl(var(--success))]/20 px-3 py-1 text-xs font-semibold text-[hsl(var(--success))]">
              Premium uključuje 1 provjeru dnevno
            </span>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-3xl space-y-6">
          {/* Privacy notice */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/5 p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{st("docCheck.privacyTitle")}</p>
              <p className="mt-1 text-muted-foreground">{st("docCheck.privacyDesc")}</p>
            </div>
          </motion.div>

          {/* Mode switcher */}
          <div className="flex gap-2">
            <Button variant={mode === "text" ? "default" : "outline"} size="sm" onClick={() => { setMode("text"); clearFile(); setAnalysis(null); setError(null); }} className="gap-2">
              <Type className="h-4 w-4" /> {st("docCheck.textMode")}
            </Button>
            <Button variant={mode === "upload" ? "default" : "outline"} size="sm" onClick={() => { setMode("upload"); setTextInput(""); setAnalysis(null); setError(null); }} className="gap-2">
              <Upload className="h-4 w-4" /> {st("docCheck.uploadMode")}
            </Button>
          </div>

          {/* Input area */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl border bg-card p-5 shadow-sm">
            {mode === "text" ? (
              <div>
                <label className="mb-2 block text-sm font-semibold">{st("docCheck.textLabel")}</label>
                <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)}
                  placeholder={st("docCheck.textPlaceholder")}
                  className="min-h-[160px] resize-y" maxLength={8000} />
                <p className="mt-1 text-xs text-muted-foreground">{textInput.length} / 8.000 {st("docCheck.chars")}</p>
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-semibold">{st("docCheck.uploadLabel")}</label>
                {!file ? (
                  <div onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border/60 p-10 transition-colors hover:border-primary/40 hover:bg-muted/30">
                    <Upload className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">{st("docCheck.dropHere")}</p>
                    <p className="text-xs text-muted-foreground/60">Max. 10 MB · PDF, JPG, PNG</p>
                  </div>
                ) : (
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearFile} className="h-7 w-7 p-0"><X className="h-4 w-4" /></Button>
                    </div>
                    {filePreviewUrl && <img src={filePreviewUrl} alt="Vorschau" className="mt-3 max-h-64 rounded-lg border object-contain" />}
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileSelect} className="hidden" />
              </div>
            )}
          </motion.div>

          {/* Confirm checkbox */}
          <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
            <Checkbox id="confirm" checked={confirmed} onCheckedChange={(v) => setConfirmed(v === true)} className="mt-0.5" />
            <label htmlFor="confirm" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
              {st("docCheck.confirmLabel")}
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleAnalyze} disabled={loading || !confirmed || (mode === "text" ? !textInput.trim() : !file)} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? st("docCheck.analyzing") : st("docCheck.analyzeBtn")}
            </Button>
            {(analysis || textInput || file || error) && (
              <Button variant="outline" onClick={handleClear}>{st("docCheck.reset")}</Button>
            )}
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
            </motion.div>
          )}

          {/* Paywall */}
          {showPaywall && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center rounded-2xl border border-[hsl(var(--gold))]/20 bg-[#0f1f3d] p-8 text-center">
              <Lock className="h-8 w-8 text-[hsl(var(--gold))] mb-3" />
              <p className="text-sm font-bold text-white mb-2">Dokumenten-Check</p>
              <p className="text-xs text-white/60 mb-4">2.99€ po dokumentu bez pretplate · Premium uključuje 1 provjeru dnevno</p>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <button onClick={() => navigate("/premium")}
                  className="rounded-full bg-[hsl(var(--gold))] px-6 py-3 text-[#0f1f3d] font-bold transition-all hover:opacity-90">
                  BalkanLink Premium — 9.99€/mj.
                </button>
                <button onClick={() => { toast.info("Einzelkauf wird bald verfügbar sein"); setShowPaywall(false); }}
                  className="rounded-full bg-[#0f1f3d] px-6 py-3 text-sm font-bold text-white border border-white/20 transition-all hover:bg-[#0f1f3d]/80">
                  Einzelprüfung — 2.99€
                </button>
              </div>
            </motion.div>
          )}

          {/* RESULTS — Structured section cards */}
          {sections.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {sections.map((section, idx) => {
                const locked = section.isPremium && !isPremium;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative rounded-xl border ${section.color} overflow-hidden`}
                  >
                    {/* Section header */}
                    <div className="flex items-center gap-3 border-b border-border/30 px-5 py-3">
                      <span className="text-primary">{section.icon}</span>
                      <h3 className="text-sm font-bold tracking-wide">{section.title}</h3>
                      {locked && <Lock className="ml-auto h-4 w-4 text-[hsl(var(--gold))]" />}
                    </div>

                    {/* Section content */}
                    <div className={`px-5 py-4 ${locked ? "relative" : ""}`}>
                      {locked && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-b-xl">
                          <Lock className="h-6 w-6 text-[hsl(var(--gold))] mb-2" />
                          <p className="text-xs font-semibold text-foreground mb-2">{st("docCheck.lockText")}</p>
                          <button onClick={() => navigate("/premium")}
                            className="rounded-full bg-[hsl(var(--gold))] px-4 py-2 text-xs font-bold text-[#0f1f3d] transition-all hover:opacity-90">
                            {st("docCheck.premiumCta")}
                          </button>
                        </div>
                      )}
                      <div className={`prose prose-sm max-w-none dark:prose-invert ${locked ? "blur-sm select-none pointer-events-none min-h-[80px]" : ""}`}>
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Disclaimer */}
          <div className="rounded-lg border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground">
            <p>
              <strong>{st("docCheck.disclaimerTitle")}</strong> {st("docCheck.disclaimerText")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
