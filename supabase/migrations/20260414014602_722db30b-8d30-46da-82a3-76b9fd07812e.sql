
-- 1. Fix ads: restrict base table SELECT to owners only (public reads go through ads_public view)
DROP POLICY IF EXISTS "Authenticated can read active ads" ON public.ads;
DROP POLICY IF EXISTS "Anon cannot read ads base table" ON public.ads;

CREATE POLICY "Users can read own ads"
  ON public.ads FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anon denied on ads"
  ON public.ads FOR SELECT
  TO anon
  USING (false);

-- 2. Fix email_jobs: add explicit deny for anon and authenticated
CREATE POLICY "Anon denied on email_jobs"
  ON public.email_jobs FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Authenticated denied on email_jobs"
  ON public.email_jobs FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);

-- 3. Fix tts-audio bucket listing: restrict SELECT to object-level access only
DROP POLICY IF EXISTS "Public read access for tts-audio" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read tts-audio files" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

CREATE POLICY "Allow public read of tts-audio files"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'tts-audio' AND name IS NOT NULL AND name != '' AND name NOT LIKE '%/');
