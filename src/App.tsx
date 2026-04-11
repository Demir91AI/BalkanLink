import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { CountryProvider } from "@/contexts/CountryContext";
import Layout from "@/components/layout/Layout";
import HomeLayout from "@/components/layout/HomeLayout";
import AdminGuard from "@/components/AdminGuard";
import Index from "./pages/Index";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const KiHinweis = lazy(() => import("./pages/KiHinweis"));
const Mitgliedschaft = lazy(() => import("./pages/Mitgliedschaft"));
const Nutzungsbedingungen = lazy(() => import("./pages/Nutzungsbedingungen"));
const DSA = lazy(() => import("./pages/DSA"));
const CookieRichtlinie = lazy(() => import("./pages/CookieRichtlinie"));
const AdminForms = lazy(() => import("./pages/AdminForms"));
const AdminFormMapper = lazy(() => import("./pages/AdminFormMapper"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
const Premium = lazy(() => import("./pages/Premium"));
const Paketi = lazy(() => import("./pages/Paketi"));
const Profil = lazy(() => import("./pages/Profil"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function RemovedContentRedirect() {
  return <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Index />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/premium" element={<Premium />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/paketi" element={<Paketi />} />
        <Route path="/pricing" element={<Navigate to="/paketi" replace />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route element={<AdminGuard />}>
          <Route path="/admin/forms" element={<AdminForms />} />
          <Route path="/admin/forms/:slug/mapper" element={<AdminFormMapper />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        
        <Route path="/ki-hinweis" element={<KiHinweis />} />
        <Route path="/mitgliedschaft" element={<Mitgliedschaft />} />
        <Route path="/agb" element={<Nutzungsbedingungen />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/cookie-richtlinie" element={<CookieRichtlinie />} />

        <Route path="/dolazak/*" element={<RemovedContentRedirect />} />
        <Route path="/zivot" element={<RemovedContentRedirect />} />
        <Route path="/probleme" element={<RemovedContentRedirect />} />
        <Route path="/formulare/*" element={<RemovedContentRedirect />} />
        <Route path="/formulari/*" element={<RemovedContentRedirect />} />
        <Route path="/familie" element={<RemovedContentRedirect />} />
        <Route path="/foerderungen" element={<RemovedContentRedirect />} />
        <Route path="/tools" element={<RemovedContentRedirect />} />
        <Route path="/brutto-netto-rechner" element={<RemovedContentRedirect />} />
        <Route path="/wohnungen" element={<RemovedContentRedirect />} />
        <Route path="/stellenangebote" element={<RemovedContentRedirect />} />
        <Route path="/dokumenten-check" element={<RemovedContentRedirect />} />
        <Route path="/guide/:slug" element={<RemovedContentRedirect />} />
        <Route path="/smart-guide/:slug" element={<RemovedContentRedirect />} />
        <Route path="/qa/*" element={<RemovedContentRedirect />} />
        <Route path="/directory/*" element={<RemovedContentRedirect />} />
        <Route path="/ambasade-konzulati" element={<RemovedContentRedirect />} />
        <Route path="/nudim-trazim" element={<RemovedContentRedirect />} />
        <Route path="/nach-deutschland/*" element={<RemovedContentRedirect />} />
        <Route path="/vorlagen/*" element={<RemovedContentRedirect />} />
        <Route path="/deutsch-trainer/*" element={<RemovedContentRedirect />} />
        <Route path="/firma/:slug" element={<RemovedContentRedirect />} />
        <Route path="/bussgeld" element={<RemovedContentRedirect />} />
        <Route path="/ai-asistent" element={<RemovedContentRedirect />} />
        <Route path="/kalkulatori" element={<RemovedContentRedirect />} />
        <Route path="/mapa" element={<RemovedContentRedirect />} />
        <Route path="/zivot-u-njemackoj" element={<RemovedContentRedirect />} />
        <Route path="/viza" element={<RemovedContentRedirect />} />
        <Route path="/oglasi" element={<RemovedContentRedirect />} />
        <Route path="/deutsch" element={<RemovedContentRedirect />} />
        <Route path="/sabloni" element={<RemovedContentRedirect />} />
        <Route path="/pitanja" element={<RemovedContentRedirect />} />
        <Route path="/zivot-savjeti" element={<RemovedContentRedirect />} />
        <Route path="/trebam-pomoc" element={<RemovedContentRedirect />} />
        <Route path="/pocni-ovdje" element={<RemovedContentRedirect />} />
        <Route path="/ambasade" element={<RemovedContentRedirect />} />
        <Route path="/placanje-uspjesno" element={<RemovedContentRedirect />} />
        <Route path="/placanje-otkazano" element={<RemovedContentRedirect />} />
        <Route path="/nutzungsbedingungen" element={<Navigate to="/agb" replace />} />
        <Route path="/haftungsausschluss" element={<Navigate to="/disclaimer" replace />} />
        <Route path="/inhalte-melden" element={<Navigate to="/dsa" replace />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CountryProvider>
          <AuthProvider>
            <Suspense fallback={null}>
              <AppRoutes />
            </Suspense>
          </AuthProvider>
        </CountryProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
