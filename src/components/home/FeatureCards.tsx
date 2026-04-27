import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Shield, GraduationCap, Camera, Megaphone, Receipt } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

export default function FeatureCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const localize = useLocalizedHref();
  const { t } = useTranslation("pages");

  const features = [
    { icon: FileText, key: "form", to: "/formulari" },
    { icon: Camera, key: "doc", to: "/dokumenten-check" },
    { icon: Shield, key: "visa", to: "/viza" },
    { icon: GraduationCap, key: "german", to: "/deutsch-trainer" },
    { icon: Receipt, key: "porezi", to: "/porezi" },
    { icon: Megaphone, key: "ads", to: "/nudim-trazim" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4"
      style={{ background: "linear-gradient(180deg, hsl(215 55% 4%) 0%, hsl(220 50% 7%) 100%)" }}
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2
          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-[900] text-white tracking-tight"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {t("home.featureCards.heading")}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.to}
              to={localize(f.to)}
              className="group relative flex flex-col items-center justify-center text-center rounded-2xl p-6 min-h-[120px] transition-all duration-200 will-change-transform active:scale-[0.97] hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s, box-shadow 0.2s ease, border-color 0.2s ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsla(43,52%,54%,0.4)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3), 0 0 20px hsla(43,52%,54%,0.15)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <Icon className="h-7 w-7 text-[hsl(var(--gold))] mb-3 transition-transform duration-200 group-hover:scale-110" />
              <span className="text-sm font-bold text-white mb-1">{t(`home.featureCards.items.${f.key}.label`)}</span>
              <span className="text-[11px] text-white/50 leading-snug">{t(`home.featureCards.items.${f.key}.desc`)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
