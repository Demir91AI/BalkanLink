import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const CONSENT_KEY = "bl_cookie_consent";

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.consentGiven && parsed?.analyticsConsent);
  } catch {
    return false;
  }
}

/**
 * Lightweight page-view logger.
 * Respects cookie consent: if analytics consent is missing, only minimal
 * data (path + user_id) is sent and the edge skips IP-based enrichment.
 */
export function usePageViewTracker() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const path = pathname.replace(/\/+$/, "") || "/";
    const analytics = hasAnalyticsConsent();
    const referrer = analytics && typeof document !== "undefined" ? document.referrer || null : null;

    (async () => {
      try {
        const { error } = await supabase.functions.invoke("track-page-view", {
          body: { path, referrer, analytics },
        });
        if (error) throw error;
      } catch {
        try {
          await supabase.from("page_views" as any).insert({
            path,
            user_id: user?.id ?? null,
            referrer,
            user_agent: analytics && typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 255) : null,
          });
        } catch { /* silent */ }
      }
    })();
  }, [pathname, user?.id]);
}
