import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const DESKTOP_TIMEOUT_MS = 30 * 60 * 1000; // 30 min
const MOBILE_TIMEOUT_MS = 15 * 60 * 1000;  // 15 min
const LAST_ACTIVITY_KEY = "bl_last_activity";
const SESSION_EXPIRED_KEY = "bl_session_expired";
const LOGOUT_SYNC_KEY = "bl_logout_sync";

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const isSmallViewport = window.innerWidth < 768;
  const hasTouchPrimary = window.matchMedia("(pointer: coarse)").matches;
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true;
  return (isSmallViewport && hasTouchPrimary) || isStandalone;
}

function getTimeoutMs(): number {
  return isMobileDevice() ? MOBILE_TIMEOUT_MS : DESKTOP_TIMEOUT_MS;
}

function stampActivity() {
  try {
    localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
  } catch { /* quota */ }
}

function getLastActivity(): number {
  try {
    return Number(localStorage.getItem(LAST_ACTIVITY_KEY)) || Date.now();
  } catch {
    return Date.now();
  }
}

/**
 * Global session-timeout hook.
 * Must be mounted once in AuthProvider or a top-level wrapper.
 * Only runs logic when `isAuthenticated` is true.
 */
export function useSessionTimeout(isAuthenticated: boolean) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLoggingOut = useRef(false);

  /* ── sign out & flag ── */
  const performLogout = useCallback(async () => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;
    try {
      localStorage.setItem(SESSION_EXPIRED_KEY, "1");
      // notify other tabs
      localStorage.setItem(LOGOUT_SYNC_KEY, String(Date.now()));
      await supabase.auth.signOut();
    } catch { /* best-effort */ }
    isLoggingOut.current = false;
  }, []);

  /* ── schedule / reset timer ── */
  const resetTimer = useCallback(() => {
    if (!isAuthenticated) return;
    stampActivity();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      performLogout();
    }, getTimeoutMs());
  }, [isAuthenticated, performLogout]);

  /* ── check if already expired (e.g. returning from background) ── */
  const checkExpiration = useCallback(() => {
    if (!isAuthenticated) return;
    const elapsed = Date.now() - getLastActivity();
    if (elapsed >= getTimeoutMs()) {
      performLogout();
    } else {
      resetTimer();
    }
  }, [isAuthenticated, performLogout, resetTimer]);

  useEffect(() => {
    if (!isAuthenticated) {
      // clean up when not authenticated
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      isLoggingOut.current = false;
      return;
    }

    // On mount: check if previous session already expired (e.g. browser closed for days).
    // Only stamp fresh activity if NOT expired — otherwise force logout immediately.
    const lastActivityRaw = (() => {
      try { return Number(localStorage.getItem(LAST_ACTIVITY_KEY)) || 0; } catch { return 0; }
    })();
    const elapsedSinceLast = lastActivityRaw > 0 ? Date.now() - lastActivityRaw : 0;
    if (lastActivityRaw > 0 && elapsedSinceLast >= getTimeoutMs()) {
      performLogout();
      return;
    }
    stampActivity();
    resetTimer();

    /* ── activity listeners ── */
    const ACTIVITY_EVENTS: Array<keyof DocumentEventMap> = [
      "mousemove", "mousedown", "click", "keydown", "scroll",
      "touchstart", "touchmove",
    ];
    const onActivity = () => resetTimer();
    ACTIVITY_EVENTS.forEach((ev) => document.addEventListener(ev, onActivity, { passive: true }));

    /* ── visibility change (tab / app foreground) ── */
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        checkExpiration();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ── cross-tab sync via storage event ── */
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOGOUT_SYNC_KEY && e.newValue) {
        // another tab triggered logout
        performLogout();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((ev) => document.removeEventListener(ev, onActivity));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("storage", onStorage);
    };
  }, [isAuthenticated, resetTimer, checkExpiration, performLogout]);
}

/** Call on login page to check & clear the expired flag. Returns true once. */
export function consumeSessionExpiredFlag(): boolean {
  try {
    const flag = localStorage.getItem(SESSION_EXPIRED_KEY);
    if (flag === "1") {
      localStorage.removeItem(SESSION_EXPIRED_KEY);
      return true;
    }
  } catch { /* */ }
  return false;
}
