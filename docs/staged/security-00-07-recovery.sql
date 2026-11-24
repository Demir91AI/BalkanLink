-- 00.07 METADATA-ONLY RECOVERY (captured read-only 2026-11-24 21:4x UTC; no user rows, no secrets).
-- Captured state:
--   storage.objects policy "Service role can upload TTS audio": PERMISSIVE, INSERT, roles {public},
--     USING NULL, WITH CHECK (bucket_id = 'tts-audio'::text)
--   public.redeem_trial_code(_user_id uuid, _code text): owner postgres, VOLATILE, SECURITY DEFINER,
--     ACL {postgres=X/postgres,service_role=X/postgres,authenticated=X/postgres}, def md5 06b5217e558e4e4a715559cc382f8da3 (unchanged by fix)
--   public.get_daily_chat_count(_user_id uuid): owner postgres, STABLE, SECURITY DEFINER,
--     ACL {postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}, def md5 ec3551827bcb1e72bdf28af70003aff9
-- Run this whole file in one transaction to restore exactly that state.
DROP POLICY IF EXISTS "Service role can upload TTS audio" ON storage.objects;
CREATE POLICY "Service role can upload TTS audio" ON storage.objects AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (bucket_id = 'tts-audio'::text);
GRANT EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) TO authenticated;
CREATE OR REPLACE FUNCTION public.get_daily_chat_count(_user_id uuid)
 RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  SELECT COUNT(*)::integer
  FROM public.chat_usage
  WHERE user_id = _user_id
    AND query_date = CURRENT_DATE
$function$;
GRANT EXECUTE ON FUNCTION public.get_daily_chat_count(uuid) TO authenticated;
