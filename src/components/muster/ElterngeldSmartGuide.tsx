import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown, ExternalLink, Globe, FileText, Mail, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import type { ElterngeldBundesland } from "@/lib/elterngeld-bundeslaender";
import { BUNDES_PORTAL_URL } from "@/lib/elterngeld-bundeslaender";

interface Props {
  bundesland: ElterngeldBundesland;
}

/**
 * Univerzalni Smart Guide za Elterngeld u svim pokrajinama (osim Bayerna gdje radi 1:1 auto-fill).
 *
 * Princip: Elterngeld je savezna naknada (BEEG — Bundeselterngeld- und Elternzeitgesetz)
 * pa svi formulari prate identičnu strukturu sekcija. Razlikuje se samo:
 *   - nadležna Elterngeldstelle (gdje predati)
 *   - digitalni portal (savezni elterngeld-digital.de ili pokrajinski portal)
 *   - papirni PDF (svaka pokrajina ima svoju verziju, ali ista pitanja)
 *
 * Vodič je strukturiran po BEEG sekcijama 1–10, sa BHS objašnjenjima i njemačkim
 * službenim terminima u zagradi. Cilj: korisnik može popuniti BILO KOJI Elterngeld
 * formular bez obzira na pokrajinu.
 */
export default function ElterngeldSmartGuide({ bundesland }: Props) {
  const { t } = useTranslation("forms");
  const [openStep, setOpenStep] = useState<number | null>(0);

  const sections = [
    "kind", "elternteil1", "elternteil2", "familienverhaeltnis",
    "bezugszeitraum", "einkommen_vor", "einkommen_waehrend",
    "weitere_leistungen", "bankverbindung", "anlagen",
  ] as const;

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Hero — kako predati */}
      <div style={{
        padding: 18, borderRadius: 12,
        background: "linear-gradient(135deg, #064E3B 0%, #047857 100%)",
        color: "#fff", marginBottom: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", opacity: 0.9 }}>
          <CheckCircle2 size={14} />
          {t("musterFlow.smartGuide.heroLabel")}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, lineHeight: 1.3 }}>
          {t("musterFlow.smartGuide.heroTitle", { name: bundesland.name })}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.95 }}>
          {t("musterFlow.smartGuide.heroBody")}
        </p>
      </div>

      {/* Tri puta predaje */}
      <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
        {/* Online — savezni ili pokrajinski portal */}
        {bundesland.digitalPortalUrl && (
          <a
            href={bundesland.digitalPortalUrl}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "block", padding: 14, borderRadius: 10,
              background: "#fff", border: "2px solid #1e3a8a",
              textDecoration: "none", color: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <Globe size={20} style={{ color: "#1e3a8a", flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                  {t("musterFlow.smartGuide.way1Label")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                  {bundesland.digitalPortalName}
                </div>
                <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.4 }}>
                  {t("musterFlow.smartGuide.way1Body")}
                </div>
              </div>
              <ExternalLink size={14} style={{ color: "#1e3a8a", flexShrink: 0, marginTop: 4 }} />
            </div>
          </a>
        )}

        {/* PDF papirno */}
        {bundesland.pdfUrl && (
          <a
            href={bundesland.pdfUrl}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "block", padding: 14, borderRadius: 10,
              background: "#fff", border: "2px solid #d1d5db",
              textDecoration: "none", color: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <FileText size={20} style={{ color: "#374151", flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                  {t("musterFlow.smartGuide.way2Label")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                  {t("musterFlow.smartGuide.way2Title")}
                </div>
                <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.4 }}>
                  {t("musterFlow.smartGuide.way2Body")}
                </div>
              </div>
              <ExternalLink size={14} style={{ color: "#374151", flexShrink: 0, marginTop: 4 }} />
            </div>
          </a>
        )}

        {/* Posta / lično */}
        <div style={{
          padding: 14, borderRadius: 10,
          background: "#F9FAFB", border: "1px solid #E5E7EB",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Mail size={20} style={{ color: "#374151", flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                {t("musterFlow.smartGuide.way3Label")}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>
                {bundesland.authority}
              </div>
              {bundesland.authorityNote && (
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>
                  {bundesland.authorityNote}
                </div>
              )}
              {bundesland.phone && (
                <div style={{ fontSize: 12, color: "#475569" }}>
                  📞 {bundesland.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pokrajinska specifičnost */}
      {bundesland.specialNote && (
        <div style={{
          padding: 12, marginBottom: 16, borderRadius: 8,
          background: "#FEF3C7", border: "1px solid #EAB308",
          fontSize: 12.5, color: "#78350F", lineHeight: 1.5,
          display: "flex", gap: 8, alignItems: "flex-start",
        }}>
          <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          <div><strong>{bundesland.name}:</strong> {bundesland.specialNote}</div>
        </div>
      )}

      {/* Smart Guide naslov */}
      <div style={{
        padding: 14, marginBottom: 12, borderRadius: 10,
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        color: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Info size={18} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 2 }}>
              {t("musterFlow.smartGuide.guideTitle")}
            </div>
            <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.4 }}>
              {t("musterFlow.smartGuide.guideSubtitle")}
            </div>
          </div>
        </div>
      </div>

      {/* Akordeon — 10 BEEG sekcija */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sections.map((key, idx) => {
          const isOpen = openStep === idx;
          return (
            <div
              key={key}
              style={{
                background: "#fff", borderRadius: 10,
                border: `2px solid ${isOpen ? "#1e3a8a" : "#E5E7EB"}`,
                overflow: "hidden",
                transition: "border-color 0.15s",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenStep(isOpen ? null : idx)}
                aria-expanded={isOpen}
                style={{
                  width: "100%", padding: 14, background: "transparent",
                  border: "none", cursor: "pointer", textAlign: "left",
                  display: "flex", alignItems: "center", gap: 10,
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 14,
                  background: isOpen ? "#1e3a8a" : "#EFF6FF",
                  color: isOpen ? "#fff" : "#1e3a8a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800, flexShrink: 0,
                }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
                    {t(`musterFlow.smartGuide.steps.${key}.title`)}
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2, lineHeight: 1.3 }}>
                    {t(`musterFlow.smartGuide.steps.${key}.de`)}
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  style={{
                    color: "#6B7280", flexShrink: 0,
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s",
                  }}
                />
              </button>
              {isOpen && (
                <div style={{ padding: "0 14px 16px 52px", fontSize: 13, lineHeight: 1.6, color: "#374151" }}>
                  <div style={{ marginBottom: 10 }}>
                    {t(`musterFlow.smartGuide.steps.${key}.body`)}
                  </div>
                  <div style={{
                    padding: 10, borderRadius: 6,
                    background: "#F9FAFB", border: "1px solid #E5E7EB",
                    fontSize: 12, color: "#475569",
                  }}>
                    <strong style={{ color: "#0f172a" }}>📋 {t("musterFlow.smartGuide.fields")}:</strong>{" "}
                    {t(`musterFlow.smartGuide.steps.${key}.fields`)}
                  </div>
                  {t(`musterFlow.smartGuide.steps.${key}.tip`, { defaultValue: "" }) && (
                    <div style={{
                      marginTop: 8, padding: 10, borderRadius: 6,
                      background: "#ECFDF5", border: "1px solid #10B981",
                      fontSize: 12, color: "#065F46",
                    }}>
                      💡 <strong>{t("musterFlow.smartGuide.tip")}:</strong>{" "}
                      {t(`musterFlow.smartGuide.steps.${key}.tip`)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer — savezni portal preporuka */}
      {bundesland.supportsBundesPortal && (
        <div style={{
          marginTop: 18, padding: 14, borderRadius: 10,
          background: "#F0F9FF", border: "1px solid #0284C7",
          fontSize: 12.5, color: "#075985", lineHeight: 1.5,
        }}>
          <strong>💡 {t("musterFlow.smartGuide.bundesPortalTip")}</strong>{" "}
          {t("musterFlow.smartGuide.bundesPortalBody")}{" "}
          <a href={BUNDES_PORTAL_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#0c4a6e", fontWeight: 700, textDecoration: "underline" }}>
            elterngeld-digital.de →
          </a>
        </div>
      )}
    </div>
  );
}
