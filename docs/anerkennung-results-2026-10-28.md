# Anerkennung Navigator — results (28.10.2026)

Not published. UI, design, navigation, gates, auth and payments unchanged. No new packages, no paid translation.

## Before → after
| | Before | After |
|---|---|---|
| Occupations | 22 | 39 (22 legacy ids unchanged, same order, +17) |
| Translated in BS/HR/SR/DE | 14 | 31 (8 legacy entries still Bosnian-only) |
| Occupations with a competent body | 14 | 34 (5 still fall back to ZAB) |
| Countries | 6 | 6 (unchanged) |

## Files
- `src/lib/anerkennung-data.ts` — 17 new entries added at the end; 11 text corrections in koch/elektroniker/maurer/kfz_mechatroniker/schweisser.
- `src/lib/anerkennung-bundeslaender.ts` — additive: IHK FOSA contact, HWK map for each Land (taken from the existing craft map), assigned to the new ids plus koch, it_fachkraft, berufskraftfahrer, dachdecker, anlagenmechaniker_shk. Lookup function unchanged.
- `src/i18n/locales/{bs,hr,sr,de}/anerkennung.json` — 17 new `professions.*` entries in each language and the same 11 corrections. Steps/documents have identical lengths in all languages.
- `src/lib/anerkennung-data.test.ts` — new tests.
Sources and corrections: `docs/anerkennung-audit-2026-10-28.md`.

## Tests
- `src/lib/anerkennung-data.test.ts`: 4/4 pass. Checks: legacy ids and order preserved; 39 unique ids and German names; 6 countries; new entries in all 4 languages with the same list lengths; IHK → IHK FOSA and crafts → HWK in all 16 Länder; welding/CNC labelled as activities; no Kenntnisprüfung/Eignungsprüfung/Anabin in craft steps; no salary claim for koch.
- Full `bunx vitest run` (run alone, no browser tests in parallel): 46 files, **1,352/1,352 passed**.
- Build: checked automatically after this change (see the build log).

## Browser click-through — MOCK member, not real login
Local Playwright with a fake signed-in member. All backend answers were simulated by the test script; nothing reached the live system. Path: page → Bosnia and Herzegovina → occupation card → Bayern → result. Checks: first step shown, IHK FOSA or Handwerkskammer shown, no sideways overflow, no page errors.
- BS 1280 and DE 1280/390: all 17 new occupations, 0 failures.
- HR/SR 1280 and BS/HR/SR 390: 4 samples each (Zerspanungsmechaniker, Tischler, Gebäudereiniger, Lagerlogistik), 0 failures.
Screenshots: `/tmp/browser/anr/shots/`.
Real sign-in not tested (not requested).

## Open items
See section 6 of the audit: the 8 legacy entries without translations, the 5 occupations still falling back to ZAB, the regulated health and teaching entries not re-audited, office notes shown in Bosnian only, and IHK/HWK overlap for Bau occupations.
