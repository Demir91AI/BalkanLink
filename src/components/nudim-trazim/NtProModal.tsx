import { Star, Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSectionT } from "@/hooks/useSectionT";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NtProModal({ open, onClose }: Props) {
  const st = useSectionT();
  const [selected, setSelected] = useState<"7" | "30">("30");

  if (!open) return null;

  const handleActivate = () => {
    toast.success(st("nt.proActivated"));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20">
            <Star className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <h3 className="text-lg font-bold">{st("nt.proModalTitle")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{st("nt.proModalDesc")}</p>
        </div>

        <ul className="mb-6 space-y-2">
          {[st("nt.proModalBenefit1"), st("nt.proModalBenefit2"), st("nt.proModalBenefit3")].map((txt) => (
            <li key={txt} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" /> {txt}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setSelected("7")}
            className={cn(
              "rounded-xl border p-4 text-left transition-all",
              selected === "7"
                ? "border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/5 shadow-sm"
                : "border-border/60 bg-card hover:border-border"
            )}
          >
            <p className="text-xl font-extrabold">2.99€</p>
            <p className="mt-1 text-xs text-muted-foreground">{st("nt.pro7days")}</p>
          </button>
          <button
            onClick={() => setSelected("30")}
            className={cn(
              "relative rounded-xl border p-4 text-left transition-all",
              selected === "30"
                ? "border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/5 shadow-sm"
                : "border-border/60 bg-card hover:border-border"
            )}
          >
            <Badge className="absolute -top-2.5 right-3 bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] text-[10px] font-bold">
              {st("nt.bestOption")}
            </Badge>
            <p className="text-xl font-extrabold">9.99€</p>
            <p className="mt-1 text-xs text-muted-foreground">{st("nt.pro30days")}</p>
          </button>
        </div>

        <Button
          className="w-full gap-2 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--gold-foreground))] font-semibold"
          onClick={handleActivate}
        >
          <Star className="h-4 w-4" /> {st("nt.activatePro")}
        </Button>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">{st("nt.freeNote")}</p>
      </div>
    </div>
  );
}
