-- Remove the old permissive policies that still allowed bucket-wide LIST
DROP POLICY IF EXISTS "Public read access for TTS audio" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read of tts-audio files" ON storage.objects;
-- The restrictive "tts-audio: read individual files only" policy stays.