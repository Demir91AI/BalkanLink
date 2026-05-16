import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LS_DISMISS_KEY = "pwaInstallDismissedAt";
const LS_ACCEPTED_KEY = "pwaInstallAccepted";
const LS_DECLINE_COUNT = "pwaInstallDeclineCount";
const LS_LAST_SEEN = "pwaInstallLastSeenAt";

const COOLDOWN_DAYS = 7;
const HEAVY_COOLDOWN_DAYS = 30;
const TIME_THRESHOLD_MS = 60_000;
const ROUTE_THRESHOLD = 2;

const TRIGGER_PATHS = ["/formulari", "/viza", "/kalkulatori", "/deutsch-trainer"];

function tsFromLS(key: string): number {
  try {
    const v = localStorage.getItem(key);
    return v ? new Date(v).getTime() : 0;
  } catch { return 0; }
}

function numFromLS(key: string): number {
  try { return parseInt(localStorage.getItem(key) ?? "0", 10) || 0; } catch { return 0; }
}

export function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
  );
}

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

export function isSamsungBrowser() {
  return /SamsungBrowser/i.test(navigator.userAgent);
}

function isCoolingDown(): boolean {
  const dismissedAt = tsFromLS(LS_DISMISS_KEY);
  if (!dismissedAt) return false;
  const declineCount = numFromLS(LS_DECLINE_COUNT);
  const days = declineCount >= 2 ? HEAVY_COOLDOWN_DAYS : COOLDOWN_DAYS;
  return Date.now() - dismissedAt < days * 24 * 60 * 60 * 1000;
}

function isAccepted(): boolean {
  try { return localStorage.getItem(LS_ACCEPTED_KEY) === "true"; } catch { return false; }
}

function cookieConsentGiven(): boolean {
  try {
    const raw = localStorage.getItem("bl_cookie_consent");
    if (!raw) return false;
    return JSON.parse(raw).consentGiven === true;
  } catch { return false; }
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [showSamsungGuide, setShowSamsungGuide] = useState(false);
  const [triggerReady, setTriggerReady] = useState(false);
  const visitedRoutes = useRef(new Set<string>());
  const mountTime = useRef(Date.now());
  const location = useLocation();

  // Track routes
  useEffect(() => {
    visitedRoutes.current.add(location.pathname);
    const clickedTrigger = TRIGGER_PATHS.some((p) => location.pathname.startsWith(p));
    if (clickedTrigger) setTriggerReady(true);
    if (visitedRoutes.current.size >= ROUTE_THRESHOLD) setTriggerReady(true);
  }, [location.pathname]);

  // Time-based trigger
  useEffect(() => {
    const timer = window.setTimeout(() => setTriggerReady(true), TIME_THRESHOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  // Listen for beforeinstallprompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const installed = () => {
      localStorage.setItem(LS_ACCEPTED_KEY, "true");
      setShowBanner(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installed);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);

  // Show banner when conditions met
  useEffect(() => {
    if (isStandalone() || isAccepted() || isCoolingDown()) return;
    if (!triggerReady) return;
    if (!cookieConsentGiven()) return;

    // Per-session guard: if banner was already shown this session, skip.
    // Prevents re-appearance on every page refresh.
    try {
      if (sessionStorage.getItem("pwaInstallShownThisSession") === "1") return;
    } catch { /* noop */ }

    const isMobileWidth = window.innerWidth < 768;
    if (!isMobileWidth) return;

    const markShown = () => {
      try {
        sessionStorage.setItem("pwaInstallShownThisSession", "1");
        // Also start a soft cooldown so it won't appear on the very next visit
        // even if the user never explicitly dismisses it.
        if (!localStorage.getItem(LS_DISMISS_KEY)) {
          localStorage.setItem(LS_DISMISS_KEY, new Date().toISOString());
        }
      } catch { /* noop */ }
    };

    if (isSamsungBrowser()) {
      setShowSamsungGuide(true);
      markShown();
    } else if (deferredPrompt) {
      setShowBanner(true);
      markShown();
    } else if (isIOS()) {
      const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS/.test(navigator.userAgent);
      if (isSafari) { setShowIOSGuide(true); markShown(); }
    }
  }, [triggerReady, deferredPrompt]);

  const installAndroid = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(LS_ACCEPTED_KEY, "true");
    } else {
      const count = numFromLS(LS_DECLINE_COUNT) + 1;
      localStorage.setItem(LS_DECLINE_COUNT, count.toString());
      localStorage.setItem(LS_DISMISS_KEY, new Date().toISOString());
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    const count = numFromLS(LS_DECLINE_COUNT) + 1;
    localStorage.setItem(LS_DECLINE_COUNT, count.toString());
    localStorage.setItem(LS_DISMISS_KEY, new Date().toISOString());
    localStorage.setItem(LS_LAST_SEEN, new Date().toISOString());
    setShowBanner(false);
    setShowIOSGuide(false);
  }, []);

  const closeIOSGuide = useCallback(() => {
    setShowIOSGuide(false);
  }, []);

  const closeManualGuide = useCallback(() => {
    setShowManualGuide(false);
  }, []);

  // Manual trigger from menu — always shows actionable guidance
  const triggerManual = useCallback(() => {
    if (isStandalone()) return;
    // If browser supports the native prompt, use it
    if (deferredPrompt) {
      setShowBanner(true);
      return;
    }
    // Otherwise show the per-browser manual guide (handles iOS Safari, iOS Chrome,
    // Android Chrome, Samsung Internet, Firefox, in-app webviews, desktop)
    setShowManualGuide(true);
  }, [deferredPrompt]);

  // Always allow opening the install guide unless the app is already running standalone
  const canShowMenuEntry = !isStandalone();

  return {
    showBanner,
    showIOSGuide,
    showManualGuide,
    installAndroid,
    dismiss,
    closeIOSGuide,
    closeManualGuide,
    triggerManual,
    canShowMenuEntry,
  };
}
