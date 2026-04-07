import React, { createContext, useContext, useState, useCallback } from "react";
import { translations, type Language, LANGUAGES, getTranslation } from "@/lib/translations";
import { lookup as i18nLookup } from "@/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const saved = typeof window !== "undefined" ? localStorage.getItem("balkanlink-lang") as Language : null;
  const validLangs: Language[] = ["bhs", "de"];
  const initial: Language = saved && validLangs.includes(saved) ? saved : "bhs";

  const [language, setLang] = useState<Language>(initial);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    localStorage.setItem("balkanlink-lang", lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      // 1. Check main translations dict
      const entry = translations[key];
      if (entry) {
        return entry[language] ?? entry["bhs"] ?? key;
      }

      // 2. Fallback: namespace-based JSON lookup (for legacy keys in src/locales/bs/*.json)
      // Map "bhs" → "bs" for JSON compatibility
      const result = i18nLookup(key);
      if (result !== key) return result;

      return key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
