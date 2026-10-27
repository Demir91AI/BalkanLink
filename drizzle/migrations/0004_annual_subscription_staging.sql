ALTER TABLE public.entitlement_settings
  ADD COLUMN IF NOT EXISTS annual_checkout_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS annual_live_mode_allowed boolean NOT NULL DEFAULT false;

CREATE TABLE public.stripe_webhook_events (
  event_id text PRIMARY KEY,
  event_type text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.stripe_webhook_events TO service_role;
ALTER TABLE public.stripe_webhook_events ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.annual_subscriptions (
  stripe_subscription_id text PRIMARY KEY,
  user_id uuid NOT NULL,
  stripe_customer_id text NOT NULL,
  status text NOT NULL,
  current_period_end timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX annual_subscriptions_user_idx ON public.annual_subscriptions(user_id);
GRANT SELECT ON public.annual_subscriptions TO authenticated;
GRANT ALL ON public.annual_subscriptions TO service_role;
ALTER TABLE public.annual_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own annual subscription" ON public.annual_subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Applies the fresh Stripe state of a NEW annual subscription. Never touches lifetime,
-- legacy premium or admin accounts; only rows it owns (tier annual/free/trial).
CREATE OR REPLACE FUNCTION public.apply_annual_subscription(
  uid uuid, p_sub_id text, p_customer_id text, p_status text,
  p_period_end timestamptz, p_cancel_at_period_end boolean, p_amount_cents integer,
  p_currency text, p_interval text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE
  v_tier text; v_prem boolean; v_exp timestamptz; v_owner uuid; v_active boolean;
BEGIN
  IF uid IS NULL OR p_sub_id IS NULL THEN RAISE EXCEPTION 'missing args'; END IF;
  IF p_amount_cents <> 1999 OR lower(p_currency) <> 'eur' OR p_interval <> 'year' THEN
    RAISE EXCEPTION 'annual price mismatch: % % %', p_amount_cents, p_currency, p_interval;
  END IF;
  SELECT user_id INTO v_owner FROM annual_subscriptions WHERE stripe_subscription_id = p_sub_id;
  IF v_owner IS NOT NULL AND v_owner <> uid THEN RAISE EXCEPTION 'subscription owner mismatch'; END IF;

  INSERT INTO annual_subscriptions(stripe_subscription_id, user_id, stripe_customer_id, status, current_period_end, cancel_at_period_end)
  VALUES (p_sub_id, uid, p_customer_id, p_status, p_period_end, p_cancel_at_period_end)
  ON CONFLICT (stripe_subscription_id) DO UPDATE SET status = EXCLUDED.status,
    current_period_end = EXCLUDED.current_period_end, cancel_at_period_end = EXCLUDED.cancel_at_period_end, updated_at = now();

  SELECT subscription_tier, is_premium, subscription_expires_at INTO v_tier, v_prem, v_exp FROM profiles WHERE id = uid;
  IF NOT FOUND THEN RETURN jsonb_build_object('applied', false, 'reason', 'no_profile'); END IF;
  IF public.has_role(uid, 'admin') OR v_tier = 'lifetime'
     OR (v_prem AND v_tier IN ('premium','premium_yearly')) THEN
    RETURN jsonb_build_object('applied', false, 'reason', 'legacy_precedence');
  END IF;

  -- past_due keeps access until the paid period ends; Stripe then cancels/marks unpaid.
  v_active := p_status IN ('active','past_due') AND p_period_end IS NOT NULL AND p_period_end > now();
  IF v_active THEN
    UPDATE profiles SET subscription_tier = 'annual', is_premium = true, subscription_expires_at = p_period_end WHERE id = uid;
    RETURN jsonb_build_object('applied', true, 'tier', 'annual');
  ELSIF v_tier = 'annual' AND NOT EXISTS (
      SELECT 1 FROM annual_subscriptions WHERE user_id = uid AND stripe_subscription_id <> p_sub_id
        AND status IN ('active','past_due') AND current_period_end > now()) THEN
    UPDATE profiles SET subscription_tier = 'free', is_premium = false, subscription_expires_at = NULL WHERE id = uid;
    RETURN jsonb_build_object('applied', true, 'tier', 'free');
  END IF;
  RETURN jsonb_build_object('applied', false, 'reason', 'no_change');
END; $$;
REVOKE ALL ON FUNCTION public.apply_annual_subscription(uuid,text,text,text,timestamptz,boolean,integer,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.apply_annual_subscription(uuid,text,text,text,timestamptz,boolean,integer,text,text) TO service_role;