import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
const NAV_LINKS_KEYS = [
  { labelKey: "sidebar.formulari", to: "/formulari" },
  { labelKey: "sidebar.viza", to: "/viza" },
  { labelKey: "sidebar.deutsch", to: "/deutsch-trainer" },
  { labelKey: "sidebar.dokumentencheck", to: "/dokumenten-check" },
  { labelKey: "sidebar.asistent", to: "/ai-asistent" },
  { labelKey: "sidebar.nudim", to: "/nudim-trazim" },
];

const LEGAL_LINKS_KEYS = [
  { labelKey: "footer.impressum", to: "/impressum" },
  { labelKey: "footer.datenschutz", to: "/datenschutz" },
  { labelKey: "footer.agb", to: "/agb" },
  { labelKey: "footer.haftung", to: "/disclaimer" },
  { labelKey: "footer.ki", to: "/ki-hinweis" },
  { label: "Cookie-Richtlinie", to: "/cookie-richtlinie" },
];

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

export default function Footer() {
  return (
    <footer style={{ background: "#0d1526" }}>
      {/* SECTION 1 — Main grid */}
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
        {/* Column 1 — Brand */}
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
              <span style={{ color: "#EAB308" }}>BL</span> BalkanLink
            </span>
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 14, lineHeight: 1.6 }}>
            {"Dein Wegweiser durch das deutsche System."}
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 12, lineHeight: 1.5 }}>
            {"BalkanLink bietet informative Hinweise, keine Rechtsberatung."}
          </p>
        </div>

        {/* Column 2 — Navigacija */}
        <div>
          <p style={colTitleStyle}>{"Navigation"}</p>
          {NAV_LINKS_KEYS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={linkStyle}
              className="footer-link"
            >
              {label(l.labelKey)}
            </Link>
          ))}
        </div>

        {/* Column 3 — Pravno */}
        <div>
          <p style={colTitleStyle}>{"Rechtliches"}</p>
          {LEGAL_LINKS_KEYS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={linkStyle}
              className="footer-link"
            >
              {"labelKey" in l ? label(l.labelKey) : l.label}
            </Link>
          ))}
        </div>

        {/* Column 4 — Kontakt */}
        <div>
          <p style={colTitleStyle}>{"Kontakt"}</p>
          <a
            href="mailto:kontakt@balkanlink.de"
            style={linkStyle}
            className="footer-link"
          >
            kontakt@balkanlink.de
          </a>
        </div>
      </div>

      {/* SECTION 2 — Payment icons */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <div style={{ padding: "20px 24px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, textAlign: "center" }}>
          {"Zahlungsmethoden"}
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 0.5, textAlign: "center", marginBottom: 4 }}>
          Visa · Mastercard · PayPal · Apple Pay · Google Pay
        </p>
        {/* Trust badges */}
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

      {/* SECTION 3 — Bottom line */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 28px" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
          Powered by <span style={{ color: "#EAB308", fontWeight: 700 }}>RealCore Digital</span> · Klar denken. Digital umsetzen.
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          © 2026 BalkanLink · {"Alle Rechte vorbehalten."}
        </p>
      </div>

      {/* Responsive CSS */}
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
