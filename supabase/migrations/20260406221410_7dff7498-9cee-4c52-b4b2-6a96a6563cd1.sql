
-- Revoke UPDATE on sensitive premium columns from authenticated users
REVOKE UPDATE(is_premium, subscription_tier, subscription_expires_at, single_formular_access) ON public.profiles FROM authenticated;
REVOKE UPDATE(is_premium, subscription_tier, subscription_expires_at, single_formular_access) ON public.profiles FROM anon;
