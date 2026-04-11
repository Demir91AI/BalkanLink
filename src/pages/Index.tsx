import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, ShieldCheck, UserRound } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const cards = [
  {
    title: "Pakete & Preise",
    description: "Alle sichtbaren Angebote und der aktuelle Premium-Status in einer klaren deutschen Oberfläche.",
    to: "/paketi",
    cta: "Preise ansehen",
    icon: CreditCard,
  },
  {
    title: "Konto",
    description: "Anmelden, registrieren und persönliche Daten direkt im Benutzerkonto verwalten.",
    to: "/profil",
    cta: "Zum Konto",
    icon: UserRound,
  },
  {
    title: "Rechtliches",
    description: "Impressum, Datenschutz, AGB und alle rechtlichen Hinweise bleiben vollständig verfügbar.",
    to: "/impressum",
    cta: "Rechtliches öffnen",
    icon: ShieldCheck,
  },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="BalkanLink – deutschsprachige Plattform"
        description="Deutschsprachiger Kernbereich mit Startseite, Paketen, Konto und rechtlichen Informationen."
        path="/"
      />

      <section className="border-b bg-primary text-primary-foreground">
        <div className="container grid gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
              Deutschsprachiger Kernbereich
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Die sichtbare Plattform wurde auf vollständig deutsche Inhalte reduziert.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              Alle Bereiche mit gemischtem Sprachstand wurden konsequent aus der Navigation entfernt. Verfügbar bleiben nur die sauber bereinigten Seiten.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/paketi">Pakete ansehen</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to={user ? "/profil" : "/register"}>
                  {user ? "Mein Profil öffnen" : "Konto erstellen"}
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold">Aktiv sichtbar</h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                Startseite, Kontobereich und Preisübersicht sind vollständig auf Deutsch bereinigt.
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                Rechtliche Seiten und Authentifizierung bleiben erreichbar.
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                Noch nicht bereinigte Funktionsbereiche wurden vollständig ausgeblendet.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Verfügbare Bereiche</h2>
            <p className="mt-3 text-muted-foreground">
              Hier findest du nur Seiten, die aktuell ohne Sprachmischung bereitgestellt werden.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              const target = card.title === "Konto" && !user ? "/register" : card.to;

              return (
                <article key={card.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                  <Link to={target} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80">
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
