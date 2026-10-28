import MembershipOffer from "@/components/membership/MembershipOffer";
import { useTranslation } from "react-i18next";
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
import OfficialNextStep from "@/components/guide-first/OfficialNextStep";
import LegacyBuergergeldNote from "@/components/guide-first/LegacyBuergergeldNote";
import FormRightPanel from "@/components/formCenter/FormRightPanel";
import PremiumBenefitsSection from "@/components/formCenter/PremiumBenefitsSection";
import FormCatalogVault from "@/components/formCenter/FormCatalogVault";
import { label } from "@/lib/de-labels";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";
void PlusCtaLabel; // pinned legacy import (phase1 baseline)
import GuideFrame from "@/components/guide-first/GuideFrame";
import ProcedureCompanion from "@/components/guide-first/ProcedureCompanion";
import { isArrivalSlug } from "@/lib/guide-first/arrival-model";
import { isFamilySlug } from "@/lib/guide-first/family-model";
import { isGrundsicherungSlug } from "@/lib/guide-first/grundsicherung-model";
import GrundsicherungNavigator from "@/components/guide-first/GrundsicherungNavigator";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useMonetizationV2 } from "@/hooks/useMonetizationV2";
import { useAuth } from "@/contexts/AuthContext";
import { decideGuideAccess } from "@/lib/guide-first/guide-access";

type LangKey = "de" | "bs" | "hr" | "sr";

function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "hr") return "hr";
  if (lang === "sr") return "sr";
  return "bs";
}

