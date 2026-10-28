## Education batch resumed (28.10.2026; no release)
- [x] Reuse saved inventory and BS draft; direct four-locale translation without gateway, downloads or packages.
- [x] Wire only bafoeg, schueler-bafoeg, integrationskurs into the existing companion; retain Anerkennung Navigator.
- [x] 16 focused tests, 1200 full tests (41 files), 24 test-access browser fixtures and preview build OK; actual results and source/member-QA limitations in docs/education-guide-results.md.

## Grundsicherung Phase 3B (28.10.2026; no release)
- [x] Audit four routes and verify all live-index PDF editions/pages/hashes before mapping.
- [x] Four companions, 148 groups/205 fields/217 options across four locales; Phase3A untouched.
- [x] 1145 tests (38 files), 32 test-access browser fixtures and build OK; exact results/limits in docs/grundsicherung-phase3b-results.md.

## Grundsicherung Phase 3A (28.10.2026; no release)
- [x] Pre-change inventory and current BA 10/2026 HA/WBA/KDU verification.
- [x] Memory-only navigator and 67 field groups covering 85 HA, 30 WBA, 40 KDU numbered fields; all four locales.
- [x] 1117 full tests and 24 browser-only test-access route fixtures passed; automatic build OK.
- [x] Results, exact files and authorized-session / online-portal limits recorded in docs/grundsicherung-phase3a-results.md.


## Arrival companion Phase 1 of 7 (2026-10-27; no release)
- [x] Inventory existing four routes/content before implementation; verify four requested primary sources and supplementary BMG/FeV/Bremen/BMV/BOP sources.
- [x] Add portable read-only companion for anmeldung, steuer-id, fuehrerschein, fahrzeugzulassung in BS/HR/SR/DE: 23 steps, 34 vocabulary groups; retain free access and Kindergeld behavior.
- [x] 1061 tests (35 files), automatic build OK, 32 actual public desktop/mobile route fixtures, focus/review/completion and 9.5:1 minimum body contrast. Exact scope/source gaps in `docs/arrival-phase1-results.md`. No publication.

## Kindergeld consolidated final quality pass (2026-10-27; no release)
- [x] Map original newborn-relevant KG1/Anlage Kind lines and choices to unchanged 30 groups; pre-implementation inventory contains 174 inline definitions/choices.
- [x] Add inline localized subfields/options and contextual uncertainty help; preserve seven steps, navigation and access.
- [x] 1025 full tests passed, 32 final focused tests passed, automatic build OK and 8 desktop/mobile language fixtures passed; evidence/gaps in `docs/kindergeld-final-quality-pass.md`. No publication. Authorized-account and authenticated BA portal-order verification remain existing blockers below.

## Kindergeld SmartGuide 2.0 pilot (2026-10-27, owner approved; no release)
- [x] Verify BA/BZSt primary sources and original form ordering; preserve 20 records with 30 detailed ordered groups and original outbound PDF links.
- [x] Implement integrated online/paper walkthrough, contextual no-data cases/help/glossary and Kindergeld-only reviewed-and-advance/completion behavior.
- [x] 1020 tests, automatic build OK, 8 four-language desktop/mobile visual fixtures, keyboard checks and unchanged Kinderzuschlag behavior; report in `docs/kindergeld-smartguide-pilot-2026-10-27.md`. No publishing.
- [ ] Actual entitled-account browser QA: blocked on authorized owner app session (no matching owner account); no account/gate changes.
- [ ] Exact BA online field/category order: blocked on verified authenticated portal evidence; assistance topics explicitly marked not a portal copy.

## Owner SmartGuide correction (2026-10-27, Preview/code only)
- [x] Make newborn Kindergeld primary and always visible; preserve online/paper details, 20 records and special cases.
- [x] Improve semantic shared panels and Kindergeld/Kinderzuschlag/Steuer-ID content (3/46 FormCenter services; 43 full content reviews pending).
- [x] Verify 24 actual-route visual fixtures (4 locales × 2 widths × 3 routes), 1018 tests and automatic build; document authenticated and JS-browser runner limitations. No publication/deployment.

