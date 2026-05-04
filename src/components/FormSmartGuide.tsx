import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, ChevronLeft, ChevronRight, Pencil, MapPin, Hash,
  XCircle, MinusCircle, FileCheck, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { hasManagedBackHistory, useHistorySearchState } from "@/hooks/useHistorySearchState";
import { useSubscription } from "@/hooks/useSubscription";
import { cn } from "@/lib/utils";
import type { Guide, GuideStepCard } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";

const FREE_STEPS = 2;

const cardConfig: { key: keyof GuideStepCard; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "whatToWrite", label: "Šta tačno upisuješ", icon: <Pencil className="h-3.5 w-3.5" />, color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20" },
  { key: "whereToFind", label: "Gdje to nađeš", icon: <MapPin className="h-3.5 w-3.5" />, color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20" },
  { key: "format", label: "Format", icon: <Hash className="h-3.5 w-3.5" />, color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20" },
  { key: "commonMistakes", label: "Česte greške", icon: <XCircle className="h-3.5 w-3.5" />, color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20" },
  { key: "whenToLeaveEmpty", label: "Kada ostaviti prazno", icon: <MinusCircle className="h-3.5 w-3.5" />, color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20" },
  { key: "example", label: "Primjer popunjenog", icon: <FileCheck className="h-3.5 w-3.5" />, color: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20" },
];

interface FormSmartGuideProps {
  guide: Guide;
  lang: LangKey;
}

export default function FormSmartGuide({ guide, lang }: FormSmartGuideProps) {
  const navigate = useNavigate();
  const { searchParams, setSearchState } = useHistorySearchState();
  const { isPremium } = useSubscription();

  const steps = guide.steps[lang]?.length ? guide.steps[lang] : guide.steps["bs"];
  if (!steps || steps.length === 0) {
    return <p className="text-xs text-muted-foreground">Vodič nije dostupan.</p>;
  }

  const rawStep = Number(searchParams.get("guideStep") ?? "1");
  const step = Number.isFinite(rawStep)
    ? Math.min(Math.max(rawStep - 1, 0), steps.length - 1)
    : 0;

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const isStepLocked = !isPremium && step >= FREE_STEPS;

  const topRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = topRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }, [step]);

  const goToStep = (nextStep: number, replace = false) => {
    const normalized = Math.min(Math.max(nextStep, 0), steps.length - 1);
    setSearchState(
      { guideStep: normalized === 0 ? null : String(normalized + 1) },
      { replace, state: { blGuideStep: true } }
    );
  };

  const handleStepClick = (i: number) => {
    if (!isPremium && i >= FREE_STEPS) {
      goToStep(FREE_STEPS);
    } else {
      goToStep(i);
    }
  };

  const handleNext = () => {
    if (!isPremium && step + 1 >= FREE_STEPS) {
      goToStep(FREE_STEPS);
    } else {
      goToStep(step + 1);
    }
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
    <div ref={topRef} className="space-y-4 scroll-mt-24">
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
            onClick={() => handleStepClick(i)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition",
              !isPremium && i >= FREE_STEPS
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {!isPremium && i >= FREE_STEPS ? "🔒" : i + 1}
          </button>
        ))}
      </div>

      {isStepLocked ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Lock className="h-10 w-10 text-[hsl(var(--gold))] mb-4" />
          <h3 className="text-lg font-bold text-foreground">
            Smart Guide dostupan uz Premium
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Otključaj kompletni vodič za popunjavanje svih formulara.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Koraci 1–2 su besplatni · Korak {step + 1} zahtijeva Premium
          </p>
          <Button
            onClick={() => navigate("/paketi")}
            className="mt-6 w-full max-w-xs mx-auto block rounded-full py-3.5 text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
              color: "hsl(var(--gold-foreground))",
            }}
          >
            BalkanLink Premium — 9.99€/mj.
          </Button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <Badge variant="outline" className="text-[10px] mb-2">
              <BookOpen className="mr-1 h-3 w-3" /> Korak {step + 1}
            </Badge>
            <h3 className="font-bold text-sm mt-1">{current.field}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {current.instruction}
            </p>
          </div>

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
        </>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={step === 0} onClick={goToPreviousStep}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
        </Button>
        {!isStepLocked && (
          <Button variant="outline" size="sm" disabled={step === steps.length - 1} onClick={handleNext}>
            Dalje <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
