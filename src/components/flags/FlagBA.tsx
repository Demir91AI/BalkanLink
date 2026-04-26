/**
 * FlagBA — Inline SVG flag of Bosnia and Herzegovina (official spec).
 *
 * Geometry (viewBox 200 × 100, ratio 2:1):
 *  - Blue field (#002F6C) covering full rectangle.
 *  - Yellow isosceles right triangle (#FECB00) with vertices at:
 *        (66.66,   0)   — point on top edge, ~1/3 from the left
 *        (200,     0)   — top-right corner
 *        (200,   100)   — bottom-right corner
 *    The hypotenuse runs from (66.66, 0) down to (200, 100).
 *  - Nine white five-pointed stars sit ON the hypotenuse line, centered on it,
 *    so half of each star is on the yellow triangle and half on the blue field.
 *    The first and last stars are clipped by the flag rectangle (top edge and
 *    right edge respectively), producing the iconic "halved" stars.
 */
interface Props {
  /** Width in px (height auto-derived from 2:1 ratio). Default: 24. */
  width?: number;
  className?: string;
}

const BLUE = "#002F6C";
const YELLOW = "#FECB00";

// Hypotenuse endpoints.
const HX1 = 66.66;
const HY1 = 0;
const HX2 = 200;
const HY2 = 100;

export function FlagBA({ width = 24, className }: Props) {
  const height = Math.round(width / 2);

  // 9 evenly-spaced star centers along the hypotenuse. The first sits exactly
  // on the top edge, the last on the right edge — both end up visually halved
  // because of the clipPath.
  const starCount = 9;
  const starRadius = 11;
  const stars = Array.from({ length: starCount }, (_, i) => {
    const t = i / (starCount - 1);
    return {
      cx: HX1 + t * (HX2 - HX1),
      cy: HY1 + t * (HY2 - HY1),
    };
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

      {/* Yellow triangle: top edge at ~1/3, top-right corner, bottom-right corner */}
      <polygon
        points={`${HX1},${HY1} ${HX2},${HY1} ${HX2},${HY2}`}
        fill={YELLOW}
      />

      {/* Stars centred on the hypotenuse, clipped to the flag rectangle */}
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
