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
    <div ref={topRef} className="space-y-5 scroll-mt-24">

      {/* Header */}
      <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", marginBottom: 6, letterSpacing: "-0.01em" }}>
          {t("guide.wizardTitle")}
        </h2>
        <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>
          {t("guide.wizardSubtitle")}
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 6, background: "#1E293B", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #B8952A, #D4AF37)", borderRadius: 99, transition: "width 0.3s ease" }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", whiteSpace: "nowrap" }}>
          {t("guide.step")} {step + 1} / {steps.length}
        </span>
      </div>

      {/* Step pills */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
        {steps.map((_, i) => {
          const isLocked = !free && !isPremium && i >= FREE_STEPS;
          const isActive = i === step;
          const isCompleted = i < step;
          return (
            <button
              key={i}
              onClick={() => handleStepClick(i)}
              style={{
                flexShrink: 0,
                width: 32, height: 32,
                borderRadius: "50%",
                border: isActive ? "2px solid #D4AF37" : isCompleted ? "2px solid rgba(212,175,55,0.4)" : "2px solid #334155",
                background: isActive ? "#D4AF37" : isCompleted ? "rgba(212,175,55,0.15)" : "#0F172A",
                color: isActive ? "#000" : isCompleted ? "#D4AF37" : isLocked ? "#94A3B8" : "#CBD5E1",
                fontSize: 12, fontWeight: 700,
                cursor: isLocked ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s"
              }}
            >
              {isLocked ? "🔒" : i + 1}
            </button>
          );
        })}
      </div>

      {/* Main content */}
      {isStepLocked ? (
        <div style={{ borderRadius: 16, border: "2px solid rgba(212,175,55,0.3)", background: "linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.1))", padding: "40px 24px", textAlign: "center" }}>
          <Lock style={{ margin: "0 auto 16px", color: "#D4AF37", width: 40, height: 40 }} />
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>
            {t("guide.premium.title")}
          </h3>
          <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4, maxWidth: 280, margin: "0 auto 4px" }}>
            {t("guide.premium.subtitle")}
          </p>
          <p style={{ fontSize: 11, color: "#64748B", marginBottom: 24 }}>
            {t("guide.premium.stepInfo", { free: FREE_STEPS, current: step + 1 })}
          </p>
          <button
            onClick={() => navigate("/paketi")}
            style={{ display: "block", width: "100%", maxWidth: 280, margin: "0 auto", borderRadius: 99, padding: "14px 24px", fontSize: 14, fontWeight: 800, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #B8952A, #D4AF37)", color: "#000" }}
          >
            {t("guide.premium.cta")}
          </button>
        </div>
      ) : (
        <>
          {/* Step field card */}
          <div style={{ borderRadius: 14, border: "1px solid #1E293B", borderLeft: "4px solid #D4AF37", background: "#0F172A", padding: "16px 18px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#D4AF37", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {t("guide.step")} {step + 1}
            </p>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF", marginBottom: 4, lineHeight: 1.3 }}>{current.deField}</h3>
            <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>{current.bhsField}</p>
          </div>

          {/* Detail cards */}
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
            {cardConfig.map(({ key, label, icon, color }) => {
              const value = current[key as CardKey];
              if (!value) return null;
              const borderColors: Record<string, string> = {
                "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20": "#3B82F6",
                "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20": "#10B981",
                "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20": "#8B5CF6",
                "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20": "#EF4444",
                "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20": "#F59E0B",
                "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20": "#06B6D4",
              };
              const accent = borderColors[color] || "#D4AF37";
              return (
                <div key={key} style={{ borderRadius: 12, border: "1px solid #1E293B", borderLeft: `3px solid ${accent}`, background: "#0F172A", padding: "12px 14px" }}>
                  <h4 style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: accent }}>
                    {icon} {label}
                  </h4>
                  <p style={{ fontSize: 12, lineHeight: 1.55, color: "#CBD5E1", margin: 0 }}>{value}</p>
                </div>
              );
            })}
            {current.note && (
              <div style={{ borderRadius: 12, border: "1px solid #1E293B", borderLeft: "3px solid #64748B", background: "#0F172A", padding: "12px 14px", gridColumn: "1 / -1" }}>
                <h4 style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#94A3B8" }}>
                  <Info size={13} /> {t("guide.card.note")}
                </h4>
                <p style={{ fontSize: 12, lineHeight: 1.55, color: "#CBD5E1", margin: 0 }}>{current.note}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
        <button
          disabled={step === 0}
          onClick={handlePrev}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "1px solid #1E293B", background: step === 0 ? "#0F172A" : "#1E293B", color: step === 0 ? "#94A3B8" : "#CBD5E1", fontSize: 13, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer" }}
        >
          <ChevronLeft size={16} /> {t("guide.back")}
        </button>
        {!isStepLocked && (
          isLast ? (
            <button
              onClick={onFinish}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #B8952A, #D4AF37)", color: "#000", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
            >
              {finishLabel || t("guide.done")}
            </button>
          ) : (
            <button
              onClick={handleNext}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #B8952A, #D4AF37)", color: "#000", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
            >
              {t("guide.next")} <ChevronRight size={16} />
            </button>
          )
        )}
      </div>
    </div>
    </AuthGate>
  );
}
