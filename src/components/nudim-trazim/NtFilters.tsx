import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NT_CATEGORIES, NT_RADIUS_OPTIONS, NT_SORT_OPTIONS } from "@/lib/nudim-trazim-constants";
interface Filters {
  search: string;
  type: string;
  category: string;
  city: string;
  radius: string;
  sort: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
}

export default function NtFilters({ filters, onChange }: Props) {
  const { t } = useTranslation("pages");

  const radiusLabel = (value: number, fallback: string) =>
    value === 0 ? t("classifieds.filters.allRadius") : fallback;

  const sortLabel = (value: string, fallback: string) => {
    if (value === "newest") return t("classifieds.sort.newest");
    if (value === "relevant") return t("classifieds.sort.relevant");
    return fallback;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("classifieds.filters.searchPlaceholder")}
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Tabs value={filters.type} onValueChange={(v) => onChange({ type: v })}>
          <TabsList className="h-10">
            <TabsTrigger value="sve" className="px-4">{t("classifieds.filters.all")}</TabsTrigger>
            <TabsTrigger value="nudim" className="px-4">{t("classifieds.filters.offering")}</TabsTrigger>
            <TabsTrigger value="trazim" className="px-4">{t("classifieds.filters.seeking")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Select value={filters.category} onValueChange={(v) => onChange({ category: v })}>
          <SelectTrigger><SelectValue placeholder={t("classifieds.filters.categoryPlaceholder")} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sve">{t("classifieds.filters.allCategories")}</SelectItem>
            {NT_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>{t(`classifieds.categories.${c.value}`, c.label)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder={t("classifieds.filters.cityPlaceholder")}
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />

        <Select value={filters.radius} onValueChange={(v) => onChange({ radius: v })}>
          <SelectTrigger><SelectValue placeholder={t("classifieds.filters.radiusPlaceholder")} /></SelectTrigger>
          <SelectContent>
            {NT_RADIUS_OPTIONS.map((r) => (
              <SelectItem key={r.value} value={String(r.value)}>{radiusLabel(r.value, r.label)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.sort} onValueChange={(v) => onChange({ sort: v })}>
          <SelectTrigger><SelectValue placeholder={t("classifieds.filters.sortPlaceholder")} /></SelectTrigger>
          <SelectContent>
            {NT_SORT_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>{sortLabel(s.value, s.label)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
