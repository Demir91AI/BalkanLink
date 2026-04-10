import { useLanguage } from "@/contexts/LanguageContext";

export const setGlobalLanguage = (lang: string) => {
  localStorage.setItem("balkanlink-lang", lang);
  window.dispatchEvent(new StorageEvent("storage", {
    key: "balkanlink-lang",
    newValue: lang,
  }));
};

export function useTranslation(_ns?: string | string[]) {
  const { t, language, setLanguage } = useLanguage();
  return {
    t,
    currentLanguage: language,
    setLanguage,
    i18n: { language },
  };
}
