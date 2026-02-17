import { useState, useMemo } from "react";
import { Home, Search, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BUNDESLAENDER, GERMAN_CITIES_FULL, UMKREIS_OPTIONS } from "@/lib/germany-data";

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
  { name: "Regionale Wohnungsbaugesellschaften", url: "https://www.gdw.de", buildUrl: () => `https://www.gdw.de` },
  { name: "Genossenschaften nach Bundesland", url: "https://www.wohnungsbaugenossenschaften.de", buildUrl: () => `https://www.wohnungsbaugenossenschaften.de` },
];

const PORTALE_KURZZEIT: Portal[] = [
  { name: "Wunderflats", url: "https://wunderflats.com", buildUrl: (c) => `https://wunderflats.com/en/furnished-apartments/${enc(c.toLowerCase())}` },
  { name: "HomeCompany", url: "https://www.homecompany.de", buildUrl: () => `https://www.homecompany.de` },
  { name: "Monteurzimmer.de", url: "https://www.monteurzimmer.de", buildUrl: () => `https://www.monteurzimmer.de` },
  { name: "Airbnb (Langzeit)", url: "https://www.airbnb.de", buildUrl: (c) => `https://www.airbnb.de/s/${enc(c)}/homes?min_nights=28` },
  { name: "Booking (Langzeit)", url: "https://www.booking.com", buildUrl: (c) => `https://www.booking.com/searchresults.html?ss=${enc(c)}&nflt=ht_id%3D201` },
];

const ZIMMER_OPTIONS = ["1", "2", "3", "4", "5+"];
const MIETE_OPTIONS = ["300", "400", "500", "600", "700", "800", "1000", "1200", "1500", "2000"];

