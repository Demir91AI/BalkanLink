import React, { createContext, useContext, useState, useCallback } from "react";
import { translations, type Language, LANGUAGES } from "@/lib/translations";

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
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] ?? entry["bhs"] ?? key;
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
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
