/**
 * Anerkennung Navigator — Data
 *
 * Sve informacije bazirane na javnim, službenim njemačkim izvorima:
 * - anabin.kmk.org (Kultusministerkonferenz)
 * - anerkennung-in-deutschland.de (BIBB / BMFTR)
 * - bmftr.bund.de (Bundesministerium für Forschung, Technologie und Raumfahrt)
 * - zab.kmk.org (Zentralstelle für ausländisches Bildungswesen)
 *
 * Stand: 2026. Sve informacije su isključivo informativnog karaktera.
 * Konačnu odluku o priznavanju donosi nadležna ustanova.
 */

export type Country = "BA" | "HR" | "RS" | "ME" | "MK" | "XK";

export interface CountryInfo {
  code: Country;
  name: string;
  flag: string;
  euMember: boolean;
  notes: string;
}

export const COUNTRIES: CountryInfo[] = [
  {
    code: "BA",
    name: "Bosna i Hercegovina",
    flag: "🇧🇦",
    euMember: false,
    notes:
      "Treća zemlja. Diplome se priznaju individualno preko Anabin baze i nadležne ustanove. Često potreban Anpassungslehrgang ili Kenntnisprüfung za reglementovana zanimanja.",
  },
  {
    code: "HR",
    name: "Hrvatska",
    flag: "🇭🇷",
    euMember: true,
    notes:
      "EU članica od 2013. Za većinu reglementovanih zanimanja primjenjuje se EU direktiva 2005/36/EG — automatsko ili olakšano priznavanje.",
  },
  {
    code: "RS",
    name: "Srbija",
    flag: "🇷🇸",
    euMember: false,
    notes:
      "Treća zemlja. Postupak sličan kao za BiH — preko Anabin baze i nadležne ustanove po profesiji i Bundeslandu.",
  },
  {
    code: "ME",
    name: "Crna Gora",
    flag: "🇲🇪",
    euMember: false,
    notes: "Treća zemlja. Postupak preko Anabin baze.",
  },
  {
    code: "MK",
    name: "Sjeverna Makedonija",
    flag: "🇲🇰",
    euMember: false,
    notes: "Treća zemlja. Postupak preko Anabin baze.",
  },
  {
    code: "XK",
    name: "Kosovo",
    flag: "🇽🇰",
    euMember: false,
    notes: "Treća zemlja. Postupak preko Anabin baze.",
  },
];

export type Regulation = "REG" | "NREG" | "PARTIAL";

export interface ProfessionInfo {
  id: string;
  name: string;
  nameDE: string;
  category: "Gesundheit" | "Technik" | "Pädagogik" | "Handwerk" | "Wirtschaft" | "Andere";
  regulation: Regulation;
  /** Federal vs Land law */
  jurisdiction: "Bund" | "Land" | "Mixed";
  /** Da li dolazi u top 10 najtraženijih (službena ZAB statistika 2024) */
  topTen: boolean;
  description: string;
  /** Tipični koraci postupka */
  steps: string[];
  /** Tipični dokumenti */
  documents: string[];
  /** Procijenjeno trajanje (orijentacijski raspon) */
  durationRange: string;
  /** Procijenjeni troškovi (orijentacijski raspon) */
  costRange: string;
  /** Da li je obavezna jezička provjera (Fachsprachprüfung) */
  requiresLanguageExam: boolean;
  /** Linkovi na službene izvore */
  officialLinks: { label: string; url: string }[];
  /** Posebne napomene */
  notes?: string;
}

/**
 * Top 10 referentnih zanimanja prema ZAB statistici 2024.
 * Izvor: anerkennung-in-deutschland.de/assets/content/Medien_Dokumente-Fachpublikum/2025-faktenblatt-anerkennungsmonitoring-de2.pdf
 */
