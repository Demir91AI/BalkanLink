
# Add Hrvatski (HR) + Srpski ekavica (SR) language support

Mirrors the existing /de/* architecture exactly. UI chrome + page meta translated; long-form Smart Guide bodies stay BS and show the existing translation-pending banner on /hr/* and /sr/*.

---

## 1. Extend i18n config — `src/i18n/index.ts`

- Import 8 new JSON files from `locales/hr/` and `locales/sr/`.
- `SUPPORTED_LANGUAGES = ['bs','de','hr','sr']`.
- `fallbackLng: 'bs'` (unchanged).
- `nonExplicitSupportedLngs: false` and `load: 'languageOnly'` keep `sr-Latn`, `hr-HR`, `it-IT`, etc. from auto-resolving — anything outside the 4 codes falls to `bs`.
- Detection order, storage key — unchanged.

## 2. Generalise the path helper — `src/lib/i18n-paths.ts`

Rewrite to handle any language prefix:

```ts
const PREFIX_RE = /^\/(de|hr|sr)(?=\/|$)/;

export function langFromPath(p: string): SupportedLanguage {
  const m = p.match(PREFIX_RE);
  return (m?.[1] as SupportedLanguage) ?? 'bs';
}
export function stripLangPrefix(p: string): string {
  return p.replace(PREFIX_RE, '') || '/';
}
export function mirrorPath(p: string, target: SupportedLanguage): string {
  const bs = stripLangPrefix(p);
  if (target === 'bs') return bs;
  return bs === '/' ? `/${target}` : `/${target}${bs}`;
}
// Keep stripGermanPrefix as an alias of stripLangPrefix for back-compat.
```

## 3. Add the two prefixed route mounts — `src/App.tsx`

In `AppRoutes`, add two extra `<Route path="/hr/*" element={<LocalizedRoutes />} />` and `<Route path="/sr/*" element={<LocalizedRoutes />} />` next to the existing `/de/*` and `/*`. `<LocalizedRoutes>` itself stays unchanged — it's relative-pathed and works under any prefix.

## 4. Update `LanguageRouter` — `src/components/LanguageRouter.tsx`

Already calls `langFromPath(pathname)`. After step 2's helper update it auto-detects `bs/de/hr/sr`. No further changes needed beyond confirming that.

## 5. Create 8 new locale JSON files

Mirror the existing structure 1-for-1 (same keys, same nesting). Apply lexical rules from the prompt to derive each value from the BS source.

```
src/i18n/locales/hr/common.json   ← bs/common.json + HR rules
src/i18n/locales/hr/forms.json    ← bs/forms.json  + HR rules
src/i18n/locales/hr/pages.json    ← bs/pages.json  + HR rules
src/i18n/locales/hr/errors.json   ← bs/errors.json + HR rules
src/i18n/locales/sr/common.json   ← bs/common.json (ijekavica→ekavica + SR lexical)
src/i18n/locales/sr/forms.json    ← bs/forms.json  (same)
src/i18n/locales/sr/pages.json    ← bs/pages.json  (same)
src/i18n/locales/sr/errors.json   ← bs/errors.json (same)
```

Brand names (BalkanLink, DeutschTrainer, Smart Guides) and German legal nouns (Anmeldung, Bürgergeld, Finanzamt, …) stay verbatim. Tone stays informal "ti" for both new languages.

Add a new `pages.translationBanner` key in HR + SR (and in BS + DE if missing — currently the banner already reads `pages:translationBanner.title|message`, so confirm/extend in all 4 files):

- HR: title `Prijevod u tijeku`, message `Ovaj se sadržaj trenutno prevodi. Zasad dostupan samo na bosanskom.`
- SR: title `Prevod u toku`, message `Ovaj sadržaj se trenutno prevodi. Za sada dostupan samo na bosanskom.`

(`porezi` namespace doesn't exist — skip; if it gets added later it'll mirror the same pattern.)

## 6. Add 2 new flag SVG components

```
src/components/flags/FlagHR.tsx   — red/white/red horizontal stripes, simplified šahovnica/coat shown as a tiny crest centered (or simplified red-white-red only — simpler version preferred at 20px). Inline SVG, 2px border-radius, 1px gray border.
src/components/flags/FlagRS.tsx   — civil flag: red / blue / white horizontal stripes (no coat of arms — too noisy at 20px).
```

`FlagBA.tsx` and `FlagDE.tsx` exist — leave alone.

**Note re. memory `style/flag-usage-standard`:** that note already documents that BS got a flag in apr 2026. Update it to add HR + RS entries (memory write).

## 7. Extend the LanguageSwitcher — `src/components/LanguageSwitcher.tsx`

```ts
const LANGUAGES = [
  { code: 'bs', nativeName: 'Bosanski', Flag: FlagBA },
  { code: 'hr', nativeName: 'Hrvatski', Flag: FlagHR },
  { code: 'sr', nativeName: 'Srpski',   Flag: FlagRS },
  { code: 'de', nativeName: 'Deutsch',  Flag: FlagDE },
];
```

Existing `mirrorPath()` becomes 4-language-aware via step 2 — no other switcher changes needed.

## 8. Extend `<SEO />` — `src/components/SEO.tsx`

- Add HR + DE+HR+SR `DEFAULTS` entries (translated title/desc).
- Compute `lang` as one of `bs|de|hr|sr` from `i18n.language`.
- Build `bsHref`, `deHref`, `hrHref`, `srHref`; emit 4 `<link rel="alternate" hreflang="…">` + `x-default → bsHref`.
- og:locale map: `bs→bs_BA`, `de→de_DE`, `hr→hr_HR`, `sr→sr_RS`. Replace `og:locale:alternate` with one tag per other language.
- `<html lang>` driven by Helmet uses the same code.

Replace the hard-coded `stripGermanPrefix` calls with `stripLangPrefix`.

## 9. Extend `TranslationPendingBanner` — `src/components/TranslationPendingBanner.tsx`

- Trigger when `i18n.language` is `de`, `hr`, or `sr` AND pathname starts with the matching prefix.
- Allow-list expanded to a per-language map: e.g. `TRANSLATED_PATHS = { de: Set<string>, hr: Set<string>, sr: Set<string> }`. For HR + SR, include the same six landing pages (root, dokumentencheck, deutsch-trainer, viza, nudim-trazim, login family) prefixed with `/hr` / `/sr`.
- Banner copy already comes from `t('pages:translationBanner.title|message')` which now resolves per language.

## 10. Extend `public/sitemap.xml`

Programmatic regeneration: every canonical BS URL (currently 23 entries) gets 4 `<url>` entries (one per language) and each `<url>` lists 4 `<xhtml:link rel="alternate">` + `x-default→bs`. New total: ~92 `<url>` entries (vs current ~30).

The sitemap is a static file, so I'll write it out hand-shaped from a small generation script run during the implementation step (kept inline / committed result only — no runtime generator).

## 11. Verification grep (read-only audit, reported in delivery)

Run `rg` for leftover hard-coded BS strings in `src/` (excluding `i18n/locales/`): patterns `Pokreni|Provjeri|Saznaj|Pogledaj|Početna|Naši servisi|njemački|Bez stresa|vodič\b`. Any hits get either translated via existing `t()` keys or new keys added to all 4 JSONs.

## 12. Constraints honoured

- **No changes** to `ttsConfig.ts`, audio system, long-form Smart Guide bodies, color tokens, layout, brand names, German legal nouns, demo data names, existing `/de/*` translations, existing root BS routes.
- BS remains the default; unsupported browser locales fall to BS (verified by `nonExplicitSupportedLngs: false` + `load: 'languageOnly'` + explicit `fallbackLng: 'bs'`).

---

## Deliverable on completion

1. **Files created (10):** `hr/{common,forms,pages,errors}.json`, `sr/{common,forms,pages,errors}.json`, `FlagHR.tsx`, `FlagRS.tsx`.
2. **Files modified (7):** `i18n/index.ts`, `lib/i18n-paths.ts`, `App.tsx`, `LanguageSwitcher.tsx`, `SEO.tsx`, `TranslationPendingBanner.tsx`, `public/sitemap.xml` (+ `bs/pages.json`, `de/pages.json` if `translationBanner` key needs adding).
3. Route count parity: BS root routes ≈ /de mirror ≈ /hr mirror ≈ /sr mirror (all share the single `<LocalizedRoutes>` tree).
4. Hard-coded BS leftovers report (file:line list).
5. Sitemap URL count after regeneration.
6. 10-step manual test plan as specified in the prompt.

Memory writes after success: update `mem://style/flag-usage-standard` with HR + RS flags + 4-language switcher; add `mem://architecture/language-policy` entry noting the move from 2 → 4 active UI languages with bodies still BS for HR/SR/DE deep pages.
