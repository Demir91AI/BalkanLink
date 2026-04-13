import { useRef, useState, useEffect } from "react";
import { XCircle } from "lucide-react";

const warnings = [
  "Pogrešno popunjen formular = sedmice čekanja",
  "Propušten rok = izgubljen novac ili status",
  "Nerazumijevanje dokumenta = ozbiljne pravne posljedice",
];

export default function PricingWarning() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="max-w-2xl mx-auto mb-14 rounded-2xl p-8"
      style={{
        background: "linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.04))",
        border: "1px solid rgba(220,38,38,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <h3 className="font-heading text-xl sm:text-2xl font-[900] text-white mb-6 text-center">
        Koliko te može koštati jedna greška?
      </h3>
      <div className="space-y-3">
        {warnings.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-3"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${0.2 + i * 0.1}s`,
            }}
          >
            <XCircle className="h-5 w-5 text-red-500 shrink-0" />
            <span className="text-sm font-semibold text-white/80">{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
