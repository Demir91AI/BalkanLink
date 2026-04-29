import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";
import { ArrowRight } from "lucide-react";

export default function PitchSection() {
  const { t } = useTranslation("pages");
  const localize = useLocalizedHref();

  const bullets = t("home.pitch.bullets", { returnObjects: true }) as string[];

  return (
    <section
      className="relative py-16 px-4"
      style={{ background: "hsl(220 50% 5%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[hsl(var(--gold))]">
            {t("home.pitch.eyebrow")}
          </p>
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-4xl font-[900] text-white tracking-tight leading-tight">
            {t("home.pitch.headline")}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("home.pitch.subline")}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 grid sm:grid-cols-2 gap-2.5"
        >
          {Array.isArray(bullets) && bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm text-white/85"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span>{b}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to={localize("/formulari")}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
            }}
          >
            {t("home.pitch.ctaPrimary")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={localize("/pocni-ovdje")}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {t("home.pitch.ctaSecondary")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
