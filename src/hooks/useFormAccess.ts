import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useFormAccess(formSlug: string) {
  const { user, isAdmin } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAccess = useCallback(async () => {
    if (isAdmin) {
      setHasAccess(true);
      setLoading(false);
      return;
    }
    if (!user) {
      setHasAccess(false);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("user_form_access")
      .select("id")
      .eq("user_id", user.id)
      .eq("form_slug", formSlug)
      .eq("status", "active")
      .maybeSingle();
    setHasAccess(!!data);
    setLoading(false);
  }, [user, formSlug, isAdmin]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  const simulatePurchase = async () => {
    if (!user) return false;
    const { error } = await supabase.from("user_form_access").insert({
      user_id: user.id,
      form_slug: formSlug,
      status: "active",
    });
    if (!error) {
      setHasAccess(true);
      return true;
    }
    return false;
  };

  const resetAccess = async () => {
    if (!user) return;
    await supabase
      .from("user_form_access")
      .delete()
      .eq("user_id", user.id)
      .eq("form_slug", formSlug);
    setHasAccess(false);
  };

  return { hasAccess, loading, simulatePurchase, resetAccess, checkAccess };
}
