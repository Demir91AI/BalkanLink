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

  // ===== additional common form fields =====
  "Nachname": { bs: "Prezime" },
  "Name": { bs: "Ime/Naziv" },
  "Adresse": { bs: "Adresa" },
  "Anschrift: Straße, Hausnr.": { bs: "Adresa: ulica, kućni broj" },
  "Tel.": { bs: "Tel." },
  "Krankenkasse": { bs: "Zdravstveni fond" },
  "Krankenversicherung": { bs: "Zdravstveno osiguranje" },
  "Ausweisnummer": { bs: "Broj lične/iskaznice" },
  "Identitätsnachweis": { bs: "Dokaz identiteta" },
  "Aufenthaltstitel (Nicht-EU): Art": { bs: "Boravišna dozvola (ne-EU): vrsta" },
  "Steuer-ID des Kindes": { bs: "Steuer-ID djeteta", sr: "Steuer-ID deteta", hr: "Steuer-ID djeteta" },
  "BG-Nummer": { bs: "BG-broj (predmet u Jobcenteru)" },
  "von": { bs: "od" },
  "bis": { bs: "do" },
  "Von": { bs: "Od" },
  "Bis": { bs: "Do" },
  "seit": { bs: "od (datuma)" },
  "Seit": { bs: "Od (datuma)" },
  "Art": { bs: "Vrsta" },
  "Grund": { bs: "Razlog" },
  "Beantragt bei": { bs: "Podneseno kod" },
  "Marke/Modell": { bs: "Marka/Model" },
  "Baujahr": { bs: "Godište" },
  "Wert (€)": { bs: "Vrijednost (€)", sr: "Vrednost (€)", hr: "Vrijednost (€)" },
  "Brutto (€)": { bs: "Bruto (€)", sr: "Bruto (€)", hr: "Bruto (€)" },
  "Eigenes Vermögen (€)": { bs: "Vlastita imovina (€)" },
  "Bruttoeinkommen (€/Monat)": { bs: "Bruto prihod (€/mjesec)", sr: "Bruto prihod (€/mesec)", hr: "Bruto prihod (€/mjesec)" },
  "Monatlicher Beitrag (€)": { bs: "Mjesečni doprinos (€)", sr: "Mesečni doprinos (€)", hr: "Mjesečni doprinos (€)" },
  "Betrag (€/Monat)": { bs: "Iznos (€/mjesec)", sr: "Iznos (€/mesec)", hr: "Iznos (€/mjesec)" },
  "Sonstiges (€)": { bs: "Ostalo (€)" },
  "Kaltmiete (€/Monat)": { bs: "Hladna kirija (€/mjesec)", sr: "Hladna kirija (€/mesec)", hr: "Hladna najamnina (€/mjesec)" },
  "Heizkosten (€/Monat)": { bs: "Troškovi grijanja (€/mjesec)", sr: "Troškovi grejanja (€/mesec)", hr: "Troškovi grijanja (€/mjesec)" },
  "Wohnfläche (m²)": { bs: "Stambena površina (m²)" },
  "Anzahl der Zimmer": { bs: "Broj soba" },
  "Anzahl Personen im Haushalt": { bs: "Broj osoba u domaćinstvu" },
  "Anzahl der Kinder": { bs: "Broj djece", sr: "Broj dece", hr: "Broj djece" },
  "Wohnsituation": { bs: "Stambena situacija" },
  "Wochenstunden": { bs: "Sati sedmično", sr: "Časova nedeljno", hr: "Sati tjedno" },
  "Beruf / Tätigkeit": { bs: "Zanimanje / djelatnost", sr: "Zanimanje / delatnost", hr: "Zanimanje / djelatnost" },
  "Voraussichtliches Ende": { bs: "Predviđeni kraj" },
  "Zeitpunkt": { bs: "Trenutak / datum" },
  "Zuständiges Amt für Ausbildungsförderung": { bs: "Nadležni ured za podršku obrazovanju (BAföG)" },
  "Persönliche Daten": { bs: "Lični podaci", sr: "Lični podaci", hr: "Osobni podaci" },
  "Angaben zur Ausbildung": { bs: "Podaci o obrazovanju" },
  "Angaben zu den Eltern": { bs: "Podaci o roditeljima" },
  "Angaben zum anderen Elternteil": { bs: "Podaci o drugom roditelju" },
  "Angaben zu den Kindern": { bs: "Podaci o djeci", sr: "Podaci o deci", hr: "Podaci o djeci" },
  "Eigenes Einkommen und Vermögen": { bs: "Vlastiti prihod i imovina" },
  "Höhe und Vorschuss": { bs: "Iznos i predujam" },
  "A. Antragstellende Person": { bs: "A. Podnosilac zahtjeva", sr: "A. Podnosilac zahteva", hr: "A. Podnositelj zahtjeva" },
  "B. Betroffene Person": { bs: "B. Pogođena osoba" },
  "B. Geschädigte Person": { bs: "B. Oštećena osoba" },
  "D. Unterschrift": { bs: "D. Potpis" },
  "Sonstiges:": { bs: "Ostalo:" },
  "Sonstige": { bs: "Ostalo" },
  "Sonstiger Grund:": { bs: "Drugi razlog:" },
  "Kein Einkommen": { bs: "Nema prihoda" },
  "Ausländische Rente": { bs: "Inostrana penzija", sr: "Inostrana penzija", hr: "Inozemna mirovina" },
  "Andere Religionsgemeinschaft:": { bs: "Druga vjerska zajednica:", sr: "Druga verska zajednica:", hr: "Druga vjerska zajednica:" },
  "Unterhalt wird nicht gezahlt": { bs: "Alimentacija se ne plaća" },

  // ===== expansion: kindergeld / elterngeld / family =====
  "Antragsteller/in": { bs: "Podnosilac zahtjeva", sr: "Podnosilac zahteva", hr: "Podnositelj zahtjeva" },
  "Antragstellerin / Antragsteller": { bs: "Podnositeljka / podnosilac zahtjeva" },
  "Mutter": { bs: "Majka" },
  "Vater": { bs: "Otac" },
  "Elternteil 1": { bs: "Roditelj 1" },
  "Elternteil 2": { bs: "Roditelj 2" },
  "Kind": { bs: "Dijete", sr: "Dete", hr: "Dijete" },
  "Kinder": { bs: "Djeca", sr: "Deca", hr: "Djeca" },
  "Name des Kindes": { bs: "Ime djeteta", sr: "Ime deteta", hr: "Ime djeteta" },
  "Geburtsdatum des Kindes": { bs: "Datum rođenja djeteta", sr: "Datum rođenja deteta", hr: "Datum rođenja djeteta" },
  "Verwandtschaftsverhältnis": { bs: "Srodstveni odnos" },
  "Lebt im Haushalt?": { bs: "Živi u domaćinstvu?" },
  "Voraussichtlicher Geburtstermin": { bs: "Predviđeni datum porođaja" },
  "Tatsächlicher Geburtstermin": { bs: "Stvarni datum porođaja" },
  "Beziehungszeitraum": { bs: "Period primanja", sr: "Period primanja" },
  "Bezugszeitraum": { bs: "Period primanja" },
  "Erwerbstätigkeit vor der Geburt": { bs: "Zaposlenost prije porođaja", sr: "Zaposlenost pre porođaja", hr: "Zaposlenost prije porođaja" },
  "Erwerbstätigkeit nach der Geburt": { bs: "Zaposlenost nakon porođaja" },
  "Arbeitszeit (Stunden/Woche)": { bs: "Radno vrijeme (sati/sedmica)", sr: "Radno vreme (sati/nedelja)", hr: "Radno vrijeme (sati/tjedan)" },
  "Mutterschaftsgeld": { bs: "Naknada za porodilje" },
  "Elterngeld": { bs: "Roditeljska naknada (Elterngeld)" },
  "Basiselterngeld": { bs: "Osnovni Elterngeld" },
  "ElterngeldPlus": { bs: "Elterngeld Plus" },
  "Partnerschaftsbonus": { bs: "Partnerski bonus" },

  // ===== income / wohngeld / bürgergeld =====
  "Nettoeinkommen": { bs: "Neto prihod" },
  "Bruttoeinkommen": { bs: "Bruto prihod" },
  "Monatliches Einkommen": { bs: "Mjesečni prihod", sr: "Mesečni prihod", hr: "Mjesečni prihod" },
  "Jahreseinkommen": { bs: "Godišnji prihod" },
  "Sonstige Einkünfte": { bs: "Ostali prihodi" },
  "Vermögen": { bs: "Imovina" },
  "Sparguthaben (€)": { bs: "Štednja (€)" },
  "Bargeld (€)": { bs: "Gotovina (€)" },
  "Immobilien": { bs: "Nekretnine" },
  "Fahrzeuge": { bs: "Vozila" },
  "Schulden (€)": { bs: "Dugovi (€)" },
  "Unterhaltsleistungen": { bs: "Alimentacije / izdržavanje" },
  "Unterhaltsempfänger": { bs: "Primalac alimentacije", sr: "Primalac alimentacije", hr: "Primatelj alimentacije" },
  "Rente / Pension": { bs: "Penzija / mirovina", sr: "Penzija", hr: "Mirovina" },
  "Arbeitslosengeld": { bs: "Naknada za nezaposlene (ALG I)" },
  "Bürgergeld": { bs: "Bürgergeld (socijalna pomoć)" },
  "Wohngeld": { bs: "Wohngeld (stambena pomoć)" },
  "Kindergeld": { bs: "Dječiji doplatak (Kindergeld)", sr: "Dečiji doplatak (Kindergeld)", hr: "Dječji doplatak (Kindergeld)" },
  "Kinderzuschlag": { bs: "Dodatak za djecu (Kinderzuschlag)", sr: "Dodatak za decu", hr: "Dodatak za djecu" },
  "BAföG": { bs: "Studentska pomoć (BAföG)" },
  "Krankengeld": { bs: "Naknada za bolovanje" },
  "Pflegegeld": { bs: "Naknada za njegu" },
  "Sozialleistungen": { bs: "Socijalne naknade" },
  "Sonstige Leistungen": { bs: "Ostale naknade" },

  // ===== housing extras =====
  "Wohnsitz": { bs: "Prebivalište" },
  "Hauptwohnsitz": { bs: "Glavno prebivalište" },
  "Nebenwohnsitz": { bs: "Sporedno prebivalište" },
  "Vermieter/in": { bs: "Najmodavac", sr: "Najmodavac", hr: "Najmodavac" },
  "Mieter/in": { bs: "Najmoprimac", sr: "Najmoprimac", hr: "Najmoprimac" },
  "Mietbeginn": { bs: "Početak najma" },
  "Mietvertrag": { bs: "Ugovor o najmu" },
  "Warmmiete (€/Monat)": { bs: "Topla kirija (€/mjesec)", sr: "Topla kirija (€/mesec)", hr: "Topla najamnina (€/mjesec)" },
  "Nebenkosten (€/Monat)": { bs: "Režijski troškovi (€/mjesec)", sr: "Režijski troškovi (€/mesec)", hr: "Režijski troškovi (€/mjesec)" },
  "Stromkosten (€/Monat)": { bs: "Struja (€/mjesec)", sr: "Struja (€/mesec)", hr: "Struja (€/mjesec)" },

  // ===== work / arbeitsbescheinigung =====
  "Arbeitsverhältnis": { bs: "Radni odnos" },
  "Arbeitsbeginn": { bs: "Početak rada" },
  "Arbeitsende": { bs: "Završetak rada" },
  "Befristet bis": { bs: "Ugovor na određeno do" },
  "Unbefristet": { bs: "Na neodređeno" },
  "Vollzeit": { bs: "Puno radno vrijeme", sr: "Puno radno vreme", hr: "Puno radno vrijeme" },
  "Teilzeit": { bs: "Skraćeno radno vrijeme", sr: "Skraćeno radno vreme", hr: "Skraćeno radno vrijeme" },
  "Minijob": { bs: "Mini-posao (do 538€)" },
  "Selbstständig": { bs: "Samozaposlen" },
  "Arbeitslos": { bs: "Nezaposlen" },
  "Schüler/in": { bs: "Učenik/ca" },
  "Student/in": { bs: "Student/ica" },
  "Auszubildende/r": { bs: "Praktikant (Azubi)" },
  "Rentner/in": { bs: "Penzioner/ka", sr: "Penzioner/ka", hr: "Umirovljenik/ca" },
  "Hausfrau / Hausmann": { bs: "Domaćica / domaćin" },
  "Kündigungsdatum": { bs: "Datum otkaza" },
  "Kündigungsgrund": { bs: "Razlog otkaza" },
  "Letzter Arbeitstag": { bs: "Posljednji radni dan", sr: "Poslednji radni dan", hr: "Posljednji radni dan" },

  // ===== education / bafög =====
  "Schule / Hochschule": { bs: "Škola / fakultet" },
  "Studienfach": { bs: "Smjer studija", sr: "Smer studija", hr: "Smjer studija" },
  "Fachsemester": { bs: "Semestar struke" },
  "Hochschulsemester": { bs: "Semestar fakulteta" },
  "Ausbildungsbeginn": { bs: "Početak obrazovanja" },
  "Ausbildungsende": { bs: "Završetak obrazovanja" },
  "Ausbildungsstätte": { bs: "Obrazovna ustanova" },
  "Bildungsabschluss": { bs: "Stečena diploma" },

  // ===== führungszeugnis / official =====
  "Verwendungszweck": { bs: "Svrha" },
  "Empfänger": { bs: "Primalac", sr: "Primalac", hr: "Primatelj" },
  "Behörde": { bs: "Ured / institucija" },
  "Aktenzeichen": { bs: "Broj predmeta" },
  "Bemerkungen": { bs: "Napomene" },
  "Erklärung": { bs: "Izjava" },
  "Begründung": { bs: "Obrazloženje" },

  // ===== more sections =====
  "Angaben zum Antrag": { bs: "Podaci o zahtjevu", sr: "Podaci o zahtevu", hr: "Podaci o zahtjevu" },
  "Angaben zur Wohnsituation": { bs: "Podaci o stambenoj situaciji" },
  "Angaben zum Einkommen": { bs: "Podaci o prihodu" },
  "Angaben zum Vermögen": { bs: "Podaci o imovini" },
  "Angaben zur Erwerbstätigkeit": { bs: "Podaci o zaposlenju" },
  "Angaben zur Krankenversicherung": { bs: "Podaci o zdravstvenom osiguranju" },
  "Angaben zur Bankverbindung": { bs: "Podaci o bankovnom računu" },
  "Bankverbindung": { bs: "Bankovni račun" },
  "Erklärungen": { bs: "Izjave" },
  "Anlagen": { bs: "Prilozi" },
  "Hinweise": { bs: "Napomene / upute" },
  "Wichtige Hinweise": { bs: "Važne napomene" },

  // ===== generic options =====
  "vorhanden": { bs: "postoji" },
  "nicht vorhanden": { bs: "ne postoji" },
  "trifft zu": { bs: "primjenjuje se", sr: "primenjuje se", hr: "primjenjuje se" },
  "trifft nicht zu": { bs: "ne primjenjuje se", sr: "ne primenjuje se", hr: "ne primjenjuje se" },
  "bekannt": { bs: "poznato" },
  "unbekannt": { bs: "nepoznato" },
  "in Bearbeitung": { bs: "u obradi" },
  "abgeschlossen": { bs: "završeno" },

  // ===== expansion v3: detailed form fields =====
  "Abteilung": { bs: "Odjel", sr: "Odeljenje", hr: "Odjel" },
  "Aktien, Fonds, ETFs (€)": { bs: "Dionice, fondovi, ETF (€)", sr: "Akcije, fondovi, ETF (€)", hr: "Dionice, fondovi, ETF (€)" },
  "Aktien/Fonds (€)": { bs: "Dionice/fondovi (€)", sr: "Akcije/fondovi (€)", hr: "Dionice/fondovi (€)" },
  "Aktuelles Fachsemester": { bs: "Trenutni stručni semestar" },
  "Aktuelles Schuljahr / Klasse": { bs: "Trenutna školska godina / razred" },
  "Als Mindestbetrag (150 €)": { bs: "Kao minimalni iznos (150 €)" },
  "Als Mindestbetrag (300 €)": { bs: "Kao minimalni iznos (300 €)" },
  "Alter": { bs: "Godine" },
  "Amt": { bs: "Ured" },
  "An wen": { bs: "Kome" },
  "Anschrift (falls abweichend)": { bs: "Adresa (ako se razlikuje)" },
  "Anschrift AG": { bs: "Adresa poslodavca" },
  "Anschrift der Mietwohnung: Straße, Hausnr.": { bs: "Adresa iznajmljenog stana: ulica, broj" },
  "Anschrift des anderen Elternteils": { bs: "Adresa drugog roditelja" },
  "Antrag einzureichen bei: Meldebehörde des Wohnorts": { bs: "Zahtjev se predaje: ured za prijavu prebivališta", sr: "Zahtev se predaje: ured za prijavu prebivališta", hr: "Zahtjev se predaje: ured za prijavu prebivališta" },
  "Anzahl": { bs: "Broj" },
  "Anzahl Kinder": { bs: "Broj djece", sr: "Broj dece", hr: "Broj djece" },
  "Anzahl der Personen im Haushalt gesamt": { bs: "Ukupan broj osoba u domaćinstvu" },
  "Arbeitgeber (Name, Anschrift)": { bs: "Poslodavac (naziv, adresa)" },
  "Arbeitgeber 2": { bs: "Poslodavac 2" },
  "Arbeitgeber 3": { bs: "Poslodavac 3" },
  "Arbeitsbereit ab (Datum)": { bs: "Spreman za rad od (datum)" },
  "Arzt Nachname": { bs: "Prezime ljekara", sr: "Prezime lekara", hr: "Prezime liječnika" },
  "Arzt Titel": { bs: "Titula ljekara", sr: "Titula lekara", hr: "Titula liječnika" },
  "Arzt Vorname": { bs: "Ime ljekara", sr: "Ime lekara", hr: "Ime liječnika" },
  "Aufenthaltstitel (falls relevant)": { bs: "Boravišna dozvola (ako je relevantna)" },
  "Aufenthaltstitel: Art": { bs: "Boravišna dozvola: vrsta" },
  "Aus Erwerbseinkommen vor Geburt": { bs: "Iz prihoda od rada prije porođaja", sr: "Iz prihoda od rada pre porođaja", hr: "Iz prihoda od rada prije porođaja" },
  "Ausbildungsart": { bs: "Vrsta obrazovanja" },
  "Ausbildungsgang / Klasse / Fachrichtung": { bs: "Smjer obrazovanja / razred / struka", sr: "Smer obrazovanja / razred / struka", hr: "Smjer obrazovanja / razred / struka" },
  "Ausbildungsort PLZ": { bs: "PŠT mjesta obrazovanja", sr: "PŠT mesta obrazovanja", hr: "PŠT mjesta obrazovanja" },
  "Ausweis-Nr.": { bs: "Broj lične karte", sr: "Broj lične karte", hr: "Broj osobne iskaznice" },
  "BAföG / Beihilfe (€/Mon.)": { bs: "BAföG / pomoć (€/mjesec)", sr: "BAföG / pomoć (€/mesec)", hr: "BAföG / pomoć (€/mjesec)" },
  "BIC (bei Auslandszahlung)": { bs: "BIC (kod inostrane uplate)", sr: "BIC (kod inostrane uplate)", hr: "BIC (kod inozemne uplate)" },
  "Bankguthaben gesamt (€)": { bs: "Ukupno stanje na računima (€)" },
  "Bausparvertrag (€)": { bs: "Stambena štednja (€)" },
  "Beginn der Ausbildung": { bs: "Početak obrazovanja" },
  "Beginn der Beschäftigung": { bs: "Početak zaposlenja" },
  "Bei Adoption: Datum der Haushaltsaufnahme": { bs: "Kod usvajanja: datum prijema u domaćinstvo" },
  "Bei einem Kind liegt eine Behinderung vor (Nachweis beilegen — Altersgrenze dann 14 Jahre)": { bs: "Jedno dijete ima invaliditet (priložiti dokaz — granica 14 god.)", sr: "Jedno dete ima invaliditet (priložiti dokaz — granica 14 god.)", hr: "Jedno dijete ima invaliditet (priložiti dokaz — granica 14 god.)" },
  "Bei wem lebt das Kind?": { bs: "Kod koga živi dijete?", sr: "Kod koga živi dete?", hr: "Kod koga živi dijete?" },
  "Beitrag im Basistarif": { bs: "Doprinos u osnovnoj tarifi" },
  "Beruf / Beschäftigung": { bs: "Zanimanje / zaposlenje" },
  "Berufsbezeichnung / Tätigkeit": { bs: "Naziv zanimanja / djelatnost", sr: "Naziv zanimanja / delatnost", hr: "Naziv zanimanja / djelatnost" },
  "Beschluss Familiengericht (Datum, Aktenzeichen)": { bs: "Odluka porodičnog suda (datum, broj predmeta)", sr: "Odluka porodičnog suda (datum, broj predmeta)", hr: "Odluka obiteljskog suda (datum, broj predmeta)" },
  "Betrag": { bs: "Iznos" },
  "Betrag (€/Mon.)": { bs: "Iznos (€/mjesec)", sr: "Iznos (€/mesec)", hr: "Iznos (€/mjesec)" },
  "Betrag in Euro": { bs: "Iznos u eurima" },
  "Betrag netto (€/Monat)": { bs: "Neto iznos (€/mjesec)", sr: "Neto iznos (€/mesec)", hr: "Neto iznos (€/mjesec)" },
  "Betriebskosten (€/Monat)": { bs: "Režijski troškovi (€/mjesec)", sr: "Režijski troškovi (€/mesec)", hr: "Režijski troškovi (€/mjesec)" },
  "Betriebskosten / Nebenkosten (€/Monat)": { bs: "Režije / dodatni troškovi (€/mjesec)", sr: "Režije / dodatni troškovi (€/mesec)", hr: "Režije / dodatni troškovi (€/mjesec)" },
  "Betriebsrente (€/Monat netto)": { bs: "Penzija iz firme (€/mjesec neto)", sr: "Penzija iz firme (€/mesec neto)", hr: "Mirovina iz tvrtke (€/mjesec neto)" },
  "Betriebsnummer": { bs: "Broj firme (Betriebsnummer)" },
  "Betriebszugehörigkeit (Jahre)": { bs: "Staž u firmi (godine)" },
  "Bevorzugter Kursort / Stadtteil": { bs: "Željena lokacija kursa / kvart" },
  "Bis einschl. LM": { bs: "Zaključno sa mjesecom", sr: "Zaključno sa mesecom", hr: "Zaključno s mjesecom" },
  "Bruttojahreseinkommen (€)": { bs: "Bruto godišnji prihod (€)" },
  "Bruttojahreseinkommen (€, vorletztes Jahr)": { bs: "Bruto godišnji prihod (€, pretprošla godina)" },
  "Bruttolohn (€/Monat)": { bs: "Bruto plaća (€/mjesec)", sr: "Bruto plata (€/mesec)", hr: "Bruto plaća (€/mjesec)" },
  "Datum der Einreichung (optional)": { bs: "Datum predaje (opcionalno)" },
  "Datum, Unterschrift": { bs: "Datum, potpis" },
  "Davon Sparguthaben (€)": { bs: "Od toga štednja (€)" },
  "Deutsche Altersrente (€/Monat netto)": { bs: "Njemačka starosna penzija (€/mjesec neto)", sr: "Nemačka starosna penzija (€/mesec neto)", hr: "Njemačka starosna mirovina (€/mjesec neto)" },
  "E-Mail (freiwillig)": { bs: "E-mail (dobrovoljno)" },
  "ET1 — Voraussichtliche Wochenstunden": { bs: "Roditelj 1 — predviđeni sati sedmično" },
  "ET2 — Voraussichtliche Wochenstunden": { bs: "Roditelj 2 — predviđeni sati sedmično" },
  "Ehegatte / Lebenspartner 1": { bs: "Bračni / životni partner 1" },
  "Ehegatte / Lebenspartner 2": { bs: "Bračni / životni partner 2" },
  "Eigenes Einkommen (brutto, €/Monat)": { bs: "Vlastiti prihod (bruto, €/mjesec)", sr: "Vlastiti prihod (bruto, €/mesec)", hr: "Vlastiti prihod (bruto, €/mjesec)" },
  "Eigenes Vermögen (€, Gesamtwert)": { bs: "Vlastita imovina (€, ukupna vrijednost)", sr: "Vlastita imovina (€, ukupna vrednost)", hr: "Vlastita imovina (€, ukupna vrijednost)" },
  "Einkommensart": { bs: "Vrsta prihoda" },
  "Einverstanden, dass Elterngeldstelle meinen AG kontaktiert (freiwillig)": { bs: "Slažem se da Elterngeld-ured kontaktira mog poslodavca (dobrovoljno)" },
  "Einzugsdatum": { bs: "Datum useljenja" },
  "Ende der Beschäftigung": { bs: "Završetak zaposlenja" },
  "Entfernung Elternhaus → Schule (km)": { bs: "Udaljenost roditeljska kuća → škola (km)" },
  "Erforderliche Kostform": { bs: "Potrebna ishrana / dijeta" },
  "Erwerbseinkommen (€/Monat netto)": { bs: "Prihod od rada (€/mjesec neto)", sr: "Prihod od rada (€/mesec neto)", hr: "Prihod od rada (€/mjesec neto)" },
  "Erwerbsminderung anerkannt seit": { bs: "Smanjena radna sposobnost priznata od" },
  "Erwerbsminderungsrente (€/Monat netto)": { bs: "Penzija zbog smanjene radne sposobnosti (€/mjesec neto)", sr: "Penzija zbog smanjene radne sposobnosti (€/mesec neto)", hr: "Mirovina zbog smanjene radne sposobnosti (€/mjesec neto)" },
  "Erwerbstätigkeit im Ausland — Land": { bs: "Rad u inostranstvu — država", sr: "Rad u inostranstvu — država", hr: "Rad u inozemstvu — država" },
  "Erwerbstätigkeit in Deutschland": { bs: "Zaposlenje u Njemačkoj", sr: "Zaposlenje u Nemačkoj", hr: "Zaposlenje u Njemačkoj" },
  "Fahrzeit ÖPNV (Min.)": { bs: "Vrijeme javnog prijevoza (min.)", sr: "Vreme javnog prevoza (min.)", hr: "Vrijeme javnog prijevoza (min.)" },
  "Fernwärme (€/Monat)": { bs: "Daljinsko grijanje (€/mjesec)", sr: "Daljinsko grejanje (€/mesec)", hr: "Daljinsko grijanje (€/mjesec)" },
  "Festgeld / Termingeld (€)": { bs: "Oročena štednja (€)" },
  "Forderungen / Darlehen (€)": { bs: "Potraživanja / krediti (€)" },
  "Garagenmiete (€/Monat)": { bs: "Najam garaže (€/mjesec)", sr: "Najam garaže (€/mesec)", hr: "Najam garaže (€/mjesec)" },
  "Gas (€/Monat)": { bs: "Plin (€/mjesec)", sr: "Gas (€/mesec)", hr: "Plin (€/mjesec)" },
  "GdB": { bs: "Stepen invaliditeta (GdB)", sr: "Stepen invaliditeta (GdB)", hr: "Stupanj invaliditeta (GdB)" },
  "Geburtsjahr": { bs: "Godina rođenja" },
  "Geldinstitut": { bs: "Banka" },
  "Gesamtmiete inkl. NK (€/Monat)": { bs: "Ukupna kirija sa režijama (€/mjesec)", sr: "Ukupna kirija sa režijama (€/mesec)", hr: "Ukupna najamnina s režijama (€/mjesec)" },
  "Gesamtzahl Kinder im Haushalt": { bs: "Ukupan broj djece u domaćinstvu", sr: "Ukupan broj dece u domaćinstvu", hr: "Ukupan broj djece u kućanstvu" },
  "Girokonto IBAN": { bs: "IBAN tekućeg računa" },
  "Guthaben (€)": { bs: "Stanje (€)" },
  "Haftpflichtversicherer": { bs: "Osiguravajuća kuća (odgovornost)" },
  "Ich beantrage Bonusmonate": { bs: "Tražim bonus mjesece", sr: "Tražim bonus mesece", hr: "Tražim bonus mjesece" },
  "Ich beantrage ElterngeldPlus": { bs: "Tražim Elterngeld Plus" },
  "Ich beantrage ausschließlich BasisElterngeld": { bs: "Tražim isključivo osnovni Elterngeld" },
  "Immatrikuliert / eingeschrieben seit": { bs: "Upisan/upisana od" },
  "In Kombination mit BasisElterngeld": { bs: "U kombinaciji s osnovnim Elterngeld-om" },
  "KV-Nummer": { bs: "Broj zdravstvenog osiguranja (KV-Nr.)" },
  "Kapitalerträge (€/Jahr)": { bs: "Prihodi od kapitala (€/godina)" },
  "Kasse": { bs: "Zdravstveni fond" },
  "Kindergeld (€/Mon.)": { bs: "Kindergeld (€/mjesec)", sr: "Kindergeld (€/mesec)", hr: "Kindergeld (€/mjesec)" },
  "Kontoinhaber/in (wenn nicht Antragsteller/in)": { bs: "Vlasnik računa (ako nije podnosilac)" },
  "Kryptowährungen (€)": { bs: "Kriptovalute (€)" },
  "Kündigungsfrist": { bs: "Otkazni rok" },
  "Lebensversicherung / Rückkaufwert (€)": { bs: "Životno osiguranje / otkupna vrijednost (€)", sr: "Životno osiguranje / otkupna vrednost (€)", hr: "Životno osiguranje / otkupna vrijednost (€)" },
  "Lebensversicherung Rückkaufwert (€)": { bs: "Životno osiguranje — otkupna vrijednost (€)", sr: "Životno osiguranje — otkupna vrednost (€)", hr: "Životno osiguranje — otkupna vrijednost (€)" },
  "Letzter Bruttolohn (€/Monat)": { bs: "Posljednja bruto plaća (€/mjesec)", sr: "Poslednja bruto plata (€/mesec)", hr: "Posljednja bruto plaća (€/mjesec)" },
  "Letzte Berufsbezeichnung": { bs: "Posljednje zanimanje", sr: "Poslednje zanimanje", hr: "Posljednje zanimanje" },
  "Marke/Modell": { bs: "Marka/model" },
  "Max. Wochenstunden": { bs: "Maks. sati sedmično", sr: "Maks. sati nedeljno", hr: "Maks. sati tjedno" },
  "Mieteinnahmen": { bs: "Prihodi od najma" },
  "Mieteinnahmen (€/Monat)": { bs: "Prihodi od najma (€/mjesec)", sr: "Prihodi od najma (€/mesec)", hr: "Prihodi od najma (€/mjesec)" },
  "Mietvertrag seit (Datum)": { bs: "Ugovor o najmu od (datum)" },
  "Mitgliedsnummer": { bs: "Broj članstva" },
  "Monat/Jahr": { bs: "Mjesec/godina", sr: "Mesec/godina", hr: "Mjesec/godina" },
  "Monatliche Miete (€)": { bs: "Mjesečna kirija (€)", sr: "Mesečna kirija (€)", hr: "Mjesečna najamnina (€)" },
  "Monatliche Miete / Heimkosten (€)": { bs: "Mjesečna kirija / troškovi doma (€)", sr: "Mesečna kirija / troškovi doma (€)", hr: "Mjesečna najamnina / troškovi doma (€)" },
  "Monatliche Kosten an Verwandte": { bs: "Mjesečni troškovi rodbini", sr: "Mesečni troškovi rodbini", hr: "Mjesečni troškovi rodbini" },
  "Monatlicher Eigenanteil (€)": { bs: "Mjesečno vlastito učešće (€)", sr: "Mesečno vlastito učešće (€)", hr: "Mjesečno vlastito sudjelovanje (€)" },
  "Monatlicher PKV-Beitrag": { bs: "Mjesečni doprinos privatnog osiguranja (PKV)", sr: "Mesečni doprinos privatnog osiguranja (PKV)", hr: "Mjesečni doprinos privatnog osiguranja (PKV)" },
  "Monatliches Nettoeinkommen": { bs: "Mjesečni neto prihod", sr: "Mesečni neto prihod", hr: "Mjesečni neto prihod" },
  "Mutterschutzfrist vom": { bs: "Porodiljsko od" },
  "Muttersprache": { bs: "Maternji jezik", sr: "Maternji jezik", hr: "Materinji jezik" },
  "Nachname des Kindes": { bs: "Prezime djeteta", sr: "Prezime deteta", hr: "Prezime djeteta" },
  "Nachweis (Bürgergeld / Grundsicherung)": { bs: "Dokaz (Bürgergeld / Grundsicherung)" },
  "Name / Firma": { bs: "Ime / firma" },
  "Name / Firma des Vermieters": { bs: "Ime / firma najmodavca" },
  "Name der Behörde / des Arbeitgebers": { bs: "Naziv ureda / poslodavca" },
  "Name der Einrichtung": { bs: "Naziv ustanove" },
  "Name der Hochschule / Schule": { bs: "Naziv fakulteta / škole" },
  "Name der Schule": { bs: "Naziv škole" },
  "Name der Versicherung": { bs: "Naziv osiguranja" },
  "Name des Anwalts": { bs: "Ime advokata", sr: "Ime advokata", hr: "Ime odvjetnika" },
  "Name des Arbeitgebers": { bs: "Naziv poslodavca" },
  "Name des Unternehmens": { bs: "Naziv firme", sr: "Naziv firme", hr: "Naziv tvrtke" },
  "Netto Arbeit (€/Mon.)": { bs: "Neto od rada (€/mjesec)", sr: "Neto od rada (€/mesec)", hr: "Neto od rada (€/mjesec)" },
  "Nettoeinkommen (€/Monat)": { bs: "Neto prihod (€/mjesec)", sr: "Neto prihod (€/mesec)", hr: "Neto prihod (€/mjesec)" },
  "Nettolohn (€/Monat)": { bs: "Neto plaća (€/mjesec)", sr: "Neto plata (€/mesec)", hr: "Neto plaća (€/mjesec)" },
  "PLZ / Wohnort": { bs: "PŠT / mjesto stanovanja", sr: "PŠT / mesto stanovanja", hr: "PŠT / mjesto stanovanja" },
  "Patient Nachname": { bs: "Prezime pacijenta" },
  "Patient Vorname": { bs: "Ime pacijenta" },
  "Priv. Rentenversicherung (€)": { bs: "Privatna penziona štednja (€)", sr: "Privatna penziona štednja (€)", hr: "Privatno mirovinsko osiguranje (€)" },
  "RV-Nummer": { bs: "Broj penzionog osiguranja (RV-Nr.)", sr: "Broj penzionog osiguranja (RV-Nr.)", hr: "Broj mirovinskog osiguranja (RV-Nr.)" },
  "Rente (€/Mon.)": { bs: "Penzija (€/mjesec)", sr: "Penzija (€/mesec)", hr: "Mirovina (€/mjesec)" },
  "Rente / Einkommen (€/Monat netto)": { bs: "Penzija / prihod (€/mjesec neto)", sr: "Penzija / prihod (€/mesec neto)", hr: "Mirovina / prihod (€/mjesec neto)" },
  "Rentenversicherungsnummer": { bs: "Broj penzionog osiguranja", sr: "Broj penzionog osiguranja", hr: "Broj mirovinskog osiguranja" },
  "Rentenversicherungsträger": { bs: "Nositelj penzionog osiguranja", sr: "Nosilac penzionog osiguranja", hr: "Nositelj mirovinskog osiguranja" },
  "Schadensnummer": { bs: "Broj štete" },
  "Schmuck / Kunst (€)": { bs: "Nakit / umjetnine (€)", sr: "Nakit / umetnine (€)", hr: "Nakit / umjetnine (€)" },
  "Schule / Kita": { bs: "Škola / vrtić" },
  "Schule/Hochschule": { bs: "Škola/fakultet" },
  "Sonstige Einnahmen: Art": { bs: "Ostali prihodi: vrsta" },
  "Sonstiges Vermögen: Art": { bs: "Ostala imovina: vrsta" },
  "Sonstiges: Art": { bs: "Ostalo: vrsta" },
  "Sorgerecht / Umgangsrecht": { bs: "Skrbništvo / pravo viđanja", sr: "Starateljstvo / pravo viđanja", hr: "Skrbništvo / pravo viđanja" },
  "Sozialversicherungsnummer": { bs: "Broj socijalnog osiguranja" },
  "Sozialversicherungsnummer (XX XXXXXX X XXX X)": { bs: "Broj socijalnog osiguranja (XX XXXXXX X XXX X)" },
  "Sparkonto / Tagesgeld (€)": { bs: "Štedni račun (€)" },
  "Stadt / Landkreis": { bs: "Grad / okrug" },
  "Straße / Hausnummer": { bs: "Ulica / kućni broj" },
  "Straße, Hausnummer": { bs: "Ulica, kućni broj" },
  "Strom (€/Monat)": { bs: "Struja (€/mjesec)", sr: "Struja (€/mesec)", hr: "Struja (€/mjesec)" },
  "Studiengang / Fachrichtung": { bs: "Smjer studija / struka", sr: "Smer studija / struka", hr: "Smjer studija / struka" },
  "Telefonnummer (freiwillig)": { bs: "Broj telefona (dobrovoljno)" },
  "Telefonnummer AG": { bs: "Broj telefona poslodavca" },
  "Unterhalt (€/Mon.)": { bs: "Alimentacija (€/mjesec)", sr: "Alimentacija (€/mesec)", hr: "Alimentacija (€/mjesec)" },
  "Unterhalt (€/Monat)": { bs: "Alimentacija (€/mjesec)", sr: "Alimentacija (€/mesec)", hr: "Alimentacija (€/mjesec)" },
  "Unterhalt an Antragsteller (€/Monat)": { bs: "Alimentacija podnosiocu (€/mjesec)", sr: "Alimentacija podnosiocu (€/mesec)", hr: "Alimentacija podnositelju (€/mjesec)" },
  "Unterhalt von Eltern (€/Monat)": { bs: "Alimentacija od roditelja (€/mjesec)", sr: "Alimentacija od roditelja (€/mesec)", hr: "Alimentacija od roditelja (€/mjesec)" },
  "Unterhaltszahlungen": { bs: "Plaćanja alimentacije" },
  "Unternehmensbeteiligungen (€)": { bs: "Udjeli u firmama (€)", sr: "Udeli u firmama (€)", hr: "Udjeli u tvrtkama (€)" },
  "Unterschrift Antragsteller/in": { bs: "Potpis podnosioca zahtjeva", sr: "Potpis podnosioca zahteva", hr: "Potpis podnositelja zahtjeva" },
  "Unterschrift Ehegatte/Partner 1": { bs: "Potpis bračnog partnera 1" },
  "Unterschrift Ehegatte/Partner 2": { bs: "Potpis bračnog partnera 2" },
  "Unterschrift Elternteil 1": { bs: "Potpis roditelja 1" },
  "Unterschrift Elternteil 1 (wenn minderjährig)": { bs: "Potpis roditelja 1 (ako je maloljetan)" },
  "Unterschrift Elternteil 2": { bs: "Potpis roditelja 2" },
  "Unterschrift Patient": { bs: "Potpis pacijenta" },
  "Unterschrift Schüler/in": { bs: "Potpis učenika/učenice" },
  "Unterschrift des Kindes / Jugendlichen (ab 15 J. obavezno)": { bs: "Potpis djeteta / mladog (od 15 god. obavezno)", sr: "Potpis deteta / mladog (od 15 god. obavezno)", hr: "Potpis djeteta / mladog (od 15 god. obavezno)" },
  "Unterschrift geschädigte Person": { bs: "Potpis oštećene osobe" },
  "Unterschrift und Firmenstempel": { bs: "Potpis i pečat firme", sr: "Potpis i pečat firme", hr: "Potpis i pečat tvrtke" },
  "Urlaub bis": { bs: "Godišnji do" },
  "Verwandtschaftsverhältnis zum Antragsteller": { bs: "Srodstveni odnos prema podnosiocu" },
  "Voraussichtlicher Entbindungstermin laut Mutterpass": { bs: "Predviđeni datum porođaja prema Mutterpass-u" },
  "Voraussichtliches Studienende": { bs: "Predviđeni kraj studija" },
  "Vorname(n) des Kindes": { bs: "Ime(na) djeteta", sr: "Ime(na) deteta", hr: "Ime(na) djeteta" },
  "Vorschuss-Betrag": { bs: "Iznos predujma" },
  "Warmwasser (€/Monat)": { bs: "Topla voda (€/mjesec)", sr: "Topla voda (€/mesec)", hr: "Topla voda (€/mjesec)" },
  "Weitere LM": { bs: "Naredni mjeseci", sr: "Naredni meseci", hr: "Naredni mjeseci" },
  "Weitere Sprachen": { bs: "Ostali jezici" },
  "Wertpapiere / Aktien (€)": { bs: "Vrijednosni papiri / dionice (€)", sr: "Vrednosni papiri / akcije (€)", hr: "Vrijednosni papiri / dionice (€)" },
  "Wir beanspruchen zusammen Partnerschaftsbonus": { bs: "Zajedno tražimo partnerski bonus" },
  "Witwen-/Witwerrente (€/Monat netto)": { bs: "Udovička penzija (€/mjesec neto)", sr: "Udovička penzija (€/mesec neto)", hr: "Udovička mirovina (€/mjesec neto)" },
  "Wochenarbeitszeit (Stunden)": { bs: "Sedmično radno vrijeme (sati)", sr: "Nedeljno radno vreme (sati)", hr: "Tjedno radno vrijeme (sati)" },
  "Wochenstunden zuletzt": { bs: "Sati sedmično (posljednji posao)", sr: "Sati nedeljno (poslednji posao)", hr: "Sati tjedno (posljednji posao)" },
  "Zeitraum von": { bs: "Period od" },
  "Zuletzt ausgeübter Beruf": { bs: "Posljednje obavljano zanimanje", sr: "Poslednje obavljano zanimanje", hr: "Posljednje obavljano zanimanje" },
  "Zuschuss nach beamtenrechtlichen Verordnungen": { bs: "Dodatak prema državno-službeničkim propisima" },
  "Zuständige Agentur für Arbeit": { bs: "Nadležna Agencija za rad (Agentur für Arbeit)" },
  "Zuständige Familienkasse": { bs: "Nadležna Familienkasse" },
  "Zuständige Wohngeldbehörde": { bs: "Nadležni ured za Wohngeld" },
  "Zuständiges Finanzamt": { bs: "Nadležni Finanzamt (porezni ured)", sr: "Nadležni Finanzamt (poreski ured)", hr: "Nadležni Finanzamt (porezni ured)" },
  "Zuständiges Sozialamt": { bs: "Nadležni Sozialamt (socijalni ured)" },
  "bei Agentur für Arbeit": { bs: "kod Agencije za rad" },
  "davon Garagenmiete (€/Monat)": { bs: "od toga najam garaže (€/mjesec)", sr: "od toga najam garaže (€/mesec)", hr: "od toga najam garaže (€/mjesec)" },
  "davon Heizkosten (€/Monat)": { bs: "od toga grijanje (€/mjesec)", sr: "od toga grejanje (€/mesec)", hr: "od toga grijanje (€/mjesec)" },
  "davon Warmwasserkosten (€/Monat)": { bs: "od toga topla voda (€/mjesec)", sr: "od toga topla voda (€/mesec)", hr: "od toga topla voda (€/mjesec)" },
  "geb. am": { bs: "rođ. dana" },
  "seit/ab": { bs: "od (datuma)" },
  "vom": { bs: "od" },
  "zum": { bs: "na" },
  "Wer erhält Unterstützung?": { bs: "Ko prima podršku?", sr: "Ko prima podršku?", hr: "Tko prima podršku?" },
  "Wie oft?": { bs: "Koliko često?" },
  "Krankheitsbild": { bs: "Klinička slika" },
  "Tag des Unfalls": { bs: "Dan nesreće", sr: "Dan nesreće", hr: "Dan nesreće" },
  "Ort des Unfalls": { bs: "Mjesto nesreće", sr: "Mesto nesreće", hr: "Mjesto nesreće" },
  "Beschreibung der Verletzungen": { bs: "Opis povreda", sr: "Opis povreda", hr: "Opis ozljeda" },
  "Ansprechpartner Entgelt": { bs: "Kontakt osoba za platu", sr: "Kontakt osoba za platu", hr: "Kontakt osoba za plaću" },
  "Ansprechpartner Personal": { bs: "Kontakt osoba u kadrovskoj" },
  "BG-Person Vorname": { bs: "Ime osobe u zajednici (BG)" },
  "BG-Person Nachname": { bs: "Prezime osobe u zajednici (BG)" },
  "Art des besonderen Bedarfs": { bs: "Vrsta posebne potrebe" },
  "Antragsdatum (ursprünglicher Bürgergeld-Antrag)": { bs: "Datum prvobitnog Bürgergeld zahtjeva", sr: "Datum prvobitnog Bürgergeld zahteva", hr: "Datum prvobitnog Bürgergeld zahtjeva" },
  "Begründung (Pflicht)": { bs: "Obrazloženje (obavezno)" },
  "Beschäftigungsort": { bs: "Mjesto zaposlenja", sr: "Mesto zaposlenja", hr: "Mjesto zaposlenja" },
  "Enddatum": { bs: "Datum završetka" },
  "Kündigung am": { bs: "Otkaz dana" },
  "Abfindung (Brutto)": { bs: "Otpremnina (bruto)" },
  "Bargeld (€)": { bs: "Gotovina (€)" },
  "Eigenes Vermögen (€)": { bs: "Vlastita imovina (€)" },
};

