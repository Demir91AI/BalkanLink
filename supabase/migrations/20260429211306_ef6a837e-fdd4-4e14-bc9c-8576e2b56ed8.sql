CREATE TABLE IF NOT EXISTS public.community_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT,
  lang TEXT NOT NULL DEFAULT 'bs',
  status TEXT NOT NULL DEFAULT 'pending',
  answer TEXT,
  answered_by TEXT,
  answered_at TIMESTAMPTZ,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT cq_status_check CHECK (status IN ('pending','answered','published','rejected')),
  CONSTRAINT cq_lang_check CHECK (lang IN ('bs','de','hr','sr')),
  CONSTRAINT cq_title_len CHECK (char_length(title) BETWEEN 5 AND 200),
  CONSTRAINT cq_body_len CHECK (char_length(body) BETWEEN 10 AND 4000)
);

CREATE INDEX IF NOT EXISTS idx_cq_status_created ON public.community_questions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cq_user ON public.community_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_cq_lang ON public.community_questions(lang);

ALTER TABLE public.community_questions ENABLE ROW LEVEL SECURITY;

-- Anyone can read published questions
CREATE POLICY "Anyone can view published questions"
ON public.community_questions FOR SELECT
USING (status = 'published');

-- Authenticated users can read their own pending/answered questions
CREATE POLICY "Users can view own questions"
ON public.community_questions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Authenticated users can insert questions (only as themselves)
CREATE POLICY "Users can insert own questions"
ON public.community_questions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Admins can do anything (uses existing has_role function if present; fallback to false)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'has_role') THEN
    EXECUTE $p$
      CREATE POLICY "Admins manage all questions"
      ON public.community_questions FOR ALL
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'))
      WITH CHECK (public.has_role(auth.uid(), 'admin'));
    $p$;
  END IF;
END$$;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.cq_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS trg_cq_touch ON public.community_questions;
CREATE TRIGGER trg_cq_touch
BEFORE UPDATE ON public.community_questions
FOR EACH ROW EXECUTE FUNCTION public.cq_touch_updated_at();

-- Increment view count function (security definer to allow anon increments without exposing UPDATE)
CREATE OR REPLACE FUNCTION public.cq_increment_view(_id UUID)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.community_questions
  SET view_count = view_count + 1
  WHERE id = _id AND status = 'published';
$$;

REVOKE EXECUTE ON FUNCTION public.cq_increment_view(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cq_increment_view(UUID) TO anon, authenticated;