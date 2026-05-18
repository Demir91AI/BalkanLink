REVOKE EXECUTE ON FUNCTION public.get_admin_stats() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_admin_payments(integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_admin_users(text, integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_admin_users_list(text, text, integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_admin_dashboard_extra() FROM anon;

GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_payments(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_users(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_users_list(text, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_extra() TO authenticated;