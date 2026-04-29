import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  Calculator,
  Briefcase,
  Heart,
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

  // LEFT pool — 3 visible per rotation
  const leftPool: Item[] = [
    { icon: FileText, label: t("mobileNav.formulari"), path: "/formulari" },
    { icon: Shield, label: t("mobileNav.visa"), path: "/viza" },
    { icon: GraduationCap, label: t("mobileNav.anerkennung"), path: "/anerkennung-navigator" },
    { icon: ScanLine, label: t("mobileNav.docCheck"), path: "/dokumenten-check" },
    { icon: BookOpen, label: t("mobileNav.trainer"), path: "/deutsch-trainer" },
    { icon: Coins, label: t("mobileNav.taxes"), path: poreziPath },
  ];

  // RIGHT pool — 3 visible per rotation
  const rightPool: Item[] = [
    { icon: Gauge, label: t("mobileNav.schufa"), path: "/schufa-simulator" },
    { icon: Receipt, label: t("mobileNav.nebenkosten"), path: "/nebenkosten-scan" },
    { icon: FileText, label: t("mobileNav.templates"), path: "/vorlagen" },
    { icon: Briefcase, label: t("mobileNav.offers"), path: "/nudim-trazim" },
    { icon: Calculator, label: t("mobileNav.calc"), path: "/kalkulatori" },
    { icon: KeyRound, label: t("mobileNav.lifeArrival"), path: "/zivot" },
  ];

  // Rotate every 10s between two sets of 3
  const [setIdx, setSetIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSetIdx((i) => (i + 1) % 2), 10000);
    return () => clearInterval(id);
  }, []);

  const left = setIdx === 0 ? leftPool.slice(0, 3) : leftPool.slice(3, 6);
  const right = setIdx === 0 ? rightPool.slice(0, 3) : rightPool.slice(3, 6);

  const stripped = location.pathname.replace(/^\/(de|hr|sr)(?=\/|$)/, "") || "/";
  const isActive = (path: string) => {
    if (path === "/") return stripped === "/";
    return stripped === path || stripped.startsWith(path + "/");
  };

  const renderTab = (item: Item, idx: number, side: string) => {
    const active = isActive(item.path);
    const Icon = item.icon;
    return (
      <button
        key={`${side}-${setIdx}-${idx}`}
        onClick={() => navigate(item.path)}
        className="flex flex-col items-center justify-center gap-[2px] active:scale-95 transition-all duration-150 animate-fade-in shrink-0"
        style={{ minWidth: 40, height: 42 }}
        aria-label={item.label}
      >
        <Icon
          className="h-[15px] w-[15px] transition-all"
          style={{
            color: active ? "#C9A84C" : "rgba(255,255,255,0.78)",
            filter: active ? "drop-shadow(0 0 5px rgba(201,168,76,0.7))" : "none",
          }}
          strokeWidth={active ? 2.4 : 2}
        />
        <span
          className="text-[8px] leading-none w-full text-center transition-all whitespace-nowrap"
          style={{
            color: active ? "#C9A84C" : "rgba(255,255,255,0.75)",
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
      <div className="relative h-[68px] flex items-center justify-between px-1 gap-0.5">
        {/* LEFT: 3 in a row */}
        <div className="flex items-center justify-around flex-1 gap-0">
          {left.map((it, i) => renderTab(it, i, "L"))}
        </div>

        {/* CENTER: fixed Home */}
        <button
          onClick={() => {
            if (homeActive) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
            }
          }}
          className="flex flex-col items-center active:scale-95 transition-transform shrink-0 mx-0.5"
          aria-label={homeActive ? t("mobileNav.toTop") : t("mobileNav.home")}
        >
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 40,
              height: 40,
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
              className="h-[20px] w-[20px]"
              style={{ color: homeActive ? "#0F1626" : "#F0C040" }}
              strokeWidth={2.5}
            />
          </span>
          <span
            className="text-[8.5px] leading-none mt-1 font-bold"
            style={{
              color: homeActive ? "#F0C040" : "rgba(240,192,64,0.9)",
              letterSpacing: 0.2,
            }}
          >
            {homeActive ? t("mobileNav.toTop") : t("mobileNav.home")}
          </span>
        </button>

        {/* RIGHT: 3 in a row */}
        <div className="flex items-center justify-around flex-1 gap-0">
          {right.map((it, i) => renderTab(it, i, "R"))}
        </div>
      </div>
    </nav>
  );
}
