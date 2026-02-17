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
import { GERMAN_CITIES_FULL } from "@/lib/germany-data";
import {
  MapPin,
  Globe,
  Instagram,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── constants ─── */

const ORIGIN_COUNTRIES = [
  { code: "BIH", label: "Bosnien und Herzegowina" },
  { code: "HR", label: "Kroatien" },
  { code: "SRB", label: "Serbien" },
  { code: "CG", label: "Montenegro" },
  { code: "MK", label: "Nordmazedonien" },
  { code: "AL", label: "Albanien" },
  { code: "KS", label: "Kosovo" },
];

const MAIN_CATEGORIES = [
  { key: "restaurants", label: "Restaurants" },
  { key: "shops", label: "Shops" },
  { key: "vereine", label: "Vereine" },
  { key: "dzemat_moschee", label: "Džemat (Moschee)" },
  { key: "kulturzentren", label: "Kulturzentren" },
  { key: "events", label: "Veranstaltungen" },
];

/* ─── translations ─── */

const T: Record<string, Record<string, string>> = {
  de: {
    title: "Balkan Community in Deutschland",
    subtitle:
      "Finde Restaurants, Shops, Vereine und Gemeinden – strukturiert und schnell.",
    country: "Herkunftsland",
    city: "Stadt suchen…",
    category: "Kategorie",
    allCountries: "Alle Länder",
    allCategories: "Alle Kategorien",
    results: "Einträge",
    cities: "Städte",
    noResults: "Keine Einträge gefunden.",
    maps: "Google Maps",
    website: "Website",
  },
  bs: {
    title: "Balkanska zajednica u Njemačkoj",
    subtitle:
      "Pronađi restorane, trgovine, udruženja i zajednice – strukturirano i brzo.",
    country: "Zemlja porijekla",
    city: "Traži grad…",
    category: "Kategorija",
    allCountries: "Sve zemlje",
    allCategories: "Sve kategorije",
    results: "unosa",
    cities: "gradova",
    noResults: "Nema pronađenih unosa.",
    maps: "Google Maps",
    website: "Web stranica",
  },
  en: {
    title: "Balkan Community in Germany",
    subtitle:
      "Find restaurants, shops, associations and communities – structured and fast.",
    country: "Country of origin",
    city: "Search city…",
    category: "Category",
    allCountries: "All countries",
    allCategories: "All categories",
    results: "entries",
    cities: "cities",
    noResults: "No entries found.",
    maps: "Google Maps",
    website: "Website",
  },
};

function tr(lang: string, key: string): string {
  const g = ["bs", "hr", "sr", "me"].includes(lang)
    ? "bs"
    : lang === "de"
    ? "de"
    : "en";
  return T[g]?.[key] ?? T.en[key] ?? key;
}

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

  /* filters */
  const [countryFilter, setCountryFilter] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");

  /* accordion state */
  const [openCountries, setOpenCountries] = useState<Record<string, boolean>>({});
  const [openCities, setOpenCities] = useState<Record<string, boolean>>({});
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const cityRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /* query */
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

  /* city autocomplete — show ALL cities with data, not just GERMAN_CITIES_FULL */
  const allCitiesWithData = useMemo(() => {
    return [...new Set(listings.map((l) => l.city))].sort();
  }, [listings]);

  const citySuggestions = useMemo(() => {
    if (cityInput.length < 1) return [];
    const q = cityInput.toLowerCase();
    return allCitiesWithData
      .filter((c) => c.toLowerCase().includes(q))
      .slice(0, 8);
  }, [cityInput, allCitiesWithData]);

  /* filtered data */
  const filtered = useMemo(() => {
    let result = listings;
    if (countryFilter)
      result = result.filter((l) => l.origin_country === countryFilter);
    if (cityInput.length >= 2)
      result = result.filter((l) =>
        l.city.toLowerCase().includes(cityInput.toLowerCase())
      );
    if (categoryFilter)
      result = result.filter((l) => l.main_category === categoryFilter);
    return result;
  }, [listings, countryFilter, cityInput, categoryFilter]);

  /* build hierarchy: country → city → category → items */
  const hierarchy = useMemo(() => {
    const map: Record<
      string,
      {
        label: string;
        cities: Record<
          string,
          {
            bundesland: string;
            categories: Record<string, Listing[]>;
          }
        >;
      }
    > = {};

    for (const item of filtered) {
      const cInfo = ORIGIN_COUNTRIES.find(
        (o) => o.code === item.origin_country
      );
      const countryLabel = cInfo?.label ?? item.origin_country;

      if (!map[item.origin_country]) {
        map[item.origin_country] = { label: countryLabel, cities: {} };
      }
      const country = map[item.origin_country];

      if (!country.cities[item.city]) {
        country.cities[item.city] = {
          bundesland: item.bundesland,
          categories: {},
        };
      }
      const city = country.cities[item.city];

      if (!city.categories[item.main_category]) {
        city.categories[item.main_category] = [];
      }
      city.categories[item.main_category].push(item);
    }

    /* sort countries alphabetically by label */
    const sorted = Object.entries(map).sort((a, b) =>
      a[1].label.localeCompare(b[1].label)
    );

    return sorted;
  }, [filtered]);

  /* auto-open when city is selected */
  useEffect(() => {
    if (cityInput.length < 2) return;
    const match = listings.find(
      (l) => l.city.toLowerCase() === cityInput.toLowerCase()
    );
    if (match) {
      setOpenCountries((p) => ({ ...p, [match.origin_country]: true }));
      const cityKey = `${match.origin_country}-${match.city}`;
      setOpenCities((p) => ({ ...p, [cityKey]: true }));
      setTimeout(() => {
        cityRefs.current[cityKey]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  }, [cityInput, listings]);

  const toggleCountry = (code: string) =>
    setOpenCountries((p) => ({ ...p, [code]: !p[code] }));
  const toggleCity = (key: string) =>
    setOpenCities((p) => ({ ...p, [key]: !p[key] }));
  const setTab = (cityKey: string, cat: string) =>
    setActiveTabs((p) => ({ ...p, [cityKey]: cat }));

  const countryEntries = (code: string) =>
    filtered.filter((l) => l.origin_country === code).length;
  const countryCities = (code: string) =>
    new Set(filtered.filter((l) => l.origin_country === code).map((l) => l.city))
      .size;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-[#0B1F3A] py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="container relative max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-white md:text-3xl lg:text-4xl"
          >
            {tr(language, "title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base"
          >
            {tr(language, "subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ─── Sticky Filter Bar ─── */}
      <div className="sticky top-14 z-30 border-b border-white/10 bg-[#0B1F3A]/95 backdrop-blur-md">
        <div className="container max-w-5xl py-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {/* Country */}
            <Select
              value={countryFilter}
              onValueChange={(v) => setCountryFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white placeholder:text-white/40">
                <SelectValue placeholder={tr(language, "country")} />
              </SelectTrigger>
              <SelectContent className="bg-[#132A4A] border-white/10 z-50">
                <SelectItem value="all" className="text-white/80 focus:bg-white/10 focus:text-white">
                  {tr(language, "allCountries")}
                </SelectItem>
                {ORIGIN_COUNTRIES.map((o) => (
                  <SelectItem key={o.code} value={o.code} className="text-white/80 focus:bg-white/10 focus:text-white">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City */}
            <div className="relative">
              <Input
                placeholder={tr(language, "city")}
                value={cityInput}
                onChange={(e) => {
                  setCityInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
              />
              {showSuggestions && citySuggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full rounded-md border border-white/10 bg-[#132A4A] shadow-xl">
                  {citySuggestions.map((c) => (
                    <li key={c}>
                      <button
                        className="w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-[#F4B400]"
                        onMouseDown={() => {
                          setCityInput(c);
                          setShowSuggestions(false);
                        }}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Category */}
            <Select
              value={categoryFilter}
              onValueChange={(v) => setCategoryFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white placeholder:text-white/40">
                <SelectValue placeholder={tr(language, "category")} />
              </SelectTrigger>
              <SelectContent className="bg-[#132A4A] border-white/10 z-50">
                <SelectItem value="all" className="text-white/80 focus:bg-white/10 focus:text-white">
                  {tr(language, "allCategories")}
                </SelectItem>
                {MAIN_CATEGORIES.map((c) => (
                  <SelectItem key={c.key} value={c.key} className="text-white/80 focus:bg-white/10 focus:text-white">
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <section className="min-h-[60vh] bg-gradient-to-b from-background via-muted/20 to-background py-8">
        <div className="container max-w-5xl">
          {isLoading && (
            <div className="py-16 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}

          {!isLoading && hierarchy.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              {tr(language, "noResults")}
            </p>
          )}

          <div className="space-y-4">
            {hierarchy.map(([code, country], countryIdx) => {
              const isOpen = openCountries[code] ?? false;
              const cities = Object.entries(country.cities).sort((a, b) =>
                a[0].localeCompare(b[0])
              );

              return (
                <motion.div
                  key={code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: countryIdx * 0.05 }}
                  className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
                >
                  {/* Country header */}
                  <button
                    onClick={() => toggleCountry(code)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-accent/30"
                  >
                    <h2 className="text-base font-semibold text-foreground md:text-lg">
                      {country.label}
                    </h2>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {countryCities(code)} {tr(language, "cities")}
                    </span>
                    <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                      {countryEntries(code)} {tr(language, "results")}
                    </span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
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
                          {cities.map(([cityName, cityData]) => {
                            const cityKey = `${code}-${cityName}`;
                            const cityOpen = openCities[cityKey] ?? false;
                            const catKeys = Object.keys(
                              cityData.categories
                            ).sort();
                            const activeTab =
                              activeTabs[cityKey] ?? catKeys[0] ?? "";
                            const activeItems =
                              cityData.categories[activeTab] ?? [];
                            const totalItems = Object.values(
                              cityData.categories
                            ).reduce((s, a) => s + a.length, 0);

                            return (
                              <div
                                key={cityKey}
                                ref={(el) => {
                                  cityRefs.current[cityKey] = el;
                                }}
                                className="overflow-hidden rounded-lg border border-border/30 bg-background/60"
                              >
                                {/* City header */}
                                <button
                                  onClick={() => toggleCity(cityKey)}
                                  className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-accent/20"
                                >
                                  <MapPin className="h-3.5 w-3.5 text-gold/70" />
                                  <span className="text-sm font-medium text-foreground">
                                    {cityName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {cityData.bundesland}
                                  </span>
                                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                    {totalItems}
                                  </span>
                                  <ChevronDown
                                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${
                                      cityOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                {/* Category tabs + items */}
                                <AnimatePresence>
                                  {cityOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{
                                        height: "auto",
                                        opacity: 1,
                                      }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-4 pb-4">
                                        {/* Pills */}
                                        <div className="mb-3 flex flex-wrap gap-1.5 overflow-x-auto">
                                          {catKeys.map((cat) => {
                                            const catLabel =
                                              MAIN_CATEGORIES.find(
                                                (c) => c.key === cat
                                              )?.label ?? cat;
                                            const count =
                                              cityData.categories[cat].length;
                                            return (
                                              <button
                                                key={cat}
                                                onClick={() =>
                                                  setTab(cityKey, cat)
                                                }
                                                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                                                  activeTab === cat
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                                }`}
                                              >
                                                {catLabel} ({count})
                                              </button>
                                            );
                                          })}
                                        </div>

                                        {/* Listing cards */}
                                        <div className="grid gap-3 sm:grid-cols-2">
                                          {activeItems
                                            .sort((a, b) =>
                                              a.name.localeCompare(b.name)
                                            )
                                            .map((item) => (
                                              <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="group rounded-lg border border-border/40 bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-gold/20"
                                              >
                                                <h4 className="text-sm font-semibold text-foreground">
                                                  {item.name}
                                                </h4>
                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                  {item.sub_category} ·{" "}
                                                  {item.city},{" "}
                                                  {item.bundesland}
                                                </p>

                                                {item.description && (
                                                  <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                                                    {item.description}
                                                  </p>
                                                )}

                                                {item.address && (
                                                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3 shrink-0" />
                                                    {item.address}
                                                  </p>
                                                )}

                                                <div className="mt-3 flex flex-wrap gap-2">
                                                  {item.google_maps_url && (
                                                    <a
                                                      href={item.google_maps_url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                                                    >
                                                      <ExternalLink className="h-3 w-3" />
                                                      {tr(language, "maps")}
                                                    </a>
                                                  )}
                                                  {item.website && (
                                                    <a
                                                      href={item.website}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                                                    >
                                                      <Globe className="h-3 w-3" />
                                                      {tr(language, "website")}
                                                    </a>
                                                  )}
                                                  {item.instagram && (
                                                    <a
                                                      href={item.instagram}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
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
