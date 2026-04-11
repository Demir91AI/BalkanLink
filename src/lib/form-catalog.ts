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
    title: "Dolazak u Njemačku",
    items: [
      { slug: "anmeldung", label: "Anmeldung / Ummeldung", desc: "Prijava ili promjena adrese stanovanja u Njemačkoj." },
      { slug: "steuer-id", label: "Steuer-ID", desc: "Poreski identifikacioni broj za rad i prijavu." },
      { slug: "fuehrerschein", label: "Führerschein", desc: "Prepisivanje i priznavanje vozačke dozvole u Njemačkoj." },
      { slug: "fahrzeugzulassung", label: "Fahrzeugzulassung", desc: "Registracija motornih vozila u Njemačkoj." },
    ],
  },
  {
    id: "porodica",
    icon: "👨‍👩‍👧",
    title: "Porodica i djeca",
    items: [
      { slug: "kindergeld", label: "Kindergeld", desc: "Mjesečna državna naknada za djecu." },
      { slug: "elterngeld", label: "Elterngeld", desc: "Naknada za roditelje nakon rođenja djeteta." },
      { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld", desc: "Naknada tokom zaštitnog perioda prije i poslije poroda." },
      { slug: "kinderzuschlag", label: "Kinderzuschlag", desc: "Dodatna podrška za porodice s niskim primanjima." },
      { slug: "krippengeld-bayern", label: "Krippengeld (Bayern)", desc: "Subvencija za troškove vrtića u Bavarskoj za djecu do 3 godine." },
    ],
  },
  {
    id: "buergergeld",
    icon: "💰",
    title: "Bürgergeld",
    items: [
      { slug: "hauptantrag", label: "Bürgergeld Hauptantrag", desc: "Centralni formular za podnošenje zahtjeva za Bürgergeld." },
      { slug: "weiterbewilligung", label: "Weiterbewilligungsantrag", desc: "Produženje Bürgergeld-a nakon isteka perioda odobravanja." },
    ],
    subGroups: [
      {
        id: "buergergeld-anlagen",
        title: "Prilozi (Anlagen)",
        items: [
          { slug: "anlage-kdu", label: "Anlage KDU — Stanovanje i grijanje", desc: "Prilog za troškove stanovanja i grijanja." },
          { slug: "anlage-ek", label: "Anlage EK — Prihodi", desc: "Prihodi svake osobe starije od 15 u zajednici." },
          { slug: "anlage-eks", label: "Anlage EKS — Samozaposleni", desc: "Prihodi i rashodi samozaposlenih osoba." },
          { slug: "anlage-vm", label: "Anlage VM — Imovina", desc: "Imovina svih osoba u zajednici." },
          { slug: "anlage-wep", label: "Anlage WEP — Partner/Djeca", desc: "Podaci o partneru/djeci 15–24 godine." },
          { slug: "anlage-ki", label: "Anlage KI — Dijete ispod 15", desc: "Podaci o djeci mlađoj od 15 godina." },
          { slug: "anlage-sv", label: "Anlage SV — Socijalno osiguranje", desc: "Status zdravstvenog osiguranja." },
          { slug: "anlage-bb", label: "Anlage BB — Posebne potrebe", desc: "Zahtjev za jednokratne posebne potrebe." },
          { slug: "anlage-ve", label: "Anlage VE — Zajednica odgovornosti", desc: "Provjera vanbračne zajednice." },
          { slug: "anlage-hg", label: "Anlage HG — Zajednica domaćinstva", desc: "Zajednički život sa srodnicima." },
          { slug: "anlage-meb", label: "Anlage MEB — Dodatna ishrana", desc: "Dodatni troškovi za posebnu ishranu." },
          { slug: "anlage-uf", label: "Anlage UF — Upitnik o nesreći", desc: "Upitnik o nesreći/šteti od trećih lica." },
          { slug: "anlage-se", label: "Anlage SE — Oslobađanje tajnosti", desc: "Oslobađanje od ljekarske tajne." },
          { slug: "anlage-uh1", label: "Anlage UH1 — Izdržavanje nakon razvoda", desc: "Izdržavanje nakon razdvajanja/razvoda." },
          { slug: "anlage-uh2", label: "Anlage UH2 — Izdržavanje trudnice", desc: "Izdržavanje za trudne osobe." },
          { slug: "anlage-uh3", label: "Anlage UH3 — Dječije izdržavanje", desc: "Dječije izdržavanje od odsutnog roditelja." },
          { slug: "nichterreichbarkeit", label: "Nichterreichbarkeit", desc: "Prijava privremenog odsustva Jobcenteru." },
          { slug: "arbeitsbescheinigung", label: "Arbeitsbescheinigung", desc: "Potvrda poslodavca — popunjava SAMO poslodavac." },
          { slug: "antragsruecknahme", label: "Antragsrücknahme", desc: "Povlačenje podnesenog zahtjeva za Bürgergeld." },
        ],
      },
    ],
  },
  {
    id: "wohngeld",
    icon: "🏡",
    title: "Wohngeld",
    items: [
      { slug: "wohngeld", label: "Wohngeld", desc: "Finansijska podrška za troškove stanovanja." },
    ],
  },
  {
    id: "posao",
    icon: "💼",
    title: "Rad i karijera",
    items: [
      { slug: "krankenkasse", label: "Krankenkasse", desc: "Prijava na zdravstveno osiguranje u Njemačkoj." },
      { slug: "steuerklassenwechsel", label: "Steuerklassenwechsel", desc: "Promjena porezne klase, npr. nakon vjenčanja." },
      { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Naknada za nezaposlenost uz ispunjene uslove." },
    ],
  },
  {
    id: "obrazovanje",
    icon: "🎓",
    title: "Obrazovanje",
    items: [
      { slug: "bafoeg", label: "BAföG", desc: "Finansijska podrška za studij ili školu." },
      { slug: "schueler-bafoeg", label: "Schüler-BAföG", desc: "Finansijska podrška za učenike koji žive odvojeno od roditelja." },
      { slug: "integrationskurs", label: "Integrationskurs", desc: "Kurs jezika i orijentacije." },
    ],
  },
  {
    id: "dokumenti",
    icon: "📋",
    title: "Dokumenti i potvrde",
    items: [
      { slug: "grundsicherung", label: "Grundsicherung im Alter", desc: "Osnovna pomoć za starije osobe i osobe s invaliditetom." },
      { slug: "fuehrungszeugnis", label: "Führungszeugnis", desc: "Potvrda o nekažnjavanju." },
      { slug: "kirchenaustritt", label: "Kirchenaustritt", desc: "Istupanje iz crkve radi ukidanja crkvenog poreza." },
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
