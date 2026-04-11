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

/* Auth & Account */
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profil = lazy(() => import("./pages/Profil"));

/* Pricing & Payment */
const Paketi = lazy(() => import("./pages/Paketi"));
const Premium = lazy(() => import("./pages/Premium"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));

/* Legal */
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const KiHinweis = lazy(() => import("./pages/KiHinweis"));
const Mitgliedschaft = lazy(() => import("./pages/Mitgliedschaft"));
const Nutzungsbedingungen = lazy(() => import("./pages/Nutzungsbedingungen"));
const DSA = lazy(() => import("./pages/DSA"));
const CookieRichtlinie = lazy(() => import("./pages/CookieRichtlinie"));

/* Main features */
const FormCenter = lazy(() => import("./pages/FormCenter"));
const Viza = lazy(() => import("./pages/Viza"));
const Kalkulatori = lazy(() => import("./pages/Kalkulatori"));
const BruttoNettoRechner = lazy(() => import("./pages/BruttoNettoRechner"));
const DeutschTrainer = lazy(() => import("./pages/DeutschTrainer"));
const NudimTrazim = lazy(() => import("./pages/NudimTrazim"));
const CommunityMapa = lazy(() => import("./pages/CommunityMapa"));
const DokumentenCheck = lazy(() => import("./pages/DokumentenCheck"));
const Wohnungen = lazy(() => import("./pages/Wohnungen"));
const Stellenangebote = lazy(() => import("./pages/Stellenangebote"));
const Vorlagen = lazy(() => import("./pages/Vorlagen"));
const QA = lazy(() => import("./pages/QA"));
const QADetail = lazy(() => import("./pages/QADetail"));
const Directory = lazy(() => import("./pages/Directory"));
const DirectorySubmit = lazy(() => import("./pages/DirectorySubmit"));
const FirmDetail = lazy(() => import("./pages/FirmDetail"));
const ZivotSavjeti = lazy(() => import("./pages/ZivotSavjeti"));
const TrebamPomoc = lazy(() => import("./pages/TrebamPomoc"));
const Foerderungen = lazy(() => import("./pages/Foerderungen"));
const Familie = lazy(() => import("./pages/Familie"));
const BussgeldAssistent = lazy(() => import("./pages/BussgeldAssistent"));
const Missions = lazy(() => import("./pages/Missions"));
const ZivotUNjemackoj = lazy(() => import("./pages/ZivotUNjemackoj"));
const NachDeutschland = lazy(() => import("./pages/NachDeutschland"));
const PocniOvdje = lazy(() => import("./pages/PocniOvdje"));
const LegacyGuideRedirect = lazy(() => import("./pages/LegacyGuideRedirect"));

/* Dolazak sub-pages */
const PrviKoraci = lazy(() => import("./pages/dolazak/PrviKoraci"));
const PrijavaPrebijalista = lazy(() => import("./pages/dolazak/PrijavaPrebijalista"));
const BankovniRacun = lazy(() => import("./pages/dolazak/BankovniRacun"));
const ZdravstvenoOsiguranje = lazy(() => import("./pages/dolazak/ZdravstvenoOsiguranje"));
const SteuerIdPoreznaKlasa = lazy(() => import("./pages/dolazak/SteuerIdPoreznaKlasa"));
const BoravisnaDozvola = lazy(() => import("./pages/dolazak/BoravisnaDozvola"));
const Sozialversicherung = lazy(() => import("./pages/dolazak/Sozialversicherung"));
const Rundfunkbeitrag = lazy(() => import("./pages/dolazak/Rundfunkbeitrag"));
const AutoAnmelden = lazy(() => import("./pages/dolazak/AutoAnmelden"));
const Fuehrerschein = lazy(() => import("./pages/dolazak/Fuehrerschein"));

