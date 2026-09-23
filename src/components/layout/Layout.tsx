import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
import { AppSidebar } from "./AppSidebar";
import { DEV_MODE } from "@/lib/dev-mode";
import MobileBottomNav from "./MobileBottomNav";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { usePageViewTracker } from "@/hooks/usePageViewTracker";

import PWAInstallBanner from "@/components/PWAInstallBanner";
import AppUpdatePrompt from "@/components/AppUpdatePrompt";
import PWAiOSGuide from "@/components/PWAiOSGuide";
import PWAManualGuide from "@/components/PWAManualGuide";
import PWASamsungGuide from "@/components/PWASamsungGuide";
import PWAiOSOtherGuide from "@/components/PWAiOSOtherGuide";
import PullToRefreshIndicator from "@/components/PullToRefreshIndicator";
// TranslationPendingBanner removed (apr 2026): all UI strings ship fully
// translated; the platform must never advertise "translation pending".

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[BalkanLink] Uncaught error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-2xl font-bold">Ups, nešto je pošlo po krivu</p>
          <p className="text-muted-foreground">Pokušaj osvježiti stranicu.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-6 py-2.5 text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Osvježi stranicu
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Layout() {
  const cookie = useCookieConsent();
  const pwa = usePWAInstall();
  
  usePageViewTracker();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AppSidebar onPWAInstall={pwa.canShowMenuEntry ? pwa.triggerManual : undefined} />
      <div className="flex flex-col min-h-screen w-full">
        <PullToRefreshIndicator />
        {DEV_MODE && (
          <div className="w-full h-8 flex items-center justify-center text-[12px] font-bold text-black" style={{ background: '#EAB308' }}>
            🔧 ADMIN MODE — Premium aktivan
          </div>
        )}
        <Header />
        <main className="flex-1 pb-16 md:pb-0" style={{ backgroundColor: "#020617" }}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer onOpenCookieSettings={cookie.openPreferences} />
        <MobileBottomNav />
        <CookieConsentBanner
          showBanner={cookie.showBanner}
          acceptAll={cookie.acceptAll}
          rejectOptional={cookie.rejectOptional}
          openPreferences={cookie.openPreferences}
        />
        <CookiePreferencesModal
          consent={cookie.consent}
          showPreferences={cookie.showPreferences}
          closePreferences={cookie.closePreferences}
          acceptAll={cookie.acceptAll}
          rejectOptional={cookie.rejectOptional}
          saveCustom={cookie.saveCustom}
        />
        <PWAInstallBanner show={pwa.showBanner} onInstall={pwa.installAndroid} onDismiss={pwa.dismiss} />
        <PWASamsungGuide show={pwa.showSamsungGuide} onDismiss={pwa.closeSamsungGuide} />
        <PWAiOSOtherGuide show={pwa.showIOSOtherGuide} onDismiss={pwa.closeIOSOtherGuide} />
        <PWAiOSGuide open={pwa.showIOSGuide} onClose={pwa.closeIOSGuide} onDismiss={pwa.dismiss} />
        <PWAManualGuide open={pwa.showManualGuide} onClose={pwa.closeManualGuide} />
        <AppUpdatePrompt />
      </div>
    </div>
  );
}
