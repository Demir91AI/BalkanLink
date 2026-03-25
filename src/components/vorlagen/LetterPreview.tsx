import { useMemo } from "react";
import { parseLetterBlocks } from "./VorlagenGenerator";

interface Props {
  text: string;
  slug: string;
}

/**
 * DIN-5008-oriented letter preview.
 * Renders the generated text with professional German business-letter structure,
 * proper typography, spacing and visual hierarchy.
 */
export default function LetterPreview({ text, slug }: Props) {
  const isCV = slug === "lebenslauf";
  const blocks = useMemo(() => (isCV ? null : parseLetterBlocks(text, slug)), [text, slug, isCV]);

  if (isCV) return <CvPreview text={text} />;
  if (!blocks) return <FallbackPreview text={text} />;

  return (
    <div className="relative mx-auto overflow-hidden rounded-sm border border-neutral-300 bg-white shadow-lg"
      style={{ maxWidth: 680, aspectRatio: "210/297" }}>
      {/* A4-like container with DIN margins */}
      <div className="h-full overflow-y-auto"
        style={{ padding: "clamp(24px,6vw,48px) clamp(20px,5vw,44px) clamp(28px,7vw,52px)" }}>

        {/* Sender block */}
        {blocks.senderLines.length > 0 && (
          <div className="mb-1" style={{ fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif", fontSize: "clamp(10px,2.6vw,12.5px)", lineHeight: 1.5, color: "#2a2a2a" }}>
            {blocks.senderLines.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        )}

        {/* Fold-mark spacing */}
        <div style={{ height: "clamp(16px,4vw,28px)" }} />

        {/* Recipient block */}
        {blocks.recipientLines.length > 0 && (
          <div style={{ fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif", fontSize: "clamp(10.5px,2.7vw,13px)", lineHeight: 1.5, color: "#1a1a1a" }}>
            {blocks.recipientLines.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        )}

        {/* Date line – right-aligned */}
        {blocks.dateLine && (
          <div className="text-right" style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontSize: "clamp(9.5px,2.5vw,12px)",
            color: "#3a3a3a",
            marginTop: "clamp(16px,4vw,26px)",
          }}>
            {blocks.dateLine}
          </div>
        )}

        {/* Reference line */}
        {blocks.referenceLine && (
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontSize: "clamp(9px,2.3vw,11px)",
            color: "#555",
            marginTop: 6,
          }}>
            {blocks.referenceLine}
          </div>
        )}

        {/* Subject line – bold, slightly larger */}
        {blocks.subjectLine && (
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontSize: "clamp(12px,3.1vw,15px)",
            fontWeight: 700,
            color: "#111",
            letterSpacing: "-0.01em",
            marginTop: "clamp(20px,5vw,30px)",
            marginBottom: "clamp(14px,3.5vw,22px)",
          }}>
            {blocks.subjectLine}
          </div>
        )}

        {/* Salutation */}
        {blocks.salutation && (
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontSize: "clamp(10.5px,2.7vw,13.5px)",
            lineHeight: 1.65,
            color: "#1a1a1a",
            marginBottom: "clamp(10px,2.5vw,14px)",
          }}>
            {blocks.salutation}
          </div>
        )}

        {/* Body paragraphs */}
        {blocks.bodyParagraphs.map((para, i) => (
          <div key={i} style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontSize: "clamp(10.5px,2.7vw,13.5px)",
            lineHeight: 1.7,
            color: "#1a1a1a",
            marginBottom: "clamp(8px,2vw,12px)",
            textAlign: "left",
          }}>
            {para}
          </div>
        ))}

        {/* Closing */}
        {blocks.closing && (
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontSize: "clamp(10.5px,2.7vw,13.5px)",
            lineHeight: 1.65,
            color: "#1a1a1a",
            marginTop: "clamp(14px,3.5vw,22px)",
          }}>
            {blocks.closing}
          </div>
        )}

        {/* Signature space */}
        <div style={{ height: "clamp(36px,9vw,56px)" }} />

        {/* Signer name */}
        {blocks.signerName && (
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontSize: "clamp(10.5px,2.7vw,13.5px)",
            fontWeight: 500,
            color: "#1a1a1a",
          }}>
            {blocks.signerName}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── CV Preview ── */
function CvPreview({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="relative mx-auto overflow-hidden rounded-sm border border-neutral-300 bg-white shadow-lg"
      style={{ maxWidth: 680 }}>
      <div className="overflow-y-auto"
        style={{ padding: "clamp(24px,6vw,48px) clamp(20px,5vw,44px) clamp(28px,7vw,52px)" }}>
        {lines.map((line, i) => {
          const trimmed = line.trim();
          if (trimmed === "") return <div key={i} style={{ height: 8 }} />;
          if (trimmed === "LEBENSLAUF") {
            return (
              <div key={i} style={{
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(14px,3.5vw,18px)",
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: "#111",
                marginBottom: 16,
              }}>
                {trimmed}
              </div>
            );
          }
          if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes(":")) {
            return (
              <div key={i} style={{
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(11px,2.8vw,14px)",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                color: "#222",
                borderBottom: "1.5px solid #ccc",
                paddingBottom: 4,
                marginTop: 20,
                marginBottom: 10,
              }}>
                {trimmed}
              </div>
            );
          }
          if (trimmed.includes(":") && trimmed.indexOf(":") < 20) {
            const [label, ...rest] = trimmed.split(":");
            return (
              <div key={i} style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "clamp(10.5px,2.7vw,13px)",
                lineHeight: 1.6,
                marginBottom: 4,
              }}>
                <span style={{ fontWeight: 600, color: "#333" }}>{label}:</span>{" "}
                {rest.join(":").trim()}
              </div>
            );
          }
          return (
            <div key={i} style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "clamp(10.5px,2.7vw,13px)",
              lineHeight: 1.6,
              marginBottom: 4,
            }}>
              {trimmed}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Fallback Preview ── */
function FallbackPreview({ text }: { text: string }) {
  return (
    <div className="relative mx-auto overflow-hidden rounded-sm border border-neutral-300 bg-white shadow-lg"
      style={{ maxWidth: 680 }}>
      <div className="overflow-y-auto whitespace-pre-wrap"
        style={{
          padding: "clamp(24px,6vw,48px) clamp(20px,5vw,44px)",
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "clamp(10.5px,2.7vw,13.5px)",
          lineHeight: 1.65,
          color: "#1a1a1a",
        }}>
        {text}
      </div>
    </div>
  );
}
