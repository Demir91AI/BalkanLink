import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCountry, type CountryCode } from "@/contexts/CountryContext";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronDown, Search, Building2, Trophy, Users, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BUNDESLAENDER } from "@/lib/germany-data";
import ListingMapPreview from "@/components/ListingMapPreview";

/* ─── Two main tabs ─── */
type MainTab = "gemeinschaft" | "sport";

/* ─── Gemeinschaft subcategories per country ─── */
const GEMEINSCHAFT_SUBCATS: Record<string, { key: string; label: string; subCategories: string[] }[]> = {
  BIH: [
    { key: "religion", label: "🕌 Moscheen & Džemati", subCategories: ["dzamije", "dzemat", "mosque", "islamic_center"] },
    { key: "kultur", label: "🎭 Kulturvereine", subCategories: ["udruzenja", "association", "cultural_center"] },
  ],
  HR: [
    { key: "religion", label: "⛪ Katholische Missionen", subCategories: ["crkve", "church", "mission", "catholic_mission", "parish"] },
    { key: "kultur", label: "🎭 Kulturvereine", subCategories: ["udruzenja", "association", "cultural_center"] },
  ],
  SRB: [
    { key: "religion", label: "☦️ Orthodoxe Kirchen", subCategories: ["crkve", "church", "orthodox", "parish", "gemeinde"] },
    { key: "kultur", label: "🎭 Kulturvereine", subCategories: ["udruzenja", "association", "cultural_center"] },
  ],
  ME: [
    { key: "religion", label: "🛕 Religiöse Gemeinden", subCategories: ["dzamije", "crkve", "mosque", "church", "islamic_center"] },
    { key: "kultur", label: "🎭 Kulturvereine", subCategories: ["udruzenja", "association", "cultural_center"] },
  ],
  MK: [
    { key: "religion", label: "🛕 Religiöse Gemeinden", subCategories: ["dzamije", "crkve", "mosque", "church", "orthodox", "islamic_center", "parish"] },
    { key: "kultur", label: "🎭 Kulturvereine", subCategories: ["udruzenja", "association", "cultural_center"] },
  ],
  XK: [
    { key: "religion", label: "🕌 Moscheen", subCategories: ["dzamije", "mosque", "islamic_center", "crkve", "church", "cultural_center"] },
    { key: "kultur", label: "🎭 Kulturvereine", subCategories: ["udruzenja", "association"] },
  ],
  AL: [
    { key: "religion", label: "🕌 Moscheen", subCategories: ["dzamije", "mosque", "islamic_center", "crkve", "church", "cultural_center"] },
    { key: "kultur", label: "🎭 Kulturvereine", subCategories: ["udruzenja", "association"] },
  ],
};

/* ─── Sport subcategories ─── */
const SPORT_SUBCATS = [
  { key: "fudbal", label: "⚽ Fudbal", subCategories: ["fudbal", "football", "soccer"] },
  { key: "kosarka", label: "🏀 Košarka", subCategories: ["kosarka", "basketball"] },
  { key: "borilacki", label: "🥊 Borilački sportovi", subCategories: ["borilacki", "boxing", "martial_arts", "mma"] },
  { key: "folklor", label: "💃 Folklor & KUD", subCategories: ["folklor", "kud", "dance"] },
  { key: "ostalo", label: "🏅 Ostali sportovi", subCategories: ["sport", "handball", "volleyball", "tennis"] },
];

interface Listing {
  id: string;
  name: string;
  city: string;
  bundesland: string;
  origin_country: string;
  main_category: string;
  sub_category: string;
  address: string | null;
  google_maps_url: string | null;
}

