import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Disclaimer from "./pages/Disclaimer";
import QA from "./pages/QA";
import QADetail from "./pages/QADetail";
import Directory from "./pages/Directory";
import DirectorySubmit from "./pages/DirectorySubmit";
import Missions from "./pages/Missions";
import PocniOvdje from "./pages/PocniOvdje";
import ZivotSavjeti from "./pages/ZivotSavjeti";
import TrebamPomoc from "./pages/TrebamPomoc";
import Formulare from "./pages/Formulare";
import Familie from "./pages/Familie";
import Foerderungen from "./pages/Foerderungen";
import Generatoren from "./pages/Generatoren";
import Wohnungen from "./pages/Wohnungen";
import Stellenangebote from "./pages/Stellenangebote";
import Premium from "./pages/Premium";
import Community from "./pages/Community";
import GuideDetail from "./pages/GuideDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/dolazak" element={<PocniOvdje />} />
                <Route path="/pocni-ovdje" element={<PocniOvdje />} />
                <Route path="/zivot" element={<ZivotSavjeti />} />
                <Route path="/zivot-savjeti" element={<ZivotSavjeti />} />
                <Route path="/probleme" element={<TrebamPomoc />} />
                <Route path="/trebam-pomoc" element={<TrebamPomoc />} />
                <Route path="/formulare" element={<Formulare />} />
                <Route path="/familie" element={<Familie />} />
                <Route path="/foerderungen" element={<Foerderungen />} />
                <Route path="/tools" element={<Generatoren />} />
                <Route path="/generatoren" element={<Generatoren />} />
                <Route path="/wohnungen" element={<Wohnungen />} />
                <Route path="/stellenangebote" element={<Stellenangebote />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/community" element={<Community />} />
                <Route path="/guide/:slug" element={<GuideDetail />} />
                <Route path="/qa" element={<QA />} />
                <Route path="/qa/:id" element={<QADetail />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/directory/submit" element={<DirectorySubmit />} />
                <Route path="/ambasade-konzulati" element={<Missions />} />
                <Route path="/ambasade" element={<Missions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
