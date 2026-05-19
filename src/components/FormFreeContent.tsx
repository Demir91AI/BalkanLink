import { AlertTriangle, ClipboardList, PenLine, Clock, ExternalLink } from "lucide-react";
import { Guide, getOfficialUrl } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";

interface FormFreeContentProps {
  guide: Guide;
  lang: LangKey;
}

const GOLD = "#D4AF37";
const GOLD_DIM = "rgba(212, 175, 55, 0.12)";
const GOLD_BORDER = "rgba(212, 175, 55, 0.25)";

export default function FormFreeContent({ guide, lang }: FormFreeContentProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{
          fontSize: 22,
          fontWeight: 800,
          color: "hsl(var(--foreground))",
          lineHeight: 1.25,
          marginBottom: 10,
          letterSpacing: "-0.01em"
        }}>
          {guide.title[lang]}
        </h1>

        {/* Authority + formName as gold pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: GOLD_DIM,
            border: `1px solid ${GOLD_BORDER}`,
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: 11,
            fontWeight: 600,
            color: GOLD,
            letterSpacing: "0.01em"
          }}>
            🏛 {guide.authority[lang]}
          </span>
          {guide.formName && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 500,
              color: "hsl(var(--muted-foreground))"
            }}>
              📄 {guide.formName[lang]}
            </span>
          )}
        </div>
      </div>

      {/* ── KO MOŽE PODNIJETI ZAHTJEV ── */}
      <div style={{
        borderRadius: 14,
        border: `1px solid ${GOLD_BORDER}`,
        background: GOLD_DIM,
        padding: "18px 20px",
        backdropFilter: "blur(4px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "rgba(212,175,55,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <PenLine size={14} color={GOLD} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>
            Ko može podnijeti zahtjev
          </span>
        </div>
        <p style={{
          fontSize: 13,
          color: "hsl(var(--foreground))",
          lineHeight: 1.65,
          margin: 0
        }}>
          {guide.who[lang]}
        </p>
        <div style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: `1px solid ${GOLD_BORDER}`,
          display: "flex", alignItems: "center", gap: 6
        }}>
          <Clock size={13} color={GOLD} />
          <span style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>Vrijeme obrade:</span>
          <span style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
            {guide.processingTime[lang]}
          </span>
        </div>
      </div>

      {/* ── ŠTA TREBA PRIPREMITI ── */}
      <div style={{
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "18px 20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "rgba(99,102,241,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <ClipboardList size={14} color="#818CF8" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "hsl(var(--foreground))" }}>
            Šta treba pripremiti
          </span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {guide.documents[lang].map((d, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{
                marginTop: 3, flexShrink: 0,
                width: 6, height: 6, borderRadius: "50%",
                background: "#818CF8",
                display: "inline-block"
              }} />
              <span style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", lineHeight: 1.55 }}>
                {d}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── NAJČEŠĆE GREŠKE ── */}
      {guide.commonMistakes[lang].length > 0 && (
        <div style={{
          borderRadius: 14,
          border: "1px solid rgba(239,68,68,0.25)",
          background: "rgba(239,68,68,0.06)",
          padding: "18px 20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(239,68,68,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <AlertTriangle size={14} color="#F87171" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F87171" }}>
              Najčešće greške
            </span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {guide.commonMistakes[lang].map((m, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{
                  marginTop: 3, flexShrink: 0,
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#F87171",
                  display: "inline-block"
                }} />
                <span style={{ fontSize: 13, color: "rgba(248,113,113,0.85)", lineHeight: 1.55 }}>
                  {m}
                </span>
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
            fontSize: 12, fontWeight: 500,
            color: GOLD,
            textDecoration: "none",
            opacity: 0.85
          }}
        >
          <ExternalLink size={12} />
          Provjeri na službenoj stranici →
        </a>
      )}
    </div>
  );
}
