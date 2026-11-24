# Chat retention 30 days — status 2026-11-24 (22:05 UTC)

- Aggregate scope re-checked: 13 of 77 server chat messages older than 30 days, 2 users (unchanged from earlier audit). No rows inspected.
- Backup previously confirmed by owner: newest 2026-11-24 01:16:21 UTC, daily, ~14-day retention.
- Device-local chat copies (guest and signed-in) now drop messages older than 30 days (`applyLocalRetention`, test `src/lib/chat-retention.test.ts`); logout still clears all copies. Legacy messages without a date are stamped at first load, so their 30 days count from then.
- Privacy notice (Datenschutz §7, BS/HR/SR/DE) updated in the working version: 30-day server deletion, daily rolling deletion, 30-day device limit, separate ~14-day backup retention. No legal approval is claimed; lawyer review outstanding.

## BLOCKER — deletion NOT activated
The new privacy text is only in the unpublished working version; balkanlink.de still shows the old text. Owner rule: activate routine deletion only after the notice is live. Frontend publishing needs separate owner approval (Release Rule 2.0).

## Activation steps (after notice is live)
1. Apply `docs/staged/chat-retention-30d.sql` function (service_role only) as a migration.
2. `SELECT cron.schedule('purge-old-chat-messages','40 3 * * *','SELECT public.purge_old_chat_messages();');`
3. Verify: job active, other cron jobs unchanged, function EXECUTE only postgres/service_role, count older than 30 days = 0.

## Rollback
- Schedule: `SELECT cron.unschedule('purge-old-chat-messages');`
- Deleted messages are IRREVERSIBLE; recoverable only by a full daily-backup restore, which would also roll back all other data since that backup.
