import { useEffect, useMemo, useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { Lock, Crown, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ChevronLeft, FileText, ChevronDown, ChevronRight, Info, X } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getGuideBySlug } from "@/lib/guide-data";
import { formCatalog, getAllFormEntries, isFormFree, hasMuster, getMusterPath, type FormEntry, type FormGroup } from "@/lib/form-catalog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import FormFreeContent from "@/components/FormFreeContent";

import MoreFeaturesHint from "@/components/MoreFeaturesHint";
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
import WirtschaftlicheJugendhilfeGuideContent from "@/components/guides/WirtschaftlicheJugendhilfeGuideContent";
import FahrzeugzulassungGuide from "@/components/formulare/FahrzeugzulassungGuide";
import { navigateBackOrHome } from "@/lib/navigation";
import FormRightPanel from "@/components/formCenter/FormRightPanel";
import PremiumBenefitsSection from "@/components/formCenter/PremiumBenefitsSection";
import FormCatalogVault from "@/components/formCenter/FormCatalogVault";
import { label } from "@/lib/de-labels";

type LangKey = "de" | "bs" | "hr" | "sr";

function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "hr") return "hr";
  if (lang === "sr") return "sr";
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
          <button onClick={onOpenForm} className="flex-1 rounded-full py-2.5 text-sm font-bold text-[hsl(var(--gold-foreground))]" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}>
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

