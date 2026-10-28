# Admin Control Center — source-only independent review

## Implemented / not released

Reconstructed `/admin` using existing infrastructure, retaining all 13 dashboard sections and links to all existing admin tools. Four languages, dark/gold semantic tokens, loading/error/empty/stale states, per-source refresh times, manual section/all refresh, two-minute visible-page refresh with no overlap. Stripe audit is explicitly manual, not repeatedly triggered by dashboard refresh. Existing sync/retention/purge actions remain available with confirmation; no action was exercised against real accounts.

Notification Center uses existing admin_notifications with checked read/unread/delete responses, filters, 100-row pagination, error retention. New decision/audit/retry controls appear only after a server-side capability RPC succeeds. Unknown/undeployed capability fails closed. No browser flag grants permission. New monitor events cannot be deleted through this UI, and staged audit foreign keys restrict deletion.

## Metric registry / SQL and verification

| UI metric/section | Existing source / SQL semantics | Period / reliability |
|---|---|---|
| Total profiles | get_admin_stats: `count(*) FROM profiles` | Snapshot, includes lifetime; lifetime is not inferred internal |
| Registrations | same RPC, `created_at >= now()-interval '7/30 days'` | 7/30 only; 90 unavailable, displayed as unknown |
| Page views | same RPC, count page_views by created_at | 7/30 only; approximate tracking, not people/completions |
| Asistent recorded questions | chat_usage row count by used_at | 7/30 only; old ledger, not summed with usage_events |
| Old document checks | sum(doc_check_usage.count) by used_at | Legacy date-based windows, not modern ledger |
| Active Asistent users | extra.asistentStats.uniqueUsers30d: distinct user_id in chat_usage | Fixed 30 days, not platform DAU/MAU |
| Membership state | get_admin_users_list(_limit=1000), raw tier/premium/expiry | All trial variants, annual, legacy, lifetime, expired; bounded snapshot, not billing/entitlement RPC or admin override |
| Traffic chart | stats.viewsByDay: date/count page_views | Existing 14-day sample; selecting 7 can narrow it, never called 90-day/full 30-day series |
| Traffic devices/browser/referrers/hour/auth-anon/paths | get_admin_dashboard_extra grouped page_views | Fixed 30-day windows with explicit notice; raw identifiers not exported |
| Features / visa/forms breakdown | extra.featureUsage, visaByCountry, formsBreakdown | Fixed source definitions, visits != usage; no invented growth percentages |
| Deutsch progress/levels | extra.trainerStats/trainerLevels, trainer_progress aggregation | Snapshot, preserves stored legacy XP/streak metrics, no fabricated lesson scores |
| Geo/language | extra.topCountries30d/topCities30d/languageSplit | Fixed geographic sample / profile language snapshot; no inferred exact users |
| Ledger | get_usage_aggregates(_days): feature/source/mode/status/shadow/count from usage_events | True 7/30/90 grouped query; no content, no currency; aggregate CSV with fetched time/period |
| Revenue | unavailable from reliable existing dashboard sources | No MRR/revenue inference from profiles. Local payments are not verified Stripe transactions; empty local table is not zero Stripe revenue |
| Conversion/retention | unavailable | Existing mixed funnel/current state and last_login_at proxies rejected; no fabricated cohort percentages |
| AI/service costs/profit | unavailable | Existing fixed-cost assumptions rejected; no tokens/prices/bills per event |
| Goals | session-only target profile count | Explicit target, not financial projection |
| Stripe | existing stripe-sync-audit invoked manually | Subscription audit from Stripe; payments are local payments, clearly separated; endpoint preserves all existing billing/profile logic |
| Sync audit | stripe_sync_log (≤500), separate settings | Source timestamps/errors, empty != failed; CSV formula protection; actions confirmed |

Read-only hosted evidence at audit time: 3 profiles, 6051 page_views, 1 usage event, 0 annual subscriptions, 0 notifications, 0 paid Stripe-provider mreza_payments. No user-content/email/PII rows exported. Existing live policies for notifications are admin-only SELECT/UPDATE/DELETE, service-only INSERT; dashboard RPCs check has_role. Existing PDF monthly schedule is active `0 6 1 * *`; no new schedule created.

## Staged SQL / PDF durability

`docs/staged/admin-notifications.sql` is NOT in automatic migrations, NOT applied. It adds source/occurred_at/dedupe/status/retry metadata to existing admin_notifications plus append-only admin_notification_audit. Every new public table has explicit grants followed by RLS. Review RPC validates admin and valid transitions, row-locks, records decisions atomically, idempotently returns for repeated identical decisions. No content/form/entitlement/billing updates or publish calls.

