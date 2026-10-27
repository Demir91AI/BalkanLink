import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FREE_ENTITLEMENT, type Entitlement } from "@/lib/entitlement";

export interface FeatureCounter {
  used: number;
  /** null = unlimited */
  limit: number | null;
  remaining: number | null;
}

export interface FeatureAccess extends Entitlement {
  features: { document_analysis: FeatureCounter; assistant_reply: FeatureCounter };
  trial: { granted_at: string; expires_at: string } | null;
}

const EMPTY: FeatureAccess = {
  ...FREE_ENTITLEMENT,
  features: {
    document_analysis: { used: 0, limit: 0, remaining: 0 },
    assistant_reply: { used: 0, limit: 0, remaining: 0 },
  },
  trial: null,
};

/** Whole days left until `iso`, never negative. */
export function trialDaysLeft(iso: string | null | undefined, now: Date = new Date()): number {
  if (!iso) return 0;
  const ms = new Date(iso).getTime() - now.getTime();
  return ms <= 0 ? 0 : Math.ceil(ms / 86_400_000);
}

/** Server-computed access + remaining counters. Read-only; quotas are enforced server-side. */
export function useFeatureAccess() {
  const { user } = useAuth();
  const q = useQuery({
    queryKey: ["feature-access", user?.id],
    enabled: !!user?.id,
    staleTime: 30_000,
    queryFn: async (): Promise<FeatureAccess> => {
      const { data, error } = await supabase.rpc("get_feature_access", { uid: user!.id });
      if (error) throw error;
      return data as unknown as FeatureAccess;
    },
  });
  const access = user ? q.data ?? EMPTY : EMPTY;
  return {
    access,
    trialDaysLeft: trialDaysLeft(access.trial?.expires_at ?? null),
    loading: !!user && q.isLoading,
    refresh: q.refetch,
  };
}
