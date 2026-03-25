import { useState, useMemo } from "react";
import { PlusCircle, Megaphone, Search as SearchIcon, Star, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NtFilters from "@/components/nudim-trazim/NtFilters";
import NtCategoryChips from "@/components/nudim-trazim/NtCategoryChips";
import NtAdCard from "@/components/nudim-trazim/NtAdCard";
import NtAdDetail from "@/components/nudim-trazim/NtAdDetail";
import NtSubmitForm from "@/components/nudim-trazim/NtSubmitForm";
import NtProModal from "@/components/nudim-trazim/NtProModal";
import type { NtAd } from "@/lib/nudim-trazim-constants";
import { DEMO_ADS } from "@/lib/nudim-trazim-constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHistorySearchState } from "@/hooks/useHistorySearchState";
import { useSectionT } from "@/hooks/useSectionT";
import { useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";

export default function NudimTrazim() {
  const { t } = useLanguage();
  const st = useSectionT();
  const navigate = useNavigate();
  const { searchParams, setSearchState } = useHistorySearchState();
  const [filters, setFilters] = useState({
    search: "",
    type: "sve",
    category: "sve",
    city: "",
    radius: "0",
    sort: "newest",
  });
  const handleBack = () => navigateBackOrHome(navigate);

  const view = searchParams.get("view");
  const selectedAdId = searchParams.get("ad");
  const selectedAd = useMemo(
    () => DEMO_ADS.find((ad) => ad.id === selectedAdId) ?? null,
    [selectedAdId]
  );
  const showForm = view === "form";
  const showProModal = searchParams.get("modal") === "pro";

  const openAd = (ad: NtAd) => {
    setSearchState(
      { view: "detail", ad: ad.id },
      { state: { blInternalBack: true } }
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openForm = () => {
    setSearchState(
      { view: "form", ad: null },
      { state: { blInternalBack: true } }
    );
  };

  const openProModal = () => {
    setSearchState(
      { modal: "pro" },
      { state: { blInternalBack: true } }
    );
  };

  const closeCurrentView = () => navigateBackOrHome(navigate);

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
    ads.sort((a, b) => {
      if (a.is_pro && !b.is_pro) return -1;
      if (!a.is_pro && b.is_pro) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return ads;
  }, [filters]);

  if (selectedAd) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <NtAdDetail
            ad={selectedAd}
            onBack={closeCurrentView}
            onOpen={openAd}
          />
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <NtSubmitForm onClose={closeCurrentView} onProClick={openProModal} />
          <NtProModal open={showProModal} onClose={closeCurrentView} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center space-y-5">
          <button onClick={handleBack} className="mb-2 inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground">
            <ArrowLeft className="h-3 w-3" /> Nazad
          </button>
          <div className="flex justify-center">
            <Megaphone className="h-10 w-10 text-[hsl(var(--gold))]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("index.nav.offerSeek")}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {st("nt.heroDesc")}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              size="lg"
              className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-[hsl(var(--success-foreground))] gap-2 font-semibold"
              onClick={openForm}
            >
              {st("nt.offer")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 font-semibold"
              onClick={openForm}
            >
              <SearchIcon className="h-4 w-4" /> {st("nt.seek")}
            </Button>
          </div>
          <p className="text-primary-foreground/60 text-sm">
            {st("nt.freeNote")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <NtFilters filters={filters} onChange={updateFilters} />
        <NtCategoryChips active={filters.category} onSelect={handleCategoryChip} />

        <div className="rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--gold))]/10">
              <Star className="h-5 w-5 text-[hsl(var(--gold))]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">{st("nt.proTitle")}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{st("nt.proDesc")}</p>
              <ul className="mt-2 space-y-1">
                {[st("nt.proBenefit1"), st("nt.proBenefit2"), st("nt.proBenefit3")].map((txt) => (
                  <li key={txt} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-[hsl(var(--gold))] shrink-0" /> {txt}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] text-muted-foreground">{st("nt.freeNote")}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 text-xs"
              onClick={openProModal}
            >
              <Star className="mr-1 h-3 w-3" /> {st("nt.learnMore")}
            </Button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ad) => (
              <NtAdCard key={ad.id} ad={ad} onOpen={openAd} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground text-lg">{st("nt.empty")}</p>
            <Button onClick={openForm} className="gap-2">
              <PlusCircle className="h-4 w-4" /> {st("nt.postFirst")}
            </Button>
          </div>
        )}

        <section className="rounded-xl bg-muted/50 border border-border p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-foreground">{st("nt.ctaTitle")}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{st("nt.ctaDesc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" onClick={openForm} className="gap-2">
              <PlusCircle className="h-4 w-4" /> {st("nt.postFree")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
              onClick={openProModal}
            >
              <Star className="h-4 w-4" /> {st("nt.highlightPro")}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{st("nt.freeNote")}</p>
        </section>

        <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed pt-4 border-t border-border">
          {st("nt.disclaimer")}
        </p>
      </div>

      <NtProModal open={showProModal} onClose={closeCurrentView} />
    </div>
  );
}
