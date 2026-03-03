import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CityGeo {
  city_name: string;
  bundesland: string;
  lat: number;
  lng: number;
}

let cachedCities: CityGeo[] | null = null;

export function useCityGeo() {
  const [cities, setCities] = useState<CityGeo[]>(cachedCities || []);
  const [loading, setLoading] = useState(!cachedCities);

  useEffect(() => {
    if (cachedCities) return;
    supabase.from("city_geo").select("city_name, bundesland, lat, lng").then(({ data }) => {
      const result = (data || []) as CityGeo[];
      cachedCities = result;
      setCities(result);
      setLoading(false);
    });
  }, []);

  const suggest = (query: string) => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return cities.filter(c => c.city_name.toLowerCase().includes(q)).slice(0, 8);
  };

  const findCity = (name: string) => cities.find(c => c.city_name.toLowerCase() === name.toLowerCase());

  return { cities, loading, suggest, findCity };
}
