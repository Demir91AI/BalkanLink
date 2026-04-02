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
    id: "buergergeld",
    icon: "💰",
    title: "Bürgergeld",
    items: [
      { slug: "hauptantrag", label: "Bürgergeld Hauptantrag (HA)", desc: "Centralni formular za podnošenje zahtjeva za Bürgergeld." },
      { slug: "weiterbewilligung", label: "Weiterbewilligungsantrag (WBA)", desc: "Produženje Bürgergelda nakon isteka odobrenja." },
    ],
    subGroups: [
      {
        id: "buergergeld-anlagen",
        title: "Anlagen / Prilozi",
        items: [
          { slug: "anlage-kdu", label: "Anlage KDU", desc: "Prilog za troškove stanovanja i grijanja." },
          { slug: "anlage-ek", label: "Anlage EK", desc: "Prihodi svake osobe 15+ u zajednici." },
          { slug: "anlage-eks", label: "Anlage EKS", desc: "Prihodi i rashodi samozaposlenih." },
          { slug: "anlage-vm", label: "Anlage VM", desc: "Imovina svih osoba u zajednici." },
          { slug: "anlage-wep", label: "Anlage WEP", desc: "Podaci za partnera/djecu 15–24 god." },
          { slug: "anlage-ki", label: "Anlage KI", desc: "Podaci za dijete mlađe od 15 godina." },
          { slug: "anlage-sv", label: "Anlage SV", desc: "Status zdravstvenog osiguranja." },
          { slug: "anlage-bb", label: "Anlage BB", desc: "Zahtjev za vanredni trošak." },
          { slug: "anlage-ve", label: "Anlage VE", desc: "Provjera zajednice slične braku." },
          { slug: "anlage-hg", label: "Anlage HG", desc: "Zajedničko stanovanje sa srodnicima." },
          { slug: "anlage-meb", label: "Anlage MEB", desc: "Doplatak za medicinsku ishranu." },
          { slug: "anlage-uf", label: "Anlage UF", desc: "Upitnik o nesreći/šteti od treće osobe." },
          { slug: "anlage-se", label: "Anlage SE", desc: "Oslobađanje od liječničke tajne." },
          { slug: "anlage-uh1", label: "Anlage UH1", desc: "Alimentacija nakon rastave/razvoda." },
          { slug: "anlage-uh2", label: "Anlage UH2", desc: "Alimentacija trudne osobe." },
          { slug: "anlage-uh3", label: "Anlage UH3", desc: "Alimentacija djeteta od odsutnog roditelja." },
          { slug: "nichterreichbarkeit", label: "Anfrage Nichterreichbarkeit", desc: "Prijava privremene odsutnosti Jobcentru." },
          { slug: "arbeitsbescheinigung", label: "Arbeitsbescheinigung § 57", desc: "Potvrda o zaposlenju — popunjava SAMO poslodavac." },
          { slug: "antragsruecknahme", label: "Antragsrücknahme", desc: "Povlačenje podnesenog Bürgergeld zahtjeva." },
        ],
      },
    ],
  },
  {
    id: "wohngeld",
    icon: "🏡",
    title: "Wohngeld",
    items: [
      { slug: "wohngeld", label: "Wohngeld", desc: "Finansijska pomoć za troškove stanovanja." },
    ],
  },
  {
    id: "sozialhilfe",
    icon: "🤝",
    title: "Sozialhilfe",
    items: [
      { slug: "sozialhilfe", label: "Sozialhilfe", desc: "Osnovna pomoć za osobe koje ne mogu raditi." },
    ],
  },
  {
    id: "heizkostenzuschuss",
    icon: "🔥",
    title: "Heizkostenzuschuss",
    items: [
      { slug: "heizkostenzuschuss", label: "Heizkostenzuschuss", desc: "Dodatak za troškove grijanja." },
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
