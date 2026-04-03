import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText, Shield, BookOpen, Camera, Megaphone, Map,
  Briefcase, Building, Calculator, FileCheck, X,
} from "lucide-react";

const mainItems = [
  { title: "Smart Guide — Formulari", url: "/formulari", icon: FileText, premium: true },
  { title: "Visa Navigator", url: "/dolazak/boravisna-dozvola", icon: Shield, premium: true },
  { title: "BalkanLink Deutsch", url: "/deutsch-trainer", icon: BookOpen, premium: true },
  { title: "Dokumenten-Check", url: "/dokumenten-check", icon: Camera, premium: true },
  { title: "Nudim / Tražim", url: "/nudim-trazim", icon: Megaphone, premium: false },
  { title: "Balkanci u DE", url: "/mapa", icon: Map, premium: false },
];

const secondaryItems = [
  { title: "Pretraga poslova", url: "/stellenangebote", icon: Briefcase },
  { title: "Pretraga stanova", url: "/wohnungen", icon: Building },
  { title: "Kalkulatori", url: "/kalkulatori", icon: Calculator },
  { title: "Šabloni", url: "/vorlagen", icon: FileCheck },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = useCallback(() => {
    const now = Date.now();
    if (now - debounceRef.current < 250) return;
    debounceRef.current = now;
    setIsOpen((prev) => !prev);
  }, []);

  const open = useCallback(() => {
    const now = Date.now();
    if (now - debounceRef.current < 250) return;
    debounceRef.current = now;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on route change
  useEffect(() => { close(); }, [location.pathname, close]);

  const handleNav = useCallback((url: string) => {
    close();
    navigate(url);
  }, [close, navigate]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[998] bg-black/45 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className="fixed left-0 top-0 z-[999] h-screen w-[280px] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D0]">
          <span className="text-sm font-bold text-[#2D2D2D] tracking-wide uppercase">Meni</span>
          <button onClick={close} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDE6] transition-colors">
            <X className="h-4 w-4 text-[#6B6B6B]" />
          </button>
        </div>

        {/* Main items */}
        <div className="px-3 pt-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">Glavne funkcije</p>
          <nav className="flex flex-col gap-0.5">
            {mainItems.map((item) => {
              const active = location.pathname === item.url || location.pathname.startsWith(item.url + "/");
              return (
                <button
                  key={item.url}
                  onClick={() => handleNav(item.url)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    active
                      ? "bg-[hsl(var(--gold))]/10 shadow-[inset_3px_0_0_hsl(var(--gold))]"
                      : "hover:bg-[#F5F0E8]"
                  }`}
                >
                  <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[hsl(var(--gold))]" : "text-[#6B6B6B]"}`} />
                  <span
                    className={`text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${
                      active ? "text-[hsl(var(--gold))]" : "text-[#2D2D2D]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.premium && (
                    <span className="ml-auto shrink-0 rounded-full bg-[hsl(var(--gold))] px-2 py-0.5 text-[9px] font-bold leading-none text-white">
                      PREMIUM
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary items */}
        <div className="px-3 pt-5 pb-6">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">Ostalo</p>
          <nav className="flex flex-col gap-0.5">
            {secondaryItems.map((item) => {
              const active = location.pathname === item.url || location.pathname.startsWith(item.url + "/");
              return (
                <button
                  key={item.url}
                  onClick={() => handleNav(item.url)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    active
                      ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
                      : "text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D]"
                  }`}
                >
                  <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[hsl(var(--gold))]" : ""}`} />
                  <span className="text-[14px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

// Export toggle hook for Header to use
export { AppSidebar };
