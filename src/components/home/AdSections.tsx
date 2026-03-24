import { motion } from "framer-motion";
import { Check, ArrowRight, Megaphone, MapPin, Star, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";

/* ── Mailto helpers ── */
const MAILTO_AD = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

const MAILTO_QUOTE = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Upit za reklamu")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me ponuda za oglašavanje.\n\nNaziv firme:\nŠta nudite:\nGrad:\n"
)}`;

const MAILTO_VIDEO = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Video reklama – ponuda")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me izrada video reklame.\n\nVrsta biznisa:\nGrad:\nBudžet:\n"
)}`;

/* Free stock video — German city timelapse (Pexels license, free for commercial use) */
const VIDEO_URL = "https://videos.pexels.com/video-files/2795382/2795382-uhd_2560_1440_25fps.mp4";

/* ── Dot pattern SVG (inline) ── */
const DotPattern = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute inset-0 h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.8" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

/* ══════════════════════════════════════════════════
   1. Premium Hero Ad
   ══════════════════════════════════════════════════ */
export function HeroAdBanner() {
  const benefits = [
    "Direktno do ciljane publike",
    "Više upita i više klijenata",
    "Brza i jednostavna promocija",
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Subtle dark background — no blurred image, just structured gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,68%,5%)] via-[hsl(215,55%,8%)] to-[hsl(215,68%,4%)]" />

      {/* Dot pattern overlay */}
      <DotPattern className="text-white/[0.025] pointer-events-none" />

      {/* Single subtle glow */}
      <div className="absolute left-1/3 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.05)]" style={{ filter: "blur(80px)" }} />

      <div className="container relative z-10 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] px-3.5 py-1"
          >
            <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
            <span className="text-[10px] font-semibold tracking-wide text-[hsl(var(--gold))]">OGLAŠAVANJE</span>
          </motion.div>

          {/* Headline — smaller than main hero */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-3xl"
          >
            Oglasite svoj biznis tamo gdje vas{" "}
            <span className="text-gold">ljudi stvarno traže</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/40"
          >
            BalkanLink povezuje hiljade ljudi u Njemačkoj.
            <br className="hidden sm:block" />
            Budite prvi izbor kada nekome zatreba vaša usluga.
          </motion.p>

          {/* Benefits — compact */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6"
          >
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs font-medium text-white/50">
                <Check className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--gold))]" />
                {b}
              </li>
            ))}
          </motion.ul>

          {/* CTAs — compact row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-3"
          >
            <Button
              asChild
              className="btn-gold-gradient rounded-xl px-6 text-sm font-bold shadow-lg"
            >
              <a href={MAILTO_AD}>
                Oglašavaj se <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/12 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <a href={MAILTO_QUOTE}>
                Zatraži ponudu
              </a>
            </Button>
          </motion.div>

          {/* Tertiary link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-4"
          >
            <a
              href={MAILTO_AD}
              className="text-[11px] font-medium text-white/25 underline-offset-4 hover:text-white/45 hover:underline transition-colors"
            >
              Saznaj više o oglašavanju →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.25)] to-transparent" />
    </section>
  );
}

/* ══════════════════════════════════════════════════
   2. Realistic Ad Preview Section
   ══════════════════════════════════════════════════ */
const SAMPLE_AD = {
  title: "Keramičarske usluge – kvalitet i pouzdanost",
  category: "Usluge",
  city: "München",
  date: "21.03.2026",
  description: "Profesionalne keramičarske usluge – kupatila, kuhinje, balkoni. 15 godina iskustva. Fer cijene i kvalitetan rad.",
  contact: "+49 170 555 1234",
};

export function VideoAdSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(215,55%,5%)] to-[hsl(215,55%,8%)]">
      {/* Dot pattern */}
      <DotPattern className="text-white/[0.02] pointer-events-none" />

      {/* Glow */}
      <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.04)]" style={{ filter: "blur(120px)" }} />

      <div className="container relative z-10 py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          {/* Realistic Ad Card Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-sm"
          >
            <div className="group relative rounded-2xl border border-white/10 bg-[hsl(215,50%,10%)] p-5 shadow-2xl shadow-black/40 transition-all duration-300 hover:border-[hsl(var(--gold)/0.25)] hover:shadow-[0_0_40px_hsl(var(--gold)/0.06)]">
              {/* PRO Badge */}
              <div className="absolute -top-3 right-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--gold))] px-3 py-1 text-[11px] font-bold text-[hsl(var(--gold-foreground))] shadow-lg shadow-[hsl(var(--gold)/0.3)]">
                  <Star className="h-3 w-3" /> PRO
                </span>
              </div>

              {/* Type + Category */}
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                  Nudim
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/50">
                  {SAMPLE_AD.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-base font-bold text-white group-hover:text-[hsl(var(--gold))] transition-colors">
                {SAMPLE_AD.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-white/40 line-clamp-2">
                {SAMPLE_AD.description}
              </p>

              {/* Meta + Contact */}
              <div className="flex items-center justify-between text-[11px] text-white/30">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {SAMPLE_AD.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {SAMPLE_AD.date}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/50">
                  <Eye className="h-3 w-3" /> Prikaži kontakt
                </span>
              </div>
            </div>

            {/* "On platform" label below card */}
            <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-widest text-white/20">
              Primjer prikaza na platformi
            </p>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] px-3 py-1">
              <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">Vaš oglas</span>
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Kako izgleda vaša reklama na BalkanLink?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/40 sm:text-base">
              Vaš oglas se prikazuje direktno ljudima koji traže vaše usluge u Njemačkoj.
              Jednostavno, brzo i bez komplikacija.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 gap-2 rounded-xl bg-[hsl(var(--gold))] font-semibold text-[hsl(var(--gold-foreground))] shadow-lg hover:bg-[hsl(var(--gold-light))] hover:shadow-xl transition-all"
            >
              <a href={MAILTO_AD}>
                Oglašavaj se <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.2)] to-transparent" />
    </section>
  );
}

