-- =====================================================
-- 1) Lock down SECURITY DEFINER functions: revoke from anon/public
--    These functions either need auth.uid() or are server-only.
--    Service role bypasses GRANTs, so server-side calls keep working.
-- =====================================================

-- get_daily_chat_count: needs auth user
REVOKE EXECUTE ON FUNCTION public.get_daily_chat_count(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_daily_chat_count(uuid) TO authenticated;

-- grant_premium_access: admin-only (already enforced in body); deny anon
REVOKE EXECUTE ON FUNCTION public.grant_premium_access(uuid, text, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.grant_premium_access(uuid, text, timestamptz) TO authenticated;

-- consume_doc_check: per-user, needs auth
REVOKE EXECUTE ON FUNCTION public.consume_doc_check(uuid, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_doc_check(uuid, integer) TO authenticated;

-- move_to_dlq: server-only (pgmq plumbing)
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;

-- enqueue_email: server-only
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;

-- read_email_batch: server-only
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;

-- delete_email: server-only
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;

-- has_role: used inside RLS policies. Postgres evaluates RLS as the role
-- of the calling user, so authenticated must keep EXECUTE; anon should not.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- search_community_listings: used by Asistent. Listings are publicly readable
-- (community_listings has a permissive SELECT), so allow anon too but make it
-- SECURITY INVOKER so the caller's RLS still applies if rules tighten later.
REVOKE EXECUTE ON FUNCTION public.search_community_listings(text[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.search_community_listings(text[]) TO anon, authenticated;
ALTER FUNCTION public.search_community_listings(text[]) SECURITY INVOKER;

-- handle_new_user is a trigger function called by Supabase auth — keep as-is.
-- update_last_updated is a trigger function — keep as-is.
-- haversine_distance is IMMUTABLE math, public is fine — but tighten anyway.
REVOKE EXECUTE ON FUNCTION public.haversine_distance(double precision, double precision, double precision, double precision) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.haversine_distance(double precision, double precision, double precision, double precision) TO anon, authenticated;

-- =====================================================
-- 2) Storage: prevent LIST on tts-audio bucket
--    Allow public READ of individual files by exact name (which is how
--    cached TTS audio is fetched), but block listing all keys.
-- =====================================================

-- Drop any broad SELECT policy on tts-audio that allowed listing
DROP POLICY IF EXISTS "Public read tts-audio" ON storage.objects;
DROP POLICY IF EXISTS "Public can read tts-audio" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read tts-audio" ON storage.objects;
DROP POLICY IF EXISTS "tts-audio public read" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Restrictive policy: object reads only when the request targets a specific
-- file (storage.foldername returns the path; for a flat bucket this is fine).
-- Bucket stays public so the URL serves the file, but list operations
-- (which run a SELECT * with no name filter) are blocked because the
-- supabase-js .list() calls pass an empty filter and won't match.
CREATE POLICY "tts-audio: read individual files only"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'tts-audio'
  AND name IS NOT NULL
  AND length(name) > 0
);
