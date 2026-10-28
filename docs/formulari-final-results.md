# Final Formulari results — 28.10.2026

## Completed scope
All ten requested existing slugs now dispatch once through the existing ProcedureCompanion via the additive Grundsicherung allowlist. FormCenter routing source, shared companion, catalog, Navigator and previous locale guide content are unchanged. No release, deployment, backend, auth, payment, trial, legal, applicant-data or PDF-generation changes.

235 ordered terminology/field groups, 310 printed choice/column definitions, 42 procedure steps; BS/HR/SR/DE structure identical. MEB patient/doctor roles and separate numbering are explicit; SE C/D/E are independently voluntary with future revocation boundaries. UH1 partner maintenance, UH2 pregnancy and UH3 under-25 child maintenance remain separate. ANE needs actual advance approval; withdrawal warns of irreversible consequences and no-signature original; employer certificates are employer-only.

|Slug|Groups|Steps|
|---|---:|---:|
|`anlage-hg`|10|4|
|`anlage-meb`|15|4|
|`anlage-se`|11|4|
|`anlage-uh1`|15|4|
|`anlage-uh2`|15|4|
|`anlage-uh3`|30|4|
|`anlage-uf`|43|5|
|`nichterreichbarkeit`|6|4|
|`antragsruecknahme`|4|4|
|`arbeitsbescheinigung`|86|5|

## Official originals and limitations
Live links discovered through the BA downloads index, not reconstructed. PDFs and complete pdftotext -layout extraction stayed in /tmp. All eleven originals are unencrypted AcroForm and extractable without circumvention. We have not established a blanket redistribution licence; no originals are hosted or altered. Recorded metadata/hash is in formulari-final-source-inventory.json.

|Live official original|Printed edition|Physical pages|
|---|---|---:|
|https://www.arbeitsagentur.de/datei/anfrage-ortsabwesenheit_ba147389.pdf|05/2026|3|
|https://www.arbeitsagentur.de/datei/anlagehg_ba032950.pdf|10/2026|2|
|https://www.arbeitsagentur.de/datei/anlagemeb_ba032955.pdf|10/2026|4|
|https://www.arbeitsagentur.de/datei/anlagese_ba032975.pdf|10/2026|3|
|https://www.arbeitsagentur.de/datei/anlageuf_ba032970.pdf|10/2026|7|
|https://www.arbeitsagentur.de/datei/anlageuh1_ba032990.pdf|10/2026|3|
|https://www.arbeitsagentur.de/datei/anlageuh2_ba032995.pdf|10/2026|3|
|https://www.arbeitsagentur.de/datei/anlageuh3_ba033050.pdf|10/2026|4|
|https://www.arbeitsagentur.de/datei/arbeitsbescheinigung_ba013140.pdf|08/2023|9|
|https://www.arbeitsagentur.de/datei/einkommensbescheinigung_ba032965.pdf|10/2026|6|
|https://www.arbeitsagentur.de/datei/erklaerung-der-antragsruecknahme_ba053139.pdf|07/2026|1|

MEB pages 2–4 carry medical pages 1–3, with restarted fields 1–21; main applicant page fields 1–12. Arbeitsbescheinigung live-linked paper is 08/2023, **not** a current BEA screen mapping: BEA employer process https://www.arbeitsagentur.de/unternehmen/personalfragen/bea. Separate SGB II Einkommensbescheinigung is 10/2026. ANE is 05/2026 and withdrawal 07/2026; these are never relabelled 10/2026.

## Actual QA
- Baseline: 1,254 tests / 43 files passed before implementation.
- Focused initial corrected run: 129/129 across new-guide, guide-first and phase5 files. Final full run: **1,322/1,322 tests, 44 files**, 109.37 seconds; no unhandled errors.
- Investigated initial failures: newly authored tests had wrong UH maximums/UF option name, corrected against originals (UH1/UH2 35, UH3 61). Expanded existing parameterized test titles accidentally interpolated entire locale JSON, causing worker report serialization errors; compact title fixed, no application behavior changed. Four-locale ten-guide interaction test needs 30-second aggregate budget under concurrent suite/browser load; final run passed.
- Browser: **80/80** new guides × four languages × 390/1280, all field jumps and options, previous/next, online note, new-tab sources, reviewed-auto-advance focus, finish/reopen/unmark, no duplicate companion or wizard, no inputs, no horizontal overflow or runtime page errors. **Test-only DEV_MODE response override, not real authenticated access.**
- Global browser: **84/84** visible catalog entries × 390/1280 in BS, covering every previous category and Anerkennung special route; 46 stored entries = 42 visible + four hidden visa entries, eight stored/seven visible categories. Existing guide frames/link presence and navigation controls, no applicant inputs or untranslated key placeholders; previous guides retained their own controls.
- Contrast: **20/20** new-guide width fixtures, tested paragraph/heading/list minimum **7.27:1**. Desktop/mobile screenshot spot-checks inspected; existing outside-guide light host/footer/cookie elements unchanged.
- New links: eleven official PDFs plus BEA and Erreichbarkeit pages all returned HTTP 200 via HEAD, 28.10.2026. Prior-category links checked for HTTPS/presence during rendering, not exhaustive external uptime or portal validation.
- Browser-script failures were investigated: ambiguous nested main on Anerkennung, racing option-list after locale edits, and service-worker bypass in contrast script. Fixed script selectors/test setup; fresh completed runs listed above.
- Preview build telemetry after application/source/test edits: latest build OK (15:03:44 UTC). No manual build invocation or deployment.
- Byte/structural baseline comparisons confirm FormCenter.tsx, ProcedureCompanion.tsx, form-catalog.ts and all pre-existing locale objects unchanged. Existing no-downgrade/Kindergeld/family/arrival/education/docs/career/HA tests passed.

## Exact application/test/document files
- src/lib/guide-first/grundsicherung-model.ts: ten additive slugs and pinned metadata; Navigator unchanged.
- src/lib/guide-first/official-sources.ts: ten source replacements and BA process links.
- src/i18n/locales/{bs,hr,sr,de}/pages.json: only ten guide objects added.
- src/lib/guide-first/formulari-final.test.tsx: new mapping/parity/privacy/interaction checks.
- src/lib/guide-first/guide-first.test.tsx, phase5-guides.test.tsx: verified-source expectations.
- src/lib/guide-first/grundsicherung-companion.test.tsx: compact parameterized title; expanded allowlist implicitly extends existing tests.
- docs/formulari-final-inventory.md, formulari-final-source-inventory.json, formulari-final-field-inventory.json, formulari-final-results.md.
- AGENTS.md: updated scoped source/role safety rule. roadmap.md: completed batch checklist.

## Unresolved exceptions (not missing specialist guides)
All ten requested specialists finished; **zero remaining catalog specialists from this batch**. Native-language human proofreading is still advisable: translations were authored in-session, HR/SR dialects adapted and checked without external translation service; no claim of native editorial certification. Actual signed-in entitlement flow, authenticated BA/BEA portal ordering, exhaustive local form editions and legacy visa guide modernization were not tested/changed. Four visa entries remain hidden but stored/routed; Anerkennung retains its rich separate navigator. Existing legacy guide source files remain, but final ten mount only through new dispatch; no destructive cleanup. Global URL integrity does not certify every prior official source field map or every interactive branch in each prior guide.
