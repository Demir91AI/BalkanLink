export type Language = "bs" | "hr" | "sr" | "me" | "sq" | "mk" | "de" | "en";

export interface LanguageInfo {
  code: Language;
  name: string;
  country: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "bs", name: "Bosanski", country: "Bosna i Hercegovina", flag: "🇧🇦" },
  { code: "hr", name: "Hrvatski", country: "Hrvatska", flag: "🇭🇷" },
  { code: "sr", name: "Srpski", country: "Srbija", flag: "🇷🇸" },
  { code: "me", name: "Crnogorski", country: "Crna Gora", flag: "🇲🇪" },
  { code: "sq", name: "Shqip", country: "Shqipëria", flag: "🇦🇱" },
  { code: "mk", name: "Македонски", country: "Македонија", flag: "🇲🇰" },
  { code: "de", name: "Deutsch", country: "Deutschland", flag: "🇩🇪" },
  { code: "en", name: "English", country: "United Kingdom", flag: "🇬🇧" },
];

type TranslationKeys = {
  // Nav
  "nav.home": string;
  "nav.qa": string;
  "nav.directory": string;
  "nav.login": string;
  "nav.register": string;
  "nav.logout": string;

  // Hero
  "hero.slide1.title": string;
  "hero.slide1.subtitle": string;
  "hero.slide2.title": string;
  "hero.slide2.subtitle": string;
  "hero.slide3.title": string;
  "hero.slide3.subtitle": string;

  // CTA cards
  "cta.new.title": string;
  "cta.new.desc": string;
  "cta.daily.title": string;
  "cta.daily.desc": string;
  "cta.help.title": string;
  "cta.help.desc": string;

  // Countries
  "countries.title": string;

  // Categories
  "categories.title": string;
  "categories.subtitle": string;

  // Business
  "business.title": string;
  "business.subtitle": string;
  "business.search": string;
  "business.add": string;

  // QA page
  "qa.title": string;
  "qa.subtitle": string;
  "qa.search": string;
  "qa.all": string;
  "qa.results": string;
  "qa.empty": string;
};

