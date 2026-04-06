
-- ads: revoke full SELECT from anon, re-grant only non-sensitive columns
REVOKE SELECT ON public.ads FROM anon;
GRANT SELECT (id, title, description, city, city_lat, city_lng, bundesland, category, domain, type, status, created_at, activated_at, expires_at) ON public.ads TO anon;

-- Also revoke unnecessary write permissions from anon on ads
REVOKE INSERT, UPDATE, DELETE ON public.ads FROM anon;

-- pro_services: revoke full SELECT from anon, re-grant only non-sensitive columns
REVOKE SELECT ON public.pro_services FROM anon;
GRANT SELECT (id, name_or_business, description, service_category, city, city_lat, city_lng, bundesland, status, started_at, expires_at, website, created_at, updated_at) ON public.pro_services TO anon;

-- Also revoke unnecessary write permissions from anon on pro_services
REVOKE INSERT, UPDATE, DELETE ON public.pro_services FROM anon;
