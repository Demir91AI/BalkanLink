import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { FileText, Upload, Shield, AlertTriangle, Loader2, X, CheckCircle2, Lock, Eye, BookOpen, Search, AlertCircle, Clock, DollarSign, Wrench, XCircle, ShieldAlert, Globe, Scale, FileWarning, CalendarClock, Banknote, CheckSquare, Crown, ChevronDown, Plus, Info } from "lucide-react";
import AuthGate from "@/components/AuthGate";
import PageNavBar from "@/components/navigation/PageNavBar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout, STRIPE_PRICE_IDS } from "@/lib/stripe";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";

type InputMode = "upload";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024;
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
  // Bosanski naslovi koje vraća edge funkcija (matchaju se kroz substring includes na normalizovan tekst)
  "dokument na prvi pogled": { icon: <Eye className="h-5 w-5" />, colorClass: "border-blue-500/30 bg-blue-950/30", iconColorClass: "text-blue-400", isPremium: false },
  "jednostavno objasnjenje": { icon: <BookOpen className="h-5 w-5" />, colorClass: "border-emerald-500/30 bg-emerald-950/30", iconColorClass: "text-emerald-400", isPremium: false },
  "detaljna analiza": { icon: <Search className="h-5 w-5" />, colorClass: "border-purple-500/30 bg-purple-950/30", iconColorClass: "text-purple-400", isPremium: true },
  "sta je stvarno bitno": { icon: <AlertCircle className="h-5 w-5" />, colorClass: "border-amber-500/30 bg-amber-950/30", iconColorClass: "text-amber-400", isPremium: true },
  "rokovi i hitnost": { icon: <Clock className="h-5 w-5" />, colorClass: "border-red-500/30 bg-red-950/30", iconColorClass: "text-red-400", isPremium: true },
  "finansijska analiza": { icon: <DollarSign className="h-5 w-5" />, colorClass: "border-green-500/30 bg-green-950/30", iconColorClass: "text-green-400", isPremium: true },
  "konkretne opcije": { icon: <Wrench className="h-5 w-5" />, colorClass: "border-indigo-500/30 bg-indigo-950/30", iconColorClass: "text-indigo-400", isPremium: true },
  "ako nista ne uradis": { icon: <XCircle className="h-5 w-5" />, colorClass: "border-orange-500/30 bg-orange-950/30", iconColorClass: "text-orange-400", isPremium: true },
  "rizici i ceste greske": { icon: <ShieldAlert className="h-5 w-5" />, colorClass: "border-rose-500/30 bg-rose-950/30", iconColorClass: "text-rose-400", isPremium: true },
  "sazetak na nasem jeziku": { icon: <Globe className="h-5 w-5" />, colorClass: "border-cyan-500/30 bg-cyan-950/30", iconColorClass: "text-cyan-400", isPremium: true },
  "sazetak": { icon: <Globe className="h-5 w-5" />, colorClass: "border-cyan-500/30 bg-cyan-950/30", iconColorClass: "text-cyan-400", isPremium: true },
  "pravna napomena": { icon: <Scale className="h-5 w-5" />, colorClass: "border-muted bg-muted/30", iconColorClass: "text-muted-foreground", isPremium: false },
};

/**
 * Normalizuje naslov za matching: skida emoji, dijakritike (š→s, č→c, ć→c, ž→z, đ→d),
 * interpunkciju i višestruke razmake. Tako "## 📋 Dokument na prvi pogled" → "dokument na prvi pogled".
 */
function normalizeHeading(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // ć/č/ž/š → c/c/z/s
    .replace(/đ/g, "d")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchSectionKey(heading: string): string | null {
  const normalized = normalizeHeading(heading);
  for (const key of Object.keys(SECTION_CONFIG)) {
    if (normalized.includes(key)) return key;
  }
  return null;
}

function parseAnalysisSections(text: string, fallbackTitle: string): AnalysisSection[] {
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
      title: fallbackTitle,
      content: text,
      colorClass: "border-border bg-card",
      iconColorClass: "text-foreground",
      isPremium: false,
    });
  }

  return sections;
}

