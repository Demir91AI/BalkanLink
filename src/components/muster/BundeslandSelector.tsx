import { useTranslation } from "react-i18next";
import { ELTERNGELD_BUNDESLAENDER, type BundeslandId, getBundesland } from "@/lib/elterngeld-bundeslaender";
import { MapPin, ExternalLink, CheckCircle2, FileText, Phone, Building2 } from "lucide-react";

interface Props {
  value: BundeslandId;
  onChange: (id: BundeslandId) => void;
}

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 8,
  display: "flex", alignItems: "center", gap: 6, letterSpacing: 0.3,
  textTransform: "uppercase",
};
const selectStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px", fontSize: 15, lineHeight: 1.4,
  border: "2px solid #1e3a8a", borderRadius: 10, background: "#fff",
  color: "#0f172a", boxSizing: "border-box", minHeight: 48, fontWeight: 600,
  cursor: "pointer",
};

export default function BundeslandSelector({ value, onChange }: Props) {
  const { t } = useTranslation("forms");
  const selected = getBundesland(value);

  return (
    <div
      role="region"
      aria-label={t("musterFlow.bundesland.title")}
      style={{
        marginBottom: 16, padding: 18, borderRadius: 12,
        background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
        border: "2px solid #1e3a8a",
      }}
    >
      <label htmlFor="bl-select" style={labelStyle}>
        <MapPin size={14} />
        {t("musterFlow.bundesland.title")}
      </label>

      <select
        id="bl-select"
        style={selectStyle}
        value={value}
        onChange={e => onChange(e.target.value as BundeslandId)}
      >
        {ELTERNGELD_BUNDESLAENDER.map(b => (
          <option key={b.id} value={b.id}>
            {b.name} {b.autoFillSupported ? "✅" : ""}
          </option>
        ))}
      </select>

      <p style={{ fontSize: 11.5, color: "#1e40af", marginTop: 8, lineHeight: 1.4 }}>
        {t("musterFlow.bundesland.hint")}
      </p>

      {selected && (
        <div style={{
          marginTop: 14, padding: 14, borderRadius: 10, background: "#fff",
          border: "1px solid #BFDBFE",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
            <Building2 size={18} style={{ color: "#1e3a8a", flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
                {selected.authority}
              </div>
              {selected.authorityNote && (
                <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
                  {selected.authorityNote}
                </div>
              )}
            </div>
          </div>

          {selected.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#334155", marginBottom: 6 }}>
              <Phone size={14} style={{ color: "#1e3a8a" }} />
              <span>{selected.phone}</span>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <a
              href={selected.officialUrl}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 12px", borderRadius: 8,
                background: "#1e3a8a", color: "#fff", fontSize: 13, fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <ExternalLink size={13} />
              {t("musterFlow.bundesland.openOfficial")}
            </a>
            {selected.pdfUrl && (
              <a
                href={selected.pdfUrl}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 12px", borderRadius: 8,
                  background: "#fff", color: "#1e3a8a", fontSize: 13, fontWeight: 600,
                  textDecoration: "none", border: "1px solid #1e3a8a",
                }}
              >
                <FileText size={13} />
                {t("musterFlow.bundesland.openPdf")}
              </a>
            )}
          </div>

          <div style={{
            marginTop: 12, padding: "10px 12px", borderRadius: 8,
            background: selected.autoFillSupported ? "#ECFDF5" : "#FEF3C7",
            border: `1px solid ${selected.autoFillSupported ? "#10B981" : "#EAB308"}`,
            fontSize: 12.5, color: selected.autoFillSupported ? "#065F46" : "#78350F",
            display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.4,
          }}>
            <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              {selected.autoFillSupported
                ? t("musterFlow.bundesland.autoFillYes", { name: selected.name })
                : t("musterFlow.bundesland.autoFillNo", { name: selected.name })}
            </span>
          </div>

          {selected.specialNote && (
            <div style={{
              marginTop: 8, padding: "8px 10px", borderRadius: 6,
              background: "#FEF2F2", border: "1px solid #FCA5A5",
              fontSize: 12, color: "#991B1B", lineHeight: 1.4,
            }}>
              ⚠ {selected.specialNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
