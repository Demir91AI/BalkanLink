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
  officialPdf: string;
  onlineLink: string;
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
        { field: "Antragsteller", instruction: "Vor- und Nachname, Geburtsdatum, Steuer-ID eintragen." },
        { field: "Anschrift", instruction: "Aktuelle Meldeadresse vollständig angeben." },
        { field: "Bankverbindung", instruction: "IBAN und BIC für die Auszahlung." },
        { field: "Angaben zum Kind", instruction: "Name, Geburtsdatum, Steuer-ID des Kindes." },
        { field: "Anlage Kind", instruction: "Für jedes Kind eine separate Anlage Kind ausfüllen." },
      ],
      bs: [
        { field: "Podnosilac zahtjeva", instruction: "Ime, prezime, datum rođenja, porezni ID." },
        { field: "Adresa", instruction: "Trenutna prijavljena adresa u cijelosti." },
        { field: "Bankovni podaci", instruction: "IBAN i BIC za isplatu." },
        { field: "Podaci o djetetu", instruction: "Ime, datum rođenja, porezni ID djeteta." },
        { field: "Prilog Dijete", instruction: "Za svako dijete popuniti poseban prilog." },
      ],
      en: [
        { field: "Applicant", instruction: "First name, last name, date of birth, tax ID." },
        { field: "Address", instruction: "Full current registered address." },
        { field: "Bank details", instruction: "IBAN and BIC for payment." },
        { field: "Child information", instruction: "Name, date of birth, tax ID of the child." },
        { field: "Child Attachment", instruction: "Fill out a separate attachment for each child." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Meldebescheinigung", "Steuer-ID (Antragsteller + Kind)", "Aufenthaltstitel (bei Nicht-EU)"],
      bs: ["Rodni list djeteta", "Potvrda o prijavi", "Porezni ID (podnosilac + dijete)", "Boravišna dozvola (za ne-EU)"],
      en: ["Child's birth certificate", "Registration certificate", "Tax ID (applicant + child)", "Residence permit (non-EU)"],
    },
    processingTime: { de: "4–6 Wochen", bs: "4–6 sedmica", en: "4–6 weeks" },
    commonMistakes: {
      de: ["Steuer-ID vergessen", "Anlage Kind nicht beigefügt", "Unterschrift fehlt", "Falsche Bankverbindung"],
      bs: ["Zaboravljen porezni ID", "Prilog Dijete nije priložen", "Nedostaje potpis", "Pogrešni bankovni podaci"],
      en: ["Missing tax ID", "Child attachment not included", "Missing signature", "Wrong bank details"],
    },
    officialPdf: "https://www.arbeitsagentur.de/datei/antrag-auf-kindergeld_ba015394.pdf",
    onlineLink: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld",
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
        { field: "Personalien", instruction: "Alle persönlichen Daten des Antragstellers eintragen." },
        { field: "Einkommen", instruction: "Brutto- und Nettoeinkommen aller Haushaltsmitglieder angeben." },
        { field: "Wohnkosten", instruction: "Miete, Nebenkosten und Heizkosten eintragen." },
        { field: "Vermögen", instruction: "Sparguthaben, Wertpapiere, Immobilien angeben." },
      ],
      bs: [
        { field: "Lični podaci", instruction: "Svi lični podaci podnosioca zahtjeva." },
        { field: "Primanja", instruction: "Bruto i neto primanja svih članova domaćinstva." },
        { field: "Troškovi stanovanja", instruction: "Kirija, režije i troškovi grijanja." },
        { field: "Imovina", instruction: "Štednja, vrijednosni papiri, nekretnine." },
      ],
      en: [
        { field: "Personal data", instruction: "All personal details of the applicant." },
        { field: "Income", instruction: "Gross and net income of all household members." },
        { field: "Housing costs", instruction: "Rent, utilities, and heating costs." },
        { field: "Assets", instruction: "Savings, securities, real estate." },
      ],
    },
    documents: {
      de: ["Einkommensnachweise (letzte 6 Monate)", "Mietvertrag", "Kontoauszüge", "Kindergeld-Bescheid"],
      bs: ["Dokaz o primanjima (zadnjih 6 mjeseci)", "Ugovor o najmu", "Izvodi iz računa", "Rješenje o Kindergeld-u"],
      en: ["Income proof (last 6 months)", "Rental contract", "Bank statements", "Kindergeld notice"],
    },
    processingTime: { de: "6–8 Wochen", bs: "6–8 sedmica", en: "6–8 weeks" },
    commonMistakes: {
      de: ["Einkommensnachweise unvollständig", "Mietvertrag fehlt", "Vermögen nicht angegeben"],
      bs: ["Nepotpuni dokazi o primanjima", "Nedostaje ugovor o najmu", "Imovina nije navedena"],
      en: ["Incomplete income proof", "Missing rental contract", "Assets not declared"],
    },
    officialPdf: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag",
    onlineLink: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag",
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
        { field: "Antragsteller", instruction: "Persönliche Daten beider Elternteile." },
        { field: "Lebensmonate", instruction: "Bezugsmonate festlegen (Basiselterngeld / ElterngeldPlus)." },
        { field: "Einkommen vor Geburt", instruction: "Einkommensnachweise der letzten 12 Monate vor Geburt." },
        { field: "Erwerbstätigkeit", instruction: "Geplante Arbeitszeit während des Bezugs angeben." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Lični podaci oba roditelja." },
        { field: "Mjeseci", instruction: "Odrediti mjesece korištenja (Basiselterngeld / ElterngeldPlus)." },
        { field: "Primanja prije rođenja", instruction: "Dokazi o primanjima 12 mjeseci prije porođaja." },
        { field: "Zaposlenje", instruction: "Planirano radno vrijeme tokom korištenja." },
      ],
      en: [
        { field: "Applicant", instruction: "Personal data of both parents." },
        { field: "Months", instruction: "Define benefit months (basic / ElterngeldPlus)." },
        { field: "Pre-birth income", instruction: "Income proof for 12 months before birth." },
        { field: "Employment", instruction: "Planned working hours during benefit period." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde", "Gehaltsnachweise (12 Monate)", "Bescheinigung des Arbeitgebers", "Krankenversicherungsnachweis"],
      bs: ["Rodni list", "Platne liste (12 mjeseci)", "Potvrda poslodavca", "Dokaz o zdravstvenom osiguranju"],
      en: ["Birth certificate", "Salary slips (12 months)", "Employer certificate", "Health insurance proof"],
    },
    processingTime: { de: "6–12 Wochen", bs: "6–12 sedmica", en: "6–12 weeks" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt (max. 3 Monate rückwirkend)", "Falsche Lebensmonate gewählt", "Fehlende Arbeitgeberbescheinigung"],
      bs: ["Zahtjev predan prekasno (max. 3 mjeseca retroaktivno)", "Pogrešni mjeseci odabrani", "Nedostaje potvrda poslodavca"],
      en: ["Application filed too late (max 3 months retroactive)", "Wrong months selected", "Missing employer certificate"],
    },
    officialPdf: "https://familienportal.de/familienportal/familienleistungen/elterngeld",
    onlineLink: "https://familienportal.de/familienportal/familienleistungen/elterngeld",
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
    authority: { de: "Jobcenter oder Kommune", bs: "Jobcenter ili općina", en: "Jobcenter or municipality" },
    formName: { de: "Antrag auf Leistungen für Bildung und Teilhabe", bs: "Zahtjev za obrazovne i participativne usluge", en: "Application for Education and Participation Benefits" },
    steps: {
      de: [
        { field: "Leistungsart", instruction: "Gewünschte Leistung ankreuzen: Schulbedarf, Lernförderung, Mittagessen, Ausflüge, Sport/Kultur." },
        { field: "Kind", instruction: "Name, Geburtsdatum und Schule/Kita angeben." },
        { field: "Grundleistung", instruction: "Bescheid über Bürgergeld / Wohngeld / KiZ beifügen." },
      ],
      bs: [
        { field: "Vrsta usluge", instruction: "Označiti željenu uslugu: školski materijal, dopunska nastava, ručak, izleti, sport/kultura." },
        { field: "Dijete", instruction: "Ime, datum rođenja i škola/vrtić." },
        { field: "Osnovna naknada", instruction: "Priložiti rješenje o Bürgergeld / Wohngeld / KiZ." },
      ],
      en: [
        { field: "Benefit type", instruction: "Check desired benefit: school supplies, tutoring, lunch, trips, sports/culture." },
        { field: "Child", instruction: "Name, date of birth, and school/daycare." },
        { field: "Base benefit", instruction: "Attach Bürgergeld / housing benefit / KiZ notice." },
      ],
    },
    documents: {
      de: ["Leistungsbescheid", "Schulbescheinigung", "Bestätigung des Vereins/der Schule"],
      bs: ["Rješenje o naknadi", "Potvrda škole", "Potvrda kluba/škole"],
      en: ["Benefit notice", "School certificate", "Club/school confirmation"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Keine Schulbescheinigung beigefügt", "Falsche Leistungsart angekreuzt"],
      bs: ["Nije priložena potvrda škole", "Pogrešna vrsta usluge označena"],
      en: ["No school certificate attached", "Wrong benefit type checked"],
    },
    officialPdf: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
    onlineLink: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
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
    authority: { de: "Jugendamt", bs: "Jugendamt (služba za mlade)", en: "Youth Welfare Office (Jugendamt)" },
    formName: { de: "Antrag auf Unterhaltsvorschuss", bs: "Zahtjev za alimentacijski predujam", en: "Application for Maintenance Advance" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Daten des alleinerziehenden Elternteils." },
        { field: "Kind", instruction: "Name, Alter, bei wem das Kind lebt." },
        { field: "Unterhaltspflichtiger", instruction: "Daten und Aufenthalt des anderen Elternteils (soweit bekannt)." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Podaci samohranog roditelja." },
        { field: "Dijete", instruction: "Ime, starost, kod koga dijete živi." },
        { field: "Obveznik alimentacije", instruction: "Podaci i lokacija drugog roditelja (ako je poznato)." },
      ],
      en: [
        { field: "Applicant", instruction: "Data of the single parent." },
        { field: "Child", instruction: "Name, age, who the child lives with." },
        { field: "Liable parent", instruction: "Data and whereabouts of other parent (if known)." },
      ],
    },
    documents: {
      de: ["Geburtsurkunde", "Meldebescheinigung", "Negativbescheinigung über Unterhalt", "Vaterschaftsanerkennung"],
      bs: ["Rodni list", "Potvrda o prijavi", "Dokaz o neplaćanju alimentacije", "Priznanje očinstva"],
      en: ["Birth certificate", "Registration certificate", "Proof of non-payment", "Paternity acknowledgment"],
    },
    processingTime: { de: "4–8 Wochen", bs: "4–8 sedmica", en: "4–8 weeks" },
    commonMistakes: {
      de: ["Angaben zum Unterhaltspflichtigen fehlen", "Kind nicht beim Antragsteller gemeldet"],
      bs: ["Nedostaju podaci o obvezniku alimentacije", "Dijete nije prijavljeno kod podnosioca"],
      en: ["Missing liable parent data", "Child not registered with applicant"],
    },
    officialPdf: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/unterhaltsvorschuss",
    onlineLink: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/unterhaltsvorschuss",
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
    authority: { de: "Wohngeldstelle der Gemeinde/Stadt", bs: "Služba za Wohngeld općine/grada", en: "Housing Benefit Office" },
    formName: { de: "Wohngeldantrag", bs: "Zahtjev za Wohngeld", en: "Housing Benefit Application" },
    steps: {
      de: [
        { field: "Antragsteller", instruction: "Persönliche Daten, Steuer-ID." },
        { field: "Haushaltsmitglieder", instruction: "Alle Personen im Haushalt mit Einkommen angeben." },
        { field: "Wohnung", instruction: "Adresse, Größe, Kaltmiete, Nebenkosten." },
        { field: "Einkommen", instruction: "Bruttoeinkommen aller Haushaltsmitglieder (12 Monate)." },
      ],
      bs: [
        { field: "Podnosilac", instruction: "Lični podaci, porezni ID." },
        { field: "Članovi domaćinstva", instruction: "Sve osobe u domaćinstvu sa primanjima." },
        { field: "Stan", instruction: "Adresa, veličina, hladna kirija, režije." },
        { field: "Primanja", instruction: "Bruto primanja svih članova (12 mjeseci)." },
      ],
      en: [
        { field: "Applicant", instruction: "Personal data, tax ID." },
        { field: "Household members", instruction: "All persons in the household with income." },
        { field: "Apartment", instruction: "Address, size, cold rent, utilities." },
        { field: "Income", instruction: "Gross income of all members (12 months)." },
      ],
    },
    documents: {
      de: ["Mietvertrag", "Einkommensnachweise", "Meldebescheinigung", "Kontoauszüge"],
      bs: ["Ugovor o najmu", "Dokazi o primanjima", "Potvrda o prijavi", "Izvodi iz računa"],
      en: ["Rental contract", "Income proof", "Registration certificate", "Bank statements"],
    },
    processingTime: { de: "3–6 Wochen", bs: "3–6 sedmica", en: "3–6 weeks" },
    commonMistakes: {
      de: ["Haushaltsmitglieder nicht vollständig angegeben", "Einkommen nicht aktuell", "Mietvertrag fehlt"],
      bs: ["Članovi domaćinstva nepotpuno navedeni", "Primanja nisu aktuelna", "Nedostaje ugovor o najmu"],
      en: ["Household members incomplete", "Income not current", "Missing rental contract"],
    },
    officialPdf: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
    onlineLink: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
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
    authority: { de: "Jobcenter", bs: "Jobcenter", en: "Jobcenter" },
    formName: { de: "Hauptantrag Bürgergeld (SGB II)", bs: "Glavni zahtjev za Bürgergeld (SGB II)", en: "Main Application Bürgergeld (SGB II)" },
    steps: {
      de: [
        { field: "Persönliche Daten", instruction: "Name, Geburtsdatum, Familienstand, Staatsangehörigkeit." },
        { field: "Bedarfsgemeinschaft", instruction: "Alle Personen im Haushalt (Partner, Kinder) erfassen." },
        { field: "Einkommen & Vermögen", instruction: "Alle Einkommensquellen und Vermögenswerte angeben." },
        { field: "Unterkunft", instruction: "Mietvertrag, Kosten der Unterkunft und Heizung." },
      ],
      bs: [
        { field: "Lični podaci", instruction: "Ime, datum rođenja, bračni status, državljanstvo." },
        { field: "Zajednica potreba", instruction: "Sve osobe u domaćinstvu (partner, djeca)." },
        { field: "Primanja & imovina", instruction: "Svi izvori prihoda i imovina." },
        { field: "Smještaj", instruction: "Ugovor o najmu, troškovi stanovanja i grijanja." },
      ],
      en: [
        { field: "Personal data", instruction: "Name, date of birth, marital status, nationality." },
        { field: "Needs community", instruction: "All persons in household (partner, children)." },
        { field: "Income & assets", instruction: "All income sources and assets." },
        { field: "Housing", instruction: "Rental contract, housing and heating costs." },
      ],
    },
    documents: {
      de: ["Personalausweis/Reisepass", "Mietvertrag", "Einkommensnachweise", "Kontoauszüge (3 Monate)", "Aufenthaltstitel"],
      bs: ["Lična karta/pasoš", "Ugovor o najmu", "Dokazi o primanjima", "Izvodi iz računa (3 mjeseca)", "Boravišna dozvola"],
      en: ["ID/passport", "Rental contract", "Income proof", "Bank statements (3 months)", "Residence permit"],
    },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Kontoauszüge nicht vollständig", "Bedarfsgemeinschaft falsch angegeben", "Vermögen verschwiegen"],
      bs: ["Izvodi iz računa nepotpuni", "Zajednica potreba pogrešno navedena", "Prešućena imovina"],
      en: ["Incomplete bank statements", "Needs community incorrectly stated", "Undisclosed assets"],
    },
    officialPdf: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld",
    onlineLink: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld",
  },
  {
    slug: "heizkostenzuschuss",
    category: "wohnen",
    title: { de: "Heizkostenzuschuss", bs: "Dodatak za grijanje", en: "Heating Cost Subsidy" },
    who: {
      de: "Wohngeldempfänger, BAföG-/AFBG-Empfänger.",
      bs: "Primaoci Wohngeld-a, BAföG-a ili AFBG-a.",
      en: "Recipients of housing benefit, BAföG, or AFBG.",
    },
    authority: { de: "Wohngeldstelle", bs: "Služba za Wohngeld", en: "Housing Benefit Office" },
    formName: { de: "Wird automatisch mit Wohngeld gewährt", bs: "Automatski se dodjeljuje uz Wohngeld", en: "Automatically granted with housing benefit" },
    steps: {
      de: [
        { field: "Kein separater Antrag", instruction: "Heizkostenzuschuss wird automatisch mit dem Wohngeldbescheid gewährt." },
        { field: "Wohngeldantrag", instruction: "Regulären Wohngeldantrag stellen – Heizkostenzuschuss wird berechnet." },
      ],
      bs: [
        { field: "Nema posebnog zahtjeva", instruction: "Dodatak za grijanje se automatski dodjeljuje sa Wohngeld rješenjem." },
        { field: "Wohngeld zahtjev", instruction: "Podnijeti redovni Wohngeld zahtjev – dodatak se kalkulira." },
      ],
      en: [
        { field: "No separate application", instruction: "Heating subsidy is automatically granted with housing benefit notice." },
        { field: "Housing benefit application", instruction: "File regular housing benefit application – subsidy is calculated." },
      ],
    },
    documents: { de: ["Wohngeldantrag", "Heizkostenabrechnung"], bs: ["Wohngeld zahtjev", "Obračun grijanja"], en: ["Housing benefit application", "Heating cost bill"] },
    processingTime: { de: "Mit Wohngeldbescheid", bs: "Sa Wohngeld rješenjem", en: "With housing benefit notice" },
    commonMistakes: {
      de: ["Heizkostenabrechnung nicht eingereicht"],
      bs: ["Obračun grijanja nije dostavljen"],
      en: ["Heating cost bill not submitted"],
    },
    officialPdf: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
    onlineLink: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
  },
  // ===================== ARBEIT =====================
  {
    slug: "arbeitslosengeld",
    category: "arbeit",
    title: { de: "Arbeitslosengeld I", bs: "Naknada za nezaposlenost I (ALG I)", en: "Unemployment Benefit I (ALG I)" },
    who: {
      de: "Arbeitnehmer, die in den letzten 30 Monaten mindestens 12 Monate sozialversicherungspflichtig beschäftigt waren.",
      bs: "Zaposlenici koji su u zadnjih 30 mjeseci bili najmanje 12 mjeseci socijalno osigurani.",
      en: "Employees who were employed for at least 12 months in the last 30 months.",
    },
    authority: { de: "Agentur für Arbeit", bs: "Agencija za rad", en: "Employment Agency" },
    formName: { de: "Antrag auf Arbeitslosengeld", bs: "Zahtjev za naknadu za nezaposlenost", en: "Application for Unemployment Benefit" },
    steps: {
      de: [
        { field: "Arbeitslosmeldung", instruction: "Spätestens am ersten Tag der Arbeitslosigkeit persönlich melden." },
        { field: "Arbeitssuchend-Meldung", instruction: "3 Monate vor Ende des Arbeitsverhältnisses arbeitssuchend melden." },
        { field: "Persönliche Daten", instruction: "Name, Anschrift, Steuer-ID, Bankverbindung." },
        { field: "Beschäftigungshistorie", instruction: "Letzte Arbeitgeber, Beschäftigungszeiträume." },
      ],
      bs: [
        { field: "Prijava nezaposlenosti", instruction: "Najkasnije prvog dana nezaposlenosti lično se prijaviti." },
        { field: "Prijava traženja posla", instruction: "3 mjeseca prije kraja radnog odnosa prijaviti traženje posla." },
        { field: "Lični podaci", instruction: "Ime, adresa, porezni ID, bankovni podaci." },
        { field: "Radna istorija", instruction: "Posljednji poslodavci, periodi zaposlenja." },
      ],
      en: [
        { field: "Unemployment registration", instruction: "Register in person on the first day of unemployment at the latest." },
        { field: "Job-seeking registration", instruction: "Register as job-seeking 3 months before end of employment." },
        { field: "Personal data", instruction: "Name, address, tax ID, bank details." },
        { field: "Employment history", instruction: "Previous employers, employment periods." },
      ],
    },
    documents: {
      de: ["Arbeitsbescheinigung (vom Arbeitgeber)", "Personalausweis", "Sozialversicherungsausweis", "Kündigungsschreiben"],
      bs: ["Potvrda o zaposlenju (od poslodavca)", "Lična karta", "Socijalno osiguranje", "Otkaz"],
      en: ["Employment certificate (from employer)", "ID card", "Social insurance card", "Termination letter"],
    },
    processingTime: { de: "2–3 Wochen", bs: "2–3 sedmice", en: "2–3 weeks" },
    commonMistakes: {
      de: ["Zu spät arbeitslos gemeldet (Sperrzeit!)", "Arbeitsbescheinigung fehlt", "Arbeitssuchend-Meldung versäumt"],
      bs: ["Prekasno prijavljena nezaposlenost (Sperrzeit!)", "Nedostaje potvrda o zaposlenju", "Propuštena prijava traženja posla"],
      en: ["Late unemployment registration (blocking period!)", "Missing employment certificate", "Missed job-seeking registration"],
    },
    officialPdf: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld",
    onlineLink: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld",
  },
  {
    slug: "kurzarbeitergeld",
    category: "arbeit",
    title: { de: "Kurzarbeitergeld", bs: "Naknada za skraćeno radno vrijeme", en: "Short-Time Work Benefit" },
    who: {
      de: "Arbeitnehmer, deren Arbeitszeit vorübergehend reduziert wird (beantragt durch Arbeitgeber).",
      bs: "Zaposlenici kojima je privremeno skraćeno radno vrijeme (podnosi poslodavac).",
      en: "Employees with temporarily reduced working hours (applied by employer).",
    },
    authority: { de: "Agentur für Arbeit (Arbeitgeber stellt Antrag)", bs: "Agencija za rad (poslodavac podnosi zahtjev)", en: "Employment Agency (employer applies)" },
    formName: { de: "Anzeige über Arbeitsausfall / Antrag auf Kurzarbeitergeld", bs: "Prijava gubitka rada / zahtjev za Kurzarbeitergeld", en: "Report of work loss / Short-time work application" },
    steps: {
      de: [
        { field: "Anzeige", instruction: "Arbeitgeber zeigt erheblichen Arbeitsausfall bei der Agentur für Arbeit an." },
        { field: "Antrag", instruction: "Arbeitgeber beantragt KuG monatlich für betroffene Arbeitnehmer." },
        { field: "Arbeitnehmer", instruction: "Keine eigene Antragstellung nötig – KuG wird über den Arbeitgeber ausgezahlt." },
      ],
      bs: [
        { field: "Prijava", instruction: "Poslodavac prijavljuje značajan gubitak rada Agenciji." },
        { field: "Zahtjev", instruction: "Poslodavac mjesečno podnosi zahtjev za pogođene zaposlenike." },
        { field: "Zaposlenik", instruction: "Nije potrebna vlastita prijava – isplata ide preko poslodavca." },
      ],
      en: [
        { field: "Report", instruction: "Employer reports significant work loss to the Agency." },
        { field: "Application", instruction: "Employer applies monthly for affected employees." },
        { field: "Employee", instruction: "No own application needed – paid through employer." },
      ],
    },
    documents: { de: ["Arbeitsvertrag", "Lohnabrechnungen"], bs: ["Ugovor o radu", "Platne liste"], en: ["Employment contract", "Pay slips"] },
    processingTime: { de: "Monatlich", bs: "Mjesečno", en: "Monthly" },
    commonMistakes: {
      de: ["Arbeitnehmer denkt, er muss selbst beantragen"],
      bs: ["Zaposlenik misli da sam mora podnijeti zahtjev"],
      en: ["Employee thinks they need to apply themselves"],
    },
    officialPdf: "https://www.arbeitsagentur.de/unternehmen/finanziell/kurzarbeitergeld",
    onlineLink: "https://www.arbeitsagentur.de/unternehmen/finanziell/kurzarbeitergeld",
  },
  // ===================== GESUNDHEIT =====================
  {
    slug: "krankengeld",
    category: "gesundheit",
    title: { de: "Krankengeld", bs: "Naknada za bolovanje (Krankengeld)", en: "Sick Pay (Krankengeld)" },
    who: {
      de: "Gesetzlich Krankenversicherte, die länger als 6 Wochen arbeitsunfähig sind.",
      bs: "Zakonski zdravstveno osigurani koji su duže od 6 sedmica nesposobni za rad.",
      en: "Statutory health insurance members unable to work for more than 6 weeks.",
    },
    authority: { de: "Gesetzliche Krankenkasse", bs: "Zakonska zdravstvena osiguravajuća kuća", en: "Statutory Health Insurance" },
    formName: { de: "Antrag auf Krankengeld (über Krankenkasse)", bs: "Zahtjev za Krankengeld (preko osiguranja)", en: "Sick Pay Application (via insurance)" },
    steps: {
      de: [
        { field: "AU-Bescheinigung", instruction: "Arzt stellt Arbeitsunfähigkeitsbescheinigung aus – wird digital an die Kasse gesendet." },
        { field: "Auszahlschein", instruction: "Krankenkasse sendet Auszahlschein – ausfüllen und zurücksenden." },
        { field: "Arbeitgeberbescheinigung", instruction: "Arbeitgeber bestätigt Verdienstausfall." },
      ],
      bs: [
        { field: "Ljekarsko uvjerenje", instruction: "Ljekar izdaje potvrdu o nesposobnosti – šalje se digitalno." },
        { field: "Obrazac za isplatu", instruction: "Osiguravajuća kuća šalje obrazac – popuniti i vratiti." },
        { field: "Potvrda poslodavca", instruction: "Poslodavac potvrđuje gubitak zarade." },
      ],
      en: [
        { field: "Medical certificate", instruction: "Doctor issues incapacity certificate – sent digitally." },
        { field: "Payment form", instruction: "Insurance sends payment form – fill out and return." },
        { field: "Employer certificate", instruction: "Employer confirms loss of earnings." },
      ],
    },
    documents: { de: ["AU-Bescheinigung", "Auszahlschein", "Arbeitgeberbescheinigung"], bs: ["Ljekarsko uvjerenje", "Obrazac za isplatu", "Potvrda poslodavca"], en: ["Medical certificate", "Payment form", "Employer certificate"] },
    processingTime: { de: "1–2 Wochen nach Eingang", bs: "1–2 sedmice po prijemu", en: "1–2 weeks after receipt" },
    commonMistakes: {
      de: ["AU-Bescheinigung nicht rechtzeitig eingereicht", "Auszahlschein nicht zurückgesendet"],
      bs: ["Uvjerenje nije dostavljeno na vrijeme", "Obrazac za isplatu nije vraćen"],
      en: ["Certificate not submitted on time", "Payment form not returned"],
    },
    officialPdf: "https://www.bundesgesundheitsministerium.de/krankengeld",
    onlineLink: "https://www.bundesgesundheitsministerium.de/krankengeld",
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
    authority: { de: "Pflegekasse (bei der Krankenkasse)", bs: "Kasa za njegu (pri zdravstvenom osiguranju)", en: "Care Fund (at health insurance)" },
    formName: { de: "Antrag auf Pflegeleistungen", bs: "Zahtjev za usluge njege", en: "Application for Care Benefits" },
    steps: {
      de: [
        { field: "Formloser Antrag", instruction: "Telefonisch oder schriftlich bei der Pflegekasse Antrag stellen." },
        { field: "Begutachtung", instruction: "MDK-Gutachter kommt nach Hause – Pflegebedarf wird bewertet." },
        { field: "Pflegegrad", instruction: "Pflegegrad 1–5 wird festgestellt." },
      ],
      bs: [
        { field: "Neformalni zahtjev", instruction: "Telefonski ili pismeno podnijeti zahtjev kasi za njegu." },
        { field: "Procjena", instruction: "MDK procjenitelj dolazi kući – procjenjuje potrebu za njegom." },
        { field: "Stepen njege", instruction: "Utvrđuje se stepen njege 1–5." },
      ],
      en: [
        { field: "Informal application", instruction: "Apply by phone or in writing to the care fund." },
        { field: "Assessment", instruction: "MDK assessor visits home – evaluates care needs." },
        { field: "Care level", instruction: "Care level 1–5 is determined." },
      ],
    },
    documents: { de: ["Ärztliche Unterlagen", "Medikamentenliste", "Pflegetagebuch (empfohlen)"], bs: ["Ljekarska dokumentacija", "Lista lijekova", "Dnevnik njege (preporučeno)"], en: ["Medical records", "Medication list", "Care diary (recommended)"] },
    processingTime: { de: "5 Wochen (gesetzlich)", bs: "5 sedmica (zakonski)", en: "5 weeks (by law)" },
    commonMistakes: {
      de: ["Pflegebedarf bei der Begutachtung heruntergespielt", "Kein Pflegetagebuch geführt"],
      bs: ["Potreba za njegom umanjivana tokom procjene", "Nije vođen dnevnik njege"],
      en: ["Care needs downplayed during assessment", "No care diary kept"],
    },
    officialPdf: "https://www.bundesgesundheitsministerium.de/pflegegrade",
    onlineLink: "https://www.bundesgesundheitsministerium.de/pflegegrade",
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
    authority: { de: "Deutsche Rentenversicherung / Krankenkasse", bs: "Njemačko penziono osiguranje / zdravstveno osiguranje", en: "German Pension Insurance / Health Insurance" },
    formName: { de: "Antrag auf Leistungen zur medizinischen Rehabilitation (G0100)", bs: "Zahtjev za medicinsku rehabilitaciju (G0100)", en: "Application for Medical Rehabilitation (G0100)" },
    steps: {
      de: [
        { field: "Selbsteinschätzungsbogen", instruction: "Gesundheitszustand und Einschränkungen beschreiben." },
        { field: "Ärztlicher Befundbericht", instruction: "Hausarzt erstellt Befundbericht (G0160)." },
        { field: "Arbeitgeberbescheinigung", instruction: "Aktuelle Beschäftigungssituation bestätigen lassen." },
      ],
      bs: [
        { field: "Samoprocjena", instruction: "Opisati zdravstveno stanje i ograničenja." },
        { field: "Ljekarski nalaz", instruction: "Porodični ljekar sastavlja nalaz (G0160)." },
        { field: "Potvrda poslodavca", instruction: "Potvrditi trenutnu radnu situaciju." },
      ],
      en: [
        { field: "Self-assessment", instruction: "Describe health status and limitations." },
        { field: "Medical report", instruction: "Family doctor creates medical report (G0160)." },
        { field: "Employer certificate", instruction: "Confirm current employment situation." },
      ],
    },
    documents: { de: ["Befundbericht", "Arztbriefe", "Medikamentenplan"], bs: ["Ljekarski nalaz", "Ljekarski dopisi", "Plan lijekova"], en: ["Medical report", "Doctor's letters", "Medication plan"] },
    processingTime: { de: "3–6 Wochen", bs: "3–6 sedmica", en: "3–6 weeks" },
    commonMistakes: {
      de: ["Befundbericht unvollständig", "Antrag bei falscher Stelle eingereicht"],
      bs: ["Nepotpun ljekarski nalaz", "Zahtjev podnesen na pogrešnom mjestu"],
      en: ["Incomplete medical report", "Application filed at wrong office"],
    },
    officialPdf: "https://www.deutsche-rentenversicherung.de/DRV/DE/Reha/reha_node.html",
    onlineLink: "https://www.deutsche-rentenversicherung.de/DRV/DE/Reha/reha_node.html",
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
    authority: { de: "BAföG-Amt / Studierendenwerk", bs: "BAföG-ured / Studierendenwerk", en: "BAföG Office / Student Services" },
    formName: { de: "BAföG-Antrag (FormBlatt 1–8)", bs: "BAföG zahtjev (FormBlatt 1–8)", en: "BAföG Application (Form 1–8)" },
    steps: {
      de: [
        { field: "FormBlatt 1", instruction: "Persönliche Daten, Ausbildungsstätte, Wohnung." },
        { field: "FormBlatt 3", instruction: "Einkommen der Eltern (von Eltern auszufüllen)." },
        { field: "FormBlatt 5", instruction: "Leistungsnachweis ab dem 5. Semester." },
        { field: "Vermögenserklärung", instruction: "Eigenes Vermögen angeben." },
      ],
      bs: [
        { field: "FormBlatt 1", instruction: "Lični podaci, obrazovna ustanova, stan." },
        { field: "FormBlatt 3", instruction: "Primanja roditelja (popunjavaju roditelji)." },
        { field: "FormBlatt 5", instruction: "Potvrda o uspjehu od 5. semestra." },
        { field: "Izjava o imovini", instruction: "Navesti vlastitu imovinu." },
      ],
      en: [
        { field: "Form 1", instruction: "Personal data, educational institution, housing." },
        { field: "Form 3", instruction: "Parental income (to be filled by parents)." },
        { field: "Form 5", instruction: "Performance certificate from 5th semester." },
        { field: "Asset declaration", instruction: "Declare own assets." },
      ],
    },
    documents: {
      de: ["Immatrikulationsbescheinigung", "Einkommensnachweise der Eltern", "Mietvertrag", "Kontoauszüge"],
      bs: ["Potvrda o upisu", "Dokazi o primanjima roditelja", "Ugovor o najmu", "Izvodi iz računa"],
      en: ["Enrollment certificate", "Parental income proof", "Rental contract", "Bank statements"],
    },
    processingTime: { de: "6–10 Wochen", bs: "6–10 sedmica", en: "6–10 weeks" },
    commonMistakes: {
      de: ["Antrag zu spät gestellt (kein rückwirkendes BAföG)", "FormBlatt 3 fehlt", "Vermögen nicht angegeben"],
      bs: ["Zahtjev predan prekasno (nema retroaktivnog BAföG)", "FormBlatt 3 nedostaje", "Imovina nije navedena"],
      en: ["Application too late (no retroactive BAföG)", "Form 3 missing", "Assets not declared"],
    },
    officialPdf: "https://www.bafoeg.bmas.de/",
    onlineLink: "https://www.bafoeg.bmas.de/",
  },
  {
    slug: "schueler-bafoeg",
    category: "bildung",
    title: { de: "Schüler-BAföG", bs: "Učenički BAföG", en: "Student BAföG (School)" },
    who: {
      de: "Schüler ab Klasse 10 an weiterführenden Schulen, Berufsfachschulen, Fachoberschulen.",
      bs: "Učenici od 10. razreda na srednjim školama, stručnim školama.",
      en: "Students from grade 10 at secondary schools, vocational schools.",
    },
    authority: { de: "Amt für Ausbildungsförderung der Stadt/Kreis", bs: "Ured za obrazovnu potporu grada/okruga", en: "Training Support Office of city/county" },
    formName: { de: "BAföG-Antrag für Schüler", bs: "BAföG zahtjev za učenike", en: "BAföG Application for School Students" },
    steps: {
      de: [
        { field: "Schulbescheinigung", instruction: "Aktuelle Schulbescheinigung beifügen." },
        { field: "Elterneinkommen", instruction: "FormBlatt 3 von den Eltern ausfüllen lassen." },
        { field: "Wohnsituation", instruction: "Angeben ob man bei den Eltern oder allein wohnt." },
      ],
      bs: [
        { field: "Potvrda škole", instruction: "Priložiti aktuelnu potvrdu škole." },
        { field: "Primanja roditelja", instruction: "FormBlatt 3 dati roditeljima da popune." },
        { field: "Stambena situacija", instruction: "Navesti da li živite kod roditelja ili samostalno." },
      ],
      en: [
        { field: "School certificate", instruction: "Attach current school certificate." },
        { field: "Parental income", instruction: "Have parents fill out Form 3." },
        { field: "Living situation", instruction: "State whether living with parents or alone." },
      ],
    },
    documents: { de: ["Schulbescheinigung", "Einkommensnachweise Eltern", "Mietvertrag"], bs: ["Potvrda škole", "Dokazi o primanjima roditelja", "Ugovor o najmu"], en: ["School certificate", "Parental income proof", "Rental contract"] },
    processingTime: { de: "4–8 Wochen", bs: "4–8 sedmica", en: "4–8 weeks" },
    commonMistakes: {
      de: ["Schulbescheinigung fehlt", "Vorteil: Schüler-BAföG muss nicht zurückgezahlt werden!"],
      bs: ["Nedostaje potvrda škole", "Prednost: učenički BAföG se ne mora vraćati!"],
      en: ["Missing school certificate", "Advantage: school BAföG does not need to be repaid!"],
    },
    officialPdf: "https://www.bafoeg.bmas.de/",
    onlineLink: "https://www.bafoeg.bmas.de/",
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
    formName: { de: "Antrag auf Lernförderung (Teil des BuT)", bs: "Zahtjev za dopunsku nastavu (dio BuT)", en: "Learning Support Application (part of BuT)" },
    steps: {
      de: [
        { field: "Bestätigung der Schule", instruction: "Lehrer bestätigt, dass das Lernziel gefährdet ist." },
        { field: "Nachhilfeanbieter", instruction: "Nachhilfeanbieter benennen und Kosten angeben." },
      ],
      bs: [
        { field: "Potvrda škole", instruction: "Nastavnik potvrđuje da je obrazovni cilj ugrožen." },
        { field: "Ponuđač instrukcija", instruction: "Navesti ponuđača i troškove." },
      ],
      en: [
        { field: "School confirmation", instruction: "Teacher confirms learning goals are at risk." },
        { field: "Tutoring provider", instruction: "Name provider and state costs." },
      ],
    },
    documents: { de: ["Schulbestätigung", "Leistungsbescheid (BuT)"], bs: ["Potvrda škole", "Rješenje (BuT)"], en: ["School confirmation", "BuT benefit notice"] },
    processingTime: { de: "2–4 Wochen", bs: "2–4 sedmice", en: "2–4 weeks" },
    commonMistakes: {
      de: ["Schulbestätigung nicht eingereicht", "Nachhilfe vor Bewilligung begonnen"],
      bs: ["Potvrda škole nije dostavljena", "Instrukcije počele prije odobrenja"],
      en: ["School confirmation not submitted", "Tutoring started before approval"],
    },
    officialPdf: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
    onlineLink: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
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
    authority: { de: "Jugendamt", bs: "Jugendamt", en: "Youth Welfare Office" },
    formName: { de: "Antrag auf Übernahme der Kita-Kosten", bs: "Zahtjev za pokrivanje troškova vrtića", en: "Application for Daycare Cost Coverage" },
    steps: {
      de: [
        { field: "Kita-Vertrag", instruction: "Betreuungsvertrag mit der Kita beifügen." },
        { field: "Einkommen", instruction: "Einkommensnachweise der Eltern vorlegen." },
        { field: "Bescheid", instruction: "Leistungsbescheid (Bürgergeld/Wohngeld) beifügen falls vorhanden." },
      ],
      bs: [
        { field: "Ugovor sa vrtićem", instruction: "Priložiti ugovor o čuvanju djece." },
        { field: "Primanja", instruction: "Priložiti dokaze o primanjima roditelja." },
        { field: "Rješenje", instruction: "Priložiti rješenje (Bürgergeld/Wohngeld) ako postoji." },
      ],
      en: [
        { field: "Daycare contract", instruction: "Attach childcare agreement." },
        { field: "Income", instruction: "Submit parental income proof." },
        { field: "Benefit notice", instruction: "Attach benefit notice (Bürgergeld/Wohngeld) if applicable." },
      ],
    },
    documents: { de: ["Kita-Vertrag", "Einkommensnachweise", "Geburtsurkunde"], bs: ["Ugovor sa vrtićem", "Dokazi o primanjima", "Rodni list"], en: ["Daycare contract", "Income proof", "Birth certificate"] },
    processingTime: { de: "4–6 Wochen", bs: "4–6 sedmica", en: "4–6 weeks" },
    commonMistakes: {
      de: ["Antrag zu spät – keine rückwirkende Erstattung", "Kita-Vertrag fehlt"],
      bs: ["Zahtjev predan prekasno – nema retroaktivne naknade", "Nedostaje ugovor sa vrtićem"],
      en: ["Application too late – no retroactive refund", "Missing daycare contract"],
    },
    officialPdf: "https://www.gesetze-im-internet.de/sgb_8/",
    onlineLink: "https://www.gesetze-im-internet.de/sgb_8/",
  },
];

export function getGuidesByCategory(category: Guide["category"]) {
  return guides.filter((g) => g.category === category);
}

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}
