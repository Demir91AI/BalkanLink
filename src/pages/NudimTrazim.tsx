import { useState, useMemo } from "react";
import { PlusCircle, Megaphone, Search as SearchIcon, Star, Check } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
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
        <div className="mx-auto max-w-7xl px-4 py-10">
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
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6b] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-5">
          <PageNavBar onBack={handleBack} />
          <div className="text-center space-y-5">
            <div className="flex justify-center">
              <Megaphone className="h-12 w-12 text-[hsl(var(--gold))]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("index.nav.offerSeek")}</h1>
            <p className="text-white/60 max-w-[500px] mx-auto text-base sm:text-lg leading-relaxed">
              {st("nt.heroDesc")}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={openForm}
                className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold-light))] text-black font-bold px-8 py-3 rounded-full transition-colors"
              >
                {st("nt.offer")}
              </button>
              <button
                onClick={openForm}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors font-semibold flex items-center gap-2"
              >
                <SearchIcon className="h-4 w-4" /> {st("nt.seek")}
              </button>
            </div>
            <p className="text-white/50 text-sm">
              {st("nt.freeNote")}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[900px] px-4">
        {/* Filter card overlapping hero */}
        <div className="-mt-6 relative z-10 rounded-2xl bg-white shadow-md border border-border p-4 mb-8">
          <NtFilters filters={filters} onChange={updateFilters} />
          <div className="mt-3 overflow-x-auto">
            <NtCategoryChips active={filters.category} onSelect={handleCategoryChip} />
          </div>
        </div>

        <div className="space-y-8 pb-10">
          {/* Pro info box */}
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

          {/* Ad cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((ad) => (
                <div key={ad.id} className="rounded-xl border border-border bg-white shadow-sm p-4">
                  <div className="mb-2">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      ad.type === "nudim"
                        ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {ad.type === "nudim" ? "NUDIM" : "TRAŽIM"}
                    </span>
                  </div>
                  <NtAdCard ad={ad} onOpen={openAd} />
                </div>
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

          {/* CTA */}
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
                className="gap-2 border-[hsl(var(--gold))] text-[hsl(var(--gold))] font-semibold hover:bg-[hsl(var(--gold))]/15 hover:border-[hsl(var(--gold))]"
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
      </div>

      <NtProModal open={showProModal} onClose={closeCurrentView} />
    </div>
  );
}
