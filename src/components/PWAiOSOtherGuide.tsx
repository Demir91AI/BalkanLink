import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
  onDismiss: () => void;
}

export default function PWAiOSOtherGuide({ show, onDismiss }: Props) {
  if (!show) return null;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText("https://www.balkanlink.de"); } catch {}
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none md:bottom-4">
      <div className="pointer-events-auto w-full max-w-2xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl border border-blue-500/30 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500" />
              <div className="p-5">
                <button
                  type="button"
                  onClick={onDismiss}
                  className="absolute right-3 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Zatvori"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-start gap-3 pr-8 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/25">
                    <AlertTriangle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Na iPhoneu instalacija radi samo u Safariju
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Chrome i Firefox na iPhoneu ne mogu instalirati bez web bara
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {[
                    { n: 1, text: "Kopiraj link ispod pa otvori Safari (plava kompas ikona)", icon: "🧭" },
                    { n: 2, text: "Zalijepi link u Safari adresnu traku i otvori stranicu", icon: "📍" },
                    { n: 3, text: "Tapni Share dugme (↑ kvadratić sa strelicom) na dnu Safarija", icon: "↑" },
                    { n: 4, text: '"Dodaj na početni ekran" → "Dodaj" — gotovo, bez web bara!', icon: "📲" },
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                        {step.n}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                        <span className="mr-1">{step.icon}</span>{step.text}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors py-2.5 px-4 text-white text-sm font-semibold mb-3"
                >
                  📋 Kopiraj link (balkanlink.de)
                </button>

                <button
                  type="button"
                  onClick={onDismiss}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  Nastavi bez instalacije
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
