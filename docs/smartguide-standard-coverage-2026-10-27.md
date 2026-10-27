# SmartGuide standard — partial implementation and coverage

## Baseline and inventory

Started from the exact supplied local HEAD `5f9ce98eae44ee15724b5e1942c9d89d09d7ed66`. The complete 200 declared route paths and 46 FormCenter slugs were recorded **before guide UI changes** in `smartguide-route-inventory-2026-10-27.md` and `.json`. Sidebar/category review was performed separately by a read-only audit. GitHub remote sync status was not independently verified.

## Implemented

- One `src/components/guide-first/SmartGuide.tsx` renderer: previous/next, numbered jump controls, current-step announcement/focus, responsive content blocks, optional step checklists, reviewed-step markers, sources and verification notice, optional save/resume/delete.
- `SmartGuideWizardShared` and `FormSmartGuide` delegate presentation to it. Their host authentication, premium threshold and fallback history/query decisions remain; there was no entitlement rollout or access change.
- `GuideFrame` supplies registry source context and semantic light/dark colors; removed the generic shared checklist rather than pretending it was service-specific procedure content.
- Actual-field label requires explicit verified field metadata. Existing legacy wizard records default to informational/action labels. Kindergeld's verified paper records explicitly show the field-entry label.
- Kindergeld preserves online default, four online groups with closed helpers, paper mode, all 20 KG1/Anlage Kind records and original ordering, single-open accordion, separate adult/cross-border panels. Its five-stage newborn procedure now uses the shared template with concrete preparation/submission/after-submission checklists. Process remains a disclosure so the established online-first experience is not replaced by redundant mandatory screens.
- Kinderzuschlag inherits the new renderer through its existing `LocalizedGuide` and shared wizard, without replacing its underlying substantive content or its working KiZ-Lotse link. This is **presentation migration, not completed content verification**.
- Opt-in progress saves only `{version:1, step, completed:number[]}` under a validated workflow key. No automatic read/write, no documents, answers, personal information, check-item state, case selection or jurisdiction. Invalid/stale progress is ignored and storage failures are disclosed.
- New UI and newborn checklist copy added simultaneously to BS/HR/SR/DE `pages.json`; no new translation system.

## Precise presentation coverage

**30 dedicated FormCenter guide consumers:** steuer-id, kindergeld, elterngeld, mutterschaftsgeld, kinderzuschlag, krippengeld-bayern, wirtschaftliche-jugendhilfe, hauptantrag, weiterbewilligung, anlage-kdu, anlage-ek, anlage-eks, anlage-vm, anlage-wep, anlage-ki, anlage-sv, anlage-bb, anlage-ve, anlage-hg, anlage-meb, anlage-uf, anlage-se, anlage-uh1, anlage-uh2, anlage-uh3, nichterreichbarkeit, arbeitsbescheinigung, antragsruecknahme, wohngeld, krankenkasse.

**Fallback adapter changed for 11 catalog slugs:** arbeitslosengeld, steuerklassenwechsel, bafoeg, schueler-bafoeg, integrationskurs, grundsicherung, fuehrungszeugnis, kirchenaustritt, nationalvisum, niederlassungserlaubnis, verpflichtungserklaerung. Their actual data depth/localization/source quality is not certified by the adapter migration. Do not infer all 11 have equally complete workflows.

**Not migrated:** Anmeldung, Führerschein, Fahrzeugzulassung bespoke content; Anerkennung Navigator is its own profession/state flow. Aufenthaltstitel keeps its existing redirect to `/formulari` rather than becoming a new active detail workflow. Full Visa Navigator, AnerkennungFakulteti and dual-citizenship pages remain unchanged. The existing Einbürgerung guide also inherits the renderer where it uses `SmartGuideWizardShared`, but its German/BiH legal content and source completeness have not been reverified.

## Source checks and content gaps

- BA Familienkasse eServices and Kindergeld Nachweise pages were fetched and relevant source wording inspected (HTTP 200). The eServices page identifies Familienkassen-Profil/BundID, online applications and Bescheid reception; the Nachweise page describes authority requests/deadlines and foreign-born/foreign-resident evidence.
- Existing verified KG1/Anlage Kind mapping records were retained, not regenerated. No official protected PDF was altered, decrypted or filled.
- The Kinderzuschlag entry returned a sparse shell during this check; no new verification date was assigned. Existing exact amount, income threshold, processing-time and eligibility claims remain review backlog. The source panel transparently marks it unverified.
- No new exact allowance, deadline or guaranteed eligibility was invented. No entire registry was marked verified after a simple URL fetch.
- **Still required:** procedure-specific preparation/documents/submission/aftercare/FAQ for all remaining legacy records; source edition and field mapping verification before enabling the field-entry label; correcting misleading legacy legal/eligibility claims in each locale; robust profession/visa/jurisdiction-specific migration; separate German/BiH citizenship review. Generic fill-in templates were deliberately not substituted for these missing facts.

## QA

- Baseline suite: **998 passed**.
- Focused Kindergeld/catalog guide suite: **112 passed**.
- Final suite after branch regression fix: **1008 tests passed, 32 files**. Includes navigation boundaries/jumps, explicit save/restore/delete, schema stripping sensitive extras, locale shape, source-backed newborn preparation, inherited access/history and all existing route/payment/20-record regressions. Pinned baselines unchanged.
- Automatic preview build: **build OK**, last checked `2026-10-27T19:59:27Z`. No manual build/typecheck command run; harness performs these checks.
- Real public guide routes in all four locales at 1280×1800 and 390×844 showed the **existing access prompt**, with zero runtime errors. No access bypass was added.
- Managed owner session mint failed: no app account matches the requesting owner. Authenticated route E2E remains **unverified**; no other account was selected and no auth accounts changed.
- Isolated actual Kindergeld component: **16 combinations** (BS/HR/SR/DE × light/dark × desktop/mobile). Step jump, keyboard Enter activation of adult branch, return to newborn and paper 20-row count passed; no horizontal overflow or runtime errors. Screenshots inspected under `/tmp/browser/smartguide/` (390px light/dark template). This is **not authenticated host-route evidence**.
- Numeric WCAG contrast certification, arrow-key branch roving behavior, full content placeholder auditing and every migrated guide's mobile E2E are **not completed**. Text uses semantic foreground/muted tokens with scoped dark improvements; visual screenshots were checked, not a blanket accessibility claim.

## Exact changed code/documents

`AGENTS.md`, `roadmap.md`, `docs/smartguide-route-inventory-2026-10-27.md`, `docs/smartguide-route-inventory-2026-10-27.json`, this coverage report; `src/components/FormSmartGuide.tsx`, `src/components/KindergeldGuideContent.tsx`, `src/components/kindergeld/KindergeldFieldGuide.tsx`, `src/components/guide-first/GuideContext.tsx`, `GuideFrame.tsx`, `SmartGuide.tsx`; `src/components/guides/LocalizedGuide.tsx`, `SmartGuideWizardShared.tsx`; four `src/i18n/locales/{bs,hr,sr,de}/pages.json`; `src/index.css`; `src/lib/guide-first/progress.ts`, `smartguide-standard.test.tsx`.

No Stripe, live prices, subscriptions, auth accounts, legal pages, server functions, database, route declarations, SEO settings, blog/calculator functionality or production release was changed. Nothing published or deployed.

This is a reusable foundation and prioritized presentation migration, **not completion of the platform-wide content standard**.