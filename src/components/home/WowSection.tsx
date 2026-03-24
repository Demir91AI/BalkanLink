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

    for (let i = 0; i < 30; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.3 + 0.08,
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
        ctx.fillStyle = `rgba(251,191,36,${d.o})`;
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
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, hsl(215 50% 14%) 0%, hsl(220 40% 18%) 35%, hsl(30 40% 20%) 70%, hsl(35 50% 18%) 100%)",
      }}
    >
      {/* Warm glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-left warm blue */}
        <div
          className="absolute -left-20 -top-20 h-[420px] w-[420px] rounded-full animate-pulse"
          style={{
            background: "radial-gradient(circle, hsl(215 60% 35% / 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Bottom-right golden glow */}
        <div
          className="absolute -bottom-24 -right-16 h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(40 85% 50% / 0.15) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "pulse 5s ease-in-out infinite alternate",
          }}
        />
        {/* Center warm focus zone */}
        <div
          className="absolute left-1/2 top-[38%] h-[320px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(35 60% 45% / 0.1) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        {/* Extra warm accent top-right */}
        <div
          className="absolute right-[15%] top-[10%] h-[200px] w-[200px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(45 90% 55% / 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <ParticleField />

      {/* Accent lines */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.25)] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.2)] to-transparent" />

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
            Sve što ti treba za život u Njemačkoj –{" "}
            <span className="text-gold drop-shadow-[0_0_24px_hsl(var(--gold)/0.45)]">
              na jednom mjestu.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-white/60 sm:text-lg">
            Jasno, brzo i bez komplikacija – od formulara do posla i stana.
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
                className="group relative flex flex-col items-center rounded-2xl border border-white/[0.12] bg-white/[0.07] p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[hsl(var(--gold)/0.4)] hover:bg-white/[0.12] hover:shadow-[0_16px_48px_-12px_hsl(var(--gold)/0.25)]"
              >
                {/* Glow ring */}
                <div className="relative mb-5">
                  <div
                    className="absolute inset-0 h-14 w-14 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(circle, hsl(45 90% 55% / 0.22), transparent 70%)",
                      filter: "blur(14px)",
                      transform: "translate(-7px, -7px) scale(2)",
                    }}
                  />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.08] transition-all duration-300 group-hover:border-[hsl(var(--gold)/0.4)] group-hover:bg-white/[0.14]">
                    <f.icon className="h-6 w-6 text-[hsl(var(--gold))] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-[hsl(var(--gold))]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">{f.desc}</p>
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
          <div className="relative inline-block">
            {/* CTA glow backdrop */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "hsl(var(--gold) / 0.2)",
                filter: "blur(20px)",
                transform: "scale(1.15, 1.4)",
              }}
            />
            <Button
              asChild
              size="lg"
              className="relative group gap-2.5 rounded-2xl bg-[hsl(var(--gold))] px-10 py-4 text-base font-bold text-[hsl(var(--gold-foreground))] shadow-[0_6px_28px_hsl(var(--gold)/0.4)] transition-all duration-300 hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_12px_44px_hsl(var(--gold)/0.5)] hover:scale-[1.04] hover:-translate-y-0.5"
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
