import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Lightweight page-view logger.
 * Routes via `track-page-view` edge function which adds country+city via IP geo lookup.
 * Falls back to direct insert if function call fails.
 */
export function usePageViewTracker() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const path = pathname.replace(/\/+$/, "") || "/";
    const referrer = typeof document !== "undefined" ? document.referrer || null : null;

    (async () => {
      try {
        const { error } = await supabase.functions.invoke("track-page-view", {
          body: { path, referrer },
        });
        if (error) throw error;
      } catch {
        // Fallback: best-effort direct insert without geo
        try {
          await supabase.from("page_views" as any).insert({
            path,
            user_id: user?.id ?? null,
            referrer,
            user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 255) : null,
          });
        } catch { /* silent */ }
      }
    })();
  }, [pathname, user?.id]);
}
