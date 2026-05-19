import { AlertTriangle, ClipboardList, PenLine, Clock, ExternalLink } from "lucide-react";
import { Guide, getOfficialUrl } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";
interface FormFreeContentProps { guide: Guide; lang: LangKey; }

const GOLD = "#D4AF37";

export default function FormFreeContent({ guide, lang }: FormFreeContentProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* HEADER */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: 10, letterSpacing: "-0.01em" }}>
          {guide.title[lang]}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.35)", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: GOLD }}>
            🏛 {guide.authority[lang]}
          </span>
          {guide.formName && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 500, color: "#E2E8F0" }}>
              📄 {guide.formName[lang]}
            </span>
          )}
        </div>
      </div>

      {/* WHO CAN APPLY */}
      <div style={{ borderRadius: 12, border: "1.5px solid rgba(212,175,55,0.3)", borderLeft: "4px solid " + GOLD, background: "hsl(var(--card))", padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(212,175,55,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <PenLine size={14} color={GOLD} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>Ko može podnijeti zahtjev</span>
        </div>
        <p style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.65, margin: 0 }}>{guide.who[lang]}</p>
        <div style={{ marginTop: 12, paddingTop: 11, borderTop: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={13} color={GOLD} />
          <span style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>Vrijeme obrade:</span>
          <span style={{ fontSize: 12, color: "#CBD5E1" }}>{guide.processingTime[lang]}</span>
        </div>
      </div>

      {/* WHAT TO PREPARE */}
      <div style={{ borderRadius: 12, border: "1.5px solid hsl(var(--border))", borderLeft: "4px solid #6366F1", background: "hsl(var(--card))", padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ClipboardList size={14} color="#818CF8" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>Šta treba pripremiti</span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {guide.documents[lang].map((d, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ marginTop: 5, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "#6366F1", display: "inline-block" }} />
              <span style={{ fontSize: 13, color: "#E2E8F0", lineHeight: 1.55 }}>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      {guide.commonMistakes[lang].length > 0 && (
        <div style={{ borderRadius: 12, border: "1.5px solid rgba(239,68,68,0.3)", borderLeft: "4px solid #EF4444", background: "hsl(var(--card))", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AlertTriangle size={14} color="#F87171" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F87171" }}>Najčešće greške</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {guide.commonMistakes[lang].map((m, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 13, flexShrink: 0, lineHeight: 1.55 }}>✕</span>
                <span style={{ fontSize: 13, color: "#E2E8F0", lineHeight: 1.55 }}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* OFFICIAL LINK */}
      {getOfficialUrl(guide) && (
        <a href={getOfficialUrl(guide)} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: GOLD, textDecoration: "none" }}>
          <ExternalLink size={12} />
          Provjeri na službenoj stranici →
        </a>
      )}
    </div>
  );
}
