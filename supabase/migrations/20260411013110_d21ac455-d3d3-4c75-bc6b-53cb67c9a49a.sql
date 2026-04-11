
-- 1. Revoke SELECT on owner_email from anon and authenticated
REVOKE SELECT (owner_email) ON public.ads FROM anon, authenticated;

-- 2. Replace the permissive UPDATE policy with one that has WITH CHECK
-- preventing users from modifying system-managed fields
DROP POLICY IF EXISTS "Users can update own ads" ON public.ads;

CREATE POLICY "Users can update own ads"
ON public.ads
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND status = (SELECT a.status FROM public.ads a WHERE a.id = ads.id)
  AND reported_count = (SELECT a.reported_count FROM public.ads a WHERE a.id = ads.id)
  AND expires_at IS NOT DISTINCT FROM (SELECT a.expires_at FROM public.ads a WHERE a.id = ads.id)
  AND activated_at IS NOT DISTINCT FROM (SELECT a.activated_at FROM public.ads a WHERE a.id = ads.id)
  AND last_reported_at IS NOT DISTINCT FROM (SELECT a.last_reported_at FROM public.ads a WHERE a.id = ads.id)
  AND created_at = (SELECT a.created_at FROM public.ads a WHERE a.id = ads.id)
);