export const PROFESSIONS: ProfessionInfo[] = [
  {
    id: "pflegefachperson",
    name: "Medicinska sestra / Tehničar",
    nameDE: "Pflegefachperson / Gesundheits- und Krankenpfleger:in",
    category: "Gesundheit",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: true,
    description:
      "Najtraženije reglementovano zanimanje u Njemačkoj. Postupak vodi nadležna ustanova u Bundeslandu gdje želiš raditi (npr. Regierungspräsidium, Landesamt für Gesundheit).",
    steps: [
      "Provjeri svoju ustanovu i diplomu u Anabin bazi",
      "Predaj zahtjev za Anerkennung kod nadležne ustanove tvog Bundeslanda",
      "Prilaže se dosije: diploma, transkript ocjena, opis sadržaja školovanja",
      "Ustanova ocjenjuje ekvivalentnost (Gleichwertigkeitsprüfung)",
      "Ako se utvrdi razlika: Anpassungslehrgang (do 3 god) ILI Kenntnisprüfung (ispit znanja)",
      "Položena Fachsprachprüfung (B2 medicinski njemački)",
      "Konačno priznavanje (Berufsurkunde)",
    ],
    documents: [
      "Diploma srednje medicinske škole / fakulteta (ovjerena kopija)",
      "Transkript ocjena sa satnicom predmeta",
      "Opis kurikuluma (Stundennachweis / Curriculum)",
      "Apostille (Haški) na originalnim dokumentima",
      "Ovlašteni prevod sudskog tumača na njemački",
      "Pasoš / lična karta",
      "Potvrda o radnom iskustvu (ako postoji)",
      "Uvjerenje o nekažnjavanju (Führungszeugnis)",
      "Potvrda zdravstvene sposobnosti",
      "Certifikat njemačkog jezika (B2)",
    ],
    durationRange: "6–18 mjeseci (zavisi od Bundeslanda i kompletnosti dokumentacije)",
    costRange: "200–600 € (administrativne takse) + troškovi prevoda i Anpassungslehrgang/Kenntnisprüfung",
    requiresLanguageExam: true,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland (BIBB)",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
      { label: "Anabin baza", url: "https://anabin.kmk.org/" },
      {
        label: "Profi-Filter (nadležne ustanove)",
        url: "https://berater.anerkennung-in-deutschland.de/",
      },
    ],
    notes:
      "Od 2020. spojeni su Krankenpflege, Altenpflege i Kinderkrankenpflege u jedno zanimanje 'Pflegefachperson' (generalistische Pflegeausbildung).",
  },
  {
    id: "arzt",
    name: "Doktor medicine",
    nameDE: "Ärztin / Arzt",
    category: "Gesundheit",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: true,
    description:
      "Strogo reglementovano. Bez Approbacije (Approbation) ili dozvole (Berufserlaubnis) ne smije se obavljati ljekarska djelatnost u Njemačkoj.",
    steps: [
      "Provjeri svoj fakultet u Anabin bazi (status H+ je obavezan)",
      "Predaj zahtjev za Approbation kod Landesprüfungsamt-a u Bundeslandu",
      "Gleichwertigkeitsprüfung diplome",
      "Ako utvrde 'wesentliche Unterschiede': Kenntnisprüfung (državni ispit) ili Anpassungslehrgang",
      "Fachsprachenprüfung (medicinski njemački C1, organizuje Ärztekammer)",
      "Dozvola za rad: Berufserlaubnis (privremena, do 2 god) ILI Approbation (trajna)",
    ],
    documents: [
      "Diploma medicinskog fakulteta + ocjene",
      "Apostille",
      "Ovlašteni prevod",
      "Curriculum vitae sa profesionalnom biografijom",
      "Uvjerenje o radu kao ljekar (ako postoji)",
      "Führungszeugnis",
      "Lekarska potvrda o zdravstvenoj sposobnosti",
      "Certifikat njemačkog jezika (B2/C1)",
      "Izjava da nema oduzimanja prava na rad u drugim zemljama",
    ],
    durationRange: "12–36 mjeseci (Kenntnisprüfung produžava postupak)",
    costRange: "350–1.100 € administrativne takse + troškovi ispita i pripremnih kurseva",
    requiresLanguageExam: true,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Arzt/Ärztin",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
      { label: "Anabin baza", url: "https://anabin.kmk.org/" },
    ],
    notes:
      "Specijalizacije se priznaju odvojeno od osnovne diplome. Za EU diplome postoji automatsko priznavanje prema EU direktivi 2005/36/EG.",
  },
  {
    id: "ingenieur",
    name: "Inženjer (građevina, mašinstvo, elektro)",
    nameDE: "Ingenieurin / Ingenieur",
    category: "Technik",
    regulation: "PARTIAL",
    jurisdiction: "Land",
    topTen: true,
    description:
      "Naziv 'Ingenieur' je zaštićen u Njemačkoj. Za korištenje titule potrebno je priznavanje preko Ingenieurkammer-a Bundeslanda. Sam rad inženjera (nicht-reglementiert) često ne zahtijeva priznavanje.",
    steps: [
      "Provjeri fakultet u Anabin bazi (status institucije)",
      "Provjeri tačan studij u listi diploma",
      "Ako želiš nositi titulu 'Ingenieur' — predaj zahtjev kod Ingenieurkammer-a",
      "Ako samo želiš raditi inženjerske poslove — često nije potrebno formalno priznavanje, dovoljno je Zeugnisbewertung od ZAB",
      "Za reglementovane podsektore (Statik, Brückenbau, itd.) potrebne su dodatne kvalifikacije",
    ],
    documents: [
      "Diploma fakulteta + transkript ocjena",
      "Apostille + ovlašteni prevod",
      "Sadržaj studija (Modulhandbuch)",
      "Diplomski rad (sažetak)",
      "Lebenslauf",
      "Pasoš",
    ],
    durationRange: "3–6 mjeseci (Zeugnisbewertung) / 6–12 mjeseci (Ingenieurkammer)",
    costRange: "200 € (Zeugnisbewertung ZAB) / 100–500 € (Ingenieurkammer, varira po Bundeslandu)",
    requiresLanguageExam: false,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Ingenieur",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
      { label: "ZAB Zeugnisbewertung", url: "https://zab.kmk.org/de/zeugnisbewertung" },
    ],
    notes:
      "Razlika: 'Beruf des Ingenieurs' (slobodno) vs 'Titel Ingenieur' (zaštićeno). Za većinu poslova dovoljan je Zeugnisbewertung od ZAB.",
  },
  {
    id: "lehrer",
    name: "Učitelj / Profesor",
    nameDE: "Lehrerin / Lehrer (Lehramt)",
    category: "Pädagogik",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: true,
    description:
      "Strogo reglementovano. Svaki Bundesland ima svoja pravila. Postupak vodi Kultusministerium ili obrazovna agencija u tom Bundeslandu.",
    steps: [
      "Provjeri fakultet u Anabin bazi",
      "Predaj zahtjev kod Kultusministerium-a Bundeslanda gdje želiš raditi",
      "Gleichwertigkeitsprüfung — ocjenjuje se ekvivalentnost s njemačkim Lehramt-om",
      "Tipično se utvrdi razlika u predmetima ili pedagoškoj praksi",
      "Anpassungsmaßnahmen (dopunski kursevi / pripravnički staž)",
      "Položena jezička provjera (C1/C2)",
    ],
    documents: [
      "Diploma + ocjene + transkript predmeta",
      "Detaljan opis pedagoškog dijela studija",
      "Potvrda o radu kao učitelj (ako postoji)",
      "Apostille + prevod",
      "Pasoš",
      "Führungszeugnis",
      "Erweitertes Führungszeugnis (za rad s djecom)",
    ],
    durationRange: "8–24 mjeseca (jako varira po Bundeslandu)",
    costRange: "100–500 € administrativne takse + Anpassungsmaßnahmen",
    requiresLanguageExam: true,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Lehrer",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
      {
        label: "Lista nadležnih Kultusministerien",
        url: "https://www.kmk.org/themen/allgemeinbildende-schulen/lehrkraefte/anerkennung-auslaendischer-lehramtsabschluesse.html",
      },
    ],
    notes:
      "Za EU diplome važi direktiva 2005/36/EG, ali se i tu obično traže dodatne mjere prilagodbe.",
  },
  {
    id: "physiotherapeut",
    name: "Fizioterapeut",
    nameDE: "Physiotherapeutin / Physiotherapeut",
    category: "Gesundheit",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: true,
    description:
      "Reglementovano zanimanje u zdravstvu. Postupak vodi nadležna ustanova u Bundeslandu (Landesprüfungsamt ili Regierungspräsidium).",
    steps: [
      "Provjeri školu/fakultet u Anabin bazi",
      "Predaj zahtjev za Erlaubnis zur Führung der Berufsbezeichnung",
      "Gleichwertigkeitsprüfung",
      "Ako se utvrdi razlika: Anpassungslehrgang (do 3 god) ili Kenntnisprüfung",
      "Položena jezička provjera (B2)",
      "Berufserlaubnis",
    ],
    documents: [
      "Diploma + ocjene",
      "Opis sadržaja školovanja (Stundennachweis)",
      "Apostille + prevod",
      "Führungszeugnis",
      "Zdravstvena potvrda",
      "B2 njemački certifikat",
    ],
    durationRange: "6–18 mjeseci",
    costRange: "200–500 € + troškovi Anpassungslehrgang-a",
    requiresLanguageExam: true,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Physiotherapeut",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
    ],
  },
  {
    id: "erzieher",
    name: "Vaspitač u vrtiću",
    nameDE: "Erzieherin / Erzieher",
    category: "Pädagogik",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: true,
    description:
      "Reglementovano po Bundeslandima. Postupak vodi obrazovna agencija u Bundeslandu (npr. Senatsverwaltung u Berlinu, Bezirksregierung u NRW).",
    steps: [
      "Provjeri školu u Anabin bazi",
      "Predaj zahtjev kod nadležne ustanove tvog Bundeslanda",
      "Gleichwertigkeitsprüfung",
      "Tipično se traži Anpassungslehrgang (često uključuje praksu u vrtiću)",
      "B2 njemački",
      "Berufsurkunde",
    ],
    documents: [
      "Diploma + ocjene",
      "Opis sadržaja školovanja",
      "Apostille + prevod",
      "Führungszeugnis (proširen za rad s djecom)",
      "Zdravstvena potvrda",
    ],
    durationRange: "6–18 mjeseci",
    costRange: "100–400 € + troškovi prilagodbe",
    requiresLanguageExam: true,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Erzieher",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
    ],
  },
  {
    id: "apotheker",
    name: "Farmaceut",
    nameDE: "Apothekerin / Apotheker",
    category: "Gesundheit",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: true,
    description: "Strogo reglementovano. Approbation se traži za rad u apoteci.",
    steps: [
      "Provjeri fakultet u Anabin bazi",
      "Zahtjev za Approbation kod Landesprüfungsamt-a",
      "Gleichwertigkeitsprüfung",
      "Kenntnisprüfung ili Anpassungslehrgang ako se utvrdi razlika",
      "Fachsprachenprüfung (C1)",
      "Approbation",
    ],
    documents: [
      "Diploma farmacije + ocjene",
      "Apostille + prevod",
      "Praktikum potvrda",
      "Führungszeugnis",
      "Zdravstvena potvrda",
      "Certifikat njemačkog (C1)",
    ],
    durationRange: "12–24 mjeseca",
    costRange: "350–1.000 €",
    requiresLanguageExam: true,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Apotheker",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
    ],
  },
  {
    id: "zahnarzt",
    name: "Stomatolog",
    nameDE: "Zahnärztin / Zahnarzt",
    category: "Gesundheit",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: true,
    description: "Strogo reglementovano. Approbation za rad u stomatologiji.",
    steps: [
      "Provjeri fakultet u Anabin bazi",
      "Zahtjev za Approbation",
      "Gleichwertigkeitsprüfung",
      "Kenntnisprüfung ako se utvrdi razlika",
      "Fachsprachenprüfung (C1)",
      "Approbation",
    ],
    documents: [
      "Diploma stomatologije + ocjene",
      "Apostille + prevod",
      "Lekarska potvrda",
      "Führungszeugnis",
      "Certifikat njemačkog (C1)",
    ],
    durationRange: "12–30 mjeseci",
    costRange: "350–1.100 €",
    requiresLanguageExam: true,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Zahnarzt",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
    ],
  },
  {
    id: "koch",
    name: "Kuhar",
    nameDE: "Köchin / Koch",
    category: "Handwerk",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: true,
    description:
      "Nicht-reglementiert! Možeš raditi kao kuhar bez formalnog priznavanja. Priznavanje je dobrovoljno, ali korisno za bolju platu i trajni ugovor.",
    steps: [
      "OPCIONO: predaj zahtjev za Anerkennung kod Industrie- und Handelskammer (IHK)",
      "Gleichwertigkeitsprüfung sa njemačkim Ausbildung-om",
      "Bescheid: 'gleichwertig' / 'wesentliche Unterschiede'",
      "Ako se utvrdi razlika — možeš birati Anpassungsqualifizierung",
    ],
    documents: [
      "Diploma kuvarske škole / svjedočanstvo zanata",
      "Opis sadržaja školovanja",
      "Apostille + prevod",
      "Potvrde o radu (ako postoje)",
      "Lebenslauf",
    ],
    durationRange: "3–4 mjeseca (IHK postupak)",
    costRange: "100–600 € (zavisi od IHK)",
    requiresLanguageExam: false,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Koch",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
      { label: "BQ-Portal (IHK)", url: "https://www.bq-portal.de/" },
    ],
    notes:
      "Bez priznavanja možeš odmah početi raditi. S priznavanjem dobiješ status 'Fachkraft' što povlači viši Tarif (često +300-500 €/mj).",
  },
  {
    id: "elektroniker",
    name: "Električar / Elektroniker",
    nameDE: "Elektronikerin / Elektroniker",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: true,
    description:
      "Djelimično reglementovano. Za samostalan rad u zanatu (Selbstständigkeit) potreban je Meister ili priznavanje preko Handwerkskammer-a.",
    steps: [
      "Predaj zahtjev kod Handwerkskammer (HWK) tvog regiona",
      "Gleichwertigkeitsprüfung sa njemačkim Ausbildung-om Elektroniker",
      "Ako želiš otvoriti vlastitu firmu — često se traži Meister-Anerkennung",
      "Ako se utvrdi razlika — Anpassungslehrgang ili Kenntnisprüfung",
    ],
    documents: [
      "Svjedočanstvo zanata / fakulteta elektrotehnike",
      "Opis sadržaja školovanja + sati prakse",
      "Apostille + prevod",
      "Potvrde o radu",
      "Lebenslauf",
    ],
    durationRange: "3–8 mjeseci",
    costRange: "100–600 € (HWK takse)",
    requiresLanguageExam: false,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Elektroniker",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
      { label: "BQ-Portal", url: "https://www.bq-portal.de/" },
    ],
    notes:
      "Kao zaposlenik (Angestellter) često nije obavezno priznavanje. Za samostalnost (Selbstständige Tätigkeit) je obavezno.",
  },
  {
    id: "maurer",
    name: "Zidar / Građevinar",
    nameDE: "Maurerin / Maurer (und Betonbauer:in)",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Zanat sa zaštićenim zvanjem za samostalan rad. Kao zaposlenik (Angestellter) ne treba formalno priznavanje. Za otvaranje firme — Meister-Anerkennung kod HWK.",
    steps: [
      "Provjeri ustanovu / školu u Anabin bazi",
      "Kao zaposlenik: dovoljno svjedočanstvo + prevod (bez priznavanja)",
      "Za samostalan rad: zahtjev kod Handwerkskammer (HWK)",
      "Gleichwertigkeitsprüfung sa njemačkim Maurer Ausbildung-om",
      "Ako se utvrdi razlika: Anpassungslehrgang ili Eignungsprüfung",
      "Eintrag in die Handwerksrolle nakon Meister-priznavanja",
    ],
    documents: [
      "Svjedočanstvo zanata / SSS / fakulteta građevine",
      "Opis sadržaja školovanja + sati prakse",
      "Apostille + ovlašteni prevod",
      "Potvrde o radu (Arbeitszeugnisse) — što više to bolje",
      "Lebenslauf (CV) na njemačkom",
      "Pasoš",
    ],
    durationRange: "3–6 mjeseci (obična provjera) / 6–12 mjeseci (Meister)",
    costRange: "100–600 € (HWK takse) + dodatno za Meister-postupak",
    requiresLanguageExam: false,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — Maurer",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
      { label: "BQ-Portal", url: "https://www.bq-portal.de/" },
    ],
    notes:
      "Iskustvo na gradilištima u Njemačkoj (potvrde poslodavca) puno znači — često važnije od formalnog priznavanja.",
  },
  {
    id: "kfz_mechatroniker",
    name: "Auto-mehaničar (KFZ)",
    nameDE: "Kraftfahrzeugmechatronikerin / Kraftfahrzeugmechatroniker",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Reglementovano za samostalan rad. Kao zaposlenik u radionici nije obavezno priznavanje, ali olakšava bolju platu i status Fachkraft.",
    steps: [
      "Provjeri školu u Anabin bazi",
      "Predaj zahtjev kod Handwerkskammer (HWK) tvog regiona",
      "Gleichwertigkeitsprüfung",
      "Ako razlika: Anpassungslehrgang ili Eignungsprüfung",
      "Za samostalan rad: Meister-Anerkennung",
    ],
    documents: [
      "Svjedočanstvo zanata / SSS automehaničar",
      "Opis sadržaja školovanja",
      "Apostille + prevod",
      "Potvrde o radu",
      "Lebenslauf",
    ],
    durationRange: "3–6 mjeseci",
    costRange: "100–600 €",
    requiresLanguageExam: false,
    officialLinks: [
      {
        label: "Anerkennung in Deutschland — KFZ-Mechatroniker",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
    ],
    notes:
      "Veliki nedostatak radne snage u Njemačkoj — često radionice direktno zapošljavaju i pomažu oko Anerkennung-a.",
  },
  {
    id: "schweisser",
    name: "Zavarivač",
    nameDE: "Schweißerin / Schweißer",
    category: "Handwerk",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Nicht-reglementiert! Možeš odmah početi raditi. Ono što stvarno vrijedi su DIN/EN ISO certifikati zavarivanja (npr. EN ISO 9606-1) — njih izdaju SLV (Schweißtechnische Lehr- und Versuchsanstalten) i priznaju se širom EU.",
    steps: [
      "Donesi sve postojeće zavarivačke certifikate (DIN/EN, ISO 9606)",
      "Ako su iz BiH/HR/SR/CG/MK/XK po EN normama — često se priznaju direktno",
      "Ako nisu po EN — položi praktični ispit u SLV centru u Njemačkoj",
      "OPCIONO: priznaj svjedočanstvo zanata kod IHK / HWK za Fachkraft status",
    ],
    documents: [
      "Svi zavarivački certifikati (originalni + prevod)",
      "Svjedočanstvo zanata (ako postoji)",
      "Potvrde o radu",
      "Lebenslauf",
      "Pasoš",
    ],
    durationRange: "1–3 mjeseca (ako trebaš preispit u SLV)",
    costRange: "200–800 € (po vrsti certifikata) / 100–400 € (priznavanje svjedočanstva)",
    requiresLanguageExam: false,
    officialLinks: [
      {
        label: "DVS — Deutscher Verband für Schweißen",
        url: "https://www.dvs-home.de/",
      },
      {
        label: "Anerkennung in Deutschland — Pretraga",
        url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
      },
    ],
    notes:
      "Top zanimanje za brzo zapošljavanje. Procedura preispitivanja u SLV traje par dana, certifikat važi 6 mjeseci–3 god (zavisno od vrste).",
  },
  {
    id: "it_fachkraft",
    name: "IT specijalist (programer / sistem-administrator)",
    nameDE: "IT-Fachkraft (Fachinformatiker:in / Softwareentwickler:in)",
    category: "Technik",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Nicht-reglementiert! IT je u Njemačkoj otvoreno tržište. Ne treba ti priznavanje za rad. Za vizu (Blue Card / §19c AufenthG) često je dovoljno radno iskustvo + ugovor o radu.",
    steps: [
      "Ne treba formalno priznavanje za rad",
      "Za vizu (Blue Card EU): minimum 3 god relevantnog iskustva ILI fakultetska diploma",
      "OPCIONO: ZAB Zeugnisbewertung (200 €) za bolji prikaz diplome poslodavcu",
      "OPCIONO: priznavanje kod IHK kao 'Fachinformatiker' za Tarif-status",
    ],
    documents: [
      "Diploma fakulteta (ako postoji) + prevod",
      "Potvrde o radu sa opisom poslova",
      "Portfolio / GitHub / certifikati (Microsoft, AWS, Cisco…)",
      "Lebenslauf na njemačkom ili engleskom",
      "Pasoš",
    ],
    durationRange: "0 mjeseci za rad / 2–4 mjeseca za ZAB Zeugnisbewertung",
    costRange: "0 € za rad / 200 € za ZAB / 100–400 € za IHK",
    requiresLanguageExam: false,
    officialLinks: [
      {
        label: "Make it in Germany — IT specialists",
        url: "https://www.make-it-in-germany.com/de/jobs/branchen/it",
      },
      { label: "ZAB Zeugnisbewertung", url: "https://zab.kmk.org/de/zeugnisbewertung" },
    ],
    notes:
      "Mnoge firme u Njemačkoj traže IT specijaliste i nude vize + Umzugskosten. Engleski je često dovoljan.",
  },
  {
    id: "medizinische_fachangestellte",
    name: "Medicinska administrativna asististica (MFA)",
    nameDE: "Medizinische Fachangestellte / MFA",
    category: "Gesundheit",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "#1 Engpassberuf u Njemačkoj 2024 prema BA analizi — u nijednom drugom zanimanju nema toliko nepopunjenih mjesta. Direktna zaposlenja dostupna odmah, bez obaveznog priznavanja.",
    steps: [
      "Možeš odmah početi raditi — nije obavezno formalno priznavanje",
      "OPCIONO: zahtjev za Anerkennung kod Ärztekammer ili IHK",
      "Gleichwertigkeitsprüfung sa njemackim MFA Ausbildung-om",
      "Ako se utvrdi razlika: Anpassungsqualifizierung (do 12 mj.)",
    ],
    documents: [
      "Svjedočanstvo medicinske/stomatološke škole ili fakulteta",
      "Opis sadržaja školovanja",
      "Apostille + ovlašteni prevod",
      "Potvrde o radu",
      "Lebenslauf",
    ],
    durationRange: "3–6 mjeseci (ako se aplicira za Anerkennung)",
    costRange: "100–400 €",
    requiresLanguageExam: false,
    officialLinks: [
      { label: "Anerkennung in Deutschland — MFA", url: "https://www.anerkennung-in-deutschland.de/de/interest/finder" },
      { label: "BA Engpassanalyse 2024", url: "https://www.arbeitsagentur.de/datei/fachkraefteengpassanalyse-2024_ba147918.pdf" },
    ],
    notes: "Zahnmedizinische Fachangestellte (ZFA) — asistentica kod stomatologa — je #1 Engpassberuf u cijeloj Njemačkoj 2024.",
  },
  {
    id: "altenpfleger",
    name: "Njegovatelj / Njega starijih",
    nameDE: "Altenpflegerin / Altenpfleger (Pflegefachperson)",
    category: "Gesundheit",
    regulation: "REG",
    jurisdiction: "Land",
    topTen: false,
    description:
      "Njega starijih — kritičan Engpassberuf u svim Bundeslandima. Prosječno 286 dana čekanja na popunu jednog radnog mjesta (BA 2024). Dobrodošle su sve strane kvalifikacije.",
    steps: [
      "Provjeri školu/fakultet u Anabin bazi",
      "Predaj zahtjev kod nadležne ustanove Bundeslanda",
      "Gleichwertigkeitsprüfung — ocjenjuje se ekvivalentnost",
      "Anpassungslehrgang ili Kenntnisprüfung ako se utvrdi razlika",
      "B2 certifikat njemackog",
      "Berufsurkunde",
    ],
    documents: [
      "Diploma + ocjene + opis sadržaja",
      "Apostille + ovlašteni prevod",
      "Führungszeugnis",
      "Zdravstvena potvrda",
      "B2 certifikat",
    ],
    durationRange: "6–18 mjeseci",
    costRange: "200–600 €",
    requiresLanguageExam: true,
    officialLinks: [
      { label: "Anerkennung in Deutschland — Pflege", url: "https://www.anerkennung-in-deutschland.de/de/interest/finder" },
    ],
    notes: "Od 2020. 'Altenpflege', 'Krankenpflege' i 'Kinderkrankenpflege' su spojeni u jedno zanimanje: Pflegefachperson.",
  },
  {
    id: "berufskraftfahrer",
    name: "Profesionalni vozač (kamion / bus)",
    nameDE: "Berufskraftfahrerin / Berufskraftfahrer",
    category: "Andere",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Veliki nedostatak vozača u cijeloj Njemačkoj. EU vozačka dozvola C/CE se direktno prizna. Dodatno se traži CPC certifikat (Fahrerqualifikationsnachweis) koji se može položiti u Njemačkoj.",
    steps: [
      "Provjeri je li tvoja vozačka iz BiH/HR/RS/CG/MK/XK ekvivalentna EU standardu",
      "Ako nije EU vozačka: konverzija na njemacku/EU vozačku (§ 29 FeV)",
      "CPC certifikat — ako ga nemaš iz matične zemlje, položi kurs u Njemackoj (35 sati)",
      "Digitalni tahograf kartica (Fahrerkarte) — aplikacija kod Kraftfahrt-Bundesamt",
      "OPCIONO: Berufskraftfahrer Ausbildung za formalni Fachkraft status",
    ],
    documents: [
      "Važeća vozačka dozvola klase C/CE",
      "CPC certifikat (Fahrerqualifikationsnachweis) ako postoji",
      "Pasoš + prevod",
      "Potvrde o radu kao vozač",
    ],
    durationRange: "1–3 mjeseca (konverzija + CPC)",
    costRange: "300–1.200 € (CPC kurs + konverzija)",
    requiresLanguageExam: false,
    officialLinks: [
      { label: "Make it in Germany — Berufskraftfahrer", url: "https://www.make-it-in-germany.com/de/working-in-germany/professions-in-demand" },
      { label: "Kraftfahrt-Bundesamt — Fahrerkarte", url: "https://www.kba.de/DE/Themen/ZulassungLizenzierung/Fahrpersonal/fahrpersonal_node.html" },
    ],
    notes: "Hroničan nedostatak vozača u Njemačkoj. Mnoge transportne firme aktivno regrutuju iz Balkana i pomažu oko vize + CPC kursa.",
  },
  {
    id: "ekonomist_bachelor",
    name: "Ekonomist / Bachelor ekonomije",
    nameDE: "Betriebswirtin / Betriebswirt (BWL Bachelor)",
    category: "Wirtschaft",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Nicht-reglementiert! Ekonomske diplome ne zahtijevaju formalno priznavanje za rad. Zeugnisbewertung od ZAB (200 €) preporučen za bolji prikaz diplome poslodavcu i za Blue Card vizu.",
    steps: [
      "Nema obaveznog priznavanja za rad",
      "PREPORUČENO: Zeugnisbewertung od ZAB (Zentralstelle für ausländisches Bildungswesen)",
      "ZAB uspoređuje tvoju diplomu sa njemackim Hochschulabschluss-om",
      "Opisna procjena: 'entspricht dem deutschen Bachelor-Abschluss' ili sl.",
      "Za Blue Card EU: diploma mora biti ekvivalentna njemackom Bachelor-u — ZAB to potvrdi",
    ],
    documents: [
      "Diploma + transkript ocjena (ovjerena kopija)",
      "Apostille + ovlašteni prevod na njemacki",
      "Lebenslauf",
      "Pasoš",
    ],
    durationRange: "2–4 mjeseca (ZAB Zeugnisbewertung)",
    costRange: "200 € (ZAB) + troškovi prevoda",
    requiresLanguageExam: false,
    officialLinks: [
      { label: "ZAB Zeugnisbewertung", url: "https://zab.kmk.org/de/zeugnisbewertung" },
      { label: "Anerkennung in Deutschland — BWL", url: "https://www.anerkennung-in-deutschland.de/de/interest/finder" },
    ],
    notes: "Diplomski ekonomisti su traženi u računovodstvu, controllingu, HR i bankarstvu. Poslovni engleski je prednost.",
  },
  {
    id: "dachdecker",
    name: "Krovopokrivač",
    nameDE: "Dachdeckerin / Dachdecker",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Jak Engpassberuf u Handwerk-branši 2024–2025. Kao zaposlenik nije obavezno prizna­vanje. Za otvaranje firme — Meister kod Handwerkskammer.",
    steps: [
      "Kao zaposlenik: direktno zaposlenje bez obaveznog priznavanja",
      "OPCIONO: zahtjev kod Handwerkskammer (HWK) za Fachkraft status",
      "Gleichwertigkeitsprüfung sa njemackim Dachdecker Ausbildung-om",
      "Ako razlika: Anpassungslehrgang ili Eignungsprüfung",
      "Za samostalan rad: Meister-Anerkennung kod HWK",
    ],
    documents: [
      "Svjedočanstvo zanata / SSS građevina",
      "Opis sadržaja školovanja + sati prakse",
      "Apostille + prevod",
      "Potvrde o radu",
      "Lebenslauf",
    ],
    durationRange: "3–6 mjeseci",
    costRange: "100–500 €",
    requiresLanguageExam: false,
    officialLinks: [
      { label: "Anerkennung in Deutschland — Dachdecker", url: "https://www.anerkennung-in-deutschland.de/de/interest/finder" },
      { label: "BQ-Portal", url: "https://www.bq-portal.de/" },
    ],
    notes: "Krovopokrivači su traženi naročito u proljeće/ljeto. Mnogi poslodavci nude direktan ugovor i pomažu oko vize.",
  },
  {
    id: "anlagenmechaniker_shk",
    name: "Instalater grijanja / sanitarija (SHK)",
    nameDE: "Anlagenmechanikerin / Anlagenmechaniker SHK",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "SHK (Sanitär, Heizung, Klimatechnik) je jedan od najtraženijih zanata u Njemackoj 2024–2025. Energetska sanacija zgrada povećava potražnju. Engpassberuf u svim Bundeslandima.",
    steps: [
      "Provjeri školu u Anabin bazi",
      "Predaj zahtjev kod Handwerkskammer (HWK)",
      "Gleichwertigkeitsprüfung sa njemackim SHK Ausbildung-om",
      "Ako razlika: Anpassungslehrgang",
      "Za samostalan rad: Meister-Anerkennung",
    ],
    documents: [
      "Svjedočanstvo zanata / SSS vodovod-grijanje",
      "Opis sadržaja školovanja",
      "Apostille + prevod",
      "Potvrde o radu",
    ],
    durationRange: "3–8 mjeseci",
    costRange: "100–600 €",
    requiresLanguageExam: false,
    officialLinks: [
      { label: "Anerkennung in Deutschland — Anlagenmechaniker SHK", url: "https://www.anerkennung-in-deutschland.de/de/interest/finder" },
      { label: "BQ-Portal", url: "https://www.bq-portal.de/" },
    ],
    notes: "Energetska obnova zgrada u Njemackoj (Wärmepumpe, Solarenergie) drastično povećava potražnju za SHK majstorima.",
  },
  {
    id: "buchhalter",
    name: "Računovođa / Finansijski referent",
    nameDE: "Buchhalter:in / Finanzbuchhalter:in",
    category: "Wirtschaft",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description:
      "Nicht-reglementiert! Računovođa možeš raditi bez formalnog priznavanja. Preporučen Zeugnisbewertung (ZAB). DATEV certifikat (računovodstveni softver) je velika prednost kod njemackih firmi.",
    steps: [
      "Nema obaveznog priznavanja za rad",
      "PREPORUČENO: Zeugnisbewertung od ZAB",
      "OPCIONO: IHK Buchhalter certifikat za formalni status",
      "PREPORUČENO: DATEV kurs — najrašireniji računovodstveni softver u Njemackoj",
    ],
    documents: [
      "Diploma + ocjene",
      "Apostille + ovlašteni prevod",
      "Potvrde o radu",
      "DATEV / SAP certifikati (ako postoje)",
      "Lebenslauf",
    ],
    durationRange: "2–3 mjeseca (ZAB) / odmah za rad",
    costRange: "200 € (ZAB) + DATEV kurs (300–800 €)",
    requiresLanguageExam: false,
    officialLinks: [
      { label: "ZAB Zeugnisbewertung", url: "https://zab.kmk.org/de/zeugnisbewertung" },
      { label: "IHK — Buchhalter Zertifikat", url: "https://www.ihk.de/" },
    ],
    notes: "Poznavanje DATEV softvera je ključno za računovođe u Njemackoj. Kurs traje 2–4 sedmice i drastično povećava šanse zaposlenja.",
  },
  {
    id: "sozialpaedagoge",
    name: "Socijalni radnik / Pedagog",
    nameDE: "Sozialpädagogin / Sozialpädagoge (Soziale Arbeit)",
    category: "Pädagogik",
    regulation: "PARTIAL",
    jurisdiction: "Land",
    topTen: false,
    description:
      "Djelimično reglementovano. Socijalni rad u Jugendamt zahtijeva priznavanje. Za NVO, domove i savjetovališta često nije obavezno. ZAB Zeugnisbewertung je preporučen.",
    steps: [
      "Provjeri tačnu poziciju — mnoge ne zahtijevaju formalno priznavanje",
      "Za rad u Jugendamt ili državnim ustanovama: zahtjev kod nadležne Behörde Bundeslanda",
      "Za ostale pozicije: ZAB Zeugnisbewertung (200 €) je dovoljno",
      "Gleichwertigkeitsprüfung",
      "Ako razlika: Anpassungsmaßnahmen (dopunski kursevi)",
    ],
    documents: [
      "Diploma socijalnog rada / pedagogije + transkript",
      "Apostille + ovlašteni prevod",
      "Potvrde o radu (prakse i volonterski rad se računaju)",
      "Führungszeugnis (erweitertes — za rad s djecom)",
      "Lebenslauf",
    ],
    durationRange: "3–12 mjeseci (zavisi od pozicije i Bundeslanda)",
    costRange: "200 € (ZAB) + eventuelno do 500 € (Behörde)",
    requiresLanguageExam: false,
    officialLinks: [
      { label: "Anerkennung in Deutschland — Soziale Arbeit", url: "https://www.anerkennung-in-deutschland.de/de/interest/finder" },
      { label: "ZAB Zeugnisbewertung", url: "https://zab.kmk.org/de/zeugnisbewertung" },
    ],
    notes: "Socijalni radnici su traženi u azilantskim domovima, Jobcenter savjetovanju, domovima za djecu i NVO sektoru.",
  },
  // ── 2026-10-28: dodatna referentna zanimanja (BQFG / HwO, izvori u docs/anerkennung-audit-2026-10-28.md) ──
  {
    id: "elektroniker_betriebstechnik",
    name: "Elektroničar za pogonsku tehniku",
    nameDE: "Elektronikerin / Elektroniker für Betriebstechnik",
    category: "Technik",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Nereglementovano IHK zanimanje (Ausbildungsberuf). Raditi se može i bez priznavanja; priznavanje kod IHK FOSA je dobrovoljno, ali često važno za vizu i poslodavca.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Elektronikerin / Elektroniker für Betriebstechnik“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung (BQFG) — za većinu IHK zanimanja kod IHK FOSA; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "IHK FOSA: 100–600 € prema obimu postupka + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "IHK FOSA", "url": "https://www.ihk-fosa.de/"}, {"label": "IHK FOSA — Gebühren", "url": "https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Industrijski elektro-poziv (IHK), različit od zanatskog Elektroniker für Energie- und Gebäudetechnik (HWK). Za samostalne elektroinstalacije u zgradama važe pravila zanata i mrežnih operatera.",
  },
  {
    id: "industriemechaniker",
    name: "Industrijski mehaničar",
    nameDE: "Industriemechanikerin / Industriemechaniker",
    category: "Technik",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Nereglementovano IHK zanimanje (Ausbildungsberuf). Raditi se može i bez priznavanja; priznavanje kod IHK FOSA je dobrovoljno, ali često važno za vizu i poslodavca.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Industriemechanikerin / Industriemechaniker“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung (BQFG) — za većinu IHK zanimanja kod IHK FOSA; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "IHK FOSA: 100–600 € prema obimu postupka + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "IHK FOSA", "url": "https://www.ihk-fosa.de/"}, {"label": "IHK FOSA — Gebühren", "url": "https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Česta referenca za mašinske bravare i održavanje mašina; tačnu referencu bira nadležna ustanova prema sadržaju tvog obrazovanja.",
  },
  {
    id: "zerspanungsmechaniker",
    name: "Mehaničar za obradu skidanjem strugotine (CNC)",
    nameDE: "Zerspanungsmechanikerin / Zerspanungsmechaniker",
    category: "Technik",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Nereglementovano IHK zanimanje (Ausbildungsberuf). Raditi se može i bez priznavanja; priznavanje kod IHK FOSA je dobrovoljno, ali često važno za vizu i poslodavca.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Zerspanungsmechanikerin / Zerspanungsmechaniker“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung (BQFG) — za većinu IHK zanimanja kod IHK FOSA; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "IHK FOSA: 100–600 € prema obimu postupka + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "IHK FOSA", "url": "https://www.ihk-fosa.de/"}, {"label": "IHK FOSA — Gebühren", "url": "https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "„CNC operater/rukovalac“ je djelatnost, ne samostalni njemački Ausbildungsberuf. Formalna referenca je npr. Zerspanungsmechaniker ili Maschinen- und Anlagenführer — samo uz završeno strukovno obrazovanje; samo iskustvo na CNC mašini ne daje jednakovrijednost.",
  },
  {
    id: "maschinen_anlagenfuehrer",
    name: "Rukovalac mašinama i postrojenjima",
    nameDE: "Maschinen- und Anlagenführerin / Maschinen- und Anlagenführer",
    category: "Technik",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Nereglementovano IHK zanimanje (Ausbildungsberuf). Raditi se može i bez priznavanja; priznavanje kod IHK FOSA je dobrovoljno, ali često važno za vizu i poslodavca.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Maschinen- und Anlagenführerin / Maschinen- und Anlagenführer“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung (BQFG) — za većinu IHK zanimanja kod IHK FOSA; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "IHK FOSA: 100–600 € prema obimu postupka + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "IHK FOSA", "url": "https://www.ihk-fosa.de/"}, {"label": "IHK FOSA — Gebühren", "url": "https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Dvogodišnji njemački Ausbildungsberuf; može biti referenca za kraća strukovna obrazovanja u proizvodnji. Ne treba ga miješati s nekvalifikovanim radom na mašini.",
  },
  {
    id: "metallbauer",
    name: "Metalobravar (Metallbauer)",
    nameDE: "Metallbauerin / Metallbauer",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Metallbauerin / Metallbauer“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Zanat Metallbauer (Anlage A br. 13). Može biti referenca za bravare i zavarivače sa završenim zanatskim obrazovanjem; u industrijskim firmama moguća je i IHK-referenca (npr. Konstruktionsmechaniker).",
  },
  {
    id: "konstruktionsmechaniker",
    name: "Konstrukcijski mehaničar (zavarivanje, čelične konstrukcije)",
    nameDE: "Konstruktionsmechanikerin / Konstruktionsmechaniker",
    category: "Technik",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Nereglementovano IHK zanimanje (Ausbildungsberuf). Raditi se može i bez priznavanja; priznavanje kod IHK FOSA je dobrovoljno, ali često važno za vizu i poslodavca.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Konstruktionsmechanikerin / Konstruktionsmechaniker“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung (BQFG) — za većinu IHK zanimanja kod IHK FOSA; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "IHK FOSA: 100–600 € prema obimu postupka + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "IHK FOSA", "url": "https://www.ihk-fosa.de/"}, {"label": "IHK FOSA — Gebühren", "url": "https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Česta formalna referenca za zavarivače i bravare čeličnih konstrukcija sa završenim obrazovanjem. Certifikati zavarivanja (EN ISO 9606) su zaseban dokaz, ne zamjenjuju priznavanje.",
  },
  {
    id: "mechatroniker",
    name: "Mehatroničar",
    nameDE: "Mechatronikerin / Mechatroniker",
    category: "Technik",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Nereglementovano IHK zanimanje (Ausbildungsberuf). Raditi se može i bez priznavanja; priznavanje kod IHK FOSA je dobrovoljno, ali često važno za vizu i poslodavca.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Mechatronikerin / Mechatroniker“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung (BQFG) — za većinu IHK zanimanja kod IHK FOSA; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "IHK FOSA: 100–600 € prema obimu postupka + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "IHK FOSA", "url": "https://www.ihk-fosa.de/"}, {"label": "IHK FOSA — Gebühren", "url": "https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Industrijski Mechatroniker (IHK) nije isto što i Kfz-Mechatroniker (zanat, HWK) — izaberi referencu prema sadržaju obrazovanja.",
  },
  {
    id: "tischler",
    name: "Stolar (Tischler / Schreiner)",
    nameDE: "Tischlerin / Tischler (Schreinerin / Schreiner)",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Tischlerin / Tischler (Schreinerin / Schreiner)“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "„Schreiner“ je južnonjemački naziv za isto zanimanje — nije posebna referenca. Zanat Anlage A br. 27.",
  },
  {
    id: "zimmerer",
    name: "Tesar (Zimmerer)",
    nameDE: "Zimmerin / Zimmerer",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Zimmerin / Zimmerer“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Zanat Anlage A br. 3. U građevinskoj industriji nadležnost može biti i kod IHK — Anerkennungs-Finder pokazuje tačnu ustanovu.",
  },
  {
    id: "fliesenleger",
    name: "Keramičar (Fliesenleger)",
    nameDE: "Fliesen-, Platten- und Mosaikleger/in",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Fliesen-, Platten- und Mosaikleger/in“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Od 2020. ponovo zanat iz Anlage A (br. 42): samostalno vođenje firme traži upis u Handwerksrolle.",
  },
  {
    id: "maler_lackierer",
    name: "Moler i lakirer",
    nameDE: "Malerin und Lackiererin / Maler und Lackierer",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Malerin und Lackiererin / Maler und Lackierer“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Zanat Anlage A br. 10. Industrijski lakirer (Verfahrensmechaniker für Beschichtungstechnik, IHK) je druga referenca.",
  },
  {
    id: "strassenbauer",
    name: "Graditelj puteva (Straßenbauer)",
    nameDE: "Straßenbauerin / Straßenbauer",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Straßenbauerin / Straßenbauer“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Zanat Anlage A br. 5. U velikim građevinskim firmama nadležnost može biti i kod IHK — provjeri u Anerkennungs-Finderu.",
  },
  {
    id: "beton_stahlbetonbauer",
    name: "Betonirac / armirač (Beton- und Stahlbetonbauer)",
    nameDE: "Beton- und Stahlbetonbauerin / Beton- und Stahlbetonbauer",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Beton- und Stahlbetonbauerin / Beton- und Stahlbetonbauer“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Poseban Ausbildungsberuf, različit od Maurer. Zanatski pripada zanatu „Maurer und Betonbauer“ (Anlage A br. 1); u industriji nadležna može biti IHK.",
  },
  {
    id: "gebaeudereiniger",
    name: "Čistač zgrada (Gebäudereiniger)",
    nameDE: "Gebäudereinigerin / Gebäudereiniger",
    category: "Handwerk",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zulassungsfrei zanat (Anlage B1 HwO), nereglementovan. Priznavanje kod HWK je dobrovoljno i služi kao dokaz kvalifikacije.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Gebäudereinigerin / Gebäudereiniger“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Ovaj zanat je zulassungsfrei (Anlage B1 HwO): firma se može otvoriti i bez Meistera; priznavanje je dobrovoljno.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Za rad na čišćenju nije potrebna formalna kvalifikacija; priznavanje ima smisla samo uz završeno strukovno obrazovanje u ovoj oblasti.",
  },
  {
    id: "baecker",
    name: "Pekar",
    nameDE: "Bäckerin / Bäcker",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Bäckerin / Bäcker“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Zanat Anlage A br. 30. Za rad s namirnicama trebaš i higijenske propise (npr. pouka po Infektionsschutzgesetz) — to nije dio priznavanja.",
  },
  {
    id: "friseur",
    name: "Frizer",
    nameDE: "Friseurin / Friseur",
    category: "Handwerk",
    regulation: "PARTIAL",
    jurisdiction: "Bund",
    topTen: false,
    description: "Zanat iz Anlage A HwO. Kao zaposlenik u pravilu možeš raditi bez priznavanja; samostalno vođenje firme traži upis u Handwerksrolle. Nadležna je HWK prema mjestu rada.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Friseurin / Friseur“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung kod Handwerkskammer (HWK) nadležne za mjesto rada; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Za samostalno vođenje zanatske firme ovog zanata (Anlage A HwO) treba upis u Handwerksrolle — npr. Meister, kvalifikacija priznata kao jednakovrijedna Meisteru, Ausnahmebewilligung ili Ausübungsberechtigung. Priznata Geselle-razina za to nije dovoljna; to je zaseban postupak kod HWK.", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "Taksu određuje nadležna HWK (nije jedinstvena) + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "Handwerksordnung — Anlage A", "url": "https://www.gesetze-im-internet.de/hwo/anlage_a.html"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Zanat Anlage A br. 38: vlastiti salon traži upis u Handwerksrolle.",
  },
  {
    id: "fachkraft_lagerlogistik",
    name: "Stručnjak za skladišnu logistiku",
    nameDE: "Fachkraft für Lagerlogistik",
    category: "Andere",
    regulation: "NREG",
    jurisdiction: "Bund",
    topTen: false,
    description: "Nereglementovano IHK zanimanje (Ausbildungsberuf). Raditi se može i bez priznavanja; priznavanje kod IHK FOSA je dobrovoljno, ali često važno za vizu i poslodavca.",
    steps: ["Provjeri u Anerkennungs-Finderu referentno zanimanje „Fachkraft für Lagerlogistik“ i nadležnu ustanovu za mjesto gdje želiš raditi.", "Za rad kao zaposlenik priznavanje u pravilu nije zakonski obavezno (nereglementovano zanimanje), ali poslodavac ili postupak za vizu ga mogu tražiti.", "Uz završeno, u zemlji porijekla državno priznato strukovno obrazovanje podnesi zahtjev za Gleichwertigkeitsfeststellung (BQFG) — za većinu IHK zanimanja kod IHK FOSA; moguće i iz inostranstva.", "Odluka (Bescheid): puna ili djelimična jednakovrijednost. Kod djelimične razlike se mogu zatvoriti kroz Anpassungsqualifizierung. Zakonski rok: 3 mjeseca od kompletne dokumentacije, jednom se može produžiti (§6 BQFG).", "Samo radno iskustvo bez završenog obrazovanja ne daje formalnu jednakovrijednost. Pitaj komoru za Qualifikationsanalyse (ako dokumenti nedostaju) ili Validierungsverfahren (od 2025, za višegodišnje iskustvo bez diplome) — to su zasebni postupci bez garantovanog ishoda.", "Za vizu kao Fachkraft s Berufsausbildung (§18a AufenthG) obično treba priznata kvalifikacija. Drugi putevi (Westbalkanregelung, iskustvo po §19c(2) uz potvrdu ZAB, Anerkennungspartnerschaft) imaju vlastite uslove — provjeri Make it in Germany."],
    documents: ["Obrazac zahtjeva nadležne ustanove", "Svjedočanstvo / diploma o završenom strukovnom obrazovanju", "Prilog s predmetima i satnicom / sadržajem obrazovanja (ako postoji)", "Potvrde o radnom iskustvu s opisom poslova (Arbeitszeugnisse)", "Tabelarni Lebenslauf i lična karta / pasoš", "Prijevod na njemački; vrstu prijevoda, ovjere ili Apostille određuje nadležna ustanova"],
    durationRange: "Zakonski rok 3 mjeseca od kompletne dokumentacije (jednom produživ); prikupljanje i prevodi traju dodatno",
    costRange: "IHK FOSA: 100–600 € prema obimu postupka + prevodi; moguća finansijska podrška (npr. Anerkennungszuschuss)",
    requiresLanguageExam: false,
    officialLinks: [{"label": "Anerkennungs-Finder (BIBB)", "url": "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession"}, {"label": "IHK FOSA", "url": "https://www.ihk-fosa.de/"}, {"label": "IHK FOSA — Gebühren", "url": "https://www.ihk-fosa.de/verfahren/informationen-zu-gebuehren-und-foerderung/"}, {"label": "BQFG §6 — Verfahren", "url": "https://www.gesetze-im-internet.de/bqfg/__6.html"}, {"label": "Make it in Germany — Visum für Berufserfahrene", "url": "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/visum-berufserfahrene"}],
    notes: "Za viljuškar (Stapler) u Njemačkoj obično treba interna obuka i pismeno ovlaštenje poslodavca — to je odvojeno od priznavanja.",
  },
];

