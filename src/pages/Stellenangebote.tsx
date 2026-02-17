import { useState, useMemo } from "react";
import { Briefcase, Search, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BUNDESLAENDER, GERMAN_CITIES_FULL, UMKREIS_OPTIONS } from "@/lib/germany-data";

const enc = encodeURIComponent;

interface Portal {
  name: string;
  buildUrl: (city: string) => string;
}

const BRANCHEN = [
  "Alle Branchen", "Pflege", "Bau", "Logistik & Lager", "Produktion",
  "Reinigung", "Gastronomie", "IT", "Handwerk", "Büro", "Ausbildung",
] as const;

const VERTRAGSARTEN = ["Vollzeit", "Teilzeit", "Minijob", "Ausbildung", "Praktikum"] as const;

const PORTALE_STAATLICH: Portal[] = [
  { name: "Bundesagentur für Arbeit", buildUrl: (c) => `https://www.arbeitsagentur.de/jobsuche/suche?angebotsart=1&wo=${enc(c)}` },
  { name: "EURES", buildUrl: () => `https://eures.europa.eu/index_de` },
];

const PORTALE_GROSS: Portal[] = [
  { name: "Indeed", buildUrl: (c) => `https://de.indeed.com/Jobs?l=${enc(c)}` },
  { name: "StepStone", buildUrl: (c) => `https://www.stepstone.de/jobs/${enc(c)}` },
  { name: "Monster", buildUrl: (c) => `https://www.monster.de/jobs/suche/?where=${enc(c)}` },
  { name: "Jobware", buildUrl: () => `https://www.jobware.de` },
  { name: "Meinestadt", buildUrl: (c) => `https://www.meinestadt.de/${enc(c.toLowerCase())}/jobs` },
  { name: "Joblift", buildUrl: (c) => `https://joblift.de/Suche?l=${enc(c)}` },
  { name: "Kimeta", buildUrl: (c) => `https://www.kimeta.de/stellenangebote?where=${enc(c)}` },
  { name: "Stellenanzeigen.de", buildUrl: (c) => `https://www.stellenanzeigen.de/jobs-in-${enc(c.toLowerCase())}` },
  { name: "Glassdoor", buildUrl: (c) => `https://www.glassdoor.de/Job/jobs.htm?locT=C&locKeyword=${enc(c)}` },
];

const PORTALE_SPEZIAL: Portal[] = [
  { name: "Medwing (Pflege)", buildUrl: () => `https://www.medwing.com/de` },
  { name: "Bau-Stellen (Bau)", buildUrl: () => `https://www.bau-stellen.de` },
  { name: "Logistic-Jobs (Logistik)", buildUrl: () => `https://www.logistic-jobs.de` },
  { name: "Ausbildung.de", buildUrl: () => `https://www.ausbildung.de` },
];

interface Filters {
  city: string;
  bundesland: string;
  umkreis: string;
  branche: string;
  vertragsart: string;
  ohneDeutsch: boolean;
  mitUnterkunft: boolean;
  quereinsteiger: boolean;
  schnellerEinstieg: boolean;
}

export default function Stellenangebote() {
  const [filters, setFilters] = useState<Filters>({
    city: "",
    bundesland: "",
    umkreis: "25",
    branche: "",
    vertragsart: "",
    ohneDeutsch: false,
    mitUnterkunft: false,
    quereinsteiger: false,
    schnellerEinstieg: false,
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

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const toggle = (key: "ohneDeutsch" | "mitUnterkunft" | "quereinsteiger" | "schnellerEinstieg") =>
    setFilters((f) => ({ ...f, [key]: !f[key] }));

  const portalGroups = useMemo(() => [
    { title: "Staatliche Portale", portals: PORTALE_STAATLICH, tag: "staat" },
    { title: "Große Jobportale", portals: PORTALE_GROSS, tag: "gross" },
    { title: "Spezialportale", portals: PORTALE_SPEZIAL, tag: "spezial" },
  ], []);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-primary py-12 text-primary-foreground md:py-16">
        <div className="container max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
            <Briefcase className="h-4 w-4" /> Job Finder
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            Jobsuche in ganz Deutschland
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Durchsuche staatliche und private Jobportale mit einem Klick.
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

            {/* Row 2: Umkreis + Branche + Vertragsart */}
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
                <Label className="mb-1.5 block text-sm font-medium">Branche</Label>
                <Select value={filters.branche} onValueChange={(v) => set("branche", v)}>
                  <SelectTrigger><SelectValue placeholder="Alle Branchen" /></SelectTrigger>
                  <SelectContent>
                    {BRANCHEN.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Vertragsart</Label>
                <Select value={filters.vertragsart} onValueChange={(v) => set("vertragsart", v)}>
                  <SelectTrigger><SelectValue placeholder="Alle" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle</SelectItem>
                    {VERTRAGSARTEN.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Checkboxes */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {([
                ["ohneDeutsch", "Ohne Deutschkenntnisse"],
                ["mitUnterkunft", "Mit Unterkunft"],
                ["quereinsteiger", "Quereinsteiger möglich"],
                ["schnellerEinstieg", "Schneller Einstieg"],
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
          {filters.branche && filters.branche !== "Alle Branchen" && (
            <Badge variant="outline" className="text-sm">{filters.branche}</Badge>
          )}
          {filters.vertragsart && filters.vertragsart !== "alle" && (
            <Badge variant="outline" className="text-sm">{filters.vertragsart}</Badge>
          )}
          {filters.ohneDeutsch && <Badge variant="outline" className="text-sm">Ohne Deutsch</Badge>}
          {filters.mitUnterkunft && <Badge variant="outline" className="text-sm">Mit Unterkunft</Badge>}
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
                    href={portal.buildUrl(filters.city || "Deutschland")}
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
            Alle Links führen direkt zu den jeweiligen Portalen. BalkanDE speichert keine Stellenanzeigen.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
