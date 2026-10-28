# Viza Navigator — regression fix (28.10.2026)

Scope: only the two regressions from `docs/viza-auth-qa-2026-10-28.md`. No UI/design/structure, cookie banner, auth, subscription or payment change. No new packages, no paid translation, nothing published.

**Correction to the QA report:** the Navigator has **31** routes (hr 1, si 1, ba 6, rs 6, me 4, mk 4, al 4, xk 5), not 32. Now pinned by a test.

## Fix 1 — stable route ids
Files: `src/data/viza-i18n/{de,hr,sr}.ts` (BS uses the base file, which was already correct).
Restored the `routes.N.id` entries in the overlays to the base ids; display titles stay translated.
- DE: mk `Familie`→`family`, mk `Ausbildung`→`ausbildung`, al `Ausbildung`→`ausbildung`, xk `Arbeit`→`work`, xk `Familie`→`family`, xk `Ausbildung`→`ausbildung`
- HR: mk `permanentna`→`permanent`, xk `Ausbildung`→`ausbildung`
- SR: al `Ausbildung`→`ausbildung`, xk `Ausbildung`→`ausbildung`
Result: 10/10 fixed; mismatching ids in all languages: 0.

## Fix 2 — 25 overwritten list items per language restored
Files: `src/data/vizaNavigatorContent.ts` (BS base; Serbia country text in ekavian like the original), `src/data/viza-i18n/{de,hr,sr}.ts`.
Method: compared each repeated item with the pre-accuracy git version (`ec0c13bf~1`). In each case the 28.10 edit had copied a sibling's text over a distinct item. Each slot now has its original topic back. Where the original wording was absolute or unverified, it is replaced with a cautious version. Order and list lengths are unchanged. Same paths in all four languages.

| Paths (country.route.list.index) | Original topic | Restored as |
|---|---|---|
| ba work costs.3; ba/rs ausbildung costs.3; me/mk/al ausbildung costs.3 (6) | "Ausländerbehörde 4–8 weeks" | No fixed legal processing time; book early; Fiktionsbescheinigung if the title runs out (§81 AufenthG) |
| ba bluecard steps.6 | Apply for Blue Card at Ausländerbehörde, contract + 3 months, max. 4 years | Same, without the "never BA consent" absolute (BA consent rules stay in steps.2) |
| ba/rs family documents.4 | Children's birth certificates with Apostille | Children's birth certificates; Apostille/legalisation depends on document and embassy |
| ba permanent steps.2 | B1 German via integration course or exam | B1 proof (e.g. DTZ/Zertifikat Deutsch, Integrationskurs); special routes differ |
| ba permanent errors.2; rs/me/mk/al/xk permanent errors (6) | "No B1" | Missing proof of required German level (usually B1 for §9) |
| ba permanent errors.3 | >6 months abroad "interrupts" 5 years | >6 months abroad can end the title (§51 AufenthG) unless the authority set a longer period |
| ba/rs ausbildung errors.2 | TELC taken in BiH/Serbia not accepted (unverified) | Check accepted certificates/test centres on the embassy page |
| me/al ausbildung steps.7 | Title at ABH, 1 year, €100–110 | eAT fee per current AufenthV; confirm amount/validity locally |
| xk work steps.3; xk family steps.3 | VisaMetric fee €30 + €30 delivery (unverified) | Service fee separate from the €75 visa fee; check current amount |
| xk work steps.4 | Submit at VisaMetric Pristina, 15 working days | Submit in person at the centre named by the embassy; only the embassy decides (no fixed time) |
| xk ausbildung steps.4 | Apply in person, DHL envelope, €75 | Apply in person per embassy instructions; €75 national visa fee; check delivery costs |

Repeated items within a list: before fix 25 per language (BS/HR/SR/DE) → after 0.
2026 figures (Blue Card €50,700/€45,934.20, student €11,904, 27/A1–21/B1, Westbalkan 50,000 BA approvals, Sarajevo 12-month family passport) unchanged; their existing tests pass.

## Tests
- `src/data/viza-accuracy.test.ts`: added "route ids identical to base in every language" (also pins 31 routes) and "no repeated item in steps/documents/costs/errors in any language". File: 23/23 pass.
- Full `bunx vitest run`: 1,344/1,347; the 3 failures were 5-second timeouts in letter-reply sidebar and Kindergeld tests, caused by the browser tests running at the same time. Run alone, those two files passed 37/37. Build: `build OK` (17:09:31Z).

## Browser click-through — MOCK member, not real login
Playwright on localhost with a fake signed-in member. All backend answers came from the test script and nothing reached the live system (method as in the QA report). For each of BS/HR/SR/DE at 390 and 1280: start at `/viza`, click every country, click every route card, check that the URL has the right `route=` and the heading matches, then browser Back returns to the country.
Result: 8 runs × 31 routes, 0 failures, no page errors. Croatia/Slovenia have one route, which shows directly on the country page on phone; this is existing behaviour.
Screenshots: `/tmp/browser/vizafix/shots/{bs,hr,sr,de}_{390,1280}_{mk,xk}_work.png`.

## Not tested
Real sign-in and real member accounts (no test account available; see QA report), native-speaker review of the new lines, Kosovo VisaMetric fee amounts (deliberately not stated).
