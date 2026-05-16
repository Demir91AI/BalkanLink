import { X, Chrome, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
  onDismiss: () => void;
}

export default function PWASamsungGuide({ show, onDismiss }: Props) {
  if (!show) return null;

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
            <div className="relative rounded-2xl border border-amber-500/30 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">

              {/* Amber top strip */}
              <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

              <div className="p-5">
                <button
                  type="button"
                  onClick={onDismiss}
                  className="absolute right-3 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Zatvori"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-3 pr-8 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/25">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Samsung Internet ne podržava instalaciju</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Za puni doživljaj bez web bara potreban je Chrome</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3 mb-4">
                  {[
                    { n: 1, text: "Otvori Google Chrome na svom telefonu", icon: "🌐" },
                    { n: 2, text: "Idi na balkanlink.de", icon: "📍" },
                    { n: 3, text: 'Klikni na ⋮ meni (tri tačke) → "Instaliraj aplikaciju"', icon: "📲" },
                    { n: 4, text: "Ukloni staru ikonu sa početnog ekrana", icon: "🗑️" },
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                        {step.n}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                        <span className="mr-1">{step.icon}</span>{step.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chrome link */}
                <a
                  href="googlechrome://navigate?url=https://www.balkanlink.de"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors py-2.5 px-4 text-white text-sm font-semibold mb-3"
                  onClick={onDismiss}
                >
                  <Chrome className="h-4 w-4" />
                  Otvori u Chrome
                </a>

                <button
                  type="button"
                  onClick={onDismiss}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  Nastavi u Samsung Internet
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
