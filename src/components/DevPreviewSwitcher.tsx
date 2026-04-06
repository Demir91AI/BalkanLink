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
    <div className="flex items-center justify-center gap-1 rounded-[20px] border border-[#374151] bg-[#1F2937] p-1">
      <button
        onClick={() => setMode("mobile")}
        className={`rounded-[16px] px-3 py-1 text-[11px] font-medium transition-colors ${
          mode === "mobile"
            ? "bg-[#EAB308] text-black"
            : "text-[#9CA3AF] hover:text-white/80"
        }`}
      >
        📱 Mobilni prikaz
      </button>
      <button
        onClick={() => setMode("desktop")}
        className={`rounded-[16px] px-3 py-1 text-[11px] font-medium transition-colors ${
          mode === "desktop"
            ? "bg-[#EAB308] text-black"
            : "text-[#9CA3AF] hover:text-white/80"
        }`}
      >
        🖥️ Desktop prikaz
      </button>
    </div>
  );
}
