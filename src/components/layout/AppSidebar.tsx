import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { useTranslation } from "react-i18next";
import {
  FileText, Shield, BookOpen, ScanLine, Megaphone, Plane,
  Briefcase, BriefcaseBusiness, Building2, Calculator, Files, X, LogIn, LogOut,
  Sparkles, Scale, Home, Smartphone, Share2, Receipt, Gauge, GraduationCap,
  Coins, Search, Crown, Clock, ArrowRight,
} from "lucide-react";
import { POREZI_HUB_PATH } from "@/lib/porezi-modules";
import { langFromPath } from "@/lib/i18n-paths";
import type { SupportedLanguage } from "@/i18n";
import { useAuth } from "@/contexts/AuthContext";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useRecentPages } from "@/hooks/useRecentPages";
import { toast } from "sonner";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "?";
}

export function AppSidebar({ onPWAInstall }: { onPWAInstall?: () => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isPremium } = usePremiumAccess();
  const recentPages = useRecentPages();
  const debounceRef = useRef(0);
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const { user, signOut, displayName } = useAuth();
  const { t } = useTranslation("common");
  const firstName = displayName.split(/\s+/).filter(Boolean)[0] || t("sidebar.defaultUser");
  const initials = getInitials(displayName);
  const currentPath = location.pathname.replace(/^\/de(?=\/|$)/, "") || "/";
  const lang = langFromPath(location.pathname) as SupportedLanguage;
  const poreziSlug = POREZI_HUB_PATH[lang] ?? "/porezi";
  // Sidebar uses bs-relative urls everywhere (localizeHref adds /de prefix).
  // For Porezi, DE has a different slug (/steuern) so we pass the bs slug
  // and rely on the active-path matcher below to also recognize /steuern.
  const poreziSidebarUrl = lang === "de" ? "/de/steuern" : "/porezi";

  // Glavne funkcije — poredane po prioritetu/vrijednosti za korisnika
  const mainItems = [
    { title: t("sidebar.items.formulari"), url: "/formulari", icon: FileText, premium: true, isNew: false },
    { title: t("sidebar.items.viza"), url: "/viza", icon: Shield, premium: true, isNew: false },
    { title: t("sidebar.items.anerkennungNavigator"), url: "/anerkennung-navigator", icon: GraduationCap, premium: true, isNew: false, isFree: false },
    { title: t("sidebar.items.dokumentenCheck"), url: "/dokumenten-check", icon: ScanLine, premium: true, isNew: false },
    { title: t("sidebar.items.deutschTrainer"), url: "/deutsch-trainer", icon: BookOpen, premium: true, isNew: false },
    { title: t("sidebar.items.porezi"), url: poreziSidebarUrl, icon: Coins, premium: true, matchPaths: ["/porezi", "/steuern"] },
    { title: t("sidebar.items.bonitetSimulator"), url: "/schufa-simulator", icon: Gauge, premium: true, isNew: false, isFree: false },
    { title: t("sidebar.items.nebenkostenScan"), url: "/nebenkosten-scan", icon: Receipt, premium: true, isNew: false },
    // Free funkcije na dnu
    { title: t("sidebar.items.vorlagen"), url: "/vorlagen", icon: Files, premium: false, isNew: false, isFree: true },
    { title: t("sidebar.items.nudimTrazim"), url: "/nudim-trazim", icon: Megaphone, premium: false, isNew: false, isFree: true },
  ];

  const secondaryItems = [
    { title: t("sidebar.items.zivot"), url: "/zivot-u-njemackoj", icon: Plane },
    { title: t("sidebar.items.radnoPravo"), url: "/radno-pravo", icon: Scale },
    { title: t("sidebar.items.mietrecht"), url: "/mietrecht", icon: Home },
    { title: t("sidebar.items.biznis"), url: "/biznis", icon: Briefcase },
    { title: t("sidebar.items.stellenangebote"), url: "/stellenangebote", icon: BriefcaseBusiness },
    { title: t("sidebar.items.wohnungen"), url: "/wohnungen", icon: Building2 },
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

  // Reset search kad se zatvori, auto-focus kad se otvori (desktop)
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    } else {
      const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop) {
        setTimeout(() => searchInputRef.current?.focus(), 320);
      }
    }
  }, [isOpen]);

  // Filter po search query
  const allItems = useMemo(() => [...mainItems, ...secondaryItems], [mainItems, secondaryItems]);
  const filteredMain = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return mainItems;
    return mainItems.filter((it) => it.title.toLowerCase().includes(q));
  }, [searchQuery, mainItems]);
  const filteredSecondary = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return secondaryItems;
    return secondaryItems.filter((it) => it.title.toLowerCase().includes(q));
  }, [searchQuery, secondaryItems]);
  const hasSearch = searchQuery.trim().length > 0;
  const noResults = hasSearch && filteredMain.length === 0 && filteredSecondary.length === 0;

  // Mapa za "Nedavno korišteno" — resolve path → item
  const itemByPath = useMemo(() => {
    const map = new Map<string, typeof allItems[number]>();
    allItems.forEach((it) => {
      map.set(it.url, it);
      const matchers = (it as any).matchPaths as string[] | undefined;
      matchers?.forEach((p) => map.set(p, it));
    });
    return map;
  }, [allItems]);

  const recentItems = useMemo(() => {
    if (hasSearch) return [];
    return recentPages
      .map((rp) => {
        // direct match
        if (itemByPath.has(rp.path)) return itemByPath.get(rp.path)!;
        // prefix match (npr /formulari/anmeldung -> /formulari)
        for (const [key, val] of itemByPath.entries()) {
          if (rp.path.startsWith(key + "/")) return val;
        }
        return null;
      })
      .filter((x): x is typeof allItems[number] => x !== null)
      // izbaci trenutnu stranicu
      .filter((it) => {
        const matchers = (it as any).matchPaths as string[] | undefined;
        if (matchers) return !matchers.some((p) => currentPath === p || currentPath.startsWith(p + "/"));
        return !(currentPath === it.url || currentPath.startsWith(it.url + "/"));
      })
      // dedupe
      .filter((it, idx, arr) => arr.findIndex((x) => x.url === it.url) === idx)
      .slice(0, 3);
  }, [recentPages, itemByPath, currentPath, hasSearch]);

  const handleNav = useCallback((url: string) => {
    close();
    navigate(url);
  }, [close, navigate]);

  const handleAuthClick = () => {
    close();
    navigate("/login");
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

        {/* User info (only when logged in) */}
        {user && (
          <div className="px-3 pt-4 pb-3">
            <div className="px-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-sm font-bold text-[hsl(var(--primary))] shadow-[0_10px_28px_hsl(var(--gold)/0.22)]">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#2D2D2D] truncate">
                    {t("sidebar.greeting", { name: firstName })}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              {/* Status badge: Premium / Free */}
              {isPremium ? (
                <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[hsl(var(--gold))]/15 to-[hsl(var(--gold))]/5 border border-[hsl(var(--gold))]/25">
                  <Crown className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--gold))]">{t("sidebar.statusPremium", "Premium aktivan")}</span>
                </div>
              ) : (
                <button
                  onClick={() => handleNav("/paketi")}
                  className="mt-3 group flex items-center gap-2 w-full px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-[hsl(var(--gold))]/10 transition-colors"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t("sidebar.statusFree", "Free plan")}</span>
                  <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-[hsl(var(--gold))] group-hover:gap-1.5 transition-all">
                    {t("sidebar.upgrade", "Nadogradi")}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              )}
              <button
                onClick={() => handleNav("/profil/placanja")}
                className={`mt-2 flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 ${
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
          </div>
        )}

        {/* Search bar */}
        <div className={`px-5 ${user ? "pt-1" : "pt-4"} pb-2`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6B6B6B]/60 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("sidebar.searchPlaceholder", "Pretraži…")}
              className="w-full h-9 pl-9 pr-8 rounded-lg bg-[#F5F0E8] border border-transparent focus:border-[hsl(var(--gold))]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20 text-[13px] text-[#2D2D2D] placeholder:text-[#6B6B6B]/60 transition-all"
              aria-label={t("sidebar.searchPlaceholder", "Pretraži…")}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded flex items-center justify-center hover:bg-[#E8E0D0] transition-colors"
                aria-label="Clear"
              >
                <X className="h-3 w-3 text-[#6B6B6B]" />
              </button>
            )}
          </div>
        </div>

        {/* No results */}
        {noResults && (
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-muted-foreground">{t("sidebar.noResults", "Nema rezultata za")} <span className="font-semibold text-[#2D2D2D]">"{searchQuery}"</span></p>
          </div>
        )}

        {/* Nedavno korišteno (samo kad nema search) */}
        {!hasSearch && recentItems.length > 0 && (
          <div className="px-3 pt-2">
            <p className="px-3 pb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">
              <Clock className="h-3 w-3" />
              {t("sidebar.recentSectionLabel", "Nedavno")}
            </p>
            <nav className="flex flex-col gap-0.5">
              {recentItems.map((item, idx) => (
                <button
                  key={`recent-${item.url}`}
                  onClick={() => handleNav(item.url)}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}
                >
                  <item.icon className="h-[16px] w-[16px] shrink-0 opacity-70" />
                  <span className="text-[13px] font-medium truncate">{item.title}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {filteredMain.length > 0 && (
          <div className={`px-3 ${(!hasSearch && recentItems.length > 0) ? "pt-4" : "pt-2"}`}>
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">
              {hasSearch ? t("sidebar.searchResultsLabel", "Rezultati") : t("sidebar.mainSectionLabel")}
            </p>
            <nav className="flex flex-col gap-0.5">
              {filteredMain.map((item, idx) => {
                const matchers = (item as any).matchPaths as string[] | undefined;
                const active = matchers
                  ? matchers.some((p) => currentPath === p || currentPath.startsWith(p + "/"))
                  : currentPath === item.url || currentPath.startsWith(item.url + "/");
                return (
                  <button
                    key={item.url}
                    onClick={() => handleNav(item.url)}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 animate-fade-in ${
                      active
                        ? "bg-[hsl(var(--gold))]/10 shadow-[inset_3px_0_0_hsl(var(--gold))]"
                        : "hover:bg-[#F5F0E8]"
                    }`}
                    style={{ animationDelay: `${Math.min(idx * 30, 200)}ms`, animationFillMode: "both" }}
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
        )}

        {filteredSecondary.length > 0 && (
          <div className="px-3 pt-5">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.otherSectionLabel")}</p>
            <nav className="flex flex-col gap-0.5">
              {filteredSecondary.map((item, idx) => {
                const active = currentPath === item.url || currentPath.startsWith(item.url + "/");
                return (
                  <button
                    key={item.url}
                    onClick={() => handleNav(item.url)}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 animate-fade-in ${
                      active
                        ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
                        : "text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D]"
                    }`}
                    style={{ animationDelay: `${Math.min(idx * 25, 150)}ms`, animationFillMode: "both" }}
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
        )}

        {/* Mobile sekcija */}
        <div className="px-3 pt-5 pb-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.mobileSectionLabel")}</p>
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => {
                const url = "https://www.balkanlink.de/";
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

        {/* Account & Paketi (dno) */}
        <div className="px-3 pt-3 pb-4 mt-auto border-t-2 border-[hsl(var(--gold))]/25">
          <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.accountSectionLabel", "Račun")}</p>
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => handleNav("/paketi")}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                location.pathname === "/paketi"
                  ? "bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]"
                  : "bg-[hsl(var(--gold))]/5 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/15"
              }`}
            >
              <Sparkles className="h-[18px] w-[18px] shrink-0 text-[hsl(var(--gold))]" />
              <span className="text-[14px] font-semibold">{t("sidebar.packagesPricing")}</span>
            </button>
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
              >
                <LogOut className="h-[18px] w-[18px] shrink-0" />
                <span className="text-[14px] font-medium">{t("sidebar.logout")}</span>
              </button>
            ) : (
              <button
                onClick={handleAuthClick}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 hover:bg-[hsl(var(--primary))]/10 transition-all duration-200"
              >
                <LogIn className="h-[18px] w-[18px] shrink-0 text-[hsl(var(--primary))]" />
                <span className="text-[14px] font-semibold">{t("sidebar.loginRegister")}</span>
              </button>
            )}
          </nav>
        </div>

      </aside>
    </>
  );
}
