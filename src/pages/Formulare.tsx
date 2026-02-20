import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, ChevronDown, ExternalLink, Download, CheckCircle2,
  Building2, Baby, Heart, Stethoscope, XCircle, Landmark, Crown, Lock,
  Receipt, Banknote, Briefcase, Home, Car, CreditCard, Users, Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import LegalDisclaimer from "@/components/LegalDisclaimer";

type LangKey = "de" | "bs" | "en";
function getLk(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

/* ── Category data ── */
interface GuideCategory {
  id: string;
  icon: typeof FileText;
  title: { de: string; bs: string; en: string };
  description: { de: string; bs: string; en: string };
  documents: { de: string[]; bs: string[]; en: string[] };
  steps: { de: string[]; bs: string[]; en: string[] };
  officialLink: string;
  officialLinkLabel: string;
  noOnlineForm?: boolean;
  templateLink?: string;
}

const categories: GuideCategory[] = [
  {
    id: "anmeldung",
    icon: Building2,
    title: { de: "Anmeldung & Ummeldung", bs: "Prijava i odjava prebivališta", en: "Registration & Re-registration" },
    description: {
      de: "Innerhalb von 14 Tagen nach dem Einzug müssen Sie sich beim Einwohnermeldeamt anmelden. Bei Umzug innerhalb der Stadt ist eine Ummeldung nötig.",
      bs: "U roku od 14 dana od useljenja morate se prijaviti u nadležnom uredu. Kod preseljenja unutar grada potrebna je odjava/prijava.",
      en: "You must register at the residents' office within 14 days of moving in. Moving within the city requires re-registration.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Wohnungsgeberbestätigung", "Mietvertrag (empfohlen)", "Ggf. Heirats-/Geburtsurkunde"],
      bs: ["Lična karta / pasoš", "Potvrda stanodavca (Wohnungsgeberbestätigung)", "Ugovor o najmu (preporučeno)", "Eventualno vjenčani list / rodni list"],
      en: ["ID / Passport", "Landlord confirmation", "Rental contract (recommended)", "Marriage/birth certificate if applicable"],
    },
    steps: {
      de: [
        "Termin beim Bürgeramt online buchen (z.B. über service.berlin.de oder lokale Webseite).",
        "Wohnungsgeberbestätigung vom Vermieter ausfüllen lassen.",
        "Alle Dokumente (Ausweis, Bestätigung, ggf. Mietvertrag) mitbringen.",
        "Vor Ort das Anmeldeformular ausfüllen und abgeben.",
        "Meldebescheinigung sofort mitnehmen — für Bankkonto, Steuer-ID etc. nötig.",
      ],
      bs: [
        "Rezervišite termin online kod nadležnog ureda (Bürgeramt).",
        "Neka vam stanodavac popuni potvrdu (Wohnungsgeberbestätigung).",
        "Ponesete sve dokumente: pasoš, potvrdu, ugovor o najmu.",
        "Na licu mjesta popunite formular za prijavu.",
        "Odmah preuzmite potvrdu o prijavi — treba vam za banku, porezni ID itd.",
      ],
      en: [
        "Book an appointment online at the local citizens' office.",
        "Have your landlord fill out the housing confirmation.",
        "Bring all documents: ID, confirmation, rental contract.",
        "Fill out the registration form on-site.",
        "Take the registration certificate — needed for bank, tax ID, etc.",
      ],
    },
    officialLink: "https://service.berlin.de/dienstleistung/120686/",
    officialLinkLabel: "Bürgeramt Online-Termin",
  },
  {
    id: "kindergeld",
    icon: Baby,
    title: { de: "Kindergeld beantragen", bs: "Zahtjev za Kindergeld", en: "Apply for Child Benefit" },
    description: {
      de: "Kindergeld wird für jedes Kind bis 18 Jahre gezahlt (bis 25 bei Ausbildung). Der Antrag wird bei der Familienkasse gestellt.",
      bs: "Kindergeld se isplaćuje za svako dijete do 18. godine (do 25. uz školovanje). Zahtjev se podnosi kod Familienkasse.",
      en: "Child benefit is paid for every child under 18 (up to 25 if in education). Apply at the Family Benefits Office.",
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Steuer-ID (Elternteil + Kind)", "Meldebescheinigung", "Aufenthaltstitel (Nicht-EU)", "Ggf. Schulbescheinigung (ab 18)"],
      bs: ["Rodni list djeteta", "Porezni ID (roditelj + dijete)", "Potvrda o prijavi", "Boravišna dozvola (ne-EU)", "Potvrda škole (od 18. godine)"],
      en: ["Child's birth certificate", "Tax ID (parent + child)", "Registration certificate", "Residence permit (non-EU)", "School certificate (from 18)"],
    },
    steps: {
      de: [
        "Formular KG1 (Hauptantrag) und Anlage Kind (KG1-AnlKi) herunterladen.",
        "Persönliche Daten, Steuer-ID und Bankverbindung eintragen.",
        "Für jedes Kind eine separate Anlage Kind ausfüllen.",
        "Alle Nachweise (Geburtsurkunde, Meldebescheinigung) beifügen.",
        "An die zuständige Familienkasse senden — online oder per Post.",
        "Bearbeitungszeit: ca. 4–6 Wochen. Nachzahlung ab Geburt möglich.",
      ],
      bs: [
        "Preuzmite formular KG1 i prilog za dijete (KG1-AnlKi).",
        "Unesite lične podatke, porezni ID i podatke o bankovnom računu.",
        "Za svako dijete popunite poseban prilog.",
        "Priložite dokaze (rodni list, potvrda o prijavi).",
        "Pošaljite nadležnoj Familienkasse — online ili poštom.",
        "Obrada traje 4–6 sedmica. Moguća retroaktivna isplata od rođenja.",
      ],
      en: [
        "Download form KG1 and child attachment (KG1-AnlKi).",
        "Enter personal data, tax ID, and bank details.",
        "Fill out a separate attachment for each child.",
        "Attach proof (birth certificate, registration).",
        "Send to the responsible Family Benefits Office — online or by post.",
        "Processing: approx. 4–6 weeks. Retroactive payment from birth possible.",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen",
    officialLinkLabel: "Familienkasse Online",
  },
  {
    id: "elterngeld",
    icon: Heart,
    title: { de: "Elterngeld beantragen", bs: "Zahtjev za Elterngeld", en: "Apply for Parental Allowance" },
    description: {
      de: "Elterngeld ersetzt 65–67% des Nettoeinkommens nach der Geburt. Der Antrag muss innerhalb von 3 Monaten gestellt werden.",
      bs: "Elterngeld nadoknađuje 65–67% neto primanja nakon porođaja. Zahtjev mora biti podnesen u roku od 3 mjeseca.",
      en: "Parental allowance replaces 65–67% of net income after birth. Must be applied within 3 months.",
    },
    documents: {
      de: ["Geburtsurkunde (Original)", "Gehaltsnachweise (12 Monate)", "Arbeitgeberbescheinigung", "Krankenversicherungsnachweis", "Mutterschaftsgeldbescheinigung"],
      bs: ["Rodni list (original)", "Platne liste (12 mjeseci)", "Potvrda poslodavca", "Zdravstveno osiguranje", "Potvrda o porodiljskom dodatku"],
      en: ["Birth certificate (original)", "Salary slips (12 months)", "Employer certificate", "Health insurance proof", "Maternity benefit certificate"],
    },
    steps: {
      de: [
        "Zuständige Elterngeldstelle des Bundeslandes finden.",
        "Antrag herunterladen oder online über elterngeld-digital.de stellen.",
        "Bezugsmonate für beide Elternteile festlegen (max. 14 Monate Basiselterngeld).",
        "Einkommensnachweise der letzten 12 Monate vor Geburt beifügen.",
        "Arbeitgeberbescheinigung über geplante Elternzeit anfordern.",
        "Antrag innerhalb von 3 Monaten nach Geburt einreichen!",
      ],
      bs: [
        "Pronađite nadležnu Elterngeldstelle vaše savezne države.",
        "Preuzmite zahtjev ili ga podnesite online na elterngeld-digital.de.",
        "Odredite mjesece korištenja za oba roditelja (max. 14 mjeseci).",
        "Priložite dokaze o primanjima za 12 mjeseci prije porođaja.",
        "Zatražite potvrdu od poslodavca o roditeljskom odsustvu.",
        "Podnesite zahtjev u roku od 3 mjeseca od porođaja!",
      ],
      en: [
        "Find the parental allowance office of your federal state.",
        "Download the form or apply online at elterngeld-digital.de.",
        "Define benefit months for both parents (max. 14 months basic).",
        "Attach income proof for 12 months before birth.",
        "Request employer certificate for parental leave.",
        "Submit within 3 months after birth!",
      ],
    },
    officialLink: "https://www.elterngeld-digital.de",
    officialLinkLabel: "Elterngeld Digital",
  },
  {
    id: "krankenversicherung",
    icon: Stethoscope,
    title: { de: "Krankenversicherung anmelden", bs: "Prijava zdravstvenog osiguranja", en: "Register Health Insurance" },
    description: {
      de: "In Deutschland besteht Versicherungspflicht. Arbeitnehmer werden automatisch versichert, Selbständige müssen sich selbst anmelden.",
      bs: "U Njemačkoj postoji obavezno osiguranje. Zaposlenici su automatski osigurani, samostalni moraju se sami prijaviti.",
      en: "Health insurance is mandatory in Germany. Employees are automatically insured; self-employed must register themselves.",
    },
    documents: {
      de: ["Meldebescheinigung", "Arbeitsvertrag oder Gewerbeanmeldung", "Reisepass / Aufenthaltstitel", "Ggf. Nachweis Vorversicherung", "Bankverbindung"],
      bs: ["Potvrda o prijavi", "Ugovor o radu ili prijava obrta", "Pasoš / boravišna dozvola", "Eventualno dokaz prethodnog osiguranja", "Bankovni podaci"],
      en: ["Registration certificate", "Employment contract or business registration", "Passport / residence permit", "Proof of prior insurance if applicable", "Bank details"],
    },
    steps: {
      de: [
        "Gesetzliche Krankenkasse wählen (z.B. AOK, TK, Barmer, DAK).",
        "Online-Antrag auf der Webseite der Krankenkasse ausfüllen.",
        "Meldebescheinigung und Arbeitsvertrag hochladen oder per Post senden.",
        "Versichertenkarte (eGK) wird innerhalb von 2–3 Wochen zugesendet.",
        "Arbeitgeber über die gewählte Kasse informieren.",
      ],
      bs: [
        "Odaberite zdravstvenu blagajnu (AOK, TK, Barmer, DAK itd.).",
        "Popunite online zahtjev na stranici blagajne.",
        "Učitajte ili pošaljite potvrdu o prijavi i ugovor o radu.",
        "Kartica osiguranika (eGK) stiže za 2–3 sedmice.",
        "Obavijestite poslodavca o odabranoj blagajni.",
      ],
      en: [
        "Choose a statutory health insurer (AOK, TK, Barmer, DAK, etc.).",
        "Fill out the online application on the insurer's website.",
        "Upload or mail registration certificate and employment contract.",
        "Insurance card (eGK) arrives within 2–3 weeks.",
        "Inform your employer about your chosen insurer.",
      ],
    },
    officialLink: "https://www.krankenkassen.de",
    officialLinkLabel: "Krankenkassen-Vergleich",
  },
  {
    id: "steuer",
    icon: Receipt,
    title: { de: "Steuer-ID & Steuerklasse", bs: "Porezni ID i porezna klasa", en: "Tax ID & Tax Class" },
    description: {
      de: "Die Steuer-ID wird automatisch nach der Anmeldung per Post zugesandt. Die Steuerklasse kann beim Finanzamt geändert werden.",
      bs: "Porezni ID se automatski šalje poštom nakon prijave prebivališta. Porezna klasa se može promijeniti u Finanzamtu.",
      en: "The tax ID is sent by mail after registration. The tax class can be changed at the tax office.",
    },
    documents: {
      de: ["Meldebescheinigung", "Personalausweis / Reisepass", "Heiratsurkunde (bei Steuerklassenwechsel)", "Ggf. Scheidungsurteil"],
      bs: ["Potvrda o prijavi", "Lična karta / pasoš", "Vjenčani list (za promjenu klase)", "Eventualno presuda o razvodu"],
      en: ["Registration certificate", "ID / Passport", "Marriage certificate (for class change)", "Divorce decree if applicable"],
    },
    steps: {
      de: [
        "Steuer-ID wird automatisch ca. 2–4 Wochen nach Anmeldung per Post zugesandt.",
        "Falls nicht erhalten: beim Bundeszentralamt für Steuern (BZSt) online nachfragen.",
        "Steuerklasse prüfen (I = ledig, III/V oder IV/IV = verheiratet).",
        'Steuerklassenwechsel über das Finanzamt beantragen (Formular "Antrag auf Steuerklassenwechsel").',
        "Arbeitgeber informieren — neue Klasse erscheint automatisch in der Lohnabrechnung.",
      ],
      bs: [
        "Porezni ID stiže automatski poštom 2–4 sedmice nakon prijave.",
        "Ako nije stigao: pitajte online kod Bundeszentralamt für Steuern (BZSt).",
        "Provjerite poreznu klasu (I = neoženjen, III/V ili IV/IV = oženjen).",
        'Promjenu klase zatražite kod Finanzamta (formular "Antrag auf Steuerklassenwechsel").',
        "Obavijestite poslodavca — nova klasa se automatski pojavljuje na platnoj listi.",
      ],
      en: [
        "Tax ID is sent automatically by mail 2–4 weeks after registration.",
        "If not received: request online at the Federal Central Tax Office (BZSt).",
        "Check tax class (I = single, III/V or IV/IV = married).",
        "Apply for tax class change at the tax office (form 'Antrag auf Steuerklassenwechsel').",
        "Inform employer — new class appears automatically on payslip.",
      ],
    },
    officialLink: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html",
    officialLinkLabel: "BZSt – Steuer-ID",
  },
  {
    id: "bankkonto",
    icon: Banknote,
    title: { de: "Bankkonto eröffnen", bs: "Otvaranje bankovnog računa", en: "Open a Bank Account" },
    description: {
      de: "Ein deutsches Bankkonto ist für Gehalt, Miete und Sozialleistungen notwendig. Die Eröffnung ist auch online möglich.",
      bs: "Njemački bankovni račun je potreban za platu, kiriju i socijalna davanja. Otvaranje je moguće i online.",
      en: "A German bank account is needed for salary, rent, and social benefits. Opening is also possible online.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Meldebescheinigung", "Aufenthaltstitel (Nicht-EU)", "Ggf. Arbeitsvertrag"],
      bs: ["Lična karta / pasoš", "Potvrda o prijavi", "Boravišna dozvola (ne-EU)", "Eventualno ugovor o radu"],
      en: ["ID / Passport", "Registration certificate", "Residence permit (non-EU)", "Employment contract if applicable"],
    },
    steps: {
      de: [
        "Bank auswählen (z.B. Sparkasse, Deutsche Bank, Commerzbank, N26, ING).",
        "Online-Antrag ausfüllen oder Termin in der Filiale vereinbaren.",
        "PostIdent oder VideoIdent zur Identitätsprüfung durchführen.",
        "Meldebescheinigung und Ausweisdokument bereithalten.",
        "Girokarte und Online-Banking-Daten werden per Post zugesendet.",
        "IBAN dem Arbeitgeber und Behörden mitteilen.",
      ],
      bs: [
        "Odaberite banku (Sparkasse, Deutsche Bank, Commerzbank, N26, ING itd.).",
        "Popunite online zahtjev ili zakažite termin u poslovnici.",
        "Provedite PostIdent ili VideoIdent za identifikaciju.",
        "Pripremite potvrdu o prijavi i ličnu kartu/pasoš.",
        "Girokarte i podaci za online banking stižu poštom.",
        "Proslijedite IBAN poslodavcu i institucijama.",
      ],
      en: [
        "Choose a bank (Sparkasse, Deutsche Bank, Commerzbank, N26, ING, etc.).",
        "Fill out online application or schedule a branch appointment.",
        "Complete PostIdent or VideoIdent for identity verification.",
        "Have registration certificate and ID ready.",
        "Debit card and online banking details arrive by mail.",
        "Share IBAN with employer and authorities.",
      ],
    },
    officialLink: "https://www.bafin.de/DE/Verbraucher/BankeBauspwortkassen/Kontoeröffnung/kontoeröffnung_node.html",
    officialLinkLabel: "BaFin – Kontoeröffnung",
  },
  {
    id: "arbeit",
    icon: Briefcase,
    title: { de: "Arbeit & Arbeitsvertrag", bs: "Posao i ugovor o radu", en: "Employment & Work Contract" },
    description: {
      de: "Ein Arbeitsvertrag regelt Rechte und Pflichten. Vor Unterschrift sollte man alle Punkte genau prüfen.",
      bs: "Ugovor o radu reguliše prava i obaveze. Prije potpisa treba pažljivo provjeriti sve tačke.",
      en: "An employment contract defines rights and duties. Review all points carefully before signing.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Aufenthaltstitel mit Arbeitserlaubnis", "Sozialversicherungsausweis", "Steuer-ID", "Bankverbindung", "Ggf. Zeugnisse / Diplome"],
      bs: ["Lična karta / pasoš", "Boravišna dozvola sa radnom dozvolom", "Kartica socijalnog osiguranja", "Porezni ID", "Bankovni podaci", "Eventualno diplome / svjedodžbe"],
      en: ["ID / Passport", "Residence permit with work permit", "Social insurance card", "Tax ID", "Bank details", "Diplomas / certificates if applicable"],
    },
    steps: {
      de: [
        "Arbeitsvertrag vor Unterschrift vollständig lesen.",
        "Probezeit prüfen (max. 6 Monate, Kündigungsfrist 2 Wochen).",
        "Arbeitszeit, Gehalt, Urlaubstage (mind. 20 Tage) und Kündigungsfristen prüfen.",
        "Sozialversicherungsausweis beim Rentenversicherungsträger beantragen (falls nicht vorhanden).",
        "Steuer-ID und Bankverbindung dem Arbeitgeber mitteilen.",
        "Krankenversicherung wählen und Arbeitgeber informieren.",
        "Vertrag unterschreiben — ein Exemplar immer aufbewahren!",
      ],
      bs: [
        "Ugovor o radu pročitajte kompletno prije potpisa.",
        "Provjerite probni rok (max. 6 mjeseci, otkazni rok 2 sedmice).",
        "Provjerite radno vrijeme, platu, dane godišnjeg odmora (min. 20) i otkazne rokove.",
        "Kartica socijalnog osiguranja — zatražite kod nositelja penzijskog osiguranja.",
        "Proslijedite porezni ID i bankovne podatke poslodavcu.",
        "Odaberite zdravstveno osiguranje i obavijestite poslodavca.",
        "Potpišite ugovor — uvijek zadržite jedan primjerak!",
      ],
      en: [
        "Read the employment contract fully before signing.",
        "Check probation period (max. 6 months, 2-week notice).",
        "Verify working hours, salary, vacation days (min. 20), and notice periods.",
        "Request social insurance card from pension insurance if not available.",
        "Provide tax ID and bank details to employer.",
        "Choose health insurance and inform employer.",
        "Sign the contract — always keep a copy!",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de",
    officialLinkLabel: "Agentur für Arbeit",
  },
  {
    id: "wohnung",
    icon: Home,
    title: { de: "Wohnung & Mietvertrag", bs: "Stan i ugovor o najmu", en: "Housing & Rental Contract" },
    description: {
      de: "Ein Mietvertrag ist Pflicht und sollte vor Unterschrift genau geprüft werden. Die Kaution beträgt max. 3 Kaltmieten.",
      bs: "Ugovor o najmu je obavezan i treba ga pažljivo pročitati. Kaucija iznosi max. 3 hladne kirije.",
      en: "A rental contract is mandatory and should be checked carefully. Deposit is max. 3 months cold rent.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Meldebescheinigung", "Einkommensnachweis / Gehaltsnachweise", "SCHUFA-Auskunft", "Mieterselbstauskunft", "Ggf. Bürgschaft"],
      bs: ["Lična karta / pasoš", "Potvrda o prijavi", "Dokaz o primanjima / platne liste", "SCHUFA izvještaj", "Samoprijava stanara", "Eventualno garancija"],
      en: ["ID / Passport", "Registration certificate", "Income proof / salary slips", "SCHUFA report", "Tenant self-disclosure", "Guarantor letter if applicable"],
    },
    steps: {
      de: [
        "Wohnung auf Portalen suchen (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Besichtigungstermine vereinbaren und Unterlagen vorbereiten.",
        "SCHUFA-Auskunft online bestellen (kostenlos 1x/Jahr bei meineSCHUFA.de).",
        "Mietvertrag vor Unterschrift komplett lesen — auf Nebenkosten, Kündigungsfrist und Kaution achten.",
        "Übergabeprotokoll bei Einzug erstellen (Zustand der Wohnung dokumentieren).",
        "Innerhalb von 14 Tagen beim Bürgeramt anmelden.",
      ],
      bs: [
        "Stanove tražite na portalima (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Dogovorite termine za razgledanje i pripremite dokumente.",
        "Naručite SCHUFA izvještaj online (besplatno 1x godišnje na meineSCHUFA.de).",
        "Ugovor o najmu pročitajte kompletno — obratite pažnju na režije, otkazni rok i kauciju.",
        "Napravite zapisnik o primopredaji pri useljenju (dokumentirajte stanje stana).",
        "U roku od 14 dana prijavite se u Bürgeramtu.",
      ],
      en: [
        "Search apartments on portals (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Schedule viewing appointments and prepare documents.",
        "Order SCHUFA report online (free 1x/year at meineSCHUFA.de).",
        "Read rental contract fully — check utilities, notice period, and deposit.",
        "Create handover protocol when moving in (document apartment condition).",
        "Register at the citizens' office within 14 days.",
      ],
    },
    officialLink: "https://www.mieterbund.de",
    officialLinkLabel: "Deutscher Mieterbund",
  },
  {
    id: "auto",
    icon: Car,
    title: { de: "Auto anmelden", bs: "Registracija automobila", en: "Register a Car" },
    description: {
      de: "Ein Auto muss innerhalb weniger Tage nach Kauf bei der Zulassungsstelle angemeldet werden.",
      bs: "Automobil se mora registrirati u roku od nekoliko dana od kupovine kod Zulassungsstelle.",
      en: "A car must be registered at the vehicle registration office within a few days of purchase.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "eVB-Nummer (Versicherungsbestätigung)", "Fahrzeugbrief (Zulassungsbescheinigung Teil II)", "Fahrzeugschein (Teil I)", "Nachweis der Hauptuntersuchung (HU/TÜV)", "SEPA-Lastschriftmandat für Kfz-Steuer"],
      bs: ["Lična karta / pasoš", "eVB-broj (potvrda o osiguranju)", "Prometna dozvola (Teil II)", "Saobraćajna dozvola (Teil I)", "TÜV izvještaj", "SEPA ovlaštenje za porez na vozilo"],
      en: ["ID / Passport", "eVB number (insurance confirmation)", "Vehicle registration Part II", "Vehicle registration Part I", "TÜV inspection report", "SEPA mandate for vehicle tax"],
    },
    steps: {
      de: [
        "Kfz-Versicherung abschließen und eVB-Nummer erhalten.",
        "Termin bei der Zulassungsstelle online buchen.",
        "Alle Dokumente (Ausweis, eVB, Fahrzeugbrief, TÜV) mitbringen.",
        "Kennzeichen bei einer Schilderprägestelle anfertigen lassen.",
        "Zulassungsbescheinigung Teil I und II erhalten.",
        "Kfz-Steuer wird automatisch vom Zoll eingezogen (SEPA-Mandat).",
      ],
      bs: [
        "Zaključite osiguranje vozila i dobijte eVB-broj.",
        "Zakažite termin online kod Zulassungsstelle.",
        "Ponesete sve dokumente (pasoš, eVB, prometna, TÜV).",
        "Tablice naručite kod Schilderprägestelle.",
        "Preuzmite saobraćajnu dozvolu Teil I i II.",
        "Porez na vozilo se automatski naplaćuje (SEPA ovlaštenje).",
      ],
      en: [
        "Get car insurance and obtain eVB number.",
        "Book appointment online at the vehicle registration office.",
        "Bring all documents (ID, eVB, registration papers, TÜV).",
        "Have license plates made at a plate maker.",
        "Receive registration certificates Part I and II.",
        "Vehicle tax is collected automatically (SEPA mandate).",
      ],
    },
    officialLink: "https://www.kba.de",
    officialLinkLabel: "Kraftfahrt-Bundesamt",
    noOnlineForm: true,
  },
  {
    id: "fuehrerschein",
    icon: CreditCard,
    title: { de: "Führerschein umschreiben", bs: "Prepis vozačke dozvole", en: "Convert Driving License" },
    description: {
      de: "Führerscheine aus Nicht-EU-Ländern müssen innerhalb von 6 Monaten umgeschrieben werden. EU-Führerscheine gelten unbegrenzt.",
      bs: "Vozačke dozvole iz ne-EU zemalja moraju se prepisati u roku od 6 mjeseci. EU dozvole važe neograničeno.",
      en: "Non-EU driving licenses must be converted within 6 months. EU licenses are valid indefinitely.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Meldebescheinigung", "Ausländischer Führerschein (Original + Übersetzung)", "Biometrisches Passfoto", "Sehtest-Bescheinigung", "Erste-Hilfe-Kurs-Bescheinigung"],
      bs: ["Lična karta / pasoš", "Potvrda o prijavi", "Strana vozačka dozvola (original + prijevod)", "Biometrijska fotografija", "Potvrda o pregledu vida", "Potvrda o kursu prve pomoći"],
      en: ["ID / Passport", "Registration certificate", "Foreign driving license (original + translation)", "Biometric photo", "Eye test certificate", "First aid course certificate"],
    },
    steps: {
      de: [
        "Prüfen, ob der Führerschein aus einem anerkannten Land stammt (Prüfungspflicht ja/nein).",
        "Amtlich beglaubigte Übersetzung des Führerscheins anfertigen lassen.",
        "Sehtest bei einem Optiker oder Augenarzt machen.",
        "Erste-Hilfe-Kurs absolvieren (nur bei prüfungspflichtigen Ländern).",
        "Antrag bei der Führerscheinstelle mit allen Dokumenten einreichen.",
        "Ggf. theoretische und/oder praktische Prüfung ablegen.",
        "Deutschen Führerschein abholen.",
      ],
      bs: [
        "Provjerite da li dozvola dolazi iz priznate zemlje (obaveza polaganja da/ne).",
        "Naručite službeni prevod vozačke dozvole.",
        "Obavite pregled vida kod optičara ili oftalmologa.",
        "Položite kurs prve pomoći (samo za zemlje sa obaveznim polaganjem).",
        "Podnesite zahtjev sa svim dokumentima kod Führerscheinstelle.",
        "Eventualno položite teorijski i/ili praktični ispit.",
        "Preuzmite njemačku vozačku dozvolu.",
      ],
      en: [
        "Check if your license is from a recognized country (exam required yes/no).",
        "Get an officially certified translation of your license.",
        "Take an eye test at an optician or ophthalmologist.",
        "Complete first aid course (only for countries requiring exams).",
        "Submit application with all documents at the license office.",
        "Take theory and/or practical exam if required.",
        "Pick up your German driving license.",
      ],
    },
    officialLink: "https://www.adac.de/verkehr/rund-um-den-fuehrerschein/auslaendischer-fuehrerschein/",
    officialLinkLabel: "ADAC – Führerschein",
    noOnlineForm: true,
  },
  {
    id: "familiennachzug",
    icon: Users,
    title: { de: "Familiennachzug", bs: "Spajanje porodice", en: "Family Reunification" },
    description: {
      de: "Familienangehörige aus Drittstaaten können unter bestimmten Voraussetzungen nachziehen. Der Antrag wird bei der Auslandsvertretung gestellt.",
      bs: "Članovi porodice iz trećih zemalja mogu se pod određenim uvjetima pridružiti. Zahtjev se podnosi kod ambasade.",
      en: "Family members from third countries can join under certain conditions. Application is made at the embassy.",
    },
    documents: {
      de: ["Reisepass (gültig)", "Heiratsurkunde / Geburtsurkunde (beglaubigt + übersetzt)", "Aufenthaltstitel des in Deutschland lebenden Partners", "Nachweis ausreichenden Wohnraums", "Einkommensnachweis / Verpflichtungserklärung", "Ggf. A1-Sprachzertifikat Deutsch"],
      bs: ["Pasoš (važeći)", "Vjenčani list / rodni list (ovjeren + preveden)", "Boravišna dozvola partnera u Njemačkoj", "Dokaz o dovoljnom stambenom prostoru", "Dokaz o primanjima / izjava o obavezi", "Eventualno A1-certifikat njemačkog jezika"],
      en: ["Valid passport", "Marriage / birth certificate (certified + translated)", "Residence permit of partner in Germany", "Proof of sufficient living space", "Income proof / obligation declaration", "A1 German language certificate if applicable"],
    },
    steps: {
      de: [
        "Termin bei der deutschen Auslandsvertretung (Botschaft/Konsulat) im Herkunftsland buchen.",
        "Alle Dokumente beglaubigen und übersetzen lassen.",
        "Visumsantrag für Familiennachzug ausfüllen.",
        "Ggf. A1-Sprachtest Deutsch ablegen (für Ehepartner).",
        "Nachweis ausreichenden Wohnraums und Einkommen vorbereiten.",
        "Visum wird geprüft — Bearbeitungszeit 2–6 Monate.",
        "Nach Einreise: Aufenthaltstitel bei der Ausländerbehörde beantragen.",
      ],
      bs: [
        "Zakažite termin u njemačkoj ambasadi/konzulatu u zemlji porijekla.",
        "Sve dokumente ovjerite i prevedite.",
        "Popunite zahtjev za vizu za spajanje porodice.",
        "Eventualno položite A1-ispit njemačkog jezika (za supružnike).",
        "Pripremite dokaz o stambenom prostoru i primanjima.",
        "Viza se provjerava — obrada traje 2–6 mjeseci.",
        "Nakon ulaska: podnesite zahtjev za boravišnu dozvolu kod Ausländerbehörde.",
      ],
      en: [
        "Book appointment at the German embassy/consulate in the country of origin.",
        "Have all documents certified and translated.",
        "Fill out visa application for family reunification.",
        "Take A1 German language test if required (for spouses).",
        "Prepare proof of living space and income.",
        "Visa is reviewed — processing takes 2–6 months.",
        "After arrival: apply for residence permit at the foreigners' authority.",
      ],
    },
    officialLink: "https://www.make-it-in-germany.com/de/visum-aufenthalt/familiennachzug",
    officialLinkLabel: "Make it in Germany",
  },
  {
    id: "aufenthaltstitel",
    icon: Shield,
    title: { de: "Aufenthaltstitel & Verlängerung", bs: "Boravišna dozvola i produženje", en: "Residence Permit & Extension" },
    description: {
      de: "Nicht-EU-Bürger benötigen einen Aufenthaltstitel. Die Verlängerung muss rechtzeitig vor Ablauf beantragt werden.",
      bs: "Državljani ne-EU zemalja trebaju boravišnu dozvolu. Produženje se mora zatražiti pravovremeno prije isteka.",
      en: "Non-EU citizens need a residence permit. Extension must be applied for in time before expiry.",
    },
    documents: {
      de: ["Reisepass (gültig)", "Biometrisches Passfoto", "Meldebescheinigung", "Arbeitsvertrag oder Studiennachweis", "Krankenversicherungsnachweis", "Einkommensnachweis", "Ggf. Integrationskurs-Bescheinigung"],
      bs: ["Pasoš (važeći)", "Biometrijska fotografija", "Potvrda o prijavi", "Ugovor o radu ili potvrda studija", "Dokaz o zdravstvenom osiguranju", "Dokaz o primanjima", "Eventualno potvrda o integrationom kursu"],
      en: ["Valid passport", "Biometric photo", "Registration certificate", "Employment contract or study proof", "Health insurance proof", "Income proof", "Integration course certificate if applicable"],
    },
    steps: {
      de: [
        "Termin bei der Ausländerbehörde online buchen (mind. 6–8 Wochen vor Ablauf).",
        "Alle erforderlichen Dokumente zusammenstellen.",
        "Antrag auf Verlängerung / Erteilung des Aufenthaltstitels ausfüllen.",
        "Gebühr bezahlen (ca. 70–100 €, je nach Titel).",
        "Fiktionsbescheinigung erhalten (falls Bearbeitungszeit länger als Gültigkeit).",
        "Aufenthaltstitel in elektronischer Form (eAT) wird per Post zugesendet.",
      ],
      bs: [
        "Zakažite termin kod Ausländerbehörde online (min. 6–8 sedmica prije isteka).",
        "Pripremite sve potrebne dokumente.",
        "Popunite zahtjev za produženje / izdavanje boravišne dozvole.",
        "Platite taksu (ca. 70–100 €, ovisno o vrsti).",
        "Dobijete Fiktionsbescheinigung (ako obrada traje duže od važnosti).",
        "Boravišna dozvola u elektronskom obliku (eAT) stiže poštom.",
      ],
      en: [
        "Book appointment at the foreigners' authority online (min. 6–8 weeks before expiry).",
        "Gather all required documents.",
        "Fill out application for extension / issuance of residence permit.",
        "Pay the fee (approx. €70–100, depending on type).",
        "Receive fictional certificate if processing takes longer than validity.",
        "Electronic residence permit (eAT) is sent by mail.",
      ],
    },
    officialLink: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwsendererErsteSchritte/Aufenthaltstitel/aufenthaltstitel-node.html",
    officialLinkLabel: "BAMF – Aufenthaltstitel",
  },
  {
    id: "kuendigung",
    icon: XCircle,
    title: { de: "Kündigungsschreiben", bs: "Otkazno pismo", en: "Termination Letter" },
    description: {
      de: "Ein Kündigungsschreiben muss schriftlich erfolgen und bestimmte Fristen einhalten. Hier findest du eine Schritt-für-Schritt Anleitung.",
      bs: "Otkazno pismo mora biti u pisanom obliku i poštovati rokove. Ovdje pronalazite korak-po-korak uputstvo.",
      en: "A termination letter must be in writing and observe notice periods. Here's a step-by-step guide.",
    },
    documents: {
      de: ["Arbeitsvertrag (für Kündigungsfristen)", "Personalausweis", "Ggf. ärztliches Attest (Sonderkündigung)"],
      bs: ["Ugovor o radu (za rokove otkazivanja)", "Lična karta", "Eventualno ljekarski nalaz (vanredni otkaz)"],
      en: ["Employment contract (for notice periods)", "ID", "Medical certificate if applicable (special termination)"],
    },
    steps: {
      de: [
        "Kündigungsfrist im Arbeitsvertrag oder Tarifvertrag prüfen (Standard: 4 Wochen zum 15. oder Monatsende).",
        "Schriftliches Kündigungsschreiben verfassen — handschriftliche Unterschrift ist Pflicht!",
        "Adressat: Arbeitgeber mit vollständigem Firmennamen und Adresse.",
        "Datum, eigener Name, Betreff 'Kündigung' und gewünschtes Enddatum angeben.",
        "Persönlich gegen Empfangsbestätigung übergeben ODER per Einschreiben senden.",
        "Kopie des Schreibens und Zustellnachweis aufbewahren.",
      ],
      bs: [
        "Provjerite otkazni rok u ugovoru o radu (standard: 4 sedmice do 15. ili kraja mjeseca).",
        "Sastavite pismeni otkaz — vlastoručni potpis je obavezan!",
        "Primalac: poslodavac sa punim imenom firme i adresom.",
        "Navedite datum, vaše ime, naslov 'Kündigung' i željeni datum prestanka.",
        "Predajte lično uz potvrdu prijema ILI pošaljite preporučenom poštom.",
        "Sačuvajte kopiju pisma i dokaz o dostavi.",
      ],
      en: [
        "Check notice period in your contract (standard: 4 weeks to the 15th or end of month).",
        "Write a formal letter — handwritten signature required!",
        "Addressee: employer with full company name and address.",
        "Include date, your name, subject 'Kündigung', and desired end date.",
        "Hand-deliver with receipt confirmation OR send via registered mail.",
        "Keep a copy and proof of delivery.",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/kuendigung",
    officialLinkLabel: "Agentur für Arbeit",
  },
  {
    id: "jobcenter",
    icon: Landmark,
    title: { de: "Jobcenter & Behördengänge", bs: "Jobcenter i uredske obaveze", en: "Jobcenter & Office Visits" },
    description: {
      de: "Beim Jobcenter können Bürgergeld, Weiterbildungen und Eingliederungshilfen beantragt werden. Hier der Ablauf.",
      bs: "Kod Jobcentera možete zatražiti Bürgergeld, dodatno obrazovanje i pomoć pri integraciji. Evo kako.",
      en: "At the Jobcenter you can apply for Bürgergeld, further education, and integration support. Here's how.",
    },
    documents: {
      de: ["Personalausweis / Aufenthaltstitel", "Meldebescheinigung", "Mietvertrag + Nebenkostenabrechnung", "Kontoauszüge (3 Monate)", "Arbeitsvertrag / Kündigung", "Einkommensnachweise"],
      bs: ["Lična karta / boravišna dozvola", "Potvrda o prijavi", "Ugovor o najmu + režije", "Izvodi iz računa (3 mjeseca)", "Ugovor o radu / otkaz", "Dokazi o primanjima"],
      en: ["ID / residence permit", "Registration certificate", "Rental contract + utilities", "Bank statements (3 months)", "Employment contract / termination", "Income proof"],
    },
    steps: {
      de: [
        "Online arbeitsuchend melden unter jobcenter.digital.",
        "Erstgespräch-Termin wird automatisch vergeben.",
        "Alle Dokumente zum Termin mitbringen (Checkliste beachten).",
        "Antrag auf Bürgergeld ausfüllen — Sachbearbeiter hilft vor Ort.",
        "Kosten der Unterkunft (KdU) werden separat geprüft.",
        "Eingliederungsvereinbarung besprechen und unterschreiben.",
        "Regelmäßige Folgetermine wahrnehmen.",
      ],
      bs: [
        "Prijavite se online kao tražilac posla na jobcenter.digital.",
        "Automatski dobijate termin za prvi razgovor.",
        "Ponesete sve dokumente na termin.",
        "Popunite zahtjev za Bürgergeld — službenik pomaže na licu mjesta.",
        "Troškovi stanovanja se provjeravaju odvojeno.",
        "Dogovorite i potpišite sporazum o integraciji.",
        "Redovno dolazite na zakazane termine.",
      ],
      en: [
        "Register as job-seeking online at jobcenter.digital.",
        "An initial meeting is automatically scheduled.",
        "Bring all documents to the appointment.",
        "Fill out the Bürgergeld application — staff help on-site.",
        "Housing costs are reviewed separately.",
        "Discuss and sign the integration agreement.",
        "Attend regular follow-up appointments.",
      ],
    },
    officialLink: "https://www.jobcenter.digital",
    officialLinkLabel: "Jobcenter Digital",
  },
];

const pageTitles = {
  de: { title: "Formulare & Hilfe", subtitle: "Praktische Schritt-für-Schritt Anleitungen für alle wichtigen Behördengänge." },
  bs: { title: "Formulari & Pomoć", subtitle: "Praktična uputstva korak po korak za sve važne uredske obaveze." },
  en: { title: "Forms & Help", subtitle: "Practical step-by-step guides for all important administrative tasks." },
};

const labels = {
  de: { documents: "Benötigte Dokumente", steps: "Schritt-für-Schritt Anleitung", officialLink: "Offizieller Link", template: "Vorlage herunterladen", premiumTitle: "Vollständige Anleitung nur mit BalkanLink Plus", premiumDesc: "Erhalte alle Schritte, Vorlagen und Dokument-Checklisten.", premiumCta: "Plus freischalten", loginCta: "Anmelden", noOnlineForm: "Formular persönlich im Rathaus oder Landratsamt erhältlich." },
  bs: { documents: "Potrebni dokumenti", steps: "Korak po korak uputstvo", officialLink: "Zvanični link", template: "Preuzmi predložak", premiumTitle: "Kompletno uputstvo samo sa BalkanLink Plus", premiumDesc: "Dobij sve korake, predloške i liste dokumenata.", premiumCta: "Aktiviraj Plus", loginCta: "Prijavi se", noOnlineForm: "Formular dostupan lično u Rathaus ili Landratsamt." },
  en: { documents: "Required Documents", steps: "Step-by-Step Guide", officialLink: "Official Link", template: "Download Template", premiumTitle: "Full guide available with BalkanLink Plus", premiumDesc: "Get all steps, templates, and document checklists.", premiumCta: "Unlock Plus", loginCta: "Sign in", noOnlineForm: "Form available in person at the town hall or district office." },
};

export default function Formulare() {
  const { language } = useLanguage();
  const { isPremium, user } = useAuth();
  const lk = getLk(language);
  const t = pageTitles[lk];
  const l = labels[lk];

  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{t.subtitle}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container max-w-3xl space-y-3">
          {categories.map((cat) => {
            const isOpen = openId === cat.id;
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-xl border bg-card shadow-sm"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(cat.id)}
                  className="group flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold">{cat.title[lk]}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{cat.description[lk]}</p>
                  </div>
                  <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Expandable content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t px-5 pb-6 pt-5 space-y-5">
                        {/* Description */}
                        <p className="text-sm leading-relaxed text-muted-foreground">{cat.description[lk]}</p>

                        {/* Documents — always visible (free preview) */}
                        <div>
                          <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            <FileText className="h-3.5 w-3.5" /> {l.documents}
                          </h3>
                          <ul className="space-y-1.5">
                            {cat.documents[lk].map((doc, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Steps — gated behind Plus */}
                        {isPremium ? (
                          <>
                            <div>
                              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                <Crown className="h-3.5 w-3.5 text-gold" /> {l.steps}
                              </h3>
                              <ol className="space-y-2">
                                {cat.steps[lk].map((step, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-[10px] font-bold text-gold">
                                      {i + 1}
                                    </span>
                                    <span className="text-muted-foreground leading-relaxed">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Official link + no-online-form fallback */}
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={cat.officialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
                              >
                                <ExternalLink className="h-4 w-4" />
                                {cat.officialLinkLabel}
                              </a>
                              {cat.templateLink && (
                                <a
                                  href={cat.templateLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                                >
                                  <Download className="h-4 w-4" />
                                  {l.template}
                                </a>
                              )}
                            </div>
                            {cat.noOnlineForm && (
                              <p className="text-xs text-muted-foreground italic">{l.noOnlineForm}</p>
                            )}
                          </>
                        ) : (
                          /* Premium lock for non-Plus users */
                          <div className="relative">
                            {/* Blurred preview of first 2 steps */}
                            <div className="pointer-events-none select-none blur-[5px] opacity-40 max-h-24 overflow-hidden" aria-hidden="true">
                              <ol className="space-y-2">
                                {cat.steps[lk].slice(0, 2).map((step, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-[10px] font-bold text-gold">{i + 1}</span>
                                    <span className="text-muted-foreground">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            <div className="relative -mt-2 flex flex-col items-center rounded-xl border border-gold/15 bg-gradient-to-b from-muted/60 to-muted/30 px-5 py-8 text-center backdrop-blur-sm">
                              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/20">
                                <Lock className="h-5 w-5 text-gold" />
                              </div>
                              <p className="mb-1 text-sm font-bold">{l.premiumTitle}</p>
                              <p className="mb-5 max-w-xs text-xs text-muted-foreground">{l.premiumDesc}</p>
                              <Button className="btn-gold-gradient rounded-xl px-6" asChild>
                                <Link to={user ? "/premium" : "/login"}>
                                  <Crown className="mr-2 h-4 w-4" />
                                  {user ? l.premiumCta : l.loginCta}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
