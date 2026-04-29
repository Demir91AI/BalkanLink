CREATE OR REPLACE FUNCTION public.get_live_stats()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'totalUsers', (SELECT count(*)::int FROM public.profiles),
    'chatToday', (SELECT count(*)::int FROM public.chat_usage WHERE query_date = CURRENT_DATE),
    'docsToday', (SELECT COALESCE(sum(count), 0)::int FROM public.doc_check_usage WHERE used_at = CURRENT_DATE),
    'newToday', (SELECT count(*)::int FROM public.profiles WHERE created_at::date = CURRENT_DATE)
  )
$$;

GRANT EXECUTE ON FUNCTION public.get_live_stats() TO anon, authenticated;