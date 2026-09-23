REVOKE ALL ON FUNCTION public.consume_doc_check(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_doc_check(uuid, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.get_doc_check_status(uid uuid)
RETURNS TABLE(is_premium boolean, premium_daily_limit integer, premium_used_today integer, premium_remaining_today integer, paid_credits bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_is_premium boolean; v_credits bigint;
BEGIN
  IF auth.uid() IS NOT NULL AND auth.uid() <> uid AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  SELECT COALESCE(p.is_premium,false) AND (p.subscription_expires_at IS NULL OR p.subscription_expires_at > now())
    INTO v_is_premium FROM public.profiles p WHERE p.id = uid;
  SELECT COUNT(*) INTO v_credits FROM public.doc_check_credits WHERE user_id = uid AND consumed_at IS NULL;
  RETURN QUERY SELECT COALESCE(v_is_premium,false), 0, 0, 0, COALESCE(v_credits,0);
END; $$;
REVOKE ALL ON FUNCTION public.get_doc_check_status(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_doc_check_status(uuid) TO authenticated, service_role;