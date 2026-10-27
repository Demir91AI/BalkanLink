import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEntitlement } from "@/hooks/useEntitlement";
import { membershipCta, NEW_CUSTOMER_CHECKOUT_READY } from "@/lib/membership";
import { toast } from "@/hooks/use-toast";
import i18n from "i18next";

/** Server switches; any error = OFF. */
export function useMembershipSwitches() {
  const q = useQuery({
    queryKey: ["entitlement_settings", "membership"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("entitlement_settings")
        .select("monetization_v2_enabled, annual_checkout_enabled, trial_signup_enabled")
        .maybeSingle();
      if (error || !data) return { monetizationV2: false, checkoutEnabled: false, trialEnabled: false };
      return { monetizationV2: data.monetization_v2_enabled === true, checkoutEnabled: NEW_CUSTOMER_CHECKOUT_READY && data.annual_checkout_enabled === true, trialEnabled: data.trial_signup_enabled === true };
    },
  });
  return { ...(q.data ?? { monetizationV2: false, checkoutEnabled: false, trialEnabled: false }), loading: q.isLoading };
}

export async function startAnnualCheckout() {
  if (!NEW_CUSTOMER_CHECKOUT_READY) {
    toast({ title: i18n.t("plus:errorTitle"), description: i18n.t("plus:ctaDisabledNote") });
    return;
  }
  try {
    const returnTo = `${window.location.pathname}${window.location.search}`;
    const { data, error } = await supabase.functions.invoke("create-checkout", { body: { product: "annual", returnTo } });
    if (error) throw error;
    if (data?.url) window.location.href = data.url;
    else throw new Error("no url");
  } catch {
    toast({ title: i18n.t("plus:errorTitle"), description: i18n.t("plus:checkoutError"), variant: "destructive" });
  }
}

export function useMembership() {
  const { user, isPremium, isAdmin, loading: authLoading } = useAuth();
  const { entitlement, loading: entLoading } = useEntitlement();
  const sw = useMembershipSwitches();
  const fullAccess = !!isAdmin || !!isPremium || entitlement.full_access;
  return {
    cta: membershipCta({ signedIn: !!user, fullAccess, checkoutEnabled: sw.checkoutEnabled }),
    loading: !!authLoading || entLoading,
    entitlement,
    ...sw,
  };
}
