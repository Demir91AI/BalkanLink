#!/usr/bin/env node
/**
 * scripts/i18n-protected-terms.mjs
 *
 * Protected-terms + regex ruleset for HR/SR (and DE) translation refinements.
 *
 * PURPOSE
 * -------
 * When Demir later runs partial AI/manual refinements on src/i18n/locales/{hr,sr}/*.json
 * (or DE), this module guarantees that "sacred" strings — brand names, German
 * legal/bureaucratic nouns, fictional demo people, currency, technical tokens,
 * URL/route fragments, ICU placeholders, HTML tags — are NEVER mutated.
 *
 * USAGE (Node, no deps)
 * ---------------------
 *   import {
 *     PROTECTED_TERMS,
 *     PROTECTED_REGEXES,
 *     verifyTranslation,
 *     verifyFile,
 *     verifyAllLocales,
 *   } from "./scripts/i18n-protected-terms.mjs";
 *
 *   const { ok, violations } = verifyTranslation(originalBs, translatedHr);
 *   if (!ok) { console.error(violations); process.exit(1); }
 *
 * Or as CLI:
 *   node scripts/i18n-protected-terms.mjs                # checks bs vs {hr,sr,de}
 *   node scripts/i18n-protected-terms.mjs hr             # checks bs vs hr only
 *   node scripts/i18n-protected-terms.mjs --strict       # exit 1 on any violation
 *
 * DESIGN NOTES
 * ------------
 * The check is INVARIANT-BASED, not equality-based: for every protected term
 * present in the BS source string, the translated string must contain the
 * SAME term (or its declared per-language equivalent) the SAME number of
 * times. We don't force the surrounding wording — translators stay free to
 * rewrite the rest of the sentence.
 *
 * Per-language equivalents exist where a brand/term has a legitimate spelling
 * variant (e.g. "Impressum" in DE/HR vs "Impresum" in SR — single 's'). The
 * default behaviour is "must appear unchanged in all languages".
 */

