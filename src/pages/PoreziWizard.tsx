/**
 * /porezi/da-li-moram (BS) · /de/steuern/muss-ich-ueberhaupt
 * /hr/porezi/moram-li-uopce · /sr/porezi/da-li-moram
 *
 * Tax Wizard — 8-step interactive classifier. Premium-gated entry point,
 * fully client-side, no PII transmitted. See `porezi-wizard-data.ts` for
 * the legal references behind each branch.
 *
 * Layout: same shell as Anerkennung Navigator (PageNavBar, max-w-3xl,
 * cream hero). Result screen never quotes concrete refund amounts — only
 * qualitative direction + clear next-step guidance.
 */
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Calculator,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  RotateCcw,
  ArrowRight,
  Crown,
  Lock,
  ExternalLink,
} from "lucide-react";

import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import {
  WIZARD_STEPS,
  classify,
  type WizardAnswers,
  type WizardDeductibleId,
  type WizardOutcome,
  type WizardStep,
} from "@/lib/porezi-wizard-data";
import { POREZI_HUB_PATH } from "@/lib/porezi-modules";
import { langFromPath } from "@/lib/i18n-paths";
import { useLocation } from "react-router-dom";
import type { SupportedLanguage } from "@/i18n";

const SUPPORTED: SupportedLanguage[] = ["bs", "de", "hr", "sr"];

