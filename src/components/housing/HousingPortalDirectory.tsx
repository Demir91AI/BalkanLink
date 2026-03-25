import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Building2, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PORTALE_HAUPT, PORTALE_WG, PORTALE_KURZZEIT, type HousingPortal } from "@/lib/housing-portals";

interface GroupProps {
  title: string;
  icon: React.ReactNode;
  portals: HousingPortal[];
  city: string;
  initialCount?: number;
}

function PortalGroup({ title, icon, portals, city, initialCount = 4 }: GroupProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? portals : portals.slice(0, initialCount);
  const hasMore = portals.length > initialCount;

  return (
    <div className="mb-6">
      <h3 className="flex items-center gap-2 mb-3 font-heading text-base font-bold text-foreground/90">
        {icon} {title}
      </h3>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {visible.map((p) => (
          <a
            key={p.name}
            href={p.buildUrl(city)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg border bg-card p-3.5 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium block">{p.name}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">{p.desc}</span>
            </div>
            <ExternalLink className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
      {hasMore && (
        <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <><ChevronUp className="mr-1 h-3.5 w-3.5" /> Prikaži manje</>
          ) : (
            <><ChevronDown className="mr-1 h-3.5 w-3.5" /> Prikaži više ({portals.length - initialCount})</>
          )}
        </Button>
      )}
    </div>
  );
}

interface Props {
  city: string;
}

export default function HousingPortalDirectory({ city }: Props) {
  return (
    <section className="mt-10 pt-8 border-t">
      <h2 className="font-heading text-lg font-bold mb-5">Svi portali za stanove</h2>
      <PortalGroup
        title="Glavni portali"
        icon={<Building2 className="h-4 w-4 text-primary" />}
        portals={PORTALE_HAUPT}
        city={city}
        initialCount={4}
      />
      <PortalGroup
        title="WG / Sobe"
        icon={<Home className="h-4 w-4 text-primary" />}
        portals={PORTALE_WG}
        city={city}
        initialCount={3}
      />
      <PortalGroup
        title="Kratkoročno / Namješteno"
        icon={<Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" />}
        portals={PORTALE_KURZZEIT}
        city={city}
        initialCount={3}
      />
    </section>
  );
}
