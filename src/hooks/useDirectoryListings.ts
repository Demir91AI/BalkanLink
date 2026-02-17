import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DirectoryFilters {
  search: string;
  city: string;
  category: string;
  origin: string;
}

export function useDirectoryListings(filters: DirectoryFilters) {
  return useQuery({
    queryKey: ["directory-listings", filters],
    queryFn: async () => {
      let query = supabase
        .from("directory_listings")
        .select("*")
        .eq("verified", true)
        .order("created_at", { ascending: false });

      if (filters.city) {
        query = query.eq("city", filters.city);
      }
      if (filters.category) {
        query = query.eq("category", filters.category);
      }
      if (filters.origin) {
        query = query.eq("origin_country", filters.origin);
      }
      if (filters.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,city.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
