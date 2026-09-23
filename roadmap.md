
## Monetization relaunch
- [x] Preserve 2 monthly subscribers (kontakt@balkanlink.de, huber.tarik@gmail.com): verify in Stripe (read-only), no account edits
- [x] Legacy monthly subscribers keep their Document Check daily free quota (server-side)
- [x] Clean all price surfaces: home cards, /paketi, /pricing, DeutschTrainer level sales, Document Check card; remove monthly/yearly switch, trial, dates, Amazon voucher promo, per-level purchase cards, cancellation copy
- [x] Verify (paid checkout not tested: no test login) (build, browser, Stripe), then publish
- [x] Webhook (user must confirm event enabled in Stripe): handle invoice.payment_succeeded for legacy renewals (user must also enable the event in Stripe)
