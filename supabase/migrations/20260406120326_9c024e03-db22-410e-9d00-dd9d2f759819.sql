
-- 1. Remove user_roles self-INSERT policy (handle_new_user trigger already assigns 'user' role)
DROP POLICY IF EXISTS "Users can insert own user role" ON public.user_roles;

-- 2. Fix messages: restrict SELECT to admin-only (no user_id scoping available)
DROP POLICY IF EXISTS "Authenticated users can read messages" ON public.messages;
CREATE POLICY "Admins can read messages"
ON public.messages FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Hide owner_email in ads from anon users via column-level grants
REVOKE SELECT ON public.ads FROM anon;
GRANT SELECT (id, type, domain, category, title, description, bundesland, city, city_lat, city_lng, contact_type, contact_value, status, created_at, activated_at, expires_at, reported_count, last_reported_at) ON public.ads TO anon;

-- 4. Hide billing_email in pro_services from anon users
REVOKE SELECT ON public.pro_services FROM anon;
GRANT SELECT (id, service_category, name_or_business, description, bundesland, city, city_lat, city_lng, phone, whatsapp, website, email, status, started_at, expires_at, created_at, updated_at) ON public.pro_services TO anon;

-- 5. Restrict pro_services INSERT to authenticated
DROP POLICY IF EXISTS "Anyone can insert pro_services" ON public.pro_services;
CREATE POLICY "Authenticated users can insert pro_services"
ON public.pro_services FOR INSERT
TO authenticated
WITH CHECK (true);
