import { useState, useMemo } from "react";
import { ArrowRight, ChevronDown, Search, Lock, Sparkles, Info, X } from "lucide-react";
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
 * Vault Accordion v2 — colored, compact, premium feel.
 * Each category has its own accent color → instant scanning + wow factor.
 */

interface Props {
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
}

/* ---------- Color theme per category ---------- */

type Theme = {
  /** raw HSL components for arbitrary tailwind values */
  hsl: string;
  /** tailwind text class for accent text */
  text: string;
  /** tailwind border class for accent border */
  border: string;
  /** tailwind bg class for very subtle accent fill */
  bg: string;
  /** tailwind bg class for the accent dot/strip */
  dot: string;
  /** soft glow color (rgba) for hover shadow */
  glow: string;
};

const THEMES: Record<string, Theme> = {
  // Emerald — Free
  dolazak: {
    hsl: "152 76% 50%",
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/[0.06]",
    dot: "bg-emerald-400",
    glow: "rgba(52,211,153,0.15)",
  },
  // Rose — Family
  porodica: {
    hsl: "350 89% 65%",
    text: "text-rose-300",
    border: "border-rose-500/40",
    bg: "bg-rose-500/[0.06]",
    dot: "bg-rose-400",
    glow: "rgba(251,113,133,0.15)",
  },
  // Amber — Bürgergeld (money)
  buergergeld: {
    hsl: "38 92% 60%",
    text: "text-amber-300",
    border: "border-amber-500/40",
    bg: "bg-amber-500/[0.06]",
    dot: "bg-amber-400",
    glow: "rgba(251,191,36,0.18)",
  },
  // Sky — Wohngeld (home)
  wohngeld: {
    hsl: "199 89% 60%",
    text: "text-sky-300",
    border: "border-sky-500/40",
    bg: "bg-sky-500/[0.06]",
    dot: "bg-sky-400",
    glow: "rgba(56,189,248,0.15)",
  },
  // Violet — Work
  posao: {
    hsl: "262 83% 70%",
    text: "text-violet-300",
    border: "border-violet-500/40",
    bg: "bg-violet-500/[0.06]",
    dot: "bg-violet-400",
    glow: "rgba(167,139,250,0.15)",
  },
  // Cyan — Education
  obrazovanje: {
    hsl: "188 86% 53%",
    text: "text-cyan-300",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/[0.06]",
    dot: "bg-cyan-400",
    glow: "rgba(34,211,238,0.15)",
  },
  // Slate-gold — Documents (gold accent)
  dokumenti: {
    hsl: "43 74% 54%",
    text: "text-[hsl(var(--gold))]",
    border: "border-[hsl(var(--gold))]/40",
    bg: "bg-[hsl(var(--gold))]/[0.06]",
    dot: "bg-[hsl(var(--gold))]",
    glow: "rgba(201,168,76,0.18)",
  },
};

const FALLBACK_THEME: Theme = THEMES.dokumenti;

/* ---------- Sub-components ---------- */

function StatusPill({ free }: { free: boolean }) {
  if (free) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
        <span className="block size-1 rounded-full bg-emerald-400" />
        Free
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border border-[hsl(var(--gold))]/30">
      <Lock className="h-2 w-2" />
      Pro
    </span>
  );
}

