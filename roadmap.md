
## Monetization relaunch
- [x] Preserve 2 monthly subscribers (kontakt@balkanlink.de, huber.tarik@gmail.com): verify in Stripe (read-only), no account edits
- [x] Legacy monthly subscribers keep their Document Check daily free quota (server-side)
- [x] Clean all price surfaces: home cards, /paketi, /pricing, DeutschTrainer level sales, Document Check card; remove monthly/yearly switch, trial, dates, Amazon voucher promo, per-level purchase cards, cancellation copy
- [x] Verify (paid checkout not tested: no test login) (build, browser, Stripe), then publish
- [x] Webhook (user must confirm event enabled in Stripe): handle invoice.payment_succeeded for legacy renewals (user must also enable the event in Stripe)

## Development-only catalog/navigation cleanup (2026-10-27)
- [x] Remove decorative access badges; preserve routes, gates, payments, languages and warnings.
- [x] Document every sidebar destination and all eight catalog categories, duplicates and mobile rotation risk (`docs/catalog-navigation-cleanup-2026-10-27.md`).
- [x] Run no-downgrade/full tests and preview checks; no publish/deploy. Separate TypeScript check not manually run under harness rules.
