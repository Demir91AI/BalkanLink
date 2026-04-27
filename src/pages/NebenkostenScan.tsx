import React, { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Upload, FileText, X, Loader2, CheckCircle2, ShieldCheck, Lock, Receipt, Crown, AlertTriangle, ScrollText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NebenkostenResultView from "@/components/nebenkosten/NebenkostenResultView";
import { useTranslation } from "react-i18next";
import AuthGate from "@/components/AuthGate";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { navigateBackOrHome } from "@/lib/navigation";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ALLOWED_EXT = [".pdf", ".jpg", ".jpeg", ".png"];

function fileExt(name: string) { return name.slice(name.lastIndexOf(".")).toLowerCase(); }
function isAllowed(file: File) { return ALLOWED_TYPES.includes(file.type) || ALLOWED_EXT.includes(fileExt(file.name)); }

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = () => reject(new Error("read_failed"));
    reader.readAsDataURL(file);
  });
}

export default function NebenkostenScan() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const localizedNavigate = useLocalizedNavigate();
  const { isPremium } = useSubscription();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);

  const [file, setFile] = useState<File | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((selected: File | null) => {
    if (!selected) return;
    if (!isAllowed(selected)) { setError(t("nebenkostenScan.upload.errorWrongType")); return; }
    if (selected.size > MAX_FILE_SIZE) { setError(t("nebenkostenScan.upload.errorTooLarge")); return; }
    setError(null);
    setAnalysis(null);
    setFile(selected);
  }, [t]);

  const handleAnalyze = useCallback(async () => {
    if (submittingRef.current || loading) return;
    if (!confirmed) { setError(t("nebenkostenScan.upload.errorConsent")); return; }
    if (!file) { setError(t("nebenkostenScan.upload.errorEmpty")); return; }

    submittingRef.current = true;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const base64 = await fileToBase64(file);
      const mimeType = file.type || (file.name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "image/jpeg");
      const { data, error: fnError } = await supabase.functions.invoke("nebenkosten-scan", {
        body: { imageBase64: base64, mimeType },
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.success === false) {
        if (data.errorCode === "QUOTA_EXCEEDED") {
          toast.error(data.message);
          setError(data.message);
          return;
        }
        throw new Error(data.message || "Analiza nije uspjela.");
      }
      if (!data?.analysis) throw new Error("Prazan odgovor.");
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || "Greška.");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  }, [confirmed, file, loading, t]);

  const reset = () => { setFile(null); setAnalysis(null); setError(null); setConfirmed(false); if (fileInputRef.current) fileInputRef.current.value = ""; };

  return (
    <>
      <Helmet>
        <title>{t("nebenkostenScan.seoTitle")}</title>
        <meta name="description" content={t("nebenkostenScan.seoDescription")} />
      </Helmet>

      {/* HERO — premium dark */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1230] via-[#0f1a3d] to-[#0a1230] py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.12),transparent_60%)]" />
        <div className="container max-w-5xl px-4 relative">
          <PageNavBar onBack={() => navigateBackOrHome(navigate)} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/30 px-3 py-1 text-[10px] font-bold tracking-wider text-[hsl(var(--gold))] uppercase">
              <Receipt className="h-3 w-3" />
              {t("nebenkostenScan.hero.eyebrow")}
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              {t("nebenkostenScan.hero.headline")}{" "}
              <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[#e8c870] bg-clip-text text-transparent">
                {t("nebenkostenScan.hero.headlineAccent")}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
              {t("nebenkostenScan.hero.subline")}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl">
              {(["stat1", "stat2", "stat3"] as const).map((k) => (
                <div key={k} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 sm:p-5">
                  <div className="text-xl sm:text-3xl font-black text-[hsl(var(--gold))]">
                    {t(`nebenkostenScan.hero.${k}`)}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs text-white/60 leading-snug">
                    {t(`nebenkostenScan.hero.${k}Label`)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => document.getElementById("scan-upload")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold-dark))] text-[#0a1230] font-bold shadow-lg shadow-[hsl(var(--gold))]/20"
              >
                <Upload className="mr-2 h-4 w-4" />
                {t("nebenkostenScan.hero.ctaPrimary")}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => document.getElementById("scan-how")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="text-white hover:bg-white/10"
              >
                {t("nebenkostenScan.hero.ctaSecondary")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HONESTY BLOCK */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="container max-w-5xl px-4">
          <div className="rounded-3xl border-2 border-border/60 bg-card p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[hsl(var(--gold))]" />
              {t("nebenkostenScan.honesty.title")}
            </h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <p className="text-sm font-bold text-emerald-600 mb-3">{t("nebenkostenScan.honesty.isTitle")}</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{t(`nebenkostenScan.honesty.is${n}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
                <p className="text-sm font-bold text-rose-600 mb-3">{t("nebenkostenScan.honesty.isNotTitle")}</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex gap-2">
                      <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{t(`nebenkostenScan.honesty.isNot${n}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD + RESULT */}
      <section id="scan-upload" className="py-10 sm:py-14 bg-muted/30">
        <AuthGate>
          <div className="container max-w-3xl px-4">
            {!analysis ? (
              <div className="rounded-3xl border border-border bg-card shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground">{t("nebenkostenScan.upload.title")}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t("nebenkostenScan.upload.subtitle")}</p>

                {/* Dropzone */}
                <label
                  htmlFor="nebenkosten-file"
                  className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/5 px-6 py-10 text-center cursor-pointer hover:bg-[hsl(var(--gold))]/10 transition-colors"
                >
                  <div className="rounded-full bg-[hsl(var(--gold))]/15 p-4">
                    <Upload className="h-7 w-7 text-[hsl(var(--gold))]" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t("nebenkostenScan.upload.dropzone")}</p>
                  <p className="text-xs text-muted-foreground">{t("nebenkostenScan.upload.dropzoneHint")}</p>
                  <input
                    id="nebenkosten-file"
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] || null)}
                  />
                </label>

                {file && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
                    <FileText className="h-5 w-5 text-[hsl(var(--gold))] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-muted-foreground hover:text-rose-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Consent */}
                <label className="mt-5 flex items-start gap-3 cursor-pointer">
                  <Checkbox checked={confirmed} onCheckedChange={(v) => setConfirmed(!!v)} className="mt-0.5" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{t("nebenkostenScan.upload.consent")}</span>
                </label>

                {error && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 text-sm text-rose-600">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !file || !confirmed}
                  size="lg"
                  className="mt-6 w-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-[#0a1230] font-bold shadow-lg hover:opacity-95"
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("nebenkostenScan.upload.analyzing")}</>
                  ) : (
                    <><ShieldCheck className="mr-2 h-4 w-4" /> {t("nebenkostenScan.upload.analyze")}</>
                  )}
                </Button>
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-card shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{t("nebenkostenScan.result.title")}</h2>
                  <Button variant="outline" size="sm" onClick={reset}>{t("nebenkostenScan.result.newScan")}</Button>
                </div>

                <NebenkostenResultView analysis={analysis} />

                {!isPremium && (
                  <div className="mt-8 rounded-2xl border-2 border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-transparent p-6 text-center">
                    <Lock className="h-8 w-8 text-[hsl(var(--gold))] mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-foreground">{t("nebenkostenScan.result.premiumLockTitle")}</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{t("nebenkostenScan.result.premiumLockSub")}</p>
                    <Button
                      onClick={() => localizedNavigate("/paketi")}
                      className="mt-4 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-[#0a1230] font-bold"
                    >
                      <Crown className="mr-2 h-4 w-4" />
                      {t("nebenkostenScan.result.premiumCta")}
                    </Button>
                  </div>
                )}

                <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                  <ScrollText className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{t("nebenkostenScan.result.disclaimer")}</span>
                </div>
              </div>
            )}
          </div>
        </AuthGate>
      </section>

      {/* HOW */}
      <section id="scan-how" className="py-12 sm:py-16 bg-background">
        <div className="container max-w-5xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">{t("nebenkostenScan.how.title")}</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-bold text-foreground">{t(`nebenkostenScan.how.step${n}Title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`nebenkostenScan.how.step${n}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRITERIA */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container max-w-5xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">{t("nebenkostenScan.criteria.title")}</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {["frist", "period", "schluessel", "anteil", "reparaturen", "verwaltung", "bank", "leerstand", "heizung", "wasser", "hausmeister", "mathe"].map((k) => (
              <div key={k} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-foreground">{t(`nebenkostenScan.criteria.items.${k}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container max-w-3xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">{t("nebenkostenScan.faq.title")}</h2>
          <div className="mt-8 space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-bold text-foreground">{t(`nebenkostenScan.faq.q${n}`)}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`nebenkostenScan.faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
