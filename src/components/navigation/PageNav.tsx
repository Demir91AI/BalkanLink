import Breadcrumbs from "./Breadcrumbs";

/**
 * @deprecated Thin wrapper around <Breadcrumbs />. Use <Breadcrumbs /> directly in new code.
 * Kept so legacy pages (Login, Profil, Pricing…) keep working without import changes.
 */
export default function PageNav({ onBack }: { onBack?: () => void }) {
  return <Breadcrumbs onBack={onBack} variant="auto" />;
}
