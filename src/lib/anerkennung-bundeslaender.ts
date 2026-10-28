/**
 * Bundesland baza — nadležne ustanove za priznavanje stranih kvalifikacija
 * po profesiji i Bundeslandu.
 *
 * Izvor: https://berater.anerkennung-in-deutschland.de/ (BIBB)
 *        Službeni portali Landesregierungen i komore (HWK, IHK, Ärztekammer, itd.)
 *
 * Stand: 2026. Sve linkove provjeravati periodično — nadležnosti se rijetko mijenjaju
 * ali web-rute jesu.
 */

export interface Bundesland {
  code: string;
  name: string;
  capital: string;
}

export const BUNDESLAENDER: Bundesland[] = [
  { code: "BW", name: "Baden-Württemberg", capital: "Stuttgart" },
  { code: "BY", name: "Bayern", capital: "München" },
  { code: "BE", name: "Berlin", capital: "Berlin" },
  { code: "BB", name: "Brandenburg", capital: "Potsdam" },
  { code: "HB", name: "Bremen", capital: "Bremen" },
  { code: "HH", name: "Hamburg", capital: "Hamburg" },
  { code: "HE", name: "Hessen", capital: "Wiesbaden" },
  { code: "MV", name: "Mecklenburg-Vorpommern", capital: "Schwerin" },
  { code: "NI", name: "Niedersachsen", capital: "Hannover" },
  { code: "NW", name: "Nordrhein-Westfalen", capital: "Düsseldorf" },
  { code: "RP", name: "Rheinland-Pfalz", capital: "Mainz" },
  { code: "SL", name: "Saarland", capital: "Saarbrücken" },
  { code: "SN", name: "Sachsen", capital: "Dresden" },
  { code: "ST", name: "Sachsen-Anhalt", capital: "Magdeburg" },
  { code: "SH", name: "Schleswig-Holstein", capital: "Kiel" },
  { code: "TH", name: "Thüringen", capital: "Erfurt" },
];

export interface AuthorityContact {
  name: string;
  /** Tipično: regulator (Regierungspräsidium, Landesprüfungsamt, HWK, IHK, …) */
  authorityType: string;
  url: string;
  notes?: string;
  /** i18n key under `authorityNotes.*` in the anerkennung namespace; overrides `notes` when translated */
  noteKey?: string;
}

/**
 * Mapa: profession.id → Bundesland code → nadležna ustanova
 *
 * Strategija:
 * - Za reglementovana zdravstvena zanimanja (Arzt, Pflege, Apotheker, Zahnarzt, Physio):
 *   Landesprüfungsamt / Regierungspräsidium / Landesamt für Gesundheit
 * - Za Lehrer: Kultusministerium / Senatsverwaltung / Bezirksregierung
 * - Za Erzieher: Landesjugendamt / Senatsverwaltung
 * - Za Handwerk (Elektroniker, Koch): HWK / IHK
 * - Za Ingenieur: Ingenieurkammer Bundeslanda
 *
 * Linkovi vode na korijenske stranice nadležnih organa kako bi se izbjegle
 * 404 greške na deep-linkovima koji se mijenjaju.
 */

type AuthorityMap = Record<string, Record<string, AuthorityContact>>;

