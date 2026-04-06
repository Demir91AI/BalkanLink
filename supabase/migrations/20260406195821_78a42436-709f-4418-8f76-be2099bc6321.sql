
-- 1. Drop old insecure INSERT policies
DROP POLICY IF EXISTS "Authenticated users can insert ads" ON public.ads;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.ads;

-- 2. Add user_id column
ALTER TABLE public.ads ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. New INSERT policy — ownership required
CREATE POLICY "Users can only post own ads"
ON public.ads
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- 4. UPDATE — only owner
CREATE POLICY "Users can update own ads"
ON public.ads
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- 5. DELETE — only owner
CREATE POLICY "Users can delete own ads"
ON public.ads
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