/**
 * Anabin status objašnjenja — direktno sa anabin.kmk.org
 */
export const ANABIN_STATUS = {
  institutions: [
    {
      code: "H+",
      title: "H+ (priznata)",
      description:
        "Ustanova je državno priznata u zemlji porijekla i diplome se mogu vrednovati u Njemačkoj. NAJBOLJI status.",
    },
    {
      code: "H-",
      title: "H− (nije priznata)",
      description:
        "Ustanova nije priznata kao visokoškolska u zemlji porijekla. Diplome se uglavnom NE mogu priznati u Njemačkoj.",
    },
    {
      code: "H+/-",
      title: "H+/− (uslovno)",
      description:
        "Status nije definitivan — postoje različiti slučajevi. Potrebna je individualna provjera.",
    },
  ],
  diplomas: [
    {
      code: "entspricht",
      title: "entspricht (odgovara)",
      description: "Diploma odgovara odgovarajućoj njemačkoj diplomi — ekvivalentna.",
    },
    {
      code: "gleichwertig",
      title: "gleichwertig (jednakovrijedna)",
      description: "Diploma je jednakovrijedna njemačkoj — priznaje se.",
    },
    {
      code: "nicht gleichwertig",
      title: "nicht gleichwertig (nije jednakovrijedna)",
      description:
        "Diploma se ne smatra ekvivalentnom — možda je potreban dodatni postupak ili nadogradnja.",
    },
  ],
};

