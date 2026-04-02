import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LS_DISMISS_KEY = "bl_pwa_dismiss";
const LS_IOS_DISMISS_KEY = "bl_pwa_ios_dismiss";

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

    // Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const dismissed = localStorage.getItem(LS_DISMISS_KEY);
      if (!dismissed) {
        setShowAndroidBanner(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS detection
    if (isIOS() && !localStorage.getItem(LS_IOS_DISMISS_KEY)) {
      // Only show in Safari (not in-app browsers)
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
    localStorage.setItem(LS_DISMISS_KEY, "1");
  }, []);

  const dismissIOS = useCallback(() => {
    setShowIOSBanner(false);
    localStorage.setItem(LS_IOS_DISMISS_KEY, "1");
  }, []);

  return {
    showAndroidBanner,
    showIOSBanner,
    installAndroid,
    dismissAndroid,
    dismissIOS,
  };
}
