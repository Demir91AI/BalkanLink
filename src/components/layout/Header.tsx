import { useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const menuBtnClass =
  "h-10 w-10 rounded-lg text-white/70 hover:text-white hover:bg-white/8 active:scale-[0.93] transition-transform duration-150";

function LangPill() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex h-9 items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm p-[3px] gap-0">
      <button
        onClick={() => setLanguage("bhs")}
        className={`flex items-center h-[30px] min-w-[44px] px-2.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
          language === "bhs"
            ? "bg-[hsl(var(--gold))] text-white shadow-md"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        <span style={{ fontSize: "0.6em", letterSpacing: "-3px", marginRight: "6px", lineHeight: "1", display: "inline-block" }}>🇧🇦🇭🇷🇷🇸</span>
        <span>BS/HR/SR</span>
      </button>
      <button
        onClick={() => setLanguage("de")}
        className={`flex items-center h-[30px] min-w-[44px] px-2.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
          language === "de"
            ? "bg-[hsl(var(--gold))] text-white shadow-md"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        <span style={{ marginRight: "4px" }}>🇩🇪</span>
        <span>DE</span>
      </button>
    </div>
  );
}

export default function Header() {
  const { loading, isAdmin } = useAuth();
  const { t } = useLanguage();

  const lastToggleRef = useRef(0);
  const handleToggleSidebar = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleRef.current < 250) return;
    lastToggleRef.current = now;
    window.dispatchEvent(new CustomEvent("toggle-sidebar"));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0f1f3d]/95 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-60" />

      <div className="relative flex h-14 items-center justify-between px-4">
        <Button variant="ghost" size="icon" onClick={handleToggleSidebar} className={menuBtnClass} aria-label={t("sidebar.menu")}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className="group relative inline-flex items-center gap-3" aria-label="BalkanLink home">
            <span className="absolute -inset-3 rounded-2xl bg-[hsl(var(--gold))]/10 blur-xl group-hover:bg-[hsl(var(--gold))]/20 transition-all duration-500 pointer-events-none" />
            <span className="relative font-heading text-[28px] font-extrabold leading-none tracking-tight drop-shadow-[0_0_10px_hsl(var(--gold)/0.35)]">
              <span className="text-white">B</span>
              <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">L</span>
            </span>
            <span className="relative font-heading text-[22px] font-extrabold leading-none tracking-tight drop-shadow-[0_0_16px_hsl(var(--gold)/0.3)]">
              <span className="text-white">Balkan</span>
              <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">Link</span>
            </span>
          </Link>

          {!loading && isAdmin && (
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
              <ShieldCheck className="h-2.5 w-2.5" />
              Admin
            </span>
          )}
        </div>

        <LangPill />
      </div>
    </header>
  );
}