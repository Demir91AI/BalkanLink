import { motion } from "framer-motion";
import { Check, ArrowRight, Megaphone, MapPin, Star, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const MAILTO_AD = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Oglašavanje na BalkanLink")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me oglašavanje na BalkanLink platformi.\n\nNaziv firme:\nVrsta usluge:\nGrad:\nBudžet:\n"
)}`;

const MAILTO_QUOTE = `mailto:info@balkanlink.de?subject=${encodeURIComponent("Upit za reklamu")}&body=${encodeURIComponent(
  "Pozdrav,\n\nZanima me ponuda za oglašavanje.\n\nNaziv firme:\nŠta nudite:\nGrad:\n"
)}`;

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

export function HeroAdBanner() {
  const { t } = useLanguage();

  const benefits = [t("ad.benefit1"), t("ad.benefit2"), t("ad.benefit3")];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,68%,5%)] via-[hsl(215,55%,8%)] to-[hsl(215,68%,4%)]" />
      <DotPattern className="text-white/[0.025] pointer-events-none" />
      <div className="absolute left-1/3 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.05)]" style={{ filter: "blur(80px)" }} />

      <div className="container relative z-10 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] px-3.5 py-1">
            <Megaphone className="h-3 w-3 text-[hsl(var(--gold))]" />
            <span className="text-[10px] font-semibold tracking-wide text-[hsl(var(--gold))]">{t("ad.label").toUpperCase()}</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="font-heading text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-3xl">
            {t("ad.headline")}{" "}<span className="text-gold">{t("ad.headlineHighlight")}</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }} className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/40">
            {t("ad.subtitle")}<br className="hidden sm:block" />{t("ad.subtitle2")}
          </motion.p>

          <motion.ul initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }} className="mx-auto mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs font-medium text-white/50">
                <Check className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--gold))]" />{b}
              </li>
            ))}
          </motion.ul>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.28 }} className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-3">
            <Button asChild className="btn-gold-gradient rounded-xl px-6 text-sm font-bold shadow-lg">
              <a href={MAILTO_AD}>{t("ad.cta")} <ArrowRight className="ml-1 h-3.5 w-3.5" /></a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-white/12 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all">
              <a href={MAILTO_QUOTE}>{t("ad.quote")}</a>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.4 }} className="mt-4">
            <a href={MAILTO_AD} className="text-[11px] font-medium text-white/25 underline-offset-4 hover:text-white/45 hover:underline transition-colors">
              {t("ad.learnMore")}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.25)] to-transparent" />
    </section>
  );
}

export function InlineAdBanner({ variant = "default" }: { variant?: "default" | "alt" }) {
  const { t } = useLanguage();
  const isAlt = variant === "alt";

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`relative overflow-hidden border-y ${isAlt ? "border-white/6 bg-gradient-to-r from-[hsl(215,55%,5%)] via-[hsl(215,50%,8%)] to-[hsl(215,55%,5%)]" : "border-border/20 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20"}`}>
      <DotPattern className={`pointer-events-none ${isAlt ? "text-white/[0.02]" : "text-foreground/[0.02]"}`} />
      <div className="absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.06)]" style={{ filter: "blur(50px)" }} />
      <div className="container relative z-10 flex flex-col items-center justify-center gap-4 py-8 text-center sm:flex-row sm:gap-6 sm:py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--gold)/0.1)] ring-1 ring-[hsl(var(--gold)/0.2)] shadow-lg shadow-[hsl(var(--gold)/0.05)]">
            <Megaphone className="h-4 w-4 text-[hsl(var(--gold))]" />
          </div>
          <div className="text-left">
            <p className={`text-sm font-bold ${isAlt ? "text-white" : "text-foreground"}`}>{t("ad.flowTitle")}</p>
            <p className={`text-xs ${isAlt ? "text-white/35" : "text-muted-foreground"}`}>{t("ad.flowSubtitle")}</p>
          </div>
        </div>
        <Button asChild size="sm" className="rounded-lg bg-[hsl(var(--gold))] text-xs font-semibold text-[hsl(var(--gold-foreground))] hover:bg-[hsl(var(--gold-light))] shadow-sm hover:shadow-md transition-all">
          <a href={MAILTO_AD}>{t("ad.cta")}</a>
        </Button>
      </div>
    </motion.div>
  );
}
