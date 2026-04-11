import { motion } from "framer-motion";
import { FileCheck, Landmark, RefreshCcw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.25 + i * 0.12, ease: "easeOut" as const },
  }),
};

export function WowSection() {
  const features = [
    { icon: FileCheck, title: "Formulare", desc: "Schritt-für-Schritt-Erklärungen ohne Fehler", to: "/formulari" },
    { icon: Landmark, title: "Job & Wohnung", desc: "Schneller zu den Chancen die du suchst", to: "/stellenangebote" },
    { icon: RefreshCcw, title: "Angebot / Gesuch", desc: "Verbinde dich direkt mit Menschen", to: "/nudim-trazim" },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 50%, #FFF7ED 100%)" }}>
      <div className="pointer-events-none absolute -left-24 -top-24" style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(96,165,250,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="pointer-events-none absolute -bottom-20 -right-20" style={{ width: "450px", height: "450px", background: "radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <motion.div className="pointer-events-none absolute hidden sm:block" style={{ width: "180px", height: "180px", top: "35%", right: "8%", background: "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)", filter: "blur(40px)", borderRadius: "50%" }} animate={{ y: [0, -18, 0], x: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.04 }} />

      <div className="container relative z-10 py-20 sm:py-24 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-extrabold leading-snug tracking-tight sm:text-4xl lg:text-[2.75rem]" style={{ color: "#0F172A" }}>
            {"Alles was du für das Leben in Deutschland brauchst –"}<br /><span style={{ color: "hsl(45, 80%, 42%)" }}>{"an einem Ort."}</span>
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-20 rounded-full" style={{ background: "linear-gradient(90deg, #3B82F6, #F59E0B)" }} />
          <p className="mx-auto mt-5 max-w-md text-base font-medium sm:text-lg" style={{ color: "#475569" }}>{"Klar, schnell und unkompliziert."}</p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6" style={{ alignItems: "stretch" }}>
          {features.map((f, i) => (
            <motion.div key={f.to} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={cardVariants} className="flex">
              <Link to={f.to} className="group flex w-full flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1.5" style={{ minHeight: "190px", boxShadow: "0 15px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(11,31,58,0.08)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(11,31,58,0.14)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,166,35,0.35)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 15px 40px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(11,31,58,0.08)"; }}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105" style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #163057 100%)", borderColor: "rgba(245,166,35,0.35)", boxShadow: "0 4px 16px rgba(11,31,58,0.2)" }}>
                  <f.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: "#F5A623" }} strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-bold transition-colors duration-300 group-hover:text-[hsl(var(--gold-dark))]" style={{ color: "#0F172A" }}>{f.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm" style={{ color: "#64748B" }}>{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-14 text-center">
          <Button asChild size="lg" className="group gap-2.5 rounded-2xl bg-[hsl(var(--gold))] px-10 py-4 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_16px_hsl(var(--gold)/0.25)] transition-all duration-300 hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.35)] hover:scale-[1.03]">
            <Link to="/dolazak/prvi-koraci">
              {"Jetzt starten"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
