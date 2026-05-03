import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { useTranslation } from "react-i18next";
import {
  FileText, Shield, BookOpen, ScanLine, Megaphone, Plane,
  Briefcase, BriefcaseBusiness, Building2, Calculator, Files, X, LogIn, LogOut,
  Sparkles, Scale, Home, Smartphone, Share2, Receipt, Gauge, GraduationCap,
  Coins, Search, Crown, Clock, ArrowRight, ChevronDown, User, Mail, MessageSquare,
  ScrollText, BadgeCheck, LayoutGrid, Boxes, UserCircle2, Star,
} from "lucide-react";
import { POREZI_HUB_PATH } from "@/lib/porezi-modules";
import { langFromPath } from "@/lib/i18n-paths";
import type { SupportedLanguage } from "@/i18n";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useRecentPages } from "@/hooks/useRecentPages";
import { toast } from "sonner";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "?";
}

function maskEmail(email: string) {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) return `${local}@${domain}`;
  if (local.length <= 6) return `${local[0]}${"•".repeat(local.length - 2)}${local.slice(-1)}@${domain}`;
  return `${local.slice(0, 2)}${"•".repeat(3)}${local.slice(-2)}@${domain}`;
}

type SectionAccent = "slate" | "gold" | "blue" | "indigo" | "amber";

const ACCENT_STYLES: Record<SectionAccent, { iconBg: string; iconColor: string; line: string; text: string }> = {
  slate:  { iconBg: "bg-slate-100",   iconColor: "text-slate-600",   line: "from-slate-300/60",   text: "text-slate-600" },
  gold:   { iconBg: "bg-[hsl(var(--gold))]/12", iconColor: "text-[hsl(var(--gold))]", line: "from-[hsl(var(--gold))]/40", text: "text-[#3D3526]" },
  blue:   { iconBg: "bg-sky-100",     iconColor: "text-sky-600",     line: "from-sky-300/60",     text: "text-sky-700" },
  indigo: { iconBg: "bg-indigo-100",  iconColor: "text-indigo-600",  line: "from-indigo-300/60",  text: "text-indigo-700" },
  amber:  { iconBg: "bg-amber-100",   iconColor: "text-amber-600",   line: "from-amber-300/60",   text: "text-amber-700" },
};

function SectionHeader({
  icon: Icon,
  label,
  accent = "slate",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  accent?: SectionAccent;
}) {
  const a = ACCENT_STYLES[accent];
  return (
    <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${a.iconBg} shadow-sm`}>
        <Icon className={`h-3.5 w-3.5 ${a.iconColor}`} />
      </span>
      <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${a.text}`}>
        {label}
      </span>
      <span className={`ml-1 h-px flex-1 bg-gradient-to-r ${a.line} to-transparent`} />
    </div>
  );
}

