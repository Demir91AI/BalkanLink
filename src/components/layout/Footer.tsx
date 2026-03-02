import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/8 bg-[#0B1F3A] text-white">
      <div className="container py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="shrink-0">
                <defs>
                  <linearGradient id="bl-f" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#22d3ee"/>
                    <stop offset="100%" stopColor="#34d399"/>
                  </linearGradient>
                </defs>
                <text x="2" y="30" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="28" fill="url(#bl-f)">BL</text>
              </svg>
              <span className="font-heading text-base font-extrabold tracking-tight text-white">
                Balkan<span className="text-gold">Link</span>
              </span>
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-white/35">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.navSection")}</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.navHome")}</Link>
              <Link to="/dolazak" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.navHow")}</Link>
              <Link to="/formulari" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.navFormulari") || "Formulari"}</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.legalSection")}</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/impressum" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.privacy")}</Link>
              <Link to="/haftungsausschluss" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.haftung")}</Link>
              <Link to="/ki-hinweis" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.kiHinweis")}</Link>
            </nav>
          </div>

          {/* Trust */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.trustSection")}</h4>
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-1.5 text-[13px] font-semibold text-white/60">4.9 / 5</span>
            </div>
            <p className="mt-1.5 text-[12px] text-white/30">{t("footer.trustRating")}</p>
            <p className="mt-4 text-[13px] font-medium text-white/40">
              <span className="text-gold font-semibold">10.000+</span> {t("footer.trustUsers")}
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
