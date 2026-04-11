import { useCallback } from "react";
/**
 * Returns a `st(key)` function that pulls from section-specific translations
 * (docCheck.*, viza.*, nt.*) using the currently selected language.
 */
export function useSectionT() {
  const st = useCallback(
    (key: string) => getSectionT(language, key),
    [language]
  );
  return st;
}
