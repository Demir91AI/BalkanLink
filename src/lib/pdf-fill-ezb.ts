/**
 * EzB 047549 — Erklärung zum Beschäftigungsverhältnis (Bundesagentur für Arbeit).
 *
 * SAVEZNI obrazac — koristi se za sve radne vize (§18, §18a, §18b, §18c, §18g Blue Card)
 * NEZAVISNO od države porijekla (BA/SR/ME/MK/AL/XK) i nezavisno od Ausländerbehörde.
 * Jedan PDF pokriva sve. Popunjava ga POSLODAVAC u Njemačkoj, ali korisnik može
 * pripremiti pred-popunjenu verziju i odnijeti mu na potpis.
 *
 * Princip identičan Kindergeld/Elterngeld auto-fillu — koristimo pdf-form-engine.
 * 69 AcroForm polja, NO XFA, pouzdano popunjivo u browseru.
 */
import { fillPdfForm, downloadBlob, type FieldFill, type PdfFormConfig } from "@/lib/pdf-form-engine";
import { loadVisaProfile, type VisaSharedProfile } from "@/lib/visa-shared-profile";

export { downloadBlob };

/** Data dolazi iz VisaWorkForm2 (puni EzB ekstras) ili VisaBluecardForm (subset). */
export interface EzbBuilderData {
  profile: VisaSharedProfile;
  extras: Record<string, string>;
  /** "work" | "bluecard" — kontroliše koja se akademska checkbox grupa čeka. */
  variant: "work" | "bluecard";
}

