import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Language, getTranslation, LANGUAGES } from "@/lib/translations";
import i18n from "@/i18n";

const ALL_NS = [
  "common","header","hero","homepage","footer","sideMenu","rightPanel",
  "formulare","visaNavigator","dokumentencheck","deutsch","chatbot",
  "calculators","cookies","validation","status","premium","ads","nudimTrazim"
];

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
    return (saved as Language) || "de";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("balkanlink-lang", lang);
    // Sync i18next so both systems stay in lock-step
    i18n.changeLanguage(lang);
    localStorage.setItem("app_language", lang);
  }, []);

  const t = useCallback(
    (key: string) => {
      // 1. Try the local translations map first
      const local = getTranslation(language, key as any);
      if (local !== key) return local;

      // Helper: check if a result is a valid translated string
      const isValid = (result: unknown, ...fallbacks: string[]) =>
        typeof result === "string" && result.length > 0 &&
        !fallbacks.includes(result) &&
        !result.startsWith("[object") &&
        !result.startsWith("key '");

      // 2. Fallback: search i18next namespaces
      const i18nT = i18n.t.bind(i18n);

      // Direct lookup
      for (const ns of ALL_NS) {
        const nsKey = `${ns}:${key}`;
        const result = i18nT(nsKey, { lng: language, returnObjects: false });
        if (isValid(result, nsKey, key)) return result as string;
      }

      // Dot-prefix lookup: "sidebar.smartGuide" → try "sideMenu:smartGuide"
      const dotIdx = key.indexOf(".");
      if (dotIdx > 0) {
        const subKey = key.substring(dotIdx + 1);
        for (const ns of ALL_NS) {
          const nsKey = `${ns}:${subKey}`;
          const result = i18nT(nsKey, { lng: language, returnObjects: false });
          if (isValid(result, nsKey, subKey)) return result as string;
        }
      }

      return local;
    },
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
