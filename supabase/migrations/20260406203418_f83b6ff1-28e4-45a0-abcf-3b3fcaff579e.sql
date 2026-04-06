-- Block users from self-granting premium
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

CREATE POLICY "Users can update own safe fields only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid()
  AND is_premium = (SELECT is_premium FROM public.profiles WHERE id = auth.uid())
  AND subscription_tier = (SELECT subscription_tier FROM public.profiles WHERE id = auth.uid())
  AND subscription_expires_at IS NOT DISTINCT FROM (SELECT subscription_expires_at FROM public.profiles WHERE id = auth.uid())
  AND single_formular_access IS NOT DISTINCT FROM (SELECT single_formular_access FROM public.profiles WHERE id = auth.uid())
);

-- Block self-assign admin role
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Block self assign roles" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;

CREATE POLICY "Block self assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Block public read on messages
DROP POLICY IF EXISTS "Enable read access for all users" ON public.messages;
DROP POLICY IF EXISTS "Public can read messages" ON public.messages;
DROP POLICY IF EXISTS "Users see own messages only" ON public.messages;

CREATE POLICY "Users see own messages only"
ON public.messages
FOR SELECT
TO authenticated
USING (
  sender_id = auth.uid()
);