/**
 * i18n namespace-based lookup — backward compatibility layer.
 * All translations come from src/locales/bs/*.json for legacy keys.
 * New keys should be added to src/lib/translations.ts instead.
 */

import bs_common from "./locales/bs/common.json";
import bs_header from "./locales/bs/header.json";
import bs_hero from "./locales/bs/hero.json";
import bs_homepage from "./locales/bs/homepage.json";
import bs_footer from "./locales/bs/footer.json";
import bs_sideMenu from "./locales/bs/sideMenu.json";
import bs_rightPanel from "./locales/bs/rightPanel.json";
import bs_formulare from "./locales/bs/formulare.json";
import bs_visaNavigator from "./locales/bs/visaNavigator.json";
import bs_dokumentencheck from "./locales/bs/dokumentencheck.json";
import bs_deutsch from "./locales/bs/deutsch.json";
import bs_chatbot from "./locales/bs/chatbot.json";
import bs_calculators from "./locales/bs/calculators.json";
import bs_cookies from "./locales/bs/cookies.json";
import bs_validation from "./locales/bs/validation.json";
import bs_status from "./locales/bs/status.json";
import bs_premium from "./locales/bs/premium.json";
import bs_ads from "./locales/bs/ads.json";
import bs_nudimTrazim from "./locales/bs/nudimTrazim.json";

const namespaces: Record<string, Record<string, any>> = {
  common: bs_common,
  header: bs_header,
  hero: bs_hero,
  homepage: bs_homepage,
  footer: bs_footer,
  sideMenu: bs_sideMenu,
  rightPanel: bs_rightPanel,
  formulare: bs_formulare,
  visaNavigator: bs_visaNavigator,
  dokumentencheck: bs_dokumentencheck,
  deutsch: bs_deutsch,
  chatbot: bs_chatbot,
  calculators: bs_calculators,
  cookies: bs_cookies,
  validation: bs_validation,
  status: bs_status,
  premium: bs_premium,
  ads: bs_ads,
  nudimTrazim: bs_nudimTrazim,
};

export const NS_LIST = Object.keys(namespaces);

function getNestedValue(obj: any, path: string): string | undefined {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = current[part];
  }
  if (typeof current === "string") return current;
  return undefined;
}

export function lookup(key: string, opts?: Record<string, unknown>): string {
  const colonIdx = key.indexOf(":");
  if (colonIdx > 0) {
    const ns = key.substring(0, colonIdx);
    const subKey = key.substring(colonIdx + 1);
    const nsObj = namespaces[ns];
    if (nsObj) {
      const val = getNestedValue(nsObj, subKey);
      if (val) return interpolate(val, opts);
    }
  }

  for (const ns of NS_LIST) {
    const val = getNestedValue(namespaces[ns], key);
    if (val) return interpolate(val, opts);
  }

  const dotIdx = key.indexOf(".");
  if (dotIdx > 0) {
    const subKey = key.substring(dotIdx + 1);
    for (const ns of NS_LIST) {
      const val = getNestedValue(namespaces[ns], subKey);
      if (val) return interpolate(val, opts);
    }
  }

  return key;
}

function interpolate(text: string, opts?: Record<string, unknown>): string {
  if (!opts) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    return opts[k] != null ? String(opts[k]) : `{{${k}}}`;
  });
}

export function namespaceLookup(ns: string | string[], key: string, opts?: Record<string, unknown>): string {
  const nsList = Array.isArray(ns) ? ns : [ns];
  for (const n of nsList) {
    const nsObj = namespaces[n];
    if (nsObj) {
      const val = getNestedValue(nsObj, key);
      if (val) return interpolate(val, opts);
    }
  }
  return lookup(key, opts);
}

// Backward-compat default export
const i18nCompat = {
  language: "bhs",
  changeLanguage: (_lang: string) => {},
  t: (key: string, opts?: any) => lookup(key, opts),
};

export default i18nCompat;
