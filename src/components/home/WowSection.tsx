import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ── Floating particles canvas ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dots: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    const COUNT = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.35 + 0.05,
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
      style={{ opacity: 0.6 }}
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
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.35 + i * 0.15, ease: "easeOut" as const },
  }),
};

export function WowSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(215,55%,4%)] via-[hsl(215,50%,6%)] to-[hsl(215,45%,8%)]">
      {/* Animated background glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gold glow — top-left */}
        <div
          className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full animate-pulse"
          style={{
            background: "radial-gradient(circle, hsl(45 90% 50% / 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Orange glow — bottom-right */}
        <div
          className="absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(30 80% 50% / 0.06) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "pulse 4s ease-in-out infinite alternate",
          }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(45 85% 50% / 0.04) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* Gradient lines decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.2)] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.15)] to-transparent" />

      {/* Content */}
      <div className="container relative z-10 py-20 sm:py-28 lg:py-32">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Početak u Njemačkoj –{" "}
            <span className="text-gold drop-shadow-[0_0_20px_hsl(var(--gold)/0.35)]">
              bez lutanja.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-white/45 sm:text-lg">
            Sve što ti treba na jednom mjestu – jasno, brzo i bez komplikacija.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/30 sm:text-base">
            BalkanLink ti pomaže da napraviš siguran početak u Njemačkoj. Umjesto da gubiš vrijeme
            tražeći informacije po internetu ili pitaš ljude koji nisu sigurni, ovdje dobijaš tačne
            i jednostavno objašnjene korake za sve što ti treba – od formulara do posla i stana.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-3 sm:gap-6">
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
                className="group relative flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--gold)/0.25)] hover:bg-white/[0.06] hover:shadow-[0_8px_40px_-12px_hsl(var(--gold)/0.15)]"
              >
                {/* Glow ring behind icon */}
                <div className="relative mb-4">
                  <div
                    className="absolute inset-0 h-12 w-12 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(circle, hsl(45 90% 50% / 0.15), transparent 70%)",
                      filter: "blur(12px)",
                      transform: "translate(-6px, -6px) scale(2)",
                    }}
                  />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] transition-colors duration-300 group-hover:border-[hsl(var(--gold)/0.3)]">
                    <f.icon className="h-5 w-5 text-[hsl(var(--gold))] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-[hsl(var(--gold))]">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm text-white/35">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            className="group h-13 gap-2.5 rounded-2xl bg-[hsl(var(--gold))] px-8 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_4px_24px_hsl(var(--gold)/0.3)] transition-all duration-300 hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_8px_36px_hsl(var(--gold)/0.4)] hover:scale-[1.03]"
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
