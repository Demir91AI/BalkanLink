CREATE OR REPLACE FUNCTION public.get_entitlement(uid uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  p public.profiles%ROWTYPE;
  v_source text := 'free';
  v_until timestamptz := NULL;
  v_credits bigint := 0;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'missing uid'; END IF;
  IF auth.uid() IS NULL OR (auth.uid() <> uid AND NOT public.has_role(auth.uid(), 'admin')) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT * INTO p FROM public.profiles WHERE id = uid;
  SELECT count(*) INTO v_credits FROM public.doc_check_credits WHERE user_id = uid AND consumed_at IS NULL;

  IF public.has_role(uid, 'admin') THEN
    v_source := 'admin';
  ELSIF p.id IS NOT NULL AND p.subscription_tier = 'lifetime' THEN
    v_source := 'legacy_lifetime';
  ELSIF p.id IS NOT NULL AND COALESCE(p.is_premium,false)
        AND p.subscription_tier IN ('premium','premium_yearly')
        AND (p.subscription_expires_at IS NULL OR p.subscription_expires_at > now()) THEN
    v_source := 'legacy_sub'; v_until := p.subscription_expires_at;
  ELSIF p.id IS NOT NULL AND p.subscription_tier = 'annual'
        AND p.subscription_expires_at > now() THEN
    v_source := 'new_yearly'; v_until := p.subscription_expires_at;
  ELSIF p.id IS NOT NULL AND p.subscription_tier IN ('trial','launch_trial','influencer_trial')
        AND p.subscription_expires_at > now() THEN
    v_source := 'trial'; v_until := p.subscription_expires_at;
  END IF;

  RETURN jsonb_build_object(
    'source', v_source,
    'full_access', v_source <> 'free',
    'active_until', v_until,
    'unused_doc_credits', v_credits,
    'quota', CASE v_source
      WHEN 'new_yearly' THEN jsonb_build_object('period','month','assistant_replies',40,'document_analyses',5)
      WHEN 'trial' THEN jsonb_build_object('period','trial_total','assistant_replies',10,'document_analyses',2)
      WHEN 'free' THEN jsonb_build_object('period','none','assistant_replies',0,'document_analyses',0)
      ELSE jsonb_build_object('period','unlimited','assistant_replies',NULL,'document_analyses',NULL)
    END
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_entitlement(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_entitlement(uuid) TO authenticated, service_role;