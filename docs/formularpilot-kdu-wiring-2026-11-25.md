# FormularPilot KdU — dev-only wiring (2026-11-25)

Owner-approved: KduPilotPanel is shown only inside the existing Anlage KdU guide (`/formulari/anlage-kdu`, Grundsicherung ProcedureCompanion branch) when `import.meta.env.DEV && VITE_FORMULARPILOT_KDU === "true"`. Lazy import; production build compiles it out. `KDU_PRODUCTION_ENABLED` stays `false`. Access gate unchanged (guide still members-only).

Pinned guard (`src/test/phase1/no-downgrade.test.ts`): hubs still have no static formularpilot imports; FormCenter may reference exactly `@/components/formularpilot/KduPilotPanel` via the DEV+flag lazy expression, rendered exactly once in the anlage-kdu branch; other hubs none; production switch must be `false`.

## Results
- Browser (isolated; backend mocked offline, synthetic member session, all non-localhost aborted): 16/16 — BS/HR/SR/DE × 390/1280 × Miete/Eigentum, authentic original 10/2026 (local copy, not bundled). Each: "no PDF" block, validation errors (missing amount / missing Warmwasser / invalid IBAN), review OK, download.
- Read-back (pypdf) 16/16: 77 native fields, values match, signature date fields empty, not encrypted, no XFA. Rendered pages: layout preserved.
- Privacy: 0 requests carrying synthetic data; no answers in local/session storage, no IndexedDB, no caches.
- Default dev (no flag): panel absent, guide present. Production build with flag set: no KduPilotPanel chunk/code (only locale strings).
- Vitest 1,753 passed / 2 skipped (authentic-only); typecheck clean.

## Blockers
BA rights for copying/distribution unresolved; no publish/deploy. Real signed-in member session not tested (mock only).
