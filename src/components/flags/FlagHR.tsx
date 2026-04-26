/**
 * FlagHR — Official flag of the Republic of Croatia (with coat of arms / šahovnica).
 *
 * Renders the real national flag via flagcdn.com (per the platform's
 * flag-usage standard). Earlier versions used a simplified civil-style
 * SVG without the coat of arms; per Demir's apr 2026 feedback the dropdown
 * must show the actual national flags so users immediately recognise them.
 */
interface Props {
  /** Width in px (height auto-derived from 2:1 ratio). Default: 24. */
  width?: number;
  className?: string;
}

export function FlagHR({ width = 24, className }: Props) {
  const height = Math.round(width / 2);
  // flagcdn serves crisp PNGs at fixed widths; pick the next size up for
  // retina sharpness, then let the browser scale down.
  const cdnWidth = width <= 20 ? 40 : width <= 40 ? 80 : 160;
  return (
    <img
      src={`https://flagcdn.com/w${cdnWidth}/hr.png`}
      srcSet={`https://flagcdn.com/w${cdnWidth * 2}/hr.png 2x`}
      width={width}
      height={height}
      alt="Zastava Hrvatske"
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

export default FlagHR;
