import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import { translations, type Language, LANGUAGES } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const VALID_LANGS: Language[] = ["bs", "hr", "sr", "de"];

function getInitialLanguage(): Language {
  const saved = localStorage.getItem("balkanlink-lang") ||
                localStorage.getItem("app_language");
  if (saved && VALID_LANGS.includes(saved as Language)) {
    // Ensure both keys are in sync
    localStorage.setItem("balkanlink-lang", saved);
    localStorage.setItem("app_language", saved);
    return saved as Language;
  }
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  if (browserLang === "bs" || browserLang === "hr" || browserLang === "sr")
    return browserLang as Language;
  return "bs";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("balkanlink-lang", lang);
    localStorage.setItem("app_language", lang);
  }, []);

  // Listen for storage events from other tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "balkanlink-lang" && e.newValue && VALID_LANGS.includes(e.newValue as Language)) {
        setLanguageState(e.newValue as Language);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      // For hr/sr, fall back to bs if not explicitly provided
      if (language === "hr") return entry.hr ?? entry.bs ?? key;
      if (language === "sr") return entry.sr ?? entry.bs ?? key;
      if (language === "de") return entry.de ?? key;
      return entry.bs ?? key;
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