function extractSummaryFromSections(sections: AnalysisSection[], t: (k: string, opts?: any) => string) {
  const firstSection = sections.find((s) => s.id === "dokument na prvi pogled");
  const urgencySection = sections.find((s) => s.id === "rokovi i hitnost");
  const financeSection = sections.find((s) => s.id === "finansijska analiza");

  const extractFirstLine = (content: string | undefined) => {
    if (!content) return "—";
    const lines = content.split("\n").filter((l) => l.trim().length > 5);
    const first = lines[0]?.replace(/^[-*•]\s*/, "").replace(/\*\*/g, "").trim();
    return first?.slice(0, 80) || "—";
  };

  let docType = t("documentCheck.results.fallbackDoc");
  if (firstSection) {
    const tipMatch = firstSection.content.match(/(?:tip\s+dokumenta|typ|art)\s*(?:des\s*)?dokument[aes]*[:\s]*([^\n]+)/i);
    if (tipMatch) docType = tipMatch[1].replace(/\*\*/g, "").trim().slice(0, 50);
    else docType = extractFirstLine(firstSection.content);
  }

  let action = t("documentCheck.results.viewAnalysis");
  if (urgencySection) {
    if (urgencySection.content.includes("🚨")) action = t("documentCheck.results.urgent");
    else if (urgencySection.content.includes("⚡")) action = t("documentCheck.results.recommended");
    else if (urgencySection.content.includes("✅")) action = t("documentCheck.results.noActionNeeded");
    else action = extractFirstLine(urgencySection.content);
  }

  let financial = t("documentCheck.results.viewFinancial");
  if (financeSection) {
    const amountMatch = financeSection.content.match(/(\d+[.,]?\d*)\s*€/);
    if (amountMatch) financial = t("documentCheck.results.amountIdentified", { amount: amountMatch[0] });
    else financial = extractFirstLine(financeSection.content);
  }

  let deadline = t("documentCheck.results.noVisibleDeadline");
  if (urgencySection) {
    const dateMatch = urgencySection.content.match(/\d{1,2}\.\d{1,2}\.\d{2,4}/);
    if (dateMatch) deadline = `${t("documentCheck.results.deadlinePrefix")} ${dateMatch[0]}`;
    else if (urgencySection.content.toLowerCase().includes("kein")) deadline = t("documentCheck.results.noVisibleDeadline");
    else deadline = extractFirstLine(urgencySection.content);
  }

  return { docType, action, financial, deadline };
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = () => reject(new Error('Fehler beim Lesen der Datei'));
    reader.readAsDataURL(file);
  });
}

/**
 * Komprimuje sliku na max dimenzije i JPEG kvalitet kako bi se smanjila veličina payload-a.
 * Ne dira PDF-ove. Vraća { base64, mimeType }.
 */
async function fileToCompressedBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (isPdf) {
    return { base64: await fileToBase64(file), mimeType: "application/pdf" };
  }

  // Slike: učitaj, skaliraj na max 1600px duža strana, encode kao JPEG q=0.75
  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Fehler beim Lesen der Datei"));
    reader.readAsDataURL(file);
  });

  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("Fehler beim Laden des Bildes"));
    i.src = dataUrl;
  });

  const MAX_DIM = 1600;
  let { width, height } = img;
  if (width > MAX_DIM || height > MAX_DIM) {
    const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { base64: dataUrl.split(",")[1], mimeType: file.type || "image/jpeg" };
  }
  ctx.drawImage(img, 0, 0, width, height);
  const compressed = canvas.toDataURL("image/jpeg", 0.75);
  return { base64: compressed.split(",")[1], mimeType: "image/jpeg" };
}

