import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link to="/" className="font-heading text-sm font-bold">
            Balkan<span className="text-primary">DE</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link to="/impressum" className="hover:text-foreground transition-colors">{t("footer.imprint")}</Link>
            <Link to="/datenschutz" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link to="/disclaimer" className="hover:text-foreground transition-colors">{t("footer.disclaimer")}</Link>
            <span>info@balkande.de</span>
          </nav>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} BalkanDE. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
