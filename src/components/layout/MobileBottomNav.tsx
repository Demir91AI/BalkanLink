import { useLocation } from "react-router-dom";
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
        className="flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 min-h-[44px] active:scale-95 transition-all duration-150 px-0.5"
        aria-label={item.label}
      >
        <Icon
          className="h-[17px] w-[17px] shrink-0 transition-all"
          style={{
            color: active ? "#C9A84C" : "rgba(255,255,255,0.72)",
            filter: active ? "drop-shadow(0 0 5px rgba(201,168,76,0.7))" : "none",
          }}
          strokeWidth={active ? 2.4 : 2}
        />
        <span
          className="text-[8.5px] leading-tight w-full text-center truncate transition-all"
          style={{
            color: active ? "#C9A84C" : "rgba(255,255,255,0.65)",
            fontWeight: active ? 700 : 500,
            letterSpacing: 0.05,
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
          "linear-gradient(180deg, rgba(15,22,38,0.92) 0%, rgba(10,15,28,0.96) 100%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderTop: "1px solid rgba(201,168,76,0.22)",
        boxShadow:
          "0 -8px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="mx-auto flex max-w-xl items-stretch h-[64px] px-1">
        {/* Left 4 */}
        {left.map(renderTab)}

        {/* Center: Početna */}
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center justify-center min-w-[52px] px-1 active:scale-95 transition-transform"
          aria-label={t("mobileNav.home")}
          style={{ transform: "translateY(-10px)" }}
        >
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 46,
              height: 46,
              background: homeActive
                ? "linear-gradient(135deg, #C9A84C, #F0C040)"
                : "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(240,192,64,0.12))",
              border: "1.5px solid rgba(201,168,76,0.55)",
              boxShadow: homeActive
                ? "0 6px 18px rgba(201,168,76,0.6), inset 0 1px 0 rgba(255,255,255,0.3)"
                : "0 3px 12px rgba(201,168,76,0.3)",
            }}
          >
            <Home
              className="h-[20px] w-[20px]"
              style={{ color: homeActive ? "#0F1626" : "#F0C040" }}
              strokeWidth={2.4}
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

        {/* Right 4 */}
        {right.map(renderTab)}
      </div>
    </nav>
  );
}
