import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Language, getTranslation, LANGUAGES } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof LANGUAGES;
  currentFlag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("balkanlink-lang");
    return (saved as Language) || "bs";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("balkanlink-lang", lang);
  }, []);

  const t = useCallback(
    (key: string) => getTranslation(language, key as any),
    [language]
  );

  const currentFlag = LANGUAGES.find((l) => l.code === language)?.flag || "🇧🇦";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES, currentFlag }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
