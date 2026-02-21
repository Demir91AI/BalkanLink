-- Add unique constraint on google_place_id for upsert deduplication
ALTER TABLE public.community_listings 
ADD CONSTRAINT community_listings_google_place_id_key UNIQUE (google_place_id);