import { ExternalLink, Bus, Plane, Package } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "🚌 Autobuski prijevoz",
    description: "Redovne linije između Njemačke i Balkana.",
    links: [
      { name: "Flixbus", url: "https://www.flixbus.de" },
      { name: "Eurolines", url: "https://www.eurolines.de" },
      { name: "Centrotrans", url: "https://www.centrotrans.com" },
      { name: "Autoprevoz Čazmatrans", url: "https://www.cazmatrans.hr" },
      { name: "Globtour", url: "https://www.globtour.com" },
      { name: "Lasta", url: "https://www.lasta.rs" },
    ],
  },
  {
    title: "✈️ Avio karte",
    description: "Letovi prema balkanskim destinacijama.",
    links: [
      { name: "Eurowings", url: "https://www.eurowings.com" },
      { name: "Wizz Air", url: "https://wizzair.com" },
      { name: "Ryanair", url: "https://www.ryanair.com" },
      { name: "Lufthansa", url: "https://www.lufthansa.com" },
      { name: "FlyBosnia", url: "https://www.flybosnia.ba" },
      { name: "Air Serbia", url: "https://www.airserbia.com" },
      { name: "Croatia Airlines", url: "https://www.croatiaairlines.com" },
    ],
  },
  {
    title: "📦 Paketne službe",
    description: "Slanje paketa na Balkan iz Njemačke.",
    links: [
      { name: "DHL", url: "https://www.dhl.de" },
      { name: "Hermes", url: "https://www.hermesworld.com" },
      { name: "DPD", url: "https://www.dpd.com/de/" },
      { name: "GLS", url: "https://gls-group.eu/DE/de/" },
    ],
  },
  {
    title: "🚐 Airport Transfer & Privatni prijevoz",
    description: "Transfer od vrata do vrata.",
    links: [
      { name: "BlaBlaCar", url: "https://www.blablacar.de" },
      { name: "FlixBus (grupni)", url: "https://www.flixbus.de/busmieten" },
    ],
  },
];

export default function Putovanja() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "#0F1B2D" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E3B341]/5 via-transparent to-[#E3B341]/3" />
        <div className="container relative max-w-5xl py-14 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white md:text-4xl">
            ✈️ Putovanja & Prevoz
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base">
            Bus, avion, paketi i transfer između Njemačke i Balkana.
          </motion.p>
        </div>
      </section>

      <section className="py-12" style={{ background: "#0F1B2D" }}>
        <div className="container max-w-4xl space-y-8">
          {sections.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.1 }}
              className="rounded-xl p-6"
              style={{ background: "linear-gradient(135deg, rgba(22,38,63,0.95), rgba(22,38,63,0.75))", border: "1px solid rgba(227,179,65,0.15)" }}
            >
              <h2 className="text-lg font-bold text-white">{section.title}</h2>
              <p className="mt-1 text-sm text-white/40">{section.description}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {section.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-all hover:text-[#E3B341]"
                    style={{ background: "rgba(15,27,45,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {link.name}
                    <ExternalLink className="h-3.5 w-3.5 text-white/30" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
