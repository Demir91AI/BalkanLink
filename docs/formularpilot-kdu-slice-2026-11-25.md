# FormularPilot 01.02 — Anlage KDU vertical slice (2026-11-25, dev only, not wired)

## Source verification (2026-11-25)
- URL: https://www.arbeitsagentur.de/datei/anlagekdu_ba032980.pdf (index: downloads-arbeitslos-arbeit-finden). HTTP 200, application/pdf.
- SHA-256 c451fabb6f3110d6a2640c1fd380d203d93f9b226d2f588f3bf4ab276c90ee20 (matches 2026-10-28 prefix). Footer "Jobcenter-KDU - 10/2026", 3 pages, AcroForm, not encrypted, no /XFA, 77 fields (54 text incl. 2 signature dates, 20+ checkboxes, 3 ja/nein radios). No signature widgets.
- Bundled `public/muster/bg-anlage-kdu-2026.pdf` hash 68ce4d99… ≠ original → never used.
- No Access-Control-Allow-Origin → browser cannot fetch directly; no proxy/hosting. User downloads the original and selects it locally.

## Rights (UNRESOLVED — production blocked)
BA imprint: content is "zur Information frei zugänglich"; copying/distribution/use in own works needs prior BA permission; storage/processing in electronic systems only with source attribution. We never copy or distribute the PDF, but whether filling a user's own copy in-browser (and offering it in a paid membership) is permitted is open. Owner/legal review or written BA confirmation required. `KDU_PRODUCTION_ENABLED = false`.

## Implementation
- `src/lib/formularpilot/forms/anlage-kdu.ts`: full-hash edition gate, all 77 native names/types, conditional validation (Miete/Eigentum, Pauschalmiete exclusive, dezentral Warmwasser, Sonstiges texts, landlord + IBAN mod-97 only when direct payment), deterministic mapping, glyph/width check, no flatten, no ignoreEncryption on fill, signature dates never filled, full read-back of every field + field count.
- `src/components/formularpilot/KduPilotPanel.tsx`: four-language intake → check → download, memory-only, no network except same-origin bundled font.
- Wiring: NOT wired. `src/test/phase1/no-downgrade.test.ts` pins "FormularPilot stays unwired from live pages"; changing it needs owner approval. Proposed wiring: lazy panel under the anlage-kdu ProcedureCompanion behind `isKduPilotEnabled()` (DEV && VITE_FORMULARPILOT_KDU=true).

## Evidence
- Authentic original: both synthetic cases (Miete + Eigentum) filled and read back; rendered to PNG at 60 dpi, layout preserved, signature boxes empty.
- Tests: anlage-kdu 14 + panel 3 (authentic cases run only with KDU_ORIGINAL_PDF set). Full suite 1752 passed / 2 skipped (authentic-only). Typecheck clean.
