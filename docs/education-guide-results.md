# Education batch — results (NOT complete)

Status: **stopped before wiring**. No app code, locale, route, catalog, auth, payment or test files were changed; nothing published.

Done:
- Source check (see `education-guide-inventory.md`).
- Bosnian draft content for all three guides: `docs/education-draft/educationCompanions.bs.draft.json` (BAföG and Schüler-BAföG mapped to Formblatt 01 Seite/Zeile; Integrationskurs has vocabulary only, no positions).

Blocker: translating to HR/SR/DE failed because the AI gateway returned 402 (credits used up). Since the owner rule requires four locales at once, the draft was not wired into the page.

Next step: translate the draft (HR/SR/DE), add `education-model.ts` + `EducationCompanion` as in the career batch, wire in `FormCenter.tsx`, add tests, run the full suite and browser checks.
