/**
 * Simplified useTranslation — delegates to LanguageContext.
 * Kept for backward compatibility with components that import from here.
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { lookup, namespaceLookup } from "@/i18n";

export const setGlobalLanguage = (_lang: string) => {
  // No-op — use LanguageContext.setLanguage instead
};

export function useTranslation(ns?: string | string[]) {
  const { language } = useLanguage();

  const t = (key: string, opts?: Record<string, unknown>): string => {
    if (ns) {
      return namespaceLookup(ns, key, opts);
    }
    return lookup(key, opts);
  };

  return {
    t,
    currentLanguage: language,
    setLanguage: setGlobalLanguage,
    i18n: { language, changeLanguage: () => {} },
  };
}
