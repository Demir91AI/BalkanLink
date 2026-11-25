# FormularPilot 01.05 — strict engine extraction + next BA candidate (2026-11-25)

## Extraction
- New `src/lib/formularpilot/engine/strict-acroform.ts`: `fillStrictAcroForm(spec, bytes, fills, opts)` (preflight hash/native fields, no encryption/XFA, edition gate, mapping/neverFill guard, exact radio option set + per-fill radio value check, glyph/width check, fill, full read-back + field count, never flatten), shared validators (`ibanValidDE`, `isoDateValid`, `isoToDe`, `RX`, `blank`) and `isPilotEnabled`.
- `forms/anlage-kdu.ts` delegates to the engine; exported API, block codes, field schema, edition and `KDU_PRODUCTION_ENABLED=false` unchanged. Only addition: radio fill values must be one of the original's options (already guaranteed by validation).
- Tests: engine 6 new; FormularPilot/phase1 145/145 incl. authentic KdU original (local copy via `KDU_ORIGINAL_PDF`, hash c451fabb…); full suite 1,761 passed / 2 skipped (authentic-only); typecheck clean.

## Candidate inventory (official URLs, downloaded to /tmp only, 2026-11-25)
All 15 BA Anlagen: AcroForm, not encrypted, no /XFA. Native field counts: SV 14, VE 15, HG 22, BB 25, SE 33, MEB 38, UH1 41, UH2 41, KI 63, UH3 66, EK 68, WEP 104, UF 157, VM 196, EKS 358.

**Recommended next: Anlage SV 10/2026** — https://www.arbeitsagentur.de/datei/anlagesv_ba033005.pdf, SHA-256 `c24b142bf60865018067a018413dbfbc39a0a009de1a48891bb3ef57364dd7ab` (equals 2026-10-28 inventory), 2 pages, 14 fields: 9 text (person, BG member, 2 signature dates = neverFill), 5 radios ja|nein; `rbtnKVPVZuschuss` "ja" export value is a long sentence — map exactly, never guess. Runner-up VE (15 fields, Verantwortungs-/Einstehensgemeinschaft; sensitive relationship questions).

Not implemented. Rights: BA imprint reserves copying/distribution — unresolved; production stays hard-disabled; user supplies original locally; no bundling/proxy.
