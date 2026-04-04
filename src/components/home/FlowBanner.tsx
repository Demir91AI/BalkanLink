import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const flowItems = [
  { icon: "📄", title: "Formulari", text: "Popuni bez greške — korak po korak", badge: "premium", to: "/formulari", primary: true },
  { icon: "🌍", title: "Viza", text: "Pronađi pravi put za dolazak u Njemačku", badge: "premium", to: "/dolazak/boravisna-dozvola" },
  { icon: "🇩🇪", title: "Njemački", text: "Uči kroz stvarne situacije (A1–C2)", badge: "premium", to: "/deutsch-trainer" },
  { icon: "📑", title: "Dokumenti", text: "Provjeri pisma i dokumente iz Njemačke", badge: "premium", to: "/dokumenten-check" },
  { icon: "💶", title: "Novčana pomoć", text: "Bürgergeld, Wohngeld i dodaci", badge: null, to: "/formulari" },
  { icon: "🧮", title: "Kalkulatori", text: "Izračunaj platu, poreze i više", badge: null, to: "/kalkulatori" },
  { icon: "💼", title: "Oglasi", text: "Nađi posao ili objavi oglas", badge: "free", to: "/nudim-trazim" },
];

export default function FlowBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Swipe hint on first load
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.scrollBy({ left: 10, behavior: "smooth" });
      setTimeout(() => el.scrollBy({ left: -10, behavior: "smooth" }), 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-14 sm:py-20">
      {/* Bridge block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container text-center mb-8 sm:mb-12"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Šta želiš riješiti danas?
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mt-2.5 leading-relaxed max-w-md mx-auto">
          Riješi papirologiju bez stresa — sve na jednom mjestu
        </p>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]" />
      </motion.div>

      {/* Flow cards */}
      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-[#0B0F1A] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-[#0B0F1A] to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {flowItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                to={item.to}
                className={`group relative flex flex-col snap-center cursor-pointer border overflow-hidden rounded-[22px] p-[20px] transition-all duration-300 active:scale-[0.985] ${
                  item.badge === "premium"
                    ? "min-w-[252px] max-w-[252px] min-h-[174px] border-[hsla(43,70%,53%,0.45)] shadow-[0_14px_36px_rgba(0,0,0,0.28),0_0_24px_hsla(43,70%,53%,0.12)] hover:-translate-y-1.5 hover:scale-[1.04] hover:border-[hsla(43,80%,62%,0.6)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.35),0_0_32px_hsla(43,70%,53%,0.2)]"
                    : "min-w-[224px] max-w-[224px] min-h-[154px] border-[rgba(255,255,255,0.07)] shadow-[0_10px_28px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:scale-[1.02] hover:border-[rgba(255,255,255,0.14)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.28)]"
                }`}
                style={{
                  background: item.badge === "premium"
                    ? "linear-gradient(160deg, hsl(220,50%,10%) 0%, hsl(225,45%,7%) 100%)"
                    : "linear-gradient(180deg, rgba(18,30,58,0.85) 0%, rgba(24,42,79,0.8) 100%)",
                }}
              >
                {/* Inner glow for premium */}
                {item.badge === "premium" && (
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[hsla(43,70%,53%,0.06)] blur-2xl pointer-events-none" />
                )}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/[0.02] blur-xl pointer-events-none" />

                {/* Badge */}
                {item.badge === "premium" && (
                  <span
                    className="absolute top-[14px] right-[14px] rounded-full px-2.5 py-1 text-[11px] font-black text-[#0f1f3d] uppercase tracking-wider"
                    style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFB800 100%)", boxShadow: "0 6px 18px rgba(255,200,0,0.32)" }}
                  >
                    ⭐ PREMIUM
                  </span>
                )}
                {item.badge === "free" && (
                  <span className="absolute top-[14px] right-[14px] rounded-full border border-white/12 bg-white/[0.10] px-2.5 py-1 text-[11px] font-bold text-white/70">
                    Free + Pro
                  </span>
                )}

                <span className={`mb-3 ${item.badge === "premium" ? "text-[32px]" : "text-[26px]"}`}>{item.icon}</span>
                <span className={`font-bold text-white mb-1.5 ${item.badge === "premium" ? "text-[19px]" : "text-[16px] text-white/90"}`}>{item.title}</span>
                <span className={`leading-[1.45] max-w-[90%] ${item.badge === "premium" ? "text-[14px] text-white/75" : "text-[13px] text-white/55"}`}>{item.text}</span>

                <span className={`mt-auto pt-3 font-semibold opacity-90 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1 ${
                  item.badge === "premium" ? "text-[14px] text-[#FFD700]" : "text-[13px] text-white/60"
                }`}>
                  Otvori <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA below */}
      <div className="text-center mt-6 sm:mt-8">
        <p className="text-sm text-gray-400 mb-3">Ne znaš odakle početi?</p>
        <Link
          to="/formulari"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold text-[#0f1f3d] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(255,184,0,0.35)] active:scale-[0.985]"
          style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", boxShadow: "0 10px 24px rgba(255,184,0,0.30)" }}
        >
          Vodi me korak po korak
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-xs text-gray-500 mt-2">Počni od formulara i vodiča koji ti najviše trebaju</p>
      </div>
    </section>
  );
}
