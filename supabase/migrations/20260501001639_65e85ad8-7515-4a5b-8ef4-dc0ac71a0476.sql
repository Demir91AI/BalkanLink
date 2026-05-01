CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_promo_end CONSTANT timestamptz := '2026-05-31 23:59:59+00';
  v_is_promo boolean := now() <= v_promo_end;
  v_expires timestamptz := CASE WHEN v_is_promo THEN now() + interval '7 days' ELSE NULL END;
BEGIN
  INSERT INTO public.profiles (id, email, is_premium, subscription_tier, subscription_expires_at)
  VALUES (
    NEW.id,
    NEW.email,
    v_is_promo,
    CASE WHEN v_is_promo THEN 'launch_trial' ELSE 'free' END,
    v_expires
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$function$;

-- Backfill cleanup: ensure expired launch_trials get downgraded by existing trial deactivator pattern
CREATE OR REPLACE FUNCTION public.deactivate_expired_launch_trials()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_count INTEGER;
BEGIN
  UPDATE public.profiles
     SET is_premium = false,
         subscription_tier = 'free',
         subscription_expires_at = NULL
   WHERE subscription_tier = 'launch_trial'
     AND subscription_expires_at IS NOT NULL
     AND subscription_expires_at < now();
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$function$;