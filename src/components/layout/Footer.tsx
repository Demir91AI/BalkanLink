import { Link } from "react-router-dom";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandLogo from "@/components/BrandLogo";
import HomeReviews from "@/components/home/HomeReviews";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/[0.07] text-white" style={{ background: "#060B14" }}>
      {/* Reviews section at top of footer */}
      <div className="border-b border-white/[0.08]">
        <HomeReviews />
      </div>

      <div className="container py-12 sm:py-14">
        <div className="grid gap-10 grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4">
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
            <nav className="flex flex-col items-center sm:items-start gap-2.5">
              <Link to="/" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.navHome")}</Link>
              <Link to="/dolazak" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.navHow")}</Link>
              <Link to="/formulari" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.navFormulari") || "Formulari"}</Link>
              <Link to="/paketi" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">Paketi i opcije</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.legalSection")}</h4>
            <nav className="flex flex-col items-center sm:items-start gap-2.5">
              <Link to="/impressum" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.imprint")}</Link>
              <Link to="/datenschutz" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.privacy")}</Link>
              <Link to="/agb" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.agb")}</Link>
              <Link to="/haftungsausschluss" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.haftung")}</Link>
              <Link to="/ki-hinweis" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.kiHinweis")}</Link>
              <Link to="/inhalte-melden" className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))]">{t("footer.reportContent")}</Link>
              <button
                onClick={() => (window as any).__blOpenCookieSettings?.()}
                className="text-[13px] text-white/50 transition-colors hover:text-[hsl(var(--gold))] text-left"
              >
                {t("cookie.footerLink")}
              </button>
            </nav>
          </div>

          {/* Trust + Payment */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">{t("footer.trustSection")}</h4>
            <p className="text-[13px] text-white/40">
              Budi prvi koji ostavi recenziju — pomozi zajednici.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("reviews-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2 inline-block text-[12px] text-[hsl(var(--gold))] hover:underline"
            >
              Ostavi recenziju →
            </button>

            {/* Payment methods */}
            <div className="mt-6">
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">
                {t("footer.paymentMethods")}
              </h4>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <div className="flex h-8 items-center rounded-md border border-white/10 bg-white/5 px-2.5" title="Stripe">
                  <CreditCard className="h-4 w-4 text-white/40" />
                  <span className="ml-1.5 text-[10px] font-semibold text-white/40">Stripe</span>
                </div>
                <div className="flex h-8 items-center rounded-md border border-white/10 bg-white/5 px-2.5" title="PayPal">
                  <Wallet className="h-4 w-4 text-white/40" />
                  <span className="ml-1.5 text-[10px] font-semibold text-white/40">PayPal</span>
                </div>
                <div className="flex h-8 items-center rounded-md border border-white/10 bg-white/5 px-2.5" title={t("footer.creditCard")}>
                  <CreditCard className="h-4 w-4 text-white/40" />
                  <span className="ml-1.5 text-[10px] font-semibold text-white/40">{t("footer.creditCard")}</span>
                </div>
                <div className="flex h-8 items-center rounded-md border border-white/10 bg-white/5 px-2.5" title={t("footer.bankTransfer")}>
                  <Landmark className="h-4 w-4 text-white/40" />
                  <span className="ml-1.5 text-[10px] font-semibold text-white/40">{t("footer.bankTransfer")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BalkanLink. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
