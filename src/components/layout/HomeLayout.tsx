import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "@/components/CookieConsent";
import { AppSidebar } from "./AppSidebar";
import MobileBottomNav from "./MobileBottomNav";

export default function HomeLayout() {
  return (
    <div className="relative min-h-screen w-full flex-col">
      <AppSidebar />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <CookieConsent />
    </div>
  );
}
