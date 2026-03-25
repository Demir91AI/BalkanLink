import { useParams, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { hasManagedBackHistory, useHistorySearchState } from "@/hooks/useHistorySearchState";
import { ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle, BookOpen, ClipboardList, PenLine, Pencil, MapPin, Hash, XCircle, MinusCircle, FileCheck, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getGuideBySlug, getOfficialUrl, type GuideStepCard } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";

const cardConfig: { key: keyof GuideStepCard; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "whatToWrite", label: "Šta tačno upisuješ", icon: <Pencil className="h-3.5 w-3.5" />, color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20" },
  { key: "whereToFind", label: "Gdje to nađeš", icon: <MapPin className="h-3.5 w-3.5" />, color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20" },
  { key: "format", label: "Format", icon: <Hash className="h-3.5 w-3.5" />, color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20" },
  { key: "commonMistakes", label: "Česte greške", icon: <XCircle className="h-3.5 w-3.5" />, color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20" },
  { key: "whenToLeaveEmpty", label: "Kada ostaviti prazno", icon: <MinusCircle className="h-3.5 w-3.5" />, color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20" },
  { key: "example", label: "Primjer popunjenog", icon: <FileCheck className="h-3.5 w-3.5" />, color: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20" },
];

export default function SmartGuide() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { searchParams, setSearchState } = useHistorySearchState();
  const guide = getGuideBySlug(slug ?? "");
  const lang: LangKey = "bs";

  if (!guide) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">Vodič nije pronađen.</p>
        <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
          <ArrowLeft /> Nazad
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
          <ArrowLeft /> Nazad
        </button>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{guide.title[lang]}</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Izvor: {guide.authority[lang]}
        </p>
        {guide.formName && (
          <p className="mt-1 text-xs text-muted-foreground">
            Formular: {guide.formName[lang]}
          </p>
        )}
      </div>

      {/* Top info sections */}
      <div className="mb-6 space-y-4">
        {guide.commonMistakes[lang].length > 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške koje dovode do odbijanja
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
            <ClipboardList className="h-3.5 w-3.5 text-primary" /> Dokumenti koje treba pripremiti
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            {guide.documents[lang].map((d, i) => (
              <li key={i} className="text-xs text-muted-foreground">{d}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <PenLine className="h-3.5 w-3.5 text-primary" /> Ko podnosi zahtjev
          </h3>
          <p className="text-xs text-muted-foreground">{guide.who[lang]}</p>
          <p className="mt-2 text-xs">
            <span className="font-semibold">Vrijeme obrade:</span>{" "}
            <span className="text-muted-foreground">{guide.processingTime[lang]}</span>
          </p>
        </div>
      </div>

      {/* Step-by-step wizard */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Korak {step + 1} / {steps.length}
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

        {/* Step header */}
        <div className="rounded-2xl border bg-card p-5">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              <BookOpen className="mr-1 h-3 w-3" /> Korak {step + 1}
            </Badge>
          </div>
          <h3 className="font-bold text-sm mt-2">{current.field}</h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{current.instruction}</p>
        </div>

        {/* Detail cards */}
        {current.cards && current.cards.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
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

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={goToPreviousStep}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
          </Button>
          <Button variant="outline" size="sm" disabled={step === steps.length - 1} onClick={() => goToStep(step + 1)}>
            Dalje <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Službene informacije */}
      {getOfficialUrl(guide) && (
        <div className="mt-6 rounded-2xl border bg-card p-5 text-center">
          <h3 className="mb-3 flex items-center justify-center gap-1.5 text-xs font-bold">
            <Info className="h-3.5 w-3.5 text-primary" /> Službene informacije
          </h3>
          <a
            href={getOfficialUrl(guide)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Otvori službenu stranicu
          </a>
          <p className="mt-3 text-[11px] text-muted-foreground/70">
            Svi podaci dolaze iz službenih državnih izvora.
          </p>
        </div>
      )}
    </div>
  );
}
