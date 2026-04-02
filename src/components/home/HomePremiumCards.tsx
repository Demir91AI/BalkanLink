import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Shield, GraduationCap, Search, Home, Megaphone, Wrench, Star, Calculator } from "lucide-react";
import { PRICING } from "@/lib/config";

const premiumCards = [
  {
    emoji: "📋",
    title: "Smart Guide — Formulari",
    desc: "Popuni svaki njemački formular korak po korak.",
    cta: "Otvori Smart Guide →",
    to: "/formulari",
    price: `Od ${PRICING.singleForm} / formular ili ${PRICING.premiumMonthly} Premium`,
  },
  {
    emoji: "🛂",
    title: "Viza Navigator",
    desc: "Pronađi pravu vizu ili boravišnu dozvolu za svoju situaciju.",
    cta: "Otvori Navigator →",
    to: "/dolazak/boravisna-dozvola",
    price: `Uključeno u Premium — ${PRICING.premiumMonthly}`,
  },
  {
    emoji: "🎓",
    title: "BalkanLink Deutsch",
    desc: "Nauči njemački za stvarni život — biroktatija, posao, svakodnevica.",
    cta: "Počni učiti →",
    to: "/deutsch-trainer",
    price: `Uključeno u Premium — ${PRICING.premiumMonthly}`,
  },
];

const secondaryCards = [
  { icon: FileText, title: "Dokumenten-Check", desc: "✓ Besplatno — 2 provjere dnevno", to: "/dokumenten-check" },
  { icon: Megaphone, title: "Nudim / Tražim", desc: `Objava besplatna • PRO od ${PRICING.proAd7Days}`, to: "/nudim-trazim" },
  { icon: Search, title: "Pretraga poslova", desc: "Besplatno — korisni linkovi", to: "/stellenangebote" },
  { icon: Home, title: "Pretraga stanova", desc: "Besplatno — korisni linkovi", to: "/wohnungen" },
  { icon: Wrench, title: "Šabloni / Vorlagen", desc: "Besplatno", to: "/vorlagen" },
];

export default function HomePremiumCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-10"
        >
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Premium alati za{" "}
            <span className="text-gold">tvoj uspjeh</span>
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-gold" />
        </motion.div>

        {/* Premium cards */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {premiumCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Link
                to={card.to}
                className="group flex flex-col h-full rounded-2xl border border-gold/20 bg-[#0f1f3d] p-6 transition-all duration-200 hover:shadow-xl hover:border-gold/60 hover:scale-[1.02]"
              >
                <span className="text-4xl mb-3">{card.emoji}</span>
                <span className="inline-flex items-center gap-1 self-start rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold uppercase tracking-wider mb-2">
                  <Star className="h-2.5 w-2.5 fill-current" /> Premium
                </span>
                <h3 className="text-base font-bold text-white mb-1">{card.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">{card.desc}</p>
                <span className="block w-full rounded-full bg-gold py-2.5 text-center text-sm font-bold text-[#0f1f3d] transition-opacity group-hover:opacity-90">
                  {card.cta}
                </span>
                <p className="mt-2 text-[10px] text-white/30 text-center">{card.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="mx-auto max-w-5xl border-t border-white/[0.06] mb-10" />

        {/* Secondary free tools */}
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-5 gap-3">
          {secondaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
              >
                <Link
                  to={card.to}
                  className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all hover:border-white/20 hover:bg-white/[0.06] h-full"
                >
                  <Icon className="h-5 w-5 text-white/40 mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">{card.title}</h4>
                  <p className="text-[10px] text-white/30 leading-relaxed">{card.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
