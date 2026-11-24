DO $$ BEGIN
  IF md5(pg_get_functiondef('public.reserve_usage(uuid,text,text)'::regprocedure)) <> '6f7a1fb7d2e0ec2041dee2a1decf6de2' THEN RAISE EXCEPTION 'pre: reserve_usage differs'; END IF;
  IF md5(pg_get_functiondef('public.cq_increment_view(uuid)'::regprocedure)) <> '7aa8ccfa4ee664c301bf2992b7d9706b' THEN RAISE EXCEPTION 'pre: cq_increment_view differs'; END IF;
END $$;
ALTER TABLE public.entitlement_settings ADD COLUMN IF NOT EXISTS burst_limits_enforced boolean NOT NULL DEFAULT true;
CREATE INDEX IF NOT EXISTS usage_events_burst ON public.usage_events (user_id, feature, created_at);
CREATE OR REPLACE FUNCTION public._burst_limit(p_feature text) RETURNS integer LANGUAGE sql IMMUTABLE SET search_path TO 'public' AS $f$
  SELECT CASE p_feature
    WHEN 'assistant_reply' THEN 10
    WHEN 'document_analysis' THEN 4
    WHEN 'nebenkosten_scan' THEN 4
    WHEN 'trainer_generation' THEN 10
    WHEN 'tts_generation' THEN 60
    ELSE NULL END
$f$;
CREATE OR REPLACE FUNCTION public._burst_exceeded(uid uuid, p_feature text) RETURNS boolean LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $f$
DECLARE v_lim int := public._burst_limit(p_feature); v_on boolean;
BEGIN
  SELECT burst_limits_enforced INTO v_on FROM public.entitlement_settings WHERE id = 1;
  IF NOT COALESCE(v_on, true) OR v_lim IS NULL THEN RETURN false; END IF;
  RETURN (SELECT count(*) FROM public.usage_events
          WHERE user_id = uid AND feature = p_feature AND created_at > now() - interval '60 seconds') >= v_lim;
