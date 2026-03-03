import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Plus, MapPin, Phone, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MrezaProUsluge() {
  // TODO: Phase 2 - fetch pro_services
  return (
    <div className="container max-w-4xl py-8 sm:py-12 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">PRO Usluge</h1>
          <p className="text-sm text-muted-foreground">Istaknuti profili majstora i firmi — 20€ / 12 mjeseci</p>
        </div>
        <Button asChild size="sm" className="shrink-0 btn-gold-gradient text-xs">
          <Link to="/mreza/pro-usluge/novo"><Plus className="mr-1.5 h-4 w-4" />Dodaj PRO profil</Link>
        </Button>
      </motion.div>

      <div className="rounded-xl border border-gold/20 bg-card p-8 text-center">
        <Star className="mx-auto h-10 w-10 text-gold/40 mb-3" />
        <p className="text-sm text-muted-foreground">PRO Usluge dolaze uskoro u Fazi 2.</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Registrujte se da budete među prvima.</p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link to="/mreza/pro-usluge/novo">Registruj PRO profil</Link>
        </Button>
      </div>
    </div>
  );
}
