
-- Re-affirm get_daily_chat_count privileges (SECURITY DEFINER, authenticated-only)
REVOKE EXECUTE ON FUNCTION public.get_daily_chat_count(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_daily_chat_count(uuid) TO authenticated;

-- Admin-only / internal SECURITY DEFINER functions: revoke anon access
REVOKE EXECUTE ON FUNCTION public.grant_premium_access(uuid, text, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.grant_premium_access(uuid, text, timestamptz) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_admin_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_admin_dashboard_extra() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_extra() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_admin_users(text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_users(text, integer) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_admin_users_list(text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_users_list(text, text, integer) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_admin_payments(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_payments(integer) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.deactivate_expired_trials() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.deactivate_expired_launch_trials() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.redeem_trial_code(uuid, text) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.consume_doc_check(uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_doc_check(uuid, integer) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.consume_doc_check_credit(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_doc_check_credit(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.consume_premium_doc_check(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_premium_doc_check(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.get_doc_check_status(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_doc_check_status(uuid) TO authenticated;

-- Email queue internals — server-side only
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;

-- Keep public-callable (used from client / anon paths):
--   has_role, get_live_stats, cq_increment_view, search_community_listings,
--   haversine_distance, handle_new_user (trigger), update_last_updated (trigger),
--   cq_touch_updated_at (trigger), email_queue_wake (trigger)
