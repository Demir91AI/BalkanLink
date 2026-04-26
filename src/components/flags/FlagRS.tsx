/**
 * FlagRS — Inline SVG civil flag of Serbia.
 *
 * Three horizontal stripes red/blue/white. The state flag bears a coat of
 * arms in the center, but the civil flag (no coat) is the correct choice
 * for a 20–30 px language-picker icon — the coat is unreadable at this size
 * and would make the icon visually noisy next to BA/HR/DE.
 */
interface Props {
  /** Width in px (height auto-derived from 3:2 ratio). Default: 24. */
  width?: number;
  className?: string;
}

const RED = "#C6363C";
const BLUE = "#0C4076";
const WHITE = "#FFFFFF";

export function FlagRS({ width = 24, className }: Props) {
  // Serbian flag is 2:3 (height:width = 2:3). With 3:2 ratio width:height = 3:2.
  const height = Math.round((width * 2) / 3);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 6 4"
      width={width}
      height={height}
      role="img"
      aria-label="Zastava Srbije"
      className={className}
      style={{
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.15)",
        flexShrink: 0,
        display: "block",
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="6" height="4" fill={RED} />
      <rect width="6" height="2" y="1.33" fill={BLUE} />
      <rect width="6" height="1.33" y="2.67" fill={WHITE} />
    </svg>
  );
}

export default FlagRS;
