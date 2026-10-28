# Grundsicherung Phase 3A — results (28.10.2026)

## Implemented scope
HA-only deterministic memory-only Navigator (nine questions with uncertainty), three companions via existing ProcedureCompanion, localized displayed category and HA heading. IDs/slugs/aliases unchanged; Grundsicherung im Alter untouched. 67 ordered groups: HA 36 groups covering fields 1–85, WBA 18 covering 1–30, KDU 13 covering 1–40; unnumbered headers/evidence/signature notices included. Current 10/2026 BA PDFs linked, never hosted/filled/generated. Paper references do not claim online portal order.

Navigator differentiates initial/renewal, partner without gender assumption, child age bands, rented/owned/no-cost housing, employed/self-employed, assets and special needs. Uncertainty never becomes definitive yes/no. VM remains named for HA H/WBA F even for no-assets answers; HA EK is per person, not only employment. Renewal work/housing use WBA fields instead of automatically imposing EK/KDU. Other relations/special annexes explicitly require Jobcenter clarification. All results are orientation, not legal determination.

Old HA/WBA/KDU rendering is replaced, not deleted: it contained wrong section numbering, retroactivity/dates and 2024 Berlin amounts. Useful preparation/evidence concepts retained in current source-backed content. No other companions, Kindergeld locale subtrees, arrival/family data, trial/access/payment/auth code or flags modified.

## Exact changed/new files
- src/lib/guide-first/grundsicherung-model.ts
- src/components/guide-first/GrundsicherungNavigator.tsx
- src/components/guide-first/ProcedureCompanion.tsx (slug/namespace extension only)
- src/pages/FormCenter.tsx (three allowlisted guide branch + localized title)
- src/components/formCenter/FormCatalogVault.tsx (only category heading localization)
- src/lib/guide-first/official-sources.ts (three source entries)
- src/i18n/locales/{bs,hr,sr,de}/pages.json (new grundsicherungCompanions subtree only)
- src/lib/guide-first/grundsicherung-companion.test.tsx
- src/lib/guide-first/{guide-first,phase5-guides,formcenter-catalog}.test.tsx (source count/renamed category expectations; no baselines changed)
- docs/grundsicherung-phase3a-{inventory,results}.md
- docs/grundsicherung-phase3a-field-inventory.json
- AGENTS.md, roadmap.md

## QA
Full suite: 37 files, 1,117 tests passed. New focused suite: 23 tests (deterministic branches, uncertainty, editions/URLs, full field-index coverage, locale exact-label parity, twelve companion render/jump/review flows, no data intake). Existing 46-service catalog unchanged (user estimate 42 differs from actual catalog); all legacy route, Kindergeld/family/arrival and payment regressions passed. Source-version update reduces unverified-guide expectation from 36 to 33; verified list adds only these three.

Automatic preview build OK (11:00:12 UTC). 24 route fixtures: three routes × four locales × 390/1280 desktop/mobile; correct 36/18/13 jump options, one Navigator only on HA, reviewed-and-next clicked, no horizontal overflow or runtime errors. Screenshots/results: /tmp/browser/gs/. Visual review found and corrected German reference label and document-location help. Existing cookie notices remain and may cover part of a screenshot; no unrelated cookie changes.

## Honest limits / next batch
- Actual authenticated-member page check unavailable: owner session mint failed because no app account matches the owner; no account selected, created or modified. Browser layout used a browser-only access fixture with service workers blocked. It verifies content/navigation, not real authorization. Real unchanged access covered by existing regression tests.
- Online BA authenticated portal ordering not verified; no claim of matching online field numbers.
- Field labels/indices/options verified against extracted current PDFs; explanations are original and multilingual, not a certified legal translation. Human language/legal review still recommended before release.
- EK, VM, KI, WEP and specialist deep mapping deliberately deferred; existing entries/guides untouched.
- PDFs are link-only; no assumed redistribution licence. Temporary originals confined to /tmp/gs.
- No publishing, deployment, backend mutation or payment activation.

Skills used: PDF extraction; AI Gateway for locale translations. No PDF artifact generated.