export default function PoreziWizard() {
  const { t } = useTranslation("porezi");
  const { pathname } = useLocation();
  const langFromUrl = langFromPath(pathname);
  const lang: SupportedLanguage = SUPPORTED.includes(langFromUrl)
    ? langFromUrl
    : "bs";

  const navigate = useLocalizedNavigate();
  const { isPremium, isLoggedIn } = usePremiumAccess();

  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);

  /** Active visible steps based on the current answers (skips hidden ones). */
  const visibleSteps: WizardStep[] = useMemo(
    () => WIZARD_STEPS.filter((s) => !s.show || s.show(answers)),
    [answers],
  );

  const isFinalScreen = stepIndex >= visibleSteps.length;
  const currentStep = visibleSteps[stepIndex];
  const outcome: WizardOutcome | null = isFinalScreen ? classify(answers) : null;

  const progress = visibleSteps.length
    ? Math.min(100, Math.round((stepIndex / visibleSteps.length) * 100))
    : 0;

  const hubPath = POREZI_HUB_PATH[lang];

  /* ─────────────────── Premium gate ─────────────────── */

  if (!isPremium) {
    return (
      <>
        <SEO
          title={t("wizard.seo.title")}
          description={t("wizard.seo.description")}
          path="/porezi/da-li-moram"
        />
        <div className="mx-auto max-w-2xl px-4 py-6 pb-28">
          <PageNavBar  showShare />
          <Card className="rounded-2xl border border-[hsl(var(--gold))]/30 shadow-sm">
            <CardContent className="p-6 sm:p-8 text-center">
              <Crown className="mx-auto h-10 w-10 text-[hsl(var(--gold))] mb-3" />
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                {t("wizard.gate.title")}
              </h1>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {t("wizard.gate.body")}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={() => navigate(isLoggedIn ? "/paketi" : "/register")}
                  className="btn-gold-gradient rounded-xl px-6"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isLoggedIn ? t("wizard.gate.ctaPremium") : t("wizard.gate.ctaLogin")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(hubPath)}
                  className="rounded-xl"
                >
                  {t("wizard.gate.ctaBack")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  /* ─────────────────── Handlers ─────────────────── */

  const handleSingleAnswer = (stepId: keyof WizardAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
  };

  const toggleDeductible = (id: WizardDeductibleId) => {
    setAnswers((prev) => {
      const current = prev.deductibles ?? [];
      // "none" is exclusive
      if (id === "none") {
        return { ...prev, deductibles: current.includes("none") ? [] : ["none"] };
      }
      const without = current.filter((x) => x !== "none");
      const next = without.includes(id)
        ? without.filter((x) => x !== id)
        : [...without, id];
      return { ...prev, deductibles: next };
    });
  };

  const canAdvance = (() => {
    if (!currentStep) return false;
    const value = answers[currentStep.id];
    if (currentStep.type === "multi") {
      return Array.isArray(value) && value.length > 0;
    }
    return typeof value === "string" && value.length > 0;
  })();

  const handleNext = () => {
    if (!canAdvance) return;
    // Re-evaluate visible steps after each answer (residency=no shortcut).
    const nextVisible = WIZARD_STEPS.filter(
      (s) => !s.show || s.show(answers),
    );
    if (stepIndex + 1 >= nextVisible.length) {
      setStepIndex(nextVisible.length); // → final
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      navigate(hubPath);
      return;
    }
    setStepIndex(stepIndex - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setStepIndex(0);
  };

  /* ─────────────────── Render ─────────────────── */

  return (
    <>
      <SEO
        title={t("wizard.seo.title")}
        description={t("wizard.seo.description")}
        path="/porezi/da-li-moram"
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar  showShare />

        {/* Header */}
        <div className="rounded-2xl bg-[#F5F0E8] p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <Calculator className="h-5 w-5 text-foreground" />
            </div>
            <Badge variant="outline" className="border-[hsl(var(--gold))]/40 text-xs">
              <Crown className="mr-1 h-3 w-3 text-[hsl(var(--gold))]" />
              {t("wizard.header.badge")}
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">
            {t("wizard.header.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("wizard.header.subtitle")}
          </p>
        </div>

        {/* Progress */}
        {!isFinalScreen && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>
                {t("wizard.progress.step", {
                  current: stepIndex + 1,
                  total: visibleSteps.length,
                })}
              </span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        {/* Step or Result */}
        {!isFinalScreen && currentStep ? (
          <StepCard
            step={currentStep}
            answers={answers}
            onSingle={(val) => handleSingleAnswer(currentStep.id, val)}
            onToggleMulti={toggleDeductible}
          />
        ) : (
          <ResultCard outcome={outcome} onRestart={handleRestart} />
        )}

        {/* Footer nav */}
        {!isFinalScreen && (
          <div className="mt-5 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handleBack}
              className="rounded-xl"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {stepIndex === 0 ? t("wizard.nav.exit") : t("wizard.nav.back")}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canAdvance}
              className="btn-gold-gradient rounded-xl px-6"
            >
              {stepIndex + 1 >= visibleSteps.length
                ? t("wizard.nav.finish")
                : t("wizard.nav.next")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Legal reminder — always visible */}
        <div className="mt-8 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">
            {t("wizard.legal.heading")}
          </p>
          <p className="leading-relaxed">{t("wizard.legal.body")}</p>
        </div>
      </div>
    </>
  );
}

/* ─────────────────── Step ─────────────────── */

function StepCard({
  step,
  answers,
  onSingle,
  onToggleMulti,
}: {
  step: WizardStep;
  answers: WizardAnswers;
  onSingle: (val: string) => void;
  onToggleMulti: (id: WizardDeductibleId) => void;
}) {
  const { t } = useTranslation("porezi");
  const titleKey = `wizard.steps.${step.id}.title`;
  const helpKey = `wizard.steps.${step.id}.help`;

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-1">{t(titleKey)}</h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {t(helpKey)}
        </p>

        {step.type === "single" ? (
          <RadioGroup
            value={(answers[step.id] as string) ?? ""}
            onValueChange={onSingle}
            className="space-y-2"
          >
            {step.options.map((opt) => {
              const id = `${step.id}-${opt.id}`;
              return (
                <Label
                  key={opt.id}
                  htmlFor={id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border border-border p-3 cursor-pointer transition-colors",
                    "hover:bg-muted/50",
                    (answers[step.id] as string) === opt.id &&
                      "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/5",
                  )}
                >
                  <RadioGroupItem value={opt.id} id={id} className="mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-tight">
                      {t(`wizard.steps.${step.id}.options.${opt.id}.label`)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {t(`wizard.steps.${step.id}.options.${opt.id}.desc`)}
                    </div>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
        ) : (
          <div className="space-y-2">
            {step.options.map((opt) => {
              const id = `${step.id}-${opt.id}`;
              const checked =
                Array.isArray(answers.deductibles) &&
                (answers.deductibles as string[]).includes(opt.id);
              return (
                <Label
                  key={opt.id}
                  htmlFor={id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border border-border p-3 cursor-pointer transition-colors",
                    "hover:bg-muted/50",
                    checked &&
                      "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/5",
                  )}
                >
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={() =>
                      onToggleMulti(opt.id as WizardDeductibleId)
                    }
                    className="mt-0.5"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-tight">
                      {t(`wizard.steps.${step.id}.options.${opt.id}.label`)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {t(`wizard.steps.${step.id}.options.${opt.id}.desc`)}
                    </div>
                  </div>
                </Label>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─────────────────── Result ─────────────────── */

function ResultCard({
  outcome,
  onRestart,
}: {
  outcome: WizardOutcome | null;
  onRestart: () => void;
}) {
  const { t } = useTranslation("porezi");

  if (!outcome) {
    return (
      <Card className="rounded-2xl border border-border">
        <CardContent className="p-6 text-sm text-muted-foreground">
          {t("wizard.result.incomplete")}
        </CardContent>
      </Card>
    );
  }

  const meta = OUTCOME_META[outcome];
  const Icon = meta.icon;

  return (
    <Card className={cn("rounded-2xl border-2 shadow-sm", meta.borderClass)}>
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              meta.iconBgClass,
            )}
          >
            <Icon className={cn("h-5 w-5", meta.iconClass)} />
          </div>
          <div className="min-w-0">
            <Badge
              variant="outline"
              className={cn("text-[10px] mb-1.5", meta.badgeClass)}
            >
              {t(`wizard.result.${outcome}.badge`)}
            </Badge>
            <h2 className="text-lg sm:text-xl font-bold leading-tight">
              {t(`wizard.result.${outcome}.title`)}
            </h2>
          </div>
        </div>

        <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
          {t(`wizard.result.${outcome}.summary`)}
        </p>

        <div className="rounded-xl bg-muted/50 p-3 mb-4">
          <p className="text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
            {t("wizard.result.nextStepsHeading")}
          </p>
          <ul className="space-y-1.5 text-sm text-foreground/90">
            {[1, 2, 3].map((n) => {
              const step = t(`wizard.result.${outcome}.steps.s${n}`, {
                defaultValue: "",
              });
              if (!step) return null;
              return (
                <li key={n} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[hsl(var(--gold))]">→</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-background p-3 mb-4 flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t(`wizard.result.${outcome}.legalRef`)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onRestart}
            className="rounded-xl"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {t("wizard.result.restart")}
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl"
          >
            <a
              href="https://www.elster.de/eportal/start"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("wizard.result.elsterLink")}
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const OUTCOME_META: Record<
  WizardOutcome,
  {
    icon: typeof CheckCircle2;
    iconClass: string;
    iconBgClass: string;
    borderClass: string;
    badgeClass: string;
  }
> = {
  mandatory: {
    icon: AlertTriangle,
    iconClass: "text-rose-600",
    iconBgClass: "bg-rose-500/10",
    borderClass: "border-rose-500/40",
    badgeClass: "border-rose-500/40 text-rose-700",
  },
  recommended: {
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    iconBgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/40",
    badgeClass: "border-emerald-500/40 text-emerald-700",
  },
  optional: {
    icon: Info,
    iconClass: "text-amber-600",
    iconBgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/40",
    badgeClass: "border-amber-500/40 text-amber-700",
  },
  nonResident: {
    icon: Info,
    iconClass: "text-blue-600",
    iconBgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/40",
    badgeClass: "border-blue-500/40 text-blue-700",
  },
};
