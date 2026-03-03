
-- Enums
CREATE TYPE public.ad_type AS ENUM ('SEEKING', 'OFFERING');
CREATE TYPE public.ad_domain AS ENUM ('JOB', 'SERVICE', 'HOUSING', 'CAR');
CREATE TYPE public.ad_contact_type AS ENUM ('PHONE', 'EMAIL');
CREATE TYPE public.ad_status AS ENUM ('PENDING', 'ACTIVE', 'EXPIRED', 'REMOVED');
CREATE TYPE public.pro_status AS ENUM ('PENDING_PAYMENT', 'ACTIVE', 'EXPIRED', 'REMOVED');
CREATE TYPE public.payment_product_type AS ENUM ('PRO_SERVICE', 'PREMIUM_FORMULARE');
CREATE TYPE public.payment_provider AS ENUM ('STUB', 'STRIPE');
CREATE TYPE public.payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELED');
CREATE TYPE public.email_template AS ENUM ('AD_VERIFY', 'AD_EXPIRE_SOON', 'PRO_EXPIRE_30', 'PRO_EXPIRE_7', 'PRO_EXPIRED');
CREATE TYPE public.email_job_status AS ENUM ('PENDING', 'SENT', 'FAILED');

-- 1) ads
CREATE TABLE public.ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type ad_type NOT NULL,
  domain ad_domain NOT NULL,
  category text,
  title varchar(80) NOT NULL,
  description varchar(500) NOT NULL,
  bundesland text NOT NULL,
  city text NOT NULL,
  city_lat double precision,
  city_lng double precision,
  contact_type ad_contact_type NOT NULL,
  contact_value text NOT NULL,
  owner_email text NOT NULL,
  status ad_status NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  activated_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '15 days'),
  reported_count int NOT NULL DEFAULT 0,
  last_reported_at timestamptz
);

ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active ads" ON public.ads
  FOR SELECT USING (status = 'ACTIVE');

CREATE POLICY "Anyone can insert ads" ON public.ads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all ads" ON public.ads
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Index for filtering
CREATE INDEX idx_ads_status_domain ON public.ads (status, domain);
CREATE INDEX idx_ads_bundesland ON public.ads (bundesland);
CREATE INDEX idx_ads_expires ON public.ads (expires_at) WHERE status = 'ACTIVE';

-- 2) pro_services
CREATE TABLE public.pro_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_category text NOT NULL,
  name_or_business text NOT NULL,
  bundesland text NOT NULL,
  city text NOT NULL,
  city_lat double precision,
  city_lng double precision,
  description varchar(800) NOT NULL,
  phone text,
  whatsapp text,
  email text,
  website text,
  billing_email text NOT NULL,
  status pro_status NOT NULL DEFAULT 'PENDING_PAYMENT',
  started_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pro_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active pro_services" ON public.pro_services
  FOR SELECT USING (status = 'ACTIVE');

CREATE POLICY "Anyone can insert pro_services" ON public.pro_services
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all pro_services" ON public.pro_services
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 3) city_geo
CREATE TABLE public.city_geo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name text NOT NULL,
  bundesland text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL
);

ALTER TABLE public.city_geo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read city_geo" ON public.city_geo
  FOR SELECT USING (true);

CREATE INDEX idx_city_geo_name ON public.city_geo (city_name);

-- 4) mreza_payments (separate from existing payments table)
CREATE TABLE public.mreza_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type payment_product_type NOT NULL,
  product_id uuid NOT NULL,
  amount numeric(10,2) NOT NULL DEFAULT 20.00,
  currency text NOT NULL DEFAULT 'EUR',
  provider payment_provider NOT NULL DEFAULT 'STUB',
  provider_payment_id text,
  status payment_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz
);

ALTER TABLE public.mreza_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage mreza_payments" ON public.mreza_payments
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert mreza_payments" ON public.mreza_payments
  FOR INSERT WITH CHECK (true);

-- 5) email_jobs
CREATE TABLE public.email_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email text NOT NULL,
  template email_template NOT NULL,
  payload jsonb DEFAULT '{}',
  scheduled_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  status email_job_status NOT NULL DEFAULT 'PENDING'
);

ALTER TABLE public.email_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage email_jobs" ON public.email_jobs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Haversine distance function for radius search
CREATE OR REPLACE FUNCTION public.haversine_distance(
  lat1 double precision, lng1 double precision,
  lat2 double precision, lng2 double precision
) RETURNS double precision
LANGUAGE sql IMMUTABLE
AS $$
  SELECT 6371 * 2 * asin(sqrt(
    sin(radians((lat2 - lat1) / 2)) ^ 2 +
    cos(radians(lat1)) * cos(radians(lat2)) *
    sin(radians((lng2 - lng1) / 2)) ^ 2
  ))
$$;
