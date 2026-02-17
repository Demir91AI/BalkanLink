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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── constants ─── */

const ORIGIN_COUNTRIES = [
  { code: "BIH", label: "Bosnien und Herzegowina" },
  { code: "SRB", label: "Serbien" },
  { code: "HR", label: "Kroatien" },
  { code: "KS", label: "Kosovo" },
  { code: "MK", label: "Nordmazedonien" },
  { code: "CG", label: "Montenegro" },
];

const MAIN_CATEGORIES = [
  { key: "moschee", label: "Moschee" },
  { key: "dzemat", label: "Džemat" },
  { key: "restaurant", label: "Restaurant" },
  { key: "balkan_markt", label: "Balkan-Markt" },
  { key: "verein", label: "Verein" },
  { key: "kulturverein", label: "Kulturverein" },
];

const categoryLabel = (key: string) =>
  MAIN_CATEGORIES.find((c) => c.key === key)?.label ?? key;

const countryLabel = (code: string) =>
  ORIGIN_COUNTRIES.find((o) => o.code === code)?.label ?? code;

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

  const [countryFilter, setCountryFilter] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
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

  const citySuggestions = useMemo(() => {
    if (cityInput.length < 1) return [];
    const q = cityInput.toLowerCase();
    return allCitiesWithData.filter((c) => c.toLowerCase().includes(q)).slice(0, 10);
  }, [cityInput, allCitiesWithData]);

  /* filtered */
  const filtered = useMemo(() => {
    let result = listings;
    if (countryFilter) result = result.filter((l) => l.origin_country === countryFilter);
    if (cityInput.length >= 2)
      result = result.filter((l) => l.city.toLowerCase().includes(cityInput.toLowerCase()));
    if (categoryFilter) result = result.filter((l) => l.main_category === categoryFilter);
    return result;
  }, [listings, countryFilter, cityInput, categoryFilter]);

  /* hierarchy: bundesland → city → listings */
  const hierarchy = useMemo(() => {
    const map: Record<string, Record<string, Listing[]>> = {};
    for (const item of filtered) {
      if (!map[item.bundesland]) map[item.bundesland] = {};
      if (!map[item.bundesland][item.city]) map[item.bundesland][item.city] = [];
      map[item.bundesland][item.city].push(item);
    }
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([bl, cities]) => ({
        bundesland: bl,
        cities: Object.entries(cities)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([city, items]) => ({ city, items: items.sort((a, b) => a.name.localeCompare(b.name)) })),
        totalEntries: Object.values(cities).reduce((s, a) => s + a.length, 0),
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
      }, 250);
    }
  }, [cityInput, filtered]);

  const toggleBl = (bl: string) => setOpenBundeslaender((p) => ({ ...p, [bl]: !p[bl] }));
  const toggleCity = (city: string) => setOpenCities((p) => ({ ...p, [city]: !p[city] }));

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
            Balkan Community in Deutschland
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base"
          >
            Finde Restaurants, Shops, Vereine und Gemeinden – strukturiert und schnell.
          </motion.p>
        </div>
      </section>

      {/* ─── Sticky Filter Bar ─── */}
      <div className="sticky top-14 z-30" style={{ background: "rgba(15,27,45,0.97)", borderBottom: "1px solid rgba(227,179,65,0.15)" }}>
        <div className="container max-w-5xl py-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {/* Country */}
            <Select value={countryFilter} onValueChange={(v) => setCountryFilter(v === "all" ? "" : v)}>
              <SelectTrigger className="border-white/10 text-white placeholder:text-white/40" style={{ background: "#16263F" }}>
                <SelectValue placeholder="Herkunftsland" />
              </SelectTrigger>
              <SelectContent className="border-white/10 z-50" style={{ background: "#16263F" }}>
                <SelectItem value="all" className="text-white/80 focus:text-white" style={{ background: "transparent" }}>
                  Alle Länder
                </SelectItem>
                {ORIGIN_COUNTRIES.map((o) => (
                  <SelectItem key={o.code} value={o.code} className="text-white/80 focus:text-white hover:!text-[#E3B341]" style={{ background: "transparent" }}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

          <div className="space-y-4">
            {hierarchy.map((bl, idx) => {
              const isOpen = openBundeslaender[bl.bundesland] ?? false;

              return (
                <motion.div
                  key={bl.bundesland}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="overflow-hidden rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(22,38,63,0.9), rgba(22,38,63,0.7))",
                    border: "1px solid rgba(227,179,65,0.12)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Bundesland header */}
                  <button
                    onClick={() => toggleBl(bl.bundesland)}
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
                      {bl.cities.length} {bl.cities.length === 1 ? "Stadt" : "Städte"}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
                    >
                      {bl.totalEntries} {bl.totalEntries === 1 ? "Eintrag" : "Einträge"}
                    </span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Cities */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 px-5 pb-5">
                          {bl.cities.map(({ city, items }) => {
                            const cityOpen = openCities[city] ?? false;

                            return (
                              <div
                                key={city}
                                ref={(el) => { cityRefs.current[city] = el; }}
                                className="overflow-hidden rounded-lg"
                                style={{
                                  background: "rgba(15,27,45,0.6)",
                                  border: "1px solid rgba(255,255,255,0.06)",
                                }}
                              >
                                {/* City header */}
                                <button
                                  onClick={() => toggleCity(city)}
                                  className="flex w-full items-center gap-2 px-4 py-3 text-left transition-all"
                                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(31,53,87,0.4)")}
                                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                  <MapPin className="h-3.5 w-3.5 text-[#E3B341]/60" />
                                  <span className="text-sm font-semibold text-white">{city}</span>
                                  <span
                                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                                    style={{ background: "rgba(227,179,65,0.1)", color: "#E3B341" }}
                                  >
                                    {items.length}
                                  </span>
                                  <ChevronDown
                                    className={`ml-auto h-3.5 w-3.5 text-white/30 transition-transform duration-300 ${cityOpen ? "rotate-180" : ""}`}
                                  />
                                </button>

                                {/* Items */}
                                <AnimatePresence>
                                  {cityOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
                                        {items.map((item) => (
                                          <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="group rounded-lg p-4 transition-all duration-300"
                                            style={{
                                              background: "rgba(22,38,63,0.8)",
                                              border: "1px solid rgba(255,255,255,0.05)",
                                              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                                            }}
                                            onMouseOver={(e) => {
                                              e.currentTarget.style.transform = "translateY(-2px)";
                                              e.currentTarget.style.borderColor = "rgba(227,179,65,0.25)";
                                              e.currentTarget.style.boxShadow = "0 8px 32px rgba(227,179,65,0.08)";
                                            }}
                                            onMouseOut={(e) => {
                                              e.currentTarget.style.transform = "translateY(0)";
                                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                                              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)";
                                            }}
                                          >
                                            <h4 className="text-sm font-bold text-white">{item.name}</h4>

                                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                              <span
                                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                                style={{ background: "rgba(227,179,65,0.12)", color: "#E3B341" }}
                                              >
                                                {categoryLabel(item.main_category)}
                                              </span>
                                              <span
                                                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                                                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                                              >
                                                {countryLabel(item.origin_country)}
                                              </span>
                                            </div>

                                            {item.address && (
                                              <p className="mt-2 flex items-start gap-1.5 text-xs text-white/40">
                                                <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                                                {item.address}
                                              </p>
                                            )}

                                            {item.description && (
                                              <p className="mt-2 text-xs leading-relaxed text-white/50">
                                                {item.description}
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
                                            </div>
                                          </motion.div>
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
              {filtered.length} Einträge in {hierarchy.length} Bundesländern
            </p>
          )}
        </div>
      </section>
    </>
  );
}
