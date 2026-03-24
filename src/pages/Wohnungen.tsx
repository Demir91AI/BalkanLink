import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search, ExternalLink, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BUNDESLAENDER, GERMAN_CITIES_FULL, UMKREIS_OPTIONS } from "@/lib/germany-data";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── portal data ── */
interface Portal {
  name: string;
  url: string;
  buildUrl: (city: string, params: FilterState) => string;
}

interface FilterState {
  city: string;
  bundesland: string;
  umkreis: string;
  maxMiete: string;
  zimmer: string;
  wg: boolean;
  moebliert: boolean;
  kurzzeit: boolean;
  langzeit: boolean;
}

const enc = encodeURIComponent;

const PORTALE_GROSS: Portal[] = [
  { name: "ImmobilienScout24", url: "https://www.immobilienscout24.de", buildUrl: (c) => `https://www.immobilienscout24.de/Suche/de/${enc(c)}/wohnung-mieten` },
  { name: "Immowelt", url: "https://www.immowelt.de", buildUrl: (c) => `https://www.immowelt.de/liste/${enc(c.toLowerCase())}/wohnungen/mieten` },
  { name: "Immonet", url: "https://www.immonet.de", buildUrl: () => `https://www.immonet.de/wohnung/mieten.html` },
  { name: "Kleinanzeigen", url: "https://www.kleinanzeigen.de", buildUrl: (c) => `https://www.kleinanzeigen.de/s-wohnung-mieten/${enc(c.toLowerCase())}/k0` },
  { name: "Meinestadt", url: "https://www.meinestadt.de", buildUrl: (c) => `https://www.meinestadt.de/${enc(c.toLowerCase())}/immobilien/wohnungen` },
  { name: "Wohnungsboerse.net", url: "https://www.wohnungsboerse.net", buildUrl: () => `https://www.wohnungsboerse.net/mieten` },
  { name: "Immo24", url: "https://www.immobilienscout24.de", buildUrl: (c) => `https://www.immobilienscout24.de/Suche/de/${enc(c)}/wohnung-mieten` },
  { name: "Kalaydo", url: "https://www.kalaydo.de", buildUrl: () => `https://www.kalaydo.de/immobilien/wohnungen/mieten/` },
];

const PORTALE_WG: Portal[] = [
  { name: "WG-Gesucht", url: "https://www.wg-gesucht.de", buildUrl: () => `https://www.wg-gesucht.de` },
  { name: "Studenten-WG", url: "https://www.studenten-wg.de", buildUrl: () => `https://www.studenten-wg.de` },
  { name: "Uniplaces", url: "https://www.uniplaces.com", buildUrl: () => `https://www.uniplaces.com/accommodation/germany` },
  { name: "HousingAnywhere", url: "https://housinganywhere.com", buildUrl: () => `https://housinganywhere.com/s/Germany` },
  { name: "Spotahome", url: "https://www.spotahome.com", buildUrl: () => `https://www.spotahome.com/germany` },
];

const PORTALE_SOZIAL: Portal[] = [
  { name: "GdW", url: "https://www.gdw.de", buildUrl: () => `https://www.gdw.de` },
  { name: "Wohnungsbaugenossenschaften", url: "https://www.wohnungsbaugenossenschaften.de", buildUrl: () => `https://www.wohnungsbaugenossenschaften.de` },
];

const PORTALE_KURZZEIT: Portal[] = [
  { name: "Wunderflats", url: "https://wunderflats.com", buildUrl: (c) => `https://wunderflats.com/en/furnished-apartments/${enc(c.toLowerCase())}` },
  { name: "HomeCompany", url: "https://www.homecompany.de", buildUrl: () => `https://www.homecompany.de` },
  { name: "Monteurzimmer.de", url: "https://www.monteurzimmer.de", buildUrl: () => `https://www.monteurzimmer.de` },
  { name: "Airbnb", url: "https://www.airbnb.de", buildUrl: (c) => `https://www.airbnb.de/s/${enc(c)}/homes?min_nights=28` },
  { name: "Booking", url: "https://www.booking.com", buildUrl: (c) => `https://www.booking.com/searchresults.html?ss=${enc(c)}&nflt=ht_id%3D201` },
];

const ZIMMER_OPTIONS = ["1", "2", "3", "4", "5+"];
const MIETE_OPTIONS = ["300", "400", "500", "600", "700", "800", "1000", "1200", "1500", "2000"];

