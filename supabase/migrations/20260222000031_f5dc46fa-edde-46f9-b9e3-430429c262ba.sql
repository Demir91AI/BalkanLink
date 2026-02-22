
-- Create rides table for Balkan Ride feature
CREATE TABLE public.rides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  from_text text NOT NULL,
  to_text text NOT NULL,
  from_city text,
  to_city text,
  from_lat numeric,
  from_lng numeric,
  to_lat numeric,
  to_lng numeric,
  depart_at timestamptz NOT NULL,
  seats_total integer NOT NULL CHECK (seats_total > 0 AND seats_total <= 9),
  seats_available integer NOT NULL CHECK (seats_available >= 0),
  price_eur numeric CHECK (price_eur >= 0),
  price_type text NOT NULL DEFAULT 'per_person' CHECK (price_type IN ('per_person', 'total')),
  notes text,
  contact_phone text,
  contact_whatsapp text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'full')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_rides_depart_at ON public.rides (depart_at);
CREATE INDEX idx_rides_from_to_city ON public.rides (from_city, to_city);
CREATE INDEX idx_rides_status ON public.rides (status);

-- Enable RLS
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

-- Anyone can read active rides
CREATE POLICY "Anyone can read active rides"
  ON public.rides FOR SELECT
  USING (status = 'active' AND depart_at >= now());

-- Authenticated users can create rides
CREATE POLICY "Authenticated users can create rides"
  ON public.rides FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update own rides
CREATE POLICY "Users can update own rides"
  ON public.rides FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete own rides
CREATE POLICY "Users can delete own rides"
  ON public.rides FOR DELETE
  USING (auth.uid() = user_id);

-- Admins can manage all rides
CREATE POLICY "Admins can manage all rides"
  ON public.rides FOR ALL
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'));
