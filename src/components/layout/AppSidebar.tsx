import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText, Shield, BookOpen, Camera, Megaphone, Map, Plane,
  Briefcase, Building, Calculator, FileCheck, X, LogIn, LogOut, User,
  Mail, Send, CreditCard,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const debounceRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const mainItems = [
    { titleKey: "sidebar.formulari", url: "/formulari", icon: FileText, premium: true },
    { titleKey: "sidebar.viza", url: "/viza", icon: Shield, premium: true },
    { titleKey: "sidebar.deutsch", url: "/deutsch-trainer", icon: BookOpen, premium: true },
    { titleKey: "sidebar.dokumentencheck", url: "/dokumenten-check", icon: Camera, premium: true },
  ];

  const secondaryItems = [
    { titleKey: "sidebar.zivot", url: "/zivot-u-njemackoj", icon: Plane },
    { titleKey: "sidebar.nudim", url: "/nudim-trazim", icon: Megaphone },
    { titleKey: "sidebar.mapa", url: "/mapa", icon: Map },
    { titleKey: "sidebar.jobs", url: "/stellenangebote", icon: Briefcase },
    { titleKey: "sidebar.stanovi", url: "/wohnungen", icon: Building },
    { titleKey: "sidebar.kalkulatori", url: "/kalkulatori", icon: Calculator },
    { titleKey: "sidebar.predloski", url: "/vorlagen", icon: FileCheck },
  ];

  const toggle = useCallback(() => {
    const now = Date.now();
    if (now - debounceRef.current < 250) return;
    debounceRef.current = now;
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handler = () => toggle();
    window.addEventListener("toggle-sidebar", handler);
    return () => window.removeEventListener("toggle-sidebar", handler);
  }, [toggle]);

  const close = useCallback(() => setIsOpen(false), []);
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
      <div
        className="fixed inset-0 z-[998] bg-black/45 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className="fixed left-0 top-0 z-[999] h-screen bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out flex flex-col"
        style={{
          width: "300px",
          minWidth: "280px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D0]">
          <span className="text-sm font-bold text-[#2D2D2D] tracking-wide uppercase">{t("sidebar.menu")}</span>
          <button onClick={close} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDE6] transition-colors">
            <X className="h-4 w-4 text-[#6B6B6B]" />
          </button>
        </div>

        {/* Auth section at top */}
        <div className="px-3 pt-4 pb-3 border-b border-[#E8E0D0]">
          {user ? (
            <div className="flex flex-col gap-2 px-3">
              <div className="flex items-center gap-2 text-[#2D2D2D]">
                <User className="h-4 w-4 shrink-0 text-[#6B6B6B]" />
                <span className="text-[13px] font-medium truncate">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-[13px] text-[#6B6B6B] hover:text-red-500 transition-colors"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {t("header.logout")}
              </button>
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
            >
              <LogIn className="h-[18px] w-[18px] shrink-0" />
              <span className="text-[14px] font-medium">{t("header.login")} / {t("header.register")}</span>
            </button>
          )}
        </div>

        {/* Paketi & Kontakt right below auth */}
        <div className="px-3 pt-2 pb-1 border-b border-[#E8E0D0]">
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => handleNav("/paketi")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                location.pathname === "/paketi"
                  ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
                  : "text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D]"
              }`}
            >
              <CreditCard className={`h-[18px] w-[18px] shrink-0 ${location.pathname === "/paketi" ? "text-[hsl(var(--gold))]" : ""}`} />
              <span className="text-[14px] font-medium">{t("sidebar.cijene")}</span>
            </button>
            <button
              onClick={() => { close(); setContactOpen(true); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D] transition-all duration-200"
            >
              <Mail className="h-[18px] w-[18px] shrink-0" />
              <span className="text-[14px] font-medium">{t("sidebar.kontakt")}</span>
            </button>
          </nav>
        </div>

        <div className="px-3 pt-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.mainFunctions")}</p>
          <nav className="flex flex-col gap-0.5">
            {mainItems.map((item) => {
              const active = location.pathname === item.url || location.pathname.startsWith(item.url + "/");
              return (
                <button
                  key={item.url}
                  onClick={() => handleNav(item.url)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    active
                      ? "bg-[hsl(var(--gold))]/10 shadow-[inset_3px_0_0_hsl(var(--gold))]"
                      : "hover:bg-[#F5F0E8]"
                  }`}
                >
                  <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[hsl(var(--gold))]" : "text-[#6B6B6B]"}`} />
                  <span className={`text-[14px] font-semibold whitespace-nowrap overflow-visible ${active ? "text-[hsl(var(--gold))]" : "text-[#2D2D2D]"}`}>
                    {t(item.titleKey)}
                  </span>
                  {item.premium && (
                    <span className="ml-auto shrink-0 rounded-full bg-[hsl(var(--gold))] px-1.5 py-0.5 text-[8px] font-bold leading-none text-white">
                      PREMIUM
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-3 pt-5">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B6B6B]/50">{t("sidebar.other")}</p>
          <nav className="flex flex-col gap-0.5">
            {secondaryItems.map((item) => {
              const active = location.pathname === item.url || location.pathname.startsWith(item.url + "/");
              return (
                <button
                  key={item.url}
                  onClick={() => handleNav(item.url)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    active
                      ? "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]"
                      : "text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#2D2D2D]"
                  }`}
                >
                  <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[hsl(var(--gold))]" : ""}`} />
                  <span className="text-[14px] font-medium whitespace-nowrap overflow-visible">
                    {t(item.titleKey)}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

      </aside>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Contact dialog */}
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
