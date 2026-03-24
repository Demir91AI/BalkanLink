import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/8 bg-[#0B1F3A] text-white">
      <div className="container py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <BrandLogo variant="small" />
            <p className="mt-3 text-[13px] leading-relaxed text-white/35">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.navSection")}</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.navHome")}</Link>
              <Link to="/dolazak" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.navHow")}</Link>
              <Link to="/formulari" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.navFormulari") || "Formulari"}</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.legalSection")}</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/impressum" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.privacy")}</Link>
              <Link to="/agb" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.agb")}</Link>
              <Link to="/haftungsausschluss" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.haftung")}</Link>
              <Link to="/ki-hinweis" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">{t("footer.kiHinweis")}</Link>
              <Link to="/inhalte-melden" className="text-[13px] text-white/50 transition-colors hover:text-brand-orange">Inhalte melden</Link>
            </nav>
          </div>

          {/* Trust */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.trustSection")}</h4>
            <div className="flex items-center gap-1 text-brand-orange">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-1.5 text-[13px] font-semibold text-white/60">4.9 / 5</span>
            </div>
            <p className="mt-1.5 text-[12px] text-white/30">{t("footer.trustRating")}</p>
            <p className="mt-4 text-[13px] font-medium text-white/40">
              <span className="text-brand-orange font-semibold">10.000+</span> {t("footer.trustUsers")}
            </p>
          </div>
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <p className="mt-6 text-center text-[11px] text-white/15">
          © {new Date().getFullYear()} BalkanLink. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
