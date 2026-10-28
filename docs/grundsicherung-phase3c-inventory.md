# Grundsicherung Phase 3C — source and pre-change inventory

Checked 28.10.2026 against the live BA SGB II downloads index:
https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden

Existing slugs only: anlage-eks, anlage-sv, anlage-bb, anlage-ve. FormCenter already has these routes with shallow legacy guide components. Extend the existing Grundsicherung allowlist and locale data; the earlier branch automatically renders ProcedureCompanion. Do not edit FormCenter, catalog, navigator logic, other guide data, access or backend. SGB XII grundsicherung is unrelated and untouched.

| Form | Exact live-index URL | Printed edition | Pages | Copy restrictions | SHA256 |
|---|---|---|---|---|---|
| EKS | https://www.arbeitsagentur.de/datei/anlageeks_ba033540.pdf | 10/2026 | 9 | Not encrypted; no PDF copy permission restriction reported | c1cac86eb8632d52eb87169402b080bc0f6fcbb1ad5606fc138ad9419df35fcd |
| SV | https://www.arbeitsagentur.de/datei/anlagesv_ba033005.pdf | 10/2026 | 2 | Not encrypted; no PDF copy permission restriction reported | c24b142bf60865018067a018413dbfbc39a0a009de1a48891bb3ef57364dd7ab |
| BB | https://www.arbeitsagentur.de/datei/anlagebb_ba032985.pdf | 10/2026 | 2 | Not encrypted; no PDF copy permission restriction reported | 7f113da78445bc9ef48cf5d0853c3aea474b169ae6aad436cc8f4edcdc6c4cc1 |
| VE | https://www.arbeitsagentur.de/datei/anlageve_ba033130.pdf | 10/2026 | 2 | Not encrypted; no PDF copy permission restriction reported | acd507c0efa4e563f26f79f3602c7adccaa10641f0fcf0f07124ce8648964b10 |

Metadata creation/modification dates are July 2026, not the printed edition: EKS 21/22 July; SV 21/22 July; BB 21/22 July; VE 22/24 July. Printed footer 10/2026 is the mapped edition. PDF 1.7, tagged AcroForm, no JavaScript; no decryption or flattening. Full layout-preserving pdftotext extracts are in /tmp/phase3c/{eks,sv,bb,ve}.txt; originals and rendered pages remain under /tmp, not served/redistributed. All 15 pages extracted before mapping.

EKS official supplementary instructions, linked by the same index: https://www.arbeitsagentur.de/datei/hinweis-selbstaendige_ba033025.pdf (10/2026, 6 pages, unencrypted). Read all pages. No tax-profit equivalence or blanket deductibility claim; actual cash receipts/payments and documented forecasts are distinct. Loan-financed purchases require the specific notes; no automatic deduction calculator. Vehicle table prints 50% business-use distinction and 0.10 EUR rows, preserved as original instructions, not legal advice.

Field inventory: EKS 1–60 plus all rows of tables A/B1/B2/B3/C; SV 1–16; BB 1–18 and five timing options; VE 1–17 and five distinct yes/no questions. Applicant A and subject B remain separate. VE text is a fact-review request, not a partnership verdict; objections in C remain available. BB is not every Mehrbedarf or an eligibility guarantee. SV conditional question 11 is not an automatic insurance decision.

Source/licence: Bundesagentur für Arbeit official originals. Only necessary short field-label/option excerpts with attribution and independently authored explanations are used; no blanket redistribution licence or compliance claim. Original documents request evidence copies. No applicant documents are downloaded, captured, stored or transmitted.

Remaining specialist forms outside this batch: HG, MEB, UF, SE, UH1, UH2, UH3 (and non-annex Nichterreichbarkeit/Antragsrücknahme); their actual current editions remain unaudited here.
