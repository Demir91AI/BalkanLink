import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "@/components/CookieConsent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="relative min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </div>
    </SidebarProvider>
  );
}
