CREATE OR REPLACE FUNCTION public.search_community_listings(search_terms text[])
RETURNS SETOF community_listings
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT cl.* FROM community_listings cl
  WHERE (
    SELECT bool_and(
      unaccent(lower(cl.name)) LIKE '%' || unaccent(lower(t)) || '%'
      OR unaccent(lower(cl.city)) LIKE '%' || unaccent(lower(t)) || '%'
    )
    FROM unnest(search_terms) AS t
  )
  LIMIT 10;
$$;