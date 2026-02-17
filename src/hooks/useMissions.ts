import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MissionFilters {
  country: string;
  city: string;
  missionType: string;
}

export function useMissions(filters: MissionFilters) {
  return useQuery({
    queryKey: ["missions", filters],
    queryFn: async () => {
      let query = supabase
        .from("missions")
        .select("*")
        .order("country_name", { ascending: true })
        .order("mission_type", { ascending: true })
        .order("city", { ascending: true });

      if (filters.country) {
        query = query.eq("country_code", filters.country);
      }
      if (filters.city) {
        query = query.eq("city", filters.city);
      }
      if (filters.missionType) {
        query = query.eq("mission_type", filters.missionType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
