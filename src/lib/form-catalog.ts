/** Grouped form catalog – ordered by user priority, not alphabet */

export interface FormEntry {
  slug: string;
  label: string;
  desc: string;
}

export interface FormGroup {
  id: string;
  icon: string; // emoji
  title: string;
  items: FormEntry[];
  /** Sub-groups within a group (e.g. Bürgergeld Anlagen) */
  subGroups?: {
    id: string;
    title: string;
    items: FormEntry[];
  }[];
}

export const formCatalog: FormGroup[] = [
  {
    id: "dolazak",
    icon: "🏠",
    title: "Dolazak i prijava",
    items: [
      { slug: "anmeldung", label: "Anmeldung / Ummeldung", desc: "Prijava ili promjena adrese stanovanja u Njemačkoj." },
      { slug: "steuer-id", label: "Steuer-ID", desc: "Poreski identifikacijski broj koji ti treba za posao i prijavu." },
      { slug: "aufenthaltstitel", label: "Aufenthaltstitel / Viza Navigator", desc: "Boravišna dozvola i informacije o viznom postupku." },
    ],
  },
  {
    id: "porodica",
    icon: "👨‍👩‍👧",
    title: "Porodica i djeca",
    items: [
      { slug: "kindergeld", label: "Kindergeld", desc: "Mjesečna novčana pomoć države za djecu." },
      { slug: "elterngeld", label: "Elterngeld", desc: "Naknada za roditelje nakon rođenja djeteta kao zamjena dijela prihoda." },
      { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld", desc: "Naknada za vrijeme zaštitnog perioda prije i poslije poroda." },
      { slug: "kinderzuschlag", label: "Kinderzuschlag", desc: "Dodatna pomoć za porodice sa manjim prihodima." },
      { slug: "krippengeld-bayern", label: "Krippengeld (Bayern)", desc: "Pomoć za troškove vrtića u Bayernu za djecu do 3 godine." },
    ],
  },
  {
    id: "socijala",
    icon: "💰",
    title: "Socijalna pomoć",
    items: [
      // Primary - Bürgergeld Hauptantrag
      { slug: "hauptantrag", label: "Bürgergeld Hauptantrag (HA)", desc: "Centralni formular za podnošenje zahtjeva za Bürgergeld." },
    ],
    subGroups: [
      {
        id: "buergergeld-anlagen",
        title: "Bürgergeld — Prilozi (Anlagen)",
        items: [
          { slug: "weiterbewilligung", label: "Weiterbewilligungsantrag (WBA)", desc: "Produženje Bürgergelda nakon isteka odobrenja." },
          { slug: "anlage-kdu", label: "Anlage KDU (Troškovi stanovanja)", desc: "Prilog za troškove stanovanja i grijanja." },
          { slug: "anlage-ek", label: "Anlage EK (Prihodi)", desc: "Prihodi svake osobe 15+ u zajednici." },
          { slug: "anlage-eks", label: "Anlage EKS (Samozaposleni)", desc: "Prihodi i rashodi samozaposlenih." },
          { slug: "anlage-vm", label: "Anlage VM (Imovina)", desc: "Imovina svih osoba u zajednici." },
          { slug: "anlage-wep", label: "Anlage WEP (Dodatna osoba)", desc: "Podaci za partnera/djecu 15–24 god." },
          { slug: "anlage-ki", label: "Anlage KI (Dijete do 15)", desc: "Podaci za dijete mlađe od 15 godina." },
          { slug: "anlage-sv", label: "Anlage SV (Osiguranje)", desc: "Status zdravstvenog osiguranja." },
          { slug: "anlage-bb", label: "Anlage BB (Poseban trošak)", desc: "Zahtjev za vanredni trošak." },
          { slug: "anlage-ve", label: "Anlage VE (Partnerska zajednica)", desc: "Provjera zajednice slične braku." },
          { slug: "anlage-hg", label: "Anlage HG (Domaćinstvo)", desc: "Zajedničko stanovanje sa srodnicima." },
          { slug: "anlage-meb", label: "Anlage MEB (Med. ishrana)", desc: "Doplatak za medicinsku ishranu." },
          { slug: "anlage-uf", label: "Anlage UF (Nesreća)", desc: "Upitnik o nesreći/šteti od treće osobe." },
          { slug: "anlage-se", label: "Anlage SE (Liječ. tajna)", desc: "Oslobađanje od liječničke tajne." },
          { slug: "anlage-uh1", label: "Anlage UH1 (Alimentacija)", desc: "Alimentacija nakon rastave/razvoda." },
          { slug: "anlage-uh2", label: "Anlage UH2 (Trudnoća)", desc: "Alimentacija trudne osobe." },
          { slug: "anlage-uh3", label: "Anlage UH3 (Dijete)", desc: "Alimentacija djeteta od odsutnog roditelja." },
          { slug: "nichterreichbarkeit", label: "Anfrage Nichterreichbarkeit (ANE)", desc: "Prijava privremene odsutnosti Jobcentru." },
          { slug: "arbeitsbescheinigung", label: "Arbeitsbescheinigung § 57", desc: "Potvrda o zaposlenju — popunjava SAMO poslodavac." },
          { slug: "antragsruecknahme", label: "Erklärung der Antragsrücknahme", desc: "Povlačenje podnesenog Bürgergeld zahtjeva." },
        ],
      },
      {
        id: "socijala-ostalo",
        title: "Ostala socijalna pomoć",
        items: [
          { slug: "buergergeld", label: "Bürgergeld (Pregled)", desc: "Osnovna pomoć za život ako prihod nije dovoljan." },
          { slug: "wohngeld", label: "Wohngeld (Stambeni dodatak)", desc: "Finansijska pomoć za troškove stanovanja." },
          { slug: "sozialhilfe", label: "Sozialhilfe (Socijalna pomoć)", desc: "Osnovna pomoć za osobe koje ne mogu raditi." },
          { slug: "heizkostenzuschuss", label: "Heizkostenzuschuss (Dodatak za grijanje)", desc: "Dodatak za troškove grijanja." },
        ],
      },
    ],
  },
  {
    id: "posao",
    icon: "💼",
    title: "Posao i prihodi",
    items: [
      { slug: "krankenkasse", label: "Krankenkasse Anmeldung", desc: "Prijava u zdravstveno osiguranje u Njemačkoj." },
      { slug: "steuerklassenwechsel", label: "Steuerklassenwechsel", desc: "Promjena poreske klase, npr. nakon braka." },
      { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Naknada ako si izgubio posao i ispunjavaš uslove." },
      { slug: "kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "Naknada kad firma privremeno smanji radne sate." },
      { slug: "bildungsgutschein", label: "Bildungsgutschein", desc: "Vaučer za finansiranje prekvalifikacije." },
    ],
  },
  {
    id: "obrazovanje",
    icon: "🎓",
    title: "Škola i obrazovanje",
    items: [
      { slug: "bafoeg", label: "BAföG", desc: "Finansijska pomoć za školovanje ili studij." },
      { slug: "schueler-bafoeg", label: "Schüler-BAföG", desc: "Finansijska pomoć za učenike srednjih škola." },
      { slug: "integrationskurs", label: "Integrationskurs", desc: "Kurs njemačkog jezika i orijentacije." },
      { slug: "lernfoerderung", label: "Lernförderung", desc: "Pomoć za dopunsku nastavu za djecu." },
    ],
  },
  {
    id: "dokumenti",
    icon: "📋",
    title: "Dokumenti i administracija",
    items: [
      { slug: "fuehrungszeugnis", label: "Führungszeugnis", desc: "Potvrda o nekažnjavanju." },
      { slug: "kirchenaustritt", label: "Kirchenaustritt", desc: "Odjava iz crkve radi prestanka crkvenog poreza." },
    ],
  },
];

/** Flat list of all unique slugs for search */
export function getAllFormEntries(): FormEntry[] {
  const seen = new Set<string>();
  const result: FormEntry[] = [];
  for (const group of formCatalog) {
    for (const item of group.items) {
      if (!seen.has(item.slug)) {
        seen.add(item.slug);
        result.push(item);
      }
    }
    if (group.subGroups) {
      for (const sub of group.subGroups) {
        for (const item of sub.items) {
          if (!seen.has(item.slug)) {
            seen.add(item.slug);
            result.push(item);
          }
        }
      }
    }
  }
  return result;
}
