import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ArrowLeft, FileText, ChevronDown, ChevronRight } from "lucide-react";
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
import { navigateBackOrHome } from "@/lib/navigation";

type LangKey = "de" | "bs" | "en";

function getLangKey(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

/* ─── Guide Content (right side) ─── */
function GuideContent({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);
  const { isPremium } = useAuth();
  const { t, language } = useLanguage();
  const lang = getLangKey(language);
  const entry = getAllFormEntries().find((e) => e.slug === slug);

  if (!guide) return null;

  return (
    <div className="space-y-8">
      {/* FREE section */}
      <FormFreeContent guide={guide} lang={lang} />

      {/* Smart Guide section */}
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

  const activeSlug = slug || "";
  const handleBack = () => navigateBackOrHome(navigate);

  // Search across all entries
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

  // Sidebar item renderer
  const renderItem = (item: FormEntry) => {
    const isActive = item.slug === activeSlug;
    return (
      <button
        key={item.slug}
        onClick={() => handleSelect(item.slug)}
        className={cn(
          "w-full flex flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-all",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/80 hover:bg-accent hover:text-foreground"
        )}
      >
        <span className={cn("text-sm font-medium truncate", isActive && "font-semibold")}>
          {item.label}
        </span>
        <span
          className={cn(
            "text-[11px] leading-tight truncate",
            isActive ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {item.desc}
        </span>
      </button>
    );
  };

  // Mobile: if a slug is selected, show only the guide
  if (isMobile && activeSlug) {
    return (
      <div className="px-4 py-6">
        <button
          onClick={handleBack}
          className="back-button"
        >
          <ArrowLeft /> {t("common.back")}
        </button>
        <GuideContent key={activeSlug} slug={activeSlug} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Page title */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="back-button"
        >
          <ArrowLeft /> {t("common.back")}
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
        <aside className={cn("shrink-0", isMobile ? "hidden" : "sticky top-20 self-start w-72")}>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("formCenter.searchPlaceholder")}
              className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-card"
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
                    <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors">
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
                      {group.items.map(renderItem)}
                    </CollapsibleContent>
                  </Collapsible>
                ))
              )}
            </nav>
          </ScrollArea>
        </aside>

        {/* ─── Main content ─── */}
        <main className="min-w-0 flex-1">
          {activeSlug ? (
            <GuideContent key={activeSlug} slug={activeSlug} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {isMobile ? (
                <div className="w-full space-y-3">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t("formCenter.searchPlaceholder")}
                      className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-card"
                    />
                  </div>
                  {(isSearching ? searchResults : allEntries).map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => handleSelect(item.slug)}
                      className="w-full flex items-center gap-3 rounded-xl border border-border/40 bg-card px-4 py-3 text-left text-sm transition hover:border-gold/40 hover:shadow-sm"
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
