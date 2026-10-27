# Kindergeld — Phase 1 (2026-10-27), development only, NOT published

## Feasibility check (official form auto-fill)
- Official BA KG1 (`kg1-antrag-kindergeld_ba036550.pdf`) and Anlage Kind (`kg1-anlagekind_ba033765.pdf`) are encrypted XFA forms with "change: no" (verified 2026-10-26, see `src/lib/formularpilot/manifests/kindergeld-kg1.ts`). They are not decrypted, flattened, modified or filled.
- Bundled `public/muster/kg1-antrag-kindergeld-2026.pdf` is a modified derivative (hash differs from official); bundled `kg1-anlage-kind-2026.pdf` is a 9-byte "not found" file. Both files remain on disk (inventory/hash tests pin them) but the Kindergeld page no longer links or fills them.
- Result: **automatic filling of the genuine official KG1/AnK is NOT possible lawfully/technically and is not offered.**

## What users now get on the existing Kindergeld page (`/musterformular/kindergeld`, same route/navigation)
1. An info box with the verified official sources: BA online application start page (BundID), unchanged official KG1 PDF, unchanged official Anlage Kind PDF (one per child), BA forms page (incl. Anlage Ausland / Anlage EU — never auto-selected).
2. "Kindergeld Asistent" (deterministic, no AI): situation (partner? cross-border?) → applicant → partner (skipped if none) → children (1–5) → bank → review. Inputs validated (required fields, dates not in future, 11-digit Steuer-ID, German PLZ, IBAN checksum).
3. Review shows required documents (1× KG1 + n× Anlage Kind) and warns that cross-border cases and children aged 18+ are NOT fully covered, with official links.
4. Download: "BalkanLink Ausfüllhilfe / Datenblatt" PDF, generated in the browser, marked "NICHT AMTLICH", German labels + user values (Unicode via bundled hash-pinned Liberation Sans), for transfer into the official application. The user signs and submits the official application personally; nothing is sent.
5. Removed: green "1:1 originalni Familienkasse PDF" claim and the button that filled the unverified derivative; the blank-form link now points to the official BA URL; broken `familienkasse-finden` link (404) dropped.

## Data/privacy
- Asistent edits the existing page state (same `kg1-muster-data` keys); it adds no storage writes — saving still happens only via the existing explicit Save button. Flags (partner/cross-border) live only in component memory.
- No network calls except loading the bundled font file; no backend, no AI.

## Tests
- `src/lib/kindergeld-assistant/datenblatt.test.ts` — provenance vs manifest, KG1 stays blocked, page doesn't use bundled files, validation (empty/invalid), multiple children, cross-border/adult branching, Unicode PDF sheet, determinism, font hash refusal, no storage/network, 4-locale key parity, legacy 1:1 claims removed.
- `src/components/kindergeld/KindergeldAssistent.test.tsx` — official link, step gating, partner skip, cross-border note.

## Not done / remaining blockers
- Genuine official KG1/AnK auto-fill: blocked (encryption/XFA, publisher restriction). Would need a BA-provided fillable edition or interface + rights + golden tests.
- Adult children (18+) and cross-border cases: only flagged, not mapped.
- More than 5 children: user is sent to the official form.
- Postal address of the competent Familienkasse: not provided (no verified registry).
- Signed-in E2E and paywall interaction in a real session not tested; legacy manual form below the Asistent is unchanged.
- Hosting rights for the bundled derivative files still unresolved (files untouched).
