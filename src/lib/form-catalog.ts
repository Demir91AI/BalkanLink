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
}

export const formCatalog: FormGroup[] = [
  {
    id: "wichtigste",
    icon: "⭐",
    title: "Najvažnije",
    items: [
      { slug: "anmeldung", label: "Anmeldung", desc: "Prijava adrese stanovanja u Njemačkoj." },
      { slug: "steuerklassenwechsel", label: "Steuer-ID", desc: "Poreski identifikacijski broj koji ti treba za posao i prijavu." },
      { slug: "familienversicherung", label: "Krankenkasse", desc: "Prijava u zdravstveno osiguranje u Njemačkoj." },
      { slug: "kindergeld", label: "Kindergeld", desc: "Mjesečna novčana pomoć države za djecu." },
    ],
  },
  {
    id: "porodica",
    icon: "👶",
    title: "Porodica i djeca",
    items: [
      { slug: "elterngeld", label: "Elterngeld", desc: "Naknada za roditelje nakon rođenja djeteta kao zamjena dijela prihoda." },
      { slug: "mutterschaftsgeld", label: "Mutterschaftsgeld", desc: "Naknada za vrijeme zaštitnog perioda prije i poslije poroda." },
      { slug: "kinderzuschlag", label: "Kinderzuschlag", desc: "Dodatna pomoć za porodice sa manjim prihodima." },
      { slug: "kita-zuschuss", label: "Kita-Zuschuss", desc: "Pomoć za troškove vrtića ili jaslica." },
      { slug: "krippengeld-bayern", label: "Krippengeld", desc: "Dodatak za troškove jaslica u Bavarskoj." },
      { slug: "unterhaltsvorschuss", label: "Unterhaltsvorschuss", desc: "Alimentacijski predujam za samohrane roditelje." },
    ],
  },
  {
    id: "socijala",
    icon: "📄",
    title: "Socijala i pomoć",
    items: [
      { slug: "buergergeld", label: "Bürgergeld", desc: "Osnovna pomoć za život ako prihod nije dovoljan." },
      { slug: "wohngeld", label: "Wohngeld", desc: "Finansijska pomoć za troškove stanovanja ako imaš manja primanja." },
      { slug: "sozialhilfe", label: "Sozialhilfe / Grundsicherung", desc: "Osnovna socijalna pomoć za osobe koje ne mogu raditi." },
      { slug: "bildung-teilhabe", label: "Bildung und Teilhabe", desc: "Pomoć za školske troškove, sport i kulturu za djecu." },
    ],
  },
  {
    id: "posao",
    icon: "💼",
    title: "Posao i prihodi",
    items: [
      { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Naknada ako si izgubio posao i ispunjavaš uslove osiguranja." },
      { slug: "kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "Naknada kad firma privremeno smanji radne sate." },
      { slug: "krankengeld", label: "Krankengeld", desc: "Naknada plate kada si duže vrijeme bolestan." },
      { slug: "bildungsgutschein", label: "Bildungsgutschein", desc: "Vaučer za finansiranje prekvalifikacije ili dodatnog obrazovanja." },
    ],
  },
  {
    id: "obrazovanje",
    icon: "🎓",
    title: "Škola, studij i obrazovanje",
    items: [
      { slug: "bafoeg", label: "BAföG", desc: "Finansijska pomoć za školovanje ili studij." },
      { slug: "schueler-bafoeg", label: "Schüler-BAföG", desc: "Finansijska pomoć za učenike srednjih škola." },
      { slug: "integrationskurs", label: "Integrationskurs", desc: "Kurs njemačkog jezika i orijentacije za nove stanovnike." },
      { slug: "lernfoerderung", label: "Lernförderung", desc: "Pomoć za dopunsku nastavu za djecu sa poteškoćama u školi." },
    ],
  },
  {
    id: "stanovanje",
    icon: "🏠",
    title: "Stanovanje i život",
    items: [
      { slug: "wbs", label: "WBS", desc: "Potvrda koja ti može omogućiti pristup socijalnim stanovima." },
      { slug: "gez-anmeldung", label: "Rundfunkbeitrag / Befreiung", desc: "Prijava ili oslobađanje od obavezne RTV takse." },
      { slug: "heizkostenzuschuss", label: "Heizkostenzuschuss", desc: "Dodatak za troškove grijanja." },
    ],
  },
  {
    id: "dokumenti",
    icon: "📑",
    title: "Dokumenti i administracija",
    items: [
      { slug: "fuehrungszeugnis", label: "Führungszeugnis", desc: "Potvrda o nekažnjavanju koju često traže poslodavci ili institucije." },
      { slug: "aufenthaltstitel-verlaengerung", label: "Aufenthaltstitel Verlängerung", desc: "Zahtjev za produženje boravišne dozvole." },
      { slug: "steuerklassenwechsel", label: "Steuerklassenwechsel", desc: "Promjena poreske klase, npr. nakon braka ili promjene porodične situacije." },
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
  }
  return result;
}
