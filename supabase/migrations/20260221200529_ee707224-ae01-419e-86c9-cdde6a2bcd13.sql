
-- Add google_place_id column for deduplication
ALTER TABLE public.community_listings
ADD COLUMN IF NOT EXISTS google_place_id text;

-- Create unique index on google_place_id to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_community_listings_google_place_id
ON public.community_listings (google_place_id)
WHERE google_place_id IS NOT NULL;

-- Also create composite index for name+address dedup fallback
CREATE INDEX IF NOT EXISTS idx_community_listings_name_address
ON public.community_listings (name, address);
