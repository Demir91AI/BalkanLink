/**
 * Simplified i18n — BHS (Bosnian) only, no react-i18next.
 * All translations come from src/locales/bs/*.json
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

/**
 * Look up a translation key. Supports:
 * - "key" → search all namespaces
 * - "namespace:key" → search specific namespace
 * - Nested keys with dots: "cta.primary"
 * - Simple interpolation: {{count}}, {{current}}, {{total}}, {{percent}}
 */
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
  // Check for "namespace:key" format
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

  // Direct lookup across all namespaces
  for (const ns of NS_LIST) {
    const val = getNestedValue(namespaces[ns], key);
    if (val) return interpolate(val, opts);
  }

  // Try removing dot prefix: "sidebar.smartGuide" → search for "smartGuide"
  const dotIdx = key.indexOf(".");
  if (dotIdx > 0) {
    const subKey = key.substring(dotIdx + 1);
    for (const ns of NS_LIST) {
      const val = getNestedValue(namespaces[ns], subKey);
      if (val) return interpolate(val, opts);
    }
  }

  return key; // fallback: return key itself
}

function interpolate(text: string, opts?: Record<string, unknown>): string {
  if (!opts) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    return opts[k] != null ? String(opts[k]) : `{{${k}}}`;
  });
}

/** Namespace-scoped lookup helper */
export function namespaceLookup(ns: string | string[], key: string, opts?: Record<string, unknown>): string {
  const nsList = Array.isArray(ns) ? ns : [ns];
  for (const n of nsList) {
    const nsObj = namespaces[n];
    if (nsObj) {
      const val = getNestedValue(nsObj, key);
      if (val) return interpolate(val, opts);
    }
  }
  // Fallback to global lookup
  return lookup(key, opts);
}

// Backward-compat: some code imports `i18n` as default and calls i18n.changeLanguage()
// We make that a no-op since we're BHS-only now
const i18nCompat = {
  language: "bs",
  changeLanguage: (_lang: string) => {},
  t: (key: string, opts?: any) => lookup(key, opts),
};

export default i18nCompat;
