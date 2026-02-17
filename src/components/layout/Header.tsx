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
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-2xl">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-heading text-[11px] font-black tracking-tight text-primary-foreground transition-transform duration-200 group-hover:scale-105">
            BD
          </div>
          <span className="font-heading text-lg font-extrabold tracking-tight">
            Balkan<span className="text-gold">DE</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Language Picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm h-9 px-3">
                <span className="text-base leading-none">{currentFlag}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-accent font-medium" : ""}
                >
                  <span className="mr-2 text-base leading-none">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && !user && (
            <Button variant="ghost" size="sm" asChild className="h-9 text-sm">
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          )}
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="h-9 text-sm">
              {t("nav.logout")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
