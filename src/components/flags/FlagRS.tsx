/**
 * FlagRS — Official state flag of the Republic of Serbia (with coat of arms).
 *
 * Renders the real national state flag (red/blue/white with the central
 * coat of arms) via flagcdn.com. Earlier versions used the civil flag
 * without the coat; per Demir's apr 2026 feedback we use the state flag
 * so users immediately recognise it next to the HR/BA/DE flags.
 */
interface Props {
  /** Width in px (height auto-derived from 3:2 ratio). Default: 24. */
  width?: number;
  className?: string;
}

export function FlagRS({ width = 24, className }: Props) {
  // Serbian flag ratio is 2:3 (height:width = 2:3) → height = width * 2/3.
  const height = Math.round((width * 2) / 3);
  const cdnWidth = width <= 20 ? 40 : width <= 40 ? 80 : 160;
  return (
    <img
      src={`https://flagcdn.com/w${cdnWidth}/rs.png`}
      srcSet={`https://flagcdn.com/w${cdnWidth * 2}/rs.png 2x`}
      width={width}
      height={height}
      alt="Zastava Srbije"
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.15)",
        flexShrink: 0,
        display: "block",
        objectFit: "cover",
      }}
    />
  );
}

export default FlagRS;
