import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function HomeLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ChatAssistant />
      </div>
    </SidebarProvider>
  );
}
