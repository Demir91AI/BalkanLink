/**
 * Bürgergeld Hauptantrag (HA) — mapping iz BalkanLink wizard podataka na
 * originalna AcroForm field imena iz Bundesagentur für Arbeit Hauptantrag
 * Bürgergeld (Stand 04/2026, antrag-sgb2_ba042689.pdf).
 *
 * Federalni obrazac, jedan PDF za cijelu Njemačku. Pokrivamo polja iz HA tab-a
 * wizard-a; Anlage EK / KDU / VM imaju zasebne PDF-ove.
 */
import { RADIO_YES, RADIO_NO, type FieldFill } from "@/lib/pdf-form-engine";

export interface BuergergeldFormData {
  // Person
  familienname: string;
  vorname: string;
  geburtsdatum: string; // ISO yyyy-mm-dd
  geburtsort: string;
  staatsangehoerigkeit: string;
  steuerId: string;     // 11 cifara
  svNummer: string;     // RV-Nr
  // Anschrift
  strasse: string;      // "Musterstr. 12" — splitamo posljednji broj
  plz: string;
  ort: string;
  telefon: string;
  // Bank
  iban: string;
  kontoinhaber: string; // ime nositelja računa
  // Aufenthalt
  aufenthaltstitelArt: string;
  // Erwerbstätigkeit
  erwerbstaetig: "Ja" | "Nein" | "";
  arbeitgeber: string;
  // Bedarfsgemeinschaft
  weiterePersonen: "Ja" | "Nein" | "";
  // Sig
  sigDatum: string;     // ISO yyyy-mm-dd
}

const isoToDe = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

/** Razdvaja "Musterstr. 12a" → ["Musterstr.", "12a"]. */
const splitStrasseHausnr = (input: string): [string, string] => {
  const trimmed = (input ?? "").trim();
  if (!trimmed) return ["", ""];
  const m = trimmed.match(/^(.+?)\s+(\d+\s*[a-zA-Z]?)$/);
  return m ? [m[1].trim(), m[2].trim()] : [trimmed, ""];
};

const yesNo = (v: string): typeof RADIO_YES | typeof RADIO_NO | "" =>
  v === "Ja" ? RADIO_YES : v === "Nein" ? RADIO_NO : "";

export function buildBuergergeldFieldFills(d: BuergergeldFormData): FieldFill[] {
  const out: FieldFill[] = [];
  const text = (name: string, value: string) => {
    if (value && value.trim()) out.push({ name, type: "text", value });
  };
  const radio = (name: string, value: string) => {
    if (value) out.push({ name, type: "radio", value });
  };

  // ===== Sekcija: Persönliche Daten =====
  text("txtfPersonVorname", d.vorname);
  text("txtfPersonNachname", d.familienname);
  text("datePersonGebDatum", isoToDe(d.geburtsdatum));
  text("txtfPersonGebOrt", d.geburtsort);
  text("txtfPersonStaat", d.staatsangehoerigkeit);

  // Steuer-ID i SV-Nr
  text("numfStIDNr", (d.steuerId ?? "").replace(/\D/g, ""));
  if (d.svNummer && d.svNummer.trim()) {
    out.push({ name: "chbxRVNrVorhanden", type: "check" });
    text("txtfRVNr", d.svNummer);
  }

  // ===== Anschrift =====
  const [strasse, hausnr] = splitStrasseHausnr(d.strasse);
  text("txtfPersonStr", strasse);
  text("txtfPersonHausNr", hausnr);
  text("txtfPersonPlz", d.plz);
  text("txtfPersonOrt", d.ort);
  text("txtfPersonTel", d.telefon);

  // ===== Aufenthalt (Nicht-EU) =====
  if (d.aufenthaltstitelArt && d.aufenthaltstitelArt.trim()) {
    radio("rbtnAufenthalt", RADIO_YES);
  }

  // ===== Bank =====
  text("txtfKonto", d.kontoinhaber);
  text("txtfKontoIBAN", (d.iban ?? "").replace(/\s+/g, ""));

  // ===== Erwerbstätigkeit =====
  const eq = yesNo(d.erwerbstaetig);
  if (eq) radio("rbtnAngestellt", eq);
  text("txtfAGName", d.arbeitgeber);

  // ===== Bedarfsgemeinschaft (samo signal — popunjava se Anlage WEP zasebno) =====
  // Wohnsitz "Ja" znači "ima stalno boravište u Njemačkoj" — defaultno yes.
  radio("rbtnWohnsitz", RADIO_YES);

  // ===== Unterschrift =====
  text("dateUnterschriftPerson", isoToDe(d.sigDatum));

  return out;
}
