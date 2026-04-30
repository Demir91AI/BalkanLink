-- 1) Hide billing_email from authenticated readers on pro_services
--    Anon already has restricted column-level grants. Restrict authenticated similarly.
REVOKE SELECT ON public.pro_services FROM authenticated;
GRANT SELECT (
  id, user_id, name_or_business, description, service_category,
  city, city_lat, city_lng, bundesland, status, started_at, expires_at,
  website, phone, whatsapp, email, created_at, updated_at
) ON public.pro_services TO authenticated;
-- billing_email intentionally omitted — only owners (via RLS UPDATE/INSERT) and admins (service role / has_role) should see it.
-- Admins read via the "Admins can manage all pro_services" policy using service-role context where needed.

-- 2) Fix mutable search_path on cq_touch_updated_at
CREATE OR REPLACE FUNCTION public.cq_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END
$function$;

-- 3) Revoke EXECUTE from anon on SECURITY DEFINER functions that should not be callable by anonymous users.
--    Public/anon-callable definers we KEEP: get_live_stats, search_community_listings, cq_increment_view, haversine_distance.
REVOKE EXECUTE ON FUNCTION public.consume_doc_check(uuid, integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_last_updated() FROM anon;
REVOKE EXECUTE ON FUNCTION public.grant_premium_access(uuid, text, timestamptz) FROM anon;
REVOKE EXECUTE ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.consume_doc_check_credit(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_daily_chat_count(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.deactivate_expired_trials() FROM anon;
REVOKE EXECUTE ON FUNCTION public.cq_touch_updated_at() FROM anon;
REVOKE EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) FROM anon;