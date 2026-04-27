import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FREE_LESSONS_PER_LEVEL } from "@/lib/trainer/types";
import { DEV_MODE } from "@/lib/dev-mode";

const FREE_SPRACHASSISTENT_SENTENCES = 3;

interface SubscriptionState {
  isPremium: boolean;
  subscriptionTier: "free" | "premium";
  expiresAt: Date | null;
  singleFormularAccess: string[];
  loading: boolean;
  hasSingleAccess: (formularId: string) => boolean;
  /** Check if user can access step (step 0 always free) */
  canAccessStep: (stepIndex: number) => boolean;
  /** Check if user can access lesson (first 3 free per module) */
  canAccessLesson: (lessonIndex: number) => boolean;
  /** Check if user can access Sprachassistent sentence (first 3 free) */
  canAccessSprachassistent: (sentenceIndex: number) => boolean;
  isLoggedIn: boolean;
  refetch: () => Promise<void>;
}

export function useSubscription(): SubscriptionState {
  const { user, isPremium: authPremium, isAdmin } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<"free" | "premium">("free");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [singleFormularAccess, setSingleFormularAccess] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setSubscriptionTier("free");
      setExpiresAt(null);
      setSingleFormularAccess([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("subscription_tier, subscription_expires_at, single_formular_access, is_premium")
      .eq("id", user.id)
      .single();

    if (data) {
      const tier = data.subscription_tier as "free" | "premium";
      const expired = data.subscription_expires_at
        ? new Date(data.subscription_expires_at) < new Date()
        : false;

      const isPremiumField = data.is_premium ?? false;
      const tierPremium = !expired && tier === "premium";
      const effectiveTier = isPremiumField || tierPremium ? "premium" : "free";

      setSubscriptionTier(effectiveTier);
      setExpiresAt(data.subscription_expires_at ? new Date(data.subscription_expires_at) : null);
      setSingleFormularAccess((data.single_formular_access as string[]) || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Listen for subscription refresh events (fired after Stripe checkout / verify-payment).
  // Without this, useSubscription would only refetch on mount, so the just-purchased
  // Premium status was invisible until a manual page reload.
  useEffect(() => {
    const handler = () => { fetchSubscription(); };
    window.addEventListener("bl:subscription-refreshed", handler);
    return () => window.removeEventListener("bl:subscription-refreshed", handler);
  }, [fetchSubscription]);

  const tierActive = subscriptionTier === "premium";
  const effectivePremium = DEV_MODE || isAdmin || authPremium || tierActive;

  const hasSingleAccess = useCallback(
    (formularId: string) => effectivePremium || singleFormularAccess.includes(formularId),
    [effectivePremium, singleFormularAccess]
  );

  const canAccessStep = useCallback(
    (stepIndex: number) => effectivePremium || stepIndex < 2,
    [effectivePremium]
  );

  const canAccessLesson = useCallback(
    (lessonIndex: number) => effectivePremium || lessonIndex < FREE_LESSONS_PER_LEVEL,
    [effectivePremium]
  );

  const canAccessSprachassistent = useCallback(
    (sentenceIndex: number) => effectivePremium || sentenceIndex < FREE_SPRACHASSISTENT_SENTENCES,
    [effectivePremium]
  );

  return {
    isPremium: effectivePremium,
    subscriptionTier: effectivePremium ? "premium" : "free",
    expiresAt,
    singleFormularAccess,
    loading,
    hasSingleAccess,
    canAccessStep,
    canAccessLesson,
    canAccessSprachassistent,
    isLoggedIn: !!user,
    refetch: fetchSubscription,
  };
}
