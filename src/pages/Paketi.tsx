import { useNavigate } from "react-router-dom";
import { Check, Crown, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";
import { toast } from "sonner";

const features = [
  "Svi Musterformulare — PDF download",
  "Smart Guides — korak po korak",
  "Viza Navigator — sve balkanske države",
  "Dokumenten-Check — 1 provjera dnevno",
  "BalkanLink Deutsch — prve 3 lekcije po nivou",
  "Nudim/Tražim — besplatni oglasi",
];

export default function Paketi() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handlePurchase = () => {
    toast.info("Plaćanje dolazi uskoro — kontaktiraj nas na kontakt@balkanlink.de");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <button
          onClick={() => navigateBackOrHome(navigate)}
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("nav.back")}
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black">BalkanLink Premium</h1>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            Sve što trebaš za život u Njemačkoj — na jednom mjestu
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Monthly */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Mjesečno</p>
            <p className="text-3xl font-black">9,99€<span className="text-base font-normal text-muted-foreground">/mj.</span></p>
            <p className="text-xs text-muted-foreground mt-1">Fleksibilno, bez ugovora</p>
            <div className="mt-6 space-y-3 flex-1">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePurchase}
              className="mt-6 w-full rounded-full border-2 border-[hsl(var(--gold))] bg-transparent py-3 text-sm font-bold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 transition-colors"
            >
              Aktiviraj Premium
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">bez PDV-a prema §19 UStG</p>
          </div>

          {/* Annual */}
          <div className="rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 relative flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-3 py-0.5 text-xs font-bold text-[#0f1f3d]">
              POPULARNO — uštedi 20%
            </span>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">Godišnje</p>
            </div>
            <p className="text-3xl font-black">99,90€<span className="text-base font-normal text-muted-foreground">/god.</span></p>
            <p className="text-xs text-muted-foreground mt-1">= 8,33€ / mjesec</p>
            <div className="mt-6 space-y-3 flex-1">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePurchase}
              className="mt-6 w-full rounded-full bg-[hsl(var(--gold))] py-3 text-sm font-bold text-[#0f1f3d] hover:opacity-90 transition-opacity"
            >
              Aktiviraj Premium
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">bez PDV-a prema §19 UStG</p>
          </div>
        </div>

        {/* Note */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Plaćanje uskoro dostupno. Za rani pristup: <a href="mailto:kontakt@balkanlink.de" className="text-primary underline">kontakt@balkanlink.de</a>
          </p>
          <p className="text-[10px] text-muted-foreground">
            Sve cijene bez PDV-a prema §19 UStG. Kleinunternehmerregelung.
          </p>
        </div>
      </div>
    </div>
  );
}
