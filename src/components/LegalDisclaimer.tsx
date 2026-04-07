import { useLanguage } from "@/contexts/LanguageContext";

export default function LegalDisclaimer() {
  const { t } = useLanguage();

  return (
    <p className="mt-8 text-center text-[11px] text-muted-foreground/60">
      {t("footer.disclaimer")}
    </p>
  );
}
