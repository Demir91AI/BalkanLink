import { useState, useRef, useCallback } from "react";
import { FileText, Upload, Type, Shield, AlertTriangle, Loader2, X, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

type InputMode = "upload" | "text";

export default function DokumentenCheck() {
  const { t } = useLanguage();
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
      setError(t("docCheck.formatError") || "Nur PDF, JPG, PNG oder WebP erlaubt.");
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError(t("docCheck.sizeError") || "Maximale Dateigröße: 10 MB.");
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
  }, [t]);

  const handleAnalyze = useCallback(async () => {
    if (!confirmed) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      let payload: { text?: string; imageBase64?: string; mimeType?: string } = {};
      if (mode === "text") {
        if (!textInput.trim()) { setError(t("docCheck.noText") || "Bitte Text eingeben."); setLoading(false); return; }
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
        setError(t("docCheck.noInput") || "Bitte Datei hochladen oder Text eingeben.");
        setLoading(false);
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke("document-check", { body: payload });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || (t("docCheck.analysisFailed") || "Analyse fehlgeschlagen."));
    } finally {
      setLoading(false);
    }
  }, [confirmed, mode, textInput, file, t]);

  const handleClear = useCallback(() => {
    clearFile();
    setTextInput("");
    setAnalysis(null);
    setError(null);
    setConfirmed(false);
  }, [clearFile]);

  return (
    <>
      <section className="border-b bg-primary py-10">
        <div className="container max-w-3xl">
          <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground">
            <ArrowLeft className="h-3 w-3" /> {t("common.back") || "Nazad"}
          </button>
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("index.nav.docCheck")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {t("docCheck.subtitle") || "Brief oder Dokument verstehen — ohne Speicherung, ohne Anmeldung."}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-3xl space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/5 p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">{t("docCheck.privacyTitle") || "Datenschutz"}</p>
              <p className="mt-1 text-muted-foreground">
                {t("docCheck.privacyDesc") || "Bitte schwärzen Sie Namen, Adresse und Aktenzeichen vor dem Hochladen. Dateien werden nicht gespeichert — nur kurz zur Analyse verarbeitet und sofort verworfen."}
              </p>
            </div>
          </motion.div>

          <div className="flex gap-2">
            <Button variant={mode === "text" ? "default" : "outline"} size="sm" onClick={() => { setMode("text"); clearFile(); setAnalysis(null); }} className="gap-2">
              <Type className="h-4 w-4" /> {t("docCheck.textMode") || "Texteingabe (empfohlen)"}
            </Button>
            <Button variant={mode === "upload" ? "default" : "outline"} size="sm" onClick={() => { setMode("upload"); setTextInput(""); setAnalysis(null); }} className="gap-2">
              <Upload className="h-4 w-4" /> {t("docCheck.uploadMode") || "Datei hochladen"}
            </Button>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl border bg-card p-5 shadow-sm">
            {mode === "text" ? (
              <div>
                <label className="mb-2 block text-sm font-semibold">{t("docCheck.textLabel") || "Text aus dem Dokument einfügen"}</label>
                <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)}
                  placeholder={t("docCheck.textPlaceholder") || "Kopieren Sie den Text aus Ihrem Brief/Dokument hierhin…"}
                  className="min-h-[160px] resize-y" maxLength={8000} />
                <p className="mt-1 text-xs text-muted-foreground">{textInput.length} / 8.000 {t("docCheck.chars") || "Zeichen"}</p>
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-semibold">{t("docCheck.uploadLabel") || "Dokument hochladen (PDF, JPG, PNG)"}</label>
                {!file ? (
                  <div onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border/60 p-10 transition-colors hover:border-primary/40 hover:bg-muted/30">
                    <Upload className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">{t("docCheck.dropHere") || "Klicken oder Datei hierher ziehen"}</p>
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
              {t("docCheck.confirmLabel") || "Ich bestätige, dass ich keine sensiblen Daten (Ausweisnummer, Steuer-ID, IBAN, Gesundheitsdaten) hochlade/eingebe."}
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAnalyze} disabled={loading || !confirmed || (mode === "text" ? !textInput.trim() : !file)} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? (t("docCheck.analyzing") || "Analysiere…") : (t("docCheck.analyzeBtn") || "Dokument analysieren")}
            </Button>
            {(analysis || textInput || file) && (
              <Button variant="outline" onClick={handleClear}>{t("docCheck.reset") || "Zurücksetzen"}</Button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          {analysis && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">{t("docCheck.resultTitle") || "Analyse"}</h2>
              <div className="prose prose-sm max-w-none"><ReactMarkdown>{analysis}</ReactMarkdown></div>
              <div className="mt-6 rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                  ⚖️ <strong>{t("docCheck.legalNote") || "Allgemeine Information – keine Rechtsberatung."}</strong> {t("docCheck.legalNoteDesc") || "Für verbindliche Auskünfte wenden Sie sich an die zuständige Behörde oder einen Rechtsanwalt."}
                </p>
              </div>
            </motion.div>
          )}

          <div className="rounded-lg border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground">
            <p>
              <strong>{t("docCheck.disclaimerTitle") || "Datenschutz-Hinweis:"}</strong> {t("docCheck.disclaimerText") || "Hochgeladene Dateien und eingegebene Texte werden ausschließlich zur einmaligen Analyse verwendet und sofort nach der Ausgabe verworfen. Es erfolgt keine dauerhafte Speicherung, kein Tracking und keine Weitergabe an Dritte. BalkanLink ist keine Behörde und bietet keine Rechtsberatung."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
