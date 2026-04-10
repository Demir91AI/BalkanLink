
-- Fix: Prevent users from self-granting premium status
-- Drop existing permissive user update policy that doesn't restrict premium fields
DROP POLICY IF EXISTS "Users can update own display fields only" ON public.profiles;

-- Users can update their own profile but cannot change premium-related fields
CREATE POLICY "Users can update own non-premium fields"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND is_premium = (SELECT p.is_premium FROM public.profiles p WHERE p.id = auth.uid())
    AND subscription_tier = (SELECT p.subscription_tier FROM public.profiles p WHERE p.id = auth.uid())
    AND subscription_expires_at IS NOT DISTINCT FROM (SELECT p.subscription_expires_at FROM public.profiles p WHERE p.id = auth.uid())
    AND single_formular_access = (SELECT p.single_formular_access FROM public.profiles p WHERE p.id = auth.uid())
  );

-- Fix: Remove redundant UPDATE policy on user_roles that uses recursive subquery
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;

-- Fix: Remove redundant SELECT policy (already covered by "Admins can manage roles" ALL policy + "Users can view own roles")
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
