# Education batch — resumed results (28.10.2026; not published)

Baseline: `ec88318a44eb0f061ec79a86e3a29e1fa3a7d031`. All three existing slugs now render the shared ProcedureCompanion: `bafoeg`, `schueler-bafoeg`, `integrationskurs`.

## Delivered
- Reused the complete saved Bosnian draft and source inventory; no research restart, PDF downloads, external translator, AI gateway calls, paid service, packages or release.
- Added complete BS/HR/SR/DE content together. German labels, choice codes, IDs and references remain identical to the draft in every locale. Croatian and Serbian were adapted directly in this edit session; German was translated directly, not through a gateway. Independent native-speaker proofreading remains advisable.
- 35 term groups (18 BAföG / 8 Schüler-BAföG / 9 Integrationskurs), 18 procedure steps (7 / 5 / 6), four memory-only orientation choices per guide, original-paper/online explanations, jump index, previous/next terms and steps, reviewed-and-next, heading focus, completion/reopen/unmark.
- Each existing term retains meaning, instruction, information source, fictional example and pitfall. Evidence and follow-up remain procedural sections; no new answer fields, storage, PDF handling or submission.
- Clarified overly categorical draft wording about school entitlement, parent-income declarations, age exceptions, form submission channels and integration-course obligations. Corrected the age-30 boundary and removed the false suggestion that Zeile 48 itself establishes the legal application deadline. BAföG Digital is explicitly not mapped to PDF screens.
- Preserved the draft file unchanged. BAföG page/line references inherit its previously verified 2025 edition; no new field positions are added. Integration-course vocabulary does not claim current BAMF form options or positions.

## Exact files
- `src/lib/guide-first/education-model.ts`: three-slug allowlist and publisher links.
- `src/components/guide-first/EducationCompanion.tsx`: existing wrapper pattern.
- `src/components/guide-first/ProcedureCompanion.tsx`: education slug type added only; behavior unchanged.
- `src/pages/FormCenter.tsx`: imports and education branch only.
- `src/i18n/locales/{bs,hr,sr,de}/pages.json`: appended `educationCompanions` only.
- `src/lib/guide-first/official-sources.ts`: only the three education entries updated to the recorded publisher pages and check date, avoiding contradictory unverified notices around the new content.
- `src/lib/guide-first/education-companion.test.tsx`: 16 structural/render tests.
- `src/lib/guide-first/{guide-first,phase5-guides}.test.tsx`: expected verified list/count adjusted for these three sources; no Phase 1 baseline/snapshot edits.
- `AGENTS.md`, `roadmap.md`, this results document.

## Sources and honest limits
The preserved source record is `docs/education-guide-inventory.md`, checked in the stalled batch on 28.10.2026, not downloaded or independently checked anew during this resume.

- Official BAföG form index: https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html
- BAföG Digital: https://www.bafoeg-digital.de
- BAMF 630.007: https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kursteilnehmer/AntraegeAlle/630-007_antrag-zulassung-integrationskurs-ausl_pdf.html
- BAMF participation/costs: https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/TeilnahmeKosten/teilnahmekosten-node.html
- BAMF-NAvI: https://bamf-navi.bamf.de

The saved inventory records Formblatt 01/02/03/04 as Stand 2025, respectively 8/2/6/2 pages, unencrypted, with hash prefixes. It does not retain full PDF download URLs or full hashes. The temporary extracted PDF texts from the stalled session are no longer present. Consequently this resume preserves the prior mapping but does not claim a fresh exhaustive field audit. The 18/8 BAföG groups are aggregated explanations, not independent explanations for every printed subfield.

BAMF edition 630.007v was not confirmed in the saved research; no readable current download was obtained. **Zero BAMF field/page positions.** Gender vocabulary is explicitly general vocabulary, not verified current form choices. Costs exemption 630.027 and travel subsidy 630.032 remain separate requests, reached through the publisher pages; their missing exact application URLs were not reconstructed. No portal screens, amounts, personal eligibility or acceptance outcome are promised.

No official PDFs or third-party assets are hosted or copied into the app. Content is original explanatory text with limited attributed form labels and external publisher links; publisher form reuse permissions are not claimed. Existing source inventory and `docs/education-future-notes.md` remain unchanged. Future audit action: retain original PDFs/extractions and exact publisher URLs if the owner requests a fresh field audit; not required to use these read-only guides.

## QA actually run
- Focused new test file: **16/16 passed**. Across all locales, every term and printed vocabulary choice is rendered in its group; links open new tabs, all orientation branches work, reviewed-next advances/focuses, completion/reopen/unmark work, remount resets choices, no answer inputs or save controls.
- Initial default-parallel full run: **1,198 passed / 2 timed out at 5 seconds** (existing Kindergeld field walkthrough BS and letter-reply sidebar BS). No assertion regression. Complete rerun with `--maxWorkers=2`: **1,200/1,200 passed, 41 files**. A further final full run after locale/source changes also passed **1,200/1,200** in 93.11 seconds. Existing tests were not relaxed to hide these timeouts.
- Python Playwright: **24/24 real-route test-access fixtures**, three slugs × four locales × widths 390/1280 (heights 844/1800). Repeated after final edits. Every gate, term jump, vocabulary option, new-tab link, online note, review/heading focus, completion, reopen, unmark and previous/next exercised. No page exceptions or horizontal overflow. Screenshots: `/tmp/browser/education/{locale}-{width}-{slug}-{start|review}.png`; script and results in the same directory. Representative BS/HR mobile and SR/DE desktop screenshots visually inspected.
- Test-only access uses response interception of `dev-mode.ts` in the isolated browser context, not code/account/gate changes. **Real member authorization was not tested**, as requested; no authenticated BAföG/BAMF portal was tested or represented.
- Automatic preview log: latest checked entry **build OK, 2026-10-28T13:47:39Z**. No manual build/typecheck command run.
- Global legacy i18n scanner reports **447 existing missing keys** (it scans only BS/DE and includes mismatched namespace usages outside education). No education failures in that output. New four-locale structure/IDs/labels/references are independently tested and pass; global scanner cleanliness is not claimed.
- Comparison against the exact requested baseline: all pre-existing locale data unchanged after removing the appended education key; catalog, KindergeldGuideContent and AnerkennungNavigator byte-identical. Catalog remains 46 services. No auth, entitlement, trial, payment, database, Viza, assets or legal changes.

**Nothing published or deployed.** Remaining limitations are source-evidence retention, exact current BAMF mapping, native proofreading and genuine member/official-portal QA; no credits or external service are needed to use the completed guides.
