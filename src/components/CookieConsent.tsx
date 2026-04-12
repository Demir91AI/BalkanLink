import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Shield, Settings, X } from "lucide-react";

const COOKIE_KEY = "bl-cookie-consent";

interface CookiePrefs {
  necessary: boolean;
  functional: boolean;
  statistics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFS: CookiePrefs = {
  necessary: true,
  functional: false,
  statistics: false,
  marketing: false,
};

function loadPrefs(): CookiePrefs | null {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function savePrefs(prefs: CookiePrefs) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}

const categories = [
  { key: "necessary" as const, label: "Neophodni", desc: "Potrebni za rad platforme.", locked: true },
  { key: "functional" as const, label: "Funkcionalni", desc: "Čuvaju tvoje postavke." },
  { key: "statistics" as const, label: "Statistika", desc: "Pomažu nam poboljšati platformu." },
  { key: "marketing" as const, label: "Marketing", desc: "Personalizirani sadržaj i oglasi." },
];

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);

  useEffect(() => {
    const saved = loadPrefs();
    if (!saved) {
      setVisible(true);
    } else {
      setPrefs(saved);
    }
  }, []);

  const accept = useCallback((all: boolean) => {
    const p: CookiePrefs = all
      ? { necessary: true, functional: true, statistics: true, marketing: true }
      : { ...prefs, necessary: true };
    savePrefs(p);
    setPrefs(p);
    setVisible(false);
    setSettingsOpen(false);
  }, [prefs]);

  const saveSettings = useCallback(() => {
    const p = { ...prefs, necessary: true };
    savePrefs(p);
    setPrefs(p);
    setVisible(false);
    setSettingsOpen(false);
  }, [prefs]);

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  useEffect(() => {
    (window as any).__blOpenCookieSettings = () => {
      setVisible(true);
      setSettingsOpen(true);
    };
    return () => { delete (window as any).__blOpenCookieSettings; };
  }, []);

  if (!visible && !settingsOpen) return null;

  return (
    <>
      {visible && !settingsOpen && (
        <div className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[hsl(var(--primary))]/95 backdrop-blur-xl shadow-2xl shadow-black/30 p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="h-5 w-5 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white">Koristimo kolačiće</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/60">Koristimo kolačiće za poboljšanje platforme.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                onClick={() => accept(true)}
                className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-[hsl(var(--brand-orange-foreground))] font-semibold text-xs h-9"
              >
                Prihvati sve
              </Button>
              <Button
                size="sm"
                onClick={() => accept(false)}
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-white font-medium text-xs h-9 border border-white/20"
              >
                Samo neophodni
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={openSettings}
                className="text-white/60 hover:text-white hover:bg-white/5 text-xs h-9 gap-1.5"
              >
                <Settings className="h-3.5 w-3.5" />
                Postavke
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={(o) => { setSettingsOpen(o); if (!o && !loadPrefs()) setVisible(true); }}>
        <DialogContent className="bg-[hsl(var(--primary))] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-[hsl(var(--brand-orange))]" />
              Postavke kolačića
            </DialogTitle>
            <DialogDescription className="text-white/50 text-xs">
              Odaberi koje kolačiće želiš dozvoliti.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            {categories.map(({ key, label, desc, locked }) => (
              <div key={key} className="flex items-center justify-between gap-3 rounded-lg border border-white/8 p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white/90">{label}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">{desc}</p>
                </div>
                <Switch
                  checked={prefs[key]}
                  disabled={locked}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
                  className="shrink-0"
                />
              </div>
            ))}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              size="sm"
              onClick={saveSettings}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-white font-medium text-xs h-10 w-full border border-white/20"
            >
              Spremi postavke
            </Button>
            <Button
              size="sm"
              onClick={() => accept(true)}
              className="bg-[hsl(var(--brand-orange))] hover:bg-[hsl(var(--brand-orange))]/90 text-[hsl(var(--brand-orange-foreground))] font-semibold text-xs h-10 w-full"
            >
              Prihvati sve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
