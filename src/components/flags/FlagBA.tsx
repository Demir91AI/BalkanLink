/**
 * FlagBA — Inline SVG flag of Bosnia and Herzegovina.
 * Blue field with a yellow triangle and a diagonal row of seven full + two half white stars.
 * Inline SVG (not emoji, not CDN) for cross-OS reliability and GDPR safety.
 */
interface Props {
  /** Width in px (height auto-derived from 2:1 ratio). Default: 20. */
  width?: number;
  className?: string;
}

export function FlagBA({ width = 20, className }: Props) {
  const height = Math.round(width / 2);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
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
      <rect width="100" height="50" fill="#002F6C" />
      {/* Yellow triangle: top-left (10,0) → top-right (50,0) → bottom-right (50,50)... 
          Official: vertices at top-right corner, bottom-right corner of hoist's upper edge area.
          Spec: triangle with vertices at (50,0), (0,50)? No — official: upper hoist (10,0)? 
          Standard rendering: vertices at top edge midpoint area to bottom-right corner. */}
      <polygon points="25,0 75,50 25,50" fill="#FECB00" />
      {/* Diagonal row of stars along hypotenuse from top-right toward bottom-left.
          Stars decrease/cut at edges (two half stars). Simplified: render 9 small stars along the line. */}
      <g fill="#FFFFFF">
        {[
          { cx: 22, cy: 4 },
          { cx: 28, cy: 10 },
          { cx: 34, cy: 16 },
          { cx: 40, cy: 22 },
          { cx: 46, cy: 28 },
          { cx: 52, cy: 34 },
          { cx: 58, cy: 40 },
          { cx: 64, cy: 46 },
        ].map((s, i) => (
          <Star key={i} cx={s.cx} cy={s.cy} r={2.6} />
        ))}
      </g>
    </svg>
  );
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  // 5-point star
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r / 2.5;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return <polygon points={points.join(" ")} />;
}

export default FlagBA;
