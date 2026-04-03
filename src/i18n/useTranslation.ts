// Backward-compatible wrapper around react-i18next
// Supports both namespaced keys ("hero:title") and flat dot keys ("sidebar.smartGuide")
import { useTranslation as useI18nextTranslation } from "react-i18next";
import i18n from "@/i18n";

export const setGlobalLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("app_language", lang);
};

// All namespaces to search through for flat-key lookups
const ALL_NS = [
  "common","header","hero","homepage","footer","sideMenu","rightPanel",
  "formulare","visaNavigator","dokumentencheck","deutsch","chatbot",
  "calculators","cookies","validation","status","premium","ads","nudimTrazim"
];

export function useTranslation(ns?: string | string[]) {
  const { t: i18nT, i18n: instance } = useI18nextTranslation(ns || ALL_NS);

  // t() that supports flat dot-notation keys used throughout the app
  // e.g. t("sidebar.smartGuide") → searches sideMenu namespace for "smartGuide"
  // Also supports direct namespace keys like t("hero.title") 
  const t = (key: string, opts?: Record<string, unknown>): string => {
    // First try direct lookup (works for namespaced calls)
    const direct = i18nT(key, opts as any);
    if (direct !== key) return direct;

    // Try splitting on first dot: "sidebar.smartGuide" → ns "sideMenu", key "smartGuide"
    // But our namespace names don't always match the prefix, so search all namespaces
    for (const namespace of ALL_NS) {
      const result = i18nT(`${namespace}:${key}`, opts as any);
      if (result !== `${namespace}:${key}` && result !== key) return result;
    }

    // Try the key as-is in each namespace (for keys like "smartGuide" without prefix)
    const dotIdx = key.indexOf(".");
    if (dotIdx > 0) {
      const subKey = key.substring(dotIdx + 1);
      for (const namespace of ALL_NS) {
        const result = i18nT(`${namespace}:${subKey}`, opts as any);
        if (result !== `${namespace}:${subKey}` && result !== subKey) return result;
      }
    }

    return direct;
  };

  return {
    t,
    currentLanguage: instance.language,
    setLanguage: setGlobalLanguage,
  };
}
