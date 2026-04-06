
-- 1. Fix role escalation: restrict user_roles INSERT to only 'user' role
DROP POLICY IF EXISTS "Users can insert own role" ON public.user_roles;
CREATE POLICY "Users can insert own user role"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() AND role = 'user'::app_role);

-- 2. Fix messages public exposure: restrict to authenticated users only
DROP POLICY IF EXISTS "Anyone can read messages" ON public.messages;
CREATE POLICY "Authenticated users can read messages"
ON public.messages FOR SELECT
TO authenticated
USING (true);

-- 3. Fix unauthenticated inserts on reviews
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;
CREATE POLICY "Authenticated users can insert reviews"
ON public.reviews FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Fix unauthenticated inserts on ads
DROP POLICY IF EXISTS "Anyone can insert ads" ON public.ads;
CREATE POLICY "Authenticated users can insert ads"
ON public.ads FOR INSERT
TO authenticated
WITH CHECK (true);

-- 5. Fix unauthenticated inserts on mreza_payments
DROP POLICY IF EXISTS "Anyone can insert mreza_payments" ON public.mreza_payments;
CREATE POLICY "Authenticated users can insert mreza_payments"
ON public.mreza_payments FOR INSERT
TO authenticated
WITH CHECK (true);

-- 6. Fix unauthenticated inserts on messages
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
CREATE POLICY "Authenticated users can insert messages"
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (true);
