import React, { createContext, useContext, useState, useCallback } from "react";
import { label as deLabel } from "@/lib/de-labels";
import BS from "@/i18n/bs";

export type Language = "bs" | "de";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("bl-lang") as Language | null;
      if (stored === "bs" || stored === "de") return stored;
    } catch {}
    return "de";
  });

  const setLang = useCallback((newLang: Language) => {
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
  lang: "de",
  setLang: () => {},
  t: (key: string) => {
    try { return deLabel(key); } catch { return key; }
  },
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx ?? fallback;
}
