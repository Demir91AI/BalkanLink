import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PROMO_END = new Date("2026-06-01T00:00:00Z");
const STORAGE_KEY = "bl_promo_popup_seen";

export default function PromoPopupBanner() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (new Date() >= PROMO_END) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch { /* noop */ }
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
    setOpen(false);
  };

  const handleCta = () => {
    close();
    navigate("/register");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] overflow-hidden rounded-2xl p-6 sm:p-7"
            style={{
              background: "linear-gradient(135deg, hsl(215 55% 7%), hsl(220 50% 9%))",
              border: "2px solid hsla(43,72%,58%,0.65)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.8), 0 0 40px hsla(43,52%,54%,0.25)",
            }}
          >
            {/* Top gold glow line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, hsla(43,72%,75%,0.7), transparent)" }}
            />

            {/* X close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Zatvori"
              className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <X className="h-3.5 w-3.5 text-white/60" />
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              {/* Promo chip */}
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-wider sm:text-[10px]"
                style={{
                  color: "hsl(var(--gold))",
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid hsla(43,52%,54%,0.35)",
                }}
              >
                • PROMO • VREMENSKI OGRANIČENO • DO 31.05.2026 •
              </span>

              {/* Gift icon */}
              <div
                className="grid place-items-center rounded-full"
                style={{
                  width: 72,
                  height: 72,
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
                  boxShadow: "0 0 24px hsla(43,52%,54%,0.6)",
                  fontSize: 32,
                }}
                aria-hidden
              >
                🎁
              </div>

              {/* Headline */}
              <h2 className="text-[22px] font-black text-white sm:text-[26px]">
                7 dana Premium besplatno
              </h2>

              {/* Subtext */}
              <div className="text-[13px] text-white/70 sm:text-[14px]">
                <p>Za svakog novog korisnika!</p>
                <p>Otkaži bilo kad — bez kartica.</p>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleCta}
                className="h-[52px] w-full rounded-xl text-[15px] font-black text-black transition hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                  boxShadow: "0 8px 28px hsla(43,52%,54%,0.55)",
                }}
              >
                Registruj se besplatno →
              </button>

              {/* Dismiss */}
              <button
                type="button"
                onClick={close}
                className="cursor-pointer text-[11px] text-white/35 hover:text-white/60"
              >
                Možda kasnije
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
