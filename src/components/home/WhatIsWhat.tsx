import { motion } from "framer-motion";

const cards = [
  {
    emoji: "🗺️",
    name: "Smart Guide",
    tagline: "Tvoj lični vodič kroz svaki formular",
    explanation:
      "Zamisli da imaš prijatelja koji je već prošao kroz cijeli proces i tačno zna šta se radi. Smart Guide te vodi korak po korak — šta popuniti, šta priložiti, na šta paziti. Nema nagađanja.",
    example:
      "Npr: Apliciraš za Kindergeld — Smart Guide ti kaže tačno koje polje kako ispuniti, koje dokumente priložiti i najčešće greške koje ljudi prave.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
  },
  {
    emoji: "📋",
    name: "Musterformular",
    tagline: "Primjer pravilno popunjenog formulara",
    explanation:
      "Muster na njemačkom znači 'primjer' ili 'uzorak'. Musterformular je formular koji je već pravilno popunjen — ti ga koristiš kao šablon. Vidiš tačno kako treba izgledati svako polje, pa ne možeš pogriješiti.",
    example:
      "Npr: Imaš pred sobom KG1 formular za Kindergeld i ne znaš šta upisati u polje 'Bankverbindung'. Musterformular ti pokazuje popunjen primjer.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
  },
  {
    emoji: "✈️",
    name: "Viza Navigator",
    tagline: "Pronađi pravi put do radne dozvole",
    explanation:
      "Svako ima drugačiju situaciju — drugi pasoš, drugi zanimanje, drugi grad. Viza Navigator analizira tvoju situaciju i pokazuje tačno koji tip dozvole trebaš, koje dokumente skupiti i gdje ih predati.",
    example:
      "Npr: Državljanin si BiH, imaš ponudu za posao u Münchenu — Navigator ti kaže da ti treba §18 AufenthG + Westbalkan Regelung i vodi te kroz cijeli proces.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
  },
  {
    emoji: "🔍",
    name: "Provjera dokumenata",
    tagline: "Učitaj pismo — razumij šta piše",
    explanation:
      "Stiglo ti pismo od Finanzamta ili Jobcentera i ne razumiješ ni riječ? Fotografiraj ga ili učitaj PDF — dobiješ objašnjenje na svom jeziku: šta traže, do kada, šta se dešava ako ne reaguješ.",
    example:
      "Npr: Stigla ti Mahnung (opomena) — Provjera dokumenata ti kaže da imaš 15 dana da platiš, koliki je iznos i šta se dešava ako ignorišeš.",
    badge: "2.99€ po provjeri ili uz Premium",
    badgeStyle: "gold" as const,
  },
  {
    emoji: "✉️",
    name: "Šabloni (Vorlagen)",
    tagline: "Profesionalna pisma na njemačkom — bez muke",
    explanation:
      "Trebaš napisati otkaz poslodavcu, otkazati ugovor za internet ili napisati reklamaciju? Šabloni su gotovi tekstovi na pravnom njemačkom — samo uneseš svoje podatke i preuzimaš kao PDF spreman za slanje.",
    example:
      "Npr: Hoćeš otkazati Telekom ugovor — šablon 'Vertragskündigung' generira ti profesionalno pismo u 2 minute.",
    badge: "Kündigung besplatno, ostalo uz Premium 🔒",
    badgeStyle: "green" as const,
  },
  {
    emoji: "🇩🇪",
    name: "DeutschTrainer",
    tagline: "Nauči njemački koji ti stvarno treba",
    explanation:
      "Nije ovo obični kurs. DeutschTrainer te uči jezik koji koristiš svaki dan — na poslu, u Jobcenteru, kod doktora, u banci. A1 do C2, sa vježbama, izgovorom i testovima.",
    example:
      "Npr: Lekcija 'Kod doktora' — naučiš kako opisati simptome, razumjeti recept i razgovarati sa osiguranjem.",
    badge: "Dostupno uz Premium 🔒",
    badgeStyle: "gold" as const,
    bonus:
      "🎁 Wertgutschein program: Završi A1+A2 → dobiješ 1 mjesec Premium gratis. Završi sve nivoe → Amazon vaučer 30€.",
  },
];

export default function WhatIsWhat() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-12" style={{ background: "hsl(var(--warm-cream))" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2D2D2D]">
            Šta je šta?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B6B6B]">
            Nikad čuo za Musterformular? Nema veze — objašnjavamo sve.
          </p>
        </motion.div>

        <div className="space-y-5">
          {cards.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden"
              style={{ borderLeft: "4px solid hsl(var(--gold))" }}
            >
              <div className="p-5 sm:p-6">
                {/* Header row */}
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ background: "hsl(var(--gold) / 0.12)" }}
                  >
                    {card.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#2D2D2D] leading-tight">
                      {card.name}
                    </h3>
                    <p className="text-sm font-semibold text-[hsl(var(--gold))] mt-0.5">
                      {card.tagline}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">
                  {card.explanation}
                </p>

                {/* Example */}
                <p className="text-[13px] text-[#8A8A8A] italic leading-relaxed mb-4">
                  {card.example}
                </p>

                {/* Bonus box (DeutschTrainer) */}
                {card.bonus && (
                  <div
                    className="rounded-xl px-4 py-3 mb-4 text-[13px] leading-relaxed"
                    style={{
                      background: "hsl(var(--gold) / 0.08)",
                      border: "1px solid hsl(var(--gold) / 0.2)",
                      color: "#6B5A1E",
                    }}
                  >
                    {card.bonus}
                  </div>
                )}

                {/* Badge */}
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
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#9CA3AF]">
          Sve funkcije su dostupne na bosanskom, hrvatskom i srpskom jeziku.
        </p>
      </div>
    </section>
  );
}
