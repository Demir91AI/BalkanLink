-- STAGED ONLY (00.07). NOT APPLIED: database backup availability could not be verified.
-- Apply only after owner confirms a recent backup in More -> Database -> Manage -> Backups.
-- Verified live metadata 2026-11-24 (read-only):
--   storage.objects policy "Service role can upload TTS audio" INSERT roles={public}
--   redeem_trial_code(uuid,text) EXECUTE: postgres, service_role, authenticated
--   get_daily_chat_count(uuid)   EXECUTE: postgres, authenticated, service_role; no caller check

-- 1) TTS: remove public INSERT. service_role bypasses RLS, so generate-tts uploads keep working.
--    Existing audio and the public read policy are untouched.
DROP POLICY IF EXISTS "Service role can upload TTS audio" ON storage.objects;

-- 2) redeem_trial_code: only caller is edge function redeem-trial (service-role client).
REVOKE EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) TO service_role;

-- 3) get_daily_chat_count: caller usePremiumAccess passes its own user.id. Others get 0.
CREATE OR REPLACE FUNCTION public.get_daily_chat_count(_user_id uuid)
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT CASE
    WHEN auth.role() = 'service_role'
      OR _user_id = auth.uid()
      OR public.has_role(auth.uid(), 'admin')
    THEN (SELECT COUNT(*)::integer FROM public.chat_usage
          WHERE user_id = _user_id AND query_date = CURRENT_DATE)
    ELSE 0
  END
$function$;
REVOKE EXECUTE ON FUNCTION public.get_daily_chat_count(uuid) FROM PUBLIC, anon;

-- ROLLBACK (restores exact prior state):
-- CREATE POLICY "Service role can upload TTS audio" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'tts-audio');
--   (verify original WITH CHECK in supabase/migrations/20260414010923_*.sql before use)
-- GRANT EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) TO authenticated;
-- CREATE OR REPLACE FUNCTION public.get_daily_chat_count(_user_id uuid) RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
--   AS $f$ SELECT COUNT(*)::integer FROM public.chat_usage WHERE user_id = _user_id AND query_date = CURRENT_DATE $f$;
