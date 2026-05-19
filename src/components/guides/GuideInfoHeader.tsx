import { AlertTriangle, ClipboardList, PenLine, Clock, CheckCircle, ExternalLink } from "lucide-react";

interface Props {
  title: string;
  source: string;
  formName: string;
  whoCanApply: string;
  processingTime: string;
  requirements?: string[];
  commonMistakes?: string[];
  infoNote?: React.ReactNode;
}

const GOLD = "#D4AF37";

export default function GuideInfoHeader({ title, source, formName, whoCanApply, processingTime, requirements, commonMistakes, infoNote }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* TITLE BLOCK */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "hsl(var(--foreground))", lineHeight: 1.25, marginBottom: 10, letterSpacing: "-0.01em" }}>
          {title}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.35)", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: GOLD }}>
            🏛 {source}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 500, color: "hsl(var(--muted-foreground))" }}>
            📄 {formName}
          </span>
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
        <p style={{ fontSize: 13, color: "hsl(var(--foreground))", lineHeight: 1.65, margin: 0 }}>{whoCanApply}</p>
        <div style={{ marginTop: 12, paddingTop: 11, borderTop: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={13} color={GOLD} />
          <span style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>Vrijeme obrade:</span>
          <span style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>{processingTime}</span>
        </div>
      </div>

      {infoNote}

      {/* REQUIREMENTS */}
      {requirements && requirements.length > 0 && (
        <div style={{ borderRadius: 12, border: "1.5px solid hsl(var(--border))", borderLeft: "4px solid #6366F1", background: "hsl(var(--card))", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ClipboardList size={14} color="#818CF8" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "hsl(var(--foreground))" }}>Šta treba pripremiti</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {requirements.map((r, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <CheckCircle size={13} color="#6366F1" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", lineHeight: 1.55 }}>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* COMMON MISTAKES */}
      {commonMistakes && commonMistakes.length > 0 && (
        <div style={{ borderRadius: 12, border: "1.5px solid rgba(239,68,68,0.3)", borderLeft: "4px solid #EF4444", background: "hsl(var(--card))", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AlertTriangle size={14} color="#F87171" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F87171" }}>Najčešće greške</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {commonMistakes.map((m, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 13, flexShrink: 0, lineHeight: 1.55 }}>✕</span>
                <span style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", lineHeight: 1.55 }}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
