import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronDown, Search, Building2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Listing {
  id: string;
  name: string;
  city: string;
  bundesland: string;
  address: string | null;
}

export default function Dzamije() {
  const [searchInput, setSearchInput] = useState("");
  const [openBundeslaender, setOpenBundeslaender] = useState<Record<string, boolean>>({});
  const [openCities, setOpenCities] = useState<Record<string, boolean>>({});
  const cityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data: listings = [], isLoading } = useQuery<Listing[]>({
    queryKey: ["dzamije-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_listings")
        .select("id, name, city, bundesland, address")
        .eq("main_category", "kultura")
        .eq("sub_category", "dzamije")
        .order("bundesland")
        .order("city")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Deduplicate by normalized name+address
  const deduped = useMemo(() => {
    const seen = new Set<string>();
    return listings.filter((l) => {
      const key = `${l.name.trim().toLowerCase().replace(/\s+/g, " ")}||${(l.address || "").trim().toLowerCase().replace(/\s+/g, " ")}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [listings]);

  const filtered = useMemo(() => {
    if (searchInput.length < 2) return deduped;
    const q = searchInput.toLowerCase();
    return deduped.filter(
      (l) =>
        l.city.toLowerCase().includes(q) ||
        l.name.toLowerCase().includes(q) ||
        (l.address && l.address.toLowerCase().includes(q))
    );
  }, [deduped, searchInput]);

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
        totalEntries: Object.values(cities).reduce((s, a) => s + a.length, 0),
        cityCount: Object.keys(cities).length,
        cities: Object.entries(cities)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([city, items]) => ({ city, items })),
      }));
  }, [filtered]);

  const totalBl = hierarchy.length;
  const totalCities = hierarchy.reduce((s, bl) => s + bl.cityCount, 0);
  const totalEntries = filtered.length;

  useEffect(() => {
    if (searchInput.length < 2) return;
    const match = filtered.find((l) => l.city.toLowerCase() === searchInput.toLowerCase());
    if (match) {
      setOpenBundeslaender((p) => ({ ...p, [match.bundesland]: true }));
      setOpenCities((p) => ({ ...p, [match.city]: true }));
      setTimeout(() => {
        cityRefs.current[match.city]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, [searchInput, filtered]);

  const toggleKey = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) =>
    setter((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white md:text-4xl"
          >
            🕌 Džamije u Njemačkoj
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base"
          >
            Kompletna lista bosanskih džamija i džemata u svim njemačkim saveznim pokrajinama.
          </motion.p>

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 flex justify-center gap-6"
            >
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{totalBl}</p>
                <p className="text-xs text-white/40">Bundesländer</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{totalCities}</p>
                <p className="text-xs text-white/40">Städte</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#E3B341" }}>{totalEntries}</p>
                <p className="text-xs text-white/40">Džamije</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Search */}
      <div className="sticky top-14 z-30" style={{ background: "rgba(15,27,45,0.97)", borderBottom: "1px solid rgba(227,179,65,0.15)" }}>
        <div className="container max-w-5xl py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input
              placeholder="Suche nach Stadt, Name oder Adresse…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-white/10 pl-9 text-white placeholder:text-white/40"
              style={{ background: "#16263F" }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
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
            {hierarchy.map((bl, bIdx) => {
              const blOpen = openBundeslaender[bl.bundesland] ?? false;
              return (
                <motion.div
                  key={bl.bundesland}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: bIdx * 0.04 }}
                  className="overflow-hidden rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))",
                    border: "1px solid rgba(227,179,65,0.15)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  <button
                    onClick={() => toggleKey(setOpenBundeslaender, bl.bundesland)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-all hover:bg-white/5"
                  >
                    <Building2 className="h-5 w-5 text-[#E3B341]/70" />
                    <h2 className="text-base font-bold text-white md:text-lg">{bl.bundesland}</h2>
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: "rgba(227,179,65,0.15)", color: "#E3B341" }}>
                      {bl.cityCount} {bl.cityCount === 1 ? "Stadt" : "Städte"} · {bl.totalEntries} {bl.totalEntries === 1 ? "Džamija" : "Džamije"}
                    </span>
                    <ChevronDown className={`ml-auto h-4 w-4 text-white/40 transition-transform duration-300 ${blOpen ? "rotate-180" : ""}`} />
                  </button>

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
                          {bl.cities.map(({ city, items }) => {
                            const cityOpen = openCities[city] ?? false;
                            return (
                              <div
                                key={city}
                                ref={(el) => { cityRefs.current[city] = el; }}
                                className="overflow-hidden rounded-lg"
                                style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
                              >
                                <button
                                  onClick={() => toggleKey(setOpenCities, city)}
                                  className="flex w-full items-center gap-2 px-4 py-3 text-left transition-all hover:bg-white/5"
                                >
                                  <MapPin className="h-3.5 w-3.5 text-[#E3B341]/50" />
                                  <span className="text-sm font-semibold text-white/90">{city}</span>
                                  <span className="text-xs text-white/40">({items.length})</span>
                                  <ChevronDown className={`ml-auto h-3.5 w-3.5 text-white/30 transition-transform duration-300 ${cityOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                  {cityOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="space-y-1 px-4 pb-4">
                                        {items.map((item) => (
                                          <div
                                            key={item.id}
                                            className="rounded-lg px-3.5 py-3"
                                            style={{ background: "rgba(22,38,63,0.8)", border: "1px solid rgba(255,255,255,0.05)" }}
                                          >
                                            <h4 className="text-sm font-bold text-white">{item.name}</h4>
                                            {item.address && (
                                              <p className="mt-1 text-xs text-white/40">{item.address}</p>
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

          {!isLoading && totalEntries > 0 && (
            <p className="mt-8 text-center text-xs text-white/30">
              {totalEntries} Džamije in {totalCities} Städten · {totalBl} Bundesländer
            </p>
          )}
        </div>
      </section>
    </>
  );
}
