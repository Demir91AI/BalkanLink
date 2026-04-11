import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home, CreditCard, User, X, LogIn, LogOut,
  FileText, Globe, Calculator, GraduationCap,
  Megaphone, Map, Bot, BookOpen, HelpCircle,
  type LucideIcon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "?";
}

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const debounceRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, displayName } = useAuth();
  const firstName = displayName.split(/\s+/).filter(Boolean)[0] || "Nutzer";
  const initials = getInitials(displayName || user?.email || "BL");

  const navItems: NavItem[] = [
    { title: "Startseite", url: "/", icon: Home },
    { title: "Formulare", url: "/formulare", icon: FileText },
    { title: "Visa-Navigator", url: "/visa-navigator", icon: Globe },
    { title: "Rechner", url: "/rechner", icon: Calculator },
    { title: "Deutschkurs", url: "/deutsch-kurs", icon: GraduationCap },
    { title: "Kleinanzeigen", url: "/kleinanzeigen", icon: Megaphone },
    { title: "Karte", url: "/karte", icon: Map },
    { title: "Dokumentenprüfung", url: "/dokumente", icon: Bot },
    { title: "Vorlagen", url: "/vorlagen", icon: BookOpen },
    { title: "Wissensdatenbank", url: "/wissensdatenbank", icon: HelpCircle },
    { title: "Preise", url: "/preise", icon: CreditCard },
    ...(user ? [{ title: "Mein Profil", url: "/profil", icon: User }] : []),
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
        className="fixed left-0 top-0 z-[999] flex h-screen w-[300px] max-w-[85vw] flex-col overflow-y-auto border-r border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-label="Navigationsmenü"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-sm font-semibold text-foreground">Menü</span>
          <button onClick={close} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-border p-4">
          {user ? (
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Willkommen, {firstName}!
                  </p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-foreground transition-colors hover:bg-muted"
            >
              <LogIn className="h-[18px] w-[18px] shrink-0" />
              <span className="text-sm font-medium">Anmelden oder registrieren</span>
            </button>
          )}
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = item.url === "/"
                ? location.pathname === "/"
                : location.pathname === item.url || location.pathname.startsWith(item.url + "/");

              return (
                <button
                  key={item.url}
                  onClick={() => handleNav(item.url)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {user && (
          <div className="border-t border-border p-4">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" />
              <span className="text-sm font-medium">Abmelden</span>
            </button>
          </div>
        )}
      </aside>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