export default function Community() {
  const { activeCountry } = useCountry();

  const [mainTab, setMainTab] = useState<MainTab>("gemeinschaft");
  const [activeSubgroup, setActiveSubgroup] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openBundeslaender, setOpenBundeslaender] = useState<Record<string, boolean>>({});
  const [openCities, setOpenCities] = useState<Record<string, boolean>>({});
  const cityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const dbCategory = mainTab === "gemeinschaft" ? "kultura" : "sport";

  const { data: listings = [], isLoading } = useQuery<Listing[]>({
    queryKey: ["community-listings", dbCategory],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_listings")
        .select("id, name, city, bundesland, origin_country, main_category, sub_category, address, google_maps_url")
        .eq("main_category", dbCategory)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const subcats = mainTab === "gemeinschaft"
    ? (GEMEINSCHAFT_SUBCATS[activeCountry] || GEMEINSCHAFT_SUBCATS.BIH)
    : SPORT_SUBCATS;

  const allCitiesWithData = useMemo(
    () => [...new Set(listings.map((l) => l.city))].sort(),
    [listings]
  );

  const citySuggestions = useMemo(() => {
    if (cityInput.length < 1) return [];
    const q = cityInput.toLowerCase();
    return allCitiesWithData.filter((c) => c.toLowerCase().includes(q)).slice(0, 10);
  }, [cityInput, allCitiesWithData]);

  const filtered = useMemo(() => {
    let result = listings.filter((l) => l.origin_country === activeCountry || l.origin_country === "BALKAN");

    if (activeSubgroup) {
      const sg = subcats.find((s) => s.key === activeSubgroup);
      if (sg) result = result.filter((l) => sg.subCategories.includes(l.sub_category));
    }

    if (cityInput.length >= 2)
      result = result.filter((l) => l.city.toLowerCase().includes(cityInput.toLowerCase()));

    return result;
  }, [listings, cityInput, activeCountry, activeSubgroup, subcats]);

  const hierarchy = useMemo(() => {
    const blMap: Record<string, Record<string, Listing[]>> = {};
    for (const item of filtered) {
      if (!blMap[item.bundesland]) blMap[item.bundesland] = {};
      if (!blMap[item.bundesland][item.city]) blMap[item.bundesland][item.city] = [];
      blMap[item.bundesland][item.city].push(item);
    }
    return BUNDESLAENDER.map((bl) => {
      const cities = blMap[bl] || {};
      const totalEntries = Object.values(cities).reduce((sum, arr) => sum + arr.length, 0);
      return {
        bundesland: bl,
        totalEntries,
        cities: Object.entries(cities)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([city, items]) => ({ city, items: items.sort((a, b) => a.name.localeCompare(b.name)) })),
      };
    });
  }, [filtered]);

  const totalEntries = filtered.length;
  const bundeslaenderWithData = hierarchy.filter((bl) => bl.totalEntries > 0).length;
  const citiesWithData = new Set(filtered.map((l) => l.city)).size;

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

  // Reset subgroup when country or tab changes
  useEffect(() => { setActiveSubgroup(""); }, [activeCountry, mainTab]);

  const toggleKey = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) =>
    setter((p) => ({ ...p, [key]: !p[key] }));

  const tabIcon = mainTab === "gemeinschaft" ? <Users className="h-5 w-5" /> : <Dumbbell className="h-5 w-5" />;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-white md:text-4xl">
            {mainTab === "gemeinschaft" ? "Gemeinschaft" : "Sport"}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base">
            {mainTab === "gemeinschaft"
              ? "Religija i kultura balkanske dijaspore u Njemačkoj."
              : "Balkanski sportski klubovi u Njemačkoj."}
          </motion.p>

          {/* Tab switcher */}
          <div className="mx-auto mt-6 flex max-w-xs gap-2 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.06)" }}>
            {(["gemeinschaft", "sport"] as MainTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setMainTab(tab)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all"
                style={{
                  background: mainTab === tab ? "rgba(227,179,65,0.2)" : "transparent",
                  color: mainTab === tab ? "#E3B341" : "rgba(255,255,255,0.5)",
                  border: mainTab === tab ? "1px solid rgba(227,179,65,0.3)" : "1px solid transparent",
                }}
              >
                {tab === "gemeinschaft" ? <Users className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
                {tab === "gemeinschaft" ? "Gemeinschaft" : "Sport"}
              </button>
            ))}
          </div>

          {!isLoading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mx-auto mt-6 flex justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{bundeslaenderWithData}</p>
                <p className="text-xs text-white/40">Bundesländer</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{citiesWithData}</p>
                <p className="text-xs text-white/40">Städte</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{totalEntries}</p>
                <p className="text-xs text-white/40">Einträge</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Sticky Filter Bar ─── */}
      <div className="sticky top-[6.5rem] z-30" style={{ background: "rgba(15,27,45,0.97)", borderBottom: "1px solid rgba(227,179,65,0.15)" }}>
        <div className="container max-w-5xl py-3">
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
                    <button className="w-full px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-[#1F3557] hover:text-[#E3B341]" onMouseDown={() => { setCityInput(c); setShowSuggestions(false); }}>
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Subcategory filter chips */}
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveSubgroup("")}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: !activeSubgroup ? "rgba(227,179,65,0.2)" : "rgba(255,255,255,0.04)",
                color: !activeSubgroup ? "#E3B341" : "rgba(255,255,255,0.5)",
                border: !activeSubgroup ? "1px solid rgba(227,179,65,0.3)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Sve
            </button>
            {subcats.map((sg) => (
              <button
                key={sg.key}
                onClick={() => setActiveSubgroup(sg.key)}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
                style={{
                  background: activeSubgroup === sg.key ? "rgba(227,179,65,0.2)" : "rgba(255,255,255,0.04)",
                  color: activeSubgroup === sg.key ? "#E3B341" : "rgba(255,255,255,0.5)",
                  border: activeSubgroup === sg.key ? "1px solid rgba(227,179,65,0.3)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {sg.label}
              </button>
            ))}
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

          {!isLoading && filtered.length === 0 && (
            <p className="py-20 text-center text-lg text-white/40">
              {mainTab === "sport"
                ? "Sport-Einträge werden bald hinzugefügt."
                : "Keine Einträge gefunden."}
            </p>
          )}

          <div className="space-y-4">
            {hierarchy.map((bl, bIdx) => {
              if (bl.totalEntries === 0) return null;
              const blOpen = openBundeslaender[bl.bundesland] ?? false;
              return (
                <motion.div key={bl.bundesland} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: bIdx * 0.02 }}
                  className="overflow-hidden rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))", border: "1px solid rgba(227,179,65,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                  <button onClick={() => toggleKey(setOpenBundeslaender, bl.bundesland)} className="flex w-full items-center gap-3 px-5 py-4 text-left transition-all hover:bg-white/5">
                    <Building2 className="h-5 w-5 text-[#E3B341]/70" />
                    <h2 className="text-base font-bold text-white md:text-lg">{bl.bundesland}</h2>
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: "rgba(227,179,65,0.15)", color: "#E3B341" }}>
                      {bl.totalEntries} {bl.totalEntries === 1 ? "Eintrag" : "Einträge"}
                    </span>
                    <ChevronDown className={`ml-auto h-4 w-4 text-white/40 transition-transform duration-300 ${blOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {blOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="space-y-1.5 px-5 pb-5">
                          {bl.cities.map(({ city, items }) => {
                            const cityOpen = openCities[city] ?? false;
                            return (
                              <div key={city} ref={(el) => { cityRefs.current[city] = el; }} className="overflow-hidden rounded-lg"
                                style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <button onClick={() => toggleKey(setOpenCities, city)} className="flex w-full items-center gap-2 px-4 py-3 text-left transition-all hover:bg-white/5">
                                  <MapPin className="h-3.5 w-3.5 text-[#E3B341]/50" />
                                  <span className="text-sm font-semibold text-white/90">{city}</span>
                                  <span className="text-xs text-white/40">({items.length})</span>
                                  <ChevronDown className={`ml-auto h-3.5 w-3.5 text-white/30 transition-transform duration-300 ${cityOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                  {cityOpen && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                      <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                                        {items.map((item) => (
                                          <div key={item.id} className="rounded-lg p-3.5 transition-all duration-300 hover:-translate-y-0.5"
                                            style={{ background: "rgba(22,38,63,0.8)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            <h4 className="text-sm font-bold text-white">{item.name}</h4>
                                            {item.address && (
                                              <p className="mt-2 flex items-start gap-1.5 text-xs text-white/40">
                                                <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                                                {item.address}
                                              </p>
                                            )}
                                            <ListingMapPreview address={item.address} name={item.name} googleMapsUrl={item.google_maps_url} />
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
