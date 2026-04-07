import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LS_DISMISS_KEY = "pwa-dismissed-at";
const LS_INSTALLED_KEY = "pwa-installed";
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

function isInstalled(): boolean {
  try {
    return localStorage.getItem(LS_INSTALLED_KEY) === "true";
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
    if (isStandalone() || isInstalled()) return;
    const isMobileWidth = window.innerWidth < 768;
    if (!isMobileWidth) return;
    const timeouts: number[] = [];
    const queueBanner = (setter: (value: boolean) => void) => {
      timeouts.push(window.setTimeout(() => setter(true), 3000));
    };

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isDismissed(LS_DISMISS_KEY)) {
        queueBanner(setShowAndroidBanner);
      }
    };
    const handleInstalled = () => {
      localStorage.setItem(LS_INSTALLED_KEY, "true");
      setShowAndroidBanner(false);
      setShowIOSBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", handleInstalled);

    if (isIOS() && !isDismissed(LS_DISMISS_KEY)) {
      const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS/.test(navigator.userAgent);
      if (isSafari) {
        queueBanner(setShowIOSBanner);
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", handleInstalled);
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const installAndroid = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(LS_INSTALLED_KEY, "true");
    }
    setShowAndroidBanner(false);
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismissBanner = useCallback(() => {
    setShowAndroidBanner(false);
    setShowIOSBanner(false);
    localStorage.setItem(LS_DISMISS_KEY, Date.now().toString());
  }, []);

  const dismissAndroid = dismissBanner;
  const dismissIOS = dismissBanner;

  const canShow = showAndroidBanner || showIOSBanner;
  const platform: "android" | "ios" | null = showAndroidBanner ? "android" : showIOSBanner ? "ios" : null;

  return {
    canShow,
    platform,
    showAndroidBanner,
    showIOSBanner,
    installAndroid,
    dismissBanner,
    dismissAndroid,
    dismissIOS,
  };
}
