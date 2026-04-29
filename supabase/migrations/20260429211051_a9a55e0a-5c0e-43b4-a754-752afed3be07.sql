ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS reengagement_7d_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reengagement_30d_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS preferred_lang TEXT DEFAULT 'bs',
  ADD COLUMN IF NOT EXISTS email_opt_out BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_profiles_reengagement
  ON public.profiles(last_login_at)
  WHERE email_opt_out = FALSE;