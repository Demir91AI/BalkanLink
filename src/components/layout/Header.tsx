import { Link } from "react-router-dom";
import { ChevronDown, Crown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function Header() {
  const { user, loading, isPremium, signOut } = useAuth();
  const { t, language, setLanguage, languages, currentFlag } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0B1F3A]/95 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold font-heading text-[11px] font-black tracking-tight text-[#0B1F3A] transition-transform duration-200 group-hover:scale-105">
            BL
          </div>
          <span className="font-heading text-lg font-extrabold tracking-tight text-white">
            Balkan<span className="text-gold">Link</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Premium CTA / Badge */}
          {!loading && (
            isPremium ? (
              <Link to="/premium" className="mr-1 flex items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1.5 text-[12px] font-semibold text-gold ring-1 ring-gold/20 transition-colors hover:bg-gold/15">
                <Crown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Premium član</span>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" asChild className="mr-1 h-8 gap-1.5 rounded-lg text-[12px] font-semibold text-gold hover:bg-gold/10 hover:text-gold">
                <Link to="/premium">
                  <Crown className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Premium</span>
                </Link>
              </Button>
            )
          )}

          {/* Language Picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm h-9 px-3 text-white/80 hover:text-gold hover:bg-white/5">
                <span className="text-base leading-none">{currentFlag}</span>
                <ChevronDown className="h-3 w-3 text-white/50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px] bg-[#132A4A] border-white/10 shadow-xl">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${language === lang.code ? "bg-white/10 text-gold font-medium" : ""}`}
                >
                  <span className="mr-2 text-base leading-none">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && !user && (
            <Button variant="ghost" size="sm" asChild className="h-9 text-sm text-white/80 hover:text-gold hover:bg-white/5">
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          )}
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="h-9 text-sm text-white/80 hover:text-gold hover:bg-white/5">
              {t("nav.logout")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
