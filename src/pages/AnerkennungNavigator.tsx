import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  FileText,
  Database,
  Euro,
  Clock,
  Lock,
  Crown,
  ArrowRight,
  Info,
  BookOpen,
  Sparkles,
  MapPin,
  Mail,
  Copy,
  Download,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useAuth } from "@/contexts/AuthContext";
import { navigateBackOrHome } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import {
  COUNTRIES,
  PROFESSIONS,
  ANABIN_STATUS,
  ANERKENNUNGSZUSCHUSS,
  OFFICIAL_PORTALS,
  type Country,
  type Regulation,
} from "@/lib/anerkennung-data";
import {
  BUNDESLAENDER,
  getAuthority,
  ZAB_FALLBACK,
} from "@/lib/anerkennung-bundeslaender";
import {
  generateAnerkennungEmail,
  type EmailTemplateInput,
} from "@/lib/anerkennung-email-templates";

/* ──────────── Helpers ──────────── */

function RegulationBadge({ reg }: { reg: Regulation }) {
  const { t } = useTranslation("anerkennung");
  if (reg === "REG") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/40">
        <AlertTriangle className="h-3 w-3" /> {t("ui.regBadge")}
      </span>
    );
  }
  if (reg === "PARTIAL") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/40">
        <Info className="h-3 w-3" /> {t("ui.partialBadge")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
      <CheckCircle2 className="h-3 w-3" /> {t("ui.nregBadge")}
    </span>
  );
}

function SectionCard({
  icon,
  title,
  children,
  tone = "default",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  tone?: "default" | "gold" | "warning";
}) {
  const toneClasses = {
    default: "border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_18px_55px_rgba(0,0,0,0.18)]",
    gold: "border-[hsl(var(--gold))]/25 bg-[hsl(var(--gold))]/[0.07] backdrop-blur-xl shadow-[0_18px_55px_rgba(0,0,0,0.18)]",
    warning: "border-amber-500/35 bg-amber-500/10 backdrop-blur-xl",
  };
  return (
    <section className={cn("rounded-2xl border p-5 sm:p-6 text-white", toneClasses[tone])}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center text-[hsl(var(--gold))]">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
      </div>
      {children}
    </section>
  );
}

const FLAG_CDN_CODES: Record<Country, string> = {
  BA: "ba",
  HR: "hr",
  RS: "rs",
  ME: "me",
  MK: "mk",
  XK: "xk",
};

function CountryFlag({ code, label, compact = false }: { code: Country; label: string; compact?: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-white/[0.08] text-[10px] font-black text-[hsl(var(--gold))] shadow-[0_8px_24px_rgba(0,0,0,0.28)]",
        compact ? "h-5 w-7" : "h-9 w-12",
      )}
      aria-hidden="true"
    >
      {code}
      <img
        src={`https://flagcdn.com/w80/${FLAG_CDN_CODES[code]}.png`}
        alt={label}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </span>
  );
}

/* ──────────── Premium Paywall ──────────── */

function AnerkennungPaywall() {
  const navigate = useNavigate();
  const { t } = useTranslation("anerkennung");
  const features = [
    t("paywall.feature1"),
    t("paywall.feature2"),
    t("paywall.feature3"),
    t("paywall.feature4"),
    t("paywall.feature5"),
    t("paywall.feature6"),
    t("paywall.feature7"),
  ];
  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="rounded-3xl border border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-white/[0.03] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/30">
          <Lock className="h-8 w-8 text-[hsl(var(--gold))]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          {t("paywall.title")}
        </h2>
        <p className="mt-2 text-sm text-white/75">{t("paywall.subtitle")}</p>

        <div className="mt-6 grid gap-3 text-left">
          {features.map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-white/95">{b}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/paketi")}
          className="mt-6 w-full rounded-full py-3 text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
          }}
        >
          <Crown className="inline-block mr-1.5 h-4 w-4" />
          {t("paywall.cta")}
        </button>

        <p className="mt-3 text-[11px] text-white/75">{t("paywall.footnote")}</p>
      </div>
    </div>
  );
}

/* ──────────── Main Page ──────────── */

