import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { PlusCircle, Megaphone, Search as SearchIcon, ClipboardList } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { Button } from "@/components/ui/button";
import NtFilters from "@/components/nudim-trazim/NtFilters";
import NtCategoryChips from "@/components/nudim-trazim/NtCategoryChips";
import NtAdCard from "@/components/nudim-trazim/NtAdCard";
import NtAdDetail from "@/components/nudim-trazim/NtAdDetail";
import NtSubmitForm from "@/components/nudim-trazim/NtSubmitForm";
import type { NtAd } from "@/lib/nudim-trazim-constants";
import { useHistorySearchState } from "@/hooks/useHistorySearchState";
import { useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function NudimTrazim() {
  const { t } = useTranslation("pages");
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

  // Fetch real ads from DB
  const { data: dbAds = [] } = useQuery({
    queryKey: ["nt-ads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ads_public" as any)
        .select("id, type, title, category, city, description, contact_type, contact_value, created_at, bundesland, city_lat, city_lng, domain, user_id")
        .eq("status", "ACTIVE")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as any[]).map((row: any): NtAd => ({
        id: row.id,
        type: row.type === "OFFERING" ? "nudim" : "trazim",
        title: row.title,
        category: row.category ?? "ostalo",
        city: row.city,
        description: row.description,
        contact_type: row.contact_type === "PHONE" ? "phone" : "email",
        contact_value: row.contact_value,
        created_at: row.created_at,
        is_pro: false,
      }));
    },
  });

  const view = searchParams.get("view");
  const selectedAdId = searchParams.get("ad");
  const selectedAd = useMemo(
    () => dbAds.find((ad) => ad.id === selectedAdId) ?? null,
    [selectedAdId, dbAds]
  );
  const showForm = view === "form";

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


  const closeCurrentView = () => navigateBackOrHome(navigate);

  const updateFilters = (partial: Partial<typeof filters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const handleCategoryChip = (cat: string) => updateFilters({ category: cat });

  const filtered = useMemo(() => {
    let ads = [...dbAds];
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
  }, [filters, dbAds]);

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
        <div className="mx-auto max-w-7xl px-4 py-10">
          <NtSubmitForm onClose={closeCurrentView} />
        </div>
      </div>
    );
  }

  const heroStats = [
    { value: "100%", label: t("classifieds.hero.statFree") },
    { value: "7", label: t("classifieds.hero.statCategories") },
    { value: "🇩🇪", label: t("classifieds.hero.statGermany") },
  ];


  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("classifieds.seoTitle")} description={t("classifieds.seoDescription")} path="/nudim-trazim" />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f1f3d 40%, #1a2a50 100%)' }}>
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 30%, rgba(59,130,246,0.06) 0%, transparent 60%)'
        }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-14 md:py-20">
          <Breadcrumbs variant="dark" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 mb-5">
              <Megaphone className="h-3.5 w-3.5 text-[#C9A84C]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">{t("classifieds.hero.badge")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              {t("classifieds.hero.headlineLine1")}<br />
            <span style={{ background: 'linear-gradient(90deg, #C9A84C, #F0D080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t("classifieds.hero.headlineLine2")}
              </span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {t("classifieds.hero.subline")}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={openForm}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-[#0f1f3d] transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #F0D080)' }}
              >
                <PlusCircle className="h-4 w-4" /> {t("classifieds.hero.ctaPostFree")}
              </button>
              <button
                onClick={openForm}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/10 hover:border-white/40"
              >
                <SearchIcon className="h-4 w-4" /> {t("classifieds.hero.ctaSearch")}
              </button>
            </div>
            <div className="flex flex-wrap gap-6">
              {heroStats.map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-lg font-black text-white">{s.value}</span>
                  <span className="text-[12px] text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="-mt-6 relative z-10 rounded-2xl bg-white shadow-md border border-border p-4 mb-8">
          <NtFilters filters={filters} onChange={updateFilters} />
          <div className="mt-3 overflow-x-auto">
            <NtCategoryChips active={filters.category} onSelect={handleCategoryChip} />
          </div>
        </div>

        <div className="space-y-8 pb-10">

          {/* Ad cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((ad) => (
                <div key={ad.id} className="rounded-2xl bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ border: '1px solid #F0EAD8', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div className="mb-2">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      ad.type === "nudim"
                        ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {ad.type === "nudim" ? t("classifieds.ad.labelOffering") : t("classifieds.ad.labelSeeking")}
                    </span>
                  </div>
                  <NtAdCard ad={ad} onOpen={openAd} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t("classifieds.empty.title")}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t("classifieds.empty.body")}
              </p>
              <Button onClick={openForm} size="lg" className="gap-2 mt-2">
                <PlusCircle className="h-4 w-4" /> {t("classifieds.empty.cta")}
              </Button>
            </div>
          )}

          {/* CTA */}
          <section className="rounded-xl bg-muted/50 border border-border p-8 text-center space-y-4">
            <h2 className="text-xl font-bold text-foreground">{t("classifieds.ctaSection.title")}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t("classifieds.ctaSection.body")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg" onClick={openForm} className="gap-2">
                <PlusCircle className="h-4 w-4" /> {t("classifieds.ctaSection.post")}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">{t("classifieds.ctaSection.freeNote")}</p>
          </section>

          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed pt-4 border-t border-border">
            {t("classifieds.footerNote")}
          </p>
        </div>
      </div>

    </div>
  );
}
