
-- Tighten INSERT policies that were flagged

-- Profiles: only the trigger inserts (SECURITY DEFINER), restrict to matching auth.uid
DROP POLICY "Service can insert profiles" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- User roles: only the trigger inserts (SECURITY DEFINER), restrict to matching auth.uid
DROP POLICY "Service can insert roles" ON public.user_roles;
CREATE POLICY "Users can insert own role"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Directory listings: restrict to authenticated users submitting
DROP POLICY "Anyone can submit a listing" ON public.directory_listings;
CREATE POLICY "Authenticated users can submit a listing"
  ON public.directory_listings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Payments: restrict to authenticated users, must match their user_id
DROP POLICY "Service can insert payments" ON public.payments;
CREATE POLICY "Authenticated users can insert own payments"
  ON public.payments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
