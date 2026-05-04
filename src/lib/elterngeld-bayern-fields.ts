/**
 * Mapping iz BHS wizard podataka na originalna AcroForm field imena
 * iz ZBFS Bayern Elterngeld antrag (05/2025).
 *
 * Popunjavamo samo NAJVAŽNIJA polja (Kind, Eltern, Adresa, Staat, IBAN,
 * varijante elterngelda, potpis). Ostala 950+ polja u PDF-u ostaju editabilna
 * pa korisnik može sam dopuniti specifične dijelove u Acrobat Reader-u.
 */

export type Geschlecht = "w" | "m" | "d" | "o";
export type Variante = "basis" | "egplus" | "kombi";

export interface ElterngeldFormData {
  // Sekcija 1 — Kind
  kind_nachname_vorname: string;       // "Mustermann, Max"
  kind_geburtsdatum_ort: string;       // "01.01.2026, München"
  kind_voraussichtl_entbindung: string; // tt.mm.jjjj  (ako nije rođeno)

  // Sekcija 2 — Elternteil 1 (najčešće majka)
  e1_nachname: string;
  e1_vorname: string;
  e1_geburtsname: string;
  e1_geburtsdatum: string;             // tt.mm.jjjj
  e1_geschlecht: Geschlecht;
  e1_strasse: string;
  e1_plz_ort: string;
  e1_steuer_id: string;
  e1_beruf: string;
  e1_telefon: string;
  e1_email: string;
  e1_familienstand: "verheiratet" | "ledig" | "unverheiratet" | "allein";
  e1_familienstand_seit: string;       // ako verheiratet
  e1_kinder_haushalt: string;          // broj
  e1_staat: "deutsch" | "eu" | "andere";
  e1_staat_land: string;

  // Sekcija 2 — Elternteil 2 (otac / drugi roditelj)
  e2_aktiv: boolean;                   // false ako Alleinerziehend
  e2_nachname: string;
  e2_vorname: string;
  e2_geburtsdatum: string;
  e2_geschlecht: Geschlecht;
  e2_strasse: string;
  e2_plz_ort: string;
  e2_steuer_id: string;
  e2_telefon: string;
  e2_email: string;
  e2_staat: "deutsch" | "eu" | "andere";
  e2_staat_land: string;

  // Sekcija 5 — Varijanta
  e1_variante: Variante;
  e1_lm_von: string;
  e1_lm_bis: string;
  e2_variante: Variante | "none";
  e2_lm_von: string;
  e2_lm_bis: string;

  // Sekcija 15 — Bankovni podaci
  iban: string;
  bic: string;
  kontoinhaber: string;
  geldinstitut: string;

  // Potpis
  ort: string;
  datum: string;

  // Versand — koja ZBFS Außenstelle prima antrag (ovisi o Wohnort + datumu rođenja)
  versand_aussenstelle_id: string;
}

export const initialData = (): ElterngeldFormData => ({
  kind_nachname_vorname: "",
  kind_geburtsdatum_ort: "",
  kind_voraussichtl_entbindung: "",
  e1_nachname: "", e1_vorname: "", e1_geburtsname: "", e1_geburtsdatum: "",
  e1_geschlecht: "w", e1_strasse: "", e1_plz_ort: "", e1_steuer_id: "",
  e1_beruf: "", e1_telefon: "", e1_email: "",
  e1_familienstand: "verheiratet", e1_familienstand_seit: "",
  e1_kinder_haushalt: "1",
  e1_staat: "deutsch", e1_staat_land: "",
  e2_aktiv: true,
  e2_nachname: "", e2_vorname: "", e2_geburtsdatum: "",
  e2_geschlecht: "m", e2_strasse: "", e2_plz_ort: "", e2_steuer_id: "",
  e2_telefon: "", e2_email: "",
  e2_staat: "deutsch", e2_staat_land: "",
  e1_variante: "basis", e1_lm_von: "1", e1_lm_bis: "12",
  e2_variante: "basis", e2_lm_von: "1", e2_lm_bis: "2",
  iban: "", bic: "", kontoinhaber: "", geldinstitut: "",
  ort: "", datum: new Date().toISOString().slice(0, 10),
  versand_aussenstelle_id: "",
});

const formatDateDE = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

export interface FieldFill {
  name: string;
  type: "text" | "check" | "uncheck";
  value?: string;
}

/**
 * Pretvara wizard podatke u listu (fieldName, action) za pdf-lib.
 */
