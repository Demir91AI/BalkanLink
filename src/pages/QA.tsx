import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Lock, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { useQaItems } from "@/hooks/useQaItems";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

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
    <div className="container py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Pitanja i odgovori</h1>
        <p className="mt-2 text-muted-foreground">
          Pronađi odgovor na svoje pitanje — brzo i na našem jeziku.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pretraži pitanja..."
          className="pl-10"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat.slug;
          return (
            <Button
              key={cat.slug}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat.slug)}
              className="gap-1.5"
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
            </Button>
          );
        })}
        {activeFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              searchParams.delete("filter");
              setSearchParams(searchParams, { replace: true });
            }}
          >
            Pokaži sve
          </Button>
        )}
      </div>

      {/* Active filter label */}
      {activeCategory && (
        <div className="mb-6 flex items-center gap-2">
          <activeCategory.icon className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">{activeCategory.label}</h2>
        </div>
      )}

      {/* Results */}
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
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">Nema rezultata. Pokušaj sa drugim pojmom.</p>
        </div>
      )}
    </div>
  );
}

function QaCard({ item }: { item: ReturnType<typeof useQaItems>["data"] extends (infer T)[] | undefined ? T : never }) {
  const { isPremium: userIsPremium } = useAuth();
  const cat = getCategoryBySlug(item.category);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
    >
      <Link
        to={`/qa/${item.id}`}
        className="group block rounded-xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {cat && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <cat.icon className="h-3 w-3" />
                  {cat.label}
                </Badge>
              )}
              {item.is_premium && (
                <Badge className="gap-1 bg-balkan-gold text-balkan-gold-foreground text-xs">
                  <Crown className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>
            <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
              {item.question}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
              {item.short_answer}
            </p>
          </div>
          {item.is_premium && !userIsPremium && (
            <Lock className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
