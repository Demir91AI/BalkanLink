-- Allow users to delete their own form access (for dev reset)
CREATE POLICY "Users can delete own access"
ON public.user_form_access
FOR DELETE
USING (auth.uid() = user_id);