const formatDateDE = (iso: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

const mapGeschlecht = (g: string): "maennlich" | "weiblich" | "divers" | "" => {
  const k = (g || "").trim().toLowerCase();
  if (["m", "m.", "männlich", "maennlich", "mann", "muški", "muski"].includes(k)) return "maennlich";
  if (["w", "f", "weiblich", "frau", "ženski", "zenski"].includes(k)) return "weiblich";
  if (["d", "divers"].includes(k)) return "divers";
  return "";
};

const todayDE = () => formatDateDE(new Date().toISOString().slice(0, 10));

export function buildEzbFills(d: EzbBuilderData): FieldFill[] {
  const out: FieldFill[] = [];
  const p = d.profile;
  const e = d.extras;
  const text = (name: string, value: string | undefined) => {
    if (value && value.trim()) out.push({ name, type: "text", value });
  };
  const radio = (name: string, value: string) => out.push({ name, type: "radio", value });
  const check = (name: string) => out.push({ name, type: "check" });

  // ── A. Anlass ─────────────────────────────────────────────────────────
  radio("rbtn_1_Erklaerung", "zur Erteilung eines Aufenthaltstitels zum Zweck der Beschaeftigung");
  radio("rbtn_2_Anlass", "Ersterteilung");

  // ── B. Arbeitnehmer/in (iz visa profila) ─────────────────────────────
  text("txtf_3_Vorname", p.vornamen);
  text("txtf_4_Nachname", p.familienname);
  text("txtf_5_Geburtsdatum", formatDateDE(p.geburtsdatum));
  const g = mapGeschlecht(p.geschlecht);
  if (g) radio("rbtn_6_Geschlecht", g);
  text("txtf_7_Staatsangehoerigkeit", p.staatsangehoerigkeit);
  // Wohnsitz — sastavi iz strasse + plz + ort (može biti DE adresa ili adresa porijekla)
  const wohnsitz = [p.strasse, [p.plz, p.ort].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  text("txtf_8_Wohnsitz", wohnsitz);

  // ── C. Arbeitgeber ───────────────────────────────────────────────────
  // Work form koristi agName/agAdresse, Bluecard koristi arbeitgeber/arbeitgeberAdresse
  const firma = e.agName || e.arbeitgeber || "";
  const adresse = e.agAdresse || e.arbeitgeberAdresse || "";
  text("txtf_10_Firma", firma);
  // Adresa ide cijela u "Strasse" jer rijetko imamo razdvojeno PLZ/Ort
  text("txtf_11_Strasse", adresse);
  text("txtf_15_Kontaktperson", e.agAnsprechpartner);
  text("txtf_16_Telefon", e.agTelefon);
  text("txtf_17_E-Mail", e.agEmail);

  // ── D. Beschäftigungsverhältnis ──────────────────────────────────────
  // 21 — opisno polje (ostavi praznim, poslodavac može upisati specifičnosti)
  // 22 — befristet / unbefristet
  const befr = (e.befristet || "").trim().toLowerCase();
  if (befr === "ja" || e.vertragsende) {
    radio("rbtn_22_Beschaeftigungsverhaeltniss", "befristet");
    text("txtf_22_Beschaeftigungsverhaeltniss", formatDateDE(e.vertragsende || ""));
  } else if (befr === "nein") {
    radio("rbtn_22_Beschaeftigungsverhaeltniss", "unbefristet");
  }

  // ── E. Arbeitsort + Tätigkeit ────────────────────────────────────────
  if (e.arbeitsort && e.arbeitsort.trim()) {
    radio("rbtn_24_Arbeitsort", "Der Arbeitsort befindet sich unter folgender Adresse");
    text("txtf_24_Arbeitsort_Adresse", e.arbeitsort);
  } else {
    radio("rbtn_24_Arbeitsort", "Arbeitsort entspricht dem Arbeitgeber-Sitz");
  }
  text("txtf_25_Berufsbezeichnung", e.taetigkeit);

  // ── F. Qualifikation ─────────────────────────────────────────────────
  if (d.variant === "bluecard" || e.hochschulabschluss) {
    // Akademik — Hochschulabschluss zu E. 1v4
    check("chbx_zuE_1v4");
    text("txtf_26_Studiengang", e.studienfach);
    text("txtf_27_Hochschulabschluss",
      [e.hochschulabschluss, e.hochschuleName].filter(Boolean).join(" — "));
    // Strana diploma (BA/SR/ME/MK/AL/XK)
    radio("rbtn_28_Abschluss_Ausland", "ja - bitte Nachweis vorlegen");
    text("txtf_29_Anerkennungsnachweis",
      [e.anabinId, e.anerkennungArt, e.zabBescheinigung].filter(Boolean).join(" / "));
  }

  // ── G. Arbeitszeit ───────────────────────────────────────────────────
  const ws = parseFloat((e.wochenstunden || "").replace(",", "."));
  if (!isNaN(ws) && ws > 0) {
    if (ws >= 30) radio("rbtn_37_Arbeitszeit", "Vollzeit");
    else if (ws < 15) radio("rbtn_37_Arbeitszeit", "Geringfuegige Beschaeftigung");
    else radio("rbtn_37_Arbeitszeit", "Teilzeit");
    text("txtf_37_Arbeitsstunden_Woche", e.wochenstunden);
  }
  // Default — bez prekovremenih
  radio("rbtn_38_Ueberstunden", "nein - weiter mit Abschnitt I.");

  text("txtf_41_Urlaubsanpruch", e.urlaubstage);

  // ── H. Tarif ─────────────────────────────────────────────────────────
  const tv = (e.tarifvertrag || "").trim();
  if (tv && !["kein", "nein", "-", "none"].includes(tv.toLowerCase())) {
    radio("rbtn_42_Arbeitgeber_tarifgebunden", "ja");
    radio("rbtn_43_tarifliche_Arbeitsbedingungen", "ja");
    text("txtf_44_Tarifvertrag", tv);
  } else if (tv) {
    radio("rbtn_42_Arbeitgeber_tarifgebunden", "nein - weiter mit 46");
  }

  // ── I. Entgelt ───────────────────────────────────────────────────────
  text("txtf_46_Entgelt_pro_Stunde", e.bruttoStunde);
  const monthly = e.bruttoMonat || e.monatsgehalt || "";
  if (monthly) {
    check("chbx_46_Arbeitsentgelt");
    text("txtf_46_Entgelt_pro_Monat", monthly);
  }

  // ── K. Sozialversicherung — default ja ───────────────────────────────
  radio("rbtn_52_besteht_Versicherungspflicht", "ja - weiter mit 54");

  // ── M. Ort, Datum ────────────────────────────────────────────────────
  // ortDatum field može biti "Berlin, 16.05.2026" — pokušaj razdvojiti
  const od = (e.ortDatum || "").split(",").map(s => s.trim());
  if (od.length >= 2) {
    text("txtf_57_Ort", od[0]);
    text("txtf_58_Datum", od[1]);
  } else {
    text("txtf_57_Ort", e.arbeitsort || p.ort || "");
    text("txtf_58_Datum", todayDE());
  }

  return out;
}

export const EZB_PDF_CONFIG: PdfFormConfig<EzbBuilderData> = {
  url: "/muster/ezb-ba047549.pdf",
  builder: buildEzbFills,
  label: "EzB BA047549 (Erklärung zum Beschäftigungsverhältnis)",
  // PDF koristi standardni Helvetica font koji ne podržava ć/š/ž → ostavi appearance kako je
  updateFieldAppearances: false,
};

export async function fillEzbPdf(
  extras: Record<string, string>,
  variant: "work" | "bluecard",
): Promise<Blob> {
  const profile = loadVisaProfile();
  return fillPdfForm(EZB_PDF_CONFIG, { profile, extras, variant }, "EzB");
}
