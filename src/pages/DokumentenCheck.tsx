import { useState, useRef, useCallback } from "react";
import { FileText, Upload, Type, Shield, AlertTriangle, Loader2, X, CheckCircle2, ChevronLeft, Lock } from "lucide-react";
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

type InputMode = "upload" | "text";

function getDokUsage(): { count: number; date: string } {
  try {
    const raw = localStorage.getItem("dok_used");
    if (raw) {
      const parsed = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      if (parsed.date === today) return parsed;
    }
  } catch {}
  return { count: 0, date: new Date().toISOString().slice(0, 10) };
}

function incrementDokUsage() {
  const today = new Date().toISOString().slice(0, 10);
  const usage = getDokUsage();
  if (usage.date !== today) {
    localStorage.setItem("dok_used", JSON.stringify({ count: 1, date: today }));
  } else {
    localStorage.setItem("dok_used", JSON.stringify({ count: usage.count + 1, date: today }));
  }
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
  const [dokLimitHit, setDokLimitHit] = useState(false);

  const isPremium = IS_ADMIN_PREVIEW; // In production, check real premium status

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
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(selected.type)) {
      setError(st("docCheck.formatError"));
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError(st("docCheck.sizeError"));
      return;
    }
    setError(null);
    setFile(selected);
    setAnalysis(null);
    if (selected.type.startsWith("image/")) {
      setFilePreviewUrl(URL.createObjectURL(selected));
    } else {
      setFilePreviewUrl(null);
    }
  }, [st]);

  const handleAnalyze = useCallback(async () => {
    if (!confirmed) return;

    // Check daily limit (1 free per day)
    if (!isPremium) {
      const usage = getDokUsage();
      if (usage.count >= 1) {
        setDokLimitHit(true);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      let payload: { text?: string; imageBase64?: string; mimeType?: string } = {};
      if (mode === "text") {
        if (!textInput.trim()) { setError(st("docCheck.noText")); setLoading(false); return; }
        payload = { text: textInput.trim() };
      } else if (file) {
        if (file.type.startsWith("image/")) {
          const buffer = await file.arrayBuffer();
          const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
          payload = { imageBase64: base64, mimeType: file.type };
        } else {
          const text = await file.text();
          if (text.trim().length > 50) {
            payload = { text: text.trim().slice(0, 8000) };
          } else {
            const buffer = await file.arrayBuffer();
            const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
            payload = { imageBase64: base64, mimeType: file.type };
          }
        }
      } else {
        setError(st("docCheck.noInput"));
        setLoading(false);
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke("document-check", { body: payload });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || st("docCheck.analysisFailed"));
    } finally {
      setLoading(false);
    }
  }, [confirmed, mode, textInput, file, st]);

  const handleClear = useCallback(() => {
    clearFile();
    setTextInput("");
    setAnalysis(null);
    setError(null);
    setConfirmed(false);
  }, [clearFile]);

  const handleBack = useCallback(() => {
    navigateBackOrHome(navigate);
  }, [navigate]);

  // Split analysis into basic (free) and detailed (premium) sections
  const analysisSections = analysis ? splitAnalysis(analysis) : null;

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
          <p className="mt-2 text-sm text-primary-foreground/80">
            {st("docCheck.subtitle")}
          </p>
          <span className="mt-2 inline-block rounded-full bg-[hsl(var(--success))]/20 px-3 py-1 text-xs font-semibold text-[hsl(var(--success))]">
            {st("docCheck.freeLabel")}
          </span>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-3xl space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/5 p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{st("docCheck.privacyTitle")}</p>
              <p className="mt-1 text-muted-foreground">{st("docCheck.privacyDesc")}</p>
            </div>
          </motion.div>

          <div className="flex gap-2">
            <Button variant={mode === "text" ? "default" : "outline"} size="sm" onClick={() => { setMode("text"); clearFile(); setAnalysis(null); }} className="gap-2">
              <Type className="h-4 w-4" /> {st("docCheck.textMode")}
            </Button>
            <Button variant={mode === "upload" ? "default" : "outline"} size="sm" onClick={() => { setMode("upload"); setTextInput(""); setAnalysis(null); }} className="gap-2">
              <Upload className="h-4 w-4" /> {st("docCheck.uploadMode")}
            </Button>
          </div>

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
                    <p className="text-xs text-muted-foreground/60">Max. 10 MB · PDF, JPG, PNG, WebP</p>
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
                <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleFileSelect} className="hidden" />
              </div>
            )}
          </motion.div>

          <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
            <Checkbox id="confirm" checked={confirmed} onCheckedChange={(v) => setConfirmed(v === true)} className="mt-0.5" />
            <label htmlFor="confirm" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
              {st("docCheck.confirmLabel")}
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAnalyze} disabled={loading || !confirmed || (mode === "text" ? !textInput.trim() : !file)} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? st("docCheck.analyzing") : st("docCheck.analyzeBtn")}
            </Button>
            {(analysis || textInput || file) && (
              <Button variant="outline" onClick={handleClear}>{st("docCheck.reset")}</Button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          {analysisSections && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-0">
              {/* FREE: Basic info */}
              <div className="rounded-t-xl border border-b-0 bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">{st("docCheck.resultTitle")}</h2>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{analysisSections.basic}</ReactMarkdown>
                </div>
              </div>

              {/* PREMIUM: Detailed steps */}
              <div className="relative rounded-b-xl border bg-card p-6 shadow-sm">
                {!isPremium && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-b-xl bg-background/80 backdrop-blur-sm">
                    <Lock className="h-8 w-8 text-[hsl(var(--gold))] mb-3" />
                    <p className="text-sm font-bold text-foreground mb-4 text-center px-4">
                      {st("docCheck.lockText")}
                    </p>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate("/premium")}
                        className="rounded-full bg-[hsl(var(--gold))] px-6 py-3 text-sm font-bold text-[#0f1f3d] transition-all hover:opacity-90"
                      >
                        {st("docCheck.premiumCta")}
                      </button>
                      <button
                        onClick={() => navigate("/premium")}
                        className="rounded-full bg-[#0f1f3d] px-6 py-3 text-sm font-bold text-white border border-white/20 transition-all hover:bg-[#0f1f3d]/80"
                      >
                        {st("docCheck.singleCta")}
                      </button>
                    </div>
                  </div>
                )}
                <div className={!isPremium ? "blur-sm select-none pointer-events-none" : ""}>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{st("docCheck.detailedTitle")}</h3>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{analysisSections.detailed}</ReactMarkdown>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                  ⚖️ <strong>{st("docCheck.legalNote")}</strong> {st("docCheck.legalNoteDesc")}
                </p>
              </div>
            </motion.div>
          )}

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

