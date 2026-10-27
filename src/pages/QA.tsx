import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { useQaItems } from "@/hooks/useQaItems";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default function QA() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "";
  const [searchText, setSearchText] = useState("");
  const { data: items, isLoading } = useQaItems({
    search: searchText || undefined,
    category: activeFilter || undefined,
  });

  const setFilter = (slug: string) => {
    if (slug === activeFilter) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", slug);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const activeCategory = activeFilter ? getCategoryBySlug(activeFilter) : null;

  return (
    <div className="container py-8 md:py-12">
      <SEO title="Pitanja i Odgovori" description="Najčešća pitanja o životu u Njemačkoj — administracija, porezi, zdravstvo, stanovanje." path="/qa" />
      <div className="mb-8 max-w-2xl">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold md:text-4xl">{"Pitanja i odgovori"}</h1>
        <p className="mt-2 text-muted-foreground">{"Najčešće postavljana pitanja"}</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-60">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={"Pretraži pitanja..."}
              className="pl-10 bg-card"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <nav className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            <button
              onClick={() => {
                searchParams.delete("filter");
                setSearchParams(searchParams, { replace: true });
              }}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                !activeFilter
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Search className="h-4 w-4" />
              <span>{"Alle"}</span>
            </button>
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setFilter(cat.slug)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <cat.icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {activeCategory && (
            <div className="mb-5 flex items-center gap-2.5 rounded-lg border bg-secondary/50 px-4 py-3">
              <activeCategory.icon className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">{activeCategory.label}</h2>
              <Badge variant="secondary" className="ml-auto text-xs">
                {items?.length ?? 0} {"Ergebnisse"}
              </Badge>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 w-full rounded-xl" />
              ))}
            </div>
          ) : items && items.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="space-y-3"
            >
              {items.map((item) => (
                <QaCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
              <Search className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-muted-foreground">Nema rezultata</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function QaCard({ item }: { item: ReturnType<typeof useQaItems>["data"] extends (infer T)[] | undefined ? T : never }) {
  const cat = getCategoryBySlug(item.category);

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
      <Link
        to={`/qa/${item.id}`}
        className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
      >
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {cat && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <cat.icon className="h-3 w-3" />
                {cat.label}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
            {item.question}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{item.short_answer}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
