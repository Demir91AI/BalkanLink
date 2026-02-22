import { motion } from "framer-motion";
import { COUNTRIES } from "@/contexts/CountryContext";

export default function CountryNavBar() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(215 55% 6%) 0%, hsl(215 68% 12%) 100%)",
        borderBottom: "1px solid hsl(45 93% 49% / 0.08)",
      }}
    >
      {/* Animated glow background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute -left-20 top-0 h-full w-40 animate-glow-pulse"
          style={{ background: "linear-gradient(90deg, transparent, hsl(45 93% 49% / 0.1), transparent)" }}
        />
      </div>

      <div className="container flex items-center justify-center gap-3 py-2.5 sm:gap-5">
        {COUNTRIES.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative flex items-center justify-center"
          >
            <span className="text-xl transition-transform duration-500 group-hover:scale-125 sm:text-2xl">
              {c.flag}
            </span>
            {/* Hover glow ring */}
            <div
              className="absolute inset-[-4px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "radial-gradient(circle, hsl(45 93% 49% / 0.15), transparent 70%)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
