import Breadcrumbs from "./Breadcrumbs";

interface Props {
  onBack?: () => void;
  inline?: boolean;
  /** Force light variant for cream/light pages. Default: auto (semantic tokens). */
  variant?: "dark" | "light" | "auto";
  /** Show share button on the right side */
  showShare?: boolean;
  /** Override share title */
  shareTitle?: string;
  /** Hide auto-derived crumb trail (only show Back + Home buttons) */
  hideTrail?: boolean;
}

/**
 * @deprecated Use <Breadcrumbs /> directly. Kept as thin wrapper for backward compatibility.
 */
export default function PageNavBar({ onBack, inline, variant = "auto", showShare, shareTitle, hideTrail }: Props) {
  return <Breadcrumbs onBack={onBack} inline={inline} variant={variant} showShare={showShare} shareTitle={shareTitle} hideTrail={hideTrail} />;
}

