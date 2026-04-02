import { X, Download, Share2 } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function PWAInstallBanner() {
  const { showAndroidBanner, showIOSBanner, installAndroid, dismissAndroid, dismissIOS } = usePWAInstall();

  if (!showAndroidBanner && !showIOSBanner) return null;

  // Android banner
  if (showAndroidBanner) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[60] animate-fade-in">
        <div className="mx-auto max-w-lg p-4">
          <div className="relative rounded-2xl border border-white/10 bg-[#0B0F1A]/95 backdrop-blur-xl p-5 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
            <button onClick={dismissAndroid} className="absolute top-3 right-3 text-white/40 hover:text-white/70 transition-colors" aria-label="Zatvori">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4">
              <div className="shrink-0 h-12 w-12 rounded-xl overflow-hidden border border-white/10">
                <img src="/icons/icon-192x192.png" alt="BalkanLink" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Instaliraj BalkanLink</p>
                <p className="text-xs text-white/50 mt-0.5">Otvori jednim dodirom sa početnog ekrana</p>
              </div>
            </div>
            <button
              onClick={installAndroid}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-full py-3 font-bold text-sm text-[#0f1f3d] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,184,0,0.35)]"
              style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }}
            >
              <Download className="h-4 w-4" />
              Instaliraj aplikaciju
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iOS banner
  if (showIOSBanner) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[60] animate-fade-in">
        <div className="mx-auto max-w-lg p-4">
          <div className="relative rounded-2xl border border-white/10 bg-[#0B0F1A]/95 backdrop-blur-xl p-5 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
            <button onClick={dismissIOS} className="absolute top-3 right-3 text-white/40 hover:text-white/70 transition-colors" aria-label="Zatvori">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 h-10 w-10 rounded-xl overflow-hidden border border-white/10">
                <img src="/icons/icon-192x192.png" alt="BalkanLink" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Dodaj BalkanLink kao aplikaciju</p>
                <p className="text-xs text-white/40 mt-0.5">Sačuvaj na početni ekran svog telefona</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              {[
                { step: "1", text: "Otvori u Safari pregledniku" },
                { step: "2", text: <>Klikni <Share2 className="inline h-3.5 w-3.5 mx-0.5 text-[#007AFF]" /> Share ikonu</> },
                { step: "3", text: 'Izaberi "Add to Home Screen"' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">{item.step}</span>
                  <span className="text-xs text-white/70">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={dismissIOS}
                className="flex-1 rounded-full border border-white/10 py-2.5 text-xs font-semibold text-white/60 hover:bg-white/5 transition-colors"
              >
                Ne prikazuj više
              </button>
              <button
                onClick={dismissIOS}
                className="flex-1 rounded-full py-2.5 text-xs font-bold text-[#0f1f3d] transition-all"
                style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }}
              >
                Razumijem
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
