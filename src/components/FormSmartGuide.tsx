import { useNavigate } from "react-router-dom";
import {
  BookOpen, ChevronLeft, ChevronRight, Pencil, MapPin, Hash,
  XCircle, MinusCircle, FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { hasManagedBackHistory, useHistorySearchState } from "@/hooks/useHistorySearchState";
import { cn } from "@/lib/utils";
import type { Guide, GuideStepCard } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";

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

/** The step-by-step Smart Guide wizard (premium content) */
export default function FormSmartGuide({ guide, lang }: FormSmartGuideProps) {
  const navigate = useNavigate();
  const { searchParams, setSearchState } = useHistorySearchState();
  const steps = guide.steps[lang]?.length ? guide.steps[lang] : guide.steps["bs"];

  if (!steps || steps.length === 0) return <p className="text-xs text-muted-foreground">Vodič nije dostupan.</p>;

  const rawStep = Number(searchParams.get("guideStep") ?? "1");
  const step = Number.isFinite(rawStep)
    ? Math.min(Math.max(rawStep - 1, 0), steps.length - 1)
    : 0;
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const goToStep = (nextStep: number, replace = false) => {
    const normalizedStep = Math.min(Math.max(nextStep, 0), steps.length - 1);
    setSearchState(
      { guideStep: normalizedStep === 0 ? null : String(normalizedStep + 1) },
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
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition",
              i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <Badge variant="outline" className="text-[10px] mb-2">
          <BookOpen className="mr-1 h-3 w-3" /> Korak {step + 1}
        </Badge>
        <h3 className="font-bold text-sm mt-1">{current.field}</h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{current.instruction}</p>
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

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={step === 0} onClick={goToPreviousStep}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
        </Button>
        <Button variant="outline" size="sm" disabled={step === steps.length - 1} onClick={() => goToStep(step + 1)}>
          Dalje <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
