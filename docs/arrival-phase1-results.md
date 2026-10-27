# Formulari arrival companions — Phase 1 of 7

Checked 27 October 2026 UTC. Only the four arrival items were migrated. No publishing, deployment, package install, auth/account/payment/database/legal change or downloaded publisher asset.

## Completed scope

| Public route (also /hr, /sr, /de) | Procedure steps | Vocabulary groups | Distinct coverage |
|---|---:|---:|---|
| `/formulari/anmeldung` | 6 | 9 | Two-week ordinary moving rule; real Einzugsdatum; mandatory Wohnungsgeberbestätigung, landlord/owner distinction and all statutory confirmation data; identity/family/representation; prior address and foreign arrival; sole/main/secondary residence; office/conditional online path; confirmation/corrections. Rental contract is not a substitute. |
| `/formulari/steuer-id` | 5 | 6 | Automatic first-registration/newborn assignment; lifetime unchanged; IdNr vs Steuernummer/USt-IdNr; BZSt letter/assessment/electronic wage-tax certificate; registered address/mailbox; renewed notification not new ID; own/representative distinction; official BOP/ELSTER entry and privacy/delivery. Original three-step workflow remains below, with its existing access and saved-progress behavior. |
| `/formulari/fuehrerschein` | 6 | 9 | EU/EWR vs third state; ordinary residence and conditional six-month rule, possible limited extension; licence expiry; class-specific Annex 11/theory/practice review without waiver promises; local conditional documentation, original/translation/vision/first-aid/medical proofs; personal office application, restrictions and collection. |
| `/formulari/fahrzeugzulassung` | 6 | 10 | New/used/holder change/re-registration/import/address-change distinction; holder/owner/insured person; eVB, I/II, FIN, HU, COC/type approval, conditional customs/technical evidence; SEPA/IBAN/account owner/signatures; representation/special plates; main-residence authority and supported i-Kfz identity/security-code conditions; official result and first-use checks. |

Total: **4 procedure companions, 23 substantive steps, 34 vocabulary groups, four locales**. Each vocabulary group contains German term, localized meaning/instructions, source of data, fictional example and common mistake. Relevant choices have inline conditions, not answer widgets. Paper/office is the initial mode; online is explicit conditional guidance, not invented portal field order.

The portable companion reuses the existing SmartGuide renderer unchanged. Review marks the current step and advances, focuses/announces the next heading, and ends in a non-submission completion state with review/unmark. No storage id is supplied, so new markers stay in mounted state. There is no personal-data entry, PDF operation or submission.

## Exact files

Added:
- `src/components/guide-first/ProcedureCompanion.tsx`
- `src/lib/guide-first/arrival-model.ts`
- `src/lib/guide-first/arrival-companion.test.tsx`
- `docs/arrival-phase1-inventory.md` (pre-implementation inventory)
- `docs/arrival-phase1-results.md` (this report)

Changed:
- `src/pages/FormCenter.tsx`: one four-slug allowlist branch; other guide branches, routes and access decisions unchanged. Source components and legacy labels/assets remain rather than being deleted.
- `src/lib/guide-first/official-sources.ts`: only four arrival registry records, jurisdiction-scoped links and verified check date.
- `src/i18n/locales/{bs,hr,sr,de}/pages.json`: appended `arrivalCompanions` only; original locale subtrees preserved.
- `src/lib/guide-first/guide-first.test.tsx`, `src/lib/guide-first/phase5-guides.test.tsx`: reviewed-source inventory assertions now include the three newly checked procedures (39 other services remain unverified).
- `AGENTS.md`, `roadmap.md`: portable companion boundary and scope/results.

## Sources and freshness

The supplied four primary pages were successfully fetched through the documented website-fetch gateway and saved in `/tmp/arrival-verified/` on **27.10.2026**. Supplementary pages were successfully fetched in `/tmp/arrival-extra/`. This is the actual checking date, not a publisher publication date or guarantee of unchanged future law. An initial background fetch used the wrong gateway path; it was not accepted as gateway evidence and was replaced with successful documented-route checks. Background agents' conflicting clock dates were not used.

