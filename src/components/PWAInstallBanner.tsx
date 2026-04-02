import { X, Download, Share2, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.39-.59-2.93-.92-4.47-.92s-3.08.33-4.47.92L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

export default function PWAInstallBanner() {
  const { showAndroidBanner, showIOSBanner, installAndroid, dismissAndroid, dismissIOS } = usePWAInstall();

  if (!showAndroidBanner && !showIOSBanner) return null;

  if (showAndroidBanner) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[60] animate-fade-in">
        <div className="mx-auto max-w-lg p-4">
          <div className="relative rounded-2xl border border-white/10 bg-[#0B0F1A]/95 backdrop-blur-xl p-5 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
            <button onClick={dismissAndroid} className="absolute top-3 right-3 text-white/40 hover:text-white/70 transition-colors" aria-label="Zatvori">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="shrink-0 h-12 w-12 rounded-xl overflow-hidden border border-white/10">
                <img src="/icons/icon-192x192.png" alt="BalkanLink" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Instaliraj BalkanLink kao aplikaciju</p>
                <p className="text-xs text-white/50 mt-0.5">Otvori jednim dodirom sa početnog ekrana</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2">
              <AndroidIcon />
              <span className="text-xs text-white/70 font-medium">Android uređaj detektovan</span>
            </div>
            <button
              onClick={installAndroid}
              className="w-full flex items-center justify-center gap-2 rounded-full py-3 font-bold text-sm text-[#0f1f3d] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,184,0,0.35)]"
              style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }}
            >
              <Download className="h-4 w-4" />
              Instaliraj aplikaciju
            </button>
            <div className="flex gap-2 mt-3">
              <button
                onClick={dismissAndroid}
                className="flex-1 rounded-full border border-white/10 py-2 text-xs font-semibold text-white/50 hover:bg-white/5"
              >
                Ne prikazuj više
              </button>
              <button
                onClick={dismissAndroid}
                className="flex-1 rounded-full border border-white/10 py-2 text-xs font-semibold text-white/50 hover:bg-white/5"
              >
                Razumijem
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-sm font-bold text-white">Instaliraj BalkanLink kao aplikaciju</p>
                <p className="text-xs text-white/40 mt-0.5">Sačuvaj na početni ekran svog telefona</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2">
              <AppleIcon />
              <span className="text-xs text-white/70 font-medium">iPhone/iPad detektovan</span>
            </div>
            <div className="space-y-3 mb-4">
              {[
                { step: "1", text: "Otvori u Safari pregledniku" },
                { step: "2", text: <span>Klikni <Share2 className="inline h-3.5 w-3.5 mx-0.5 text-[#007AFF]" /> Share ikonu</span> },
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
