import { Search } from "lucide-react";
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
  return (
    <div className="space-y-4">
      {/* Search + Type Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pretraži oglase..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Tabs value={filters.type} onValueChange={(v) => onChange({ type: v })}>
          <TabsList className="h-10">
            <TabsTrigger value="sve" className="px-4">Sve</TabsTrigger>
            <TabsTrigger value="nudim" className="px-4">Nudim</TabsTrigger>
            <TabsTrigger value="trazim" className="px-4">Tražim</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Dropdowns row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Select value={filters.category} onValueChange={(v) => onChange({ category: v })}>
          <SelectTrigger><SelectValue placeholder="Kategorija" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sve">Sve kategorije</SelectItem>
            {NT_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Grad / Ort"
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />

        <Select value={filters.radius} onValueChange={(v) => onChange({ radius: v })}>
          <SelectTrigger><SelectValue placeholder="Umkreis" /></SelectTrigger>
          <SelectContent>
            {NT_RADIUS_OPTIONS.map((r) => (
              <SelectItem key={r.value} value={String(r.value)}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.sort} onValueChange={(v) => onChange({ sort: v })}>
          <SelectTrigger><SelectValue placeholder="Sortierung" /></SelectTrigger>
          <SelectContent>
            {NT_SORT_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
