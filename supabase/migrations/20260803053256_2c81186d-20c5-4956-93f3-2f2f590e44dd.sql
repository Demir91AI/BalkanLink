CREATE TABLE public.stripe_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL DEFAULT 'audit',
  success boolean NOT NULL DEFAULT true,
  admin_user_id uuid,
  admin_email text,
  target_user_id uuid,
  target_email text,
  records_updated integer NOT NULL DEFAULT 0,
  mismatches_found integer NOT NULL DEFAULT 0,
  error_message text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.stripe_sync_log TO authenticated;
GRANT ALL ON public.stripe_sync_log TO service_role;

ALTER TABLE public.stripe_sync_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view sync log"
ON public.stripe_sync_log FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_stripe_sync_log_created_at ON public.stripe_sync_log (created_at DESC);