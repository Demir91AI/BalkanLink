
-- 1. PRIVILEGE ESCALATION: Remove user self-INSERT on user_form_access
DROP POLICY IF EXISTS "Users can insert own access" ON public.user_form_access;

-- 2. PAYWALL BYPASS: Restrict premium Q&A content
DROP POLICY IF EXISTS "Anyone can read qa_items" ON public.qa_items;
CREATE POLICY "Public can read free qa_items"
ON public.qa_items FOR SELECT
TO public
USING (is_premium = false);

CREATE POLICY "Premium users can read all qa_items"
ON public.qa_items FOR SELECT
TO authenticated
USING (
  is_premium = false
  OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.is_premium = true
  )
);

-- 3. PRIVILEGE ESCALATION: Restrict mreza_payments INSERT to PENDING status only
DROP POLICY IF EXISTS "Authenticated users can insert mreza_payments" ON public.mreza_payments;
CREATE POLICY "Authenticated users can insert pending payments"
ON public.mreza_payments FOR INSERT
TO authenticated
WITH CHECK (status = 'PENDING'::payment_status);

-- 4. PII EXPOSURE: Split ads SELECT policy by role
DROP POLICY IF EXISTS "Anyone can read active ads" ON public.ads;
CREATE POLICY "Anon can read active ads"
ON public.ads FOR SELECT
TO anon
USING (status = 'ACTIVE'::ad_status);

CREATE POLICY "Authenticated can read active ads"
ON public.ads FOR SELECT
TO authenticated
USING (status = 'ACTIVE'::ad_status);

-- 5. PII EXPOSURE: Split pro_services SELECT policy by role
DROP POLICY IF EXISTS "Anyone can read active pro_services" ON public.pro_services;
CREATE POLICY "Anon can read active pro_services"
ON public.pro_services FOR SELECT
TO anon
USING (status = 'ACTIVE'::pro_status);

CREATE POLICY "Authenticated can read active pro_services"
ON public.pro_services FOR SELECT
TO authenticated
USING (status = 'ACTIVE'::pro_status);
