# Admin source map — 2026-10-28

Read-only hosted inspection: profiles 3 (2 lifetime, 1 free); page_views 6051; usage_events 1; annual_subscriptions 0; admin_notifications 0; paid STRIPE mreza_payments 0. Counts are observation-time evidence, not fixtures or KPI defaults.

Routes remain AdminGuard protected: admin, admin/forms, admin/forms/:slug/mapper, admin/trialovi, admin/pitanja, admin/stripe-sync. user_roles plus has_role is the server authorization boundary. Existing notifications SELECT/UPDATE/DELETE are admin-only; INSERT is service-owned. No policies/grants changed.

Sources: get_admin_stats (fixed windows), get_admin_dashboard_extra (fixed windows), get_admin_users_list (bounded directory, raw subscription state), get_usage_aggregates(_days) (grouped ledger, not currency costs). Existing Stripe audit/sync and retention actions remain separate and unchanged.

Rejected old claims: profile-count MRR as real revenue; lifetime as internal account; current trial/premium totals as cohort conversion; last_login_at as D1/D7/D30 retention; 14-day samples as 12-week heatmap; fixed service cost estimates as bills; page visits as completed procedures. No billing-provider query is made automatically.

PDF monthly cron is active (0 6 1 * *). Current deployed checker updates version metadata before email enqueue, so notification loss is possible. Replacement source uses one transactional observation RPC to persist notification and metadata together. SQL is staged outside supabase/migrations; no migration tool, cron change or deployment is authorized. Existing registration/transactional/user email infrastructure remains unchanged.