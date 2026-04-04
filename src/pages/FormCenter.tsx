import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ChevronLeft, FileText, ChevronDown, ChevronRight, Info, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getGuideBySlug } from "@/lib/guide-data";
import { formCatalog, getAllFormEntries, type FormEntry } from "@/lib/form-catalog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import FormFreeContent from "@/components/FormFreeContent";
import FormSmartGuide from "@/components/FormSmartGuide";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
import AnmeldungGuideContent from "@/components/AnmeldungGuideContent";
import SteuerIdGuideContent from "@/components/guides/SteuerIdGuideContent";
import KrankenkasseGuideContent from "@/components/guides/KrankenkasseGuideContent";
import ElterngeldGuideContent from "@/components/guides/ElterngeldGuideContent";
import BurgergeldGuideContent from "@/components/guides/BurgergeldGuideContent";
import WohngeldGuideContent from "@/components/guides/WohngeldGuideContent";
import MutterschaftsgeldGuideContent from "@/components/guides/MutterschaftsgeldGuideContent";
import KinderzuschlagGuideContent from "@/components/guides/KinderzuschlagGuideContent";
import KrippengeldBayernGuideContent from "@/components/guides/KrippengeldBayernGuideContent";
import AnlageBBGuideContent from "@/components/guides/AnlageBBGuideContent";
import AnlageSVGuideContent from "@/components/guides/AnlageSVGuideContent";
import AnlageVEGuideContent from "@/components/guides/AnlageVEGuideContent";
import AnlageHGGuideContent from "@/components/guides/AnlageHGGuideContent";
import AnlageMEBGuideContent from "@/components/guides/AnlageMEBGuideContent";
import AnlageUFGuideContent from "@/components/guides/AnlageUFGuideContent";
import AnlageSEGuideContent from "@/components/guides/AnlageSEGuideContent";
import ArbeitsbescheinigungGuideContent from "@/components/guides/ArbeitsbescheinigungGuideContent";
import AntragsruecknahmeGuideContent from "@/components/guides/AntragsruecknahmeGuideContent";
import HauptantragGuideContent from "@/components/guides/HauptantragGuideContent";
import WeiterbewilligungGuideContent from "@/components/guides/WeiterbewilligungGuideContent";
import AnlageKDUGuideContent from "@/components/guides/AnlageKDUGuideContent";
import AnlageEKGuideContent from "@/components/guides/AnlageEKGuideContent";
import AnlageEKSGuideContent from "@/components/guides/AnlageEKSGuideContent";
import AnlageVMGuideContent from "@/components/guides/AnlageVMGuideContent";
import AnlageWEPGuideContent from "@/components/guides/AnlageWEPGuideContent";
import AnlageKIGuideContent from "@/components/guides/AnlageKIGuideContent";
import AnlageUH1GuideContent from "@/components/guides/AnlageUH1GuideContent";
import AnlageUH2GuideContent from "@/components/guides/AnlageUH2GuideContent";
import AnlageUH3GuideContent from "@/components/guides/AnlageUH3GuideContent";
import AnfrageNichterreichbarkeitGuideContent from "@/components/guides/AnfrageNichterreichbarkeitGuideContent";
import FuehrerscheinGuideContent from "@/components/formulare/FuehrerscheinGuide";
import FahrzeugzulassungGuide from "@/components/formulare/FahrzeugzulassungGuide";
import { navigateBackOrHome } from "@/lib/navigation";

type LangKey = "de" | "bs" | "en";

function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

