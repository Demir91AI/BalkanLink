import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft, ChevronRight,
  Pencil, MapPin, Hash, XCircle, MinusCircle, FileCheck,
  Info, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSubscription } from "@/hooks/useSubscription";
import AuthGate from "@/components/AuthGate";

export interface StepData {
  deField: string;
  bhsField: string;
  whatToWrite: string;
  whereToFind?: string;
  format?: string;
  commonMistake: string;
  whenToLeaveEmpty?: string;
  example?: string;
  note?: string;
}

type CardKey =
  | "whatToWrite" | "whereToFind" | "format"
  | "commonMistake" | "whenToLeaveEmpty" | "example";

interface Props {
  steps: StepData[];
  /** When true, all steps are free (no paywall) */
  free?: boolean;
  finishLabel?: string;
  onFinish?: () => void;
}

const FREE_STEPS = 2;

export default function SmartGuideWizardShared({
  steps,
  free = false,
  finishLabel,
  onFinish,
}: Props) {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  const { t } = useTranslation("forms");
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

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const isLast = step === steps.length - 1;

  // Steps 0 and 1 are ALWAYS free. Step 2+ requires Premium.
  const isStepLocked = !free && !isPremium && step >= FREE_STEPS;

  const cardConfig = [
    {
      key: "whatToWrite" as const,
      label: t("guide.card.whatToWrite"),
      icon: <Pencil className="h-3.5 w-3.5" />,
      color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20",
    },
    {
      key: "whereToFind" as const,
      label: t("guide.card.whereToFind"),
      icon: <MapPin className="h-3.5 w-3.5" />,
      color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20",
    },
    {
      key: "format" as const,
      label: t("guide.card.format"),
      icon: <Hash className="h-3.5 w-3.5" />,
      color: "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20",
    },
    {
      key: "commonMistake" as const,
      label: t("guide.card.commonMistake"),
      icon: <XCircle className="h-3.5 w-3.5" />,
      color: "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20",
    },
    {
      key: "whenToLeaveEmpty" as const,
      label: t("guide.card.whenToLeaveEmpty"),
      icon: <MinusCircle className="h-3.5 w-3.5" />,
      color: "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20",
    },
    {
      key: "example" as const,
      label: t("guide.card.example"),
      icon: <FileCheck className="h-3.5 w-3.5" />,
      color: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20",
    },
  ];

  const handleStepClick = (i: number) => {
    if (!free && !isPremium && i >= FREE_STEPS) {
      setStep(FREE_STEPS);
    } else {
      setStep(i);
    }
  };

  const handleNext = () => {
    if (!free && !isPremium && step + 1 >= FREE_STEPS) {
      setStep(FREE_STEPS);
    } else if (!isLast) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <AuthGate>
    <div ref={topRef} className="space-y-4 scroll-mt-24">
      <div className="text-center">
        <h2 className="text-lg font-bold text-foreground">
          {t("guide.wizardTitle")}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t("guide.wizardSubtitle")}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <Progress value={progress} className="h-2 flex-1" />
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          {t("guide.step")} {step + 1} / {steps.length}
        </span>
      </div>

      {/* Step pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => handleStepClick(i)}
            className={
              "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition " +
              (!free && !isPremium && i >= FREE_STEPS
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground hover:bg-muted/80")
            }
          >
            {!free && !isPremium && i >= FREE_STEPS ? "🔒" : i + 1}
          </button>
        ))}
      </div>

      {/* Main content — NEVER lock steps 0 or 1 */}
      {isStepLocked ? (
        <div
          className="rounded-2xl border-2 border-[hsl(var(--gold))]/30
                      bg-gradient-to-b from-[hsl(var(--gold))]/5
                      to-[hsl(var(--gold))]/10 p-10 text-center"
        >
          <Lock className="mx-auto mb-4 h-10 w-10 text-[hsl(var(--gold))]" />
          <h3 className="text-base font-black text-foreground">
            {t("guide.premium.title")}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
            {t("guide.premium.subtitle")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("guide.premium.stepInfo", { free: FREE_STEPS, current: step + 1 })}
          </p>
          <button
            onClick={() => navigate("/paketi")}
            className="mt-6 block w-full max-w-xs mx-auto rounded-full
                       py-3.5 text-sm font-bold"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
              color: "hsl(var(--gold-foreground))",
            }}
          >
            {t("guide.premium.cta")}
          </button>
        </div>
      ) : (
        <>
          {/* Step field card */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <p className="text-[10px] font-medium text-muted-foreground mb-1">
              {t("guide.step")} {step + 1}
            </p>
            <h3 className="font-bold text-sm">{current.deField}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {current.bhsField}
            </p>
          </div>

          {/* Detail cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {cardConfig.map(({ key, label, icon, color }) => {
              const value = current[key as CardKey];
              if (!value) return null;
              return (
                <div key={key} className={`rounded-xl border p-4 ${color}`}>
                  <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
                    {icon} {label}
                  </h4>
                  <p className="text-xs leading-relaxed text-foreground/80">
                    {value}
                  </p>
                </div>
              );
            })}
            {current.note && (
              <div className="rounded-xl border p-4 border-gray-200 bg-gray-50
                              dark:border-gray-800 dark:bg-gray-900/30 sm:col-span-2">
                <h4 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold">
                  <Info className="h-3.5 w-3.5" /> {t("guide.card.note")}
                </h4>
                <p className="text-xs leading-relaxed text-foreground/80">
                  {current.note}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={step === 0}
          onClick={handlePrev}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {t("guide.back")}
        </Button>

        {!isStepLocked && (
          isLast ? (
            <Button
              size="sm"
              className="font-bold"
              style={{
                backgroundColor: "hsl(var(--gold))",
                color: "hsl(var(--gold-foreground))",
              }}
              onClick={onFinish}
            >
              {finishLabel || t("guide.done")}
            </Button>
          ) : (
            <Button
              size="sm"
              className="font-bold"
              style={{
                backgroundColor: "hsl(var(--gold))",
                color: "hsl(var(--gold-foreground))",
              }}
              onClick={handleNext}
            >
              {t("guide.next")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )
        )}
      </div>
    </div>
    </AuthGate>
  );
}
