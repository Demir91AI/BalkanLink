import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cards = [
  { id: "smart-guide", emoji: "🗺️", key: "smartGuide", badgeStyle: "gold" as const },
  { id: "musterformular", emoji: "📋", key: "muster", badgeStyle: "gold" as const },
  { id: "viza-navigator", emoji: "✈️", key: "visaNav", badgeStyle: "gold" as const },
  { id: "dokumenten-check", emoji: "🔍", key: "docCheck", badgeStyle: "gold" as const },
  { id: "vorlagen", emoji: "✉️", key: "vorlagen", badgeStyle: "green" as const },
  { id: "deutsch-trainer", emoji: "🇩🇪", key: "trainer", badgeStyle: "gold" as const },
];

export default function WhatIsWhat() {
  const { t } = useTranslation("pages");

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          {t("home.whatIsWhat.heading")}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/50">
          {t("home.whatIsWhat.subline")}
        </p>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-2">
        {cards.map((card) => (
          <AccordionItem
            key={card.id}
            value={card.id}
            className="rounded-xl overflow-hidden transition-colors"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "3px solid hsl(var(--gold))",
            }}
          >
            <AccordionTrigger className="px-4 py-3.5 hover:no-underline gap-3 [&>svg]:text-[hsl(var(--gold))]">
              <span className="flex items-center gap-3 text-left">
                <span className="text-lg shrink-0">{card.emoji}</span>
                <span className="text-[15px] font-bold text-white">{t(`home.whatIsWhat.${card.key}.name`)}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-0">
              <p className="text-sm font-semibold text-[hsl(var(--gold))] mb-2">
                {t(`home.whatIsWhat.${card.key}.tagline`)}
              </p>
              <p className="text-sm text-white/60 leading-relaxed mb-2">
                {t(`home.whatIsWhat.${card.key}.explanation`)}
              </p>
              <p className="text-[13px] text-white/35 italic leading-relaxed mb-3">
                {t(`home.whatIsWhat.${card.key}.example`)}
              </p>

              <span
                className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
                style={
                  card.badgeStyle === "green"
                    ? { background: "rgba(34,197,94,0.15)", color: "#4ade80" }
                    : { background: "hsla(43,52%,54%,0.12)", color: "hsl(var(--gold))" }
                }
              >
                {t(`home.whatIsWhat.${card.key}.badge`)}
              </span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
