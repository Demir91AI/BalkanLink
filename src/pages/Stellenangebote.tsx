import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, ArrowLeft, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";
import { type JobFilters, generateSmartResults, getSearchCity, buildSearchQuery, type SmartResult } from "@/lib/job-portals";
import JobSearchForm from "@/components/jobs/JobSearchForm";
import SmartResultCards from "@/components/jobs/SmartResultCards";
import PortalDirectory from "@/components/jobs/PortalDirectory";

export default function Stellenangebote() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<JobFilters>({
    city: "", bundesland: "", umkreis: "25", branche: "", vertragsart: "",
    ohneDeutsch: false, mitUnterkunft: false, quereinsteiger: false, schnellerEinstieg: false,
  });

  const [results, setResults] = useState<SmartResult[]>([]);
  const [searched, setSearched] = useState(false);

  const searchCity = getSearchCity(filters);
  const searchQuery = buildSearchQuery(filters);

  const handleChange = useCallback((partial: Partial<JobFilters>) => {
    setFilters((f) => ({ ...f, ...partial }));
  }, []);

  const handleSearch = useCallback(() => {
    const r = generateSmartResults(filters);
    setResults(r);
    setSearched(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, [filters]);

  // Active filter badges
  const badges: string[] = [searchCity];
  if (filters.bundesland && filters.bundesland !== "alle") badges.push(filters.bundesland);
  if (filters.branche && filters.branche !== "alle") badges.push(t(`branche.${filters.branche}` as any));
  if (filters.vertragsart && filters.vertragsart !== "alle") badges.push(t(`vertrag.${filters.vertragsart}` as any));
  if (filters.ohneDeutsch) badges.push(t("jobs.noDeutsch"));
  if (filters.mitUnterkunft) badges.push(t("jobs.mitUnterkunft"));
  if (filters.quereinsteiger) badges.push(t("jobs.quereinsteiger"));

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ── Hero ─────────────────────────────── */}
      <section className="bg-primary py-10 text-primary-foreground md:py-14">
        <div className="container max-w-3xl">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button mb-4">
            <ArrowLeft className="h-4 w-4" /> Nazad
          </button>
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
              <Briefcase className="h-4 w-4" /> {t("jobs.title")}
            </div>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
              {t("jobs.title")}
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm text-primary-foreground/75 sm:text-base">
              Pronađi odgovarajuće portale i pretraži poslove u Njemačkoj pomoću pametnih filtera.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────── */}
      <div className="container max-w-3xl py-6 sm:py-8">
        {/* Search Form */}
        <div className="-mt-12 sm:-mt-14 relative z-10">
          <JobSearchForm filters={filters} onChange={handleChange} onSearch={handleSearch} />
        </div>

        {/* Active filter badges */}
        {searched && badges.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {badges.map((b) => (
              <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
            ))}
          </div>
        )}

        {/* Smart Results */}
        <div ref={resultsRef}>
          {searched && (
            <SmartResultCards results={results} city={searchCity} />
          )}
        </div>

        {/* Portal Directory – always visible */}
        <PortalDirectory city={searchCity} query={searchQuery} />

        {/* Disclaimer */}
        <div className="mt-8 mb-4 flex items-start gap-2.5 rounded-lg border border-border/50 bg-muted/50 p-4">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            BalkanLink prikazuje pametne pretrage i vodi te na provjerene portale za posao u Njemačkoj.
            Same prijave i oglasi nalaze se na originalnim stranicama.
          </p>
        </div>
      </div>
    </div>
  );
}
