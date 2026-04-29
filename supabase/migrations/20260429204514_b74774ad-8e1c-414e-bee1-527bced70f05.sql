-- Drop the SECURITY DEFINER version
DROP FUNCTION IF EXISTS public.get_live_stats();

-- Create a public view with security_invoker that exposes only aggregates
-- Use a one-row view via UNION to avoid exposing tables directly
CREATE OR REPLACE VIEW public.public_live_stats
WITH (security_invoker = true)
AS
SELECT
  (SELECT count(*)::int FROM public.profiles) AS total_users,
  (SELECT count(*)::int FROM public.chat_usage WHERE query_date = CURRENT_DATE) AS chat_today,
  (SELECT COALESCE(sum(count), 0)::int FROM public.doc_check_usage WHERE used_at = CURRENT_DATE) AS docs_today,
  (SELECT count(*)::int FROM public.profiles WHERE created_at::date = CURRENT_DATE) AS new_today;

-- Grant on the view itself, not the underlying tables
GRANT SELECT ON public.public_live_stats TO anon, authenticated;