-- Recreate pro_services_public view as security_definer with only safe columns,
-- and drop the public SELECT policy on pro_services so sensitive PII (email,
-- phone, whatsapp, billing_email) is no longer readable directly via the table.

DROP VIEW IF EXISTS public.pro_services_public;

CREATE VIEW public.pro_services_public
  WITH (security_invoker = false) AS
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

-- Drop the permissive public SELECT policy on the underlying table.
-- Owners can still read their own rows via "Owner reads own pro_services"
-- and admins via "Admins can manage all pro_services". Public listings must
-- now go through the view, which only exposes non-sensitive columns.
DROP POLICY IF EXISTS "Public reads active rows for view" ON public.pro_services;

-- Tighten the admin ALL policy so it applies to authenticated only (not public).
DROP POLICY IF EXISTS "Admins can manage all pro_services" ON public.pro_services;
CREATE POLICY "Admins can manage all pro_services"
  ON public.pro_services
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Tighten ads admin policy to authenticated role only.
DROP POLICY IF EXISTS "Admins can manage all ads" ON public.ads;
CREATE POLICY "Admins can manage all ads"
  ON public.ads
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));