/* ── Example document types (endless marquee) ── */
const DOC_EXAMPLE_KEYS = [
  { emoji: "📬", key: "letterFromFinanzamt" },
  { emoji: "🏠", key: "rentalContract" },
  { emoji: "💰", key: "buergergeldNotice" },
  { emoji: "🏥", key: "insuranceLetter" },
  { emoji: "⚠️", key: "mahnung" },
  { emoji: "📋", key: "jobcenterDecision" },
  { emoji: "👶", key: "kindergeldNotice" },
  { emoji: "🍼", key: "elterngeldNotice" },
  { emoji: "💊", key: "krankenkasseLetter" },
  { emoji: "👴", key: "rentenversicherung" },
  { emoji: "📊", key: "schufaReport" },
  { emoji: "💶", key: "lohnabrechnung" },
  { emoji: "🧾", key: "steuerbescheid" },
  { emoji: "✋", key: "kuendigung" },
  { emoji: "💼", key: "arbeitsvertrag" },
  { emoji: "🔥", key: "nebenkostenabrechnung" },
  { emoji: "🚗", key: "bussgeld" },
  { emoji: "🎓", key: "anerkennungBescheid" },
] as const;

export default function DokumentenCheck() {
  const navigate = useNavigate();
  const localizedNavigate = useLocalizedNavigate();
  const { t } = useTranslation("pages");
  const [files, setFiles] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [creditCount, setCreditCount] = useState<number>(0);
  const [premiumRemainingToday, setPremiumRemainingToday] = useState<number>(5);
  const [premiumDailyLimit, setPremiumDailyLimit] = useState<number>(5);
  const [checkoutPending, setCheckoutPending] = useState(false);
  const submittingRef = useRef(false);

  const { isPremium } = useSubscription();
  const { user } = useAuth();

  // Single source of truth: get_doc_check_status RPC vraća sve odjednom
  // (premium + dnevna kvota + plaćeni krediti). Edge funkcija koristi isti RPC.
  const refreshCredits = useCallback(async () => {
    if (!user?.id) {
      setCreditCount(0);
      setPremiumRemainingToday(5);
      return;
    }
    const { data, error } = await supabase.rpc("get_doc_check_status", { uid: user.id });
    if (error) {
      console.error("[DokumentenCheck] get_doc_check_status error:", error.message);
      // Fallback: stari način brojanja kredita
      const { count } = await supabase
        .from("doc_check_credits")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .is("consumed_at", null);
      setCreditCount(count ?? 0);
      return;
    }
    const row = Array.isArray(data) ? data[0] : data;
    setCreditCount(Number(row?.paid_credits ?? 0));
    setPremiumRemainingToday(Number(row?.premium_remaining_today ?? 5));
    setPremiumDailyLimit(Number(row?.premium_daily_limit ?? 5));
  }, [user?.id]);

  // Initial + visibility-change refresh (so returning from Stripe tab updates credits).
  useEffect(() => {
    refreshCredits();
    const onVis = () => { if (document.visibilityState === "visible") refreshCredits(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("focus", refreshCredits);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("focus", refreshCredits);
    };
  }, [refreshCredits]);

  // When a credit becomes available after returning from Stripe, surface a success toast once.
  useEffect(() => {
    if (checkoutPending && creditCount > 0) {
      setCheckoutPending(false);
      setShowPaywall(false);
      toast.success(t("documentCheck.paywall.paymentReadyToast", "Plaćanje je primljeno. Kliknite Provjeri dokument za pokretanje analize."));
    }
  }, [checkoutPending, creditCount, t]);

  const totalSize = useMemo(() => files.reduce((s, f) => s + f.size, 0), [files]);

  const clearFiles = useCallback(() => {
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const removeFile = useCallback((idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list || list.length === 0) return;
    setError(null);
    setFiles((prev) => {
      const next = [...prev];
      for (const f of Array.from(list)) {
        if (next.length >= MAX_FILES) {
          setError(t("documentCheck.errors.tooManyFiles", { max: MAX_FILES }));
          break;
        }
        if (!isFileAllowed(f)) { setError(t("documentCheck.errors.unsupportedFormat")); continue; }
        if (f.size > MAX_FILE_SIZE) { setError(t("documentCheck.errors.fileTooLarge")); continue; }
        const newTotal = next.reduce((s, x) => s + x.size, 0) + f.size;
        if (newTotal > MAX_TOTAL_SIZE) {
          setError(t("documentCheck.errors.totalTooLarge"));
          break;
        }
        if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
        next.push(f);
      }
      return next;
    });
    setAnalysis(null);
  }, [t]);

  // Open Stripe checkout for the one-off 2.99€ purchase. Stripe opens in a new tab;
  // when the user returns, visibilitychange triggers refreshCredits().
  const startOneOffCheckout = useCallback(() => {
    if (!user) { localizedNavigate("/login"); return; }
    setCheckoutPending(true);
    initiateCheckout(STRIPE_PRICE_IDS.DOC_CHECK, user.id, "payment");
  }, [user, localizedNavigate]);

  const handleAnalyze = useCallback(async () => {
    if (submittingRef.current || loading) return;
    if (!confirmed) { setError(t("documentCheck.errors.confirmRequired")); return; }
    if (files.length === 0) { setError(t("documentCheck.errors.noFile")); return; }
    // Pristup: Premium ima dnevnu kvotu (5/dan); ako je istrošena → mora imati plaćeni kredit.
    // Non-premium: mora imati plaćeni kredit (2,99€).
    const hasPremiumQuota = isPremium && premiumRemainingToday > 0;
    if (!hasPremiumQuota && creditCount < 1) { setShowPaywall(true); return; }

    submittingRef.current = true;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setShowPaywall(false);

    try {
      const filesPayload = await Promise.all(
        files.map(async (f) => {
          const { base64, mimeType } = await fileToCompressedBase64(f);
          return { base64, mimeType, name: f.name };
        })
      );
      const payload = {
        files: filesPayload,
        imageBase64: filesPayload[0]?.base64,
        mimeType: filesPayload[0]?.mimeType,
      };

      const { data, error: fnError } = await supabase.functions.invoke("document-check", { body: payload });

      if (fnError) throw new Error(t("documentCheck.errors.serverError"));
      if (data?.success === false) {
        // Backend says payment is required — open paywall and refresh credits.
        if (data.errorCode === "PAYMENT_REQUIRED") {
          await refreshCredits();
          setShowPaywall(true);
          throw new Error(data.message || t("documentCheck.errors.paymentRequired", "Plaćanje 2,99€ je potrebno."));
        }
        throw new Error(data.message || t("documentCheck.errors.processingFailed"));
      }
      if (!data?.analysis) throw new Error(t("documentCheck.errors.processingFailed"));

      setAnalysis(data.analysis);
      // Ako edge funkcija vrati ažurirani status, primijeni odmah (sinhrono);
      // u protivnom uradi RPC refresh kao fallback.
      if (data?.status) {
        setPremiumRemainingToday(Number(data.status.premiumRemainingToday ?? premiumRemainingToday));
        setCreditCount(Number(data.status.paidCredits ?? creditCount));
      } else {
        await refreshCredits();
      }
    } catch (err: any) {
      const message = err.message || t("documentCheck.errors.fallback");
      if (message.includes("Edge Function") || message.includes("FunctionsHttpError") || message.includes("fetch")) {
        setError(t("documentCheck.errors.serverError"));
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  }, [confirmed, files, isPremium, creditCount, premiumRemainingToday, loading, refreshCredits, t]);

  const handleClear = useCallback(() => {
    clearFiles();
    setAnalysis(null);
    setError(null);
    setConfirmed(false);
    setShowPaywall(false);
    setLoading(false);
    submittingRef.current = false;
  }, [clearFiles]);

  const handleBack = useCallback(() => { navigateBackOrHome(navigate); }, [navigate]);

  const sections = useMemo(() => analysis ? parseAnalysisSections(analysis, t("documentCheck.results.fallbackTitle")) : [], [analysis, t]);
  const summary = useMemo(() => sections.length > 0 ? extractSummaryFromSections(sections, t) : null, [sections, t]);

  return (
    <>
      {/* ── HEADER ── */}
      <section className="border-b bg-primary py-10 sm:py-14">
        <div className="container max-w-4xl px-4">
          <PageNavBar onBack={handleBack} showShare />
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            {t("documentCheck.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 max-w-xl leading-relaxed">
            {t("documentCheck.subtitle")}
          </p>

          {/* Document type examples — endless marquee */}
          <div
            className="mt-6 relative overflow-hidden -mx-4 px-0"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
            aria-label={t("documentCheck.examples.letterFromFinanzamt") + ", …"}
          >
            <div className="flex gap-2 w-max animate-marquee">
              {[...DOC_EXAMPLE_KEYS, ...DOC_EXAMPLE_KEYS].map((ex, i) => (
                <span
                  key={`${ex.key}-${i}`}
                  className="shrink-0 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1.5 text-xs font-medium text-primary-foreground whitespace-nowrap"
                >
                  {ex.emoji} {t(`documentCheck.examples.${ex.key}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <AuthGate>
        <div className="container max-w-4xl px-4 space-y-8">

          {/* ── Pricing cards ── */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-card p-5 text-center flex flex-col">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{t("documentCheck.pricing.oneTimeLabel")}</p>
              <p className="text-2xl font-black text-foreground">2,99€</p>
              <p className="text-xs text-muted-foreground mt-1">{t("documentCheck.pricing.oneTimePerCheck")}</p>
              <p className="text-[11px] text-muted-foreground mt-2 flex-1">
                {t("documentCheck.pricing.oneTimeReset")}
              </p>
              <button
                onClick={startOneOffCheckout}
                className="mt-3 block w-full rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-accent transition-colors"
              >
                {t("documentCheck.pricing.buyOneTime")}
              </button>
              {creditCount > 0 && !isPremium && (
                <p className="mt-2 text-[11px] font-semibold text-emerald-600">
                  {t("documentCheck.pricing.creditAvailable", { count: creditCount, defaultValue: "Dostupno: {{count}} provjera" })}
                </p>
              )}
            </div>
            <div className="rounded-2xl border-2 border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/5 p-5 text-center relative flex flex-col">
              <span className="absolute -top-2.5 right-3 rounded-full bg-[hsl(var(--gold))] px-2 py-0.5 text-[8px] font-bold text-white uppercase">{t("documentCheck.pricing.premiumBadge")}</span>
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-2">{t("documentCheck.pricing.premiumLabel")}</p>
              <p className="text-2xl font-black text-foreground">
                9,99€
                <span className="text-sm font-medium text-muted-foreground">{t("documentCheck.pricing.premiumPerMonth")}</span>
              </p>
              <ul className="mt-3 text-[11px] text-muted-foreground text-left space-y-1 flex-1">
                <li className="flex items-start gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                  {t("documentCheck.pricing.premiumFeature1")}
                </li>
                <li className="flex items-start gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                  {t("documentCheck.pricing.premiumFeature2")}
                </li>
                <li className="flex items-start gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                  {t("documentCheck.pricing.premiumFeature3")}
                </li>
              </ul>
              <button
                onClick={() => localizedNavigate("/paketi")}
                className="mt-3 rounded-xl px-3 py-2 text-xs font-bold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}
              >
                {t("documentCheck.pricing.buyPremium")}
              </button>
            </div>
          </div>

          {/* ── Live brojač: koliko je provjera ostalo (Premium dnevna kvota ili plaćeni krediti) ── */}
          {isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-between gap-3 rounded-2xl border p-4 sm:p-5 ${
                premiumRemainingToday > 0
                  ? "border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5"
                  : "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-base font-black"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))", color: "#000" }}
                >
                  {premiumRemainingToday}/{premiumDailyLimit}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm">
                    {premiumRemainingToday > 0
                      ? t("documentCheck.quota.remaining", { count: premiumRemainingToday, defaultValue: "Ostalo ti je {{count}} besplatnih provjera danas" })
                      : t("documentCheck.quota.exhausted", "Iskoristio si dnevni Premium limit")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {premiumRemainingToday > 0
                      ? t("documentCheck.quota.resetHint", "Brojač se resetuje sutra u 00:00 (Berlin)")
                      : creditCount > 0
                        ? t("documentCheck.quota.usingPaid", { count: creditCount, defaultValue: "Imaš {{count}} dodatnih plaćenih provjera" })
                        : t("documentCheck.quota.buyExtra", "Dodatne provjere danas: 2,99€/kom ili sačekaj sutra")}
                  </p>
                </div>
              </div>
              {premiumRemainingToday === 0 && creditCount === 0 && (
                <button
                  onClick={startOneOffCheckout}
                  className="shrink-0 rounded-xl bg-[hsl(var(--gold))] px-4 py-2 text-xs font-bold text-black hover:opacity-90"
                >
                  + 2,99€
                </button>
              )}
            </motion.div>
          )}
          {!isPremium && creditCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4"
            >
              <div
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300 text-lg font-black"
              >
                {creditCount}
              </div>
              <div>
                <p className="font-bold text-sm">{t("documentCheck.quota.paidAvailable", { count: creditCount, defaultValue: "Imaš {{count}} plaćenih provjera spremnih" })}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("documentCheck.quota.paidHint", "Bez isteka — koristi kad god trebaš")}</p>
              </div>
            </motion.div>
          )}

          {/* ── Privacy notice ── */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 rounded-2xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-5 sm:p-6">
            <Shield className="mt-0.5 h-6 w-6 shrink-0 text-[hsl(var(--gold))]" />
            <div>
              <p className="font-bold text-foreground">{t("documentCheck.privacy.title")}</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t("documentCheck.privacy.body")}</p>
            </div>
          </motion.div>

          {/* ── Upload area ── */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
            <div>
              <label className="mb-3 block text-sm font-bold">{t("documentCheck.upload.label")}</label>

              {/* Info: više stranica */}
              <div className="mb-4 rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-3 sm:p-4">
                <div className="flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-[hsl(var(--gold))] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-foreground">{t("documentCheck.upload.multiPageTitle")}</p>
                    <p className="text-muted-foreground mt-1">{t("documentCheck.upload.multiPageHint")}</p>
                  </div>
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:'12px', width:'100%'}}>
                {/* Glavni dropzone — samo file picker, BEZ capture (rješava Android/PWA bug) */}
                <label className="relative flex flex-col items-center justify-center min-h-[160px] w-full border-2 border-dashed border-[hsl(var(--gold))] rounded-xl cursor-pointer p-6 bg-[hsl(var(--gold))]/5 hover:bg-[hsl(var(--gold))]/10 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                  <Upload className="h-10 w-10 text-[hsl(var(--gold))] mb-2" />
                  <strong className="text-base">{t("documentCheck.upload.chooseFile")}</strong>
                  <span className="text-sm text-muted-foreground mt-1">{t("documentCheck.upload.hint")}</span>
                </label>

                {/* Posebno dugme za kameru — single shot, capture=environment radi pouzdano */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("documentCheck.upload.or")}</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-xl border-2 border-[hsl(var(--gold))]/40 bg-card hover:bg-[hsl(var(--gold))]/5 transition-colors px-4 py-3 font-semibold text-foreground"
                >
                  <Camera className="h-5 w-5 text-[hsl(var(--gold))]" />
                  {t("documentCheck.upload.takePhoto")}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={cameraInputRef}
                  className="hidden"
                  onChange={(e) => { addFiles(e.target.files); if (cameraInputRef.current) cameraInputRef.current.value = ""; }}
                />

                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  {t("documentCheck.upload.deletedAfter")}
                </p>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                      <span>{t("documentCheck.upload.filesCount", { count: files.length, max: MAX_FILES })}</span>
                      <span>{(totalSize / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                    <ul className="space-y-2">
                      {files.map((f, idx) => (
                        <li key={`${f.name}-${idx}`} className="flex items-center justify-between gap-2 rounded-xl border border-emerald-800 bg-emerald-900/20 px-3 py-2.5">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span className="text-sm text-emerald-400 truncate">{f.name}</span>
                            <span className="text-[11px] text-muted-foreground shrink-0">({(f.size / 1024).toFixed(0)} KB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-muted-foreground hover:text-foreground p-1 shrink-0"
                            aria-label={t("documentCheck.upload.remove")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    {files.length < MAX_FILES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/5 hover:bg-[hsl(var(--gold))]/10 px-3 py-2.5 text-xs font-semibold text-[hsl(var(--gold))] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        {t("documentCheck.upload.addMore")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── Confirm checkbox ── */}
          <div className="flex items-start gap-4 rounded-2xl border bg-card p-5">
            <Checkbox id="confirm" checked={confirmed} onCheckedChange={(v) => setConfirmed(v === true)} className="mt-0.5" />
            <label htmlFor="confirm" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
              {t("documentCheck.confirm")}
            </label>
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-3">
            <Button onClick={handleAnalyze} disabled={loading || !confirmed || files.length === 0} className="gap-2 rounded-xl px-6">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? t("documentCheck.buttons.checking") : t("documentCheck.buttons.checkDocument")}
            </Button>
            {(analysis || files.length > 0 || error) && (
              <Button variant="outline" onClick={handleClear} className="rounded-xl">{t("documentCheck.buttons.reset")}</Button>
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
              className="flex flex-col items-center rounded-2xl border border-[hsl(var(--gold))]/20 bg-primary p-10 text-center">
              <Lock className="h-10 w-10 text-[hsl(var(--gold))] mb-4" />
              <p className="text-lg font-bold text-primary-foreground mb-2">{t("documentCheck.paywall.title")}</p>
              <p className="text-sm text-primary-foreground/60 mb-6 max-w-sm">
                {t("documentCheck.paywall.subtitle")}
              </p>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                  onClick={() => localizedNavigate("/paketi")}
                  className="rounded-full px-6 py-3.5 font-bold transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
                    color: "hsl(var(--gold-foreground))"
                  }}
                >
                  <Crown className="inline-block mr-1.5 h-4 w-4" />
                  {t("documentCheck.paywall.premiumCta")}
                </button>
                <p className="text-[11px] text-primary-foreground/50">
                  {t("documentCheck.paywall.premiumPerk")}
                </p>
                <div className="flex items-center gap-2 my-1">
                  <div className="flex-1 h-px bg-primary-foreground/10" />
                  <span className="text-[11px] text-primary-foreground/40">{t("documentCheck.paywall.or")}</span>
                  <div className="flex-1 h-px bg-primary-foreground/10" />
                </div>
                <button
                  onClick={startOneOffCheckout}
                  className="rounded-full px-6 py-3 text-sm font-semibold border border-primary-foreground/20 text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground/40 transition-all text-center"
                >
                  {t("documentCheck.paywall.oneTimeCta")}
                </button>
                <p className="text-[11px] text-primary-foreground/40">
                  {t("documentCheck.paywall.oneTimeReset")}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Example analysis (collapsible) ── */}
          {!analysis && (
            <Collapsible open={showExample} onOpenChange={setShowExample}>
              <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-xl border bg-card px-5 py-4 text-sm font-semibold hover:bg-accent/50 transition-colors">
                <Eye className="h-4 w-4 text-[hsl(var(--gold))]" />
                <span className="flex-1 text-left">{t("documentCheck.example.trigger")}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showExample ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="rounded-2xl border border-amber-900/40 bg-amber-950/30 p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                    <FileWarning className="h-4 w-4" />
                    {t("documentCheck.example.heading")}
                  </div>
                  <div className="text-sm text-foreground/80 leading-relaxed space-y-2">
                    <p>
                      <strong>{t("documentCheck.example.docTypeLabel")}</strong> {t("documentCheck.example.docType")}
                    </p>
                    <p>
                      <strong>{t("documentCheck.example.askedLabel")}</strong> {t("documentCheck.example.asked1")} <strong>{t("documentCheck.example.askedAmount")}</strong>. {t("documentCheck.example.askedDeadlineLabel")} <strong>{t("documentCheck.example.askedDeadline")}</strong> {t("documentCheck.example.askedDeadlineSuffix")}
                    </p>
                    <p>
                      <strong>{t("documentCheck.example.riskLabel")}</strong> {t("documentCheck.example.risk")}
                    </p>
                    <p>
                      <strong>{t("documentCheck.example.nextLabel")}</strong> {t("documentCheck.example.nextPrefix")} <strong>{t("documentCheck.example.nextPhone")}</strong> {t("documentCheck.example.nextSuffix")}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* ── RESULTS ── */}
          {sections.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {summary && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent p-6 sm:p-8 shadow-lg">
                  <h2 className="text-lg font-black tracking-tight text-foreground mb-5 flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-[hsl(var(--gold))]" />
                    {t("documentCheck.results.overview")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                      <FileWarning className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-500/80 mb-1">{t("documentCheck.results.docType")}</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.docType}</p>
                      </div>
                    </div>
                    <div className={`flex items-start gap-3 rounded-xl p-4 border ${
                      summary.action.includes("Dringend") || summary.action.includes("Hitna") ? "bg-red-500/10 border-red-500/20" :
                      summary.action.includes("Empfohlen") || summary.action.includes("Preporučena") ? "bg-amber-500/10 border-amber-500/20" :
                      "bg-emerald-500/10 border-emerald-500/20"
                    }`}>
                      <AlertCircle className={`h-5 w-5 mt-0.5 shrink-0 ${
                        summary.action.includes("Dringend") || summary.action.includes("Hitna") ? "text-red-500" :
                        summary.action.includes("Empfohlen") || summary.action.includes("Preporučena") ? "text-amber-500" :
                        "text-emerald-500"
                      }`} />
                      <div>
                        <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          summary.action.includes("Dringend") || summary.action.includes("Hitna") ? "text-red-500/80" :
                          summary.action.includes("Empfohlen") || summary.action.includes("Preporučena") ? "text-amber-500/80" :
                          "text-emerald-500/80"
                        }`}>{t("documentCheck.results.actionNeeded")}</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.action}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                      <Banknote className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-green-600/80 mb-1">{t("documentCheck.results.financial")}</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.financial}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                      <CalendarClock className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-purple-500/80 mb-1">{t("documentCheck.results.deadline")}</p>
                        <p className="text-sm font-semibold text-foreground leading-snug">{summary.deadline}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

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
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-black/5 dark:border-white/5">
                      <span className={section.iconColorClass}>{section.icon}</span>
                      <h3 className="text-base font-bold tracking-tight text-foreground">{section.title}</h3>
                      {locked && <Lock className="ml-auto h-4 w-4 text-[hsl(var(--gold))]" />}
                    </div>
                    <div className={`px-6 py-5 sm:py-6 ${locked ? "relative" : ""}`}>
                      {locked && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-b-2xl">
                          <Lock className="h-7 w-7 text-[hsl(var(--gold))] mb-3" />
                          <p className="text-sm font-bold text-foreground mb-3">{t("documentCheck.results.lockedTitle")}</p>
                          <button onClick={() => localizedNavigate("/paketi")}
                            className="rounded-full px-5 py-2.5 text-xs font-bold transition-all hover:opacity-90"
                            style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))", color: "hsl(var(--gold-foreground))" }}>
                            {t("documentCheck.results.lockedCta")}
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
              <strong>{t("documentCheck.disclaimer.title")}</strong> {t("documentCheck.disclaimer.body")}
            </p>
          </div>
        </div>
        </AuthGate>
      </section>
    </>
  );
}
