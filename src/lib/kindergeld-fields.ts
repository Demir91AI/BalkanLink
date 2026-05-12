/**
 * Kindergeld (KG1) — mapping iz BalkanLink wizard podataka na originalna
 * AcroForm field imena iz Familienkasse KG1 PDF formulara (Stand 2026).
 *
 * Centralizirano (Familienkasse pri BA), nema Bundesland selektora.
 * PDF prima do 5 djece zbirno; za >5 djece korisnik popunjava dodatni KG1.
 *
 * NIKAD ne flatten-amo PDF — polja ostaju editabilna da klijent može
 * dopisati i potpisati u Acrobat Reader-u prije slanja Familienkasse.
 */

export type Geschlecht = "" | "männlich" | "weiblich" | "divers";
export type Familienstand =
  | ""
  | "ledig"
  | "verheiratet"
  | "lebenspartnerschaft"
  | "geschieden"
  | "aufgehoben"
  | "getrennt"
  | "verwitwet";

export interface KindergeldKind {
  vorname: string;
  geburtsdatum: string; // ISO yyyy-mm-dd
  geschlecht: Geschlecht;
  familienkasse: string; // bei welcher anderen Familienkasse beantragt
}

export interface KindergeldFormData {
  // §1 Antragsteller
  steuerId1: string;            // 11 cifara
  titel: string;
  familienname: string;
  vorname: string;
  geburtsname: string;
  geburtsdatum: string;         // yyyy-mm-dd
  geburtsort: string;
  geschlecht: Geschlecht;
  staatsangehoerigkeit: string;
  anschrift: string;            // pun string: ulica + br + PLZ + grad
  familienstand: Familienstand;
  familienstandSeit: string;    // yyyy-mm-dd (verheiratet ab)

  // §2 Ehepartner / Lebenspartner
  hasPartner: boolean;
  steuerId2: string;
  pTitel: string;
  pFamilienname: string;
  pVorname: string;
  pGeburtsname: string;
  pGeburtsdatum: string;
  pStaatsangehoerigkeit: string;
  pGeschlecht: Geschlecht;
  pAnschrift: string;

  // §3 Zahlungsweg
  iban: string;
  bic: string;
  bank: string;
  kontoinhaber: "self" | "other";
  khName: string;               // ako "other" — ime i prezime vlasnika

  // §4 Bescheid an dritte Person
  hasOther: boolean;
  bName: string;
  bVorname: string;
  bAnschrift: string;

  // §5 Kinder (max 5 u glavnom PDF-u)
  kinder: KindergeldKind[];

  // §6 Datum + Ort (potpis fizički, samo datum se popunjava)
  ort: string;
  datum: string;                // yyyy-mm-dd
}

export const initialKindergeldData = (): KindergeldFormData => ({
  steuerId1: "", titel: "", familienname: "", vorname: "", geburtsname: "",
  geburtsdatum: "", geburtsort: "", geschlecht: "", staatsangehoerigkeit: "",
  anschrift: "", familienstand: "", familienstandSeit: "",

  hasPartner: false,
  steuerId2: "", pTitel: "", pFamilienname: "", pVorname: "", pGeburtsname: "",
  pGeburtsdatum: "", pStaatsangehoerigkeit: "", pGeschlecht: "", pAnschrift: "",

  iban: "", bic: "", bank: "", kontoinhaber: "self", khName: "",

  hasOther: false, bName: "", bVorname: "", bAnschrift: "",

  kinder: Array.from({ length: 1 }, () => ({
    vorname: "", geburtsdatum: "", geschlecht: "", familienkasse: "",
  })),

  ort: "",
  datum: new Date().toISOString().slice(0, 10),
});

const formatDateDE = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

/** Steuer-ID 11 cifara → razdijeljeno 2 / 3 / 3 / 3 (Familienkasse PDF format). */
function splitSteuerId(id: string): [string, string, string, string] {
  const d = id.replace(/\D/g, "").padEnd(11, " ").slice(0, 11);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 8), d.slice(8, 11)].map(s => s.trim()) as [string, string, string, string];
}

const geschlechtShort = (g: Geschlecht) =>
  g === "männlich" ? "m" : g === "weiblich" ? "w" : g === "divers" ? "d" : "";

export interface FieldFill {
  name: string;
  type: "text" | "check";
  value?: string;
}

const P_S1 = "topmostSubform[0].Seite1[0].Punkt-1[0]";
const P_S2 = "topmostSubform[0].Seite1[0].Punkt-2[0]";
const P_S3 = "topmostSubform[0].Seite1[0].Punkt-3[0]";
const P_S4 = "topmostSubform[0].Page2[0].Punkt-4[0]";
const P_S5 = "topmostSubform[0].Page2[0].Punkt-5[0].Tabelle1-Kinder[0]";
const P_SIG = "topmostSubform[0].Page2[0]";

