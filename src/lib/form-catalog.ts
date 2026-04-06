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
  titleKey?: string; // i18n key
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
    titleKey: "catalog.dolazak",
    items: [
      { slug: "anmeldung", label: "Anmeldung / Ummeldung — prijava / promjena adrese", desc: "Prijava ili promjena adrese stanovanja u Njemačkoj." },
      { slug: "steuer-id", label: "Steuer-ID — poreski identifikacijski broj", desc: "Poreski ID broj koji ti treba za posao i prijavu." },
      { slug: "fuehrerschein", label: "Führerschein — vozačka dozvola", desc: "Zamjena i priznavanje vozačke dozvole u Njemačkoj." },
      { slug: "fahrzeugzulassung", label: "Fahrzeugzulassung — registracija vozila", desc: "Registracija motornih vozila u Njemačkoj." },
    ],
  },
  {
    id: "porodica",
    icon: "👨‍👩‍👧",
    title: "Porodica i djeca",
    titleKey: "catalog.porodica",
    items: [
      { slug: "kindergeld", label: "Kindergeld — dječiji dodatak", desc: "Mjesečna novčana pomoć države za djecu." },
      { slug: "elterngeld", label: "Elterngeld — roditeljski dodatak", desc: "Naknada za roditelje nakon rođenja djeteta kao zamjena dijela prihoda." },
      { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld — naknada za porodiljsko", desc: "Naknada za vrijeme zaštitnog perioda prije i poslije poroda." },
      { slug: "kinderzuschlag", label: "Kinderzuschlag — dodatak za djecu", desc: "Dodatna pomoć za porodice sa manjim prihodima." },
      { slug: "krippengeld-bayern", label: "Krippengeld (Bayern) — dodatak za vrtić (Bavarska)", desc: "Pomoć za troškove vrtića u Bavarskoj za djecu do 3 godine." },
    ],
  },
  {
    id: "buergergeld",
    icon: "💰",
    title: "Bürgergeld",
    titleKey: "catalog.buergergeld",
    items: [
      { slug: "hauptantrag", label: "Bürgergeld Hauptantrag — glavni zahtjev", desc: "Centralni formular za podnošenje zahtjeva za Bürgergeld." },
      { slug: "weiterbewilligung", label: "Weiterbewilligungsantrag — produženje odobrenja", desc: "Produženje Bürgergelda nakon isteka odobrenja." },
    ],
    subGroups: [
      {
        id: "buergergeld-anlagen",
        title: "Anlagen / Prilozi",
        items: [
          { slug: "anlage-kdu", label: "Anlage KDU — prilog za troškove stanovanja", desc: "Prilog za troškove stanovanja i grijanja." },
          { slug: "anlage-ek", label: "Anlage EK — prilog za prihode", desc: "Prihodi svake osobe 15+ u zajednici." },
          { slug: "anlage-eks", label: "Anlage EKS — prilog za samozaposlene", desc: "Prihodi i rashodi samozaposlenih." },
          { slug: "anlage-vm", label: "Anlage VM — prilog za imovinu", desc: "Imovina svih osoba u zajednici." },
          { slug: "anlage-wep", label: "Anlage WEP — prilog za partnera/djecu", desc: "Podaci za partnera/djecu 15–24 god." },
          { slug: "anlage-ki", label: "Anlage KI — prilog za dijete do 15 god.", desc: "Podaci za dijete mlađe od 15 godina." },
          { slug: "anlage-sv", label: "Anlage SV — prilog za zdravstveno osiguranje", desc: "Status zdravstvenog osiguranja." },
          { slug: "anlage-bb", label: "Anlage BB — prilog za vanredne troškove", desc: "Zahtjev za vanredni trošak." },
          { slug: "anlage-ve", label: "Anlage VE — prilog za zajedničko domaćinstvo", desc: "Provjera zajednice slične braku." },
          { slug: "anlage-hg", label: "Anlage HG — prilog za stanovanje sa srodnicima", desc: "Zajedničko stanovanje sa srodnicima." },
          { slug: "anlage-meb", label: "Anlage MEB — prilog za medicinsku ishranu", desc: "Doplatak za medicinsku ishranu." },
          { slug: "anlage-uf", label: "Anlage UF — prilog o šteti od treće osobe", desc: "Upitnik o nesreći/šteti od treće osobe." },
          { slug: "anlage-se", label: "Anlage SE — oslobađanje od liječničke tajne", desc: "Oslobađanje od liječničke tajne." },
          { slug: "anlage-uh1", label: "Anlage UH1 — alimentacija nakon razvoda", desc: "Alimentacija nakon rastave/razvoda." },
          { slug: "anlage-uh2", label: "Anlage UH2 — alimentacija trudne osobe", desc: "Alimentacija trudne osobe." },
          { slug: "anlage-uh3", label: "Anlage UH3 — alimentacija djeteta", desc: "Alimentacija djeteta od odsutnog roditelja." },
          { slug: "nichterreichbarkeit", label: "Nichterreichbarkeit — prijava odsutnosti Jobcentru", desc: "Prijava privremene odsutnosti Jobcentru." },
          { slug: "arbeitsbescheinigung", label: "Arbeitsbescheinigung — potvrda o zaposlenju", desc: "Potvrda o zaposlenju — popunjava SAMO poslodavac." },
          { slug: "antragsruecknahme", label: "Antragsrücknahme — povlačenje zahtjeva", desc: "Povlačenje podnesenog Bürgergeld zahtjeva." },
        ],
      },
    ],
  },
  {
    id: "wohngeld",
    icon: "🏡",
    title: "Wohngeld",
    titleKey: "catalog.wohngeld",
    items: [
      { slug: "wohngeld", label: "Wohngeld — stambeni dodatak", desc: "Finansijska pomoć za troškove stanovanja." },
    ],
  },
  {
    id: "posao",
    icon: "💼",
    title: "Posao i prihodi",
    titleKey: "catalog.posao",
    items: [
      { slug: "krankenkasse", label: "Krankenkasse — zdravstveno osiguranje", desc: "Prijava u zdravstveno osiguranje u Njemačkoj." },
      { slug: "steuerklassenwechsel", label: "Steuerklassenwechsel — promjena porezne klase", desc: "Promjena poreske klase, npr. nakon braka." },
      { slug: "arbeitslosengeld", label: "Arbeitslosengeld I — naknada za nezaposlene", desc: "Naknada ako si izgubio posao i ispunjavaš uslove." },
    ],
  },
  {
    id: "obrazovanje",
    icon: "🎓",
    title: "Škola i obrazovanje",
    titleKey: "catalog.obrazovanje",
    items: [
      { slug: "bafoeg", label: "BAföG — finansijska pomoć za studij/školu", desc: "Finansijska pomoć za školovanje ili studij." },
      { slug: "schueler-bafoeg", label: "Schüler-BAföG — učenički BAföG", desc: "Učenički BAföG — finansijska pomoć za učenike koji žive odvojeno od roditelja." },
      { slug: "integrationskurs", label: "Integrationskurs — integracijski kurs njemačkog", desc: "Kurs njemačkog jezika i orijentacije." },
    ],
  },
  {
    id: "dokumenti",
    icon: "📋",
    title: "Dokumenti i administracija",
    titleKey: "catalog.dokumenti",
    items: [
      { slug: "fuehrungszeugnis", label: "Führungszeugnis — potvrda o nekažnjavanju", desc: "Potvrda o nekažnjavanju." },
      { slug: "kirchenaustritt", label: "Kirchenaustritt — odjava iz crkve", desc: "Odjava iz crkve radi prestanka crkvenog poreza." },
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
