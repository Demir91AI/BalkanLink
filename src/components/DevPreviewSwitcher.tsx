import { useState, useEffect } from "react";
import { DEV_MODE } from "@/lib/dev-mode";

export default function DevPreviewSwitcher() {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    if (mode === "mobile") {
      document.body.classList.add("mobile-preview");
    } else {
      document.body.classList.remove("mobile-preview");
    }
    return () => document.body.classList.remove("mobile-preview");
  }, [mode]);

  if (!DEV_MODE) return null;

  return (
    <div
      className="fixed bottom-20 right-4 z-[9999] flex items-center gap-1 rounded-lg border border-[hsl(215,20%,27%)] bg-[hsl(215,25%,15%)] p-1 shadow-lg"
    >
      <button
        onClick={() => setMode("mobile")}
        className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
          mode === "mobile"
            ? "bg-gold text-black"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        📱
      </button>
      <button
        onClick={() => setMode("desktop")}
        className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
          mode === "desktop"
            ? "bg-gold text-black"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        🖥️
      </button>
    </div>
  );
}
