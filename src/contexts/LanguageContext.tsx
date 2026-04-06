import { createContext, useContext, useCallback, type ReactNode } from "react";
import { type Language, getTranslation, LANGUAGES } from "@/lib/translations";
import { lookup } from "@/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof LANGUAGES;
  currentFlag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language: Language = "bs";

  const setLanguage = useCallback((_lang: Language) => {
    // No-op: BHS only
  }, []);

  const t = useCallback(
    (key: string) => {
      // 1. Try the local translations map first
      const local = getTranslation(language, key as any);
      if (local !== key) return local;

      // 2. Fallback: search i18n namespaces (BS JSONs)
      const result = lookup(key);
      if (result !== key) return result;

      return local;
    },
    []
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
