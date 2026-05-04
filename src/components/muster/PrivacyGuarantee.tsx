import { useTranslation } from "react-i18next";
import { ShieldCheck, Lock, MonitorSmartphone, EyeOff, ServerOff, Trash2 } from "lucide-react";

/**
 * Snažan vizuelni "Privacy Guarantee" banner za Muster formulare.
 * Cilj: maksimalno povjerenje korisnika — jasno da podaci NIKAD ne idu na server.
 * Sve stringove vuče iz forms.json -> musterFlow.privacy.*
 */
export default function PrivacyGuarantee() {
  const { t } = useTranslation("forms");

  const points = [
    { icon: MonitorSmartphone, key: "p1" },
    { icon: ServerOff, key: "p2" },
    { icon: EyeOff, key: "p3" },
    { icon: Trash2, key: "p4" },
  ] as const;

  return (
    <div
      role="region"
      aria-label={t("musterFlow.privacy.title")}
      style={{
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        background: "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
        border: "2px solid #10B981",
        boxShadow: "0 2px 8px rgba(16,185,129,0.12)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 999, background: "#10B981",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <ShieldCheck size={20} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 800, color: "#065F46", fontSize: 15, lineHeight: 1.2 }}>
            🔒 {t("musterFlow.privacy.title")}
          </div>
          <div style={{ fontSize: 12, color: "#047857", marginTop: 2 }}>
            {t("musterFlow.privacy.subtitle")}
          </div>
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {points.map(({ icon: Icon, key }) => (
          <li key={key} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#064E3B", lineHeight: 1.45 }}>
            <Icon size={16} style={{ marginTop: 2, flexShrink: 0, color: "#059669" }} />
            <span dangerouslySetInnerHTML={{ __html: t(`musterFlow.privacy.points.${key}`) }} />
          </li>
        ))}
      </ul>

      <div style={{
        marginTop: 12, padding: "8px 10px", borderRadius: 6,
        background: "rgba(16,185,129,0.1)", fontSize: 11.5, color: "#065F46",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <Lock size={12} />
        <span>{t("musterFlow.privacy.footer")}</span>
      </div>
    </div>
  );
}