/**
 * Anerkennungszuschuss — financijska pomoć BMFTR
 * Izvor: https://www.anerkennung-in-deutschland.de/de/interest/finder
 *        https://www.bmftr.bund.de/SharedDocs/Publikationen/DE/3/31250_Der_Anerkennungszuschuss.html
 */
export const ANERKENNUNGSZUSCHUSS = {
  description:
    "Anerkennungszuschuss je državna finansijska pomoć Bundesministerium für Forschung, Technologie und Raumfahrt (BMFTR) za osobe s niskim primanjima koje žele priznati svoju stranu kvalifikaciju.",
  eligibility: [
    "Imaš stranu profesionalnu kvalifikaciju",
    "Niska primanja (granica se utvrđuje individualno)",
    "Plaćaš sam troškove postupka priznavanja",
    "Ne dobijaš već drugu državnu finansijsku pomoć za isti postupak",
  ],
  whatItCovers: [
    "Administrativne takse postupka priznavanja",
    "Troškovi prevoda dokumenata kod sudskog tumača",
    "Troškovi ovjera i Apostille-a",
    "Putni troškovi do nadležne ustanove",
    "Troškovi Kenntnisprüfung-a / Eignungsprüfung-a",
    "U pojedinim slučajevima i kvalifikacijske mjere (Anpassungsqualifizierung)",
  ],
  howToApply: [
    "Kontaktiraj IQ-Beratungsstelle (besplatno savjetovanje) u svom gradu",
    "Savjetnik utvrđuje da li imaš pravo",
    "Predaješ zahtjev preko savjetnika ili direktno",
    "Sredstva se isplaćuju po prilaganju računa",
  ],
  important:
    "NAPOMENA: Pravo na Anerkennungszuschuss ne postoji automatski — svaki zahtjev se ocjenjuje individualno. Tačan iznos se utvrđuje od slučaja do slučaja.",
  officialLinks: [
    {
      label: "BIBB — Anerkennungszuschuss",
      url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
    },
    {
      label: "BMFTR — Anerkennungszuschuss flyer",
      url: "https://www.bmftr.bund.de/SharedDocs/Publikationen/DE/3/31250_Der_Anerkennungszuschuss.html",
    },
    {
      label: "Pronađi IQ-Beratungsstelle",
      url: "https://www.netzwerk-iq.de/foerderprogramm-iq/beratung",
    },
  ],
};

