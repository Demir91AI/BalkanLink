import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatAssistant from "@/components/ChatAssistant";
import CookieConsent from "@/components/CookieConsent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function HomeLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <div className="md:hidden">
          <AppSidebar />
        </div>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ChatAssistant />
        <CookieConsent />
      </div>
    </SidebarProvider>
  );
}
