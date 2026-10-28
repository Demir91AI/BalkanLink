# Grundsicherung Phase 3B — results (28.10.2026; no release)

## Scope delivered
Only Anlage EK, VM, KI, WEP deeply remapped on existing routes using unchanged ProcedureCompanion/SmartGuide. 148 ordered field/notice groups: EK 25, VM 27, KI 39, WEP 57. All 205 numbered fields (41/35/54/75) and 217 printed options (50/32/49/86) covered, including continued EK income list and WEP relation jump-to-signature. Tables folded into corresponding questions; important unnumbered scope/evidence/privacy notices retained. All four locales BS/HR/SR/DE.

Original current BA PDFs linked in a new tab; four versions actually fetched are 10/2026, not assumed from Phase3A. Old URL hints were not used. See inventory for exact URLs/page counts/hash prefixes. No PDF hosting, modification, generation, inputs, persistence or submission. The user fills/signs/submits separately. Source explanations do not guarantee benefits or claim to mirror the online portal.

Phase3A HA/WBA/KDU locale data, entire existing Navigator code and shared ProcedureCompanion source proven unchanged by temporary baseline comparisons. All prior locale JSON content outside four appended guide objects stays equal. Navigator already linked all four destinations, so no links/logic edits needed. Existing model extended additively; its existing recommendations unchanged. Catalog still 46, all routes/legacy redirects preserved. Kindergeld/family/arrival untouched. Existing obsolete annex component files retained, no longer mounted for these four slugs via the existing allowlisted branch; no duplicate guide rendering.

## Exact files changed/added
- src/lib/guide-first/grundsicherung-model.ts — four slugs and per-PDF edition/page/hash metadata appended only
- src/lib/guide-first/official-sources.ts — four verified primary PDF entries + BA instructions / jobcenter.digital
- src/i18n/locales/{bs,hr,sr,de}/pages.json — four new grundsicherungCompanions.guides objects only
- src/lib/guide-first/grundsicherung-phase3b.test.tsx — new exact map/options/render tests
- src/lib/guide-first/guide-first.test.tsx — verified source list adds four
- src/lib/guide-first/phase5-guides.test.tsx — unverified source count 33→29
- docs/grundsicherung-phase3b-inventory.md
- docs/grundsicherung-phase3b-field-inventory.json
- docs/grundsicherung-phase3b-results.md
- AGENTS.md — merged per-form source rule
- roadmap.md

No FormCenter, catalog, shared companion UI, Navigator, auth/trial/Stripe/payment/access/legal/backend changes.

## QA
Full final bunx vitest run: 38 files, 1145 tests passed. New Phase3B suite 11 tests: exact editions/pages/URL/hash, all 205 field indices exactly once, all four locale ID/reference/option parity, explicit full EK list / KI four gender options / WEP seven marital statuses, all printed options read in DOM at correct jump group across all locales, reviewed-and-next operational, no applicant inputs. Existing Phase3A suite automatically extends render parity: 39 tests, existing 3A expectations retained. Existing Kindergeld/family/arrival/catalog/legacy/payment regressions pass.

Pre-change full run had one unrelated sidebar BS test timeout (5 seconds); no code change there. Final two full runs pass. Build harness latest entry: build OK. No manual build/typecheck invoked.

Browser: 32 fixtures (4 routes ×4 locales ×390/1280 width), correct 25/27/39/57 jump options, reviewed-and-next clicked, zero horizontal overflow/runtime errors, zero duplicate Navigator mounts. Screenshots and result log in /tmp/browser/gs3b. Visual inspection: strong dark surfaces, wrapped options/cards, functional reviewed marker and next step; corrected a relationship translation and signature wording after review. Existing install popup initially intercepted an unrelated dismiss attempt; no app code changed, test stopped interacting with it. Cookie/PWA bars may appear in screenshots; this is existing behavior.

## Limits and provenance
Browser uses test-only access module interception with service workers blocked, as requested. Actual member authorization remains unverified; no accounts/session/gates modified. Existing access regressions pass. Online authenticated BA portal field order remains unverified and is explicitly not claimed. Multilingual explanations are original assistance, not certified translations/legal advice; human editorial review recommended before owner release. No raw applicant data used or sent to any agent. Public source text only; temporary PDF originals are unencrypted AcroForms, not XFA. Permission for hosting assumed nowhere; links only, original short field labels attributed to BA. AI Gateway used for explanatory/translation preparation; PDF skill used for extraction, no PDF artifact created.

Remaining specialist annexes stay at their existing depth; not part of Phase3B. No publish or deploy.
