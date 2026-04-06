DROP POLICY "Users can read own access" ON public.user_form_access;

CREATE POLICY "Users can read own access"
ON public.user_form_access
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);