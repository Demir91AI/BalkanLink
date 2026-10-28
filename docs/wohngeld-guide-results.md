# Wohngeld guide – results (28.10.2026, not published)

Files: `src/lib/guide-first/wohngeld-model.ts` (new), `src/components/guide-first/WohngeldCompanion.tsx` (new), `src/components/guide-first/ProcedureCompanion.tsx` (additive optional `content/links/verifiedOn/variant` props; existing callers unchanged), `src/pages/FormCenter.tsx` (wohngeld branch only), `src/i18n/locales/{bs,hr,sr,de}/pages.json` (new `wohngeldCompanion` node only), `src/lib/guide-first/wohngeld-companion.test.tsx`, docs.

Behaviour: memory-only 3 questions (Bundesland, rent/own, first/renewal, each with "not sure") → Bayern+rent = Mietzuschuss, Bayern+own = Lastenzuschuss, everything else = general all-state guide with Bundesportal location picker only. Bavarian links appear only for the matching selection, all in new tabs. 11 topical terms + 6 reviewed-and-next steps per variant; nuanced exclusion term (exceptions from Erläuterungen, authority decides); no amounts, no eligibility decisions, no inputs/storage.

Limitations: exact Bavaria field/page mapping NOT delivered – originals are encrypted/copy-restricted (see inventory). Renewal: no separate Folgeantrag form confirmed; guide says a new application is filed. HR/SR/DE are machine-translated, not native-proofread. Browser QA used test-only access override; real member session not tested. Other Bundesländer forms not individually verified.

Tests: 12 new focused tests; full suite 1160 tests (39 files) passing after restoring a pinned import; browser 390/1280 × 4 locales: no overflow, no page errors, variant switch and 6 new-tab links verified. Build OK. Nothing published.