// ============================================================
//  EXAMPLES — bilingual placeholder hints below each input.
//  Used by Field when no explicit `example` prop is provided.
//  Mirrors the visa form aesthetic (z.B. Mustermann).
// ============================================================
const EXAMPLES: Record<string, string> = {
  "Vorname": "MAX",
  "Vorname(n)": "MAX",
  "Vorname(n) (Rufname in Großbuchstaben)": "MAX",
  "Familienname": "Mustermann",
  "Familienname, ggf. frühere(r) Name(n)": "Mustermann",
  "Nachname": "Mustermann",
  "Geburtsname": "Hodžić",
  "Geburtsname (falls abweichend)": "Hodžić",
  "Titel": "Dr.",
  "Geburtsdatum": "01.01.1990",
  "Geburtsdatum (tt.mm.jjjj)": "01.01.1990",
  "Geburtsort": "Sarajevo",
  "Geburtsland": "Bosnien und Herzegowina",
  "Staatsangehörigkeit": "bosnisch-herzegowinisch",
  "Staatsangehörigkeit (1.)": "bosnisch-herzegowinisch",
  "ggf. 2. Staatsangehörigkeit": "deutsch",
  "Eventuell frühere Staatsangehörigkeit(en)": "keine",
  "Religionszugehörigkeit (freiwillig)": "römisch-katholisch / islamisch / ohne",
  "Größe (cm)": "180",
  "Augenfarbe": "braun",

  "Anschrift": "Musterstraße 1, 99001 Erfurt",
  "Anschrift (Straße, Hausnummer)": "Musterstraße 1",
  "Straße": "Musterstraße",
  "Straße, Hausnr.": "Musterstraße 1",
  "Hausnummer": "1",
  "PLZ": "99001",
  "Postleitzahl": "99001",
  "Wohnort": "Erfurt",
  "Ort": "Erfurt",
  "Staat": "Deutschland",
  "Land": "Deutschland",
  "Einzugsdatum (tt.mm.jjjj)": "15.03.2025",
  "Ersteinreise am": "15.03.2025",

  "Telefon": "+49 123 456789",
  "Tel.": "+49 123 456789",
  "E-Mail": "max.mustermann@email.de",

  "Steuerliche Identifikationsnummer": "12 345 678 901",
  "Steuerliche Identifikationsnummer (zwingend auszufüllen)": "12 345 678 901",
  "Steuer-ID des Kindes": "12 345 678 901",
  "Ausweisnummer": "T220000129",
  "Dokumentnummer": "T220000129",
  "Ausgestellt am": "01.01.2020",
  "Gültig bis": "31.12.2030",

  "IBAN": "DE89 3704 0044 0532 0130 00",
  "BIC": "COBADEFFXXX",
  "Bank / Finanzinstitut": "Commerzbank",
  "Versicherung": "TK – Techniker Krankenkasse",
  "Krankenkasse": "TK – Techniker Krankenkasse",
  "Krankenversicherung": "TK – Techniker Krankenkasse",

  "Datum": "[današnji datum]",
  "Ort, Datum": "Erfurt, [datum]",
  "Unterschrift": "[potpis]",

  "Monatlicher Netto-Verdienst": "2.800 €",
  "Bruttoeinkommen (€/Monat)": "3.500 €",
  "Nettoeinkommen": "2.200 €",
  "Bruttoeinkommen": "3.500 €",
  "Monatliches Einkommen": "2.200 €",
  "Bei / Als": "TechGmbH München / Softwareentwickler",
  "Beruf": "Softwareentwickler",
  "Beruf / Tätigkeit": "Softwareentwickler",
  "Arbeitgeber": "TechGmbH München",
  "Wochenstunden": "40",
  "Arbeitszeit (Stunden/Woche)": "40",

  "Kaltmiete (€/Monat)": "650 €",
  "Warmmiete (€/Monat)": "850 €",
  "Heizkosten (€/Monat)": "120 €",
  "Nebenkosten (€/Monat)": "180 €",
  "Wohnfläche (m²)": "65",
  "Anzahl der Zimmer": "2",
  "Anzahl Personen im Haushalt": "3",
  "Anzahl der Kinder": "2",

  "Voraussichtlicher Geburtstermin": "15.07.2026",
  "Tatsächlicher Geburtstermin": "12.07.2026",
  "Name des Kindes": "Ana Mustermann",
  "Geburtsdatum des Kindes": "12.07.2026",

  "Aktenzeichen": "ABC-2026-001",
  "BG-Nummer": "12345BG6789",
  "Kundennummer": "1234567890",
  "Verwendungszweck": "Bewerbung als Erzieher",
  "Behörde": "Stadtverwaltung Erfurt",
  "Empfänger": "Jobcenter Erfurt",

  "Studienfach": "Informatik",
  "Fachsemester": "3",
  "Hochschulsemester": "3",
  "Schule / Hochschule": "Universität Erfurt",
  "Ausbildungsbeginn": "01.10.2025",
  "Ausbildungsende": "30.09.2028",
  "Ausbildungsstätte": "TU München",
};

