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

export function isFirefoxAndroid() {
  return /Android/i.test(navigator.userAgent) && /Firefox/i.test(navigator.userAgent);
}

export function isWebView() {
  const ua = navigator.userAgent;
  return /FBAN|FBAV|FB_IAB|Instagram|TikTok|MicroMessenger|Snapchat|Twitter|Line/i.test(ua) ||
    (/Android/i.test(ua) && /; wv\)/i.test(ua));
}

export function isIOSNonSafari() {
  const ua = navigator.userAgent;
  const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
  return isIOSDevice && !isSafari;
}

export function needsAndroidRedirect() {
  return isSamsungBrowser() || isFirefoxAndroid() || isWebView();
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
  const [showIOSOtherGuide, setShowIOSOtherGuide] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [showSamsungGuide, setShowSamsungGuide] = useState(false);
  const [triggerReady, setTriggerReady] = useState(false);
  const visitedRoutes = useRef(new Set<string>());
  const location = useLocation();

  useEffect(() => {
    visitedRoutes.current.add(location.pathname);
    const clickedTrigger = TRIGGER_PATHS.some((p) => location.pathname.startsWith(p));
    if (clickedTrigger) setTriggerReady(true);
    if (visitedRoutes.current.size >= ROUTE_THRESHOLD) setTriggerReady(true);
  }, [location.pathname]);

  useEffect(() => {
    const timer = window.setTimeout(() => setTriggerReady(true), TIME_THRESHOLD_MS);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    if (isStandalone() || isAccepted() || isCoolingDown()) return;
    if (!triggerReady) return;
    if (!cookieConsentGiven()) return;

    try {
      if (sessionStorage.getItem("pwaInstallShownThisSession") === "1") return;
    } catch { /* noop */ }

    const isMobileWidth = window.innerWidth < 768;
    if (!isMobileWidth) return;

    const markShown = () => {
      try {
        sessionStorage.setItem("pwaInstallShownThisSession", "1");
        if (!localStorage.getItem(LS_DISMISS_KEY)) {
          localStorage.setItem(LS_DISMISS_KEY, new Date().toISOString());
        }
      } catch { /* noop */ }
    };

    if (needsAndroidRedirect()) {
      setShowSamsungGuide(true);
      markShown();
    } else if (deferredPrompt) {
      setShowBanner(true);
      markShown();
    } else if (isIOS() && !isIOSNonSafari()) {
      setShowIOSGuide(true);
      markShown();
    } else if (isIOSNonSafari()) {
      setShowIOSOtherGuide(true);
      markShown();
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
    setShowIOSOtherGuide(false);
    setShowSamsungGuide(false);
  }, []);

  const closeIOSGuide = useCallback(() => setShowIOSGuide(false), []);
  const closeIOSOtherGuide = useCallback(() => setShowIOSOtherGuide(false), []);
  const closeManualGuide = useCallback(() => setShowManualGuide(false), []);
  const closeSamsungGuide = useCallback(() => setShowSamsungGuide(false), []);

  const triggerManual = useCallback(() => {
    if (isStandalone()) return;
    if (needsAndroidRedirect()) { setShowSamsungGuide(true); return; }
    if (isIOSNonSafari()) { setShowIOSOtherGuide(true); return; }
    if (deferredPrompt) { setShowBanner(true); return; }
    setShowManualGuide(true);
  }, [deferredPrompt]);

  const canShowMenuEntry = !isStandalone();

  return {
    showBanner,
    showIOSGuide,
    showIOSOtherGuide,
    showManualGuide,
    showSamsungGuide,
    installAndroid,
    dismiss,
    closeIOSGuide,
    closeIOSOtherGuide,
    closeManualGuide,
    closeSamsungGuide,
    triggerManual,
    canShowMenuEntry,
  };
}
