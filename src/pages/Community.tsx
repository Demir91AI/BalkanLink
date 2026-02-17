import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GERMAN_CITIES_FULL, BUNDESLAENDER, UMKREIS_OPTIONS } from "@/lib/germany-data";
import {
  UtensilsCrossed, Store, Users, Moon, Calendar,
  MapPin, Globe, ExternalLink, Instagram, ChevronDown, ChevronUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ORIGIN_COUNTRIES = [
  { code: "BIH", label: "Bosnien und Herzegowina", flag: "🇧🇦" },
  { code: "HR", label: "Kroatien", flag: "🇭🇷" },
  { code: "SRB", label: "Serbien", flag: "🇷🇸" },
  { code: "CG", label: "Montenegro", flag: "🇲🇪" },
  { code: "MK", label: "Nordmazedonien", flag: "🇲🇰" },
  { code: "AL", label: "Albanien", flag: "🇦🇱" },
  { code: "KS", label: "Kosovo", flag: "🇽🇰" },
];

interface CategoryGroup {
  key: string;
  icon: LucideIcon;
  subs: string[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  { key: "restaurants", icon: UtensilsCrossed, subs: ["Restaurant", "Café", "Bäckerei", "Grill"] },
  { key: "shops", icon: Store, subs: ["Supermarkt", "Metzgerei", "Spezialitätenladen"] },
  { key: "vereine", icon: Users, subs: ["Sportverein", "Folklor", "Studentenverein", "Humanitäre Organisation", "Kulturverein"] },
  { key: "moscheen", icon: Moon, subs: ["Moschee", "Gemeinde", "Kulturzentrum"] },
  { key: "events", icon: Calendar, subs: ["Konzert", "Sportturnier", "Kulturabend", "Religiöses Fest"] },
];

const ALL_SUBS = CATEGORY_GROUPS.flatMap((g) => g.subs);

// Translation keys for community page
const T: Record<string, Record<string, string>> = {
  bs: {
    title: "Balkanska zajednica u Njemačkoj",
    subtitle: "Pronađi restorane, trgovine, udruženja i događaje balkanske zajednice.",
    city: "Grad", bundesland: "Savezna država", radius: "Udaljenost",
    origin: "Zemlja porijekla", category: "Kategorija",
    allOrigins: "Sve zemlje", allCategories: "Sve kategorije", allBundeslaender: "Sve države",
    results: "rezultata", noResults: "Nema rezultata.",
    restaurants: "Restorani & kafići", shops: "Balkanske trgovine",
    vereine: "Udruženja & kultura", moscheen: "Džamije & zajednice", events: "Događaji",
    website: "Web stranica", address: "Adresa", maps: "Google Maps",
  },
  de: {
    title: "Balkan Community in Deutschland",
    subtitle: "Finde Restaurants, Shops, Vereine und Veranstaltungen der Balkan-Community.",
    city: "Stadt", bundesland: "Bundesland", radius: "Umkreis",
    origin: "Herkunftsland", category: "Kategorie",
    allOrigins: "Alle Länder", allCategories: "Alle Kategorien", allBundeslaender: "Alle Bundesländer",
    results: "Ergebnisse", noResults: "Keine Ergebnisse.",
    restaurants: "Restaurants & Cafés", shops: "Balkan Shops",
    vereine: "Vereine & Kultur", moscheen: "Moscheen & Gemeinden", events: "Veranstaltungen",
    website: "Website", address: "Adresse", maps: "Google Maps",
  },
  en: {
    title: "Balkan Community in Germany",
    subtitle: "Find restaurants, shops, associations and events of the Balkan community.",
    city: "City", bundesland: "State", radius: "Radius",
    origin: "Country of origin", category: "Category",
    allOrigins: "All countries", allCategories: "All categories", allBundeslaender: "All states",
    results: "results", noResults: "No results.",
    restaurants: "Restaurants & Cafés", shops: "Balkan Shops",
    vereine: "Associations & Culture", moscheen: "Mosques & Communities", events: "Events",
    website: "Website", address: "Address", maps: "Google Maps",
  },
  sq: {
    title: "Komuniteti Ballkanik në Gjermani",
    subtitle: "Gjej restorante, dyqane, shoqata dhe ngjarje të komunitetit ballkanik.",
    city: "Qyteti", bundesland: "Landi", radius: "Rrethi",
    origin: "Vendi i origjinës", category: "Kategoria",
    allOrigins: "Të gjitha vendet", allCategories: "Të gjitha kategoritë", allBundeslaender: "Të gjitha shtetet",
    results: "rezultate", noResults: "Nuk ka rezultate.",
    restaurants: "Restorante & kafene", shops: "Dyqane Ballkanike",
    vereine: "Shoqata & kulturë", moscheen: "Xhami & komunitete", events: "Ngjarje",
    website: "Faqja web", address: "Adresa", maps: "Google Maps",
  },
  mk: {
    title: "Балканска заедница во Германија",
    subtitle: "Пронајди ресторани, продавници, здруженија и настани на балканската заедница.",
    city: "Град", bundesland: "Сојузна држава", radius: "Растојание",
    origin: "Земја на потекло", category: "Категорија",
    allOrigins: "Сите земји", allCategories: "Сите категории", allBundeslaender: "Сите држави",
    results: "резултати", noResults: "Нема резултати.",
    restaurants: "Ресторани & кафулиња", shops: "Балкански продавници",
    vereine: "Здруженија & култура", moscheen: "Џамии & заедници", events: "Настани",
    website: "Веб страница", address: "Адреса", maps: "Google Maps",
  },
};

function ct(lang: string, key: string): string {
  const langGroup = ["bs", "hr", "sr", "me"].includes(lang) ? "bs" : ["sq", "xk"].includes(lang) ? "sq" : lang === "mk" ? "mk" : lang === "de" ? "de" : "en";
  return T[langGroup]?.[key] ?? T.en[key] ?? key;
}

export default function Community() {
  const { language } = useLanguage();
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [bundesland, setBundesland] = useState("");
  const [radius, setRadius] = useState("");
  const [origin, setOrigin] = useState("");
  const [category, setCategory] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const citySuggestions = useMemo(() => {
    if (cityInput.length < 2) return [];
    const q = cityInput.toLowerCase();
    return GERMAN_CITIES_FULL.filter((c) => c.toLowerCase().includes(q)).slice(0, 8);
  }, [cityInput]);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["community-listings", cityInput, bundesland, origin, category],
    queryFn: async () => {
      let query = supabase.from("community_listings").select("*").order("name");
      if (cityInput.length >= 2) query = query.ilike("city", `%${cityInput}%`);
      if (bundesland) query = query.eq("bundesland", bundesland);
      if (origin) query = query.eq("origin_country", origin);
      if (category) query = query.eq("sub_category", category);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const grouped = useMemo(() => {
    const map: Record<string, typeof listings> = {};
    for (const g of CATEGORY_GROUPS) map[g.key] = [];
    for (const item of listings) {
      const group = CATEGORY_GROUPS.find((g) => g.subs.includes(item.sub_category));
      if (group) map[group.key].push(item);
    }
    return map;
  }, [listings]);

  const toggleGroup = (key: string) => setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const originFlag = (code: string) => ORIGIN_COUNTRIES.find((o) => o.code === code)?.flag ?? "";

  return (
    <>
      <section className="border-b bg-primary py-10">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {ct(language, "title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            {ct(language, "subtitle")}
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-5xl">
          {/* Filters */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* City */}
            <div className="relative">
              <Input
                placeholder={ct(language, "city")}
                value={cityInput}
                onChange={(e) => { setCityInput(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && citySuggestions.length > 0 && (
                <ul className="absolute z-20 mt-1 w-full rounded-md border bg-popover shadow-md">
                  {citySuggestions.map((c) => (
                    <li key={c}>
                      <button
                        className="w-full px-3 py-2 text-left text-sm hover:bg-accent"
                        onMouseDown={() => { setCityInput(c); setShowSuggestions(false); }}
                      >{c}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Bundesland */}
            <Select value={bundesland} onValueChange={setBundesland}>
              <SelectTrigger><SelectValue placeholder={ct(language, "bundesland")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{ct(language, "allBundeslaender")}</SelectItem>
                {BUNDESLAENDER.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Origin */}
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger><SelectValue placeholder={ct(language, "origin")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{ct(language, "allOrigins")}</SelectItem>
                {ORIGIN_COUNTRIES.map((o) => (
                  <SelectItem key={o.code} value={o.code}>{o.flag} {o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder={ct(language, "category")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{ct(language, "allCategories")}</SelectItem>
                {ALL_SUBS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <p className="mt-6 text-sm text-muted-foreground">
            {listings.length} {ct(language, "results")}
          </p>

          {isLoading && <p className="mt-8 text-center text-muted-foreground">...</p>}

          {!isLoading && listings.length === 0 && (
            <p className="mt-8 text-center text-muted-foreground">{ct(language, "noResults")}</p>
          )}

          {/* Grouped sections */}
          {!isLoading && listings.length > 0 && (
            <div className="mt-6 space-y-8">
              {CATEGORY_GROUPS.map((group) => {
                const items = grouped[group.key];
                if (!items || items.length === 0) return null;
                const expanded = expandedGroups[group.key] ?? true;
                const Icon = group.icon;
                return (
                  <div key={group.key}>
                    <button
                      onClick={() => toggleGroup(group.key)}
                      className="flex w-full items-center gap-2 text-left"
                    >
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                      <h2 className="text-lg font-semibold">{ct(language, group.key)}</h2>
                      <span className="ml-1 text-xs text-muted-foreground">({items.length})</span>
                      <span className="ml-auto">
                        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </span>
                    </button>

                    {expanded && (
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                          <div key={item.id} className="rounded-lg border bg-card p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-sm font-semibold">{item.name}</h3>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {item.city}, {item.bundesland}
                                </p>
                              </div>
                              <span className="text-lg leading-none">{originFlag(item.origin_country)}</span>
                            </div>

                            <p className="mt-1 text-xs text-muted-foreground">{item.sub_category}</p>

                            {item.description && (
                              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.description}</p>
                            )}

                            {item.address && (
                              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" /> {item.address}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap gap-3">
                              {item.google_maps_url && (
                                <a href={item.google_maps_url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                                  <MapPin className="h-3 w-3" /> {ct(language, "maps")}
                                </a>
                              )}
                              {item.website && (
                                <a href={item.website} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                                  <Globe className="h-3 w-3" /> {ct(language, "website")}
                                </a>
                              )}
                              {item.instagram && (
                                <a href={item.instagram} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                                  <Instagram className="h-3 w-3" /> Instagram
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
