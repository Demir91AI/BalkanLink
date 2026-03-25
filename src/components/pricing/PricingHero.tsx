import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1F3A] py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B1F3A]/80" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container relative z-10 text-center max-w-3xl">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Preise & Leistungen
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/50 md:text-lg">
          Alles transparent – finde das passende Angebot für dich oder dein Unternehmen.
        </p>

        {/* Launch offer banner */}
        <div className="mx-auto mt-8 max-w-lg rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-6 py-4">
          <p className="text-sm font-bold text-[hsl(var(--gold))]">
            🎉 Exklusives Startangebot zur Plattform-Einführung
          </p>
          <p className="mt-1 text-xs text-white/60">
            Alle Preise gelten für die ersten 6 Monate nach dem offiziellen Plattformstart.
          </p>
        </div>

        <div className="mt-8">
          <a href="#products" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
            Angebote ansehen <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
