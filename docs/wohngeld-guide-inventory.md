# Wohngeld guide – source inventory (28.10.2026)

Pre-change state: `/formulari/wohngeld` rendered `WohngeldGuideContent` (BS-only overlays, a blanket "no Bürgergeld/Sozialhilfe" claim, no forms) plus `OfficialNextStep` (`kind: local`). Component file kept; no longer rendered for this slug.

Primary pages (fetched live):
- BayernPortal leistung 978091781416 – "Stand: 02.10.2026"; Mietzuschuss vs Lastenzuschuss; Wohngeldbehörde = Landratsamt/kreisfreie Stadt; usually 12 months, then "ein neuer Antrag"; from 1st of month of application. No separate Folgeantrag form listed.
- verwaltung.bund.de 99107023037000 (BY-24752 / region 09561 and generic location picker) – same text.

Downloaded to /tmp only (`pdfinfo`, sha256 prefix):
| Document | URL (stmb.bayern.de/assets/stmi/wohnen/wohngeld/) | Version | Pages | Encryption | sha256 |
|---|---|---|---|---|---|
| Antrag Mietzuschuss | 35_mz_antrag_bildschirm.pdf | ModDate 20.12.2022 | 8 | AES, print-only, copy:no | 35a760c0c3b4a6ab |
| Antrag Lastenzuschuss | 35_lz_antrag_bildschirm.pdf | ModDate 20.12.2022 | 8 | AES, print-only, copy:no | 7e2577d71316eccd |
| Erläuterungen MZ | 35_mz_erl%C3%A4uterungen.pdf | Stand Januar 2023 | 4 | none | b44bac7772fa7702 |
| Erläuterungen LZ | 35_lz_erl%C3%A4uterungen.pdf | Stand Januar 2023 | 4 | none | b90f46194ca4b43b |
| Nachweise MZ | hinweisblatt_nachweise_f%C3%BCr_mietzuschuss.pdf | StMB 07/2026 | 2 | none | a10ca56ed4e6977f |
| Nachweise LZ | hinweisblatt_nachweise_f%C3%BCr_lastenzuschuss.pdf | StMB 07/2026 | 2 | none | 5fba62de7f38c3c0 |

Decision: both application forms are encrypted with copy restriction. Per project rule (encrypted forms are never decrypted or re-mapped) and the owner's stop condition, exact field/page mapping was STOPPED. Their text was not used; the guide relies on the unencrypted Erläuterungen and Hinweisblätter and explains topics without field numbers. Erläuterungen still say "Bürgergeld" (pre-07/2026 term).
