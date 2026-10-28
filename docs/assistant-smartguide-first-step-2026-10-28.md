# Asistent → SmartGuide: first limited source-only step

## Scope and actual changes
- Read ChatAssistant, chat-assistant, canonical-routes, form-catalog, official-sources, the actual three locale guide workflows, related gates and usage tests.
- Replaced the assistant's two divergent topic/slug catalogs with one catalog-derived projection and resolver. Catalog entries, routes, guide contents and access policies themselves are unchanged. Steuer-ID now resolves to steuer-id, Krankenkasse to krankenkasse, Bürgergeld to hauptantrag, BAföG to bafoeg and Führungszeugnis to fuehrungszeugnis. Removed unsupported assistant-only form slugs from action eligibility.
- Unknown guide requests no longer default to Kindergeld. Multiple recognized topics do not silently select a single guide. Only explicit page-relative questions inherit an exact localized guide URL; an explicit supported question wins over an unrelated page.
- The staged server returns the existing seven Kindergeld workflow steps, six Anmeldung steps or six general Wohngeld steps verbatim, not model-generated factual instructions. It includes existing official links, recorded dates and newly translated uncertainty text. No live source fetch is claimed. The original source/content verification was not repeated during this task.
- Removed duplicate Kindergeld/Anmeldung/Wohngeld page-source prompt entries and obsolete Kindergeld amounts/universal attachment claims. Other topics remain ordinary conversation with explicit non-invention instructions, not a newly claimed verified knowledge registry.
- Internal /formulari links validate against actual catalog slugs (including BS/HR/SR/DE prefixes, query and fragment). Unknown slugs no longer pass a prefix-only check. Legacy routes/redirects remain untouched.
- Keyword auto-linking protects explicit Markdown links, official URLs and code. Official links remain external anchors with new tabs and noopener/noreferrer. Actions validate slugs/routes and use translated SmartGuide labels.

## Sources and freshness
- Kindergeld: `GUIDE_SOURCES.kindergeld`, documented 27.10.2026; BA Familienkasse eServices and official forms index. The workflow distinguishes birth registration from application, includes parent/child Steuer-ID and payment details, paper KG1 + Anlage Kind, submission confirmation and follow-up. Newborn/foreign/adult uncertainty remains explicit; no amount, entitlement or calculated legal deadline is added.
- Anmeldung: `GUIDE_SOURCES.anmeldung`, documented 27.10.2026. Bundesportal Brandenburg is labeled a regional example; BMG §§19/21 remain linked. Local authority/form/online availability are not generalized nationwide.
- Wohngeld: general companion and `WOHNGELD_LINKS.bund` / `WOHNGELD_VERIFIED_ON`, documented 28.10.2026. No Bavarian form selected without answers; no field numbering or portal-order claims.
- All guidance text reused from project-authored locale workflows. No downloaded/copied publisher content, media, new dependencies or paid translation/model experiments.

## Access, context and metering
Auth, safety, intent gates, conversation-level escalation, reservation, assistantGate, existing commit/release and client recordQuery are retained. Detailed free-user requests still receive the existing gate plus a source/guide overview, not unlocked advice. Source-backed full responses go through the existing reservation and metered SSE settlement; they make zero model calls but retain the existing reply accounting. No quotas, rights, trial settings or ledgers were changed. Client/server legacy recordQuery consolidation remains out of scope.

The general chat's existing BS/DE language selector/policy is not redesigned. The source-backed response adapter supports BS/HR/SR/DE if that language is requested; automated handler tests exercise all four. Browser fixtures use the corresponding response locale and page locale; they do not establish that the legacy UI now offers an HR/SR chat selector.

## Changed files
- `src/components/ChatAssistant.tsx`
- `src/lib/canonical-routes.ts`
- `src/lib/assistant-links.ts`
- `src/lib/assistant-guides.test.ts`
- `supabase/functions/chat-assistant/index.ts`
- `supabase/functions/chat-assistant/guide-context.ts`
- `supabase/functions/chat-assistant/guide-snapshot.ts` (generated, checked projection)
- `scripts/generate-assistant-guides.ts` (manual source-only generation; parity test fails on drift)
- `src/i18n/locales/{bs,hr,sr,de}/common.json` (`assistantGuides`, six matching keys)
- `AGENTS.md`, `roadmap.md`, this report and approved plan archive.

## Verification
- Pre-change access/usage baseline: 56 tests passed.
- Focused final run: 85 tests passed (29 new assistant tests, 31 usage tests, 25 no-downgrade tests).
- The new tests execute the actual staged handler in an isolated VM with mocked auth/RPC/model transport, not merely a copied implementation. Twelve source-topic/language combinations, free depth gate, unknown intent, ordinary unknown conversation constraints, quota rejection and safety-first order passed. Reservations/commits were asserted; unknown ordinary response content from the real model remains unverified.
- Full regression run: 1,499 tests /54 files passed; final post-prompt-cleanup full rerun result recorded in roadmap.
- Browser: 32 topic fixtures (four languages ×390/1280×four topics) plus eight real frontend navigation checks to `/formulari/kindergeld`, all passed; no page errors or horizontal overflow. Requests were intercepted against fictional accounts before auth restore; no live account/Cloud data was touched. Frontend used reply bodies generated by the actual adapter. Screenshots and runner are in `/tmp/browser/assistant-guides/`; reviewed BS mobile Kindergeld and DE desktop unknown screenshots.
- Automatic preview validation reported `build OK` after correcting two new TypeScript errors. No manual project build/typecheck was run, per harness rules.
- Global i18n warning checker ran: 420 pre-existing unrelated missing-key findings; projection parity and all six new keys match across four locales.

## Not active / limits / stop
No publish, Edge deploy, database migration, Cloud configuration, Stripe/pricing/quota changes, user data mutations, ElevenLabs calls or DeutschTrainer edits. Hosted Preview and production share the unchanged deployed endpoint: the new sourced server response is **not active in either**. Only source code and local frontend changed. Local isolated handler/browser checks are not real-account hosted E2E or PostgreSQL concurrency verification. Source freshness and authenticated official portal field order remain unverified. Broad legacy prompt facts, old hardcoded UI strings and unrelated page-source maps were not comprehensively audited or rewritten. No automatic application submission, PDF work, new intake or storage. Stop after this scope for independent review.