# Asistent — bounded performance/reliability step

## Scope and profiling
Read both prior assistant reports, ChatAssistant, actual chat handler, usage helper, guide tests and existing regression contracts. Read-only secondary review helped inspect the server path; no new application agent was added. All work is source-only and isolated, without hosted requests or account/data/configuration changes.

Findings: community search ran before quota gating and before deterministic source replies; the immutable catalog was rebuilt per prompt; React's loading guard was set after awaited recordQuery, permitting same-tick overlapping sends; SSE DONE exited only the inner loop; malformed events could repeatedly poison the buffer; bare EOF and provider errors could be treated as success; a queued animation frame could run after stream failure. Gateway fetch rejection after reservation had no release path. Full prompt trimming would require broader factual/safety review, so no prompt instructions or conversation messages were removed.

## Changes and isolated before/after measurements
| Scenario | Before | After | Evidence |
| --- | --- | --- | --- |
| Community-search RPC per supported guide request | 1 | 0 | Actual handler, reconstructed pre-change placement versus current placement |
| Community-search RPC per usage-gated unknown request | 1 | 0 | Same harness; reservation still exactly once |
| Community-search RPC per allowed unknown request | 1 | 1 | Context lookup retained, not limited to guessed business intent |
| Catalog map/join for two prompt builds in one worker | 2 | 1 | Executed original helper versus current helper; output byte equality |
| Same-tick duplicate text-send preflight calls | 2 | 1 | Isolated old async loading pattern versus synchronous lock |
| SSE open tail after complete DONE event | Additional read waits for EOF | Returns and cancels tail | Open-ended controlled stream test |

These are deterministic operation counts, not hosted latency or token/cost benchmarks. Model prompt payload and conversation equality are asserted against the pre-change lookup-placement harness. Static catalog bytes are additionally compared against the original formatter. Model remains `google/gemini-2.5-flash`, streaming enabled, max_tokens 1024. No token, price, quota, membership or model changes. No claimed percent latency improvement; real time-to-first-token, throughput, memory, tokens and monetary savings **were not measured**.

The existing service-role client is reused for the unchanged search RPC, avoiding a third per-request client. Page context is constructed only on the model path. Network rejection before a response now releases the existing reservation once and returns the existing generic error; no automatic retry. HTTP rejection settlement, stream settlement helper and all accounting policy remain unchanged.

The per-mounted-chat memory-only lock covers text and file sends before their asynchronous preflight, and releases in cleanup. No persistent dedupe identifiers, cross-device dedupe, server idempotency or new storage. Explicit later retries still work and may count as new replies. recordQuery itself and existing history persistence remain untouched.

The shared frontend SSE reader handles chunk/UTF-8 boundaries, requires DONE, surfaces malformed/provider/interrupted streams through the existing error presentation, and retains partial text. Pending render frames are cancelled before final partial flush so they cannot overwrite an appended error. Both existing upload and text stream callers use this reader. No UI redesign, new labels, selectors or translations; existing BS/HR/SR/DE content is unchanged.

## Actual verification
- Existing focused regressions after implementation: 138/138 passed.
- Final focused suite: **158 tests /5 files passed**, including 20 new transport/handler checks. Coverage includes duplicate requests, lock recovery, BS/HR/SR/DE Unicode, incomplete/erroneous/malformed streams, DONE without EOF, slow headers/chunks, unknown topic/source non-invention, exact prompt/model/token preservation, search counts, reserve/commit/release, failed release and no retries. Slow responses use deferred controlled promises, not a live timing benchmark.
- First full run: 1,549 passed, two existing Kindergeld UI cases timed out under default parallelism. No test expectations or global timeout were changed.
- Rerun with `bunx vitest run --maxWorkers=2`: **1,551 tests /55 files passed**. Includes unrelated legacy gate, routes, guide/PDF, entitlement and reliability regressions.
- Latest automatic preview validation: **build OK**, 28.10.2026 22:58:01 UTC. No manual application build/typecheck.
- Tests execute the actual staged handler with fictional auth/RPC/model transport and separately exercise the frontend's imported lock/reader. No real-account/hosted/browser E2E was performed or claimed. No live gateway logs or user content were read.

## Limits deliberately retained
- No new timeout threshold: a genuinely silent upstream without DONE/error can still wait; introducing a cutoff could truncate slow valid answers. Existing no-auto-retry behavior retained to avoid duplicate reservations and model calls.
- Shared meterStream retains its legacy partial upstream-error release policy, unlike its post-content cancellation commit policy. Changing this would change accounting and shared document/trainer callers, outside the approved narrow scope. Existing byte-based settlement and uncertain commit behavior remain tested, not redefined.
- Large legacy prompts, overlapping instructions, unrelated legacy source assertions and general BS/DE selector remain as before; blanket prompt compression/freshness claims would be unsafe. Recorded official-source dates were not refreshed.
- Server-side retries/idempotency, hung RPC recovery and real Cloud settlement concurrency remain unverified. Cleanup errors are not newly exposed as user-content logs.

## Files and activation boundary
Changed: `src/components/ChatAssistant.tsx`, `src/lib/assistant-stream.ts`, `src/lib/assistant-stream.test.ts`, `src/lib/assistant-guides.test.ts`, `supabase/functions/chat-assistant/index.ts`, `AGENTS.md`, `roadmap.md`, this report.

Frontend lock/reader are local preview code. Server lookup/cache/rejection changes are **not active in hosted Preview or production**, which still share the unchanged deployed function. Activation requires separately approved Edge deployment and release; none attempted. No publish, Edge deploy, migration, Cloud setting/data mutation, Stripe/membership/pricing/quota, ElevenLabs/DeutschTrainer or DNS changes. Stopped after this scope.