-- Settings (singleton). Defaults OFF so shared production backend is unaffected until owner release.
CREATE TABLE public.entitlement_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  trial_signup_enabled boolean NOT NULL DEFAULT false,
  trial_rollout_at timestamptz,
  protective_caps_enforced boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.entitlement_settings TO authenticated;
GRANT ALL ON public.entitlement_settings TO service_role;
ALTER TABLE public.entitlement_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read entitlement settings" ON public.entitlement_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update entitlement settings" ON public.entitlement_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.entitlement_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- One trial per account and per email (hashed, no plain email stored).
CREATE TABLE public.trial_grants (
  user_id uuid PRIMARY KEY,
  email_hash text NOT NULL UNIQUE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);
GRANT SELECT ON public.trial_grants TO authenticated;
GRANT ALL ON public.trial_grants TO service_role;
ALTER TABLE public.trial_grants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own trial grant" ON public.trial_grants FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Usage ledger: no user content, only feature/status counters.
CREATE TABLE public.usage_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  feature text NOT NULL CHECK (feature IN ('document_analysis','assistant_reply','tts_generation','trainer_generation','nebenkosten_scan')),
  source text NOT NULL,
  mode text NOT NULL DEFAULT 'full',
  period_key text NOT NULL,
  status text NOT NULL DEFAULT 'reserved' CHECK (status IN ('reserved','committed','released')),
  request_id text NOT NULL UNIQUE,
  legacy_credit_id uuid,
  shadow boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  finalized_at timestamptz
);
CREATE INDEX usage_events_lookup ON public.usage_events (user_id, feature, period_key, status);
GRANT SELECT ON public.usage_events TO authenticated;
GRANT ALL ON public.usage_events TO service_role;
ALTER TABLE public.usage_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own usage" ON public.usage_events FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Internal entitlement core (no caller check). Not executable by clients.
CREATE OR REPLACE FUNCTION public._entitlement_core(uid uuid)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE p public.profiles%ROWTYPE; v_source text := 'free'; v_until timestamptz; v_credits bigint := 0;
BEGIN
  SELECT * INTO p FROM public.profiles WHERE id = uid;
  SELECT count(*) INTO v_credits FROM public.doc_check_credits WHERE user_id = uid AND consumed_at IS NULL;
  IF public.has_role(uid, 'admin') THEN v_source := 'admin';
  ELSIF p.id IS NOT NULL AND p.subscription_tier = 'lifetime' THEN v_source := 'legacy_lifetime';
  ELSIF p.id IS NOT NULL AND COALESCE(p.is_premium,false) AND p.subscription_tier IN ('premium','premium_yearly')
        AND (p.subscription_expires_at IS NULL OR p.subscription_expires_at > now()) THEN
    v_source := 'legacy_sub'; v_until := p.subscription_expires_at;
  ELSIF p.id IS NOT NULL AND p.subscription_tier = 'annual' AND p.subscription_expires_at > now() THEN
    v_source := 'new_yearly'; v_until := p.subscription_expires_at;
  ELSIF p.id IS NOT NULL AND p.subscription_tier IN ('trial','launch_trial','influencer_trial') AND p.subscription_expires_at > now() THEN
    v_source := 'trial'; v_until := p.subscription_expires_at;
  END IF;
  RETURN jsonb_build_object(
    'source', v_source, 'full_access', v_source <> 'free', 'active_until', v_until,
    'unused_doc_credits', v_credits,
    'quota', CASE v_source
      WHEN 'new_yearly' THEN jsonb_build_object('period','month','assistant_replies',40,'document_analyses',5)
      WHEN 'trial' THEN jsonb_build_object('period','trial_total','assistant_replies',10,'document_analyses',2)
      WHEN 'free' THEN jsonb_build_object('period','none','assistant_replies',0,'document_analyses',0)
      ELSE jsonb_build_object('period','unlimited','assistant_replies',NULL,'document_analyses',NULL) END);
