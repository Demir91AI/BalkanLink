-- STAGED ONLY — NOT APPLIED. Requires separate owner confirmation (irreversible bulk deletion).
-- Scope at 2026-11-24 (aggregate): 13 of 77 chat_messages older than 30 days, belonging to 2 users.
-- Deletes only assistant chat message rows older than 30 days. Usage/quota ledgers, profiles and other data untouched.
CREATE OR REPLACE FUNCTION public.purge_old_chat_messages() RETURNS integer
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $f$
DECLARE n int;
BEGIN
  DELETE FROM public.chat_messages WHERE created_at < now() - interval '30 days';
  GET DIAGNOSTICS n = ROW_COUNT; RETURN n;
END $f$;
REVOKE EXECUTE ON FUNCTION public.purge_old_chat_messages() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_old_chat_messages() TO service_role;
-- Then (data change, after confirmation): SELECT cron.schedule('purge-old-chat-messages','40 3 * * *','SELECT public.purge_old_chat_messages();');
-- Rollback of schedule: SELECT cron.unschedule('purge-old-chat-messages'); deleted rows are recoverable only from a daily backup.
