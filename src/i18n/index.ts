/**
 * BalkanLink i18n bootstrap
 *
 * Default language: 'bs' (Bosanski) — served at root paths
 * Secondary language: 'de' (Deutsch) — served at /de/* prefix
 *
 * Detection order: localStorage ('balkanlink-lang') → navigator → fallback ('bs')
 * Language is also forced by URL via <LanguageRouter />.
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import bsCommon from "./locales/bs/common.json";
import bsForms from "./locales/bs/forms.json";
import bsPages from "./locales/bs/pages.json";
import bsErrors from "./locales/bs/errors.json";

import deCommon from "./locales/de/common.json";
import deForms from "./locales/de/forms.json";
import dePages from "./locales/de/pages.json";
import deErrors from "./locales/de/errors.json";

export const SUPPORTED_LANGUAGES = ["bs", "de"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = "bs";
export const LANG_STORAGE_KEY = "balkanlink-lang";

const resources = {
  bs: { common: bsCommon, forms: bsForms, pages: bsPages, errors: bsErrors },
  de: { common: deCommon, forms: deForms, pages: dePages, errors: deErrors },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Hard fallback: any unsupported browser language → Bosanski (never German).
    fallbackLng: DEFAULT_LANGUAGE,
    lng: undefined, // let detector decide on first load
    supportedLngs: [...SUPPORTED_LANGUAGES],
    nonExplicitSupportedLngs: false,
    load: "languageOnly", // 'de-AT' → 'de', 'sr-Latn' → falls back to 'bs'
    defaultNS: "common",
    ns: ["common", "forms", "pages", "errors"],
    interpolation: { escapeValue: false },
    detection: {
      // URL path takes precedence (so /de always means German on direct visit),
      // then the user's saved choice, then the browser language as last resort.
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      lookupLocalStorage: LANG_STORAGE_KEY,
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
    returnNull: false,
  });

export default i18n;
