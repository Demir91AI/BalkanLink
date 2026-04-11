import { Link } from "react-router-dom";

const platformLinks = [
  { label: "Startseite", to: "/" },
  { label: "Pakete & Preise", to: "/paketi" },
  { label: "Anmelden", to: "/login" },
  { label: "Registrieren", to: "/register" },
];

const legalLinks = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "/agb" },
  { label: "Haftungsausschluss", to: "/disclaimer" },
  { label: "KI-Hinweis", to: "/ki-hinweis" },
  { label: "Cookie-Richtlinie", to: "/cookie-richtlinie" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-black text-foreground">
            <span className="rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">BL</span>
            <span>BalkanLink</span>
          </Link>
          <p className="max-w-md text-sm text-muted-foreground">
            Dein Wegweiser durch das deutsche System. Sichtbar bleiben nur Bereiche, die vollständig deutschsprachig bereinigt sind.
          </p>
          <p className="text-xs text-muted-foreground">
            BalkanLink bietet informative Hinweise und keine Rechtsberatung.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Plattform</h2>
          <nav className="space-y-2">
            {platformLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Rechtliches</h2>
          <nav className="space-y-2">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Kontakt</p>
            <a href="mailto:kontakt@balkanlink.de" className="transition-colors hover:text-foreground">
              kontakt@balkanlink.de
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 BalkanLink · Alle Rechte vorbehalten.</p>
          <p>Entwickelt von RealCore Digital.</p>
        </div>
      </div>
    </footer>
  );
}
