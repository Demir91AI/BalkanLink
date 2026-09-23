
## Monetization relaunch
- [ ] Preserve 2 monthly subscribers (kontakt@balkanlink.de, huber.tarik@gmail.com): verify in Stripe (read-only), no account edits
- [ ] Legacy monthly subscribers keep their Document Check daily free quota (server-side)
- [ ] Clean all price surfaces: home cards, /paketi, /pricing, DeutschTrainer level sales, Document Check card; remove monthly/yearly switch, trial, dates, Amazon voucher promo, per-level purchase cards, cancellation copy
- [ ] Verify (build, browser, Stripe), then publish
- [ ] Webhook: handle invoice.payment_succeeded for legacy renewals (user must also enable the event in Stripe)
