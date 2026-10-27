# Task-to-output phase 1 — development only

## Delivered
- Compact entry in Vorlagen listing and completed DokumentenCheck results; no routes replaced or added. New entries return null in production builds.
- Four purposes: documents, extension, factual statement, appeal. Appeals require user-confirmed remedy (Widerspruch or Einspruch), notice date, factual grounds and legal-instruction review. No default remedy, guessed deadline or invented facts.
- Purpose → fields → explicit review → editable German correspondence → real PDF download/copy. Editing invalidates final confirmation. Sender/recipient/reference blanks omitted; user reminded to complete before sending.
- Only component-state drafts, destroyed on dialog close. No new persistence, uploads, external processing, logs, sending or appointments. Only local provenance-recorded font fetch for PDF export.
- Familienkasse links shown only after user confirmation. No guessed postal address and no official Antrag generation, KG1 modification or FormularPilot integration.
- DokumentenCheck headline no longer extracts the first date from analysis as a deadline; it always tells users to verify the original letter. Full existing analysis preserved.

## Changed files
- `src/components/letter-reply/LetterReplyTask.tsx`
- `src/lib/letter-reply/model.ts`, `pdf.ts`, `model.test.ts`
- `src/i18n/locales/{bs,hr,sr,de}/reply.json`
- `src/i18n/index.ts`
- `src/pages/Vorlagen.tsx`, `src/pages/DokumentenCheck.tsx`
- `AGENTS.md`, `roadmap.md`, this report

## Verification
- `bunx vitest run`: 749 tests passed in 17 files, including all Phase1 invariants and 12 new renderer/validator/PDF/privacy/integration checks. (Current suite count exceeds the prior 729 baseline.)
- Harness TypeScript/build: latest build OK after fixing introduced translation return type. No manual build/typecheck invocation.
- `bun run scripts/validate-i18n.mjs --warn`: existing project-wide missing keys remain outside scope; all new reply keys match in four languages, tested.
- Browser: actual signed-out Vorlagen entry routes to existing `/paketi`, preserving access. Managed login could not be minted: requesting owner has no matching app auth account; did not select another user.
- Isolated mounted UI fixture with `canAccess=true` (not an authenticated host verification): purpose → fields → review → editable output → real downloaded PDF passed. Desktop 1280×1800 and mobile 390×844, no horizontal overflow or runtime errors. PDF text extraction confirms exact `Maja Čičak Đurić` and attachment; local font renders BHS diacritics. Fixture/scripts/screenshots/PDF kept under `/tmp/browser/letter-reply`, not app code.

## Limits / before release
- Authenticated host end-to-end and real completed DocumentenCheck result CTA still require owner's app session. No new paid analysis was triggered.
- Deterministic German phrasing only. User facts must be supplied in German; no automatic translation, factual verification or spell-check guarantee (browser German spellcheck requested). Human/lawyer content review before release, especially appeals.
- No legal sufficiency, approval, deadline calculation or accepted submission-channel guarantee. Extension request does not itself extend a deadline. Official links are owner's supplied BA page and established BA family landing, not a universal appeal portal.
- Attachment checklist mirrors user-provided list, not automatic completeness verification. Returning to prior questionnaire steps and regenerating replaces manual final-text edits. Draft disappears on close; downloads/clipboard remain under user control.
- Existing licensed pdf-lib + @pdf-lib/fontkit and locally bundled unmodified Liberation Sans 2.1.5 (OFL-1.1; existing LICENSE/NOTICE) reused. New correspondence wording is original, not copied official/protected text. No packages or third-party assets added.
- No publish/deploy, production DB writes, Stripe/auth/access changes, legal-page edits, storage deletion, badges or official form changes. This is not a blanket compliance claim.
