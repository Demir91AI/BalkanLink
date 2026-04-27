import { useState, useMemo } from "react";
import { ArrowRight, ChevronDown, Search, Lock, Sparkles, Info, X, Crown } from "lucide-react";
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
 * Vault — Black & Gold luxury edition.
 * Premium feel: gold accents, metallic shimmer, deep blacks.
 */

interface Props {
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
}

/* ---------- Sub-components ---------- */

function StatusPill({ free }: { free: boolean }) {
  if (free) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
        <span className="block size-1 rounded-full bg-emerald-400" />
        Free
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border"
      style={{
        background: "linear-gradient(135deg, hsl(var(--gold) / 0.2), hsl(var(--gold) / 0.05))",
        borderColor: "hsl(var(--gold) / 0.4)",
        color: "hsl(var(--gold))",
      }}
    >
      <Crown className="h-2 w-2" />
      Pro
    </span>
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
    <button
      onClick={() => onSelect(item.slug)}
      className={cn(
        "group relative w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-all overflow-hidden",
        "border-white/5 bg-black/30 hover:bg-black/50 hover:border-[hsl(var(--gold))]/40",
        "hover:shadow-[0_0_20px_-5px_hsl(var(--gold)/0.3)]"
      )}
      aria-label={`Otvori ${item.label}`}
    >
      {/* Gold shimmer on hover */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, hsl(var(--gold) / 0.08) 50%, transparent 70%)",
        }}
      />
      <span
        className={cn(
          "mt-1.5 block size-1.5 rounded-full shrink-0 transition-all",
          free ? "bg-emerald-400" : "bg-[hsl(var(--gold))]",
          "group-hover:shadow-[0_0_8px_currentColor]"
        )}
        aria-hidden="true"
      />
      <div className="relative flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground leading-tight group-hover:text-[hsl(var(--gold))] transition-colors">
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
        <p className="mt-0.5 text-xs text-muted-foreground/80 leading-snug line-clamp-2">
          {item.desc}
        </p>
      </div>
      <ArrowRight className="relative h-3.5 w-3.5 mt-1 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-[hsl(var(--gold))]" />
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
  const totalCount =
    group.items.length +
    (group.subGroups?.reduce((acc, s) => acc + s.items.length, 0) || 0);

  return (
    <section
      className={cn(
        "relative rounded-xl border overflow-hidden transition-all",
        isOpen
          ? "border-[hsl(var(--gold))]/30 bg-gradient-to-b from-black/60 to-black/40 shadow-[0_8px_40px_-12px_hsl(var(--gold)/0.25)]"
          : "border-white/5 bg-black/30 hover:border-[hsl(var(--gold))]/20 hover:bg-black/40"
      )}
    >
      {/* Top gold hairline when open */}
      {isOpen && (
        <span
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.6), transparent)",
          }}
        />
      )}

      {/* Header — compact luxury */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 relative text-left transition-colors hover:bg-[hsl(var(--gold))]/[0.03]"
        aria-expanded={isOpen}
      >
        {/* Left gold strip */}
        <span
          className="absolute left-0 top-0 bottom-0 w-[2px] transition-all"
          style={{
            background: isOpen
              ? "linear-gradient(180deg, transparent, hsl(var(--gold)), transparent)"
              : "linear-gradient(180deg, transparent, hsl(var(--gold) / 0.4), transparent)",
          }}
        />
        <span
          className={cn(
            "text-xl ml-2 shrink-0 transition-all",
            isOpen && "drop-shadow-[0_0_8px_hsl(var(--gold)/0.4)]"
          )}
          aria-hidden="true"
        >
          {group.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2
              className={cn(
                "text-base font-bold tracking-tight transition-colors",
                isOpen ? "text-[hsl(var(--gold))]" : "text-foreground"
              )}
            >
              {group.title}
            </h2>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border"
              style={{
                background: "hsl(var(--gold) / 0.1)",
                borderColor: "hsl(var(--gold) / 0.25)",
                color: "hsl(var(--gold))",
              }}
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
            "h-4 w-4 transition-all duration-300 shrink-0",
            isOpen ? "rotate-180 text-[hsl(var(--gold))]" : "text-muted-foreground"
          )}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div
          className="border-t p-2 sm:p-3"
          style={{ borderColor: "hsl(var(--gold) / 0.15)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {group.items.map((item) => (
              <FormRow
                key={item.slug}
                item={item}
                onSelect={onSelect}
                onShowBuergergeldInfo={onShowBuergergeldInfo}
              />
            ))}
          </div>

          {group.subGroups?.map((sub) => (
            <div
              key={sub.id}
              className="mt-3 pt-3 border-t"
              style={{ borderColor: "hsl(var(--gold) / 0.1)" }}
            >
              <div className="flex items-center gap-2 px-1 mb-2">
                <span className="block size-1 rounded-full bg-[hsl(var(--gold))]" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">
                  {sub.title}
                </h3>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--gold) / 0.3), transparent)",
                  }}
                />
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {sub.items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
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

  const totalForms = allEntries.length;
  const freeForms = allEntries.filter((e) => isFormFree(e.slug)).length;

  return (
    <div className="space-y-4">
      {/* Hero — Black & Gold luxury */}
      <div
        className="relative overflow-hidden rounded-xl border p-5 sm:p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,12,24,0.95) 0%, rgba(15,20,40,0.85) 50%, rgba(20,16,8,0.9) 100%)",
          borderColor: "hsl(var(--gold) / 0.3)",
          boxShadow:
            "inset 0 1px 0 hsl(var(--gold) / 0.15), 0 20px 60px -20px hsl(var(--gold) / 0.2)",
        }}
      >
        {/* Gold corner glow */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--gold) / 0.25) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--gold) / 0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Top gold shimmer line */}
        <span
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.8), transparent)",
          }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="min-w-0">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 border"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--gold) / 0.2), hsl(var(--gold) / 0.05))",
                borderColor: "hsl(var(--gold) / 0.4)",
              }}
            >
              <Sparkles className="h-2.5 w-2.5 text-[hsl(var(--gold))]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold))]">
                Premium Vault · Stand 2026
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #fff 0%, hsl(var(--gold)) 50%, #fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Katalog obrazaca
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-[55ch]">
              Svi zvanični njemački formulari — prevedeni i pojašnjeni na bosanskom.
            </p>
          </div>
          <div className="flex gap-5 sm:gap-7 shrink-0">
            <div className="text-right">
              <div
                className="text-3xl font-extrabold tabular-nums"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--gold)) 0%, #f5e6a8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {totalForms}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                Obrazaca
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-emerald-400 tabular-nums">
                {freeForms}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                Besplatno
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[hsl(var(--gold))]/70" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži formulare (npr. Kindergeld, Anmeldung…)"
            className="pl-9 pr-9 h-10 text-sm rounded-lg bg-black/40 backdrop-blur-sm focus-visible:ring-[hsl(var(--gold))]/40"
            style={{ borderColor: "hsl(var(--gold) / 0.2)" }}
            aria-label="Pretraga formulara"
          />
          {isSearching && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[hsl(var(--gold))]"
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
              className="px-3 h-10 rounded-lg border bg-black/40 text-xs font-semibold text-foreground hover:text-[hsl(var(--gold))] transition-colors"
              style={{ borderColor: "hsl(var(--gold) / 0.25)" }}
            >
              Otvori sve
            </button>
            <button
              onClick={collapseAll}
              className="px-3 h-10 rounded-lg border border-white/10 bg-black/40 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
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
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-1.5 rounded-xl border bg-black/40 backdrop-blur-sm p-3"
            style={{ borderColor: "hsl(var(--gold) / 0.2)" }}
          >
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
