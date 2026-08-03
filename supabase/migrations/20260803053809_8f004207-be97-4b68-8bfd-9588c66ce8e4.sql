-- 1) Settings table
CREATE TABLE public.stripe_sync_log_settings (
  id integer PRIMARY KEY DEFAULT 1,
  retention_days integer NOT NULL DEFAULT 90,
  auto_purge_enabled boolean NOT NULL DEFAULT true,
  last_purged_at timestamptz,
  last_purged_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid,
  CONSTRAINT stripe_sync_log_settings_singleton CHECK (id = 1),
  CONSTRAINT stripe_sync_log_settings_retention_range CHECK (retention_days BETWEEN 1 AND 3650)
);

GRANT SELECT, UPDATE ON public.stripe_sync_log_settings TO authenticated;
GRANT ALL ON public.stripe_sync_log_settings TO service_role;

ALTER TABLE public.stripe_sync_log_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view sync log settings"
ON public.stripe_sync_log_settings FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sync log settings"
ON public.stripe_sync_log_settings FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.stripe_sync_log_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 2) Lock down anon access explicitly
REVOKE ALL ON public.stripe_sync_log FROM anon;
REVOKE ALL ON public.stripe_sync_log_settings FROM anon;

-- 3) Purge function (admin-callable, also used by cron)
CREATE OR REPLACE FUNCTION public.purge_stripe_sync_log(_force boolean DEFAULT false)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_settings public.stripe_sync_log_settings%ROWTYPE;
  v_deleted integer := 0;
BEGIN
  IF auth.uid() IS NOT NULL AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT * INTO v_settings FROM public.stripe_sync_log_settings WHERE id = 1;
  IF v_settings.id IS NULL THEN
    RETURN 0;
  END IF;

  IF NOT v_settings.auto_purge_enabled AND NOT _force THEN
    RETURN 0;
  END IF;

  DELETE FROM public.stripe_sync_log
   WHERE created_at < now() - make_interval(days => v_settings.retention_days);
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  UPDATE public.stripe_sync_log_settings
     SET last_purged_at = now(), last_purged_count = v_deleted
   WHERE id = 1;

  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.purge_stripe_sync_log(boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.purge_stripe_sync_log(boolean) TO authenticated, service_role;

-- 4) Daily cron
SELECT cron.unschedule('purge-stripe-sync-log')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'purge-stripe-sync-log');

SELECT cron.schedule('purge-stripe-sync-log', '20 3 * * *', $cron$ SELECT public.purge_stripe_sync_log(); $cron$);