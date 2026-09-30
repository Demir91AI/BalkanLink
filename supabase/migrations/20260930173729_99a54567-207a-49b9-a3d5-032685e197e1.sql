CREATE OR REPLACE FUNCTION public.has_full_access(uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(uid, 'admin')
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = uid AND (
         p.subscription_tier = 'lifetime'
         OR (p.is_premium AND (p.subscription_expires_at IS NULL OR p.subscription_expires_at > now()))
       ));
$$;
REVOKE ALL ON FUNCTION public.has_full_access(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_full_access(uuid) TO authenticated, service_role;