export function AppSidebar({ onPWAInstall }: { onPWAInstall?: () => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isPremium } = usePremiumAccess();
  const recentPages = useRecentPages();
  const debounceRef = useRef(0);
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const { user, signOut, displayName, isAdmin, loading, refreshUserMeta } = useAuth();
  const { t } = useTranslation("common");
  const [sidebarAdmin, setSidebarAdmin] = useState(false);
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
    { title: t("sidebar.items.dvojnoDrzavljanstvo"), url: "/dvojno-drzavljanstvo", icon: ScrollText, premium: true, isFree: false, isNew: true },
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
    { title: t("sidebar.items.obnovaPasosa"), url: "/obnova-pasosa", icon: BadgeCheck, isNew: true },
    { title: t("sidebar.items.sacuvano", "Sačuvano"), url: "/sacuvano", icon: Star, isNew: true },
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
      setAccountOpen(false);
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

  useEffect(() => {
    if (!user || loading) {
      setSidebarAdmin(false);
      return;
    }
    if (isAdmin || sidebarAdmin) {
      setSidebarAdmin(true);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (cancelled) return;
        const allowed = !error && data?.role === "admin";
        setSidebarAdmin(allowed);
        if (allowed) void refreshUserMeta();
      } catch {
        if (!cancelled) setSidebarAdmin(false);
      }
    })();

    return () => { cancelled = true; };
  }, [isAdmin, loading, refreshUserMeta, sidebarAdmin, user?.id]);

  const canShowAdmin = isAdmin || sidebarAdmin;

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
          width: "min(340px, 88vw)",
          minWidth: "300px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D0]">
          <span className="text-sm font-bold text-[#2D2D2D] tracking-wide uppercase">{t("sidebar.menu")}</span>
          <button onClick={close} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDE6] transition-colors">
            <X className="h-4 w-4 text-[#6B6B6B]" />
          </button>
        </div>

        {/* User account dropdown (only when logged in) */}
        {user && (
          <div className="px-3 pt-4 pb-3">
            <button
              onClick={() => setAccountOpen((v) => !v)}
              className="w-full px-3 py-2.5 rounded-xl text-left hover:bg-[#F5F0E8]/60 transition-colors"
              aria-expanded={accountOpen}
              aria-controls="account-dropdown"
              aria-label={t("sidebar.toggleAccount", "Otvori račun")}
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold))]/70 text-[13px] font-semibold text-[hsl(var(--primary))] shadow-sm ring-1 ring-[hsl(var(--gold))]/30">
                    {initials}
                  </div>
                  {isPremium && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--gold))] ring-2 ring-white">
                      <Crown className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-[#2D2D2D] truncate leading-tight">
                    {firstName}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] font-medium leading-tight">
                    {isPremium ? (
                      <span className="text-[hsl(var(--gold))]">{t("sidebar.statusPremium", "Premium")}</span>
                    ) : (
                      <span className="text-[#6B6B6B]/70">{t("sidebar.statusFree", "Free plan")}</span>
                    )}
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#6B6B6B] transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {accountOpen && (
              <div
                id="account-dropdown"
                className="mt-1.5 mx-1 rounded-xl border border-[#E8E0D0] bg-white shadow-sm overflow-hidden animate-fade-in"
              >
                {/* Email row */}
                <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#FAF7F1] border-b border-[#E8E0D0]">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#6B6B6B]/70" />
                  <span className="text-[12px] text-[#2D2D2D] truncate" title={user.email}>
                    {user.email}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setAccountOpen(false); handleNav("/profil"); }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left text-[#2D2D2D] hover:bg-[#F5F0E8] transition-colors"
                  >
                    <User className="h-[16px] w-[16px] shrink-0 text-[#6B6B6B]" />
                    <span className="text-[13px] font-medium">{t("sidebar.openProfile", "Otvori profil")}</span>
                  </button>

                  <button
                    onClick={() => { setAccountOpen(false); handleNav("/profil/placanja"); }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left text-[#2D2D2D] hover:bg-[#F5F0E8] transition-colors"
                  >
                    <Receipt className="h-[16px] w-[16px] shrink-0 text-[#6B6B6B]" />
                    <span className="text-[13px] font-medium">{t("sidebar.paymentHistory")}</span>
                  </button>

                  {!isPremium && (
                    <button
                      onClick={() => { setAccountOpen(false); handleNav("/paketi"); }}
                      className="flex items-center gap-3 w-full px-3 py-2 text-left transition-colors hover:bg-[hsl(var(--gold))]/10"
                    >
                      <Crown className="h-[16px] w-[16px] shrink-0 text-[hsl(var(--gold))]" />
                      <span className="text-[13px] font-semibold text-[hsl(var(--gold))]">{t("sidebar.upgrade", "Nadogradi")}</span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                    </button>
                  )}

                  {canShowAdmin && (
                    <>
                      <div className="my-1 mx-3 h-px bg-[#E8E0D0]" />
                      <button
                        onClick={() => { setAccountOpen(false); handleNav("/admin"); }}
                        className="flex items-center gap-3 w-full px-3 py-2 text-left text-[#1E293B] hover:bg-[#F1F5F9] transition-colors"
                      >
                        <Shield className="h-[16px] w-[16px] shrink-0 text-[#475569]" />
                        <span className="text-[13px] font-semibold">{t("sidebar.adminDashboard")}</span>
                        <ArrowRight className="ml-auto h-3.5 w-3.5 text-[#94A3B8]" />
                      </button>
                    </>
                  )}

                  <div className="my-1 mx-3 h-px bg-[#E8E0D0]" />

                  <button
                    onClick={() => { setAccountOpen(false); handleSignOut(); }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors"
                  >
                    <LogOut className="h-[16px] w-[16px] shrink-0" />
                    <span className="text-[13px] font-medium">{t("sidebar.logout")}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mx-3 mt-3 h-px bg-border/80" />
          </div>
        )}

        {/* Admin quick access (visible only to admins) */}
        {canShowAdmin && (
          <div className="px-3 pt-2 pb-1">
            <button
              onClick={() => handleNav("/admin")}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left bg-gradient-to-r from-[#1E293B] to-[#334155] text-white hover:from-[#0F172A] hover:to-[#1E293B] transition-all shadow-sm"
            >
              <Shield className="h-[18px] w-[18px] shrink-0 text-[hsl(var(--gold))]" />
              <span className="text-[13px] font-semibold tracking-wide">{t("sidebar.adminDashboard")}</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-white/70" />
            </button>
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
            <SectionHeader
              icon={Clock}
              accent="slate"
              label={t("sidebar.recentSectionLabel", "Nedavno")}
            />
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
            <SectionHeader
              icon={hasSearch ? Search : LayoutGrid}
              accent="gold"
              label={hasSearch ? t("sidebar.searchResultsLabel", "Rezultati") : t("sidebar.mainSectionLabel")}
            />
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
            <SectionHeader icon={Boxes} accent="blue" label={t("sidebar.otherSectionLabel")} />
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
                    {(item as any).isNew && (
                      <span className="ml-auto shrink-0 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold leading-none text-white animate-pulse">
                        {t("sidebar.newBadge", "NOVO")}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Mobile sekcija — sakrij tokom search */}
        {!hasSearch && (
        <div className="px-3 pt-5 pb-4">
          <SectionHeader icon={Smartphone} accent="indigo" label={t("sidebar.mobileSectionLabel")} />
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
            <a
              href={`mailto:kontakt@realcore-digital.de?subject=${encodeURIComponent(t("sidebar.sendFeedbackSubject"))}&body=${encodeURIComponent(t("sidebar.sendFeedbackBody"))}`}
              onClick={close}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
            >
              <MessageSquare className="h-[18px] w-[18px] shrink-0" />
              <span className="text-[14px] font-medium">{t("sidebar.sendFeedback")}</span>
            </a>
          </nav>
        </div>
        )}

        {/* Account & Paketi (dno) — sakrij tokom search */}
        {!hasSearch && (
        <div className="px-3 pt-3 pb-4 mt-auto border-t-2 border-[hsl(var(--gold))]/25">
          <SectionHeader icon={UserCircle2} accent="amber" label={t("sidebar.accountSectionLabel", "Račun")} />
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
            {!user && (
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
        )}

      </aside>
    </>
  );
}
