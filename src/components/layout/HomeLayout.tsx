import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { AppSidebar } from "./AppSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import TrialPromoCTA from "@/components/TrialPromoCTA";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import PWAiOSGuide from "@/components/PWAiOSGuide";
import PWAManualGuide from "@/components/PWAManualGuide";
import PullToRefreshIndicator from "@/components/PullToRefreshIndicator";

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
      <ChatAssistant />
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
      <PWAiOSGuide open={pwa.showIOSGuide} onClose={pwa.closeIOSGuide} onDismiss={pwa.dismiss} />
      <PWAManualGuide open={pwa.showManualGuide} onClose={pwa.closeManualGuide} />
      <TrialPromoCTA />
    </div>
  );
}