// ---------------------------------------------------------------------------
// 1. PROTECTED LITERAL TERMS
// ---------------------------------------------------------------------------
// Each entry: term must appear identically across all languages by default.
// If a term has a per-language allowed spelling, declare it under `variants`.
//
// Categories help future tooling produce nicer reports.
export const PROTECTED_TERMS = [
  // ---- Brand & product names (NEVER translated) ----
  { term: "BalkanLink", category: "brand" },
  { term: "BalkanLink Deutsch", category: "brand" },
  { term: "DeutschTrainer", category: "brand" },
  { term: "Smart Guide", category: "brand" },
  { term: "Smart Guides", category: "brand" },
  { term: "Smart vodič", category: "brand" }, // BS/HR/SR keep this exact form
  { term: "Smart vodiči", category: "brand" },
  { term: "Asistent", category: "brand" },
  { term: "Musterformular", category: "brand" },
  { term: "Musterformulare", category: "brand" },
  { term: "Vorlagen", category: "brand" },
  { term: "Dokumentencheck", category: "brand" },
  { term: "Dokumenten-Check", category: "brand" },
  { term: "Viza Navigator", category: "brand" },
  { term: "Lovable", category: "brand" },
  { term: "RealCore Digital", category: "brand" },

  // ---- German legal / bureaucratic proper nouns (always German) ----
  { term: "Bürgergeld", category: "de-legal" },
  { term: "Kindergeld", category: "de-legal" },
  { term: "Elterngeld", category: "de-legal" },
  { term: "Mutterschaftsgeld", category: "de-legal" },
  { term: "Wohngeld", category: "de-legal" },
  { term: "Pflegegeld", category: "de-legal" },
  { term: "Kinderzuschlag", category: "de-legal" },
  { term: "Krippengeld", category: "de-legal" },
  { term: "Bafög", category: "de-legal" },
  { term: "BAföG", category: "de-legal" },
  { term: "Arbeitslosengeld", category: "de-legal" },
  { term: "Grundsicherung", category: "de-legal" },
  { term: "Anmeldung", category: "de-legal" },
  { term: "Abmeldung", category: "de-legal" },
  { term: "Ummeldung", category: "de-legal" },
  { term: "Aufenthaltstitel", category: "de-legal" },
  { term: "Aufenthaltserlaubnis", category: "de-legal" },
  { term: "Niederlassungserlaubnis", category: "de-legal" },
  { term: "Blaue Karte EU", category: "de-legal" },
  { term: "Blue Card EU", category: "de-legal" },
  { term: "Bescheid", category: "de-legal" },
  { term: "Antrag", category: "de-legal" },
  { term: "Widerspruch", category: "de-legal" },
  { term: "Antragsrücknahme", category: "de-legal" },
  { term: "Steuererklärung", category: "de-legal" },
  { term: "Steuer-ID", category: "de-legal" },
  { term: "Steuer-Identifikationsnummer", category: "de-legal" },
  { term: "Steuerklasse", category: "de-legal" },
  { term: "Lohnsteuer", category: "de-legal" },
  { term: "Pendlerpauschale", category: "de-legal" },
  { term: "Werbungskosten", category: "de-legal" },
  { term: "Krankenkasse", category: "de-legal" },
  { term: "Krankenversicherung", category: "de-legal" },
  { term: "Sozialversicherung", category: "de-legal" },
  { term: "Rentenversicherung", category: "de-legal" },
  { term: "Pflegeversicherung", category: "de-legal" },
  { term: "Arbeitslosenversicherung", category: "de-legal" },
  { term: "Rundfunkbeitrag", category: "de-legal" },
  { term: "Führerschein", category: "de-legal" },
  { term: "Führungszeugnis", category: "de-legal" },
  { term: "Fahrzeugzulassung", category: "de-legal" },
  { term: "Kirchenaustritt", category: "de-legal" },
  { term: "Integrationskurs", category: "de-legal" },
  { term: "Arbeitsbescheinigung", category: "de-legal" },
  { term: "Hauptantrag", category: "de-legal" },
  { term: "Weiterbewilligungsantrag", category: "de-legal" },
  { term: "Anlage", category: "de-legal" },
  { term: "Finanzamt", category: "de-legal" },
  { term: "Familienkasse", category: "de-legal" },
  { term: "Jugendamt", category: "de-legal" },
  { term: "Jobcenter", category: "de-legal" },
  { term: "Bundesagentur für Arbeit", category: "de-legal" },
  { term: "Agentur für Arbeit", category: "de-legal" },
  { term: "Ausländerbehörde", category: "de-legal" },
  { term: "Bürgeramt", category: "de-legal" },
  { term: "Einwohnermeldeamt", category: "de-legal" },
  { term: "Standesamt", category: "de-legal" },
  { term: "Arbeitsagentur", category: "de-legal" },
  { term: "Schufa", category: "de-legal" },
  { term: "IBAN", category: "de-legal" },
  { term: "BIC", category: "de-legal" },
  { term: "Bundesland", category: "de-legal" },
  { term: "Bundesländer", category: "de-legal" },

  // Doppelte Haushaltsführung — DE only spelling, but in BS/HR/SR copy it's
  // referenced with the same German wording.
  { term: "Doppelte Haushaltsführung", category: "de-legal" },

  // ---- Fictional demo people (must stay identical so QA finds them) ----
  { term: "Maja Kovač", category: "demo-person" },
  { term: "Damir Novak", category: "demo-person" },
  { term: "Adis Kovač", category: "demo-person" },

  // ---- Domains / URLs / contact (must remain byte-for-byte) ----
  { term: "balkanlink.de", category: "url" },
  { term: "www.balkanlink.de", category: "url" },
  { term: "kontakt@balkanlink.de", category: "email" },

  // ---- Currency & numeric format examples (don't translate symbols) ----
  { term: "€", category: "currency" },
  { term: "EUR", category: "currency" },
  { term: "9,99€", category: "currency" },
  { term: "9.99€", category: "currency" },
  { term: "14,99€", category: "currency" },
  { term: "2,99€", category: "currency" },
];

