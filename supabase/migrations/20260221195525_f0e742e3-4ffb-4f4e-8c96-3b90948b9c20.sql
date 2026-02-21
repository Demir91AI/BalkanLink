
-- Create table for Balkan Ride (community ride-sharing)
CREATE TABLE public.balkan_rides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  departure_city TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  ride_date DATE NOT NULL,
  available_seats INTEGER NOT NULL DEFAULT 1,
  fuel_contribution TEXT,
  contact_info TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.balkan_rides ENABLE ROW LEVEL SECURITY;

-- Anyone can read active rides
CREATE POLICY "Anyone can read active rides"
ON public.balkan_rides
FOR SELECT
USING (is_active = true);

-- Authenticated users can create rides
CREATE POLICY "Authenticated users can create rides"
ON public.balkan_rides
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update own rides
CREATE POLICY "Users can update own rides"
ON public.balkan_rides
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete own rides
CREATE POLICY "Users can delete own rides"
ON public.balkan_rides
FOR DELETE
USING (auth.uid() = user_id);
