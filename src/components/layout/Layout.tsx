import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatAssistant from "@/components/ChatAssistant";
import CountryNavBar from "@/components/CountryNavBar";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CountryNavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}
