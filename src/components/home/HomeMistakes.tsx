import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const mistakes = [
  {
    emoji: "🏠",
    title: "Anmeldung",
    desc: "Pogrešno popunjavanje prijave adrese — najčešći razlog odbijenice",
  },
  {
    emoji: "👶",
    title: "Kindergeld",
    desc: "Odbijenice zbog grešaka u dokumentaciji ili IBAN-u",
  },
  {
    emoji: "💼",
    title: "Job prijave",
    desc: "Loš CV format koji poslodavci u Njemačkoj automatski odbacuju",
  },
];

export default function HomeMistakes() {
  return (
    <section className="py-16 sm:py-20 bg-[#0f1f3d]">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white text-center mb-8"
        >
          Najčešće greške u Njemačkoj
        </motion.h2>

        <div className="mx-auto max-w-3xl grid grid-cols-1 gap-4 sm:grid-cols-3">
          {mistakes.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="rounded-xl bg-white/10 border border-white/10 p-5"
            >
              <span className="text-3xl mb-3 block">{m.emoji}</span>
              <h3 className="text-white font-semibold mb-1">{m.title}</h3>
              <p className="text-white/60 text-sm">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/formulari"
            className="inline-block rounded-full bg-[#F59E0B] px-8 py-3 text-[#0f1f3d] font-bold transition-all hover:opacity-90"
          >
            Izbjegni greške — koristi Smart Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
