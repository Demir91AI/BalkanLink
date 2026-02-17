import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-lg font-bold">
              Balkan<span className="text-primary">DE</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Sve informacije za život u Njemačkoj — na jednom mjestu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Navigacija</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/qa" className="hover:text-foreground transition-colors">Pitanja i odgovori</Link></li>
              <li><Link to="/directory" className="hover:text-foreground transition-colors">Imenik</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Pravne informacije</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutzerklärung</Link></li>
              <li><Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Kontakt</h4>
            <p className="text-sm text-muted-foreground">info@balkande.de</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BalkanDE. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
}
