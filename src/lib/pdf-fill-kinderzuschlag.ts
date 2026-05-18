/**
 * Kinderzuschlag (KiZ 1) — popunjava originalni Familienkasse PDF.
 *
 * Princip identičan kao kod Kindergeld (KG1):
 *  - radi se lokalno u browseru (Zero-Knowledge — ništa ne ide na server),
 *  - PDF ostaje editabilan (nikad ne flatten-amo),
 *  - `updateFieldAppearances: false` zbog ne-ASCII slova (č/š/ž/ć/đ).
 *
 * Originalni PDF pripremljen kroz `qpdf --decrypt` jer pdf-lib ne podržava
 * AES enkripciju koju Familienkasse koristi na originalu.
 */
import { fillPdfForm, type PdfFormConfig, type FieldFill, downloadBlob } from "@/lib/pdf-form-engine";

export { downloadBlob };

const PDF_URL = "/muster/kiz1-antrag-2026.pdf";

const P1 = "Formular1[0].Seite-1[0]";
const P2 = "Formular1[0].Seite-2[0]";

const Q1 = `${P1}.Frage-1[0]`;
const Q2 = `${P1}.Frage-2[0]`;
const Q3 = `${P1}.Frage-3[0]`;
const Q4 = `${P1}.Frage-4[0].Kindertabelle-P-4[0]`;
const HDR = `${P1}.Kopfzeile[0].#area[2]`;
const SIG_AREA = `${P2}.#area[3]`;

export interface KiZKind {
  vorname: string;
  nachname: string;
  geburtsdatum: string;
}

export interface KinderzuschlagFormData {
  familienname: string;
  vorname: string;
  titel: string;
  geburtsname: string;
  geburtsdatum: string;
  geschlecht: string; // "männlich" | "weiblich" | "divers"
  staatsangehoerigkeit: string;
  anschrift: string;
  telefon: string;
  familienstand: "" | "ledig" | "verheiratet" | "geschieden" | "getrennt-lebend" | "verwitwet";
  familienstandSeit: string;
  // Partner
  pName: string;
  pStaatsangehoerigkeit: string;
  pGeburtsdatum: string;
  // Bank
  iban: string;
  bic: string;
  kontoinhaber: string;
  // Children (max 6 u tabeli P-4: Vorname Nachname + Geburtsdatum)
  kinder: KiZKind[];
  // Potpis
  ort: string;
  datum: string;
}

const txt = (name: string, value: string): FieldFill => ({ name, type: "text", value });
const chk = (name: string): FieldFill => ({ name, type: "check" });

export function buildKinderzuschlagFieldFills(d: KinderzuschlagFormData): FieldFill[] {
  const fills: FieldFill[] = [];
  const fullName = [d.vorname, d.familienname].filter(Boolean).join(" ").trim();

  // Header (na vrhu obje strane)
  if (fullName) fills.push(txt(`${HDR}.Name_Vorname_KGB[0]`, fullName));

  // §1 Antragsteller
  if (d.familienname || d.vorname) fills.push(txt(`${Q1}.Name-KGB[0]`, fullName));
  if (d.geburtsdatum) fills.push(txt(`${Q1}.Geburtsdatum-KGB[0]`, formatDate(d.geburtsdatum)));
  if (d.geburtsname) fills.push(txt(`${Q1}.abweichenderGeburtsname[0]`, d.geburtsname));
  if (d.titel) fills.push(txt(`${Q1}.Titel-KGB[0]`, d.titel));
  if (d.anschrift) fills.push(txt(`${Q1}.Anschrift[0]`, d.anschrift));
  if (d.geschlecht) fills.push(txt(`${Q1}.Geschlecht[0]`, d.geschlecht));
  if (d.staatsangehoerigkeit) fills.push(txt(`${Q1}.Staatsangeh-KGB[0]`, d.staatsangehoerigkeit));
  if (d.telefon) fills.push(txt(`${Q1}.Telefonnr[0]`, d.telefon));

  // Familienstand (checkboxes)
  const FS_MAP: Record<string, string> = {
    "ledig": `${Q1}.ledig[0]`,
    "verheiratet": `${Q1}.verheiratet[0]`,
    "geschieden": `${Q1}.geschieden[0]`,
    "getrennt-lebend": `${Q1}.getrennt-lebend[0]`,
    "verwitwet": `${Q1}.verwitwet[0]`,
  };
  if (FS_MAP[d.familienstand]) fills.push(chk(FS_MAP[d.familienstand]));
  if (d.familienstandSeit) fills.push(txt(`${Q1}.Fam-stand-seit[0]`, formatDate(d.familienstandSeit)));

  // §2 Partner
  if (d.pName) fills.push(txt(`${Q2}.Name-Partner[0]`, d.pName));
  if (d.pStaatsangehoerigkeit) fills.push(txt(`${Q2}.Staatsangeh-Partner[0]`, d.pStaatsangehoerigkeit));
  if (d.pGeburtsdatum) fills.push(txt(`${Q2}.Geburtsdatum-Partner[0]`, formatDate(d.pGeburtsdatum)));

  // §3 Zahlungsweg
  if (d.iban) fills.push(txt(`${Q3}.IBAN[0]`, d.iban.replace(/\s+/g, "")));
  if (d.bic) fills.push(txt(`${Q3}.BIC[0]`, d.bic));
  if (d.kontoinhaber) fills.push(txt(`${Q3}.Kontoinhaber[0]`, d.kontoinhaber));

  // §4 Kinder (do 6 — Zelle1=Name, Zelle2=Geburtsdatum)
  const kinder = (d.kinder || []).slice(0, 6);
  kinder.forEach((k, i) => {
    const row = `${Q4}.Zeile${i + 1}[0]`;
    const name = [k.vorname, k.nachname].filter(Boolean).join(" ").trim();
    if (name) fills.push(txt(`${row}.Zelle1[0]`, name));
    if (k.geburtsdatum) fills.push(txt(`${row}.Zelle2[0]`, formatDate(k.geburtsdatum)));
  });

  // Potpis (Datum)
  if (d.datum) {
    const dateStr = d.ort ? `${d.ort}, ${formatDate(d.datum)}` : formatDate(d.datum);
    fills.push(txt(`${SIG_AREA}.Datum\\.Antrag\\.0[0]`, dateStr));
  }

  return fills;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${m[3]}.${m[2]}.${m[1]}`;
}

const KIZ_CONFIG: PdfFormConfig<KinderzuschlagFormData> = {
  url: PDF_URL,
  label: "Kinderzuschlag KiZ1 (Familienkasse)",
  builder: buildKinderzuschlagFieldFills,
  updateFieldAppearances: false,
};

export async function fillKinderzuschlagPdf(data: KinderzuschlagFormData): Promise<Blob> {
  return fillPdfForm(KIZ_CONFIG, data, "KinderzuschlagPDF");
}