- [Anmeldung — Bundesportal, Brandenburg](https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115005104000/herausgeber/BB-108321434/region/120000000000): publisher date 08.04.2020; two weeks, ID and landlord confirmation, locally qualified family/representation. [BMG §19](https://www.gesetze-im-internet.de/bmg/__19.html) confirms housing-provider duties and confirmation data; [BMG §21](https://www.gesetze-im-internet.de/bmg/__21.html) main/additional residence.
- [BZSt renewed notification](https://online.portal.bzst.de/SharedDocs/Leistungsbeschreibung/DE/erneute_mitteilung_der_ID-Nr.html): automatic assignment/lifetime number, missing notification and delivery/privacy. [Official BOP/ELSTER entry](https://www.elster.de/bportal/formulare-leistungen/alleformulare/idnr) checked; only entry/version selection exposed, not a full internal field schema.
- [Licence — Bundesportal, Bremen](https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99108047050002/herausgeber/HB-S1000030000009309/region/040000000000): updated 21.09.2026, conditional six months/personal application and individual exceptions. [FeV §28](https://www.gesetze-im-internet.de/fev_2010/__28.html), [§29](https://www.gesetze-im-internet.de/fev_2010/__29.html), [Annex 11](https://www.gesetze-im-internet.de/fev_2010/anlage_11.html): scope/conditions and class-specific exams. No country-wide exam guarantee.
- [Vehicle first registration — Bundesportal, Bremen](https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99036020001000/herausgeber/HB-S1000030000018506/region/040000000000): updated 16.09.2026. Not a universal used/import list. [Bremen holder change](https://www.service.bremen.de/dienstleistungen/kraftfahrzeug-umschreiben-mit-halterwechsel-und-ohne-kennzeichenmitnahme-126635) supports the used-vehicle list. [BMV i-Kfz](https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/internetbasierte-fahrzeugzulassung.html) supports transaction-specific identity/security codes and technical/document prerequisites.

All new prose is independently written explanation/summary. Official text/PDFs/images are not republished or hosted; source links are outbound. No blanket licence/legal-compliance claim.

## Verification results

- Before edits: **186 existing guide-first tests, 8 files, passed**.
- Final complete suite: **1061 tests, 35 files, passed**, including 28 new companion tests, existing routes/catalog/access/payment baselines and Kindergeld regressions. An intermediate test incorrectly expected `null` from optional access on a missing element; corrected to assert absent element, then reran the full suite successfully.
- Automatic preview build: **build OK** (latest checked entry 22:22:33 UTC). No manual build/typecheck invoked.
- Real public browser flow: **32 fixtures = 4 routes × 4 languages × phone 390×844 / desktop 1280×1800**, no test gate bypass, no account selection or credentials. Each verified initial visible single companion, paper default, all vocabulary navigation/options, mode switch, every review/advance, completion/reopen/unmark, next-heading focus, outbound target/rel, no data inputs and no document overflow. No page errors.
- Body text in action/source/error panels: observed **minimum 9.5:1** at phone and desktop. Screenshots inspected for initial and reviewed-state mobile/desktop.
- Kindergeld main component, field companion and walkthrough **SHA-256 unchanged** from pre-edit values. All four old `proceduralGuides.steuerId` objects compare identical to pre-edit inventory.
- `/viza` still renders at both widths; no Viza sources/routes or shared SmartGuide code changed.
- Existing i18n validation script was run. It reports unrelated pre-existing missing-key findings across the app; no `arrivalCompanions` missing-key finding. Dedicated companion tests cover every new locale/term/option. No unrelated key sweep was performed.
- Evidence: `/tmp/browser/arrival/results.json`; `bs-390-anmeldung.png`, `de-1280-fahrzeugzulassung.png`, `bs-390-advance.png`, `bs-1280-advance.png`, plus each of the 32 initial route screenshots. Logs: `/tmp/arrival-full-final.log`, `/tmp/arrival-i18n.log`.

## Honest gaps / blockers

1. **No complete verified official form-field mapping** for these four has been obtained. Most procedures use local forms; no selected city/authority edition was supplied. All 34 terms are explicitly vocabulary, not a claim of every actual local field/option. No form/page numbering invented. A complete city-specific companion requires the actual official current form and source/edition check.
2. **BZSt internal form fields and authenticated online order remain unverified.** The official entry is checked, but it is not represented as a complete field-by-field portal copy. Never invent its missing internal questions.
3. **Original Steuer-ID nested AuthGate remains unchanged** below the new freely visible companion. The new companion and six/five-step flows are verified publicly without bypass; authenticated use of the old saved workflow was not claimed.
4. Country/class-specific Annex 11 decisions, special licence exceptions and individual vehicle imports require the competent authority's assessment. Local timelines, fees and acceptance are not guaranteed.
5. This is **only Phase 1 of 7**, not the entire Formulari migration. Remaining catalog items were not migrated this turn; prior roadmap blockers remain separate. No publishing/deployment authorized or performed.

Inspected revision after UI/tests: `349bbee886c48b25c4c19156bbf7bb81565f3d2e`; this identifies the observed revision, not a claimed manually created commit.