export function buildKindergeldFieldFills(d: KindergeldFormData): FieldFill[] {
  const out: FieldFill[] = [];
  const text = (name: string, value: string) => {
    if (value && value.trim()) out.push({ name, type: "text", value });
  };
  const check = (name: string) => out.push({ name, type: "check" });

  // === §1 Antragsteller ===
  const [s1a, s1b, s1c, s1d] = splitSteuerId(d.steuerId1);
  text(`${P_S1}.Steuer-ID[0].Steuer-ID-1[0]`, s1a);
  text(`${P_S1}.Steuer-ID[0].Steuer-ID-2[0]`, s1b);
  text(`${P_S1}.Steuer-ID[0].Steuer-ID-3[0]`, s1c);
  text(`${P_S1}.Steuer-ID[0].Steuer-ID-4[0]`, s1d);

  text(`${P_S1}.Pkt-1-Zeile-1[0].Titel-Antragsteller[0]`, d.titel);
  text(`${P_S1}.Pkt-1-Zeile-1[0].Name-Antragsteller[0]`, d.familienname);
  text(`${P_S1}.Pkt-1-Zeile-2[0].Vorname-Antragsteller[0]`, d.vorname);
  text(`${P_S1}.Pkt-1-Zeile-2[0].Geburtsname-Antragsteller[0]`, d.geburtsname);
  text(`${P_S1}.Pkt-1-Zeile-3[0].Geburtsdatum-Antragsteller[0]`, formatDateDE(d.geburtsdatum));
  text(`${P_S1}.Pkt-1-Zeile-3[0].Geburtsort-Antragsteller[0]`, d.geburtsort);
  text(`${P_S1}.Pkt-1-Zeile-3[0].Geschlecht-Antragsteller[0]`, geschlechtShort(d.geschlecht));
  text(`${P_S1}.Pkt-1-Zeile-3[0].Staatsangehörigkeit-Antragsteller[0]`, d.staatsangehoerigkeit);
  text(`${P_S1}.Anschrift-Antragsteller[0]`, d.anschrift);

  // Familienstand
  const fsBase = `${P_S1}.Familienstand[0].#area[12]`;
  switch (d.familienstand) {
    case "ledig": check(`${fsBase}.ledig[0]`); break;
    case "verheiratet":
      check(`${fsBase}.verheiratet[0]`);
      text(`${fsBase}.seit[0]`, formatDateDE(d.familienstandSeit));
      break;
    case "lebenspartnerschaft":
      check(`${fsBase}.Partner[0]`);
      text(`${fsBase}.seit[0]`, formatDateDE(d.familienstandSeit));
      break;
    case "geschieden": check(`${fsBase}.geschieden[0]`); break;
    case "aufgehoben": check(`${fsBase}.aufgehoben[0]`); break;
    case "getrennt": check(`${fsBase}.getrennt[0]`); break;
    case "verwitwet": check(`${fsBase}.verwitwet[0]`); break;
  }

  // === §2 Partner ===
  if (d.hasPartner) {
    const [p1, p2, p3, p4] = splitSteuerId(d.steuerId2);
    text(`${P_S2}.Steuer-ID-2[1].Steuer-ID-2\\.1[0]`, p1);
    text(`${P_S2}.Steuer-ID-2[1].Steuer-ID-2\\.2[0]`, p2);
    text(`${P_S2}.Steuer-ID-2[1].Steuer-ID-2\\.3[0]`, p3);
    text(`${P_S2}.Steuer-ID-2[1].Steuer-ID-2\\.4[0]`, p4);

    text(`${P_S2}.#area[15].Name-Partner[0]`, d.pFamilienname);
    text(`${P_S2}.#area[15].Vorname-Partner[0]`, d.pVorname);
    text(`${P_S2}.#area[15].Titel-Partner[0]`, d.pTitel);
    text(`${P_S2}.#area[15].Geburtsdatum-Partner[0]`, formatDateDE(d.pGeburtsdatum));
    text(`${P_S2}.#area[15].Staatsangehörigkeit-Partner[0]`, d.pStaatsangehoerigkeit);
    text(`${P_S2}.#area[15].Geschlecht-Partner[0]`, geschlechtShort(d.pGeschlecht));
    text(`${P_S2}.#area[15].Geburtsname-Partner[0]`, d.pGeburtsname);
    text(`${P_S2}.#area[15].Anschrift-Partner[0]`, d.pAnschrift);
  }

  // === §3 Zahlungsweg ===
  text(`${P_S3}.IBAN[0]`, d.iban.replace(/\s/g, ""));
  text(`${P_S3}.BIC[0]`, d.bic);
  text(`${P_S3}.Bank[0]`, d.bank);
  if (d.kontoinhaber === "self") check(`${P_S3}.Antragsteller[0]`);
  else {
    check(`${P_S3}.andere-Person[0]`);
    text(`${P_S3}.Name-Kontoinhaber[0]`, d.khName);
  }

  // === §4 Bescheid abweichend ===
  if (d.hasOther) {
    text(`${P_S4}.Name-abweichende-Person[0]`, d.bName);
    text(`${P_S4}.Vorname-abweichende-Person[0]`, d.bVorname);
    text(`${P_S4}.Anschrift-abweichende-Person[0]`, d.bAnschrift);
  }

  // === §5 Kinder (5 redova × 4 ćelije) ===
  d.kinder.slice(0, 5).forEach((k, i) => {
    const row = `${P_S5}.Zeile${i + 1}[0]`;
    text(`${row}.Zelle1[0]`, k.vorname);
    text(`${row}.Zelle2[0]`, formatDateDE(k.geburtsdatum));
    text(`${row}.Zelle3[0]`, geschlechtShort(k.geschlecht));
    text(`${row}.Zelle4[0]`, k.familienkasse);
  });

  // === §6 Datum potpisa ===
  const datumStr = d.ort && d.datum ? `${d.ort}, ${formatDateDE(d.datum)}` : formatDateDE(d.datum);
  text(`${P_SIG}.Unterschrift-1[0].Datum-1[0]`, datumStr);
  if (d.hasPartner) text(`${P_SIG}.Unterschrift-2[0].Datum-2[0]`, datumStr);

  return out;
}
