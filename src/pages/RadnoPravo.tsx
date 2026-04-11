import { useNavigate } from "react-router-dom";
import { Scale, ChevronRight, Info } from "lucide-react";
import { RADNO_PRAVO_CATEGORIES, getGuidesByCategory, type RadnoPravoGuide } from "@/lib/radno-pravo-data";
import { SEO } from "@/components/SEO";

const GOLD = "hsl(var(--gold))";

export default function RadnoPravo() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Radno pravo u Njemačkoj | BalkanLink"
        description="Sve o radnom pravu u Njemačkoj: ugovor, plata, odmor, otkaz, Minijob i više. Aktuelno za 2025/2026. godinu."
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl shadow-md"
              style={{ background: `linear-gradient(135deg, ${GOLD}, hsl(var(--gold-dark)))` }}
            >
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">Radno pravo</h1>
              <p className="text-xs text-muted-foreground">Stand 2025/2026 · Njemačka</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Profesionalni vodič kroz najvažnije teme radnog prava u Njemačkoj. Svaki vodič sadrži konkretna pravila, praktične primjere i upozorenja — na bosanskom jeziku.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Ovaj sadržaj je informativnog karaktera i <strong>ne predstavlja pravni savjet</strong>. Za konkretne slučajeve konsultiraj advokata za radno pravo ili nadležne institucije.
          </p>
        </div>

        {/* Category grid */}
        <div className="space-y-8">
          {RADNO_PRAVO_CATEGORIES.map((cat) => {
            const guides = getGuidesByCategory(cat.id);
            const Icon = cat.icon;
            return (
              <section key={cat.id}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4" style={{ color: GOLD }} />
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">{cat.label}</h2>
                  <span className="text-[10px] text-muted-foreground ml-1">({guides.length})</span>
                </div>
                <div className="grid gap-2">
                  {guides.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} onClick={() => navigate(`/radno-pravo/${guide.slug}`)} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

function GuideCard({ guide, onClick }: { guide: RadnoPravoGuide; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center justify-between w-full rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-[hsl(var(--gold))] hover:shadow-md active:scale-[0.99]"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground group-hover:text-[hsl(var(--gold))] transition-colors">
          {guide.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{guide.germanTerm}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-[hsl(var(--gold))] transition-colors" />
    </button>
  );
}
