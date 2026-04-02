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
      { slug: "buergergeld", label: "Bürgergeld", desc: "Osnovna pomoć za život ako prihod nije dovoljan." },
      { slug: "hauptantrag", label: "Hauptantrag Bürgergeld (HA)", desc: "Centralni formular za podnošenje zahtjeva za Bürgergeld." },
      { slug: "weiterbewilligung", label: "Weiterbewilligungsantrag (WBA)", desc: "Produženje Bürgergelda nakon isteka odobrenja." },
      { slug: "anlage-kdu", label: "Anlage KDU — Kosten der Unterkunft", desc: "Troškovi stanovanja i grijanja." },
      { slug: "anlage-ek", label: "Anlage EK — Einkommen", desc: "Prihodi svake osobe 15+ u Bedarfsgemeinschaft." },
      { slug: "anlage-eks", label: "Anlage EKS — Einkommen Selbständige", desc: "Prihodi i rashodi samozaposlenih u BG." },
      { slug: "anlage-vm", label: "Anlage VM — Vermögen", desc: "Imovina svih osoba u Bedarfsgemeinschaft." },
      { slug: "anlage-wep", label: "Anlage WEP — Weitere Person", desc: "Podaci za partnera/djecu 15–24 god. u BG." },
      { slug: "anlage-ki", label: "Anlage KI — Kind unter 15", desc: "Podaci za dijete mlađe od 15 godina u BG." },
      { slug: "anlage-uh1", label: "Anlage UH1 — Trennungsunterhalt", desc: "Alimentacija nakon rastave/razvoda." },
      { slug: "anlage-uh2", label: "Anlage UH2 — Unterhalt Schwangerschaft", desc: "Alimentacija trudne osobe od oca djeteta." },
      { slug: "anlage-uh3", label: "Anlage UH3 — Kindesunterhalt", desc: "Alimentacija djeteta od odsutnog roditelja." },
      { slug: "nichterreichbarkeit", label: "Anfrage Nichterreichbarkeit (ANE)", desc: "Prijava privremene odsutnosti Jobcentru." },
      { slug: "anlage-bb", label: "Anlage BB — Besonderer Bedarf", desc: "Zahtjev za vanredni trošak koji nije pokriven Regelsatzom." },
      { slug: "anlage-sv", label: "Anlage SV — Sozialversicherung", desc: "Status zdravstvenog osiguranja tokom Bürgergeld primanja." },
      { slug: "anlage-ve", label: "Anlage VE — Einstehensgemeinschaft", desc: "Provjera da li živiš u eheähnliche Gemeinschaft." },
      { slug: "anlage-hg", label: "Anlage HG — Haushaltsgemeinschaft", desc: "Zajedničko stanovanje sa srodnicima." },
      { slug: "anlage-meb", label: "Anlage MEB — Mehrbedarf Ernährung", desc: "Doplatak za medicinsku ishranu." },
      { slug: "anlage-uf", label: "Anlage UF — Unfallfragebogen", desc: "Upitnik o nesreći/šteti od treće osobe." },
      { slug: "anlage-se", label: "Anlage SE — Schweigepflichtentbindung", desc: "Oslobađanje od liječničke tajne (uz Anlage UF)." },
      { slug: "arbeitsbescheinigung", label: "Arbeitsbescheinigung § 57 SGB II", desc: "Potvrda o zaposlenju — popunjava SAMO poslodavac." },
      { slug: "antragsruecknahme", label: "Erklärung der Antragsrücknahme", desc: "Povlačenje već podnesenog Bürgergeld zahtjeva." },
      { slug: "wohngeld", label: "Wohngeld", desc: "Finansijska pomoć za troškove stanovanja ako imaš manja primanja." },
      { slug: "sozialhilfe", label: "Sozialhilfe / Grundsicherung", desc: "Osnovna socijalna pomoć za osobe koje ne mogu raditi." },
      { slug: "heizkostenzuschuss", label: "Heizkostenzuschuss", desc: "Dodatak za troškove grijanja." },
    ],
  },
  {
    id: "posao",
    icon: "💼",
    title: "Posao i prihodi",
    items: [
      { slug: "krankenkasse", label: "Krankenkasse Anmeldung", desc: "Prijava u zdravstveno osiguranje u Njemačkoj." },
      { slug: "steuerklassenwechsel", label: "Steuerklassenwechsel", desc: "Promjena poreske klase, npr. nakon braka ili promjene porodične situacije." },
      
      { slug: "arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Naknada ako si izgubio posao i ispunjavaš uslove osiguranja." },
      { slug: "kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "Naknada kad firma privremeno smanji radne sate." },
      { slug: "bildungsgutschein", label: "Bildungsgutschein", desc: "Vaučer za finansiranje prekvalifikacije ili dodatnog obrazovanja." },
    ],
  },
  {
    id: "obrazovanje",
    icon: "🎓",
    title: "Škola i obrazovanje",
    items: [
      { slug: "bafoeg", label: "BAföG", desc: "Finansijska pomoć za školovanje ili studij." },
      { slug: "schueler-bafoeg", label: "Schüler-BAföG", desc: "Finansijska pomoć za učenike srednjih škola." },
      { slug: "integrationskurs", label: "Integrationskurs", desc: "Kurs njemačkog jezika i orijentacije za nove stanovnike." },
      { slug: "lernfoerderung", label: "Lernförderung", desc: "Pomoć za dopunsku nastavu za djecu sa poteškoćama u školi." },
    ],
  },
  {
    id: "dokumenti",
    icon: "📋",
    title: "Dokumenti i administracija",
    items: [
      { slug: "fuehrungszeugnis", label: "Führungszeugnis", desc: "Potvrda o nekažnjavanju koju često traže poslodavci ili institucije." },
      
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
