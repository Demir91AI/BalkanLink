import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PricingFreeCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
      <h2 className="text-lg font-bold">Besplatno</h2>
      <p className="mt-1 text-3xl font-bold">0€</p>
      <p className="text-xs text-muted-foreground mb-6">Zauvijek besplatno</p>

      <div className="flex-1 space-y-4 text-sm">
        {/* Besplatni formulari */}
        <div>
          <p className="font-bold text-xs text-foreground mb-1.5">📋 BESPLATNI FORMULARI</p>
          <ul className="space-y-1.5">
            <Ft yes>Anmeldung, Steuer-ID, Führerschein, Fahrzeugzulassung, Führungszeugnis</Ft>
          </ul>
        </div>

        {/* Šabloni */}
        <div>
          <p className="font-bold text-xs text-foreground mb-1.5">✉️ ŠABLONI</p>
          <ul className="space-y-1.5">
            <Ft yes>Kündigung + Mietkündigung šablon</Ft>
          </ul>
        </div>

        {/* Kalkulatori */}
        <div>
          <p className="font-bold text-xs text-foreground mb-1.5">🧮 KALKULATORI</p>
          <ul className="space-y-1.5">
            <Ft yes>Brutto-Netto kalkulator</Ft>
          </ul>
        </div>

        {/* Viza */}
        <div>
          <p className="font-bold text-xs text-foreground mb-1.5">✈️ VIZA NAVIGATOR</p>
          <ul className="space-y-1.5">
            <Ft yes>Osnovna info o vizama</Ft>
          </ul>
        </div>

        {/* Asistent */}
        <div>
          <p className="font-bold text-xs text-foreground mb-1.5">🤖 ASISTENT</p>
          <ul className="space-y-1.5">
            <Ft yes>5 pitanja dnevno</Ft>
          </ul>
        </div>

        {/* Nije uključeno */}
        <div className="border-t border-border/60 pt-3">
          <p className="font-bold text-xs text-muted-foreground mb-1.5">NIJE UKLJUČENO</p>
          <ul className="space-y-1.5">
            <Ft no>Musterformulari</Ft>
            <Ft no>Smart Guides</Ft>
            <Ft no>DeutschTrainer</Ft>
            <Ft no>Dokumenten-Check (2,99€/kom)</Ft>
          </ul>
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-6 w-full rounded-xl border-[hsl(var(--success))] text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/10"
        onClick={() => navigate("/register")}
      >
        Počni besplatno →
      </Button>
    </div>
  );
}

function Ft({ yes, no, children }: { yes?: boolean; no?: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex items-start gap-2 text-xs ${no ? "text-muted-foreground" : ""}`}>
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
    </li>
  );
}
