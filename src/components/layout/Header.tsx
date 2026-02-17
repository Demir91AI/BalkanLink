import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const { t, language, setLanguage, languages, currentFlag } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1F3A] shadow-lg shadow-black/20">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold font-heading text-[11px] font-black tracking-tight text-[#0B1F3A] transition-transform duration-200 group-hover:scale-105">
            BD
          </div>
          <span className="font-heading text-lg font-extrabold tracking-tight text-white">
            Balkan<span className="text-gold">DE</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Language Picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm h-9 px-3 text-white/80 hover:text-[#F4B400] hover:bg-white/5">
                <span className="text-base leading-none">{currentFlag}</span>
                <ChevronDown className="h-3 w-3 text-white/50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px] bg-[#132A4A] border-white/10 shadow-xl">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${language === lang.code ? "bg-white/10 text-[#F4B400] font-medium" : ""}`}
                >
                  <span className="mr-2 text-base leading-none">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && !user && (
            <Button variant="ghost" size="sm" asChild className="h-9 text-sm text-white/80 hover:text-[#F4B400] hover:bg-white/5">
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          )}
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="h-9 text-sm text-white/80 hover:text-[#F4B400] hover:bg-white/5">
              {t("nav.logout")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
