import {
  FileText,
  Shield,
  BookOpen,
  Camera,
  Briefcase,
  Building,
  Megaphone,
  FileCheck,
  Calculator,
  Map,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

const mainItems = [
  {
    title: "Formulari (Smart Guide)",
    desc: "Korak po korak bez greške",
    url: "/formulari",
    icon: FileText,
    premium: true,
  },
  {
    title: "Visa Navigator",
    desc: "Sve o vizama za Njemačku",
    url: "/dolazak/boravisna-dozvola",
    icon: Shield,
    premium: true,
  },
  {
    title: "BalkanLink Deutsch",
    desc: "Njemački za stvarni život",
    url: "/deutsch-trainer",
    icon: BookOpen,
    premium: true,
  },
  {
    title: "Dokumenten-Check",
    desc: "Razumij svaki dokument odmah",
    url: "/dokumenten-check",
    icon: Camera,
    premium: true,
  },
  {
    title: "Nudim / Tražim",
    desc: "Ponudi ili pronađi",
    url: "/nudim-trazim",
    icon: Megaphone,
    premium: false,
  },
  {
    title: "Balkanci u DE",
    desc: "Vidi gdje smo svi na mapi",
    url: "/mapa",
    icon: Map,
    premium: false,
  },
];

const secondaryItems = [
  { title: "Pretraga poslova", url: "/stellenangebote", icon: Briefcase },
  { title: "Pretraga stanova", url: "/wohnungen", icon: Building },
  { title: "Kalkulatori", url: "/kalkulatori", icon: Calculator },
  { title: "Šabloni", url: "/vorlagen", icon: FileCheck },
];

export function AppSidebar() {
  const { state, setOpenMobile, setOpen, isMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const location = useLocation();

  const handleNavClick = () => {
    // Close sidebar on ANY click — mobile AND desktop
    setOpenMobile(false);
    setOpen(false);
  };

  useEffect(() => {
    setOpenMobile(false);
    setOpen(false);
  }, [location.pathname, setOpenMobile, setOpen]);

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-white/8 bg-[hsl(215,55%,7%)]"
      style={{ minWidth: isMobile ? "85vw" : "300px", maxWidth: isMobile ? "100vw" : "340px" }}
    >
      <SidebarContent className="pt-3 bg-[hsl(215,55%,7%)] overflow-y-auto">
        {/* ── GLAVNE FUNKCIJE ── */}
        <SidebarGroup>
          {!collapsed && (
            <p className="px-4 pt-2 pb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/25">
              — Glavne funkcije —
            </p>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-4">
              {mainItems.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  location.pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={collapsed ? item.title : undefined}
                      className={`
                        group rounded-xl transition-all duration-200 h-auto
                        ${isActive
                          ? "bg-white/10 shadow-[inset_3px_0_0_hsl(var(--gold))]"
                          : "hover:bg-white/10"
                        }
                      `}
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-[10px] py-[10px] px-4"
                        activeClassName=""
                        onClick={handleNavClick}
                      >
                        <item.icon
                          className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                            isActive ? "text-[hsl(var(--gold))]" : "text-white/40 group-hover:text-white/70"
                          }`}
                        />
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <span className={`block text-[14px] font-semibold leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? "text-[hsl(var(--gold))]" : "text-white"}`}>
                              {item.title}
                            </span>
                            <span className="block text-[12px] text-gray-400 mt-0.5 leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis">{item.desc}</span>
                          </div>
                        )}
                        {!collapsed && item.premium && (
                          <span className="shrink-0 rounded-full bg-[hsl(var(--gold))] px-2 py-0.5 text-[9px] font-bold leading-none text-[hsl(var(--gold-foreground))] ml-1">
                            PREMIUM
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

        {/* ── OSTALO ── */}
        <SidebarGroup>
          {!collapsed && (
            <p className="px-4 mt-4 mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
              — Ostalo —
            </p>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5 px-4">
              {secondaryItems.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  location.pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={collapsed ? item.title : undefined}
                      className={`
                        group rounded-lg transition-all duration-200
                        ${isMobile ? "h-10" : "h-9"}
                        ${isActive
                          ? "bg-white/10 text-[hsl(var(--gold))] shadow-[inset_3px_0_0_hsl(var(--gold))]"
                          : "text-white/45 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-[10px] px-4"
                        activeClassName=""
                        onClick={handleNavClick}
                      >
                        <item.icon
                          className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                            isActive ? "text-[hsl(var(--gold))]" : "text-white/30 group-hover:text-white/50"
                          }`}
                        />
                        {!collapsed && (
                          <span className={`text-[14px] font-medium leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? "text-[hsl(var(--gold))]" : "text-white/60"}`}>
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
      </SidebarContent>
    </Sidebar>
  );
}
