import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ── Warm-tone floating particles ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dots: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 25; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.2 + 0.06,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${d.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.4 }}
    />
  );
}

/* ── Feature cards data ── */
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
    transition: { duration: 0.6, delay: 0.3 + i * 0.15, ease: "easeOut" as const },
  }),
};

export function WowSection() {
  return (
    <section className="relative overflow-hidden">
      {/* ── Background: navy → warm orange gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(175deg, #0B1F3A 0%, #122A4F 30%, #2D3A50 55%, #6B4C2A 78%, #C77B1F 100%)",
        }}
      />

      {/* Radial warm glow — center */}
      <div
        className="pointer-events-none absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "700px",
          height: "500px",
          background: "radial-gradient(ellipse, hsl(40 90% 50% / 0.14) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle top-left blue glow */}
      <div
        className="pointer-events-none absolute -left-12 -top-12"
        style={{
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, hsl(215 65% 30% / 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <ParticleField />

      {/* Accent lines */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.25)] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.2)] to-transparent" />

      {/* ── Content ── */}
      <div className="container relative z-10 py-20 sm:py-24 lg:py-28">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-3xl font-extrabold leading-snug tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Sve što ti treba za život u Njemačkoj –
            <br />
            <span className="text-gold drop-shadow-[0_0_20px_hsl(var(--gold)/0.5)]">
              na jednom mjestu.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-base font-medium sm:text-lg" style={{ color: "#cccccc" }}>
            Jasno, brzo i bez komplikacija – od formulara do posla i stana.
          </p>
        </motion.div>

        {/* ── Feature cards — equal height grid ── */}
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
                className="group flex w-full min-h-[190px] flex-col items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.07] px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[hsl(var(--gold)/0.45)] hover:bg-white/[0.12] hover:shadow-[0_16px_48px_-8px_hsl(var(--gold)/0.25)]"
              >
                {/* Icon with glow */}
                <div className="relative mb-4">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      width: "56px",
                      height: "56px",
                      background: "radial-gradient(circle, hsl(45 90% 55% / 0.25), transparent 70%)",
                      filter: "blur(12px)",
                      transform: "translate(-7px, -7px) scale(2)",
                    }}
                  />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.08] transition-all duration-300 group-hover:border-[hsl(var(--gold)/0.45)] group-hover:bg-white/[0.15]">
                    <f.icon className="h-6 w-6 text-[hsl(var(--gold))] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-[hsl(var(--gold))]">
                  {f.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-white/50">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <div className="relative inline-block">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "hsl(var(--gold) / 0.25)",
                filter: "blur(24px)",
                transform: "scale(1.2, 1.5)",
              }}
            />
            <Button
              asChild
              size="lg"
              className="relative group gap-2.5 rounded-2xl bg-[hsl(var(--gold))] px-10 py-4 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_8px_32px_hsl(var(--gold)/0.45)] transition-all duration-300 hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_14px_48px_hsl(var(--gold)/0.55)] hover:scale-105 hover:-translate-y-0.5"
            >
              <Link to="/dolazak/prvi-koraci">
                Započni odmah
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
