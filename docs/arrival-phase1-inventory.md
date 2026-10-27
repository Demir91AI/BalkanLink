# Arrival companions — Phase 1 of 7, pre-edit inventory

Scope: only `/formulari/anmeldung`, `/formulari/steuer-id`, `/formulari/fuehrerschein`, `/formulari/fahrzeugzulassung` and their `/hr`, `/sr`, `/de` equivalents. Recorded 27 October 2026 before guide implementation. No release authorization.

## Existing routes, rendering and access

`src/pages/FormCenter.tsx`: `GuideContent` → `GuideFrame` → four explicit `GuideBody` branches. Preserve router, SEO, navigation, official-next-step entry and outer access checks. `src/lib/form-catalog.ts`: `dolazak.isFree === true`; all four are in `FREE_FORM_SLUGS`. `decideGuideAccess` returns full access for these even signed out independently of rollout flags. Do not change either access file.

| Guide | Existing content |
|---|---|
| Anmeldung | `src/components/AnmeldungGuideContent.tsx`: four hardcoded Bosnian steps (appointment, landlord confirmation, personal details, completion), preparation/mistakes, generic BMI link. Unsupported fixed waiting/fine/immediate-document claims, no localized mapping; final button has no handler. |
| Steuer-ID | `src/components/guides/SteuerIdGuideContent.tsx` → `StructuredProceduralGuide` → `SmartGuideWizardShared` → `SmartGuide`, with a nested `AuthGate` despite `free`. Three locale-data steps `pages.proceduralGuides.steuerId`: find, arrival, renewed notification. Preserve all old locale records and existing workflow/access; add public companion consistent with explicit owner requirement for free category. |
| Licence | `src/components/formulare/FuehrerscheinGuide.tsx`; `de-labels.ts` keys `fs_*`: EU/country distinctions, four steps, five documents, costs, errors and links. Categorical country/exam-waiver claims are unsafe; do not repeat them. Preserve source and labels, replace only FormCenter presentation with qualified distinctions. |
| Vehicle | `src/components/formulare/FahrzeugzulassungGuide.tsx`; `de-labels.ts` keys `fz_*`: six types, six applicant cases, nine documents, nine steps, eight registration cases, office, eight costs, five import records, eight errors. Hardcoded BS labels. Preserve source; replace FormCenter presentation with localized scenarios and no unsupported costs/timelines. |

`src/lib/guide-data.ts` and all legacy Muster content/assets/routes remain. Separate Anmeldung simulator translations are not official form evidence.

## Shared model and preservation boundary

`SmartGuide` supports semantic blocks, focus, numbered jumps, previous/next and opt-in reviewed-and-advance/completion. Reuse its API without editing it and without a storage `id` for new companions. Kindergeld's specialized 30-group walkthrough and all 174 terms remain untouched; no extraction/refactor.

No nationwide mapped PDF is assumed. Use administrative procedure guidance plus explicitly non-mapped vocabulary unless an actual official form is inspected and identified. Never assert page numbers or authenticated portal order from service-page prose. BZSt renewed notification is not a new ID request.

## Before-edit evidence

186 existing guide-first tests passed (8 files). Originals of four guide sources, shared rendering sources and all four old Steuer-ID records saved in `/tmp/arrival-inventory/` before edits. Original content remains in the repo. Kindergeld component SHA-256 values recorded for comparison after implementation.

Verification, precise coverage and QA will be in `docs/arrival-phase1-results.md`. Explanations are original summaries with outbound citations; no publisher PDF/image/text is hosted and no unknown licence is assumed.