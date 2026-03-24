import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ── Subtle floating particles ── */
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

    for (let i = 0; i < 30; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.25 + 0.05,
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
        ctx.fillStyle = `rgba(234,179,8,${d.o})`;
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
      style={{ opacity: 0.5 }}
    />
  );
}

/* ── Feature cards ── */
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(215,60%,10%)] via-[hsl(215,55%,14%)] to-[hsl(215,50%,12%)]">
      {/* Animated glow blobs — brighter, blue-gold tones */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full animate-pulse"
          style={{
            background: "radial-gradient(circle, hsl(215 70% 40% / 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-16 h-[350px] w-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(45 90% 50% / 0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "pulse 5s ease-in-out infinite alternate",
          }}
        />
        {/* Center text glow — light focus zone */}
        <div
          className="absolute left-1/2 top-[40%] h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(215 60% 30% / 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <ParticleField />

      {/* Top/bottom accent lines */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.2)] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />

      {/* Content */}
      <div className="container relative z-10 py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Počni svoj novi život u Njemačkoj –{" "}
            <span className="text-gold drop-shadow-[0_0_24px_hsl(var(--gold)/0.4)]">
              bez stresa.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-white/50 sm:text-lg">
            Sve na jednom mjestu – jasno, brzo i bez komplikacija.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/35 sm:text-base">
            Ne moraš više lutati i tražiti informacije po internetu.
            <br />
            BalkanLink ti daje sve što ti treba – od papira do posla i stana.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-3 sm:gap-7">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
            >
              <Link
                to={f.to}
                className="group relative flex flex-col items-center rounded-2xl border border-white/[0.1] bg-white/[0.04] p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[hsl(var(--gold)/0.3)] hover:bg-white/[0.08] hover:shadow-[0_12px_48px_-12px_hsl(var(--gold)/0.2)]"
              >
                {/* Glow ring */}
                <div className="relative mb-5">
                  <div
                    className="absolute inset-0 h-14 w-14 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(circle, hsl(45 90% 50% / 0.18), transparent 70%)",
                      filter: "blur(14px)",
                      transform: "translate(-7px, -7px) scale(2)",
                    }}
                  />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06] transition-all duration-300 group-hover:border-[hsl(var(--gold)/0.35)] group-hover:bg-white/[0.1]">
                    <f.icon className="h-6 w-6 text-[hsl(var(--gold))] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-[hsl(var(--gold))]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-white/40">{f.desc}</p>
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
            className="group gap-2.5 rounded-2xl bg-[hsl(var(--gold))] px-10 py-4 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_6px_28px_hsl(var(--gold)/0.35)] transition-all duration-300 hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_10px_40px_hsl(var(--gold)/0.45)] hover:scale-[1.04] hover:-translate-y-0.5"
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