// ---------------------------------------------------------------------------
// 2. PER-LANGUAGE VARIANTS
// ---------------------------------------------------------------------------
// Cases where a term has a legitimately different spelling per language. The
// verifier accepts any of the listed forms in the target language. If a term
// is NOT in this map, the BS form must appear verbatim in every language.
export const TERM_VARIANTS = {
  // "Imprint" page name — DE/HR use "Impressum" (double s), SR uses "Impresum"
  // (single s, Cyrillic-derived). BS uses "Impressum" historically.
  Impressum: { bs: ["Impressum"], hr: ["Impressum"], sr: ["Impresum"], de: ["Impressum"] },

  // Europe — HR is "Europa" / "europski", BS+SR "Evropa" / "evropski", DE "Europa".
  Evropa: { bs: ["Evropa"], hr: ["Europa"], sr: ["Evropa"], de: ["Europa"] },
  evropski: { bs: ["evropski"], hr: ["europski"], sr: ["evropski"], de: [/* not used */] },

  // "njemački/Njemačka" — ekavica converts to "nemački/Nemačka" in SR; DE uses
  // its own native form.
  Njemačka: { bs: ["Njemačka"], hr: ["Njemačka"], sr: ["Nemačka"], de: ["Deutschland"] },
  njemački: { bs: ["njemački"], hr: ["njemački"], sr: ["nemački"], de: ["deutsch", "Deutsch"] },

  // Brand "Asistent" → in DE copy it appears as "Assistent" (German spelling).
  Asistent: { bs: ["Asistent"], hr: ["Asistent"], sr: ["Asistent"], de: ["Assistent", "Asistent"] },

  // "Smart vodič / Smart vodiči" — in DE the catalogue label is rendered as
  // "Smart Guide / Smart Guides".
  "Smart vodič": { bs: ["Smart vodič"], hr: ["Smart vodič"], sr: ["Smart vodič"], de: ["Smart Guide", "Smart vodič"] },
  "Smart vodiči": { bs: ["Smart vodiči"], hr: ["Smart vodiči"], sr: ["Smart vodiči"], de: ["Smart Guides", "Smart vodiči"] },

  // "Viza Navigator" → in DE it appears as "Visa Navigator".
  "Viza Navigator": { bs: ["Viza Navigator"], hr: ["Viza Navigator"], sr: ["Viza Navigator"], de: ["Visa Navigator", "Viza Navigator"] },

  // Currency formatting — DE convention uses comma as decimal separator,
  // but some legacy strings may use a dot. Accept both in DE.
  "9,99€": { bs: ["9,99€"], hr: ["9,99€"], sr: ["9,99€"], de: ["9,99€", "9.99€", "9,99 €", "9.99 €"] },
  "9.99€": { bs: ["9.99€", "9,99€"], hr: ["9.99€", "9,99€"], sr: ["9.99€", "9,99€"], de: ["9.99€", "9,99€", "9,99 €", "9.99 €"] },
  "2,99€": { bs: ["2,99€"], hr: ["2,99€"], sr: ["2,99€"], de: ["2,99€", "2.99€", "2,99 €", "2.99 €"] },
  "14,99€": { bs: ["14,99€"], hr: ["14,99€"], sr: ["14,99€"], de: ["14,99€", "14.99€", "14,99 €", "14.99 €"] },

  // "Dokumenten-Check" / "Dokumentencheck" — DE often uses the hyphenated
  // form interchangeably with the closed form.
  "Dokumenten-Check": { bs: ["Dokumenten-Check"], hr: ["Dokumenten-Check"], sr: ["Dokumenten-Check"], de: ["Dokumenten-Check", "Dokumentencheck"] },
  Dokumentencheck: { bs: ["Dokumentencheck"], hr: ["Dokumentencheck"], sr: ["Dokumentencheck"], de: ["Dokumentencheck", "Dokumenten-Check"] },
};

// ---------------------------------------------------------------------------
// 3. PROTECTED REGEX PATTERNS
// ---------------------------------------------------------------------------
// Patterns that must be COUNT-PRESERVED between source and translation.
// (e.g. an ICU placeholder appearing twice in BS must appear twice in HR.)
//
// Each entry: { name, regex (with global flag), category }
export const PROTECTED_REGEXES = [
  // ICU / i18next placeholders: {{name}} or {name}
  { name: "icu-placeholder-double", regex: /\{\{[^{}]+\}\}/g, category: "placeholder" },
  { name: "icu-placeholder-single", regex: /(?<!\{)\{[a-zA-Z_][a-zA-Z0-9_]*\}(?!\})/g, category: "placeholder" },

  // HTML tags (open/close/self-closing). Translation may rewrite text inside,
  // but tag count must match.
  { name: "html-tag", regex: /<\/?[a-zA-Z][^<>]*?>/g, category: "html" },

  // Markdown links — text is translatable, URL is not. We protect the
  // (URL) part by counting occurrences of the URL substring separately.
  { name: "markdown-link-url", regex: /\]\(([^)\s]+)\)/g, category: "markdown" },

  // Bare URLs (http/https/mailto/tel)
  { name: "bare-url", regex: /\b(?:https?:\/\/|mailto:|tel:)[^\s)\]]+/g, category: "url" },

  // Internal route fragments like /formulari/buergergeld, /de/dokumentencheck
  { name: "internal-route", regex: /(?<![A-Za-z0-9])\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)+/g, category: "route" },

  // German § paragraph references e.g. "§ 19 UStG", "§§ 7-9 SGB II"
  { name: "german-paragraph-ref", regex: /§{1,2}\s?\d+[a-z]?(?:\s?(?:Abs\.?|Satz|Nr\.?)\s?\d+)?(?:\s?[A-ZÄÖÜ][A-Za-zÄÖÜäöüß]+){0,3}/g, category: "de-legal" },

  // Pure numbers with units we never reword (€, %, kWh, m², km, h, min, EUR)
  { name: "number-with-unit", regex: /\b\d+(?:[.,]\d+)?\s?(?:€|EUR|%|kWh|m²|km|h|min|kg|g|MB|GB)\b/g, category: "numeric" },

  // Year-like four-digit numbers (don't accidentally rewrite "2026")
  { name: "year", regex: /\b(?:19|20)\d{2}\b/g, category: "numeric" },

  // Stand-references "Stand 2026" must be preserved as-is
  { name: "stand-year", regex: /Stand\s+\d{4}/g, category: "de-legal" },
];