function FormRow({
  item,
  theme,
  onSelect,
  onShowBuergergeldInfo,
}: {
  item: FormEntry;
  theme: Theme;
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
}) {
  const free = isFormFree(item.slug);
  return (
    <button
      onClick={() => onSelect(item.slug)}
      className={cn(
        "group w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-all",
        "border-border/30 bg-background/30 hover:bg-background/60",
        `hover:${theme.border}`
      )}
      style={{
        // arbitrary hover shadow via inline so theme works in dark
      }}
      aria-label={`Otvori ${item.label}`}
    >
      <span
        className={cn("mt-1.5 block size-1.5 rounded-full shrink-0", theme.dot)}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground leading-tight">
            {item.label}
          </span>
          <StatusPill free={free} />
          {item.slug === "hauptantrag" && onShowBuergergeldInfo && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onShowBuergergeldInfo();
              }}
              className="inline-flex items-center text-muted-foreground hover:text-[hsl(var(--gold))] transition-colors"
              title="Šta je Bürgergeld?"
            >
              <Info className="h-3 w-3" />
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">
          {item.desc}
        </p>
      </div>
      <ArrowRight
        className={cn(
          "h-3.5 w-3.5 mt-1 shrink-0 text-muted-foreground transition-all",
          "group-hover:translate-x-0.5",
          `group-hover:${theme.text}`
        )}
      />
    </button>
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
  const theme = THEMES[group.id] || FALLBACK_THEME;
  const totalCount =
    group.items.length +
    (group.subGroups?.reduce((acc, s) => acc + s.items.length, 0) || 0);

  return (
    <section
      className={cn(
        "rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden transition-all",
        isOpen
          ? cn(theme.border, "shadow-lg")
          : "border-border/40 hover:border-border"
      )}
      style={
        isOpen
          ? { boxShadow: `0 8px 32px -12px ${theme.glow}` }
          : undefined
      }
    >
      {/* Header — compact */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 relative text-left transition-colors",
          isOpen ? theme.bg : "hover:bg-white/[0.02]"
        )}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "absolute left-0 top-0 bottom-0 w-[3px] transition-all",
            theme.dot,
            isOpen ? "opacity-100" : "opacity-60"
          )}
        />
        <span className="text-xl ml-2 shrink-0" aria-hidden="true">
          {group.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="text-base font-bold text-foreground tracking-tight">
              {group.title}
            </h2>
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                theme.bg,
                theme.text
              )}
            >
              {totalCount}
            </span>
            {group.isFree && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                · Sve besplatno
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300 shrink-0",
            isOpen && "rotate-180",
            isOpen && theme.text
          )}
        />
      </button>

      {/* Content — tight grid */}
      {isOpen && (
        <div className="border-t border-border/30 p-2 sm:p-3 bg-background/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {group.items.map((item) => (
              <FormRow
                key={item.slug}
                item={item}
                theme={theme}
                onSelect={onSelect}
                onShowBuergergeldInfo={onShowBuergergeldInfo}
              />
            ))}
          </div>

          {group.subGroups?.map((sub) => (
            <div key={sub.id} className="mt-3 pt-3 border-t border-border/20">
              <div className="flex items-center gap-2 px-1 mb-2">
                <span className={cn("block size-1 rounded-full", theme.dot)} />
                <h3 className={cn("text-[10px] font-bold uppercase tracking-widest", theme.text)}>
                  {sub.title}
                </h3>
                <div className="flex-1 h-px bg-border/30" />
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {sub.items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {sub.items.map((item) => (
                  <FormRow
                    key={item.slug}
                    item={item}
                    theme={theme}
                    onSelect={onSelect}
                  />
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
  // Open the first 2 sections by default
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(formCatalog.slice(0, 2).map((g) => g.id))
  );

  const isSearching = search.trim().length > 0;
  const allEntries = getAllFormEntries();
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = search.toLowerCase();
    return allEntries.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q) ||
        e.slug.includes(q)
    );
  }, [isSearching, search, allEntries]);

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

  // Stats for hero
  const totalForms = allEntries.length;
  const freeForms = allEntries.filter((e) => isFormFree(e.slug)).length;

  return (
    <div className="space-y-4">
      {/* Hero — compact with color streak */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-4 sm:p-5">
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-[hsl(var(--gold))]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 mb-2">
              <Sparkles className="h-2.5 w-2.5 text-[hsl(var(--gold))]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">
                Stand 2026
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              Katalog obrazaca
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-[55ch]">
              Svi zvanični njemački formulari, prevedeni i pojašnjeni na bosanskom.
            </p>
          </div>
          <div className="flex gap-4 sm:gap-6 shrink-0">
            <div className="text-right">
              <div className="text-2xl font-extrabold text-foreground tabular-nums">
                {totalForms}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                Obrazaca
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-emerald-400 tabular-nums">
                {freeForms}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                Besplatno
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + controls — compact */}
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži formulare (npr. Kindergeld, Anmeldung…)"
            className="pl-9 pr-9 h-10 text-sm rounded-lg border-border/60 bg-card/60 backdrop-blur-sm"
            aria-label="Pretraga formulara"
          />
          {isSearching && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Očisti pretragu"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {!isSearching && (
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={expandAll}
              className="px-3 h-10 rounded-lg border border-border/60 bg-card/60 text-xs font-semibold text-foreground hover:border-[hsl(var(--gold))]/40 transition-colors"
            >
              Otvori sve
            </button>
            <button
              onClick={collapseAll}
              className="px-3 h-10 rounded-lg border border-border/60 bg-card/60 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              Zatvori
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {isSearching ? (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground px-1">
            {searchResults.length === 0
              ? "Nema rezultata."
              : `${searchResults.length} ${searchResults.length === 1 ? "rezultat" : "rezultata"} za „${search}"`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-3">
            {searchResults.map((item) => {
              // try find theme by group
              const group = formCatalog.find(
                (g) =>
                  g.items.some((i) => i.slug === item.slug) ||
                  g.subGroups?.some((s) => s.items.some((i) => i.slug === item.slug))
              );
              const theme = group ? THEMES[group.id] || FALLBACK_THEME : FALLBACK_THEME;
              return (
                <FormRow
                  key={item.slug}
                  item={item}
                  theme={theme}
                  onSelect={onSelect}
                  onShowBuergergeldInfo={onShowBuergergeldInfo}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
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
