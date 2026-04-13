
-- Create a public view for pro_services that hides billing_email
CREATE OR REPLACE VIEW public.pro_services_public AS
SELECT
  id,
  service_category,
  name_or_business,
  bundesland,
  city,
  city_lat,
  city_lng,
  description,
  phone,
  whatsapp,
  email,
  website,
  status,
  started_at,
  expires_at,
  created_at,
  updated_at,
  user_id
FROM public.pro_services
WHERE status = 'ACTIVE'::pro_status;

-- Allow anyone to read from the view
GRANT SELECT ON public.pro_services_public TO anon, authenticated;