export default function AnerkennungNavigator() {
  const navigate = useNavigate();
  const { t } = useTranslation("anerkennung");
  const { isPremium } = usePremiumAccess();
  const { displayName } = useAuth();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [bundesland, setBundesland] = useState<string>("");
  const [emailFullName, setEmailFullName] = useState<string>(displayName || "");
  const [emailVisible, setEmailVisible] = useState(false);

  const profession = useMemo(
    () => PROFESSIONS.find((p) => p.id === selectedProfession) || null,
    [selectedProfession]
  );
  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCountry) || null,
    [selectedCountry]
  );
  const bundeslandObj = useMemo(
    () => BUNDESLAENDER.find((b) => b.code === bundesland) || null,
    [bundesland]
  );
  const authority = useMemo(() => {
    if (!profession || !bundesland) return null;
    return getAuthority(profession.id, bundesland) || ZAB_FALLBACK;
  }, [profession, bundesland]);

  /** Lokalizovan helper za polje profesije (fallback na vrijednost iz data fajla) */
  const profT = (id: string, key: string, fallback: string): string => {
    const k = `professions.${id}.${key}`;
    const val = t(k);
    return val === k ? fallback : val;
  };
  /** Lokalizovan array helper za profession.steps/documents */
  const profArr = (id: string, key: string, fallback: string[]): string[] => {
    const k = `professions.${id}.${key}`;
    const val = t(k, { returnObjects: true }) as unknown;
    return Array.isArray(val) ? (val as string[]) : fallback;
  };
  /** Lokalizovano ime/notes zemlje */
  const countryT = (code: string, key: "name" | "notes", fallback: string): string => {
    const k = `countries.${code}.${key}`;
    const val = t(k);
    return val === k ? fallback : val;
  };

  const generatedEmail = useMemo(() => {
    if (!profession || !country || !bundeslandObj || !emailFullName.trim()) return null;
    const input: EmailTemplateInput = {
      fullName: emailFullName.trim(),
      professionDE: profession.nameDE,
      professionLocal: profT(profession.id, "name", profession.name),
      countryOfOrigin: countryT(country.code, "name", country.name),
      bundesland: bundeslandObj.name,
      regulation: profession.regulation,
      requiresLanguageExam: profession.requiresLanguageExam,
    };
    return generateAnerkennungEmail(input, t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profession, country, bundeslandObj, emailFullName, t]);

  const copyEmail = () => {
    if (!generatedEmail) return;
    const fullText = `${generatedEmail.subject}\n\n${generatedEmail.body}`;
    navigator.clipboard.writeText(fullText);
    toast.success(t("ui.emailCopiedToast"));
  };

  const downloadEmail = () => {
    if (!generatedEmail) return;
    const fullText = `Betreff: ${generatedEmail.subject}\n\n${generatedEmail.body}\n\n\n────────────────────────────────────\n${generatedEmail.bsTranslation}`;
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Anerkennung-Email-${profession?.id || "bewerbung"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("ui.emailDownloadedToast"));
  };

  const handleBack = () => navigateBackOrHome(navigate);
  const resetWizard = () => {
    setSelectedCountry(null);
    setSelectedProfession(null);
    setBundesland("");
    setEmailVisible(false);
  };

  // Premium gate — free preview: Step 1 (country) is open; paywall kicks in after country selected
  const showPaywall = !isPremium && !!selectedCountry;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 min-h-screen">
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        path="/anerkennung-navigator"
      />

      <PageNavBar onBack={handleBack} showShare />

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            {t("ui.headerTitle")}
          </h1>
        </div>
        <p className="text-sm text-white/75">{t("ui.headerSubtitle")}</p>
        <div className="h-px mt-4 mb-6 bg-border/40" />
      </div>

      {/* Disclaimer — pravna zaštita */}
      <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs sm:text-sm text-amber-200">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-1">{t("ui.disclaimerTitle")}</strong>
            {t("ui.disclaimerBody")}
          </div>
        </div>
      </div>

      {/* Cross-link na akademski modul */}
      {!selectedCountry && (
        <button
          onClick={() => navigate("/anerkennung-fakulteti")}
          className="mb-6 w-full text-left rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-4 hover:bg-[hsl(var(--gold))]/10 transition-colors flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-xl bg-[hsl(var(--gold))]/15 flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-white">
              Imaš fakultetsku diplomu (Bachelor / Master / Magistar)?
            </div>
            <p className="text-xs text-white/75 mt-0.5">
              Detaljan vodič za priznavanje akademskih diploma sa Balkana —
              ZAB Zeugnisbewertung, Anabin H+/H+/-/H- statusi, primjeri sa
              Sarajevskog, Zagrebačkog i Beogradskog univerziteta.
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" />
        </button>
      )}

      {/* ────────── STEP 1: Country ────────── */}
      {!selectedCountry && (
        <section className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-3">
              {t("ui.step1of3")}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {t("ui.step1Title")}
            </h2>
            <p className="text-sm text-white/75">{t("ui.step1Sub")}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.075] p-4 text-left shadow-[0_12px_34px_rgba(0,0,0,0.22)] transition hover:border-[hsl(var(--gold))]/45 hover:bg-white/[0.11] hover:shadow-lg"
              >
                <CountryFlag code={c.code} label={countryT(c.code, "name", c.name)} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white leading-snug">
                    {countryT(c.code, "name", c.name)}
                  </p>
                  <p className="text-[11px] font-semibold text-white/80">
                    {c.euMember ? t("ui.euMember") : t("ui.thirdCountry")}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/70 group-hover:text-[hsl(var(--gold))]" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ────────── PAYWALL after Step 1 (free preview) ────────── */}
      {showPaywall && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs text-white/75 flex items-center gap-1.5">
              {country && <CountryFlag code={country.code} label={countryT(country.code, "name", country.name)} compact />}
              <span>
                {t("ui.previewSelected", {
                  defaultValue: "Odabrano:",
                })}{" "}
                <strong className="text-white">
                  {country ? countryT(country.code, "name", country.name) : ""}
                </strong>
              </span>
            </p>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs font-semibold text-white/75 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="h-3 w-3" /> {t("ui.changeCountry")}
            </button>
          </div>
          <AnerkennungPaywall />
        </section>
      )}

      {/* ────────── STEP 2: Profession ────────── */}
      {!showPaywall && selectedCountry && !selectedProfession && country && (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-2">
                {t("ui.step2of3")}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <CountryFlag code={country.code} label={countryT(country.code, "name", country.name)} compact /> {t("ui.step2Title")}
              </h2>
              <p className="text-sm text-white/75">{t("ui.step2Sub")}</p>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs font-semibold text-white/75 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="h-3 w-3" /> {t("ui.changeCountry")}
            </button>
          </div>

          {/* Country specific note */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs text-white/85 backdrop-blur-xl">
            <strong className="text-white">
              {countryT(country.code, "name", country.name)}:{" "}
            </strong>
            {countryT(country.code, "notes", country.notes)}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PROFESSIONS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProfession(p.id)}
                className="group relative flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 cursor-pointer transition-all duration-200 hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.08] hover:shadow-lg text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-[15px] leading-snug truncate">
                    {profT(p.id, "name", p.name)}
                  </p>
                  <p className="text-xs text-white/75 mt-0.5 leading-relaxed truncate">
                    {p.nameDE}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    <RegulationBadge reg={p.regulation} />
                    <span className="text-[11px] font-semibold text-white/70 ml-2">
                      {p.category}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-white/65 transition-colors group-hover:text-[hsl(var(--gold))]" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ────────── STEP 3: Bundesland ────────── */}
      {selectedCountry && selectedProfession && !bundesland && profession && country && (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-2">
                {t("ui.step3of4")}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[hsl(var(--gold))]" />
                {t("ui.step3Title")}
              </h2>
              <p className="text-sm text-white/75">{t("ui.step3Sub")}</p>
            </div>
            <button
              onClick={() => setSelectedProfession(null)}
              className="text-xs font-semibold text-white/75 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="h-3 w-3" /> {t("ui.changeProfession")}
            </button>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {BUNDESLAENDER.map((b) => (
              <button
                key={b.code}
                onClick={() => setBundesland(b.code)}
                className="group rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.08] hover:shadow-lg"
              >
                <p className="font-bold text-white text-sm">{b.name}</p>
                <p className="text-[10px] text-white/75 mt-0.5">
                  {b.capital}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ────────── STEP 4: Result roadmap ────────── */}
      {profession && country && bundesland && (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-2">
                {t("ui.step4of4")}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 flex-wrap">
                <CountryFlag code={country.code} label={countryT(country.code, "name", country.name)} compact />
                <span>{profT(profession.id, "name", profession.name)}</span>
              </h2>
              <p className="text-sm text-white/75 italic">
                {profession.nameDE}
              </p>
              {bundeslandObj && (
                <p className="mt-1 text-xs text-white/75 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> {bundeslandObj.name}
                  <button
                    onClick={() => setBundesland("")}
                    className="ml-1 text-[hsl(var(--gold))] hover:underline"
                  >
                    {t("ui.changeBundesland")}
                  </button>
                </p>
              )}
            </div>
            <button
              onClick={resetWizard}
              className="text-xs font-semibold text-white/75 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="h-3 w-3" /> {t("ui.newCheck")}
            </button>
          </div>

          {/* Diagnostic summary */}
          <div className="rounded-2xl border border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">
                {t("ui.yourCase")}
              </p>
              <RegulationBadge reg={profession.regulation} />
              {country.euMember && (
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-300">
                  {t("ui.euDiploma")}
                </span>
              )}
            </div>
            <p className="text-sm text-white/95 leading-relaxed">
              {profT(profession.id, "description", profession.description)}
            </p>
            {profession.regulation === "REG" && (
              <p className="mt-3 text-xs text-rose-200">
                <strong>{t("ui.regWarning")}</strong> {t("ui.regWarningBody")}
              </p>
            )}
            {profession.regulation === "NREG" && (
              <p className="mt-3 text-xs text-emerald-200">
                <strong>{t("ui.nregInfo")}</strong> {t("ui.nregInfoBody")}
              </p>
            )}
            {profession.notes && (
              <p className="mt-3 text-xs text-white/75">
                <Info className="inline h-3 w-3 mr-1" />
                {profT(profession.id, "notes", profession.notes)}
              </p>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <Clock className="h-4 w-4 text-[hsl(var(--gold))] mb-2" />
              <p className="text-[11px] text-white/75 uppercase font-semibold">
                {t("ui.statDuration")}
              </p>
              <p className="text-sm font-bold text-white mt-1">
                {profT(profession.id, "durationRange", profession.durationRange)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <Euro className="h-4 w-4 text-[hsl(var(--gold))] mb-2" />
              <p className="text-[11px] text-white/75 uppercase font-semibold">
                {t("ui.statCost")}
              </p>
              <p className="text-sm font-bold text-white mt-1">
                {profT(profession.id, "costRange", profession.costRange)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <BookOpen className="h-4 w-4 text-[hsl(var(--gold))] mb-2" />
              <p className="text-[11px] text-white/75 uppercase font-semibold">
                {t("ui.statLanguage")}
              </p>
              <p className="text-sm font-bold text-white mt-1">
                {profession.requiresLanguageExam
                  ? t("ui.langRequired")
                  : t("ui.langNotRequired")}
              </p>
            </div>
          </div>

          {/* Steps */}
          <SectionCard
            icon={<ArrowRight className="h-5 w-5" />}
            title={t("ui.stepsTitle")}
          >
            <ol className="space-y-3">
              {profArr(profession.id, "steps", profession.steps).map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10 text-[11px] font-bold text-[hsl(var(--gold))]">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/95 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </SectionCard>

          {/* Documents */}
          <SectionCard
            icon={<FileText className="h-5 w-5" />}
            title={t("ui.documentsTitle")}
          >
            <ul className="grid gap-2 sm:grid-cols-2">
              {profArr(profession.id, "documents", profession.documents).map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-1" />
                  <span className="text-white/95">{doc}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-200">
              <strong>{t("ui.apostilleNote")}</strong> {t("ui.apostilleBody")}
              <br />
              <strong className="block mt-2">{t("ui.translationNote")}</strong>{" "}
              {t("ui.translationBody")}
            </div>
          </SectionCard>

          {/* Anabin guide */}
          <SectionCard
            icon={<Database className="h-5 w-5" />}
            title={t("ui.anabinTitle")}
            tone="gold"
          >
            <p className="text-sm text-white/95 mb-4">{t("ui.anabinIntro")}</p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-white mb-2">
                  {t("ui.anabinInstitutions")}
                </p>
                <ul className="space-y-2">
                  {ANABIN_STATUS.institutions.map((s) => {
                    const key =
                      s.code === "H+"
                        ? "instH+"
                        : s.code === "H-"
                          ? "instH-"
                          : "instH+/-";
                    return (
                      <li
                        key={s.code}
                        className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs"
                      >
                        <strong className="text-[hsl(var(--gold))]">
                          {t(`anabin.${key}.title`, s.title)}
                        </strong>
                        <p className="text-white/75 mt-1">
                          {t(`anabin.${key}.description`, s.description)}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-white mb-2">
                  {t("ui.anabinDiplomas")}
                </p>
                <ul className="space-y-2">
                  {ANABIN_STATUS.diplomas.map((s) => {
                    const key =
                      s.code === "entspricht"
                        ? "dipEntspricht"
                        : s.code === "gleichwertig"
                          ? "dipGleichwertig"
                          : "dipNicht";
                    return (
                      <li
                        key={s.code}
                        className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs"
                      >
                        <strong className="text-[hsl(var(--gold))]">
                          {t(`anabin.${key}.title`, s.title)}
                        </strong>
                        <p className="text-white/75 mt-1">
                          {t(`anabin.${key}.description`, s.description)}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <a
                href="https://anabin.kmk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[hsl(var(--gold))] hover:underline"
              >
                {t("ui.anabinOpen")} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SectionCard>

          {/* Anerkennungszuschuss */}
          <SectionCard
            icon={<Euro className="h-5 w-5" />}
            title={t("ui.zuschussTitle")}
            tone="gold"
          >
            <p className="text-sm text-white/95 mb-4">
              {t("zuschuss.description", ANERKENNUNGSZUSCHUSS.description)}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <div>
                <p className="text-xs font-bold uppercase text-white mb-2">
                  {t("ui.zuschussEligibility")}
                </p>
                <ul className="space-y-1">
                  {((t("zuschuss.eligibility", { returnObjects: true }) as unknown as string[]) || ANERKENNUNGSZUSCHUSS.eligibility).map((e) => (
                    <li
                      key={e}
                      className="text-xs text-white/85 flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-white mb-2">
                  {t("ui.zuschussCovers")}
                </p>
                <ul className="space-y-1">
                  {((t("zuschuss.covers", { returnObjects: true }) as unknown as string[]) || ANERKENNUNGSZUSCHUSS.whatItCovers).map((w) => (
                    <li
                      key={w}
                      className="text-xs text-white/85 flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-white mb-2">
                {t("ui.zuschussHowTo")}
              </p>
              <ol className="space-y-1 mb-4">
                {((t("zuschuss.howToApply", { returnObjects: true }) as unknown as string[]) || ANERKENNUNGSZUSCHUSS.howToApply).map((step, i) => (
                  <li
                    key={step}
                    className="text-xs text-white/85 flex items-start gap-2"
                  >
                    <span className="font-bold text-[hsl(var(--gold))]">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-200 mb-4">
              <AlertTriangle className="inline h-3 w-3 mr-1" />
              {t("zuschuss.important", ANERKENNUNGSZUSCHUSS.important)}
            </div>

            <div className="flex flex-wrap gap-2">
              {ANERKENNUNGSZUSCHUSS.officialLinks.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.08]"
                >
                  {l.label} <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </SectionCard>

          {/* Nadležna ustanova za Bundesland */}
          {authority && bundeslandObj && (
            <SectionCard
              icon={<Building2 className="h-5 w-5" />}
              title={t("ui.authorityTitle", { bundesland: bundeslandObj.name })}
              tone="gold"
            >
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--gold))] mb-1">
                  {authority.authorityType}
                </p>
                <p className="text-sm font-bold text-white mb-2">
                  {authority.name}
                </p>
                {authority.notes && (
                  <p className="text-xs text-white/75 mb-3">
                    {authority.notes}
                  </p>
                )}
                <a
                  href={authority.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--gold))]/10 px-3 py-1.5 text-xs font-semibold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/20"
                >
                  {t("ui.authorityOpen")} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-3 text-[11px] text-white/75">
                {t("ui.authorityHint")}{" "}
                <a
                  href="https://berater.anerkennung-in-deutschland.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--gold))] hover:underline"
                >
                  {t("ui.authorityHintLink")}
                </a>{" "}
                {t("ui.authorityHintAfter")}
              </p>
            </SectionCard>
          )}

          {/* Email generator */}
          <SectionCard
            icon={<Mail className="h-5 w-5" />}
            title={t("ui.emailTitle")}
            tone="gold"
          >
            <p className="text-sm text-white/95 mb-4">
              {t("ui.emailIntro")} <strong>{t("ui.emailIntroBold")}</strong>.
            </p>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] mb-4">
              <input
                type="text"
                value={emailFullName}
                onChange={(e) => setEmailFullName(e.target.value)}
                placeholder={t("ui.emailNamePlaceholder")}
                className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-[hsl(var(--gold))]/60 focus:outline-none focus:bg-white/[0.08]"
              />
              <button
                onClick={() => setEmailVisible(true)}
                disabled={!emailFullName.trim()}
                className="rounded-lg bg-[hsl(var(--gold))] px-5 py-2.5 text-sm font-bold text-[hsl(var(--primary))] disabled:opacity-50 hover:opacity-90"
              >
                {t("ui.emailGenerate")}
              </button>
            </div>

            {emailVisible && generatedEmail && (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/75 mb-1">
                    {t("ui.emailSubjectLabel")}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {generatedEmail.subject}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/75 mb-2">
                    {t("ui.emailBodyLabel")}
                  </p>
                  <pre className="whitespace-pre-wrap text-xs text-white/95 font-sans leading-relaxed">
                    {generatedEmail.body}
                  </pre>
                </div>

                <details className="rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
                  <summary className="cursor-pointer text-xs font-bold text-white">
                    {t("ui.emailTranslationToggle")}
                  </summary>
                  <pre className="mt-3 whitespace-pre-wrap text-xs text-white/85 font-sans leading-relaxed">
                    {generatedEmail.bsTranslation}
                  </pre>
                </details>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.08]"
                  >
                    <Copy className="h-3.5 w-3.5" /> {t("ui.emailCopy")}
                  </button>
                  <button
                    onClick={downloadEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.08]"
                  >
                    <Download className="h-3.5 w-3.5" /> {t("ui.emailDownload")}
                  </button>
                </div>

                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-200">
                  <AlertTriangle className="inline h-3 w-3 mr-1" />
                  {t("ui.emailWarning")}
                </div>
              </div>
            )}
          </SectionCard>

          {/* Official links */}
          <SectionCard
            icon={<ExternalLink className="h-5 w-5" />}
            title={t("ui.officialSourcesTitle")}
          >
            <div className="grid gap-2">
              {profession.officialLinks.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.08]"
                >
                  <span className="text-white/95">{l.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-white/75 shrink-0" />
                </a>
              ))}
            </div>
          </SectionCard>
        </section>
      )}

      {/* ────────── Always at bottom: official portals ────────── */}
      <div className="mt-10 pt-8 border-t border-border/40">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/75 mb-4">
          {t("ui.allPortalsTitle")}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {OFFICIAL_PORTALS.map((p) => {
            const portalKey =
              p.url.includes("anabin")
                ? "anabin"
                : p.url.includes("anerkennung-in-deutschland")
                  ? "anerkennung"
                  : p.url.includes("bq-portal")
                    ? "bqPortal"
                    : p.url.includes("berater")
                      ? "profiFilter"
                      : p.url.includes("zab")
                        ? "zab"
                        : p.url.includes("make-it-in-germany")
                          ? "makeIt"
                          : null;
            const desc = portalKey ? t(`portals.${portalKey}`, p.description) : p.description;
            return (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm hover:border-[hsl(var(--gold))]/40 hover:bg-white/[0.08]"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{p.name}</p>
                  <ExternalLink className="h-3.5 w-3.5 text-white/75 group-hover:text-[hsl(var(--gold))] shrink-0" />
                </div>
                <p className="text-[11px] text-white/75">{desc}</p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
