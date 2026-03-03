import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MrezaProUslugaNovo() {
  // TODO: Phase 2 - full PRO signup form
  return (
    <div className="container max-w-xl py-8 sm:py-12 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" asChild className="mb-3 -ml-2">
          <Link to="/mreza/pro-usluge"><ArrowLeft className="mr-1 h-4 w-4" />Nazad</Link>
        </Button>
        <h1 className="font-heading text-xl font-extrabold">PRO Profil</h1>
        <p className="text-sm text-muted-foreground">20€ / 12 mjeseci — bez automatskog produženja</p>
      </motion.div>

      <div className="rounded-xl border border-gold/20 bg-card p-8 text-center space-y-3">
        <Star className="mx-auto h-10 w-10 text-gold/40" />
        <p className="text-sm font-medium">PRO registracija dolazi u Fazi 2</p>
        <p className="text-xs text-muted-foreground">Forma za PRO profil i plaćanje će biti dostupni uskoro.</p>
      </div>
    </div>
  );
}
