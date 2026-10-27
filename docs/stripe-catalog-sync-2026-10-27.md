# Confirmed Stripe catalog synchronization — code only

## Revision and scope

- Initial local HEAD exactly matched owner-specified `3a256e86a6da5f4aaab8bdbd47f57600d1a6a66e`.
- Code verification revision before this report: `078e2098104ba335d1c628c4fa2ce8be18cd9da4`.
- This confirms the checked-out code baseline, **not GitHub connection/sync status**. Lovable's Git connection and remote sync status cannot be inspected by the agent; confirm in Project settings → Git.
- Owner-confirmed LIVE catalog state accepted as authoritative. No Stripe API writes, charges, product creation, subscription changes, migrations, backend deployments or web publication were performed.

## Exact edits

| File | Change |
|---|---|
| `supabase/functions/_shared/checkout-policy.ts` | New shared code-level release hold: annual returns `503 annual_checkout_unavailable`; every non-annual offer is retired. |
| `supabase/functions/create-checkout/index.ts` | Checks hold before staged annual logic; preserves `plus → 410 product_retired`; removes unreachable legacy session creation, catalog import and duplicate lifetime guard; narrows annual price before use. |
| `supabase/functions/_shared/products.ts` | Documents historical fulfillment-only purpose; all existing reconciliation IDs, amounts and entitlement behavior retained. |
| `src/lib/stripe.ts` | Retired lifetime compatibility function displays unavailable notice and makes zero checkout requests; historical verification/subscription/portal APIs remain. |
| `src/hooks/useMembership.ts` | Annual CTA and direct invocation honor shared release hold even if a mutable server flag becomes enabled. |
| `src/lib/membership.ts` | Exports shared hold and approved annual monthly planning equivalent (€19.99/12). |
| `src/lib/config.ts` | Removes unused single-form, ad and business-sales price constants; no useful feature removed. |
| `src/lib/de-labels.ts` | Deletes unused paid PRO-ad and individual document-purchase labels. |
| `src/i18n/bs.ts` | Deletes unused individual document-purchase label. |
| `src/i18n/locales/bs/plus.json` | Names target offer BalkanLink Plus; explicit not-ready payment notice and annual-planning labels. |
| `src/i18n/locales/hr/plus.json` | Same changes, Croatian translation. |
| `src/i18n/locales/sr/plus.json` | Same changes, Serbian translation. |
| `src/i18n/locales/de/plus.json` | Same changes, German translation. |
| `src/pages/admin/AdminDashboard.tsx` | New-member break-even, MRR goals and projections use annual monthly equivalent, explicitly labeled planning/inactive; actual historical billing tables unchanged. |
| `src/lib/checkout-catalog.test.ts` | 15 regressions: blocked annual despite ready flags, retired offer/price keys, zero client checkout calls, historical reconciliation, legacy monthly rejection as annual, planning rate and endpoint hold ordering. |
| `supabase/functions/_shared/transactional-email-templates/admin-new-review.tsx` | Fixes pre-existing email Preview number/string type error by supplying one string; no email/legal wording change. |
| `AGENTS.md` | Records shared release-hold architecture and fulfillment-only catalog rule. |
| `roadmap.md` | Records synchronization tasks and completion. |
| `docs/stripe-catalog-sync-2026-10-27.md` | This evidence and blockers report. |

Project memory also records the owner-confirmed catalog and legacy preservation requirement; private memory is not application code.

## Audit and intentionally retained references

- Read-only audits covered source UI/routes, navigation, profile/admin views, all four locale directories, legacy label dictionaries, payment functions, gates and Stripe-ID references.
- No active new-customer CTA found for the four confirmed archived offers or legacy €9.99 monthly subscription. Removed the remaining dead per-check/ad sales labels and unused pricing constants.
- `products.ts` keeps historic €19.90 lifetime price/amount and legacy subscription identifiers for historical paid-session verification and billing handling. These are not exposed to checkout.
- Admin historical subscription tables retain €9.99 and €99.90 labels. They describe old billing records, not new offers. Their existing profile-based estimates are not a verified Stripe revenue ledger.
- Legal pages/copy were intentionally untouched. Historical migration files, audit documents and pinned baselines remain historical records.
- Existing monthly webhook renewal handling, subscription recognition, lifetime protections, credits, customer portal, user data, auth, SmartGuides and routes were not altered.

## QA evidence

- Existing suite before the new test file was picked up: **982 tests passed**.
- Focused catalog/membership/no-downgrade tests: **52 passed**.
- Final full suite: **998 tests passed in 31 files**; pinned baselines unchanged.
- Automatic preview build reports after edits: **build OK**, latest checked timestamp `2026-10-27T19:44:53Z`. No manual build/typecheck command was run, in accordance with the preview harness workflow.
- Actual `/paketi`, `/hr/paketi`, `/sr/paketi`, `/de/paketi` browser checks at **1280×1800** and **390×844**: Plus name and €19.99 rendered; no obsolete sales prices; no horizontal overflow; zero runtime errors; zero `create-checkout` requests.
- Screenshots inspected: `/tmp/browser/catalog/1280-offer.png` and `/tmp/browser/catalog/390-offer.png`.
- Browser checks were public/signed-out. Signed-in checkout hold is covered by direct-function tests; authenticated profile/admin pages and actual payment/renewal flows were not exercised. No live charge was attempted.

## Outstanding blockers before any release

1. Annual Stripe product/price **does not yet exist**, per owner. No ID fabricated or product created.
2. Test-mode annual checkout, signed webhook event/renewal/failure/cancellation QA, identity/duplicate checks and legal/owner approval remain required.
3. Billing Portal configuration is **unverified**: ensure legacy management remains available and no new subscription/plan-switch path exposes retired or monthly-only offers. No portal configuration was changed.
4. GitHub connection/sync status requires checking Lovable Project settings → Git; only exact local baseline was verified here.
5. These endpoint edits are **not deployed**. Preview and published app share the existing hosted backend, so this task cannot claim the running hosted checkout acquired the new hold. Existing hosted rollout flags are not changed or independently rechecked in this task.
6. Keep trial/checkout/monetization activation separate from this code synchronization. Shared code-level hold must remain false until configuration, testing and owner approval are complete.

No production release or backend deployment was made.