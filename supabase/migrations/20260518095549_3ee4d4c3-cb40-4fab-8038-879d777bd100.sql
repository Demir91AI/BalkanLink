-- Replace security definer view with security_invoker view + column-level grants.
DROP VIEW IF EXISTS public.pro_services_public;

CREATE VIEW public.pro_services_public
  WITH (security_invoker = true) AS
  SELECT
    id,
    service_category,
    name_or_business,
    bundesland,
    city,
    city_lat,
    city_lng,
    description,
    website,
    status,
    started_at,
    expires_at,
    created_at
  FROM public.pro_services
  WHERE status = 'ACTIVE';

GRANT SELECT ON public.pro_services_public TO anon, authenticated;

-- Re-create the public SELECT policy (needed for security_invoker view to work),
-- but column-level GRANTs below ensure sensitive PII cannot be read by anon/authenticated.
DROP POLICY IF EXISTS "Public reads active rows for view" ON public.pro_services;
CREATE POLICY "Public reads active rows for view"
  ON public.pro_services
  FOR SELECT
  TO anon, authenticated
  USING (status = 'ACTIVE');

-- Revoke broad table-level SELECT, then grant only safe columns.
REVOKE SELECT ON public.pro_services FROM anon, authenticated;

GRANT SELECT (
  id,
  service_category,
  name_or_business,
  bundesland,
  city,
  city_lat,
  city_lng,
  description,
  website,
  status,
  started_at,
  expires_at,
  created_at,
  user_id
) ON public.pro_services TO anon, authenticated;