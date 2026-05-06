import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

/**
 * Shows a small toast when a new service worker takes control,
 * giving the user a one-tap "reload" so they always get the latest build
 * without needing to reinstall the PWA.
 */
export default function AppUpdatePrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let reloaded = false;

    const onControllerChange = () => {
      if (reloaded) return;
      reloaded = true;
      setShow(true);
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    // Periodically ask the SW to check for updates (every 30 min)
    const interval = window.setInterval(() => {
      navigator.serviceWorker.getRegistration().then((reg) => reg?.update().catch(() => {}));
    }, 30 * 60 * 1000);

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 px-4 md:bottom-6">
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
