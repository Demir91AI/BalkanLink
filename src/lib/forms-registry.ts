import { Baby, Wallet, HeartPulse, Home, FileCheck } from "lucide-react";

export type FormCategory = "porodica" | "socijala" | "zdravlje" | "stanovanje" | "dokumenti";

export interface FormEntry {
  id: string;
  slug: string;
  title: string;
  titleDe: string;
  category: FormCategory;
  institution: string;
  description: string;
  eligibility: string[];
  documents: string[];
  specificFields: { label: string; placeholder: string; helpText?: string }[];
}

export const CATEGORY_META: Record<FormCategory, { label: string; icon: typeof Baby }> = {
  porodica: { label: "Porodica i djeca", icon: Baby },
  socijala: { label: "Socijalna pomoć i finansije", icon: Wallet },
  zdravlje: { label: "Zdravlje i njega", icon: HeartPulse },
  stanovanje: { label: "Stanovanje i prijava", icon: Home },
  dokumenti: { label: "Dokumenti i administracija", icon: FileCheck },
};

export const FORMS_REGISTRY: FormEntry[] = [
  // ── Porodica i djeca ──
  {
    id: "kg1",
    slug: "kindergeld-kg1",
    title: "Kindergeld Antrag (KG1)",
    titleDe: "Kindergeld Antrag",
    category: "porodica",
    institution: "Familienkasse der Bundesagentur für Arbeit",
    description: "Zahtjev za dječji dodatak — mjesečna naknada po djetetu za roditelje u Njemačkoj.",
    eligibility: [
      "Roditelj sa prebivalištem u Njemačkoj",
      "Dijete mlađe od 18 godina (ili do 25 ako je na školovanju)",
      "Posjedujete Steuer-ID za sebe i dijete",
    ],
    documents: [
      "Rodni list djeteta (sa prevodom ako iz inostranstva)",
      "Steuer-ID roditelja i djeteta",
      "Potvrda o prijavi prebivališta (Meldebescheinigung)",
      "IBAN bankovnog računa",
      "Boravišna dozvola (za ne-EU državljane)",
    ],
    specificFields: [
      { label: "Steuer-ID podnosioca", placeholder: "12 345 678 901", helpText: "Nalazi se na poreskom rješenju ili pismu od Finanzamt" },
      { label: "Steuer-ID djeteta", placeholder: "12 345 678 902" },
      { label: "Datum rođenja djeteta", placeholder: "TT.MM.JJJJ" },
      { label: "IBAN", placeholder: "DE89 3704 0044 0532 0130 00" },
    ],
  },
  {
    id: "kiz",
    slug: "kinderzuschlag",
    title: "Kinderzuschlag Antrag",
    titleDe: "Kinderzuschlag Antrag",
    category: "porodica",
    institution: "Familienkasse der Bundesagentur für Arbeit",
    description: "Dodatak na Kindergeld za roditelje sa nižim primanjima — do 292€ po djetetu mjesečno.",
    eligibility: [
      "Primate Kindergeld",
      "Bruto prihod domaćinstva min. 900€ (par) ili 600€ (samohrani)",
      "Prihod pokriva potrebe bez Bürgergeld-a uz Kinderzuschlag",
    ],
    documents: [
      "Dokaz o primanjima (Lohnabrechnung zadnja 3 mjeseca)",
      "Ugovor o radu",
      "Dokaz o troškovima stanovanja (Mietvertrag, Nebenkostenabrechnung)",
      "Kindergeld rješenje",
    ],
    specificFields: [
      { label: "Neto mjesečni prihod", placeholder: "npr. 2.100 €" },
      { label: "Troškovi stanovanja (Warmmiete)", placeholder: "npr. 850 €" },
      { label: "Broj djece u domaćinstvu", placeholder: "npr. 2" },
    ],
  },
  {
    id: "eltg",
    slug: "elterngeld",
    title: "Elterngeld Antrag",
    titleDe: "Elterngeld Antrag",
    category: "porodica",
    institution: "Elterngeldstelle des jeweiligen Bundeslandes",
    description: "Roditeljski dodatak nakon rođenja djeteta — 65-67% neto plate, 12-14 mjeseci.",
    eligibility: [
      "Roditelj sa prebivalištem u Njemačkoj",
      "Živite sa djetetom u domaćinstvu i brinete se o njemu",
      "Radite max. 32 sata sedmično",
    ],
    documents: [
      "Rodni list djeteta",
      "Potvrda o primanjima (12 mjeseci prije rođenja)",
      "Potvrda poslodavca o roditeljskom odsustvu",
      "Zdravstveno osiguranje kartica",
    ],
    specificFields: [
      { label: "Datum rođenja djeteta", placeholder: "TT.MM.JJJJ" },
      { label: "Planirani period Elterngeld", placeholder: "npr. mjesec 1-12" },
      { label: "Planirano radno vrijeme (sati/sedmično)", placeholder: "npr. 0 ili 20" },
    ],
  },

  // ── Socijalna pomoć i finansije ──
  {
    id: "bg",
    slug: "buergergeld",
    title: "Bürgergeld Antrag",
    titleDe: "Bürgergeld Antrag",
    category: "socijala",
    institution: "Jobcenter",
    description: "Zahtjev za socijalnu pomoć (bivši Hartz IV) — osnovna sredstva za život i stanovanje.",
    eligibility: [
      "Sposobni za rad (min. 3 sata dnevno)",
      "Prebivalište u Njemačkoj",
      "Nedovoljni vlastiti prihodi za pokrivanje troškova života",
    ],
    documents: [
      "Lična karta / pasoš + boravišna dozvola",
      "Meldebescheinigung",
      "Ugovor o zakupu stana + dokaz o troškovima",
      "Izvodi bankovnog računa (zadnja 3 mjeseca)",
      "Otkazno pismo (ako ste izgubili posao)",
    ],
    specificFields: [
      { label: "Razlog zahtjeva", placeholder: "npr. gubitak posla, nedovoljni prihodi" },
      { label: "Mjesečna kirija (Warmmiete)", placeholder: "npr. 650 €" },
      { label: "Štednja / imovina", placeholder: "npr. 3.000 €" },
    ],
  },
  {
    id: "wg",
    slug: "wohngeld",
    title: "Wohngeld Antrag",
    titleDe: "Wohngeld Antrag",
    category: "socijala",
    institution: "Wohngeldstelle der Gemeinde/Stadt",
    description: "Stambeni dodatak za osobe sa nižim primanjima — pomoć za troškove stanovanja.",
    eligibility: [
      "Primate dovoljno za život ali ne za punu kiriju",
      "Ne primate Bürgergeld ili BAföG",
      "Imate ugovor o zakupu stana",
    ],
    documents: [
      "Ugovor o zakupu (Mietvertrag)",
      "Dokaz o primanjima svih članova domaćinstva",
      "Meldebescheinigung",
      "Zadnji obračun plate ili penzije",
    ],
    specificFields: [
      { label: "Ukupna kirija (sa Nebenkosten)", placeholder: "npr. 750 €" },
      { label: "Broj osoba u domaćinstvu", placeholder: "npr. 3" },
      { label: "Ukupni neto prihod domaćinstva", placeholder: "npr. 1.800 €" },
    ],
  },
  {
    id: "gez",
    slug: "gez-befreiung",
    title: "GEZ Befreiung",
    titleDe: "Befreiung vom Rundfunkbeitrag",
    category: "socijala",
    institution: "ARD ZDF Deutschlandradio Beitragsservice",
    description: "Oslobađanje od GEZ pristojbe (18,36€/mjesečno) za primaoce socijalnih pomoći.",
    eligibility: [
      "Primate Bürgergeld, BAföG, Sozialhilfe ili Asylbewerberleistungen",
      "Ili: teški invaliditet (RF oznaka u Schwerbehindertenausweis)",
    ],
    documents: [
      "Rješenje o socijalnoj pomoći (Bürgergeld Bescheid)",
      "Ili: Schwerbehindertenausweis sa RF oznakom",
      "Beitragsnummer (ako je poznata)",
    ],
    specificFields: [
      { label: "Beitragsnummer", placeholder: "123 456 789", helpText: "Na GEZ pismima, gore desno" },
      { label: "Osnov za oslobađanje", placeholder: "npr. Bürgergeld-Bescheid" },
    ],
  },

  // ── Zdravlje i njega ──
  {
    id: "krank",
    slug: "krankengeld",
    title: "Krankengeld Antrag",
    titleDe: "Krankengeld Antrag",
    category: "zdravlje",
    institution: "Krankenkasse (zdravstveno osiguranje)",
    description: "Naknada za bolovanje nakon 6 sedmica — 70% bruto plate, isplaćuje Krankenkasse.",
    eligibility: [
      "Zaposleni sa zakonskim zdravstvenim osiguranjem (GKV)",
      "Bolovanje duže od 6 sedmica (nakon Lohnfortzahlung)",
      "Imate AU-Bescheinigung od ljekara",
    ],
    documents: [
      "AU-Bescheinigung (bolovanje od ljekara)",
      "Zadnji obračun plate",
      "Potvrda poslodavca o prestanku Lohnfortzahlung",
    ],
    specificFields: [
      { label: "Početak bolovanja", placeholder: "TT.MM.JJJJ" },
      { label: "Naziv Krankenkasse", placeholder: "npr. AOK, TK, Barmer" },
      { label: "Versichertennummer", placeholder: "na zdravstvenoj kartici" },
    ],
  },
  {
    id: "pflege",
    slug: "pflegegrad",
    title: "Pflegegrad Antrag",
    titleDe: "Pflegegrad Antrag",
    category: "zdravlje",
    institution: "Pflegekasse (pri zdravstvenom osiguranju)",
    description: "Zahtjev za stepen njege za osobu kojoj je potrebna pomoć u svakodnevnom životu.",
    eligibility: [
      "Osoba treba pomoć u svakodnevnim aktivnostima min. 6 mjeseci",
      "Zakonski zdravstveno osigurana",
    ],
    documents: [
      "Medicinska dokumentacija",
      "Spisak potrebne pomoći (kupanje, oblačenje, kretanje itd.)",
      "Kontakt podaci ljekara",
    ],
    specificFields: [
      { label: "Za koga se podnosi zahtjev", placeholder: "Ime i prezime osobe" },
      { label: "Vrsta potrebne pomoći", placeholder: "npr. kupanje, kretanje, hranjenje" },
      { label: "Pflegekasse naziv", placeholder: "npr. AOK Pflegekasse" },
    ],
  },

  // ── Stanovanje i prijava ──
  {
    id: "anm",
    slug: "anmeldung",
    title: "Anmeldung / Ummeldung",
    titleDe: "Anmeldung einer Wohnung",
    category: "stanovanje",
    institution: "Bürgeramt / Einwohnermeldeamt",
    description: "Prijava ili promjena prebivališta — obavezno u roku od 14 dana od useljenja.",
    eligibility: [
      "Svako ko se useli u stan u Njemačkoj",
      "Rok: 14 dana od useljenja",
    ],
    documents: [
      "Lična karta ili pasoš",
      "Wohnungsgeberbestätigung (potvrda stanodavca)",
      "Ugovor o zakupu (preporučeno)",
    ],
    specificFields: [
      { label: "Datum useljenja", placeholder: "TT.MM.JJJJ" },
      { label: "Nova adresa", placeholder: "Straße, Hausnummer, PLZ, Ort" },
      { label: "Prethodna adresa", placeholder: "Straße, Hausnummer, PLZ, Ort" },
    ],
  },
  {
    id: "wbs",
    slug: "wohnberechtigungsschein",
    title: "Wohnberechtigungsschein (WBS)",
    titleDe: "Wohnberechtigungsschein",
    category: "stanovanje",
    institution: "Wohnungsamt der Gemeinde/Stadt",
    description: "Potvrda za pristup socijalnim stanovima sa nižom kirijom.",
    eligibility: [
      "Prihod ispod određene granice (zavisi od Bundesland-a)",
      "Prebivalište u gradu gdje se prijavljujete",
      "Niste vlasnik nekretnine",
    ],
    documents: [
      "Dokaz o primanjima (svi članovi domaćinstva)",
      "Meldebescheinigung",
      "Lična karta / pasoš",
      "Ugovor o radu ili Bürgergeld Bescheid",
    ],
    specificFields: [
      { label: "Broj osoba u domaćinstvu", placeholder: "npr. 2" },
      { label: "Godišnji bruto prihod", placeholder: "npr. 25.000 €" },
      { label: "Željeni grad/kvart", placeholder: "npr. Berlin-Neukölln" },
    ],
  },

  // ── Dokumenti i administracija ──
  {
    id: "fz",
    slug: "fuehrungszeugnis",
    title: "Führungszeugnis",
    titleDe: "Führungszeugnis",
    category: "dokumenti",
    institution: "Bundesamt für Justiz (preko Bürgeramt)",
    description: "Potvrda o nekažnjavanju — često potrebna za posao, volontiranje ili dozvole.",
    eligibility: [
      "Osoba starija od 14 godina",
      "Sa prebivalištem u Njemačkoj",
    ],
    documents: [
      "Lična karta ili pasoš",
      "Meldebescheinigung (ponekad)",
      "13€ pristojba",
    ],
    specificFields: [
      { label: "Vrsta Führungszeugnis", placeholder: "Privatno ili Erweitertes" },
      { label: "Svrha", placeholder: "npr. za posao, za Ehrenamt" },
    ],
  },
  {
    id: "aufv",
    slug: "aufenthaltstitel-verlaengerung",
    title: "Aufenthaltstitel Verlängerung",
    titleDe: "Verlängerung des Aufenthaltstitels",
    category: "dokumenti",
    institution: "Ausländerbehörde",
    description: "Produženje boravišne dozvole — podnijeti zahtjev min. 6-8 sedmica prije isteka.",
    eligibility: [
      "Posjedujete boravišnu dozvolu koja ističe",
      "Ispunjavate uslove za produženje (posao, integracija itd.)",
    ],
    documents: [
      "Trenutna boravišna dozvola",
      "Pasoš (validan min. 6 mjeseci)",
      "Biometrijska fotografija",
      "Ugovor o radu / dokaz o primanjima",
      "Dokaz o zdravstvenom osiguranju",
      "Meldebescheinigung",
      "A1/B1 certifikat njemačkog jezika (zavisi od vrste dozvole)",
    ],
    specificFields: [
      { label: "Vrsta trenutne dozvole", placeholder: "npr. §18a, §28, Blaue Karte" },
      { label: "Datum isteka", placeholder: "TT.MM.JJJJ" },
      { label: "Ausländerbehörde grad", placeholder: "npr. München" },
    ],
  },
];

export function getFormBySlug(slug: string): FormEntry | undefined {
  return FORMS_REGISTRY.find((f) => f.slug === slug);
}

export function getFormsByCategory(cat: FormCategory): FormEntry[] {
  return FORMS_REGISTRY.filter((f) => f.category === cat);
}
