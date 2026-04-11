import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Info, Search } from "lucide-react";
import { RADNO_PRAVO_CATEGORIES, getGuidesByCategory, type RadnoPravoGuide } from "@/lib/radno-pravo-data";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";

const GOLD = "hsl(var(--gold))";

export default function RadnoPravo() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  return (
    <>
      <SEO
        title="Radno pravo u Njemačkoj | BalkanLink"
        description="Sve o radnom pravu u Njemačkoj: ugovor, plata, odmor, otkaz, Minijob i više. Aktuelno za 2026. godinu."
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />

        {/* Header */}
        <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">Radno pravo</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Prava i obaveze na radnom mjestu u Njemačkoj · Stand 2026</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pretraži teme…"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 transition-shadow"
          />
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
            const guides = getGuidesByCategory(cat.id).filter(
              (g) => !q || g.title.toLowerCase().includes(q) || g.germanTerm.toLowerCase().includes(q)
            );
            if (guides.length === 0) return null;
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
          {q && RADNO_PRAVO_CATEGORIES.every((cat) => getGuidesByCategory(cat.id).filter((g) => g.title.toLowerCase().includes(q) || g.germanTerm.toLowerCase().includes(q)).length === 0) && (
            <p className="text-center text-sm text-muted-foreground py-8">Nema rezultata za „{query}"</p>
          )}
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
