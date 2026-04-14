import { useRef, useCallback, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, ShieldCheck, Crown, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { loading, isAdmin, user } = useAuth();
  const navigate = useNavigate();
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
        height: scrolled ? 48 : undefined,
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
        style={{ height: scrolled ? 48 : undefined }}
      >
        {/* LEFT: Hamburger */}
        <button
          onClick={handleToggleSidebar}
          aria-label="Menü"
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
            to="/"
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
              <span className="font-heading text-[22px] font-extrabold leading-none tracking-tight">
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
              className="relative font-heading text-[20px] font-bold leading-none tracking-tight hidden sm:inline"
              style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }}
            >
              <span style={{ color: "#F8F8FF", fontWeight: 700 }}>Balkan</span>
              <span style={{ color: "#D4AF37", fontWeight: 700 }}>Link</span>
            </span>
          </Link>

          {!loading && isAdmin && (
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
              <ShieldCheck className="h-2.5 w-2.5" />
              Admin
            </span>
          )}
        </div>

        {/* RIGHT: Premium badge + User icon */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Premium badge button */}
          <button
            onClick={() => navigate("/premium")}
            className="hidden sm:inline-flex items-center gap-1.5 transition-all duration-250 ease-in-out hover:scale-[1.03]"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.05) 100%)",
              border: "1px solid rgba(212,175,55,0.35)",
              color: "#D4AF37",
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              fontWeight: 600,
              boxShadow:
                "0 0 12px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212,175,55,0.18)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(212,175,55,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.05) 100%)";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,255,255,0.05)";
            }}
          >
            <Crown className="h-4 w-4" />
            Premium
          </button>

          {/* User/profile icon button */}
          <button
            onClick={() => navigate(user ? "/profil" : "/login")}
            aria-label={user ? "Profil" : "Prijava"}
            className="flex items-center justify-center transition-all duration-250 ease-in-out"
            style={{
              width: 36,
              height: 36,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
              e.currentTarget.style.background = "rgba(212,175,55,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <UserCircle
              className="h-5 w-5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
