DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Service role can upload TTS audio' AND cmd='INSERT' AND roles='{public}' AND with_check='(bucket_id = ''tts-audio''::text)') THEN RAISE EXCEPTION 'pre: TTS insert policy differs from capture'; END IF;
  IF md5(pg_get_functiondef('public.get_daily_chat_count(uuid)'::regprocedure)) <> 'ec3551827bcb1e72bdf28af70003aff9' THEN RAISE EXCEPTION 'pre: get_daily_chat_count definition differs'; END IF;
  IF md5(pg_get_functiondef('public.redeem_trial_code(uuid,text)'::regprocedure)) <> '06b5217e558e4e4a715559cc382f8da3' THEN RAISE EXCEPTION 'pre: redeem_trial_code definition differs'; END IF;
  IF (SELECT proacl::text FROM pg_proc WHERE oid='public.redeem_trial_code(uuid,text)'::regprocedure) <> '{postgres=X/postgres,service_role=X/postgres,authenticated=X/postgres}' THEN RAISE EXCEPTION 'pre: redeem ACL differs'; END IF;
  IF (SELECT proacl::text FROM pg_proc WHERE oid='public.get_daily_chat_count(uuid)'::regprocedure) <> '{postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}' THEN RAISE EXCEPTION 'pre: chat count ACL differs'; END IF;
END $$;

DROP POLICY "Service role can upload TTS audio" ON storage.objects;

REVOKE EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) TO service_role;

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

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Service role can upload TTS audio') THEN RAISE EXCEPTION 'post: TTS insert policy present'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='tts-audio: read individual files only') THEN RAISE EXCEPTION 'post: TTS read policy missing'; END IF;
  IF has_function_privilege('authenticated','public.redeem_trial_code(uuid,text)','EXECUTE') OR has_function_privilege('anon','public.redeem_trial_code(uuid,text)','EXECUTE') OR NOT has_function_privilege('service_role','public.redeem_trial_code(uuid,text)','EXECUTE') THEN RAISE EXCEPTION 'post: redeem privileges'; END IF;
  IF has_function_privilege('anon','public.get_daily_chat_count(uuid)','EXECUTE') OR NOT has_function_privilege('authenticated','public.get_daily_chat_count(uuid)','EXECUTE') OR NOT has_function_privilege('service_role','public.get_daily_chat_count(uuid)','EXECUTE') THEN RAISE EXCEPTION 'post: chat count privileges'; END IF;
  IF pg_get_userbyid((SELECT proowner FROM pg_proc WHERE oid='public.get_daily_chat_count(uuid)'::regprocedure)) <> 'postgres' THEN RAISE EXCEPTION 'post: owner changed'; END IF;
END $$;