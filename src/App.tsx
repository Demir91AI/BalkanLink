import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

import FormCenter from "./pages/FormCenter";
import LegacyGuideRedirect from "./pages/LegacyGuideRedirect";
import Familie from "./pages/Familie";
import Foerderungen from "./pages/Foerderungen";
import Generatoren from "./pages/Generatoren";
import Wohnungen from "./pages/Wohnungen";
import Stellenangebote from "./pages/Stellenangebote";
import Premium from "./pages/Premium";

import DokumentenCheck from "./pages/DokumentenCheck";
import AdminForms from "./pages/AdminForms";
import AdminFormMapper from "./pages/AdminFormMapper";
import BruttoNettoRechner from "./pages/BruttoNettoRechner";
import NudimTrazim from "./pages/NudimTrazim";
import NachDeutschland from "./pages/NachDeutschland";
import Vorlagen from "./pages/Vorlagen";
import DeutschTrainer from "./pages/DeutschTrainer";
import TrainerPreise from "./pages/TrainerPreise";
import TrainerFaq from "./pages/TrainerFaq";
import TrainerBonusbedingungen from "./pages/TrainerBonusbedingungen";
import NotFound from "./pages/NotFound";
import FirmDetail from "./pages/FirmDetail";
import BussgeldAssistent from "./pages/BussgeldAssistent";
import KindergeldMuster from "./pages/KindergeldMuster";
import AnmeldungMuster from "./pages/muster/AnmeldungMuster";

import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import Kalkulatori from "./pages/Kalkulatori";
import CommunityMapa from "./pages/CommunityMapa";

