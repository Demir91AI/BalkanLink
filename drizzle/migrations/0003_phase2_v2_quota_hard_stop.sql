ALTER TABLE public.entitlement_settings ADD COLUMN IF NOT EXISTS monetization_v2_enabled boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.reserve_usage(uid uuid, p_feature text, p_request_id text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
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
END $$;
REVOKE ALL ON FUNCTION public.reserve_usage(uuid,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_usage(uuid,text,text) TO service_role;