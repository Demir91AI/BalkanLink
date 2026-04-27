import { useState } from "react";
import { ArrowRight, ChevronDown, Search, Lock, Sparkles, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  formCatalog,
  getAllFormEntries,
  isFormFree,
  type FormEntry,
  type FormGroup,
} from "@/lib/form-catalog";

/**
 * Vault Accordion — index view for /formulari
 * Replaces the old cramped sidebar with large, readable category panels.
 */

interface Props {
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
}

/* ---------- Sub-components ---------- */

function StatusPill({ free }: { free: boolean }) {
  if (free) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25">
        <span className="block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
          Besplatno
        </span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/25">
      <Lock className="h-2.5 w-2.5 text-[hsl(var(--gold))]" />
      <span className="text-[10px] font-bold text-[hsl(var(--gold))] uppercase tracking-widest">
        Premium
      </span>
    </div>
  );
}

function FormRow({
  item,
  onSelect,
  onShowBuergergeldInfo,
}: {
  item: FormEntry;
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
}) {
  const free = isFormFree(item.slug);
  return (
    <div
      className={cn(
        "group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 rounded-xl border transition-all",
        "border-border/40 bg-background/40 hover:bg-background/70 hover:border-border",
        free
          ? "hover:border-emerald-500/40"
          : "hover:border-[hsl(var(--gold))]/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.06)]"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
            {item.label}
          </h3>
          {item.slug === "hauptantrag" && onShowBuergergeldInfo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowBuergergeldInfo();
              }}
              className="shrink-0 mt-1 text-muted-foreground hover:text-[hsl(var(--gold))] transition-colors"
              title="Šta je Bürgergeld?"
              aria-label="Informacije o Bürgergeld"
            >
              <Info className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="mt-2 text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-[68ch] text-pretty">
          {item.desc}
        </p>

        {item.includes && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/60">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Sadrži:
            </span>
            <span className="text-xs font-medium text-foreground">
              {item.includes}
            </span>
          </div>
        )}
      </div>

      <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto pt-4 sm:pt-0 border-t border-border/40 sm:border-0">
        <StatusPill free={free} />
        <button
          onClick={() => onSelect(item.slug)}
          className={cn(
            "ml-auto sm:ml-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all",
            "border-border bg-background/80 text-foreground",
            free
              ? "hover:border-emerald-500/50 hover:text-emerald-300"
              : "hover:border-[hsl(var(--gold))]/50 hover:text-[hsl(var(--gold))]"
          )}
          aria-label={`Otvori ${item.label}`}
        >
          Otvori
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

function CategorySection({
  group,
  isOpen,
  onToggle,
  onSelect,
  onShowBuergergeldInfo,
}: {
  group: FormGroup;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
}) {
  const totalCount =
    group.items.length +
    (group.subGroups?.reduce((acc, s) => acc + s.items.length, 0) || 0);

  const accentColor = group.isFree
    ? "bg-emerald-400"
    : "bg-[hsl(var(--gold))]";

  return (
    <section
      className={cn(
        "rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden transition-all",
        isOpen
          ? "shadow-2xl shadow-black/30 ring-1 ring-white/5"
          : "shadow-md shadow-black/10 hover:bg-card/80"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 relative text-left transition-colors hover:bg-white/[0.02]"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "absolute left-0 top-0 bottom-0 w-1 transition-opacity",
            accentColor,
            isOpen ? "opacity-100" : "opacity-50"
          )}
        />
        <div className="flex items-baseline gap-3 sm:gap-4 ml-3 min-w-0 flex-1">
          <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
            {group.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {group.title}
              </h2>
              <span className="text-sm font-medium text-muted-foreground tabular-nums">
                {totalCount} {totalCount === 1 ? "obrazac" : totalCount < 5 ? "obrasca" : "obrazaca"}
              </span>
            </div>
            {group.isFree && (
              <p className="mt-1 text-xs sm:text-sm text-emerald-300/90 font-medium">
                ✓ Cijela kategorija je besplatna — bez registracije
              </p>
            )}
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <span className="hidden sm:inline text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {isOpen ? "Otvoreno" : "Zatvoreno"}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-border/40 p-3 sm:p-4 space-y-2 bg-background/30">
          {group.items.map((item) => (
            <FormRow
              key={item.slug}
              item={item}
              onSelect={onSelect}
              onShowBuergergeldInfo={onShowBuergergeldInfo}
            />
          ))}

          {group.subGroups?.map((sub) => (
            <div key={sub.id} className="pt-4">
              <div className="flex items-center gap-3 px-2 mb-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {sub.title}
                </h3>
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-xs text-muted-foreground tabular-nums">
                  {sub.items.length}
                </span>
              </div>
              <div className="space-y-2">
                {sub.items.map((item) => (
                  <FormRow key={item.slug} item={item} onSelect={onSelect} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- Main ---------- */

export default function FormCatalogVault({ onSelect, onShowBuergergeldInfo }: Props) {
  const [search, setSearch] = useState("");
  // Open the first 2 sections by default for instant scanning
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(formCatalog.slice(0, 2).map((g) => g.id))
  );

  const isSearching = search.trim().length > 0;
  const allEntries = getAllFormEntries();
  const searchResults = isSearching
    ? allEntries.filter((e) => {
        const q = search.toLowerCase();
        return (
          e.label.toLowerCase().includes(q) ||
          e.desc.toLowerCase().includes(q) ||
          e.slug.includes(q)
        );
      })
    : [];

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenIds(new Set(formCatalog.map((g) => g.id)));
  const collapseAll = () => setOpenIds(new Set());

  return (
    <div className="space-y-6">
      {/* Hero / intro */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 sm:p-8">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[hsl(var(--gold))]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 mb-4">
            <Sparkles className="h-3 w-3 text-[hsl(var(--gold))]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">
              Stand 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            Katalog obrazaca
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[65ch] leading-relaxed text-pretty">
            Svi zvanični njemački formulari, prevedeni i pojašnjeni na bosanskom.
            Odaberite kategoriju ispod kako biste pronašli obrazac koji vam treba.
          </p>
        </div>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži formulare (npr. Kindergeld, Bürgergeld, Anmeldung…)"
            className="pl-11 h-12 text-base rounded-xl border-border/60 bg-card/60 backdrop-blur-sm"
            aria-label="Pretraga formulara"
          />
        </div>
        {!isSearching && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={expandAll}
              className="px-4 h-12 rounded-xl border border-border/60 bg-card/60 text-sm font-semibold text-foreground hover:border-[hsl(var(--gold))]/40 transition-colors"
            >
              Otvori sve
            </button>
            <button
              onClick={collapseAll}
              className="px-4 h-12 rounded-xl border border-border/60 bg-card/60 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              Zatvori sve
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {isSearching ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground px-1">
            {searchResults.length === 0
              ? "Nema rezultata."
              : `${searchResults.length} ${searchResults.length === 1 ? "rezultat" : "rezultata"} za „${search}"`}
          </p>
          <div className="space-y-2 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-3 sm:p-4">
            {searchResults.map((item) => (
              <FormRow
                key={item.slug}
                item={item}
                onSelect={onSelect}
                onShowBuergergeldInfo={onShowBuergergeldInfo}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {formCatalog.map((group) => (
            <CategorySection
              key={group.id}
              group={group}
              isOpen={openIds.has(group.id)}
              onToggle={() => toggle(group.id)}
              onSelect={onSelect}
              onShowBuergergeldInfo={onShowBuergergeldInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