/* ─── Bürgergeld Info Modal ─── */
function BuergergeldInfoModal({ open, onClose, onOpenForm }: { open: boolean; onClose: () => void; onOpenForm: () => void }) {
  const { t } = useTranslation("pages");
  if (!open) return null;
  const tips = t("guideFirst.bgModal.tips", { returnObjects: true }) as string[];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label={t("guideFirst.bgModal.close")} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        <h3 className="text-lg font-bold mb-3">{t("guideFirst.bgModal.title")}</h3>
        <p className="text-sm text-muted-foreground mb-3">{t("guideFirst.bgModal.p1")}</p>
        <p className="text-sm text-muted-foreground mb-4">{t("guideFirst.bgModal.p2")}</p>
        <h4 className="text-sm font-bold mb-2">{t("guideFirst.bgModal.tipsTitle")}</h4>
        <ul className="text-sm text-muted-foreground space-y-1 mb-3">
          {tips.map((x) => <li key={x}>• {x}</li>)}
        </ul>
        <a href="https://www.arbeitsagentur.de/grundsicherung/finanziell-absichern/antrag-bescheid" target="_blank" rel="noopener noreferrer" className="mb-5 inline-block text-xs text-[hsl(var(--gold))] underline">
          {t("guideFirst.bgModal.source")}
        </a>
        <div className="flex gap-3">
          <button onClick={onOpenForm} className="flex-1 rounded-full py-2.5 text-sm font-bold text-[hsl(var(--gold-foreground))]" style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))" }}>
            {t("guideFirst.bgModal.open")}
          </button>
          <button onClick={onClose} className="flex-1 rounded-full py-2.5 text-sm font-medium border border-border text-muted-foreground hover:bg-muted">
            {t("guideFirst.bgModal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Guide access prompt (i18n, rollout-flag aware) ─── */
function FormPremiumPaywall({ entry }: { slug: string; entry: FormEntry | null; mode?: "subscribe" | "register" }) {
  return (
    <div data-testid="guide-access-prompt" className="py-8">
      <MembershipOffer variant="compact" title={entry?.label} />
    </div>
  );
}

/* ─── Guide Content (right side) ─── */
export function GuideContent({ slug, title }: { slug: string; title?: string }) {
  return <GuideFrame slug={slug} title={title}><GuideBody slug={slug} /></GuideFrame>;
}

function GuideBody({ slug }: { slug: string }) {
  if (isGrundsicherungSlug(slug)) return <>{slug === "hauptantrag" && <GrundsicherungNavigator />}<ProcedureCompanion key={slug} slug={slug} /><OfficialNextStep slug={slug} /></>;
  if (isArrivalSlug(slug)) return <><ProcedureCompanion key={slug} slug={slug} />{slug === "steuer-id" && <SteuerIdGuideContent />}<OfficialNextStep slug={slug} /></>;
  if (isFamilySlug(slug)) return <><ProcedureCompanion key={slug} slug={slug} />{slug === "elterngeld" && <ElterngeldGuideContent />}{slug === "mutterschaftsgeld" && <MutterschaftsgeldGuideContent />}{slug === "kinderzuschlag" && <KinderzuschlagGuideContent />}{slug === "wirtschaftliche-jugendhilfe" && <WirtschaftlicheJugendhilfeGuideContent />}<OfficialNextStep slug={slug} /></>;
  const guide = getGuideBySlug(slug);
  const lang = getLangKey("bs");
  const freeLang = (lang === "hr" || lang === "sr" ? "bs" : lang) as "de" | "bs" | "en";

  const MusterButton = slug === "kindergeld" ? null : <OfficialNextStep slug={slug} />;
  const legacyNote = slug === "hauptantrag" ? <LegacyBuergergeldNote /> : null;

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
  if (slug === "hauptantrag") return <>{legacyNote}<HauptantragGuideContent />{MusterButton}</>;
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

  if (!guide) return <>{MusterButton}</>;

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

/* ─── Main Page ─── */
export default function FormCenter() {
  const { t: tp } = useTranslation("pages");
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
  const monetizationV2 = useMonetizationV2();
  const { user } = useAuth();
  const { entitlement } = useEntitlement();
  const access = decideGuideAccess({ monetizationV2, isFreeSlug, legacyPremium: isPremium, signedIn: !!user, entitlement });
  const canAccess = access === "full";
  const promptMode = access === "register" ? "register" : "subscribe";

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
      </button>
    );
  };

  // Mobile: if slug selected, show guide
  if (isMobile && activeSlug && !isRemovedFormSlug) {
    return (
      <div className="dark guide-dark-surface min-h-screen bg-background px-4 pt-6 pb-28" data-testid="guide-dark-surface">
        <PageNavBar onBack={handleBack} />
        {canAccess ? (
          <>
            <GuideContent key={activeSlug} slug={activeSlug} title={activeEntry?.label} />
          </>
        ) : (
          <FormPremiumPaywall slug={activeSlug} entry={activeEntry} mode={promptMode} />
        )}
      </div>
    );
  }

  // ─── INDEX VIEW: no form selected → Vault Accordion (full width, dark theme) ───
  if (!activeSlug || isRemovedFormSlug) {
    return (
      <div className="min-h-screen" style={{ background: "#020617" }}>
        <SEO title={tp("guideFirst.seoTitle")} description={tp("guideFirst.seoDesc")} path="/formulari" />
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
    return (
      <div className="dark guide-dark-surface min-h-screen bg-background px-4 pt-6 pb-28" data-testid="guide-dark-surface">
        <PageNavBar onBack={handleBack} />
        {canAccess ? (
          <>
            <GuideContent key={activeSlug} slug={activeSlug} title={activeEntry?.label} />
          </>
        ) : (
          <FormPremiumPaywall slug={activeSlug} entry={activeEntry} mode={promptMode} />
        )}
      </div>
    );
  }

  // Desktop: sidebar + content + right panel
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <SEO title={tp("guideFirst.seoTitle")} description={tp("guideFirst.seoDesc")} path="/formulari" />
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
          </div>
          {canAccess ? (
            <div className="dark guide-dark-surface rounded-2xl bg-background p-4 sm:p-6" data-testid="guide-dark-surface"><GuideContent key={activeSlug} slug={activeSlug} title={activeEntry?.label} /></div>
          ) : (
            <FormPremiumPaywall slug={activeSlug} entry={activeEntry} mode={promptMode} />
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
