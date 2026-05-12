import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import LanguageRouter from "@/components/LanguageRouter";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CountryProvider } from "@/contexts/CountryContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Layout from "@/components/layout/Layout";
import HomeLayout from "@/components/layout/HomeLayout";
import AdminGuard from "@/components/AdminGuard";
import Index from "./pages/Index";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const NapomenaOKI = lazy(() => import("./pages/NapomenaOKI"));
const Mitgliedschaft = lazy(() => import("./pages/Mitgliedschaft"));
const Nutzungsbedingungen = lazy(() => import("./pages/Nutzungsbedingungen"));
const DSA = lazy(() => import("./pages/DSA"));
const CookieRichtlinie = lazy(() => import("./pages/CookieRichtlinie"));
const QA = lazy(() => import("./pages/QA"));
const QADetail = lazy(() => import("./pages/QADetail"));
const Directory = lazy(() => import("./pages/Directory"));
const DirectorySubmit = lazy(() => import("./pages/DirectorySubmit"));
const Missions = lazy(() => import("./pages/Missions"));
const PocniOvdje = lazy(() => import("./pages/PocniOvdje"));
const PrijavaPrebijalista = lazy(() => import("./pages/dolazak/PrijavaPrebijalista"));
const BoravisnaDozvola = lazy(() => import("./pages/dolazak/BoravisnaDozvola"));
const SteuerIdPoreznaKlasa = lazy(() => import("./pages/dolazak/SteuerIdPoreznaKlasa"));
const ZdravstvenoOsiguranje = lazy(() => import("./pages/dolazak/ZdravstvenoOsiguranje"));
const BankovniRacun = lazy(() => import("./pages/dolazak/BankovniRacun"));
const PrviKoraci = lazy(() => import("./pages/dolazak/PrviKoraci"));
const Sozialversicherung = lazy(() => import("./pages/dolazak/Sozialversicherung"));
const Rundfunkbeitrag = lazy(() => import("./pages/dolazak/Rundfunkbeitrag"));
const Fuehrerschein = lazy(() => import("./pages/dolazak/Fuehrerschein"));
const AutoAnmelden = lazy(() => import("./pages/dolazak/AutoAnmelden"));
const ZivotSavjeti = lazy(() => import("./pages/ZivotSavjeti"));
const TrebamPomoc = lazy(() => import("./pages/TrebamPomoc"));
const FormCenter = lazy(() => import("./pages/FormCenter"));
const LegacyGuideRedirect = lazy(() => import("./pages/LegacyGuideRedirect"));
const Familie = lazy(() => import("./pages/Familie"));
const Foerderungen = lazy(() => import("./pages/Foerderungen"));
const Generatoren = lazy(() => import("./pages/Generatoren"));
const Wohnungen = lazy(() => import("./pages/Wohnungen"));
const Stellenangebote = lazy(() => import("./pages/Stellenangebote"));
const DokumentenCheck = lazy(() => import("./pages/DokumentenCheck"));
const NebenkostenScan = lazy(() => import("./pages/NebenkostenScan"));
const AdminForms = lazy(() => import("./pages/AdminForms"));
const AdminFormMapper = lazy(() => import("./pages/AdminFormMapper"));
const AdminTrialovi = lazy(() => import("./pages/AdminTrialovi"));
const BruttoNettoRechner = lazy(() => import("./pages/BruttoNettoRechner"));
const NudimTrazim = lazy(() => import("./pages/NudimTrazim"));
const NachDeutschland = lazy(() => import("./pages/NachDeutschland"));
const Vorlagen = lazy(() => import("./pages/Vorlagen"));
const DeutschTrainer = lazy(() => import("./pages/DeutschTrainer"));
const TrainerPreise = lazy(() => import("./pages/TrainerPreise"));
const TrainerFaq = lazy(() => import("./pages/TrainerFaq"));
const TrainerBonusbedingungen = lazy(() => import("./pages/TrainerBonusbedingungen"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FirmDetail = lazy(() => import("./pages/FirmDetail"));
const BussgeldAssistent = lazy(() => import("./pages/BussgeldAssistent"));
const ChatAssistant = lazy(() => import("./components/ChatAssistant"));
const AntragGenericMuster = lazy(() => import("./pages/muster/AntragGenericMuster"));
const KindergeldPreviewWindow = lazy(() => import("./pages/muster/KindergeldPreviewWindow"));
const AnmeldungMuster = lazy(() => import("./pages/muster/AnmeldungMuster"));
const WhatIsBalkanLink = lazy(() => import("./components/WhatIsBalkanLink"));

const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
const Kalkulatori = lazy(() => import("./pages/Kalkulatori"));

const ElterngeldMuster = lazy(() => import("./pages/muster/ElterngeldMuster"));
const KindergeldMuster = lazy(() => import("./pages/muster/KindergeldMuster"));
const WirtschaftlicheJugendhilfeMuster = lazy(() => import("./pages/muster/WirtschaftlicheJugendhilfeMuster"));
const BuergergeldMuster = lazy(() => import("./pages/muster/BuergergeldMuster"));
const WohngeldMuster = lazy(() => import("./pages/muster/WohngeldMuster"));
const SteuerklasseMuster = lazy(() => import("./pages/muster/SteuerklasseMuster"));
const ArbeitslosengeldMuster = lazy(() => import("./pages/muster/ArbeitslosengeldMuster"));
const BafoegMuster = lazy(() => import("./pages/muster/BafoegMuster"));
const FuehrungszeugnisMuster = lazy(() => import("./pages/muster/FuehrungszeugnisMuster"));
const KirchenaustrittMuster = lazy(() => import("./pages/muster/KirchenaustrittMuster"));
const IntegrationskursMuster = lazy(() => import("./pages/muster/IntegrationskursMuster"));
const KinderzuschlagMuster = lazy(() => import("./pages/muster/KinderzuschlagMuster"));
const SchuelerBafoegMuster = lazy(() => import("./pages/muster/SchuelerBafoegMuster"));
const GrundsicherungMuster = lazy(() => import("./pages/muster/GrundsicherungMuster"));
const AnlageBBMuster = lazy(() => import("./pages/muster/AnlageBBMuster"));
const AnlageSVMuster = lazy(() => import("./pages/muster/AnlageSVMuster"));
const AnlageVEMuster = lazy(() => import("./pages/muster/AnlageVEMuster"));
const AnlageHGMuster = lazy(() => import("./pages/muster/AnlageHGMuster"));
const AnlageMEBMuster = lazy(() => import("./pages/muster/AnlageMEBMuster"));
const AnlageUFMuster = lazy(() => import("./pages/muster/AnlageUFMuster"));
const AnlageSEMuster = lazy(() => import("./pages/muster/AnlageSEMuster"));
const ArbeitsbescheinigungMuster = lazy(() => import("./pages/muster/ArbeitsbescheinigungMuster"));
const AntragsruecknahmeMuster = lazy(() => import("./pages/muster/AntragsruecknahmeMuster"));
const Viza = lazy(() => import("./pages/Viza"));
const DvojnoDrzavljanstvo = lazy(() => import("./pages/DvojnoDrzavljanstvo"));
const EinbuergerungVodic = lazy(() => import("./pages/EinbuergerungVodic"));
const EinbuergerungMuster = lazy(() => import("./pages/muster/EinbuergerungMuster"));
const ZivotUNjemackoj = lazy(() => import("./pages/ZivotUNjemackoj"));
const RadnoPravo = lazy(() => import("./pages/RadnoPravo"));
const RadnoPravoGuide = lazy(() => import("./pages/RadnoPravoGuide"));
const BiznisNjemacka = lazy(() => import("./pages/BiznisNjemacka"));
const BiznisGuide = lazy(() => import("./pages/BiznisGuide"));
const Premium = lazy(() => import("./pages/Premium"));
const Paketi = lazy(() => import("./pages/Pricing"));
const Profil = lazy(() => import("./pages/Profil"));
const HistorijaPlacanja = lazy(() => import("./pages/HistorijaPlacanja"));
const MojiPodaci = lazy(() => import("./pages/MojiPodaci"));
const Mietrecht = lazy(() => import("./pages/Mietrecht"));
const SchufaSimulator = lazy(() => import("./pages/SchufaSimulator"));
const AnerkennungNavigator = lazy(() => import("./pages/AnerkennungNavigator"));
const AnerkennungFakulteti = lazy(() => import("./pages/AnerkennungFakulteti"));
const Porezi = lazy(() => import("./pages/Porezi"));
const PoreziWizard = lazy(() => import("./pages/PoreziWizard"));
const PoreziDoppelhaushalt = lazy(() => import("./pages/PoreziDoppelhaushalt"));
const PoreziDeadlines = lazy(() => import("./pages/PoreziDeadlines"));
const PoreziDeductions = lazy(() => import("./pages/PoreziDeductions"));
const PoreziElster = lazy(() => import("./pages/PoreziElster"));
const PoreziFamily = lazy(() => import("./pages/PoreziFamily"));
const PoreziStudents = lazy(() => import("./pages/PoreziStudents"));
const PoreziSelfEmployed = lazy(() => import("./pages/PoreziSelfEmployed"));
const PoreziRental = lazy(() => import("./pages/PoreziRental"));
const PoreziMistakes = lazy(() => import("./pages/PoreziMistakes"));
const CheckListe = lazy(() => import("./pages/CheckListe"));
const CheckListaDetail = lazy(() => import("./pages/CheckListaDetail"));
const AnmeldungSimulator = lazy(() => import("./pages/AnmeldungSimulator"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const PitajDijasporu = lazy(() => import("./pages/PitajDijasporu"));
const PitajDijasporuDetail = lazy(() => import("./pages/PitajDijasporuDetail"));
const AdminPitanja = lazy(() => import("./pages/admin/AdminPitanja"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ObnovaPasosPage = lazy(() => import("./pages/ObnovaPasosPage"));
const Sacuvano = lazy(() => import("./pages/Sacuvano"));

// Dev-only visual fixtures (excluded from production bundle behaviour via guard).
const VisualFlagBA = lazy(() => import("./pages/__visual/VisualFlagBA"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
});

// Refresh all cached data on every login so the user always sees up-to-date info.
if (typeof window !== "undefined") {
  window.addEventListener("bl:user-signed-in", () => {
    try {
      queryClient.invalidateQueries();
      queryClient.refetchQueries({ type: "active" });
    } catch { /* noop */ }
  });
}

function LocalizedRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<Index />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="dolazak" element={<PocniOvdje />} />
        
        <Route path="dolazak/prijava-prebivalista" element={<PrijavaPrebijalista />} />
        <Route path="dolazak/boravisna-dozvola" element={<BoravisnaDozvola />} />
        <Route path="dolazak/steuer-id-i-porezna-klasa" element={<SteuerIdPoreznaKlasa />} />
        <Route path="dolazak/zdravstveno-osiguranje" element={<ZdravstvenoOsiguranje />} />
        <Route path="dolazak/bankovni-racun" element={<BankovniRacun />} />
        <Route path="dolazak/prvi-koraci" element={<PrviKoraci />} />
        <Route path="dolazak/sozialversicherung" element={<Sozialversicherung />} />
        <Route path="dolazak/rundfunkbeitrag" element={<Rundfunkbeitrag />} />
        <Route path="dolazak/fuehrerschein" element={<Fuehrerschein />} />
        <Route path="dolazak/auto-anmelden" element={<AutoAnmelden />} />
        <Route path="zivot" element={<ZivotSavjeti />} />
        
        <Route path="probleme" element={<TrebamPomoc />} />
        
        <Route path="formulare" element={<Navigate to="../formulari" replace />} />
        <Route path="formulari" element={<FormCenter />} />
        
        <Route path="formulari/kindergeld/muster" element={<Navigate to="../../musterformular/kindergeld" replace />} />
        <Route path="formulari/anmeldung/muster" element={<Navigate to="../../musterformular/anmeldung" replace />} />
        
        <Route path="musterformular/elterngeld" element={<ElterngeldMuster />} />
        <Route path="musterformular/anmeldung" element={<AnmeldungMuster />} />
        <Route path="musterformular/buergergeld" element={<BuergergeldMuster />} />
        <Route path="musterformular/wohngeld" element={<WohngeldMuster />} />
        <Route path="musterformular/steuerklasse" element={<SteuerklasseMuster />} />
        <Route path="musterformular/arbeitslosengeld" element={<ArbeitslosengeldMuster />} />
        <Route path="musterformular/bafoeg" element={<BafoegMuster />} />
        <Route path="musterformular/fuehrungszeugnis" element={<FuehrungszeugnisMuster />} />
        <Route path="musterformular/kirchenaustritt" element={<KirchenaustrittMuster />} />
        <Route path="musterformular/integrationskurs" element={<IntegrationskursMuster />} />
        <Route path="musterformular/kinderzuschlag" element={<KinderzuschlagMuster />} />
        <Route path="musterformular/schueler-bafoeg" element={<SchuelerBafoegMuster />} />
        <Route path="musterformular/grundsicherung" element={<GrundsicherungMuster />} />
        <Route path="musterformular/anlage-bb" element={<AnlageBBMuster />} />
        <Route path="musterformular/anlage-sv" element={<AnlageSVMuster />} />
        <Route path="musterformular/anlage-ve" element={<AnlageVEMuster />} />
        <Route path="musterformular/anlage-hg" element={<AnlageHGMuster />} />
        <Route path="musterformular/anlage-meb" element={<AnlageMEBMuster />} />
        <Route path="musterformular/anlage-uf" element={<AnlageUFMuster />} />
        <Route path="musterformular/anlage-se" element={<AnlageSEMuster />} />
        <Route path="musterformular/arbeitsbescheinigung" element={<ArbeitsbescheinigungMuster />} />
        <Route path="musterformular/kindergeld" element={<KindergeldMuster />} />
        <Route path="musterformular/antrag-generic" element={<AntragGenericMuster />} />
        <Route path="musterformular/antragsruecknahme" element={<AntragsruecknahmeMuster />} />
        <Route path="musterformular/wirtschaftliche-jugendhilfe" element={<WirtschaftlicheJugendhilfeMuster />} />
        <Route path="musterformular/einbuergerung" element={<EinbuergerungMuster />} />
        
        <Route path="formulari/:slug" element={<FormCenter />} />
        <Route path="familie" element={<Familie />} />
        <Route path="foerderungen" element={<Foerderungen />} />
        <Route path="tools" element={<Generatoren />} />
        <Route path="brutto-netto-rechner" element={<BruttoNettoRechner />} />
        <Route path="wohnungen" element={<Wohnungen />} />
        <Route path="stellenangebote" element={<Stellenangebote />} />
        <Route path="premium" element={<Premium />} />
        <Route path="profil" element={<Profil />} />
        <Route path="profil/placanja" element={<HistorijaPlacanja />} />
        <Route path="historija-placanja" element={<Navigate to="../profil/placanja" replace />} />
        <Route path="moji-podaci" element={<MojiPodaci />} />
        <Route path="guide/:slug" element={<LegacyGuideRedirect />} />
        <Route path="smart-guide/:slug" element={<LegacyGuideRedirect />} />
        <Route path="dokumenten-check" element={<DokumentenCheck />} />
        <Route path="nebenkosten-scan" element={<NebenkostenScan />} />
        <Route path="rezije-skener" element={<Navigate to="../nebenkosten-scan" replace />} />
        <Route path="rezije-provjera" element={<Navigate to="../nebenkosten-scan" replace />} />
        <Route path="schufa-simulator" element={<SchufaSimulator />} />
        <Route path="bonitet" element={<Navigate to="../schufa-simulator" replace />} />
        <Route path="anerkennung-navigator" element={<AnerkennungNavigator />} />
        <Route path="priznavanje-diplome" element={<Navigate to="../anerkennung-navigator" replace />} />
        <Route path="anerkennung-fakulteti" element={<AnerkennungFakulteti />} />
        <Route path="priznavanje-fakulteta" element={<Navigate to="../anerkennung-fakulteti" replace />} />
        <Route path="anerkennung-hochschulen" element={<Navigate to="../anerkennung-fakulteti" replace />} />
        {/* Porezi (Tax) — landing hub. Same component, two slugs so /de/steuern works. */}
        <Route path="porezi" element={<Porezi />} />
        <Route path="steuern" element={<Porezi />} />
        {/* Tax Wizard — slug differs per language; all four route to same component. */}
        <Route path="porezi/da-li-moram" element={<PoreziWizard />} />
        <Route path="porezi/moram-li-uopce" element={<PoreziWizard />} />
        <Route path="steuern/muss-ich-ueberhaupt" element={<PoreziWizard />} />
        {/* DHF — Doppelte Haushaltsführung modul */}
        <Route path="porezi/dvostruko-domacinstvo" element={<PoreziDoppelhaushalt />} />
        <Route path="porezi/dvostruko-kucanstvo" element={<PoreziDoppelhaushalt />} />
        <Route path="steuern/doppelte-haushaltsfuehrung" element={<PoreziDoppelhaushalt />} />
        {/* Deadlines */}
        <Route path="porezi/rokovi-i-kazne" element={<PoreziDeadlines />} />
        <Route path="steuern/fristen-und-strafen" element={<PoreziDeadlines />} />
        {/* Deductions */}
        <Route path="porezi/sta-mogu-odbiti" element={<PoreziDeductions />} />
        <Route path="porezi/sto-mogu-odbiti" element={<PoreziDeductions />} />
        <Route path="steuern/was-kann-ich-absetzen" element={<PoreziDeductions />} />
        {/* ELSTER guide */}
        <Route path="porezi/elster-vodic" element={<PoreziElster />} />
        <Route path="steuern/elster-anleitung" element={<PoreziElster />} />
        {/* Family */}
        <Route path="porezi/porodica-i-klase" element={<PoreziFamily />} />
        <Route path="porezi/obitelj-i-klase" element={<PoreziFamily />} />
        <Route path="steuern/familie-und-steuerklassen" element={<PoreziFamily />} />
        {/* Students */}
        <Route path="porezi/studenti-i-pripravnici" element={<PoreziStudents />} />
        <Route path="porezi/studenti-i-naucnici" element={<PoreziStudents />} />
        <Route path="steuern/studenten-und-azubis" element={<PoreziStudents />} />
        {/* Self-employed */}
        <Route path="porezi/samostalni-i-freelancer" element={<PoreziSelfEmployed />} />
        <Route path="steuern/selbststaendige-und-freelancer" element={<PoreziSelfEmployed />} />
        {/* Rental */}
        <Route path="porezi/prihodi-od-izdavanja" element={<PoreziRental />} />
        <Route path="porezi/prihodi-od-najma" element={<PoreziRental />} />
        <Route path="steuern/mieteinkuenfte" element={<PoreziRental />} />
        {/* Mistakes */}
        <Route path="porezi/najcesce-greske" element={<PoreziMistakes />} />
        {/* Premium Checklists hub + detail */}
        <Route path="check-liste" element={<CheckListe />} />
        <Route path="check-liste/:slug" element={<CheckListaDetail />} />
        <Route path="checklisten" element={<CheckListe />} />
        <Route path="checklisten/:slug" element={<CheckListaDetail />} />
        {/* Anmeldung Simulator — interaktivni intervju */}
        <Route path="anmeldung-simulator" element={<AnmeldungSimulator />} />
        <Route path="anmeldung-simulation" element={<AnmeldungSimulator />} />
        <Route path="pitaj-dijasporu" element={<PitajDijasporu />} />
        <Route path="pitaj-dijasporu/:id" element={<PitajDijasporuDetail />} />
        <Route path="frag-die-diaspora" element={<PitajDijasporu />} />
        <Route path="porezi/najceste-pogreske" element={<PoreziMistakes />} />
        <Route path="steuern/haeufigste-fehler" element={<PoreziMistakes />} />
        <Route element={<AdminGuard />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/forms" element={<AdminForms />} />
          <Route path="admin/forms/:slug/mapper" element={<AdminFormMapper />} />
          <Route path="admin/trialovi" element={<AdminTrialovi />} />
          <Route path="admin/pitanja" element={<AdminPitanja />} />
        </Route>
        <Route path="qa" element={<QA />} />
        <Route path="qa/:id" element={<QADetail />} />
        <Route path="directory" element={<Directory />} />
        <Route path="directory/submit" element={<DirectorySubmit />} />
        <Route path="ambasade-konzulati" element={<Missions />} />
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="impressum" element={<Impressum />} />
        <Route path="datenschutz" element={<Datenschutz />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        
        <Route path="napomena-o-ki" element={<NapomenaOKI />} />
        <Route path="mitgliedschaft" element={<Mitgliedschaft />} />
        <Route path="agb" element={<Nutzungsbedingungen />} />
        
        <Route path="dsa" element={<DSA />} />
        
        <Route path="cookie-richtlinie" element={<CookieRichtlinie />} />
        <Route path="unsubscribe" element={<Unsubscribe />} />
        <Route path="email-preferences/unsubscribe" element={<Unsubscribe />} />
        <Route path="nudim-trazim" element={<NudimTrazim />} />
        <Route path="nach-deutschland" element={<NachDeutschland />} />
        <Route path="nach-deutschland/:countryCode" element={<NachDeutschland />} />
        <Route path="nach-deutschland/:countryCode/:categoryKey" element={<NachDeutschland />} />
        <Route path="vorlagen" element={<Vorlagen />} />
        <Route path="vorlagen/:slug" element={<Vorlagen />} />
        <Route path="deutsch-trainer" element={<DeutschTrainer />} />
        <Route path="deutsch-trainer/preise" element={<TrainerPreise />} />
        <Route path="deutsch-trainer/faq" element={<TrainerFaq />} />
        <Route path="deutsch-trainer/bonusbedingungen" element={<TrainerBonusbedingungen />} />
        <Route path="firma/:slug" element={<FirmDetail />} />
        <Route path="bussgeld" element={<BussgeldAssistent />} />
        <Route path="ai-asistent" element={<ChatAssistant />} />
        <Route path="asistent" element={<Navigate to="../ai-asistent" replace />} />
        <Route path="assistent" element={<Navigate to="../ai-asistent" replace />} />
        <Route path="assistant" element={<Navigate to="../ai-asistent" replace />} />
        <Route path="paketi" element={<Paketi />} />
        <Route path="pricing" element={<Navigate to="../paketi" replace />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="placanje-uspjesno" element={<PaymentSuccess />} />
        <Route path="placanje-otkazano" element={<PaymentCancel />} />
        <Route path="kalkulatori" element={<Kalkulatori />} />
        
        <Route path="zivot-u-njemackoj" element={<ZivotUNjemackoj />} />
        <Route path="viza" element={<Viza />} />
        <Route path="dvojno-drzavljanstvo" element={<DvojnoDrzavljanstvo />} />
        <Route path="dvojno-drzavljanstvo/einbuergerung-vodic" element={<EinbuergerungVodic />} />
        <Route path="doppelte-staatsbuergerschaft" element={<Navigate to="../dvojno-drzavljanstvo" replace />} />
        <Route path="radno-pravo" element={<RadnoPravo />} />
        <Route path="radno-pravo/:slug" element={<RadnoPravoGuide />} />
        <Route path="biznis" element={<BiznisNjemacka />} />
        <Route path="biznis/:slug" element={<BiznisGuide />} />
        <Route path="mietrecht" element={<Mietrecht />} />
        <Route path="obnova-pasosa" element={<ObnovaPasosPage />} />
        <Route path="sacuvano" element={<Sacuvano />} />
        <Route path="gespeichert" element={<Sacuvano />} />
        <Route path="spremljeno" element={<Sacuvano />} />
        <Route path="sacuvane-stavke" element={<Sacuvano />} />
        <Route path="pass-erneuern" element={<Navigate to="../obnova-pasosa" replace />} />
        <Route path="oglasi" element={<Navigate to="../nudim-trazim" replace />} />
        <Route path="deutsch" element={<Navigate to="../deutsch-trainer" replace />} />
        <Route path="sabloni" element={<Navigate to="../vorlagen" replace />} />
        <Route path="pitanja" element={<Navigate to="../qa" replace />} />
        <Route path="zivot-savjeti" element={<Navigate to="../zivot" replace />} />
        <Route path="trebam-pomoc" element={<Navigate to="../probleme" replace />} />
        <Route path="pocni-ovdje" element={<Navigate to="../dolazak" replace />} />
        <Route path="ambasade" element={<Navigate to="../ambasade-konzulati" replace />} />
        <Route path="nutzungsbedingungen" element={<Navigate to="../agb" replace />} />
        <Route path="uslovi-koristenja" element={<Navigate to="../agb" replace />} />
        <Route path="haftungsausschluss" element={<Navigate to="../disclaimer" replace />} />
        <Route path="odricanje-odgovornosti" element={<Navigate to="../disclaimer" replace />} />
        <Route path="inhalte-melden" element={<Navigate to="../dsa" replace />} />
        <Route path="ki-hinweis" element={<Navigate to="../napomena-o-ki" replace />} />
        <Route path="postavke-kolacica" element={<Navigate to="../cookie-richtlinie" replace />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {!import.meta.env.PROD && (
        <Route path="/__visual/flag-ba" element={<VisualFlagBA />} />
      )}
      {/* Standalone preview windows — no layout, no sidebar */}
      <Route path="/muster/kindergeld/preview" element={<KindergeldPreviewWindow />} />
      <Route path="/de/muster/kindergeld/preview" element={<KindergeldPreviewWindow />} />
      <Route path="/hr/muster/kindergeld/preview" element={<KindergeldPreviewWindow />} />
      <Route path="/sr/muster/kindergeld/preview" element={<KindergeldPreviewWindow />} />
      <Route path="/de/*" element={<LocalizedRoutes />} />
      <Route path="/hr/*" element={<LocalizedRoutes />} />
      <Route path="/sr/*" element={<LocalizedRoutes />} />
      <Route path="/*" element={<LocalizedRoutes />} />
    </Routes>
  );
}

function DeferredWhatIsBalkanLink() {
  const [ready, setReady] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);

  useEffect(() => {
    const open = () => {
      setOpenOnMount(true);
      setReady(true);
    };
    window.addEventListener("bl:open-whatis", open, { once: true });
    const ric = (window as typeof window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }).requestIdleCallback;
    if (ric) {
      const id = ric(() => setReady(true), { timeout: 6500 });
      return () => {
        window.removeEventListener("bl:open-whatis", open);
        (window as typeof window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
      };
    }
    const id = window.setTimeout(() => setReady(true), 4200);
    return () => {
      window.removeEventListener("bl:open-whatis", open);
      window.clearTimeout(id);
    };
  }, []);

  if (!ready) return null;
  return <WhatIsBalkanLink initialOpen={openOnMount} />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <LanguageRouter />
        <LanguageProvider>
          <CountryProvider>
            <AuthProvider>
              <Suspense fallback={null}>
                <AppRoutes />
                <DeferredWhatIsBalkanLink />
              </Suspense>
            </AuthProvider>
          </CountryProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
