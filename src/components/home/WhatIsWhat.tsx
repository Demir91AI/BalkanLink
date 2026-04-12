import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cards = [
  {
    id: "smart-guide",
    emoji: "🗺️",
    name: "Smart Guide",
    tagline: "Tvoj lični vodič kroz svaki formular",
    explanation:
      "Zamisli da imaš prijatelja koji je već prošao kroz cijeli proces i tačno zna šta se radi. Smart Guide te vodi korak po korak — šta popuniti, šta priložiti, na šta paziti.",
    example:
      "Npr: Apliciraš za Kindergeld — Smart Guide ti kaže tačno koje polje kako ispuniti, koje dokumente priložiti i najčešće greške koje ljudi prave.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
  },
  {
    id: "musterformular",
    emoji: "📋",
    name: "Musterformular",
    tagline: "Primjer pravilno popunjenog formulara",
    explanation:
      "Muster na njemačkom znači 'primjer'. Musterformular je formular koji je već pravilno popunjen — ti ga koristiš kao šablon. Vidiš tačno kako treba izgledati svako polje.",
    example:
      "Npr: Imaš pred sobom KG1 formular za Kindergeld i ne znaš šta upisati u polje 'Bankverbindung'. Musterformular ti pokazuje popunjen primjer.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
  },
  {
    id: "viza-navigator",
    emoji: "✈️",
    name: "Viza Navigator",
    tagline: "Pronađi pravi put do radne dozvole",
    explanation:
      "Svako ima drugačiju situaciju — drugi pasoš, drugi zanimanje, drugi grad. Viza Navigator analizira tvoju situaciju i pokazuje tačno koji tip dozvole trebaš i gdje ih predati.",
    example:
      "Npr: Državljanin si BiH, imaš ponudu za posao u Münchenu — Navigator ti kaže da ti treba §18 AufenthG + Westbalkan Regelung.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
  },
  {
    id: "dokumenten-check",
    emoji: "🔍",
    name: "Provjera dokumenata",
    tagline: "Učitaj pismo — razumij šta piše",
    explanation:
      "Stiglo ti pismo od Finanzamta i ne razumiješ ni riječ? Fotografiraj ga ili učitaj PDF — dobiješ objašnjenje na svom jeziku: šta traže, do kada, šta se dešava ako ne reaguješ.",
    example:
      "Npr: Stigla ti Mahnung (opomena) — Provjera dokumenata ti kaže da imaš 15 dana da platiš i šta se dešava ako ignorišeš.",
    badge: "2.99€ po provjeri ili uz Premium",
    badgeStyle: "gold" as const,
  },
  {
    id: "vorlagen",
    emoji: "✉️",
    name: "Šabloni (Vorlagen)",
    tagline: "Profesionalna pisma na njemačkom — bez muke",
    explanation:
      "Trebaš napisati otkaz ili otkazati ugovor? Šabloni su gotovi tekstovi na pravnom njemačkom — samo uneseš svoje podatke i preuzimaš kao PDF spreman za slanje.",
    example:
      "Npr: Hoćeš otkazati Telekom ugovor — šablon 'Vertragskündigung' generira ti profesionalno pismo u 2 minute.",
    badge: "Kündigung besplatno, ostalo uz Premium 🔒",
    badgeStyle: "green" as const,
  },
  {
    id: "deutsch-trainer",
    emoji: "🇩🇪",
    name: "DeutschTrainer",
    tagline: "Nauči njemački koji ti stvarno treba",
    explanation:
      "DeutschTrainer te uči jezik koji koristiš svaki dan — na poslu, u Jobcenteru, kod doktora, u banci. A1 do C2, sa vježbama, izgovorom i testovima.",
    example:
      "Npr: Lekcija 'Kod doktora' — naučiš kako opisati simptome, razumjeti recept i razgovarati sa osiguranjem.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
  },
];

export default function WhatIsWhat() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-12" style={{ background: "hsl(var(--warm-cream))" }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2D2D2D]">
            Šta je šta?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B6B6B]">
            Nikad čuo za Musterformular? Nema veze — objašnjavamo sve.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-2">
          {cards.map((card) => (
            <AccordionItem
              key={card.id}
              value={card.id}
              className="rounded-xl bg-white border border-[#E8E0D0] shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-hidden data-[state=open]:border-[hsl(var(--gold))]/40 transition-colors"
              style={{ borderLeft: "3px solid hsl(var(--gold))" }}
            >
              <AccordionTrigger className="px-4 py-3.5 hover:no-underline gap-3 [&>svg]:text-[hsl(var(--gold))]">
                <span className="flex items-center gap-3 text-left">
                  <span className="text-lg shrink-0">{card.emoji}</span>
                  <span className="text-[15px] font-bold text-[#2D2D2D]">{card.name}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0">
                <p className="text-sm font-semibold text-[hsl(var(--gold))] mb-2">
                  {card.tagline}
                </p>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-2">
                  {card.explanation}
                </p>
                <p className="text-[13px] text-[#8A8A8A] italic leading-relaxed mb-3">
                  {card.example}
                </p>

                {card.bonus && (
                  <div
                    className="rounded-lg px-3 py-2 mb-3 text-[12px] leading-relaxed"
                    style={{
                      background: "hsl(var(--gold) / 0.08)",
                      border: "1px solid hsl(var(--gold) / 0.2)",
                      color: "#6B5A1E",
                    }}
                  >
                    {card.bonus}
                  </div>
                )}

                <span
                  className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={
                    card.badgeStyle === "green"
                      ? { background: "#DCFCE7", color: "#166534" }
                      : { background: "hsl(var(--gold) / 0.12)", color: "#92400E" }
                  }
                >
                  {card.badge}
                </span>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}
