
-- 1. Make user_id NOT NULL (set any existing nulls to a placeholder first)
-- Delete any orphan ads with null user_id first
DELETE FROM public.ads WHERE user_id IS NULL;

ALTER TABLE public.ads ALTER COLUMN user_id SET NOT NULL;

-- 2. Create a public view that hides owner_email
CREATE VIEW public.ads_public
WITH (security_invoker = on) AS
SELECT
  id, type, domain, category, title, description,
  bundesland, city, city_lat, city_lng,
  contact_type, contact_value,
  created_at, activated_at, expires_at, status, user_id
FROM public.ads;

-- 3. Drop the old anon SELECT policy on the base table
DROP POLICY IF EXISTS "Anon can read active ads (safe columns)" ON public.ads;

-- 4. Replace with a policy that denies anon direct base-table reads
CREATE POLICY "Anon cannot read ads base table"
ON public.ads FOR SELECT
TO anon
USING (false);

-- 5. Grant anon SELECT on the view only
GRANT SELECT ON public.ads_public TO anon;
