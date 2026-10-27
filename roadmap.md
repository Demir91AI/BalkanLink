
## Monetization relaunch
- [x] Preserve 2 monthly subscribers (kontakt@balkanlink.de, huber.tarik@gmail.com): verify in Stripe (read-only), no account edits
- [x] Legacy monthly subscribers keep their Document Check daily free quota (server-side)
- [x] Clean all price surfaces: home cards, /paketi, /pricing, DeutschTrainer level sales, Document Check card; remove monthly/yearly switch, trial, dates, Amazon voucher promo, per-level purchase cards, cancellation copy
- [x] Verify (paid checkout not tested: no test login) (build, browser, Stripe), then publish
- [x] Webhook (user must confirm event enabled in Stripe): handle invoice.payment_succeeded for legacy renewals (user must also enable the event in Stripe)

## Development-only catalog/navigation cleanup (2026-10-27)
- [x] Follow-up: removed decorative detail/overview badges; reused existing four-language one-time CTA; 729 tests passed, build OK, browser checked. Report: `docs/tier-badge-followup-2026-10-27.md`. No publish/deploy; separate TypeScript check not manually run under harness rules.
- [x] Remove decorative access badges; preserve routes, gates, payments, languages and warnings.
- [x] Document every sidebar destination and all eight catalog categories, duplicates and mobile rotation risk (`docs/catalog-navigation-cleanup-2026-10-27.md`).
- [x] Run no-downgrade/full tests and preview checks; no publish/deploy. Separate TypeScript check not manually run under harness rules.

## Task-to-output phase 1 (development only)
- [ ] Prepare future published visibility, production-mode regressions, read-only PWA audit and release checklist; no publish/deploy.
- [x] Add preview-only translated sidebar reply entry and direct localized wizard opening; 778 tests passed, signed-out desktop/mobile checks passed; authorized Preview session remains the existing blocker. Report: `docs/letter-reply-sidebar-2026-10-27.md`. No publishing.
- [x] Add isolated browser-only agency reply drafting from Vorlagen and DocumentenCheck results, four languages, editable German output and PDF/copy.
- [x] Replace inferred deadline headline with an original-letter review warning; preserve existing analysis and gates.
- [x] Validate templates, PDF output, privacy, full regression suite (749 passed), isolated mobile/desktop flow; harness build OK; no publish/deploy.
- [ ] Authenticated host end-to-end + completed DocumentenCheck CTA: blocked on owner app session; managed login has no matching owner account. See `docs/task-to-output-phase1-2026-10-27.md`.