export function buildFieldFills(d: ElterngeldFormData): FieldFill[] {
  const out: FieldFill[] = [];
  const text = (name: string, value: string) => out.push({ name, type: "text", value });
  const check = (name: string) => out.push({ name, type: "check" });

  // Sekcija 1
  text("1_Nachname_Vorname", d.kind_nachname_vorname);
  text("1_Geburtsdatum_ort", d.kind_geburtsdatum_ort);
  text("1_Vorraussichtliches_entbindedatum", formatDateDE(d.kind_voraussichtl_entbindung));

  // Sekcija 2 — ET1
  text("2_Nachname_1", d.e1_nachname);
  text("2_Vorname_1", d.e1_vorname);
  text("2_Geburtsname_1", d.e1_geburtsname);
  text("2_Geburtsdatum_1", formatDateDE(d.e1_geburtsdatum));
  check(`2_Geschlecht_1_${d.e1_geschlecht}`);
  text("2_StarßeHausnummer_1", d.e1_strasse);
  text("2_PLZWohnort_1", d.e1_plz_ort);
  text("2 Steuer-Identifkationsnr_1", d.e1_steuer_id);
  text("Zuletzt_ausgeübter_Beruf_1", d.e1_beruf);
  text("2_Telefonnummer 1", d.e1_telefon);
  text("2_E-Mailadresse 1", d.e1_email);
  text("2_Gesamtzahl_Kinder_1", d.e1_kinder_haushalt);

  // ET1 familienstand
  if (d.e1_familienstand === "verheiratet") {
    check("2_verheiratet_1");
    text("2_verheiratet_Datum_1", formatDateDE(d.e1_familienstand_seit));
  } else if (d.e1_familienstand === "ledig") {
    check("2_ledig_1");
  } else if (d.e1_familienstand === "unverheiratet") {
    check("2_unverheiratet_1");
  } else if (d.e1_familienstand === "allein") {
    check("2_allein_1");
  }

  // ET1 staat
  if (d.e1_staat === "deutsch") check("2_Staat_deutsch_1");
  else if (d.e1_staat === "eu") { check("2_Staat_EU_1"); text("2_Staat_EU_Bez_1", d.e1_staat_land); }
  else { check("2_Staat_andere_1"); text("2_Staat_andere_Bez_1", d.e1_staat_land); }

  // Sekcija 2 — ET2
  if (d.e2_aktiv) {
    text("2_Nachname_2", d.e2_nachname);
    text("2_Vorname_2", d.e2_vorname);
    text("2_Geburtsdatum_2", formatDateDE(d.e2_geburtsdatum));
    check(`2_Geschlecht_2_${d.e2_geschlecht}`);
    text("2_StraßeHausnummer_2", d.e2_strasse);
    text("2_PLZWohnort_2", d.e2_plz_ort);
    text("2 Steuer-Identifkationsnr_2", d.e2_steuer_id);
    text("2_Telefonnummer 2", d.e2_telefon);
    text("2_E-Mailadresse 2", d.e2_email);

    if (d.e2_staat === "deutsch") check("2_Staat_deutsch_2");
    else if (d.e2_staat === "eu") { check("2_Staat_EU_2"); text("2_Staat_EU_Bez_2", d.e2_staat_land); }
    else { check("2_Staat_andere_2"); text("2_Staat_andere_Bez_2", d.e2_staat_land); }
  }

  // Sekcija 5 — Varijanta ET1
  const fillVariante = (et: "1" | "2", v: Variante, von: string, bis: string) => {
    if (v === "basis" || v === "kombi") {
      // BasisElterngeld 5a
      if (von === "1" && (bis === "12" || bis === "14")) {
        check(`5a_LM_1_bis_12_ET${et}`);
      } else {
        check(`5a_LM_andere_ET${et}`);
        text(`5a_von_LM_ET${et}`, von);
        text(`5a_bis_LM_ET${et}`, bis);
      }
    }
    if (v === "egplus") {
      check(`5b_EG+_ET${et}`);
    } else if (v === "kombi") {
      check(`5b_EG+BEG_ET${et}`);
    }
  };
  fillVariante("1", d.e1_variante, d.e1_lm_von, d.e1_lm_bis);
  if (d.e2_aktiv && d.e2_variante !== "none") {
    fillVariante("2", d.e2_variante, d.e2_lm_von, d.e2_lm_bis);
  }

  // Sekcija 15 — Bank
  text("IBAN ET1", d.iban);
  text("BIC ET1", d.bic);
  text("Kontoinhaber ET1", d.kontoinhaber);
  text("Geldinstitut ET1", d.geldinstitut);

  // Potpis
  text("Datum", `${d.ort}, ${formatDateDE(d.datum)}`);

  return out.filter(f => f.type !== "text" || (f.value && f.value.trim()));
}
