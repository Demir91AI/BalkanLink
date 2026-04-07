import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Formulari", to: "/formulari" },
  { label: "Viza Navigator", to: "/viza" },
  { label: "Deutsch Kurs", to: "/deutsch-trainer" },
  { label: "Dokumenten-Check", to: "/dokumenten-check" },
  { label: "AI Asistent", to: "/ai-asistent" },
  { label: "Nudim / Tražim", to: "/nudim-trazim" },
];

const LEGAL_LINKS = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "AGB", to: "/agb" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "KI-Hinweis", to: "/ki-hinweis" },
  { label: "Cookie-Richtlinie", to: "/cookie-richtlinie" },
];

const PAYMENT_BADGES = ["STRIPE", "PAYPAL", "VISA", "MASTERCARD"];

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
            Tvoj vodič kroz njemački sistem. Formulari, viza, jezik i svakodnevni život — na tvom jeziku.
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 12, lineHeight: 1.5 }}>
            BalkanLink je edukativna platforma i nije pravni savjetnik.
          </p>
        </div>

        {/* Column 2 — Navigacija */}
        <div>
          <p style={colTitleStyle}>Navigacija</p>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={linkStyle}
              className="footer-link"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Column 3 — Pravno */}
        <div>
          <p style={colTitleStyle}>Pravno</p>
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={linkStyle}
              className="footer-link"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Column 4 — Kontakt */}
        <div>
          <p style={colTitleStyle}>Kontakt</p>
          <a
            href="mailto:contact@balkanlink.de"
            style={linkStyle}
            className="footer-link"
          >
            📧 contact@balkanlink.de
          </a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.6 }}>
            Reklamiranje: contact@balkanlink.de
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
            Dostupni radnim danima
          </p>
        </div>
      </div>

      {/* SECTION 2 — Trust strip */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: 11,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <span>🔒 Sichere Plattform</span>
        <span>🛡️ SSL verschlüsselt</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <span>Zahlungsarten:</span>
        {PAYMENT_BADGES.map((b) => (
          <span
            key={b}
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 4,
              padding: "2px 8px",
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              opacity: 0.7,
              height: 22,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {b}
          </span>
        ))}
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
          © 2026 BalkanLink · Alle Rechte vorbehalten
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