END $$;
REVOKE ALL ON FUNCTION public._entitlement_core(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public._entitlement_core(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.get_entitlement(uid uuid)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'missing uid'; END IF;
  IF auth.uid() IS NULL OR (auth.uid() <> uid AND NOT public.has_role(auth.uid(), 'admin')) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN public._entitlement_core(uid);
END $$;
REVOKE ALL ON FUNCTION public.get_entitlement(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_entitlement(uuid) TO authenticated, service_role;

-- Period key + limit for a feature/source. NULL limit = unlimited.
CREATE OR REPLACE FUNCTION public._usage_rule(uid uuid, p_feature text, p_source text, OUT period_key text, OUT lim integer, OUT protective boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_month text := to_char(now() AT TIME ZONE 'Europe/Berlin','YYYY-MM');
        v_day text := to_char(now() AT TIME ZONE 'Europe/Berlin','YYYY-MM-DD');
        v_trial text;
BEGIN
  protective := false;
  SELECT 'trial:' || COALESCE(to_char(tg.granted_at,'YYYYMMDDHH24MISS'), to_char(p.subscription_expires_at,'YYYYMMDDHH24MISS'))
    INTO v_trial FROM public.profiles p LEFT JOIN public.trial_grants tg ON tg.user_id = p.id WHERE p.id = uid;
  IF p_feature IN ('document_analysis','assistant_reply') THEN
    IF p_source = 'trial' THEN period_key := v_trial; lim := CASE p_feature WHEN 'document_analysis' THEN 2 ELSE 10 END;
    ELSIF p_source = 'new_yearly' THEN period_key := 'm:' || v_month; lim := CASE p_feature WHEN 'document_analysis' THEN 5 ELSE 40 END;
    ELSIF p_source IN ('admin','legacy_lifetime','legacy_sub') THEN period_key := 'm:' || v_month; lim := NULL;
    ELSE -- free
      period_key := 'd:' || v_day;
      IF p_feature = 'assistant_reply' THEN lim := 30; protective := true; ELSE lim := 0; END IF;
    END IF;
  ELSIF p_feature = 'tts_generation' THEN period_key := 'd:' || v_day; lim := 100; protective := true;
  ELSIF p_feature = 'trainer_generation' THEN period_key := 'd:' || v_day; lim := 40; protective := true;
  ELSIF p_feature = 'nebenkosten_scan' THEN period_key := 'd:' || v_day; lim := 10; protective := true;
  END IF;
END $$;
REVOKE ALL ON FUNCTION public._usage_rule(uuid,text,text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public._usage_count(uid uuid, p_feature text, p_period text)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT count(*)::int FROM public.usage_events
   WHERE user_id = uid AND feature = p_feature AND period_key = p_period AND legacy_credit_id IS NULL
     AND (status = 'committed' OR (status = 'reserved' AND created_at > now() - interval '10 minutes'));
$$;
REVOKE ALL ON FUNCTION public._usage_count(uuid,text,text) FROM PUBLIC, anon, authenticated;

-- Atomic, idempotent reservation. Service role only.
CREATE OR REPLACE FUNCTION public.reserve_usage(uid uuid, p_feature text, p_request_id text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE ent jsonb; v_source text; r record; v_used int; v_id uuid; v_credit uuid; v_mode text := 'full';
        v_enforce boolean; ex public.usage_events%ROWTYPE;
BEGIN
  IF uid IS NULL OR p_request_id IS NULL OR length(p_request_id) < 8 THEN RAISE EXCEPTION 'bad args'; END IF;
  SELECT * INTO ex FROM public.usage_events WHERE request_id = p_request_id;
  IF FOUND THEN
    IF ex.user_id <> uid THEN RAISE EXCEPTION 'request id conflict'; END IF;
    RETURN jsonb_build_object('ok', ex.status <> 'released', 'reservation_id', ex.id, 'source', ex.source, 'mode', ex.mode, 'idempotent', true);
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(uid::text || ':' || p_feature, 0));
  SELECT protective_caps_enforced INTO v_enforce FROM public.entitlement_settings WHERE id = 1;
  ent := public._entitlement_core(uid); v_source := ent->>'source';
  SELECT * INTO r FROM public._usage_rule(uid, p_feature, v_source);
  v_used := public._usage_count(uid, p_feature, r.period_key);

  IF r.lim IS NOT NULL AND v_used >= r.lim THEN
    IF p_feature = 'document_analysis' THEN
      v_credit := public.reserve_doc_check_credit(uid);  -- honor previously purchased credits
      IF v_credit IS NULL THEN
        RETURN jsonb_build_object('ok', false, 'reason', CASE WHEN v_source = 'free' THEN 'access_required' ELSE 'quota_exhausted' END,
                                  'source', v_source, 'used', v_used, 'limit', r.lim);
      END IF;
      v_mode := 'legacy_credit';
    ELSIF p_feature = 'assistant_reply' AND v_source IN ('trial','new_yearly') THEN
      -- quota used up: fall back to the basic (free) assistant instead of blocking
      v_source := 'free'; SELECT * INTO r FROM public._usage_rule(uid, p_feature, 'free');
      v_used := public._usage_count(uid, p_feature, r.period_key); v_mode := 'basic';
      IF v_used >= r.lim AND COALESCE(v_enforce,false) THEN
        RETURN jsonb_build_object('ok', false, 'reason', 'daily_cap', 'source', v_source, 'used', v_used, 'limit', r.lim);
      END IF;
    ELSIF r.protective AND NOT COALESCE(v_enforce,false) THEN
      NULL; -- shadow mode: record but do not block
    ELSE
      RETURN jsonb_build_object('ok', false, 'reason', CASE WHEN r.protective THEN 'daily_cap' ELSE 'quota_exhausted' END,
                                'source', v_source, 'used', v_used, 'limit', r.lim);
    END IF;
  END IF;
  IF p_feature = 'assistant_reply' AND v_source = 'free' THEN v_mode := 'basic'; END IF;

  INSERT INTO public.usage_events (user_id, feature, source, mode, period_key, request_id, legacy_credit_id, shadow)
  VALUES (uid, p_feature, v_source, v_mode, r.period_key, p_request_id, v_credit,
          r.protective AND r.lim IS NOT NULL AND v_used >= r.lim)
  RETURNING id INTO v_id;
  RETURN jsonb_build_object('ok', true, 'reservation_id', v_id, 'source', v_source, 'mode', v_mode,
                            'used', v_used + 1, 'limit', r.lim);
END $$;
REVOKE ALL ON FUNCTION public.reserve_usage(uuid,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_usage(uuid,text,text) TO service_role;

CREATE OR REPLACE FUNCTION public.commit_usage(reservation_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  UPDATE public.usage_events SET status = 'committed', finalized_at = now() WHERE id = reservation_id AND status = 'reserved';
  RETURN FOUND;
END $$;
REVOKE ALL ON FUNCTION public.commit_usage(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.commit_usage(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.release_usage(reservation_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_credit uuid;
BEGIN
  UPDATE public.usage_events SET status = 'released', finalized_at = now()
   WHERE id = reservation_id AND status = 'reserved' RETURNING legacy_credit_id INTO v_credit;
  IF NOT FOUND THEN RETURN false; END IF;
  IF v_credit IS NOT NULL THEN PERFORM public.release_doc_check_credit(v_credit); END IF;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.release_usage(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.release_usage(uuid) TO service_role;

-- Client-readable access + counters.
CREATE OR REPLACE FUNCTION public.get_feature_access(uid uuid)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE ent jsonb; v_source text; f text; r record; v_used int; feats jsonb := '{}'::jsonb; tg public.trial_grants%ROWTYPE;
BEGIN
  IF uid IS NULL OR auth.uid() IS NULL OR (auth.uid() <> uid AND NOT public.has_role(auth.uid(), 'admin')) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  ent := public._entitlement_core(uid); v_source := ent->>'source';
  FOREACH f IN ARRAY ARRAY['document_analysis','assistant_reply'] LOOP
    SELECT * INTO r FROM public._usage_rule(uid, f, v_source);
    v_used := public._usage_count(uid, f, r.period_key);
    feats := feats || jsonb_build_object(f, jsonb_build_object('used', v_used, 'limit', r.lim,
      'remaining', CASE WHEN r.lim IS NULL THEN NULL ELSE GREATEST(r.lim - v_used, 0) END));
  END LOOP;
  SELECT * INTO tg FROM public.trial_grants WHERE user_id = uid;
  RETURN ent || jsonb_build_object('features', feats,
    'trial', CASE WHEN tg.user_id IS NULL THEN NULL ELSE jsonb_build_object('granted_at', tg.granted_at, 'expires_at', tg.expires_at) END);
END $$;
REVOKE ALL ON FUNCTION public.get_feature_access(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_feature_access(uuid) TO authenticated, service_role;

-- Anonymous aggregate audit for admins (no user ids, no content).
CREATE OR REPLACE FUNCTION public.get_usage_aggregates(_days integer DEFAULT 30)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  RETURN (SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
    SELECT feature, source, mode, status, shadow, count(*)::int AS n
      FROM public.usage_events WHERE created_at >= now() - make_interval(days => GREATEST(_days,1))
     GROUP BY 1,2,3,4,5 ORDER BY 1,2) t);
END $$;
REVOKE ALL ON FUNCTION public.get_usage_aggregates(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_usage_aggregates(integer) TO authenticated;

-- One 7-day trial after VERIFIED email; never for accounts with any prior trial/paid history.
CREATE OR REPLACE FUNCTION public.grant_signup_trial(uid uuid, p_email text, p_created_at timestamptz)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE s public.entitlement_settings%ROWTYPE; v_hash text; v_tier text;
BEGIN
  SELECT * INTO s FROM public.entitlement_settings WHERE id = 1;
  IF NOT COALESCE(s.trial_signup_enabled,false) OR s.trial_rollout_at IS NULL OR p_created_at < s.trial_rollout_at THEN RETURN false; END IF;
  IF uid IS NULL OR p_email IS NULL THEN RETURN false; END IF;
  v_hash := encode(extensions.digest(lower(trim(p_email)), 'sha256'), 'hex');
  IF EXISTS (SELECT 1 FROM public.trial_grants WHERE user_id = uid OR email_hash = v_hash) THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.trial_redemptions WHERE user_id = uid)
     OR EXISTS (SELECT 1 FROM public.mreza_payments WHERE user_id = uid)
     OR EXISTS (SELECT 1 FROM public.payments WHERE user_id = uid)
     OR EXISTS (SELECT 1 FROM public.doc_check_credits WHERE user_id = uid) THEN RETURN false; END IF;
  INSERT INTO public.profiles (id, email, is_premium, subscription_tier) VALUES (uid, p_email, false, 'free') ON CONFLICT (id) DO NOTHING;
  SELECT subscription_tier INTO v_tier FROM public.profiles WHERE id = uid;
  IF COALESCE(v_tier,'free') <> 'free' THEN RETURN false; END IF;
  INSERT INTO public.trial_grants (user_id, email_hash, expires_at) VALUES (uid, v_hash, now() + interval '7 days');
  UPDATE public.profiles SET is_premium = true, subscription_tier = 'trial', subscription_expires_at = now() + interval '7 days' WHERE id = uid;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.grant_signup_trial(uuid,text,timestamptz) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.handle_user_email_confirmed()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND (TG_OP = 'INSERT' OR OLD.email_confirmed_at IS NULL) THEN
    BEGIN
      PERFORM public.grant_signup_trial(NEW.id, NEW.email, NEW.created_at);
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'trial grant skipped: %', SQLSTATE;  -- never block signup
    END;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS z_on_auth_user_email_confirmed ON auth.users;
CREATE TRIGGER z_on_auth_user_email_confirmed
  AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_email_confirmed();