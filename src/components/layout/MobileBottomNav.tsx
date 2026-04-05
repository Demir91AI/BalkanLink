import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Shield, BookOpen, Camera, Home } from "lucide-react";

const items = [
  { icon: Home, label: "Početna", path: "/" },
  { icon: FileText, label: "Formulari", path: "/formulari" },
  { icon: Shield, label: "Viza", path: "/viza" },
  { icon: BookOpen, label: "Deutsch", path: "/deutsch-trainer" },
  { icon: Camera, label: "Dok. Check", path: "/dokumenten-check" },
];

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-stretch">
        {items.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 transition-all"
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
  );
}
