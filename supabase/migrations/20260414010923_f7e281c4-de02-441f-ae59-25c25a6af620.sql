
-- Create storage bucket for TTS audio caching
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('tts-audio', 'tts-audio', true, 1048576, ARRAY['audio/mpeg'])
ON CONFLICT (id) DO NOTHING;

-- Public read access for playback
CREATE POLICY "Public read access for TTS audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'tts-audio');

-- Service role only can insert (edge functions use service role)
CREATE POLICY "Service role can upload TTS audio"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tts-audio');
