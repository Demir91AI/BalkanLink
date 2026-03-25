import { useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BUNDESLAENDER, GERMAN_CITIES_FULL, UMKREIS_OPTIONS } from "@/lib/germany-data";
import { useLanguage } from "@/contexts/LanguageContext";
import type { JobFilters } from "@/lib/job-portals";

const BRANCHE_KEYS = ["pflege", "bau", "logistik", "produktion", "reinigung", "gastro", "it", "handwerk", "buero", "ausbildung"] as const;
const VERTRAG_KEYS = ["vollzeit", "teilzeit", "minijob", "ausbildung", "praktikum"] as const;

interface Props {
  filters: JobFilters;
  onChange: (f: Partial<JobFilters>) => void;
  onSearch: () => void;
}

export default function JobSearchForm({ filters, onChange, onSearch }: Props) {
  const { t } = useLanguage();
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCityInput = (value: string) => {
    onChange({ city: value });
    if (value.length >= 2) {
      setCitySuggestions(
        GERMAN_CITIES_FULL.filter((c) => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 6)
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: string) => {
    onChange({ city });
    setShowSuggestions(false);
  };

  const toggle = (key: "ohneDeutsch" | "mitUnterkunft" | "quereinsteiger" | "schnellerEinstieg") =>
    onChange({ [key]: !filters[key] });

  const checkboxes: { key: typeof toggle extends (k: infer K) => void ? K : never; label: string }[] = [
    { key: "ohneDeutsch", label: t("jobs.noDeutsch") },
    { key: "mitUnterkunft", label: t("jobs.mitUnterkunft") },
    { key: "quereinsteiger", label: t("jobs.quereinsteiger") },
    { key: "schnellerEinstieg", label: t("jobs.schnellerEinstieg") },
  ];

  return (
    <Card className="border-0 shadow-lg bg-card">
      <CardContent className="p-5 sm:p-7 space-y-5">
        {/* Row 1: City + Bundesland */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <MapPin className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
              {t("jobs.city")}
            </Label>
            <Input
              placeholder="Berlin, München…"
              value={filters.city}
              onChange={(e) => handleCityInput(e.target.value)}
              onFocus={() => filters.city.length >= 2 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="h-11"
            />
            {showSuggestions && citySuggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full rounded-lg border bg-popover shadow-xl overflow-hidden">
                {citySuggestions.map((c) => (
                  <li
                    key={c}
                    className="cursor-pointer px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                    onMouseDown={() => selectCity(c)}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("jobs.bundesland")}
            </Label>
            <Select value={filters.bundesland} onValueChange={(v) => onChange({ bundesland: v })}>
              <SelectTrigger className="h-11"><SelectValue placeholder={t("jobs.allGermany")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="alle">{t("jobs.allGermany")}</SelectItem>
                {BUNDESLAENDER.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Umkreis + Branche + Vertragsart */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
          <div>
            <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("jobs.radius")}
            </Label>
            <Select value={filters.umkreis} onValueChange={(v) => onChange({ umkreis: v })}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {UMKREIS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("jobs.branche")}
            </Label>
            <Select value={filters.branche} onValueChange={(v) => onChange({ branche: v })}>
              <SelectTrigger className="h-11"><SelectValue placeholder={t("jobs.allBranchen")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="alle">{t("jobs.allBranchen")}</SelectItem>
                {BRANCHE_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>{t(`branche.${k}` as any)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("jobs.vertragsart")}
            </Label>
            <Select value={filters.vertragsart} onValueChange={(v) => onChange({ vertragsart: v })}>
              <SelectTrigger className="h-11"><SelectValue placeholder="—" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="alle">—</SelectItem>
                {VERTRAG_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>{t(`vertrag.${k}` as any)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-3">
          {checkboxes.map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border/60 px-3 py-2.5 text-sm transition-colors hover:bg-accent/50 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/5">
              <Checkbox checked={filters[key]} onCheckedChange={() => toggle(key)} />
              <span className="leading-tight">{label}</span>
            </label>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={onSearch}
          size="lg"
          className="w-full h-12 text-base font-semibold gap-2 bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] hover:bg-[hsl(var(--gold-dark))] shadow-md"
        >
          <Search className="h-5 w-5" />
          {t("jobs.search")}
        </Button>
      </CardContent>
    </Card>
  );
}
