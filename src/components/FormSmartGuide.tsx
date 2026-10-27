import MembershipOffer from "@/components/membership/MembershipOffer";
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
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";

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
    <div ref={topRef} className="space-y-5 scroll-mt-24">

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 6, background: "#1E293B", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #B8952A, #D4AF37)", borderRadius: 99, transition: "width 0.3s ease" }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", whiteSpace: "nowrap" }}>
          Korak {step + 1} / {steps.length}
        </span>
      </div>

      {/* Step pills */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
        {steps.map((_, i) => {
          const isLocked = !isPremium && i >= FREE_STEPS;
          const isActive = i === step;
          const isCompleted = i < step;
          return (
            <button
              key={i}
              onClick={() => handleStepClick(i)}
              style={{
                flexShrink: 0, width: 32, height: 32, borderRadius: "50%",
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
        <MembershipOffer variant="compact" />
      ) : (
        <>
          {/* Step field card */}
          <div style={{ borderRadius: 14, border: "1px solid #1E293B", borderLeft: "4px solid #D4AF37", background: "#0F172A", padding: "16px 18px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#D4AF37", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Korak {step + 1}
            </p>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF", marginBottom: 4, lineHeight: 1.3 }}>{current.field}</h3>
            <p style={{ fontSize: 12, color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>{current.instruction}</p>
          </div>

          {/* Detail cards */}
          {current.cards && current.cards.length > 0 && (
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
              {current.cards.map((card, ci) =>
                cardConfig.map(({ key, label, icon, color }) => {
                  const value = card[key];
                  if (!value) return null;
                  const accentMap: Record<string, string> = {
                    "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20": "#3B82F6",
                    "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20": "#10B981",
                    "border-violet-200 bg-violet-50 dark:border-violet-900/40 dark:bg-violet-950/20": "#8B5CF6",
                    "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20": "#EF4444",
                    "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20": "#F59E0B",
                    "border-cyan-200 bg-cyan-50 dark:border-cyan-900/40 dark:bg-cyan-950/20": "#06B6D4",
                  };
                  const accent = accentMap[color] || "#D4AF37";
                  return (
                    <div key={`${ci}-${key}`} style={{ borderRadius: 12, border: "1px solid #1E293B", borderLeft: `3px solid ${accent}`, background: "#0F172A", padding: "12px 14px" }}>
                      <h4 style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: accent }}>
                        {icon} {label}
                      </h4>
                      <p style={{ fontSize: 12, lineHeight: 1.55, color: "#CBD5E1", margin: 0 }}>{value}</p>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
        <button
          disabled={step === 0}
          onClick={goToPreviousStep}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "1px solid #1E293B", background: step === 0 ? "#0F172A" : "#1E293B", color: step === 0 ? "#94A3B8" : "#CBD5E1", fontSize: 13, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer" }}
        >
          <ChevronLeft className="h-4 w-4" /> Nazad
        </button>
        {!isStepLocked && (
          <button
            disabled={step === steps.length - 1}
            onClick={handleNext}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", background: step === steps.length - 1 ? "#1E293B" : "linear-gradient(135deg, #B8952A, #D4AF37)", color: step === steps.length - 1 ? "#94A3B8" : "#000", fontSize: 13, fontWeight: 800, cursor: step === steps.length - 1 ? "not-allowed" : "pointer" }}
          >
            Dalje <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

