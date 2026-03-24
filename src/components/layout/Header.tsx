import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown, Mail, List, Send, PanelRight } from "lucide-react";
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
    const subject = encodeURIComponent(`Kontakt von ${contactForm.firstName} ${contactForm.lastName}`);
    const body = encodeURIComponent(`Vorname: ${contactForm.firstName}\nNachname: ${contactForm.lastName}\nE-Mail: ${contactForm.email}\n\nNachricht:\n${contactForm.message}`);
    window.location.href = `mailto:kontakt@balkanlink.de?subject=${subject}&body=${body}`;
    setContactOpen(false);
    setContactForm({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[hsl(var(--primary))]/95 backdrop-blur-xl shadow-lg shadow-black/20">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Left: sidebar trigger + logo */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-white/70 hover:text-brand-orange hover:bg-white/5" />
            <BrandLogo variant="full" />
          </div>

          {/* Right: language + auth + extra menu trigger */}
          <div className="flex items-center gap-1.5">
            {/* Language switcher */}
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

            {/* Extra menu trigger – far right, opens sheet from right */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSheetOpen(true)}
              className="h-9 px-2.5 text-white/80 hover:text-brand-orange hover:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Side panel (Sheet) from right */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[280px] border-r border-white/8 bg-[hsl(215,55%,7%)] text-white p-0">
          <SheetHeader className="px-4 pt-5 pb-3">
            <SheetTitle className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/30">Menü</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-2 pt-1">
            <button
              onClick={() => { setSheetOpen(false); setContactOpen(true); }}
              className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Mail className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
              Kontakt
            </button>
            <button
              onClick={() => {}}
              className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <List className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
              Preisliste / Monitoring
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kontakt</DialogTitle>
            <DialogDescription>Pošaljite nam poruku.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Vorname</label>
                <Input value={contactForm.firstName} onChange={(e) => setContactForm(p => ({ ...p, firstName: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium">Nachname</label>
                <Input value={contactForm.lastName} onChange={(e) => setContactForm(p => ({ ...p, lastName: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">E-Mail</label>
              <Input type="email" value={contactForm.email} onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))} required />
            </div>
            <div>
              <label className="text-sm font-medium">Vaša poruka</label>
              <Textarea value={contactForm.message} onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))} required className="min-h-[120px]" />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" />
              Nachricht senden
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
