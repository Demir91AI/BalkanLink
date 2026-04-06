-- 1. Add user_id column to mreza_payments
ALTER TABLE public.mreza_payments ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Drop old INSERT policy
DROP POLICY IF EXISTS "Authenticated users can insert pending payments" ON public.mreza_payments;

-- 3. Create scoped INSERT policy requiring user_id = auth.uid()
CREATE POLICY "Authenticated users can insert own pending payments"
ON public.mreza_payments
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() AND status = 'PENDING'::payment_status);

-- 4. Add SELECT policy so users can read own payments
CREATE POLICY "Users can read own mreza_payments"
ON public.mreza_payments
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 5. Tighten INSERT policies on other tables (reviews already requires auth, just add user_id check where possible)
-- reviews: require user_id = auth.uid()
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON public.reviews;
CREATE POLICY "Authenticated users can insert own reviews"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- messages: no user_id column, but restrict content length via application. Keep auth-only.
-- ads, directory_listings, pro_services, messages: no user_id, keep WITH CHECK(true) for authenticated only.
