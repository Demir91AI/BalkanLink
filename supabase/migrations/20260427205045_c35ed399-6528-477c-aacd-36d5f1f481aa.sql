-- Table to track one-off Document Check purchases
CREATE TABLE IF NOT EXISTS public.doc_check_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  stripe_session_id text NOT NULL UNIQUE,
  amount_cents integer NOT NULL DEFAULT 299,
  currency text NOT NULL DEFAULT 'EUR',
  created_at timestamptz NOT NULL DEFAULT now(),
  consumed_at timestamptz
);

CREATE INDEX IF NOT EXISTS doc_check_credits_user_unconsumed_idx
  ON public.doc_check_credits (user_id) WHERE consumed_at IS NULL;

ALTER TABLE public.doc_check_credits ENABLE ROW LEVEL SECURITY;

-- Users can read their own credits
CREATE POLICY "Users read own doc credits"
  ON public.doc_check_credits FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Deny writes to clients; only service_role / SECURITY DEFINER funcs may write
CREATE POLICY "Anon denied doc credits"
  ON public.doc_check_credits FOR ALL
  TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "Authenticated cannot write doc credits"
  ON public.doc_check_credits FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Authenticated cannot update doc credits"
  ON public.doc_check_credits FOR UPDATE
  TO authenticated
  USING (false) WITH CHECK (false);

-- Idempotent grant (one credit per stripe session)
CREATE OR REPLACE FUNCTION public.grant_doc_check_credit(
  uid uuid,
  session_id text,
  amt_cents integer DEFAULT 299,
  curr text DEFAULT 'EUR'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted boolean := false;
BEGIN
  INSERT INTO public.doc_check_credits (user_id, stripe_session_id, amount_cents, currency)
  VALUES (uid, session_id, COALESCE(amt_cents, 299), COALESCE(curr, 'EUR'))
  ON CONFLICT (stripe_session_id) DO NOTHING;
  GET DIAGNOSTICS inserted = ROW_COUNT;
  RETURN inserted > 0;
END;
$$;

-- Atomic consume: marks one unconsumed credit as used
CREATE OR REPLACE FUNCTION public.consume_doc_check_credit(uid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  consumed_id uuid;
BEGIN
  UPDATE public.doc_check_credits
     SET consumed_at = now()
   WHERE id = (
     SELECT id FROM public.doc_check_credits
      WHERE user_id = uid AND consumed_at IS NULL
      ORDER BY created_at ASC
      LIMIT 1
      FOR UPDATE SKIP LOCKED
   )
   RETURNING id INTO consumed_id;
  RETURN consumed_id IS NOT NULL;
END;
$$;

REVOKE ALL ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_doc_check_credit(uuid) FROM PUBLIC;