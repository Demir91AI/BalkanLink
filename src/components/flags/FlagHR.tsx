/**
 * FlagHR — Inline SVG flag of Croatia.
 *
 * Three horizontal stripes red/white/blue. The official central coat of arms
 * (šahovnica) is omitted because it's illegible at 20–30 px and would make
 * the icon visually noisy compared to the three other simple stripe flags
 * in the language switcher. This is the standard simplification used in
 * compact language pickers (Wikipedia "civil-style" rendering).
 */
interface Props {
  /** Width in px (height auto-derived from 2:1 ratio). Default: 24. */
  width?: number;
  className?: string;
}

const RED = "#E51A1A";
const WHITE = "#FFFFFF";
const BLUE = "#171796";

export function FlagHR({ width = 24, className }: Props) {
  const height = Math.round(width / 2);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 6 3"
      width={width}
      height={height}
      role="img"
      aria-label="Zastava Hrvatske"
      className={className}
      style={{
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.15)",
        flexShrink: 0,
        display: "block",
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="6" height="1" y="0" fill={RED} />
      <rect width="6" height="1" y="1" fill={WHITE} />
      <rect width="6" height="1" y="2" fill={BLUE} />
    </svg>
  );
}

export default FlagHR;
