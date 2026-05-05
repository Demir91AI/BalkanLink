/**
 * Niedersachsen Elterngeld — Field mapping (Stand 04/2025).
 *
 * PDF: "Antrag auf Elterngeld - gültig für Geburten ab dem 01.04.2025"
 * Source: https://www.ms.niedersachsen.de/download/205792/...pdf
 *
 * Konvencija PDF-a (kao Hamburg):
 *   - "AS"  = Antragsteller(in)        (= naš e1)
 *   - "2E"  = zweiter Elternteil       (= naš e2)
 *
 * Datumska polja: PDF ima jedinstveno polje "... Jahr" koje prima cijeli datum
 * kao slobodan tekst (DD.MM.YYYY).
 *
 * Familienstand u Niedersachsen ima 22 podopcija (Familienstand 1..22).
 * Konzervativno mapiranje:
 *   1 = ledig, 2 = verheiratet, 3 = unverheiratet zusammenlebend, 4 = allein.
 *
 * Staatsangehörigkeit (4 opcije):
 *   1 = Deutsch, 2 = EU/EWR/CH, 3 = Drittstaat, 4 = anderes
 *   (BHS state nije EU → tipično 3.)
 */

import type { ElterngeldFormData, FieldFill } from "@/lib/elterngeld-bayern-fields";

const formatDateDE = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

const familienstandToNds = (
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

export function buildNiedersachsenFieldFills(d: ElterngeldFormData): FieldFill[] {
  const out: FieldFill[] = [];
  const text = (name: string, value: string) => out.push({ name, type: "text", value });
  const check = (name: string) => out.push({ name, type: "check" });

  // ===== Sekcija 1 — Kind =====
  const [kindNach, ...kindVor] = (d.kind_nachname_vorname || "").split(",").map(s => s.trim());
  text("1a Nachname", kindNach || "");
  text("1a Vorname(n)", kindVor.join(", "));
  text("1a Anzahl der Kinder", "1");
  text("1b Geburtsdatum Jahr", formatDateDE(d.kind_geburtsdatum_ort.split(",")[0]?.trim() || ""));
  text("1b Errechneter Geburtstermin Jahr", formatDateDE(d.kind_voraussichtl_entbindung));

  // ===== Sekcija 2b — Antragsteller(in) (AS) =====
  text("2b Nachname AS", d.e1_nachname);
  text("2b Vorname(n) AS", d.e1_vorname);
  text("2b Geburtsdatum AS Jahr", formatDateDE(d.e1_geburtsdatum));
  check(`2b Familienstand ${familienstandToNds(d.e1_familienstand)}`);

  // ===== Sekcija 2b — Zweiter Elternteil (2E) =====
  if (d.e2_aktiv) {
    text("2b Nachname 2E", d.e2_nachname);
    text("2b Vorname(n) 2E", d.e2_vorname);
    text("2b Geburtsdatum 2E Jahr", formatDateDE(d.e2_geburtsdatum));
  }

  // ===== Sekcija 2c — Adresa AS =====
  text("2c AS Str_1", d.e1_strasse);
  const plzOrtMatch = (d.e1_plz_ort || "").match(/^(\d{5})\s+(.+)$/);
  if (plzOrtMatch) {
    text("2c AS PLZ", plzOrtMatch[1]);
    text("2c AS Ort_2", plzOrtMatch[2]);
  } else {
    text("2c AS Ort_2", d.e1_plz_ort);
  }

  // Adresa 2E
  if (d.e2_aktiv) {
    if (d.e1_plz_ort === d.e2_plz_ort && d.e1_strasse === d.e2_strasse) {
      check("2c Adr E2 wie AS");
    } else {
      text("2c 2E Str_1", d.e2_strasse);
      const plz2 = (d.e2_plz_ort || "").match(/^(\d{5})\s+(.+)$/);
      if (plz2) {
        text("2c 2E PLZ 1", plz2[1]);
        text("2c 2E Ort_2", plz2[2]);
      } else {
        text("2c 2E Ort_2", d.e2_plz_ort);
      }
    }
  }

  // Adresa djeteta (ako je ista kao AS)
  text("2c Adr Kind Str", d.e1_strasse);
  if (plzOrtMatch) {
    text("2c Adr Kind PLZ", plzOrtMatch[1]);
    text("2c Adr Kind Ort", plzOrtMatch[2]);
  }

  // ===== Sekcija 2d — Steuer-ID =====
  text("2d AS Steuer-ID", d.e1_steuer_id);
  if (d.e2_aktiv) text("2d 2E Steuer-ID", d.e2_steuer_id);

  // ===== Sekcija 13a — Bankverbindung =====
  text("13a IBAN AS", d.iban);
  text("13a BIC AS", d.bic);
  text("13a Bankname AS", d.geldinstitut);
  const ktoParts = (d.kontoinhaber || "").trim().split(/\s+/);
  if (ktoParts.length >= 2) {
    text("13a KtoInhaber Vorname AS", ktoParts.slice(0, -1).join(" "));
    text("13a KtoInhaber Nachname AS", ktoParts[ktoParts.length - 1]);
  } else if (ktoParts.length === 1) {
    text("13a KtoInhaber Nachname AS", ktoParts[0]);
  }

  // ===== Sekcija 13b — Kontakt =====
  text("13b Telefon AS", d.e1_telefon);
  text("13b E-Mail AS", d.e1_email);
  if (d.e2_aktiv) {
    text("13b Telefon 2E", d.e2_telefon);
    text("13b E-Mail 2E", d.e2_email);
  }

  // ===== Sekcija 13c — Potpis =====
  text("13c Ort AS", d.ort);
  text("13c Datum AS", formatDateDE(d.datum));
  if (d.e2_aktiv) {
    text("13c Ort 2E", d.ort);
    text("13c Datum 2E", formatDateDE(d.datum));
  }

  return out.filter(f => f.type !== "text" || (f.value && f.value.trim()));
}
