import { useLocation } from "react-router-dom";
import { FileText, Globe, Sparkles, User, Tag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";

export default function MobileBottomNav() {
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [pressing, setPressing] = useState(false);

  const isActive = (path: string) => {
    const stripped = location.pathname.replace(/^\/de(?=\/|$)/, "") || "/";
    return (
      path !== "__auth__" &&
      (stripped === path || (path !== "/" && stripped.startsWith(path)))
    );
  };

  const handleClick = (path: string) => {
    if (path === "__auth__") {
      if (user) navigate("/profil");
      else setAuthOpen(true);
    } else {
      navigate(path);
    }
  };

  const asistentActive = location.pathname === "/ai-asistent" || location.pathname === "/de/ai-asistent";

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: "#0F1626",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.4)",
          height: "calc(65px + env(safe-area-inset-bottom, 0px))",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="mx-auto flex h-[65px] max-w-lg items-stretch relative">
          {/* Left two tabs */}
          {sideItems.slice(0, 2).map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className="flex flex-1 flex-col items-center justify-center gap-0.5 transition-all duration-150 min-w-[44px] min-h-[44px]"
              >
                <item.icon
                  className="h-5 w-5 transition-all duration-150"
                  style={{
                    color: "white",
                    opacity: active ? 1 : 0.45,
                    filter: active ? "drop-shadow(0 0 6px #C9A84C)" : "none",
                  }}
                />
                <span
                  className="text-[10px] transition-all duration-150"
                  style={{
                    color: active ? "#C9A84C" : "white",
                    opacity: active ? 1 : 0.45,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {item.label}
                </span>
                {active && (
                  <span
                    className="mt-0.5 rounded-full"
                    style={{
                      width: 20,
                      height: 2,
                      background: "#C9A84C",
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* Center — Asistent hero button */}
          <div className="flex flex-1 items-center justify-center">
            <button
              onClick={() => navigate("/ai-asistent")}
              onPointerDown={() => setPressing(true)}
              onPointerUp={() => setPressing(false)}
              onPointerLeave={() => setPressing(false)}
              className="flex flex-col items-center"
              style={{ transform: "translateY(-20px)" }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 64,
                  height: 64,
                  background: "linear-gradient(135deg, #C9A84C, #F0C040, #C9A84C)",
                  animation: "glowPulse 2s ease-in-out infinite",
                  transform: pressing ? "scale(0.92)" : "scale(1)",
                  transition: "transform 100ms ease",
                }}
              >
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <span
                className="text-[10px] font-bold mt-1"
                style={{ color: "#C9A84C" }}
              >
                Asistent
              </span>
            </button>
          </div>

          {/* Right two tabs */}
          {sideItems.slice(2).map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className="flex flex-1 flex-col items-center justify-center gap-0.5 transition-all duration-150 min-w-[44px] min-h-[44px]"
              >
                <item.icon
                  className="h-5 w-5 transition-all duration-150"
                  style={{
                    color: "white",
                    opacity: active ? 1 : 0.45,
                    filter: active ? "drop-shadow(0 0 6px #C9A84C)" : "none",
                  }}
                />
                <span
                  className="text-[10px] transition-all duration-150"
                  style={{
                    color: active ? "#C9A84C" : "white",
                    opacity: active ? 1 : 0.45,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {item.label}
                </span>
                {active && (
                  <span
                    className="mt-0.5 rounded-full"
                    style={{
                      width: 20,
                      height: 2,
                      background: "#C9A84C",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Glow pulse keyframes */}
      <style>{`
        @keyframes glowPulse {
          0%   { box-shadow: 0 0 20px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.3); }
          50%  { box-shadow: 0 0 35px rgba(201,168,76,0.9), 0 0 65px rgba(201,168,76,0.5); }
          100% { box-shadow: 0 0 20px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.3); }
        }
      `}</style>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
