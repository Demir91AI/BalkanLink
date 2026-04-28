import Breadcrumbs from "./Breadcrumbs";

interface Props {
  onBack?: () => void;
  inline?: boolean;
  /** Force light variant for cream/light pages. Default: auto (semantic tokens). */
  variant?: "dark" | "light" | "auto";
}

/**
 * @deprecated Use <Breadcrumbs /> directly. Kept as thin wrapper for backward compatibility.
 */
export default function PageNavBar({ onBack, inline, variant = "auto" }: Props) {
  return <Breadcrumbs onBack={onBack} inline={inline} variant={variant} />;
}
