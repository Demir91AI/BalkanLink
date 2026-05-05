/**
 * Elterngeld — Registry svih 16 njemačkih Bundesländer.
 *
 * VAŽNO: Elterngeld je savezna naknada (Bundesleistung), ali svaka pokrajina
 * ima vlastitu Elterngeldstelle koja koristi vlastiti PDF formular ili online portal.
 * Mjesto stanovanja roditelja u trenutku rođenja djeteta određuje nadležnost.
 *
 * Adrese, telefoni i linkovi provjereni 2025/2026. Pri promjeni — ažurirati ovdje
 * ili kroz `check-pdf-versions` cron koji prati hash zvaničnih PDF-ova.
 *
 * `autoFillSupported = true` znači da BalkanLink popunjava službeni PDF
 * lokalno u browseru (Zero-Knowledge, vidi Datenschutz §6a).
 */

export type BundeslandId =
  | "bw"  | "by"  | "be"  | "bb"  | "hb"
  | "hh"  | "he"  | "mv"  | "ni"  | "nw"
  | "rp"  | "sl"  | "sn"  | "st"  | "sh"  | "th";

export interface ElterngeldBundesland {
  id: BundeslandId;
  /** Puni njemački naziv pokrajine */
  name: string;
  /** Naziv nadležne službe (Elterngeldstelle) */
  authority: string;
  /** Kratak opis nadležnosti (npr. "12 Bezirksämter", "centralizovano") */
  authorityNote?: string;
  /** Zvanična stranica Elterngelda za ovu pokrajinu */
  officialUrl: string;
  /** Direktan link na PDF formular (ako postoji jedinstven na nivou pokrajine) */
  pdfUrl?: string;
  /** Telefonska podrška (centralni broj ili informacioni) */
  phone?: string;
  /** Da li BalkanLink podržava 1:1 auto-popunjavanje */
  autoFillSupported: boolean;
  /** Specifičnost (npr. "NRW koristi ELFE online portal — nema klasičnog PDF-a") */
  specialNote?: string;
  /** Digitalni portal za online prijavu (ako postoji za ovu pokrajinu) */
  digitalPortalUrl?: string;
  /** Naziv digitalnog portala (npr. "ElterngeldDigital", "ELFE", "EAplus") */
  digitalPortalName?: string;
  /** Da li savezni portal elterngeld-digital.de podržava ovu pokrajinu (Stand 2026) */
  supportsBundesPortal?: boolean;
}

/** Nacionalni portal Bundesministerium für Familie — Stand 2026 podržava 13 pokrajina */
export const BUNDES_PORTAL_URL = "https://www.elterngeld-digital.de/";

