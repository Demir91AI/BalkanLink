import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Crown, Zap, Star, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigateBackOrHome } from "@/lib/navigation";

const features = [
  { name: "Lektionen pro Niveau", free: "10", premium: "40+" },
  { name: "Aufgabentypen", free: "4 Typen", premium: "4 Typen" },
  { name: "Fortschritt & XP", free: true, premium: true },
  { name: "Streak-System", free: true, premium: true },
  { name: "Alle Niveaus (A1–C2)", free: "Begrenzt", premium: true },
  { name: "Praxis-Szenarien", free: "Basis", premium: "Alle" },
  { name: "Unbegrenzte Übungen", free: false, premium: true },
  { name: "Prioritäts-Support", free: false, premium: true },
];

export default function TrainerPreise() {
  const navigate = useNavigate();

  return (
    <>
      <section className="border-b bg-primary py-8">
        <div className="container max-w-3xl">
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
                Wähle dein Lernpaket
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Investiere in deine Zukunft in Deutschland
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-3xl py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-black">Standard</h2>
            </div>
            <p className="text-3xl font-black">
              0 € <span className="text-sm font-normal text-muted-foreground">/ kostenlos</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Perfekt zum Kennenlernen
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/deutsch-trainer")}
              className="mt-6 h-11 w-full rounded-xl font-bold"
            >
              Kostenlos starten
            </Button>
            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li key={f.name} className="flex items-center gap-2 text-sm">
                  {f.free === true ? (
                    <Check className="h-4 w-4 text-[hsl(var(--success))]" />
                  ) : f.free === false ? (
                    <X className="h-4 w-4 text-muted-foreground/40" />
                  ) : (
                    <Check className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={f.free === false ? "text-muted-foreground/60" : ""}>
                    {f.name}
                    {typeof f.free === "string" && (
                      <span className="ml-1 text-xs text-muted-foreground">({f.free})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border-2 border-gold bg-card p-6 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-gold-foreground">
              🔥 Empfohlen
            </div>
            <div className="mb-4 flex items-center gap-2">
              <Crown className="h-5 w-5 text-gold" />
              <h2 className="text-lg font-black">Ultimate</h2>
            </div>
            <p className="text-3xl font-black">
              4,99 €{" "}
              <span className="text-sm font-normal text-muted-foreground">/ Monat</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Kompletter Zugriff auf alle Inhalte
            </p>
            <Button
              onClick={() => navigate("/premium")}
              className="mt-6 h-11 w-full rounded-xl bg-gold font-bold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light"
            >
              <Star className="mr-2 h-4 w-4" /> Jetzt freischalten
            </Button>
            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li key={f.name} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-gold" />
                  <span className="font-medium">
                    {f.name}
                    {typeof f.premium === "string" && (
                      <span className="ml-1 text-xs text-gold-dark">({f.premium})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 space-y-4">
          <h3 className="text-lg font-black">Häufige Fragen</h3>
          {[
            ["Was ist im Standard-Paket enthalten?", "Du bekommst Zugriff auf die ersten 10 Lektionen pro Niveau mit allen 4 Aufgabentypen, XP-System und Streak-Tracking."],
            ["Was bringt Ultimate?", "Unbegrenzter Zugriff auf über 240 Lektionen, alle Niveaus von A1 bis C2, und alle Praxis-Szenarien."],
            ["Kann ich jederzeit kündigen?", "Ja, du kannst dein Abonnement jederzeit kündigen. Es gibt keine Mindestlaufzeit."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-xl border bg-card p-4">
              <p className="text-sm font-bold">{q}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
