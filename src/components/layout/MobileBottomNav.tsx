import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Map, Sparkles, User, Tag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthModal from "@/components/auth/AuthModal";
import { useState } from "react";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [authOpen, setAuthOpen] = useState(false);

  const items = [
    { icon: FileText, label: t("homepage.mobileNav.dokumenti"), path: "/formulari" },
    { icon: Map, label: t("homepage.mobileNav.vodici"), path: "/dolazak" },
    { icon: Sparkles, label: t("homepage.mobileNav.ai"), path: "/dokumenten-check" },
    { icon: Tag, label: "Cijene", path: "/paketi" },
    { icon: User, label: t("homepage.mobileNav.profil"), path: "__auth__" },
  ];

  const handleClick = (path: string) => {
    if (path === "__auth__") {
      if (user) {
        navigate("/login");
      } else {
        setAuthOpen(true);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-md md:hidden">
        <div className="mx-auto flex h-14 max-w-lg items-stretch">
          {items.map((item) => {
            const active =
              item.path !== "__auth__" &&
              (location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path)));
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className="flex flex-1 flex-col items-center justify-center gap-0.5 transition-all min-w-[44px] min-h-[44px]"
              >
                <item.icon
                  className={`h-5 w-5 ${active ? "text-[hsl(var(--gold))]" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-[10px] font-medium ${active ? "text-[hsl(var(--gold))] font-bold" : "text-muted-foreground"}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
