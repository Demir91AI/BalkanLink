import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-lg font-bold">
              BalkanDE
            </Link>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Offizielles Informationsportal für das Leben in Deutschland.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">Navigation</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/qa" className="hover:text-primary-foreground transition-colors">Pitanja i odgovori</Link></li>
              <li><Link to="/directory" className="hover:text-primary-foreground transition-colors">Imenik</Link></li>
              <li><Link to="/ambasade-konzulati" className="hover:text-primary-foreground transition-colors">Ambasade i konzulati</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">Pravne informacije</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/impressum" className="hover:text-primary-foreground transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-primary-foreground transition-colors">Datenschutzerklärung</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary-foreground transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">Kontakt</h4>
            <p className="text-sm text-primary-foreground/70">info@balkande.de</p>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6">
          <p className="text-center text-xs text-primary-foreground/60">
            Alle Inhalte basieren auf offiziellen Bundesquellen.
          </p>
          <p className="mt-2 text-center text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} BalkanDE. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
}
