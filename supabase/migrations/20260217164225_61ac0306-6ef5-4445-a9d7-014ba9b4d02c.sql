
-- Create missions table for embassies and consulates
CREATE TABLE public.missions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  mission_type TEXT NOT NULL,
  city TEXT NOT NULL,
  address_line TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

-- Anyone can read missions (public data)
CREATE POLICY "Anyone can read missions"
  ON public.missions FOR SELECT
  USING (true);

-- Admins can manage missions
CREATE POLICY "Admins can manage missions"
  ON public.missions FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));
