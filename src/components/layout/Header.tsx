import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Mail, List, Send, Menu, Globe, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const LANG_OPTIONS = [
  { code: "de", name: "Deutsch", flag: "https://flagcdn.com/h40/de.png" },
  { code: "bs", name: "Bosanski", flag: "https://flagcdn.com/h40/ba.png" },
  { code: "hr", name: "Hrvatski", flag: "https://flagcdn.com/h40/hr.png" },
  { code: "sr", name: "Srpski", flag: "https://flagcdn.com/h40/rs.png" },
  { code: "me", name: "Crnogorski", flag: "https://flagcdn.com/h40/me.png" },
  { code: "mk", name: "Македонски", flag: "https://flagcdn.com/h40/mk.png" },
  { code: "sl", name: "Slovenščina", flag: "https://flagcdn.com/h40/si.png" },
  { code: "sq", name: "Shqip", flag: "https://flagcdn.com/h40/al.png" },
  { code: "xk", name: "Kosovë", flag: "https://flagcdn.com/h40/xk.png" },
];

const menuBtnClass =
  "h-10 w-10 rounded-lg text-white/70 hover:text-white hover:bg-white/8 active:scale-[0.93] transition-transform duration-150";

export default function Header() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const { t, language: currentLanguage, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", message: "" });

  const currentLang = LANG_OPTIONS.find(l => l.code === currentLanguage) || LANG_OPTIONS[0];

  const lastToggleRef = useRef(0);
  const handleToggleSidebar = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleRef.current < 250) return;
    lastToggleRef.current = now;
    window.dispatchEvent(new CustomEvent("toggle-sidebar"));
  }, []);

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
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0f1f3d]/95 backdrop-blur-xl shadow-lg shadow-black/20">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-60" />

        <div className="relative flex h-14 items-center px-4">
          <Button variant="ghost" size="icon" onClick={handleToggleSidebar} className={menuBtnClass} aria-label={t("sidebar.menu")}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="group relative inline-flex items-center gap-3" aria-label="BalkanLink home">
              <span className="absolute -inset-3 rounded-2xl bg-[hsl(var(--gold))]/10 blur-xl group-hover:bg-[hsl(var(--gold))]/20 transition-all duration-500 pointer-events-none" />
              <span className="relative font-heading text-[28px] font-extrabold leading-none tracking-tight drop-shadow-[0_0_10px_hsl(var(--gold)/0.35)]">
                <span className="text-white">B</span>
                <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">L</span>
              </span>
              <span className="relative font-heading text-[22px] font-extrabold leading-none tracking-tight drop-shadow-[0_0_16px_hsl(var(--gold)/0.3)]">
                <span className="text-white">Balkan</span>
                <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] bg-clip-text text-transparent">Link</span>
              </span>
            </Link>

            {!loading && isAdmin && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
                <ShieldCheck className="h-2.5 w-2.5" />
                Admin
              </span>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)} className={`ml-auto ${menuBtnClass}`} aria-label={t("sidebar.menu")}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[280px] border-r border-white/8 bg-[hsl(215,55%,7%)] text-white p-0 [&>button]:hidden">
          <nav className="flex flex-col gap-1 px-2 pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200 w-full">
                  <Globe className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
                  <img src={currentLang.flag} alt="" className="h-4 w-6 object-cover rounded-[2px] shrink-0" /> <span className="flex-1 text-left">{currentLang.name}</span>
                  <ChevronDown className="h-3 w-3 text-white/40" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[180px] bg-[hsl(215,55%,10%)] border-white/10 shadow-xl">
                {LANG_OPTIONS.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as Language)}
                    className={`text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${currentLanguage === lang.code ? "bg-white/10 text-[hsl(var(--gold))] font-medium" : ""}`}>
                    <img src={lang.flag} alt="" className="mr-2 h-4 w-6 object-cover rounded-[2px] shrink-0" />
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {!loading && !user && (
              <Link to="/login" onClick={() => setSheetOpen(false)} className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200">
                <LogIn className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
                {t("nav.login")}
              </Link>
            )}
            {!loading && user && (
              <button onClick={() => { setSheetOpen(false); signOut(); }} className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200">
                <LogOut className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
                {t("nav.logout")}
              </button>
            )}

            <button onClick={() => { setSheetOpen(false); navigate("/paketi"); }} className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200">
              <List className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
              {t("nav.packages")}
            </button>

            <button onClick={() => { setSheetOpen(false); setContactOpen(true); }} className="group flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200">
              <Mail className="h-[18px] w-[18px] shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
              {t("contact.title")}
            </button>
          </nav>
        </SheetContent>
      </Sheet>

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
            <Button type="submit" className="w-full gap-2 bg-[hsl(var(--gold))] text-white hover:bg-[hsl(var(--gold-dark))]">
              <Send className="h-4 w-4" />
              {t("contact.send")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
