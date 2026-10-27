import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FREE_ENTITLEMENT, type Entitlement } from "@/lib/entitlement";

/** Shared read of the server entitlement. Phase 1: not yet used by any screen. */
export function useEntitlement() {
  const { user } = useAuth();
  const q = useQuery({
    queryKey: ["entitlement", user?.id],
    enabled: !!user?.id,
    staleTime: 60_000,
    queryFn: async (): Promise<Entitlement> => {
      const { data, error } = await supabase.rpc("get_entitlement", { uid: user!.id });
      if (error) throw error;
      return data as unknown as Entitlement;
    },
  });
  return {
    entitlement: user ? q.data ?? FREE_ENTITLEMENT : FREE_ENTITLEMENT,
    loading: !!user && q.isLoading,
    error: q.error,
    refresh: q.refetch,
  };
}
