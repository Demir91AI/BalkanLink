import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { supabase } from "@/integrations/supabase/client";

type ReviewRow = {
  id: string;
  username: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
};

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

type LinkItem = { label: string; to: string; action?: boolean };

export default function Footer({ onOpenCookieSettings }: { onOpenCookieSettings?: () => void } = {}) {
  const { t } = useTranslation();
  const localize = useLocalizedHref();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("reviews")
      .select("id, username, rating, comment, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (!cancelled && data) setReviews(data as ReviewRow[]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const reviewCount = reviews.length;
  const avgRating =
    reviewCount > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount
      : 0;
  const avgRounded = Math.round(avgRating);

  const NAV_LINKS: LinkItem[] = [
    { label: t("common:nav.smartGuides"), to: "/formulari" },
    { label: t("common:nav.visa"), to: "/viza" },
    { label: t("common:nav.germanTrainer"), to: "/deutsch-trainer" },
    { label: t("common:nav.documentCheck"), to: "/dokumenten-check" },
    { label: "BalkanLink Asistent", to: "/ai-asistent" },
    { label: t("common:nav.classifieds"), to: "/nudim-trazim" },
  ];

  const LEGAL_LINKS: LinkItem[] = [
    { label: t("common:footer.imprintAlt"), to: "/impressum" },
    { label: t("common:footer.privacy"), to: "/datenschutz" },
    { label: t("common:footer.terms"), to: "/agb" },
    { label: t("common:footer.disclaimer"), to: "/disclaimer" },
    { label: t("common:footer.aiNotice"), to: "/napomena-o-ki" },
    { label: t("common:footer.dsa"), to: "/dsa" },
    { label: t("common:footer.cookies"), to: "/cookie-richtlinie", action: true },
  ];

  const renderLink = (l: LinkItem) =>
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
    );

  const toggle = (key: string) => setOpenSection((cur) => (cur === key ? null : key));

  const AccordionSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isOpen = openSection === id;
    return (
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={() => toggle(id)}
          aria-expanded={isOpen}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            padding: "16px 0",
            cursor: "pointer",
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          {title}
          <ChevronDown
            size={18}
            style={{
              transition: "transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "rgba(255,255,255,0.5)",
            }}
          />
        </button>
        {isOpen && <div style={{ paddingBottom: 16 }}>{children}</div>}
      </div>
    );
  };

  return (
    <footer style={{ background: "#0d1526" }}>
      {/* DESKTOP / TABLET grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 32px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
        }}
        className="footer-grid-desktop"
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
          {NAV_LINKS.map(renderLink)}
        </div>

        <div>
          <p style={colTitleStyle}>{t("common:footer.legalShort")}</p>
          {LEGAL_LINKS.map(renderLink)}
        </div>

        <div>
          <p style={colTitleStyle}>{t("common:footer.contactTitle")}</p>
          <a href="mailto:kontakt@realcore-digital.de" style={linkStyle} className="footer-link">
            kontakt@realcore-digital.de
          </a>
        </div>
      </div>

      {/* MOBILE accordion */}
      <div className="footer-mobile" style={{ display: "none", padding: "32px 20px 16px" }}>
        <Link to={localize("/")} style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
            <span style={{ color: "#EAB308" }}>BL</span> BalkanLink
          </span>
        </Link>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, lineHeight: 1.5, marginBottom: 20 }}>
          {t("common:footer.brandTagline")}
        </p>

        <AccordionSection id="nav" title={t("common:footer.navigation")}>
          {NAV_LINKS.map(renderLink)}
        </AccordionSection>
        <AccordionSection id="legal" title={t("common:footer.legalShort")}>
          {LEGAL_LINKS.map(renderLink)}
        </AccordionSection>
        <AccordionSection id="contact" title={t("common:footer.contactTitle")}>
          <a href="mailto:kontakt@realcore-digital.de" style={linkStyle} className="footer-link">
            kontakt@realcore-digital.de
          </a>
        </AccordionSection>
        <AccordionSection id="payments" title={t("common:footer.paymentMethods")}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: 0.3, marginBottom: 12 }}>
            {t("common:footer.paymentList")}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
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
                  color: "rgba(255,255,255,0.5)",
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
        </AccordionSection>
      </div>

      <div className="footer-divider-desktop" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* DESKTOP / TABLET payments */}
      <div className="footer-payments-desktop" style={{ padding: "20px 24px 16px", textAlign: "center" }}>
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

      {/* MOBILE payments — sada unutar footer-mobile akordiona iznad */}

      {/* REVIEWS / RECENZIJE — auto-računa iz baze */}
      {reviewCount > 0 && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 8px" }}>
          <div
            style={{
              borderRadius: 16,
              padding: "22px 18px 18px",
              background: "linear-gradient(180deg, rgba(234,179,8,0.07) 0%, rgba(234,179,8,0.015) 100%)",
              border: "1px solid rgba(234,179,8,0.2)",
              boxShadow: "0 0 32px -8px rgba(234,179,8,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <p style={{ fontSize: 10, color: "rgba(234,179,8,0.85)", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, marginBottom: 10 }}>
                Recenzije korisnika
              </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#EAB308", letterSpacing: -0.5 }}>
                {avgRating.toFixed(1)}
              </span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>/ 5</span>
              <span aria-hidden style={{ fontSize: 16, letterSpacing: 2, color: "#EAB308" }}>
                {"★".repeat(avgRounded)}
                <span style={{ color: "rgba(234,179,8,0.35)" }}>{"★".repeat(Math.max(0, 5 - avgRounded))}</span>
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                ({reviewCount} {reviewCount === 1 ? "recenzija" : reviewCount < 5 ? "recenzije" : "recenzija"})
              </span>
            </div>
          </div>

          <details style={{ marginBottom: 28, textAlign: "center" }}>
            <summary
              style={{
                cursor: "pointer",
                listStyle: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 20,
                padding: "6px 14px",
                userSelect: "none",
              }}
              className="footer-reviews-summary"
            >
              Prikaži sve recenzije
              <ChevronDown size={14} style={{ opacity: 0.6 }} />
            </summary>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 12,
                marginTop: 16,
                textAlign: "left",
              }}
            >
              {reviews.map((r) => {
                const hasComment = !!r.comment && r.comment.trim().length > 0;
                return (
                  <div
                    key={r.id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "14px 14px 12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
                        {r.username || "Anoniman korisnik"}
                      </span>
                      <span aria-label={`${r.rating}/5`} style={{ fontSize: 11, letterSpacing: 1, color: "#EAB308", whiteSpace: "nowrap" }}>
                        {"★".repeat(r.rating)}
                        <span style={{ color: "rgba(234,179,8,0.25)" }}>{"★".repeat(Math.max(0, 5 - r.rating))}</span>
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: hasComment ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: 0, fontStyle: hasComment ? "normal" : "italic" }}>
                      {hasComment ? `„${r.comment}"` : "Ocjena bez komentara"}
                    </p>
                  </div>
                );
              })}
            </div>
          </details>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <div style={{ textAlign: "center", padding: "24px 24px 120px" }}>
        <p
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          {t("common:footer.poweredBy")}
        </p>
        <p style={{ fontSize: 14, color: "#EAB308", fontWeight: 800, letterSpacing: 0.2, marginBottom: 4 }}>
          RealCore Digital
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 400, marginBottom: 18 }}>
          {t("common:footer.poweredTagline")}
        </p>
        <p style={{ fontSize: 14, color: "#EAB308", fontWeight: 800, letterSpacing: 0.2, marginBottom: 4 }}>
          Bosnischer Kulturverein Freilassing e.V.
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 400, marginBottom: 4 }}>
          Kultura, zajednica, integracija.
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 400, marginBottom: 20 }}>
          Am Feuerhaus 3, 83395 Freilassing
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          {t("common:footer.copyright")}
        </p>
      </div>

      <style>{`
        .footer-link:hover { color: #EAB308 !important; }
        @media (max-width: 1023px) {
          .footer-grid-desktop { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .footer-grid-desktop { display: none !important; }
          .footer-mobile { display: block !important; }
          .footer-payments-desktop { display: none !important; }
          .footer-payments-mobile { display: block !important; }
          .footer-divider-desktop { display: none !important; }
        }
      `}</style>
    </footer>
  );
}
