import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, Star, GraduationCap, X, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigateBackOrHome } from "@/lib/navigation";

const individualLevels = [
  { level: "A1", price: "9,99 €", desc: "Grundlagen – erste Schritte" },
  { level: "A2", price: "14,99 €", desc: "Alltag – einfache Gespräche" },
  { level: "B1", price: "14,99 €", desc: "Selbstständig kommunizieren" },
  { level: "B2", price: "19,99 €", desc: "Komplexere Situationen" },
  { level: "C1", price: "19,99 €", desc: "Anspruchsvoll & beruflich" },
  { level: "C2", price: "24,99 €", desc: "Professionelles Niveau" },
];

const packages = [
  {
    label: "Paket A",
    levels: "A1 + A2",
    subtitle: "Grundlagen für den Alltag",
    price: "19,99 €",
    singleTotal: "24,98 €",
    saving: "Du sparst 4,99 €",
    popular: false,
    topics: ["Arzt", "Supermarkt", "Vorstellung", "Wohnung", "Post", "Alltag"],
    reward: "1 mjesec Premium gratis",
    rewardIcon: "🎁",
  },
  {
    label: "Paket B",
    levels: "B1 + B2",
    subtitle: "Selbstständig kommunizieren",
    price: "29,99 €",
    singleTotal: "34,98 €",
    saving: "Du sparst 4,99 €",
    popular: true,
    topics: ["Bewerbung", "Telefon", "Büro", "Vertrag", "Bank", "Versicherung"],
    reward: "2 mjeseca Premium gratis",
    rewardIcon: "🎁",
  },
  {
    label: "Paket C",
    levels: "C1 + C2",
    subtitle: "Professionelles Niveau",
    price: "39,99 €",
    singleTotal: "44,98 €",
    saving: "Du sparst 4,99 €",
    popular: false,
    topics: ["Verhandlung", "Präsentation", "Konflikt", "Fachwissen", "Debatte", "Rhetorik"],
    reward: "3 mjeseca Premium gratis",
    rewardIcon: "🎁",
  },
];

const freeFeatures = [
  { text: "5 Lektionen pro Niveau", included: true },
  { text: "150 Aufgaben pro Lektion", included: true },
  { text: "5 Sprachassistent-Sätze", included: true },
  { text: "Alle Lektionen", included: false },
  { text: "Bis zu 1500 Aufgaben pro Lektion", included: false },
  { text: "Sprachassistent (500 Sätze)", included: false },
  { text: "Wertgutschein-Programm", included: false },
];

