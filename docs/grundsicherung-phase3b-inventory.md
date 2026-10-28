# Grundsicherung Phase 3B — pre-change inventory (28.10.2026)

Four existing routes `/formulari/anlage-ek`, `/formulari/anlage-vm`, `/formulari/anlage-ki`, `/formulari/anlage-wep` and `/hr`, `/sr`, `/de` variants are retained. 46 catalog entries, unchanged category/IDs. Existing LocalizedGuide components (AnlageEKGuideContent, AnlageVMGuideContent, AnlageKIGuideContent, AnlageWEPGuideContent) contain shallow field summaries, outdated VM amounts/2024 advice and KI fixed benefit amounts. Their source files stay; these four presentations are replaced by the existing shared ProcedureCompanion, with source-backed preparation and evidence guidance, no duplicate mount. All other guides stay.

Phase 3A baseline: HA/WBA/KDU plus HA-only Navigator. Only append four slugs/metadata/data to the model; Navigator, ProcedureCompanion implementation and Phase3A locale objects remain byte-equivalent. Existing navigator already links these four routes. No catalog, routes, access, backend, trial, payment, Kindergeld, arrival/family changes.

Live source index checked 28.10.2026: https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden

| Form | Current index URL | Printed edition | Pages | SHA256 prefix |
|---|---|---|---|---|
| EK | https://www.arbeitsagentur.de/datei/anlageek_ba032960.pdf | 10/2026 | 4 | 78218d99991efbfa |
| VM | https://www.arbeitsagentur.de/datei/anlagevm_ba033055.pdf | 10/2026 | 6 | dd0f8cebc3049d45 |
| KI | https://www.arbeitsagentur.de/datei/anlageki_ba033000.pdf | 10/2026 | 5 | 6c7f97165fca5f84 |
| WEP | https://www.arbeitsagentur.de/datei/anlagewep_ba033100.pdf | 10/2026 | 7 | de9e9b6249d88278 |

User search hints refer to different older IDs: not used. All pages extracted with pdftotext -layout and read before mapping. Current PDFs print Grundsicherungsgeld and some historical Bürgergeld questions: preserve original German words exactly; do not silently rename historical questions. Copies only per source. Fields: EK 1–41; VM 1–35; KI 1–54; WEP 1–75.

Important source boundaries: EK title says ab 15, introductory text says über 15; at exactly 15 ask Jobcenter if unclear. EK each applicable person, includes receipts for under15 persons (23). VM entire BG including abroad; no exemptions/amounts promised. KI each child under15, all conditional schooling, health, income questions. WEP other BG person 15+, not all housemates; field13 relationships may direct to signature + HG/VE. Labels and options are short cited official excerpts with original explanations, not hosted copies; redistribution licence not assumed. Originals/hash and extracts confined to /tmp/gs3b. No decryption/filling/generation.
