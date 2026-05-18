-- Compatibility views so existing admin RPC functions (which reference
-- legacy table names) keep working against the current schema.

CREATE OR REPLACE VIEW public.payments AS
SELECT
  id,
  user_id,
  (COALESCE(amount, 0) * 100)::int AS amount,         -- cents
  currency,
  lower(status::text)              AS status,         -- 'paid','pending',...
  paid_at,
  created_at
FROM public.mreza_payments;

CREATE OR REPLACE VIEW public.directory_listings AS
SELECT
  id,
  verified_by_admin AS verified,
  created_at
FROM public.community_listings;

-- The admin RPCs run as SECURITY DEFINER (owner) and already check
-- has_role(auth.uid(),'admin'), so no extra GRANTs are needed for clients.
REVOKE ALL ON public.payments FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.directory_listings FROM PUBLIC, anon, authenticated;