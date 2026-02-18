import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Globe,
  ChevronDown,
  ExternalLink,
  Search,
  Building2,
  Tag,
  Facebook,
  Instagram,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── constants ─── */

const MAIN_CATEGORIES = [
  { key: "dzemat_moschee", label: "Džemati & Moscheen" },
  { key: "restaurant", label: "Restaurants" },
  { key: "baeckerei", label: "Bäckereien" },
  { key: "markt", label: "Märkte" },
  { key: "sport", label: "Sport" },
  { key: "kulturno_drustvo", label: "Kulturno društvo" },
];

const categoryLabel = (key: string) =>
  MAIN_CATEGORIES.find((c) => c.key === key)?.label ?? key;

/* ─── types ─── */

interface Listing {
  id: string;
  name: string;
  city: string;
  bundesland: string;
  origin_country: string;
  main_category: string;
  sub_category: string;
  address: string | null;
  description: string | null;
  website: string | null;
  instagram: string | null;
  google_maps_url: string | null;
}

/* ─── component ─── */

export default function Community() {
  const { language } = useLanguage();

  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [openBundeslaender, setOpenBundeslaender] = useState<Record<string, boolean>>({});
  const [openCities, setOpenCities] = useState<Record<string, boolean>>({});

  const cityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data: listings = [], isLoading } = useQuery<Listing[]>({
    queryKey: ["community-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_listings")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  /* cities with data for autocomplete */
  const allCitiesWithData = useMemo(
    () => [...new Set(listings.map((l) => l.city))].sort(),
    [listings]
  );

  const allBundeslaender = useMemo(
    () => [...new Set(listings.map((l) => l.bundesland))].sort(),
    [listings]
  );

  const citySuggestions = useMemo(() => {
    if (cityInput.length < 1) return [];
    const q = cityInput.toLowerCase();
    return allCitiesWithData.filter((c) => c.toLowerCase().includes(q)).slice(0, 10);
  }, [cityInput, allCitiesWithData]);

  /* filtered */
  const filtered = useMemo(() => {
    let result = listings;
    if (cityInput.length >= 2)
      result = result.filter((l) => l.city.toLowerCase().includes(cityInput.toLowerCase()));
    if (categoryFilter) result = result.filter((l) => l.main_category === categoryFilter);
    return result;
  }, [listings, cityInput, categoryFilter]);

  /* hierarchy: bundesland → city → category → entries */
  const hierarchy = useMemo(() => {
    const blMap: Record<string, Record<string, Record<string, Listing[]>>> = {};

    for (const item of filtered) {
      const bl = item.bundesland;
      const city = item.city;
      const cat = item.main_category;

      if (!blMap[bl]) blMap[bl] = {};
      if (!blMap[bl][city]) blMap[bl][city] = {};
      if (!blMap[bl][city][cat]) blMap[bl][city][cat] = [];
      blMap[bl][city][cat].push(item);
    }

    return Object.entries(blMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([bl, cities]) => ({
        bundesland: bl,
        totalEntries: Object.values(cities).reduce(
          (sum, cats) => sum + Object.values(cats).reduce((s, arr) => s + arr.length, 0), 0
        ),
        cities: Object.entries(cities)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([city, cats]) => ({
            city,
            totalEntries: Object.values(cats).reduce((s, a) => s + a.length, 0),
            categories: MAIN_CATEGORIES
              .filter((mc) => cats[mc.key])
              .map((mc) => ({
                key: mc.key,
                label: mc.label,
                items: cats[mc.key].sort((a, b) => a.name.localeCompare(b.name)),
              })),
          })),
      }));
  }, [filtered]);

  /* auto-open when city is typed */
  useEffect(() => {
    if (cityInput.length < 2) return;
    const match = filtered.find((l) => l.city.toLowerCase() === cityInput.toLowerCase());
    if (match) {
      setOpenBundeslaender((p) => ({ ...p, [match.bundesland]: true }));
      setOpenCities((p) => ({ ...p, [match.city]: true }));
      setTimeout(() => {
        cityRefs.current[match.city]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, [cityInput, filtered]);

  const toggleKey = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) =>
    setter((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white md:text-4xl"
          >
            Bosnische Community in Deutschland
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base"
          >
            Finde Džemate, Restaurants, Vereine und Gemeinden aus Bosnien und Herzegowina.
          </motion.p>

          {/* Stats */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 flex justify-center gap-6"
            >
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{allBundeslaender.length}</p>
                <p className="text-xs text-white/40">Bundesländer</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{allCitiesWithData.length}</p>
                <p className="text-xs text-white/40">Städte</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{listings.length}</p>
                <p className="text-xs text-white/40">Einträge</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Sticky Filter Bar ─── */}
      <div className="sticky top-14 z-30" style={{ background: "rgba(15,27,45,0.97)", borderBottom: "1px solid rgba(227,179,65,0.15)" }}>
        <div className="container max-w-5xl py-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* City Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <Input
                placeholder="Stadt suchen…"
                value={cityInput}
                onChange={(e) => { setCityInput(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="border-white/10 pl-9 text-white placeholder:text-white/40"
                style={{ background: "#16263F" }}
              />
              {showSuggestions && citySuggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full rounded-lg border border-white/10 shadow-2xl" style={{ background: "#16263F" }}>
                  {citySuggestions.map((c) => (
                    <li key={c}>
                      <button
                        className="w-full px-3 py-2 text-left text-sm text-white/80 transition-colors"
                        style={{ background: "transparent" }}
                        onMouseOver={(e) => { e.currentTarget.style.background = "#1F3557"; e.currentTarget.style.color = "#E3B341"; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                        onMouseDown={() => { setCityInput(c); setShowSuggestions(false); }}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Category */}
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v === "all" ? "" : v)}>
              <SelectTrigger className="border-white/10 text-white placeholder:text-white/40" style={{ background: "#16263F" }}>
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent className="border-white/10 z-50" style={{ background: "#16263F" }}>
                <SelectItem value="all" className="text-white/80 focus:text-white" style={{ background: "transparent" }}>
                  Alle Kategorien
                </SelectItem>
                {MAIN_CATEGORIES.map((c) => (
                  <SelectItem key={c.key} value={c.key} className="text-white/80 focus:text-white hover:!text-[#E3B341]" style={{ background: "transparent" }}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <section className="min-h-[60vh] py-8" style={{ background: "#0F1B2D" }}>
        <div className="container max-w-5xl">
          {isLoading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E3B341] border-t-transparent" />
            </div>
          )}

          {!isLoading && hierarchy.length === 0 && (
            <p className="py-20 text-center text-white/40 text-lg">Keine Einträge gefunden.</p>
          )}

          {/* Bundesland level */}
          <div className="space-y-4">
            {hierarchy.map((bl, bIdx) => {
              const blOpen = openBundeslaender[bl.bundesland] ?? false;

              return (
                <motion.div
                  key={bl.bundesland}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: bIdx * 0.05 }}
                  className="overflow-hidden rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))",
                    border: "1px solid rgba(227,179,65,0.15)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Bundesland header */}
                  <button
                    onClick={() => toggleKey(setOpenBundeslaender, bl.bundesland)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-all"
                    onMouseOver={(e) => (e.currentTarget.style.background = "rgba(31,53,87,0.5)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <Building2 className="h-5 w-5 text-[#E3B341]/70" />
                    <h2 className="text-base font-bold text-white md:text-lg">{bl.bundesland}</h2>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: "rgba(227,179,65,0.15)", color: "#E3B341" }}
                    >
                      {bl.totalEntries} {bl.totalEntries === 1 ? "Eintrag" : "Einträge"}
                    </span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 text-white/40 transition-transform duration-300 ${blOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Cities within Bundesland */}
                  <AnimatePresence>
                    {blOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1.5 px-5 pb-5">
                          {bl.cities.map(({ city, totalEntries, categories }) => {
                            const cityOpen = openCities[city] ?? false;

                            return (
                              <div
                                key={city}
                                ref={(el) => { cityRefs.current[city] = el; }}
                                className="overflow-hidden rounded-lg"
                                style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
                              >
                                {/* City header */}
                                <button
                                  onClick={() => toggleKey(setOpenCities, city)}
                                  className="flex w-full items-center gap-2 px-4 py-3 text-left transition-all"
                                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(31,53,87,0.4)")}
                                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                  <MapPin className="h-3.5 w-3.5 text-[#E3B341]/50" />
                                  <span className="text-sm font-semibold text-white/90">{city}</span>
                                  <span className="text-xs text-white/40">
                                    ({totalEntries} {totalEntries === 1 ? "Eintrag" : "Einträge"})
                                  </span>
                                  <ChevronDown
                                    className={`ml-auto h-3.5 w-3.5 text-white/30 transition-transform duration-300 ${cityOpen ? "rotate-180" : ""}`}
                                  />
                                </button>

                                {/* Categories within city */}
                                <AnimatePresence>
                                  {cityOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="space-y-2 px-4 pb-4">
                                        {categories.map(({ key, label, items }) => (
                                          <div key={key}>
                                            <div className="mb-1.5 flex items-center gap-1.5">
                                              <Tag className="h-3 w-3 text-[#E3B341]/60" />
                                              <span className="text-xs font-semibold uppercase tracking-wider text-[#E3B341]/70">{label}</span>
                                            </div>
                                            <div className="grid gap-2 sm:grid-cols-2">
                                              {items.map((item) => (
                                                <motion.div
                                                  key={item.id}
                                                  initial={{ opacity: 0, y: 6 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ duration: 0.15 }}
                                                  className="rounded-lg p-3.5 transition-all duration-300"
                                                  style={{
                                                    background: "rgba(22,38,63,0.8)",
                                                    border: "1px solid rgba(255,255,255,0.05)",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                                                  }}
                                                  onMouseOver={(e) => {
                                                    e.currentTarget.style.transform = "translateY(-1px)";
                                                    e.currentTarget.style.borderColor = "rgba(227,179,65,0.25)";
                                                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(227,179,65,0.08)";
                                                  }}
                                                  onMouseOut={(e) => {
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)";
                                                  }}
                                                >
                                                  <h4 className="text-sm font-bold text-white">{item.name}</h4>

                                                  {item.address && (
                                                    <p className="mt-2 flex items-start gap-1.5 text-xs text-white/40">
                                                      <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                                                      {item.address}
                                                    </p>
                                                  )}

                                                  <div className="mt-3 flex flex-wrap gap-2">
                                                    {item.google_maps_url && (
                                                      <a
                                                        href={item.google_maps_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
                                                        style={{ background: "rgba(227,179,65,0.1)", color: "#E3B341" }}
                                                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(227,179,65,0.2)")}
                                                        onMouseOut={(e) => (e.currentTarget.style.background = "rgba(227,179,65,0.1)")}
                                                      >
                                                        <ExternalLink className="h-3 w-3" />
                                                        Google Maps
                                                      </a>
                                                    )}
                                                    {item.website && (
                                                      <a
                                                        href={item.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
                                                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                                                        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#E3B341"; }}
                                                        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                                                      >
                                                        <Globe className="h-3 w-3" />
                                                        Website
                                                      </a>
                                                    )}
                                                    {item.description && item.description.startsWith("https://facebook.com") && (
                                                      <a
                                                        href={item.description}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
                                                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                                                        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#E3B341"; }}
                                                        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                                                      >
                                                        <Facebook className="h-3 w-3" />
                                                        Facebook
                                                      </a>
                                                    )}
                                                    {item.instagram && (
                                                      <a
                                                        href={item.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
                                                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                                                        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#E3B341"; }}
                                                        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                                                      >
                                                        <Instagram className="h-3 w-3" />
                                                        Instagram
                                                      </a>
                                                    )}
                                                  </div>
                                                </motion.div>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* total count */}
          {!isLoading && filtered.length > 0 && (
            <p className="mt-8 text-center text-xs text-white/30">
              {filtered.length} Einträge insgesamt
            </p>
          )}
        </div>
      </section>
    </>
  );
}
