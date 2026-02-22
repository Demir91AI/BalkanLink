
-- Add Google rating column to community_listings
ALTER TABLE public.community_listings
ADD COLUMN google_rating numeric(2,1) DEFAULT NULL;

-- Add Google rating count column
ALTER TABLE public.community_listings
ADD COLUMN google_rating_count integer DEFAULT NULL;
