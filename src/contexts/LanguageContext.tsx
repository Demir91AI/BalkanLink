/**
 * LanguageContext — backwards-compatible shim that delegates to react-i18next.
 *
 * Existing components calling `useLanguage().t(...)` keep working against the
 * legacy BS/DE label tables (src/i18n/bs.ts and src/lib/de-labels.ts). The
 * authoritative language now comes from i18next, so the switcher and the URL
 * /de prefix drive what `lang` returns here.
 */
import React, { createContext, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { label as deLabel } from "@/lib/de-labels";
import BS from "@/i18n/bs";
import { LANGUAGE_POLICY } from "@/config/language-policy";
import i18n, { LANG_STORAGE_KEY } from "@/i18n";

export type Language = "bs" | "de";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n: i18nInstance } = useTranslation();
  const lang = ((i18nInstance.language as Language) || LANGUAGE_POLICY.defaultLanguage) as Language;

  const setLang = useCallback((newLang: Language) => {
    void i18n.changeLanguage(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      if (lang === "bs") return BS[key] ?? deLabel(key);
      return deLabel(key);
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const fallback: LanguageContextType = {
  lang: LANGUAGE_POLICY.defaultLanguage as Language,
  setLang: () => {},
  t: (key: string) => {
    try { return BS[key] ?? deLabel(key); } catch { return key; }
  },
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx ?? fallback;
}
