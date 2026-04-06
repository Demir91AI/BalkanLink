
-- 1) Revoke anon access to contact columns on rides
REVOKE SELECT (contact_phone, contact_whatsapp) ON public.rides FROM anon;

-- 2) Revoke anon access to contact_info on balkan_rides
REVOKE SELECT (contact_info) ON public.balkan_rides FROM anon;

-- 3) Fix user_form_access: replace admin ALL policy scoped to {public} with one scoped to {authenticated}
DROP POLICY IF EXISTS "Admins can manage all access" ON public.user_form_access;
CREATE POLICY "Admins can manage all access"
  ON public.user_form_access FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 4) Allow review owners to delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
