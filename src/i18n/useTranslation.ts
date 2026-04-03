// Backward-compatible wrapper around react-i18next
import { useTranslation as useI18nextTranslation } from "react-i18next";
import i18n from "@/i18n";

export const setGlobalLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("app_language", lang);
};

const ALL_NS = [
  "common","header","hero","homepage","footer","sideMenu","rightPanel",
  "formulare","visaNavigator","dokumentencheck","deutsch","chatbot",
  "calculators","cookies","validation","status","premium","ads","nudimTrazim"
];

export function useTranslation(ns?: string | string[]) {
  const { t: i18nT, i18n: instance } = useI18nextTranslation(ns || ALL_NS);

  const isValid = (result: string, ...fallbacks: string[]) =>
    result && !fallbacks.includes(result) && !result.startsWith("[object") && !result.startsWith("key '");

  const t = (key: string, opts?: Record<string, unknown>): string => {
    const raw = i18nT(key, opts as any);
    const direct = typeof raw === 'string' ? raw : String(raw);
    if (typeof raw === 'string' && isValid(direct, key)) return direct;

    // Search all namespaces for the key (skip object results)
    for (const namespace of ALL_NS) {
      const nsKey = `${namespace}:${key}`;
      const rawNs = i18nT(nsKey, opts as any);
      if (typeof rawNs !== 'string') continue;
      const result = rawNs;
      if (isValid(result, nsKey, key)) return result;
    }

    // Try removing dot prefix: "sidebar.smartGuide" → search for "smartGuide" in each ns
    const dotIdx = key.indexOf(".");
    if (dotIdx > 0) {
      const subKey = key.substring(dotIdx + 1);
      for (const namespace of ALL_NS) {
        const nsKey = `${namespace}:${subKey}`;
        const rawNs = i18nT(nsKey, opts as any);
        if (typeof rawNs !== 'string') continue;
        const result = rawNs;
        if (isValid(result, nsKey, subKey)) return result;
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
