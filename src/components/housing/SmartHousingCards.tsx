import { ExternalLink, Home, Building2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { SmartHousingResult } from "@/lib/housing-portals";

const TAG_ICON: Record<string, typeof Home> = {
  haupt: Building2,
  wg: Home,
  kurzzeit: Sparkles,
};

interface Props {
  results: SmartHousingResult[];
  city: string;
}

export default function SmartHousingCards({ results, city }: Props) {
  if (results.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[hsl(var(--gold))]" />
        <h2 className="font-heading text-xl font-bold">Preporučene pretrage</h2>
        <span className="ml-auto text-sm text-muted-foreground">{city}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((r, i) => {
          const Icon = TAG_ICON[r.tag] || Building2;
          return (
            <motion.a
              key={r.portal.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="group flex flex-col justify-between rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">{r.portal.name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {r.portal.desc}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary group-hover:underline">
                Otvori pretragu
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
