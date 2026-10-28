# Viza accuracy results — 28 October 2026

## Delivery
Content-only corrections; no publication/deployment, UI/component/layout/route/gate/auth/account/database/Stripe changes. All eight country records, 31 routes, array counts/order and existing data keys retained. Four-language changes delivered without paid translation gateway or dependencies.

## Exact files
- `src/data/vizaNavigatorContent.ts`: 400 string-path corrections, includes jurisdiction, thresholds, conditions and verified URLs.
- `src/data/visaNavigatorData.ts`: static route documents/legal basis aligned.
- `src/data/viza-i18n/de.ts`, `hr.ts`, `sr.ts`: 388 existing overlay text entries changed per locale; paths/order preserved. Existing format compacted; no positional entries added or removed.
- `src/i18n/locales/bs/pages.json`, `hr/pages.json`, `sr/pages.json`, `de/pages.json`: 26 existing wbPanel strings changed each; rest of each file deep-equal to baseline.
- `src/data/viza-accuracy.test.ts`: 21 concrete amount/period/legal-basis/structure tests.
- `src/data/viza-accuracy-shape.json`: pre-edit base shape (keys, array shape and boolean flags), no user content.
- `docs/viza-accuracy-audit-2026-10-28.md`: citations, mission-specific exceptions, exact before/after base and panel records and static-route diff.
- This results document and `roadmap.md`.

## QA actually performed
- Full `bunx vitest run --maxWorkers=2`: **1345/1345**, **45/45 files**, 109.68 seconds. No failing tests; legacy warnings only.
- Focused repeat: **21/21**, 3.48 seconds.
- Automatic build telemetry after final content/test edits: **build OK**, latest relevant entry 28 October 2026 15:49:32Z. No manually invoked build or typecheck.
- Source-vs-output deep comparison confirms base structure retained; all overlay paths/order retained; all locale JSON changes confined to wbPanel.
- Chromium public `/viza`: opens as Visa Navigator, Bosnia selection opens correct route cards and corrected §19c basis/appointment caveat. Screenshots visually checked; no runtime errors. No access override/session injected.
- Browser module-load check in BS/HR/SR/DE confirms both 2026 Blue Card thresholds, student €11,904/€992 and D-visa permission caveat. This is content load evidence, **not** signed-in rendering of all country/route screens. An attempted exact panel text lookup returned zero because no work route was selected; no visible full-panel claim made.

## Limits and follow-up
- Individual missions have category-specific and sometimes older/inconsistent figures; Ausbildung Podgorica surfaced €990 while current federal 2026 guidance is €1,048 gross/€822 net. Content directs clarification; do not silently use stale mission amount.
- Full authenticated portal/appointment screens, every mission checklist, all cost schedules and every TELC/Apostille scenario not verified. Unsupported absolute claims were softened, not replaced with invented rules.
- Existing localized overlay IDs (e.g. German Arbeit/Familie, Croatian permanentna) predate this task and remain unchanged to preserve the requested data contract; tests use positional base paths where necessary. Existing sample metadata/source-label fallback also preserved; not certification of an official form mapping.
- Native human proofreading has not been performed. HR/SR were translated directly with dialect adjustments; no external translation service used.
- No blanket immigration-law accuracy guarantee or eligibility determination. All figures concern the cited 2026 routes; check current official category instructions before applying/paying.
