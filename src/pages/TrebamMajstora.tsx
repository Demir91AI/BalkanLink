import { useState, useMemo } from "react";
import { Wrench, Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GERMAN_CITIES_FULL } from "@/lib/germany-data";
import { useLanguage } from "@/contexts/LanguageContext";
import SubpageNav from "@/components/SubpageNav";

const enc = encodeURIComponent;

const SERVICE_CATEGORIES = [
  { key: "maler", label: "Maler" },
  { key: "elektriker", label: "Elektriker" },
  { key: "sanitaer", label: "Sanitär" },
  { key: "reinigung", label: "Reinigung" },
  { key: "umzug", label: "Umzug" },
  { key: "renovierung", label: "Renovierung" },
  { key: "kfz", label: "KFZ Service" },
  { key: "friseur", label: "Friseur / Beauty" },
  { key: "sonstige", label: "Sonstige Dienstleistungen" },
];

interface Portal {
  name: string;
  buildUrl: (city: string, service: string) => string;
}

const PORTALS: Portal[] = [
  { name: "MyHammer", buildUrl: (c, s) => `https://www.myhammer.de/suche/?search=${enc(s)}&location=${enc(c)}` },
  { name: "Kleinanzeigen", buildUrl: (c, s) => `https://www.kleinanzeigen.de/s-dienstleistungen/${enc(c.toLowerCase())}/${enc(s)}/k0` },
  { name: "GoYellow", buildUrl: (c, s) => `https://www.goyellow.de/suche/${enc(s)}/${enc(c)}` },
  { name: "Gelbe Seiten", buildUrl: (c, s) => `https://www.gelbeseiten.de/Suche/${enc(s)}/${enc(c)}` },
  { name: "Das Örtliche", buildUrl: (c, s) => `https://www.dasoertliche.de/Themen/${enc(s)}/${enc(c)}` },
  { name: "11880", buildUrl: (c, s) => `https://www.11880.com/${enc(s)}/${enc(c)}` },
];

export default function TrebamMajstora() {
  const { t } = useLanguage();
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCityInput = (value: string) => {
    setCity(value);
    if (value.length >= 2) {
      setCitySuggestions(GERMAN_CITIES_FULL.filter((c) => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 8));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const searchCity = city || "Deutschland";
  const searchService = service ? SERVICE_CATEGORIES.find((s) => s.key === service)?.label || "" : "";

  return (
    <div className="min-h-screen bg-muted/30">
      <SubpageNav />
      <section className="bg-primary py-12 text-primary-foreground md:py-16">
        <div className="container max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
            <Wrench className="h-4 w-4" /> Trebam majstora
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Trebam majstora</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Pronađi majstore i pružatelje usluga u tvom gradu.
          </p>
        </div>
      </section>

      <div className="container max-w-5xl py-8">
        <Card className="mb-8 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-primary" /> Pretraga
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <Label className="mb-1.5 block text-sm font-medium">Grad</Label>
                <Input
                  placeholder="Berlin, München…"
                  value={city}
                  onChange={(e) => handleCityInput(e.target.value)}
                  onFocus={() => city.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && citySuggestions.length > 0 && (
                  <ul className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
                    {citySuggestions.map((c) => (
                      <li key={c} className="cursor-pointer px-3 py-2 text-sm hover:bg-accent" onMouseDown={() => { setCity(c); setShowSuggestions(false); }}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Usluga</Label>
                <Select value={service} onValueChange={(v) => setService(v === "alle" ? "" : v)}>
                  <SelectTrigger><SelectValue placeholder="Sve usluge" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Sve usluge</SelectItem>
                    {SERVICE_CATEGORIES.map((s) => (
                      <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-sm">{searchCity}</Badge>
          {searchService && <Badge variant="outline" className="text-sm">{searchService}</Badge>}
        </div>

        <section className="mb-8">
          <h2 className="mb-4 font-heading text-xl font-bold">Portale durchsuchen</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PORTALS.map((portal) => (
              <a key={portal.name} href={portal.buildUrl(city || "Deutschland", searchService || "Handwerker")} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-primary/40 hover:shadow-md">
                <span className="text-sm font-medium">{portal.name}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
