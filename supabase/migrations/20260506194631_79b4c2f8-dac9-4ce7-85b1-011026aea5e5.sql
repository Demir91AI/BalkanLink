GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_users(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_payments(integer) TO authenticated;