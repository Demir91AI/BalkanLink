# Dokumenti i potvrde — results (28.10.2026; no release)

Baseline: `04a80e22a7bcace71420bb5b87a609389c8aa83d`. Only the three existing document slugs received new companion content.

## Delivered
- `grundsicherung`: **SGB XII, Sozialamt**, not the Jobcenter SGB II HA/annex navigator and not Erwerbsminderungsrente. Six steps and seven terms explain jurisdiction, age threshold, permanent full incapacity, pension distinction, income/assets, household/housing, insurance, possible additional needs, evidence, submission and Bescheid/change reporting. Local forms vary; no exact field positions or eligibility promise.
- `fuehrungszeugnis`: five steps/five groups; ordinary/private, extended, authority and European distinctions, written purpose proof, eID versus BundID, municipal versus online application, delivery and follow-up. **Online application is not private-only.** The separate digital-certificate delivery option is described for private purposes by BfJ. No authenticated portal field sequence, fixed fee, processing deadline or clean-record guarantee.
- `kirchenaustritt`: five steps/five groups; neutral and sensitive, no assumption of membership. Bayern Standesamt and NRW Amtsgericht clearly scoped; personal or appropriately certified written declaration, identity/name/community terminology, documents, variable fees, certificate retention and possible tax effects. No universal effective date or encouragement to leave/stay.
- All four complete locales BS/HR/SR/DE added together, translated directly within this session; no paid AI gateway, external translation, packages or new assets. All 17 groups/16 steps share identical IDs/German labels/options. Independent native proofreading remains advisable.
- Existing ProcedureCompanion provides jump index, previous/next terms and steps, reviewed-and-next with focused next heading, count, completion, reopen and unmark. No applicant-answer, religious-status or medical-condition selectors; modes/jump/review exist only in mounted state. No save controls, PDF generation/filling/upload or submission.
- The old three guide-data fallbacks no longer render on those slugs; their underlying legacy content is preserved. No duplicate companion/wizard.

## Exact changed files
- New `src/lib/guide-first/documents-model.ts`, `src/components/guide-first/DocumentsCompanion.tsx`.
- `src/components/guide-first/ProcedureCompanion.tsx`: type union/import only, no behavior change.
- `src/pages/FormCenter.tsx`: wrapper imports and three-slug branch only.
- `src/i18n/locales/{bs,hr,sr,de}/pages.json`: appended `documentsCompanions` only, old values unchanged.
- `src/lib/guide-first/official-sources.ts`: only three document entries, procedure-check date and official source paths; local procedures stay `kind: local`.
- New `src/lib/guide-first/documents-companion.test.tsx` (16 tests).
- `src/lib/guide-first/guide-first.test.tsx` and `phase5-guides.test.tsx`: expected reviewed source list/count for the three additions; no baseline/snapshot updates.
- `AGENTS.md`, `roadmap.md`, `docs/documents-guide-inventory.md`, this results file.

## Actual QA
- Before wiring: 118/118 existing education/guide-first/Phase5 tests passed.
- New structural/render tests: **16/16 passed** in all four locales. Tested 46 catalog count, unchanged category membership/free Führungszeugnis rule, SGB XII/SGB II allowlist separation, exact locale structures/German choices, no references or sensitive selectors, official links/new tabs, all terms/options, previous/next, online mode, reviewed advance/focus, completion/reopen/unmark, remount reset and absence of inputs/save controls.
- Full suite: **1,219/1,219 passed, 42 files**, using `--maxWorkers=2` to avoid prior resource-contention timeouts. No reproducible regression or timeout. An initial typecheck error in the new test's inferred options union was corrected by an explicit ProcedureTerm narrowing; focused tests then passed again.
- Browser: **24/24 route fixtures** = three routes × BS/HR/SR/DE × 390/1280 pixels (heights 844/1800). **Eight Führungszeugnis checks use the actual public route with no gate override**, proving existing free access. Sixteen Grundsicherung/Kirchenaustritt checks use a response-only DEV_MODE override in an isolated browser context; no application gate/account/flag change. Real member authorization for those two is not certified.
- Browser checks each term/choice, both term directions, official new-tab links, online note, reviewed-next and next-heading focus, completion/reopen/unmark, step back/next; one companion and one wizard, no answer inputs, no horizontal overflow or page exceptions. Screenshots/script/results: `/tmp/browser/documents/`. BS mobile SGB XII and DE desktop church-exit screenshots inspected visually; text is readable and shared dark guide surfaces retained.
- Automatic preview build log after the test type fix: **build OK at 14:01:55 UTC**. No manual build/typecheck or server restart.
- Compared to the exact baseline: pre-existing content in all four locale files is structurally identical after removing the appended key. Catalog, AnerkennungNavigator, KindergeldGuideContent, SGB II model and EducationCompanion are byte-identical. No route, auth/trial/payment/database, Viza, legal, asset or deployment changes.

## Sources and limitations
Exact primary URLs and pre-change inventory are in `docs/documents-guide-inventory.md`. Check date is **28.10.2026**, not a form edition. Summaries are original and labels are brief attributed terminology; only external publisher links, no third-party PDFs/assets reproduced or hosted.

- SGB XII regional form editions/field positions were not verified; Berlin is explicitly an example, not the application for other cities.
- BfJ authenticated online flow/digital issuance was not opened or submitted. Portal-screen order and issuance outcome remain unverified.
- Bayern/NRW are verified examples, not full instructions for all 16 Länder. User follows the official locality selector. Dates, costs and individual tax effects need the responsible authority; no legal advice or fixed savings.
- Broad exhaustive coverage of every municipal checkbox is not claimed: this is a substantive beginner procedure/vocabulary guide, with five commonly relevant printed-type/declaration choices explained where appropriate.
- No money/credit request, external translator, paid AI gateway call, dependencies, release or publishing.

**Nothing published or deployed.** Future actions, if requested: independent native proofreading, genuine authorized member checks for the two gated hosts, and locality-specific form/official-portal audits before claiming exact fields.