
-- rides: revoke all SELECT from anon, re-grant only safe columns
REVOKE SELECT ON public.rides FROM anon;
GRANT SELECT (id, user_id, from_text, to_text, from_city, to_city, from_lat, from_lng, to_lat, to_lng, depart_at, seats_total, seats_available, price_eur, price_type, notes, status, created_at) ON public.rides TO anon;

-- balkan_rides: revoke all SELECT from anon, re-grant only safe columns
REVOKE SELECT ON public.balkan_rides FROM anon;
GRANT SELECT (id, user_id, departure_city, destination_city, ride_date, available_seats, fuel_contribution, created_at, is_active) ON public.balkan_rides TO anon;

-- Also revoke other unnecessary permissions from anon on these tables
REVOKE INSERT, UPDATE, DELETE ON public.rides FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.balkan_rides FROM anon;
