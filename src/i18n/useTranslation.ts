/**
 * Simplified useTranslation — BHS only, no react-i18next.
 */
import { lookup, namespaceLookup } from "@/i18n";

export const setGlobalLanguage = (_lang: string) => {
  // No-op: BHS only
};

export function useTranslation(ns?: string | string[]) {
  const t = (key: string, opts?: Record<string, unknown>): string => {
    if (ns) {
      return namespaceLookup(ns, key, opts);
    }
    return lookup(key, opts);
  };

  return {
    t,
    currentLanguage: "bs",
    setLanguage: setGlobalLanguage,
    i18n: { language: "bs", changeLanguage: () => {} },
  };
}
