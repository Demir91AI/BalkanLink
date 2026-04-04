import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Shield, GraduationCap, Search, Home, Megaphone, Wrench, Star, Calculator, Map } from "lucide-react";
import { PRICING } from "@/lib/config";
import { useLanguage } from "@/contexts/LanguageContext";

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
  { icon: FileText, title: "Dokumenten-Check", desc: "2.99€ po dokumentu · Premium: 1/dan", to: "/dokumenten-check" },
  { icon: Megaphone, title: "Nudim / Tražim", desc: "Objavi besplatno ili se istakni uz Pro oglas", to: "/nudim-trazim", badge: "Free + Pro" },
  { icon: Map, title: "Balkanci u DE", desc: "Vidi gdje smo svi — pinuj se na mapu", to: "/mapa", badge: "Free" },
  { icon: Search, title: "Pretraga poslova", desc: "Besplatno — korisni linkovi", to: "/stellenangebote" },
  { icon: Home, title: "Pretraga stanova", desc: "Besplatno — korisni linkovi", to: "/wohnungen" },
  { icon: Calculator, title: "Kalkulatori", desc: "Brutto-netto i drugi korisni alati", to: "/kalkulatori" },
];

export default function HomePremiumCards() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-14"
        >
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Premium alati za{" "}
            <span className="text-gold">tvoj uspjeh</span>
          </h2>
          <p className="text-sm sm:text-base text-white/50 mt-3 max-w-lg mx-auto leading-relaxed">
            Profesionalni vodiči, AI asistent i provjera dokumenata — sve što ti treba za život u Njemačkoj.
          </p>
          <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold))]" />
        </motion.div>

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
                className="group relative flex flex-col h-full rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1"
                style={{
                  background: "linear-gradient(160deg, hsl(220,50%,8%), hsl(225,45%,6%))",
                  border: "2px solid hsl(43,70%,53%)",
                  boxShadow: "0 0 24px 0 hsla(43,70%,53%,0.10), 0 4px 16px 0 rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(43,80%,62%)";
                  e.currentTarget.style.boxShadow = "0 0 36px 6px hsla(43,70%,53%,0.20), 0 12px 32px 0 rgba(0,0,0,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "hsl(43,70%,53%)";
                  e.currentTarget.style.boxShadow = "0 0 24px 0 hsla(43,70%,53%,0.10), 0 4px 16px 0 rgba(0,0,0,0.4)";
                }}
              >
                <span className="text-4xl mb-3">{card.emoji}</span>
                <span
                  className="inline-flex items-center gap-1 self-start rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider mb-2"
                  style={{
                    background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,60%,42%))",
                    color: "hsl(225,45%,6%)",
                    boxShadow: "0 0 10px 0 hsla(43,70%,53%,0.25)",
                  }}
                >
                  <Star className="h-2.5 w-2.5 fill-current" /> Premium
                </span>
                <h3 className="text-base font-bold text-white mb-1">{card.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4 flex-1">{card.desc}</p>
                <span
                  className="block w-full rounded-full py-2.5 text-center text-sm font-bold transition-all duration-300 group-hover:brightness-110 group-hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
                    color: "hsl(225,45%,6%)",
                    boxShadow: "0 2px 12px 0 hsla(43,70%,53%,0.25)",
                  }}
                >
                  {card.cta}
                </span>
                <p className="mt-2 text-[10px] text-white/35 text-center">{card.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto max-w-5xl border-t border-white/[0.06] mb-10" />

        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-6 gap-3">
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
                  className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all hover:border-white/20 hover:bg-white/[0.06] h-full relative"
                >
                  {"badge" in card && card.badge && (
                    <span className="absolute -top-2 right-2 rounded-full border border-white/12 bg-white/[0.12] px-2 py-0.5 text-[9px] font-bold text-white/80">
                      {card.badge}
                    </span>
                  )}
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
