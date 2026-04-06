import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText, Shield, BookOpen, Camera, Megaphone, Map, Plane,
  Briefcase, Building, Calculator, FileCheck, X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const mainItems = [
    { titleKey: "sidebar.smartGuide", url: "/formulari", icon: FileText, premium: true },
    { titleKey: "sidebar.zivotUNjemackoj", url: "/zivot-u-njemackoj", icon: Map, premium: false },
    { titleKey: "sidebar.visaNavigator", url: "/viza", icon: Shield, premium: true },
    { titleKey: "sidebar.deutsch", url: "/deutsch-trainer", icon: BookOpen, premium: true },
    { titleKey: "sidebar.dokumentenCheck", url: "/dokumenten-check", icon: Camera, premium: true },
    { titleKey: "sidebar.nudim", url: "/nudim-trazim", icon: Megaphone, premium: false },
    { titleKey: "sidebar.balkanci", url: "/mapa", icon: Map, premium: false },
  ];

  const secondaryItems = [
    { titleKey: "sidebar.jobs", url: "/stellenangebote", icon: Briefcase },
    { titleKey: "sidebar.housing", url: "/wohnungen", icon: Building },
    { titleKey: "sidebar.kalkulator", url: "/kalkulatori", icon: Calculator },
    { titleKey: "sidebar.templates", url: "/vorlagen", icon: FileCheck },
  ];

  const toggle = useCallback(() => {
    const now = Date.now();
    if (now - debounceRef.current < 250) return;
    debounceRef.current = now;
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handler = () => toggle();
    window.addEventListener("toggle-sidebar", handler);
    return () => window.removeEventListener("toggle-sidebar", handler);
  }, [toggle]);

  const close = useCallback(() => setIsOpen(false), []);
  useEffect(() => { close(); }, [location.pathname, close]);

  const handleNav = useCallback((url: string) => {
    close();
    navigate(url);
  }, [close, navigate]);

  return (
    <>
      <div
        className="fixed inset-0 z-[998] bg-black/45 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className="fixed left-0 top-0 z-[999] h-screen bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out"
        style={{
          width: "300px",
          minWidth: "280px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D0]">
          <span className="text-sm font-bold text-[#2D2D2D] tracking-wide uppercase">{t("sidebar.menu")}</span>
          <button onClick={close} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDE6] transition-colors">
            <X className="h-4 w-4 text-[#6B6B6B]" />
          </button>
        </div>

        <div className="px-3 pt-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.mainFunctions")}</p>
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
                  <span className={`text-[14px] font-semibold whitespace-nowrap overflow-visible ${active ? "text-[hsl(var(--gold))]" : "text-[#2D2D2D]"}`}>
                    {t(item.titleKey)}
                  </span>
                  {item.premium && (
                    <span className="ml-auto shrink-0 rounded-full bg-[hsl(var(--gold))] px-1.5 py-0.5 text-[8px] font-bold leading-none text-white">
                      PREMIUM
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-3 pt-5 pb-6">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.other")}</p>
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
                  <span className="text-[14px] font-medium whitespace-nowrap overflow-visible">
                    {t(item.titleKey)}
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
