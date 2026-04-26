import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { useTranslation } from "react-i18next";
import {
  FileText, Shield, BookOpen, Camera, Megaphone, Plane,
  Briefcase, Building, Calculator, FileCheck, X, LogIn, LogOut, User,
  CreditCard, Scale, Store, Home, Smartphone, Share2, Receipt, Gauge, GraduationCap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import AuthModal from "@/components/auth/AuthModal";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "?";
}

export function AppSidebar({ onPWAInstall }: { onPWAInstall?: () => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const debounceRef = useRef(0);
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const { user, signOut, displayName } = useAuth();
  const { t } = useTranslation("common");
  const firstName = displayName.split(/\s+/).filter(Boolean)[0] || t("sidebar.defaultUser");
  const initials = getInitials(displayName);
  const currentPath = location.pathname.replace(/^\/de(?=\/|$)/, "") || "/";

  const mainItems = [
    { title: t("sidebar.items.formulari"), url: "/formulari", icon: FileText, premium: true, isNew: false },
    { title: t("sidebar.items.viza"), url: "/viza", icon: Shield, premium: true, isNew: false },
    { title: t("sidebar.items.deutschTrainer"), url: "/deutsch-trainer", icon: BookOpen, premium: true, isNew: false },
    { title: t("sidebar.items.dokumentenCheck"), url: "/dokumenten-check", icon: Camera, premium: true, isNew: false },
    { title: "Bonitet Simulator", url: "/schufa-simulator", icon: Gauge, premium: true, isNew: false, isFree: false },
    { title: "Anerkennung Navigator", url: "/anerkennung-navigator", icon: GraduationCap, premium: true, isNew: false, isFree: false },
    { title: t("sidebar.items.nudimTrazim"), url: "/nudim-trazim", icon: Megaphone, premium: false, isNew: false, isFree: false },
    { title: t("sidebar.items.vorlagen"), url: "/vorlagen", icon: FileCheck, premium: false, isNew: false, isFree: false },
  ];

  const secondaryItems = [
    { title: t("sidebar.items.zivot"), url: "/zivot-u-njemackoj", icon: Plane },
    { title: t("sidebar.items.radnoPravo"), url: "/radno-pravo", icon: Scale },
    { title: t("sidebar.items.mietrecht"), url: "/mietrecht", icon: Home },
    { title: t("sidebar.items.biznis"), url: "/biznis", icon: Store },
    { title: t("sidebar.items.stellenangebote"), url: "/stellenangebote", icon: Briefcase },
    { title: t("sidebar.items.wohnungen"), url: "/wohnungen", icon: Building },
    { title: t("sidebar.items.kalkulatori"), url: "/kalkulatori", icon: Calculator },
  ];

  const toggle = useCallback(() => {
    const now = Date.now();
    if (now - debounceRef.current < 250) return;
    debounceRef.current = now;
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handler = () => toggle();
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("toggle-sidebar", handler);
    document.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("toggle-sidebar", handler);
      document.removeEventListener("keydown", onEscape);
    };
  }, [toggle, close]);

  useEffect(() => { close(); }, [location.pathname, close]);

  const handleNav = useCallback((url: string) => {
    close();
    navigate(url);
  }, [close, navigate]);

  const handleAuthClick = () => {
    close();
    setAuthOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    close();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[998] bg-black/45 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className="fixed left-0 top-0 z-[999] h-screen bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={t("sidebar.navAriaLabel")}
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

        {/* Auth section */}
        <div className="px-3 pt-4 pb-3">
          {user ? (
            <div className="px-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-sm font-bold text-[hsl(var(--primary))] shadow-[0_10px_28px_hsl(var(--gold)/0.22)]">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#2D2D2D]">
                    {t("sidebar.greeting", { name: firstName })}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleNav("/profil/placanja")}
                className={`mt-3 flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  location.pathname === "/profil/placanja"
                    ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
                    : "text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D]"
                }`}
              >
                <Receipt className={`h-[18px] w-[18px] shrink-0 ${location.pathname === "/profil/placanja" ? "text-[hsl(var(--gold))]" : ""}`} />
                <span className="text-[14px] font-medium">{t("sidebar.paymentHistory")}</span>
              </button>
              <div className="mt-4 h-px bg-border/80" />
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
            >
              <LogIn className="h-[18px] w-[18px] shrink-0" />
              <span className="text-[14px] font-medium">{t("sidebar.loginRegister")}</span>
            </button>
          )}
        </div>

        {/* Paketi */}
        <div className="px-3 pt-2 pb-1 border-b border-[#E8E0D0]">
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => handleNav("/paketi")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                location.pathname === "/paketi"
                  ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
                  : "text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D]"
              }`}
            >
              <CreditCard className={`h-[18px] w-[18px] shrink-0 ${location.pathname === "/paketi" ? "text-[hsl(var(--gold))]" : ""}`} />
              <span className="text-[14px] font-medium">{t("sidebar.packagesPricing")}</span>
            </button>
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
              >
                <LogOut className="h-[18px] w-[18px] shrink-0" />
                <span className="text-[14px] font-medium">{t("sidebar.logout")}</span>
              </button>
            )}
          </nav>
        </div>

        <div className="px-3 pt-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.mainSectionLabel")}</p>
          <nav className="flex flex-col gap-0.5">
            {mainItems.map((item) => {
              const active = currentPath === item.url || currentPath.startsWith(item.url + "/");
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
                    {item.title}
                  </span>
                  {item.isNew && (
                    <span className="ml-auto shrink-0 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold leading-none text-white animate-pulse">
                      NOVO
                    </span>
                  )}
                  {item.isFree && (
                    <span className="ml-auto shrink-0 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[8px] font-bold leading-none text-white">
                      FREE
                    </span>
                  )}
                  {item.premium && !item.isNew && (
                    <span className="ml-auto shrink-0 rounded-full bg-[hsl(var(--gold))] px-1.5 py-0.5 text-[8px] font-bold leading-none text-white">
                      {t("sidebar.premiumBadge")}
                    </span>
                  )}
                  {item.premium && item.isNew && (
                    <span className="shrink-0 rounded-full bg-[hsl(var(--gold))] px-1.5 py-0.5 text-[8px] font-bold leading-none text-white">
                      {t("sidebar.premiumBadge")}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-3 pt-5">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.otherSectionLabel")}</p>
          <nav className="flex flex-col gap-0.5">
            {secondaryItems.map((item) => {
              const active = currentPath === item.url || currentPath.startsWith(item.url + "/");
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
                    {item.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile sekcija */}
        <div className="px-3 pt-5 pb-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.mobileSectionLabel")}</p>
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => {
                const url = "https://balkan-navi-deutsch.lovable.app";
                if (navigator.share) {
                  navigator.share({ title: "BalkanLink", url }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(url);
                  toast.success(t("sidebar.shareSuccess"));
                }
                close();
              }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
            >
              <Share2 className="h-[18px] w-[18px] shrink-0" />
              <span className="text-[14px] font-medium">{t("sidebar.shareApp")}</span>
            </button>
            {onPWAInstall && (
              <button
                onClick={() => { close(); onPWAInstall(); }}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
              >
                <Smartphone className="h-[18px] w-[18px] shrink-0" />
                <span className="text-[14px] font-medium">{t("sidebar.downloadApp")}</span>
              </button>
            )}
          </nav>
        </div>

      </aside>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
