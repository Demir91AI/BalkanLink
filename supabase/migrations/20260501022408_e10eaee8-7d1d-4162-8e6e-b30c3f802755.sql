-- ── Tabela: dnevno trošenje besplatnih Premium provjera ──
CREATE TABLE IF NOT EXISTS public.doc_check_premium_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  check_date DATE NOT NULL DEFAULT (now() AT TIME ZONE 'Europe/Berlin')::date,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS doc_check_premium_usage_user_date_idx
  ON public.doc_check_premium_usage (user_id, check_date);

ALTER TABLE public.doc_check_premium_usage ENABLE ROW LEVEL SECURITY;

-- DENY za sve role osim service_role (edge funkcija koristi servisni ključ)
CREATE POLICY "Deny all to anon"
  ON public.doc_check_premium_usage FOR ALL
  TO anon USING (false) WITH CHECK (false);

CREATE POLICY "Deny all to authenticated"
  ON public.doc_check_premium_usage FOR ALL
  TO authenticated USING (false) WITH CHECK (false);

-- ── RPC: dohvat statusa za brojač (Premium remaining + paid credits) ──
CREATE OR REPLACE FUNCTION public.get_doc_check_status(uid UUID)
RETURNS TABLE (
  is_premium BOOLEAN,
  premium_daily_limit INT,
  premium_used_today INT,
  premium_remaining_today INT,
  paid_credits BIGINT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_premium BOOLEAN;
  v_used INT;
  v_credits BIGINT;
  v_today DATE := (now() AT TIME ZONE 'Europe/Berlin')::date;
  v_limit CONSTANT INT := 5;
BEGIN
  -- Premium status (mora biti aktivan)
  SELECT
    COALESCE(p.is_premium, false)
      AND (p.subscription_expires_at IS NULL OR p.subscription_expires_at > now())
    INTO v_is_premium
  FROM public.profiles p
  WHERE p.id = uid;

  IF v_is_premium IS NULL THEN v_is_premium := false; END IF;

  -- Premium dnevna potrošnja
  SELECT COUNT(*)::int INTO v_used
  FROM public.doc_check_premium_usage
  WHERE user_id = uid AND check_date = v_today;

  -- Plaćeni krediti (jednokratni 2,99€)
  SELECT COUNT(*) INTO v_credits
  FROM public.doc_check_credits
  WHERE user_id = uid AND consumed_at IS NULL;

  RETURN QUERY SELECT
    v_is_premium,
    v_limit,
    v_used,
    GREATEST(v_limit - v_used, 0),
    COALESCE(v_credits, 0);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_doc_check_status(UUID) TO authenticated;

-- ── RPC: zabilježi jednu Premium besplatnu upotrebu (vraća true ako je upisana) ──
CREATE OR REPLACE FUNCTION public.consume_premium_doc_check(uid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_used INT;
  v_today DATE := (now() AT TIME ZONE 'Europe/Berlin')::date;
  v_limit CONSTANT INT := 5;
BEGIN
  SELECT COUNT(*)::int INTO v_used
  FROM public.doc_check_premium_usage
  WHERE user_id = uid AND check_date = v_today;

  IF v_used >= v_limit THEN
    RETURN false;
  END IF;

  INSERT INTO public.doc_check_premium_usage (user_id, check_date)
  VALUES (uid, v_today);

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_premium_doc_check(UUID) FROM PUBLIC;
-- Samo service_role smije pozvati (poziva se iz edge funkcije)