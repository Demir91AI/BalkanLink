import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Search, Sparkles, Info, X, FileText, Home, Users, Wallet, Building2, Briefcase, GraduationCap, ClipboardList, Shield, type LucideIcon } from "lucide-react";
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
 * Vault — BalkanLink Deutsch styled.
 * Navy gradient + blue/cyan gradient highlights + subtle gold accents.
 */

interface Props {
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
}

/* ---------- Sub-components ---------- */

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  dolazak: Home,
  porodica: Users,
  buergergeld: Wallet,
  wohngeld: Building2,
  posao: Briefcase,
  obrazovanje: GraduationCap,
  dokumenti: ClipboardList,
  vize: Shield,
};

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
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(item.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item.slug);
        }
      }}
      className={cn(
        "group relative w-full text-left flex items-start gap-3 rounded-2xl border p-4 transition-all duration-200 cursor-pointer",
        free
          ? "border-white/[0.06] bg-white/[0.03] hover:border-[hsl(var(--success)/0.3)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.1)]"
          : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]"
      )}
      aria-label={`Otvori ${item.label}`}
    >
      {/* Icon block */}
      <div
        className={cn(
          "shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all",
          free
            ? "bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]"
            : "bg-gold/[0.08] text-gold"
        )}
      >
        <FileText className="h-4 w-4" />
      </div>

      <div className="relative flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-white/90 leading-tight">
            {item.label}
          </h3>
          {item.slug === "hauptantrag" && onShowBuergergeldInfo && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onShowBuergergeldInfo();
              }}
              className="inline-flex items-center text-white/40 hover:text-gold transition-colors"
              title="Šta je Bürgergeld?"
            >
              <Info className="h-3 w-3" />
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-white/40 leading-relaxed line-clamp-2">
          {item.desc}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-white/60" />
    </motion.div>
  );
}

function CategorySection({
  group,
  isOpen,
  onToggle,
  onSelect,
  onShowBuergergeldInfo,
  index,
}: {
  group: FormGroup;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (slug: string) => void;
  onShowBuergergeldInfo?: () => void;
  index: number;
}) {
  const CategoryIcon = CATEGORY_ICONS[group.id] ?? FileText;
  const totalCount =
    group.items.length +
    (group.subGroups?.reduce((acc, s) => acc + s.items.length, 0) || 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
      className={cn(
        "rounded-2xl border bg-white/[0.02] overflow-hidden transition-all duration-300",
        isOpen
          ? "border-white/[0.12] shadow-[0_8px_40px_rgba(59,130,246,0.08)]"
          : "border-white/[0.06] hover:border-white/[0.1]"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
        aria-expanded={isOpen}
      >
        <CategoryIcon className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="text-base font-black text-white/90 tracking-tight">
              {group.title}
            </h2>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold transition-all",
                isOpen
                  ? "text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                  : "border border-white/[0.08] bg-white/[0.04] text-white/60"
              )}
              style={
                isOpen
                  ? { background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }
                  : undefined
              }
            >
              {totalCount}
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-colors",
              isOpen ? "text-white/80" : "text-white/30"
            )}
          />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] p-3 sm:p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
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
                <div key={sub.id} className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 px-1 mb-3">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-white/60">
                      {sub.title}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-white/60">
                      {sub.items.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {sub.items.map((item) => (
                      <FormRow key={item.slug} item={item} onSelect={onSelect} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ---------- Main ---------- */

/**
 * "Vize i boravak" duplicates the dedicated Viza Navigator (/viza) entry that already
 * lives in the sidebar, so the category is no longer listed in the Formulari catalog.
 * The category data itself stays in formCatalog — its guides, /formulari/<slug> routes,
 * catalog search and legacy /musterformular/* mappings are untouched.
 */
const HIDDEN_CATEGORY_IDS = new Set(["vize"]);



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

  const visibleGroups = formCatalog.filter((g) => !HIDDEN_CATEGORY_IDS.has(g.id));

  const expandAll = () => setOpenIds(new Set(visibleGroups.map((g) => g.id)));
  const collapseAll = () => setOpenIds(new Set());

  const totalForms = allEntries.length;

  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
      }}
    >
      {/* Hero — BalkanLink Deutsch style */}
      <section
        className="relative overflow-hidden border-b border-white/[0.06] pb-10 pt-6 sm:pb-12 sm:pt-8"
        style={{
          background: "linear-gradient(145deg, #0f172a 0%, #020617 50%, #0c1a3d 100%)",
        }}
      >
        {/* Animated dot pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "120%",
            height: "100%",
            background:
              "radial-gradient(ellipse 60% 70% at 50% 20%, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.06) 40%, transparent 80%)",
          }}
        />

        <div className="relative z-10 px-5 sm:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.08] px-4 py-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-bold text-gold">
                  Katalog · Stand 2026
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl"
              >
                Formulari za Njemačku
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
              >
                Svi zvanični njemački obrasci — prevedeni i pojašnjeni na bosanskom.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex gap-3"
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-center min-w-[88px]">
                <div
                  className="text-2xl font-black tabular-nums"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {totalForms}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mt-0.5">
                  Obrazaca
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main area */}
      <div className="relative">
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-5 sm:px-10 lg:px-20 py-8">
          {/* Search + controls */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-6 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pretraži formulare (npr. Kindergeld, Anmeldung…)"
                className="pl-10 pr-10 h-11 text-sm rounded-xl border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-white placeholder:text-white/30 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/40"
                aria-label="Pretraga formulara"
              />
              {isSearching && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  aria-label="Očisti pretragu"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {!isSearching && (
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={expandAll}
                  className="px-4 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-bold text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
                >
                  Otvori sve
                </button>
                <button
                  onClick={collapseAll}
                  className="px-4 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-bold text-white/50 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
                >
                  Zatvori
                </button>
              </div>
            )}
          </motion.div>

          {/* Results */}
          {isSearching ? (
            <div className="space-y-3">
              <p className="text-xs text-white/50 px-1">
                {searchResults.length === 0
                  ? "Nema rezultata."
                  : `${searchResults.length} ${searchResults.length === 1 ? "rezultat" : "rezultata"} za „${search}"`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
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
            <div className="space-y-3">
              {visibleGroups.map((group, idx) => (
                <CategorySection
                  key={group.id}
                  group={group}
                  index={idx}
                  isOpen={openIds.has(group.id)}
                  onToggle={() => toggle(group.id)}
                  onSelect={onSelect}
                  onShowBuergergeldInfo={onShowBuergergeldInfo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
