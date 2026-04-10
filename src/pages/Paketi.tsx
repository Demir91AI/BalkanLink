import { useNavigate } from "react-router-dom";
import { Check, Crown, FileText, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";

export default function Paketi() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const freePlan = [
    "Viza Navigator (pregled)",
    "Nudim/Tražim oglasi",
    "Kalkulator plaće",
    "Balkanci u Njemačkoj mapa",
  ];
  const premiumPlan = [
    "Smart Guide za sve formulare",
    "Viza Navigator (potpuni pristup)",
    "BalkanLink Deutsch — sve lekcije",
    "AI Asistent bez ograničenja",
    "Dokumenten-Check (1x dnevno gratis)",
    "Šabloni/Vorlagen PDF download",
    "Priority podrška",
  ];

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
            Sve što trebaš za snalaženje u Njemačkoj — na tvom jeziku.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Besplatno</p>
            <p className="text-3xl font-black">0€</p>
            <p className="text-sm text-muted-foreground mt-1">zauvijek</p>
            <div className="mt-6 space-y-3">
              {freePlan.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button disabled className="mt-6 w-full rounded-full border border-border py-3 text-sm font-semibold text-muted-foreground">
              Trenutni plan
            </button>
          </div>
          <div className="rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-3 py-0.5 text-xs font-bold text-[#0f1f3d]">
              POPULARNO
            </span>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">Premium</p>
            </div>
            <p className="text-3xl font-black">9,99€<span className="text-base font-normal text-muted-foreground">/mj.</span></p>
            <p className="text-xs text-muted-foreground mt-1">ili 99,90€ godišnje · bez PDV-a §19 UStG</p>
            <div className="mt-6 space-y-3">
              {premiumPlan.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-[hsl(var(--gold))] shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full rounded-full bg-[hsl(var(--gold))] py-3 text-sm font-bold text-[#0f1f3d] hover:opacity-90 transition-opacity"
            >
              Aktiviraj Premium
            </button>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-bold text-sm">Pojedinačni formular</p>
              <p className="text-xs text-muted-foreground">Pristup jednom Smart Guide formularu — 3,99€ jednokratno</p>
            </div>
            <button
              onClick={() => navigate("/formulari")}
              className="ml-auto rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors"
            >
              Odaberi formular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