// ---------------------------------------------------------------------------
// 4. VERIFIER
// ---------------------------------------------------------------------------
const SUPPORTED_LANGS = ["bs", "hr", "sr", "de"];

/**
 * Count non-overlapping occurrences of `needle` in `haystack` (case-sensitive).
 */
function countOccurrences(haystack, needle) {
  if (!needle) return 0;
  let count = 0;
  let i = 0;
  while ((i = haystack.indexOf(needle, i)) !== -1) {
    count++;
    i += needle.length;
  }
  return count;
}

function countRegex(str, re) {
  // re is expected to have the global flag.
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  let n = 0;
  // eslint-disable-next-line no-unused-vars
  for (const _ of str.matchAll(r)) n++;
  return n;
}

/**
 * Resolve the accepted forms of a term for a given target language.
 * Returns an array; usually length 1, sometimes more.
 */
function resolveAcceptedForms(term, targetLang) {
  const v = TERM_VARIANTS[term];
  if (!v) return [term];
  return v[targetLang] && v[targetLang].length ? v[targetLang] : [term];
}

/**
 * Verify a single (source, translation) pair for one target language.
 *
 * @param {string} source       - BS source string
 * @param {string} translation  - target-language string
 * @param {"hr"|"sr"|"de"} targetLang
 * @param {string} [keyPath]    - optional dotted key for richer reporting
 * @returns {{ok: boolean, violations: Array<{kind: string, term?: string, name?: string, expected: number, actual: number, key?: string}>}}
 */
export function verifyTranslation(source, translation, targetLang, keyPath) {
  if (typeof source !== "string" || typeof translation !== "string") {
    return { ok: true, violations: [] };
  }
  if (!SUPPORTED_LANGS.includes(targetLang)) {
    throw new Error(`Unsupported targetLang: ${targetLang}`);
  }
  const violations = [];

  // (a) Protected literal terms.
  for (const { term, category } of PROTECTED_TERMS) {
    const expected = countOccurrences(source, term);
    if (expected === 0) continue;
    const acceptedForms = resolveAcceptedForms(term, targetLang);
    const actual = acceptedForms.reduce(
      (acc, form) => acc + countOccurrences(translation, form),
      0,
    );
    if (actual < expected) {
      violations.push({
        kind: "missing-term",
        term,
        category,
        accepted: acceptedForms,
        expected,
        actual,
        key: keyPath,
      });
    }
  }

  // (b) Variant-only mappings (e.g. "Njemačka" → "Nemačka" in SR). These are
  //     enforced separately so SR translations that still contain "Njemačka"
  //     instead of "Nemačka" get flagged.
  for (const [bsForm, perLang] of Object.entries(TERM_VARIANTS)) {
    const expected = countOccurrences(source, bsForm);
    if (expected === 0) continue;
    const acceptedForms = perLang[targetLang] && perLang[targetLang].length ? perLang[targetLang] : [bsForm];
    // If the source contains the BS form, the translation must contain the
    // accepted form for the target language at least as many times. This is
    // already covered above for terms also listed in PROTECTED_TERMS, but
    // TERM_VARIANTS may contain entries not in PROTECTED_TERMS — handle them.
    if (PROTECTED_TERMS.some((t) => t.term === bsForm)) continue;
    const actual = acceptedForms.reduce(
      (acc, form) => acc + countOccurrences(translation, form),
      0,
    );
    if (actual < expected) {
      violations.push({
        kind: "missing-variant",
        term: bsForm,
        accepted: acceptedForms,
        expected,
        actual,
        key: keyPath,
      });
    }
  }

  // (c) Regex count preservation.
  for (const { name, regex, category } of PROTECTED_REGEXES) {
    const expected = countRegex(source, regex);
    if (expected === 0) continue;
    const actual = countRegex(translation, regex);
    if (actual !== expected) {
      violations.push({
        kind: "regex-count-mismatch",
        name,
        category,
        expected,
        actual,
        key: keyPath,
      });
    }
  }

  return { ok: violations.length === 0, violations };
}

