import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DEV_MODE } from "@/lib/dev-mode";
import { supabase } from "@/integrations/supabase/client";

const FREE_DAILY_LIMIT = 3;

export function usePremiumAccess() {
  const { isPremium: rawPremium, isAdmin, user } = useAuth();
  const isPremium = DEV_MODE || isAdmin || rawPremium;

  return {
    isPremium,
    isDevMode: DEV_MODE,
    isAdmin,
    isLoggedIn: !!user,
    /** Free users see first N steps; rest locked */
    canAccessStep: (stepIndex: number) => isPremium || stepIndex < 1,
    /** Free users can't use doc generator */
    canUseDocGenerator: isPremium,
  };
}

/**
 * Hook to track AI chat usage per day (DB-backed).
 * Returns remaining count + a function to record a new query.
 */
export function useChatLimit() {
  const { isPremium, isAdmin, user } = useAuth();
  const effectivePremium = DEV_MODE || isAdmin || isPremium;
  const [dailyCount, setDailyCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const fetchCount = useCallback(async () => {
    if (!user) { setDailyCount(0); setLoaded(true); return; }
    const { data } = await supabase.rpc("get_daily_chat_count", { _user_id: user.id });
    setDailyCount(typeof data === "number" ? data : 0);
    setLoaded(true);
  }, [user]);

  useEffect(() => { fetchCount(); }, [fetchCount]);

  const recordQuery = useCallback(async () => {
    if (!user) return false;
    if (!isPremium && !isAdmin && dailyCount >= FREE_DAILY_LIMIT) return false;
    const { error } = await supabase.from("chat_usage" as any).insert({ user_id: user.id });
    if (!error) setDailyCount((c) => c + 1);
    return !error;
  }, [user, isPremium, dailyCount]);

  return {
    canChat: effectivePremium || dailyCount < FREE_DAILY_LIMIT,
    remaining: effectivePremium ? Infinity : Math.max(0, FREE_DAILY_LIMIT - dailyCount),
    dailyCount,
    recordQuery,
    loaded,
    isPremium: effectivePremium,
  };
}
