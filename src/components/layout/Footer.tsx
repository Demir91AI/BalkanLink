import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-balkanlink.png";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/8 bg-[#0B1F3A] text-white">
      <div className="container py-8 sm:py-10 lg:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="BalkanLink" className="h-7 w-auto object-contain" />
              <span className="font-heading text-lg font-extrabold tracking-tight">
                Balkan<span className="text-gold">Link</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Sve što ti treba za život u Njemačkoj — na jednom mjestu.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">{t("footer.legal")}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/impressum" className="text-sm text-white/50 transition-colors hover:text-gold">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-sm text-white/50 transition-colors hover:text-gold">{t("footer.privacy")}</Link>
              <Link to="/haftungsausschluss" className="text-sm text-white/50 transition-colors hover:text-gold">{t("footer.haftung")}</Link>
              <Link to="/mitgliedschaft" className="text-sm text-white/50 transition-colors hover:text-gold">{t("footer.mitgliedschaft")}</Link>
              <Link to="/ki-hinweis" className="text-sm text-white/50 transition-colors hover:text-gold">{t("footer.kiHinweis")}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">{t("footer.contact")}</h4>
            <p className="text-sm text-white/50">info@balkanlink.de</p>
          </div>

          <div className="hidden lg:block" />
        </div>

        <div className="section-separator mt-8" />

        <p className="mt-6 text-center text-xs text-white/20">
          © {new Date().getFullYear()} BalkanLink. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
