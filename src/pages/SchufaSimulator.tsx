import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Lock, Sparkles, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import AuthGate from "@/components/AuthGate";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { Button } from "@/components/ui/button";
import SchufaDisclaimer from "@/components/schufa/SchufaDisclaimer";
import SchufaQuestionnaire from "@/components/schufa/SchufaQuestionnaire";
import SchufaResult from "@/components/schufa/SchufaResult";
import SchufaActionPlan from "@/components/schufa/SchufaActionPlan";
import SchufaOfficialGuide from "@/components/schufa/SchufaOfficialGuide";
import { simulate, type SimInput, type SimResult } from "@/lib/schufa-simulator";

type Step = "questionnaire" | "result" | "plan" | "guide";

function SchufaSimulatorInner() {
  const { t } = useTranslation("schufa");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [step, setStep] = useState<Step>("questionnaire");
  const [result, setResult] = useState<SimResult | null>(null);

  const handleSubmit = (input: SimInput) => {
    setResult(simulate(input));
    setStep("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (s: Step) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setResult(null);
    setStep("questionnaire");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(225,55%,12%) 0%, hsl(225,50%,7%) 50%, hsl(225,45%,4%) 100%)",
      }}
    >
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        path="/schufa-simulator"
      />

      {!disclaimerAccepted && <SchufaDisclaimer onAccept={() => setDisclaimerAccepted(true)} />}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Hero header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">
              {t("hero.badge")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            {t("hero.headline1")}
            <br />
            <span className="text-[hsl(var(--gold))]">{t("hero.headline2")}</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            {t("hero.subline")}
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["questionnaire", "result", "plan", "guide"] as Step[]).map((s, i) => {
            const stepIndex = ["questionnaire", "result", "plan", "guide"].indexOf(step);
            const active = i <= stepIndex;
            return (
              <div
                key={s}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === stepIndex ? 36 : 18,
                  background: active ? "hsl(43,70%,53%)" : "hsla(0,0%,100%,0.1)",
                }}
              />
            );
          })}
        </div>

        {/* Content */}
        <div className="mb-8">
          {step === "questionnaire" && <SchufaQuestionnaire onSubmit={handleSubmit} />}
          {step === "result" && result && (
            <SchufaResult result={result} onRestart={restart} onContinue={() => goToStep("plan")} />
          )}
          {step === "plan" && result && (
            <SchufaActionPlan actionPlan={result.actionPlan} onContinue={() => goToStep("guide")} />
          )}
          {step === "guide" && <SchufaOfficialGuide onRestart={restart} />}
        </div>

        {/* Permanent legal footer */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 text-[11px] text-white/45 leading-relaxed">
          <p className="flex items-start gap-2">
            <Shield className="h-3.5 w-3.5 shrink-0 text-white/40 mt-0.5" />
            <span>
              <strong className="text-white/65">{t("footer.legalLabel")}</strong>{" "}
              {t("footer.legalBody")}{" "}
              <a
                href="https://www.meineschufa.de/de/datenkopie"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[hsl(var(--gold))]"
              >
                {t("footer.legalLink")}
              </a>
              {t("footer.legalAfter")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Premium gate — non-Premium users see a marketing landing instead of the simulator.
 */
function PremiumGate() {
  const { t } = useTranslation("schufa");
  const navigate = useLocalizedNavigate();
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(225,55%,12%) 0%, hsl(225,50%,7%) 50%, hsl(225,45%,4%) 100%)",
      }}
    >
      <div
        className="max-w-lg w-full rounded-2xl border border-[hsl(var(--gold))]/30 p-8 text-center shadow-2xl"
        style={{
          background: "linear-gradient(160deg, hsl(220,50%,10%,0.95), hsl(225,45%,7%,0.97))",
        }}
      >
        <div
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
          style={{ background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,60%,42%))" }}
        >
          <Lock className="h-6 w-6 text-[hsl(225,45%,6%)]" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">{t("gate.title")}</h1>
        <p className="text-sm text-white/60 mb-6 leading-relaxed">{t("gate.subline")}</p>
        <ul className="text-left space-y-2 mb-6 text-sm text-white/75">
          <li>{t("gate.feature1")}</li>
          <li>{t("gate.feature2")}</li>
          <li>{t("gate.feature3")}</li>
          <li>{t("gate.feature4")}</li>
          <li>{t("gate.feature5")}</li>
        </ul>
        <Button
          onClick={() => navigate("/paketi")}
          className="w-full h-12 font-bold text-[hsl(225,45%,6%)] transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
            boxShadow: "0 4px 20px hsla(43,70%,53%,0.35)",
          }}
        >
          {t("gate.cta")}
        </Button>
        <p className="mt-4 text-[11px] text-white/40">{t("gate.footnote")}</p>
      </div>
    </div>
  );
}

export default function SchufaSimulator() {
  const { isPremium } = usePremiumAccess();
  return (
    <AuthGate>
      {isPremium ? <SchufaSimulatorInner /> : <PremiumGate />}
    </AuthGate>
  );
}
