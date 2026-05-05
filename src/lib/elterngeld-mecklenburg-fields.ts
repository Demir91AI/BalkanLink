/**
 * Mecklenburg-Vorpommern Elterngeld — Field mapping (Stand 06/2025).
 *
 * PDF: "Antrag auf Elterngeld nach BEEG" (LAGuS MV).
 * Source: https://www.lagus.mv-regierung.de/serviceassistent/download?id=1682724
 *
 * Konvencija PDF-a (drugačija od ostalih pokrajina):
 *   - "Elternteil1" = naš e1 (majka/podnositelj 1)
 *   - "Elternteil2" = naš e2 (otac/drugi roditelj)
 *   - "Kind_*"      = polja djeteta
 *
 * Popunjavamo NAJVAŽNIJA polja. Ostala 600+ polja u PDF-u ostaju
 * editabilna — korisnik dopuni Einkommen, Anlagen u Acrobat Readeru.
 *
 * Koristi isti ElterngeldFormData interface kao Bayern.
 */

import type { ElterngeldFormData, FieldFill } from "@/lib/elterngeld-bayern-fields";

const formatDateDE = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

/** Razdvaja "Mustermann, Max" → { nachname, vorname } */
function splitKindName(s: string): { nachname: string; vorname: string } {
  if (!s) return { nachname: "", vorname: "" };
  const parts = s.split(",").map(p => p.trim());
  return { nachname: parts[0] ?? "", vorname: parts[1] ?? "" };
}

/** "01.01.2026, München" → "München" */
function extractGeburtsort(s: string): string {
  if (!s) return "";
  const parts = s.split(",").map(p => p.trim());
  return parts[1] ?? "";
}

export function buildMecklenburgFieldFills(d: ElterngeldFormData): FieldFill[] {
  const fills: FieldFill[] = [];
  const T = (name: string, value: string) =>
    fills.push({ type: "text", name, value: value ?? "" });

  // Kind
  const kind = splitKindName(d.kind_nachname_vorname);
  T("Kind_Nachname", kind.nachname);
  T("Kind_Vornamen", kind.vorname);
  T("Kind_Geburtsort", extractGeburtsort(d.kind_geburtsdatum_ort));

  // Elternteil 1
  T("Elternteil1_Nachname Titel", d.e1_nachname);
  T("Elternteil1_Geburtsname", d.e1_geburtsname);
  T("Elternteil1_Vornamen", d.e1_vorname);
  T("Elternteil1_Geburtsdatum", formatDateDE(d.e1_geburtsdatum));
  T("Elternteil1_Straße HausNr", d.e1_strasse);
  T("Elternteil1_PLZ  Wohnort", d.e1_plz_ort);
  T("Elternteil1_Steueridentifikationsnummer", d.e1_steuer_id);
  T("Elternteil1_EMail", d.e1_email);
  T("Elternteil1_TelefonNr", d.e1_telefon);
  T("Elternteil1_IBAN", d.iban);
  T("Elternteil1_Geldinstitut", d.bank_name);
  T("Elternteil1_Kontoinhaber", d.kontoinhaber);
  if (d.e1_staat !== "deutsch") {
    T("Elternteil1_andere Staatsangehörigkeiten", d.e1_staat_land);
  }

  // Elternteil 2
  if (d.e2_aktiv) {
    T("Elternteil2_Nachname Titel", d.e2_nachname);
    T("Elternteil2_Vornamen", d.e2_vorname);
    T("Elternteil2_Geburtsdatum", formatDateDE(d.e2_geburtsdatum));
    T("Elternteil2_Straße HausNr", d.e2_strasse);
    T("Elternteil2_PLZ  Wohnort", d.e2_plz_ort);
    T("Elternteil2_Steueridentifikationsnummer", d.e2_steuer_id);
    T("Elternteil2_EMail", d.e2_email);
    T("Elternteil2_TelefonNr", d.e2_telefon);
    if (d.e2_staat !== "deutsch") {
      T("Elternteil2_andere Staatsangehörigkeiten", d.e2_staat_land);
    }
  }

  return fills;
}