## Reusable SmartGuide standard (2026-10-27, Preview/code only)
- [x] Record full route/category inventory and content parity gaps before guide changes (200 paths, 46 services).
- [x] Build reusable navigation/progress/source standard and prioritized presentation migration; retain branches/content/gates.
- [x] Test navigation/privacy/locales/regressions: 1008 passed, automatic build OK; 16 isolated Kindergeld light/dark checks; real public routes preserve prompts. See coverage report.
- [ ] Authenticated guide E2E: blocked by no matching owner app account; no account selected or auth changed.
- [ ] Complete bespoke Visa/Anerkennung/citizenship and remaining procedure content standard: blocked on procedure-specific official source/edition verification and jurisdiction review; no generic content substituted.

## Confirmed Stripe catalog synchronization (2026-10-27, code only)
- [x] Audit and remove obsolete new-customer offers; preserve legacy subscriptions and webhook handling.
- [x] Keep annual checkout unavailable and one-time plus retired; 998 tests and automatic preview build passed; public browser QA in four locales at phone/desktop sizes.
- [x] Record exact revision, edits and blockers in `docs/stripe-catalog-sync-2026-10-27.md`; no Stripe mutations, deployment or publication.

## Kindergeld UX simplification (Preview only)
- [x] Simplify online/paper presentation; retain all 20 accurate explanations and four languages.
- [x] Run focused/full tests and mobile visual QA; authenticated host QA remains unavailable (no matching owner account). No publish/deploy.

## Monetization relaunch
- [x] Preserve 2 monthly subscribers (kontakt@balkanlink.de, huber.tarik@gmail.com): verify in Stripe (read-only), no account edits
- [x] Legacy monthly subscribers keep their Document Check daily free quota (server-side)
- [x] Clean all price surfaces: home cards, /paketi, /pricing, DeutschTrainer level sales, Document Check card; remove monthly/yearly switch, trial, dates, Amazon voucher promo, per-level purchase cards, cancellation copy
- [x] Verify (paid checkout not tested: no test login) (build, browser, Stripe), then publish
- [x] Webhook (user must confirm event enabled in Stripe): handle invoice.payment_succeeded for legacy renewals (user must also enable the event in Stripe)

## Development-only catalog/navigation cleanup (2026-10-27)
- [x] Follow-up: removed decorative detail/overview badges; reused existing four-language one-time CTA; 729 tests passed, build OK, browser checked. Report: `docs/tier-badge-followup-2026-10-27.md`. No publish/deploy; separate TypeScript check not manually run under harness rules.
- [x] Remove decorative access badges; preserve routes, gates, payments, languages and warnings.
- [x] Document every sidebar destination and all eight catalog categories, duplicates and mobile rotation risk (`docs/catalog-navigation-cleanup-2026-10-27.md`).
- [x] Run no-downgrade/full tests and preview checks; no publish/deploy. Separate TypeScript check not manually run under harness rules.

## Task-to-output phase 1 (development only)
- [x] Prepare future published visibility, production-mode regressions, read-only PWA audit with version-baseline recovery and release checklist; 782 tests passed; no publish/deploy. See `docs/release-readiness-2026-10-27.md` for unverified signed-in/installed-PWA/accessibility checks.
- [x] Add preview-only translated sidebar reply entry and direct localized wizard opening; 778 tests passed, signed-out desktop/mobile checks passed; authorized Preview session remains the existing blocker. Report: `docs/letter-reply-sidebar-2026-10-27.md`. No publishing.
- [x] Add isolated browser-only agency reply drafting from Vorlagen and DocumentenCheck results, four languages, editable German output and PDF/copy.
- [x] Replace inferred deadline headline with an original-letter review warning; preserve existing analysis and gates.
- [x] Validate templates, PDF output, privacy, full regression suite (749 passed), isolated mobile/desktop flow; harness build OK; no publish/deploy.
- [ ] Authenticated host end-to-end + completed DocumentenCheck CTA: blocked on owner app session; managed login has no matching owner account. See `docs/task-to-output-phase1-2026-10-27.md`.

## Wohngeld batch
- [x] Decision guide + Bayern MZ/LZ + general companion, 4 locales, tests, docs (exact Bavarian field mapping blocked: encrypted originals)

## Rad i karijera batch
- [x] arbeitslosengeld, krankenkasse, steuerklassenwechsel companions (topical, no field mapping)
