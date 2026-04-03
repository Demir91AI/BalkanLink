import { Link } from "react-router-dom";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#E8E0D0] text-[#2D2D2D]" style={{ background: "#FAFAF7" }}>
      <div className="container py-12 sm:py-14">
        <div className="grid gap-10 grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <BrandLogo variant="small" />
            <p className="mt-3 text-[13px] leading-relaxed text-[#6B6B6B]">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">{t("footer.navSection")}</h4>
            <nav className="flex flex-col items-center sm:items-start gap-2.5">
              <Link to="/" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.navHome")}</Link>
              <Link to="/dolazak" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.navHow")}</Link>
              <Link to="/formulari" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.navFormulari") || "Formulari"}</Link>
              <Link to="/paketi" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">Paketi i opcije</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">{t("footer.legalSection")}</h4>
            <nav className="flex flex-col items-center sm:items-start gap-2.5">
              <Link to="/impressum" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.privacy")}</Link>
              <Link to="/agb" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.agb")}</Link>
              <Link to="/haftungsausschluss" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.haftung")}</Link>
              <Link to="/ki-hinweis" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.kiHinweis")}</Link>
              <Link to="/inhalte-melden" className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))]">{t("footer.reportContent")}</Link>
              <button
                onClick={() => (window as any).__blOpenCookieSettings?.()}
                className="text-[13px] text-[#6B6B6B] transition-colors hover:text-[hsl(var(--gold))] text-left"
              >
                {t("cookie.footerLink")}
              </button>
            </nav>
          </div>

          {/* Payment */}
          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("footer.paymentMethods")}
            </h4>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title="Stripe">
                <CreditCard className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">Stripe</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title="PayPal">
                <Wallet className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">PayPal</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title={t("footer.creditCard")}>
                <CreditCard className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">{t("footer.creditCard")}</span>
              </div>
              <div className="flex h-8 items-center rounded-md border border-[#E8E0D0] bg-white px-2.5" title={t("footer.bankTransfer")}>
                <Landmark className="h-4 w-4 text-[#6B6B6B]" />
                <span className="ml-1.5 text-[10px] font-semibold text-[#6B6B6B]">{t("footer.bankTransfer")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[#E8E0D0] to-transparent" />

        <p className="mt-6 text-center text-sm text-[#6B6B6B]">
          © {new Date().getFullYear()} BalkanLink. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
