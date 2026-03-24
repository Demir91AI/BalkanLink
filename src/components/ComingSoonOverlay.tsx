import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ComingSoonOverlay() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{
        background: "linear-gradient(145deg, #fafbff 0%, #f0f2fa 40%, #e8eaf6 100%)",
      }}
    >
      {/* Subtle glow accent */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 px-6 text-center sm:gap-8" style={{ maxWidth: 620 }}>
        {/* Top label */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-full border border-indigo-200/60 bg-white/70 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-500 shadow-sm backdrop-blur-sm"
        >
          BalkanLink uskoro
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-[3.4rem]"
          style={{ textShadow: "0 1px 12px rgba(99,102,241,0.08)" }}
        >
          Platforma za Balkance{" "}
          <br className="hidden sm:block" />
          u Njemačkoj
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-base leading-relaxed text-slate-500 sm:text-lg"
          style={{ maxWidth: 520 }}
        >
          Sve što vam treba – informacije, pomoć, usluge i zajednica na jednom mjestu.
        </motion.p>

        {/* Additional text */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="text-sm leading-relaxed text-slate-400"
          style={{ maxWidth: 460 }}
        >
          Radimo na završnim detaljima kako bismo vam pružili jednostavno i pouzdano iskustvo.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="h-px w-16 bg-slate-200"
        />

        {/* Contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm text-slate-400"
        >
          Za upite i saradnje:{" "}
          <a
            href="mailto:kontakt@balkanlink.de"
            className="font-medium text-indigo-500 transition-colors hover:text-indigo-600"
          >
            kontakt@balkanlink.de
          </a>
        </motion.p>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-4 text-[11px] tracking-wide text-slate-300"
        >
          © BalkanLink – u pripremi
        </motion.p>
      </div>
    </motion.div>
  );
}
