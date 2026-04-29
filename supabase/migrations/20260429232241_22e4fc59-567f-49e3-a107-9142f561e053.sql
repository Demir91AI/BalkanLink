CREATE OR REPLACE FUNCTION public.get_live_stats()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT jsonb_build_object(
    'totalUsers', (SELECT count(*)::int FROM public.profiles),
    'chatToday', (SELECT count(*)::int FROM public.chat_usage WHERE query_date = CURRENT_DATE),
    'docsToday', (SELECT COALESCE(sum(count), 0)::int FROM public.doc_check_usage WHERE used_at = CURRENT_DATE),
    'newToday', (SELECT count(*)::int FROM public.profiles WHERE created_at::date = CURRENT_DATE),
    'questionsToday', (SELECT count(*)::int FROM public.community_questions WHERE created_at::date = CURRENT_DATE AND status = 'published'),
    'questionsTotal', (SELECT count(*)::int FROM public.community_questions WHERE status = 'published'),
    'topQuestion', (
      SELECT to_jsonb(q) FROM (
        SELECT id, title, view_count
        FROM public.community_questions
        WHERE status = 'published'
        ORDER BY view_count DESC NULLS LAST, created_at DESC
        LIMIT 1
      ) q
    )
  )
$function$;