export const AUTHORITIES: AuthorityMap = {
  // ─────────── PFLEGEFACHPERSON (medicinska sestra) ───────────
  pflegefachperson: {
    BW: { name: "Regierungspräsidium Stuttgart", authorityType: "Landesbehörde", url: "https://rp.baden-wuerttemberg.de/themen/bildung/aiq/" },
    BY: { name: "Regierung von Oberbayern", authorityType: "Landesbehörde", url: "https://www.regierung.oberbayern.bayern.de/aufgaben/3023/index.html" },
    BE: { name: "Landesamt für Gesundheit und Soziales (LAGeSo) Berlin", authorityType: "Landesbehörde", url: "https://www.berlin.de/lageso/gesundheit/berufe-im-gesundheitswesen/" },
    BB: { name: "Landesamt für Arbeitsschutz, Verbraucherschutz und Gesundheit (LAVG)", authorityType: "Landesbehörde", url: "https://lavg.brandenburg.de/" },
    HB: { name: "Senatorin für Gesundheit Bremen", authorityType: "Senatsverwaltung", url: "https://www.gesundheit.bremen.de/" },
    HH: { name: "Behörde für Justiz und Verbraucherschutz Hamburg — Landesprüfungsamt", authorityType: "Landesbehörde", url: "https://www.hamburg.de/anerkennung/" },
    HE: { name: "Hessisches Landesprüfungs- und Untersuchungsamt im Gesundheitswesen (HLPUG)", authorityType: "Landesbehörde", url: "https://hlpug.hessen.de/" },
    MV: { name: "Landesamt für Gesundheit und Soziales MV", authorityType: "Landesbehörde", url: "https://www.lagus.mv-regierung.de/" },
    NI: { name: "Niedersächsisches Landesamt für Soziales, Jugend und Familie", authorityType: "Landesbehörde", url: "https://www.soziales.niedersachsen.de/" },
    NW: { name: "Bezirksregierung Münster — Landesprüfungsamt für Medizin, Psychotherapie und Pharmazie", authorityType: "Bezirksregierung", url: "https://www.bezreg-muenster.de/de/gesundheits_und_soziales/" },
    RP: { name: "Landesamt für Soziales, Jugend und Versorgung RLP", authorityType: "Landesbehörde", url: "https://lsjv.rlp.de/" },
    SL: { name: "Landesamt für Soziales Saarland", authorityType: "Landesbehörde", url: "https://www.saarland.de/lsa/DE/home/home_node.html" },
    SN: { name: "Landesdirektion Sachsen", authorityType: "Landesbehörde", url: "https://www.lds.sachsen.de/" },
    ST: { name: "Landesverwaltungsamt Sachsen-Anhalt", authorityType: "Landesbehörde", url: "https://lvwa.sachsen-anhalt.de/" },
    SH: { name: "Landesamt für soziale Dienste Schleswig-Holstein", authorityType: "Landesbehörde", url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASD/" },
    TH: { name: "Thüringer Landesverwaltungsamt", authorityType: "Landesbehörde", url: "https://www.thueringen.de/th3/tlvwa/" },
  },

  // ─────────── ARZT (doktor medicine) ───────────
  arzt: {
    BW: { name: "Regierungspräsidium Stuttgart — Approbationsbehörde", authorityType: "Landesbehörde", url: "https://rp.baden-wuerttemberg.de/themen/bildung/aiq/" },
    BY: { name: "Regierung von Oberbayern — Approbationsbehörde", authorityType: "Landesbehörde", url: "https://www.regierung.oberbayern.bayern.de/aufgaben/3023/index.html" },
    BE: { name: "LAGeSo Berlin — Approbationen", authorityType: "Landesbehörde", url: "https://www.berlin.de/lageso/gesundheit/berufe-im-gesundheitswesen/aerzte/" },
    BB: { name: "LAVG Brandenburg", authorityType: "Landesbehörde", url: "https://lavg.brandenburg.de/" },
    HB: { name: "Senatorin für Gesundheit Bremen", authorityType: "Senatsverwaltung", url: "https://www.gesundheit.bremen.de/" },
    HH: { name: "Behörde für Wissenschaft, Forschung, Gleichstellung und Bezirke Hamburg", authorityType: "Landesbehörde", url: "https://www.hamburg.de/bwfgb/" },
    HE: { name: "HLPUG — Hessisches Landesprüfungs- und Untersuchungsamt", authorityType: "Landesbehörde", url: "https://hlpug.hessen.de/" },
    MV: { name: "LAGuS MV", authorityType: "Landesbehörde", url: "https://www.lagus.mv-regierung.de/" },
    NI: { name: "Niedersächsisches Landesamt für Soziales", authorityType: "Landesbehörde", url: "https://www.soziales.niedersachsen.de/" },
    NW: { name: "Bezirksregierung Münster / Düsseldorf / Köln / Arnsberg / Detmold", authorityType: "Bezirksregierung", url: "https://www.bezreg-muenster.de/de/gesundheits_und_soziales/" },
    RP: { name: "Landesamt für Soziales RLP", authorityType: "Landesbehörde", url: "https://lsjv.rlp.de/" },
    SL: { name: "Landesamt für Soziales Saarland", authorityType: "Landesbehörde", url: "https://www.saarland.de/lsa/DE/home/home_node.html" },
    SN: { name: "Landesdirektion Sachsen", authorityType: "Landesbehörde", url: "https://www.lds.sachsen.de/" },
    ST: { name: "Landesverwaltungsamt Sachsen-Anhalt", authorityType: "Landesbehörde", url: "https://lvwa.sachsen-anhalt.de/" },
    SH: { name: "Landesamt für soziale Dienste SH", authorityType: "Landesbehörde", url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASD/" },
    TH: { name: "Thüringer Landesverwaltungsamt", authorityType: "Landesbehörde", url: "https://www.thueringen.de/th3/tlvwa/" },
  },

  // ─────────── INGENIEUR ───────────
  ingenieur: {
    BW: { name: "Ingenieurkammer Baden-Württemberg", authorityType: "Ingenieurkammer", url: "https://www.ingbw.de/" },
    BY: { name: "Bayerische Ingenieurekammer-Bau", authorityType: "Ingenieurkammer", url: "https://www.bayika.de/" },
    BE: { name: "Baukammer Berlin", authorityType: "Ingenieurkammer", url: "https://www.baukammerberlin.de/" },
    BB: { name: "Brandenburgische Ingenieurkammer", authorityType: "Ingenieurkammer", url: "https://www.bbik.de/" },
    HB: { name: "Ingenieurkammer Bremen", authorityType: "Ingenieurkammer", url: "https://www.ingenieurkammer.bremen.de/" },
    HH: { name: "Hamburgische Ingenieurkammer-Bau", authorityType: "Ingenieurkammer", url: "https://www.hikb.de/" },
    HE: { name: "Ingenieurkammer Hessen", authorityType: "Ingenieurkammer", url: "https://www.ingkh.de/" },
    MV: { name: "Ingenieurkammer Mecklenburg-Vorpommern", authorityType: "Ingenieurkammer", url: "https://www.ing-mv.de/" },
    NI: { name: "Ingenieurkammer Niedersachsen", authorityType: "Ingenieurkammer", url: "https://www.ingenieurkammer.de/" },
    NW: { name: "Ingenieurkammer-Bau NRW", authorityType: "Ingenieurkammer", url: "https://www.ikbaunrw.de/" },
    RP: { name: "Ingenieurkammer Rheinland-Pfalz", authorityType: "Ingenieurkammer", url: "https://www.ing-rlp.de/" },
    SL: { name: "Ingenieurkammer des Saarlandes", authorityType: "Ingenieurkammer", url: "https://www.ing-saar.de/" },
    SN: { name: "Ingenieurkammer Sachsen", authorityType: "Ingenieurkammer", url: "https://www.ing-sn.de/" },
    ST: { name: "Ingenieurkammer Sachsen-Anhalt", authorityType: "Ingenieurkammer", url: "https://www.ing-net.de/" },
    SH: { name: "Ingenieurkammer Schleswig-Holstein", authorityType: "Ingenieurkammer", url: "https://www.iksh.de/" },
    TH: { name: "Ingenieurkammer Thüringen", authorityType: "Ingenieurkammer", url: "https://www.ikth.de/" },
  },

  // ─────────── LEHRER (učitelj) ───────────
  lehrer: {
    BW: { name: "Regierungspräsidium Stuttgart — Schule und Bildung", authorityType: "Kultusverwaltung", url: "https://rp.baden-wuerttemberg.de/themen/bildung/" },
    BY: { name: "Bayerisches Staatsministerium für Unterricht und Kultus", authorityType: "Kultusministerium", url: "https://www.km.bayern.de/" },
    BE: { name: "Senatsverwaltung für Bildung, Jugend und Familie Berlin", authorityType: "Senatsverwaltung", url: "https://www.berlin.de/sen/bjf/" },
    BB: { name: "Ministerium für Bildung, Jugend und Sport Brandenburg", authorityType: "Kultusministerium", url: "https://mbjs.brandenburg.de/" },
    HB: { name: "Senatorin für Kinder und Bildung Bremen", authorityType: "Senatsverwaltung", url: "https://www.bildung.bremen.de/" },
    HH: { name: "Behörde für Schule und Berufsbildung Hamburg", authorityType: "Schulbehörde", url: "https://www.hamburg.de/bsb/" },
    HE: { name: "Hessisches Kultusministerium", authorityType: "Kultusministerium", url: "https://kultusministerium.hessen.de/" },
    MV: { name: "Ministerium für Bildung und Kindertagesförderung MV", authorityType: "Kultusministerium", url: "https://www.regierung-mv.de/Landesregierung/bm/" },
    NI: { name: "Niedersächsisches Kultusministerium", authorityType: "Kultusministerium", url: "https://www.mk.niedersachsen.de/" },
    NW: { name: "Bezirksregierungen NRW (Düsseldorf, Köln, Münster, Detmold, Arnsberg)", authorityType: "Bezirksregierung", url: "https://www.schulministerium.nrw/" },
    RP: { name: "Aufsichts- und Dienstleistungsdirektion (ADD) Trier", authorityType: "Landesbehörde", url: "https://add.rlp.de/" },
    SL: { name: "Ministerium für Bildung und Kultur Saarland", authorityType: "Kultusministerium", url: "https://www.saarland.de/mbk/" },
    SN: { name: "Landesamt für Schule und Bildung Sachsen", authorityType: "Landesbehörde", url: "https://www.lasub.smk.sachsen.de/" },
    ST: { name: "Landesschulamt Sachsen-Anhalt", authorityType: "Landesbehörde", url: "https://lsa.sachsen-anhalt.de/" },
    SH: { name: "Ministerium für allgemeine und berufliche Bildung SH", authorityType: "Kultusministerium", url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/III/" },
    TH: { name: "Thüringer Ministerium für Bildung, Jugend und Sport", authorityType: "Kultusministerium", url: "https://bildung.thueringen.de/" },
  },

  // ─────────── PHYSIOTHERAPEUT ───────────
  physiotherapeut: {
    BW: { name: "Regierungspräsidium Stuttgart", authorityType: "Landesbehörde", url: "https://rp.baden-wuerttemberg.de/themen/bildung/aiq/" },
    BY: { name: "Regierung von Oberbayern", authorityType: "Landesbehörde", url: "https://www.regierung.oberbayern.bayern.de/" },
    BE: { name: "LAGeSo Berlin", authorityType: "Landesbehörde", url: "https://www.berlin.de/lageso/gesundheit/berufe-im-gesundheitswesen/" },
    BB: { name: "LAVG Brandenburg", authorityType: "Landesbehörde", url: "https://lavg.brandenburg.de/" },
    HB: { name: "Senatorin für Gesundheit Bremen", authorityType: "Senatsverwaltung", url: "https://www.gesundheit.bremen.de/" },
    HH: { name: "Behörde für Justiz und Verbraucherschutz Hamburg", authorityType: "Landesbehörde", url: "https://www.hamburg.de/bjv/" },
    HE: { name: "HLPUG Hessen", authorityType: "Landesbehörde", url: "https://hlpug.hessen.de/" },
    MV: { name: "LAGuS MV", authorityType: "Landesbehörde", url: "https://www.lagus.mv-regierung.de/" },
    NI: { name: "Niedersächsisches Landesamt für Soziales", authorityType: "Landesbehörde", url: "https://www.soziales.niedersachsen.de/" },
    NW: { name: "Bezirksregierung Köln / Münster", authorityType: "Bezirksregierung", url: "https://www.bezreg-koeln.nrw.de/" },
    RP: { name: "LSJV RLP", authorityType: "Landesbehörde", url: "https://lsjv.rlp.de/" },
    SL: { name: "Landesamt für Soziales Saarland", authorityType: "Landesbehörde", url: "https://www.saarland.de/lsa/" },
    SN: { name: "Landesdirektion Sachsen", authorityType: "Landesbehörde", url: "https://www.lds.sachsen.de/" },
    ST: { name: "Landesverwaltungsamt Sachsen-Anhalt", authorityType: "Landesbehörde", url: "https://lvwa.sachsen-anhalt.de/" },
    SH: { name: "Landesamt für soziale Dienste SH", authorityType: "Landesbehörde", url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASD/" },
    TH: { name: "Thüringer Landesverwaltungsamt", authorityType: "Landesbehörde", url: "https://www.thueringen.de/th3/tlvwa/" },
  },

  // ─────────── ERZIEHER (vaspitač) ───────────
  erzieher: {
    BW: { name: "Regierungspräsidium Stuttgart — Schule und Bildung", authorityType: "Landesbehörde", url: "https://rp.baden-wuerttemberg.de/themen/bildung/aiq/" },
    BY: { name: "Bayerisches Staatsministerium für Unterricht und Kultus", authorityType: "Kultusministerium", url: "https://www.km.bayern.de/" },
    BE: { name: "Senatsverwaltung für Bildung, Jugend und Familie Berlin", authorityType: "Senatsverwaltung", url: "https://www.berlin.de/sen/bjf/" },
    BB: { name: "Ministerium für Bildung, Jugend und Sport Brandenburg", authorityType: "Kultusministerium", url: "https://mbjs.brandenburg.de/" },
    HB: { name: "Senatorin für Kinder und Bildung Bremen", authorityType: "Senatsverwaltung", url: "https://www.bildung.bremen.de/" },
    HH: { name: "Behörde für Arbeit, Gesundheit, Soziales, Familie und Integration Hamburg", authorityType: "Behörde", url: "https://www.hamburg.de/basfi/" },
    HE: { name: "Hessisches Amt für Lehrerbildung", authorityType: "Landesbehörde", url: "https://lehrkraefteakademie.hessen.de/" },
    MV: { name: "Ministerium für Soziales, Gesundheit und Sport MV", authorityType: "Landesministerium", url: "https://www.regierung-mv.de/Landesregierung/sm/" },
    NI: { name: "Niedersächsisches Landesamt für Soziales", authorityType: "Landesbehörde", url: "https://www.soziales.niedersachsen.de/" },
    NW: { name: "Bezirksregierungen NRW", authorityType: "Bezirksregierung", url: "https://www.bra.nrw.de/" },
    RP: { name: "Aufsichts- und Dienstleistungsdirektion (ADD)", authorityType: "Landesbehörde", url: "https://add.rlp.de/" },
    SL: { name: "Ministerium für Bildung und Kultur Saarland", authorityType: "Kultusministerium", url: "https://www.saarland.de/mbk/" },
    SN: { name: "Landesjugendamt Sachsen", authorityType: "Landesbehörde", url: "https://www.kommisoz.sachsen.de/" },
    ST: { name: "Landesverwaltungsamt Sachsen-Anhalt", authorityType: "Landesbehörde", url: "https://lvwa.sachsen-anhalt.de/" },
    SH: { name: "Ministerium für Soziales, Jugend, Familie SH", authorityType: "Landesministerium", url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/VIII/" },
    TH: { name: "Thüringer Landesverwaltungsamt", authorityType: "Landesbehörde", url: "https://www.thueringen.de/th3/tlvwa/" },
  },

  // ─────────── APOTHEKER (farmaceut) ───────────
  apotheker: {
    BW: { name: "Regierungspräsidium Stuttgart", authorityType: "Landesbehörde", url: "https://rp.baden-wuerttemberg.de/themen/bildung/aiq/" },
    BY: { name: "Regierung von Oberbayern", authorityType: "Landesbehörde", url: "https://www.regierung.oberbayern.bayern.de/" },
    BE: { name: "LAGeSo Berlin", authorityType: "Landesbehörde", url: "https://www.berlin.de/lageso/" },
    BB: { name: "LAVG Brandenburg", authorityType: "Landesbehörde", url: "https://lavg.brandenburg.de/" },
    HB: { name: "Senatorin für Gesundheit Bremen", authorityType: "Senatsverwaltung", url: "https://www.gesundheit.bremen.de/" },
    HH: { name: "Behörde für Wissenschaft Hamburg", authorityType: "Landesbehörde", url: "https://www.hamburg.de/bwfgb/" },
    HE: { name: "HLPUG Hessen", authorityType: "Landesbehörde", url: "https://hlpug.hessen.de/" },
    MV: { name: "LAGuS MV", authorityType: "Landesbehörde", url: "https://www.lagus.mv-regierung.de/" },
    NI: { name: "Niedersächsisches Landesamt für Soziales", authorityType: "Landesbehörde", url: "https://www.soziales.niedersachsen.de/" },
    NW: { name: "Bezirksregierung Münster — Pharmazie", authorityType: "Bezirksregierung", url: "https://www.bezreg-muenster.de/" },
    RP: { name: "LSJV RLP", authorityType: "Landesbehörde", url: "https://lsjv.rlp.de/" },
    SL: { name: "Landesamt für Soziales Saarland", authorityType: "Landesbehörde", url: "https://www.saarland.de/lsa/" },
    SN: { name: "Landesdirektion Sachsen", authorityType: "Landesbehörde", url: "https://www.lds.sachsen.de/" },
    ST: { name: "Landesverwaltungsamt Sachsen-Anhalt", authorityType: "Landesbehörde", url: "https://lvwa.sachsen-anhalt.de/" },
    SH: { name: "Landesamt für soziale Dienste SH", authorityType: "Landesbehörde", url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASD/" },
    TH: { name: "Thüringer Landesverwaltungsamt", authorityType: "Landesbehörde", url: "https://www.thueringen.de/th3/tlvwa/" },
  },

  // ─────────── ZAHNARZT (stomatolog) ───────────
  zahnarzt: {
    BW: { name: "Regierungspräsidium Stuttgart — Approbationsbehörde", authorityType: "Landesbehörde", url: "https://rp.baden-wuerttemberg.de/themen/bildung/aiq/" },
    BY: { name: "Regierung von Oberbayern", authorityType: "Landesbehörde", url: "https://www.regierung.oberbayern.bayern.de/" },
    BE: { name: "LAGeSo Berlin", authorityType: "Landesbehörde", url: "https://www.berlin.de/lageso/" },
    BB: { name: "LAVG Brandenburg", authorityType: "Landesbehörde", url: "https://lavg.brandenburg.de/" },
    HB: { name: "Senatorin für Gesundheit Bremen", authorityType: "Senatsverwaltung", url: "https://www.gesundheit.bremen.de/" },
    HH: { name: "Behörde für Wissenschaft Hamburg", authorityType: "Landesbehörde", url: "https://www.hamburg.de/bwfgb/" },
    HE: { name: "HLPUG Hessen", authorityType: "Landesbehörde", url: "https://hlpug.hessen.de/" },
    MV: { name: "LAGuS MV", authorityType: "Landesbehörde", url: "https://www.lagus.mv-regierung.de/" },
    NI: { name: "Niedersächsisches Landesamt für Soziales", authorityType: "Landesbehörde", url: "https://www.soziales.niedersachsen.de/" },
    NW: { name: "Bezirksregierungen NRW", authorityType: "Bezirksregierung", url: "https://www.bezreg-muenster.de/" },
    RP: { name: "LSJV RLP", authorityType: "Landesbehörde", url: "https://lsjv.rlp.de/" },
    SL: { name: "Landesamt für Soziales Saarland", authorityType: "Landesbehörde", url: "https://www.saarland.de/lsa/" },
    SN: { name: "Landesdirektion Sachsen", authorityType: "Landesbehörde", url: "https://www.lds.sachsen.de/" },
    ST: { name: "Landesverwaltungsamt Sachsen-Anhalt", authorityType: "Landesbehörde", url: "https://lvwa.sachsen-anhalt.de/" },
    SH: { name: "Landesamt für soziale Dienste SH", authorityType: "Landesbehörde", url: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASD/" },
    TH: { name: "Thüringer Landesverwaltungsamt", authorityType: "Landesbehörde", url: "https://www.thueringen.de/th3/tlvwa/" },
  },

  // ─────────── KOCH (kuhar) — IHK ───────────
  koch: {
    BW: { name: "IHK Region Stuttgart", authorityType: "IHK", url: "https://www.stuttgart.ihk.de/" },
    BY: { name: "IHK München und Oberbayern", authorityType: "IHK", url: "https://www.ihk-muenchen.de/" },
    BE: { name: "IHK Berlin", authorityType: "IHK", url: "https://www.ihk.de/berlin/" },
    BB: { name: "IHK Potsdam", authorityType: "IHK", url: "https://www.ihk-potsdam.de/" },
    HB: { name: "Handelskammer Bremen", authorityType: "IHK", url: "https://www.handelskammer-bremen.de/" },
    HH: { name: "Handelskammer Hamburg", authorityType: "IHK", url: "https://www.ihk.de/hamburg/" },
    HE: { name: "IHK Frankfurt am Main / Hessen", authorityType: "IHK", url: "https://www.frankfurt-main.ihk.de/" },
    MV: { name: "IHK zu Schwerin / Rostock", authorityType: "IHK", url: "https://www.ihkzuschwerin.de/" },
    NI: { name: "IHK Hannover / Niedersachsen", authorityType: "IHK", url: "https://www.hannover.ihk.de/" },
    NW: { name: "IHK Düsseldorf / Köln / Dortmund (po regiji)", authorityType: "IHK", url: "https://www.ihk.de/duesseldorf/" },
    RP: { name: "IHK Pfalz / Koblenz / Trier", authorityType: "IHK", url: "https://www.pfalz.ihk24.de/" },
    SL: { name: "IHK Saarland", authorityType: "IHK", url: "https://www.saarland.ihk.de/" },
    SN: { name: "IHK Dresden / Leipzig / Chemnitz", authorityType: "IHK", url: "https://www.dresden.ihk.de/" },
    ST: { name: "IHK Magdeburg / Halle-Dessau", authorityType: "IHK", url: "https://www.magdeburg.ihk24.de/" },
    SH: { name: "IHK Schleswig-Holstein", authorityType: "IHK", url: "https://www.ihk-schleswig-holstein.de/" },
    TH: { name: "IHK Erfurt / Südthüringen / Ostthüringen", authorityType: "IHK", url: "https://www.erfurt.ihk.de/" },
  },

  // ─────────── ELEKTRONIKER — HWK ───────────
  elektroniker: {
    BW: { name: "Handwerkskammer Region Stuttgart", authorityType: "HWK", url: "https://www.hwk-stuttgart.de/" },
    BY: { name: "Handwerkskammer für München und Oberbayern", authorityType: "HWK", url: "https://www.hwk-muenchen.de/" },
    BE: { name: "Handwerkskammer Berlin", authorityType: "HWK", url: "https://www.hwk-berlin.de/" },
    BB: { name: "Handwerkskammer Potsdam / Cottbus / Frankfurt(O)", authorityType: "HWK", url: "https://www.hwkpotsdam.de/" },
    HB: { name: "Handwerkskammer Bremen", authorityType: "HWK", url: "https://www.hwk-bremen.de/" },
    HH: { name: "Handwerkskammer Hamburg", authorityType: "HWK", url: "https://www.hwk-hamburg.de/" },
    HE: { name: "Handwerkskammer Frankfurt-Rhein-Main / Wiesbaden / Kassel", authorityType: "HWK", url: "https://www.hwk-rhein-main.de/" },
    MV: { name: "Handwerkskammer Schwerin / Ostmecklenburg-Vorpommern", authorityType: "HWK", url: "https://www.hwk-schwerin.de/" },
    NI: { name: "Handwerkskammer Hannover / Braunschweig / Oldenburg", authorityType: "HWK", url: "https://www.hwk-hannover.de/" },
    NW: { name: "Handwerkskammer Düsseldorf / Köln / Münster / Dortmund", authorityType: "HWK", url: "https://www.hwk-duesseldorf.de/" },
    RP: { name: "Handwerkskammer Koblenz / Pfalz / Rheinhessen / Trier", authorityType: "HWK", url: "https://www.hwk-koblenz.de/" },
    SL: { name: "Handwerkskammer des Saarlandes", authorityType: "HWK", url: "https://www.hwk-saarland.de/" },
    SN: { name: "Handwerkskammer Dresden / Leipzig / Chemnitz", authorityType: "HWK", url: "https://www.hwk-dresden.de/" },
    ST: { name: "Handwerkskammer Magdeburg / Halle", authorityType: "HWK", url: "https://www.hwk-magdeburg.de/" },
    SH: { name: "Handwerkskammern Lübeck / Flensburg / Kiel", authorityType: "HWK", url: "https://www.hwk-luebeck.de/" },
    TH: { name: "Handwerkskammer Erfurt / Ostthüringen / Südthüringen", authorityType: "HWK", url: "https://www.hwk-erfurt.de/" },
  },

  // ─────────── MAURER / GRADJEVINAR (HWK) ───────────
  maurer: {
    BW: { name: "Handwerkskammer Region Stuttgart", authorityType: "HWK", url: "https://www.hwk-stuttgart.de/" },
    BY: { name: "Handwerkskammer München und Oberbayern", authorityType: "HWK", url: "https://www.hwk-muenchen.de/" },
    BE: { name: "Handwerkskammer Berlin", authorityType: "HWK", url: "https://www.hwk-berlin.de/" },
    BB: { name: "Handwerkskammer Potsdam", authorityType: "HWK", url: "https://www.hwkpotsdam.de/" },
    HB: { name: "Handwerkskammer Bremen", authorityType: "HWK", url: "https://www.hwk-bremen.de/" },
    HH: { name: "Handwerkskammer Hamburg", authorityType: "HWK", url: "https://www.hwk-hamburg.de/" },
    HE: { name: "Handwerkskammer Frankfurt-Rhein-Main", authorityType: "HWK", url: "https://www.hwk-rhein-main.de/" },
    MV: { name: "Handwerkskammer Schwerin", authorityType: "HWK", url: "https://www.hwk-schwerin.de/" },
    NI: { name: "Handwerkskammer Hannover", authorityType: "HWK", url: "https://www.hwk-hannover.de/" },
    NW: { name: "Handwerkskammer Düsseldorf", authorityType: "HWK", url: "https://www.hwk-duesseldorf.de/" },
    RP: { name: "Handwerkskammer Koblenz", authorityType: "HWK", url: "https://www.hwk-koblenz.de/" },
    SL: { name: "Handwerkskammer des Saarlandes", authorityType: "HWK", url: "https://www.hwk-saarland.de/" },
    SN: { name: "Handwerkskammer Dresden", authorityType: "HWK", url: "https://www.hwk-dresden.de/" },
    ST: { name: "Handwerkskammer Magdeburg", authorityType: "HWK", url: "https://www.hwk-magdeburg.de/" },
    SH: { name: "Handwerkskammer Lübeck", authorityType: "HWK", url: "https://www.hwk-luebeck.de/" },
    TH: { name: "Handwerkskammer Erfurt", authorityType: "HWK", url: "https://www.hwk-erfurt.de/" },
  },

  // ─────────── KFZ-MECHATRONIKER (auto-mehaničar) ───────────
  kfz_mechatroniker: {
    BW: { name: "Handwerkskammer Region Stuttgart", authorityType: "HWK", url: "https://www.hwk-stuttgart.de/" },
    BY: { name: "Handwerkskammer München und Oberbayern", authorityType: "HWK", url: "https://www.hwk-muenchen.de/" },
    BE: { name: "Handwerkskammer Berlin", authorityType: "HWK", url: "https://www.hwk-berlin.de/" },
    BB: { name: "Handwerkskammer Potsdam", authorityType: "HWK", url: "https://www.hwkpotsdam.de/" },
    HB: { name: "Handwerkskammer Bremen", authorityType: "HWK", url: "https://www.hwk-bremen.de/" },
    HH: { name: "Handwerkskammer Hamburg", authorityType: "HWK", url: "https://www.hwk-hamburg.de/" },
    HE: { name: "Handwerkskammer Frankfurt-Rhein-Main", authorityType: "HWK", url: "https://www.hwk-rhein-main.de/" },
    MV: { name: "Handwerkskammer Schwerin", authorityType: "HWK", url: "https://www.hwk-schwerin.de/" },
    NI: { name: "Handwerkskammer Hannover", authorityType: "HWK", url: "https://www.hwk-hannover.de/" },
    NW: { name: "Handwerkskammer Düsseldorf", authorityType: "HWK", url: "https://www.hwk-duesseldorf.de/" },
    RP: { name: "Handwerkskammer Koblenz", authorityType: "HWK", url: "https://www.hwk-koblenz.de/" },
    SL: { name: "Handwerkskammer des Saarlandes", authorityType: "HWK", url: "https://www.hwk-saarland.de/" },
    SN: { name: "Handwerkskammer Dresden", authorityType: "HWK", url: "https://www.hwk-dresden.de/" },
    ST: { name: "Handwerkskammer Magdeburg", authorityType: "HWK", url: "https://www.hwk-magdeburg.de/" },
    SH: { name: "Handwerkskammer Lübeck", authorityType: "HWK", url: "https://www.hwk-luebeck.de/" },
    TH: { name: "Handwerkskammer Erfurt", authorityType: "HWK", url: "https://www.hwk-erfurt.de/" },
  },

  // ─────────── SCHWEISSER (zavarivač) — IHK / HWK ───────────
  schweisser: {
    BW: { name: "IHK Region Stuttgart / SLV Mannheim", authorityType: "IHK / SLV", url: "https://www.stuttgart.ihk.de/" },
    BY: { name: "IHK München / SLV München", authorityType: "IHK / SLV", url: "https://www.ihk-muenchen.de/" },
    BE: { name: "IHK Berlin / SLV Berlin-Brandenburg", authorityType: "IHK / SLV", url: "https://www.ihk.de/berlin/" },
    BB: { name: "IHK Potsdam / SLV Berlin-Brandenburg", authorityType: "IHK / SLV", url: "https://www.ihk-potsdam.de/" },
    HB: { name: "Handelskammer Bremen", authorityType: "IHK", url: "https://www.handelskammer-bremen.de/" },
    HH: { name: "Handelskammer Hamburg", authorityType: "IHK", url: "https://www.ihk.de/hamburg/" },
    HE: { name: "IHK Frankfurt", authorityType: "IHK", url: "https://www.frankfurt-main.ihk.de/" },
    MV: { name: "IHK Schwerin", authorityType: "IHK", url: "https://www.ihkzuschwerin.de/" },
    NI: { name: "IHK Hannover / SLV Hannover", authorityType: "IHK / SLV", url: "https://www.hannover.ihk.de/" },
    NW: { name: "IHK Düsseldorf / SLV Duisburg", authorityType: "IHK / SLV", url: "https://www.ihk.de/duesseldorf/" },
    RP: { name: "IHK Pfalz", authorityType: "IHK", url: "https://www.pfalz.ihk24.de/" },
    SL: { name: "IHK Saarland", authorityType: "IHK", url: "https://www.saarland.ihk.de/" },
    SN: { name: "IHK Dresden / SLV Halle", authorityType: "IHK / SLV", url: "https://www.dresden.ihk.de/" },
    ST: { name: "IHK Magdeburg / SLV Halle", authorityType: "IHK / SLV", url: "https://www.magdeburg.ihk24.de/" },
    SH: { name: "IHK Schleswig-Holstein", authorityType: "IHK", url: "https://www.ihk-schleswig-holstein.de/" },
    TH: { name: "IHK Erfurt", authorityType: "IHK", url: "https://www.erfurt.ihk.de/" },
  },

  // ─────────── IT-FACHKRAFT (IT specijalist — uglavnom NREG) ───────────
  it_fachkraft: {
    BW: { name: "IHK Region Stuttgart (orijentaciono)", authorityType: "IHK", url: "https://www.stuttgart.ihk.de/" },
    BY: { name: "IHK München (orijentaciono)", authorityType: "IHK", url: "https://www.ihk-muenchen.de/" },
    BE: { name: "IHK Berlin (orijentaciono)", authorityType: "IHK", url: "https://www.ihk.de/berlin/" },
    BB: { name: "IHK Potsdam (orijentaciono)", authorityType: "IHK", url: "https://www.ihk-potsdam.de/" },
    HB: { name: "Handelskammer Bremen", authorityType: "IHK", url: "https://www.handelskammer-bremen.de/" },
    HH: { name: "Handelskammer Hamburg", authorityType: "IHK", url: "https://www.ihk.de/hamburg/" },
    HE: { name: "IHK Frankfurt", authorityType: "IHK", url: "https://www.frankfurt-main.ihk.de/" },
    MV: { name: "IHK Schwerin", authorityType: "IHK", url: "https://www.ihkzuschwerin.de/" },
    NI: { name: "IHK Hannover", authorityType: "IHK", url: "https://www.hannover.ihk.de/" },
    NW: { name: "IHK Düsseldorf / Köln", authorityType: "IHK", url: "https://www.ihk.de/duesseldorf/" },
    RP: { name: "IHK Pfalz", authorityType: "IHK", url: "https://www.pfalz.ihk24.de/" },
    SL: { name: "IHK Saarland", authorityType: "IHK", url: "https://www.saarland.ihk.de/" },
    SN: { name: "IHK Dresden", authorityType: "IHK", url: "https://www.dresden.ihk.de/" },
    ST: { name: "IHK Magdeburg", authorityType: "IHK", url: "https://www.magdeburg.ihk24.de/" },
    SH: { name: "IHK Schleswig-Holstein", authorityType: "IHK", url: "https://www.ihk-schleswig-holstein.de/" },
    TH: { name: "IHK Erfurt", authorityType: "IHK", url: "https://www.erfurt.ihk.de/" },
  },
};

/**
 * 2026-10-28 — IHK FOSA is the competent body for most IHK occupations (BQFG);
 * craft occupations go to the HWK of the place of work. The Anerkennungs-Finder
 * remains the binding lookup. Source list: docs/anerkennung-audit-2026-10-28.md
 */
const IHK_FOSA: AuthorityContact = {
  name: "IHK FOSA — Foreign Skills Approval (Nürnberg)",
  authorityType: "IHK FOSA",
  url: "https://www.ihk-fosa.de/",
  notes: "Za većinu IHK zanimanja postupak vodi IHK FOSA; lokalna IHK savjetuje. Anerkennungs-Finder potvrđuje nadležnost za tvoje mjesto.",
  noteKey: "ihkFosa",
};
const HWK_NOTE = "Nadležna je Handwerkskammer prema mjestu rada (u većim pokrajinama ima više komora). Tačnu komoru pokazuje Anerkennungs-Finder.";
const everyLand = (c: AuthorityContact) => Object.fromEntries(BUNDESLAENDER.map((b) => [b.code, c]));
const hwkByLand = () => Object.fromEntries(Object.entries(AUTHORITIES.maurer).map(([k, v]) => [k, { ...v, notes: HWK_NOTE, noteKey: "hwk" }]));
for (const id of ["elektroniker_betriebstechnik", "industriemechaniker", "zerspanungsmechaniker", "maschinen_anlagenfuehrer", "konstruktionsmechaniker", "mechatroniker", "fachkraft_lagerlogistik", "koch", "it_fachkraft"]) AUTHORITIES[id] = everyLand(IHK_FOSA);
for (const id of ["metallbauer", "tischler", "zimmerer", "fliesenleger", "maler_lackierer", "strassenbauer", "beton_stahlbetonbauer", "gebaeudereiniger", "baecker", "friseur", "dachdecker", "anlagenmechaniker_shk"]) AUTHORITIES[id] = hwkByLand();

/**
 * 2026-10-28 final cleanup — sources in docs/anerkennung-final-qa-2026-10-28.md
 * Bayern: Bayerisches Landesamt für Pflege handles Pflege (since 2023) and
 * Physiotherapie (since 1.7.2025).
 */
const LFP_BY: AuthorityContact = { name: "Bayerisches Landesamt für Pflege (LfP)", authorityType: "Landesbehörde", url: "https://www.lfp.bayern.de/" };
AUTHORITIES.pflegefachperson.BY = LFP_BY;
AUTHORITIES.physiotherapeut.BY = LFP_BY;
AUTHORITIES.altenpfleger = { ...AUTHORITIES.pflegefachperson };

const FINDER_URL = "https://www.anerkennung-in-deutschland.de/de/interest/finder/profession";
AUTHORITIES.berufskraftfahrer = everyLand({ ...IHK_FOSA, noteKey: "bkf", notes: undefined });
AUTHORITIES.buchhalter = everyLand({ name: "Anerkennungs-Finder (BIBB) — prema referentnom zanimanju", authorityType: "IHK FOSA / Steuerberaterkammer / ZAB", url: FINDER_URL, noteKey: "buchhalter" });
AUTHORITIES.sozialpaedagoge = everyLand({ name: "Anerkennungs-Finder (BIBB) — nadležna ustanova pokrajine", authorityType: "Landesbehörde", url: FINDER_URL, noteKey: "sozial" });
const AEKWL: AuthorityContact = { name: "Ärztekammer Westfalen-Lippe", authorityType: "Ärztekammer", url: "https://www.aekwl.de/fuer-mfa/nach-der-ausbildung/auslaendische-abschluesse/", noteKey: "mfa" };
AUTHORITIES.medizinische_fachangestellte = {
  ...everyLand(AEKWL),
  BY: { name: "Bayerische Landesärztekammer", authorityType: "Ärztekammer", url: "https://www.blaek.de/", noteKey: "mfa" },
  BB: { name: "Landesärztekammer Brandenburg", authorityType: "Ärztekammer", url: "https://www.laekb.de/", noteKey: "mfa" },
  ST: { name: "Ärztekammer Sachsen-Anhalt", authorityType: "Ärztekammer", url: "https://www.aeksa.de/", noteKey: "mfa" },
};

/** Default: ZAB Zeugnisbewertung (uvijek dostupno za fakultetske diplome) */
export const ZAB_FALLBACK: AuthorityContact = {
  name: "ZAB — Zentralstelle für ausländisches Bildungswesen",
  authorityType: "Bundesweit",
  url: "https://zab.kmk.org/de/zeugnisbewertung",
  notes: "Za nicht-reglementierte fakultetske diplome — Zeugnisbewertung važi u cijeloj Njemačkoj.",
  noteKey: "zab",
};
/** Academic, non-regulated: ZAB is the correct body (explicit, not a fallback). */
AUTHORITIES.ekonomist_bachelor = everyLand(ZAB_FALLBACK);

/** Regulated Land professions: remind users the Land decides and may change competence. */
for (const id of ["pflegefachperson", "altenpfleger", "arzt", "zahnarzt", "apotheker", "physiotherapeut", "lehrer", "erzieher"]) {
  AUTHORITIES[id] = Object.fromEntries(Object.entries(AUTHORITIES[id]).map(([k, v]) => [k, { ...v, noteKey: v.noteKey ?? "regulatedLand" }]));
}

export function getAuthority(professionId: string, blCode: string): AuthorityContact | null {
  return AUTHORITIES[professionId]?.[blCode] || null;
}
