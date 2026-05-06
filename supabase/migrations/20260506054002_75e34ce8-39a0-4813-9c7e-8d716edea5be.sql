
-- 1) REVOKE EXECUTE on sensitive SECURITY DEFINER functions
DO $$
DECLARE
  fn text;
  sensitive_fns text[] := ARRAY[
    'public.get_admin_users(text, integer)',
    'public.get_admin_payments(integer)',
    'public.get_admin_stats()',
    'public.grant_premium_access(uuid, text, timestamptz)',
    'public.grant_doc_check_credit(uuid, text, integer, text)',
    'public.move_to_dlq(text, text, bigint, jsonb)',
    'public.enqueue_email(text, jsonb)',
    'public.read_email_batch(text, integer, integer)',
    'public.delete_email(text, bigint)',
    'public.deactivate_expired_trials()',
    'public.deactivate_expired_launch_trials()',
    'public.handle_new_user()',
    'public.update_last_updated()',
    'public.cq_touch_updated_at()'
  ];
BEGIN
  FOREACH fn IN ARRAY sensitive_fns LOOP
    BEGIN
      EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn);
    EXCEPTION WHEN undefined_function THEN
      RAISE NOTICE 'skip %', fn;
    END;
  END LOOP;
END $$;

-- 2) pro_services: drop overly broad public SELECT, add owner-only SELECT,
--    create safe public view (no billing_email).
DROP VIEW IF EXISTS public.pro_services_public;

DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname='public' AND tablename='pro_services' AND cmd='SELECT'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.pro_services', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY "Owner reads own pro_services" ON public.pro_services
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE VIEW public.pro_services_public
  WITH (security_invoker = false) AS
  SELECT id, service_category, name_or_business, bundesland, city,
         city_lat, city_lng, description, phone, whatsapp, email, website,
         status, started_at, expires_at, created_at
  FROM public.pro_services
  WHERE status = 'ACTIVE';

GRANT SELECT ON public.pro_services_public TO anon, authenticated;

-- 3) page_views: tighten INSERT WITH CHECK
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname='public' AND tablename='page_views' AND cmd='INSERT'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.page_views', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY "Insert own page view" ON public.page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- 4) trial_codes: explicit deny SELECT for authenticated
DROP POLICY IF EXISTS "No authenticated read of trial_codes" ON public.trial_codes;
CREATE POLICY "No authenticated read of trial_codes" ON public.trial_codes
  FOR SELECT TO authenticated
  USING (false);
