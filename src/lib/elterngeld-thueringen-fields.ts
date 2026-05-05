/**
 * Mapper za Thüringer Elterngeldantrag (BEEG-071-DE-FL, Stand 2025).
 * PDF iz "Zentraler Thüringer Formularservice" sa potpuno
 * različitom AcroForm konvencijom (txt.*1a/1b/2b/2c/4/5/6).
 *
 * Popunjavamo samo NAJVAŽNIJA polja. Ostala (Einkommen, Anlagen,
 * Krankenkasse, varijante) ostaju editabilna u Acrobat Reader-u.
 */

import type { ElterngeldFormData } from "@/lib/elterngeld-bayern-fields";

const formatDateDE = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

const splitPlzOrt = (s: string): { plz: string; ort: string } => {
  const m = (s || "").trim().match(/^(\d{4,5})\s+(.+)$/);
  return m ? { plz: m[1], ort: m[2] } : { plz: "", ort: s || "" };
};

const splitStrasse = (s: string): { strasse: string; nr: string } => {
  const m = (s || "").trim().match(/^(.+?)\s+(\d+\w*)$/);
  return m ? { strasse: m[1], nr: m[2] } : { strasse: s || "", nr: "" };
};

interface FieldFill {
  name: string;
  type: "text" | "check";
  value?: string;
}

export function buildThueringenFieldFills(d: ElterngeldFormData): FieldFill[] {
  const fills: FieldFill[] = [];
  const T = (name: string, value: string) =>
    value && fills.push({ name, type: "text", value });

  // Sekcija 1 — Kind (jednostruko)
  const [kindNach, kindVor] = (d.kind_nachname_vorname || "").split(",").map(s => s?.trim() || "");
  T("txt.name1A 4", kindNach);
  T("txt.vorname1A 4", kindVor);
  T("txt.geburtsdatum1a 3", d.kind_geburtsdatum_ort.split(",")[0]?.trim() || "");
  T("txt.geburtsdatum_frueh1b 3", formatDateDE(d.kind_voraussichtl_entbindung));

  // Sekcija 2b — Elternteil 1 (antragstellende Person)
  T("txt.name2b", d.e1_nachname);
  T("txt.vorname2b", d.e1_vorname);
  T("txt.geburt2b", formatDateDE(d.e1_geburtsdatum));
  T("txt.steuer2b_1", d.e1_steuer_id);

  // Sekcija 2c — Adresa E1
  const e1Addr = splitStrasse(d.e1_strasse);
  const e1Ort = splitPlzOrt(d.e1_plz_ort);
  T("txt.strasse2c", e1Addr.strasse);
  T("txt.nummer2c", e1Addr.nr);
  T("txt.plz2c", e1Ort.plz);
  T("txt.ort2c", e1Ort.ort);

  // Mail + Ort/Datum E1
  T("txt.mail_1", d.e1_email);
  T("txt.ortdatum_1", `${d.ort}, ${formatDateDE(d.datum)}`);

  // Konto E1
  T("txt.konto_nachname_1", d.kontoinhaber.split(" ").slice(-1)[0] || d.kontoinhaber);
  T("txt.konto_name_1", d.kontoinhaber);
  T("txt.Kontonummer_1", d.iban);

  // Sekcija 2b/2c — Elternteil 2 (suffix " 1" za drugu osobu)
  if (d.e2_aktiv) {
    T("txt.name2b 1", d.e2_nachname);
    T("txt.vorname2b 1", d.e2_vorname);
    T("txt.geburt2b 1", formatDateDE(d.e2_geburtsdatum));
    T("txt.steuer2b_2", d.e2_steuer_id);

    const e2Addr = splitStrasse(d.e2_strasse);
    const e2Ort = splitPlzOrt(d.e2_plz_ort);
    T("txt.strasse2c 1", e2Addr.strasse);
    T("txt.nummer2c 1", e2Addr.nr);
    T("txt.plz2c 1", e2Ort.plz);
    T("txt.ort2c 1", e2Ort.ort);

    T("txt.mail_2", d.e2_email);
  }

  return fills;
}
