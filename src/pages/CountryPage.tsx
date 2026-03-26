import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, MapPin, Building2, Search, Landmark, Users, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BUNDESLAENDER } from "@/lib/germany-data";
import ListingMapPreview from "@/components/ListingMapPreview";
import { COUNTRIES, type CountryCode } from "@/contexts/CountryContext";
import { navigateBackOrHome } from "@/lib/navigation";

/* ─── Gemeinschaft subcategories (religion + culture combined) per country ─── */
const GEMEINSCHAFT_SUBCATS: Record<string, { key: string; label: string; subs: string[] }[]> = {
  BIH: [
    { key: "dzamije", label: "🕌 Džamije & Džemati", subs: ["dzamije", "dzemat", "mosque", "islamic_center"] },
    { key: "kultur", label: "🎭 Kulturna udruženja", subs: ["udruzenja", "association", "cultural_center"] },
  ],
  HR: [
    { key: "missionen", label: "⛪ Katoličke misije & Crkve", subs: ["crkve", "church", "mission", "catholic_mission", "parish"] },
    { key: "kultur", label: "🎭 Kulturna udruženja", subs: ["udruzenja", "association", "cultural_center"] },
  ],
  SRB: [
    { key: "orthodox", label: "☦️ Pravoslavne crkve", subs: ["crkve", "church", "orthodox", "parish", "gemeinde"] },
    { key: "kultur", label: "🎭 Kulturna udruženja", subs: ["udruzenja", "association", "cultural_center"] },
  ],
  ME: [
    { key: "religion", label: "🛕 Vjerske zajednice", subs: ["dzamije", "crkve", "mosque", "church", "islamic_center", "orthodox"] },
    { key: "kultur", label: "🎭 Kulturna udruženja", subs: ["udruzenja", "association", "cultural_center"] },
  ],
  MK: [
    { key: "orthodox", label: "☦️ Pravoslavne zajednice", subs: ["crkve", "church", "orthodox", "parish"] },
    { key: "islamic", label: "🕌 Islamske zajednice", subs: ["dzamije", "mosque", "islamic_center"] },
    { key: "kultur", label: "🎭 Kulturna udruženja", subs: ["udruzenja", "association", "cultural_center"] },
  ],
  XK: [
    { key: "moscheen", label: "🕌 Džamije", subs: ["dzamije", "mosque", "islamic_center"] },
    { key: "zentren", label: "🏛️ Kulturno-religiozni centri", subs: ["crkve", "church", "cultural_center"] },
    { key: "kultur", label: "🎭 Kulturna udruženja", subs: ["udruzenja", "association"] },
  ],
  AL: [
    { key: "moscheen", label: "🕌 Džamije", subs: ["dzamije", "mosque", "islamic_center"] },
    { key: "zentren", label: "🏛️ Kulturno-religiozni centri", subs: ["crkve", "church", "cultural_center"] },
    { key: "kultur", label: "🎭 Kulturna udruženja", subs: ["udruzenja", "association"] },
  ],
};

