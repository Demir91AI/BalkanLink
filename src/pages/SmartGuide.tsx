import { useParams, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { hasManagedBackHistory, useHistorySearchState } from "@/hooks/useHistorySearchState";
import { ChevronLeft, ChevronRight, AlertTriangle, BookOpen, ClipboardList, PenLine, Pencil, MapPin, Hash, XCircle, MinusCircle, FileCheck, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getGuideBySlug, getOfficialUrl, type GuideStepCard } from "@/lib/guide-data";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { StepLockOverlay } from "@/components/PremiumPaywall";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSectionT } from "@/hooks/useSectionT";

type LangKey = "de" | "bs" | "en";

function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

export default function SmartGuide() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { searchParams, setSearchState } = useHistorySearchState();
  const guide = getGuideBySlug(slug ?? "");
  const { language } = useLanguage();
  const st = useSectionT();
  const lang = getLangKey(language);
  const { canAccessStep, isPremium } = usePremiumAccess();

  const cardConfig: { key: keyof GuideStepCard; label: string; icon: React.ReactNode; color: string }[] = [
    { key: "whatToWrite", label: st("guide.card.whatToWrite"), icon: <Pencil className="h-3.5 w-3.5" />, color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20" },
    { key: "whereToFind", label: st("guide.card.whereToFind"), icon: <MapPin className="h-3.5 w-3.5" />, color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20" },
    { key: "format", label: st("guide.card.format"), icon: <Hash className="h-3.5 w-3.5" />, color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20" },
    { key: "commonMistakes", label: st("guide.card.commonMistakes"), icon: <XCircle className="h-3.5 w-3.5" />, color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20" },
    { key: "whenToLeaveEmpty", label: st("guide.card.whenToLeaveEmpty"), icon: <MinusCircle className="h-3.5 w-3.5" />, color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20" },
    { key: "example", label: st("guide.card.example"), icon: <FileCheck className="h-3.5 w-3.5" />, color: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20" },
  ];

  if (!guide) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">{st("guide.notFound")}</p>
        <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
          <ChevronLeft className="h-4 w-4" /> {st("guide.back")}
        </button>
      </div>
    );
  }

  const steps = guide.steps[lang];
  const rawStep = Number(searchParams.get("step") ?? "1");
  const step = Number.isFinite(rawStep)
    ? Math.min(Math.max(rawStep - 1, 0), steps.length - 1)
    : 0;
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const goToStep = (nextStep: number, replace = false) => {
    const normalizedStep = Math.min(Math.max(nextStep, 0), steps.length - 1);
    setSearchState(
      { step: normalizedStep === 0 ? null : String(normalizedStep + 1) },
      { replace, state: { blGuideStep: true } }
    );
  };

  const goToPreviousStep = () => {
    if (step === 0) return;

    if (hasManagedBackHistory("blGuideStep")) {
      navigate(-1);
      return;
    }

    goToStep(step - 1, true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
          <ChevronLeft className="h-4 w-4" /> {st("guide.back")}
        </button>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{guide.title[lang]}</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {st("guide.source")}: {guide.authority[lang]}
        </p>
        {guide.formName && (
          <p className="mt-1 text-xs text-muted-foreground">
            {st("guide.form")}: {guide.formName[lang]}
          </p>
        )}
      </div>

      {/* Top info sections */}
      <div className="mb-6 space-y-4">
        {guide.commonMistakes[lang].length > 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" /> {st("guide.mistakes")}
            </h3>
            <ul className="space-y-1 pl-4 list-disc">
              {guide.commonMistakes[lang].map((m, i) => (
                <li key={i} className="text-xs text-red-600 dark:text-red-300">{m}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-2xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <ClipboardList className="h-3.5 w-3.5 text-primary" /> {st("guide.documents")}
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            {guide.documents[lang].map((d, i) => (
              <li key={i} className="text-xs text-muted-foreground">{d}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <PenLine className="h-3.5 w-3.5 text-primary" /> {st("guide.who")}
          </h3>
          <p className="text-xs text-muted-foreground">{guide.who[lang]}</p>
          <p className="mt-2 text-xs">
            <span className="font-semibold">{st("guide.processingTime")}:</span>{" "}
            <span className="text-muted-foreground">{guide.processingTime[lang]}</span>
          </p>
        </div>
      </div>

      {/* Step-by-step wizard */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {st("guide.step")} {step + 1} / {steps.length}
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition ${
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <StepLockOverlay locked={!canAccessStep(step)}>
          {/* Step header */}
          <div className="rounded-2xl border bg-card p-5">
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                <BookOpen className="mr-1 h-3 w-3" /> {st("guide.step")} {step + 1}
              </Badge>
            </div>
            <h3 className="font-bold text-sm mt-2">{current.field}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{current.instruction}</p>
          </div>

          {/* Detail cards */}
          {current.cards && current.cards.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 mt-3">
              {current.cards.map((card, ci) =>
                cardConfig.map(({ key, label, icon, color }) => {
                  const value = card[key];
                  if (!value) return null;
                  return (
                    <div key={`${ci}-${key}`} className={`rounded-xl border p-4 ${color}`}>
                      <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
                        {icon} {label}
                      </h4>
                      <p className="text-xs leading-relaxed text-foreground/80">{value}</p>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </StepLockOverlay>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={goToPreviousStep}>
            <ChevronLeft className="mr-1 h-4 w-4" /> {st("guide.back")}
          </Button>
          <Button variant="outline" size="sm" disabled={step === steps.length - 1} onClick={() => goToStep(step + 1)}>
            {st("guide.next")} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Službene informacije */}
      {getOfficialUrl(guide) && (
        <div className="mt-6 rounded-2xl border bg-card p-5 text-center">
          <h3 className="mb-3 flex items-center justify-center gap-1.5 text-xs font-bold">
            <Info className="h-3.5 w-3.5 text-primary" /> {st("guide.officialInfo")}
          </h3>
          <a
            href={getOfficialUrl(guide)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <ExternalLink className="h-3.5 w-3.5" /> {st("guide.openOfficial")}
          </a>
          <p className="mt-3 text-[11px] text-muted-foreground/70">
            {st("guide.officialDisclaimer")}
          </p>
        </div>
      )}
    </div>
  );
}