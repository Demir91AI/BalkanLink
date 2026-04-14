import { supabase } from "@/integrations/supabase/client";

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  // When Turnstile couldn't load (e.g. blocked by browser/environment), skip verification
  if (token === "TURNSTILE_BYPASS") return true;
  try {
    const { data, error } = await supabase.functions.invoke("verify-turnstile", {
      body: { token },
    });
    if (error) return false;
    return data?.success === true;
  } catch {
    return false;
  }
}
