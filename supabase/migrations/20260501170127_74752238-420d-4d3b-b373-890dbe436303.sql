CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_result jsonb;
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT jsonb_build_object(
    'totalUsers', (SELECT count(*)::int FROM profiles),
    'newToday', (SELECT count(*)::int FROM profiles WHERE created_at::date = CURRENT_DATE),
    'new7d', (SELECT count(*)::int FROM profiles WHERE created_at >= now() - interval '7 days'),
    'new30d', (SELECT count(*)::int FROM profiles WHERE created_at >= now() - interval '30 days'),
    'activePremium', (SELECT count(*)::int FROM profiles
      WHERE is_premium = true
      AND (subscription_expires_at IS NULL OR subscription_expires_at > now())
      AND subscription_tier NOT IN ('free', 'launch_trial', 'influencer_trial')),
    'trialUsers', (SELECT count(*)::int FROM profiles
      WHERE subscription_tier IN ('launch_trial', 'influencer_trial')
      AND subscription_expires_at > now()),
    'chatToday', (SELECT count(*)::int FROM chat_usage WHERE query_date = CURRENT_DATE),
    'chat7d', (SELECT count(*)::int FROM chat_usage WHERE used_at >= now() - interval '7 days'),
    'docsToday', (SELECT COALESCE(sum(count), 0)::int FROM doc_check_usage WHERE used_at = CURRENT_DATE),
    'viewsToday', (SELECT count(*)::int FROM page_views WHERE created_at::date = CURRENT_DATE),
    'views7d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '7 days'),
    'views30d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '30 days'),
    'pendingQuestions', (SELECT count(*)::int FROM community_questions WHERE status = 'pending'),
    -- DETAILED VISIT STATS
    'uniqueVisitorsToday', (SELECT count(DISTINCT COALESCE(user_id::text, user_agent))::int FROM page_views WHERE created_at::date = CURRENT_DATE),
    'uniqueVisitors7d', (SELECT count(DISTINCT COALESCE(user_id::text, user_agent))::int FROM page_views WHERE created_at >= now() - interval '7 days'),
    'uniqueVisitors30d', (SELECT count(DISTINCT COALESCE(user_id::text, user_agent))::int FROM page_views WHERE created_at >= now() - interval '30 days'),
    'loggedInViews7d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '7 days' AND user_id IS NOT NULL),
    'anonViews7d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '7 days' AND user_id IS NULL),
    'avgViewsPerDay30d', (SELECT COALESCE(round(count(*)::numeric / 30.0, 1), 0) FROM page_views WHERE created_at >= now() - interval '30 days'),
    'topPages', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT path, count(*)::int AS views
        FROM page_views
        WHERE created_at >= now() - interval '7 days'
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
      ) t
    ),
    'topReferrers', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT
          COALESCE(NULLIF(regexp_replace(referrer, '^https?://([^/]+).*', '\1'), ''), '(direct)') AS source,
          count(*)::int AS views
        FROM page_views
        WHERE created_at >= now() - interval '7 days'
        GROUP BY source
        ORDER BY views DESC
        LIMIT 8
      ) t
    ),
    'viewsByDay', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.day)::date), '[]'::jsonb) FROM (
        SELECT to_char(created_at::date, 'YYYY-MM-DD') AS day, count(*)::int AS views
        FROM page_views
        WHERE created_at >= now() - interval '14 days'
        GROUP BY created_at::date
        ORDER BY created_at::date
      ) t
    ),
    'viewsByHourToday', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.hour)::int), '[]'::jsonb) FROM (
        SELECT extract(hour from created_at)::int AS hour, count(*)::int AS views
        FROM page_views
        WHERE created_at::date = CURRENT_DATE
        GROUP BY extract(hour from created_at)
        ORDER BY hour
      ) t
    ),
    'topPages30d', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT path, count(*)::int AS views, count(DISTINCT COALESCE(user_id::text, user_agent))::int AS unique_visitors
        FROM page_views
        WHERE created_at >= now() - interval '30 days'
        GROUP BY path
        ORDER BY views DESC
        LIMIT 15
      ) t
    )
  ) INTO v_result;

  RETURN v_result;
END;
$function$;