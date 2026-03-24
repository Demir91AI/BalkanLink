import { motion } from "framer-motion";
import { Check, Play, ArrowRight, Megaphone, Video } from "lucide-react";
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
      {/* Blurred city background with parallax-like zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroFrankfurt}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "blur(8px) brightness(0.2) saturate(0.6)" }}
          loading="lazy"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,68%,6%/0.94)] via-[hsl(215,60%,10%/0.9)] to-[hsl(215,68%,4%/0.96)]" />

      {/* Dot pattern overlay */}
      <DotPattern className="text-white/[0.03] pointer-events-none" />

      {/* Glow accents */}
      <div className="absolute left-1/4 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.07)]" style={{ filter: "blur(100px)" }} />
      <div className="absolute right-1/5 bottom-0 h-56 w-56 rounded-full bg-[hsl(215,70%,50%/0.05)]" style={{ filter: "blur(80px)" }} />
      <div className="absolute right-1/3 top-0 h-40 w-40 rounded-full bg-[hsl(var(--gold)/0.04)]" style={{ filter: "blur(60px)" }} />

      <div className="container relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.25)] bg-[hsl(var(--gold)/0.08)] px-4 py-1.5"
          >
            <Megaphone className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
            <span className="text-xs font-semibold tracking-wide text-[hsl(var(--gold))]">OGLAŠAVANJE</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
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
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/45 sm:text-lg"
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
            className="mx-auto mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-7"
          >
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm font-medium text-white/65">
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
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="btn-gold-gradient rounded-xl px-8 text-sm font-bold shadow-xl"
            >
              <a href={MAILTO_AD}>
                Oglašavaj se <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/15 bg-white/5 px-8 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all"
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
            transition={{ duration: 0.4, delay: 0.55 }}
            className="mt-5"
          >
            <a
              href={MAILTO_AD}
              className="text-xs font-medium text-white/30 underline-offset-4 hover:text-white/50 hover:underline transition-colors"
            >
              Saznaj više o oglašavanju →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom glow separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />
    </section>
  );
}

/* ══════════════════════════════════════════════════
   2. Video Production Section (real video)
   ══════════════════════════════════════════════════ */
export function VideoAdSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(215,55%,5%)] to-[hsl(215,55%,8%)]">
      {/* Dot pattern */}
      <DotPattern className="text-white/[0.02] pointer-events-none" />

      {/* Glow */}
      <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.04)]" style={{ filter: "blur(120px)" }} />

      <div className="container relative z-10 py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-2xl border border-white/8 shadow-2xl shadow-black/40"
          >
            <video
              src={VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark gradient overlay on video */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,55%,5%/0.7)] via-transparent to-[hsl(215,55%,5%/0.3)]" />
            {/* Play icon overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold)/0.15)] ring-2 ring-[hsl(var(--gold)/0.25)] transition-all duration-300 group-hover:scale-110 group-hover:ring-[hsl(var(--gold)/0.4)]">
                <Play className="h-7 w-7 ml-1 text-[hsl(var(--gold))]" fill="hsl(var(--gold))" fillOpacity={0.3} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Video prezentacija
              </span>
            </div>
            {/* Glow border effect */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] px-3 py-1">
              <Video className="h-3 w-3 text-[hsl(var(--gold))]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--gold))]">Video produkcija</span>
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Želite jaču promociju?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/40 sm:text-base">
              Izrađujemo reklamne video spotove, oglase i sadržaj za društvene mreže.
              Privucite pažnju i izdvojite se iz mase.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 gap-2 rounded-xl bg-[hsl(var(--gold))] font-semibold text-[hsl(var(--gold-foreground))] shadow-lg hover:bg-[hsl(var(--gold-light))] hover:shadow-xl transition-all"
            >
              <a href={MAILTO_VIDEO}>
                Zatraži video ponudu <ArrowRight className="h-4 w-4" />
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
