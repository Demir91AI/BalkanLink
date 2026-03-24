import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CountryProvider } from "@/contexts/CountryContext";
import Layout from "@/components/layout/Layout";
import HomeLayout from "@/components/layout/HomeLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Disclaimer from "./pages/Disclaimer";
import KiHinweis from "./pages/KiHinweis";
import Mitgliedschaft from "./pages/Mitgliedschaft";
import Nutzungsbedingungen from "./pages/Nutzungsbedingungen";
import DSA from "./pages/DSA";
import CookieRichtlinie from "./pages/CookieRichtlinie";
import QA from "./pages/QA";
import QADetail from "./pages/QADetail";
import Directory from "./pages/Directory";
import DirectorySubmit from "./pages/DirectorySubmit";
import Missions from "./pages/Missions";
import PocniOvdje from "./pages/PocniOvdje";
import PrijavaPrebijalista from "./pages/dolazak/PrijavaPrebijalista";
import BoravisnaDozvola from "./pages/dolazak/BoravisnaDozvola";
import SteuerIdPoreznaKlasa from "./pages/dolazak/SteuerIdPoreznaKlasa";
import ZdravstvenoOsiguranje from "./pages/dolazak/ZdravstvenoOsiguranje";
import BankovniRacun from "./pages/dolazak/BankovniRacun";
import PrviKoraci from "./pages/dolazak/PrviKoraci";
import Sozialversicherung from "./pages/dolazak/Sozialversicherung";
import Rundfunkbeitrag from "./pages/dolazak/Rundfunkbeitrag";
import Fuehrerschein from "./pages/dolazak/Fuehrerschein";
import AutoAnmelden from "./pages/dolazak/AutoAnmelden";
import ZivotSavjeti from "./pages/ZivotSavjeti";
import TrebamPomoc from "./pages/TrebamPomoc";
import Formulare from "./pages/Formulare";
import FormCenter from "./pages/FormCenter";
import SmartGuide from "./pages/SmartGuide";
import Familie from "./pages/Familie";
import Foerderungen from "./pages/Foerderungen";
import Generatoren from "./pages/Generatoren";
import Wohnungen from "./pages/Wohnungen";
import Stellenangebote from "./pages/Stellenangebote";
import Premium from "./pages/Premium";
import GuideDetail from "./pages/GuideDetail";
import DokumentenCheck from "./pages/DokumentenCheck";
import AdminForms from "./pages/AdminForms";
import AdminFormMapper from "./pages/AdminFormMapper";
import BruttoNettoRechner from "./pages/BruttoNettoRechner";
import NudimTrazim from "./pages/NudimTrazim";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <LanguageProvider>
          <CountryProvider>
          <AuthProvider>
            <Routes>
              <Route element={<HomeLayout />}>
                <Route path="/" element={<Index />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/dolazak" element={<PocniOvdje />} />
                <Route path="/pocni-ovdje" element={<PocniOvdje />} />
                <Route path="/dolazak/prijava-prebivalista" element={<PrijavaPrebijalista />} />
                <Route path="/dolazak/boravisna-dozvola" element={<BoravisnaDozvola />} />
                <Route path="/dolazak/steuer-id-i-porezna-klasa" element={<SteuerIdPoreznaKlasa />} />
                <Route path="/dolazak/zdravstveno-osiguranje" element={<ZdravstvenoOsiguranje />} />
                <Route path="/dolazak/bankovni-racun" element={<BankovniRacun />} />
                <Route path="/dolazak/prvi-koraci" element={<PrviKoraci />} />
                <Route path="/dolazak/sozialversicherung" element={<Sozialversicherung />} />
                <Route path="/dolazak/rundfunkbeitrag" element={<Rundfunkbeitrag />} />
                <Route path="/dolazak/fuehrerschein" element={<Fuehrerschein />} />
                <Route path="/dolazak/auto-anmelden" element={<AutoAnmelden />} />
                <Route path="/zivot" element={<ZivotSavjeti />} />
                <Route path="/zivot-savjeti" element={<ZivotSavjeti />} />
                <Route path="/probleme" element={<TrebamPomoc />} />
                <Route path="/trebam-pomoc" element={<TrebamPomoc />} />
                <Route path="/formulare" element={<Formulare />} />
                <Route path="/formulari" element={<FormCenter />} />
                <Route path="/formulari/:slug" element={<FormCenter />} />
                <Route path="/familie" element={<Familie />} />
                <Route path="/foerderungen" element={<Foerderungen />} />
                <Route path="/tools" element={<Generatoren />} />
                <Route path="/brutto-netto-rechner" element={<BruttoNettoRechner />} />
                <Route path="/wohnungen" element={<Wohnungen />} />
                <Route path="/stellenangebote" element={<Stellenangebote />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/guide/:slug" element={<GuideDetail />} />
                <Route path="/dokumenten-check" element={<DokumentenCheck />} />
                <Route path="/admin/forms" element={<AdminForms />} />
                <Route path="/admin/forms/:slug/mapper" element={<AdminFormMapper />} />
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
                <Route path="/haftungsausschluss" element={<Disclaimer />} />
                <Route path="/ki-hinweis" element={<KiHinweis />} />
                <Route path="/mitgliedschaft" element={<Mitgliedschaft />} />
                <Route path="/nudim-trazim" element={<NudimTrazim />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
          </CountryProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
