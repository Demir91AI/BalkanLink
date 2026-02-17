
CREATE TABLE public.community_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  bundesland TEXT NOT NULL,
  origin_country TEXT NOT NULL,
  main_category TEXT NOT NULL,
  sub_category TEXT NOT NULL,
  address TEXT,
  description TEXT,
  website TEXT,
  instagram TEXT,
  google_maps_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.community_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community listings are publicly readable"
  ON public.community_listings
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage community listings"
  ON public.community_listings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );
