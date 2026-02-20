import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, ChevronDown, Search, Building2, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Listing {
  id: string;
  name: string;
  city: string;
  bundesland: string;
  origin_country: string;
  main_category: string;
  address: string | null;
  google_maps_url: string | null;
}

const ORIGIN_FILTERS = [
  { key: "", label: "Alle Länder" },
  { key: "BIH", label: "🇧🇦 BiH" },
  { key: "HR", label: "🇭🇷 HR" },
  { key: "SRB", label: "🇷🇸 SRB" },
  { key: "AL", label: "🇦🇱 AL" },
  { key: "XK", label: "🇽🇰 XK" },
  { key: "MK", label: "🇲🇰 MK" },
  { key: "ME", label: "🇲🇪 ME" },
];

const GASTRO_CATEGORIES = ["restoran_kafic"];

export default function Restorani() {
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [originFilter, setOriginFilter] = useState("");
  const [openBl, setOpenBl] = useState<Record<string, boolean>>({});
  const [openCities, setOpenCities] = useState<Record<string, boolean>>({});
  const cityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data: listings = [], isLoading } = useQuery<Listing[]>({
    queryKey: ["restorani-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_listings")
        .select("id, name, city, bundesland, origin_country, main_category, address, google_maps_url")
        .in("main_category", GASTRO_CATEGORIES)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const allCities = useMemo(() => [...new Set(listings.map((l) => l.city))].sort(), [listings]);
  const citySuggestions = useMemo(() => {
    if (cityInput.length < 1) return [];
    return allCities.filter((c) => c.toLowerCase().includes(cityInput.toLowerCase())).slice(0, 10);
  }, [cityInput, allCities]);

  const filtered = useMemo(() => {
    let result = listings;
    if (originFilter) result = result.filter((l) => l.origin_country === originFilter);
    if (cityInput.length >= 2) result = result.filter((l) => l.city.toLowerCase().includes(cityInput.toLowerCase()));
    return result;
  }, [listings, originFilter, cityInput]);

  const hierarchy = useMemo(() => {
    const blMap: Record<string, Record<string, Listing[]>> = {};
    for (const item of filtered) {
      if (!blMap[item.bundesland]) blMap[item.bundesland] = {};
      if (!blMap[item.bundesland][item.city]) blMap[item.bundesland][item.city] = [];
      blMap[item.bundesland][item.city].push(item);
    }
    return Object.entries(blMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([bl, cities]) => ({
        bundesland: bl,
        total: Object.values(cities).reduce((s, a) => s + a.length, 0),
        cities: Object.entries(cities).sort(([a], [b]) => a.localeCompare(b)).map(([city, items]) => ({ city, items })),
      }));
  }, [filtered]);

  useEffect(() => {
    if (cityInput.length < 2) return;
    const match = filtered.find((l) => l.city.toLowerCase() === cityInput.toLowerCase());
    if (match) {
      setOpenBl((p) => ({ ...p, [match.bundesland]: true }));
      setOpenCities((p) => ({ ...p, [match.city]: true }));
      setTimeout(() => cityRefs.current[match.city]?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    }
  }, [cityInput, filtered]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) =>
    setter((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white md:text-4xl">
            🍽️ Balkan Restorani
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base">
            Restorani, kafići, grill i fast food iz balkanskih zemalja u Njemačkoj.
          </motion.p>
        </div>
      </section>

      <div className="sticky top-14 z-30" style={{ background: "rgba(15,27,45,0.97)", borderBottom: "1px solid rgba(227,179,65,0.15)" }}>
        <div className="container max-w-5xl py-3 grid gap-3 sm:grid-cols-2">
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
                  <li key={c}><button className="w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-[#1F3557] hover:text-[#E3B341]" onMouseDown={() => { setCityInput(c); setShowSuggestions(false); }}>{c}</button></li>
                ))}
              </ul>
            )}
          </div>
          <Select value={originFilter} onValueChange={(v) => setOriginFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="border-white/10 text-white" style={{ background: "#16263F" }}><SelectValue placeholder="Herkunftsland" /></SelectTrigger>
            <SelectContent className="border-white/10 z-50" style={{ background: "#16263F" }}>
              {ORIGIN_FILTERS.map((o) => (
                <SelectItem key={o.key || "all"} value={o.key || "all"} className="text-white/80 focus:text-white">{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <section className="min-h-[60vh] py-8" style={{ background: "#0F1B2D" }}>
        <div className="container max-w-5xl">
          {isLoading && <div className="py-20 text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E3B341] border-t-transparent" /></div>}
          {!isLoading && hierarchy.length === 0 && <p className="py-20 text-center text-white/40 text-lg">Keine Einträge gefunden.</p>}

          <div className="space-y-4">
            {hierarchy.map((bl, bIdx) => {
              const blOpen = openBl[bl.bundesland] ?? false;
              return (
                <motion.div key={bl.bundesland} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: bIdx * 0.05 }}
                  className="overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))", border: "1px solid rgba(227,179,65,0.15)" }}>
                  <button onClick={() => toggle(setOpenBl, bl.bundesland)} className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-white/5">
                    <Building2 className="h-5 w-5 text-[#E3B341]/70" />
                    <h2 className="text-base font-bold text-white">{bl.bundesland}</h2>
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: "rgba(227,179,65,0.15)", color: "#E3B341" }}>{bl.total}</span>
                    <ChevronDown className={`ml-auto h-4 w-4 text-white/40 transition-transform ${blOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {blOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-1.5 px-5 pb-5">
                          {bl.cities.map(({ city, items }) => {
                            const cityOpen = openCities[city] ?? false;
                            return (
                              <div key={city} ref={(el) => { cityRefs.current[city] = el; }} className="overflow-hidden rounded-lg" style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <button onClick={() => toggle(setOpenCities, city)} className="flex w-full items-center gap-2 px-4 py-3 hover:bg-white/5">
                                  <MapPin className="h-3.5 w-3.5 text-[#E3B341]/50" />
                                  <span className="text-sm font-semibold text-white/90">{city}</span>
                                  <span className="text-xs text-white/40">({items.length})</span>
                                  <ChevronDown className={`ml-auto h-3.5 w-3.5 text-white/30 transition-transform ${cityOpen ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                  {cityOpen && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                      <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                                        {items.map((item) => (
                                          <div key={item.id} className="rounded-lg p-3.5" style={{ background: "rgba(22,38,63,0.8)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            <h4 className="text-sm font-bold text-white">{item.name}</h4>
                                            {item.address && <p className="mt-1.5 flex items-start gap-1.5 text-xs text-white/40"><MapPin className="mt-0.5 h-3 w-3 shrink-0" />{item.address}</p>}
                                            {item.google_maps_url && (
                                              <a href={item.google_maps_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-[#E3B341]/70 hover:text-[#E3B341]">
                                                📍 Google Maps
                                              </a>
                                            )}
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
        </div>
      </section>
    </>
  );
}
