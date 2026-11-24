# Re-engagement emails disabled (owner, 2026-11-24)
- cron job 4 `send-reengagement-emails-daily` (0 9 * * *) paused: `SELECT cron.alter_job(4, active := false);`
- Code kill switch (fail closed): `send-reengagement-emails` returns `disabled` and `send-transactional-email` rejects `reengagement-*` templates unless secret `REENGAGEMENT_EMAILS_ENABLED=true`.
- Unchanged: other cron jobs, email queue, auth emails, other templates, profiles.email_opt_out and reengagement_*_sent_at data.
## Rollback
1. Add secret `REENGAGEMENT_EMAILS_ENABLED` = `true`.
2. `SELECT cron.alter_job(4, active := true);`
