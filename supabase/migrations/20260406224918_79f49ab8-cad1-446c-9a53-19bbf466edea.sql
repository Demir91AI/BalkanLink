
-- FIX 1: Drop rides and balkan_rides tables
DROP POLICY IF EXISTS "Admins can manage all rides" ON rides;
DROP POLICY IF EXISTS "Anyone can read active rides" ON rides;
DROP POLICY IF EXISTS "Authenticated users can create rides" ON rides;
DROP POLICY IF EXISTS "Users can delete own rides" ON rides;
DROP POLICY IF EXISTS "Users can update own rides" ON rides;

DROP POLICY IF EXISTS "Anyone can read active rides" ON balkan_rides;
DROP POLICY IF EXISTS "Authenticated users can create rides" ON balkan_rides;
DROP POLICY IF EXISTS "Users can delete own rides" ON balkan_rides;
DROP POLICY IF EXISTS "Users can update own rides" ON balkan_rides;

DROP TABLE IF EXISTS rides CASCADE;
DROP TABLE IF EXISTS balkan_rides CASCADE;

-- FIX 2: ads — hide contact info from anon
DROP POLICY IF EXISTS "Anon can read active ads" ON ads;
REVOKE SELECT ON ads FROM anon;
GRANT SELECT (
  id, title, description, category, domain, type, city, bundesland,
  city_lat, city_lng, status, created_at, expires_at, activated_at,
  reported_count, last_reported_at, user_id
) ON ads TO anon;
CREATE POLICY "Anon can read active ads (safe columns)"
ON ads FOR SELECT TO anon
USING (status = 'ACTIVE'::ad_status);

-- FIX 3: email_jobs — service_role only
DROP POLICY IF EXISTS "Admins can manage email_jobs" ON email_jobs;
REVOKE ALL ON email_jobs FROM anon, authenticated;
CREATE POLICY "Service role only"
ON email_jobs FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- FIX 4: user_roles — clean up INSERT policies
DROP POLICY IF EXISTS "Block self assign roles" ON user_roles;
DROP POLICY IF EXISTS "Users can insert own user role" ON user_roles;

CREATE POLICY "Users can only insert user role"
ON user_roles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND role = 'user'::app_role);
