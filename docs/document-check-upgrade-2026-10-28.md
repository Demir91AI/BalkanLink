# DokumentenCheck — scoped upgrade, 2026-10-28

## Release status
Source/preview changes only. No deployment, publication, schema/RLS/database changes, Stripe changes, account edits or quota/price changes. The shared production backend still runs its previous endpoint. Until a separately approved backend deployment, the page preserves older markdown output verbatim in a collapsible section with an explicit compatibility warning; no summary/deadline/amount is inferred from that text. Its language cannot be corrected by frontend code alone.

## Before / after
- Before: 763-line page, obsolete premium hook, duplicated membership panels, moving document examples, fabricated illustrative reminder consequences, mandatory eleven-section Bosnian markdown with emoji/heading/amount extraction.
- After: concise upload/list/delete/consent/error flow; shared central entitlement hook plus unchanged preview flag; no client quota enforcement. Short structured summary, quoted demands/deadlines, money only if present, recommendations and collapsible detailed explanation/risks/uncertainty/upload citations. Generic existing `/formulari` guide route only; chat opens with an empty event and receives no document/summary.
- JSON object keys are language-independent; explicit bs/hr/sr/de language validation. Required wire schema and local defensive parsing; invalid JSON fails closed, no model retry or invented fallback. Legacy text compatibility is explicitly separate.
- Deadline quotes remain verbatim; no statutory calculation, urgency/emoji inference or confidence percentages. Evidence references outside the supplied file/page bounds are discarded; uncorroborated claims lose confirmation.
- Server accepts 10 files, 25 MiB decoded total, 36 MiB actual transport body, 30 pages/images. Client matches those bounds; whole selections rejected instead of truncating. Base64, magic-byte/MIME matching and PDF load/page/encryption checks precede reservation/model calls. Existing text/single-file server request shapes remain supported. PDFs use the documented file content part, not image_url.
- Images are not downscaled lossily; small print is preserved. PNG/JPEG/WebP/PDF supported; HEIC/HEIF explicitly rejected with export instructions. Filenames are not transmitted.
- No request/provider-content logging, file storage, analysis database storage or automatic institutional forwarding was added. Consent describes external transfer; no guaranteed immediate deletion claim. Provider retention and actual legacy endpoint behavior remain release-review topics.
- Server reserve/commit/release logic stays on existing helpers and unchanged rules. Denied reservations cause zero model calls; unreadable/invalid/provider failures release reservations. Distinct access/quota/rate/credits/unreadable/size/parse/server messages and server reset timing.

## Exact changed/new files
- `src/pages/DokumentenCheck.tsx`
- `src/lib/document-check/model.ts` (new)
- `src/lib/document-check/document-check.test.ts` (new)
- `supabase/functions/document-check/index.ts`
- `supabase/functions/document-check/contract.ts` (new; pure server/client boundary)
- `supabase/functions/document-check/pipeline.ts` (new; testable generation/settlement/SSE)
- `src/i18n/locales/{bs,hr,sr,de}/pages.json` (DokumentenCheck keys only)
- `src/test/phase1/no-downgrade.test.ts` (narrow owner-authorized import-removal exception only; baseline.json untouched; all other protections remain)
- `AGENTS.md`, `roadmap.md`, this report; project memory replaces obsolete eleven-section requirement.

## Verification
- Focused: 85/85 (34 new contract/pipeline tests, entitlement/metering and route/no-downgrade protections).
- Full Vitest: 50 files, 1404/1404 passed, two workers.
- Automatic preview build/type validation: build OK after correcting scoped type/JSX errors. No manual build/typecheck invoked, per environment requirements.
- Eight isolated browser flows: bs/hr/sr/de × 390/1280, trial mock, two attachments, consent, structured result, expandable details, money omitted when absent, four distinct errors, free mock prevented another function call. Zero page errors, no horizontal overflow. All backend requests intercepted; no real account login/changes.
- Screenshots reviewed; first run revealed dark canvas/light-root token mismatch. Fixed by reusing the existing scoped dark semantic-token surface, without global styling changes; final screenshots legible. Both global theme states share the intentional page-specific navy surface.
- One bounded real gateway request, fictional two-page PDF, unchanged existing model/endpoint/max_tokens/temperature, strict schema + SSE: HTTP 200, German output passed parser, one deadline/amount and two sources. No user data, endpoint deployment or database quota record used. This request incurred normal gateway usage; no batch or new service.

## Remaining limitations / risks
1. New backend source not deployed; authenticated hosted end-to-end and real atomic reservation lifecycle are NOT verified. Unit dependency-injected reservation tests are not database integration tests.
2. A matching quote/source emitted by the same model is not independent OCR verification. File/page bounds are verified; exact real-document citation accuracy and legal correctness require human review. No legal/mastery/accuracy guarantees.
3. The current preserved `google/gemini-2.5-flash` appears in the authenticated catalog as deprecated (expiry timestamp 1792454400); model migration was not authorized and was not performed. Plan replacement before availability ends.
4. Gateway leg streams, but browser function response remains final JSON. Hosted timeout/cancellation/commit delivery edge cases need deployment-stage testing. No timeout retries were added. Provider refusal is terminal per request; there are no background jobs/retries to pause.
5. MIME magic checks do not constitute malware scanning. Image decode integrity remains additionally checked by the provider; no new OCR/scanner service. Mobile camera HEIC and real iOS/Android hardware were not tested.
6. PDF count/load tests and one live two-page PDF passed; protected/damaged PDFs are rejected, not decrypted. Very large real-world scans and payload behavior on hosted infrastructure remain untested.
7. New result language schema rejects mismatched language codes, not every possible wrong-language sentence. Native proofreading and representative real correspondence across all four languages remain needed.
8. Repeated manual analyses remain distinct requests under the existing quota helper; no new persistent idempotency ledger or rules were introduced.
9. All guide links intentionally stay generic because independent deterministic classification was not established. The global header/footer/cookie UI and their existing copy remain outside scope.

Skills used for the request contract: ai-apps-multimodal-input and ai-apps-gateway-sdk.
