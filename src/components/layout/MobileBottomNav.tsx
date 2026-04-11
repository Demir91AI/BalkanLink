import { useNavigate, useLocation } from "react-router-dom";
import { Home, CreditCard, User, LogIn, type LucideIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const items: NavItem[] = [
    { icon: Home, label: "Start", path: "/" },
    { icon: CreditCard, label: "Preise", path: "/paketi" },
    user
      ? { icon: User, label: "Profil", path: "/profil" }
      : { icon: LogIn, label: "Login", path: "/login" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-14 max-w-lg items-stretch">
        {items.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 transition-all"
            >
              <item.icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium ${active ? "font-bold text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
