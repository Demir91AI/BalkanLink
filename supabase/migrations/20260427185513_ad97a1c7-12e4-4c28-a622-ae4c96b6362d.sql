
-- 1. Add DELETE policy for service role on email_unsubscribe_tokens (cleanup)
CREATE POLICY "Service role can delete tokens"
ON public.email_unsubscribe_tokens
FOR DELETE
USING (auth.role() = 'service_role');

-- 2. Lock down SECURITY DEFINER functions - revoke from anon/authenticated where inappropriate

-- grant_premium_access: CRITICAL - never let authenticated users call this directly
REVOKE EXECUTE ON FUNCTION public.grant_premium_access(uuid, text, timestamptz) FROM PUBLIC, anon, authenticated;

-- Email queue functions: service role only
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
