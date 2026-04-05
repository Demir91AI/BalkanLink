import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "@/components/CookieConsent";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import { AppSidebar } from "./AppSidebar";
import { DEV_MODE } from "@/lib/dev-mode";
import MobileBottomNav from "./MobileBottomNav";

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full">
      <AppSidebar />
      <div className="flex flex-col min-h-screen w-full">
        {DEV_MODE && (
          <div className="w-full h-8 flex items-center justify-center text-[12px] font-bold text-black" style={{ background: '#EAB308' }}>
            🔧 ADMIN MODE — Premium aktivan
          </div>
        )}
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <MobileBottomNav />
        <CookieConsent />
        <PWAInstallBanner />
      </div>
    </div>
  );
}
