import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_ITEMS = [
  { label: "Pomoć", to: "/dolazak" },
  { label: "Formulari", to: "/formulari" },
  { label: "Rechner", to: "/tools" },
];

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const { t, language, setLanguage, languages, currentFlag } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0B1F3A]/95 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-heading text-lg font-extrabold tracking-tight text-white">
            Balkan<span className="text-gold">Link</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-gold hover:bg-white/5">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
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
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}
                  className={`text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${language === lang.code ? "bg-white/10 text-gold font-medium" : ""}`}>
                  <span className="mr-2 text-base leading-none">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && !user && (
            <Button variant="ghost" size="sm" asChild className="hidden h-9 text-sm text-white/80 hover:text-gold hover:bg-white/5 sm:inline-flex">
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          )}
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="hidden h-9 text-sm text-white/80 hover:text-gold hover:bg-white/5 sm:inline-flex">
              {t("nav.logout")}
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-white/80 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-white/8 bg-[#0B1F3A] md:hidden">
          <nav className="container flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-gold hover:bg-white/5">
                {item.label}
              </Link>
            ))}
            {!loading && !user && (
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-gold hover:bg-white/5">
                {t("nav.login")}
              </Link>
            )}
            {!loading && user && (
              <button onClick={() => { signOut(); setMobileOpen(false); }}
                className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-white/60 transition-colors hover:text-gold hover:bg-white/5">
                {t("nav.logout")}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
