import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, Briefcase, Building2, FileText, UtensilsCrossed, Users,
  Bus, HelpCircle, ArrowRight, Check, Shield, Sparkles, Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

import heroBerlin from "@/assets/hero-berlin.jpg";
import heroMuenchen from "@/assets/hero-muenchen.jpg";
import heroFrankfurt from "@/assets/hero-frankfurt.jpg";
import heroHamburg from "@/assets/hero-hamburg.jpg";
import heroKoeln from "@/assets/hero-koeln.jpg";
import heroStuttgart from "@/assets/hero-stuttgart.jpg";
import heroDuesseldorf from "@/assets/hero-duesseldorf.jpg";
import heroNuernberg from "@/assets/hero-nuernberg.jpg";

/* ── Feature cards data ── */
const featureCards = [
  { title: "Trebam majstora", icon: Wrench, to: "/community", color: "from-amber-500/15 to-amber-600/5" },
  { title: "Tražim posao", icon: Briefcase, to: "/stellenangebote", color: "from-blue-500/15 to-blue-600/5" },
  { title: "Tražim stan", icon: Building2, to: "/wohnungen", color: "from-emerald-500/15 to-emerald-600/5" },
  { title: "Trebam pomoć s papirima", icon: FileText, to: "/formulare", color: "from-violet-500/15 to-violet-600/5" },
  { title: "Naši restorani", icon: UtensilsCrossed, to: "/community", color: "from-rose-500/15 to-rose-600/5" },
  { title: "Džemati i zajednice", icon: Users, to: "/dzamije", color: "from-cyan-500/15 to-cyan-600/5" },
  { title: "Putovanja & prevoz", icon: Bus, to: "/community", color: "from-orange-500/15 to-orange-600/5" },
  { title: "Imam pitanje", icon: HelpCircle, to: "/qa", color: "from-indigo-500/15 to-indigo-600/5" },
];

const communityExamples = [
  "Prijava djeteta u školu",
  "Selidba u novi grad",
  "Inkasso pismo",
  "Promjena posla",
  "Kupovina auta",
];

const premiumBenefits = [
  "Svi formulari",
  "Provjereni kontakti",
  "Pravni šabloni",
  "Prioritet odgovora",
  "Partner popusti",
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeUsers] = useState(() => 1240 + Math.floor(Math.random() * 300));
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  const slides = [
    { image: heroFrankfurt, city: "FRANKFURT" },
    { image: heroBerlin, city: "BERLIN" },
    { image: heroMuenchen, city: "MÜNCHEN" },
    { image: heroHamburg, city: "HAMBURG" },
    { image: heroKoeln, city: "KÖLN" },
    { image: heroStuttgart, city: "STUTTGART" },
    { image: heroDuesseldorf, city: "DÜSSELDORF" },
    { image: heroNuernberg, city: "NÜRNBERG" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[88vh] min-h-[520px] max-h-[860px] overflow-hidden bg-[#0B1F3A]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].city}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/70 via-[#0B1F3A]/50 to-[#0B1F3A]/85" />

        {/* Content */}
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >

            <h1 className="font-heading text-3xl font-black leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              Tvoj vodič za život
              <br />
              <span className="text-gold">u Njemačkoj.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50 sm:text-base md:text-lg">
              Sve što ti treba — na jednom mjestu.
            </p>

            {!loading && !user && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
              >
                <Link
                  to="/register"
                  className="btn-gold-gradient group inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold tracking-wide sm:px-10 sm:py-4 sm:text-base"
                >
                  Registruj se besplatno
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/dolazak"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors hover:text-gold"
                >
                  Pogledaj kako radi
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* City label */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] font-semibold uppercase tracking-[0.5em] text-white/20"
              >
                {slides[currentSlide].city}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "h-2 w-8 bg-gold"
                    : "h-2 w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE CARDS ─── */}
      <section className="relative py-14 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {featureCards.map((card) => (
              <motion.div
                key={card.to + card.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
              >
                <Link
                  to={card.to}
                  className={`group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${card.color} bg-card p-5 sm:p-6 text-center shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--gold)/0.08),transparent_70%)]" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-gold/15 group-hover:text-gold group-hover:scale-110">
                    <card.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold leading-snug">{card.title}</h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />

      {/* ─── COMMUNITY SECTION ─── */}
      <section className="py-14 sm:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
              Snađi se brže <span className="text-gold">u Njemačkoj</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Hiljade korisnika već koriste BalkanLink za svakodnevne situacije.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {communityExamples.map((example, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-sm"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm font-medium">{example}</span>
              </motion.div>
            ))}

            {/* Active users counter */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="flex items-center gap-3 rounded-xl border border-gold/20 bg-gold/5 p-4"
            >
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-gold" />
              </div>
              <span className="text-sm font-semibold text-gold">
                {activeUsers.toLocaleString("de-DE")}+ aktivnih korisnika
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />

      {/* ─── PREMIUM BLOCK ─── */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="container relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/20">
              <Shield className="h-6 w-6 text-gold" />
            </div>

            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Sigurnost u <span className="text-gold">Njemačkoj</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
              BalkanLink Plus ti daje potpuni pristup svemu što ti treba.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {premiumBenefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/70">
                  <Check className="h-3.5 w-3.5 text-gold" />
                  {b}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/premium"
                className="btn-gold-gradient group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold"
              >
                Aktiviraj BalkanLink Plus
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-4 text-xs text-white/30">
                Možeš otkazati u bilo kojem trenutku.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-14 sm:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
              Ljudi koji već koriste <span className="text-gold">BalkanLink</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-10 grid gap-5 sm:grid-cols-3"
          >
            {[
              { name: "Amina H.", city: "München", text: "Bez BalkanLinka bih izgubila dane na traženje informacija. Sad sve imam na jednom mjestu." },
              { name: "Emir K.", city: "Frankfurt", text: "Kindergeld zahtjev sam riješio za 15 minuta uz korak-po-korak vodič. Preporuka!" },
              { name: "Lejla M.", city: "Berlin", text: "Konačno platforma koja razumije nas. Profesionalno, brzo i na našem jeziku." },
            ].map((review, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.city}</p>
                  </div>
                </div>
                <p className="flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  "{review.text}"
                </p>
                <div className="mt-4 flex gap-0.5 text-gold">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-separator" />
    </>
  );
}
