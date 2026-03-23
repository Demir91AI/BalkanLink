import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Eye, Star, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { NtAd } from "@/lib/nudim-trazim-constants";
import { NT_CATEGORIES, DEMO_ADS } from "@/lib/nudim-trazim-constants";
import NtAdCard from "./NtAdCard";

interface Props {
  ad: NtAd;
  onBack: () => void;
  onOpen: (ad: NtAd) => void;
}

export default function NtAdDetail({ ad, onBack, onOpen }: Props) {
  const [showContact, setShowContact] = useState(false);
  const catLabel = NT_CATEGORIES.find((c) => c.value === ad.category)?.label ?? ad.category;
  const dateStr = new Date(ad.created_at).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const similar = DEMO_ADS.filter((a) => a.id !== ad.id && a.category === ad.category).slice(0, 3);

  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Nazad na oglase
      </Button>

      <Card className="border-border/60">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={
                ad.type === "nudim"
                  ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]"
                  : "bg-primary/10 text-primary"
              }
            >
              {ad.type === "nudim" ? "Nudim" : "Tražim"}
            </Badge>
            <Badge variant="outline">{catLabel}</Badge>
            {ad.is_pro && (
              <Badge className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] gap-1">
                <Star className="h-3 w-3" /> PRO
              </Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground">{ad.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{ad.city}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{dateStr}</span>
          </div>

          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{ad.description}</p>

          {/* Contact */}
          <div className="pt-4 border-t border-border">
            <Button onClick={() => setShowContact((v) => !v)} className="gap-2">
              <Eye className="h-4 w-4" />
              {showContact ? ad.contact_value : "Prikaži kontakt"}
            </Button>
          </div>

          {/* Safety hint */}
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 mt-0.5 shrink-0" />
            <p>
              Budite oprezni pri kontaktiranju. BalkanLink ne provjerava identitet oglašivača niti
              odgovara za dogovorene usluge ili transakcije.
            </p>
          </div>
        </CardContent>
      </Card>

      {similar.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Slični oglasi</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similar.map((a) => (
              <NtAdCard key={a.id} ad={a} onOpen={onOpen} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
