/**
 * UserMenu — Unified header dropdown that combines Profile/Login + PWA install
 * + Logout, replacing the previous two separate icons (📱 + 👤) in the header.
 *
 * The PWA install action emits a `bl:open-install-popup` window event which is
 * picked up by HeaderInstallPopup, reusing its full dropdown UI (iOS/Android
 * instructions, install benefits, etc.) — we do not duplicate that logic.
 *
 * If the app is already running standalone, the install entry is hidden.
 */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserCircle, LogIn, User as UserIcon, Smartphone, LogOut, ArrowRight, Star } from "lucide-react";
import { useSavedItems } from "@/hooks/useSavedItems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { isStandalone } from "@/hooks/usePWAInstall";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";

export function UserMenu() {
  const { t } = useTranslation("common");
  const { t: tSaved } = useTranslation("saved");
  const { user, signOut, isPremium, displayName } = useAuth();
  const navigate = useLocalizedNavigate();
  const { items: savedItems } = useSavedItems();
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    try {
      setInstalled(isStandalone());
    } catch {
      setInstalled(false);
    }
    const mq = window.matchMedia("(display-mode: standalone)");
    const handler = () => {
      try {
        setInstalled(isStandalone());
      } catch {
        /* noop */
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const handleInstall = () => {
    window.dispatchEvent(new CustomEvent("bl:open-install-popup"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={user ? t("nav.profile") : t("nav.login")}
          className="relative flex items-center justify-center transition-all duration-250 ease-in-out"
          style={{
            width: 36,
            height: 36,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
            e.currentTarget.style.background = "rgba(212,175,55,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
        >
          <UserCircle className="h-5 w-5" style={{ color: "rgba(255,255,255,0.78)" }} />
          {!installed && (
            <span
              aria-hidden="true"
              className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full animate-pulse"
              style={{
                background: "#D4AF37",
                boxShadow: "0 0 6px rgba(212,175,55,0.6)",
              }}
            />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 z-[100]"
        style={{
          background: "linear-gradient(180deg, rgba(13,22,48,0.98) 0%, rgba(8,15,35,0.98) 100%)",
          border: "1px solid rgba(212,175,55,0.25)",
          backdropFilter: "blur(20px)",
        }}
      >
        <DropdownMenuItem
          onClick={() => navigate("/sacuvano")}
          className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
        >
          <Star className="h-4 w-4 mr-2 text-[hsl(var(--gold))]" fill={savedItems.length > 0 ? "currentColor" : "none"} />
          <span className="flex-1">{tSaved("sidebarLabel", "Sačuvano")}</span>
          {savedItems.length > 0 && (
            <span className="ml-auto rounded-full bg-[hsl(var(--gold))]/20 px-1.5 py-0.5 text-[10px] font-bold text-[hsl(var(--gold))]">
              {savedItems.length}
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        {user ? (
          <>
            <DropdownMenuLabel className="text-white/90 truncate">
              {displayName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => navigate("/profil")}
              className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
            >
              <UserIcon className="h-4 w-4 mr-2 text-[hsl(var(--gold))]" />
              {t("nav.profile")}
            </DropdownMenuItem>
            {!isPremium && (
              <DropdownMenuItem
                onClick={() => navigate("/paketi")}
                className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
              >
                <ArrowRight className="h-4 w-4 mr-2 text-[hsl(var(--gold))]" />
                <PlusCtaLabel />
              </DropdownMenuItem>
            )}
            {!installed && (
              <DropdownMenuItem
                onClick={handleInstall}
                className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
              >
                <Smartphone className="h-4 w-4 mr-2 text-[hsl(var(--gold))]" />
                {t("install.title", "Instaliraj BalkanLink")}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => void signOut()}
              className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2 text-red-400/80" />
              {t("nav.logout")}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => navigate("/login")}
              className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
            >
              <LogIn className="h-4 w-4 mr-2 text-[hsl(var(--gold))]" />
              {t("nav.login")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/register")}
              className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
            >
              <UserIcon className="h-4 w-4 mr-2 text-[hsl(var(--gold))]" />
              {t("nav.register", "Registracija")}
            </DropdownMenuItem>
            {!installed && (
              <>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={handleInstall}
                  className="text-white/85 focus:text-white focus:bg-white/5 cursor-pointer"
                >
                  <Smartphone className="h-4 w-4 mr-2 text-[hsl(var(--gold))]" />
                  {t("install.title", "Instaliraj BalkanLink")}
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
