import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Megaphone, Star, ArrowRight } from "lucide-react";
import { MREZA_DISCLAIMER } from "@/lib/mreza-constants";

export default function Mreza() {
  return (
    <div className="container max-w-4xl py-10 sm:py-14 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">BalkanLink Mreža</h1>
        <p className="mt-1 text-sm text-muted-foreground">Oglasna tabla za balkansku zajednicu u Njemačkoj</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Oglasi card */}
        <Link to="/mreza/oglasi" className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary mb-4">
            <Megaphone className="h-6 w-6" />
          </div>
          <h2 className="font-heading text-lg font-bold">Oglasi</h2>
          <p className="mt-1 text-sm text-muted-foreground">Besplatni oglasi — posao, usluge, stanovanje, auto. Traju 15 dana.</p>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            Pregledaj oglase <ArrowRight className="h-4 w-4" />
          </div>
        </Link>

        {/* PRO Usluge card */}
        <Link to="/mreza/pro-usluge" className="group rounded-2xl border border-gold/30 bg-card p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold mb-4">
            <Star className="h-6 w-6" />
          </div>
          <h2 className="font-heading text-lg font-bold">PRO Usluge</h2>
          <p className="mt-1 text-sm text-muted-foreground">Istaknuti profil za majstore i firme. 20€ / 12 mjeseci.</p>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
            Pregledaj PRO <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      <p className="text-xs text-muted-foreground/70 leading-relaxed">{MREZA_DISCLAIMER}</p>
    </div>
  );
}
