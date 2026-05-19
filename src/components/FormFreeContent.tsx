import { AlertTriangle, ClipboardList, PenLine, Clock, ExternalLink } from "lucide-react";
import { Guide, getOfficialUrl } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";

interface FormFreeContentProps {
  guide: Guide;
  lang: LangKey;
}

const GOLD = "#B8952A";

export default function FormFreeContent({ guide, lang }: FormFreeContentProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: 6 }}>
        <h1 style={{
          fontSize: 21,
          fontWeight: 800,
          color: "hsl(var(--foreground))",
          lineHeight: 1.25,
          marginBottom: 10,
          letterSpacing: "-0.01em"
        }}>
          {guide.title[lang]}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "#FBF3DC",
            border: "1px solid #E8D48A",
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: 11, fontWeight: 600, color: "#7A6010"
          }}>
            🏛 {guide.authority[lang]}
          </span>
          {guide.formName && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "#F3F4F6",
              border: "1px solid #E5E7EB",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 11, fontWeight: 500, color: "#6B7280"
            }}>
              📄 {guide.formName[lang]}
            </span>
          )}
        </div>
      </div>

      {/* ── KO MOŽE PODNIJETI ZAHTJEV ── */}
      <div style={{
        borderRadius: 14,
        border: "1.5px solid #E8D48A",
        background: "#FFFBEB",
        padding: "16px 18px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "#FEF3C7",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <PenLine size={15} color={GOLD} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#78350F" }}>
            Ko može podnijeti zahtjev
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.65, margin: 0 }}>
          {guide.who[lang]}
        </p>
        <div style={{
          marginTop: 12, paddingTop: 11,
          borderTop: "1px solid #E8D48A",
          display: "flex", alignItems: "center", gap: 6
        }}>
          <Clock size={13} color={GOLD} />
          <span style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>Vrijeme obrade:</span>
          <span style={{ fontSize: 12, color: "#6B7280" }}>{guide.processingTime[lang]}</span>
        </div>
      </div>

      {/* ── ŠTA TREBA PRIPREMITI ── */}
      <div style={{
        borderRadius: 14,
        border: "1.5px solid #E0E7FF",
        background: "#EEF2FF",
        padding: "16px 18px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "#E0E7FF",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <ClipboardList size={15} color="#4F46E5" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B" }}>
            Šta treba pripremiti
          </span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {guide.documents[lang].map((d, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{
                marginTop: 5, flexShrink: 0,
                width: 6, height: 6, borderRadius: "50%",
                background: "#6366F1", display: "inline-block"
              }} />
              <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── NAJČEŠĆE GREŠKE ── */}
      {guide.commonMistakes[lang].length > 0 && (
        <div style={{
          borderRadius: 14,
          border: "1.5px solid #FECACA",
          background: "#FEF2F2",
          padding: "16px 18px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "#FEE2E2",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <AlertTriangle size={15} color="#DC2626" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#7F1D1D" }}>
              Najčešće greške
            </span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {guide.commonMistakes[lang].map((m, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{
                  marginTop: 5, flexShrink: 0,
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#EF4444", display: "inline-block"
                }} />
                <span style={{ fontSize: 13, color: "#991B1B", lineHeight: 1.55 }}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── OFFICIAL LINK ── */}
      {getOfficialUrl(guide) && (
        <a
          href={getOfficialUrl(guide)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 12, fontWeight: 600,
            color: GOLD, textDecoration: "none"
          }}
        >
          <ExternalLink size={12} />
          Provjeri na službenoj stranici →
        </a>
      )}
    </div>
  );
}
