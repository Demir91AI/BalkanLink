import { useNavigate } from "react-router-dom";
import { Check, X, Crown, ChevronLeft } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Paketi() {
  const navigate = useNavigate();
  const handlePurchase = () => {
    toast.info("Plaćanje uskoro dostupno. Za rani pristup: kontakt@balkanlink.de");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <button
          onClick={() => navigateBackOrHome(navigate)}
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Nazad
        </button>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-black">BalkanLink Premium</h1>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            Sve što trebaš za život u Njemačkoj — na jednom mjestu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Besplatno */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Besplatno</p>
            <p className="text-3xl font-black">0€</p>
            <p className="text-xs text-muted-foreground mt-1">Zauvijek besplatno</p>

            <div className="mt-6 space-y-4 flex-1">
              <Cat title="📋 BESPLATNI FORMULARI">
                <Ft yes>Anmeldung, Steuer-ID, Führerschein, Fahrzeugzulassung, Führungszeugnis</Ft>
              </Cat>
              <Cat title="✉️ ŠABLONI">
                <Ft yes>Kündigung + Mietkündigung šablon</Ft>
              </Cat>
              <Cat title="🧮 KALKULATORI">
                <Ft yes>Brutto-Netto kalkulator</Ft>
              </Cat>
              <Cat title="✈️ VIZA NAVIGATOR">
                <Ft yes>Osnovna info o vizama</Ft>
              </Cat>
              <Cat title="🤖 ASISTENT">
                <Ft yes>5 pitanja dnevno</Ft>
              </Cat>
              <div className="border-t border-border/60 pt-3">
                <p className="font-bold text-[11px] text-muted-foreground mb-1.5">NIJE UKLJUČENO</p>
                <div className="space-y-1.5">
                  <Ft no>Musterformulari</Ft>
                  <Ft no>Smart Guides</Ft>
                  <Ft no>DeutschTrainer</Ft>
                  <Ft no>Dokumenten-Check (2,99€/kom)</Ft>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/register")}
              className="mt-6 w-full rounded-full border-2 border-[hsl(var(--success))] bg-transparent py-3 text-sm font-bold text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/10 transition-colors"
            >
              Počni besplatno →
            </button>
          </div>

          {/* Premium — Godišnje */}
          <div className="rounded-2xl border-2 border-[hsl(var(--gold))] bg-card p-6 relative flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--gold))] px-3 py-0.5 text-xs font-bold text-[#0f1f3d]">
              POPULARNO — uštedi 20%
            </span>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-[hsl(var(--gold))]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gold))]">Premium</p>
            </div>
            <p className="text-3xl font-black">9,99€<span className="text-base font-normal text-muted-foreground">/mj.</span></p>
            <p className="text-xs text-muted-foreground mt-1">ili 99,90€/god. (= 8,33€/mj.)</p>

            <div className="mt-6 space-y-4 flex-1">
              <Cat title="📋 FORMULARI">
                <Ft yes>25+ Musterformulara — PDF download</Ft>
                <Ft yes>Smart Guide za svaki formular</Ft>
                <Ft yes>Tačna uputstva šta upisati u svako polje</Ft>
                <Ft yes>Sve kategorije: Bürgergeld, Kindergeld, Elterngeld, Wohngeld, BAföG i još 20+</Ft>
              </Cat>
              <Cat title="✈️ VIZA NAVIGATOR">
                <Ft yes>Kompletni vodiči za sve tipove viza</Ft>
                <Ft yes>Dokumenti, rokovi, adrese ureda</Ft>
                <Ft yes>Savjeti za termin + Vorabzustimmung</Ft>
                <Ft yes>Sve balkanske države</Ft>
              </Cat>
              <Cat title="🤖 BALKANLINK ASISTENT">
                <Ft yes>Neograničena pitanja</Ft>
                <Ft yes>Personalizirani savjeti za tvoju situaciju</Ft>
              </Cat>
              <Cat title="🔍 DOKUMENTEN-CHECK">
                <Ft yes>1 provjera dokumenta dnevno gratis</Ft>
                <Ft yes>Objašnjenje na tvom jeziku</Ft>
              </Cat>
              <Cat title="🇩🇪 DEUTSCH TRAINER">
                <Ft yes>Kompletan A1–C2 kurs (48 lekcija)</Ft>
                <Ft yes>Wertgutschein — uči i zarađuj Amazon vaučere</Ft>
              </Cat>
              <Cat title="✉️ ŠABLONI / VORLAGEN">
                <Ft yes>Svi šabloni + PDF download</Ft>
                <Ft yes>Bewerbungsschreiben, Lebenslauf i još 10+</Ft>
              </Cat>
              <Cat title="📢 PRO OGLASI">
                <Ft yes>2 Pro oglasa uključena/mj.</Ft>
              </Cat>
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

        {/* Comparison Table */}
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-bold text-center mb-6">Besplatno vs. Premium</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold">Funkcija</th>
                  <th className="text-center py-3 px-4 font-semibold">
                    <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs">0€</span>
                  </th>
                  <th className="text-center py-3 px-4 font-semibold">
                    <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: "hsl(var(--gold))" }}>
                      9,99€/mj.
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="py-2.5 px-4 font-medium">{r.label}</td>
                    <td className="py-2.5 px-4 text-center text-xs">{r.free}</td>
                    <td className="py-2.5 px-4 text-center text-xs font-medium">{r.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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

const comparisonRows = [
  { label: "Musterformulari", free: "❌", premium: "✅ Svi" },
  { label: "Smart Guides", free: "❌", premium: "✅ Svi koraci" },
  { label: "Viza Navigator", free: "Osnovno", premium: "✅ Kompletno" },
  { label: "Dokumenten-Check", free: "2,99€/kom", premium: "✅ 1×/dan gratis" },
  { label: "Šabloni", free: "✅ 2 gratis", premium: "✅ Svi + PDF" },
  { label: "Asistent", free: "⚠️ 5/dan", premium: "✅ Neograničeno" },
  { label: "DeutschTrainer", free: "❌", premium: "✅ A1–C2" },
  { label: "Wertgutschein", free: "❌", premium: "✅ Do 30€ vaučer" },
  { label: "Pro oglasi", free: "2,99€/oglas", premium: "✅ 2/mj. uključeno" },
  { label: "Notifikacije", free: "❌", premium: "✅ Zakonske promjene" },
  { label: "Nove funkcije", free: "❌", premium: "✅ Rani pristup" },
];

function Cat({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-bold text-[11px] text-foreground mb-1.5">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Ft({ yes, no, children }: { yes?: boolean; no?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex items-start gap-2 text-xs ${no ? "text-muted-foreground" : ""}`}>
      {yes && (
        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--success))]/10">
          <Check className="h-2.5 w-2.5 text-[hsl(var(--success))]" />
        </span>
      )}
      {no && (
        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-muted">
          <X className="h-2.5 w-2.5 text-muted-foreground" />
        </span>
      )}
      {children}
    </div>
  );
}