/* ─── Premium paywall for a specific form ─── */
function FormPremiumPaywall({ slug, entry }: { slug: string; entry: FormEntry | null }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-5 max-w-md mx-auto">
      <div className="h-14 w-14 rounded-2xl bg-[hsl(var(--gold))]/10 flex items-center justify-center ring-1 ring-[hsl(var(--gold))]/20">
        <Lock className="h-7 w-7 text-[hsl(var(--gold))]" />
      </div>
      <div>
        <h2 className="text-lg font-bold">Otključaj {entry?.label || "ovaj formular"}</h2>
        <p className="mt-3 text-sm text-muted-foreground font-semibold">Šta dobijaš uz Premium:</p>
      </div>
      <ul className="text-left text-xs text-muted-foreground space-y-2 w-full">
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Kompletan Smart Guide — svaki korak detaljno objašnjen</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Tačno šta upisati u svako polje formulara</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Detaljan spisak dokumenata (šta tačno, gdje nabaviti)</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Musterformular — primjer pravilno popunjenog formulara</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Najčešće greške i kako ih izbjeći</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Šta raditi ako zahtjev bude odbijen</li>
        <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> Direktni linkovi na nadležne institucije</li>
      </ul>
      {entry?.includes && (
        <div className="w-full text-left">
          <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">📄 Musterformulari uključeni:</p>
          <div className="flex flex-wrap gap-1.5">
            {entry.includes.split(" + ").map((tag) => (
              <span key={tag} className="rounded-full bg-[hsl(var(--gold))]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[hsl(var(--gold))]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="w-full space-y-2 mt-2">
        <button
          onClick={() => navigate("/paketi")}
          className="w-full rounded-full py-3 text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}
        >
          <Crown className="inline-block mr-1.5 h-4 w-4" />
          Otključaj Premium — 9.99€/mj.
        </button>


      </div>
    </div>
  );
}

/* ─── Guide Content (right side) ─── */
function GuideContent({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);
  const lang = getLangKey("bs");
  const freeLang = (lang === "hr" || lang === "sr" ? "bs" : lang) as "de" | "bs" | "en";

  const MusterButton = null;

  if (slug === "kindergeld") return <><KindergeldGuideContent />{MusterButton}</>;
  if (slug === "anmeldung") return <><AnmeldungGuideContent />{MusterButton}</>;
  if (slug === "steuer-id") return <><SteuerIdGuideContent />{MusterButton}</>;
  if (slug === "krankenkasse") return <><KrankenkasseGuideContent />{MusterButton}</>;
  if (slug === "elterngeld") return <><ElterngeldGuideContent />{MusterButton}</>;
  if (slug === "burgergeld" || slug === "buergergeld") return <><BurgergeldGuideContent />{MusterButton}</>;
  if (slug === "wohngeld") return <><WohngeldGuideContent />{MusterButton}</>;
  if (slug === "mutterschaftsgeld") return <><MutterschaftsgeldGuideContent />{MusterButton}</>;
  if (slug === "kinderzuschlag") return <><KinderzuschlagGuideContent />{MusterButton}</>;
  if (slug === "krippengeld-bayern") return <><KrippengeldBayernGuideContent />{MusterButton}</>;
  if (slug === "anlage-bb") return <><AnlageBBGuideContent />{MusterButton}</>;
  if (slug === "anlage-sv") return <><AnlageSVGuideContent />{MusterButton}</>;
  if (slug === "anlage-ve") return <><AnlageVEGuideContent />{MusterButton}</>;
  if (slug === "anlage-hg") return <><AnlageHGGuideContent />{MusterButton}</>;
  if (slug === "anlage-meb") return <><AnlageMEBGuideContent />{MusterButton}</>;
  if (slug === "anlage-uf") return <><AnlageUFGuideContent />{MusterButton}</>;
  if (slug === "anlage-se") return <><AnlageSEGuideContent />{MusterButton}</>;
  if (slug === "arbeitsbescheinigung") return <><ArbeitsbescheinigungGuideContent />{MusterButton}</>;
  if (slug === "antragsruecknahme") return <><AntragsruecknahmeGuideContent />{MusterButton}</>;
  if (slug === "hauptantrag") return <><HauptantragGuideContent />{MusterButton}</>;
  if (slug === "weiterbewilligung") return <><WeiterbewilligungGuideContent />{MusterButton}</>;
  if (slug === "anlage-kdu") return <><AnlageKDUGuideContent />{MusterButton}</>;
  if (slug === "anlage-ek") return <><AnlageEKGuideContent />{MusterButton}</>;
  if (slug === "anlage-eks") return <><AnlageEKSGuideContent />{MusterButton}</>;
  if (slug === "anlage-vm") return <><AnlageVMGuideContent />{MusterButton}</>;
  if (slug === "anlage-wep") return <><AnlageWEPGuideContent />{MusterButton}</>;
  if (slug === "anlage-ki") return <><AnlageKIGuideContent />{MusterButton}</>;
  if (slug === "anlage-uh1") return <><AnlageUH1GuideContent />{MusterButton}</>;
  if (slug === "anlage-uh2") return <><AnlageUH2GuideContent />{MusterButton}</>;
  if (slug === "anlage-uh3") return <><AnlageUH3GuideContent />{MusterButton}</>;
  if (slug === "nichterreichbarkeit") return <><AnfrageNichterreichbarkeitGuideContent />{MusterButton}</>;
  if (slug === "fuehrerschein") return <><FuehrerscheinGuideContent />{MusterButton}</>;
  if (slug === "wirtschaftliche-jugendhilfe") return <><WirtschaftlicheJugendhilfeGuideContent />{MusterButton}</>;
  if (slug === "fahrzeugzulassung") return <><FahrzeugzulassungGuide />{MusterButton}</>;

  if (!guide) return null;

  return (
    <div className="space-y-8">
      <FormFreeContent guide={guide} lang={freeLang} />
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-xs font-semibold text-muted-foreground">
            {"Smart Guide"}
          </span>
        </div>
      </div>
      <FormSmartGuide guide={guide} lang={freeLang} />
      {MusterButton}
    </div>
  );
}

/* ─── Category badge helpers ─── */
function FreeBadge({ hidden }: { hidden?: boolean }) {
  if (hidden) return null;
  return (
    <span className="ml-auto shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
      ✓ Besplatno
    </span>
  );
}

function PremiumBadge({ hidden }: { hidden?: boolean }) {
  if (hidden) return null;
  return (
    <span className="ml-auto shrink-0 flex items-center gap-0.5 rounded-full bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[hsl(var(--gold))]">
      <Lock className="h-2.5 w-2.5" /> Premium
    </span>
  );
}

function ItemBadge({ slug, hidden }: { slug: string; hidden?: boolean }) {
  if (hidden) return null;
  if (isFormFree(slug)) {
    return <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 text-[8px] font-bold text-emerald-700 dark:text-emerald-400">BESPLATNO</span>;
  }
  return <span className="shrink-0 rounded-full bg-[hsl(var(--gold))]/10 px-1.5 py-0.5 text-[8px] font-bold text-[hsl(var(--gold))]">🔒 PREMIUM</span>;
}

function AvailabilityIndicator({ slug }: { slug: string }) {
  const free = isFormFree(slug);
  const muster = hasMuster(slug);
  const icon = free ? "✓" : "🔒";
  return (
    <p className="text-[10px] text-muted-foreground/70 mt-0.5">
      {icon} Smart Guide {muster ? `  ${icon} Musterformular` : ""}
    </p>
  );
}

/* ─── Main Page ─── */
export default function FormCenter() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isPremium } = useSubscription();
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [openMobileGroups, setOpenMobileGroups] = useState<Set<string>>(new Set());
  const [openSubGroups, setOpenSubGroups] = useState<Set<string>>(new Set());
  const [showBgInfo, setShowBgInfo] = useState(false);

  const activeSlug = slug || "";
  const isRemovedFormSlug = activeSlug === "aufenthaltstitel";
  const handleBack = () => navigateBackOrHome(navigate);
  const isFreeSlug = isFormFree(activeSlug);
  const canAccess = isPremium || isFreeSlug;

  useEffect(() => {
    if (isRemovedFormSlug) {
      navigate("/formulari", { replace: true });
    }
  }, [isRemovedFormSlug, navigate]);

  const allEntries = useMemo(() => getAllFormEntries(), []);
  const activeEntry = useMemo(
    () => allEntries.find((e) => e.slug === activeSlug) || null,
    [allEntries, activeSlug]
  );
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

  const handleSelect = (s: string) => {
    if (s === "anerkennung-navigator") {
      navigate("/anerkennung-navigator");
      return;
    }
    navigate(`/formulari/${s}`);
  };

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleMobileGroup = (id: string) => {
    setOpenMobileGroups((prev) => {
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

  const getGroupTitle = (group: FormGroup) => group.title;

  const renderItem = (item: FormEntry) => {
    const isActive = item.slug === activeSlug;
    return (
      <button
        key={item.slug}
        onClick={() => handleSelect(item.slug)}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 text-left transition-all",
          isActive
            ? "text-[hsl(var(--gold))] font-bold"
            : "text-foreground/80 hover:bg-[hsl(var(--gold))]/5 hover:text-foreground"
        )}
        style={isActive ? { background: 'hsl(var(--gold) / 0.08)', borderLeft: '3px solid hsl(var(--gold))', borderRadius: 6 } : { borderRadius: 6 }}
      >
        <div className="flex-1 min-w-0">
          <span className={cn("text-sm font-medium truncate leading-[1.3] block", isActive && "font-bold")}>
            {item.label}
          </span>
          {item.includes && (
            <span className="text-[10px] text-muted-foreground truncate block">{item.includes}</span>
          )}
        </div>
        <ItemBadge slug={item.slug} hidden={isPremium} />
      </button>
    );
  };

  // Mobile: if slug selected, show guide
  if (isMobile && activeSlug && !isRemovedFormSlug) {
    const musterPath = getMusterPath(activeSlug);
    return (
      <div className="px-4 py-6">
        <PageNavBar onBack={handleBack} />
        {canAccess ? (
          <>
            <GuideContent key={activeSlug} slug={activeSlug} />
            {musterPath && (
              <button
                onClick={() => navigate(musterPath)}
                className="w-full mt-6 mb-4 rounded-xl py-3 text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: '#1E293B' }}
              >
                📋 Otvori Musterformular
                {!isFormFree(activeSlug) && (
                  <span style={{ color: '#C9A84C', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginLeft: 4 }}>⭐ PREMIUM</span>
                )}
              </button>
            )}
          </>
        ) : (
          <FormPremiumPaywall slug={activeSlug} entry={activeEntry} />
        )}
      </div>
    );
  }

  // ─── INDEX VIEW: no form selected → Vault Accordion (full width, dark theme) ───
  if (!activeSlug || isRemovedFormSlug) {
    return (
      <div className="min-h-screen" style={{ background: "#020617" }}>
        <SEO title="Musterformulari — Njemački Obrasci" description="Popuni njemačke formulare na svom jeziku — Kindergeld, Bürgergeld, Wohngeld, BAföG i još 15+ obrazaca." path="/formulari" />
        <BuergergeldInfoModal
          open={showBgInfo}
          onClose={() => setShowBgInfo(false)}
          onOpenForm={() => { setShowBgInfo(false); handleSelect("hauptantrag"); }}
        />

        <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-20 pt-4">
          <PageNavBar onBack={handleBack} />
        </div>

        <div className="mx-auto max-w-6xl">
          <FormCatalogVault
            onSelect={handleSelect}
            onShowBuergergeldInfo={() => setShowBgInfo(true)}
          />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-20 pb-10">
          <PremiumBenefitsSection />
        </div>
      </div>
    );
  }

  // ─── DETAIL VIEW: form selected ───
  // Mobile: full-screen guide
  if (isMobile && activeSlug && !isRemovedFormSlug) {
    const musterPath = getMusterPath(activeSlug);
    return (
      <div className="px-4 py-6">
        <PageNavBar onBack={handleBack} />
        {canAccess ? (
          <>
            <GuideContent key={activeSlug} slug={activeSlug} />
            {musterPath && (
              <button
                onClick={() => navigate(musterPath)}
                className="w-full mt-6 mb-4 rounded-xl py-3 text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: '#1E293B' }}
              >
                📋 Otvori Musterformular
                {!isFormFree(activeSlug) && (
                  <span style={{ color: '#C9A84C', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginLeft: 4 }}>⭐ PREMIUM</span>
                )}
              </button>
            )}
          </>
        ) : (
          <FormPremiumPaywall slug={activeSlug} entry={activeEntry} />
        )}
      </div>
    );
  }

  // Desktop: sidebar + content + right panel
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <SEO title="Musterformulari — Njemački Obrasci" description="Popuni njemačke formulare na svom jeziku — Kindergeld, Bürgergeld, Wohngeld, BAföG i još 15+ obrazaca." path="/formulari" />
      <BuergergeldInfoModal
        open={showBgInfo}
        onClose={() => setShowBgInfo(false)}
        onOpenForm={() => { setShowBgInfo(false); handleSelect("hauptantrag"); }}
      />

      <div className="mb-6">
        <PageNavBar onBack={handleBack} />
      </div>

      <div className="flex gap-6">
        {/* ─── Sidebar ─── */}
        <aside className="shrink-0 sticky top-20 self-start w-72" style={{ background: "hsl(var(--card))", borderRight: "1px solid hsl(var(--border) / 0.4)" }}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pretraži formulare..."
              className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-background"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <nav className="space-y-1 pr-2">
              {isSearching ? (
                <>
                  {searchResults.map(renderItem)}
                  {searchResults.length === 0 && (
                    <p className="px-3 py-6 text-xs text-muted-foreground text-center">
                      Nema rezultata
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
                    <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide hover:text-foreground transition-colors text-[hsl(var(--gold))]">
                      <span>{group.icon}</span>
                      <span className="flex-1 text-left">{getGroupTitle(group)}</span>
                      {group.isFree ? <FreeBadge /> : <PremiumBadge />}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform shrink-0",
                          openGroups.has(group.id) && "rotate-180"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-0.5 pb-2">
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
        <main className="min-w-0 flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">
              {allEntries.find(e => e.slug === activeSlug)?.label || activeSlug}
            </h1>
            <ItemBadge slug={activeSlug} />
          </div>
          {canAccess ? (
            <GuideContent key={activeSlug} slug={activeSlug} />
          ) : (
            <FormPremiumPaywall slug={activeSlug} entry={activeEntry} />
          )}

          {/* ── More features hint ── */}
          <MoreFeaturesHint />
        </main>
        <FormRightPanel
          activeSlug={activeSlug}
          formLabel={activeEntry?.label}
          formDesc={activeEntry?.desc}
        />
      </div>
    </div>
  );
}
