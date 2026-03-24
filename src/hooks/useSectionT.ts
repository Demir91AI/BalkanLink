import { useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSectionT } from "@/lib/i18n-sections";

/**
 * Returns a `st(key)` function that pulls from section-specific translations
 * (docCheck.*, viza.*, nt.*) using the currently selected language.
 */
export function useSectionT() {
  const { language } = useLanguage();
  const st = useCallback(
    (key: string) => getSectionT(language as any, key),
    [language]
  );
  return st;
}
