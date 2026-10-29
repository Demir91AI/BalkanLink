import { X, Download, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Props {
  show: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export default function PWAInstallBanner({ show, onInstall, onDismiss }: Props) {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl border border-border/40 bg-card/95 backdrop-blur-xl shadow-2xl p-5">
              <button
                type="button"
                onClick={onDismiss}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Zatvori"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--gold))] text-[hsl(var(--primary))] shadow-lg">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Dodaj BalkanLink na početni ekran
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Brži pristup formularima, vodičima i alatima — kao prava aplikacija.
                  </p>
                </div>
                <Button
                  onClick={onInstall}
                  size="sm"
                  className="shrink-0 rounded-full bg-[hsl(var(--gold))] px-4 text-xs font-bold text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--gold))]/90"
                >
                  <Download className="h-3.5 w-3.5" />
                  Instaliraj aplikaciju
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-3">
                <p className="text-[11px] text-muted-foreground">
                  Možeš i kasnije — opcija ostaje u meniju.
                </p>
                <button
                  type="button"
                  onClick={onDismiss}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Kasnije
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
