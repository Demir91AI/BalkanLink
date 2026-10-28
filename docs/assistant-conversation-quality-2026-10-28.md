# Assistant conversational guidance — limited source-only step

## Implemented
Read the first-step report, current server/client, adapter, source workflows, catalogs and gates. No new agent or catalog, no UI redesign and no ChatAssistant edits in this step.

- Initial supported replies select three existing numbered preparation/official-procedure/submission steps, rather than dump the full workflow. Kindergeld includes existing parent/child Steuer-ID guidance, conditional evidence, account preparation, BA eServices, and the user's paper signatures/submission checks. All seven original steps remain available on explicit “svi koraci” / “alle Schritte”.
- A generic Kindergeld request asks one non-sensitive case distinction. An already specified newborn does not get the same question. Adult or foreign-country cases use the existing translated special-case note and matching official BA link, never newborn steps.
- A short allowlisted continuation (“Dokumenti”, “portal”, “predaja”, translated equivalents, or short case answer) can retain an established topic. Preparation/submission follow-ups select only relevant existing steps. Explicit topic switches win; arbitrary, unknown and ambiguous questions do not inherit a guide. Only the current topic segment supplies context, not earlier unrelated personal facts.
- Anmeldung remains local, and does not collect an address. Wohngeld points to the existing three-choice guide rather than collecting income/address or silently selecting Bavaria. Its evidence description is reused from the existing general workflow. No new eligibility decisions, local field maps, legal calculations or portal order claims.
- Visa stays on the existing model path. The prompt now instructs numbered actions, one necessary non-sensitive question at most, reuse of already supplied orientation, and `/viza` plus the existing `GUIDE_SOURCES.nationalvisum` official portal link. It distinguishes national-visa portal availability from local Ausländerbehörde; it does not invent a checked date. This is prompt/navigation improvement, **not** a newly verified visa-answer engine. Unknown model replies also receive explicit uncertainty/non-invention constraints.
- Existing Markdown and chat actions display the result without new controls or storage.

## Preservation and source limitations
Existing auth, safety filters, intent/depth/conversation gates, reserve/commit/release, client recordQuery, model `google/gemini-2.5-flash`, stream settings and token cap are unchanged. Supported deterministic replies still count through the existing reply reservation and metered stream. Visa/ordinary questions still use the same model and meter. No quotas or access decisions changed.

Guide texts come from existing BS/HR/SR/DE locale records. Recorded verification remains Kindergeld/Anmeldung 27.10.2026 and general Wohngeld 28.10.2026; not a live verification. Existing source URLs only, no source download, copyrighted content import, new package or paid experiment. The Visa source registry has no verifiedOn for its portal, even though the earlier visa audit documents bounded checks; this step never presents the whole model answer as source-verified.

Bounded recognition does not parse every possible natural-language reply, locality, family status or ambiguous denial. Unsupported continuations retain ordinary conversation with uncertainty instructions. Existing general-chat BS/DE selector is unchanged; source adapter/tests support four response languages. No claims about new HR/SR selector support. Conversation follows existing retention; no new persistence or private-data intake was introduced.

## Files changed
- `supabase/functions/chat-assistant/guide-context.ts`
- `supabase/functions/chat-assistant/index.ts`
- `supabase/functions/chat-assistant/guide-snapshot.ts` (regenerated)
- `scripts/generate-assistant-guides.ts`
- `src/lib/assistant-guides.test.ts`
- `src/i18n/locales/{bs,hr,sr,de}/common.json` (five conversation keys each)
- `AGENTS.md`, `roadmap.md`, approved plan archive and this report.

## Actual verification
- Baseline: 60 assistant/usage tests passed.
- Final focused run: **138 tests passed** across assistant (59), usage (31), no-downgrade (25) and visa content (23).
- Actual staged handler executed with isolated auth/RPC/model dependencies: four-language source selection, compact steps, documents follow-up, unknown topic, free-depth gating, safety and quota rejection. Commit/reservation counts asserted. Four visa tests assert exact unchanged model/token settings, localized navigation prompt and metering. **Real generated visa/unknown prose was not evaluated**; tests inspect supplied instructions and mocked transport only.
- Full suite passed **1,529 tests /54 files**; final regenerated-snapshot rerun recorded in roadmap.
- Browser: **40 topic/follow-up fixtures +8 navigation checks** (BS/HR/SR/DE ×390/1280), passed with fictional intercepted backend requests, no page errors or horizontal overflow. Three initial steps and two preparation-follow-up steps rendered as ordered lists; official links retained new-tab protection, and Kindergeld navigation reached the actual unchanged guide route. Source response bodies came from the actual adapter, not handwritten mock prose. Visa model output was not included in browser fixtures. Screenshots/runner: `/tmp/browser/assistant-conversation/`; reviewed BS mobile initial and DE desktop follow-up.
- Automatic build/TypeScript signal: build OK after fixing unsupported Array.findLast usage. No manual build/typecheck invoked.
- Global i18n warning checker: 420 existing unrelated findings; generated projection parity checks all new conversation keys in four locales.

## Deployment boundary and stop
No publish, Edge deploy, migrations, Cloud configuration, user data/Stripe/membership/pricing/quota/DNS changes, audio calls or DeutschTrainer edits. Production balkanlink.de remains untouched. Hosted Preview shares the unchanged deployed endpoint, so **these server responses remain inactive there and in production**. Local mocked browser and handler checks are not hosted authenticated E2E or real quota settlement verification. Activation is blocked by the explicit deployment hold; no activation attempted. Stop after this scope for independent review.