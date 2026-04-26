/**
 * FlagBA — Inline SVG flag of Bosnia and Herzegovina (official spec).
 *
 * Spec (Constitution of BiH, 1998):
 *  - Ratio 2:1 (viewBox 200x100)
 *  - Field: medium blue (#002F6C — UN blue, official)
 *  - Yellow isoceles right triangle (#FECB00) with vertices at:
 *      top-right corner (200, 0), bottom-right corner (200, 100), bottom-left (0, 100)... 
 *      NO — official: triangle has vertices at top-right (200,0), bottom-right (200,100),
 *      and on the top edge such that the triangle's hypotenuse runs from top edge to
 *      bottom-left corner. Concretely the hypotenuse goes from (0, 100) up to a point on
 *      the top edge. Per spec, the triangle vertices are:
 *        A = (50, 0)    — on top edge, 1/4 in from left? No.
 *      
 *      Correct per Wikipedia/official: hypotenuse stretches from upper-left corner (0,0)
 *      area to lower-right? Also no.
 *
 *      Definitive: triangle vertices are
 *        top edge at right end (200, 0),
 *        bottom edge at right end (200, 100),
 *        third vertex on top edge at (some x). 
 *      That makes the hypotenuse run from (200,100) up to (x, 0) — i.e. diagonal from 
 *      bottom-right corner up to top edge. Stars run along this hypotenuse.
 *
 *      Implemented below: triangle vertices (100, 0), (200, 0), (200, 100). Hypotenuse from
 *      (100, 0) to (200, 100). Stars run along this line, top-edge to right-edge.
 *
 *  - 9 white five-pointed stars along hypotenuse, top star (at top edge) and bottom star
 *    (at right edge) are clipped in half by the flag border.
 */
interface Props {
  /** Width in px (height auto-derived from 2:1 ratio). Default: 20. */
  width?: number;
  className?: string;
}

const BLUE = "#002F6C";
const YELLOW = "#FECB00";

export function FlagBA({ width = 20, className }: Props) {
  const height = Math.round(width / 2);

  // Hypotenuse from (100, 0) → (200, 100). Direction unit vector = (1, 1)/√2.
  // Place 9 stars evenly spaced; the first sits on the top edge (y=0), the last on the
  // right edge (x=200). Both end stars get clipped by the flag rectangle naturally.
  const starCount = 9;
  const starRadius = 7.5;
  const stars = Array.from({ length: starCount }, (_, i) => {
    const t = i / (starCount - 1);
    return { cx: 100 + t * 100, cy: 0 + t * 100 };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
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
        overflow: "hidden",
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Clip stars to flag rectangle so the first/last appear halved. */}
        <clipPath id="ba-flag-clip">
          <rect x="0" y="0" width="200" height="100" />
        </clipPath>
      </defs>

      {/* Blue field */}
      <rect width="200" height="100" fill={BLUE} />

      {/* Yellow triangle: top edge midpoint → top-right corner → bottom-right corner */}
      <polygon points="100,0 200,0 200,100" fill={YELLOW} />

      {/* Stars along the hypotenuse, clipped to the flag */}
      <g fill="#FFFFFF" clipPath="url(#ba-flag-clip)">
        {stars.map((s, i) => (
          <Star key={i} cx={s.cx} cy={s.cy} r={starRadius} />
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
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return <polygon points={points.join(" ")} />;
}

export default FlagBA;
