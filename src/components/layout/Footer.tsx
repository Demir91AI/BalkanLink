import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-balkanlink.png";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/8 bg-[#0B1F3A] text-white">
      <div className="container py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="BalkanLink" className="h-6 w-auto object-contain" />
              <span className="font-heading text-[15px] font-extrabold tracking-tight">
                Balkan<span className="text-gold">Link</span>
              </span>
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-white/35">
              Sve što ti treba za život u Njemačkoj — na jednom mjestu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">Navigacija</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-[13px] text-white/50 transition-colors hover:text-gold">Početna</Link>
              <Link to="/dolazak" className="text-[13px] text-white/50 transition-colors hover:text-gold">Kako radi</Link>
              <Link to="/premium" className="text-[13px] text-white/50 transition-colors hover:text-gold">Premium</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">Pravne informacije</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/impressum" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.privacy")}</Link>
              <Link to="/mitgliedschaft" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.mitgliedschaft")}</Link>
              <Link to="/haftungsausschluss" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.haftung")}</Link>
              <Link to="/ki-hinweis" className="text-[13px] text-white/50 transition-colors hover:text-gold">{t("footer.kiHinweis")}</Link>
            </nav>
          </div>

          {/* Trust */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">Povjerenje</h4>
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-1.5 text-[13px] font-semibold text-white/60">4.9 / 5</span>
            </div>
            <p className="mt-1.5 text-[12px] text-white/30">zadovoljstvo korisnika</p>
            <p className="mt-4 text-[13px] font-medium text-white/40">
              Preko <span className="text-gold font-semibold">10.000</span> ljudi koristi BalkanLink
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
