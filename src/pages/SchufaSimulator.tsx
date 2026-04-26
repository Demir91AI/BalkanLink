import { useState } from "react";
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
        title="Bonitet Simulator — Indikativna procjena kreditne sposobnosti"
        description="Edukativni simulator kreditne sposobnosti za naše ljude u Njemačkoj. Razumij Schufa faktore prije nego što ti banka kaže Nein. Nije zvanični Schufa Score."
        path="/schufa-simulator"
      />

      {!disclaimerAccepted && <SchufaDisclaimer onAccept={() => setDisclaimerAccepted(true)} />}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Hero header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/30 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">
              Premium · Bonitet Simulator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            Razumij svoju kreditnu sposobnost
            <br />
            <span className="text-[hsl(var(--gold))]">prije nego ti banka kaže "Nein"</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            Edukativna procjena bazirana na Schufa javnim faktorima. 100% anonimno —
            sve se računa u tvom browseru.
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
              <strong className="text-white/65">Pravna napomena:</strong> Ovo je edukativni simulator.
              NIJE zvanični Schufa Score. Procjena je orijentaciona i bazirana na javnim Schufa scoring
              faktorima (§31 BDSG). Stvarni Score možeš dobiti samo besplatnim{" "}
              <a
                href="https://www.meineschufa.de/de/datenkopie"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[hsl(var(--gold))]"
              >
                Datenkopie zahtjevom (§15 DSGVO)
              </a>
              . Banke, stanodavci i poslodavci koriste isključivo zvanični Schufa Score. BalkanLink
              ne snosi odgovornost za odluke donesene na osnovu ove procjene. Ovo nije pravni ni
              finansijski savjet.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Premium gate — ne-Premium korisnici vide marketing landing umjesto simulatora.
 */
function PremiumGate() {
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
        <h1 className="text-2xl font-black text-white mb-2">Bonitet Simulator je Premium</h1>
        <p className="text-sm text-white/60 mb-6 leading-relaxed">
          Edukativna procjena tvoje kreditne sposobnosti, personalizirani 6-mjesečni plan
          poboljšanja i kompletan vodič za zvanični Schufa Datenkopie — samo za Premium korisnike.
        </p>
        <ul className="text-left space-y-2 mb-6 text-sm text-white/75">
          <li>✓ Indikativna procjena u 5 minuta</li>
          <li>✓ Top 6 faktora koji utječu na tvoj profil</li>
          <li>✓ Personalizirani plan poboljšanja za 6 mjeseci</li>
          <li>✓ Vodič kako dobiti BESPLATAN zvanični Schufa Auskunft</li>
          <li>✓ 100% anonimno — ništa se ne čuva</li>
        </ul>
        <Button
          onClick={() => navigate("/paketi")}
          className="w-full h-12 font-bold text-[hsl(225,45%,6%)] transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
            boxShadow: "0 4px 20px hsla(43,70%,53%,0.35)",
          }}
        >
          Otključaj Premium — 9.99€/mj
        </Button>
        <p className="mt-4 text-[11px] text-white/40">
          Nije zvanični Schufa Score · Edukativni simulator
        </p>
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
