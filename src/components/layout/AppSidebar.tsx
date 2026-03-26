import {
import {
  FileText,
  Briefcase,
  Megaphone,
  Wrench,
  ShieldCheck,
  Compass,
  Building2,
  Footprints,
  Plane,
  ChevronDown,
  FileCheck,
  Car,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { COUNTRIES } from "@/lib/migration-data";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [migrationOpen, setMigrationOpen] = useState(
    location.pathname.startsWith("/nach-deutschland")
  );
  const [vorlagenOpen, setVorlagenOpen] = useState(
    location.pathname.startsWith("/vorlagen")
  );

  const sidebarItems = [
    { title: t("index.nav.firstSteps"), url: "/dolazak/prvi-koraci", icon: Footprints },
    { title: t("index.nav.forms"), url: "/formulari", icon: FileText },
    { title: t("index.nav.jobSearch"), url: "/stellenangebote", icon: Briefcase },
    { title: t("index.nav.housingSearch"), url: "/wohnungen", icon: Building2 },
    { title: t("index.nav.docCheck"), url: "/dokumenten-check", icon: ShieldCheck },
    { title: t("index.nav.visaNav"), url: "/dolazak/boravisna-dozvola", icon: Compass },
    { title: t("index.nav.tools"), url: "/tools", icon: Wrench },
    { title: t("index.nav.offerSeek"), url: "/nudim-trazim", icon: Megaphone },
    { title: "🚗 Bußgeld-Assistent", url: "/bussgeld", icon: Car },
  ];

  const isMigrationActive = location.pathname.startsWith("/nach-deutschland");
  const isVorlagenActive = location.pathname.startsWith("/vorlagen");

  const handleNavClick = () => {
    setOpenMobile(false);
  };

  useEffect(() => {
    setOpenMobile(false);
  }, [location.pathname, setOpenMobile]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/8 bg-[hsl(215,55%,7%)]"
    >
      <SidebarContent className="pt-4 bg-[hsl(215,55%,7%)]">
        {/* Main nav */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {sidebarItems.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  location.pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={collapsed ? item.title : undefined}
                      className={`
                        group h-11 rounded-lg transition-all duration-200
                        ${isActive
                          ? "bg-white/10 text-gold shadow-[inset_3px_0_0_hsl(var(--gold))]"
                          : "text-white/55 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 px-3"
                        activeClassName=""
                        onClick={handleNavClick}
                      >
                        <item.icon
                          className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                            isActive ? "text-gold" : "text-white/40 group-hover:text-white/70"
                          }`}
                        />
                        {!collapsed && (
                          <span className={`text-sm font-medium ${isActive ? "text-gold" : ""}`}>
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Migration section */}
        <SidebarGroup>
          {!collapsed && (
            <button
              onClick={() => setMigrationOpen(!migrationOpen)}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                isMigrationActive ? "text-gold" : "text-white/30 hover:text-white/50"
              }`}
            >
              <Plane className={`h-3.5 w-3.5 ${isMigrationActive ? "text-gold" : "text-white/25"}`} />
              <span className="flex-1 text-left">{t("migration.sidebarTitle")}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${migrationOpen ? "" : "-rotate-90"}`} />
            </button>
          )}
          {(migrationOpen || collapsed) && (
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5 px-2">
                {COUNTRIES.map((country) => {
                  const isActive = location.pathname.startsWith(`/nach-deutschland/${country.code}`);
                  return (
                    <SidebarMenuItem key={country.code}>
                      <SidebarMenuButton
                        asChild
                        tooltip={collapsed ? t(`migration.country.${country.code}`) : undefined}
                        className={`
                          group h-9 rounded-lg transition-all duration-200
                          ${isActive
                            ? "bg-white/10 text-gold shadow-[inset_3px_0_0_hsl(var(--gold))]"
                            : "text-white/55 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        <NavLink
                          to={`/nach-deutschland/${country.code}`}
                          className="flex items-center gap-3 px-3"
                          activeClassName=""
                          onClick={handleNavClick}
                        >
                          <span className="text-base shrink-0">{country.flag}</span>
                          {!collapsed && (
                            <span className={`text-sm font-medium ${isActive ? "text-gold" : ""}`}>
                              {t(`migration.country.${country.code}`)}
                            </span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* Vorlagen / Šabloni section */}
        <SidebarGroup>
          {!collapsed && (
            <button
              onClick={() => setVorlagenOpen(!vorlagenOpen)}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                isVorlagenActive ? "text-gold" : "text-white/30 hover:text-white/50"
              }`}
            >
              <FileCheck className={`h-3.5 w-3.5 ${isVorlagenActive ? "text-gold" : "text-white/25"}`} />
              <span className="flex-1 text-left">{t("vorlagen.sidebarTitle")}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${vorlagenOpen ? "" : "-rotate-90"}`} />
            </button>
          )}
          {(vorlagenOpen || collapsed) && (
            <SidebarGroupContent>
              {/* A) Bewerbung & Karriere */}
              {!collapsed && (
                <p className="px-5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/25">
                  {t("vorlagen.sectionWork")}
                </p>
              )}
              <SidebarMenu className="gap-0.5 px-2">
                {[
                  { label: t("vorlagen.bewerbung"), to: "/vorlagen/bewerbung" },
                  { label: t("vorlagen.lebenslauf"), to: "/vorlagen/lebenslauf" },
                  { label: t("vorlagen.anschreiben"), to: "/vorlagen/anschreiben" },
                  { label: t("vorlagen.kuendigung"), to: "/vorlagen/kuendigung" },
                  { label: t("vorlagen.fristlose"), to: "/vorlagen/fristlose-kuendigung" },
                  { label: t("vorlagen.probezeit"), to: "/vorlagen/kuendigung-probezeit" },
                ].map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        asChild
                        tooltip={collapsed ? item.label : undefined}
                        className={`
                          group h-9 rounded-lg transition-all duration-200
                          ${isActive
                            ? "bg-white/10 text-gold shadow-[inset_3px_0_0_hsl(var(--gold))]"
                            : "text-white/55 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        <NavLink
                          to={item.to}
                          className="flex items-center gap-3 px-3"
                          activeClassName=""
                          onClick={handleNavClick}
                        >
                          <FileCheck className={`h-[14px] w-[14px] shrink-0 transition-colors ${isActive ? "text-gold" : "text-white/40 group-hover:text-white/70"}`} />
                          {!collapsed && (
                            <span className={`text-sm font-medium ${isActive ? "text-gold" : ""}`}>
                              {item.label}
                            </span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>

              {/* B) Kundenservice / Vertragsangelegenheiten */}
              {!collapsed && (
                <p className="px-5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/25">
                  {t("vorlagen.sectionService")}
                </p>
              )}
              <SidebarMenu className="gap-0.5 px-2">
                {[
                  { label: t("vorlagen.widerruf"), to: "/vorlagen/widerruf" },
                  { label: t("vorlagen.vertragKuendigung"), to: "/vorlagen/vertragskundigung" },
                  { label: t("vorlagen.reklamation"), to: "/vorlagen/reklamation" },
                ].map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        asChild
                        tooltip={collapsed ? item.label : undefined}
                        className={`
                          group h-9 rounded-lg transition-all duration-200
                          ${isActive
                            ? "bg-white/10 text-gold shadow-[inset_3px_0_0_hsl(var(--gold))]"
                            : "text-white/55 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        <NavLink
                          to={item.to}
                          className="flex items-center gap-3 px-3"
                          activeClassName=""
                          onClick={handleNavClick}
                        >
                          <FileCheck className={`h-[14px] w-[14px] shrink-0 transition-colors ${isActive ? "text-gold" : "text-white/40 group-hover:text-white/70"}`} />
                          {!collapsed && (
                            <span className={`text-sm font-medium ${isActive ? "text-gold" : ""}`}>
                              {item.label}
                            </span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
