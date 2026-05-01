import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Lightweight page-view logger.
 * - Fires once per pathname change (no double counts on re-renders).
 * - Strips query string + hash to keep aggregation clean.
 * - Best-effort: silently ignores failures (no UI impact).
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
    const ua = typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 255) : null;

    // fire-and-forget
    (async () => {
      try {
        await supabase.from("page_views" as any).insert({
          path,
          user_id: user?.id ?? null,
          referrer,
          user_agent: ua,
        });
      } catch { /* silent */ }
    })();
  }, [pathname, user?.id]);
}
