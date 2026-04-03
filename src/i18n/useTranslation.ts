// Backward-compatible wrapper around react-i18next
import { useTranslation as useI18nextTranslation } from "react-i18next";
import i18n from "@/i18n";

export const setGlobalLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("app_language", lang);
};

export function useTranslation(ns?: string | string[]) {
  const { t, i18n: instance } = useI18nextTranslation(ns || "common");
  return {
    t: t as (key: string, opts?: Record<string, unknown>) => string,
    currentLanguage: instance.language,
    setLanguage: setGlobalLanguage,
  };
}
