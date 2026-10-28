# Phase 01 reliability — 28 October 2026

## Scope and activation
Only owner-approved Phase 01. No Core/Knowledge/Cases/Legal Watch, redesign, packages, database migrations, RLS/configuration changes, billing, quota, legal, trainer or audio edits. No live user records were created, modified or deleted. No function deployment or website publication occurred.

Frontend changes are available in the local preview only. Server changes are staged source and do not affect the shared hosted backend. Changes to the shared usage helper affect its callers only on a future explicitly approved deployment; TTS/trainer sources remain untouched.

## Changes
- Usage commit/release retain `Promise<void>` and missing-reservation no-op compatibility; RPC errors and anything other than boolean true now throw. Stream settlement failure reaches the reader, cancellation still cancels upstream, and an attempted failed commit is never compensated by release. Document-check follows the same uncertain-commit rule.
- Chat reads all history through timestamp/id keyset pages until an empty page, including provider caps smaller than 500. Failed/partial restoration is not treated as empty cloud history. Manual delete waits for cloud confirmation before clearing local history or displaying success; failures retain the conversation. Sign-out deletion policy is unchanged; its log no longer claims confirmed cloud deletion.
- Unsubscribe suppresses first and conditionally marks a token second. POST repairs tokens consumed by the old implementation; GET verifies suppression before calling an old used token already-unsubscribed. Client POST requires `success:true`, not HTTP 200 alone. No new RPC or transaction/migration.
- PDF notification invocation requires `success:true, queued:true`. Legacy `notified_at` remains an enqueue marker for compatibility and is documented as such; new response fields distinguish `notification_queued` from unknown delivery. No worker/retry/marketing configuration changes.
- Admin uses all-settled RPC results, preserves successful sections, flags partial refresh and advances last full refresh time only for four successful non-null responses. Ref guards prevent overlap and stale closure timestamps.
- Signup trigger still owns profile creation. Without a returned auth session, client profile write is deferred and `first_name` remains in existing auth metadata; with a session, the id-conflict upsert is checked and failures warn without inviting repeat signup. Existing trial paths untouched.

## Explicit blockers
- Legacy recordQuery remains unchanged: chat_usage is still read by historical admin RPCs and no server-only replacement/report migration was authorized. Tests pin this compatibility. Removing it frontend-only would change metrics while leaving deployed ledger behavior unknown.
- The deployed signup trigger does not persist first_name. Sessionless profile-name persistence after confirmation/login needs a separately approved lifecycle fix; this phase avoids a predictably unauthenticated profile write and does not claim the field was saved to the database.
- Historical sign-out cloud deletion can fail after auth teardown; policy was not changed. No claim of cross-device real-account deletion verification.
- Existing PDF metadata changes can be consumed before an enqueue failure is retried. Reliable durable notification retries need a separate approved change; no monitor/form behavior rewrite here.
- Email-domain read-only check reported failed provisioning/DNS synchronization with an upstream response parsing error. No DNS, domain or Cloud setup changes made; real delivery unverified.
- Existing global i18n validator exits 1 on pre-existing keys outside this scope, including Schufa gate and trainer speed plus admin plus-namespace keys. New reliability keys exist in all four common locales. No unrelated translations edited.

## Verification
- Focused Vitest: 5 files, 117 tests passed.
- Full Vitest (`--maxWorkers=2`): 51 files, 1441 tests passed, 99.54 seconds.
- Last observed automatic preview compilation signal: build OK, 20:32:25 UTC. Manual build/typecheck commands not run under harness rules; no separate typecheck result asserted.
- Isolated Playwright against localhost, all backend traffic fulfilled: BS/HR/SR/DE at 1280x1800. Each restored marker 507, retained it after failed delete, then removed it after confirmed delete, no page errors. No live account/data calls.
- Isolated unsubscribe HTTP 200 with success:false displayed error rather than success.
- Isolated sessionless signup: one signup request, zero profile writes, navigation to login, no page errors. Only synthetic mocks used.
- Pure tests cover 1207 history records/equal timestamps, smaller server page caps, failed second page/stalled cursor, pending deletion, RPC error/false/null settlement, uncertain commit, unsubscribe partial failures/concurrency, queue acceptance, partial admin responses, and signup write errors.
- Real authenticated Cloud settlement, real deletion, real email delivery, and admin browser partial-error matrix remain unverified; no production action authorized.

## Changed source files
`src/components/ChatAssistant.tsx`, `src/pages/admin/AdminDashboard.tsx`, `src/pages/Register.tsx`, `src/pages/Unsubscribe.tsx`, four `src/i18n/locales/{bs,hr,sr,de}/common.json`, `src/lib/phase1-reliability/{history,admin-refresh,signup-profile,unsubscribe-response}.ts`, `src/lib/phase1-reliability/reliability.test.ts`, `src/lib/usage-metering.test.ts`, `src/lib/document-check/document-check.test.ts`, `supabase/functions/_shared/{usage,email-enqueue}.ts`, `supabase/functions/document-check/pipeline.ts`, `supabase/functions/handle-email-unsubscribe/{index,recovery}.ts`, `supabase/functions/check-pdf-versions/index.ts`, `AGENTS.md`, `roadmap.md`, and this report.