/**
 * BalkanLink i18n bootstrap
 *
 * Default language: 'bs' (Bosanski) — served at root paths
 * Secondary languages:
 *   - 'de' (Deutsch)   — /de/* prefix
 *   - 'hr' (Hrvatski)  — /hr/* prefix
 *   - 'sr' (Srpski, ekavica) — /sr/* prefix
 *
 * Detection order: path → localStorage ('balkanlink-lang') → navigator → 'bs'.
 * Language is also forced by URL via <LanguageRouter />.
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import bsCommon from "./locales/bs/common.json";
import bsForms from "./locales/bs/forms.json";
import bsPages from "./locales/bs/pages.json";
import bsErrors from "./locales/bs/errors.json";
import bsSchufa from "./locales/bs/schufa.json";
import bsAnerkennung from "./locales/bs/anerkennung.json";
import bsPorezi from "./locales/bs/porezi.json";
import bsLegal from "./locales/bs/legal.json";
import bsChecklists from "./locales/bs/checklists.json";
import bsSimulator from "./locales/bs/simulator.json";
import bsDvojnoDrzavljanstvo from "./locales/bs/dvojnoDrzavljanstvo.json";
import bsSaved from "./locales/bs/saved.json";

import deCommon from "./locales/de/common.json";
import deForms from "./locales/de/forms.json";
import dePages from "./locales/de/pages.json";
import deErrors from "./locales/de/errors.json";
import deSchufa from "./locales/de/schufa.json";
import deAnerkennung from "./locales/de/anerkennung.json";
import dePorezi from "./locales/de/porezi.json";
import deLegal from "./locales/de/legal.json";
import deChecklists from "./locales/de/checklists.json";
import deSimulator from "./locales/de/simulator.json";
import deDvojnoDrzavljanstvo from "./locales/de/dvojnoDrzavljanstvo.json";

import hrCommon from "./locales/hr/common.json";
import hrForms from "./locales/hr/forms.json";
import hrPages from "./locales/hr/pages.json";
import hrErrors from "./locales/hr/errors.json";
import hrSchufa from "./locales/hr/schufa.json";
import hrAnerkennung from "./locales/hr/anerkennung.json";
import hrPorezi from "./locales/hr/porezi.json";
import hrLegal from "./locales/hr/legal.json";
import hrChecklists from "./locales/hr/checklists.json";
import hrSimulator from "./locales/hr/simulator.json";
import hrDvojnoDrzavljanstvo from "./locales/hr/dvojnoDrzavljanstvo.json";

import srCommon from "./locales/sr/common.json";
import srForms from "./locales/sr/forms.json";
import srPages from "./locales/sr/pages.json";
import srErrors from "./locales/sr/errors.json";
import srSchufa from "./locales/sr/schufa.json";
import srAnerkennung from "./locales/sr/anerkennung.json";
import srPorezi from "./locales/sr/porezi.json";
import srLegal from "./locales/sr/legal.json";
import srChecklists from "./locales/sr/checklists.json";
import srSimulator from "./locales/sr/simulator.json";
import srDvojnoDrzavljanstvo from "./locales/sr/dvojnoDrzavljanstvo.json";

export const SUPPORTED_LANGUAGES = ["bs", "de", "hr", "sr"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = "bs";
export const LANG_STORAGE_KEY = "balkanlink-lang";

const resources = {
  bs: { common: bsCommon, forms: bsForms, pages: bsPages, errors: bsErrors, schufa: bsSchufa, anerkennung: bsAnerkennung, porezi: bsPorezi, legal: bsLegal, checklists: bsChecklists, simulator: bsSimulator, dvojnoDrzavljanstvo: bsDvojnoDrzavljanstvo },
  de: { common: deCommon, forms: deForms, pages: dePages, errors: deErrors, schufa: deSchufa, anerkennung: deAnerkennung, porezi: dePorezi, legal: deLegal, checklists: deChecklists, simulator: deSimulator, dvojnoDrzavljanstvo: deDvojnoDrzavljanstvo },
  hr: { common: hrCommon, forms: hrForms, pages: hrPages, errors: hrErrors, schufa: hrSchufa, anerkennung: hrAnerkennung, porezi: hrPorezi, legal: hrLegal, checklists: hrChecklists, simulator: hrSimulator, dvojnoDrzavljanstvo: hrDvojnoDrzavljanstvo },
  sr: { common: srCommon, forms: srForms, pages: srPages, errors: srErrors, schufa: srSchufa, anerkennung: srAnerkennung, porezi: srPorezi, legal: srLegal, checklists: srChecklists, simulator: srSimulator, dvojnoDrzavljanstvo: srDvojnoDrzavljanstvo },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Hard fallback: any unsupported browser language → Bosanski.
    // Anything outside the 4 codes (Italian, French, Russian, Cyrillic SR, …)
    // resolves here.
    fallbackLng: DEFAULT_LANGUAGE,
    lng: undefined, // let detector decide on first load
    supportedLngs: [...SUPPORTED_LANGUAGES],
    nonExplicitSupportedLngs: false, // 'sr-Latn' / 'hr-HR' won't auto-resolve
    load: "languageOnly", // 'de-AT' → 'de'
    defaultNS: "common",
    ns: ["common", "forms", "pages", "errors", "schufa", "anerkennung", "porezi", "legal", "checklists", "simulator", "dvojnoDrzavljanstvo"],
    interpolation: { escapeValue: false },
    detection: {
      // URL path takes precedence (so /de, /hr, /sr always force the language
      // on direct visit), then user choice, then browser language.
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      lookupLocalStorage: LANG_STORAGE_KEY,
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
    returnNull: false,
  });

// Dev-only: warn in console if any `legal` namespace key is missing/empty
// across the 4 supported languages. Never throws.
if (import.meta.env?.DEV) {
  // dynamic import keeps validator out of the production bundle
  import("./validateLegal").then((m) => m.runLegalValidationInDev()).catch(() => {});
}

export default i18n;
