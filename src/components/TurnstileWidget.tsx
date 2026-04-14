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
    return (
      <div className={className} style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        borderRadius: 8,
        background: "rgba(201,168,76,0.08)",
        border: "1px solid rgba(201,168,76,0.2)",
        fontSize: 13,
        color: "#8B7530",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="8" cy="8" r="7" stroke="#C9A84C" strokeWidth="1.5" />
          <path d="M8 5v3.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill="#C9A84C" />
        </svg>
        <span>Sigurnosna provjera nije dostupna — prijava je i dalje moguća.</span>
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}
