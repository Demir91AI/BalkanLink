import { useNavigate } from "react-router-dom";
import { ChevronRight, Info } from "lucide-react";
import { BIZNIS_CATEGORIES, getBiznisGuidesByCategory, type BiznisGuide } from "@/lib/biznis-data";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";

const GOLD = "hsl(var(--gold))";

export default function BiznisNjemacka() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Biznis u Njemačkoj — Gewerbe vodič | BalkanLink"
        description="Sve o pokretanju i vođenju biznisa u Njemačkoj: Gewerbe, porezi, dokumenti, obaveze. Aktuelno za 2025/2026."
      />

      <div className="mx-auto max-w-3xl px-4 py-6 pb-28">
        <PageNavBar />

        <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">Biznis u Njemačkoj</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-6">Gewerbe, samozaposlenje i poslovanje — vodič za početnike · Stand 2026</p>

        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Ovaj sadržaj je informativnog karaktera i <strong>ne predstavlja pravni, porezni niti poslovni savjet</strong>. Za konkretne slučajeve konsultiraj Steuerberater, advokata ili nadležne institucije.
          </p>
        </div>

        <div className="space-y-8">
          {BIZNIS_CATEGORIES.map((cat) => {
            const guides = getBiznisGuidesByCategory(cat.id);
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
                    <GuideCard key={guide.slug} guide={guide} onClick={() => navigate(`/biznis/${guide.slug}`)} />
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

function GuideCard({ guide, onClick }: { guide: BiznisGuide; onClick: () => void }) {
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
