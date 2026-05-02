import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { AppSidebar } from "./AppSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import TrialPromoCTA from "@/components/TrialPromoCTA";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import PullToRefreshIndicator from "@/components/PullToRefreshIndicator";

// Defer heavy / non-critical UI to keep the initial bundle (and FCP) lean.
const ChatAssistant = lazy(() => import("@/components/ChatAssistant"));
const CookiePreferencesModal = lazy(() => import("@/components/CookiePreferencesModal"));
const PWAInstallBanner = lazy(() => import("@/components/PWAInstallBanner"));
const PWAiOSGuide = lazy(() => import("@/components/PWAiOSGuide"));
const PWAManualGuide = lazy(() => import("@/components/PWAManualGuide"));

export default function HomeLayout() {
  const cookie = useCookieConsent();
  const pwa = usePWAInstall();

  return (
    <div className="relative min-h-screen w-full flex-col">
      <PullToRefreshIndicator />
      <AppSidebar onPWAInstall={pwa.canShowMenuEntry ? pwa.triggerManual : undefined} />
      <Header />
      <main className="flex-1 pb-16 md:pb-0" style={{ background: "hsl(215 55% 4%)" }}>
        <Outlet />
      </main>
      <Footer onOpenCookieSettings={cookie.openPreferences} />
      <MobileBottomNav />
      <Suspense fallback={null}>
        <ChatAssistant />
      </Suspense>
      <CookieConsentBanner
        showBanner={cookie.showBanner}
        acceptAll={cookie.acceptAll}
        rejectOptional={cookie.rejectOptional}
        openPreferences={cookie.openPreferences}
      />
      <Suspense fallback={null}>
        <CookiePreferencesModal
          consent={cookie.consent}
          showPreferences={cookie.showPreferences}
          closePreferences={cookie.closePreferences}
          acceptAll={cookie.acceptAll}
          rejectOptional={cookie.rejectOptional}
          saveCustom={cookie.saveCustom}
        />
        <PWAInstallBanner show={pwa.showBanner} onInstall={pwa.installAndroid} onDismiss={pwa.dismiss} />
        <PWAiOSGuide open={pwa.showIOSGuide} onClose={pwa.closeIOSGuide} onDismiss={pwa.dismiss} />
        <PWAManualGuide open={pwa.showManualGuide} onClose={pwa.closeManualGuide} />
      </Suspense>
      <TrialPromoCTA />
    </div>
  );
}
