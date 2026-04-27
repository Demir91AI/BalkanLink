import Breadcrumbs from "./Breadcrumbs";

interface Props {
  onBack?: () => void;
  inline?: boolean;
}

/**
 * @deprecated Use <Breadcrumbs /> directly. Kept as thin wrapper for backward compatibility.
 */
export default function PageNavBar({ onBack, inline }: Props) {
  return <Breadcrumbs onBack={onBack} inline={inline} variant="light" />;
}
