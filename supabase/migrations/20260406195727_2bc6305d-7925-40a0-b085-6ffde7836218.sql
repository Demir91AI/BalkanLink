
-- 1. Add sender_id column to messages
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Drop old insecure INSERT policies
DROP POLICY IF EXISTS "Authenticated users can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.messages;

-- 3. New INSERT policy — users can only send as themselves
CREATE POLICY "Users can only send as themselves"
ON public.messages
FOR INSERT
TO authenticated
WITH CHECK (sender_id = auth.uid());

-- 4. Drop old insecure SELECT policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.messages;
DROP POLICY IF EXISTS "Public can read messages" ON public.messages;

-- 5. New SELECT policy — users see only messages they sent
CREATE POLICY "Users see own sent messages"
ON public.messages
FOR SELECT
TO authenticated
USING (sender_id = auth.uid());

-- 6. Keep existing admin read policy (already exists: "Admins can read messages")