const SPORT_SUBCATS = [
  { key: "fudbal", label: "⚽ Fußball", subs: ["fudbal", "football", "soccer"] },
  { key: "kosarka", label: "🏀 Basketball", subs: ["kosarka", "basketball"] },
  { key: "borilacki", label: "🥊 Kampfsport", subs: ["borilacki", "boxing", "martial_arts", "mma"] },
  { key: "odbojka", label: "🏐 Volleyball", subs: ["volleyball", "odbojka"] },
  { key: "ostalo", label: "🏅 Andere", subs: ["sport", "handball", "tennis"] },
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

type SectionKey = "gemeinschaft" | "sport";

export default function CountryPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const countryCode = (code?.toUpperCase() || "BIH") as CountryCode;
  const country = COUNTRIES.find((c) => c.code === countryCode);

  const [activeSection, setActiveSection] = useState<SectionKey>("gemeinschaft");
  const [activeSub, setActiveSub] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openBundeslaender, setOpenBundeslaender] = useState<Record<string, boolean>>({});
  const [openCities, setOpenCities] = useState<Record<string, boolean>>({});
  const cityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const countryName: Record<string, string> = {
    BIH: "Bosna i Hercegovina",
    HR: "Hrvatska",
    SRB: "Srbija",
    ME: "Crna Gora",
    MK: "Sjeverna Makedonija",
    XK: "Kosovo",
    AL: "Albanija",
    SI: "Slovenija",
  };

  // Fetch ALL community listings for this country
  const { data: listings = [], isLoading } = useQuery<Listing[]>({
    queryKey: ["country-listings", countryCode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_listings")
        .select("id, name, city, bundesland, origin_country, main_category, sub_category, address, google_maps_url")
        .or(`origin_country.eq.${countryCode},origin_country.eq.BALKAN`)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Determine which listings belong to current section
  const filtered = useMemo(() => {
    let result = listings;

    if (activeSection === "gemeinschaft") {
      const gemSubs = GEMEINSCHAFT_SUBCATS[countryCode] || [];
      const allGemSubs = gemSubs.flatMap((s) => s.subs);
      result = result.filter((l) => l.main_category === "kultura" && allGemSubs.includes(l.sub_category));
      if (activeSub) {
        const sg = gemSubs.find((s) => s.key === activeSub);
        if (sg) result = result.filter((l) => sg.subs.includes(l.sub_category));
      }
    } else {
      result = result.filter((l) => l.main_category === "sport");
      if (activeSub) {
        const sg = SPORT_SUBCATS.find((s) => s.key === activeSub);
        if (sg) result = result.filter((l) => sg.subs.includes(l.sub_category));
      }
    }

    if (cityInput.length >= 2)
      result = result.filter((l) => l.city.toLowerCase().includes(cityInput.toLowerCase()));

    return result;
  }, [listings, activeSection, activeSub, cityInput, countryCode]);

  const allCities = useMemo(() => [...new Set(filtered.map((l) => l.city))].sort(), [filtered]);
  const citySuggestions = useMemo(() => {
    if (cityInput.length < 1) return [];
    return allCities.filter((c) => c.toLowerCase().includes(cityInput.toLowerCase())).slice(0, 8);
  }, [cityInput, allCities]);

  const hierarchy = useMemo(() => {
    const blMap: Record<string, Record<string, Listing[]>> = {};
    for (const item of filtered) {
      if (!blMap[item.bundesland]) blMap[item.bundesland] = {};
      if (!blMap[item.bundesland][item.city]) blMap[item.bundesland][item.city] = [];
      blMap[item.bundesland][item.city].push(item);
    }
    return BUNDESLAENDER.map((bl) => {
      const cities = blMap[bl] || {};
      const total = Object.values(cities).reduce((s, a) => s + a.length, 0);
      return {
        bundesland: bl,
        total,
        cities: Object.entries(cities).sort(([a], [b]) => a.localeCompare(b)).map(([city, items]) => ({ city, items: items.sort((a, b) => a.name.localeCompare(b.name)) })),
      };
    });
  }, [filtered]);

  useEffect(() => { setActiveSub(""); }, [activeSection]);

  useEffect(() => {
    if (cityInput.length < 2) return;
    const match = filtered.find((l) => l.city.toLowerCase() === cityInput.toLowerCase());
    if (match) {
      setOpenBundeslaender((p) => ({ ...p, [match.bundesland]: true }));
      setOpenCities((p) => ({ ...p, [match.city]: true }));
      setTimeout(() => { cityRefs.current[match.city]?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 350);
    }
  }, [cityInput, filtered]);

  const toggleKey = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) =>
    setter((p) => ({ ...p, [key]: !p[key] }));

  const sections: { key: SectionKey; label: string; icon: typeof Landmark }[] = [
    { key: "gemeinschaft", label: "Gemeinschaft", icon: Users },
    { key: "sport", label: "Sportklubs", icon: Trophy },
  ];

  const currentSubcats = activeSection === "gemeinschaft"
    ? (GEMEINSCHAFT_SUBCATS[countryCode] || [])
    : SPORT_SUBCATS;

  if (!country) return <div className="py-20 text-center text-muted-foreground">Land nicht gefunden.</div>;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3" />
        <div className="container relative max-w-5xl">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
            <ArrowLeft /> Nazad
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-5xl">{country.flag}</span>
            <h1 className="mt-3 text-3xl font-black text-primary-foreground md:text-4xl">
              {countryName[countryCode] || countryCode}
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/50">Diaspora-Gemeinschaften in Deutschland</p>
          </motion.div>

          {!isLoading && (
            <div className="mt-6 flex gap-6">
              {sections.map((s) => {
                const count = listings.filter((l) => {
                  if (s.key === "gemeinschaft") {
                    const allSubs = (GEMEINSCHAFT_SUBCATS[countryCode] || []).flatMap((x) => x.subs);
                    return l.main_category === "kultura" && allSubs.includes(l.sub_category);
                  }
                  return l.main_category === "sport";
                }).length;
                return (
                  <div key={s.key} className="text-center">
                    <p className="text-2xl font-bold text-gold">{count}</p>
                    <p className="text-xs text-primary-foreground/40">{s.label}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section tabs */}
      <div className="sticky top-14 z-30 border-b border-border/30 bg-primary/95 backdrop-blur-xl">
        <div className="container max-w-5xl">
          <div className="flex gap-1 py-2">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all"
                style={{
                  background: activeSection === s.key ? "hsl(45 93% 49% / 0.15)" : "transparent",
                  color: activeSection === s.key ? "hsl(45 93% 49%)" : "hsl(0 0% 100% / 0.5)",
                  border: activeSection === s.key ? "1px solid hsl(45 93% 49% / 0.3)" : "1px solid transparent",
                }}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[7.5rem] z-20 border-b border-border/20 bg-primary/95 backdrop-blur-xl">
        <div className="container max-w-5xl py-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gold">
              <Search className="h-3.5 w-3.5 text-primary" />
            </span>
            <Input
              placeholder="Stadt suchen…"
              value={cityInput}
              onChange={(e) => { setCityInput(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="border-primary-foreground/10 bg-primary pl-12 text-primary-foreground placeholder:text-primary-foreground/30"
            />
            {showSuggestions && citySuggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full rounded-lg border border-primary-foreground/10 bg-primary shadow-2xl">
                {citySuggestions.map((c) => (
                  <li key={c}>
                    <button className="w-full px-3 py-2 text-left text-sm text-primary-foreground/80 transition-colors hover:bg-primary-foreground/5 hover:text-gold" onMouseDown={() => { setCityInput(c); setShowSuggestions(false); }}>
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {currentSubcats.length > 0 && (
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveSub("")}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
                style={{
                  background: !activeSub ? "hsl(45 93% 49% / 0.2)" : "hsl(0 0% 100% / 0.04)",
                  color: !activeSub ? "hsl(45 93% 49%)" : "hsl(0 0% 100% / 0.5)",
                  border: !activeSub ? "1px solid hsl(45 93% 49% / 0.3)" : "1px solid hsl(0 0% 100% / 0.08)",
                }}
              >
                Alle
              </button>
              {currentSubcats.map((sg) => (
                <button
                  key={sg.key}
                  onClick={() => setActiveSub(sg.key)}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
                  style={{
                    background: activeSub === sg.key ? "hsl(45 93% 49% / 0.2)" : "hsl(0 0% 100% / 0.04)",
                    color: activeSub === sg.key ? "hsl(45 93% 49%)" : "hsl(0 0% 100% / 0.5)",
                    border: activeSub === sg.key ? "1px solid hsl(45 93% 49% / 0.3)" : "1px solid hsl(0 0% 100% / 0.08)",
                  }}
                >
                  {sg.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Listings */}
      <section className="min-h-[60vh] bg-primary py-8">
        <div className="container max-w-5xl">
          {isLoading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <p className="py-20 text-center text-lg text-primary-foreground/40">Keine Einträge gefunden.</p>
          )}

          <div className="space-y-4">
            {hierarchy.map((bl, bIdx) => {
              if (bl.total === 0) return null;
              const blOpen = openBundeslaender[bl.bundesland] ?? false;
              return (
                <motion.div key={bl.bundesland} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: bIdx * 0.02 }}
                  className="overflow-hidden rounded-xl border border-gold/15 shadow-lg"
                  style={{ background: "linear-gradient(135deg, hsl(215 40% 14% / 0.95), hsl(215 40% 14% / 0.75))" }}>
                  <button onClick={() => toggleKey(setOpenBundeslaender, bl.bundesland)} className="flex w-full items-center gap-3 px-5 py-4 text-left transition-all hover:bg-primary-foreground/5">
                    <Building2 className="h-5 w-5 text-gold/70" />
                    <h2 className="text-base font-bold text-primary-foreground md:text-lg">{bl.bundesland}</h2>
                    <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                      {bl.total} {bl.total === 1 ? "Eintrag" : "Einträge"}
                    </span>
                    <ChevronDown className={`ml-auto h-4 w-4 text-primary-foreground/40 transition-transform duration-300 ${blOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {blOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="space-y-1.5 px-5 pb-5">
                          {bl.cities.map(({ city, items }) => {
                            const cityOpen = openCities[city] ?? false;
                            return (
                              <div key={city} ref={(el) => { cityRefs.current[city] = el; }}
                                className="overflow-hidden rounded-lg border border-primary-foreground/6"
                                style={{ background: "hsl(215 55% 4% / 0.6)" }}>
                                <button onClick={() => toggleKey(setOpenCities, city)} className="flex w-full items-center gap-2 px-4 py-3 text-left transition-all hover:bg-primary-foreground/5">
                                  <MapPin className="h-3.5 w-3.5 text-gold/50" />
                                  <span className="text-sm font-semibold text-primary-foreground/90">{city}</span>
                                  <span className="text-xs text-primary-foreground/40">({items.length})</span>
                                  <ChevronDown className={`ml-auto h-3.5 w-3.5 text-primary-foreground/30 transition-transform duration-300 ${cityOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                  {cityOpen && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                      <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                                        {items.map((item) => (
                                          <div key={item.id} className="rounded-lg border border-primary-foreground/5 p-3.5 transition-all duration-300 hover:-translate-y-0.5"
                                            style={{ background: "hsl(215 40% 14% / 0.8)" }}>
                                            <h4 className="text-sm font-bold text-primary-foreground">{item.name}</h4>
                                            {item.address && (
                                              <p className="mt-2 flex items-start gap-1.5 text-xs text-primary-foreground/40">
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
