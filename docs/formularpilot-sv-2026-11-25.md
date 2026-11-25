# FormularPilot 01.06 — Anlage SV 10/2026 (dev-only)

- Source: https://www.arbeitsagentur.de/datei/anlagesv_ba033005.pdf, footer "Jobcenter-SV - 10/2026", SHA-256 c24b142bf60865018067a018413dbfbc39a0a009de1a48891bb3ef57364dd7ab, 2 pages, AcroForm, not encrypted, no XFA, 14 native fields (9 text, 5 radio). `rbtnKVPVZuschuss` "ja" export value is a full sentence; mapped exactly.
- Rules from printed form: Q8–10 required; Q11 only if person B has completed 55 (on fill date), else blank; Q12/section D only if any Q8–11 = ja (conservative: all-nein → compulsory GKV note, D blank). Signature dates never filled.
- Files: `src/lib/formularpilot/forms/anlage-sv.ts`, `src/components/formularpilot/SvPilotPanel.tsx`, `svPilot` keys in 4 locales, FormCenter dev-only lazy wiring (`DEV && VITE_FORMULARPILOT_SV==="true"`), guard exception in `src/test/phase1/no-downgrade.test.ts`, `SV_PRODUCTION_ENABLED=false`.
- Tests: 13 SV unit (incl. 3 authentic fills + modified-original block); full suite 1,779/1,779 with local originals; typecheck clean; production build with both flags contains no SV pilot code.
- Browser (isolated, backend mocked, synthetic member): 8/8 BS/HR/SR/DE × 390/1280; no-PDF block, validation block, 55+ Q11 shown, all-nein note hides D, review, download; 0 data-bearing requests, 0 unexpected requests, nothing in storage, no overflow. Downloaded PDFs 8/8 read back correctly (14 fields, signature dates empty, no encryption/XFA); page render layout preserved.
- Blocker: BA rights unresolved; no publish.
