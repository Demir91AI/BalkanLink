
DROP VIEW IF EXISTS public.pro_services_public;
CREATE VIEW public.pro_services_public
  WITH (security_invoker = true) AS
  SELECT id, service_category, name_or_business, bundesland, city,
         city_lat, city_lng, description, phone, whatsapp, email, website,
         status, started_at, expires_at, created_at
  FROM public.pro_services
  WHERE status = 'ACTIVE';

-- Allow anon read on the underlying ACTIVE rows (excluding billing_email) via the view's invoker context.
-- We need a permissive SELECT policy on the table itself for anon/authenticated, but
-- since the view is security_invoker, RLS on pro_services applies to the caller.
-- Keep the columns visible by allowing SELECT only when status='ACTIVE'. App code must
-- query the view (never the table) for public listings.
DROP POLICY IF EXISTS "Public reads active rows for view" ON public.pro_services;
CREATE POLICY "Public reads active rows for view" ON public.pro_services
  FOR SELECT TO anon, authenticated
  USING (status = 'ACTIVE');

GRANT SELECT ON public.pro_services_public TO anon, authenticated;
