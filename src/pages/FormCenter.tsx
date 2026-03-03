import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FORMS_REGISTRY, CATEGORY_META, type FormCategory } from "@/lib/forms-registry";

const FILTER_TABS: { key: "sve" | FormCategory; label: string }[] = [
  { key: "sve", label: "Sve" },
  { key: "porodica", label: "Porodica" },
  { key: "socijala", label: "Socijala" },
  { key: "zdravlje", label: "Zdravlje" },
  { key: "stanovanje", label: "Stanovanje" },
  { key: "dokumenti", label: "Dokumenti" },
];

export default function FormCenter() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"sve" | FormCategory>("sve");

  const filtered = useMemo(() => {
    let list = FORMS_REGISTRY;
    if (activeTab !== "sve") list = list.filter((f) => f.category === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.titleDe.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.institution.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeTab]);

  // group by category for "sve" tab
  const categories = activeTab === "sve"
    ? (Object.keys(CATEGORY_META) as FormCategory[]).filter((cat) =>
        filtered.some((f) => f.category === cat)
      )
    : [activeTab];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Formulari & Smart Guide</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Svi njemački formulari na jednom mjestu — korak po korak na našem jeziku.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pretraži formular…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Forms by category */}
      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">Nema rezultata za "{search}"</p>
      )}

      {categories.map((cat) => {
        const meta = CATEGORY_META[cat];
        const Icon = meta.icon;
        const catForms = filtered.filter((f) => f.category === cat);
        if (catForms.length === 0) return null;

        return (
          <div key={cat} className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-lg font-bold">{meta.label}</h2>
              <Badge variant="outline" className="text-[10px]">{catForms.length}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catForms.map((form) => (
                <div
                  key={form.id}
                  className="flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <Badge className="bg-primary/10 text-primary text-[10px] border-primary/20">
                        Smart Guide
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold">{form.title}</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{form.institution}</p>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{form.description}</p>
                  </div>
                  <Button className="mt-4 w-full rounded-xl text-xs" size="sm" asChild>
                    <Link to={`/formulari/${form.slug}`}>Otvori Smart Guide</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
