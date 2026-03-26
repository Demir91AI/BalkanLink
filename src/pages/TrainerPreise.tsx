import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Crown, Zap, Star, GraduationCap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { navigateBackOrHome } from "@/lib/navigation";

const tiers = [
  {
    label: "A1 – A2",
    subtitle: "Grundlagen & Alltag",
    standard: "2,99 €",
    ultimate: "6,99 €",
    topics: ["Arzt", "Supermarkt", "Vorstellung", "Wohnung", "Post", "Alltag"],
  },
  {
    label: "B1 – B2",
    subtitle: "Selbstständigkeit & Arbeit",
    standard: "7,99 €",
    ultimate: "11,99 €",
    topics: ["Bewerbung", "Telefon", "Büro", "Vertrag", "Bank", "Versicherung"],
  },
  {
    label: "C1 – C2",
    subtitle: "Professionell & Feinschliff",
    standard: "12,99 €",
    ultimate: "16,99 €",
    topics: ["Verhandlung", "Präsentation", "Konflikt", "Fachwissen", "Debatte"],
  },
];

const standardFeatures = [
  "Alle Lektionen des Niveaus",
  "4 Aufgabentypen",
  "Fortschritt & XP",
  "Streak-System",
];

const ultimateExtras = [
  "Alles aus Standard",
  "Mehr Aufgabenvarianten",
  "Erweiterte Szenarien",
  "Schnellerer Fortschritt",
  "Prioritäts-Support",
];

const faqs = [
  {
    q: "Was bekomme ich im Standard-Paket?",
    a: "Du erhältst Zugriff auf alle Lektionen des gewählten Niveaus mit 4 Aufgabentypen, XP-System und Streak-Tracking.",
  },
  {
    q: "Was ist im Ultimate-Paket enthalten?",
    a: "Zusätzlich zu allen Standard-Inhalten bekommst du mehr Aufgabenvarianten, erweiterte Praxis-Szenarien und schnelleren Fortschritt.",
  },
  {
    q: "Kann ich kostenlos testen?",
    a: "Ja, die ersten 10 Lektionen pro Niveau sind komplett kostenlos und sofort verfügbar.",
  },
  {
    q: "Für wen ist das geeignet?",
    a: "Für alle, die Deutsch in realen Alltagssituationen trainieren möchten – ob Anfänger oder Fortgeschrittene.",
  },
  {
    q: "Wie lange dauert eine Lektion?",
    a: "Eine Lektion dauert ca. 2–5 Minuten und besteht aus 4–6 kurzen, interaktiven Aufgaben.",
  },
  {
    q: "Kann ich jederzeit kündigen?",
    a: "Ja, es gibt keine Mindestlaufzeit. Du kannst jederzeit kündigen.",
  },
  {
    q: "Muss ich Grammatik lernen?",
    a: "Nein. Der Deutsch Trainer fokussiert auf praktische Situationen. Grammatik lernst du nebenbei durch die Übungen.",
  },
];

export default function TrainerPreise() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <section className="border-b bg-primary py-8">
        <div className="container max-w-4xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-4 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-gold" />
            <div>
              <h1 className="text-xl font-black text-primary-foreground sm:text-2xl">
                Wähle dein Niveau und deinen Lernmodus
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Deutsch für echte Situationen in Deutschland
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-4xl py-8 space-y-10">
        {/* Free CTA */}
        <div className="rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm font-bold">🎯 Erst mal testen?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Die ersten 10 Lektionen pro Niveau sind komplett kostenlos.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/deutsch-trainer")}
            className="mt-4 h-11 rounded-xl px-8 font-bold"
          >
            Kostenlos starten
          </Button>
        </div>

        {/* Per-level pricing */}
        {tiers.map((tier) => (
          <div key={tier.label} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-black text-primary-foreground">
                {tier.label}
              </span>
              <span className="text-sm font-medium text-muted-foreground">{tier.subtitle}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Standard */}
              <div className="rounded-2xl border bg-card p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-base font-black">Standard</h3>
                </div>
                <p className="text-3xl font-black">
                  {tier.standard}{" "}
                  <span className="text-sm font-normal text-muted-foreground">/ einmalig</span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/premium")}
                  className="mt-5 h-10 w-full rounded-xl font-bold"
                >
                  Standard wählen
                </Button>
                <ul className="mt-5 space-y-2.5">
                  {standardFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ultimate */}
              <div className="relative rounded-2xl border-2 border-gold bg-card p-6 shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-gold-foreground">
                  🔥 Empfohlen
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-gold" />
                  <h3 className="text-base font-black">Ultimate</h3>
                </div>
                <p className="text-3xl font-black">
                  {tier.ultimate}{" "}
                  <span className="text-sm font-normal text-muted-foreground">/ einmalig</span>
                </p>
                <Button
                  onClick={() => navigate("/premium")}
                  className="mt-5 h-10 w-full rounded-xl bg-gold font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
                >
                  <Star className="mr-2 h-4 w-4" /> Ultimate wählen
                </Button>
                <ul className="mt-5 space-y-2.5">
                  {ultimateExtras.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-medium">
                      <Check className="h-4 w-4 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Topics for this tier */}
            <div className="flex flex-wrap gap-2 pl-1">
              {tier.topics.map((t) => (
                <span key={t} className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Comparison table */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="grid grid-cols-3 border-b bg-muted/50 px-5 py-3 text-xs font-bold">
            <span>Feature</span>
            <span className="text-center">Standard</span>
            <span className="text-center">Ultimate</span>
          </div>
          {[
            { name: "Lektionen pro Niveau", std: "40+", ult: "40+" },
            { name: "Aufgabentypen", std: "4", ult: "4+" },
            { name: "Fortschritt & XP", std: true, ult: true },
            { name: "Streak-System", std: true, ult: true },
            { name: "Praxis-Szenarien", std: "Basis", ult: "Alle" },
            { name: "Aufgabenvarianten", std: "Fest", ult: "Erweitert" },
            { name: "Schnellerer Fortschritt", std: false, ult: true },
            { name: "Prioritäts-Support", std: false, ult: true },
          ].map((row) => (
            <div key={row.name} className="grid grid-cols-3 items-center border-b last:border-0 px-5 py-3 text-sm">
              <span>{row.name}</span>
              <span className="flex justify-center">
                {row.std === true ? (
                  <Check className="h-4 w-4 text-[hsl(var(--success))]" />
                ) : row.std === false ? (
                  <X className="h-4 w-4 text-muted-foreground/40" />
                ) : (
                  <span className="text-xs text-muted-foreground">{row.std}</span>
                )}
              </span>
              <span className="flex justify-center">
                {row.ult === true ? (
                  <Check className="h-4 w-4 text-gold" />
                ) : (
                  <span className="text-xs font-medium text-gold-dark">{row.ult}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-black">Häufige Fragen zum Deutsch Trainer</h2>
          <Accordion type="single" collapsible className="rounded-2xl border bg-card">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-0 px-5">
                <AccordionTrigger className="text-sm font-bold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl border-2 border-gold/30 bg-gold/5 p-8 text-center">
          <GraduationCap className="mx-auto mb-3 h-10 w-10 text-gold" />
          <p className="text-base font-black">Bereit für besseres Deutsch?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Starte jetzt kostenlos und entscheide später.
          </p>
          <Button
            onClick={() => navigate("/deutsch-trainer")}
            className="mt-5 h-12 rounded-full bg-gold px-10 text-sm font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
          >
            Kostenlos starten <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
