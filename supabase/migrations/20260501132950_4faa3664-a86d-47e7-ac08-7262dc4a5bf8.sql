-- Page views tracking
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  user_id UUID,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views"
  ON public.page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read page views"
  ON public.page_views FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Admin stats RPC
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
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
    'viewsByDay', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY (t.day)::date), '[]'::jsonb) FROM (
        SELECT to_char(created_at::date, 'YYYY-MM-DD') AS day, count(*)::int AS views
        FROM page_views
        WHERE created_at >= now() - interval '14 days'
        GROUP BY created_at::date
        ORDER BY created_at::date
      ) t
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- Admin users list
CREATE OR REPLACE FUNCTION public.get_admin_users(_search text DEFAULT NULL, _limit int DEFAULT 100)
RETURNS TABLE(
  id uuid,
  email text,
  first_name text,
  is_premium boolean,
  subscription_tier text,
  subscription_expires_at timestamptz,
  created_at timestamptz,
  last_login_at timestamptz
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  SELECT p.id, p.email, p.first_name, p.is_premium, p.subscription_tier,
         p.subscription_expires_at, p.created_at, p.last_login_at
  FROM profiles p
  WHERE _search IS NULL
     OR p.email ILIKE '%' || _search || '%'
     OR COALESCE(p.first_name, '') ILIKE '%' || _search || '%'
  ORDER BY p.created_at DESC
  LIMIT _limit;
END;
$$;

-- Admin payments list
CREATE OR REPLACE FUNCTION public.get_admin_payments(_limit int DEFAULT 50)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  email text,
  amount int,
  currency text,
  status text,
  paid_at timestamptz,
  created_at timestamptz
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  SELECT pay.id, pay.user_id, pr.email, pay.amount, pay.currency, pay.status,
         pay.paid_at, pay.created_at
  FROM payments pay
  LEFT JOIN profiles pr ON pr.id = pay.user_id
  ORDER BY pay.created_at DESC
  LIMIT _limit;
END;
$$;