/* ══════════════════════════════════════════════════
   3. Inline Ad Banner (premium version)
   ══════════════════════════════════════════════════ */
export function InlineAdBanner({ variant = "default" }: { variant?: "default" | "alt" }) {
  const isAlt = variant === "alt";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden border-y ${
        isAlt
          ? "border-white/6 bg-gradient-to-r from-[hsl(215,55%,5%)] via-[hsl(215,50%,8%)] to-[hsl(215,55%,5%)]"
          : "border-border/20 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20"
      }`}
    >
      {/* Dot pattern */}
      <DotPattern className={`pointer-events-none ${isAlt ? "text-white/[0.02]" : "text-foreground/[0.02]"}`} />

      {/* Glow behind the icon */}
      <div className="absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.06)]" style={{ filter: "blur(50px)" }} />

      <div className="container relative z-10 flex flex-col items-center justify-center gap-4 py-8 text-center sm:flex-row sm:gap-6 sm:py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--gold)/0.1)] ring-1 ring-[hsl(var(--gold)/0.2)] shadow-lg shadow-[hsl(var(--gold)/0.05)]">
            <Megaphone className="h-4 w-4 text-[hsl(var(--gold))]" />
          </div>
          <div className="text-left">
            <p className={`text-sm font-bold ${isAlt ? "text-white" : "text-foreground"}`}>
              Vaša reklama ovdje
            </p>
            <p className={`text-xs ${isAlt ? "text-white/35" : "text-muted-foreground"}`}>
              Pozicionirajte svoj biznis pred hiljadama ljudi u Njemačkoj.
            </p>
          </div>
        </div>
        <Button
          asChild
          size="sm"
          className="rounded-lg bg-[hsl(var(--gold))] text-xs font-semibold text-[hsl(var(--gold-foreground))] hover:bg-[hsl(var(--gold-light))] shadow-sm hover:shadow-md transition-all"
        >
          <a href={MAILTO_AD}>Oglašavaj se</a>
        </Button>
      </div>
    </motion.div>
  );
}
