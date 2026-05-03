CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_lower_unique
ON public.profiles (lower(email));

ALTER TABLE public.trial_codes
ALTER COLUMN max_uses SET DEFAULT 1;

CREATE OR REPLACE FUNCTION public.redeem_trial_code(_user_id uuid, _code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_code RECORD;
  v_expires TIMESTAMP WITH TIME ZONE;
  v_existing UUID;
  v_email TEXT;
BEGIN
  IF _user_id IS NULL OR _code IS NULL OR length(trim(_code)) = 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'invalid_input');
  END IF;

  SELECT id INTO v_existing FROM public.trial_redemptions WHERE user_id = _user_id LIMIT 1;
  IF v_existing IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'already_redeemed');
  END IF;

  SELECT * INTO v_code FROM public.trial_codes
   WHERE upper(code) = upper(trim(_code))
     AND is_active = true
   FOR UPDATE;

  IF v_code IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'invalid_code');
  END IF;

  IF v_code.expires_at IS NOT NULL AND v_code.expires_at < now() THEN
    UPDATE public.trial_codes SET is_active = false WHERE id = v_code.id;
    RETURN jsonb_build_object('success', false, 'error', 'code_expired');
  END IF;

  IF v_code.max_uses IS NOT NULL AND v_code.used_count >= v_code.max_uses THEN
    UPDATE public.trial_codes SET is_active = false WHERE id = v_code.id;
    RETURN jsonb_build_object('success', false, 'error', 'code_exhausted');
  END IF;

  v_expires := now() + (v_code.duration_days || ' days')::interval;

  SELECT email INTO v_email FROM auth.users WHERE id = _user_id;
  IF v_email IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'user_not_found');
  END IF;

  INSERT INTO public.profiles (id, email, is_premium, subscription_tier, subscription_expires_at)
  VALUES (_user_id, v_email, true, 'influencer_trial', v_expires)
  ON CONFLICT (id) DO UPDATE
    SET is_premium = true,
        subscription_tier = 'influencer_trial',
        subscription_expires_at = v_expires;

  INSERT INTO public.trial_redemptions (user_id, trial_code_id, code, expires_at)
  VALUES (_user_id, v_code.id, v_code.code, v_expires);

  UPDATE public.trial_codes
     SET used_count = used_count + 1,
         is_active = false
   WHERE id = v_code.id;

  RETURN jsonb_build_object('success', true, 'expires_at', v_expires, 'days', v_code.duration_days);
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) TO service_role;