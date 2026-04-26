/**
 * FlagBA — Inline SVG flag of Bosnia and Herzegovina.
 * Used in the LanguageSwitcher next to "Bosanski".
 * Inline SVG (not emoji, not CDN) for cross-OS reliability and GDPR safety.
 */
interface Props {
  /** Width in px (height auto-derived from 3:2 ratio). Default: 20. */
  width?: number;
  className?: string;
}

export function FlagBA({ width = 20, className }: Props) {
  const height = Math.round((width * 14) / 20); // ~14 at width 20
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      width={width}
      height={height}
      role="img"
      aria-label="Zastava Bosne i Hercegovine"
      className={className}
      style={{
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.15)",
        flexShrink: 0,
        display: "block",
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Blue field */}
      <rect width="60" height="30" fill="#002F6C" />
      {/* Yellow triangle (hypotenuse from top-right to bottom-left of triangle area) */}
      <polygon points="14,0 60,0 60,30" fill="#FECB00" />
      {/* Diagonal of 9 white five-pointed stars (1 full + edges) */}
      <g fill="#FFFFFF">
        {[
          { cx: 12.5, cy: 2.5 },
          { cx: 9.5, cy: 6 },
          { cx: 6.5, cy: 9.5 },
          { cx: 3.5, cy: 13 },
          { cx: 0.5, cy: 16.5 },
        ].map((p, i) => (
          <Star key={`a${i}`} cx={p.cx} cy={p.cy} r={1.6} />
        ))}
        {[
          { cx: 12.5, cy: 27.5 },
          { cx: 9.5, cy: 24 },
          { cx: 6.5, cy: 20.5 },
          { cx: 3.5, cy: 17 },
        ].map((p, i) => (
          <Star key={`b${i}`} cx={p.cx} cy={p.cy} r={1.6} />
        ))}
      </g>
    </svg>
  );
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r / 2.5;
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }
  return <polygon points={points.join(" ")} />;
}

export default FlagBA;
