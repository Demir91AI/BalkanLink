import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LS_DISMISS_KEY = "bl_pwa_dismiss";
const LS_IOS_DISMISS_KEY = "bl_pwa_ios_dismiss";
const DISMISS_DAYS = 7;

function isDismissed(key: string): boolean {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (isNaN(ts)) return false;
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
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

export function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showAndroidBanner, setShowAndroidBanner] = useState(false);
  const [showIOSBanner, setShowIOSBanner] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isDismissed(LS_DISMISS_KEY)) {
        setShowAndroidBanner(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (isIOS() && !isDismissed(LS_IOS_DISMISS_KEY)) {
      const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS/.test(navigator.userAgent);
      if (isSafari) {
        setShowIOSBanner(true);
      }
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installAndroid = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowAndroidBanner(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismissAndroid = useCallback(() => {
    setShowAndroidBanner(false);
    localStorage.setItem(LS_DISMISS_KEY, Date.now().toString());
  }, []);

  const dismissIOS = useCallback(() => {
    setShowIOSBanner(false);
    localStorage.setItem(LS_IOS_DISMISS_KEY, Date.now().toString());
  }, []);

  const canShow = showAndroidBanner || showIOSBanner;
  const platform: "android" | "ios" | null = showAndroidBanner ? "android" : showIOSBanner ? "ios" : null;

  return {
    canShow,
    platform,
    showAndroidBanner,
    showIOSBanner,
    installAndroid,
    dismissAndroid,
    dismissIOS,
  };
}
