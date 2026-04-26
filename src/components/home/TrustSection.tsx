import { useRef, useState, useEffect } from "react";
import { ClipboardList, CalendarCheck, Globe, CheckCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("pages");

  const trustPoints = [
    { icon: ClipboardList, key: "p1" },
    { icon: CalendarCheck, key: "p2" },
    { icon: Globe, key: "p3" },
    { icon: CheckCheck, key: "p4" },
  ];

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
      className="relative py-20 px-4"
      style={{ background: "hsl(215 55% 4%)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-[900] text-white tracking-tight">
            {t("home.trust.heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trustPoints.map((tp, i) => {
            const Icon = tp.icon;
            return (
              <div
                key={tp.key}
                className="rounded-2xl p-6 transition-all duration-200 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s, border-color 0.2s ease, box-shadow 0.2s ease`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsla(43,52%,54%,0.25)";
                  e.currentTarget.style.boxShadow = "0 0 20px hsla(43,52%,54%,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <Icon className="h-8 w-8 text-[hsl(var(--gold))] mb-3" strokeWidth={1.5} />
                <h3 className="text-base font-bold text-white mb-1">{t(`home.trust.points.${tp.key}.title`)}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{t(`home.trust.points.${tp.key}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
