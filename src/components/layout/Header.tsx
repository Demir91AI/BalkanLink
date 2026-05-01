import { useRef, useCallback, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Menu, ShieldCheck, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HeaderInstallPopup } from "@/components/HeaderInstallPopup";
import { UserMenu } from "@/components/layout/UserMenu";
import { useLocalizedHref, useLocalizedNavigate } from "@/hooks/useLocalizedHref";

export default function Header() {
  const { loading, isAdmin, isPremium } = useAuth();
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const localize = useLocalizedHref();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lastToggleRef = useRef(0);
  const handleToggleSidebar = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleRef.current < 250) return;
    lastToggleRef.current = now;
    window.dispatchEvent(new CustomEvent("toggle-sidebar"));
  }, []);

  return (
    <header
      className="sticky top-0 z-50 relative overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        height: scrolled ? 56 : 72,
        background: "linear-gradient(180deg, rgba(8,15,35,0.97) 0%, rgba(13,25,60,0.95) 100%)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(16px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(16px)",
        boxShadow: scrolled
          ? "0 8px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(212,175,55,0.1)"
          : "0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(212,175,55,0.1)",
      }}
    >
      {/* Top highlight line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.25) 30%, rgba(255,255,255,0.12) 50%, rgba(212,175,55,0.25) 70%, transparent 100%)",
        }}
      />

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 25%, rgba(100,140,255,0.2) 50%, rgba(212,175,55,0.35) 75%, transparent 100%)",
          boxShadow: "0 1px 20px rgba(212,175,55,0.08)",
        }}
      />

      {/* Ambient center radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 120% at 50% -10%, rgba(212,175,55,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ease-in-out"
        style={{ height: scrolled ? 56 : 72 }}
      >
        {/* LEFT: Hamburger */}
        <button
          onClick={handleToggleSidebar}
          aria-label={t("common:nav.menu")}
          className="flex items-center justify-center transition-all duration-250 ease-in-out hover:scale-105"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: 8,
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,175,55,0.08)";
            e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
            e.currentTarget.style.boxShadow = "0 0 12px rgba(212,175,55,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)";
          }}
        >
          <Menu
            className="h-5 w-5"
            style={{ color: "rgba(255,255,255,0.85)" }}
            strokeWidth={1.75}
          />
        </button>

        {/* Desktop spacer removed — hamburger is now always visible */}

        {/* CENTER: Logo — absolutely centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            to={localize("/")}
            className="group relative inline-flex items-center gap-2.5 transition-all duration-300 ease-in-out hover:scale-[1.02]"
            aria-label="BalkanLink home"
            style={{
              transform: scrolled ? "scale(0.92)" : undefined,
              transition: "transform 0.3s ease",
            }}
          >
            {/* BL icon container */}
            <span
              className="relative flex items-center justify-center transition-all duration-300"
              style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: 8,
                padding: "6px 8px",
                boxShadow:
                  "0 0 16px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <span className="font-heading text-[26px] font-extrabold leading-none tracking-tight">
                <span style={{ color: "#F8F8FF" }}>B</span>
                <span
                  style={{
                    color: "#D4AF37",
                    filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))",
                  }}
                >
                  L
                </span>
              </span>
            </span>

            {/* BalkanLink text */}
            <span
              className="relative font-heading text-[24px] font-bold leading-none tracking-tight hidden sm:inline"
              style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }}
            >
              <span style={{ color: "#F8F8FF", fontWeight: 700 }}>Balkan</span>
              <span style={{ color: "#D4AF37", fontWeight: 700 }}>Link</span>
            </span>
          </Link>

        </div>

        {/* RIGHT: Premium CTA + User icon */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Premium CTA — shown ONLY to non-premium users.
              Once subscription is active, the badge disappears entirely. */}
          {!isPremium && (
            <button
              onClick={() => navigate("/premium")}
              aria-label={t("common:nav.becomePremium")}
              className="group relative hidden sm:inline-flex items-center gap-2 overflow-hidden transition-all duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #F4D77A 50%, #B8941F 100%)",
                border: "1px solid rgba(244,215,122,0.5)",
                color: "#0A0F1F",
                borderRadius: 22,
                padding: "7px 16px 7px 12px",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                fontWeight: 800,
                boxShadow:
                  "0 4px 14px rgba(212,175,55,0.35), 0 0 0 1px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 6px 22px rgba(212,175,55,0.55), 0 0 0 1px rgba(244,215,122,0.4), inset 0 1px 0 rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(212,175,55,0.35), 0 0 0 1px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.4)";
              }}
            >
              {/* Shine sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <Crown className="h-3.5 w-3.5 relative z-10" strokeWidth={2.5} />
              <span className="relative z-10">{t("common:nav.becomePremium")}</span>
            </button>
          )}

          {/* Language switcher — visible on all viewports */}
          <LanguageSwitcher variant="header" />

          {/* App install popup — trigger is provided by UserMenu below;
              this only renders the popup itself + auto-open on login. */}
          <HeaderInstallPopup />

          {/* Unified user menu: Profile / Login / Install / Logout */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