// Musterformulare
import ElterngeldMuster from "./pages/muster/ElterngeldMuster";
import BuergergeldMuster from "./pages/muster/BuergergeldMuster";
import WohngeldMuster from "./pages/muster/WohngeldMuster";
import SteuerklasseMuster from "./pages/muster/SteuerklasseMuster";
import ArbeitslosengeldMuster from "./pages/muster/ArbeitslosengeldMuster";
import BafoegMuster from "./pages/muster/BafoegMuster";
import FuehrungszeugnisMuster from "./pages/muster/FuehrungszeugnisMuster";
import KirchenaustrittMuster from "./pages/muster/KirchenaustrittMuster";
import IntegrationskursMuster from "./pages/muster/IntegrationskursMuster";
import KinderzuschlagMuster from "./pages/muster/KinderzuschlagMuster";
import SchuelerBafoegMuster from "./pages/muster/SchuelerBafoegMuster";
import GrundsicherungMuster from "./pages/muster/GrundsicherungMuster";
import AnlageBBMuster from "./pages/muster/AnlageBBMuster";
import AnlageSVMuster from "./pages/muster/AnlageSVMuster";
import AnlageVEMuster from "./pages/muster/AnlageVEMuster";
import AnlageHGMuster from "./pages/muster/AnlageHGMuster";
import AnlageMEBMuster from "./pages/muster/AnlageMEBMuster";
import AnlageUFMuster from "./pages/muster/AnlageUFMuster";
import AnlageSEMuster from "./pages/muster/AnlageSEMuster";
import ArbeitsbescheinigungMuster from "./pages/muster/ArbeitsbescheinigungMuster";
import AntragsruecknahmeMuster from "./pages/muster/AntragsruecknahmeMuster";
import Viza from "./pages/Viza";
import ZivotUNjemackoj from "./pages/ZivotUNjemackoj";

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
                <Route path="/formulare" element={<Navigate to="/formulari" replace />} />
                <Route path="/formulari" element={<FormCenter />} />
                
                <Route path="/formulari/kindergeld/muster" element={<Navigate to="/musterformular/kindergeld" replace />} />
                <Route path="/formulari/anmeldung/muster" element={<Navigate to="/musterformular/anmeldung" replace />} />
                
                <Route path="/musterformular/elterngeld" element={<ElterngeldMuster />} />
                <Route path="/musterformular/anmeldung" element={<AnmeldungMuster />} />
                <Route path="/musterformular/buergergeld" element={<BuergergeldMuster />} />
                <Route path="/musterformular/wohngeld" element={<WohngeldMuster />} />
                <Route path="/musterformular/steuerklasse" element={<SteuerklasseMuster />} />
                <Route path="/musterformular/arbeitslosengeld" element={<ArbeitslosengeldMuster />} />
                <Route path="/musterformular/bafoeg" element={<BafoegMuster />} />
                <Route path="/musterformular/fuehrungszeugnis" element={<FuehrungszeugnisMuster />} />
                <Route path="/musterformular/kirchenaustritt" element={<KirchenaustrittMuster />} />
                <Route path="/musterformular/integrationskurs" element={<IntegrationskursMuster />} />
                <Route path="/musterformular/kinderzuschlag" element={<KinderzuschlagMuster />} />
                <Route path="/musterformular/schueler-bafoeg" element={<SchuelerBafoegMuster />} />
                <Route path="/musterformular/grundsicherung" element={<GrundsicherungMuster />} />
                <Route path="/musterformular/anlage-bb" element={<AnlageBBMuster />} />
                <Route path="/musterformular/anlage-sv" element={<AnlageSVMuster />} />
                <Route path="/musterformular/anlage-ve" element={<AnlageVEMuster />} />
                <Route path="/musterformular/anlage-hg" element={<AnlageHGMuster />} />
                <Route path="/musterformular/anlage-meb" element={<AnlageMEBMuster />} />
                <Route path="/musterformular/anlage-uf" element={<AnlageUFMuster />} />
                <Route path="/musterformular/anlage-se" element={<AnlageSEMuster />} />
                <Route path="/musterformular/arbeitsbescheinigung" element={<ArbeitsbescheinigungMuster />} />
                <Route path="/musterformular/kindergeld" element={<KindergeldMuster />} />
                <Route path="/musterformular/antragsruecknahme" element={<AntragsruecknahmeMuster />} />
                
                <Route path="/formulari/:slug" element={<FormCenter />} />
                <Route path="/familie" element={<Familie />} />
                <Route path="/foerderungen" element={<Foerderungen />} />
                <Route path="/tools" element={<Generatoren />} />
                <Route path="/brutto-netto-rechner" element={<BruttoNettoRechner />} />
                <Route path="/wohnungen" element={<Wohnungen />} />
                <Route path="/stellenangebote" element={<Stellenangebote />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/guide/:slug" element={<LegacyGuideRedirect />} />
                <Route path="/smart-guide/:slug" element={<LegacyGuideRedirect />} />
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
                <Route path="/agb" element={<Nutzungsbedingungen />} />
                <Route path="/nutzungsbedingungen" element={<Nutzungsbedingungen />} />
                <Route path="/dsa" element={<DSA />} />
                <Route path="/inhalte-melden" element={<DSA />} />
                <Route path="/cookie-richtlinie" element={<CookieRichtlinie />} />
                <Route path="/nudim-trazim" element={<NudimTrazim />} />
                <Route path="/nach-deutschland" element={<NachDeutschland />} />
                <Route path="/nach-deutschland/:countryCode" element={<NachDeutschland />} />
                <Route path="/nach-deutschland/:countryCode/:categoryKey" element={<NachDeutschland />} />
                <Route path="/vorlagen" element={<Vorlagen />} />
                <Route path="/vorlagen/:slug" element={<Vorlagen />} />
                <Route path="/deutsch-trainer" element={<DeutschTrainer />} />
                <Route path="/deutsch-trainer/preise" element={<TrainerPreise />} />
                <Route path="/deutsch-trainer/faq" element={<TrainerFaq />} />
                <Route path="/deutsch-trainer/bonusbedingungen" element={<TrainerBonusbedingungen />} />
                <Route path="/firma/:slug" element={<FirmDetail />} />
                <Route path="/bussgeld" element={<BussgeldAssistent />} />
                <Route path="/paketi" element={<Paketi />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/kalkulatori" element={<Kalkulatori />} />
                <Route path="/mapa" element={<CommunityMapa />} />
                <Route path="/zivot-u-njemackoj" element={<ZivotUNjemackoj />} />
                <Route path="/viza" element={<Viza />} />
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
