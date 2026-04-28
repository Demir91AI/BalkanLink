import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, PlusSquare, Smartphone, MoreVertical, Globe, Copy, Check, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type BrowserKind =
  | "ios-safari"
  | "ios-other"
  | "android-chrome"
  | "android-samsung"
  | "android-firefox"
  | "android-webview"
  | "desktop"
  | "unknown";

function detectBrowser(): BrowserKind {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
    return isSafari ? "ios-safari" : "ios-other";
  }
  if (isAndroid) {
    // In-app browsers (Facebook, Instagram, TikTok, Messenger, LinkedIn)
    if (/FBAN|FBAV|FB_IAB|Instagram|Line|Twitter|TikTok|MicroMessenger|Snapchat/i.test(ua)) {
      return "android-webview";
    }
    if (/SamsungBrowser/i.test(ua)) return "android-samsung";
    if (/Firefox|FxiOS/i.test(ua)) return "android-firefox";
    if (/Chrome|CriOS|EdgA|OPR/i.test(ua)) return "android-chrome";
    // Likely WebView fallback
    if (/; wv\)/i.test(ua)) return "android-webview";
    return "android-chrome";
  }
  return "desktop";
}

interface Step {
  num: string;
  text: string;
  icon?: React.ReactNode;
}

function instructionsFor(kind: BrowserKind): { title: string; steps: Step[]; warn?: string } {
  switch (kind) {
    case "ios-safari":
      return {
        title: "iPhone / iPad — Safari",
        steps: [
          { num: "1", icon: <Share2 className="h-4 w-4 text-[hsl(210,100%,55%)]" />, text: 'Tapni Share dugme (kvadratić sa strelicom ↑) na dnu ekrana.' },
          { num: "2", icon: <PlusSquare className="h-4 w-4 text-muted-foreground" />, text: 'Skroluj i odaberi "Dodaj na početni ekran" (Add to Home Screen).' },
          { num: "3", icon: <Smartphone className="h-4 w-4 text-[hsl(var(--gold))]" />, text: 'Potvrdi sa "Dodaj" — ikona BalkanLink se pojavljuje na ekranu.' },
        ],
      };
    case "ios-other":
      return {
        title: "iPhone — Chrome / Firefox / Edge",
        warn: "Na iPhone-u SAMO Safari može instalirati aplikaciju.",
        steps: [
          { num: "1", icon: <Copy className="h-4 w-4" />, text: "Kopiraj link odozdo (dugme 'Kopiraj link')." },
          { num: "2", icon: <Globe className="h-4 w-4" />, text: "Otvori Safari (plava kompas-ikona)." },
          { num: "3", icon: <Share2 className="h-4 w-4 text-[hsl(210,100%,55%)]" />, text: 'Zalijepi link, otvori stranicu, pa Share → "Dodaj na početni ekran".' },
        ],
      };
    case "android-chrome":
      return {
        title: "Android — Chrome / Edge",
        steps: [
          { num: "1", icon: <MoreVertical className="h-4 w-4" />, text: "Tapni meni (tri tačke ⋮) gore desno." },
          { num: "2", icon: <PlusSquare className="h-4 w-4 text-[hsl(var(--gold))]" />, text: '"Dodaj na početni ekran" ili "Instaliraj aplikaciju".' },
          { num: "3", icon: <Smartphone className="h-4 w-4 text-[hsl(var(--gold))]" />, text: 'Potvrdi "Instaliraj" — ikona se pojavi na home screenu.' },
        ],
      };
    case "android-samsung":
      return {
        title: "Android — Samsung Internet",
        steps: [
          { num: "1", icon: <MoreVertical className="h-4 w-4" />, text: "Tapni meni (☰ tri linije) dolje desno." },
          { num: "2", icon: <PlusSquare className="h-4 w-4 text-[hsl(var(--gold))]" />, text: '"Dodaj stranicu na" → "Početni ekran".' },
          { num: "3", icon: <Smartphone className="h-4 w-4 text-[hsl(var(--gold))]" />, text: 'Potvrdi "Dodaj" — ikona se pojavi.' },
        ],
      };
    case "android-firefox":
      return {
        title: "Android — Firefox",
        steps: [
          { num: "1", icon: <MoreVertical className="h-4 w-4" />, text: "Tapni meni (tri tačke ⋮)." },
          { num: "2", icon: <PlusSquare className="h-4 w-4 text-[hsl(var(--gold))]" />, text: '"Instaliraj" ili "Dodaj na početni ekran".' },
          { num: "3", icon: <Smartphone className="h-4 w-4 text-[hsl(var(--gold))]" />, text: "Potvrdi dodavanje." },
        ],
      };
    case "android-webview":
      return {
        title: "Otvori u pravom browseru",
        warn: "Otvorila si stranicu unutar Facebook/Instagram/TikTok preglednika. Tu instalacija ne radi.",
        steps: [
          { num: "1", icon: <MoreVertical className="h-4 w-4" />, text: "Tapni meni (tri tačke ⋮ ili ⋯) gore desno." },
          { num: "2", icon: <ExternalLink className="h-4 w-4 text-[hsl(var(--gold))]" />, text: '"Otvori u browseru" / "Open in Chrome".' },
          { num: "3", icon: <PlusSquare className="h-4 w-4 text-[hsl(var(--gold))]" />, text: "Tek tada možeš instalirati aplikaciju iz menija." },
        ],
      };
    case "desktop":
      return {
        title: "Desktop računar",
        steps: [
          { num: "1", icon: <Globe className="h-4 w-4" />, text: "U Chrome / Edge adresnoj traci pogledaj desnu stranu." },
          { num: "2", icon: <PlusSquare className="h-4 w-4 text-[hsl(var(--gold))]" />, text: 'Klikni install ikonu (⊕ monitor sa strelicom) ili meni → "Instaliraj BalkanLink".' },
          { num: "3", icon: <Smartphone className="h-4 w-4 text-[hsl(var(--gold))]" />, text: "Za pravu mobilnu aplikaciju otvori www.balkanlink.de na telefonu." },
        ],
      };
    default:
      return {
        title: "Instalacija aplikacije",
        steps: [
          { num: "1", icon: <Globe className="h-4 w-4" />, text: "Otvori www.balkanlink.de u Chrome (Android) ili Safari (iPhone)." },
          { num: "2", icon: <MoreVertical className="h-4 w-4" />, text: 'Otvori meni i odaberi "Dodaj na početni ekran".' },
          { num: "3", icon: <Smartphone className="h-4 w-4 text-[hsl(var(--gold))]" />, text: "Potvrdi — gotovo!" },
        ],
      };
  }
}

