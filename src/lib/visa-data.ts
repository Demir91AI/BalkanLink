/** Visa Navigator – types of residence permits and visas for Germany */

export interface VisaType {
  id: string;
  title: string;
  titleDe: string;
  icon: string;
  desc: string;
  whoCanApply: string[];
  basicRequirements: string[];
  documents: string[];
  commonMistakes: string[];
  /** slug of existing Smart Guide in guide-data.ts, if available */
  guideSlug?: string;
  officialUrl: string;
}

export const visaTypes: VisaType[] = [
  {
    id: "radna-viza",
    title: "Radna viza",
    titleDe: "Arbeitsvisum / Aufenthaltserlaubnis zur Beschäftigung",
    icon: "💼",
    desc: "Dozvola za rad u Njemačkoj ako imaš ugovor o zaposlenju.",
    whoCanApply: [
      "Državljani izvan EU koji imaju ugovor o radu sa njemačkim poslodavcem",
      "Kvalifikovani radnici (Fachkräfte) sa priznatom diplomom ili stručnom kvalifikacijom",
      "Osobe sa odobrenjem Bundesagentur für Arbeit (BA) za konkretno radno mjesto",
    ],
    basicRequirements: [
      "Važeći pasoš (min. 6 mjeseci)",
      "Ugovor o radu ili potvrda poslodavca",
      "Priznata diploma ili stručna kvalifikacija",
      "Zdravstveno osiguranje",
      "Dokaz o smještaju u Njemačkoj",
    ],
    documents: [
      "Pasoš (važeći min. 6 mjeseci)",
      "Biometrijska fotografija",
      "Ugovor o radu",
      "Priznata diploma / stručna kvalifikacija (sa Anerkennung)",
      "Potvrda zdravstvenog osiguranja",
      "Dokaz o smještaju",
      "Motivaciono pismo (ponekad)",
    ],
    commonMistakes: [
      "Diploma nije priznata u Njemačkoj — obavezno pokrenuti postupak priznavanja (Anerkennung) prije prijave",
      "Predaja zahtjeva bez ugovora o radu",
      "Kasno zakazivanje termina na ambasadi — termini su zauzeti mjesecima unaprijed",
      "Pogrešan tip vize — turistička viza NE dozvoljava rad",
    ],
    guideSlug: "radna-viza",
    officialUrl: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt",
  },
  {
    id: "blue-card",
    title: "EU Blue Card",
    titleDe: "Blaue Karte EU",
    icon: "🇪🇺",
    desc: "Radna dozvola za visoko kvalifikovane radnike sa većom platom.",
    whoCanApply: [
      "Visokokvalificirani radnici sa fakultetskom diplomom",
      "Minimalna bruto plata: 43.800 € godišnje (deficitarna zanimanja) ili 45.300 € (ostala)",
      "IT stručnjaci sa min. 3 godine radnog iskustva (bez diplome)",
    ],
    basicRequirements: [
      "Priznata visokoškolska diploma",
      "Ugovor o radu sa minimalnom platom",
      "Važeći pasoš",
      "Zdravstveno osiguranje",
    ],
    documents: [
      "Pasoš (važeći)",
      "Biometrijska fotografija",
      "Diploma (priznata ili u postupku priznavanja)",
      "Ugovor o radu sa navedenom platom",
      "Potvrda zdravstvenog osiguranja",
      "CV / životopis",
    ],
    commonMistakes: [
      "Plata ispod minimalnog praga — ugovor mora jasno navoditi bruto iznos",
      "Diploma nije priznata — provjeriti na anabin.kmk.org",
      "Ne tražiti Blue Card nego običnu radnu vizu (Blue Card daje brži put do stalnog boravka)",
    ],
    guideSlug: "eu-blue-card",
    officialUrl: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwsendererErsteSchritte/Aufenthaltstitel/aufenthaltstitel-node.html",
  },
  {
    id: "spajanje-porodice",
    title: "Spajanje porodice",
    titleDe: "Familiennachzug",
    icon: "👨‍👩‍👧‍👦",
    desc: "Boravišna dozvola za dolazak supružnika ili djece u Njemačku.",
    whoCanApply: [
      "Supružnik/partner osobe koja živi u Njemačkoj sa važećom boravišnom dozvolom",
      "Maloljetna djeca (do 18 godina) koja se pridružuju roditelju u Njemačkoj",
      "Roditelji maloljetne djece koja žive u Njemačkoj (u posebnim slučajevima)",
    ],
    basicRequirements: [
      "Važeći pasoš",
      "Dozvola boravka osobe u Njemačkoj (referentna osoba)",
      "Dokaz o dovoljnom stambenom prostoru",
      "Dokaz o finansijskim sredstvima",
      "A1 certifikat njemačkog jezika (za supružnike)",
      "Vjenčani / rodni list (ovjeren i preveden)",
    ],
    documents: [
      "Pasoš (važeći)",
      "Biometrijska fotografija",
      "Vjenčani list ili rodni list (ovjeren + preveden)",
      "Boravišna dozvola partnera u Njemačkoj (kopija)",
      "Dokaz o stambenom prostoru (ugovor o najmu + veličina stana)",
      "Dokaz o primanjima / Verpflichtungserklärung",
      "A1 certifikat njemačkog jezika (za supružnike)",
    ],
    commonMistakes: [
      "A1 certifikat ne položen prije podnošenja zahtjeva",
      "Stambeni prostor premalen prema standardima (min. 12m² po osobi)",
      "Dokumenti nisu prevedeni od ovlaštenog prevodioca",
      "Predugo čekanje — obrada može trajati 2–6 mjeseci",
    ],
    guideSlug: "spajanje-porodice",
    officialUrl: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt",
  },
  {
    id: "studentska-viza",
    title: "Studentska viza",
    titleDe: "Visum zu Studienzwecken (§16b AufenthG)",
    icon: "🎓",
    desc: "Dozvola za boravak u svrhu studiranja u Njemačkoj.",
    whoCanApply: [
      "Osobe primljene na njemački univerzitet ili Studienkolleg",
      "Državljani izvan EU koji žele studirati u Njemačkoj",
      "Osobe sa dovoljnim finansijskim sredstvima za studij",
    ],
    basicRequirements: [
      "Potvrda o upisu (Zulassungsbescheid) ili uvjetni prijem",
      "Blokirani račun (Sperrkonto) sa min. 11.904 € godišnje",
      "Važeći pasoš",
      "Zdravstveno osiguranje",
    ],
    documents: [
      "Pasoš (važeći min. 6 mjeseci)",
      "Biometrijska fotografija",
      "Potvrda o upisu na univerzitet (Zulassungsbescheid)",
      "Dokaz o finansijama (Sperrkonto, stipendija ili Verpflichtungserklärung)",
      "Zdravstveno osiguranje",
      "Diplome / školske svjedodžbe (prevedene i ovjerene)",
      "Motivaciono pismo (ponekad)",
    ],
    commonMistakes: [
      "Sperrkonto nije otvoren na vrijeme — otvaranje traje 2–4 sedmice",
      "Dokumenti nisu apostilirani ili prevedeni",
      "Prijava za vizu umjesto za studentski boravak",
      "Zdravstveno osiguranje nije odgovarajućeg tipa (mora biti njemačko ili priznato)",
    ],
    guideSlug: "studentska-viza",
    officialUrl: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt",
  },
  {
    id: "produzenje-boravka",
    title: "Produženje boravka",
    titleDe: "Verlängerung der Aufenthaltserlaubnis",
    icon: "🔄",
    desc: "Zahtjev za produženje boravišne dozvole prije isteka.",
    whoCanApply: [
      "Svi državljani izvan EU sa privremenom boravišnom dozvolom koja ističe",
      "Osobe koje ispunjavaju uslove za dalji boravak (posao, studij, porodica)",
    ],
    basicRequirements: [
      "Podnijeti zahtjev min. 6–8 sedmica PRIJE isteka",
      "Važeći pasoš",
      "Aktuelna boravišna dozvola",
      "Dokaz o svrsi boravka (posao, studij, porodica)",
      "Zdravstveno osiguranje",
    ],
    documents: [
      "Važeći pasoš",
      "Aktuelna boravišna dozvola (eAT kartica)",
      "Biometrijska fotografija",
      "Ugovor o radu + platne liste",
      "Ugovor o najmu",
      "Zdravstveno osiguranje",
      "Jezički certifikat (A1/B1 zavisno od vrste dozvole)",
    ],
    commonMistakes: [
      "Zahtjev predan PREKASNO — boravak postaje nelegalan!",
      "Pasoš istekao — mora biti važeći",
      "Nedostaju platne liste ili dokaz o zaposlenju",
      "Nije zakazan termin na vrijeme kod Ausländerbehörde",
    ],
    guideSlug: "",
    officialUrl: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwijAndInDeutschl/Aufenthaltstitel/aufenthaltstitel-node.html",
  },
  {
    id: "stalni-boravak",
    title: "Stalni boravak (Niederlassungserlaubnis)",
    titleDe: "Niederlassungserlaubnis",
    icon: "🏠",
    desc: "Trajna dozvola boravka nakon ispunjenja uslova (obično 5 godina).",
    whoCanApply: [
      "Osobe sa min. 5 godina legalnog boravka u Njemačkoj",
      "Nosioci Blue Card — nakon 21 ili 33 mjeseca",
      "Osobe sa B1 nivoom njemačkog jezika",
      "Osobe sa stabilnim prihodima i penzijskim osiguranjem",
    ],
    basicRequirements: [
      "Min. 5 godina boravka (ili kraće za Blue Card)",
      "B1 nivo njemačkog jezika",
      "60 mjeseci doprinosa u penzijsko osiguranje",
      "Dovoljan stambeni prostor",
      "Bez kaznene evidencije",
      "Osnovno znanje pravnog i društvenog sistema (Einbürgerungstest ili Integrationskurs)",
    ],
    documents: [
      "Važeći pasoš",
      "Aktuelna boravišna dozvola",
      "Biometrijska fotografija",
      "Jezički certifikat B1",
      "Dokaz o penzijskom osiguranju (60 mjeseci)",
      "Ugovor o radu + platne liste",
      "Ugovor o najmu",
      "Potvrda o integrationskursu ili Einbürgerungstest",
    ],
    commonMistakes: [
      "Nedovoljno mjeseci penzijskog osiguranja",
      "Jezički certifikat nije na B1 nivou",
      "Prekidi u boravku (duži od 6 mjeseci) mogu resetirati period",
      "Nejasnoća oko toga da li Integrationskurs ili Einbürgerungstest trebaju",
    ],
    guideSlug: "stalni-boravak",
    officialUrl: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwijAndInDeutschl/Niederlassungserlaubnis/niederlassungserlaubnis-node.html",
  },
];

export function getVisaById(id: string) {
  return visaTypes.find((v) => v.id === id);
}
