import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown, Mail, List, Send, Menu, Globe, LogIn, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const { t, language, setLanguage, languages, currentFlag } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t("contact.title")} – ${contactForm.firstName} ${contactForm.lastName}`);
    const body = encodeURIComponent(`${t("contact.firstName")}: ${contactForm.firstName}\n${t("contact.lastName")}: ${contactForm.lastName}\n${t("contact.email")}: ${contactForm.email}\n\n${t("contact.message")}:\n${contactForm.message}`);
    window.location.href = `mailto:kontakt@balkanlink.de?subject=${subject}&body=${body}`;
    setContactOpen(false);
    setContactForm({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[hsl(var(--primary))]/95 backdrop-blur-xl shadow-lg shadow-black/20">
        {/* Subtle gold accent line at top */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--brand-orange))] to-transparent opacity-60" />

        <div className="relative flex h-16 items-center px-4">
          {/* Left: sidebar trigger */}
          <TooltipProvider delayDuration={400}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger className="h-10 w-10 flex items-center justify-center rounded-lg text-white/70 hover:text-[hsl(var(--brand-orange))] hover:bg-white/10 active:bg-[hsl(var(--brand-orange))]/20 active:text-[hsl(var(--brand-orange))] active:scale-[0.92] transition-colors duration-500 transition-transform duration-200" />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Meni</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Center: premium brand logo */}
          <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="group relative inline-flex items-center gap-3" aria-label="BalkanLink home">
              <span className="absolute -inset-3 rounded-2xl bg-[hsl(var(--brand-orange))]/10 blur-xl group-hover:bg-[hsl(var(--brand-orange))]/20 transition-all duration-500 pointer-events-none" />
              <span className="relative font-heading text-[28px] font-extrabold leading-none tracking-tight drop-shadow-[0_0_10px_hsl(var(--brand-orange)/0.35)]">
                <span className="text-white">B</span>
                <span className="bg-gradient-to-r from-[hsl(var(--brand-orange))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">L</span>
              </span>
              <span className="relative font-heading text-[22px] font-extrabold leading-none tracking-tight drop-shadow-[0_0_16px_hsl(var(--brand-orange)/0.3)]">
                <span className="text-white">Balkan</span>
                <span className="bg-gradient-to-r from-[hsl(var(--brand-orange))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">Link</span>
              </span>
            </Link>
          </div>

          {/* Right: extra menu trigger */}
          <TooltipProvider delayDuration={400}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSheetOpen(true)}
                  className="ml-auto h-10 w-10 rounded-lg text-white/70 hover:text-[hsl(var(--brand-orange))] hover:bg-white/10 active:bg-[hsl(var(--brand-orange))]/20 active:text-[hsl(var(--brand-orange))] active:scale-[0.92] transition-colors duration-500 transition-transform duration-200"
                  aria-label="Meni"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Meni</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* Side panel (Sheet) from right */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[280px] border-r border-white/8 bg-[hsl(215,55%,7%)] text-white p-0 [&>button]:hidden">
          <nav className="flex flex-col gap-1 px-2 pt-4">
            {/* Jezik / Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200 w-full">
                  <Globe className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
                  <span className="flex-1 text-left">{currentFlag} {languages.find(l => l.code === language)?.name}</span>
                  <ChevronDown className="h-3 w-3 text-white/40" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[180px] bg-[hsl(215,55%,10%)] border-white/10 shadow-xl">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}
                    className={`text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${language === lang.code ? "bg-white/10 text-brand-orange font-medium" : ""}`}>
                    <span className="mr-2 text-base leading-none">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Prijava / Login */}
            {!loading && !user && (
              <Link
                to="/login"
                onClick={() => setSheetOpen(false)}
                className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <LogIn className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
                {t("nav.login")}
              </Link>
            )}
            {!loading && user && (
              <button
                onClick={() => { setSheetOpen(false); signOut(); }}
                className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <LogOut className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
                {t("nav.logout")}
              </button>
            )}

            {/* Preisliste */}
            <button
              onClick={() => {}}
              className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <List className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
              {t("header.pricelist")}
            </button>

            {/* Kontakt */}
            <button
              onClick={() => { setSheetOpen(false); setContactOpen(true); }}
              className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Mail className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
              {t("contact.title")}
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("contact.title")}</DialogTitle>
            <DialogDescription>{t("contact.subtitle")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">{t("contact.firstName")}</label>
                <Input value={contactForm.firstName} onChange={(e) => setContactForm(p => ({ ...p, firstName: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium">{t("contact.lastName")}</label>
                <Input value={contactForm.lastName} onChange={(e) => setContactForm(p => ({ ...p, lastName: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">{t("contact.email")}</label>
              <Input type="email" value={contactForm.email} onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))} required />
            </div>
            <div>
              <label className="text-sm font-medium">{t("contact.message")}</label>
              <Textarea value={contactForm.message} onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))} required className="min-h-[120px]" />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" />
              {t("contact.send")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}