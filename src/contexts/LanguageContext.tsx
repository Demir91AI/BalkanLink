/**
 * BalkanLink Language Policy
 *
 * i18n remains in codebase for future scalability.
 * Only Bosanski is currently active in production.
 * Language switcher is disabled in UI.
 * Other languages remain inactive until explicitly re-enabled.
 */
import React, { createContext, useContext, useState, useCallback } from "react";
import { label as deLabel } from "@/lib/de-labels";
import BS from "@/i18n/bs";
import { LANGUAGE_POLICY } from "@/config/language-policy";

export type Language = "bs" | "de";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const FORCED_LANG = LANGUAGE_POLICY.activeLanguage as Language;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always force the active language defined in LANGUAGE_POLICY
  const [lang, setLangState] = useState<Language>(FORCED_LANG);

  const setLang = useCallback((newLang: Language) => {
    // Only allow switching if the policy permits other languages
    if (!LANGUAGE_POLICY.allowOtherLanguagesInUI && newLang !== FORCED_LANG) return;
    setLangState(newLang);
    try { localStorage.setItem("bl-lang", newLang); } catch {}
  }, []);

  const t = useCallback(
    (key: string): string => {
      if (lang === "bs") {
        return BS[key] ?? deLabel(key);
      }
      return deLabel(key);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const fallback: LanguageContextType = {
  lang: FORCED_LANG,
  setLang: () => {},
  t: (key: string) => {
    try { return BS[key] ?? deLabel(key); } catch { return key; }
  },
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx ?? fallback;
}
