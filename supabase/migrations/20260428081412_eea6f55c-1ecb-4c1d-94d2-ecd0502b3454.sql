
-- Trial codes (jedan kod po influenceru)
CREATE TABLE public.trial_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  duration_days INTEGER NOT NULL DEFAULT 7,
  max_uses INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID,
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_trial_codes_code_active ON public.trial_codes (code) WHERE is_active = true;

ALTER TABLE public.trial_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage trial_codes"
  ON public.trial_codes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anon denied trial_codes"
  ON public.trial_codes FOR ALL TO anon
  USING (false) WITH CHECK (false);

-- Trial redemptions (jedan user = jedan trial)
CREATE TABLE public.trial_redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  trial_code_id UUID NOT NULL REFERENCES public.trial_codes(id) ON DELETE RESTRICT,
  code TEXT NOT NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  deactivated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_trial_redemptions_expires ON public.trial_redemptions (expires_at) WHERE deactivated_at IS NULL;
CREATE INDEX idx_trial_redemptions_code ON public.trial_redemptions (trial_code_id);

ALTER TABLE public.trial_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage redemptions"
  ON public.trial_redemptions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users read own redemptions"
  ON public.trial_redemptions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anon denied redemptions"
  ON public.trial_redemptions FOR ALL TO anon
  USING (false) WITH CHECK (false);

-- SECURITY DEFINER funkcija za redeem (atomski + sigurno)
CREATE OR REPLACE FUNCTION public.redeem_trial_code(_user_id UUID, _code TEXT)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code RECORD;
  v_expires TIMESTAMP WITH TIME ZONE;
  v_existing UUID;
BEGIN
  IF _user_id IS NULL OR _code IS NULL OR length(trim(_code)) = 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'invalid_input');
  END IF;

  -- Već iskorišten trial?
  SELECT id INTO v_existing FROM public.trial_redemptions WHERE user_id = _user_id LIMIT 1;
  IF v_existing IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'already_redeemed');
  END IF;

  -- Validacija koda + lock
  SELECT * INTO v_code FROM public.trial_codes
   WHERE upper(code) = upper(trim(_code))
     AND is_active = true
   FOR UPDATE;

  IF v_code IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'invalid_code');
  END IF;

  IF v_code.expires_at IS NOT NULL AND v_code.expires_at < now() THEN
    RETURN jsonb_build_object('success', false, 'error', 'code_expired');
  END IF;

  IF v_code.max_uses IS NOT NULL AND v_code.used_count >= v_code.max_uses THEN
    RETURN jsonb_build_object('success', false, 'error', 'code_exhausted');
  END IF;

  v_expires := now() + (v_code.duration_days || ' days')::interval;

  -- Aktiviraj Premium
  UPDATE public.profiles
     SET is_premium = true,
         subscription_tier = 'influencer_trial',
         subscription_expires_at = v_expires
   WHERE id = _user_id;

  -- Zapiši redemption
  INSERT INTO public.trial_redemptions (user_id, trial_code_id, code, expires_at)
  VALUES (_user_id, v_code.id, v_code.code, v_expires);

  -- Increment counter
  UPDATE public.trial_codes SET used_count = used_count + 1 WHERE id = v_code.id;

  RETURN jsonb_build_object('success', true, 'expires_at', v_expires, 'days', v_code.duration_days);
END;
$$;

-- Funkcija koju zove cron za deaktiviranje isteklih
CREATE OR REPLACE FUNCTION public.deactivate_expired_trials()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_count INTEGER;
BEGIN
  WITH expired AS (
    UPDATE public.trial_redemptions
       SET deactivated_at = now()
     WHERE deactivated_at IS NULL
       AND expires_at < now()
    RETURNING user_id
  )
  UPDATE public.profiles p
     SET is_premium = false,
         subscription_tier = 'free',
         subscription_expires_at = NULL
    FROM expired e
   WHERE p.id = e.user_id
     AND p.subscription_tier = 'influencer_trial';

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;
