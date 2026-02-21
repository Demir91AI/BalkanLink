
-- Add missing columns for import quality tracking
ALTER TABLE public.community_listings
  ADD COLUMN IF NOT EXISTS imported_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS category_confidence integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS origin_confidence integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS locked_fields jsonb DEFAULT '{}'::jsonb;
