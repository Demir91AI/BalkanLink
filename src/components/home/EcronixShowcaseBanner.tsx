import { ArrowRight, ExternalLink, Globe, Smartphone, Cpu, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoEcronix from "@/assets/logo-ecronix.jpg";
import ecronixScreenshot from "@/assets/ecronix-hero-screenshot.png";

const services = [
  { icon: Globe, label: "Web aplikacije" },
  { icon: Smartphone, label: "Mobilne aplikacije" },
  { icon: Cpu, label: "AI integracija" },
  { icon: Palette, label: "UI/UX dizajn" },
];

export function EcronixShowcaseBanner() {
  return (
    <article
      className="relative overflow-hidden rounded-[2rem] border border-[hsl(45_93%_49%/0.15)]"
      style={{
        background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(220 20% 8%) 40%, hsl(30 30% 8%) 100%)",
      }}
    >
      {/* Ambient glow effects */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(45 93% 49% / 0.4), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(220 60% 50% / 0.5), transparent 70%)" }}
      />

      <div className="relative grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: Content */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12">
          <div>
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(45_93%_49%/0.2)] bg-[hsl(45_93%_49%/0.08)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Premium partner
            </div>

            {/* Logo */}
            <div className="mb-6 w-[10rem] sm:w-[12rem]">
              <img
                src={logoEcronix}
                alt="Ecronix logo"
                className="h-auto w-full object-contain"
                loading="lazy"
                width={480}
                height={160}
              />
            </div>

            {/* Headline */}
            <h3 className="text-2xl font-black leading-[1.15] tracking-tight text-white sm:text-[2rem] lg:text-[2.25rem]">
              Digitalna rješenja{" "}
              <span className="text-gold">koja pokreću rast</span>
            </h3>

            {/* Description */}
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/60 sm:text-[0.95rem]">
              Od inovativnih mobilnih aplikacija do moćnih web platformi —
              pretvaramo vaše ideje u digitalnu stvarnost sa sveobuhvatnom podrškom.
            </p>

            {/* Services grid */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
              {services.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 backdrop-blur-sm"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[hsl(45_93%_49%/0.12)]">
                    <Icon className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <span className="text-xs font-semibold text-white/80">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-xl bg-[hsl(45_93%_49%)] px-6 font-bold text-black hover:bg-[hsl(45_93%_55%)] hover:shadow-[0_8px_32px_-8px_hsl(45_93%_49%/0.5)]"
            >
              <a href="https://www.ecronix.com/#contact" target="_blank" rel="noopener noreferrer">
                Zatraži ponudu <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/15 bg-white/5 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://www.ecronix.com/" target="_blank" rel="noopener noreferrer">
                Posjeti stranicu <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right: Website screenshot in browser frame */}
        <div className="flex items-center justify-center p-4 pt-0 sm:p-6 sm:pt-0 lg:p-6">
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.04] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-2 flex-1 rounded-md bg-white/[0.06] px-3 py-1">
                <span className="text-[10px] text-white/40">ecronix.com</span>
              </div>
            </div>
            {/* Screenshot */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={ecronixScreenshot}
                alt="Ecronix web stranica"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                width={1456}
                height={816}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: "linear-gradient(to top, hsl(0 0% 4%), transparent)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
