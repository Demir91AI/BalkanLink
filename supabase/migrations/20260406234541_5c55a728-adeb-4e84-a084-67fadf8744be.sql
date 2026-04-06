DROP POLICY "Users can delete own access" ON public.user_form_access;

CREATE POLICY "Users can delete own access"
ON public.user_form_access
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);