const translations: Record<Language, TranslationKeys> = {
  bs: {
    "nav.home": "Početna",
    "nav.qa": "Pitanja i odgovori",
    "nav.directory": "Imenik",
    "nav.login": "Prijava",
    "nav.register": "Registracija",
    "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Njemačkoj",
    "hero.slide1.subtitle": "Provjerene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "München, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, CV, intervju i radna prava — sve na jednom mjestu.",
    "cta.new.title": "Počni ovdje",
    "cta.new.desc": "Dokumenti, prijava, prvi koraci.",
    "cta.daily.title": "Život & savjeti",
    "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Trebam pomoć",
    "cta.help.desc": "Brza rješenja za probleme.",
    "countries.title": "Za cijeli Balkan",
    "categories.title": "Kategorije",
    "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?",
    "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.",
    "business.search": "Pretraži imenik",
    "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori",
    "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na našem jeziku.",
    "qa.search": "Pretraži...",
    "qa.all": "Sve teme",
    "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj sa drugim pojmom.",
  },
  hr: {
    "nav.home": "Početna",
    "nav.qa": "Pitanja i odgovori",
    "nav.directory": "Imenik",
    "nav.login": "Prijava",
    "nav.register": "Registracija",
    "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Njemačkoj",
    "hero.slide1.subtitle": "Provjerene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "München, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, životopis, intervju i radna prava — sve na jednom mjestu.",
    "cta.new.title": "Počni ovdje",
    "cta.new.desc": "Dokumenti, prijava, prvi koraci.",
    "cta.daily.title": "Život & savjeti",
    "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Trebam pomoć",
    "cta.help.desc": "Brza rješenja za probleme.",
    "countries.title": "Za cijeli Balkan",
    "categories.title": "Kategorije",
    "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?",
    "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.",
    "business.search": "Pretraži imenik",
    "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori",
    "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na tvom jeziku.",
    "qa.search": "Pretraži...",
    "qa.all": "Sve teme",
    "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj s drugim pojmom.",
  },
  sr: {
    "nav.home": "Početna",
    "nav.qa": "Pitanja i odgovori",
    "nav.directory": "Imenik",
    "nav.login": "Prijava",
    "nav.register": "Registracija",
    "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Nemačkoj",
    "hero.slide1.subtitle": "Proverene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "Minhen, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, CV, intervju i radna prava — sve na jednom mestu.",
    "cta.new.title": "Počni ovde",
    "cta.new.desc": "Dokumenta, prijava, prvi koraci.",
    "cta.daily.title": "Život & saveti",
    "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Treba mi pomoć",
    "cta.help.desc": "Brza rešenja za probleme.",
    "countries.title": "Za ceo Balkan",
    "categories.title": "Kategorije",
    "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?",
    "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za celu zajednicu.",
    "business.search": "Pretraži imenik",
    "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori",
    "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na tvom jeziku.",
    "qa.search": "Pretraži...",
    "qa.all": "Sve teme",
    "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj sa drugim pojmom.",
  },
  me: {
    "nav.home": "Početna",
    "nav.qa": "Pitanja i odgovori",
    "nav.directory": "Imenik",
    "nav.login": "Prijava",
    "nav.register": "Registracija",
    "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Njemačkoj",
    "hero.slide1.subtitle": "Provjerene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "Minhen, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, CV, intervju i radna prava — sve na jednom mjestu.",
    "cta.new.title": "Počni ovđe",
    "cta.new.desc": "Dokumenta, prijava, prvi koraci.",
    "cta.daily.title": "Život & savjeti",
    "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Trebam pomoć",
    "cta.help.desc": "Brza rješenja za probleme.",
    "countries.title": "Za cijeli Balkan",
    "categories.title": "Kategorije",
    "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?",
    "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.",
    "business.search": "Pretraži imenik",
    "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori",
    "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na tvom jeziku.",
    "qa.search": "Pretraži...",
    "qa.all": "Sve teme",
    "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj sa drugim pojmom.",
  },
  sq: {
    "nav.home": "Ballina",
    "nav.qa": "Pyetje dhe përgjigje",
    "nav.directory": "Drejtoria",
    "nav.login": "Hyrje",
    "nav.register": "Regjistrohu",
    "nav.logout": "Dilni",
    "hero.slide1.title": "Udhëzuesi yt për jetën në Gjermani",
    "hero.slide1.subtitle": "Informacione të verifikuara, hap pas hapi — në gjuhën tënde.",
    "hero.slide2.title": "Qytete që bëhen shtëpi",
    "hero.slide2.subtitle": "Mynih, Berlin, Frankfurt — gjej rrugën tënde.",
    "hero.slide3.title": "Karrierë pa kufij",
    "hero.slide3.subtitle": "Punë, CV, intervistë dhe të drejtat e punës — gjithçka në një vend.",
    "cta.new.title": "Fillo këtu",
    "cta.new.desc": "Dokumentet, regjistrimi, hapat e parë.",
    "cta.daily.title": "Jeta & këshilla",
    "cta.daily.desc": "Banesë, punë, taksa, shëndetësi.",
    "cta.help.title": "Kam nevojë ndihmë",
    "cta.help.desc": "Zgjidhje të shpejta për probleme.",
    "countries.title": "Për gjithë Ballkanin",
    "categories.title": "Kategoritë",
    "categories.subtitle": "Zgjidh temën dhe gjej përgjigjen për disa sekonda.",
    "business.title": "Ke biznes?",
    "business.subtitle": "Shto biznesin tënd në drejtorinë tonë dhe bëhu i dukshëm.",
    "business.search": "Kërko drejtorinë",
    "business.add": "Shto biznesin tënd",
    "qa.title": "Pyetje dhe përgjigje",
    "qa.subtitle": "Gjej përgjigjen e pyetjes tënde — shpejt dhe në gjuhën tënde.",
    "qa.search": "Kërko...",
    "qa.all": "Të gjitha temat",
    "qa.results": "rezultate",
    "qa.empty": "Nuk ka rezultate. Provo me një term tjetër.",
  },
  mk: {
    "nav.home": "Почетна",
    "nav.qa": "Прашања и одговори",
    "nav.directory": "Именик",
    "nav.login": "Најава",
    "nav.register": "Регистрација",
    "nav.logout": "Одјава",
    "hero.slide1.title": "Твој водич за живот во Германија",
    "hero.slide1.subtitle": "Проверени информации, чекор по чекор — на твој јазик.",
    "hero.slide2.title": "Градови кои стануваат дом",
    "hero.slide2.subtitle": "Минхен, Берлин, Франкфурт — пронајди го твојот пат.",
    "hero.slide3.title": "Кариера без граници",
    "hero.slide3.subtitle": "Работа, CV, интервју и работнички права — сè на едно место.",
    "cta.new.title": "Почни тука",
    "cta.new.desc": "Документи, пријава, први чекори.",
    "cta.daily.title": "Живот & совети",
    "cta.daily.desc": "Стан, работа, даноци, здравство.",
    "cta.help.title": "Ми треба помош",
    "cta.help.desc": "Брзи решенија за проблеми.",
    "countries.title": "За цел Балкан",
    "categories.title": "Категории",
    "categories.subtitle": "Избери тема и пронајди одговор за неколку секунди.",
    "business.title": "Имаш бизнис?",
    "business.subtitle": "Додај го твојот бизнис во нашиот именик и биди видлив за целата заедница.",
    "business.search": "Пребарај именик",
    "business.add": "Додај го твојот бизнис",
    "qa.title": "Прашања и одговори",
    "qa.subtitle": "Пронајди одговор на твоето прашање — брзо и на твој јазик.",
    "qa.search": "Пребарај...",
    "qa.all": "Сите теми",
    "qa.results": "резултати",
    "qa.empty": "Нема резултати. Обиди се со друг поим.",
  },
  de: {
    "nav.home": "Startseite",
    "nav.qa": "Fragen & Antworten",
    "nav.directory": "Verzeichnis",
    "nav.login": "Anmelden",
    "nav.register": "Registrieren",
    "nav.logout": "Abmelden",
    "hero.slide1.title": "Dein Guide für das Leben in Deutschland",
    "hero.slide1.subtitle": "Geprüfte Informationen, Schritt für Schritt — in deiner Sprache.",
    "hero.slide2.title": "Städte, die zur Heimat werden",
    "hero.slide2.subtitle": "München, Berlin, Frankfurt — finde deinen Weg.",
    "hero.slide3.title": "Karriere ohne Grenzen",
    "hero.slide3.subtitle": "Job, Lebenslauf, Vorstellungsgespräch und Arbeitsrecht — alles an einem Ort.",
    "cta.new.title": "Starte hier",
    "cta.new.desc": "Dokumente, Anmeldung, erste Schritte.",
    "cta.daily.title": "Leben & Tipps",
    "cta.daily.desc": "Wohnung, Arbeit, Steuern, Gesundheit.",
    "cta.help.title": "Hilfe nötig",
    "cta.help.desc": "Schnelle Lösungen für Probleme.",
    "countries.title": "Für den gesamten Balkan",
    "categories.title": "Kategorien",
    "categories.subtitle": "Wähle ein Thema und finde die Antwort in Sekunden.",
    "business.title": "Hast du ein Geschäft?",
    "business.subtitle": "Füge dein Unternehmen in unser Verzeichnis ein und werde sichtbar.",
    "business.search": "Verzeichnis durchsuchen",
    "business.add": "Geschäft hinzufügen",
    "qa.title": "Fragen & Antworten",
    "qa.subtitle": "Finde die Antwort auf deine Frage — schnell und in deiner Sprache.",
    "qa.search": "Suchen...",
    "qa.all": "Alle Themen",
    "qa.results": "Ergebnisse",
    "qa.empty": "Keine Ergebnisse. Versuche einen anderen Suchbegriff.",
  },
  en: {
    "nav.home": "Home",
    "nav.qa": "Q&A",
    "nav.directory": "Directory",
    "nav.login": "Sign in",
    "nav.register": "Sign up",
    "nav.logout": "Sign out",
    "hero.slide1.title": "Your guide to life in Germany",
    "hero.slide1.subtitle": "Verified information, step by step — in your language.",
    "hero.slide2.title": "Cities that become home",
    "hero.slide2.subtitle": "Munich, Berlin, Frankfurt — find your way.",
    "hero.slide3.title": "Career without borders",
    "hero.slide3.subtitle": "Jobs, CV, interview and work rights — all in one place.",
    "cta.new.title": "Start here",
    "cta.new.desc": "Documents, registration, first steps.",
    "cta.daily.title": "Life & tips",
    "cta.daily.desc": "Housing, work, taxes, healthcare.",
    "cta.help.title": "Need help",
    "cta.help.desc": "Quick solutions for problems.",
    "countries.title": "For the entire Balkans",
    "categories.title": "Categories",
    "categories.subtitle": "Pick a topic and find the answer in seconds.",
    "business.title": "Have a business?",
    "business.subtitle": "Add your business to our directory and become visible to the community.",
    "business.search": "Browse directory",
    "business.add": "Add your business",
    "qa.title": "Questions & Answers",
    "qa.subtitle": "Find the answer to your question — fast and in your language.",
    "qa.search": "Search...",
    "qa.all": "All topics",
    "qa.results": "results",
    "qa.empty": "No results. Try a different term.",
  },
};

export function getTranslation(lang: Language, key: keyof TranslationKeys): string {
  return translations[lang]?.[key] ?? translations.bs[key] ?? key;
}
