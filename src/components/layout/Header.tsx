import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const { t, language, setLanguage, languages, currentFlag } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[hsl(var(--primary))]/95 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left: sidebar trigger + logo */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-white/70 hover:text-brand-orange hover:bg-white/5" />
          {/* Desktop: full logo, Mobile: icon only */}
          <span className="hidden sm:inline-flex">
            <BrandLogo variant="full" />
          </span>
          <span className="inline-flex sm:hidden">
            <BrandLogo variant="icon" />
          </span>
        </div>

        {/* Right: language + auth */}
        <div className="flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm h-9 px-3 text-white/80 hover:text-brand-orange hover:bg-white/5">
                <span className="text-base leading-none">{currentFlag}</span>
                <ChevronDown className="h-3 w-3 text-white/50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px] bg-[hsl(215,55%,10%)] border-white/10 shadow-xl">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}
                  className={`text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${language === lang.code ? "bg-white/10 text-brand-orange font-medium" : ""}`}>
                  <span className="mr-2 text-base leading-none">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && !user && (
            <Button variant="ghost" size="sm" asChild className="h-9 text-sm text-white/80 hover:text-brand-orange hover:bg-white/5">
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          )}
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="h-9 text-sm text-white/80 hover:text-brand-orange hover:bg-white/5">
              {t("nav.logout")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