const lower: Record<string, Entry> = {};
for (const [k, v] of Object.entries(DICT)) lower[k.toLowerCase()] = v;

const exLower: Record<string, string> = {};
for (const [k, v] of Object.entries(EXAMPLES)) exLower[k.toLowerCase()] = v;

/**
 * Strip leading numbering like "1. ", "10. ", "12.", "A. " etc.
 * so that "1. Vorname" matches the dictionary entry "Vorname".
 */
function stripNumberPrefix(s: string): string {
  return s.replace(/^\s*(?:\d{1,3}|[A-Z])\.\s+/, "").trim();
}

function lookupEntry(deLabel: string): Entry | null {
  return (
    DICT[deLabel] ??
    lower[deLabel.toLowerCase()] ??
    DICT[stripNumberPrefix(deLabel)] ??
    lower[stripNumberPrefix(deLabel).toLowerCase()] ??
    null
  );
}

/**
 * Returns the translation only (without the German term).
 * Renderer uses this to stack the translation as a second line under the German label.
 */
export function tTranslation(deLabel: string, lang: Lang): string | null {
  if (!deLabel || lang === "de") return null;
  const entry = lookupEntry(deLabel);
  if (!entry) return null;
  const translated =
    lang === "hr" ? entry.hr ?? entry.bs :
    lang === "sr" ? entry.sr ?? entry.bs :
    entry.bs;
  if (!translated || translated === deLabel) return null;
  return translated;
}

/**
 * Translate a German form label to "German (Translation)".
 * Kept for backward compatibility with section headers and option text.
 */
export function tLabel(deLabel: string, lang: Lang): string {
  if (!deLabel) return deLabel;
  if (lang === "de") return deLabel;
  const t = tTranslation(deLabel, lang);
  return t ? `${deLabel} (${t})` : deLabel;
}

/** Same as tLabel but for short option strings inside checkbox/radio groups. */
export function tOption(deOption: string, lang: Lang): string {
  return tLabel(deOption, lang);
}

/** Lookup a default visa-style example for a given German label. */
export function getExample(deLabel: string): string | null {
  if (!deLabel) return null;
  return (
    EXAMPLES[deLabel] ??
    exLower[deLabel.toLowerCase()] ??
    EXAMPLES[stripNumberPrefix(deLabel)] ??
    exLower[stripNumberPrefix(deLabel).toLowerCase()] ??
    null
  );
}
