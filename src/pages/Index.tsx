import { Link } from "react-router-dom";
import {
  ArrowRight, FileText, Globe, Calculator, GraduationCap,
  Megaphone, Map, Shield, Bot, Building, Briefcase, Home,
  Heart, HelpCircle, BookOpen, CreditCard, UserRound
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const features = [
  {
    title: "Formulare & Muster",
    description: "Alle wichtigen deutschen Formulare mit Schritt-für-Schritt-Anleitungen ausfüllen.",
    to: "/formulare",
    icon: FileText,
  },
  {
    title: "Visa-Navigator",
    description: "Den passenden Visa-Typ finden und den Antragsprozess verstehen.",
    to: "/visa-navigator",
    icon: Globe,
  },
  {
    title: "Rechner & Tools",
    description: "Brutto-Netto, Steuerklassen und weitere Berechnungen auf einen Blick.",
    to: "/rechner",
    icon: Calculator,
  },
  {
    title: "Deutschkurs",
    description: "Interaktiver Sprachtrainer von A1 bis C2 mit Übungen und Fortschrittskontrolle.",
    to: "/deutsch-kurs",
    icon: GraduationCap,
  },
  {
    title: "Kleinanzeigen",
    description: "Jobangebote, Wohnungen, Dienstleistungen und mehr aus der Community.",
    to: "/kleinanzeigen",
    icon: Megaphone,
  },
  {
    title: "Community-Karte",
    description: "Balkan-Geschäfte, Restaurants und Dienstleister in deiner Nähe finden.",
    to: "/karte",
    icon: Map,
  },
  {
    title: "Dokumentenprüfung",
    description: "Dokumente per KI analysieren und auf Vollständigkeit prüfen lassen.",
    to: "/dokumente",
    icon: Bot,
  },
  {
    title: "Vorlagen",
    description: "Musterbriefe und Schreiben für Behörden, Vermieter und Arbeitgeber.",
    to: "/vorlagen",
    icon: BookOpen,
  },
  {
    title: "Wissensdatenbank",
    description: "Häufige Fragen und Antworten rund um das Leben in Deutschland.",
    to: "/wissensdatenbank",
    icon: HelpCircle,
  },
  {
    title: "Ratgeber",
    description: "Tipps zu Arbeit, Finanzen, Gesundheit und Alltag in Deutschland.",
    to: "/ratgeber",
    icon: Heart,
  },
  {
    title: "Wohnungsportale",
    description: "Die besten Portale für Wohnungssuche in Deutschland auf einen Blick.",
    to: "/wohnungen",
    icon: Home,
  },
  {
    title: "Stellenangebote",
    description: "Jobportale und Karrieremöglichkeiten in Deutschland entdecken.",
    to: "/stellenangebote",
    icon: Briefcase,
  },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="BalkanLink – Dein Wegweiser durch das deutsche System"
        description="Formulare, Visa-Navigator, KI-Assistent, Deutschkurs und Community für das Leben in Deutschland."
        path="/"
      />

      {/* Hero */}
      <section className="border-b bg-primary text-primary-foreground">
        <div className="container grid gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
              Alles auf einer Plattform
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Dein Wegweiser durch das deutsche System
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              Formulare, Visa, Rechner, Deutschkurs und mehr — alles auf einer Plattform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to={user ? "/formulare" : "/register"}>
                  {user ? "Formulare öffnen" : "Jetzt starten"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/ratgeber">Mehr erfahren</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold">Was dich erwartet</h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
              <li className="flex items-start gap-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                Über 20 Musterformulare mit deutschen Ausfüllhilfen
              </li>
              <li className="flex items-start gap-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                Visa-Navigator für alle gängigen Aufenthaltstitel
              </li>
              <li className="flex items-start gap-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                KI-gestützte Dokumentenprüfung und Sprachtrainer
              </li>
              <li className="flex items-start gap-3">
                <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                Community-Karte, Kleinanzeigen und Wissensdatenbank
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Alle Bereiche im Überblick</h2>
            <p className="mt-3 text-muted-foreground">
              Entdecke alle Funktionen, die dir das Leben in Deutschland erleichtern.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                  <Link to={card.to} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80">
                    Öffnen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/50 py-16">
        <div className="container text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Bereit loszulegen?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Erstelle ein kostenloses Konto und erhalte Zugang zu allen Grundfunktionen.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="font-semibold">
              <Link to="/register">Kostenlos registrieren</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/preise">Preise ansehen</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
