/**
 * Unified BL brand logo component.
 *
 * Variants:
 *  - "full"  → BL icon + "BalkanLink" text  (desktop header)
 *  - "icon"  → BL icon only                 (mobile header, favicon, chat)
 *  - "small" → smaller icon + text           (footer)
 */

import { Link } from "react-router-dom";

type Variant = "full" | "icon" | "small";

interface BrandLogoProps {
  variant?: Variant;
  className?: string;
  /** wrap in <Link to="/"> – default true */
  linkHome?: boolean;
  /** Use dark text colors for light backgrounds */
  darkText?: boolean;
}

const SIZES: Record<Variant, { icon: number; fontSize: string; gap: string }> = {
  full:  { icon: 36, fontSize: "text-xl",   gap: "gap-2.5" },
  small: { icon: 24, fontSize: "text-base", gap: "gap-2" },
  icon:  { icon: 36, fontSize: "text-xl",   gap: "gap-0" },
};

function BLIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className="block shrink-0"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="hsl(var(--primary))" />
      <text
        x="4"
        y="30"
        fontFamily="'Arial Black', Arial, sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="-1"
      >
        <tspan fill="#FFFFFF">B</tspan>
        <tspan fill="hsl(var(--brand-orange))">L</tspan>
      </text>
    </svg>
  );
}

function LogoContent({ variant = "full", darkText = false }: { variant: Variant; darkText?: boolean }) {
  const { icon, fontSize, gap } = SIZES[variant];
  const textColor = darkText
    ? "text-[#1E293B] [text-shadow:0_1px_2px_rgba(0,0,0,0.12)]"
    : "text-white";

  return (
    <span className={`flex items-center ${gap}`}>
      <BLIcon size={icon} />
      {variant !== "icon" && (
        <span className={`font-heading ${fontSize} font-extrabold leading-none tracking-tight ${textColor}`}>
          Balkan<span className="text-brand-orange">Link</span>
        </span>
      )}
    </span>
  );
}

export default function BrandLogo({ variant = "full", className = "", linkHome = true, darkText = false }: BrandLogoProps) {
  if (linkHome) {
    return (
      <Link to="/" className={`inline-flex items-center ${className}`} aria-label="BalkanLink home">
        <LogoContent variant={variant} darkText={darkText} />
      </Link>
    );
  }
  return (
    <span className={`inline-flex items-center ${className}`}>
      <LogoContent variant={variant} darkText={darkText} />
    </span>
  );
}

export { BLIcon };
