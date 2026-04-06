
DROP POLICY IF EXISTS "Users can insert own role" ON public.user_roles;
CREATE POLICY "Users can insert own user role"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() AND role = 'user');
