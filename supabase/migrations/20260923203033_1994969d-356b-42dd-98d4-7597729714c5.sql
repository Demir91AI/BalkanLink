CREATE OR REPLACE FUNCTION public.is_legacy_doccheck_user(uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = uid
      AND COALESCE(p.is_premium,false)
      AND p.subscription_tier IN ('premium','lifetime')
      AND (p.subscription_tier = 'lifetime' OR p.subscription_expires_at IS NULL OR p.subscription_expires_at > now() - interval '3 days')
  ) AND NOT EXISTS (
    SELECT 1 FROM public.mreza_payments m
    WHERE m.user_id = uid AND m.product_type = 'PLUS_LIFETIME' AND m.status = 'PAID'
  )
$$;
REVOKE ALL ON FUNCTION public.is_legacy_doccheck_user(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_legacy_doccheck_user(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.get_doc_check_status(uid uuid)
 RETURNS TABLE(is_premium boolean, premium_daily_limit integer, premium_used_today integer, premium_remaining_today integer, paid_credits bigint)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE v_legacy boolean; v_credits bigint; v_used int; v_limit int := 5;
BEGIN
  IF auth.uid() IS NOT NULL AND auth.uid() <> uid AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  v_legacy := public.is_legacy_doccheck_user(uid);
  SELECT COUNT(*) INTO v_used FROM public.doc_check_premium_usage
    WHERE user_id = uid AND check_date = (now() AT TIME ZONE 'Europe/Berlin')::date;
  SELECT COUNT(*) INTO v_credits FROM public.doc_check_credits WHERE user_id = uid AND consumed_at IS NULL;
  IF v_legacy THEN
    RETURN QUERY SELECT true, v_limit, v_used, GREATEST(v_limit - v_used, 0), COALESCE(v_credits,0);
  ELSE
    RETURN QUERY SELECT false, 0, 0, 0, COALESCE(v_credits,0);
  END IF;
END; $function$;

-- Legacy quota: returns true and records usage if a free legacy check is available today.
CREATE OR REPLACE FUNCTION public.reserve_legacy_doc_check(uid uuid)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_used int; v_id uuid;
BEGIN
  IF NOT public.is_legacy_doccheck_user(uid) THEN RETURN NULL; END IF;
  PERFORM pg_advisory_xact_lock(hashtext('doccheck:' || uid::text));
  SELECT COUNT(*) INTO v_used FROM public.doc_check_premium_usage
    WHERE user_id = uid AND check_date = (now() AT TIME ZONE 'Europe/Berlin')::date;
  IF v_used >= 5 THEN RETURN NULL; END IF;
  INSERT INTO public.doc_check_premium_usage (user_id, check_date)
  VALUES (uid, (now() AT TIME ZONE 'Europe/Berlin')::date) RETURNING id INTO v_id;
  RETURN v_id;
END; $$;
CREATE OR REPLACE FUNCTION public.release_legacy_doc_check(usage_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM public.doc_check_premium_usage WHERE id = usage_id;
  RETURN FOUND;
END; $$;
REVOKE ALL ON FUNCTION public.reserve_legacy_doc_check(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_legacy_doc_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_legacy_doc_check(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.release_legacy_doc_check(uuid) TO service_role;