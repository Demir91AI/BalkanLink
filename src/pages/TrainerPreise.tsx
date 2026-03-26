import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Crown, Zap, Star, GraduationCap, ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  "Zugriff auf Lektionen",
  "4 Aufgabentypen",
  "Grundlagen üben",
  "Feste Aufgaben",
];

const ultimateFeatures = [
  "Alle Szenarien aus dem echten Leben",
  "Dynamische Aufgaben (immer neu)",
  "Schneller Fortschritt (mehr XP)",
  "Zugriff auf alle Niveaus",
  "Realistische Trainingssituationen",
  "Neue Inhalte zuerst",
];

export default function TrainerPreise() {
  const navigate = useNavigate();

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-4xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-3 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-gold" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">
                Pakete & Optionen
              </h1>
              <p className="text-xs text-primary-foreground/70">
                Deutsch für echte Situationen in Deutschland
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-4xl py-6 space-y-8">
        {/* Free CTA */}
        <div className="rounded-xl border bg-card p-5 text-center">
          <p className="text-sm font-bold">🎯 Erst mal testen?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Die ersten 10 Lektionen pro Niveau sind komplett kostenlos.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/deutsch-trainer")}
            className="mt-3 h-10 rounded-xl px-6 text-xs font-bold"
          >
            Kostenlos starten
          </Button>
        </div>

        {/* Per-level pricing */}
        {tiers.map((tier) => (
          <div key={tier.label} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary px-3.5 py-1 text-[11px] font-black text-primary-foreground">
                {tier.label}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{tier.subtitle}</span>
            </div>

            <div className="grid gap-3 md:grid-cols-2 md:items-start">
              {/* Standard – neutral, understated */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-bold text-muted-foreground">Grundlagen</h3>
                </div>
                <p className="text-2xl font-black">
                  {tier.standard}
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">/ einmalig</span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/premium")}
                  className="mt-4 h-9 w-full rounded-xl text-xs font-bold"
                >
                  Standard wählen
                </Button>
                <p className="mt-1.5 text-center text-[10px] text-muted-foreground">Basisfunktionen</p>
                <ul className="mt-4 space-y-2">
                  {standardFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ultimate – dominant, highlighted */}
              <div className="relative rounded-xl border-2 border-gold bg-card p-5 shadow-[0_8px_30px_rgba(255,204,0,0.12)] md:scale-[1.03] md:origin-top">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[10px] font-bold text-gold-foreground shadow-sm">
                  🔥 Empfohlen
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Crown className="h-4 w-4 text-gold" />
                  <h3 className="text-sm font-black">Deutsch im echten Leben</h3>
                </div>
                <p className="text-2xl font-black">
                  {tier.ultimate}
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">/ einmalig</span>
                </p>
                <Button
                  onClick={() => navigate("/premium")}
                  className="mt-4 h-10 w-full rounded-xl bg-gold text-xs font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
                >
                  <Star className="mr-1.5 h-3.5 w-3.5" /> Jetzt starten
                </Button>
                <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
                  Starte sofort – keine Verpflichtung
                </p>
                <ul className="mt-4 space-y-2">
                  {ultimateFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs font-medium">
                      <Check className="h-3.5 w-3.5 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center text-[11px] font-semibold text-gold-dark">
                  ⭐ Die meisten Nutzer wählen Ultimate
                </p>
              </div>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5 pl-0.5">
              {tier.topics.map((t) => (
                <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Comparison table */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="grid grid-cols-3 border-b bg-muted/50 px-4 py-2.5 text-[11px] font-bold">
            <span>Feature</span>
            <span className="text-center">Standard</span>
            <span className="text-center">Ultimate</span>
          </div>
          {[
            { name: "Lektionen pro Niveau", std: "40+", ult: "40+" },
            { name: "Aufgabentypen", std: "4", ult: "4+" },
            { name: "Fortschritt & XP", std: true, ult: true },
            { name: "Streak-System", std: true, ult: true },
            { name: "Praxis-Szenarien", std: "Begrenzt", ult: "Alle" },
            { name: "Dynamische Aufgaben", std: false, ult: true },
            { name: "Alle Niveaus", std: false, ult: true },
            { name: "Smart Progress", std: false, ult: true },
            { name: "Schnellerer Fortschritt", std: false, ult: true },
            { name: "Neue Inhalte zuerst", std: false, ult: true },
          ].map((row) => (
            <div key={row.name} className="grid grid-cols-3 items-center border-b last:border-0 px-4 py-2.5 text-xs">
              <span>{row.name}</span>
              <span className="flex justify-center">
                {row.std === true ? (
                  <Check className="h-3.5 w-3.5 text-muted-foreground/60" />
                ) : row.std === false ? (
                  <X className="h-3.5 w-3.5 text-muted-foreground/30" />
                ) : (
                  <span className="text-[11px] text-muted-foreground">{row.std}</span>
                )}
              </span>
              <span className="flex justify-center">
                {row.ult === true ? (
                  <Check className="h-3.5 w-3.5 text-gold" />
                ) : (
                  <span className="text-[11px] font-medium text-gold-dark">{row.ult}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* FAQ link */}
        <div className="text-center">
          <button
            onClick={() => navigate("/deutsch-trainer/faq")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <HelpCircle className="h-4 w-4" />
            Fragen? Hier klicken
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-xl border border-gold/20 bg-gold/5 p-6 text-center">
          <GraduationCap className="mx-auto mb-2 h-8 w-8 text-gold" />
          <p className="text-sm font-black">Bereit für besseres Deutsch?</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Starte jetzt kostenlos und entscheide später.
          </p>
          <Button
            onClick={() => navigate("/deutsch-trainer")}
            className="mt-4 h-10 rounded-full bg-gold px-8 text-xs font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
          >
            Kostenlos starten <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </>
  );
}