const ultimateFeatures = [
  "Alle Lektionen freischalten",
  "Bis zu 1500 Aufgaben pro Lektion",
  "Sprachassistent mit 500 Sätzen",
  "Alle Szenarien aus dem echten Leben",
  "Dynamische Aufgaben (immer neu)",
  "Smart Progress System",
  "Wertgutschein bei 100% Abschluss",
  "Kein Abo – einmal zahlen",
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
                BalkanLink Deutsch — Pakete & Preise
              </h1>
              <p className="text-xs text-primary-foreground/70">
                Deutsch für echte Situationen in Deutschland
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-3xl py-6 space-y-8">

        {/* ── FREE vs ULTIMATE comparison ── */}
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="mb-4 text-sm font-black text-center">Free vs. Ultimate</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-black text-muted-foreground">FREE</p>
              <ul className="space-y-2">
                {freeFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-1.5 text-[11px]">
                    {f.included ? (
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(var(--success))]" />
                    ) : (
                      <X className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/40" />
                    )}
                    <span className={f.included ? "font-medium" : "text-muted-foreground/60 line-through"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border-2 border-gold/30 bg-gradient-to-b from-gold/5 to-gold/10 p-4">
              <div className="mb-3 flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5 text-gold" />
                <p className="text-xs font-black text-gold-dark">ULTIMATE</p>
              </div>
              <ul className="space-y-2">
                {ultimateFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-[11px] font-medium">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── EINZELNE NIVEAUS ── */}
        <div>
          <h2 className="mb-3 text-sm font-black text-center">Einzelne Niveaus</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {individualLevels.map((lvl) => (
              <div key={lvl.level} className="rounded-xl border bg-card p-4 text-center">
                <span className="mb-1 inline-block rounded-full bg-primary px-3 py-0.5 text-[10px] font-black text-primary-foreground">
                  {lvl.level}
                </span>
                <p className="mt-2 text-lg font-black">{lvl.price}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{lvl.desc}</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#EAB308", marginTop: 4, marginBottom: 4 }}>
                  🎉 Promo cijena — prvih 6 mjeseci
                </p>
                <Button
                  onClick={() => navigate("/premium")}
                  variant="outline"
                  className="mt-3 h-8 w-full rounded-lg text-[11px] font-bold"
                >
                  Freischalten
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Hinweis: Wertgutscheine gibt es nur bei Paket-Kauf, nicht bei Einzelniveaus.
          </p>
        </div>

        {/* ── PAKETE (BEST VALUE) ── */}
        <div>
          <h2 className="mb-3 text-sm font-black text-center flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            Pakete – Beste Wahl
          </h2>

          <div className="flex flex-col gap-4">
            {packages.map((pkg) => (
              <div key={pkg.label} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary px-3.5 py-1 text-[11px] font-black text-primary-foreground">
                    {pkg.levels}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{pkg.subtitle}</span>
                  {pkg.popular && (
                    <span className="ml-auto rounded-full bg-[hsl(var(--success)/0.1)] px-2.5 py-0.5 text-[9px] font-bold text-[hsl(var(--success))]">
                      BEST VALUE
                    </span>
                  )}
                </div>

                <div className={`relative rounded-2xl border-2 bg-card px-5 py-6 sm:px-6 ${pkg.popular ? "border-gold shadow-[0_8px_30px_rgba(255,204,0,0.18)]" : "border-border shadow-sm"}`}>
                  {pkg.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3.5 py-0.5 text-[10px] font-bold text-gold-foreground shadow-sm">
                      🔥 Beliebteste Wahl
                    </div>
                  )}

                  <div className="flex items-center gap-2.5">
                    <Crown className={`h-4.5 w-4.5 ${pkg.popular ? "text-gold" : "text-muted-foreground"}`} />
                    <h3 className="text-[15px] font-black leading-snug">{pkg.label}: {pkg.subtitle}</h3>
                  </div>

                  <p className="mt-3 text-[28px] font-black leading-tight tracking-tight">
                    {pkg.price}
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">/ einmalig</span>
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground line-through">
                    Einzeln: {pkg.singleTotal}
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold text-[hsl(var(--success))]">
                    {pkg.saving}
                  </p>

                  {/* Reward highlight */}
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-gold/10 border border-gold/20 px-3 py-2">
                    <Gift className="h-4 w-4 text-gold shrink-0" />
                    <p className="text-[12px] font-bold text-gold-dark">
                      100% Abschluss → {pkg.reward}
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate("/premium")}
                    className={`mt-5 h-11 w-full rounded-xl text-[13px] font-bold ${pkg.popular ? "bg-gold text-gold-foreground shadow-[0_4px_20px_rgba(255,204,0,0.3)] hover:bg-gold-light" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                  >
                    <Star className="mr-1.5 h-3.5 w-3.5" /> Paket freischalten
                  </Button>

                  <ul className="mt-5 space-y-3">
                    {ultimateFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[13px] font-medium leading-relaxed">
                        <Check className={`h-4 w-4 shrink-0 ${pkg.popular ? "text-gold" : "text-primary"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {pkg.popular && (
                    <p className="mt-5 text-center text-[11px] font-semibold text-gold-dark">
                      ⭐ Die meisten Nutzer wählen dieses Paket
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WERTGUTSCHEIN INFO ── */}
        <div className="rounded-2xl border-2 border-gold/20 bg-gradient-to-b from-gold/5 to-gold/10 p-5">
          <h2 className="mb-3 text-sm font-black flex items-center gap-2">
            🎁 Wertgutschein-Programm
          </h2>
          <p className="text-xs font-semibold leading-relaxed mb-1">
            Schließe den Kurs ab und sichere dir als Premium-Nutzer einen Wertgutschein
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
            Nur für aktive Premium-Nutzer. Es gelten die{" "}
            <button onClick={() => navigate("/deutsch-trainer/bonusbedingungen")} className="text-primary underline">
              Bonusbedingungen
            </button>.
          </p>
          <div className="space-y-2">
            {[
              { label: "A1 + A2 kompletno", value: "1 mjesec Premium gratis" },
              { label: "B1 + B2 kompletno", value: "2 mjeseca Premium gratis" },
              { label: "C1 + C2 kompletno", value: "3 mjeseca Premium gratis" },
              { label: "A1–C2 + Godišnji Premium", value: "30€ Amazon.de Gutschein" },
            ].map((v) => (
              <div key={v.label} className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-xs">
                <span className="font-medium">{v.label}</span>
                <span className="font-black text-gold-dark">{v.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground leading-relaxed">
            Voraussetzung: Aktiver Premium-Zugang + 100% Abschluss aller Aufgaben im Paket. Gutscheine nur für Pakete, nicht für Einzelniveaus. 
            Der Wertgutschein ist eine freiwillige Bonusleistung – kein Rechtsanspruch. Manuelle Prüfung durch BalkanLink.
          </p>
        </div>

      </div>
    </>
  );
}
