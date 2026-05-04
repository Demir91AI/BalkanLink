import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  /** Unique key per form (e.g. "elterngeld") — disclaimer is remembered per form */
  formKey: string;
  children: React.ReactNode;
}

const LS_PREFIX = "muster-disclaimer-accepted-";

/**
 * Blocks form rendering until user explicitly accepts the legal disclaimer
 * (RDG/StBerG — technical Ausfüllhilfe only, user submits themselves).
 * Acceptance is remembered per form in localStorage.
 */
export default function MusterDisclaimer({ formKey, children }: Props) {
  const { t } = useTranslation("forms");
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      setAccepted(localStorage.getItem(LS_PREFIX + formKey) === "1");
    } catch {
      setAccepted(false);
    }
  }, [formKey]);

  if (accepted === null) return null;
  if (accepted) return <>{children}</>;

  const rules = t("musterFlow.disclaimer.rules", { returnObjects: true }) as string[];

  const handleAccept = () => {
    try { localStorage.setItem(LS_PREFIX + formKey, "1"); } catch { /* ignore */ }
    setAccepted(true);
  };

  const handleCancel = () => {
    if (typeof window !== "undefined") window.history.back();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed", inset: 0, background: "rgba(2,6,23,0.85)", backdropFilter: "blur(6px)",
        zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <div style={{
        background: "#0F172A", color: "#F8FAFC", border: "1px solid #B8860B",
        borderRadius: 16, maxWidth: 560, width: "100%", padding: 24,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)", maxHeight: "90vh", overflowY: "auto",
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 12, color: "#FCD34D" }}>
          ⚠️ {t("musterFlow.disclaimer.title")}
        </h2>

        <p
          style={{ fontSize: 14, lineHeight: 1.6, color: "#CBD5E1", marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: t("musterFlow.disclaimer.intro") }}
        />

        <div style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
          border: "1.5px solid #10B981", borderRadius: 10, padding: 14, marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>🔒</span>
            <strong style={{ color: "#34D399", fontSize: 14 }}>{t("musterFlow.privacy.title")}</strong>
          </div>
          <ul style={{ paddingLeft: 18, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {["p1","p2","p3"].map(k => (
              <li key={k} style={{ fontSize: 12.5, lineHeight: 1.5, color: "#D1FAE5" }}
                dangerouslySetInnerHTML={{ __html: t(`musterFlow.privacy.points.${k}`) }} />
            ))}
          </ul>
        </div>

        <ul style={{ paddingLeft: 20, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.isArray(rules) && rules.map((r, i) => (
            <li
              key={i}
              style={{ fontSize: 13, lineHeight: 1.5, color: "#CBD5E1" }}
              dangerouslySetInnerHTML={{ __html: r }}
            />
          ))}
        </ul>

        <label style={{
          display: "flex", alignItems: "flex-start", gap: 10, padding: 12,
          background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.3)",
          borderRadius: 8, cursor: "pointer", marginBottom: 16,
        }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ marginTop: 3, width: 18, height: 18, accentColor: "#B8860B", flexShrink: 0 }}
          />
          <span style={{ fontSize: 13, lineHeight: 1.4, color: "#F8FAFC" }}>
            {t("musterFlow.disclaimer.checkbox")}
          </span>
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleCancel}
            style={{
              flex: 1, background: "transparent", color: "#94A3B8",
              border: "1px solid #334155", borderRadius: 8, padding: "12px",
              fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            {t("musterFlow.disclaimer.cancel")}
          </button>
          <button
            onClick={handleAccept}
            disabled={!checked}
            style={{
              flex: 2, background: checked ? "#EAB308" : "#475569",
              color: checked ? "#111" : "#94A3B8",
              border: "none", borderRadius: 8, padding: "12px",
              fontWeight: 700, fontSize: 14,
              cursor: checked ? "pointer" : "not-allowed",
            }}
          >
            {t("musterFlow.disclaimer.continue")} →
          </button>
        </div>
      </div>
    </div>
  );
}
