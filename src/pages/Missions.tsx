import { useState } from "react";
import { MapPin, Building, Landmark, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMissions } from "@/hooks/useMissions";
import { ORIGIN_COUNTRIES } from "@/lib/directory-constants";

const MISSION_TYPES = ["Embassy", "Consulate General"] as const;

export default function Missions() {
  const { t } = useLanguage();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [missionType, setMissionType] = useState("");

  const { data: missions, isLoading } = useMissions({ country, city, missionType });

  // Derive unique cities from data
  const uniqueCities = [...new Set(missions?.map((m) => m.city) ?? [])].sort();

  const clearFilters = () => {
    setCountry("");
    setCity("");
    setMissionType("");
  };

  const hasFilters = country || city || missionType;

  const getMissionTypeLabel = (type: string) => {
    if (type === "Embassy") return t("missions.embassy");
    return t("missions.consulate");
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">{t("missions.title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("missions.subtitle")}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Select value={country} onValueChange={(v) => setCountry(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={t("missions.filterCountry")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("missions.allCountries")}</SelectItem>
            {ORIGIN_COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <span className="mr-2">{c.flag}</span>{c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={city} onValueChange={(v) => setCity(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={t("missions.filterCity")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("missions.allCities")}</SelectItem>
            {uniqueCities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={missionType} onValueChange={(v) => setMissionType(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={t("missions.filterType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("missions.allTypes")}</SelectItem>
            {MISSION_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{getMissionTypeLabel(type)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {missions?.length ?? 0} {t("missions.results")}
          </span>
          <button onClick={clearFilters} className="ml-auto text-xs text-muted-foreground hover:text-foreground">
            {t("missions.clearFilters")}
          </button>
        </div>
      )}

      {/* Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl border bg-muted" />
          ))}
        </div>
      ) : missions && missions.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {missions.map((m) => {
            const originCountry = ORIGIN_COUNTRIES.find((c) => c.code === m.country_code);
            const isEmbassy = m.mission_type === "Embassy";
            return (
              <div
                key={m.id}
                className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {originCountry && (
                      <span className="text-2xl leading-none">{originCountry.flag}</span>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold leading-tight">{m.country_name}</h3>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                        isEmbassy ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {isEmbassy ? <Landmark className="h-3 w-3" /> : <Building className="h-3 w-3" />}
                        {getMissionTypeLabel(m.mission_type)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <div>
                      <div>{m.address_line}</div>
                      <div>{m.postal_code} {m.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Landmark className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">{t("missions.empty")}</p>
        </div>
      )}
    </div>
  );
}
