
-- Add source column
ALTER TABLE public.community_listings
ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'google_places';

-- Ensure google_place_id is NOT NULL
ALTER TABLE public.community_listings
ALTER COLUMN google_place_id SET NOT NULL;
