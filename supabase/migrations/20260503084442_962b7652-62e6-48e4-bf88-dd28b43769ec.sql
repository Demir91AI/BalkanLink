-- Fix MRR: exclude lifetime/comped tiers from MRR (only paying recurring subs count)
CREATE OR REPLACE FUNCTION public.get_admin_stats()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_result jsonb;
  v_premium_price_cents INT := 999;
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
    'launchTrialUsers', (SELECT count(*)::int FROM profiles
      WHERE subscription_tier = 'launch_trial' AND subscription_expires_at > now()),
    'influencerTrialUsers', (SELECT count(*)::int FROM profiles
      WHERE subscription_tier = 'influencer_trial' AND subscription_expires_at > now()),
    'freeUsers', (SELECT count(*)::int FROM profiles WHERE subscription_tier = 'free' OR subscription_tier IS NULL),
    'chatToday', (SELECT count(*)::int FROM chat_usage WHERE query_date = CURRENT_DATE),
    'chat7d', (SELECT count(*)::int FROM chat_usage WHERE used_at >= now() - interval '7 days'),
    'chat30d', (SELECT count(*)::int FROM chat_usage WHERE used_at >= now() - interval '30 days'),
    'docsToday', (SELECT COALESCE(sum(count), 0)::int FROM doc_check_usage WHERE used_at = CURRENT_DATE),
    'docs7d', (SELECT COALESCE(sum(count), 0)::int FROM doc_check_usage WHERE used_at >= CURRENT_DATE - interval '7 days'),
    'docs30d', (SELECT COALESCE(sum(count), 0)::int FROM doc_check_usage WHERE used_at >= CURRENT_DATE - interval '30 days'),
    'viewsToday', (SELECT count(*)::int FROM page_views WHERE created_at::date = CURRENT_DATE),
    'views7d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '7 days'),
    'views30d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '30 days'),
    'pendingQuestions', (SELECT count(*)::int FROM community_questions WHERE status = 'pending'),
    'publishedQuestions', (SELECT count(*)::int FROM community_questions WHERE status = 'published'),
    'pendingDirectory', (SELECT count(*)::int FROM directory_listings WHERE verified = false),
    'verifiedDirectory', (SELECT count(*)::int FROM directory_listings WHERE verified = true),
    'totalReviews', (SELECT count(*)::int FROM reviews),
    'uniqueVisitorsToday', (SELECT count(DISTINCT COALESCE(user_id::text, user_agent))::int FROM page_views WHERE created_at::date = CURRENT_DATE),
    'uniqueVisitors7d', (SELECT count(DISTINCT COALESCE(user_id::text, user_agent))::int FROM page_views WHERE created_at >= now() - interval '7 days'),
    'uniqueVisitors30d', (SELECT count(DISTINCT COALESCE(user_id::text, user_agent))::int FROM page_views WHERE created_at >= now() - interval '30 days'),
    'loggedInViews7d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '7 days' AND user_id IS NOT NULL),
    'anonViews7d', (SELECT count(*)::int FROM page_views WHERE created_at >= now() - interval '7 days' AND user_id IS NULL),
    'avgViewsPerDay30d', (SELECT COALESCE(round(count(*)::numeric / 30.0, 1), 0) FROM page_views WHERE created_at >= now() - interval '30 days'),
    'revenueToday', (SELECT COALESCE(sum(amount), 0)::int FROM payments WHERE status IN ('paid','succeeded') AND COALESCE(paid_at, created_at)::date = CURRENT_DATE),
    'revenue7d', (SELECT COALESCE(sum(amount), 0)::int FROM payments WHERE status IN ('paid','succeeded') AND COALESCE(paid_at, created_at) >= now() - interval '7 days'),
    'revenue30d', (SELECT COALESCE(sum(amount), 0)::int FROM payments WHERE status IN ('paid','succeeded') AND COALESCE(paid_at, created_at) >= now() - interval '30 days'),
    'revenueAllTime', (SELECT COALESCE(sum(amount), 0)::int FROM payments WHERE status IN ('paid','succeeded')),
    'paidCount30d', (SELECT count(*)::int FROM payments WHERE status IN ('paid','succeeded') AND COALESCE(paid_at, created_at) >= now() - interval '30 days'),
    -- MRR: SAMO recurring paying subs (premium, premium_yearly). Lifetime/comped/trial NE računaju.
    'estimatedMrr', (SELECT count(*)::int * v_premium_price_cents FROM profiles
      WHERE is_premium = true
      AND (subscription_expires_at IS NULL OR subscription_expires_at > now())
      AND subscription_tier IN ('premium', 'premium_yearly')),
    'lifetimeUsers', (SELECT count(*)::int FROM profiles
      WHERE is_premium = true AND subscription_tier = 'lifetime'),
    'funnel', jsonb_build_object(
      'visitors', (SELECT count(DISTINCT COALESCE(user_id::text, user_agent))::int FROM page_views WHERE created_at >= now() - interval '30 days'),
      'signups', (SELECT count(*)::int FROM profiles WHERE created_at >= now() - interval '30 days'),
      'trialActive', (SELECT count(*)::int FROM profiles WHERE subscription_tier IN ('launch_trial','influencer_trial') AND subscription_expires_at > now()),
      'paid', (SELECT count(*)::int FROM profiles WHERE is_premium = true AND subscription_tier NOT IN ('free','launch_trial','influencer_trial'))
    ),
    'trialEndingSoon', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.expires_at)), '[]'::jsonb) FROM (
        SELECT id, email, first_name, subscription_tier, subscription_expires_at AS expires_at
        FROM profiles
        WHERE subscription_tier IN ('launch_trial','influencer_trial')
          AND subscription_expires_at > now()
          AND subscription_expires_at < now() + interval '7 days'
        ORDER BY subscription_expires_at ASC
        LIMIT 25
      ) t
    ),
    'topActiveUsers', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT p.email, p.first_name, count(c.*)::int AS chat_count
        FROM chat_usage c JOIN profiles p ON p.id = c.user_id
        WHERE c.used_at >= now() - interval '30 days'
        GROUP BY p.email, p.first_name
        ORDER BY chat_count DESC
        LIMIT 10
      ) t
    ),
    'emailStats', (
      SELECT jsonb_build_object(
        'sent', count(*) FILTER (WHERE status='sent'),
        'failed', count(*) FILTER (WHERE status IN ('dlq','failed','bounced','complained')),
        'suppressed', count(*) FILTER (WHERE status='suppressed'),
        'pending', count(*) FILTER (WHERE status='pending'),
        'total', count(*)
      ) FROM (
        SELECT DISTINCT ON (message_id) status
        FROM email_send_log
        WHERE message_id IS NOT NULL AND created_at >= now() - interval '7 days'
        ORDER BY message_id, created_at DESC
      ) latest
    ),
    'emailRecentFailures', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT DISTINCT ON (message_id) template_name, recipient_email, status, error_message, created_at
        FROM email_send_log
        WHERE status IN ('dlq','failed','bounced','complained')
          AND created_at >= now() - interval '14 days'
        ORDER BY message_id, created_at DESC
        LIMIT 15
      ) t
    ),
    'topPages', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT path, count(*)::int AS views
        FROM page_views WHERE created_at >= now() - interval '7 days'
        GROUP BY path ORDER BY views DESC LIMIT 10
      ) t
    ),
    'topReferrers', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT COALESCE(NULLIF(regexp_replace(referrer, '^https?://([^/]+).*', '\1'), ''), '(direct)') AS source,
               count(*)::int AS views
        FROM page_views WHERE created_at >= now() - interval '7 days'
        GROUP BY source ORDER BY views DESC LIMIT 8
      ) t
    ),
    'topCountries', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT country, count(*)::int AS views,
               count(DISTINCT COALESCE(user_id::text, ip_hash, user_agent))::int AS unique_visitors
        FROM page_views
        WHERE created_at >= now() - interval '7 days' AND country IS NOT NULL
        GROUP BY country ORDER BY views DESC LIMIT 12
      ) t
    ),
    'topCities', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT city, country, count(*)::int AS views,
               count(DISTINCT COALESCE(user_id::text, ip_hash, user_agent))::int AS unique_visitors
        FROM page_views
        WHERE created_at >= now() - interval '7 days' AND city IS NOT NULL
        GROUP BY city, country ORDER BY views DESC LIMIT 20
      ) t
    ),
    'viewsByDay', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.day)::date), '[]'::jsonb) FROM (
        SELECT to_char(created_at::date, 'YYYY-MM-DD') AS day, count(*)::int AS views
        FROM page_views WHERE created_at >= now() - interval '14 days'
        GROUP BY created_at::date ORDER BY created_at::date
      ) t
    ),
    'viewsByHourToday', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.hour)::int), '[]'::jsonb) FROM (
        SELECT extract(hour from created_at)::int AS hour, count(*)::int AS views
        FROM page_views WHERE created_at::date = CURRENT_DATE
        GROUP BY extract(hour from created_at) ORDER BY hour
      ) t
    ),
    'topPages30d', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT path, count(*)::int AS views, count(DISTINCT COALESCE(user_id::text, user_agent))::int AS unique_visitors
        FROM page_views WHERE created_at >= now() - interval '30 days'
        GROUP BY path ORDER BY views DESC LIMIT 15
      ) t
    ),
    'newUsersByDay', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.day)::date), '[]'::jsonb) FROM (
        SELECT to_char(created_at::date, 'YYYY-MM-DD') AS day, count(*)::int AS signups
        FROM profiles WHERE created_at >= now() - interval '14 days'
        GROUP BY created_at::date ORDER BY created_at::date
      ) t
    ),
    'chatByDay', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.day)::date), '[]'::jsonb) FROM (
        SELECT to_char(used_at::date, 'YYYY-MM-DD') AS day, count(*)::int AS queries
        FROM chat_usage WHERE used_at >= CURRENT_DATE - interval '14 days'
        GROUP BY used_at::date ORDER BY used_at::date
      ) t
    ),
    'revenueByDay', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.day)::date), '[]'::jsonb) FROM (
        SELECT to_char(COALESCE(paid_at, created_at)::date, 'YYYY-MM-DD') AS day,
               sum(amount)::int AS amount_cents,
               count(*)::int AS tx_count
        FROM payments WHERE status IN ('paid','succeeded')
          AND COALESCE(paid_at, created_at) >= now() - interval '30 days'
        GROUP BY COALESCE(paid_at, created_at)::date
        ORDER BY COALESCE(paid_at, created_at)::date
      ) t
    )
  ) INTO v_result;
  RETURN v_result;
END;
$function$;