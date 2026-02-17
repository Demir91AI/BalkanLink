export interface GuideStep {
  field: string;
  instruction: string;
}

export interface Guide {
  slug: string;
  category: "familie" | "wohnen" | "arbeit" | "gesundheit" | "bildung";
  title: { de: string; bs: string; en: string };
  who: { de: string; bs: string; en: string };
  authority: { de: string; bs: string; en: string };
  formName: { de: string; bs: string; en: string };
  steps: { de: GuideStep[]; bs: GuideStep[]; en: GuideStep[] };
  documents: { de: string[]; bs: string[]; en: string[] };
  processingTime: { de: string; bs: string; en: string };
  commonMistakes: { de: string[]; bs: string[]; en: string[] };
  /** URL to official PDF form. Empty string if no real PDF exists. */
  officialPdf: string;
  /** URL to official online portal for digital application. Empty string if none exists. */
  onlineLink: string;
  /** URL to official info page (used when neither PDF nor portal exist). */
  officialInfoUrl?: string;
}

export const guides: Guide[] = [
  // ===================== FAMILIE =====================
  {
    slug: "kindergeld",
    category: "familie",
    title: { de: "Kindergeld", bs: "Dječji dodatak (Kindergeld)", en: "Child Benefit (Kindergeld)" },
    who: {
      de: "Eltern mit Wohnsitz in Deutschland, für jedes Kind unter 18 (bis 25 bei Ausbildung/Studium).",
      bs: "Roditelji sa prebivalištem u Njemačkoj, za svako dijete do 18. godine (do 25. uz školovanje).",
      en: "Parents residing in Germany, for each child under 18 (up to 25 if in education).",
    },
    authority: {
      de: "Familienkasse der Bundesagentur für Arbeit",
      bs: "Familienkasse pri Saveznoj agenciji za rad",
      en: "Family Benefits Office (Familienkasse)",
    },
    formName: {
      de: "Antrag auf Kindergeld (KG1)",
      bs: "Zahtjev za dječji dodatak (KG1)",
      en: "Application for Child Benefit (KG1)",
    },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Tragen Sie Ihren vollständigen Vor- und Nachnamen, Geburtsdatum und Ihre 11-stellige Steuer-ID ein. Diese finden Sie auf Ihrem Steuerbescheid oder der Lohnsteuerbescheinigung." },
        { field: "Anschrift", instruction: "Geben Sie Ihre aktuelle Meldeadresse vollständig an (Straße, Hausnummer, PLZ, Ort). Diese muss mit der Meldebescheinigung übereinstimmen." },
        { field: "Bankverbindung", instruction: "Tragen Sie IBAN und BIC Ihres Kontos ein. Das Kindergeld wird nur auf ein Konto des Antragstellers überwiesen – kein Fremdkonto möglich." },
        { field: "Angaben zum Kind", instruction: "Name, Geburtsdatum und 11-stellige Steuer-ID des Kindes eintragen. Falls das Kind im Ausland geboren wurde: Geburtsurkunde mit beglaubigter Übersetzung beifügen." },
        { field: "Anlage Kind", instruction: "Für jedes Kind eine separate Anlage Kind (KG1-AnlKi) ausfüllen. Dort wird u.a. abgefragt, ob das Kind in Ausbildung ist, eine Behinderung hat oder bei welchem Elternteil es lebt." },
      ],
      bs: [
        { field: "Podnosilac zahtjeva", instruction: "Unesite puno ime i prezime, datum rođenja i vaš 11-cifreni porezni ID (Steuer-ID). Nalazi se na poreznom rješenju ili platnoj listi." },
        { field: "Adresa", instruction: "Navedite trenutnu prijavljenu adresu u cijelosti (ulica, broj, poštanski broj, grad)." },
        { field: "Bankovni podaci", instruction: "Unesite IBAN i BIC vašeg računa. Isplata ide isključivo na račun podnosioca." },
        { field: "Podaci o djetetu", instruction: "Ime, datum rođenja i porezni ID djeteta. Za djecu rođenu u inostranstvu: priložiti rodni list sa ovjerenim prijevodom." },
        { field: "Prilog Dijete", instruction: "Za svako dijete popuniti poseban prilog (KG1-AnlKi)." },
      ],
      en: [
        { field: "Applicant", instruction: "Enter your full name, date of birth, and 11-digit tax ID (Steuer-ID). Found on your tax notice or payslip." },
        { field: "Address", instruction: "Full current registered address (street, number, postal code, city)." },
        { field: "Bank details", instruction: "Enter IBAN and BIC. Payment is only made to the applicant's own account." },
        { field: "Child information", instruction: "Name, date of birth, tax ID of the child. For children born abroad: attach birth certificate with certified translation." },
        { field: "Child Attachment", instruction: "Fill out a separate attachment (KG1-AnlKi) for each child." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Meldebescheinigung", "Steuer-ID (Antragsteller + Kind)", "Aufenthaltstitel (bei Nicht-EU-Bürgern)", "Ggf. Schulbescheinigung (ab 18 Jahre)"],
      bs: ["Rodni list djeteta", "Potvrda o prijavi", "Porezni ID (podnosilac + dijete)", "Boravišna dozvola (za ne-EU državljane)", "Potvrda škole (od 18 godina)"],
      en: ["Child's birth certificate", "Registration certificate", "Tax ID (applicant + child)", "Residence permit (non-EU citizens)", "School certificate (from age 18)"],
    },
    processingTime: { de: "4–6 Wochen", bs: "4–6 sedmica", en: "4–6 weeks" },
    commonMistakes: {
      de: ["Steuer-ID des Kindes vergessen", "Anlage Kind nicht beigefügt", "Unterschrift fehlt", "Bankverbindung eines Dritten angegeben"],
      bs: ["Zaboravljen porezni ID djeteta", "Prilog Dijete nije priložen", "Nedostaje potpis", "Navedeni tuđi bankovni podaci"],
      en: ["Missing child's tax ID", "Child attachment not included", "Missing signature", "Third-party bank details provided"],
    },
    officialPdf: "https://www.arbeitsagentur.de/datei/antrag-auf-kindergeld_ba015394.pdf",
    onlineLink: "https://web.arbeitsagentur.de/opal/kgo-start",
  },
  {
    slug: "kinderzuschlag",
    category: "familie",
    title: { de: "Kinderzuschlag", bs: "Dodatak za djecu (Kinderzuschlag)", en: "Child Supplement (Kinderzuschlag)" },
    who: {
      de: "Eltern mit niedrigem Einkommen, die Kindergeld beziehen und nicht auf Bürgergeld angewiesen sind.",
      bs: "Roditelji sa niskim primanjima koji primaju Kindergeld i ne zavise od Bürgergeld-a.",
      en: "Low-income parents receiving child benefit who don't depend on Bürgergeld.",
    },
    authority: { de: "Familienkasse", bs: "Familienkasse", en: "Family Benefits Office" },
    formName: { de: "Antrag auf Kinderzuschlag (KiZ 1)", bs: "Zahtjev za Kinderzuschlag (KiZ 1)", en: "Application for Child Supplement (KiZ 1)" },
    steps: {
      de: [
        { field: "Personalien", instruction: "Vollständige persönliche Daten des Antragstellers eintragen: Name, Geburtsdatum, Steuer-ID, Familienstand." },
        { field: "Einkommen", instruction: "Brutto- und Nettoeinkommen aller Haushaltsmitglieder der letzten 6 Monate angeben. Dazu zählen Lohn, Kindergeld, Unterhalt, Mieteinnahmen etc." },
        { field: "Wohnkosten", instruction: "Kaltmiete, Nebenkosten und Heizkosten getrennt eintragen. Beträge aus dem Mietvertrag und der letzten Nebenkostenabrechnung übernehmen." },
        { field: "Vermögen", instruction: "Sparguthaben, Wertpapiere, Immobilienbesitz und Lebensversicherungen aller Haushaltsmitglieder angeben. Freibeträge beachten." },
      ],
      bs: [
        { field: "Lični podaci", instruction: "Unesite potpune lične podatke: ime, datum rođenja, porezni ID, bračni status." },
        { field: "Primanja", instruction: "Bruto i neto primanja svih članova domaćinstva za zadnjih 6 mjeseci." },
        { field: "Troškovi stanovanja", instruction: "Hladna kirija, režije i grijanje odvojeno navesti." },
        { field: "Imovina", instruction: "Štednja, vrijednosni papiri, nekretnine svih članova domaćinstva." },
      ],
      en: [
        { field: "Personal data", instruction: "Complete personal details: name, date of birth, tax ID, marital status." },
        { field: "Income", instruction: "Gross and net income of all household members for the last 6 months." },
        { field: "Housing costs", instruction: "Cold rent, utilities, and heating costs listed separately." },
        { field: "Assets", instruction: "Savings, securities, real estate of all household members." },
      ],
    },
    documents: {
      de: ["Einkommensnachweise (letzte 6 Monate)", "Mietvertrag + letzte Nebenkostenabrechnung", "Kontoauszüge (3 Monate)", "Kindergeld-Bescheid"],
      bs: ["Dokaz o primanjima (zadnjih 6 mjeseci)", "Ugovor o najmu + zadnji obračun režija", "Izvodi iz računa (3 mjeseca)", "Rješenje o Kindergeld-u"],
      en: ["Income proof (last 6 months)", "Rental contract + last utility bill", "Bank statements (3 months)", "Kindergeld notice"],
    },
    processingTime: { de: "6–8 Wochen", bs: "6–8 sedmica", en: "6–8 weeks" },
    commonMistakes: {
      de: ["Einkommensnachweise unvollständig (alle 6 Monate nötig)", "Mietvertrag fehlt", "Vermögen nicht oder falsch angegeben", "Nebenkosten nicht von Kaltmiete getrennt"],
      bs: ["Nepotpuni dokazi o primanjima", "Nedostaje ugovor o najmu", "Imovina nije navedena ili pogrešno", "Režije nisu odvojene od hladne kirije"],
      en: ["Incomplete income proof (all 6 months needed)", "Missing rental contract", "Assets not declared or incorrect", "Utilities not separated from cold rent"],
    },
    officialPdf: "https://www.arbeitsagentur.de/datei/antrag-auf-kinderzuschlag_ba013100.pdf",
    onlineLink: "https://web.arbeitsagentur.de/kiz/ui/start",
  },
  {
    slug: "elterngeld",
    category: "familie",
    title: { de: "Elterngeld", bs: "Roditeljski dodatak (Elterngeld)", en: "Parental Allowance (Elterngeld)" },
    who: {
      de: "Eltern, die nach der Geburt ihr Kind selbst betreuen und nicht mehr als 32h/Woche arbeiten.",
      bs: "Roditelji koji nakon porođaja sami brinu o djetetu i rade max. 32h sedmično.",
      en: "Parents caring for their child after birth, working max. 32h/week.",
    },
    authority: { de: "Elterngeldstelle des jeweiligen Bundeslandes", bs: "Služba za roditeljski dodatak savezne države", en: "Parental Allowance Office of the respective state" },
    formName: { de: "Antrag auf Elterngeld", bs: "Zahtjev za roditeljski dodatak", en: "Application for Parental Allowance" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Persönliche Daten beider Elternteile eintragen: Name, Geburtsdatum, Steuer-ID, Staatsangehörigkeit." },
        { field: "Lebensmonate", instruction: "Bezugsmonate festlegen: Basiselterngeld (max. 14 Monate zu zweit) oder ElterngeldPlus (doppelte Anzahl, halber Betrag). Partnermonate beachten." },
        { field: "Einkommen vor Geburt", instruction: "Einkommensnachweise der letzten 12 Monate vor der Geburt beifügen. Bei Selbständigen: letzter Steuerbescheid. Elterngeld beträgt 65–67% des Nettoeinkommens." },
        { field: "Erwerbstätigkeit während Bezug", instruction: "Geplante Arbeitszeit während des Bezugs angeben (max. 32h/Woche). Einkommen während Elterngeldbezug wird angerechnet." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Lični podaci oba roditelja: ime, datum rođenja, porezni ID, državljanstvo." },
        { field: "Mjeseci korištenja", instruction: "Odrediti mjesece: Basiselterngeld (max. 14 mjeseci za oboje) ili ElterngeldPlus." },
        { field: "Primanja prije rođenja", instruction: "Dokazi o primanjima 12 mjeseci prije porođaja. Elterngeld iznosi 65–67% neto primanja." },
        { field: "Zaposlenje tokom korištenja", instruction: "Planirano radno vrijeme (max. 32h sedmično)." },
      ],
      en: [
        { field: "Applicant", instruction: "Personal data of both parents: name, date of birth, tax ID, nationality." },
        { field: "Benefit months", instruction: "Define months: basic (max. 14 months for both) or ElterngeldPlus." },
        { field: "Pre-birth income", instruction: "Income proof for 12 months before birth. Elterngeld = 65–67% of net income." },
        { field: "Employment during benefit", instruction: "Planned working hours (max. 32h/week)." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde (Original)", "Gehaltsnachweise (12 Monate vor Geburt)", "Bescheinigung des Arbeitgebers über Elternzeit", "Krankenversicherungsnachweis", "Mutterschaftsgeldbescheinigung"],
      bs: ["Rodni list (original)", "Platne liste (12 mjeseci prije porođaja)", "Potvrda poslodavca o roditeljskom odsustvu", "Dokaz o zdravstvenom osiguranju", "Potvrda o porodiljskom dodatku"],
      en: ["Birth certificate (original)", "Salary slips (12 months before birth)", "Employer certificate for parental leave", "Health insurance proof", "Maternity benefit certificate"],
    },
    processingTime: { de: "6–12 Wochen", bs: "6–12 sedmica", en: "6–12 weeks" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt (max. 3 Monate rückwirkend!)", "Falsche Lebensmonate gewählt", "Fehlende Arbeitgeberbescheinigung über Elternzeit", "Einkommen während Bezug nicht angegeben"],
      bs: ["Zahtjev predan prekasno (max. 3 mjeseca retroaktivno!)", "Pogrešni mjeseci odabrani", "Nedostaje potvrda poslodavca", "Primanja tokom korištenja nisu navedena"],
      en: ["Application too late (max 3 months retroactive!)", "Wrong months selected", "Missing employer certificate", "Income during benefit not declared"],
    },
    officialPdf: "",
    onlineLink: "https://www.elterngeld-digital.de",
    officialInfoUrl: "https://familienportal.de/familienportal/familienleistungen/elterngeld",
  },
  {
    slug: "bildung-teilhabe",
    category: "familie",
    title: { de: "Bildungs- und Teilhabepaket", bs: "Paket obrazovanja i učešća (BuT)", en: "Education & Participation Package (BuT)" },
    who: {
      de: "Familien, die Bürgergeld, Wohngeld, Kinderzuschlag oder Asylbewerberleistungen erhalten.",
      bs: "Porodice koje primaju Bürgergeld, Wohngeld, Kinderzuschlag ili pomoć za azilante.",
      en: "Families receiving Bürgergeld, housing benefit, child supplement, or asylum benefits.",
    },
    authority: { de: "Jobcenter oder Kommune (je nach Grundleistung)", bs: "Jobcenter ili općina (zavisno od osnovne naknade)", en: "Jobcenter or municipality (depending on base benefit)" },
    formName: { de: "Antrag auf Leistungen für Bildung und Teilhabe", bs: "Zahtjev za obrazovne i participativne usluge", en: "Application for Education and Participation Benefits" },
    steps: {
      de: [
        { field: "Leistungsart ankreuzen", instruction: "Gewünschte Leistung ankreuzen: Schulbedarf (195 € pro Jahr), Lernförderung/Nachhilfe, Mittagessen in Schule/Kita, Schülerbeförderung, Klassenfahrten/Ausflüge, Sport-/Kultur-/Freizeitaktivitäten (15 €/Monat)." },
        { field: "Kind", instruction: "Name, Geburtsdatum und Schule/Kita des Kindes angeben. Klasse und Schulform eintragen." },
        { field: "Grundleistung nachweisen", instruction: "Aktuellen Bescheid über Bürgergeld, Wohngeld oder Kinderzuschlag beifügen – dieser ist der Nachweis für die BuT-Berechtigung." },
        { field: "Bestätigungen einholen", instruction: "Je nach Leistung: Bestätigung der Schule über Klassenfahrt, Bestätigung des Vereins über Mitgliedschaft, Bestätigung des Nachhilfeanbieters." },
      ],
      bs: [
        { field: "Označiti vrstu usluge", instruction: "Označiti: školski materijal, dopunska nastava, ručak, prijevoz, izleti, sport/kultura." },
        { field: "Dijete", instruction: "Ime, datum rođenja, škola/vrtić, razred." },
        { field: "Dokazati osnovu", instruction: "Priložiti aktuelno rješenje o Bürgergeld, Wohngeld ili Kinderzuschlag." },
        { field: "Pribaviti potvrde", instruction: "Potvrda škole o izletu, potvrda kluba o članstvu itd." },
      ],
      en: [
        { field: "Check benefit type", instruction: "Check desired benefit: school supplies, tutoring, school lunch, transport, trips, sports/culture." },
        { field: "Child", instruction: "Name, date of birth, school/daycare, grade." },
        { field: "Prove base benefit", instruction: "Attach current Bürgergeld, Wohngeld, or Kinderzuschlag notice." },
        { field: "Obtain confirmations", instruction: "School confirmation for trips, club confirmation for membership, etc." },
      ],
    },
    documents: {
      de: ["Aktueller Leistungsbescheid (Bürgergeld/Wohngeld/KiZ)", "Schulbescheinigung", "Bestätigung des Vereins/der Schule", "Ggf. Kostenvoranschlag für Nachhilfe"],
      bs: ["Aktuelno rješenje (Bürgergeld/Wohngeld/KiZ)", "Potvrda škole", "Potvrda kluba/škole", "Eventualno ponuda za instrukcije"],
      en: ["Current benefit notice", "School certificate", "Club/school confirmation", "Quote for tutoring if applicable"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Keine Schulbescheinigung beigefügt", "Falsche Leistungsart angekreuzt", "Leistungsbescheid abgelaufen – aktuellen Bescheid beifügen", "Antrag erst nach der Klassenfahrt gestellt"],
      bs: ["Nije priložena potvrda škole", "Pogrešna vrsta usluge označena", "Isteklo rješenje", "Zahtjev podnesen nakon izleta"],
      en: ["No school certificate attached", "Wrong benefit type checked", "Expired benefit notice", "Application filed after the trip"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
  },
  {
    slug: "unterhaltsvorschuss",
    category: "familie",
    title: { de: "Unterhaltsvorschuss", bs: "Alimentacijski predujam (Unterhaltsvorschuss)", en: "Maintenance Advance (Unterhaltsvorschuss)" },
    who: {
      de: "Alleinerziehende, deren Kind keinen oder unregelmäßigen Unterhalt vom anderen Elternteil erhält.",
      bs: "Samohrani roditelji čije dijete ne prima ili neredovno prima alimentaciju.",
      en: "Single parents whose child receives no or irregular maintenance from the other parent.",
    },
    authority: { de: "Jugendamt der Stadt/Gemeinde", bs: "Jugendamt grada/općine", en: "Youth Welfare Office (Jugendamt)" },
    formName: { de: "Antrag auf Unterhaltsvorschuss", bs: "Zahtjev za alimentacijski predujam", en: "Application for Maintenance Advance" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Daten des alleinerziehenden Elternteils: Name, Anschrift, Geburtsdatum, Familienstand (ledig/geschieden/getrennt lebend)." },
        { field: "Kind", instruction: "Name, Geburtsdatum, bei wem das Kind lebt. Wichtig: Das Kind muss beim Antragsteller gemeldet sein." },
        { field: "Unterhaltspflichtiger", instruction: "Name, letzte bekannte Anschrift, Arbeitgeber des anderen Elternteils – soweit bekannt. Auch 'unbekannt' ist möglich, muss aber begründet werden." },
        { field: "Bemühungen um Unterhalt", instruction: "Angeben, welche Schritte unternommen wurden, um Unterhalt zu erhalten (z.B. Anwalt, Jugendamt-Beistandschaft, Vollstreckung)." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Podaci samohranog roditelja: ime, adresa, datum rođenja, bračni status." },
        { field: "Dijete", instruction: "Ime, datum rođenja, kod koga dijete živi. Dijete mora biti prijavljeno kod podnosioca." },
        { field: "Obveznik alimentacije", instruction: "Ime, zadnja poznata adresa, poslodavac drugog roditelja. Može biti i 'nepoznato' uz obrazloženje." },
        { field: "Pokušaji ostvarivanja alimentacije", instruction: "Navesti poduzete korake za dobijanje alimentacije." },
      ],
      en: [
        { field: "Applicant", instruction: "Single parent's data: name, address, date of birth, marital status." },
        { field: "Child", instruction: "Name, date of birth, who the child lives with. Child must be registered with applicant." },
        { field: "Liable parent", instruction: "Name, last known address, employer of other parent. 'Unknown' is possible but must be justified." },
        { field: "Efforts to obtain maintenance", instruction: "State what steps were taken to obtain maintenance." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Meldebescheinigung (Kind beim Antragsteller)", "Negativbescheinigung über Unterhalt oder Urteil", "Vaterschaftsanerkennung oder -feststellung"],
      bs: ["Rodni list djeteta", "Potvrda o prijavi (dijete kod podnosioca)", "Dokaz o neplaćanju alimentacije ili presuda", "Priznanje ili utvrđivanje očinstva"],
      en: ["Birth certificate", "Registration (child with applicant)", "Proof of non-payment or court ruling", "Paternity acknowledgment or determination"],
    },
    processingTime: { de: "4–8 Wochen", bs: "4–8 sedmica", en: "4–8 weeks" },
    commonMistakes: {
      de: ["Angaben zum unterhaltspflichtigen Elternteil fehlen komplett", "Kind nicht beim Antragsteller gemeldet", "Keine Nachweise über Bemühungen um Unterhalt", "Antrag nicht beim zuständigen Jugendamt gestellt"],
      bs: ["Potpuno nedostaju podaci o obvezniku alimentacije", "Dijete nije prijavljeno kod podnosioca", "Nema dokaza o pokušajima dobijanja alimentacije", "Zahtjev podnesen pogrešnom Jugendamt-u"],
      en: ["Missing liable parent data entirely", "Child not registered with applicant", "No proof of maintenance efforts", "Application filed at wrong Jugendamt"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/unterhaltsvorschuss",
  },
  // ===================== WOHNEN =====================
  {
    slug: "wohngeld",
    category: "wohnen",
    title: { de: "Wohngeld", bs: "Stambeni dodatak (Wohngeld)", en: "Housing Benefit (Wohngeld)" },
    who: {
      de: "Personen mit geringem Einkommen, die Miete oder Eigentumslast tragen und kein Bürgergeld erhalten.",
      bs: "Osobe sa niskim primanjima koje plaćaju kiriju i ne primaju Bürgergeld.",
      en: "Low-income individuals paying rent who don't receive Bürgergeld.",
    },
    authority: { de: "Wohngeldstelle der Gemeinde oder Stadt", bs: "Služba za Wohngeld općine/grada", en: "Housing Benefit Office of municipality" },
    formName: { de: "Wohngeldantrag (Mietzuschuss oder Lastenzuschuss)", bs: "Zahtjev za Wohngeld", en: "Housing Benefit Application" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Persönliche Daten eintragen: Name, Geburtsdatum, Steuer-ID, Familienstand. Antragsteller muss der Hauptmieter sein." },
        { field: "Haushaltsmitglieder", instruction: "Alle im Haushalt lebenden Personen mit Name, Geburtsdatum und monatlichem Bruttoeinkommen auflisten. Auch Kinder und nicht verwandte Mitbewohner angeben." },
        { field: "Wohnung", instruction: "Vollständige Adresse, Wohnfläche in m², Kaltmiete, Nebenkosten (ohne Strom) und Heizkosten getrennt eintragen. Beträge aus dem Mietvertrag übernehmen." },
        { field: "Einkommen", instruction: "Bruttoeinkommen aller Haushaltsmitglieder der letzten 12 Monate. Dazu zählen: Lohn, Rente, Kindergeld, Unterhalt, BAföG, Einkünfte aus Vermietung." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Lični podaci: ime, datum rođenja, porezni ID. Podnosilac mora biti glavni zakupac." },
        { field: "Članovi domaćinstva", instruction: "Sve osobe u domaćinstvu sa primanjima." },
        { field: "Stan", instruction: "Adresa, veličina u m², hladna kirija, režije (bez struje) i grijanje odvojeno." },
        { field: "Primanja", instruction: "Bruto primanja svih članova (12 mjeseci)." },
      ],
      en: [
        { field: "Applicant", instruction: "Personal data. Applicant must be the main tenant." },
        { field: "Household members", instruction: "All persons in household with income." },
        { field: "Apartment", instruction: "Address, size in m², cold rent, utilities (excl. electricity), heating separately." },
        { field: "Income", instruction: "Gross income of all members (12 months)." },
      ],
    },
    documents: {
      de: ["Mietvertrag (vollständig)", "Einkommensnachweise aller Haushaltsmitglieder", "Meldebescheinigung", "Kontoauszüge (3 Monate)", "Letzte Nebenkostenabrechnung"],
      bs: ["Ugovor o najmu (kompletno)", "Dokazi o primanjima svih članova", "Potvrda o prijavi", "Izvodi iz računa (3 mjeseca)", "Zadnji obračun režija"],
      en: ["Rental contract (complete)", "Income proof of all members", "Registration certificate", "Bank statements (3 months)", "Last utility bill"],
    },
    processingTime: { de: "3–6 Wochen", bs: "3–6 sedmica", en: "3–6 weeks" },
    commonMistakes: {
      de: ["Haushaltsmitglieder nicht vollständig angegeben", "Einkommen nicht aktuell (letzte 12 Monate nötig)", "Mietvertrag fehlt oder ist unvollständig", "Heizkosten und Nebenkosten nicht getrennt"],
      bs: ["Članovi domaćinstva nepotpuno navedeni", "Primanja nisu aktuelna", "Nedostaje ugovor o najmu", "Grijanje i režije nisu odvojeni"],
      en: ["Household members incomplete", "Income not current", "Missing/incomplete rental contract", "Heating and utilities not separated"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
  },
  {
    slug: "buergergeld",
    category: "wohnen",
    title: { de: "Bürgergeld", bs: "Građanski novac (Bürgergeld)", en: "Citizens' Benefit (Bürgergeld)" },
    who: {
      de: "Erwerbsfähige Personen (15–67 Jahre), die ihren Lebensunterhalt nicht aus eigenem Einkommen bestreiten können.",
      bs: "Radno sposobne osobe (15–67 godina) koje ne mogu pokriti životne troškove vlastitim primanjima.",
      en: "Employable persons (15–67) unable to cover living expenses from own income.",
    },
    authority: { de: "Jobcenter (zuständig nach Wohnort)", bs: "Jobcenter (nadležan prema mjestu stanovanja)", en: "Jobcenter (based on place of residence)" },
    formName: { de: "Hauptantrag Bürgergeld (SGB II)", bs: "Glavni zahtjev za Bürgergeld (SGB II)", en: "Main Application Bürgergeld (SGB II)" },
    steps: {
      de: [
        { field: "Persönliche Daten", instruction: "Name, Geburtsdatum, Familienstand, Staatsangehörigkeit, Steuer-ID eintragen." },
        { field: "Bedarfsgemeinschaft", instruction: "Alle Personen im Haushalt erfassen: Partner, Kinder unter 25, die im Haushalt leben. Für jede Person Einkommen und Vermögen angeben." },
        { field: "Einkommen & Vermögen", instruction: "Alle Einkommensquellen: Lohn, Kindergeld, Unterhalt, Rente. Vermögenswerte: Bargeld, Konten, Wertpapiere, Kfz, Immobilien. Freibetrag: 15.000 € pro Person." },
        { field: "Kosten der Unterkunft (KdU)", instruction: "Mietvertrag beifügen. Kaltmiete, Nebenkosten und Heizkosten getrennt eintragen. Das Jobcenter übernimmt angemessene Kosten – ggf. Kostensenkungsaufforderung beachten." },
      ],
      bs: [
        { field: "Lični podaci", instruction: "Ime, datum rođenja, bračni status, državljanstvo, porezni ID." },
        { field: "Zajednica potreba", instruction: "Sve osobe u domaćinstvu: partner, djeca do 25 godina." },
        { field: "Primanja & imovina", instruction: "Svi izvori prihoda i imovina. Freibetrag: 15.000 € po osobi." },
        { field: "Troškovi stanovanja", instruction: "Ugovor o najmu priložiti. Kirija, režije i grijanje odvojeno." },
      ],
      en: [
        { field: "Personal data", instruction: "Name, date of birth, marital status, nationality, tax ID." },
        { field: "Needs community", instruction: "All persons in household: partner, children under 25." },
        { field: "Income & assets", instruction: "All income sources and assets. Exemption: €15,000 per person." },
        { field: "Housing costs", instruction: "Attach rental contract. Cold rent, utilities, heating separately." },
      ],
    },
    documents: {
      de: ["Personalausweis/Reisepass", "Mietvertrag (vollständig)", "Einkommensnachweise (letzte 3 Monate)", "Kontoauszüge (3 Monate, lückenlos)", "Aufenthaltstitel (bei Nicht-EU)", "Kündigungsschreiben oder Arbeitsvertrag"],
      bs: ["Lična karta/pasoš", "Ugovor o najmu", "Dokazi o primanjima (3 mjeseca)", "Izvodi iz računa (3 mjeseca, bez praznina)", "Boravišna dozvola", "Otkaz ili ugovor o radu"],
      en: ["ID/passport", "Rental contract", "Income proof (3 months)", "Bank statements (3 months, complete)", "Residence permit (non-EU)", "Termination or employment contract"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Kontoauszüge nicht lückenlos (alle Seiten nötig!)", "Bedarfsgemeinschaft falsch angegeben", "Vermögen verschwiegen oder unterschätzt", "Fehlende Unterschrift beider Partner"],
      bs: ["Izvodi iz računa nisu kompletni", "Zajednica potreba pogrešno navedena", "Prešućena imovina", "Nedostaje potpis oba partnera"],
      en: ["Bank statements not complete", "Needs community incorrectly stated", "Undisclosed assets", "Missing signature of both partners"],
    },
    officialPdf: "",
    onlineLink: "https://www.jobcenter.digital",
    officialInfoUrl: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld",
  },
  {
    slug: "heizkostenzuschuss",
    category: "wohnen",
    title: { de: "Heizkostenzuschuss", bs: "Dodatak za grijanje", en: "Heating Cost Subsidy" },
    who: {
      de: "Wohngeldempfänger, BAföG-/AFBG-Empfänger – wird automatisch mit dem Wohngeld gewährt.",
      bs: "Primaoci Wohngeld-a, BAföG-a ili AFBG-a – dodjeljuje se automatski uz Wohngeld.",
      en: "Recipients of housing benefit, BAföG, or AFBG – granted automatically with housing benefit.",
    },
    authority: { de: "Wohngeldstelle (wird automatisch gewährt)", bs: "Služba za Wohngeld (automatski)", en: "Housing Benefit Office (automatic)" },
    formName: { de: "Kein separater Antrag – automatisch mit Wohngeld", bs: "Nema posebnog zahtjeva – automatski uz Wohngeld", en: "No separate application – automatic with housing benefit" },
    steps: {
      de: [
        { field: "Kein separater Antrag nötig", instruction: "Der Heizkostenzuschuss wird automatisch mit dem Wohngeldbescheid berechnet und ausgezahlt. Sie müssen lediglich einen regulären Wohngeldantrag stellen." },
        { field: "Wohngeldantrag stellen", instruction: "Stellen Sie den normalen Wohngeldantrag (siehe Wohngeld-Guide). Im Bescheid wird der Heizkostenzuschuss separat ausgewiesen." },
      ],
      bs: [
        { field: "Nema posebnog zahtjeva", instruction: "Dodatak za grijanje se automatski obračunava i isplaćuje sa Wohngeld rješenjem." },
        { field: "Podnijeti Wohngeld zahtjev", instruction: "Podnijeti redovni Wohngeld zahtjev." },
      ],
      en: [
        { field: "No separate application", instruction: "Heating subsidy is automatically calculated and paid with the housing benefit notice." },
        { field: "File housing benefit application", instruction: "File the regular housing benefit application." },
      ],
    },
    documents: {
      de: ["Wohngeldantrag (regulär)", "Letzte Heizkostenabrechnung"],
      bs: ["Wohngeld zahtjev (redovni)", "Zadnji obračun grijanja"],
      en: ["Housing benefit application (regular)", "Last heating cost bill"],
    },
    processingTime: { de: "Zusammen mit Wohngeldbescheid", bs: "Zajedno sa Wohngeld rješenjem", en: "Together with housing benefit notice" },
    commonMistakes: {
      de: ["Heizkostenabrechnung nicht eingereicht", "Separaten Antrag gesucht (gibt es nicht)"],
      bs: ["Obračun grijanja nije dostavljen", "Tražen poseban zahtjev (ne postoji)"],
      en: ["Heating cost bill not submitted", "Looked for separate application (doesn't exist)"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
  },
  // ===================== ARBEIT =====================
  {
    slug: "arbeitslosengeld",
    category: "arbeit",
    title: { de: "Arbeitslosengeld I", bs: "Naknada za nezaposlenost I (ALG I)", en: "Unemployment Benefit I (ALG I)" },
    who: {
      de: "Arbeitnehmer, die in den letzten 30 Monaten mindestens 12 Monate sozialversicherungspflichtig beschäftigt waren.",
      bs: "Zaposlenici koji su u zadnjih 30 mjeseci bili najmanje 12 mjeseci socijalno osigurani.",
      en: "Employees employed for at least 12 months in the last 30 months with social insurance.",
    },
    authority: { de: "Agentur für Arbeit (persönliche Meldung erforderlich)", bs: "Agencija za rad (potrebna lična prijava)", en: "Employment Agency (personal registration required)" },
    formName: { de: "Antrag auf Arbeitslosengeld", bs: "Zahtjev za naknadu za nezaposlenost", en: "Application for Unemployment Benefit" },
    steps: {
      de: [
        { field: "Arbeitssuchend melden", instruction: "Spätestens 3 Monate vor Ende des Arbeitsverhältnisses online oder telefonisch als arbeitssuchend melden. Bei kurzfristiger Kündigung: innerhalb von 3 Tagen." },
        { field: "Arbeitslos melden", instruction: "Am ersten Tag der Arbeitslosigkeit persönlich bei der Agentur für Arbeit erscheinen. Ohne persönliche Meldung kein Anspruch!" },
        { field: "Persönliche Daten", instruction: "Name, Anschrift, Steuer-ID, Bankverbindung, Sozialversicherungsnummer eintragen." },
        { field: "Beschäftigungshistorie", instruction: "Letzte Arbeitgeber, Beschäftigungszeiträume und Kündigungsgrund angeben. Arbeitsbescheinigung vom Arbeitgeber beifügen." },
      ],
      bs: [
        { field: "Prijava traženja posla", instruction: "Najkasnije 3 mjeseca prije kraja radnog odnosa prijaviti traženje posla online ili telefonski." },
        { field: "Prijava nezaposlenosti", instruction: "Prvog dana nezaposlenosti lično se prijaviti u Agenciji za rad." },
        { field: "Lični podaci", instruction: "Ime, adresa, porezni ID, bankovni podaci, broj socijalnog osiguranja." },
        { field: "Radna istorija", instruction: "Posljednji poslodavci, periodi zaposlenja i razlog otkaza." },
      ],
      en: [
        { field: "Register as job-seeking", instruction: "Register at least 3 months before end of employment, online or by phone." },
        { field: "Register as unemployed", instruction: "Appear in person on the first day of unemployment. No claim without personal registration!" },
        { field: "Personal data", instruction: "Name, address, tax ID, bank details, social insurance number." },
        { field: "Employment history", instruction: "Previous employers, periods, and reason for termination." },
      ],
    },
    documents: {
      de: ["Arbeitsbescheinigung (vom Arbeitgeber – Pflicht!)", "Personalausweis/Reisepass", "Sozialversicherungsausweis", "Kündigungsschreiben oder Aufhebungsvertrag", "Lebenslauf"],
      bs: ["Potvrda o zaposlenju (od poslodavca – obavezno!)", "Lična karta/pasoš", "Socijalno osiguranje", "Otkaz ili sporazumni raskid", "Biografija"],
      en: ["Employment certificate (from employer – mandatory!)", "ID/passport", "Social insurance card", "Termination letter or agreement", "CV"],
    },
    processingTime: { de: "2–3 Wochen", bs: "2–3 sedmice", en: "2–3 weeks" },
    commonMistakes: {
      de: ["Zu spät arbeitslos gemeldet → Sperrzeit!", "Arbeitssuchend-Meldung versäumt (1 Woche Sperrzeit)", "Arbeitsbescheinigung vom Arbeitgeber fehlt", "Aufhebungsvertrag unterschrieben → mögliche Sperrzeit prüfen"],
      bs: ["Prekasno prijavljena nezaposlenost → Sperrzeit!", "Propuštena prijava traženja posla", "Nedostaje potvrda od poslodavca", "Potpisan sporazumni raskid → moguća Sperrzeit"],
      en: ["Late registration → blocking period!", "Missed job-seeking registration", "Missing employer certificate", "Signed mutual termination → possible blocking period"],
    },
    officialPdf: "",
    onlineLink: "https://www.arbeitsagentur.de/arbeitslosengeld-1/antrag-arbeitslosengeld",
    officialInfoUrl: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld",
  },
  {
    slug: "kurzarbeitergeld",
    category: "arbeit",
    title: { de: "Kurzarbeitergeld", bs: "Naknada za skraćeno radno vrijeme", en: "Short-Time Work Benefit" },
    who: {
      de: "Arbeitnehmer, deren Arbeitszeit vorübergehend reduziert wird. Der Antrag wird durch den Arbeitgeber gestellt.",
      bs: "Zaposlenici kojima je privremeno skraćeno radno vrijeme. Zahtjev podnosi poslodavac.",
      en: "Employees with temporarily reduced working hours. Applied by employer.",
    },
    authority: { de: "Agentur für Arbeit (Arbeitgeber stellt Antrag)", bs: "Agencija za rad (poslodavac podnosi zahtjev)", en: "Employment Agency (employer applies)" },
    formName: { de: "Anzeige über Arbeitsausfall / Antrag auf Kurzarbeitergeld (KUG)", bs: "Prijava gubitka rada / zahtjev za KUG", en: "Report of work loss / Short-time work application" },
    steps: {
      de: [
        { field: "Anzeige des Arbeitsausfalls", instruction: "Der Arbeitgeber zeigt erheblichen Arbeitsausfall bei der Agentur für Arbeit an. Mindestens 10% der Beschäftigten müssen betroffen sein." },
        { field: "Monatlicher Antrag", instruction: "Der Arbeitgeber beantragt KuG monatlich für die betroffenen Arbeitnehmer nach Ablauf des Monats." },
        { field: "Für Arbeitnehmer", instruction: "Sie müssen keinen eigenen Antrag stellen. Das KuG wird über den Arbeitgeber mit der Lohnabrechnung ausgezahlt (ca. 60% bzw. 67% mit Kind)." },
      ],
      bs: [
        { field: "Prijava gubitka rada", instruction: "Poslodavac prijavljuje značajan gubitak rada Agenciji. Min. 10% zaposlenika mora biti pogođeno." },
        { field: "Mjesečni zahtjev", instruction: "Poslodavac mjesečno podnosi zahtjev za pogođene zaposlenike." },
        { field: "Za zaposlenike", instruction: "Ne morate sami podnositi zahtjev. Isplata ide preko poslodavca (oko 60% ili 67% sa djetetom)." },
      ],
      en: [
        { field: "Report work loss", instruction: "Employer reports significant work loss. At least 10% of employees must be affected." },
        { field: "Monthly application", instruction: "Employer applies monthly for affected employees." },
        { field: "For employees", instruction: "No own application needed. Paid through employer (approx. 60% or 67% with children)." },
      ],
    },
    documents: {
      de: ["Arbeitsvertrag", "Lohnabrechnungen (letzte 3 Monate)", "Ggf. Vereinbarung über Kurzarbeit"],
      bs: ["Ugovor o radu", "Platne liste (zadnja 3 mjeseca)", "Sporazum o skraćenom radnom vremenu"],
      en: ["Employment contract", "Pay slips (last 3 months)", "Short-time work agreement if applicable"],
    },
    processingTime: { de: "Monatliche Abrechnung durch Arbeitgeber", bs: "Mjesečni obračun od strane poslodavca", en: "Monthly settlement by employer" },
    commonMistakes: {
      de: ["Arbeitnehmer denkt, er muss selbst beantragen (nein!)", "Arbeitgeber versäumt die Anzeige des Arbeitsausfalls"],
      bs: ["Zaposlenik misli da sam mora podnijeti zahtjev (ne!)", "Poslodavac propusti prijavu gubitka rada"],
      en: ["Employee thinks they need to apply (no!)", "Employer misses the work loss report"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.arbeitsagentur.de/unternehmen/finanziell/kurzarbeitergeld",
  },
  // ===================== GESUNDHEIT =====================
  {
    slug: "krankengeld",
    category: "gesundheit",
    title: { de: "Krankengeld", bs: "Naknada za bolovanje (Krankengeld)", en: "Sick Pay (Krankengeld)" },
    who: {
      de: "Gesetzlich Krankenversicherte, die länger als 6 Wochen arbeitsunfähig sind (nach Lohnfortzahlung durch Arbeitgeber).",
      bs: "Zakonski zdravstveno osigurani koji su duže od 6 sedmica nesposobni za rad.",
      en: "Statutory health insurance members unable to work for more than 6 weeks.",
    },
    authority: { de: "Gesetzliche Krankenkasse (z.B. AOK, TK, Barmer)", bs: "Zakonska zdravstvena osiguravajuća kuća", en: "Statutory Health Insurance (e.g. AOK, TK, Barmer)" },
    formName: { de: "Antrag auf Krankengeld (Auszahlschein der Krankenkasse)", bs: "Zahtjev za Krankengeld (obrazac za isplatu)", en: "Sick Pay Application (payment form from insurance)" },
    steps: {
      de: [
        { field: "AU-Bescheinigung", instruction: "Ihr Arzt stellt die Arbeitsunfähigkeitsbescheinigung (AU) aus. Seit 2023 wird die eAU digital an die Krankenkasse übermittelt – Sie müssen nichts einreichen." },
        { field: "Auszahlschein ausfüllen", instruction: "Nach 6 Wochen sendet Ihnen die Krankenkasse einen Auszahlschein. Diesen ausfüllen: Zeitraum der Arbeitsunfähigkeit, ob Reha beantragt wurde, aktuelle Bankverbindung." },
        { field: "Arbeitgeberbescheinigung", instruction: "Der Arbeitgeber muss der Krankenkasse das Nettogehalt und den letzten Tag der Lohnfortzahlung mitteilen." },
      ],
      bs: [
        { field: "Ljekarsko uvjerenje", instruction: "Ljekar izdaje potvrdu o nesposobnosti (eAU) – od 2023. šalje se digitalno." },
        { field: "Obrazac za isplatu", instruction: "Nakon 6 sedmica osiguravajuća kuća šalje obrazac – popuniti i vratiti." },
        { field: "Potvrda poslodavca", instruction: "Poslodavac mora dostaviti neto platu i zadnji dan isplate." },
      ],
      en: [
        { field: "Medical certificate", instruction: "Doctor issues incapacity certificate (eAU) – sent digitally since 2023." },
        { field: "Payment form", instruction: "After 6 weeks, insurance sends payment form – fill out and return." },
        { field: "Employer certificate", instruction: "Employer must report net salary and last day of continued pay." },
      ],
    },
    documents: {
      de: ["AU-Bescheinigung (elektronisch seit 2023)", "Auszahlschein der Krankenkasse", "Arbeitgeberbescheinigung über Entgeltfortzahlung"],
      bs: ["Ljekarsko uvjerenje (elektronski od 2023.)", "Obrazac za isplatu", "Potvrda poslodavca"],
      en: ["Medical certificate (electronic since 2023)", "Insurance payment form", "Employer pay continuation certificate"],
    },
    processingTime: { de: "1–2 Wochen nach Eingang des Auszahlscheins", bs: "1–2 sedmice po prijemu obrasca", en: "1–2 weeks after form receipt" },
    commonMistakes: {
      de: ["Auszahlschein nicht rechtzeitig zurückgesendet", "AU-Bescheinigung hat Lücke (jeder Tag muss abgedeckt sein!)", "Arbeitgeberbescheinigung fehlt → Verzögerung"],
      bs: ["Obrazac nije vraćen na vrijeme", "Uvjerenje ima prazninu", "Nedostaje potvrda poslodavca"],
      en: ["Payment form not returned on time", "Medical certificate has a gap", "Missing employer certificate"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bundesgesundheitsministerium.de/krankengeld",
  },
  {
    slug: "pflegegrad",
    category: "gesundheit",
    title: { de: "Pflegegrad", bs: "Stepen njege (Pflegegrad)", en: "Care Level (Pflegegrad)" },
    who: {
      de: "Personen, die aufgrund von Krankheit oder Behinderung dauerhaft auf Pflege angewiesen sind.",
      bs: "Osobe koje su zbog bolesti ili invaliditeta trajno ovisne o njezi.",
      en: "Persons permanently dependent on care due to illness or disability.",
    },
    authority: { de: "Pflegekasse (bei Ihrer Krankenkasse)", bs: "Kasa za njegu (pri zdravstvenom osiguranju)", en: "Care Fund (at your health insurance)" },
    formName: { de: "Antrag auf Pflegeleistungen (formlos möglich)", bs: "Zahtjev za usluge njege (moguć neformalno)", en: "Application for Care Benefits (informal possible)" },
    steps: {
      de: [
        { field: "Antrag stellen", instruction: "Rufen Sie Ihre Pflegekasse an oder schreiben Sie formlos: 'Ich beantrage Leistungen der Pflegeversicherung für [Name, geb. am...]'. Kein spezielles Formular nötig." },
        { field: "Begutachtung vorbereiten", instruction: "Der MD (Medizinischer Dienst) kommt zur Begutachtung nach Hause. Führen Sie ein Pflegetagebuch: Wann braucht die Person Hilfe? Wie oft? Bei welchen Tätigkeiten?" },
        { field: "Begutachtungstermin", instruction: "Beim Termin alle Einschränkungen ehrlich zeigen – nichts beschönigen. Arztbriefe, Medikamentenliste und Pflegetagebuch bereithalten." },
        { field: "Bescheid prüfen", instruction: "Nach ca. 5 Wochen erhalten Sie den Bescheid mit dem Pflegegrad (1–5). Bei zu niedrigem Pflegegrad: Widerspruch innerhalb von 4 Wochen möglich." },
      ],
      bs: [
        { field: "Podnijeti zahtjev", instruction: "Pozovite kasu za njegu ili pišite neformalno." },
        { field: "Priprema za procjenu", instruction: "MD dolazi kući – vodite dnevnik njege." },
        { field: "Termin procjene", instruction: "Pokažite sve ograničenja – ne umanjujte." },
        { field: "Provjera rješenja", instruction: "Nakon ~5 sedmica dobijate rješenje. Prigovor u roku od 4 sedmice." },
      ],
      en: [
        { field: "Apply", instruction: "Call your care fund or write informally." },
        { field: "Prepare assessment", instruction: "MD visits home – keep a care diary." },
        { field: "Assessment appointment", instruction: "Show all limitations honestly." },
        { field: "Check decision", instruction: "After ~5 weeks you receive the decision. Appeal within 4 weeks." },
      ],
    },
    documents: {
      de: ["Ärztliche Unterlagen und Arztbriefe", "Aktuelle Medikamentenliste", "Pflegetagebuch (dringend empfohlen!)", "Ggf. Schwerbehindertenausweis"],
      bs: ["Ljekarska dokumentacija", "Lista lijekova", "Dnevnik njege (preporučeno!)", "Eventualno invalidska iskaznica"],
      en: ["Medical records", "Current medication list", "Care diary (strongly recommended!)", "Disability ID if applicable"],
    },
    processingTime: { de: "Max. 5 Wochen (gesetzliche Frist)", bs: "Max. 5 sedmica (zakonski rok)", en: "Max. 5 weeks (legal deadline)" },
    commonMistakes: {
      de: ["Pflegebedarf bei der Begutachtung heruntergespielt – ehrlich sein!", "Kein Pflegetagebuch geführt (wichtigstes Beweismittel)", "Arztbriefe nicht bereitgehalten", "Widerspruchsfrist verpasst (4 Wochen)"],
      bs: ["Potreba za njegom umanjivana – budite iskreni!", "Nije vođen dnevnik njege", "Ljekarski dopisi nisu pripremljeni", "Propušten rok za prigovor"],
      en: ["Care needs downplayed – be honest!", "No care diary kept", "Medical records not prepared", "Appeal deadline missed (4 weeks)"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bundesgesundheitsministerium.de/pflegegrade",
  },
  {
    slug: "reha",
    category: "gesundheit",
    title: { de: "Reha-Antrag", bs: "Zahtjev za rehabilitaciju (Reha)", en: "Rehabilitation Application" },
    who: {
      de: "Versicherte, deren Erwerbsfähigkeit gefährdet ist und die medizinische Rehabilitation benötigen.",
      bs: "Osigurane osobe čija je radna sposobnost ugrožena i koje trebaju medicinsku rehabilitaciju.",
      en: "Insured persons whose employability is at risk and need medical rehabilitation.",
    },
    authority: { de: "Deutsche Rentenversicherung oder Krankenkasse", bs: "Njemačko penziono osiguranje ili zdravstveno osiguranje", en: "German Pension Insurance or Health Insurance" },
    formName: { de: "Antrag auf Leistungen zur medizinischen Rehabilitation (G0100)", bs: "Zahtjev za medicinsku rehabilitaciju (G0100)", en: "Application for Medical Rehabilitation (G0100)" },
    steps: {
      de: [
        { field: "Selbsteinschätzungsbogen (G0110)", instruction: "Gesundheitszustand detailliert beschreiben: Welche Beschwerden? Seit wann? Welche Einschränkungen im Alltag und Beruf?" },
        { field: "Ärztlicher Befundbericht (G0160)", instruction: "Ihr Hausarzt erstellt den Befundbericht. Wichtig: Arzt muss Rehabilitationsbedarf klar begründen und alle Diagnosen auflisten." },
        { field: "Arbeitgeberbescheinigung", instruction: "Aktuelle Beschäftigungssituation bestätigen lassen. Bei Arbeitslosigkeit: Bescheinigung der Agentur für Arbeit." },
      ],
      bs: [
        { field: "Samoprocjena (G0110)", instruction: "Detaljno opisati zdravstveno stanje i ograničenja." },
        { field: "Ljekarski nalaz (G0160)", instruction: "Porodični ljekar sastavlja nalaz sa svim dijagnozama." },
        { field: "Potvrda poslodavca", instruction: "Potvrditi trenutnu radnu situaciju." },
      ],
      en: [
        { field: "Self-assessment (G0110)", instruction: "Describe health status and limitations in detail." },
        { field: "Medical report (G0160)", instruction: "Family doctor creates report with all diagnoses." },
        { field: "Employer certificate", instruction: "Confirm current employment situation." },
      ],
    },
    documents: {
      de: ["Befundbericht G0160 (vom Hausarzt)", "Selbsteinschätzung G0110", "Arztbriefe und Befunde", "Medikamentenplan", "Arbeitgeberbescheinigung"],
      bs: ["Ljekarski nalaz G0160", "Samoprocjena G0110", "Ljekarski dopisi", "Plan lijekova", "Potvrda poslodavca"],
      en: ["Medical report G0160", "Self-assessment G0110", "Doctor's letters", "Medication plan", "Employer certificate"],
    },
    processingTime: { de: "3–6 Wochen", bs: "3–6 sedmica", en: "3–6 weeks" },
    commonMistakes: {
      de: ["Befundbericht unvollständig oder nicht detailliert genug", "Antrag bei falscher Stelle eingereicht (Rente vs. Krankenkasse)", "Selbsteinschätzung zu knapp ausgefüllt"],
      bs: ["Nepotpun ljekarski nalaz", "Zahtjev podnesen na pogrešnom mjestu", "Samoprocjena preskromno popunjena"],
      en: ["Incomplete medical report", "Application filed at wrong office", "Self-assessment too brief"],
    },
    officialPdf: "",
    onlineLink: "https://www.eservice-drv.de/SelfServiceWeb/",
    officialInfoUrl: "https://www.deutsche-rentenversicherung.de/DRV/DE/Reha/reha_node.html",
  },
  // ===================== BILDUNG =====================
  {
    slug: "bafoeg",
    category: "bildung",
    title: { de: "BAföG", bs: "BAföG (studentska potpora)", en: "BAföG (Student Aid)" },
    who: {
      de: "Studierende und Schüler, deren Eltern das Studium/die Ausbildung nicht finanzieren können.",
      bs: "Studenti i učenici čiji roditelji ne mogu finansirati studij/školovanje.",
      en: "Students whose parents cannot finance their education.",
    },
    authority: { de: "BAföG-Amt beim Studierendenwerk der Hochschule", bs: "BAföG-ured pri Studierendenwerk-u", en: "BAföG Office at Student Services" },
    formName: { de: "BAföG-Antrag (FormBlatt 1–8)", bs: "BAföG zahtjev (FormBlatt 1–8)", en: "BAföG Application (Form 1–8)" },
    steps: {
      de: [
        { field: "FormBlatt 1 (Hauptantrag)", instruction: "Persönliche Daten, Ausbildungsstätte (Name + Adresse der Hochschule), eigene Wohnung oder bei Eltern, Familienstand." },
        { field: "FormBlatt 3 (Elterneinkommen)", instruction: "Wird von Ihren Eltern ausgefüllt! Einkommen der Eltern aus dem vorletzten Kalenderjahr. Steuerbescheid der Eltern beifügen." },
        { field: "FormBlatt 5 (Leistungsnachweis)", instruction: "Ab dem 5. Semester: Nachweis über ausreichende Studienleistungen (von der Hochschule ausstellen lassen)." },
        { field: "Vermögenserklärung", instruction: "Eigenes Vermögen angeben: Konten, Sparverträge, Aktien, Kfz. Freibetrag: 15.000 € (unter 30 Jahre)." },
      ],
      bs: [
        { field: "FormBlatt 1", instruction: "Lični podaci, obrazovna ustanova, stan." },
        { field: "FormBlatt 3", instruction: "Popunjavaju roditelji! Primanja iz pretprošle kalendarske godine." },
        { field: "FormBlatt 5", instruction: "Od 5. semestra: dokaz o studijskom uspjehu." },
        { field: "Izjava o imovini", instruction: "Vlastita imovina. Freibetrag: 15.000 € (do 30 godina)." },
      ],
      en: [
        { field: "Form 1 (main)", instruction: "Personal data, educational institution, housing." },
        { field: "Form 3 (parental income)", instruction: "Filled by parents! Income from two years prior." },
        { field: "Form 5 (performance)", instruction: "From 5th semester: proof of sufficient academic performance." },
        { field: "Asset declaration", instruction: "Own assets. Exemption: €15,000 (under 30)." },
      ],
    },
    documents: {
      de: ["Immatrikulationsbescheinigung", "Steuerbescheid der Eltern (vorletztes Jahr)", "Mietvertrag (bei eigener Wohnung)", "Kontoauszüge (eigene Konten)", "Aufenthaltstitel (bei Nicht-EU)"],
      bs: ["Potvrda o upisu", "Porezno rješenje roditelja", "Ugovor o najmu", "Izvodi iz računa", "Boravišna dozvola"],
      en: ["Enrollment certificate", "Parents' tax notice (year before last)", "Rental contract", "Bank statements", "Residence permit (non-EU)"],
    },
    processingTime: { de: "6–10 Wochen (Antrag frühzeitig stellen!)", bs: "6–10 sedmica (podnijeti zahtjev na vrijeme!)", en: "6–10 weeks (apply early!)" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt – BAföG gibt es nicht rückwirkend!", "FormBlatt 3 der Eltern fehlt (häufigster Fehler)", "Vermögen über Freibetrag nicht angegeben", "Leistungsnachweis ab 5. Semester vergessen"],
      bs: ["Zahtjev predan prekasno – BAföG nije retroaktivan!", "FormBlatt 3 roditelja nedostaje", "Imovina iznad limita nije navedena", "Zaboravljen dokaz o uspjehu od 5. semestra"],
      en: ["Application too late – no retroactive BAföG!", "Parents' Form 3 missing (most common error)", "Assets above exemption not declared", "Performance certificate from 5th semester forgotten"],
    },
    officialPdf: "",
    onlineLink: "https://www.bafoeg-digital.de",
    officialInfoUrl: "https://www.bafög.de",
  },
  {
    slug: "schueler-bafoeg",
    category: "bildung",
    title: { de: "Schüler-BAföG", bs: "Učenički BAföG", en: "Student BAföG (School)" },
    who: {
      de: "Schüler ab Klasse 10 an weiterführenden Schulen, Berufsfachschulen, Fachoberschulen – wenn sie nicht bei den Eltern wohnen können.",
      bs: "Učenici od 10. razreda na srednjim školama, stručnim školama – ako ne mogu živjeti kod roditelja.",
      en: "Students from grade 10 at secondary/vocational schools – if they cannot live with parents.",
    },
    authority: { de: "Amt für Ausbildungsförderung der Stadt oder des Kreises", bs: "Ured za obrazovnu potporu grada/okruga", en: "Training Support Office of city/county" },
    formName: { de: "BAföG-Antrag für Schüler (FormBlatt 1 + 3)", bs: "BAföG zahtjev za učenike", en: "BAföG Application for School Students" },
    steps: {
      de: [
        { field: "Schulbescheinigung", instruction: "Aktuelle Schulbescheinigung von der Schule ausstellen lassen und beifügen." },
        { field: "FormBlatt 3 (Elterneinkommen)", instruction: "Von den Eltern ausfüllen lassen: Einkommen aus dem vorletzten Kalenderjahr + Steuerbescheid beifügen." },
        { field: "Wohnsituation", instruction: "Angeben, ob Sie bei den Eltern oder in eigener Wohnung wohnen. Schüler-BAföG gibt es nur in bestimmten Fällen (z.B. Schule zu weit weg)." },
      ],
      bs: [
        { field: "Potvrda škole", instruction: "Priložiti aktuelnu potvrdu škole." },
        { field: "Primanja roditelja", instruction: "FormBlatt 3 dati roditeljima + porezno rješenje." },
        { field: "Stambena situacija", instruction: "Navesti da li živite kod roditelja ili samostalno." },
      ],
      en: [
        { field: "School certificate", instruction: "Attach current school certificate." },
        { field: "Parental income", instruction: "Have parents fill Form 3 + attach tax notice." },
        { field: "Living situation", instruction: "State whether living with parents or alone." },
      ],
    },
    documents: {
      de: ["Schulbescheinigung", "Steuerbescheid der Eltern", "Mietvertrag (bei eigener Wohnung)", "Kontoauszüge"],
      bs: ["Potvrda škole", "Porezno rješenje roditelja", "Ugovor o najmu", "Izvodi iz računa"],
      en: ["School certificate", "Parents' tax notice", "Rental contract", "Bank statements"],
    },
    processingTime: { de: "4–8 Wochen", bs: "4–8 sedmica", en: "4–8 weeks" },
    commonMistakes: {
      de: ["Schulbescheinigung fehlt", "Wichtig: Schüler-BAföG muss NICHT zurückgezahlt werden (Vollzuschuss!)", "Antrag nicht beim zuständigen Amt gestellt (Stadt/Kreis, nicht Studierendenwerk)"],
      bs: ["Nedostaje potvrda škole", "Učenički BAföG se NE mora vraćati!", "Zahtjev podnesen pogrešnom uredu"],
      en: ["Missing school certificate", "School BAföG does NOT need to be repaid!", "Application filed at wrong office"],
    },
    officialPdf: "",
    onlineLink: "https://www.bafoeg-digital.de",
    officialInfoUrl: "https://www.bafög.de",
  },
  {
    slug: "lernfoerderung",
    category: "bildung",
    title: { de: "Lernförderung", bs: "Dopunska nastava (Lernförderung)", en: "Learning Support" },
    who: {
      de: "Kinder aus Familien mit Bürgergeld, Wohngeld oder Kinderzuschlag, deren Lernziele gefährdet sind.",
      bs: "Djeca iz porodica sa Bürgergeld-om, Wohngeld-om ili Kinderzuschlag-om čiji su obrazovni ciljevi ugroženi.",
      en: "Children from families with Bürgergeld, Wohngeld, or Kinderzuschlag whose learning goals are at risk.",
    },
    authority: { de: "Jobcenter oder Kommune (BuT-Stelle)", bs: "Jobcenter ili općina (BuT-služba)", en: "Jobcenter or municipality (BuT office)" },
    formName: { de: "Antrag auf Lernförderung (Teil des Bildungs- und Teilhabepakets)", bs: "Zahtjev za dopunsku nastavu (dio BuT)", en: "Learning Support Application (part of BuT)" },
    steps: {
      de: [
        { field: "Bestätigung der Schule", instruction: "Der Lehrer oder die Schule bestätigt schriftlich, dass das Lernziel (Versetzung) gefährdet ist und Nachhilfe notwendig ist." },
        { field: "Nachhilfeanbieter benennen", instruction: "Nachhilfeanbieter (z.B. Schülerhilfe, Studienkreis oder privater Nachhilfelehrer) benennen. Kosten und Umfang der Nachhilfe angeben." },
        { field: "Antrag vor Beginn stellen", instruction: "Wichtig: Der Antrag muss VOR Beginn der Nachhilfe bewilligt werden. Rückwirkende Erstattung ist nicht möglich!" },
      ],
      bs: [
        { field: "Potvrda škole", instruction: "Nastavnik potvrđuje da je obrazovni cilj ugrožen." },
        { field: "Ponuđač instrukcija", instruction: "Navesti ponuđača i troškove instrukcija." },
        { field: "Zahtjev prije početka", instruction: "Zahtjev mora biti odobren PRIJE početka instrukcija!" },
      ],
      en: [
        { field: "School confirmation", instruction: "Teacher confirms learning goals are at risk." },
        { field: "Tutoring provider", instruction: "Name provider and state costs." },
        { field: "Apply before starting", instruction: "Application must be approved BEFORE tutoring starts!" },
      ],
    },
    documents: {
      de: ["Schulbestätigung über gefährdetes Lernziel", "Aktueller Leistungsbescheid (Bürgergeld/Wohngeld/KiZ)", "Kostenvoranschlag des Nachhilfeanbieters"],
      bs: ["Potvrda škole o ugroženom cilju", "Aktuelno rješenje", "Ponuda troškova instrukcija"],
      en: ["School confirmation of at-risk goals", "Current benefit notice", "Tutoring cost quote"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Schulbestätigung nicht eingereicht", "Nachhilfe vor Bewilligung begonnen (keine Erstattung!)", "Kostenvoranschlag des Anbieters fehlt"],
      bs: ["Potvrda škole nije dostavljena", "Instrukcije počele prije odobrenja", "Nedostaje ponuda troškova"],
      en: ["School confirmation not submitted", "Tutoring started before approval", "Missing cost quote"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
  },
  {
    slug: "kita-zuschuss",
    category: "bildung",
    title: { de: "Kita-Zuschuss", bs: "Subvencija za vrtić (Kita-Zuschuss)", en: "Daycare Subsidy" },
    who: {
      de: "Eltern mit geringem Einkommen, die die Kita-Gebühren nicht vollständig tragen können.",
      bs: "Roditelji sa niskim primanjima koji ne mogu u potpunosti pokriti troškove vrtića.",
      en: "Low-income parents unable to fully cover daycare fees.",
    },
    authority: { de: "Jugendamt der Stadt oder Gemeinde", bs: "Jugendamt grada ili općine", en: "Youth Welfare Office (Jugendamt)" },
    formName: { de: "Antrag auf Übernahme/Ermäßigung der Kita-Kosten", bs: "Zahtjev za pokrivanje/smanjenje troškova vrtića", en: "Application for Daycare Cost Coverage/Reduction" },
    steps: {
      de: [
        { field: "Kita-Vertrag", instruction: "Betreuungsvertrag mit der Kita beifügen. Daraus müssen die monatlichen Kosten und die Betreuungszeiten hervorgehen." },
        { field: "Einkommensnachweise", instruction: "Einkommensnachweise beider Eltern: Lohnabrechnungen (3 Monate), ggf. Bürgergeld-Bescheid, Kindergeld-Bescheid, Unterhalt." },
        { field: "Leistungsbescheid beifügen", instruction: "Falls Sie Bürgergeld, Wohngeld oder Kinderzuschlag erhalten: aktuellen Bescheid beifügen – in vielen Kommunen erhalten Sie dann automatisch volle Kostenübernahme." },
      ],
      bs: [
        { field: "Ugovor sa vrtićem", instruction: "Priložiti ugovor sa mjesečnim troškovima i satnicom." },
        { field: "Dokazi o primanjima", instruction: "Primanja oba roditelja: platne liste, rješenja." },
        { field: "Rješenje o naknadi", instruction: "Ako primate Bürgergeld/Wohngeld/KiZ: priložiti rješenje." },
      ],
      en: [
        { field: "Daycare contract", instruction: "Attach contract showing monthly costs and hours." },
        { field: "Income proof", instruction: "Both parents' income: pay slips, benefit notices." },
        { field: "Benefit notice", instruction: "If receiving Bürgergeld/Wohngeld/KiZ: attach notice." },
      ],
    },
    documents: {
      de: ["Kita-Betreuungsvertrag", "Einkommensnachweise beider Eltern (3 Monate)", "Geburtsurkunde des Kindes", "Ggf. Leistungsbescheid (Bürgergeld/Wohngeld/KiZ)"],
      bs: ["Ugovor sa vrtićem", "Dokazi o primanjima (3 mjeseca)", "Rodni list djeteta", "Eventualno rješenje o naknadi"],
      en: ["Daycare contract", "Income proof of both parents (3 months)", "Birth certificate", "Benefit notice if applicable"],
    },
    processingTime: { de: "4–6 Wochen", bs: "4–6 sedmica", en: "4–6 weeks" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt – keine rückwirkende Erstattung!", "Kita-Vertrag fehlt", "Einkommensnachweise nicht vollständig (beide Eltern nötig)", "Falsches Jugendamt kontaktiert (zuständig ist das Jugendamt am Wohnort)"],
      bs: ["Zahtjev predan prekasno – nema retroaktivne naknade!", "Nedostaje ugovor sa vrtićem", "Nepotpuni dokazi o primanjima", "Kontaktiran pogrešan Jugendamt"],
      en: ["Application too late – no retroactive refund!", "Missing daycare contract", "Incomplete income proof (both parents needed)", "Wrong Jugendamt contacted"],
    },
    officialPdf: "",
    onlineLink: "",
    officialInfoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/kinderbetreuung",
  },
];

export function getGuidesByCategory(category: Guide["category"]) {
  return guides.filter((g) => g.category === category);
}

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}
