
-- Remove duplicate SELECT policy on messages
DROP POLICY IF EXISTS "Users see own sent messages" ON public.messages;
