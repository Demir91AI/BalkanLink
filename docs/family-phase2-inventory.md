# Family Phase 2 — inventory and decisions (27.10.2026)

Scope: Formulari › Porodica i djeca, five items. **Kindergeld untouched** (UI, locale, links, route).
All routes stay `/formulari/<slug>` (+ /hr /sr /de); category access gate unchanged (signed-out users still see the existing gate).

| Slug | Previous content | Type | Official sources (checked 27.10.2026) | Decision |
|---|---|---|---|---|
| elterngeld | ElterngeldGuideContent (kept below) | State-specific form / ElterngeldDigital | Familienportal "Wie kann ich Elterngeld beantragen?" (after birth, ≤3 Lebensmonate retroactive, Elterngeldstelle of child's residence); ElterngeldDigital | Procedure + verified terminology; **no field mapping** (16 different state forms) |
| mutterschaftsgeld | MutterschaftsgeldGuideContent (kept below) | Krankenkasse-specific / BAS | Familienportal GKV page; Familienportal BAS page (max 210 € total); mutterschaftsgeld.de | Memory-only route gate GKV / BAS / unsure; branches never mixed; no field mapping |
| kinderzuschlag | KinderzuschlagGuideContent (kept below) | Uniform federal PDF + online | BA forms page; PDFs KiZ 1 (Stand 09/2024, sha256 79b45232…), KiZ 1-AnK (Stand 07/2026, 67fd9379…), KiZ 1-AnA (Stand 07/2026, 29663777…), KiZ 1-H | **Exact field mapping**: 18 terms, each with sheet/page/point reference read from the PDF text; all Familienstand, AnK situation/income and AnA housing choices listed |
| krippengeld-bayern | KrippengeldBayernGuideContent — **no longer rendered** (claimed all children 1–3; file kept) | ZBFS online/paper | ZBFS Krippengeld page ("vor dem 01.01.2025 geboren", instructions "bis 31.12.2024"); Papierantrag page | Prominent dated birth-date gate; no entitlement promise, no amounts; catalog teaser corrected |
| wirtschaftliche-jugendhilfe | WirtschaftlicheJugendhilfeGuideContent (kept below) | Municipal Jugendamt | Verwaltungsportal Leistung 99107007010000 (JS page, not machine-verified → no "verified" date) | Procedure + terminology; explicit "no nationwide form" |

Implementation: shared `ProcedureCompanion` (Phase 1) extended with optional `gate`, `vocabularyNote` and per-term `reference`; content in `familyCompanions` of all four `pages.json`. No inputs, storage, PDF filling or submission.

Limits: HR/SR/DE produced by machine translation from the BS master and structure-checked, not native-proofread. Elterngeld/Mutterschaftsgeld/WJH field positions vary and are intentionally not mapped. Signed-in member view checked only with the test-access fixture.
