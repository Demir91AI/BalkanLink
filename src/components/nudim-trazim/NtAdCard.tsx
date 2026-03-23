import { useState } from "react";
import { MapPin, Calendar, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { NtAd } from "@/lib/nudim-trazim-constants";
import { NT_CATEGORIES } from "@/lib/nudim-trazim-constants";

interface Props {
  ad: NtAd;
  onOpen: (ad: NtAd) => void;
}

export default function NtAdCard({ ad, onOpen }: Props) {
  const [showContact, setShowContact] = useState(false);
  const catLabel = NT_CATEGORIES.find((c) => c.value === ad.category)?.label ?? ad.category;
  const dateStr = new Date(ad.created_at).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Card
      className="group relative overflow-hidden border-border/60 bg-card hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onOpen(ad)}
    >
      {ad.is_pro && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] gap-1 text-[11px] font-semibold">
            <Star className="h-3 w-3" /> PRO
          </Badge>
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <Badge
            variant={ad.type === "nudim" ? "default" : "secondary"}
            className={
              ad.type === "nudim"
                ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] shrink-0"
                : "bg-primary/10 text-primary shrink-0"
            }
          >
            {ad.type === "nudim" ? "Nudim" : "Tražim"}
          </Badge>
          <Badge variant="outline" className="shrink-0 text-muted-foreground text-[11px]">
            {catLabel}
          </Badge>
        </div>

        <h3 className="font-semibold text-foreground text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {ad.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {ad.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {ad.city}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {dateStr}
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1"
            onClick={(e) => {
              e.stopPropagation();
              setShowContact((v) => !v);
            }}
          >
            <Eye className="h-3 w-3" />
            {showContact ? ad.contact_value : "Prikaži kontakt"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
