# BalkanLink 2.0 — 7-day trial + €19.99/year, guide-first forms

Nothing is changed in this step. This plan covers the inventory, the risks and a phased build. Every phase stays in Preview only. Nothing goes live, no live billing is switched on and no legal text changes without Demir's sign-off.

## 1. Inventory (checked read-only today)

**Payments and access, in the app**
- `src/lib/stripe.ts`: sells only `plus` (€19.90 one-time, live price). It also lists two legacy subscription product IDs: Premium monthly and Premium yearly.
- `src/lib/dev-mode.ts` / `config.ts`: `DEV_MODE = IS_ADMIN_PREVIEW = false`. This means gating is active. That contradicts the project notes, which say gating is "temporarily disabled".
- 47 files decide access on their own (`isPremium` / `hasFullAccess` / checkout). They include `useSubscription`, `usePremiumAccess`, `AuthContext`, `PremiumModal`, `Pricing`, `PaymentSuccess`, `Profil`, `MojiPodaci`, `UserMenu`, `Header`, `AppSidebar`, `FlowBanner`, `Index`, `FormCenter`, `FormSmartGuide`, `SmartGuideWizardShared`, `ChatAssistant`, `DokumentenCheck`, `NebenkostenScan`, `Vorlagen`, `Porezi`/`PoreziWizard`/`PoreziModuleTemplate`, `AnerkennungNavigator`/`Fakulteti`, the Visa gate/renderer, `DeutschTrainer` plus the trainer components, `SchufaSimulator`, `QADetail`, `ChecklistPage`, `BoravisnaDozvola`/`DolazakPageTemplate`, `NtProModal`, `PageSaveStar`, Muster components and admin Stripe screens.

**Backend functions (25)**
- Payments: `create-checkout`, `verify-payment`, `stripe-webhook` (fulfils one-time payments only and ignores subscription checkouts), `check-subscription`, `customer-portal`, `stripe-sync-audit`, `redeem-trial`.
- Expensive AI: `chat-assistant`, `document-check`, `nebenkosten-scan`, `generate-trainer-exercises`, `generate-tts`.
- Others: account deletion/export, emails, page views, place import, PDF version checks.

**Database pieces that touch money or access**
- Tables: `profiles` (tier, expiry), `mreza_payments`, `payments` (legacy), `doc_check_credits`, `doc_check_usage`, `doc_check_premium_usage`, `chat_usage`, `trial_codes`, `trial_redemptions`, `user_form_access`, `stripe_sync_log`.
- Functions: `fulfill_stripe_checkout` (accepts only 1990 = plus, or 199 = doc_check), `has_full_access`, `is_legacy_doccheck_user`, `grant_premium_access`, `protect_lifetime_tier` (trigger), `redeem_trial_code`, the `deactivate_expired_*` cron functions, `consume/reserve/release_doc_check_*`, `get_doc_check_status`, and the admin stats functions (these assume €9.99 and €99.90).

**Account snapshot (this backend):** `profiles` has 3 rows: 2 `lifetime` and 1 `free`.

**PDF filling found in code:** `pdf-form-engine`, `pdf-fill-kindergeld`, `pdf-fill-kinderzuschlag`, `elterngeld-bayern-fields`, `visa-datenblatt-pdf`, `visa-bewerbungs-mappe-pdf`, `kindergeld-assistant/datenblatt`, Muster `DownloadFilledPdfButton`/`MusterFormBase`, plus the `formularpilot` manifests and forms. Document drafting that stays: `letter-reply/pdf`, Vorlagen, Dokumenten-Check, Nebenkosten-Scan.

## 2. Contradictions to resolve first

