import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Reads the rollout switch. Any error or missing row is treated as OFF (legacy behaviour). */
export function useMonetizationV2(): boolean {
  const q = useQuery({
    queryKey: ["entitlement_settings", "monetization_v2"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("entitlement_settings")
        .select("monetization_v2_enabled")
        .maybeSingle();
      if (error) return false;
      return data?.monetization_v2_enabled === true;
    },
  });
  return q.data === true;
}