/* Admin */
const AdminForms = lazy(() => import("./pages/AdminForms"));
const AdminFormMapper = lazy(() => import("./pages/AdminFormMapper"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* Muster pages */
const AnmeldungMuster = lazy(() => import("./pages/muster/AnmeldungMuster"));
const KindergeldMuster = lazy(() => import("./pages/muster/KindergeldMuster"));
const BuergergeldMuster = lazy(() => import("./pages/muster/BuergergeldMuster"));
const WohngeldMuster = lazy(() => import("./pages/muster/WohngeldMuster"));
const ElterngeldMuster = lazy(() => import("./pages/muster/ElterngeldMuster"));
const KinderzuschlagMuster = lazy(() => import("./pages/muster/KinderzuschlagMuster"));
const ArbeitslosengeldMuster = lazy(() => import("./pages/muster/ArbeitslosengeldMuster"));
const BafoegMuster = lazy(() => import("./pages/muster/BafoegMuster"));
const SchuelerBafoegMuster = lazy(() => import("./pages/muster/SchuelerBafoegMuster"));
const GrundsicherungMuster = lazy(() => import("./pages/muster/GrundsicherungMuster"));
const IntegrationskursMuster = lazy(() => import("./pages/muster/IntegrationskursMuster"));
const FuehrungszeugnisMuster = lazy(() => import("./pages/muster/FuehrungszeugnisMuster"));
const SteuerklasseMuster = lazy(() => import("./pages/muster/SteuerklasseMuster"));
const KirchenaustrittMuster = lazy(() => import("./pages/muster/KirchenaustrittMuster"));
const ArbeitsbescheinigungMuster = lazy(() => import("./pages/muster/ArbeitsbescheinigungMuster"));
const AntragsruecknahmeMuster = lazy(() => import("./pages/muster/AntragsruecknahmeMuster"));
const AnlageBBMuster = lazy(() => import("./pages/muster/AnlageBBMuster"));
const AnlageHGMuster = lazy(() => import("./pages/muster/AnlageHGMuster"));
const AnlageMEBMuster = lazy(() => import("./pages/muster/AnlageMEBMuster"));
const AnlageSEMuster = lazy(() => import("./pages/muster/AnlageSEMuster"));
const AnlageSVMuster = lazy(() => import("./pages/muster/AnlageSVMuster"));
const AnlageUFMuster = lazy(() => import("./pages/muster/AnlageUFMuster"));
const AnlageVEMuster = lazy(() => import("./pages/muster/AnlageVEMuster"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Index />} />
      </Route>
      <Route element={<Layout />}>
        {/* Pricing & Payment */}
        <Route path="/preise" element={<Paketi />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        {/* Account */}
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Legal */}
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/ki-hinweis" element={<KiHinweis />} />
        <Route path="/mitgliedschaft" element={<Mitgliedschaft />} />
        <Route path="/agb" element={<Nutzungsbedingungen />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/cookie-richtlinie" element={<CookieRichtlinie />} />

        {/* Main features */}
        <Route path="/formulare" element={<FormCenter />} />
        <Route path="/formulare/:slug" element={<FormCenter />} />
        <Route path="/visa-navigator" element={<Viza />} />
        <Route path="/rechner" element={<Kalkulatori />} />
        <Route path="/brutto-netto" element={<BruttoNettoRechner />} />
        <Route path="/deutsch-kurs" element={<DeutschTrainer />} />
        <Route path="/deutsch-kurs/:level" element={<DeutschTrainer />} />
        <Route path="/kleinanzeigen" element={<NudimTrazim />} />
        <Route path="/karte" element={<CommunityMapa />} />
        <Route path="/ki-assistent" element={<DokumentenCheck />} />
        <Route path="/dokumente" element={<DokumentenCheck />} />
        <Route path="/wohnungen" element={<Wohnungen />} />
        <Route path="/stellenangebote" element={<Stellenangebote />} />
        <Route path="/vorlagen" element={<Vorlagen />} />
        <Route path="/vorlagen/:slug" element={<Vorlagen />} />
        <Route path="/wissensdatenbank" element={<QA />} />
        <Route path="/wissensdatenbank/:id" element={<QADetail />} />
        <Route path="/verzeichnis" element={<Directory />} />
        <Route path="/verzeichnis/eintragen" element={<DirectorySubmit />} />
        <Route path="/firma/:slug" element={<FirmDetail />} />
        <Route path="/ratgeber" element={<ZivotSavjeti />} />
        <Route path="/soforthilfe" element={<TrebamPomoc />} />
        <Route path="/foerderungen" element={<Foerderungen />} />
        <Route path="/familie" element={<Familie />} />
        <Route path="/bussgeld" element={<BussgeldAssistent />} />
        <Route path="/botschaften" element={<Missions />} />
        <Route path="/leben-in-deutschland" element={<ZivotUNjemackoj />} />
        <Route path="/nach-deutschland" element={<NachDeutschland />} />
        <Route path="/nach-deutschland/:step" element={<NachDeutschland />} />
        <Route path="/erste-schritte" element={<PocniOvdje />} />

        {/* Arrival sub-pages */}
        <Route path="/ankunft/erste-schritte" element={<PrviKoraci />} />
        <Route path="/ankunft/anmeldung" element={<PrijavaPrebijalista />} />
        <Route path="/ankunft/bankkonto" element={<BankovniRacun />} />
        <Route path="/ankunft/krankenversicherung" element={<ZdravstvenoOsiguranje />} />
        <Route path="/ankunft/steuer-id" element={<SteuerIdPoreznaKlasa />} />
        <Route path="/ankunft/aufenthaltserlaubnis" element={<BoravisnaDozvola />} />
        <Route path="/ankunft/sozialversicherung" element={<Sozialversicherung />} />
        <Route path="/ankunft/rundfunkbeitrag" element={<Rundfunkbeitrag />} />
        <Route path="/ankunft/auto-anmelden" element={<AutoAnmelden />} />
        <Route path="/ankunft/fuehrerschein" element={<Fuehrerschein />} />

        {/* Guide redirect */}
        <Route path="/guide/:slug" element={<LegacyGuideRedirect />} />
        <Route path="/smart-guide/:slug" element={<LegacyGuideRedirect />} />

        {/* Muster (form templates) */}
        <Route path="/muster/anmeldung" element={<AnmeldungMuster />} />
        <Route path="/muster/kindergeld" element={<KindergeldMuster />} />
        <Route path="/muster/buergergeld" element={<BuergergeldMuster />} />
        <Route path="/muster/wohngeld" element={<WohngeldMuster />} />
        <Route path="/muster/elterngeld" element={<ElterngeldMuster />} />
        <Route path="/muster/kinderzuschlag" element={<KinderzuschlagMuster />} />
        <Route path="/muster/arbeitslosengeld" element={<ArbeitslosengeldMuster />} />
        <Route path="/muster/bafoeg" element={<BafoegMuster />} />
        <Route path="/muster/schueler-bafoeg" element={<SchuelerBafoegMuster />} />
        <Route path="/muster/grundsicherung" element={<GrundsicherungMuster />} />
        <Route path="/muster/integrationskurs" element={<IntegrationskursMuster />} />
        <Route path="/muster/fuehrungszeugnis" element={<FuehrungszeugnisMuster />} />
        <Route path="/muster/steuerklasse" element={<SteuerklasseMuster />} />
        <Route path="/muster/kirchenaustritt" element={<KirchenaustrittMuster />} />
        <Route path="/muster/arbeitsbescheinigung" element={<ArbeitsbescheinigungMuster />} />
        <Route path="/muster/antragsruecknahme" element={<AntragsruecknahmeMuster />} />
        <Route path="/muster/anlage-bb" element={<AnlageBBMuster />} />
        <Route path="/muster/anlage-hg" element={<AnlageHGMuster />} />
        <Route path="/muster/anlage-meb" element={<AnlageMEBMuster />} />
        <Route path="/muster/anlage-se" element={<AnlageSEMuster />} />
        <Route path="/muster/anlage-sv" element={<AnlageSVMuster />} />
        <Route path="/muster/anlage-uf" element={<AnlageUFMuster />} />
        <Route path="/muster/anlage-ve" element={<AnlageVEMuster />} />

        {/* Admin */}
        <Route element={<AdminGuard />}>
          <Route path="/admin/forms" element={<AdminForms />} />
          <Route path="/admin/forms/:slug/mapper" element={<AdminFormMapper />} />
        </Route>

        {/* Legacy BHS redirects to new German paths */}
        <Route path="/paketi" element={<Navigate to="/preise" replace />} />
        <Route path="/pricing" element={<Navigate to="/preise" replace />} />
        <Route path="/viza" element={<Navigate to="/visa-navigator" replace />} />
        <Route path="/kalkulatori" element={<Navigate to="/rechner" replace />} />
        <Route path="/mapa" element={<Navigate to="/karte" replace />} />
        <Route path="/ai-asistent" element={<Navigate to="/ki-assistent" replace />} />
        <Route path="/nudim-trazim" element={<Navigate to="/kleinanzeigen" replace />} />
        <Route path="/deutsch-trainer" element={<Navigate to="/deutsch-kurs" replace />} />
        <Route path="/deutsch-trainer/:level" element={<Navigate to="/deutsch-kurs" replace />} />
        <Route path="/dokumenten-check" element={<Navigate to="/dokumente" replace />} />
        <Route path="/dolazak/prvi-koraci" element={<Navigate to="/ankunft/erste-schritte" replace />} />
        <Route path="/dolazak/prijava-prebivalista" element={<Navigate to="/ankunft/anmeldung" replace />} />
        <Route path="/dolazak/bankovni-racun" element={<Navigate to="/ankunft/bankkonto" replace />} />
        <Route path="/dolazak/zdravstveno-osiguranje" element={<Navigate to="/ankunft/krankenversicherung" replace />} />
        <Route path="/dolazak/steuer-id" element={<Navigate to="/ankunft/steuer-id" replace />} />
        <Route path="/dolazak/boravisna-dozvola" element={<Navigate to="/ankunft/aufenthaltserlaubnis" replace />} />
        <Route path="/dolazak/sozialversicherung" element={<Navigate to="/ankunft/sozialversicherung" replace />} />
        <Route path="/dolazak/rundfunkbeitrag" element={<Navigate to="/ankunft/rundfunkbeitrag" replace />} />
        <Route path="/dolazak/auto-anmelden" element={<Navigate to="/ankunft/auto-anmelden" replace />} />
        <Route path="/dolazak/fuehrerschein" element={<Navigate to="/ankunft/fuehrerschein" replace />} />
        <Route path="/zivot-u-njemackoj" element={<Navigate to="/leben-in-deutschland" replace />} />
        <Route path="/zivot-savjeti" element={<Navigate to="/ratgeber" replace />} />
        <Route path="/trebam-pomoc" element={<Navigate to="/soforthilfe" replace />} />
        <Route path="/pocni-ovdje" element={<Navigate to="/erste-schritte" replace />} />
        <Route path="/qa" element={<Navigate to="/wissensdatenbank" replace />} />
        <Route path="/qa/:id" element={<Navigate to="/wissensdatenbank" replace />} />
        <Route path="/directory" element={<Navigate to="/verzeichnis" replace />} />
        <Route path="/directory/submit" element={<Navigate to="/verzeichnis/eintragen" replace />} />
        <Route path="/ambasade-konzulati" element={<Navigate to="/botschaften" replace />} />
        <Route path="/ambasade" element={<Navigate to="/botschaften" replace />} />
        <Route path="/formulari/*" element={<Navigate to="/formulare" replace />} />
        <Route path="/oglasi" element={<Navigate to="/kleinanzeigen" replace />} />
        <Route path="/sabloni" element={<Navigate to="/vorlagen" replace />} />
        <Route path="/pitanja" element={<Navigate to="/wissensdatenbank" replace />} />
        <Route path="/placanje-uspjesno" element={<Navigate to="/payment-success" replace />} />
        <Route path="/placanje-otkazano" element={<Navigate to="/payment-cancel" replace />} />
        <Route path="/nutzungsbedingungen" element={<Navigate to="/agb" replace />} />
        <Route path="/haftungsausschluss" element={<Navigate to="/disclaimer" replace />} />
        <Route path="/inhalte-melden" element={<Navigate to="/dsa" replace />} />
        <Route path="/brutto-netto-rechner" element={<Navigate to="/brutto-netto" replace />} />
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
