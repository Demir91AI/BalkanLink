CREATE OR REPLACE FUNCTION public.get_admin_dashboard_extra()
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
  v_premium_price_cents INT := 999;
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT jsonb_build_object(
    'usersByType', jsonb_build_object(
      'paid', (SELECT count(*)::int FROM profiles WHERE is_premium=true AND subscription_tier IN ('premium','premium_yearly') AND (subscription_expires_at IS NULL OR subscription_expires_at > now())),
      'trialActive', (SELECT count(*)::int FROM profiles WHERE subscription_tier IN ('launch_trial','influencer_trial') AND subscription_expires_at > now()),
      'trialExpired', (SELECT count(*)::int FROM profiles WHERE subscription_tier IN ('launch_trial','influencer_trial') AND subscription_expires_at <= now()),
      'lifetime', (SELECT count(*)::int FROM profiles WHERE subscription_tier='lifetime'),
      'free', (SELECT count(*)::int FROM profiles WHERE subscription_tier='free' OR subscription_tier IS NULL),
      'total', (SELECT count(*)::int FROM profiles)
    ),
    'churn30d', (
      SELECT count(*)::int FROM profiles
      WHERE subscription_tier IN ('launch_trial','influencer_trial')
        AND subscription_expires_at BETWEEN now() - interval '30 days' AND now()
    ),
    'registrationsByWeek', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.week_start), '[]'::jsonb)
      FROM (
        SELECT
          to_char(date_trunc('week', created_at), 'YYYY-MM-DD') AS week_start,
          count(*) FILTER (WHERE subscription_tier IN ('premium','premium_yearly') AND is_premium=true)::int AS paid,
          count(*) FILTER (WHERE subscription_tier IN ('launch_trial','influencer_trial'))::int AS trial,
          count(*) FILTER (WHERE COALESCE(subscription_tier,'free') = 'free')::int AS free
        FROM profiles
        WHERE created_at >= now() - interval '8 weeks'
        GROUP BY date_trunc('week', created_at)
      ) t
    ),
    'cohortRetention', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.cohort_month DESC), '[]'::jsonb)
      FROM (
        SELECT
          to_char(date_trunc('month', p.created_at), 'YYYY-MM') AS cohort_month,
          count(*)::int AS total,
          count(*) FILTER (WHERE p.last_login_at >= p.created_at + interval '1 day')::int AS d1,
          count(*) FILTER (WHERE p.last_login_at >= p.created_at + interval '7 days')::int AS d7,
          count(*) FILTER (WHERE p.last_login_at >= p.created_at + interval '30 days')::int AS d30
        FROM profiles p
        WHERE p.created_at >= now() - interval '6 months'
        GROUP BY date_trunc('month', p.created_at)
      ) t
    ),
    'deviceSplit', (
      WITH classified AS (
        SELECT CASE
          WHEN user_agent ~* 'tablet|ipad' THEN 'tablet'
          WHEN user_agent ~* 'mobi|android|iphone' THEN 'mobile'
          ELSE 'desktop' END AS device
        FROM page_views WHERE created_at >= now() - interval '30 days' AND user_agent IS NOT NULL
      )
      SELECT jsonb_build_object(
        'mobile', count(*) FILTER (WHERE device='mobile')::int,
        'desktop', count(*) FILTER (WHERE device='desktop')::int,
        'tablet', count(*) FILTER (WHERE device='tablet')::int,
        'total', count(*)::int
      ) FROM classified
    ),
    'browserSplit', (
      WITH br AS (
        SELECT CASE
          WHEN user_agent ~* 'edg/' THEN 'Edge'
          WHEN user_agent ~* 'firefox' THEN 'Firefox'
          WHEN user_agent ~* 'chrome' THEN 'Chrome'
          WHEN user_agent ~* 'safari' THEN 'Safari'
          ELSE 'Ostali' END AS browser
        FROM page_views WHERE created_at >= now() - interval '30 days' AND user_agent IS NOT NULL
      )
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.n DESC), '[]'::jsonb) FROM (
        SELECT browser AS name, count(*)::int AS n FROM br GROUP BY browser
      ) t
    ),
    'sourceSplit', (
      WITH src AS (
        SELECT CASE
          WHEN referrer IS NULL OR referrer='' THEN 'Direktno'
          WHEN referrer ~* 'google' THEN 'Google'
          WHEN referrer ~* 'facebook|fb\.com' THEN 'Facebook'
          WHEN referrer ~* 'whatsapp|wa\.me' THEN 'WhatsApp'
          WHEN referrer ~* 'instagram' THEN 'Instagram'
          WHEN referrer ~* 'bing' THEN 'Bing'
          ELSE 'Ostalo' END AS source
        FROM page_views WHERE created_at >= now() - interval '30 days'
      )
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.n DESC), '[]'::jsonb) FROM (
        SELECT source AS name, count(*)::int AS n FROM src GROUP BY source
      ) t
    ),
    'viewsByHour', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.h), '[]'::jsonb) FROM (
        SELECT extract(hour from created_at)::int AS h, count(*)::int AS n
        FROM page_views WHERE created_at >= now() - interval '30 days'
        GROUP BY extract(hour from created_at)
      ) t
    ),
    'dailyAuthVsAnon', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.day), '[]'::jsonb) FROM (
        SELECT to_char(created_at::date, 'YYYY-MM-DD') AS day,
          count(*) FILTER (WHERE user_id IS NOT NULL)::int AS auth,
          count(*) FILTER (WHERE user_id IS NULL)::int AS anon
        FROM page_views WHERE created_at >= now() - interval '30 days'
        GROUP BY created_at::date
      ) t
    ),
    'topPaths30d', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT path, count(*)::int AS n
        FROM page_views WHERE created_at >= now() - interval '30 days'
        GROUP BY path ORDER BY n DESC LIMIT 8
      ) t
    ),
    'featureUsage', jsonb_build_object(
      'trainer30d', (SELECT count(*)::int FROM page_views WHERE path LIKE '/deutsch-trainer%' AND created_at >= now() - interval '30 days'),
      'trainerPrev30d', (SELECT count(*)::int FROM page_views WHERE path LIKE '/deutsch-trainer%' AND created_at BETWEEN now() - interval '60 days' AND now() - interval '30 days'),
      'visa30d', (SELECT count(*)::int FROM page_views WHERE path LIKE '/viza%' AND created_at >= now() - interval '30 days'),
      'visaPrev30d', (SELECT count(*)::int FROM page_views WHERE path LIKE '/viza%' AND created_at BETWEEN now() - interval '60 days' AND now() - interval '30 days'),
      'forms30d', (SELECT count(*)::int FROM page_views WHERE (path LIKE '/formulari%' OR path LIKE '/muster/%') AND created_at >= now() - interval '30 days'),
      'formsPrev30d', (SELECT count(*)::int FROM page_views WHERE (path LIKE '/formulari%' OR path LIKE '/muster/%') AND created_at BETWEEN now() - interval '60 days' AND now() - interval '30 days'),
      'ads30d', (SELECT count(*)::int FROM page_views WHERE path LIKE '/oglasi%' AND created_at >= now() - interval '30 days'),
      'adsPrev30d', (SELECT count(*)::int FROM page_views WHERE path LIKE '/oglasi%' AND created_at BETWEEN now() - interval '60 days' AND now() - interval '30 days'),
      'asistent30d', (SELECT count(*)::int FROM chat_usage WHERE used_at >= now() - interval '30 days'),
      'asistentPrev30d', (SELECT count(*)::int FROM chat_usage WHERE used_at BETWEEN now() - interval '60 days' AND now() - interval '30 days'),
      'docCheck30d', (SELECT COALESCE(sum(count),0)::int FROM doc_check_usage WHERE used_at >= CURRENT_DATE - interval '30 days')
    ),
    'featureSparklines', jsonb_build_object(
      'trainer', (SELECT COALESCE(jsonb_agg(n ORDER BY day), '[]'::jsonb) FROM (
        SELECT created_at::date AS day, count(*)::int AS n FROM page_views
        WHERE path LIKE '/deutsch-trainer%' AND created_at >= now() - interval '7 days'
        GROUP BY created_at::date) s),
      'visa', (SELECT COALESCE(jsonb_agg(n ORDER BY day), '[]'::jsonb) FROM (
        SELECT created_at::date AS day, count(*)::int AS n FROM page_views
        WHERE path LIKE '/viza%' AND created_at >= now() - interval '7 days'
        GROUP BY created_at::date) s),
      'forms', (SELECT COALESCE(jsonb_agg(n ORDER BY day), '[]'::jsonb) FROM (
        SELECT created_at::date AS day, count(*)::int AS n FROM page_views
        WHERE (path LIKE '/formulari%' OR path LIKE '/muster/%') AND created_at >= now() - interval '7 days'
        GROUP BY created_at::date) s),
      'asistent', (SELECT COALESCE(jsonb_agg(n ORDER BY day), '[]'::jsonb) FROM (
        SELECT used_at::date AS day, count(*)::int AS n FROM chat_usage
        WHERE used_at >= now() - interval '7 days' GROUP BY used_at::date) s)
    ),
    'visaByCountry', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT NULLIF(regexp_replace(path, '^/viza/?', ''), '') AS country, count(*)::int AS views
        FROM page_views WHERE path LIKE '/viza/%' AND created_at >= now() - interval '30 days'
        GROUP BY NULLIF(regexp_replace(path, '^/viza/?', ''), '') ORDER BY views DESC LIMIT 12
      ) t
    ),
    'formsBreakdown', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT split_part(path, '/', 3) AS form, count(*)::int AS opens
        FROM page_views WHERE path LIKE '/muster/%' AND split_part(path, '/', 3) <> ''
          AND created_at >= now() - interval '30 days'
        GROUP BY split_part(path, '/', 3) ORDER BY opens DESC LIMIT 10
      ) t
    ),
    'trainerStats', jsonb_build_object(
      'usersWithProgress', (SELECT count(*)::int FROM trainer_progress),
      'totalLessonsCompleted', (SELECT COALESCE(sum(COALESCE(array_length(completed_lessons, 1), 0)), 0)::int FROM trainer_progress),
      'avgLevel', (SELECT COALESCE(round(avg(level)::numeric, 1), 0) FROM trainer_progress),
      'totalXp', (SELECT COALESCE(sum(xp), 0)::int FROM trainer_progress),
      'avgStreak', (SELECT COALESCE(round(avg(streak)::numeric, 1), 0) FROM trainer_progress)
    ),
    'trainerLevels', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.level), '[]'::jsonb) FROM (
        SELECT level, count(*)::int AS users,
          COALESCE(round(avg(COALESCE(array_length(completed_lessons,1), 0))::numeric, 0), 0)::int AS avg_done,
          COALESCE(sum(xp), 0)::int AS total_xp
        FROM trainer_progress GROUP BY level
      ) t
    ),
    'asistentStats', jsonb_build_object(
      'q30d', (SELECT count(*)::int FROM chat_usage WHERE used_at >= now() - interval '30 days'),
      'qToday', (SELECT count(*)::int FROM chat_usage WHERE query_date = CURRENT_DATE),
      'estCost30d', (SELECT round((count(*) * 0.005)::numeric, 4) FROM chat_usage WHERE used_at >= now() - interval '30 days'),
      'totalMessages', (SELECT count(*)::int FROM chat_messages),
      'uniqueUsers30d', (SELECT count(DISTINCT user_id)::int FROM chat_usage WHERE used_at >= now() - interval '30 days')
    ),
    'asistentByDay', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.day), '[]'::jsonb) FROM (
        SELECT to_char(used_at::date, 'YYYY-MM-DD') AS day, count(*)::int AS q
        FROM chat_usage WHERE used_at >= now() - interval '30 days'
        GROUP BY used_at::date
      ) t
    ),
    'asistentRecent', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT id, created_at,
          left(content, 80) AS preview,
          'K#' || substring(md5(user_id::text), 1, 4) AS user_alias,
          length(content)::int AS chars
        FROM chat_messages WHERE role='user'
        ORDER BY created_at DESC LIMIT 15
      ) t
    ),
    'topCountries30d', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT country, count(*)::int AS views,
          count(DISTINCT COALESCE(user_id::text, ip_hash, user_agent))::int AS uniq
        FROM page_views WHERE created_at >= now() - interval '30 days' AND country IS NOT NULL
        GROUP BY country ORDER BY views DESC LIMIT 12
      ) t
    ),
    'topCities30d', (
      SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) FROM (
        SELECT city, country, count(*)::int AS views,
          count(DISTINCT COALESCE(user_id::text, ip_hash, user_agent))::int AS uniq
        FROM page_views WHERE created_at >= now() - interval '30 days' AND city IS NOT NULL
        GROUP BY city, country ORDER BY views DESC LIMIT 15
      ) t
    ),
    'languageSplit', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.n DESC), '[]'::jsonb) FROM (
        SELECT COALESCE(preferred_lang, 'bs') AS lang, count(*)::int AS n
        FROM profiles GROUP BY preferred_lang
      ) t
    ),
    'goalsCurrent', jsonb_build_object(
      'mrrCents', (SELECT count(*)::int * v_premium_price_cents FROM profiles
        WHERE is_premium=true AND subscription_tier IN ('premium','premium_yearly')
        AND (subscription_expires_at IS NULL OR subscription_expires_at > now())),
      'realUsers', (SELECT count(*)::int FROM profiles WHERE COALESCE(subscription_tier,'free') NOT IN ('lifetime')),
      'avgVisitsPerDay', (SELECT COALESCE(round(count(*)::numeric / 30.0, 1), 0) FROM page_views WHERE created_at >= now() - interval '30 days')
    ),
    'milestones', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.paid_at), '[]'::jsonb) FROM (
        SELECT to_char(COALESCE(paid_at, created_at), 'DD.MM.YYYY') AS paid_at,
          (amount/100.0)::numeric(10,2) AS amount,
          status
        FROM payments WHERE status IN ('paid','succeeded') ORDER BY COALESCE(paid_at, created_at) ASC LIMIT 10
      ) t
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_admin_users_list(_search text DEFAULT NULL, _tier_filter text DEFAULT NULL, _limit int DEFAULT 100)
RETURNS TABLE(
  id uuid, email text, first_name text,
  subscription_tier text, is_premium boolean,
  subscription_expires_at timestamptz,
  created_at timestamptz, last_login_at timestamptz,
  user_type text, preferred_lang text,
  pages_per_session int, activity text
)
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  WITH page_stats AS (
    SELECT pv.user_id, count(*)::int AS pv_count
    FROM page_views pv
    WHERE pv.user_id IS NOT NULL AND pv.created_at >= now() - interval '30 days'
    GROUP BY pv.user_id
  )
  SELECT
    p.id, p.email, p.first_name,
    p.subscription_tier, p.is_premium,
    p.subscription_expires_at, p.created_at, p.last_login_at,
    CASE
      WHEN p.subscription_tier='lifetime' THEN 'lifetime'
      WHEN p.is_premium=true AND p.subscription_tier IN ('premium','premium_yearly')
        AND (p.subscription_expires_at IS NULL OR p.subscription_expires_at > now())
        THEN 'premium_paid'
      WHEN p.subscription_tier IN ('launch_trial','influencer_trial')
        AND p.subscription_expires_at > now() THEN 'trial_active'
      WHEN p.subscription_tier IN ('launch_trial','influencer_trial')
        AND p.subscription_expires_at <= now() THEN 'trial_expired'
      ELSE 'free'
    END::text AS user_type,
    p.preferred_lang,
    COALESCE(ps.pv_count, 0) AS pages_per_session,
    (CASE
      WHEN COALESCE(ps.pv_count, 0) >= 20 THEN 'high'
      WHEN COALESCE(ps.pv_count, 0) >= 5 THEN 'mid'
      ELSE 'low' END)::text AS activity
  FROM profiles p
  LEFT JOIN page_stats ps ON ps.user_id = p.id
  WHERE (_search IS NULL OR p.email ILIKE '%'||_search||'%' OR COALESCE(p.first_name,'') ILIKE '%'||_search||'%')
    AND (_tier_filter IS NULL OR _tier_filter = 'all' OR
         (_tier_filter='lifetime' AND p.subscription_tier='lifetime') OR
         (_tier_filter='premium_paid' AND p.is_premium=true AND p.subscription_tier IN ('premium','premium_yearly')) OR
         (_tier_filter='trial_active' AND p.subscription_tier IN ('launch_trial','influencer_trial') AND p.subscription_expires_at > now()) OR
         (_tier_filter='free' AND (p.subscription_tier='free' OR p.subscription_tier IS NULL)))
  ORDER BY p.created_at DESC
  LIMIT _limit;
END;
$$;