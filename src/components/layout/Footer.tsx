import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-lg font-extrabold tracking-tight">
              Balkan<span className="text-gold">DE</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/50">
              {t("hero.slide1.subtitle")}
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-foreground/40">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/impressum" className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">Impressum</Link>
              <Link to="/datenschutz" className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">Datenschutz</Link>
              <Link to="/haftungsausschluss" className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">Haftungsausschluss</Link>
              <Link to="/mitgliedschaft" className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">Mitgliedschaft</Link>
              <Link to="/ki-hinweis" className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">KI-Hinweis</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-foreground/40">{t("footer.contact")}</h4>
            <p className="text-sm text-primary-foreground/70">info@balkande.de</p>
          </div>

          {/* Spacer for grid alignment */}
          <div className="hidden lg:block" />
        </div>

        <div className="section-separator mt-8" />

        <p className="mt-6 text-center text-xs text-primary-foreground/30">
          © {new Date().getFullYear()} BalkanDE. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
