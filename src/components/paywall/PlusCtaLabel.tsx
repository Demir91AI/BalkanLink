import { useTranslation } from "react-i18next";

/** Translated "See BalkanLink membership" label (new 2026 offer). */
export default function PlusCtaLabel({ note = false }: { note?: boolean }) {
  const { t } = useTranslation("plus");
  return <>{t(note ? "unlockNote" : "unlockCta")}</>;
}
