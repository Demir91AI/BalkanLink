import { motion } from "framer-motion";
import { FileText, Briefcase, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FileText,
    title: "Formulari",
    desc: "Korak po korak objašnjenja bez grešaka",
    to: "/formulari",
  },
  {
    icon: Briefcase,
    title: "Posao i stan",
    desc: "Brže do prilika koje tražiš",
    to: "/stellenangebote",
  },
  {
    icon: Megaphone,
    title: "Nudim / Tražim",
    desc: "Poveži se direktno sa ljudima",
    to: "/nudim-trazim",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.25 + i * 0.12, ease: "easeOut" as const },
  }),
};

export function WowSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 50%, #FFF7ED 100%)",
      }}
    >
      {/* Subtle warm glow blob */}
      <div
        className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(245,166,35,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 py-20 sm:py-24 lg:py-28">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className="font-heading text-3xl font-extrabold leading-snug tracking-tight sm:text-4xl lg:text-[2.75rem]"
            style={{ color: "#0F172A" }}
          >
            Sve što ti treba za život u Njemačkoj –
            <br />
            <span style={{ color: "hsl(45, 80%, 42%)" }}>na jednom mjestu.</span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-md text-base font-medium sm:text-lg"
            style={{ color: "#475569" }}
          >
            Jasno, brzo i bez komplikacija – od formulara do posla i stana.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6" style={{ alignItems: "stretch" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="flex"
            >
              <Link
                to={f.to}
                className="group flex w-full flex-col items-center justify-center rounded-2xl border border-black/[0.04] bg-white px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)]"
                style={{
                  minHeight: "190px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF7ED] transition-colors duration-300 group-hover:bg-[#FEF3C7]">
                  <f.icon className="h-6 w-6 text-[hsl(var(--gold-dark))] transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3
                  className="text-base font-bold transition-colors duration-300 group-hover:text-[hsl(var(--gold-dark))]"
                  style={{ color: "#0F172A" }}
                >
                  {f.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm" style={{ color: "#64748B" }}>
                  {f.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <Button
            asChild
            size="lg"
            className="group gap-2.5 rounded-2xl bg-[hsl(var(--gold))] px-10 py-4 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_16px_hsl(var(--gold)/0.25)] transition-all duration-300 hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.35)] hover:scale-[1.03]"
          >
            <Link to="/dolazak/prvi-koraci">
              Započni odmah
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
