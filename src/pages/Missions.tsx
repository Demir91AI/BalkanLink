import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Building, Landmark, Filter, Phone, Mail, Globe, Info, ChevronLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMissions } from "@/hooks/useMissions";
import { useHistorySearchState } from "@/hooks/useHistorySearchState";
import { ORIGIN_COUNTRIES } from "@/lib/directory-constants";
import { navigateBackOrHome } from "@/lib/navigation";

const MISSION_TYPES = ["Embassy", "Consulate General"] as const;

function MissionDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const { data: missions, isLoading } = useMissions({ country: "", city: "", missionType: "" });
  const { t } = useTranslation("common");
  const mission = missions?.find((m) => m.id === id);

  if (isLoading) return <div className="container py-8"><div className="h-48 animate-pulse rounded-xl border bg-muted" /></div>;
  if (!mission) return (
    <div className="container py-8 text-center">
      <p className="text-muted-foreground">{t("noResults", { defaultValue: "Nema rezultata" })}</p>
      <button onClick={onBack} className="back-button"><ChevronLeft className="h-4 w-4" />{t("nav.back", { defaultValue: "Nazad" })}</button>
    </div>
  );

  const originCountry = ORIGIN_COUNTRIES.find((c) => c.code === mission.country_code);
  const isEmbassy = mission.mission_type === "Embassy";
  const getMissionTypeLabel = (type: string) => type === "Embassy" ? "Botschaft" : "Konsulat";
  const hasContact = mission.phone || mission.email || mission.website;

  return (
    <div className="container py-8">
      <button onClick={onBack} className="back-button">
        <ChevronLeft className="h-4 w-4" />
        Nazad
      </button>

      <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          {originCountry && <span className="text-3xl leading-none">{originCountry.flag}</span>}
          <div>
            <h1 className="text-lg font-bold">{mission.country_name}</h1>
            <span className={`inline-flex items-center gap-1 text-sm font-medium ${isEmbassy ? "text-primary" : "text-muted-foreground"}`}>
              {isEmbassy ? <Landmark className="h-4 w-4" /> : <Building className="h-4 w-4" />}
              {getMissionTypeLabel(mission.mission_type)}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-6">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <div>{mission.address_line}</div>
            <div>{mission.postal_code} {mission.city}</div>
          </div>
        </div>

        {hasContact && (
          <div className="border-t pt-4">
            <h2 className="mb-3 text-sm font-semibold">Kontakt informacije</h2>
            <div className="flex flex-col gap-2.5 text-sm">
              {mission.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${mission.phone}`} className="hover:text-foreground">{mission.phone}</a>
                </div>
              )}
              {mission.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href={`mailto:${mission.email}`} className="hover:text-foreground">{mission.email}</a>
                </div>
              )}
              {mission.website && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4 shrink-0" />
                  <a
                    href={mission.website.startsWith("http") ? mission.website : `https://${mission.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:text-foreground"
                  >
                    {mission.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Missions() {
  const navigate = useNavigate();
  const { searchParams, setSearchState } = useHistorySearchState();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [missionType, setMissionType] = useState("");
  const selectedId = searchParams.get("mission");

  const { data: missions, isLoading } = useMissions({ country, city, missionType });

  const uniqueCities = [...new Set(missions?.map((m) => m.city) ?? [])].sort();

  const clearFilters = () => { setCountry(""); setCity(""); setMissionType(""); };
  const hasFilters = country || city || missionType;

  const getMissionTypeLabel = (type: string) => type === "Embassy" ? "Botschaft" : "Konsulat";

  if (selectedId) {
    return <MissionDetail id={selectedId} onBack={() => navigateBackOrHome(navigate)} />;
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
          <ChevronLeft className="h-4 w-4" /> Nazad
        </button>
        <h1 className="text-2xl font-bold md:text-3xl">{"Ambasade i konzulati"}</h1>
        <p className="mt-1 text-muted-foreground">{"Pronađi diplomatska predstavništva"}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Select value={country} onValueChange={(v) => setCountry(v === "all" ? "" : v)}>
          <SelectTrigger><SelectValue placeholder={"Država"} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{"Sve države"}</SelectItem>
            {ORIGIN_COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code}><span className="mr-2">{c.flag}</span>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={city} onValueChange={(v) => setCity(v === "all" ? "" : v)}>
          <SelectTrigger><SelectValue placeholder={"Grad"} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{"Svi gradovi"}</SelectItem>
            {uniqueCities.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={missionType} onValueChange={(v) => setMissionType(v === "all" ? "" : v)}>
          <SelectTrigger><SelectValue placeholder={"Tip"} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{"Svi tipovi"}</SelectItem>
            {MISSION_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{getMissionTypeLabel(type)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{missions?.length ?? 0} {"rezultata"}</span>
          <button onClick={clearFilters} className="ml-auto text-xs text-muted-foreground hover:text-foreground">{"Obriši filtere"}</button>
        </div>
      )}

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
            const hasContact = m.phone || m.email || m.website;
            return (
              <button
                key={m.id}
                onClick={() =>
                  setSearchState(
                    { mission: m.id },
                    { state: { blInternalBack: true } }
                  )
                }
                className="flex flex-col gap-3 rounded-xl border bg-card p-5 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {originCountry && <span className="text-2xl leading-none">{originCountry.flag}</span>}
                    <div>
                      <h3 className="text-sm font-semibold leading-tight">{m.country_name}</h3>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${isEmbassy ? "text-primary" : "text-muted-foreground"}`}>
                        {isEmbassy ? <Landmark className="h-3 w-3" /> : <Building className="h-3 w-3" />}
                        {getMissionTypeLabel(m.mission_type)}
                      </span>
                    </div>
                  </div>
                  {hasContact && (
                    <span className="shrink-0 rounded-full bg-primary/10 p-1" title="Kontakt dostupan">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </span>
                  )}
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
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Landmark className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">Nema rezultata</p>
        </div>
      )}
    </div>
  );
}
