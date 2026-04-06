
-- FIX 3: directory_listings
DROP POLICY IF EXISTS "Authenticated users can submit a listing" ON public.directory_listings;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.directory_listings;

ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE POLICY "Users can only post own listings"
ON public.directory_listings
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own listings"
ON public.directory_listings
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- FIX 4: pro_services
DROP POLICY IF EXISTS "Authenticated users can insert pro_services" ON public.pro_services;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.pro_services;

ALTER TABLE public.pro_services ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE POLICY "Users can only post own services"
ON public.pro_services
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own services"
ON public.pro_services
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- FIX 5: user_roles duplicate SELECT
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

-- FIX 6: user_roles privilege escalation — block all non-admin INSERT
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can insert user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert own role" ON public.user_roles;

-- Only admins can insert roles (using has_role function to avoid recursion)
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Also fix email_jobs: restrict admin policy to authenticated only
DROP POLICY IF EXISTS "Admins can manage email_jobs" ON public.email_jobs;
CREATE POLICY "Admins can manage email_jobs"
ON public.email_jobs
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