/**
 * Službene baze i portali
 */
export const OFFICIAL_PORTALS = [
  {
    name: "Anabin",
    description:
      "Službena baza za vrednovanje stranih obrazovnih kvalifikacija. Vodi Kultusministerkonferenz (KMK).",
    url: "https://anabin.kmk.org/",
  },
  {
    name: "Anerkennung in Deutschland",
    description:
      "Službeni portal Bundesinstitut für Berufsbildung (BIBB) sa detaljima o postupku priznavanja po profesiji i Bundeslandu.",
    url: "https://www.anerkennung-in-deutschland.de/de/interest/finder",
  },
  {
    name: "BQ-Portal",
    description:
      "Portal za priznavanje zanatlijskih i strukovnih kvalifikacija (orijentisan na poslodavce i komore).",
    url: "https://www.bq-portal.de/",
  },
  {
    name: "Profi-Filter (BIBB)",
    description:
      "Pretraga nadležne ustanove po profesiji i Bundeslandu sa kontakt podacima.",
    url: "https://berater.anerkennung-in-deutschland.de/",
  },
  {
    name: "ZAB — Zentralstelle für ausländisches Bildungswesen",
    description:
      "Centralna ustanova KMK za vrednovanje stranih obrazovnih dokumenata. Izdaje Zeugnisbewertung.",
    url: "https://zab.kmk.org/",
  },
  {
    name: "Make it in Germany",
    description: "Službeni vladin portal za priznavanje, vize i život u Njemačkoj.",
    url: "https://www.make-it-in-germany.com/de/",
  },
];
