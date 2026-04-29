import { useLocation } from "react-router-dom";
import { FileText, Globe, User, Tag, Home, Calculator, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";

type Item = {
  icon: typeof Home;
  label: string;
  path: string;
  center?: boolean;
};

export default function MobileBottomNav() {
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation("common");

  const items: Item[] = [
    { icon: Home, label: t("mobileNav.home"), path: "/" },
    { icon: FileText, label: t("mobileNav.documents"), path: "/formulari" },
    { icon: Globe, label: t("mobileNav.visa"), path: "/viza" },
    { icon: Sparkles, label: t("mobileNav.assistant"), path: "/ai-asistent", center: true },
    { icon: Calculator, label: t("mobileNav.taxes"), path: "/porezi" },
    { icon: Tag, label: t("mobileNav.pricing"), path: "/paketi" },
    { icon: User, label: t("mobileNav.profile"), path: "__auth__" },
  ];

  const stripped = location.pathname.replace(/^\/(de|hr|sr)(?=\/|$)/, "") || "/";
  const isActive = (path: string) => {
    if (path === "__auth__") return stripped === "/profil" || stripped === "/login";
    if (path === "/") return stripped === "/";
    return stripped === path || stripped.startsWith(path + "/");
  };

  const handleClick = (path: string) => {
    if (path === "__auth__") {
      navigate(user ? "/profil" : "/login");
    } else {
      navigate(path);
    }
  };

  return (
    <>
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
        <div className="mx-auto flex max-w-xl items-stretch h-[62px] px-1">
          {items.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            if (item.center) {
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.path)}
                  className="flex flex-1 flex-col items-center justify-center gap-0.5 min-w-[40px] active:scale-95 transition-transform"
                  aria-label={item.label}
                >
                  <span
                    className="relative flex items-center justify-center rounded-xl"
                    style={{
                      width: 40,
                      height: 40,
                      background: active
                        ? "linear-gradient(135deg, #C9A84C, #F0C040)"
                        : "linear-gradient(135deg, rgba(201,168,76,0.22), rgba(240,192,64,0.12))",
                      border: "1px solid rgba(201,168,76,0.45)",
                      boxShadow: active
                        ? "0 4px 14px rgba(201,168,76,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
                        : "0 2px 8px rgba(201,168,76,0.25)",
                    }}
                  >
                    <Icon
                      className="h-[18px] w-[18px]"
                      style={{ color: active ? "#0F1626" : "#F0C040" }}
                      strokeWidth={2.4}
                    />
                    <span
                      className="absolute -top-0.5 -right-0.5 rounded-full"
                      style={{
                        width: 7,
                        height: 7,
                        background: "#34D399",
                        boxShadow: "0 0 6px rgba(52,211,153,0.8)",
                      }}
                    />
                  </span>
                  <span
                    className="text-[9.5px] leading-none mt-0.5"
                    style={{
                      color: active ? "#F0C040" : "rgba(240,192,64,0.85)",
                      fontWeight: 700,
                      letterSpacing: 0.2,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className="flex flex-1 flex-col items-center justify-center gap-1 min-w-[40px] min-h-[44px] active:scale-95 transition-all duration-150"
                aria-label={item.label}
              >
                <Icon
                  className="h-[18px] w-[18px] transition-all"
                  style={{
                    color: active ? "#C9A84C" : "rgba(255,255,255,0.7)",
                    filter: active ? "drop-shadow(0 0 5px rgba(201,168,76,0.7))" : "none",
                  }}
                  strokeWidth={active ? 2.4 : 2}
                />
                <span
                  className="text-[9.5px] leading-none transition-all"
                  style={{
                    color: active ? "#C9A84C" : "rgba(255,255,255,0.65)",
                    fontWeight: active ? 700 : 500,
                    letterSpacing: 0.1,
                  }}
                >
                  {item.label}
                </span>
                {active && (
                  <span
                    className="rounded-full"
                    style={{
                      width: 16,
                      height: 2,
                      background:
                        "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                      marginTop: -2,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
