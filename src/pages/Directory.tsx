import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Phone, Globe, Plus, Building2, Filter, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDirectoryListings } from "@/hooks/useDirectoryListings";
import { ORIGIN_COUNTRIES, DIRECTORY_CATEGORIES, GERMAN_CITIES } from "@/lib/directory-constants";
import { navigateBackOrHome } from "@/lib/navigation";

export default function Directory() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");

  const { data: listings, isLoading } = useDirectoryListings({ search, city, category, origin });

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setCategory("");
    setOrigin("");
  };

  const hasFilters = search || city || category || origin;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
            <ChevronLeft className="h-4 w-4" /> {t("common.back")}
          </button>
          <h1 className="text-2xl font-bold md:text-3xl">{t("dir.title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("dir.subtitle")}</p>
        </div>
        <Button asChild>
          <Link to="/directory/submit">
            <Plus className="mr-2 h-4 w-4" />
            {t("dir.add")}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("dir.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={city} onValueChange={(v) => setCity(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={t("dir.filterCity")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("dir.allCities")}</SelectItem>
            {GERMAN_CITIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={t("dir.filterCategory")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("dir.allCategories")}</SelectItem>
            {DIRECTORY_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={origin} onValueChange={(v) => setOrigin(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder={t("dir.filterOrigin")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("dir.allOrigins")}</SelectItem>
            {ORIGIN_COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <span className="mr-2">{c.flag}</span>{c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {listings?.length ?? 0} {t("dir.results")}
          </span>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto text-xs">
            {t("dir.clearFilters")}
          </Button>
        </div>
      )}

      {/* Listings */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl border bg-muted" />
          ))}
        </div>
      ) : listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
            const originCountry = ORIGIN_COUNTRIES.find((c) => c.code === listing.origin_country);
            return (
              <div
                key={listing.id}
                className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold leading-tight">{listing.name}</h3>
                  {originCountry && (
                    <span className="shrink-0 text-lg" title={originCountry.label}>
                      {originCountry.flag}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {listing.category}
                  </span>
                </div>
                {listing.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
                )}
                <div className="mt-auto flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{listing.city}{listing.address ? `, ${listing.address}` : ""}</span>
                  </div>
                  {listing.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <a href={`tel:${listing.phone}`} className="hover:text-primary">{listing.phone}</a>
                    </div>
                  )}
                  {listing.website && (
                    <div className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 shrink-0" />
                      <a
                        href={listing.website.startsWith("http") ? listing.website : `https://${listing.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate hover:text-primary"
                      >
                        {listing.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">{t("dir.empty")}</p>
        </div>
      )}
    </div>
  );
}