// ---------------------------------------------------------------------------
// 5. JSON-FILE WALKER
// ---------------------------------------------------------------------------
function walkLeaves(obj, prefix, fn) {
  if (typeof obj === "string") {
    fn(prefix, obj);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => walkLeaves(item, `${prefix}[${i}]`, fn));
    return;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const next = prefix ? `${prefix}.${k}` : k;
      walkLeaves(v, next, fn);
    }
  }
}

/**
 * Verify one source<->target locale file pair.
 *
 * @param {object} sourceJson  - parsed BS namespace
 * @param {object} targetJson  - parsed target-lang namespace
 * @param {"hr"|"sr"|"de"} targetLang
 * @returns {{ok: boolean, violations: Array<object>}}
 */
export function verifyFile(sourceJson, targetJson, targetLang) {
  const allViolations = [];
  walkLeaves(sourceJson, "", (key, srcStr) => {
    // Resolve same path in target.
    const tgtStr = getByPath(targetJson, key);
    if (typeof tgtStr !== "string") return; // missing keys are a separate concern
    const { violations } = verifyTranslation(srcStr, tgtStr, targetLang, key);
    if (violations.length) allViolations.push(...violations);
  });
  return { ok: allViolations.length === 0, violations: allViolations };
}

function getByPath(obj, path) {
  // Path uses ".key" and "[i]" segments.
  const parts = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

// ---------------------------------------------------------------------------
// 6. CLI
// ---------------------------------------------------------------------------
const isMain =
  typeof process !== "undefined" &&
  process.argv[1] &&
  import.meta.url === `file://${process.argv[1]}`;

if (isMain) {
  const { readFile, readdir } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const args = process.argv.slice(2);
  const strict = args.includes("--strict");
  const langArg = args.find((a) => !a.startsWith("--"));
  const targetLangs = langArg ? [langArg] : ["hr", "sr", "de"];

  const baseDir = "src/i18n/locales";
  const bsDir = join(baseDir, "bs");
  const namespaces = (await readdir(bsDir)).filter((f) => f.endsWith(".json"));

  let totalViolations = 0;
  const summary = [];

  for (const lang of targetLangs) {
    const langDir = join(baseDir, lang);
    let langViolations = 0;
    for (const ns of namespaces) {
      const bsPath = join(bsDir, ns);
      const tgPath = join(langDir, ns);
      let bsJson, tgJson;
      try {
        bsJson = JSON.parse(await readFile(bsPath, "utf8"));
        tgJson = JSON.parse(await readFile(tgPath, "utf8"));
      } catch (e) {
        console.warn(`  ! cannot read ${tgPath}: ${e.message}`);
        continue;
      }
      const { violations } = verifyFile(bsJson, tgJson, lang);
      langViolations += violations.length;
      if (violations.length) {
        console.log(`\n[${lang}/${ns}] ${violations.length} issue(s):`);
        for (const v of violations.slice(0, 25)) {
          console.log(
            `  · ${v.kind} key=${v.key ?? "?"} ` +
              (v.term ? `term="${v.term}" accepted=${JSON.stringify(v.accepted)} ` : "") +
              (v.name ? `pattern=${v.name} ` : "") +
              `expected=${v.expected} actual=${v.actual}`,
          );
        }
        if (violations.length > 25) {
          console.log(`  … and ${violations.length - 25} more`);
        }
      }
    }
    summary.push({ lang, violations: langViolations });
    totalViolations += langViolations;
  }

  console.log("\n=== SUMMARY ===");
  for (const s of summary) {
    console.log(`  ${s.lang.toUpperCase()}: ${s.violations} violation(s)`);
  }
  if (strict && totalViolations > 0) {
    process.exit(1);
  }
}
