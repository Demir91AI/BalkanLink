import { useLanguage } from "@/contexts/LanguageContext";

const disclaimers: Record<string, string> = {
  bs: "Ove informacije služe samo za orijentaciju i ne predstavljaju pravni savjet.",
  de: "Diese Informationen dienen nur zur Orientierung und stellen keine Rechtsberatung dar.",
  en: "This information is for orientation only and does not constitute legal advice.",
};

export default function LegalDisclaimer() {
  const { language } = useLanguage();
  const lk = language === "de" ? "de" : language === "en" ? "en" : "bs";

  return (
    <p className="mt-8 text-center text-[11px] text-muted-foreground/60">
      {disclaimers[lk]}
    </p>
  );
}
