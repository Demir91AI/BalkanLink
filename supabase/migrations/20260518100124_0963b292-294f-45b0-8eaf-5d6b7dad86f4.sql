DROP POLICY IF EXISTS "Public reads active rows for view" ON public.pro_services;

REVOKE EXECUTE ON FUNCTION public.get_admin_users(text, integer) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_admin_users_list(text, text, integer) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_admin_payments(integer) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_admin_stats() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_admin_dashboard_extra() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_premium_access(uuid, text, timestamptz) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.deactivate_expired_trials() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.deactivate_expired_launch_trials() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_doc_check_credit(uuid, text, integer, text) FROM anon, authenticated;

DROP POLICY IF EXISTS "Deny update on tts-audio" ON storage.objects;
DROP POLICY IF EXISTS "Deny delete on tts-audio" ON storage.objects;

CREATE POLICY "Deny update on tts-audio"
  ON storage.objects FOR UPDATE TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Deny delete on tts-audio"
  ON storage.objects FOR DELETE TO anon, authenticated
  USING (false);