observe_pdf_version is executable only by service_role. It locks version metadata and persists notification+audit+metadata in ONE transaction. Failure rolls all back; next observation still sees old metadata. Repeated/concurrent observation of the same new metadata does not create another event. Missing headers preserve last known values; first observation establishes baseline. Existing notified_at remains untouched legacy email-queue marker. Fingerprint includes prior observation time to preserve genuine later repeated transitions.

Checker source removes internal PDF emails, validates allowlisted official HTTPS sources/redirects, times out requests, cancels range bodies, uses full Content-Range total rather than a one-byte length, checks RPC success, reports failures without old/new details or sensitive logs. Current source supports the actual configured ZBFS host; future host additions require review.

Stripe audit source removes only internal admin email invocation and checks notification persistence, preserving user/transactional email templates/workers/configuration. Legacy optional email argument remains accepted internally for call compatibility but unused. Existing Stripe profile sync logic is intentionally unchanged. A notification insertion failure is no longer silent; a sync may already have changed profiles before reporting failure, so independent review must not automatically retry a sync. No real sync was run.

Retry is a durable *request/status*, not an active retry worker. There is no Legal Watch collection, 15-day cron or legal automatic publication. Schema and checker must be activated together after separate approval; UI does not invoke the privileged checker.

## Verification

- 21 admin focused tests (17 model/security-contract tests + 4 hook tests) passed.
- Final full Vitest: **1468 tests / 53 files passed**.
- Automatic preview build/TypeScript signal: build OK (20:56:48 UTC latest source build observed); no separate manual build/typecheck (harness policy).
- Eight isolated authenticated-admin fixtures: BS/HR/SR/DE ×390/1280. All 13 tabs visited; overview, partial stats failure preserving data, 90-day unsupported values, notification failure preserving unread, confirmed mutation, empty state. No page exceptions/horizontal overflow.
- Staged capability/approve was exercised only with mock backend, no live write. Stripe manual audit also mock-only. Signed-out `/admin` redirected to login. Test source retained under tests/release/admin-center/check_admin.py; screenshots `/tmp/browser/admin-center`.
- Screenshot inspection: Bosnian phone/German desktop and staged decision view showed coherent layouts. Existing global cookie banner and public navigation remain unchanged/outside scope.
- Four-locale new admin key parity tested. Global legacy i18n scanner still fails with **420 unrelated missing usages**, scans BS/DE only; no adminCenter/adminSync missing findings. Not claimed globally clean.
- SQL authorization/durability contracts tested as source plus pure observation failures; actual PostgreSQL transaction/concurrency/RLS integration NOT executed because DB mutation forbidden.

## Changed files

- src/pages/admin/AdminDashboard.tsx
- src/components/admin/AdminNotificationsSection.tsx
- src/components/admin/StripeSubscriptionsSection.tsx
- src/components/admin/StripeSyncLogSection.tsx
- src/components/admin/SourceStatus.tsx
- src/hooks/useAdminCenter.ts
- src/lib/admin-center/model.ts
- src/lib/admin-center/notifications.ts
- src/lib/admin-center/admin-center.test.ts
- src/lib/admin-center/refresh.test.tsx
- src/i18n/locales/{bs,hr,sr,de}/common.json
- src/index.css (admin-scoped semantic tokens only)
- supabase/functions/check-pdf-versions/{index,observation}.ts
- supabase/functions/stripe-sync-audit/index.ts (internal email dependency only)
- docs/staged/admin-notifications.sql
- docs/admin-control-center-source-map.md
- docs/admin-control-center-results-2026-10-28.md
- tests/release/admin-center/check_admin.py
- AGENTS.md, roadmap.md; owner admin constraint in project memory.

## Blockers / independent review

1. Staged SQL not applied and Edge sources not deployed: hosted PDF/internal Stripe audit email behavior still old. No claim internal monitoring is already email-free in production.
2. Durable review/audit/retry capability disabled against current hosted schema; no scheduled retry processor. Existing notifications read/unread work over existing RLS after entitled admin session.
3. Verified Stripe financial totals/refunds/fees/invoice history and real retention/cost require additional approved reporting sources. None invented or new provider added.
4. Real-admin E2E and actual SQL transaction/concurrency/grants checks were not run; only isolated mocks and read-only hosted metadata checks.
5. Membership directory capped at 1000; exact global plan totals need an approved aggregate RPC at scale. Generic admin source fields stay technical identifiers where no translated label exists.
6. Existing get_admin_dashboard_extra still returns legacy chat previews server-side even though new UI does not render them. Removing that payload requires a separately reviewed RPC change. No user content logged/exported here.
7. Existing legacy internal admin pages/guard/public cookie issues outside the reconstructed dashboard remain unchanged.

No publication, Edge deployment, Cloud migrations/configuration, new packages/services, emails sent, Stripe mutation, pricing/trial/quota or user-data mutation. Stop here for independent review.
