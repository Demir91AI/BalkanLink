/**
 * Dev-only sanity check for the `legal` i18n namespace.
 *
 * Verifies that:
 *  - all expected top-level keys exist for every supported language
 *  - each entry has `title`, `subtitle`, and `sections` (array)
 *  - each section has both `heading` and `html`
 *  - the `cookies` entry has all required flat keys
 *
 * Logs warnings to the console in development. Does NOT throw, so a
 * mistyped or missing key never crashes the page — `LegalPage` will
 * fall back to the default language at render time.
 */
import { SUPPORTED_LANGUAGES } from "@/i18n";

import bsLegal from "@/i18n/locales/bs/legal.json";
import deLegal from "@/i18n/locales/de/legal.json";
import hrLegal from "@/i18n/locales/hr/legal.json";
import srLegal from "@/i18n/locales/sr/legal.json";

type LegalDict = Record<string, any>;

const DICTS: Record<string, LegalDict> = {
  bs: bsLegal as LegalDict,
  de: deLegal as LegalDict,
  hr: hrLegal as LegalDict,
  sr: srLegal as LegalDict,
};

const SECTION_KEYS = [
  "impressum",
  "datenschutz",
  "agb",
  "disclaimer",
  "asistent",
  "dsa",
] as const;

const COOKIE_FLAT_KEYS = [
  "title",
  "subtitle",
  "whatAreCookies",
  "whatAreCookiesText",
  "legalBasisShort",
  "categoriesTitle",
  "necessary",
  "alwaysActive",
  "necessaryDesc",
  "necessaryItems",
  "necessaryLegal",
  "analytics",
  "analyticsDesc",
  "statusOn",
  "statusOff",
  "analyticsLegal",
  "marketing",
  "notInUse",
  "marketingDesc",
  "deleteTitle",
  "deleteItems",
  "deleteWarn",
  "version",
  "save",
  "saved",
] as const;

export interface LegalValidationIssue {
  lang: string;
  path: string;
  problem: string;
}

export function validateLegalNamespace(): LegalValidationIssue[] {
  const issues: LegalValidationIssue[] = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    const dict = DICTS[lang];
    if (!dict) {
      issues.push({ lang, path: "", problem: "missing legal.json" });
      continue;
    }

    // Section-style entries
    for (const key of SECTION_KEYS) {
      const entry = dict[key];
      if (!entry || typeof entry !== "object") {
        issues.push({ lang, path: key, problem: "missing entry" });
        continue;
      }
      if (typeof entry.title !== "string" || !entry.title.trim()) {
        issues.push({ lang, path: `${key}.title`, problem: "missing/empty" });
      }
      if (typeof entry.subtitle !== "string") {
        issues.push({ lang, path: `${key}.subtitle`, problem: "missing/wrong type" });
      }
      if (!Array.isArray(entry.sections)) {
        issues.push({ lang, path: `${key}.sections`, problem: "not an array" });
        continue;
      }
      entry.sections.forEach((s: any, i: number) => {
        if (!s || typeof s !== "object") {
          issues.push({ lang, path: `${key}.sections[${i}]`, problem: "not an object" });
          return;
        }
        if (typeof s.heading !== "string" || !s.heading.trim()) {
          issues.push({
            lang,
            path: `${key}.sections[${i}].heading`,
            problem: "missing/empty",
          });
        }
        if (typeof s.html !== "string" || !s.html.trim()) {
          issues.push({
            lang,
            path: `${key}.sections[${i}].html`,
            problem: "missing/empty",
          });
        }
      });
    }

    // Cookies (flat keys)
    const cookies = dict.cookies;
    if (!cookies || typeof cookies !== "object") {
      issues.push({ lang, path: "cookies", problem: "missing entry" });
    } else {
      for (const ck of COOKIE_FLAT_KEYS) {
        const v = cookies[ck];
        if (v === undefined || v === null || v === "") {
          issues.push({ lang, path: `cookies.${ck}`, problem: "missing/empty" });
        }
      }
      if (!Array.isArray(cookies.necessaryItems)) {
        issues.push({ lang, path: "cookies.necessaryItems", problem: "not an array" });
      }
      if (!Array.isArray(cookies.deleteItems)) {
        issues.push({ lang, path: "cookies.deleteItems", problem: "not an array" });
      }
    }
  }

  return issues;
}

/** Run validation in dev only and log a compact report */
export function runLegalValidationInDev(): void {
  if (!import.meta.env.DEV) return;
  const issues = validateLegalNamespace();
  if (issues.length === 0) {
    // eslint-disable-next-line no-console
    console.info(
      "[legal-i18n] ✓ all 4 languages contain every expected legal namespace key",
    );
    return;
  }
  // eslint-disable-next-line no-console
  console.warn(
    `[legal-i18n] ${issues.length} issue(s) found in legal translations:`,
    issues,
  );
}
