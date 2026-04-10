
-- ============ PART 1: Fix profiles RLS ============
DROP POLICY IF EXISTS "Users can update own safe fields only" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own display fields only"
ON public.profiles FOR UPDATE TO authenticated
USING (id = auth.uid()) WITH CHECK (id = auth.uid());

REVOKE UPDATE (is_premium, subscription_tier, subscription_expires_at, single_formular_access)
ON public.profiles FROM authenticated;

GRANT UPDATE (is_premium, subscription_tier, subscription_expires_at, single_formular_access)
ON public.profiles TO service_role;

CREATE OR REPLACE FUNCTION public.grant_premium_access(
  target_user_id UUID,
  new_tier TEXT DEFAULT 'premium',
  new_expires_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NOT NULL AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  UPDATE profiles SET
    is_premium = true,
    subscription_tier = new_tier,
    subscription_expires_at = new_expires_at
  WHERE id = target_user_id;
END;
$$;

REVOKE SELECT (owner_email) ON public.ads FROM authenticated;

-- ============ PART 2: doc_check_usage ============
CREATE TABLE IF NOT EXISTS public.doc_check_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  used_at DATE NOT NULL DEFAULT CURRENT_DATE,
  count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, used_at)
);
ALTER TABLE public.doc_check_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own doc usage" ON public.doc_check_usage
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can upsert own doc usage" ON public.doc_check_usage
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own doc usage" ON public.doc_check_usage
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.consume_doc_check(uid UUID, daily_limit INT DEFAULT 1)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_count INT;
BEGIN
  INSERT INTO doc_check_usage (user_id, used_at, count) VALUES (uid, CURRENT_DATE, 1)
  ON CONFLICT (user_id, used_at) DO UPDATE SET count = doc_check_usage.count + 1
  RETURNING count INTO current_count;
  RETURN current_count <= daily_limit;
END;
$$;

-- ============ PART 3: reviews - add is_approved ============
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS is_approved BOOLEAN NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
CREATE POLICY "Anyone can read approved reviews" ON public.reviews
  FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
CREATE POLICY "Admins can manage reviews" ON public.reviews
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============ PART 4: trainer_progress ============
CREATE TABLE IF NOT EXISTS public.trainer_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  completed_lessons TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trainer_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress" ON public.trainer_progress
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own progress" ON public.trainer_progress
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own progress" ON public.trainer_progress
  FOR UPDATE TO authenticated USING (user_id = auth.uid());
