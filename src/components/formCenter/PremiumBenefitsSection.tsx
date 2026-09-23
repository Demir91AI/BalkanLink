import { Crown, FileText, Map, Bot, FileSearch, GraduationCap, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";

export default function PremiumBenefitsSection() {
  const navigate = useNavigate();

  return (
    <section className="mt-10 rounded-2xl border-2 border-[hsl(var(--gold))]/30 overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-8 text-center"
        style={{
          background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
        }}
      >
        <Crown className="mx-auto mb-3 h-10 w-10 text-white" />
        <h2 className="text-xl font-black text-white">BalkanLink Plus</h2>
        <p className="mt-2 text-sm text-white/90 max-w-md mx-auto">
          Sve što trebaš za život u Njemačkoj — na jednom mjestu.
          Otključaj pristup svim formularima, vodičima i alatima.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="bg-card p-6 space-y-6">
        {/* Formulari */}
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            <FileText className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <div>
            <h3 className="text-sm font-bold">📋 FORMULARI (sve kategorije)</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>25+ Musterformulara — primjeri pravilno popunjenih obrazaca za Bürgergeld, Kindergeld, Elterngeld, Wohngeld, BAföG i još 20+ formulara</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Smart Guide za svaki formular — korak po korak</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Tačna uputstva šta upisati u svako polje</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Viza Navigator */}
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            <Map className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <div>
            <h3 className="text-sm font-bold">🗺️ VIZA NAVIGATOR</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Kompletni vodiči za sve tipove viza i dozvola</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Dokumenti, rokovi, adrese ureda, savjeti za termin</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Vodiči za sve balkanske države</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BalkanLink Asistent */}
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            <Bot className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <div>
            <h3 className="text-sm font-bold">🤖 BALKANLINK ASISTENT</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Neograničena pitanja o njemačkim zakonima i pravilima</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Personalizirani savjeti za tvoju situaciju</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dokumenten-Check */}
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            <FileSearch className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <div>
            <h3 className="text-sm font-bold">📄 DOKUMENTEN-CHECK</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Upload dokumenata + automatska provjera ispravnosti</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Deutsch Trainer */}
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--gold))]" />
          </div>
          <div>
            <h3 className="text-sm font-bold">🇩🇪 DEUTSCH TRAINER</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Kompletni A1–C2 kurs (48 lekcija)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Uključeno u BalkanLink Plus</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-border/60 pt-5 text-center space-y-3">
          <p className="text-sm font-bold text-foreground">
            <PlusCtaLabel note />
          </p>
          <p className="text-[10px] text-muted-foreground">
            Svi iznosi bez PDV-a (§19 UStG)
          </p>
          <button
            onClick={() => navigate("/paketi")}
            className="w-full max-w-xs mx-auto block rounded-full py-3.5 text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
            }}
          >
            <PlusCtaLabel />
          </button>
          <button
            onClick={() => navigate("/paketi")}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Pogledaj sve što je uključeno →
          </button>
        </div>
      </div>
    </section>
  );
}