export default function Wohnungen() {
  const [filters, setFilters] = useState<FilterState>({
    city: "",
    bundesland: "",
    umkreis: "25",
    maxMiete: "",
    zimmer: "",
    wg: false,
    moebliert: false,
    kurzzeit: false,
    langzeit: false,
  });

  const [showMore, setShowMore] = useState<Record<string, boolean>>({});
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCity = filters.city || "Deutschland";

  const handleCityInput = (value: string) => {
    setFilters((f) => ({ ...f, city: value }));
    if (value.length >= 2) {
      const matches = GERMAN_CITIES_FULL.filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 8);
      setCitySuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: string) => {
    setFilters((f) => ({ ...f, city }));
    setShowSuggestions(false);
  };

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const toggle = (key: "wg" | "moebliert" | "kurzzeit" | "langzeit") =>
    setFilters((f) => ({ ...f, [key]: !f[key] }));

  const portalGroups = useMemo(() => {
    const groups: { title: string; portals: Portal[]; tag: string }[] = [
      { title: "Große Immobilienportale", portals: PORTALE_GROSS, tag: "gross" },
    ];
    if (filters.wg) groups.push({ title: "WG & Studenten", portals: PORTALE_WG, tag: "wg" });
    groups.push({ title: "Sozial & Genossenschaften", portals: PORTALE_SOZIAL, tag: "sozial" });
    if (filters.kurzzeit) groups.push({ title: "Kurzzeit & möbliert", portals: PORTALE_KURZZEIT, tag: "kurzzeit" });
    else groups.push({ title: "Kurzzeit & möbliert", portals: PORTALE_KURZZEIT, tag: "kurzzeit" });
    return groups;
  }, [filters.wg, filters.kurzzeit]);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-primary py-12 text-primary-foreground md:py-16">
        <div className="container max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
            <Home className="h-4 w-4" /> Wohnung Finder
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            Wohnungssuche in ganz Deutschland
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Durchsuche alle großen Immobilienportale mit einem Klick.
            Keine eigene Datenbank – direkte Weiterleitung.
          </p>
        </div>
      </section>

      <div className="container max-w-5xl py-8">
        {/* Filter Card */}
        <Card className="mb-8 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-primary" />
              Suchkriterien
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Row 1: City + Bundesland */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <Label className="mb-1.5 block text-sm font-medium">Stadt</Label>
                <Input
                  placeholder="z. B. Berlin, München…"
                  value={filters.city}
                  onChange={(e) => handleCityInput(e.target.value)}
                  onFocus={() => filters.city.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && citySuggestions.length > 0 && (
                  <ul className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
                    {citySuggestions.map((c) => (
                      <li
                        key={c}
                        className="cursor-pointer px-3 py-2 text-sm hover:bg-accent"
                        onMouseDown={() => selectCity(c)}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Bundesland</Label>
                <Select value={filters.bundesland} onValueChange={(v) => set("bundesland", v)}>
                  <SelectTrigger><SelectValue placeholder="Ganz Deutschland" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Ganz Deutschland</SelectItem>
                    {BUNDESLAENDER.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2: Umkreis + Miete + Zimmer */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Umkreis</Label>
                <Select value={filters.umkreis} onValueChange={(v) => set("umkreis", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {UMKREIS_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Max. Kaltmiete</Label>
                <Select value={filters.maxMiete} onValueChange={(v) => set("maxMiete", v)}>
                  <SelectTrigger><SelectValue placeholder="Keine Grenze" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Keine Grenze</SelectItem>
                    {MIETE_OPTIONS.map((m) => (
                      <SelectItem key={m} value={m}>bis {m} €</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Zimmer</Label>
                <Select value={filters.zimmer} onValueChange={(v) => set("zimmer", v)}>
                  <SelectTrigger><SelectValue placeholder="Alle" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle</SelectItem>
                    {ZIMMER_OPTIONS.map((z) => (
                      <SelectItem key={z} value={z}>{z} {z === "5+" ? "" : z === "1" ? "Zimmer" : "Zimmer"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Checkboxes */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {([
                ["wg", "WG"],
                ["moebliert", "Möbliert"],
                ["kurzzeit", "Kurzzeit"],
                ["langzeit", "Langzeit"],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters[key]}
                    onCheckedChange={() => toggle(key)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Suche für:</span>
          <Badge variant="secondary" className="text-sm">{searchCity}</Badge>
          {filters.bundesland && filters.bundesland !== "alle" && (
            <Badge variant="outline" className="text-sm">{filters.bundesland}</Badge>
          )}
          {filters.maxMiete && filters.maxMiete !== "none" && (
            <Badge variant="outline" className="text-sm">bis {filters.maxMiete} €</Badge>
          )}
          {filters.wg && <Badge variant="outline" className="text-sm">WG</Badge>}
          {filters.moebliert && <Badge variant="outline" className="text-sm">Möbliert</Badge>}
          {filters.kurzzeit && <Badge variant="outline" className="text-sm">Kurzzeit</Badge>}
        </div>

        {/* Portal Groups */}
        {portalGroups.map((group) => {
          const expanded = showMore[group.tag];
          const visiblePortals = expanded ? group.portals : group.portals.slice(0, 4);

          return (
            <section key={group.tag} className="mb-8">
              <h2 className="mb-4 font-heading text-xl font-bold">{group.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {visiblePortals.map((portal) => (
                  <a
                    key={portal.name}
                    href={portal.buildUrl(filters.city || "Deutschland", filters)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="text-sm font-medium">{portal.name}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </a>
                ))}
              </div>
              {group.portals.length > 4 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={() => setShowMore((s) => ({ ...s, [group.tag]: !expanded }))}
                >
                  {expanded ? (
                    <><ChevronUp className="mr-1 h-4 w-4" /> Weniger anzeigen</>
                  ) : (
                    <><ChevronDown className="mr-1 h-4 w-4" /> Mehr anzeigen</>
                  )}
                </Button>
              )}
            </section>
          );
        })}

        {/* Hinweis */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4 text-center text-sm text-muted-foreground">
            Alle Links führen direkt zu den jeweiligen Portalen. BalkanDE speichert keine Wohnungsanzeigen.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
