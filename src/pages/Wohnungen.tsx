import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";
import {
  type HousingFilters,
  generateHousingResults,
  getHousingCity,
  type SmartHousingResult,
} from "@/lib/housing-portals";
import HousingSearchForm from "@/components/housing/HousingSearchForm";
import SmartHousingCards from "@/components/housing/SmartHousingCards";
import HousingPortalDirectory from "@/components/housing/HousingPortalDirectory";

export default function Wohnungen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<HousingFilters>({
    city: "", umkreis: "25", maxMiete: "", tip: "",
    bezProvizije: false, kratkorocno: false, namjesteno: false, anmeldung: false,
  });

  const [results, setResults] = useState<SmartHousingResult[]>([]);
  const [searched, setSearched] = useState(false);

  const searchCity = getHousingCity(filters);

  const handleChange = useCallback((partial: Partial<HousingFilters>) => {
    setFilters((f) => ({ ...f, ...partial }));
  }, []);

  const handleSearch = useCallback(() => {
    const r = generateHousingResults(filters);
    setResults(r);
    setSearched(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, [filters]);

  // Active badges
  const badges: string[] = [searchCity];
  if (filters.maxMiete && filters.maxMiete !== "none") badges.push(`≤ ${filters.maxMiete} €`);
  if (filters.tip === "wg") badges.push("WG / Soba");
  if (filters.tip === "stan") badges.push("Stan");
  if (filters.bezProvizije) badges.push("Bez provizije");
  if (filters.namjesteno) badges.push("Namješteno");
  if (filters.kratkorocno) badges.push("Kratkoročno");
  if (filters.anmeldung) badges.push("Anmeldung");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-primary py-10 text-primary-foreground md:py-14">
        <div className="container max-w-3xl">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button mb-4">
            <ArrowLeft className="h-4 w-4" /> Nazad
          </button>
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
              <Home className="h-4 w-4" /> Pretraga stanova
            </div>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
              Pronađi stan u Njemačkoj
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm text-primary-foreground/75 sm:text-base">
              Unesi svoje kriterije i pronađi odgovarajuće portale sa već pripremljenom pretragom.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="container max-w-3xl py-6 sm:py-8">
        <div className="-mt-12 sm:-mt-14 relative z-10">
          <HousingSearchForm filters={filters} onChange={handleChange} onSearch={handleSearch} />
        </div>

        {searched && badges.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {badges.map((b) => (
              <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
            ))}
          </div>
        )}

        <div ref={resultsRef}>
          {searched && <SmartHousingCards results={results} city={searchCity} />}
        </div>

        <HousingPortalDirectory city={searchCity} />

        <div className="mt-8 mb-4 flex items-start gap-2.5 rounded-lg border border-border/50 bg-muted/50 p-4">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            BalkanLink prikazuje pametne pretrage i vodi te na provjerene portale za stanove u Njemačkoj.
            Oglasi se nalaze na originalnim stranicama.
          </p>
        </div>
      </div>
    </div>
  );
}
