import { motion } from "framer-motion";
import { Check, Play, ArrowRight, Megaphone, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";

/* ── 1. Premium Hero Ad ── */
export function HeroAdBanner() {
  const benefits = [
    "Direktno do ciljane publike",
    "Više upita i više klijenata",
    "Brza i jednostavna promocija",
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Blurred city background */}
      <div className="absolute inset-0">
        <img
          src={heroFrankfurt}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "blur(6px) brightness(0.25)" }}
          loading="lazy"
        />
      </div>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,68%,8%/0.92)] via-[hsl(215,60%,12%/0.88)] to-[hsl(215,68%,6%/0.95)]" />

      {/* Glow accents */}
      <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.08)]" style={{ filter: "blur(80px)" }} />
      <div className="absolute right-1/4 bottom-0 h-48 w-48 rounded-full bg-[hsl(215,70%,50%/0.06)]" style={{ filter: "blur(60px)" }} />

      <div className="container relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.25)] bg-[hsl(var(--gold)/0.08)] px-4 py-1.5"
          >
            <Megaphone className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
            <span className="text-xs font-semibold tracking-wide text-[hsl(var(--gold))]">OGLAŠAVANJE</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]"
          >
            Oglasite svoj biznis tamo gdje vas{" "}
            <span className="text-gold">ljudi stvarno traže</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
          >
            BalkanLink povezuje hiljade ljudi u Njemačkoj.
            <br className="hidden sm:block" />
            Budite prvi izbor kada nekome zatreba vaša usluga.
          </motion.p>

          {/* Benefits */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-6"
          >
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-medium text-white/70">
                <Check className="h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
                {b}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="btn-gold-gradient rounded-xl px-8 text-sm font-bold shadow-xl"
            >
              <Link to="/nudim-trazim">
                Oglašavaj se <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/15 bg-white/5 px-8 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all"
            >
              <Link to="/nudim-trazim">
                Zatraži ponudu
              </Link>
            </Button>
          </motion.div>

          {/* Tertiary link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="mt-4"
          >
            <Link
              to="/nudim-trazim"
              className="text-xs font-medium text-white/30 underline-offset-4 hover:text-white/50 hover:underline transition-colors"
            >
              Saznaj više o oglašavanju →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />
    </section>
  );
}

/* ── 2. Video Production Section ── */
export function VideoAdSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(215,55%,5%)] to-[hsl(215,55%,8%)]">
      {/* Subtle glow */}
      <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.04)]" style={{ filter: "blur(100px)" }} />

      <div className="container relative z-10 py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] shadow-2xl"
          >
            <img
              src={heroFrankfurt}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              style={{ filter: "blur(3px)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,55%,5%/0.9)] to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold)/0.15)] ring-2 ring-[hsl(var(--gold)/0.25)] transition-all duration-300 group-hover:scale-110 group-hover:ring-[hsl(var(--gold)/0.4)]">
                <Play className="h-7 w-7 ml-1 text-[hsl(var(--gold))]" fill="hsl(var(--gold))" fillOpacity={0.3} />
              </div>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/25">
                Video prezentacija
              </span>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] px-3 py-1">
              <Video className="h-3 w-3 text-[hsl(var(--gold))]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">Video produkcija</span>
            </div>
            <h2 className="font-heading text-xl font-extrabold text-white sm:text-2xl">
              Želite jaču promociju?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Izrađujemo reklamne video spotove, oglase i sadržaj za društvene mreže.
              Privucite pažnju i izdvojite se iz mase.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 gap-2 rounded-xl bg-[hsl(var(--gold))] font-semibold text-[hsl(var(--gold-foreground))] shadow-lg hover:bg-[hsl(var(--gold-light))] hover:shadow-xl transition-all"
            >
              <Link to="/nudim-trazim">
                Zatraži video ponudu <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.2)] to-transparent" />
    </section>
  );
}

/* ── 3. Inline Ad Banner ── */
export function InlineAdBanner({ variant = "default" }: { variant?: "default" | "alt" }) {
  const isAlt = variant === "alt";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`border-y ${
        isAlt
          ? "border-white/6 bg-gradient-to-r from-[hsl(215,55%,6%)] via-[hsl(215,50%,9%)] to-[hsl(215,55%,6%)]"
          : "border-border/20 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20"
      }`}
    >
      <div className="container flex flex-col items-center justify-center gap-3 py-7 text-center sm:flex-row sm:gap-6 sm:py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--gold)/0.1)] ring-1 ring-[hsl(var(--gold)/0.15)]">
            <Megaphone className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
          </div>
          <div className="text-left">
            <p className={`text-sm font-bold ${isAlt ? "text-white" : "text-foreground"}`}>
              Vaša reklama ovdje
            </p>
            <p className={`text-xs ${isAlt ? "text-white/35" : "text-muted-foreground"}`}>
              Pozicionirajte svoj biznis pred hiljadama korisnika.
            </p>
          </div>
        </div>
        <Button
          asChild
          size="sm"
          className="rounded-lg bg-[hsl(var(--gold))] text-xs font-semibold text-[hsl(var(--gold-foreground))] hover:bg-[hsl(var(--gold-light))] shadow-sm"
        >
          <Link to="/nudim-trazim">Oglašavaj se</Link>
        </Button>
      </div>
    </motion.div>
  );
}
