import { useTranslation } from "react-i18next";

/** Translated "Unlock with BalkanLink Plus — 19,90€ one-time" label. */
export default function PlusCtaLabel({ note = false }: { note?: boolean }) {
  const { t } = useTranslation("plus");
  return <>{t(note ? "unlockNote" : "unlockCta")}</>;
}
