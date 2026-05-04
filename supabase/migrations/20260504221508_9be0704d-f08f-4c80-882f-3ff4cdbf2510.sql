
CREATE TABLE IF NOT EXISTS public.external_pdf_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_key text NOT NULL UNIQUE,
  source_url text NOT NULL,
  etag text,
  last_modified text,
  content_length bigint,
  last_checked_at timestamptz,
  last_changed_at timestamptz,
  notified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.external_pdf_versions ENABLE ROW LEVEL SECURITY;

-- DENY all to anon/authenticated; only service role bypasses RLS
CREATE POLICY "deny_anon_select" ON public.external_pdf_versions FOR SELECT TO anon USING (false);
CREATE POLICY "deny_auth_select" ON public.external_pdf_versions FOR SELECT TO authenticated USING (false);

-- Seed Bayern Elterngeld
INSERT INTO public.external_pdf_versions (form_key, source_url)
VALUES (
  'elterngeld-bayern-2025',
  'https://www.zbfs.bayern.de/imperia/md/zbfs/content/familie/elterngeld/2025-05_antrag-bayerisches-und-bundeselterngeld.pdf'
)
ON CONFLICT (form_key) DO NOTHING;

-- Schedule monthly check: 1st of every month at 06:00 UTC
SELECT cron.schedule(
  'check-pdf-versions-monthly',
  '0 6 1 * *',
  $$
  SELECT net.http_post(
    url := 'https://cvobntstjmlpozrbleyu.supabase.co/functions/v1/check-pdf-versions',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || current_setting('app.settings.service_role_key', true)),
    body := '{}'::jsonb
  );
  $$
);
