import { useState, useMemo } from "react";
import { PlusCircle, Megaphone, Search as SearchIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NtFilters from "@/components/nudim-trazim/NtFilters";
import NtCategoryChips from "@/components/nudim-trazim/NtCategoryChips";
import NtAdCard from "@/components/nudim-trazim/NtAdCard";
import NtAdDetail from "@/components/nudim-trazim/NtAdDetail";
import NtSubmitForm from "@/components/nudim-trazim/NtSubmitForm";
import type { NtAd } from "@/lib/nudim-trazim-constants";
import { DEMO_ADS } from "@/lib/nudim-trazim-constants";

export default function NudimTrazim() {
  const [filters, setFilters] = useState({
    search: "",
    type: "sve",
    category: "sve",
    city: "",
    radius: "0",
    sort: "newest",
  });
  const [selectedAd, setSelectedAd] = useState<NtAd | null>(null);
  const [showForm, setShowForm] = useState(false);

  const updateFilters = (partial: Partial<typeof filters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const handleCategoryChip = (cat: string) => updateFilters({ category: cat });

  const filtered = useMemo(() => {
    let ads = [...DEMO_ADS];
    if (filters.type !== "sve") ads = ads.filter((a) => a.type === filters.type);
    if (filters.category !== "sve") ads = ads.filter((a) => a.category === filters.category);
    if (filters.city) {
      const q = filters.city.toLowerCase();
      ads = ads.filter((a) => a.city.toLowerCase().includes(q));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      ads = ads.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q)
      );
    }
    return ads;
  }, [filters]);

  // Detail view
  if (selectedAd) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <NtAdDetail
            ad={selectedAd}
            onBack={() => setSelectedAd(null)}
            onOpen={(a) => {
              setSelectedAd(a);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    );
  }

  // Submit form view
  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <NtSubmitForm onClose={() => setShowForm(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center space-y-5">
          <div className="flex justify-center">
            <Megaphone className="h-10 w-10 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Nudim / Tražim</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Ponudi, pronađi ili zatraži pomoć, uslugu, posao, smještaj i još mnogo toga –
            sve na jednom mjestu.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              size="lg"
              className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-[hsl(var(--success-foreground))] gap-2 font-semibold"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Nudim
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 font-semibold"
              onClick={() => {
                setShowForm(true);
              }}
            >
              <SearchIcon className="h-4 w-4" /> Tražim
            </Button>
          </div>
          <p className="text-primary-foreground/60 text-sm">
            Jednostavni oglasi za našu zajednicu u Njemačkoj.
          </p>
        </div>
      </section>

      {/* ─── Main content ─── */}
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Filters */}
        <NtFilters filters={filters} onChange={updateFilters} />

        {/* Category chips */}
        <NtCategoryChips active={filters.category} onSelect={handleCategoryChip} />

        {/* PRO hint */}
        <div className="flex items-center gap-3 rounded-lg border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-4 text-sm">
          <Star className="h-5 w-5 text-[hsl(var(--gold))] shrink-0" />
          <p className="text-muted-foreground">
            <strong className="text-foreground">PRO oglasi</strong> – istaknite svoj oglas i
            dosegnite više ljudi.{" "}
            <Badge variant="outline" className="ml-1 text-[10px] align-middle">
              PRO uskoro
            </Badge>
          </p>
        </div>

        {/* Listings */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ad) => (
              <NtAdCard key={ad.id} ad={ad} onOpen={setSelectedAd} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground text-lg">
              Trenutno nema oglasa u ovoj kategoriji.
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <PlusCircle className="h-4 w-4" /> Objavi prvi oglas
            </Button>
          </div>
        )}

        {/* CTA section */}
        <section className="rounded-xl bg-muted/50 border border-border p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-foreground">Želiš objaviti oglas?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Objavi brzo i jednostavno šta nudiš ili šta tražiš.
          </p>
          <Button size="lg" onClick={() => setShowForm(true)} className="gap-2">
            <PlusCircle className="h-4 w-4" /> Objavi oglas
          </Button>
        </section>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed pt-4 border-t border-border">
          BalkanLink dient in diesem Bereich ausschließlich als Vermittlungs- und
          Anzeigenplattform. Für Inhalte, Vereinbarungen oder Leistungen der Nutzer wird keine
          Haftung übernommen.
        </p>
      </div>
    </div>
  );
}