export const ELTERNGELD_BUNDESLAENDER: ElterngeldBundesland[] = [
  {
    id: "bw",
    name: "Baden-Württemberg",
    authority: "L-Bank — Bereich Familienförderung",
    authorityNote: "Centralizovano za cijelu pokrajinu",
    officialUrl: "https://www.l-bank.de/produkte/landeswohnraumfoerderung/elterngeld.html",
    pdfUrl: "https://www.l-bank.de/dokumente/lbank/familie/elterngeld/antrag-elterngeld.pdf",
    phone: "0721 150-0",
    autoFillSupported: false,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital (savezni portal)",
    supportsBundesPortal: true,
  },
  {
    id: "by",
    name: "Bayern",
    authority: "ZBFS — Zentrum Bayern Familie und Soziales",
    authorityNote: "7 regionalnih Außenstellen",
    officialUrl: "https://www.zbfs.bayern.de/familie/elterngeld/",
    pdfUrl: "https://www.zbfs.bayern.de/imperia/md/content/zbfs/erziehungsgeld/antraege/antrag_elterngeld_05_2025.pdf",
    phone: "0921 605-1",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "be",
    name: "Berlin",
    authority: "Bezirksamt — Jugendamt / Elterngeldstelle",
    authorityNote: "12 Bezirka, nadležnost prema mjestu stanovanja",
    officialUrl: "https://berlin.de/jugendamt-pankow/dienste-und-leistungen/kindschaftsrecht/bundeselterngeld/",
    pdfUrl: "https://berlin.de/jugendamt-pankow/_assets/fachdienst-2/dokumente/250313-elterngeldantrag-hauptantrag.pdf",
    phone: "030 90227-5050",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
    specialNote: "Berlin: nadležan je Bezirksamt prema vašoj prijavljenoj adresi (Anmeldung). 12 Bezirka — provjerite svoj na berlin.de.",
  },
  {
    id: "bb",
    name: "Brandenburg",
    authority: "Elterngeldstellen der Landkreise und kreisfreien Städte",
    authorityNote: "Lokalno (Landkreis/Stadt prema mjestu stanovanja)",
    officialUrl: "https://mgs.brandenburg.de/mgs/de/familie/elterngeld/",
    pdfUrl: "https://service.stadt-brandenburg.de/dienstleistungen/-/egov-bis-detail/dokument/175334/download?_9_WAR_vrportlet_priv_r_p_action=bisview-dienstleistung-show",
    phone: "0331 866-0",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "hb",
    name: "Bremen",
    authority: "Amt für Soziale Dienste — Elterngeldstelle",
    authorityNote: "Bremen + Bremerhaven (odvojene službe)",
    officialUrl: "https://elterngeld.bremen.de/",
    pdfUrl: "https://buergerservice.bremen.de/sixcms/media.php/5/Elterngeldantrag%20%E2%80%93%20nur%20f%C3%BCr%20Geburten%20ab%20dem%2001.04.2025.pdf",
    phone: "0421 361-0",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "hh",
    name: "Hamburg",
    authority: "BAGSFI — Behörde für Arbeit, Gesundheit, Soziales, Familie und Integration",
    authorityNote: "Centralizovano za cijeli grad",
    officialUrl: "https://www.hamburg.de/service/info/11981756/n0/",
    pdfUrl: "https://fhh1.hamburg.de/Dibis/form/pdf/Antrag_auf_Elterngeld_fuer_Geburten_ab_dem_01.04.2025_Stand_08_25.pdf",
    phone: "040 42863-0",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "he",
    name: "Hessen",
    authority: "HAVS — Hessisches Amt für Versorgung und Soziales",
    authorityNote: "Centralizovano (Wiesbaden + regionalna mjesta)",
    officialUrl: "https://soziales.hessen.de/familie/elterngeld",
    phone: "0611 817-3333",
    autoFillSupported: false,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "mv",
    name: "Mecklenburg-Vorpommern",
    authority: "LAGuS — Landesamt für Gesundheit und Soziales",
    authorityNote: "Centralizovano (Rostock)",
    officialUrl: "https://www.lagus.mv-regierung.de/Soziales/Elterngeld_ElterngeldPlus/",
    pdfUrl: "https://www.lagus.mv-regierung.de/serviceassistent/download?id=1682724",
    phone: "0381 331-59000",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "ni",
    name: "Niedersachsen",
    authority: "Landesamt für Soziales, Jugend und Familie",
    authorityNote: "4 regionalna ureda (Hannover, Braunschweig, Lüneburg, Oldenburg)",
    officialUrl: "https://www.soziales.niedersachsen.de/startseite/familie_kinder/elterngeld/",
    pdfUrl: "https://www.ms.niedersachsen.de/download/205792/Antrag_auf_Elterngeld_gueltig_fuer_Geburten_ab_dem_01.04.2025.pdf",
    phone: "0511 89701-0",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "nw",
    name: "Nordrhein-Westfalen",
    authority: "ELFE Online-Portal + lokalne Elterngeldkassen kreisova",
    authorityNote: "Online prijava preko portala ELFE",
    officialUrl: "https://www.elfe.nrw.de/",
    phone: "0211 837-1001",
    autoFillSupported: false,
    digitalPortalUrl: "https://www.elfe.nrw.de/",
    digitalPortalName: "ELFE NRW (vlastiti portal)",
    supportsBundesPortal: false,
    specialNote: "NRW koristi vlastiti portal ELFE (a ne savezni elterngeld-digital.de). Prijava ide online sa BundID. Klasičnog jedinstvenog PDF-a nema — nadležan je Kreis/Stadt prema mjestu stanovanja.",
  },
  {
    id: "rp",
    name: "Rheinland-Pfalz",
    authority: "Elterngeldstellen der Kreis- und Stadtverwaltungen",
    authorityNote: "Lokalno (Kreis/Stadt prema mjestu stanovanja)",
    officialUrl: "https://mffki.rlp.de/themen/familie/gute-zukunft-fuer-alle-kinder-und-eltern/finanzielle-leistungen/elterngeld",
    pdfUrl: "https://mffki.rlp.de/fileadmin/07/Dokumente/Themen/Familie/Gute_Zukunft_fuer_alle_Kinder_und_Eltern/Elterngeld/2025_08_1_Einheitlicher_Elterngeldantrag.pdf",
    phone: "06131 16-0",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "sl",
    name: "Saarland",
    authority: "Landesamt für Soziales — Elterngeldstelle",
    authorityNote: "Centralizovano (Saarbrücken)",
    officialUrl: "https://www.saarland.de/mfsfgi/DE/themen/familie/elterngeld/",
    phone: "0681 9978-0",
    autoFillSupported: false,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "sn",
    name: "Sachsen",
    authority: "KSV Sachsen — Kommunaler Sozialverband",
    authorityNote: "Centralizovano (Chemnitz)",
    officialUrl: "https://www.ksv-sachsen.de/elterngeld.html",
    phone: "0371 577-0",
    autoFillSupported: false,
    digitalPortalUrl: "https://amt24.sachsen.de/",
    digitalPortalName: "Amt24 Sachsen",
    supportsBundesPortal: false,
    specialNote: "Sachsen koristi vlastiti portal Amt24 (Sächsisches E-Government). Prijava ide online sa BundID ili Servicekonto Sachsen.",
  },
  {
    id: "st",
    name: "Sachsen-Anhalt",
    authority: "Landesverwaltungsamt Sachsen-Anhalt — Elterngeldstelle",
    authorityNote: "Centralizovano (Halle/Saale)",
    officialUrl: "https://lvwa.sachsen-anhalt.de/das-lvwa/landesjugendamt/familien-und-frauen/elterngeld-und-elternzeit/antragsformulare",
    pdfUrl: "https://lvwa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/LVWA/LVwA/Dokumente/5_famgesjugvers/502/Dateien_502.a/Elterngeld/Antrag_Elterngeld_0825.pdf",
    phone: "0345 514-0",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "sh",
    name: "Schleswig-Holstein",
    authority: "Landesamt für soziale Dienste",
    authorityNote: "Neumünster — centralizovano",
    officialUrl: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/kinderElternElterngeld_node",
    pdfUrl: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/1_EinheitlicherElterngeldantrag.pdf?__blob=publicationFile&v=3",
    phone: "04321 913-5",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
  {
    id: "th",
    name: "Thüringen",
    authority: "Thüringer Landesverwaltungsamt — Elterngeldstelle",
    authorityNote: "Centralizovano (Suhl)",
    officialUrl: "https://landesverwaltungsamt.thueringen.de/soziales/elterngeld/formulare",
    pdfUrl: "https://thformular.thueringen.de/thueform/cfs/eject/gen?MANDANTID=18&FORMUID=BEEG-071-DE-FL",
    phone: "0361 57-3211000",
    autoFillSupported: true,
    digitalPortalUrl: "https://www.elterngeld-digital.de/",
    digitalPortalName: "ElterngeldDigital",
    supportsBundesPortal: true,
  },
];

export function getBundesland(id: BundeslandId): ElterngeldBundesland | undefined {
  return ELTERNGELD_BUNDESLAENDER.find(b => b.id === id);
}

export const DEFAULT_BUNDESLAND: BundeslandId = "by";
