import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, Star, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigateBackOrHome } from "@/lib/navigation";

const tiers = [
  {
    label: "A1 – A2",
    subtitle: "Grundlagen für den Alltag",
    price: "19,99 €",
    popular: false,
    topics: ["Arzt", "Supermarkt", "Vorstellung", "Wohnung", "Post", "Alltag"],
  },
  {
    label: "B1 – B2",
    subtitle: "Selbstständig kommunizieren in Deutschland",
    price: "29,99 €",
    popular: true,
    topics: ["Bewerbung", "Telefon", "Büro", "Vertrag", "Bank", "Versicherung"],
  },
  {
    label: "C1 – C2",
    subtitle: "Professionelles Niveau",
    price: "39,99 €",
    popular: false,
    topics: ["Verhandlung", "Präsentation", "Konflikt", "Fachwissen", "Debatte"],
  },
];

const ultimateFeatures = [
  "Alle Szenarien aus dem echten Leben",
  "Dynamische Aufgaben (immer neu)",
  "Schneller Fortschritt (mehr XP)",
  "Zugriff auf alle Niveaus",
  "Realistische Trainingssituationen",
  "Smart Progress System",
  "Neue Inhalte zuerst",
];

export default function TrainerPreise() {
  const navigate = useNavigate();

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-3xl">
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

      <div className="container max-w-3xl py-6 space-y-8">

        {/* Per-level Ultimate cards */}
        {tiers.map((tier) => (
          <div key={tier.label} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary px-3.5 py-1 text-[11px] font-black text-primary-foreground">
                {tier.label}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{tier.subtitle}</span>
            </div>

            <div className={`relative rounded-xl border-2 bg-card p-5 ${tier.popular ? "border-gold shadow-[0_8px_30px_rgba(255,204,0,0.18)]" : "border-border shadow-sm"}`}>
              {tier.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[10px] font-bold text-gold-foreground shadow-sm">
                  🔥 Beliebteste Wahl
                </div>
              )}
              <div className="mb-2 flex items-center gap-2">
                <Crown className={`h-4 w-4 ${tier.popular ? "text-gold" : "text-muted-foreground"}`} />
                <h3 className="text-sm font-black">{tier.subtitle}</h3>
              </div>
              <p className="text-2xl font-black">
                {tier.price}
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">/ einmalig</span>
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">5 Lektionen kostenlos testen</p>
              <Button
                onClick={() => navigate("/premium")}
                className={`mt-4 h-10 w-full rounded-xl text-xs font-bold ${tier.popular ? "bg-gold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
              >
                <Star className="mr-1.5 h-3.5 w-3.5" /> Jetzt freischalten
              </Button>
              <ul className="mt-4 space-y-2">
                {ultimateFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs font-medium">
                    <Check className={`h-3.5 w-3.5 shrink-0 ${tier.popular ? "text-gold" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              {tier.popular && (
                <p className="mt-4 text-center text-[11px] font-semibold text-gold-dark">
                  ⭐ Die meisten Nutzer wählen dieses Paket
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 pl-0.5">
              {tier.topics.map((t) => (
                <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>
    </>
  );
}
