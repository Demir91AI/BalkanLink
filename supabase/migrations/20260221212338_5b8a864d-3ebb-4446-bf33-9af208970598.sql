
-- Add coordinates, postal code, override fields, and validation to community_listings
ALTER TABLE public.community_listings
  ADD COLUMN IF NOT EXISTS lat double precision,
  ADD COLUMN IF NOT EXISTS lng double precision,
  ADD COLUMN IF NOT EXISTS postal_code text,
  ADD COLUMN IF NOT EXISTS business_status text,
  ADD COLUMN IF NOT EXISTS needs_review boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS review_reason text,
  ADD COLUMN IF NOT EXISTS override_name text,
  ADD COLUMN IF NOT EXISTS override_address text,
  ADD COLUMN IF NOT EXISTS override_city text,
  ADD COLUMN IF NOT EXISTS override_postal text,
  ADD COLUMN IF NOT EXISTS override_lat double precision,
  ADD COLUMN IF NOT EXISTS override_lng double precision,
  ADD COLUMN IF NOT EXISTS verified_by_admin boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS override_updated_at timestamp with time zone;

-- Index for review queue
CREATE INDEX IF NOT EXISTS idx_community_listings_needs_review ON public.community_listings (needs_review) WHERE needs_review = true;

-- Index for coordinates
CREATE INDEX IF NOT EXISTS idx_community_listings_coords ON public.community_listings (lat, lng) WHERE lat IS NOT NULL;
