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
