
-- 1. Hide sensitive contact columns in ads from anon
REVOKE SELECT (owner_email, contact_value) ON public.ads FROM anon;

-- 2. Hide admin-internal columns in community_listings from anon and authenticated
REVOKE SELECT (review_reason, needs_review, locked_fields, verified_by_admin) ON public.community_listings FROM anon, authenticated;

-- 3. Remove user self-insert policy on user_roles (handle_new_user trigger handles this)
DROP POLICY IF EXISTS "Users can only insert user role" ON public.user_roles;
