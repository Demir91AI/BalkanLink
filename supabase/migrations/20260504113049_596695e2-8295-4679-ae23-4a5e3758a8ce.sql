-- Make handle_new_user idempotent (in case profile already exists)
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
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$function$;

-- Recreate the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();