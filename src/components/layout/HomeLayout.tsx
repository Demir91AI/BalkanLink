import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatAssistant from "@/components/ChatAssistant";
import CookieConsent from "@/components/CookieConsent";
import { AppSidebar } from "./AppSidebar";

export default function HomeLayout() {
  return (
    <div className="relative min-h-screen w-full flex-col">
      <AppSidebar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
      <CookieConsent />
    </div>
  );
}
