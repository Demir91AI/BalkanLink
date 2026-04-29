import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  FileText,
  Shield,
  GraduationCap,
  ScanLine,
  BookOpen,
  Coins,
  Gauge,
  Receipt,
  Home,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { langFromPath } from "@/lib/i18n-paths";
import { POREZI_HUB_PATH } from "@/lib/porezi-modules";

type Item = {
  icon: typeof Home;
  label: string;
  path: string;
};

export default function MobileBottomNav() {
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const { t } = useTranslation("common");

  const lang = langFromPath(location.pathname);
  const poreziPath = POREZI_HUB_PATH[lang] ?? "/porezi";
  const scrollRef = useRef<HTMLDivElement>(null);

  // Center the scroll on mount so Home isn't covering left/right items
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const center = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollLeft = center;
  }, []);

  const left: Item[] = [
    { icon: FileText, label: t("mobileNav.formulari"), path: "/formulari" },
    { icon: Shield, label: t("mobileNav.visa"), path: "/viza" },
    { icon: GraduationCap, label: t("mobileNav.anerkennung"), path: "/anerkennung-navigator" },
    { icon: ScanLine, label: t("mobileNav.docCheck"), path: "/dokumenten-check" },
  ];

  const right: Item[] = [
    { icon: BookOpen, label: t("mobileNav.trainer"), path: "/deutsch-trainer" },
    { icon: Coins, label: t("mobileNav.taxes"), path: poreziPath },
    { icon: Gauge, label: t("mobileNav.schufa"), path: "/schufa-simulator" },
    { icon: Receipt, label: t("mobileNav.nebenkosten"), path: "/nebenkosten-scan" },
  ];

  const stripped = location.pathname.replace(/^\/(de|hr|sr)(?=\/|$)/, "") || "/";
  const isActive = (path: string) => {
    if (path === "/") return stripped === "/";
    return stripped === path || stripped.startsWith(path + "/");
  };

  const renderTab = (item: Item) => {
    const active = isActive(item.path);
    const Icon = item.icon;
    return (
      <button
        key={item.label}
        onClick={() => navigate(item.path)}
        className="flex shrink-0 flex-col items-center justify-center gap-0.5 min-h-[44px] active:scale-95 transition-all duration-150"
        style={{ width: 64 }}
        aria-label={item.label}
      >
        <Icon
          className="h-[19px] w-[19px] transition-all"
          style={{
            color: active ? "#C9A84C" : "rgba(255,255,255,0.78)",
            filter: active ? "drop-shadow(0 0 5px rgba(201,168,76,0.7))" : "none",
          }}
          strokeWidth={active ? 2.4 : 2}
        />
        <span
          className="text-[9.5px] leading-tight w-full text-center truncate transition-all px-0.5"
          style={{
            color: active ? "#C9A84C" : "rgba(255,255,255,0.7)",
            fontWeight: active ? 700 : 500,
          }}
        >
          {item.label}
        </span>
      </button>
    );
  };

  const homeActive = stripped === "/";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(15,22,38,0.94) 0%, rgba(10,15,28,0.97) 100%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderTop: "1px solid rgba(201,168,76,0.22)",
        boxShadow:
          "0 -8px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="relative h-[68px]">
        {/* Scrollable rails - left + spacer + right */}
        <div
          ref={scrollRef}
          className="absolute inset-0 flex items-center overflow-x-auto overflow-y-hidden hide-scrollbar"
          style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x proximity" }}
        >
          {/* Left items */}
          <div className="flex items-center">
            {left.map(renderTab)}
          </div>

          {/* Center spacer (Home button sits absolute over this) */}
          <div className="shrink-0" style={{ width: 88 }} aria-hidden />

          {/* Right items */}
          <div className="flex items-center">
            {right.map(renderTab)}
          </div>
        </div>

        {/* Edge fades to hint scrollability */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0"
          style={{
            width: 24,
            background:
              "linear-gradient(90deg, rgba(10,15,28,0.95), rgba(10,15,28,0))",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0"
          style={{
            width: 24,
            background:
              "linear-gradient(270deg, rgba(10,15,28,0.95), rgba(10,15,28,0))",
          }}
        />

        {/* Center fade behind Home (so scrolling icons fade under it) */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: 96,
            background:
              "radial-gradient(ellipse at center, rgba(10,15,28,0.95) 35%, rgba(10,15,28,0) 75%)",
          }}
        />

        {/* Sticky Home button — absolute center */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] flex flex-col items-center active:scale-95 transition-transform"
          aria-label={t("mobileNav.home")}
        >
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 50,
              height: 50,
              background: homeActive
                ? "linear-gradient(135deg, #C9A84C, #F0C040)"
                : "linear-gradient(135deg, rgba(201,168,76,0.3), rgba(240,192,64,0.15))",
              border: "1.5px solid rgba(201,168,76,0.6)",
              boxShadow: homeActive
                ? "0 6px 20px rgba(201,168,76,0.65), inset 0 1px 0 rgba(255,255,255,0.3)"
                : "0 4px 14px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <Home
              className="h-[22px] w-[22px]"
              style={{ color: homeActive ? "#0F1626" : "#F0C040" }}
              strokeWidth={2.5}
            />
          </span>
          <span
            className="text-[9px] leading-none mt-1 font-bold"
            style={{
              color: homeActive ? "#F0C040" : "rgba(240,192,64,0.9)",
              letterSpacing: 0.2,
            }}
          >
            {t("mobileNav.home")}
          </span>
        </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </nav>
  );
}
