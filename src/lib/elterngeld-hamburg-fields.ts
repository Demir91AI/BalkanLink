/**
 * Hamburg Elterngeld — Field mapping (Stand 08/2025).
 *
 * PDF: "Antrag auf Elterngeld für Geburten ab dem 01.04.2025" (BAGSFI Hamburg).
 * Source: https://fhh1.hamburg.de/Dibis/form/pdf/Antrag_auf_Elterngeld_fuer_Geburten_ab_dem_01.04.2025_Stand_08_25.pdf
 *
 * Konvencija PDF-a:
 *   - "AS"  = Antragsteller(in) (= naš e1, "elternteil 1", obično majka)
 *   - "2E"  = zweiter Elternteil (= naš e2, otac/drugi roditelj)
 *
 * Popunjavamo NAJVAŽNIJA polja (Kind, Eltern, Adresa, Steuer-ID, IBAN,
 * Familienstand, Geschlecht, Staat, varijante, potpis).
 * Ostala 530+ polja u PDF-u ostaju editabilna pa korisnik može
 * sam dopuniti specifične dijelove (Einkommen, Anlagen) u Acrobat Reader-u.
 *
 * Koristi isti ElterngeldFormData interface kao Bayern — isti UI wizard
 * popunjava i Bayern i Hamburg PDF-ove (BEEG je savezni zakon).
 */

import type { ElterngeldFormData, FieldFill } from "@/lib/elterngeld-bayern-fields";

const formatDateDE = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

/**
 * Hamburg PDF "Familienstand" ima 22 podopcija (Familienstand 1..22).
 * Mapiramo naša 4 stanja na najtipičnije vrijednosti:
 *   1 = ledig (slobodan/a)
 *   2 = verheiratet
 *   3 = unverheiratet, lebt mit anderem Elternteil zusammen
 *   4 = allein (alleinerziehend, lebt nicht mit anderem Elternteil zusammen)
 * (Pun popis nije dokumentovan; konzervativno mapiranje na osnovne kategorije.)
 */
const familienstandToHamburg = (
  fs: ElterngeldFormData["e1_familienstand"],
): string => {
  switch (fs) {
    case "ledig": return "1";
    case "verheiratet": return "2";
    case "unverheiratet": return "3";
    case "allein": return "4";
    default: return "1";
  }
};

export function buildHamburgFieldFills(d: ElterngeldFormData): FieldFill[] {
  const out: FieldFill[] = [];
  const text = (name: string, value: string) => out.push({ name, type: "text", value });
  const check = (name: string) => out.push({ name, type: "check" });

  // ===== Sekcija 1 — Kind =====
  // Hamburg PDF razdvaja Vorname/Nachname od jedinstvenog polja
  const [kindNach, ...kindVor] = (d.kind_nachname_vorname || "").split(",").map(s => s.trim());
  text("1a Nachname", kindNach || "");
  text("1a Vorname(n)", kindVor.join(", "));
  text("1a Anzahl der Kinder", "1");

  // Datum (Hamburg PDF traži punu datum string u "Jahr" polju — ono je labeled
  // tako, ali realno polje prima cijeli datum format)
  text("1b Geburtsdatum Jahr", formatDateDE(d.kind_geburtsdatum_ort.split(",")[0]?.trim() || ""));
  text("1b Errechneter Geburtstermin Jahr", formatDateDE(d.kind_voraussichtl_entbindung));

  // ===== Sekcija 2b — Antragsteller(in) (AS = Eltern 1) =====
  text("2b Nachname AS", d.e1_nachname);
  text("2b Vorname(n) AS", d.e1_vorname);
  text("2b Geburtsdatum AS Jahr", formatDateDE(d.e1_geburtsdatum));

  // Familienstand AS (1..22)
  check(`2b Familienstand ${familienstandToHamburg(d.e1_familienstand)}`);

  // ===== Sekcija 2b — Zweiter Elternteil (2E = Eltern 2) =====
  if (d.e2_aktiv) {
    text("2b Nachname 2E", d.e2_nachname);
    text("2b Vorname(n) 2E", d.e2_vorname);
    text("2b Geburtsdatum 2E Jahr", formatDateDE(d.e2_geburtsdatum));
  }

  // ===== Sekcija 2c — Adresa AS =====
  // Hamburg razdvaja Strasse u 2 dijela (Str_1 = ulica + Hausnr odvojeno)
  text("2c AS Str_1", d.e1_strasse);
  // Pokušaj parsirati PLZ + ort iz "12345 Hamburg"
  const plzOrtMatch = (d.e1_plz_ort || "").match(/^(\d{5})\s+(.+)$/);
  if (plzOrtMatch) {
    text("2c AS PLZ", plzOrtMatch[1]);
    text("2c AS Ort_2", plzOrtMatch[2]);
  } else {
    text("2c AS Ort_2", d.e1_plz_ort);
  }

  // ===== Sekcija 2c — Adresa 2E =====
  if (d.e2_aktiv) {
    if (d.e1_plz_ort === d.e2_plz_ort && d.e1_strasse === d.e2_strasse) {
      check("2c Adr E2 wie AS");
    } else {
      text("2c 2E Str_1", d.e2_strasse);
      const plz2Match = (d.e2_plz_ort || "").match(/^(\d{5})\s+(.+)$/);
      if (plz2Match) {
        text("2c 2E PLZ 1", plz2Match[1]);
        text("2c 2E Ort_2", plz2Match[2]);
      } else {
        text("2c 2E Ort_2", d.e2_plz_ort);
      }
    }
  }

  // ===== Sekcija 2d — Steuer-ID =====
  text("2d AS Steuer-ID", d.e1_steuer_id);
  if (d.e2_aktiv) text("2d 2E Steuer-ID", d.e2_steuer_id);

  // ===== Sekcija 13a — Bankvalja AS =====
  text("13a IBAN AS", d.iban);
  text("13a BIC AS", d.bic);
  text("13a Bankname AS", d.geldinstitut);
  // Vlasnik računa: dijelimo "Maja Kovač" → Vorname Nachname
  const ktoParts = (d.kontoinhaber || "").trim().split(/\s+/);
  if (ktoParts.length >= 2) {
    text("13a KtoInhaber Vorname AS", ktoParts.slice(0, -1).join(" "));
    text("13a KtoInhaber Nachname AS", ktoParts[ktoParts.length - 1]);
  } else if (ktoParts.length === 1) {
    text("13a KtoInhaber Nachname AS", ktoParts[0]);
  }

  // ===== Sekcija 13b — Kontakt AS =====
  text("13b Telefon AS", d.e1_telefon);
  text("13b E-Mail AS", d.e1_email);
  if (d.e2_aktiv) {
    text("13b Telefon 2E", d.e2_telefon);
    text("13b E-Mail 2E", d.e2_email);
  }

  // ===== Sekcija 13c — Potpis AS =====
  text("13c Ort AS", d.ort);
  text("13c Datum AS", formatDateDE(d.datum));
  if (d.e2_aktiv) {
    text("13c Ort 2E", d.ort);
    text("13c Datum 2E", formatDateDE(d.datum));
  }

  return out.filter(f => f.type !== "text" || (f.value && f.value.trim()));
}