export default function PWAManualGuide({ open, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const browser = useMemo(() => (open ? detectBrowser() : "unknown"), [open]);
  const guide = useMemo(() => instructionsFor(browser), [browser]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://www.balkanlink.de");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Smartphone className="h-5 w-5 text-[hsl(var(--gold))]" />
            {guide.title}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Slijedi korake da dodaš BalkanLink kao aplikaciju na svoj uređaj.
          </DialogDescription>
        </DialogHeader>

        {guide.warn && (
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-600 dark:text-yellow-300">
            ⚠️ {guide.warn}
          </div>
        )}

        <div className="space-y-3 py-2">
          {guide.steps.map((s) => (
            <div key={s.num} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold">
                {s.num}
              </span>
              <span className="text-sm text-foreground flex items-start gap-2 leading-relaxed pt-0.5">
                {s.icon && <span className="mt-0.5 shrink-0">{s.icon}</span>}
                <span>{s.text}</span>
              </span>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleCopy}
          className="w-full text-xs"
        >
          {copied ? (
            <><Check className="h-3.5 w-3.5" /> Link kopiran!</>
          ) : (
            <><Copy className="h-3.5 w-3.5" /> Kopiraj link (www.balkanlink.de)</>
          )}
        </Button>

        <Button
          onClick={onClose}
          className="w-full bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--primary))] font-semibold text-sm"
        >
          Razumijem
        </Button>
      </DialogContent>
    </Dialog>
  );
}