1. **The account data doesn't match the history.** Earlier notes said two €9.99/month subscribers exist (kontakt@, huber.tarik@). This database shows 2 lifetime and 0 active subscriptions. Before any build, someone must check Stripe read-only and confirm with you which of these is true.
2. **Gating is unclear.** `DEV_MODE` is off, but the project rules say the paywall is disabled. Your decision is needed.
3. **Old price rules are built into the database.** `fulfill_stripe_checkout` rejects any amount other than 1990/199. The webhook ignores subscriptions. The admin stats use €9.99. All three must change, or new yearly purchases will fail without any visible error.
4. **The per-document charge still exists.** Doc-check credits at €1.99/€2.99 conflict with "no per-document charges". Existing unused credits must still be honoured.
5. **Two trial systems.** The old launch and influencer trials overlap with the new 7-day trial.
6. **Saved project rules are now outdated.** Memory and AGENTS rules say "€19.90 lifetime, no recurring". They must be replaced, otherwise future work will undo this change.
7. **Legal pages** (AGB, Widerruf, cancellation button under §312k BGB, price display) must be reviewed by a lawyer and by you before anything goes live.

## 3. Target model

- One server-side function, `get_entitlement(uid)`, returns `{ source: legacy_lifetime | legacy_sub | yearly | trial | free | admin, active_until, quotas }`. Legacy wins if present. Nothing gets downgraded.
- **Trial:** 7 days, starts once at email confirmation, one per account (and per email hash). No card, no automatic charge, all categories open, lower AI quotas.
- **Yearly plan:** €19.99/year, starts only when the user chooses it in Stripe Checkout. Cancelling is clear and done in the customer portal. Renewals come through the webhook.
- **Fair-use quotas:** enforced only on the server for the expensive AI functions and shown to the user. The amounts are open for you to decide, e.g. trial 5 assistant questions/day + 1 document check/day; yearly 30/day + 5/day.
- All 47 screens read one hook, `useEntitlement`. All scattered checks are removed. The checkout pages stay, with no labels on the catalogue.

## 4. Phases

- **Phase 0, check only:** reconcile Stripe with the accounts (read-only). Inventory tests that pin every legacy entitlement. You confirm: who is legacy, the quota numbers, and whether gating stays on or off.
- **Phase 1, first slice:** add the `get_entitlement` function in the database and the `useEntitlement` hook in the app. These are read-only and nothing uses them yet. Grandfathering tests cover lifetime, the legacy subscription, doc-check credits and influencer trials. No price or checkout changes.
- **Phase 2:** trial start on confirmation, the quota table, and quota checks in the 5 AI functions.
- **Phase 3:** the €19.99/year product in Stripe **test mode only**, webhook handling for subscriptions, an amount allowlist, the portal, and the admin stats.
- **Phase 4:** switch the 47 screens to `useEntitlement`, guided by each screen's behaviour before the change.
- **Phase 5, guide-first forms:** take the remaining PDF fill buttons out of what users see (the code stays in the repo). Each form gets a SmartGuide with a six-part explanation per field (what / where / format / common mistake / when blank / example), plus a timeline, checklist, authority and official link. Official PDFs are only outgoing links whose source has been checked. KG1 and other XFA forms stay blocked. Drafting, Vorlagen and Dokumenten-Check stay.
- **Phase 6:** legal copy drafts for lawyer review, a release checklist, and your approval before switching to live Stripe.

## 5. Test matrix

| Area | Cases |
|---|---|
| Entitlement | lifetime, legacy sub active/expired, yearly active/cancelled/past_due, trial day 0/6/8, free, admin |
| Trial | no card, one per user, re-signup abuse, expiry cron |
| Quota | each AI function, trial vs yearly limits, reset at Berlin midnight, server rejects bypass |
| Stripe (test) | checkout, renewal, cancel, refund, wrong amount rejected, duplicate webhook |
| Regression | phase1 baseline (200 routes, 31 redirects), 4 locales, 46 guides, no PDF inputs |
| UI | contrast, 390px, cancellation reachable in 2 clicks |

## 6. Recommended first build slice

Do Phase 0 and Phase 1 only: reconcile with Stripe read-only, add the entitlement function and hook that nothing uses yet, and add the grandfathering tests. This changes nothing users see, protects the paying users first, and makes every later step reversible.
