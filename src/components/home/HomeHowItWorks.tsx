import { motion } from "framer-motion";

const steps = [
  { num: "01", emoji: "🎯", title: "Izaberi šta trebaš" },
  { num: "02", emoji: "📋", title: "Prati upute korak po korak" },
  { num: "03", emoji: "✅", title: "Riješi bez greške" },
];

export default function HomeHowItWorks() {
  return (
    <section className="py-16 sm:py-20 border-t border-white/[0.05]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
            Kako funkcioniše?
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="relative flex flex-col items-center rounded-2xl bg-[#0f1f3d] border border-white/8 px-5 py-8 text-center"
            >
              <span className="mb-2 text-3xl">{s.emoji}</span>
              <span className="mb-2 text-2xl font-black text-gold/30">{s.num}</span>
              <h3 className="text-base font-bold text-white">{s.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Connecting line for desktop */}
        <div className="hidden sm:block mx-auto max-w-3xl mt-[-100px] mb-[60px]">
          <div className="h-[2px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 mx-16" />
        </div>
      </div>
    </section>
  );
}
