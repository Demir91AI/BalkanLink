import { Star, Check, X, Crown, Flame } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { initiateCheckout, STRIPE_PRICE_IDS } from "@/lib/stripe";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NtProModal({ open, onClose }: Props) {
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState<"free" | "pro" | "premium">("pro");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!open) return null;

  const handleActivate = () => {
    if (selected === "free") {
      onClose();
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
    if (selected === "pro") {
      initiateCheckout(STRIPE_PRICE_IDS.PRO_AD_7DAY, user.id, "payment");
    } else {
      initiateCheckout(STRIPE_PRICE_IDS.PREMIUM_MONTHLY, user.id, "subscription");
    }
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
  const premiumFeatures = [
    t("classifieds.proModal.premium.f1"),
    t("classifieds.proModal.premium.f2"),
    t("classifieds.proModal.premium.f3"),
    t("classifieds.proModal.premium.f4"),
    t("classifieds.proModal.premium.f5"),
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
              <div className="text-right">
                <p className="text-lg font-black">{t("classifieds.proModal.pro.price")}</p>
                <p className="text-[10px] text-muted-foreground">{t("classifieds.proModal.pro.period")}</p>
              </div>
            </div>
            <ul className="space-y-1">
              {proFeatures.map(t2 => (
                <li key={t2} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-orange-400 shrink-0" /> {t2}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-muted-foreground">{t("classifieds.proModal.pro.afterExpire")}</p>
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
              {t("classifieds.proModal.premium.bestValue")}
            </span>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
                <p className="text-base font-bold">{t("classifieds.proModal.premium.label")}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black">{t("classifieds.proModal.premium.price")}</p>
                <p className="text-[10px] text-muted-foreground">{t("classifieds.proModal.premium.period")}</p>
              </div>
            </div>
            <ul className="space-y-1">
              {premiumFeatures.map(t2 => (
                <li key={t2} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-[hsl(var(--gold))] shrink-0" /> {t2}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-muted-foreground">{t("classifieds.proModal.premium.savings")}</p>
          </button>
        </div>

        <Button
          className="w-full gap-2 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--gold-foreground))] font-semibold"
          onClick={handleActivate}
        >
          <Star className="h-4 w-4" />
          {selected === "free"
            ? t("classifieds.proModal.buttons.free")
            : selected === "pro"
              ? t("classifieds.proModal.buttons.pro")
              : t("classifieds.proModal.buttons.premium")}
        </Button>

        {/* Info block */}
        <div className="mt-4 rounded-xl bg-muted/50 border border-border/40 p-3">
          <p className="text-xs text-muted-foreground">
            {t("classifieds.proModal.info")}
          </p>
        </div>
      </div>
    </div>
  );
}