/** Split AI analysis into basic (free) and detailed (premium) sections */
function splitAnalysis(text: string): { basic: string; detailed: string } {
  const lines = text.split("\n");
  const basicLines: string[] = [];
  const detailedLines: string[] = [];
  let inDetailed = false;
  
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (
      lower.includes("šta uraditi") ||
      lower.includes("koraci") ||
      lower.includes("rješenje") ||
      lower.includes("preporuk") ||
      lower.includes("česte greške") ||
      lower.includes("rok") ||
      lower.includes("predaj") ||
      lower.includes("sljedeći korak")
    ) {
      inDetailed = true;
    }
    if (inDetailed) {
      detailedLines.push(line);
    } else {
      basicLines.push(line);
    }
  }
  
  // If we couldn't split, show first 40% free, rest premium
  if (detailedLines.length === 0 && basicLines.length > 4) {
    const splitAt = Math.ceil(basicLines.length * 0.4);
    return {
      basic: basicLines.slice(0, splitAt).join("\n"),
      detailed: basicLines.slice(splitAt).join("\n"),
    };
  }
  
  return {
    basic: basicLines.join("\n") || "Analiza dokumenta...",
    detailed: detailedLines.join("\n") || "Detaljni koraci nisu dostupni za ovaj dokument.",
  };
}
