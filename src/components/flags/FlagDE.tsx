/**
 * FlagDE — Inline SVG flag of Germany (black-red-gold horizontal bands).
 * Used in the LanguageSwitcher next to "Deutsch".
 * Inline SVG (not emoji, not CDN) for cross-OS reliability and GDPR safety.
 */
interface Props {
  /** Width in px (height auto-derived from 5:3 ratio). Default: 20. */
  width?: number;
  className?: string;
}

export function FlagDE({ width = 20, className }: Props) {
  const height = Math.round((width * 14) / 20); // visual ~14 at width 20
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 5 3"
      width={width}
      height={height}
      role="img"
      aria-label="Flagge Deutschlands"
      className={className}
      style={{
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.15)",
        flexShrink: 0,
        display: "block",
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="5" height="1" y="0" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

export default FlagDE;
