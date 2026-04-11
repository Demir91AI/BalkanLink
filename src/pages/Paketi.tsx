import { useNavigate } from "react-router-dom";
import { Check, Crown, ChevronLeft } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const featureKeys = [
  "paketi.f1",
  "paketi.f2",
  "paketi.f3",
  "paketi.f4",
  "paketi.f5",
  "paketi.f6",
];

export default function Paketi() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const handlePurchase = () => {
    toast.info(t("paketi.paymentSoon") + " kontakt@balkanlink.de");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <button
          onClick={() => navigateBackOrHome(navigate)}
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("common.back")}
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black">{t("paketi.title")}</h1>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            {t("paketi.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Monthly */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{t("paketi.monthly")}</p>
            <p className="text-3xl font-black">9,99€<span className="text-base font-normal text-muted-foreground">{t("paketi.perMonth")}</span></p>
            <p className="text-xs text-muted-foreground mt-1">{t("paketi.flexible")}</p>
            <div className="mt-6 space-y-3 flex-1">
              {featureKeys.map(key => (
                <div key={key} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePurchase}
              className="mt-6 w-full rounded-full border-2 border-[hsl(var(--gold))] bg-transparent py-3 text-sm font-bold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 transition-colors"
            >
              {t("paketi.activate")}
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">{t("paketi.noVat")}</p>
          </div>

          {/* Annual */}
          <div className="rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 relative flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-3 py-0.5 text-xs font-bold text-[#0f1f3d]">
              {t("paketi.popular")}
            </span>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">{t("paketi.yearly")}</p>
            </div>
            <p className="text-3xl font-black">99,90€<span className="text-base font-normal text-muted-foreground">{t("paketi.perYear")}</span></p>
            <p className="text-xs text-muted-foreground mt-1">{t("paketi.equalsMonth")}</p>
            <div className="mt-6 space-y-3 flex-1">
              {featureKeys.map(key => (
                <div key={key} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePurchase}
              className="mt-6 w-full rounded-full bg-[hsl(var(--gold))] py-3 text-sm font-bold text-[#0f1f3d] hover:opacity-90 transition-opacity"
            >
              {t("paketi.activate")}
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">{t("paketi.noVat")}</p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("paketi.paymentSoon")} <a href="mailto:kontakt@balkanlink.de" className="text-primary underline">kontakt@balkanlink.de</a>
          </p>
          <p className="text-[10px] text-muted-foreground">
            {t("paketi.allPrices")}
          </p>
        </div>
      </div>
    </div>
  );
}