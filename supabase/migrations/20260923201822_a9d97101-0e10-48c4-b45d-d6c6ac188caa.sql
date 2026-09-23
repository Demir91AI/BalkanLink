-- BalkanLink Plus (19.90 one-time) + Dokumenten-Check 1.99 per check

ALTER TYPE public.payment_product_type ADD VALUE IF NOT EXISTS 'PLUS_LIFETIME';
ALTER TYPE public.payment_product_type ADD VALUE IF NOT EXISTS 'DOC_CHECK';

-- Idempotency key for Stripe payments
CREATE UNIQUE INDEX IF NOT EXISTS mreza_payments_provider_payment_id_key
  ON public.mreza_payments (provider_payment_id) WHERE provider_payment_id IS NOT NULL;

-- 1) Lifetime protection: once lifetime, no automated path can downgrade it.
CREATE OR REPLACE FUNCTION public.protect_lifetime_tier()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF OLD.subscription_tier = 'lifetime'
     AND COALESCE(current_setting('app.allow_lifetime_change', true), '') <> 'on' THEN
    NEW.subscription_tier := 'lifetime';
    NEW.is_premium := true;
    NEW.subscription_expires_at := NULL;
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS protect_lifetime_tier ON public.profiles;
CREATE TRIGGER protect_lifetime_tier BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_lifetime_tier();

-- Admin grant may deliberately change a lifetime tier (e.g. refund)
CREATE OR REPLACE FUNCTION public.grant_premium_access(target_user_id uuid, new_tier text DEFAULT 'premium'::text, new_expires_at timestamptz DEFAULT NULL)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NOT NULL AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  PERFORM set_config('app.allow_lifetime_change', 'on', true);
  UPDATE profiles SET
    is_premium = (new_tier <> 'free'),
    subscription_tier = new_tier,
    subscription_expires_at = new_expires_at
  WHERE id = target_user_id;
  PERFORM set_config('app.allow_lifetime_change', 'off', true);
END; $$;

-- 2) Server-side idempotent fulfillment (service role only)
CREATE OR REPLACE FUNCTION public.fulfill_stripe_checkout(
  uid uuid, session_id text, product_key text, amt_cents integer, curr text
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_inserted int := 0;
  v_ptype public.payment_product_type;
BEGIN
  IF uid IS NULL OR session_id IS NULL THEN RAISE EXCEPTION 'missing args'; END IF;
  IF product_key = 'plus' THEN
    IF amt_cents <> 1990 THEN RAISE EXCEPTION 'amount mismatch for plus: %', amt_cents; END IF;
    v_ptype := 'PLUS_LIFETIME';
  ELSIF product_key = 'doc_check' THEN
    IF amt_cents <> 199 THEN RAISE EXCEPTION 'amount mismatch for doc_check: %', amt_cents; END IF;
    v_ptype := 'DOC_CHECK';
  ELSE
    RAISE EXCEPTION 'unknown product %', product_key;
  END IF;

  INSERT INTO public.mreza_payments (product_type, product_id, amount, currency, provider, provider_payment_id, status, paid_at, user_id)
  VALUES (v_ptype, uid, amt_cents / 100.0, upper(COALESCE(curr,'EUR')), 'STRIPE', session_id, 'PAID', now(), uid)
  ON CONFLICT (provider_payment_id) WHERE provider_payment_id IS NOT NULL DO NOTHING;
  GET DIAGNOSTICS v_inserted = ROW_COUNT;

  IF product_key = 'plus' THEN
    -- idempotent regardless of v_inserted
    UPDATE public.profiles
       SET is_premium = true, subscription_tier = 'lifetime', subscription_expires_at = NULL
     WHERE id = uid;
  ELSE
    INSERT INTO public.doc_check_credits (user_id, stripe_session_id, amount_cents, currency)
    VALUES (uid, session_id, amt_cents, upper(COALESCE(curr,'EUR')))
    ON CONFLICT (stripe_session_id) DO NOTHING;
  END IF;

  RETURN jsonb_build_object('newly_recorded', v_inserted > 0, 'product', product_key);
END; $$;

-- 3) Document Check: no free quota for anyone. Reserve/release credits atomically.
CREATE OR REPLACE FUNCTION public.get_doc_check_status(uid uuid)
RETURNS TABLE(is_premium boolean, premium_daily_limit integer, premium_used_today integer, premium_remaining_today integer, paid_credits bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_is_premium boolean; v_credits bigint;
BEGIN
  SELECT COALESCE(p.is_premium,false) AND (p.subscription_expires_at IS NULL OR p.subscription_expires_at > now())
    INTO v_is_premium FROM public.profiles p WHERE p.id = uid;
  SELECT COUNT(*) INTO v_credits FROM public.doc_check_credits WHERE user_id = uid AND consumed_at IS NULL;
  RETURN QUERY SELECT COALESCE(v_is_premium,false), 0, 0, 0, COALESCE(v_credits,0);
END; $$;

CREATE OR REPLACE FUNCTION public.reserve_doc_check_credit(uid uuid)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid;
BEGIN
  UPDATE public.doc_check_credits SET consumed_at = now()
   WHERE id = (SELECT id FROM public.doc_check_credits
                WHERE user_id = uid AND consumed_at IS NULL
                ORDER BY created_at ASC LIMIT 1 FOR UPDATE SKIP LOCKED)
  RETURNING id INTO v_id;
  RETURN v_id;
END; $$;

CREATE OR REPLACE FUNCTION public.release_doc_check_credit(credit_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.doc_check_credits SET consumed_at = NULL WHERE id = credit_id AND consumed_at IS NOT NULL;
  RETURN FOUND;
END; $$;

CREATE OR REPLACE FUNCTION public.consume_premium_doc_check(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$ SELECT false $$;

ALTER TABLE public.doc_check_credits ALTER COLUMN amount_cents SET DEFAULT 199;

-- Lock down service-only functions
REVOKE ALL ON FUNCTION public.fulfill_stripe_checkout(uuid, text, text, integer, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.reserve_doc_check_credit(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_doc_check_credit(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.consume_doc_check_credit(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.consume_premium_doc_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_stripe_checkout(uuid, text, text, integer, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.reserve_doc_check_credit(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.release_doc_check_credit(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.consume_doc_check_credit(uuid) TO service_role;

-- 4) Remove expired launch-trial from signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_premium, subscription_tier, subscription_expires_at)
  VALUES (NEW.id, NEW.email, false, 'free', NULL)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;