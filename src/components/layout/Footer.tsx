import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

const colTitleStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1.5,
  color: "rgba(255,255,255,0.4)",
  marginBottom: 16,
  fontWeight: 700,
};

const linkStyle: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  display: "block",
  paddingTop: 4,
  paddingBottom: 4,
  transition: "color 0.2s",
};

export default function Footer({ onOpenCookieSettings }: { onOpenCookieSettings?: () => void } = {}) {
  const { t } = useTranslation();
  const localize = useLocalizedHref();

  const NAV_LINKS: { label: string; to: string }[] = [
    { label: t("common:nav.smartGuides"), to: "/formulari" },
    { label: t("common:nav.visa"), to: "/viza" },
    { label: t("common:nav.germanTrainer"), to: "/deutsch-trainer" },
    { label: t("common:nav.documentCheck"), to: "/dokumenten-check" },
    { label: "BalkanLink Asistent", to: "/ai-asistent" },
    { label: t("common:nav.classifieds"), to: "/nudim-trazim" },
  ];

  const LEGAL_LINKS: { label: string; to: string; action?: boolean }[] = [
    { label: t("common:footer.imprintAlt"), to: "/impressum" },
    { label: t("common:footer.privacy"), to: "/datenschutz" },
    { label: t("common:footer.terms"), to: "/agb" },
    { label: t("common:footer.disclaimer"), to: "/disclaimer" },
    { label: t("common:footer.aiNotice"), to: "/napomena-o-ki" },
    { label: t("common:footer.dsa"), to: "/dsa" },
    { label: t("common:footer.cookies"), to: "/cookie-richtlinie", action: true },
  ];

  return (
    <footer style={{ background: "#0d1526" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 32px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
        }}
        className="footer-grid"
      >
        <div>
          <Link to={localize("/")} style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
              <span style={{ color: "#EAB308" }}>BL</span> BalkanLink
            </span>
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 14, lineHeight: 1.6 }}>
            {t("common:footer.brandTagline")}
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 12, lineHeight: 1.5 }}>
            {t("common:footer.infoNote")}
          </p>
        </div>

        <div>
          <p style={colTitleStyle}>{t("common:footer.navigation")}</p>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={localize(l.to)} style={linkStyle} className="footer-link">
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <p style={colTitleStyle}>{t("common:footer.legalShort")}</p>
          {LEGAL_LINKS.map((l) =>
            l.action && onOpenCookieSettings ? (
              <button
                key={l.to}
                onClick={onOpenCookieSettings}
                style={{ ...linkStyle, cursor: "pointer", background: "none", border: "none", textAlign: "left", width: "100%" }}
                className="footer-link"
              >
                {l.label}
              </button>
            ) : (
              <Link key={l.to} to={localize(l.to)} style={linkStyle} className="footer-link">
                {l.label}
              </Link>
            ),
          )}
        </div>

        <div>
          <p style={colTitleStyle}>{t("common:footer.contactTitle")}</p>
          <a href="mailto:kontakt@balkanlink.de" style={linkStyle} className="footer-link">
            kontakt@balkanlink.de
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <div style={{ padding: "20px 24px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, textAlign: "center" }}>
          {t("common:footer.paymentMethods")}
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 0.5, textAlign: "center", marginBottom: 4 }}>
          {t("common:footer.paymentList")}
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 14 }}>
          {[
            { icon: "🔒", text: "SSL" },
            { icon: "🛡️", text: "DSGVO" },
            { icon: "✅", text: "Stripe Verified" },
          ].map((badge) => (
            <span
              key={badge.text}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 10,
                color: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "4px 10px",
                letterSpacing: 0.5,
              }}
            >
              <span style={{ fontSize: 12 }}>{badge.icon}</span>
              {badge.text}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <div style={{ textAlign: "center", padding: "24px 24px 28px" }}>
        <p
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          {t("common:footer.poweredBy")}
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 6, letterSpacing: 0.2 }}>
          <span style={{ color: "#EAB308", fontWeight: 800 }}>RealCore Digital</span>
          <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}> — {t("common:footer.poweredTagline")}</span>
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 16, letterSpacing: 0.2 }}>
          <span style={{ color: "#EAB308", fontWeight: 800 }}>Bosnischer Kulturverein Freilassing e.V.</span>
          <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}> — Kultura, zajednica, integracija.</span>
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          {t("common:footer.copyright")}
        </p>
      </div>

      <style>{`
        .footer-link:hover { color: #EAB308 !important; }
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
