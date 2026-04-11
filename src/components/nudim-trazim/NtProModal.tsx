import { Star, Check, X, Crown, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NtProModal({ open, onClose }: Props) {
  const [selected, setSelected] = useState<"free" | "pro" | "premium">("pro");

  if (!open) return null;

  const handleActivate = () => {
    toast.success("PRO aktivacija se priprema. Hvala ti!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-lg font-bold">Objavi ili istakni oglas</h3>
          <p className="mt-1 text-sm text-muted-foreground">Besplatno objavi ili povećaj vidljivost uz Pro oglase</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {/* FREE */}
          <button
            onClick={() => setSelected("free")}
            className={cn(
              "rounded-xl border p-4 text-left transition-all",
              selected === "free"
                ? "border-[hsl(var(--success))]/60 bg-[hsl(var(--success))]/5"
                : "border-border/60 bg-card hover:border-border"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-base font-bold">Besplatan oglas</p>
              <p className="text-lg font-black">0€</p>
            </div>
            <ul className="space-y-1">
              {["Objavi besplatno", "Standardna lista", "Sortiranje po datumu", "Dostupan svima"].map(t => (
                <li key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </button>

          {/* PRO */}
          <button
            onClick={() => setSelected("pro")}
            className={cn(
              "relative rounded-xl border p-4 text-left transition-all",
              selected === "pro"
                ? "border-orange-400/60 bg-orange-500/5 shadow-[0_0_16px_rgba(251,146,60,0.18)]"
                : "border-border/60 bg-card hover:border-border"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <p className="text-base font-bold">🔥 Pro oglas</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black">2.99€</p>
                <p className="text-[10px] text-muted-foreground">/ 7 dana</p>
              </div>
            </div>
            <ul className="space-y-1">
              {["Vrh liste", "Iznad free oglasa", "Badge + glow", "Više pregleda", "Istaknuta pozicija 7 dana"].map(t => (
                <li key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-orange-400 shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-muted-foreground">Po isteku vraća se u normalnu listu</p>
          </button>

          {/* PREMIUM */}
          <button
            onClick={() => setSelected("premium")}
            className={cn(
              "relative rounded-xl border-2 p-4 text-left transition-all",
              selected === "premium"
                ? "border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/5 shadow-[0_0_20px_rgba(234,179,8,0.15)]"
                : "border-[hsl(var(--gold))]/20 bg-card hover:border-[hsl(var(--gold))]/40"
            )}
          >
            <span className="absolute -top-2.5 right-3 rounded-full bg-[hsl(var(--gold))] px-2.5 py-0.5 text-[10px] font-bold text-[hsl(var(--gold-foreground))]">
              Najbolja vrijednost
            </span>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
                <p className="text-base font-bold">⭐ Premium</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black">9.99€</p>
                <p className="text-[10px] text-muted-foreground">/ mjesec</p>
              </div>
            </div>
            <ul className="space-y-1">
              {["2 Pro oglasa/mj", "Svaki 7 dana", "Na različitim oglasima", "Max 2 aktivna", "Dodatni 2.99€ nakon toga"].map(t => (
                <li key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-[hsl(var(--gold))] shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-muted-foreground">Uštedi i istakni oglase bez dodatnog plaćanja</p>
          </button>
        </div>

        <Button
          className="w-full gap-2 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--gold-foreground))] font-semibold"
          onClick={handleActivate}
        >
          <Star className="h-4 w-4" />
          {selected === "free" ? "Objavi oglas →" : selected === "pro" ? "Istakni oglas →" : "Postani Premium →"}
        </Button>

        {/* Info block */}
        <div className="mt-4 rounded-xl bg-muted/50 border border-border/40 p-3">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Kako funkcioniše?</strong> Pro oglasi su istaknuti iznad ostalih i donose više pregleda. Premium uključuje 2 takva isticanja mjesečno.
          </p>
        </div>
      </div>
    </div>
  );
}
