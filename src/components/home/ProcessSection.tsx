import { useRef, useState, useEffect } from "react";
import { MousePointerClick, BookOpen, PenLine, PartyPopper } from "lucide-react";

const steps = [
  { num: "01", icon: MousePointerClick, title: "Odaberi uslugu", desc: "Izaberi šta ti treba — formular, dokument, viza ili jezik" },
  { num: "02", icon: BookOpen, title: "Prati vodič", desc: "Korak po korak vodič na bosanskom jeziku" },
  { num: "03", icon: PenLine, title: "Popuni / Riješi", desc: "Precizno i tačno, bez nagađanja" },
  { num: "04", icon: PartyPopper, title: "Završeno bez stresa", desc: "Budi siguran da si uradio sve ispravno" },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(215 55% 4%) 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-[900] text-white tracking-tight">
            Kako funkcioniše?
          </h2>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-start justify-between gap-4 relative">
          {/* Connecting line */}
          <div className="absolute top-7 left-[12%] right-[12%] h-[2px] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="flex flex-col items-center text-center flex-1"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.15}s`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black relative z-10 mb-4"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
                    color: "#000",
                    boxShadow: "0 4px 20px hsla(43,52%,54%,0.35)",
                  }}
                >
                  {step.num}
                </div>
                <Icon className="h-5 w-5 text-[hsl(var(--gold))] mb-2 opacity-60" />
                <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                <p className="text-[12px] text-white/45 leading-relaxed max-w-[160px]">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-10">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-[2px]">
            <div
              className="w-full rounded-full"
              style={{
                background: "linear-gradient(180deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                height: visible ? "100%" : "0%",
                transition: "height 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="relative"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.15}s`,
                  }}
                >
                  {/* Circle */}
                  <div
                    className="absolute -left-10 top-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
                      color: "#000",
                      boxShadow: "0 4px 16px hsla(43,52%,54%,0.3)",
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-[hsl(var(--gold))] opacity-60" />
                      <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-[12px] text-white/45 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