/* ─── Bürgergeld Info Modal ─── */
function BuergergeldInfoModal({ open, onClose, onOpenForm }: { open: boolean; onClose: () => void; onOpenForm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        <h3 className="text-lg font-bold mb-3">Šta je Bürgergeld?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Bürgergeld (ranije Hartz IV) je osnovna socijalna pomoć u Njemačkoj prema SGB II. Namijenjen je osobama koje su sposobne za rad ali nemaju dovoljno prihoda za osnovne životne potrebe.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Zahtjev se podnosi kod Jobcentra i uključuje glavni formular (Hauptantrag) te niz priloga zavisno od vaše situacije.
        </p>
        <h4 className="text-sm font-bold mb-2">⚠️ Najčešće greške:</h4>
        <ul className="text-sm text-muted-foreground space-y-1 mb-5">
          <li>• Kasno podnošenje — Bürgergeld NE ide retroaktivno</li>
          <li>• Zaboravljena Anlage VM — obavezno uz Hauptantrag</li>
          <li>• Nepotpuni kontoauszüge (izvodi iz banke)</li>
          <li>• Pogrešna porezna klasa ili IBAN</li>
        </ul>
        <div className="flex gap-3">
          <button onClick={onOpenForm} className="flex-1 rounded-full py-2.5 text-sm font-bold text-[hsl(var(--gold-foreground))]" style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}>
            Otvori formular
          </button>
          <button onClick={onClose} className="flex-1 rounded-full py-2.5 text-sm font-medium border border-border text-muted-foreground hover:bg-muted">
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Guide Content (right side) ─── */
function GuideContent({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);
  const { t, language } = useLanguage();
  const lang = getLangKey(language);

  /* Custom pages */
  if (slug === "kindergeld") return <KindergeldGuideContent />;
  if (slug === "anmeldung") return <AnmeldungGuideContent />;
  if (slug === "steuer-id") return <SteuerIdGuideContent />;
  if (slug === "krankenkasse") return <KrankenkasseGuideContent />;
  if (slug === "elterngeld") return <ElterngeldGuideContent />;
  if (slug === "burgergeld" || slug === "buergergeld") return <BurgergeldGuideContent />;
  if (slug === "wohngeld") return <WohngeldGuideContent />;
  if (slug === "mutterschaftsgeld") return <MutterschaftsgeldGuideContent />;
  if (slug === "kinderzuschlag") return <KinderzuschlagGuideContent />;
  if (slug === "krippengeld-bayern") return <KrippengeldBayernGuideContent />;
  if (slug === "anlage-bb") return <AnlageBBGuideContent />;
  if (slug === "anlage-sv") return <AnlageSVGuideContent />;
  if (slug === "anlage-ve") return <AnlageVEGuideContent />;
  if (slug === "anlage-hg") return <AnlageHGGuideContent />;
  if (slug === "anlage-meb") return <AnlageMEBGuideContent />;
  if (slug === "anlage-uf") return <AnlageUFGuideContent />;
  if (slug === "anlage-se") return <AnlageSEGuideContent />;
  if (slug === "arbeitsbescheinigung") return <ArbeitsbescheinigungGuideContent />;
  if (slug === "antragsruecknahme") return <AntragsruecknahmeGuideContent />;
  if (slug === "hauptantrag") return <HauptantragGuideContent />;
  if (slug === "weiterbewilligung") return <WeiterbewilligungGuideContent />;
  if (slug === "anlage-kdu") return <AnlageKDUGuideContent />;
  if (slug === "anlage-ek") return <AnlageEKGuideContent />;
  if (slug === "anlage-eks") return <AnlageEKSGuideContent />;
  if (slug === "anlage-vm") return <AnlageVMGuideContent />;
  if (slug === "anlage-wep") return <AnlageWEPGuideContent />;
  if (slug === "anlage-ki") return <AnlageKIGuideContent />;
  if (slug === "anlage-uh1") return <AnlageUH1GuideContent />;
  if (slug === "anlage-uh2") return <AnlageUH2GuideContent />;
  if (slug === "anlage-uh3") return <AnlageUH3GuideContent />;
  if (slug === "nichterreichbarkeit") return <AnfrageNichterreichbarkeitGuideContent />;
  if (slug === "fuehrerschein") return <FuehrerscheinGuideContent />;
  if (slug === "fahrzeugzulassung") return <FahrzeugzulassungGuide />;

  if (!guide) return null;

  return (
    <div className="space-y-8">
      <FormFreeContent guide={guide} lang={lang} />
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-xs font-semibold text-muted-foreground">
            {t("formCenter.smartGuideLabel")}
          </span>
        </div>
      </div>
      <FormSmartGuide guide={guide} lang={lang} />
    </div>
  );
}

/* ─── Main Page ─── */
export default function FormCenter() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(formCatalog.map((g) => g.id))
  );
  const [openSubGroups, setOpenSubGroups] = useState<Set<string>>(new Set());
  const [showBgInfo, setShowBgInfo] = useState(false);

  const activeSlug = slug || "";
  const isRemovedFormSlug = activeSlug === "aufenthaltstitel";
  const handleBack = () => navigateBackOrHome(navigate);

  useEffect(() => {
    if (isRemovedFormSlug) {
      navigate("/formulari", { replace: true });
    }
  }, [isRemovedFormSlug, navigate]);

  const allEntries = useMemo(() => getAllFormEntries(), []);
  const isSearching = search.trim().length > 0;
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = search.toLowerCase();
    return allEntries.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q) ||
        e.slug.includes(q)
    );
  }, [search, isSearching, allEntries]);

  const handleSelect = (s: string) => navigate(`/formulari/${s}`);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSubGroup = (id: string) => {
    setOpenSubGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderItem = (item: FormEntry) => {
    const isActive = item.slug === activeSlug;
    return (
      <button
        key={item.slug}
        onClick={() => handleSelect(item.slug)}
        className={cn(
          "w-full flex flex-col gap-0.5 px-3 py-2 text-left transition-all",
          isActive
            ? "text-[#C9A84C] font-bold"
            : "text-foreground/80 hover:bg-[#FFF8EC] hover:text-foreground"
        )}
        style={isActive ? { background: '#FFF8EC', borderLeft: '3px solid #C9A84C', borderRadius: 6 } : { borderRadius: 6 }}
      >
        <span className={cn("text-sm font-medium truncate leading-[1.3]", isActive && "font-bold")}>
          {item.label}
        </span>
        <span
          className={cn(
            "text-[11px] leading-[1.3] truncate",
            isActive ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {item.desc}
        </span>
      </button>
    );
  };

  // Mobile: if slug selected, show guide
  if (isMobile && activeSlug && !isRemovedFormSlug) {
    return (
      <div className="px-4 py-6">
        <button onClick={handleBack} className="back-button">
          <ChevronLeft className="h-4 w-4" /> {t("common.back")}
        </button>
        <GuideContent key={activeSlug} slug={activeSlug} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 min-h-screen" style={{ background: "#F5F0E8" }}>
      <BuergergeldInfoModal
        open={showBgInfo}
        onClose={() => setShowBgInfo(false)}
        onOpenForm={() => { setShowBgInfo(false); handleSelect("hauptantrag"); }}
      />

      {/* Page title */}
      <div className="mb-6">
        <button onClick={handleBack} className="back-button">
          <ChevronLeft className="h-4 w-4" /> {t("common.back")}
        </button>
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
          {t("formCenter.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("formCenter.subtitle")}
        </p>
      </div>

      <div className="flex gap-6">
        {/* ─── Sidebar ─── */}
        <aside className={cn("shrink-0", isMobile ? "hidden" : "sticky top-20 self-start w-72")} style={{ background: "#FFFFFF", borderRight: "1px solid #F0EAD8" }}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("formCenter.searchPlaceholder")}
              className="pl-9 h-10 text-sm rounded-xl border-[#E8E0D0] bg-white"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <nav className="space-y-1 pr-2">
              {isSearching ? (
                <>
                  {searchResults.map(renderItem)}
                  {searchResults.length === 0 && (
                    <p className="px-3 py-6 text-xs text-muted-foreground text-center">
                      {t("formCenter.noResults")}
                    </p>
                  )}
                </>
              ) : (
                formCatalog.map((group) => (
                  <Collapsible
                    key={group.id}
                    open={openGroups.has(group.id)}
                    onOpenChange={() => toggleGroup(group.id)}
                  >
                    <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide hover:text-foreground transition-colors" style={{ color: '#C9A84C' }}>
                      <span>{group.icon}</span>
                      <span className="flex-1 text-left">{group.title}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          openGroups.has(group.id) && "rotate-180"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-0.5 pb-2">
                      {/* Primary items with optional info icon for Bürgergeld */}
                      {group.items.map((item) => (
                        <div key={item.slug} className="relative">
                          {renderItem(item)}
                          {item.slug === "hauptantrag" && (
                            <button
                              onClick={(e) => { e.stopPropagation(); setShowBgInfo(true); }}
                              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                              title="Info o Bürgergeld"
                            >
                              <Info className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                      {/* Sub-groups (accordion) */}
                      {group.subGroups?.map((sub) => (
                        <Collapsible
                          key={sub.id}
                          open={openSubGroups.has(sub.id)}
                          onOpenChange={() => toggleSubGroup(sub.id)}
                        >
                          <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors ml-2">
                            <span className="flex-1 text-left">{sub.title}</span>
                            <ChevronDown className={cn("h-3 w-3 transition-transform", openSubGroups.has(sub.id) && "rotate-180")} />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-0.5 ml-2">
                            {sub.items.map(renderItem)}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))
              )}
            </nav>
          </ScrollArea>
        </aside>

        {/* ─── Main content ─── */}
        <main className="min-w-0 flex-1">
          {activeSlug && !isRemovedFormSlug ? (
            <GuideContent key={activeSlug} slug={activeSlug} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {isMobile ? (
                <div className="w-full space-y-1">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t("formCenter.searchPlaceholder")}
                      className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-card"
                    />
                  </div>
                  {isSearching ? (
                    searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map((item) => (
                          <button
                            key={item.slug}
                            onClick={() => handleSelect(item.slug)}
                            className="w-full flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-3 text-left text-sm transition hover:border-[hsl(var(--gold))]/40 hover:shadow-sm"
                          >
                            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <div className="min-w-0">
                              <p className="font-semibold truncate">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground truncate">{item.desc}</p>
                            </div>
                            <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="px-3 py-6 text-xs text-muted-foreground text-center">
                        {t("formCenter.noResults")}
                      </p>
                    )
                  ) : (
                    formCatalog.map((group) => (
                      <div key={group.id}>
                        <div className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--gold))] bg-[hsl(220,50%,8%)] rounded-lg mt-3 mb-1.5">
                          {group.icon} {group.title}
                        </div>
                        <div className="space-y-2">
                          {group.items.map((item) => (
                            <button
                              key={item.slug}
                              onClick={() => handleSelect(item.slug)}
                              className="w-full flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-3 text-left text-sm transition hover:border-[hsl(var(--gold))]/40 hover:shadow-sm"
                            >
                              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <div className="min-w-0">
                                <p className="font-semibold truncate">{item.label}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{item.desc}</p>
                              </div>
                              <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                            </button>
                          ))}
                          {group.subGroups?.map((sub) => (
                            <div key={sub.id}>
                              <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-2">{sub.title}</p>
                              {sub.items.map((item) => (
                                <button
                                  key={item.slug}
                                  onClick={() => handleSelect(item.slug)}
                                  className="w-full flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-3 text-left text-sm transition hover:border-[hsl(var(--gold))]/40 hover:shadow-sm"
                                >
                                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                                  <div className="min-w-0">
                                    <p className="font-semibold truncate">{item.label}</p>
                                    <p className="text-[11px] text-muted-foreground truncate">{item.desc}</p>
                                  </div>
                                  <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <>
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5 mb-6">
                    <FileText className="h-10 w-10 text-primary/40" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground/70">{t("formCenter.selectForm")}</h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {t("formCenter.selectFormDesc")}
                  </p>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
