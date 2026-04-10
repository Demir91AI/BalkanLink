import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "@/components/CookieConsent";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import { AppSidebar } from "./AppSidebar";
import { DEV_MODE } from "@/lib/dev-mode";
import MobileBottomNav from "./MobileBottomNav";
import { Component, type ErrorInfo, type ReactNode } from "react";

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
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AppSidebar />
      <div className="flex flex-col min-h-screen w-full">
        {DEV_MODE && (
          <div className="w-full h-8 flex items-center justify-center text-[12px] font-bold text-black" style={{ background: '#EAB308' }}>
            🔧 ADMIN MODE — Premium aktivan
          </div>
        )}
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        <MobileBottomNav />
        <CookieConsent />
        <PWAInstallBanner />
      </div>
    </div>
  );
}
