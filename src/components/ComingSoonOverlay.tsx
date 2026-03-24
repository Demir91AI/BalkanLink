import { useEffect } from "react";
import { motion } from "framer-motion";

function BLLogo({ size = 64 }: { size?: number }) {
  return (
    <div className="flex items-baseline select-none" style={{ fontSize: size, lineHeight: 1 }}>
      <span className="font-black tracking-tighter text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>
        B
      </span>
      <span className="font-black tracking-tighter text-gold" style={{ fontFamily: "'Arial Black', sans-serif" }}>
        L
      </span>
    </div>
  );
}

export default function ComingSoonOverlay() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(215 68% 8%) 0%, hsl(215 55% 12%) 40%, hsl(215 45% 16%) 70%, hsl(220 40% 10%) 100%)",
      }}
    >
      {/* Animated grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold glow orb top-right */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 -right-32 rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, hsl(45 93% 49% / 0.15) 0%, transparent 65%)",
        }}
      />

      {/* Blue glow orb bottom-left */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute -bottom-40 -left-40 rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, hsl(215 70% 50% / 0.12) 0%, transparent 65%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 3 + i * 1.5,
            height: 3 + i * 1.5,
            background: i % 2 === 0 ? "hsl(45 93% 49% / 0.5)" : "hsl(215 70% 60% / 0.4)",
            top: `${15 + i * 18}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -30 - i * 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-6 text-center sm:gap-10" style={{ maxWidth: 680 }}>
        {/* Logo with glow ring */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 120 }}
          className="relative"
        >
          <div className="absolute inset-0 -m-4 rounded-2xl opacity-30 blur-2xl"
            style={{ background: "linear-gradient(135deg, hsl(45 93% 49% / 0.4), hsl(215 70% 50% / 0.3))" }}
          />
          <div className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            style={{ boxShadow: "0 0 60px -15px hsl(45 93% 49% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.05)" }}
          >
            <BLLogo size={56} />
          </div>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-baseline text-2xl font-black tracking-tight sm:text-3xl"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          <span className="text-white">Balkan</span>
          <span className="text-gold">Link</span>
        </motion.div>

        {/* Divider line with gold center */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, hsl(45 93% 49% / 0.6), transparent)" }}
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-[3.5rem]"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, hsl(45 88% 70%) 50%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Platforma za Balkance
          <br className="hidden sm:block" />
          {" "}u Njemačkoj
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-base leading-relaxed sm:text-lg"
          style={{ color: "hsl(215 20% 65%)", maxWidth: 520 }}
        >
          Sve što vam treba – informacije, pomoć, usluge i zajednica na jednom mjestu.
        </motion.p>

        {/* Additional text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-sm leading-relaxed"
          style={{ color: "hsl(215 15% 50%)", maxWidth: 460 }}
        >
          Radimo na završnim detaljima kako bismo vam pružili jednostavno i pouzdano iskustvo.
        </motion.p>

        {/* Contact pill */}
        <motion.a
          href="mailto:kontakt@balkanlink.de"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="group mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/10"
          style={{ color: "hsl(215 20% 70%)" }}
        >
          <span className="text-gold transition-transform group-hover:scale-110">✦</span>
          kontakt@balkanlink.de
        </motion.a>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-6 text-[11px] tracking-widest uppercase"
          style={{ color: "hsl(215 15% 30%)" }}
        >
          © BalkanLink – u pripremi
        </motion.p>
      </div>
    </motion.div>
  );
}
