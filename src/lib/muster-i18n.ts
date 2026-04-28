/**
 * Bilingual labels for German official forms (Musterformulari).
 *
 * Goal: when the page is in BS/HR/SR, show "Familienname (Prezime)" in a
 * single line so the user keeps the German term (which they will see on
 * the real form) AND understands what to write.
 *
 * The German wording is intentionally the lookup key — Field components
 * pass their existing German label and we translate on the fly.
 * If a label is not in the dictionary, we just return the German text
 * unchanged (graceful fallback). Anyone can add more entries below.
 *
 * For DE language, we always return the German label as-is.
 */

type Lang = "bs" | "de" | "hr" | "sr";

// shared = same translation for bs/hr/sr (most administrative terms)
type Entry = { bs: string; hr?: string; sr?: string };

// Key is the German label EXACTLY as written in the form (case-sensitive).
// We also try a case-insensitive fallback at lookup time.
const DICT: Record<string, Entry> = {
  // ===== personal data =====
  "Familienname": { bs: "Prezime" },
  "Familienname, ggf. frühere(r) Name(n)": { bs: "Prezime, eventualno ranija prezimena" },
  "Geburtsname": { bs: "Djevojačko prezime", sr: "Devojačko prezime" },
  "Geburtsname (falls abweichend)": { bs: "Djevojačko prezime (ako se razlikuje)", sr: "Devojačko prezime (ako se razlikuje)" },
  "Vorname": { bs: "Ime" },
  "Vorname(n)": { bs: "Ime(na)" },
  "Vorname(n) (Rufname in Großbuchstaben)": { bs: "Ime(na) (zovno ime velikim slovima)" },
  "Vorname(n) — Rufname bitte unterstreichen": { bs: "Ime(na) — zovno ime podvuci", sr: "Ime(na) — zovno ime podvuci" },
  "Titel": { bs: "Titula" },
  "Geburtsdatum": { bs: "Datum rođenja", sr: "Datum rođenja" },
  "Geburtsdatum (tt.mm.jjjj)": { bs: "Datum rođenja (dd.mm.gggg)" },
  "Geburtsort": { bs: "Mjesto rođenja", sr: "Mesto rođenja", hr: "Mjesto rođenja" },
  "Geburtsland": { bs: "Država rođenja", sr: "Država rođenja" },
  "Geschlecht": { bs: "Spol", sr: "Pol", hr: "Spol" },
  "Staatsangehörigkeit": { bs: "Državljanstvo" },
  "Staatsangehörigkeit (1.)": { bs: "Državljanstvo (1.)" },
  "ggf. 2. Staatsangehörigkeit": { bs: "eventualno 2. državljanstvo" },
  "Eventuell frühere Staatsangehörigkeit(en)": { bs: "Eventualno ranija državljanstva" },
  "Religionszugehörigkeit (freiwillig)": { bs: "Vjeroispovijest (dobrovoljno)", sr: "Veroispovest (dobrovoljno)", hr: "Vjeroispovijest (dobrovoljno)" },
  "Familienstand": { bs: "Bračno stanje" },
  "Größe (cm)": { bs: "Visina (cm)" },
  "Augenfarbe": { bs: "Boja očiju" },

  // ===== address =====
  "Anschrift": { bs: "Adresa" },
  "Anschrift (Straße, Hausnummer)": { bs: "Adresa (ulica, kućni broj)" },
  "Straße": { bs: "Ulica" },
  "Straße, Hausnr.": { bs: "Ulica, kućni broj" },
  "Hausnummer": { bs: "Kućni broj" },
  "Wohnungsnummer / Zusatz": { bs: "Broj stana / dodatak" },
  "PLZ": { bs: "Poštanski broj" },
  "Postleitzahl": { bs: "Poštanski broj" },
  "Wohnort": { bs: "Mjesto stanovanja", sr: "Mesto stanovanja", hr: "Mjesto stanovanja" },
  "Ort": { bs: "Mjesto", sr: "Mesto", hr: "Mjesto" },
  "Staat": { bs: "Država" },
  "Land": { bs: "Država" },
  "Einzugsdatum (tt.mm.jjjj)": { bs: "Datum useljenja (dd.mm.gggg)" },
  "Derzeitiger Wohnsitz in Deutschland (Straße, Hausnr., PLZ, Ort)": { bs: "Trenutno prebivalište u Njemačkoj (ulica, broj, PŠT, mjesto)", sr: "Trenutno prebivalište u Nemačkoj (ulica, broj, PŠT, mesto)", hr: "Trenutno prebivalište u Njemačkoj (ulica, broj, PŠT, mjesto)" },
  "Ersteinreise am": { bs: "Prvi ulazak dana" },

  // ===== contact =====
  "Telefon": { bs: "Telefon" },
  "E-Mail": { bs: "E-mail" },

  // ===== documents =====
  "Steuerliche Identifikationsnummer": { bs: "Poreski identifikacioni broj (Steuer-ID)" },
  "Steuerliche Identifikationsnummer (zwingend auszufüllen)": { bs: "Poreski identifikacioni broj (obavezno popuniti)" },
  "Ausweisdokument": { bs: "Lični dokument", sr: "Lični dokument", hr: "Osobni dokument" },
  "Dokumentnummer": { bs: "Broj dokumenta" },
  "Ausgestellt am": { bs: "Izdat dana", sr: "Izdat dana", hr: "Izdan dana" },
  "Gültig bis": { bs: "Važi do", sr: "Važi do", hr: "Vrijedi do" },
  "Bezeichnung": { bs: "Naziv" },

  // ===== bank =====
  "IBAN": { bs: "IBAN" },
  "BIC": { bs: "BIC" },
  "Bank / Finanzinstitut": { bs: "Banka / finansijska institucija", sr: "Banka / finansijska institucija", hr: "Banka / financijska institucija" },
  "Versicherung": { bs: "Osiguranje" },

  // ===== signature =====
  "Datum": { bs: "Datum" },
  "Ort, Datum": { bs: "Mjesto, datum", sr: "Mesto, datum", hr: "Mjesto, datum" },
  "Unterschrift": { bs: "Potpis" },
  "Unterschrift antragstellende Person": { bs: "Potpis podnosioca zahtjeva", sr: "Potpis podnosioca zahteva", hr: "Potpis podnositelja zahtjeva" },
  "Unterschrift Ehepartner/Lebenspartner": { bs: "Potpis bračnog/životnog partnera", sr: "Potpis bračnog/životnog partnera", hr: "Potpis bračnog/životnog partnera" },

  // ===== work / income =====
  "Monatlicher Netto-Verdienst": { bs: "Mjesečna neto plata", sr: "Mesečna neto plata", hr: "Mjesečna neto plaća" },
  "Bei / Als": { bs: "Kod / kao" },
  "Beruf": { bs: "Zanimanje" },
  "Arbeitgeber": { bs: "Poslodavac" },

  // ===== section titles =====
  "Angaben zur antragstellenden Person": { bs: "Podaci o podnosiocu zahtjeva", sr: "Podaci o podnosiocu zahteva", hr: "Podaci o podnositelju zahtjeva" },
  "Angaben zum Ehepartner/Lebenspartner": { bs: "Podaci o bračnom/životnom partneru" },
  "Angaben zum Zahlungsweg": { bs: "Podaci o načinu isplate" },
  "Angaben zu Kindern": { bs: "Podaci o djeci", sr: "Podaci o deci", hr: "Podaci o djeci" },
  "Angaben zur Person": { bs: "Lični podaci", sr: "Lični podaci", hr: "Osobni podaci" },
  "Angaben zur Wohnung": { bs: "Podaci o stanu" },
  "Bisherige Wohnung (Ummeldung)": { bs: "Dosadašnji stan (preprijava)" },
  "Weitere Personen (Mitziehende)": { bs: "Ostale osobe (koje se useljavaju)" },
  "Datum und Unterschrift": { bs: "Datum i potpis" },
  "Der Bescheid soll nicht mir, sondern folgender Person zugesandt werden": { bs: "Rješenje treba poslati ne meni, nego sljedećoj osobi", sr: "Rešenje treba poslati ne meni, nego sledećoj osobi", hr: "Rješenje treba poslati ne meni, nego sljedećoj osobi" },

  // ===== misc =====
  "Kontoinhaber/in": { bs: "Vlasnik računa" },
  "antragstellende Person": { bs: "podnosilac zahtjeva", sr: "podnosilac zahteva", hr: "podnositelj zahtjeva" },
  "nicht antragstellende Person": { bs: "druga osoba (nije podnosilac)" },
  "Bei wem eingezogen?": { bs: "Kod koga useljen?" },

  // ===== checkbox / radio option values =====
  "ledig": { bs: "neoženjen/neudana", sr: "neoženjen/neudata", hr: "neoženjen/neudana" },
  "verheiratet": { bs: "oženjen/udana", sr: "oženjen/udata", hr: "oženjen/udana" },
  "geschieden": { bs: "razveden/a" },
  "verwitwet": { bs: "udovac/udovica" },
  "getrennt lebend": { bs: "živi odvojeno" },
  "dauernd getrennt lebend": { bs: "trajno živi odvojeno" },
  "in eingetragener Lebenspartnerschaft lebend": { bs: "u registrovanoj životnoj zajednici", sr: "u registrovanoj životnoj zajednici", hr: "u registriranoj životnoj zajednici" },
  "eingetragene Lebenspartnerschaft": { bs: "registrovana životna zajednica", sr: "registrovana životna zajednica", hr: "registrirana životna zajednica" },
  "eingetr. Lebenspartnerschaft": { bs: "registr. životna zajednica", sr: "registr. životna zajednica", hr: "registr. životna zajednica" },
  "durch Tod aufgelöst": { bs: "prekinuto smrću" },
  "männlich": { bs: "muški", sr: "muški", hr: "muški" },
  "weiblich": { bs: "ženski", sr: "ženski", hr: "ženski" },
  "divers": { bs: "neodređeno", sr: "neodređeno", hr: "neodređeno" },
  "ohne Angabe": { bs: "bez navođenja" },
  "ja": { bs: "da" },
  "nein": { bs: "ne" },
  "Ja": { bs: "Da" },
  "Nein": { bs: "Ne" },
  "Personalausweis": { bs: "Lična karta", sr: "Lična karta", hr: "Osobna iskaznica" },
  "Reisepass": { bs: "Pasoš", sr: "Pasoš", hr: "Putovnica" },
  "Aufenthaltstitel": { bs: "Boravišna dozvola" },
  "Eigentümer/in": { bs: "Vlasnik/ica" },
  "Hauptmieter/in": { bs: "Glavni najmoprimac" },
  "Untermieter/in": { bs: "Podstanar" },
  "Erstanmeldung in Deutschland (kein Vorwohnsitz)": { bs: "Prva prijava u Njemačkoj (nema prethodnog prebivališta)", sr: "Prva prijava u Nemačkoj (nema prethodnog prebivališta)", hr: "Prva prijava u Njemačkoj (nema prethodnog prebivališta)" },
  "Ummeldung — bisherige Anschrift:": { bs: "Preprijava — dosadašnja adresa:" },
  "Sonstiges:": { bs: "Ostalo:" },
  "Sonstige": { bs: "Ostalo" },
  "Sonstiger Grund:": { bs: "Drugi razlog:" },
  "Kein Einkommen": { bs: "Nema prihoda" },
  "Ausländische Rente": { bs: "Inostrana penzija", sr: "Inostrana penzija", hr: "Inozemna mirovina" },
  "Andere Religionsgemeinschaft:": { bs: "Druga vjerska zajednica:", sr: "Druga verska zajednica:", hr: "Druga vjerska zajednica:" },
  "Unterhalt wird nicht gezahlt": { bs: "Alimentacija se ne plaća" },
};

const lower: Record<string, Entry> = {};
for (const [k, v] of Object.entries(DICT)) lower[k.toLowerCase()] = v;

/**
 * Translate a German form label to "German (Translation)".
 * - For lang === 'de' or unknown labels: returns the German text unchanged.
 * - For bs/hr/sr: returns "Familienname (Prezime)" when found.
 *
 * Treats the label as opaque; never throws.
 */
export function tLabel(deLabel: string, lang: Lang): string {
  if (!deLabel) return deLabel;
  if (lang === "de") return deLabel;
  const entry = DICT[deLabel] ?? lower[deLabel.toLowerCase()];
  if (!entry) return deLabel;
  const translated =
    lang === "hr" ? entry.hr ?? entry.bs :
    lang === "sr" ? entry.sr ?? entry.bs :
    entry.bs;
  if (!translated || translated === deLabel) return deLabel;
  return `${deLabel} (${translated})`;
}

/** Same as tLabel but for short option strings inside checkbox/radio groups. */
export function tOption(deOption: string, lang: Lang): string {
  return tLabel(deOption, lang);
}
