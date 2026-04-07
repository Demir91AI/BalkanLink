import { X, Download, Share2, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function PWAInstallBanner() {
  const { canShow, platform, installAndroid, dismissAndroid, dismissIOS } = usePWAInstall();

  if (!canShow || !platform) return null;

  const dismiss = platform === "android" ? dismissAndroid : dismissIOS;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 shadow-lg">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Zatvori"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(45,93%,49%)] to-[hsl(30,90%,50%)] shadow-md">
                  <Smartphone className="h-6 w-6 text-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    BalkanLink kao aplikacija 📱
                  </p>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                    Brži pristup vodičima, formularima i asistentu — instaliraj na telefon.
                  </p>
                </div>

                {platform === "android" && (
                  <button
                    onClick={installAndroid}
                    className="shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,184,0,0.3)] bg-gradient-to-r from-[hsl(45,93%,49%)] to-[hsl(35,93%,52%)]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Preuzmi app
                  </button>
                )}
              </div>

              {platform === "ios" && (
                <div className="mt-4 space-y-2">
                  {[
                    { step: "1", text: "Otvori u Safari pregledniku" },
                    {
                      step: "2",
                      text: (
                        <span>
                          Klikni <Share2 className="inline h-3.5 w-3.5 mx-0.5 text-[hsl(210,100%,50%)]" /> Share ikonu
                        </span>
                      ),
                    },
                    { step: "3", text: 'Izaberi "Dodaj na početni ekran"' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                        {item.step}
                      </span>
                      <span className="text-xs text-white/60">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
