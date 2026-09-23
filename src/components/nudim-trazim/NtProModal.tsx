import { Star, Check, X, Flame } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NtProModal({ open, onClose }: Props) {
  const { t } = useTranslation("pages");
  const { t: tp } = useTranslation("plus");
  const [selected, setSelected] = useState<"free" | "pro">("pro");

  if (!open) return null;

  // Ad highlighting is arranged individually (no self-serve checkout until automatic fulfillment exists).
  const handleActivate = () => {
    if (selected === "pro") window.location.href = "mailto:kontakt@balkanlink.de";
    onClose();
  };

  const freeFeatures = [
    t("classifieds.proModal.free.f1"),
    t("classifieds.proModal.free.f2"),
    t("classifieds.proModal.free.f3"),
    t("classifieds.proModal.free.f4"),
  ];
  const proFeatures = [
    t("classifieds.proModal.pro.f1"),
    t("classifieds.proModal.pro.f2"),
    t("classifieds.proModal.pro.f3"),
    t("classifieds.proModal.pro.f4"),
    t("classifieds.proModal.pro.f5"),
  ];
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
          <h3 className="text-lg font-bold">{t("classifieds.proModal.title")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t("classifieds.proModal.subtitle")}</p>
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
              <p className="text-base font-bold">{t("classifieds.proModal.free.label")}</p>
              <p className="text-lg font-black">{t("classifieds.proModal.free.price")}</p>
            </div>
            <ul className="space-y-1">
              {freeFeatures.map(t2 => (
                <li key={t2} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-[hsl(var(--success))] shrink-0" /> {t2}
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
                <p className="text-base font-bold">{t("classifieds.proModal.pro.label")}</p>
              </div>

            </div>
            <ul className="space-y-1">
              {proFeatures.map(t2 => (
                <li key={t2} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-orange-400 shrink-0" /> {t2}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-muted-foreground">{tp("businessDesc")}</p>
          </button>

        </div>

        <Button
          className="w-full gap-2 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--gold-foreground))] font-semibold"
          onClick={handleActivate}
        >
          <Star className="h-4 w-4" />
          {selected === "free" ? t("classifieds.proModal.buttons.free") : tp("businessCta")}
        </Button>

      </div>
    </div>
  );
}