export default function Wohnungen() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    city: "", bundesland: "", umkreis: "25", maxMiete: "", zimmer: "",
    wg: false, moebliert: false, kurzzeit: false, langzeit: false,
  });

  const [showMore, setShowMore] = useState<Record<string, boolean>>({});
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCity = filters.city || "Deutschland";

  const handleCityInput = (value: string) => {
    setFilters((f) => ({ ...f, city: value }));
    if (value.length >= 2) {
      const matches = GERMAN_CITIES_FULL.filter((c) => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 8);
      setCitySuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: string) => { setFilters((f) => ({ ...f, city })); setShowSuggestions(false); };
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) => setFilters((f) => ({ ...f, [key]: value }));
  const toggle = (key: "wg" | "moebliert" | "kurzzeit" | "langzeit") => setFilters((f) => ({ ...f, [key]: !f[key] }));

  const portalGroups = useMemo(() => [
    { title: t("wohnungen.portalBig"), portals: PORTALE_GROSS, tag: "gross" },
    { title: t("wohnungen.portalWg"), portals: PORTALE_WG, tag: "wg" },
    { title: t("wohnungen.portalSocial"), portals: PORTALE_SOZIAL, tag: "sozial" },
    { title: t("wohnungen.portalShort"), portals: PORTALE_KURZZEIT, tag: "kurzzeit" },
  ], [t]);

  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-primary py-12 text-primary-foreground md:py-16">
        <div className="container max-w-4xl">
          <button onClick={() => window.history.length > 2 ? navigate(-1) : navigate("/")} className="mb-4 inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground">
            <ArrowLeft className="h-3 w-3" /> Nazad
          </button>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
              <Home className="h-4 w-4" /> {t("wohnungen.title")}
            </div>
            <h1 className="font-heading text-3xl font-bold md:text-4xl">{t("wohnungen.title")}</h1>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">{t("wohnungen.subtitle")}</p>
          </div>
        </div>
      </section>

      <div className="container max-w-5xl py-8">
        <Card className="mb-8 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-primary" /> {t("wohnungen.search")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <Label className="mb-1.5 block text-sm font-medium">{t("wohnungen.city")}</Label>
                <Input
                  placeholder="Berlin, München…"
                  value={filters.city}
                  onChange={(e) => handleCityInput(e.target.value)}
                  onFocus={() => filters.city.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && citySuggestions.length > 0 && (
                  <ul className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
                    {citySuggestions.map((c) => (
                      <li key={c} className="cursor-pointer px-3 py-2 text-sm hover:bg-accent" onMouseDown={() => selectCity(c)}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">{t("wohnungen.bundesland")}</Label>
                <Select value={filters.bundesland} onValueChange={(v) => set("bundesland", v)}>
                  <SelectTrigger><SelectValue placeholder={t("wohnungen.allGermany")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">{t("wohnungen.allGermany")}</SelectItem>
                    {BUNDESLAENDER.map((b) => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label className="mb-1.5 block text-sm font-medium">{t("wohnungen.radius")}</Label>
                <Select value={filters.umkreis} onValueChange={(v) => set("umkreis", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {UMKREIS_OPTIONS.map((o) => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">{t("wohnungen.maxRent")}</Label>
                <Select value={filters.maxMiete} onValueChange={(v) => set("maxMiete", v)}>
                  <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">—</SelectItem>
                    {MIETE_OPTIONS.map((m) => (<SelectItem key={m} value={m}>≤ {m} €</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">{t("wohnungen.rooms")}</Label>
                <Select value={filters.zimmer} onValueChange={(v) => set("zimmer", v)}>
                  <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">—</SelectItem>
                    {ZIMMER_OPTIONS.map((z) => (<SelectItem key={z} value={z}>{z}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {([
                ["wg", t("wohnungen.wg")],
                ["moebliert", t("wohnungen.furnished")],
                ["kurzzeit", t("wohnungen.shortTerm")],
                ["langzeit", t("wohnungen.longTerm")],
              ] as [keyof Pick<FilterState, "wg" | "moebliert" | "kurzzeit" | "langzeit">, string][]).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm">
                  <Checkbox checked={filters[key]} onCheckedChange={() => toggle(key)} />
                  {label}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-sm">{searchCity}</Badge>
          {filters.bundesland && filters.bundesland !== "alle" && <Badge variant="outline" className="text-sm">{filters.bundesland}</Badge>}
          {filters.maxMiete && filters.maxMiete !== "none" && <Badge variant="outline" className="text-sm">≤ {filters.maxMiete} €</Badge>}
          {filters.wg && <Badge variant="outline" className="text-sm">WG</Badge>}
          {filters.moebliert && <Badge variant="outline" className="text-sm">{t("wohnungen.furnished")}</Badge>}
          {filters.kurzzeit && <Badge variant="outline" className="text-sm">{t("wohnungen.shortTerm")}</Badge>}
        </div>

        {portalGroups.map((group) => {
          const expanded = showMore[group.tag];
          const visiblePortals = expanded ? group.portals : group.portals.slice(0, 4);
          return (
            <section key={group.tag} className="mb-8">
              <h2 className="mb-4 font-heading text-xl font-bold">{group.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {visiblePortals.map((portal) => (
                  <a key={portal.name} href={portal.buildUrl(filters.city || "Deutschland", filters)} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-primary/40 hover:shadow-md">
                    <span className="text-sm font-medium">{portal.name}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </a>
                ))}
              </div>
              {group.portals.length > 4 && (
                <Button variant="ghost" size="sm" className="mt-3" onClick={() => setShowMore((s) => ({ ...s, [group.tag]: !expanded }))}>
                  {expanded ? <><ChevronUp className="mr-1 h-4 w-4" /> {t("wohnungen.showLess")}</> : <><ChevronDown className="mr-1 h-4 w-4" /> {t("wohnungen.showMore")}</>}
                </Button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
