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
            href="mailto:kontakt@balkanlink.de"
            style={linkStyle}
            className="footer-link"
          >
            📧 kontakt@balkanlink.de
          </a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.6 }}>
            Reklamiranje: kontakt@balkanlink.de
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
            Dostupni radnim danima
          </p>
        </div>
      </div>

      {/* SECTION 2 — Payment icons */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <div style={{ padding: "20px 24px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
          Sigurna plaćanja
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          {/* Visa */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 83" style={{ height: 22, width: "auto", opacity: 0.7, transition: "opacity 0.2s", cursor: "pointer" }} onMouseEnter={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "0.7"; }}>
            <path d="M132.397 56.24c-.145-11.516 10.263-17.942 18.104-21.763 8.056-3.92 10.762-6.434 10.73-9.94-.06-5.365-6.426-7.733-12.383-7.825-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.747-4.158 23.006-4.243 21.725 0 35.943 10.724 36.015 27.351.075 21.1-29.188 22.27-28.988 31.702.069 2.86 2.798 5.912 8.778 6.688 2.96.392 11.131.693 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551-20.448 0-34.83-10.87-34.952-26.428m89.28 24.96c-3.967 0-7.31-2.314-8.802-5.869L181.803 1.286h21.707l4.32 11.939h26.528l2.51-11.939H256l-16.697 74.915h-17.626m3.037-20.244l6.275-30.042h-17.166l10.89 30.042M116.315 76.2L98.27 1.286h20.674L137.18 76.2h-20.864M82.78 1.286l-21.52 51.08-8.704-43.36C51.27 3.862 46.7 1.286 41.64 1.286H.729L.16 3.785C7.21 5.298 15.203 7.73 20.103 10.37c2.994 1.612 3.847 3.02 4.83 6.85l16.504 63.98H63.2L104.51 1.285H82.78" fill="#fff"/>
          </svg>
          {/* Mastercard */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 199" style={{ height: 22, width: "auto", opacity: 0.7, transition: "opacity 0.2s", cursor: "pointer" }} onMouseEnter={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "0.7"; }}>
            <path d="M46.539 198.194V185.055c0-5.05-3.074-8.342-8.124-8.342-2.57 0-5.371.864-7.3 3.653-1.44-2.358-3.65-3.653-6.867-3.653-2.142 0-4.284.648-5.94 3.074v-2.57h-4.5v20.977h4.5v-11.618c0-3.722 2.001-5.508 5.075-5.508 2.93 0 4.427 1.93 4.427 5.364v11.762h4.5v-11.618c0-3.722 2.142-5.508 5.075-5.508 3.074 0 4.571 1.93 4.571 5.364v11.762l4.583-.018z" fill="#fff"/>
            <circle fill="#fff" cx="128" cy="99.5" r="0" opacity="0"/>
            <path d="M93.298 99.14c0-33.392 15.672-63.133 40.066-82.227A99.148 99.148 0 0 0 72.957.5C32.666.5 0 44.87 0 99.14s32.666 98.64 72.957 98.64c22.543 0 42.794-9.724 60.407-17.413-24.394-19.094-40.066-48.835-40.066-82.227" fill="#fff" opacity="0.7"/>
            <path d="M256 99.14c0 54.271-32.666 98.64-72.957 98.64-22.543 0-42.794-9.724-60.407-17.413C147.03 161.273 162.702 131.532 162.702 99.14S147.03 37.007 122.636 17.913C140.249 9.224 160.5.5 183.043.5 223.334.5 256 44.87 256 99.14" fill="#fff" opacity="0.7"/>
          </svg>
          {/* PayPal */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 302" style={{ height: 22, width: "auto", opacity: 0.7, transition: "opacity 0.2s", cursor: "pointer" }} onMouseEnter={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "0.7"; }}>
            <path d="M217.168 23.507C203.234 7.625 178.046.816 145.823.816h-93.52A13.393 13.393 0 0 0 39.076 12.11L.136 259.077c-.774 4.906 2.997 9.345 7.962 9.345h57.964l14.554-92.283-.45 2.9c1.268-8.055 8.42-13.762 16.572-13.762h34.487c67.78 0 120.86-27.516 136.357-107.14.459-2.357.84-4.655 1.152-6.899-1.95-1.026-1.95-1.026 0 0 4.598-29.341-0.038-49.29-16.566-67.73" fill="#fff" opacity="0.85"/>
            <path d="M102.4 68.84a11.67 11.67 0 0 1 5.245-1.249h75.857c8.985 0 17.368.559 25.078 1.728a98.256 98.256 0 0 1 6.126 1.187 62.728 62.728 0 0 1 9.315 3.003c4.598-29.341-.038-49.29-16.566-67.73C191.233 7.625 178.046.816 145.823.816h-93.52A13.393 13.393 0 0 0 39.076 12.11L.136 259.077c-.774 4.906 2.997 9.345 7.962 9.345h57.964l14.554-92.283 21.784-107.3z" fill="#fff"/>
          </svg>
          {/* Apple Pay */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" style={{ height: 22, width: "auto", opacity: 0.7, transition: "opacity 0.2s", cursor: "pointer" }} onMouseEnter={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "0.7"; }}>
            <text x="0" y="200" fill="#fff" fontFamily="system-ui,-apple-system,sans-serif" fontSize="200" fontWeight="300" letterSpacing="-8"> Pay</text>
            <path d="M120.32 44.264c-9.616 11.376-25.152 20.208-40.464 19.44-1.904-15.312 5.584-31.6 14.352-41.68C103.84 10.648 120.544 1.048 134.128.28c1.648 15.84-4.608 31.376-13.808 43.984zm13.584 22.352c-22.336-1.344-41.36 12.688-51.968 12.688-10.832 0-27.216-12.016-44.88-11.68-23.12.336-44.416 13.456-56.304 34.16-24.16 41.44-6.272 102.896 17.024 136.736 11.44 16.688 25.04 35.168 42.928 34.496 17.232-.672 23.712-11.12 44.512-11.12s26.608 11.12 44.88 10.784c18.608-.336 30.272-16.688 41.712-33.376 12.912-19.104 18.256-37.616 18.592-38.592-.336-.336-35.84-13.792-36.176-54.56-.336-34.048 27.776-50.4 29.12-51.072-15.968-23.456-40.688-26.128-49.44-26.464z" fill="#fff"/>
          </svg>
          {/* Google Pay */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" style={{ height: 22, width: "auto", opacity: 0.7, transition: "opacity 0.2s", cursor: "pointer" }} onMouseEnter={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.currentTarget as SVGSVGElement).style.opacity = "0.7"; }}>
            <text x="0" y="200" fill="#fff" fontFamily="system-ui,-apple-system,sans-serif" fontSize="180" fontWeight="500" letterSpacing="-4">G Pay</text>
          </svg>
        </div>
        {/* Trust badges */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 14 }}>
          {[
            { icon: "🔒", text: "SSL šifrirano" },
            { icon: "🛡️", text: "DSGVO konform" },
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