END $f$;
REVOKE EXECUTE ON FUNCTION public._burst_limit(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public._burst_exceeded(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public._burst_limit(text), public._burst_exceeded(uuid, text) TO service_role;
CREATE TABLE IF NOT EXISTS public.cq_view_dedupe (
  question_id uuid NOT NULL,
  user_id uuid NOT NULL,
  view_date date NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (question_id, user_id, view_date)
);
CREATE TABLE IF NOT EXISTS public.cq_anon_view_throttle (
  question_id uuid PRIMARY KEY,
  last_counted_at timestamptz NOT NULL
);
REVOKE ALL ON public.cq_view_dedupe, public.cq_anon_view_throttle FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.cq_view_dedupe, public.cq_anon_view_throttle TO service_role;
ALTER TABLE public.cq_view_dedupe ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cq_anon_view_throttle ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS cq_view_dedupe_date ON public.cq_view_dedupe (view_date);
CREATE OR REPLACE FUNCTION public.cq_increment_view(_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_n int;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.community_questions WHERE id = _id AND status = 'published') THEN RETURN; END IF;
  IF v_uid IS NOT NULL THEN
    INSERT INTO public.cq_view_dedupe (question_id, user_id) VALUES (_id, v_uid) ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_n = ROW_COUNT;
    DELETE FROM public.cq_view_dedupe WHERE question_id = _id AND view_date < CURRENT_DATE - 1;
  ELSE
    INSERT INTO public.cq_anon_view_throttle AS t (question_id, last_counted_at) VALUES (_id, now())
      ON CONFLICT (question_id) DO UPDATE SET last_counted_at = now()
      WHERE t.last_counted_at < now() - interval '30 seconds';
    GET DIAGNOSTICS v_n = ROW_COUNT;
  END IF;
  IF v_n > 0 THEN
    UPDATE public.community_questions SET view_count = view_count + 1 WHERE id = _id AND status = 'published';
  END IF;
END $function$;
CREATE OR REPLACE FUNCTION public.reserve_usage(uid uuid, p_feature text, p_request_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE ent jsonb; v_source text; r record; v_used int; v_id uuid; v_credit uuid; v_mode text := 'full';
        v_enforce boolean; v_v2 boolean; v_reset timestamptz; ex public.usage_events%ROWTYPE;
BEGIN
  IF uid IS NULL OR p_request_id IS NULL OR length(p_request_id) < 8 THEN RAISE EXCEPTION 'bad args'; END IF;
  SELECT * INTO ex FROM public.usage_events WHERE request_id = p_request_id;
  IF FOUND THEN
    IF ex.user_id <> uid THEN RAISE EXCEPTION 'request id conflict'; END IF;
    RETURN jsonb_build_object('ok', ex.status <> 'released', 'reservation_id', ex.id, 'source', ex.source, 'mode', ex.mode, 'idempotent', true);
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(uid::text || ':' || p_feature, 0));
  -- Anti-abuse burst guard (00.07): runs under the per-user/feature lock above, so concurrent calls are serialized.
  IF public._burst_exceeded(uid, p_feature) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rate_limited', 'retry_after_seconds', 60);
  END IF;
  SELECT protective_caps_enforced, monetization_v2_enabled INTO v_enforce, v_v2 FROM public.entitlement_settings WHERE id = 1;
  v_enforce := COALESCE(v_enforce,false); v_v2 := COALESCE(v_v2,false);
  ent := public._entitlement_core(uid); v_source := ent->>'source';
  SELECT * INTO r FROM public._usage_rule(uid, p_feature, v_source);
  v_used := public._usage_count(uid, p_feature, r.period_key);

  v_reset := CASE
    WHEN v_source = 'new_yearly' THEN (date_trunc('month', now() AT TIME ZONE 'Europe/Berlin') + interval '1 month') AT TIME ZONE 'Europe/Berlin'
    WHEN v_source = 'trial' THEN (ent->>'active_until')::timestamptz
    ELSE NULL END;

  -- v2: free assistant never calls the model; user gets a subscribe CTA instead.
  IF v_v2 AND p_feature = 'assistant_reply' AND v_source = 'free' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'subscribe_required', 'source', v_source);
  END IF;

  IF r.lim IS NOT NULL AND v_used >= r.lim THEN
    IF p_feature = 'document_analysis' THEN
      v_credit := public.reserve_doc_check_credit(uid);  -- honor previously purchased credits
      IF v_credit IS NULL THEN
        RETURN jsonb_build_object('ok', false, 'reason', CASE WHEN v_source = 'free' THEN 'access_required' ELSE 'quota_exhausted' END,
                                  'source', v_source, 'used', v_used, 'limit', r.lim, 'resets_at', v_reset);
      END IF;
      v_mode := 'legacy_credit';
    ELSIF p_feature = 'assistant_reply' AND v_source IN ('trial','new_yearly') THEN
      IF v_v2 THEN
        -- hard stop: no fallback model call once the fair-use quota is used
        RETURN jsonb_build_object('ok', false, 'reason', 'quota_exhausted', 'source', v_source,
                                  'used', v_used, 'limit', r.lim, 'resets_at', v_reset);
      END IF;
      -- pre-v2 compatibility: behave like today's free assistant
      v_source := 'free'; SELECT * INTO r FROM public._usage_rule(uid, p_feature, 'free');
      v_used := public._usage_count(uid, p_feature, r.period_key); v_mode := 'basic';
      IF v_used >= r.lim AND v_enforce THEN
        RETURN jsonb_build_object('ok', false, 'reason', 'daily_cap', 'source', v_source, 'used', v_used, 'limit', r.lim);
      END IF;
    ELSIF r.protective AND NOT v_enforce THEN
      NULL; -- shadow mode: record but do not block
    ELSE
      RETURN jsonb_build_object('ok', false, 'reason', CASE WHEN r.protective THEN 'daily_cap' ELSE 'quota_exhausted' END,
                                'source', v_source, 'used', v_used, 'limit', r.lim, 'resets_at', v_reset);
    END IF;
  END IF;
  IF p_feature = 'assistant_reply' AND v_source = 'free' THEN v_mode := 'basic'; END IF;

  INSERT INTO public.usage_events (user_id, feature, source, mode, period_key, request_id, legacy_credit_id, shadow)
  VALUES (uid, p_feature, v_source, v_mode, r.period_key, p_request_id, v_credit,
          r.protective AND r.lim IS NOT NULL AND v_used >= r.lim)
  RETURNING id INTO v_id;
  RETURN jsonb_build_object('ok', true, 'reservation_id', v_id, 'source', v_source, 'mode', v_mode,
                            'used', v_used + 1, 'limit', r.lim, 'resets_at', v_reset);
END $function$;
DO $$ BEGIN
  IF NOT has_function_privilege('service_role','public.reserve_usage(uuid,text,text)','EXECUTE') OR has_function_privilege('authenticated','public.reserve_usage(uuid,text,text)','EXECUTE') OR has_function_privilege('anon','public.reserve_usage(uuid,text,text)','EXECUTE') THEN RAISE EXCEPTION 'post: reserve_usage grants'; END IF;
  IF has_function_privilege('anon','public._burst_exceeded(uuid,text)','EXECUTE') OR has_function_privilege('authenticated','public._burst_exceeded(uuid,text)','EXECUTE') THEN RAISE EXCEPTION 'post: burst grants'; END IF;
  IF NOT has_function_privilege('anon','public.cq_increment_view(uuid)','EXECUTE') OR NOT has_function_privilege('authenticated','public.cq_increment_view(uuid)','EXECUTE') THEN RAISE EXCEPTION 'post: cq grants lost'; END IF;
  IF has_table_privilege('anon','public.cq_view_dedupe','SELECT') OR has_table_privilege('authenticated','public.cq_anon_view_throttle','INSERT') THEN RAISE EXCEPTION 'post: dedupe tables exposed'; END IF;
  IF pg_get_functiondef('public.reserve_usage(uuid,text,text)'::regprocedure) NOT LIKE '%_burst_exceeded(uid, p_feature)%' THEN RAISE EXCEPTION 'post: burst not wired'; END IF;
  IF (SELECT burst_limits_enforced FROM public.entitlement_settings WHERE id=1) IS DISTINCT FROM true THEN RAISE EXCEPTION 'post: switch'; END IF;
END $$;