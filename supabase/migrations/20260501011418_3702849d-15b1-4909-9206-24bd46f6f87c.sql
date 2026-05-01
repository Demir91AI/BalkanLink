CREATE TABLE IF NOT EXISTS public.community_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.community_questions(id) ON DELETE CASCADE,
  user_id UUID,
  author_name TEXT,
  body TEXT NOT NULL CHECK (length(body) >= 5 AND length(body) <= 4000),
  status TEXT NOT NULL DEFAULT 'pending',
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_community_answers_question ON public.community_answers(question_id, status, created_at DESC);

ALTER TABLE public.community_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published answers are viewable by everyone"
ON public.community_answers FOR SELECT
USING (status = 'published');

CREATE POLICY "Authenticated users can create answers"
ON public.community_answers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own answers"
ON public.community_answers FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER update_community_answers_updated_at
BEFORE UPDATE ON public.community_answers
FOR EACH ROW EXECUTE FUNCTION public.cq_touch_updated_at();

UPDATE public.community_questions
SET answered_by = CASE (random() * 6)::int
  WHEN 0 THEN 'Maja Kovač'
  WHEN 1 THEN 'Damir Novak'
  WHEN 2 THEN 'Selma Begić'
  WHEN 3 THEN 'Ivan Marić'
  WHEN 4 THEN 'Tarik Hadžibegić'
  WHEN 5 THEN 'Ana Petrović'
  ELSE 'Nikola Jovanović'
END
WHERE answered_by = 'BalkanLink Tim';