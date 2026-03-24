import {
  FileText,
  Briefcase,
  Megaphone,
  Wrench,
  ShieldCheck,
  Compass,
  Search,
  Building2,
  Footprints,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
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

const sidebarItems = [
  { title: "Formulari", url: "/formulari", icon: FileText },
  { title: "Pretraga stanova", url: "/wohnungen", icon: Search },
  { title: "Pretraga poslova", url: "/stellenangebote", icon: Briefcase },
  { title: "Nudim / Tražim", url: "/nudim-trazim", icon: Megaphone },
  { title: "Alati i kalkulatori", url: "/tools", icon: Wrench },
  { title: "Dokumenten-Check", url: "/dokumenten-check", icon: ShieldCheck },
  { title: "Viza Navigator", url: "/dolazak/boravisna-dozvola", icon: Compass },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/8 bg-[hsl(215,55%,7%)]"
    >
      <SidebarContent className="pt-4 bg-[hsl(215,55%,7%)]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {sidebarItems.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  location.pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
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
      </SidebarContent>
    </Sidebar>
  );
}
