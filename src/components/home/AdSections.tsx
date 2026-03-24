import { motion } from "framer-motion";
import { Megaphone, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/* ── 1. Hero Ad Banner (below slider) ── */
export function HeroAdBanner() {
  return (
    <motion.section {...sectionAnim} className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(215,60%,18%)] to-[hsl(var(--primary))]">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="container relative z-10 flex flex-col items-center justify-center py-12 text-center sm:py-16">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/15 ring-1 ring-[hsl(var(--gold))]/25">
          <Megaphone className="h-5 w-5 text-[hsl(var(--gold))]" />
        </div>
        <h2 className="font-heading text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
          Oglasite svoj biznis na <span className="text-gold">BalkanLink</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
          Dosegnite našu zajednicu u Njemačkoj – brzo i direktno.
        </p>
        <Button
          className="mt-6 gap-2 rounded-xl bg-[hsl(var(--gold))] font-semibold text-[hsl(var(--gold-foreground))] shadow-lg hover:bg-[hsl(var(--gold-light))] hover:shadow-xl transition-all"
          size="lg"
        >
          Saznaj više <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.section>
  );
}

/* ── 2. Video Ad Section ── */
export function VideoAdSection() {
  return (
    <motion.section
      {...sectionAnim}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-br from-[hsl(215,55%,6%)] to-[hsl(215,55%,10%)]"
    >
      <div className="container py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          {/* Video placeholder */}
          <div className="group relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold))]/20 ring-2 ring-[hsl(var(--gold))]/30 transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 text-[hsl(var(--gold))] ml-1" fill="hsl(var(--gold))" />
              </div>
              <span className="text-xs font-medium text-white/30">Video prezentacija</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[hsl(var(--gold))]">
              Video produkcija
            </p>
            <h2 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
              Promovišite svoj biznis kroz video
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Nudimo izradu kratkih reklamnih videa, oglasa i sadržaja za društvene mreže.
              Privucite pažnju i izdvojite se iz mase.
            </p>
            <Button
              className="mt-6 gap-2 rounded-xl border border-[hsl(var(--gold))]/30 bg-transparent font-semibold text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 transition-all"
              size="lg"
              variant="outline"
            >
              Zatraži ponudu <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ── 3. Inline Ad Banner (reusable) ── */
export function InlineAdBanner({ variant = "default" }: { variant?: "default" | "alt" }) {
  const isAlt = variant === "alt";
  return (
    <motion.div
      {...sectionAnim}
      className={`border-y ${isAlt ? "border-white/8 bg-gradient-to-r from-[hsl(215,55%,7%)] via-[hsl(215,50%,10%)] to-[hsl(215,55%,7%)]" : "border-border/30 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30"}`}
    >
      <div className="container flex flex-col items-center justify-center gap-3 py-8 text-center sm:flex-row sm:gap-6 sm:py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--gold))]/10">
            <Megaphone className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
          </div>
          <div className="text-left">
            <p className={`text-sm font-bold ${isAlt ? "text-white" : "text-foreground"}`}>
              Vaša reklama ovdje
            </p>
            <p className={`text-xs ${isAlt ? "text-white/40" : "text-muted-foreground"}`}>
              Pozicionirajte svoj biznis pred hiljadama korisnika.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="rounded-lg bg-[hsl(var(--gold))] text-xs font-semibold text-[hsl(var(--gold-foreground))] hover:bg-[hsl(var(--gold-light))] shadow-sm"
        >
          Oglašavaj se
        </Button>
      </div>
    </motion.div>
  );
}
