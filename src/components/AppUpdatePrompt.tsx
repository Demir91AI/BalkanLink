import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";

const VERSION_URL = "/version.json";
const POLL_MS = 5 * 60 * 1000; // every 5 minutes

/**
 * Detects new builds two ways:
 *  1) Service worker `controllerchange` (when SW preuzme novi build)
 *  2) Polling /version.json every 5 min (radi i bez SW i odmah nakon deploya)
 * Shows a toast with one-tap reload.
 */
export default function AppUpdatePrompt() {
  const [show, setShow] = useState(false);
  const initialVersion = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchVersion(): Promise<string | null> {
      try {
        const r = await fetch(`${VERSION_URL}?t=${Date.now()}`, { cache: "no-store" });
        if (!r.ok) return null;
        const j = await r.json();
        return typeof j?.version === "string" ? j.version : null;
      } catch {
        return null;
      }
    }

    // Initial baseline
    fetchVersion().then((v) => {
      if (!cancelled) initialVersion.current = v;
    });

    const poll = window.setInterval(async () => {
      const v = await fetchVersion();
      if (cancelled || !v) return;
      // A transient first-request failure must not disable detection for this session.
      if (!initialVersion.current) { initialVersion.current = v; return; }
      if (v !== initialVersion.current) setShow(true);
    }, POLL_MS);

    // SW path
    let swCleanup: (() => void) | null = null;
    if ("serviceWorker" in navigator) {
      let reloaded = false;
      const onControllerChange = () => {
        if (reloaded) return;
        reloaded = true;
        setShow(true);
      };
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
      const swInterval = window.setInterval(() => {
        navigator.serviceWorker.getRegistration().then((reg) => reg?.update().catch(() => {}));
      }, 30 * 60 * 1000);
      swCleanup = () => {
        navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
        clearInterval(swInterval);
      };
    }

    return () => {
      cancelled = true;
      clearInterval(poll);
      swCleanup?.();
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 px-4">
      <div className="flex items-center gap-3 rounded-full border border-border/50 bg-card/95 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
        <RefreshCw className="h-4 w-4 text-[hsl(var(--gold))]" />
        <span className="text-xs font-semibold text-foreground">Nova verzija dostupna</span>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full bg-[hsl(var(--gold))] px-3 py-1 text-xs font-bold text-[hsl(var(--primary))] hover:opacity-90"
        >
          Osvježi
        </button>
      </div>
    </div>
  );
}
