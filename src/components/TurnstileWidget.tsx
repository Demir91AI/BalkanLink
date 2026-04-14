import { useEffect, useRef, useCallback, useState } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAAC1hBlYbnkduVDKP";

interface Props {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

let scriptLoaded = false;
let scriptLoading = false;
let scriptFailed = false;
const loadCallbacks: ((success: boolean) => void)[] = [];

function loadScript(): Promise<boolean> {
  if (scriptFailed) return Promise.resolve(false);
  if (scriptLoaded) return Promise.resolve(true);
  if (scriptLoading) {
    return new Promise<boolean>((resolve) => loadCallbacks.push(resolve));
  }
  scriptLoading = true;
  return new Promise<boolean>((resolve) => {
    loadCallbacks.push(resolve);

    const timeout = setTimeout(() => {
      if (!scriptLoaded) {
        scriptFailed = true;
        scriptLoading = false;
        loadCallbacks.forEach((cb) => cb(false));
        loadCallbacks.length = 0;
      }
    }, 5000);

    window.onTurnstileLoad = () => {
      clearTimeout(timeout);
      scriptLoaded = true;
      scriptLoading = false;
      loadCallbacks.forEach((cb) => cb(true));
      loadCallbacks.length = 0;
    };

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      clearTimeout(timeout);
      scriptFailed = true;
      scriptLoading = false;
      loadCallbacks.forEach((cb) => cb(false));
      loadCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

export default function TurnstileWidget({ onVerify, onExpire, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [failed, setFailed] = useState(false);

  const handleVerify = useCallback((token: string) => onVerify(token), [onVerify]);

  useEffect(() => {
    let cancelled = false;

    loadScript().then((success) => {
      if (cancelled) return;
      if (!success || !containerRef.current || !window.turnstile) {
        // Turnstile unavailable — auto-pass with bypass token so login still works
        setFailed(true);
        onVerify("TURNSTILE_BYPASS");
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: handleVerify,
        "expired-callback": onExpire,
        theme: "auto",
        size: "flexible",
      });
    });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [handleVerify, onExpire, onVerify]);

  if (failed) {
    return null; // hide widget when Turnstile can't load
  }

  return <div ref={containerRef} className={className} />;
}
