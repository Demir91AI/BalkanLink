export type Language = "bs" | "hr" | "sr" | "me" | "sq" | "mk" | "xk" | "de" | "en";

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
  { code: "xk", name: "Shqip (Kosovo)", country: "Kosova", flag: "🇽🇰" },
  { code: "mk", name: "Македонски", country: "Македонија", flag: "🇲🇰" },
  { code: "de", name: "Deutsch", country: "Deutschland", flag: "🇩🇪" },
  { code: "en", name: "English", country: "United Kingdom", flag: "🇬🇧" },
];

type TranslationKeys = {
  "nav.home": string; "nav.qa": string; "nav.directory": string; "nav.missions": string;
  "nav.login": string; "nav.register": string; "nav.logout": string; "nav.plus": string;
  "hero.slide1.title": string; "hero.slide1.subtitle": string;
  "hero.slide2.title": string; "hero.slide2.subtitle": string;
  "hero.slide3.title": string; "hero.slide3.subtitle": string;
  "cta.new.title": string; "cta.new.desc": string;
  "cta.daily.title": string; "cta.daily.desc": string;
  "cta.help.title": string; "cta.help.desc": string;
  "countries.title": string;
  "categories.title": string; "categories.subtitle": string;
  "business.title": string; "business.subtitle": string;
  "business.search": string; "business.add": string;
  "qa.title": string; "qa.subtitle": string; "qa.search": string;
  "qa.all": string; "qa.results": string; "qa.empty": string;
  "dir.title": string; "dir.subtitle": string; "dir.add": string;
  "dir.searchPlaceholder": string;
  "dir.filterCity": string; "dir.filterCategory": string; "dir.filterOrigin": string;
  "dir.allCities": string; "dir.allCategories": string; "dir.allOrigins": string;
  "dir.results": string; "dir.clearFilters": string; "dir.empty": string;
  "dir.submitTitle": string; "dir.submitSubtitle": string; "dir.backToDirectory": string;
  "dir.fieldName": string; "dir.fieldCategory": string; "dir.fieldCity": string;
  "dir.fieldOrigin": string; "dir.fieldAddress": string; "dir.fieldPhone": string;
  "dir.fieldWebsite": string; "dir.fieldDescription": string;
  "dir.submit": string; "dir.submitting": string;
  "dir.submitSuccess": string; "dir.submitError": string; "dir.loginRequired": string;
  "missions.title": string; "missions.subtitle": string;
  "missions.filterCountry": string; "missions.filterCity": string; "missions.filterType": string;
  "missions.allCountries": string; "missions.allCities": string; "missions.allTypes": string;
  "missions.embassy": string; "missions.consulate": string;
  "missions.results": string; "missions.clearFilters": string; "missions.empty": string;
  "portal.dolazak": string; "portal.dolazak.desc": string;
  "portal.stan": string; "portal.stan.desc": string;
  "portal.jobs": string; "portal.jobs.desc": string;
  "portal.familie": string; "portal.familie.desc": string;
  "portal.foerderungen": string; "portal.foerderungen.desc": string;
  "portal.formulare": string; "portal.formulare.desc": string;
  "portal.tools": string; "portal.tools.desc": string;
  "portal.ambasade": string; "portal.ambasade.desc": string;
  "portal.community": string; "portal.community.desc": string;
  "footer.imprint": string; "footer.privacy": string; "footer.contact": string;
  "footer.copyright": string; "footer.disclaimer": string;
  "footer.tagline": string; "footer.navSection": string; "footer.legalSection": string;
  "footer.trustSection": string; "footer.navHome": string; "footer.navHow": string;
  "footer.navPremium": string; "footer.trustRating": string; "footer.trustUsers": string;
  "wohnungen.title": string; "wohnungen.subtitle": string;
  "wohnungen.city": string; "wohnungen.bundesland": string; "wohnungen.radius": string;
  "wohnungen.allGermany": string; "wohnungen.maxRent": string; "wohnungen.rooms": string;
  "wohnungen.wg": string; "wohnungen.furnished": string; "wohnungen.shortTerm": string;
  "wohnungen.longTerm": string; "wohnungen.search": string; "wohnungen.showMore": string;
  "wohnungen.showLess": string; "wohnungen.portals": string;
  "wohnungen.portalBig": string; "wohnungen.portalWg": string; "wohnungen.portalSocial": string; "wohnungen.portalShort": string;
  "jobs.title": string; "jobs.subtitle": string;
  "jobs.city": string; "jobs.bundesland": string; "jobs.radius": string;
  "jobs.allGermany": string; "jobs.branche": string; "jobs.vertragsart": string;
  "jobs.noDeutsch": string; "jobs.mitUnterkunft": string; "jobs.quereinsteiger": string;
  "jobs.schnellerEinstieg": string; "jobs.search": string; "jobs.showMore": string;
  "jobs.showLess": string; "jobs.portals": string;
  "jobs.portalStaatlich": string; "jobs.portalGross": string; "jobs.portalSpezial": string;
  "jobs.allBranchen": string;
  "branche.pflege": string; "branche.bau": string; "branche.logistik": string;
  "branche.produktion": string; "branche.reinigung": string; "branche.gastro": string;
  "branche.it": string; "branche.handwerk": string; "branche.buero": string; "branche.ausbildung": string;
  "vertrag.vollzeit": string; "vertrag.teilzeit": string;
  "vertrag.ausbildung": string; "vertrag.praktikum": string; "vertrag.minijob": string;
  "cta.register": string;
  "auth.loginTitle": string; "auth.loginDesc": string; "auth.email": string; "auth.password": string;
  "auth.loginButton": string; "auth.loginLoading": string; "auth.loginError": string; "auth.loginSuccess": string;
  "auth.registerTitle": string; "auth.registerDesc": string; "auth.confirmPassword": string;
  "auth.registerButton": string; "auth.registerLoading": string;
  "auth.passwordMismatch": string; "auth.passwordTooShort": string;
  "auth.registerError": string; "auth.registerSuccess": string; "auth.registerCheckEmail": string;
  "auth.haveAccount": string; "auth.forgotPassword": string; "auth.noAccount": string;
  "auth.forgotTitle": string; "auth.forgotDesc": string;
  "auth.sendLink": string; "auth.sending": string;
  "auth.checkEmail": string; "auth.checkEmailDesc": string; "auth.backToLogin": string;
  "auth.resetTitle": string; "auth.resetDesc": string; "auth.newPassword": string;
  "auth.saveButton": string; "auth.saving": string;
  "auth.resetWaiting": string; "auth.resetWaitingDesc": string; "auth.passwordChanged": string;
  "auth.minChars": string;
  "footer.legal": string; "footer.haftung": string; "footer.mitgliedschaft": string; "footer.kiHinweis": string;
  "hero.cta.register": string; "hero.cta.firstSteps": string;
  "notfound.title": string; "notfound.desc": string; "notfound.back": string;
  "common.error": string; "common.legalBasis": string; "common.officialSource": string; "common.moreSource": string;
  "common.all": string;
  // Home page
  "home.hero.title": string; "home.hero.highlight": string; "home.hero.subtitle": string;
  "home.hero.cta": string; "home.hero.howItWorks": string;
  "home.card.majstor": string; "home.card.posao": string; "home.card.stan": string;
  "home.card.papiri": string; "home.card.restorani": string; "home.card.dzamije": string;
  "home.card.prevoz": string; "home.card.pitanje": string;
  "home.trust.title": string; "home.trust.subtitle": string; "home.trust.community": string;
  "home.example.1": string; "home.example.2": string; "home.example.3": string;
  "home.example.4": string; "home.example.5": string;
  "home.testimonials.title": string; "home.testimonials.cities": string;
  "home.review1.text": string; "home.review2.text": string;
  "home.review3.text": string; "home.review4.text": string;
  "home.premium.title": string; "home.premium.subtitle": string;
  "home.premium.step1": string; "home.premium.step2": string; "home.premium.step3": string;
  "home.premium.step4": string; "home.premium.step5": string;
  "home.premium.cta": string; "home.premium.cancel": string;
  // Premium page
  "premium.badge": string; "premium.title": string; "premium.subtitle": string;
  "premium.price": string; "premium.heroCta": string; "premium.heroFree": string;
  "premium.compareTitle": string; "premium.compareSubtitle": string;
  "premium.row.categories": string; "premium.row.community": string;
  "premium.row.ai": string; "premium.row.search": string;
  "premium.row.forms": string; "premium.row.assistant": string;
  "premium.row.templates": string; "premium.row.priority": string; "premium.row.badge": string;
  "premium.pricingTitle": string; "premium.pricingSubtitle": string;
  "premium.monthly": string; "premium.yearly": string;
  "premium.perMonth": string; "premium.perYear": string;
  "premium.flexible": string; "premium.bestOffer": string; "premium.save": string;
  "premium.active": string; "premium.soon": string;
  "premium.noContract": string; "premium.cancelAnytime": string; "premium.forCommunity": string;
  "premium.free": string; "premium.function": string;
};

// --- Shared partial blocks ---
const dirBs: Partial<TranslationKeys> = {
  "dir.title": "Poslovni imenik",
  "dir.subtitle": "Pronađi balkanske biznise u Njemačkoj.",
  "dir.add": "Dodaj biznis",
  "dir.searchPlaceholder": "Pretraži po imenu, gradu...",
  "dir.filterCity": "Grad", "dir.filterCategory": "Kategorija", "dir.filterOrigin": "Zemlja porijekla",
  "dir.allCities": "Svi gradovi", "dir.allCategories": "Sve kategorije", "dir.allOrigins": "Sve zemlje",
  "dir.results": "rezultata", "dir.clearFilters": "Obriši filtere", "dir.empty": "Nema biznisa za prikaz.",
  "dir.submitTitle": "Dodaj svoj biznis",
  "dir.submitSubtitle": "Popuni formu i tvoj biznis će biti vidljiv nakon provjere.",
  "dir.backToDirectory": "Nazad na imenik",
  "dir.fieldName": "Naziv biznisa", "dir.fieldCategory": "Kategorija", "dir.fieldCity": "Grad",
  "dir.fieldOrigin": "Zemlja porijekla", "dir.fieldAddress": "Adresa", "dir.fieldPhone": "Telefon",
  "dir.fieldWebsite": "Web stranica", "dir.fieldDescription": "Opis",
  "dir.submit": "Pošalji", "dir.submitting": "Šalje se...",
  "dir.submitSuccess": "Biznis je dodan! Bit će vidljiv nakon provjere.",
  "dir.submitError": "Greška. Pokušaj ponovo.",
  "dir.loginRequired": "Moraš biti prijavljen da dodaš biznis.",
};

const dirSq: Partial<TranslationKeys> = {
  "dir.title": "Drejtoria e bizneseve",
  "dir.subtitle": "Gjej bizneset ballkanike në Gjermani.",
  "dir.add": "Shto biznes",
  "dir.searchPlaceholder": "Kërko sipas emrit, qytetit...",
  "dir.filterCity": "Qyteti", "dir.filterCategory": "Kategoria", "dir.filterOrigin": "Vendi i origjinës",
  "dir.allCities": "Të gjitha qytetet", "dir.allCategories": "Të gjitha kategoritë", "dir.allOrigins": "Të gjitha vendet",
  "dir.results": "rezultate", "dir.clearFilters": "Pastro filtrat", "dir.empty": "Nuk ka biznese për të shfaqur.",
  "dir.submitTitle": "Shto biznesin tënd",
  "dir.submitSubtitle": "Plotëso formularin dhe biznesi yt do të jetë i dukshëm pas verifikimit.",
  "dir.backToDirectory": "Kthehu në drejtori",
  "dir.fieldName": "Emri i biznesit", "dir.fieldCategory": "Kategoria", "dir.fieldCity": "Qyteti",
  "dir.fieldOrigin": "Vendi i origjinës", "dir.fieldAddress": "Adresa", "dir.fieldPhone": "Telefoni",
  "dir.fieldWebsite": "Faqja web", "dir.fieldDescription": "Përshkrimi",
  "dir.submit": "Dërgo", "dir.submitting": "Duke dërguar...",
  "dir.submitSuccess": "Biznesi u shtua! Do të jetë i dukshëm pas verifikimit.",
  "dir.submitError": "Gabim. Provo përsëri.",
  "dir.loginRequired": "Duhet të jesh i kyçur për të shtuar biznes.",
};

const missionsBs: Partial<TranslationKeys> = {
  "nav.missions": "Ambasade",
  "missions.title": "Balkanske ambasade i konzulati u Njemačkoj",
  "missions.subtitle": "Pronađi diplomatska predstavništva balkanskih zemalja u Njemačkoj.",
  "missions.filterCountry": "Zemlja", "missions.filterCity": "Grad", "missions.filterType": "Tip",
  "missions.allCountries": "Sve zemlje", "missions.allCities": "Svi gradovi", "missions.allTypes": "Svi tipovi",
  "missions.embassy": "Ambasada", "missions.consulate": "Generalni konzulat",
  "missions.results": "rezultata", "missions.clearFilters": "Obriši filtere", "missions.empty": "Nema rezultata.",
};

const missionsSq: Partial<TranslationKeys> = {
  "nav.missions": "Ambasadat",
  "missions.title": "Ambasadat dhe konsullatat ballkanike në Gjermani",
  "missions.subtitle": "Gjej përfaqësitë diplomatike të vendeve ballkanike në Gjermani.",
  "missions.filterCountry": "Vendi", "missions.filterCity": "Qyteti", "missions.filterType": "Lloji",
  "missions.allCountries": "Të gjitha vendet", "missions.allCities": "Të gjitha qytetet", "missions.allTypes": "Të gjitha llojet",
  "missions.embassy": "Ambasadë", "missions.consulate": "Konsullatë e përgjithshme",
  "missions.results": "rezultate", "missions.clearFilters": "Pastro filtrat", "missions.empty": "Nuk ka rezultate.",
};

const missionsMk: Partial<TranslationKeys> = {
  "nav.missions": "Амбасади",
  "missions.title": "Балкански амбасади и конзулати во Германија",
  "missions.subtitle": "Пронајди дипломатски претставништва на балканските земји во Германија.",
  "missions.filterCountry": "Земја", "missions.filterCity": "Град", "missions.filterType": "Тип",
  "missions.allCountries": "Сите земји", "missions.allCities": "Сите градови", "missions.allTypes": "Сите типови",
  "missions.embassy": "Амбасада", "missions.consulate": "Генерален конзулат",
  "missions.results": "резултати", "missions.clearFilters": "Избриши филтри", "missions.empty": "Нема резултати.",
};

const missionsDe: Partial<TranslationKeys> = {
  "nav.missions": "Botschaften",
  "missions.title": "Balkan-Botschaften und Konsulate in Deutschland",
  "missions.subtitle": "Finde diplomatische Vertretungen der Balkanländer in Deutschland.",
  "missions.filterCountry": "Land", "missions.filterCity": "Stadt", "missions.filterType": "Typ",
  "missions.allCountries": "Alle Länder", "missions.allCities": "Alle Städte", "missions.allTypes": "Alle Typen",
  "missions.embassy": "Botschaft", "missions.consulate": "Generalkonsulat",
  "missions.results": "Ergebnisse", "missions.clearFilters": "Filter löschen", "missions.empty": "Keine Ergebnisse.",
};

const missionsEn: Partial<TranslationKeys> = {
  "nav.missions": "Embassies",
  "missions.title": "Balkan Embassies and Consulates in Germany",
  "missions.subtitle": "Find diplomatic missions of Balkan countries in Germany.",
  "missions.filterCountry": "Country", "missions.filterCity": "City", "missions.filterType": "Type",
  "missions.allCountries": "All countries", "missions.allCities": "All cities", "missions.allTypes": "All types",
  "missions.embassy": "Embassy", "missions.consulate": "Consulate General",
  "missions.results": "results", "missions.clearFilters": "Clear filters", "missions.empty": "No results.",
};

const portalBs: Partial<TranslationKeys> = {
  "portal.dolazak": "Dolazak", "portal.dolazak.desc": "Dokumenti, prijava, prvi koraci u Njemačkoj.",
  "portal.stan": "Stan & prijava", "portal.stan.desc": "Pronađi stan i prijavi adresu.",
  "portal.jobs": "Posao", "portal.jobs.desc": "Pronađi posao u Njemačkoj.",
  "portal.familie": "Porodica", "portal.familie.desc": "Kindergeld, škola, porodična prava.",
  "portal.foerderungen": "Pomoći", "portal.foerderungen.desc": "Socijalna pomoć, stambeni dodatak, BAföG.",
  "portal.formulare": "Formulari", "portal.formulare.desc": "Svi važni obrasci na jednom mjestu.",
  "portal.tools": "Alati", "portal.tools.desc": "Generatori, kalkulatori, provjere.",
  "portal.ambasade": "Ambasade", "portal.ambasade.desc": "Diplomatska predstavništva u Njemačkoj.",
  "portal.community": "Zajednica", "portal.community.desc": "Restorani, trgovine, udruženja i događaji balkanske zajednice.",
  "footer.imprint": "Impressum", "footer.privacy": "Zaštita podataka", "footer.contact": "Kontakt",
  "footer.copyright": "Sva prava zadržana.", "footer.disclaimer": "Disclaimer",
  "cta.register": "Registruj se besplatno",
  "wohnungen.title": "Pretraga stanova", "wohnungen.subtitle": "Pronađi stan u cijeloj Njemačkoj.",
  "wohnungen.city": "Grad", "wohnungen.bundesland": "Savezna država", "wohnungen.radius": "Udaljenost",
  "wohnungen.allGermany": "Cijela Njemačka", "wohnungen.maxRent": "Maks. hladna kirija",
  "wohnungen.rooms": "Broj soba", "wohnungen.wg": "WG", "wohnungen.furnished": "Namješteno",
  "wohnungen.shortTerm": "Kratkoročno", "wohnungen.longTerm": "Dugoročno",
  "wohnungen.search": "Traži stanove", "wohnungen.showMore": "Prikaži više", "wohnungen.showLess": "Prikaži manje",
  "wohnungen.portals": "Portali za stanove",
  "wohnungen.portalBig": "Veliki portali", "wohnungen.portalWg": "WG & studenti",
  "wohnungen.portalSocial": "Socijalno & zadruge", "wohnungen.portalShort": "Kratkoročno",
  "jobs.title": "Pretraga poslova", "jobs.subtitle": "Pronađi posao u cijeloj Njemačkoj.",
  "jobs.city": "Grad", "jobs.bundesland": "Savezna država", "jobs.radius": "Udaljenost",
  "jobs.allGermany": "Cijela Njemačka", "jobs.branche": "Branša", "jobs.vertragsart": "Vrsta ugovora",
  "jobs.noDeutsch": "Bez znanja njemačkog", "jobs.mitUnterkunft": "Sa smještajem",
  "jobs.quereinsteiger": "Mogući prekvalifikanti", "jobs.schnellerEinstieg": "Brzi početak",
  "jobs.search": "Traži poslove", "jobs.showMore": "Prikaži više", "jobs.showLess": "Prikaži manje",
  "jobs.portals": "Portali za poslove",
  "jobs.portalStaatlich": "Državni", "jobs.portalGross": "Veliki portali", "jobs.portalSpezial": "Specijalizirani",
  "jobs.allBranchen": "Sve branše",
  "branche.pflege": "Njega", "branche.bau": "Građevina", "branche.logistik": "Logistika",
  "branche.produktion": "Proizvodnja", "branche.reinigung": "Čišćenje", "branche.gastro": "Gastronomija",
  "branche.it": "IT", "branche.handwerk": "Zanat", "branche.buero": "Kancelarija", "branche.ausbildung": "Obrazovanje",
  "vertrag.vollzeit": "Puno radno vrijeme", "vertrag.teilzeit": "Pola radnog vremena",
  "vertrag.minijob": "Minijob", "vertrag.ausbildung": "Obrazovanje", "vertrag.praktikum": "Praktikum",
};

const portalDe: Partial<TranslationKeys> = {
  "portal.dolazak": "Ankunft", "portal.dolazak.desc": "Dokumente, Anmeldung, erste Schritte in Deutschland.",
  "portal.stan": "Wohnung & Anmeldung", "portal.stan.desc": "Wohnung finden und Adresse anmelden.",
  "portal.jobs": "Arbeit", "portal.jobs.desc": "Arbeit in Deutschland finden.",
  "portal.familie": "Familie", "portal.familie.desc": "Kindergeld, Schule, Familienrechte.",
  "portal.foerderungen": "Förderungen", "portal.foerderungen.desc": "Sozialleistungen, Wohngeld, BAföG.",
  "portal.formulare": "Formulare", "portal.formulare.desc": "Alle wichtigen Formulare an einem Ort.",
  "portal.tools": "Werkzeuge", "portal.tools.desc": "Generatoren, Rechner, Prüfungen.",
  "portal.ambasade": "Botschaften", "portal.ambasade.desc": "Diplomatische Vertretungen in Deutschland.",
  "portal.community": "Community", "portal.community.desc": "Restaurants, Shops, Vereine und Events der Balkan-Community.",
  "footer.imprint": "Impressum", "footer.privacy": "Datenschutz", "footer.contact": "Kontakt",
  "footer.copyright": "Alle Rechte vorbehalten.", "footer.disclaimer": "Disclaimer",
  "cta.register": "Jetzt kostenlos registrieren",
  "wohnungen.title": "Wohnungssuche", "wohnungen.subtitle": "Finde eine Wohnung in ganz Deutschland.",
  "wohnungen.city": "Stadt", "wohnungen.bundesland": "Bundesland", "wohnungen.radius": "Umkreis",
  "wohnungen.allGermany": "Ganz Deutschland", "wohnungen.maxRent": "Max. Kaltmiete",
  "wohnungen.rooms": "Zimmeranzahl", "wohnungen.wg": "WG", "wohnungen.furnished": "Möbliert",
  "wohnungen.shortTerm": "Kurzzeit", "wohnungen.longTerm": "Langzeit",
  "wohnungen.search": "Wohnungen suchen", "wohnungen.showMore": "Mehr anzeigen", "wohnungen.showLess": "Weniger anzeigen",
  "wohnungen.portals": "Wohnungsportale",
  "wohnungen.portalBig": "Große Portale", "wohnungen.portalWg": "WG & Studenten",
  "wohnungen.portalSocial": "Sozial & Genossenschaften", "wohnungen.portalShort": "Kurzzeit",
  "jobs.title": "Jobsuche", "jobs.subtitle": "Finde einen Job in ganz Deutschland.",
  "jobs.city": "Stadt", "jobs.bundesland": "Bundesland", "jobs.radius": "Umkreis",
  "jobs.allGermany": "Ganz Deutschland", "jobs.branche": "Branche", "jobs.vertragsart": "Vertragsart",
  "jobs.noDeutsch": "Ohne Deutschkenntnisse", "jobs.mitUnterkunft": "Mit Unterkunft",
  "jobs.quereinsteiger": "Quereinsteiger möglich", "jobs.schnellerEinstieg": "Schneller Einstieg",
  "jobs.search": "Jobs suchen", "jobs.showMore": "Mehr anzeigen", "jobs.showLess": "Weniger anzeigen",
  "jobs.portals": "Jobportale",
  "jobs.portalStaatlich": "Staatlich", "jobs.portalGross": "Große Portale", "jobs.portalSpezial": "Spezialportale",
  "jobs.allBranchen": "Alle Branchen",
  "branche.pflege": "Pflege", "branche.bau": "Bau", "branche.logistik": "Logistik & Lager",
  "branche.produktion": "Produktion", "branche.reinigung": "Reinigung", "branche.gastro": "Gastronomie",
  "branche.it": "IT", "branche.handwerk": "Handwerk", "branche.buero": "Büro", "branche.ausbildung": "Ausbildung",
  "vertrag.vollzeit": "Vollzeit", "vertrag.teilzeit": "Teilzeit",
  "vertrag.minijob": "Minijob", "vertrag.ausbildung": "Ausbildung", "vertrag.praktikum": "Praktikum",
};

const portalEn: Partial<TranslationKeys> = {
  "portal.dolazak": "Arrival", "portal.dolazak.desc": "Documents, registration, first steps in Germany.",
  "portal.stan": "Housing & Registration", "portal.stan.desc": "Find housing and register your address.",
  "portal.jobs": "Jobs", "portal.jobs.desc": "Find work in Germany.",
  "portal.familie": "Family", "portal.familie.desc": "Child benefit, schools, family rights.",
  "portal.foerderungen": "Benefits", "portal.foerderungen.desc": "Social benefits, housing benefit, BAföG.",
  "portal.formulare": "Forms", "portal.formulare.desc": "All important forms in one place.",
  "portal.tools": "Tools", "portal.tools.desc": "Generators, calculators, checks.",
  "portal.ambasade": "Embassies", "portal.ambasade.desc": "Diplomatic missions in Germany.",
  "portal.community": "Community", "portal.community.desc": "Restaurants, shops, associations and events of the Balkan community.",
  "footer.imprint": "Imprint", "footer.privacy": "Privacy Policy", "footer.contact": "Contact",
  "footer.copyright": "All rights reserved.", "footer.disclaimer": "Disclaimer",
  "cta.register": "Register for free",
  "wohnungen.title": "Housing Search", "wohnungen.subtitle": "Find an apartment across Germany.",
  "wohnungen.city": "City", "wohnungen.bundesland": "State", "wohnungen.radius": "Radius",
  "wohnungen.allGermany": "All of Germany", "wohnungen.maxRent": "Max. cold rent",
  "wohnungen.rooms": "Rooms", "wohnungen.wg": "Shared flat", "wohnungen.furnished": "Furnished",
  "wohnungen.shortTerm": "Short-term", "wohnungen.longTerm": "Long-term",
  "wohnungen.search": "Search apartments", "wohnungen.showMore": "Show more", "wohnungen.showLess": "Show less",
  "wohnungen.portals": "Housing portals",
  "wohnungen.portalBig": "Major portals", "wohnungen.portalWg": "Shared flats & students",
  "wohnungen.portalSocial": "Social & cooperatives", "wohnungen.portalShort": "Short-term",
  "jobs.title": "Job Search", "jobs.subtitle": "Find a job across Germany.",
  "jobs.city": "City", "jobs.bundesland": "State", "jobs.radius": "Radius",
  "jobs.allGermany": "All of Germany", "jobs.branche": "Industry", "jobs.vertragsart": "Contract type",
  "jobs.noDeutsch": "No German required", "jobs.mitUnterkunft": "With accommodation",
  "jobs.quereinsteiger": "Career changers welcome", "jobs.schnellerEinstieg": "Quick start",
  "jobs.search": "Search jobs", "jobs.showMore": "Show more", "jobs.showLess": "Show less",
  "jobs.portals": "Job portals",
  "jobs.portalStaatlich": "Government", "jobs.portalGross": "Major portals", "jobs.portalSpezial": "Specialized",
  "jobs.allBranchen": "All industries",
  "branche.pflege": "Healthcare", "branche.bau": "Construction", "branche.logistik": "Logistics",
  "branche.produktion": "Manufacturing", "branche.reinigung": "Cleaning", "branche.gastro": "Hospitality",
  "branche.it": "IT", "branche.handwerk": "Trades", "branche.buero": "Office", "branche.ausbildung": "Training",
  "vertrag.vollzeit": "Full-time", "vertrag.teilzeit": "Part-time",
  "vertrag.minijob": "Mini job", "vertrag.ausbildung": "Apprenticeship", "vertrag.praktikum": "Internship",
};

const portalSq: Partial<TranslationKeys> = {
  "portal.dolazak": "Mbërritja", "portal.dolazak.desc": "Dokumentet, regjistrimi, hapat e parë në Gjermani.",
  "portal.stan": "Banesa & regjistrimi", "portal.stan.desc": "Gjej banesë dhe regjistro adresën.",
  "portal.jobs": "Punë", "portal.jobs.desc": "Gjej punë në Gjermani.",
  "portal.familie": "Familja", "portal.familie.desc": "Kindergeld, shkolla, të drejtat familjare.",
  "portal.foerderungen": "Ndihma", "portal.foerderungen.desc": "Ndihma sociale, strehimi, BAföG.",
  "portal.formulare": "Formularët", "portal.formulare.desc": "Të gjitha formularët e rëndësishëm.",
  "portal.tools": "Mjetet", "portal.tools.desc": "Gjeneratorë, kalkulatorë, kontrolle.",
  "portal.ambasade": "Ambasadat", "portal.ambasade.desc": "Përfaqësitë diplomatike në Gjermani.",
  "portal.community": "Komuniteti", "portal.community.desc": "Restorante, dyqane, shoqata dhe ngjarje të komunitetit ballkanik.",
  "footer.imprint": "Impressum", "footer.privacy": "Mbrojtja e të dhënave", "footer.contact": "Kontakti",
  "footer.copyright": "Të gjitha të drejtat e rezervuara.", "footer.disclaimer": "Disclaimer",
  "cta.register": "Regjistrohu falas",
  "wohnungen.title": "Kërkimi i banesës", "wohnungen.subtitle": "Gjej banesë në gjithë Gjermaninë.",
  "wohnungen.city": "Qyteti", "wohnungen.bundesland": "Landi", "wohnungen.radius": "Rrethi",
  "wohnungen.allGermany": "E gjithë Gjermania", "wohnungen.maxRent": "Qiraja max.",
  "wohnungen.rooms": "Dhomat", "wohnungen.wg": "WG", "wohnungen.furnished": "E mobiluar",
  "wohnungen.shortTerm": "Afatshkurtër", "wohnungen.longTerm": "Afatgjatë",
  "wohnungen.search": "Kërko banesa", "wohnungen.showMore": "Shfaq më shumë", "wohnungen.showLess": "Shfaq më pak",
  "wohnungen.portals": "Portalet e banesave",
  "wohnungen.portalBig": "Portalet kryesore", "wohnungen.portalWg": "WG & studentë",
  "wohnungen.portalSocial": "Sociale & kooperativa", "wohnungen.portalShort": "Afatshkurtër",
  "jobs.title": "Kërkimi i punës", "jobs.subtitle": "Gjej punë në gjithë Gjermaninë.",
  "jobs.city": "Qyteti", "jobs.bundesland": "Landi", "jobs.radius": "Rrethi",
  "jobs.allGermany": "E gjithë Gjermania", "jobs.branche": "Sektori", "jobs.vertragsart": "Lloji i kontratës",
  "jobs.noDeutsch": "Pa gjermanisht", "jobs.mitUnterkunft": "Me strehim",
  "jobs.quereinsteiger": "Ndërrim profesioni", "jobs.schnellerEinstieg": "Fillim i shpejtë",
  "jobs.search": "Kërko punë", "jobs.showMore": "Shfaq më shumë", "jobs.showLess": "Shfaq më pak",
  "jobs.portals": "Portalet e punës",
  "jobs.portalStaatlich": "Shtetëror", "jobs.portalGross": "Portalet kryesore", "jobs.portalSpezial": "Të specializuar",
  "jobs.allBranchen": "Të gjitha sektorët",
  "branche.pflege": "Kujdesi", "branche.bau": "Ndërtimtaria", "branche.logistik": "Logjistika",
  "branche.produktion": "Prodhimi", "branche.reinigung": "Pastrimi", "branche.gastro": "Gastronomia",
  "branche.it": "IT", "branche.handwerk": "Zejtaria", "branche.buero": "Zyra", "branche.ausbildung": "Formimi",
  "vertrag.vollzeit": "Kohë e plotë", "vertrag.teilzeit": "Gjysmë kohe",
  "vertrag.minijob": "Minijob", "vertrag.ausbildung": "Formim", "vertrag.praktikum": "Praktikë",
};

const portalMk: Partial<TranslationKeys> = {
  "portal.dolazak": "Пристигнување", "portal.dolazak.desc": "Документи, пријава, први чекори во Германија.",
  "portal.stan": "Стан & пријава", "portal.stan.desc": "Пронајди стан и пријави адреса.",
  "portal.jobs": "Работа", "portal.jobs.desc": "Пронајди работа во Германија.",
  "portal.familie": "Семејство", "portal.familie.desc": "Kindergeld, училиште, семејни права.",
  "portal.foerderungen": "Помош", "portal.foerderungen.desc": "Социјална помош, станбен додаток, BAföG.",
  "portal.formulare": "Формулари", "portal.formulare.desc": "Сите важни обрасци на едно место.",
  "portal.tools": "Алатки", "portal.tools.desc": "Генератори, калкулатори, проверки.",
  "portal.ambasade": "Амбасади", "portal.ambasade.desc": "Дипломатски претставништва во Германија.",
  "portal.community": "Заедница", "portal.community.desc": "Ресторани, продавници, здруженија и настани на балканската заедница.",
  "footer.imprint": "Impressum", "footer.privacy": "Заштита на податоци", "footer.contact": "Контакт",
  "footer.copyright": "Сите права задржани.", "footer.disclaimer": "Disclaimer",
  "cta.register": "Регистрирај се бесплатно",
  "wohnungen.title": "Пребарување станови", "wohnungen.subtitle": "Пронајди стан во цела Германија.",
  "wohnungen.city": "Град", "wohnungen.bundesland": "Сојузна држава", "wohnungen.radius": "Растојание",
  "wohnungen.allGermany": "Цела Германија", "wohnungen.maxRent": "Макс. ладна кирија",
  "wohnungen.rooms": "Број на соби", "wohnungen.wg": "WG", "wohnungen.furnished": "Наместен",
  "wohnungen.shortTerm": "Краткорочно", "wohnungen.longTerm": "Долгорочно",
  "wohnungen.search": "Барај станови", "wohnungen.showMore": "Прикажи повеќе", "wohnungen.showLess": "Прикажи помалку",
  "wohnungen.portals": "Портали за станови",
  "wohnungen.portalBig": "Големи портали", "wohnungen.portalWg": "WG & студенти",
  "wohnungen.portalSocial": "Социјално & задруги", "wohnungen.portalShort": "Краткорочно",
  "jobs.title": "Пребарување работа", "jobs.subtitle": "Пронајди работа во цела Германија.",
  "jobs.city": "Град", "jobs.bundesland": "Сојузна држава", "jobs.radius": "Растојание",
  "jobs.allGermany": "Цела Германија", "jobs.branche": "Бранша", "jobs.vertragsart": "Вид на договор",
  "jobs.noDeutsch": "Без знаење германски", "jobs.mitUnterkunft": "Со сместување",
  "jobs.quereinsteiger": "Преквалификанти", "jobs.schnellerEinstieg": "Брз почеток",
  "jobs.search": "Барај работа", "jobs.showMore": "Прикажи повеќе", "jobs.showLess": "Прикажи помалку",
  "jobs.portals": "Портали за работа",
  "jobs.portalStaatlich": "Државни", "jobs.portalGross": "Големи портали", "jobs.portalSpezial": "Специјализирани",
  "jobs.allBranchen": "Сите бранши",
  "branche.pflege": "Нега", "branche.bau": "Градежништво", "branche.logistik": "Логистика",
  "branche.produktion": "Производство", "branche.reinigung": "Чистење", "branche.gastro": "Гастрономија",
  "branche.it": "IT", "branche.handwerk": "Занает", "branche.buero": "Канцеларија", "branche.ausbildung": "Образование",
  "vertrag.vollzeit": "Полно работно време", "vertrag.teilzeit": "Половина работно време",
  "vertrag.minijob": "Minijob", "vertrag.ausbildung": "Образование", "vertrag.praktikum": "Практика",
};

const miscBs: Partial<TranslationKeys> = {
  "auth.loginTitle": "Prijava", "auth.loginDesc": "Unesite email i lozinku za pristup.",
  "auth.email": "Email", "auth.password": "Lozinka",
  "auth.loginButton": "Prijavi se", "auth.loginLoading": "Prijavljivanje...",
  "auth.loginError": "Greška pri prijavi", "auth.loginSuccess": "Uspješna prijava!",
  "auth.registerTitle": "Registracija", "auth.registerDesc": "Kreirajte novi nalog sa email adresom.",
  "auth.confirmPassword": "Potvrdite lozinku", "auth.registerButton": "Registruj se",
  "auth.registerLoading": "Registracija...",
  "auth.passwordMismatch": "Lozinke se ne poklapaju",
  "auth.passwordTooShort": "Lozinka mora imati najmanje 6 znakova",
  "auth.registerError": "Greška pri registraciji",
  "auth.registerSuccess": "Registracija uspješna!",
  "auth.registerCheckEmail": "Provjerite email za potvrdu.",
  "auth.haveAccount": "Već imate nalog?", "auth.forgotPassword": "Zaboravljena lozinka?",
  "auth.noAccount": "Nemate nalog?",
  "auth.forgotTitle": "Zaboravljena lozinka", "auth.forgotDesc": "Unesite email za resetovanje lozinke.",
  "auth.sendLink": "Pošalji link", "auth.sending": "Slanje...",
  "auth.checkEmail": "Provjerite email",
  "auth.checkEmailDesc": "Ako nalog postoji, poslaćemo vam link za resetovanje lozinke.",
  "auth.backToLogin": "Nazad na prijavu",
  "auth.resetTitle": "Nova lozinka", "auth.resetDesc": "Unesite novu lozinku za vaš nalog.",
  "auth.newPassword": "Nova lozinka", "auth.saveButton": "Sačuvaj novu lozinku",
  "auth.saving": "Čuvanje...",
  "auth.resetWaiting": "Resetovanje lozinke",
  "auth.resetWaitingDesc": "Otvorite link iz emaila da biste resetovali lozinku.",
  "auth.passwordChanged": "Lozinka uspješno promijenjena!",
  "auth.minChars": "Najmanje 6 znakova",
  "footer.legal": "Pravne informacije", "footer.haftung": "Odricanje od odgovornosti",
  "footer.mitgliedschaft": "Članstvo", "footer.kiHinweis": "KI napomena",
  "hero.cta.register": "Registruj se besplatno", "hero.cta.firstSteps": "Pogledaj prve korake",
  "notfound.title": "Stranica nije pronađena", "notfound.desc": "Stranica koju tražite ne postoji.",
  "notfound.back": "Nazad na početnu",
  "common.error": "Greška", "common.legalBasis": "Zakonska osnova",
  "common.officialSource": "Zvanični izvor", "common.moreSource": "Dodatni izvor",
  "common.all": "Sve",
};

const miscDe: Partial<TranslationKeys> = {
  "auth.loginTitle": "Anmelden", "auth.loginDesc": "E-Mail und Passwort eingeben.",
  "auth.email": "E-Mail", "auth.password": "Passwort",
  "auth.loginButton": "Anmelden", "auth.loginLoading": "Anmeldung...",
  "auth.loginError": "Anmeldefehler", "auth.loginSuccess": "Erfolgreich angemeldet!",
  "auth.registerTitle": "Registrieren", "auth.registerDesc": "Neues Konto mit E-Mail erstellen.",
  "auth.confirmPassword": "Passwort bestätigen", "auth.registerButton": "Registrieren",
  "auth.registerLoading": "Registrierung...",
  "auth.passwordMismatch": "Passwörter stimmen nicht überein",
  "auth.passwordTooShort": "Passwort muss mindestens 6 Zeichen haben",
  "auth.registerError": "Registrierungsfehler",
  "auth.registerSuccess": "Registrierung erfolgreich!",
  "auth.registerCheckEmail": "Überprüfen Sie Ihre E-Mail zur Bestätigung.",
  "auth.haveAccount": "Bereits ein Konto?", "auth.forgotPassword": "Passwort vergessen?",
  "auth.noAccount": "Noch kein Konto?",
  "auth.forgotTitle": "Passwort vergessen", "auth.forgotDesc": "E-Mail eingeben zum Zurücksetzen.",
  "auth.sendLink": "Link senden", "auth.sending": "Wird gesendet...",
  "auth.checkEmail": "E-Mail prüfen",
  "auth.checkEmailDesc": "Falls ein Konto existiert, senden wir einen Reset-Link.",
  "auth.backToLogin": "Zurück zur Anmeldung",
  "auth.resetTitle": "Neues Passwort", "auth.resetDesc": "Neues Passwort für Ihr Konto eingeben.",
  "auth.newPassword": "Neues Passwort", "auth.saveButton": "Passwort speichern",
  "auth.saving": "Wird gespeichert...",
  "auth.resetWaiting": "Passwort zurücksetzen",
  "auth.resetWaitingDesc": "Öffnen Sie den Link in der E-Mail.",
  "auth.passwordChanged": "Passwort erfolgreich geändert!",
  "auth.minChars": "Mindestens 6 Zeichen",
  "footer.legal": "Rechtliches", "footer.haftung": "Haftungsausschluss",
  "footer.mitgliedschaft": "Mitgliedschaft", "footer.kiHinweis": "KI-Hinweis",
  "hero.cta.register": "Kostenlos registrieren", "hero.cta.firstSteps": "Erste Schritte ansehen",
  "notfound.title": "Seite nicht gefunden", "notfound.desc": "Die gesuchte Seite existiert nicht.",
  "notfound.back": "Zurück zur Startseite",
  "common.error": "Fehler", "common.legalBasis": "Gesetzliche Grundlage",
  "common.officialSource": "Offizielle Quelle", "common.moreSource": "Weitere Quelle",
  "common.all": "Alle",
};

const miscEn: Partial<TranslationKeys> = {
  "auth.loginTitle": "Sign In", "auth.loginDesc": "Enter your email and password.",
  "auth.email": "Email", "auth.password": "Password",
  "auth.loginButton": "Sign In", "auth.loginLoading": "Signing in...",
  "auth.loginError": "Login error", "auth.loginSuccess": "Successfully signed in!",
  "auth.registerTitle": "Sign Up", "auth.registerDesc": "Create a new account with your email.",
  "auth.confirmPassword": "Confirm password", "auth.registerButton": "Sign Up",
  "auth.registerLoading": "Signing up...",
  "auth.passwordMismatch": "Passwords do not match",
  "auth.passwordTooShort": "Password must be at least 6 characters",
  "auth.registerError": "Registration error",
  "auth.registerSuccess": "Registration successful!",
  "auth.registerCheckEmail": "Check your email for confirmation.",
  "auth.haveAccount": "Already have an account?", "auth.forgotPassword": "Forgot password?",
  "auth.noAccount": "Don't have an account?",
  "auth.forgotTitle": "Forgot Password", "auth.forgotDesc": "Enter your email to reset your password.",
  "auth.sendLink": "Send link", "auth.sending": "Sending...",
  "auth.checkEmail": "Check your email",
  "auth.checkEmailDesc": "If an account exists, we'll send a reset link.",
  "auth.backToLogin": "Back to sign in",
  "auth.resetTitle": "New Password", "auth.resetDesc": "Enter a new password for your account.",
  "auth.newPassword": "New password", "auth.saveButton": "Save new password",
  "auth.saving": "Saving...",
  "auth.resetWaiting": "Password Reset",
  "auth.resetWaitingDesc": "Open the link from your email.",
  "auth.passwordChanged": "Password changed successfully!",
  "auth.minChars": "At least 6 characters",
  "footer.legal": "Legal", "footer.haftung": "Disclaimer",
  "footer.mitgliedschaft": "Membership", "footer.kiHinweis": "AI Notice",
  "hero.cta.register": "Register for free", "hero.cta.firstSteps": "View first steps",
  "notfound.title": "Page not found", "notfound.desc": "The page you're looking for doesn't exist.",
  "notfound.back": "Back to home",
  "common.error": "Error", "common.legalBasis": "Legal basis",
  "common.officialSource": "Official source", "common.moreSource": "More sources",
  "common.all": "All",
};

const miscSq: Partial<TranslationKeys> = {
  "auth.loginTitle": "Hyrje", "auth.loginDesc": "Shkruani email-in dhe fjalëkalimin.",
  "auth.email": "Email", "auth.password": "Fjalëkalimi",
  "auth.loginButton": "Hyr", "auth.loginLoading": "Duke u kyçur...",
  "auth.loginError": "Gabim gjatë hyrjes", "auth.loginSuccess": "Hyrja e suksesshme!",
  "auth.registerTitle": "Regjistrohu", "auth.registerDesc": "Krijo llogari të re me email.",
  "auth.confirmPassword": "Konfirmo fjalëkalimin", "auth.registerButton": "Regjistrohu",
  "auth.registerLoading": "Duke u regjistruar...",
  "auth.passwordMismatch": "Fjalëkalimet nuk përputhen",
  "auth.passwordTooShort": "Fjalëkalimi duhet të ketë të paktën 6 karaktere",
  "auth.registerError": "Gabim gjatë regjistrimit",
  "auth.registerSuccess": "Regjistrimi i suksesshëm!",
  "auth.registerCheckEmail": "Kontrollo email-in për konfirmim.",
  "auth.haveAccount": "Ke tashmë llogari?", "auth.forgotPassword": "Harruat fjalëkalimin?",
  "auth.noAccount": "Nuk ke llogari?",
  "auth.forgotTitle": "Fjalëkalimi i harruar", "auth.forgotDesc": "Shkruaj email-in për të rivendosur fjalëkalimin.",
  "auth.sendLink": "Dërgo linkun", "auth.sending": "Duke dërguar...",
  "auth.checkEmail": "Kontrollo email-in",
  "auth.checkEmailDesc": "Nëse llogaria ekziston, do t'ju dërgojmë link për rivendosje.",
  "auth.backToLogin": "Kthehu te hyrja",
  "auth.resetTitle": "Fjalëkalim i ri", "auth.resetDesc": "Shkruaj fjalëkalimin e ri.",
  "auth.newPassword": "Fjalëkalimi i ri", "auth.saveButton": "Ruaj fjalëkalimin e ri",
  "auth.saving": "Duke ruajtur...",
  "auth.resetWaiting": "Rivendosja e fjalëkalimit",
  "auth.resetWaitingDesc": "Hap linkun nga email-i.",
  "auth.passwordChanged": "Fjalëkalimi u ndryshua me sukses!",
  "auth.minChars": "Të paktën 6 karaktere",
  "footer.legal": "Ligjore", "footer.haftung": "Mohimi i përgjegjësisë",
  "footer.mitgliedschaft": "Anëtarësia", "footer.kiHinweis": "Njoftim AI",
  "hero.cta.register": "Regjistrohu falas", "hero.cta.firstSteps": "Shiko hapat e parë",
  "notfound.title": "Faqja nuk u gjet", "notfound.desc": "Faqja që kërkoni nuk ekziston.",
  "notfound.back": "Kthehu në fillim",
  "common.error": "Gabim", "common.legalBasis": "Baza ligjore",
  "common.officialSource": "Burimi zyrtar", "common.moreSource": "Burime të tjera",
  "common.all": "Të gjitha",
};

const miscMk: Partial<TranslationKeys> = {
  "auth.loginTitle": "Најава", "auth.loginDesc": "Внесете email и лозинка.",
  "auth.email": "Email", "auth.password": "Лозинка",
  "auth.loginButton": "Најави се", "auth.loginLoading": "Најавување...",
  "auth.loginError": "Грешка при најава", "auth.loginSuccess": "Успешна најава!",
  "auth.registerTitle": "Регистрација", "auth.registerDesc": "Креирајте нов налог со email.",
  "auth.confirmPassword": "Потврдете лозинка", "auth.registerButton": "Регистрирај се",
  "auth.registerLoading": "Регистрација...",
  "auth.passwordMismatch": "Лозинките не се совпаѓаат",
  "auth.passwordTooShort": "Лозинката мора да има најмалку 6 знаци",
  "auth.registerError": "Грешка при регистрација",
  "auth.registerSuccess": "Регистрацијата е успешна!",
  "auth.registerCheckEmail": "Проверете го email-от за потврда.",
  "auth.haveAccount": "Веќе имате налог?", "auth.forgotPassword": "Заборавена лозинка?",
  "auth.noAccount": "Немате налог?",
  "auth.forgotTitle": "Заборавена лозинка", "auth.forgotDesc": "Внесете email за ресетирање.",
  "auth.sendLink": "Испрати линк", "auth.sending": "Испраќање...",
  "auth.checkEmail": "Проверете email",
  "auth.checkEmailDesc": "Ако налогот постои, ќе ви испратиме линк за ресетирање.",
  "auth.backToLogin": "Назад на најава",
  "auth.resetTitle": "Нова лозинка", "auth.resetDesc": "Внесете нова лозинка за вашиот налог.",
  "auth.newPassword": "Нова лозинка", "auth.saveButton": "Зачувај нова лозинка",
  "auth.saving": "Зачувување...",
  "auth.resetWaiting": "Ресетирање на лозинка",
  "auth.resetWaitingDesc": "Отворете го линкот од email-от.",
  "auth.passwordChanged": "Лозинката е успешно променета!",
  "auth.minChars": "Најмалку 6 знаци",
  "footer.legal": "Правни информации", "footer.haftung": "Одрекување од одговорност",
  "footer.mitgliedschaft": "Членство", "footer.kiHinweis": "AI напомена",
  "hero.cta.register": "Регистрирај се бесплатно", "hero.cta.firstSteps": "Погледни први чекори",
  "notfound.title": "Страницата не е пронајдена", "notfound.desc": "Страницата не постои.",
  "notfound.back": "Назад на почетна",
  "common.error": "Грешка", "common.legalBasis": "Законска основа",
  "common.officialSource": "Официјален извор", "common.moreSource": "Дополнителен извор",
  "common.all": "Сите",
};

// --- Home / Footer / Premium page keys ---
const homeDe: Partial<TranslationKeys> = {
  "nav.plus": "Plus",
  "home.hero.title": "Dein Guide für das Leben", "home.hero.highlight": "in Deutschland.",
  "home.hero.subtitle": "Alles was du brauchst — an einem Ort.",
  "home.hero.cta": "Kostenlos starten", "home.hero.howItWorks": "So funktioniert BalkanLink →",
  "home.card.majstor": "Handwerker finden", "home.card.posao": "Job suchen", "home.card.stan": "Wohnung suchen",
  "home.card.papiri": "Hilfe mit Dokumenten", "home.card.restorani": "Balkan Restaurants",
  "home.card.dzamije": "Gemeinden & Vereine", "home.card.prevoz": "Reisen & Transport", "home.card.pitanje": "Frage stellen",
  "home.trust.title": "Über 10.000 Nutzer vertrauen", "home.trust.subtitle": "Die Balkan Community in Deutschland nutzt BalkanLink für den Alltag.",
  "home.trust.community": "Menschen aus Südosteuropa — vereint in Deutschland",
  "home.example.1": "Kind in der Schule anmelden", "home.example.2": "Umzug in eine neue Stadt",
  "home.example.3": "Inkasso-Brief erhalten", "home.example.4": "Jobwechsel", "home.example.5": "Auto kaufen",
  "home.testimonials.title": "Unsere Community sagt",
  "home.testimonials.cities": "Berlin · München · Frankfurt · Stuttgart · Köln",
  "home.review1.text": "Ohne BalkanLink hätte ich Tage mit der Informationssuche verloren. Jetzt habe ich alles an einem Ort.",
  "home.review2.text": "Den Kindergeld-Antrag habe ich in 15 Minuten mit der Schritt-für-Schritt-Anleitung erledigt. Empfehlung!",
  "home.review3.text": "Endlich eine Plattform, die uns versteht. Professionell, schnell und in unserer Sprache.",
  "home.review4.text": "Alle Infos an einem Ort — von Wohnung bis Job. Die Balkan Community in Deutschland hat endlich ihre Plattform.",
  "home.premium.title": "BalkanLink", "home.premium.subtitle": "Alles was du brauchst — ohne Umwege.",
  "home.premium.step1": "Formulare Schritt-für-Schritt", "home.premium.step2": "Direktlinks zu offiziellen Behörden",
  "home.premium.step3": "Geprüfte Kontakte", "home.premium.step4": "Priorisierte Antworten",
  "home.premium.step5": "Partner Vorteile",
  "home.premium.cta": "Plus aktivieren", "home.premium.cancel": "Jederzeit kündbar.",
  "footer.tagline": "Alles was du für das Leben in Deutschland brauchst — an einem Ort.",
  "footer.navSection": "Navigation", "footer.legalSection": "Rechtliches",
  "footer.trustSection": "Vertrauen",
  "footer.navHome": "Startseite", "footer.navHow": "Wie es funktioniert", "footer.navPremium": "Premium",
  "footer.trustRating": "Nutzerzufriedenheit", "footer.trustUsers": "Nutzer verwenden BalkanLink",
};

const homeBs: Partial<TranslationKeys> = {
  "nav.plus": "Plus",
  "home.hero.title": "Tvoj vodič za život", "home.hero.highlight": "u Njemačkoj.",
  "home.hero.subtitle": "Sve što ti treba — na jednom mjestu.",
  "home.hero.cta": "Započni besplatno", "home.hero.howItWorks": "Kako radi BalkanLink →",
  "home.card.majstor": "Trebam majstora", "home.card.posao": "Tražim posao", "home.card.stan": "Tražim stan",
  "home.card.papiri": "Trebam pomoć s papirima", "home.card.restorani": "Balkan restorani",
  "home.card.dzamije": "Džemati i zajednice", "home.card.prevoz": "Putovanja & prevoz", "home.card.pitanje": "Imam pitanje",
  "home.trust.title": "Preko 10.000 korisnika koristi", "home.trust.subtitle": "Balkan zajednica u Njemačkoj koristi BalkanLink za svakodnevne situacije.",
  "home.trust.community": "Ljudi iz jugoistočne Evrope — zajedno u Njemačkoj",
  "home.example.1": "Prijava djeteta u školu", "home.example.2": "Selidba u novi grad",
  "home.example.3": "Inkasso pismo", "home.example.4": "Promjena posla", "home.example.5": "Kupovina auta",
  "home.testimonials.title": "Naša zajednica kaže",
  "home.testimonials.cities": "Berlin · München · Frankfurt · Stuttgart · Köln",
  "home.review1.text": "Bez BalkanLinka bih izgubila dane na traženje informacija. Sad sve imam na jednom mjestu.",
  "home.review2.text": "Kindergeld zahtjev sam riješio za 15 minuta uz korak-po-korak vodič. Preporuka!",
  "home.review3.text": "Konačno platforma koja razumije nas. Profesionalno, brzo i na našem jeziku.",
  "home.review4.text": "Sve informacije na jednom mjestu — od stana do posla. Balkan zajednica u Njemačkoj konačno ima svoju platformu.",
  "home.premium.title": "BalkanLink", "home.premium.subtitle": "Sve što ti treba — bez zaobilaznih puteva.",
  "home.premium.step1": "Formulari korak po korak", "home.premium.step2": "Direktni linkovi na zvanične institucije",
  "home.premium.step3": "Provjereni kontakti", "home.premium.step4": "Prioritetni odgovori",
  "home.premium.step5": "Partnerske pogodnosti",
  "home.premium.cta": "Aktiviraj Plus", "home.premium.cancel": "Otkaži u bilo kojem trenutku.",
  "footer.tagline": "Sve što ti treba za život u Njemačkoj — na jednom mjestu.",
  "footer.navSection": "Navigacija", "footer.legalSection": "Pravne informacije",
  "footer.trustSection": "Povjerenje",
  "footer.navHome": "Početna", "footer.navHow": "Kako radi", "footer.navPremium": "Premium",
  "footer.trustRating": "zadovoljstvo korisnika", "footer.trustUsers": "ljudi koristi BalkanLink",
};

const homeEn: Partial<TranslationKeys> = {
  "nav.plus": "Plus",
  "home.hero.title": "Your guide to life", "home.hero.highlight": "in Germany.",
  "home.hero.subtitle": "Everything you need — in one place.",
  "home.hero.cta": "Get started free", "home.hero.howItWorks": "How BalkanLink works →",
  "home.card.majstor": "Find a tradesperson", "home.card.posao": "Find a job", "home.card.stan": "Find housing",
  "home.card.papiri": "Help with documents", "home.card.restorani": "Balkan restaurants",
  "home.card.dzamije": "Communities & associations", "home.card.prevoz": "Travel & transport", "home.card.pitanje": "Ask a question",
  "home.trust.title": "Over 10,000 users trust", "home.trust.subtitle": "The Balkan community in Germany uses BalkanLink for everyday life.",
  "home.trust.community": "People from Southeast Europe — united in Germany",
  "home.example.1": "Enrolling a child in school", "home.example.2": "Moving to a new city",
  "home.example.3": "Debt collection letter", "home.example.4": "Changing jobs", "home.example.5": "Buying a car",
  "home.testimonials.title": "Our community says",
  "home.testimonials.cities": "Berlin · Munich · Frankfurt · Stuttgart · Cologne",
  "home.review1.text": "Without BalkanLink I would have lost days searching for information. Now I have everything in one place.",
  "home.review2.text": "I completed the child benefit application in 15 minutes with the step-by-step guide. Highly recommended!",
  "home.review3.text": "Finally a platform that understands us. Professional, fast and in our language.",
  "home.review4.text": "All info in one place — from housing to jobs. The Balkan community in Germany finally has its own platform.",
  "home.premium.title": "BalkanLink", "home.premium.subtitle": "Everything you need — no detours.",
  "home.premium.step1": "Forms step-by-step", "home.premium.step2": "Direct links to official authorities",
  "home.premium.step3": "Verified contacts", "home.premium.step4": "Prioritised answers",
  "home.premium.step5": "Partner benefits",
  "home.premium.cta": "Activate Plus", "home.premium.cancel": "Cancel anytime.",
  "footer.tagline": "Everything you need for life in Germany — in one place.",
  "footer.navSection": "Navigation", "footer.legalSection": "Legal",
  "footer.trustSection": "Trust",
  "footer.navHome": "Home", "footer.navHow": "How it works", "footer.navPremium": "Premium",
  "footer.trustRating": "user satisfaction", "footer.trustUsers": "people use BalkanLink",
};

const premiumDe: Partial<TranslationKeys> = {
  "premium.badge": "Premium", "premium.title": "BalkanLink Premium",
  "premium.subtitle": "Voller Zugang zu allem, was du für dein Leben in Deutschland brauchst.",
  "premium.price": "Ab 9 €/Monat · Jederzeit kündbar",
  "premium.heroCta": "Premium aktivieren", "premium.heroFree": "Weiter mit Free",
  "premium.compareTitle": "Free vs. Premium",
  "premium.compareSubtitle": "Vergleiche die Zugangsstufen und finde die richtige für dich.",
  "premium.row.categories": "Zugriff auf alle Kategorien", "premium.row.community": "Orte & Community entdecken",
  "premium.row.ai": "Einfache KI-Antworten", "premium.row.search": "Suche nutzen",
  "premium.row.forms": "Schritt-für-Schritt Formularhilfe", "premium.row.assistant": "Persönlicher Assistent",
  "premium.row.templates": "Vorlagen & Generatoren", "premium.row.priority": "Priorisierte Informationen",
  "premium.row.badge": "Premium Badge im Profil",
  "premium.pricingTitle": "Wähle deinen Plan", "premium.pricingSubtitle": "Kein Risiko. Jederzeit kündbar.",
  "premium.monthly": "Monatlich", "premium.yearly": "Jährlich",
  "premium.perMonth": "/ Monat", "premium.perYear": "/ Jahr",
  "premium.flexible": "Flexibel, ohne Bindung.", "premium.bestOffer": "Bestes Angebot",
  "premium.save": "Spare 59 € pro Jahr", "premium.active": "Aktiv ✓",
  "premium.soon": "Bald verfügbar", "premium.free": "Free",
  "premium.noContract": "Keine Vertragsbindung", "premium.cancelAnytime": "Jederzeit kündbar",
  "premium.forCommunity": "Für die Balkan-Community in Deutschland",
  "premium.function": "Funktion",
};

const premiumBs: Partial<TranslationKeys> = {
  "premium.badge": "Premium", "premium.title": "BalkanLink Premium",
  "premium.subtitle": "Potpuni pristup svemu što ti treba za život u Njemačkoj.",
  "premium.price": "Od 9 €/mjesečno · Otkaži kad hoćeš",
  "premium.heroCta": "Aktiviraj Premium", "premium.heroFree": "Nastavi s Free",
  "premium.compareTitle": "Free vs. Premium",
  "premium.compareSubtitle": "Uporedi nivoe pristupa i pronađi pravi za sebe.",
  "premium.row.categories": "Pristup svim kategorijama", "premium.row.community": "Otkrij mjesta i zajednicu",
  "premium.row.ai": "Jednostavni AI odgovori", "premium.row.search": "Koristi pretragu",
  "premium.row.forms": "Formulari korak po korak", "premium.row.assistant": "Lični asistent",
  "premium.row.templates": "Predlošci i generatori", "premium.row.priority": "Prioritetne informacije",
  "premium.row.badge": "Premium oznaka u profilu",
  "premium.pricingTitle": "Izaberi svoj plan", "premium.pricingSubtitle": "Bez rizika. Otkaži kad hoćeš.",
  "premium.monthly": "Mjesečno", "premium.yearly": "Godišnje",
  "premium.perMonth": "/ mjesec", "premium.perYear": "/ godina",
  "premium.flexible": "Fleksibilno, bez obaveze.", "premium.bestOffer": "Najbolja ponuda",
  "premium.save": "Uštedi 59 € godišnje", "premium.active": "Aktivno ✓",
  "premium.soon": "Uskoro dostupno", "premium.free": "Free",
  "premium.noContract": "Bez ugovornog vezivanja", "premium.cancelAnytime": "Otkaži kad hoćeš",
  "premium.forCommunity": "Za Balkan zajednicu u Njemačkoj",
  "premium.function": "Funkcija",
};

const premiumEn: Partial<TranslationKeys> = {
  "premium.badge": "Premium", "premium.title": "BalkanLink Premium",
  "premium.subtitle": "Full access to everything you need for life in Germany.",
  "premium.price": "From €9/month · Cancel anytime",
  "premium.heroCta": "Activate Premium", "premium.heroFree": "Continue with Free",
  "premium.compareTitle": "Free vs. Premium",
  "premium.compareSubtitle": "Compare access levels and find the right one for you.",
  "premium.row.categories": "Access all categories", "premium.row.community": "Discover places & community",
  "premium.row.ai": "Simple AI answers", "premium.row.search": "Use search",
  "premium.row.forms": "Step-by-step form help", "premium.row.assistant": "Personal assistant",
  "premium.row.templates": "Templates & generators", "premium.row.priority": "Prioritised information",
  "premium.row.badge": "Premium badge on profile",
  "premium.pricingTitle": "Choose your plan", "premium.pricingSubtitle": "No risk. Cancel anytime.",
  "premium.monthly": "Monthly", "premium.yearly": "Yearly",
  "premium.perMonth": "/ month", "premium.perYear": "/ year",
  "premium.flexible": "Flexible, no commitment.", "premium.bestOffer": "Best offer",
  "premium.save": "Save €59 per year", "premium.active": "Active ✓",
  "premium.soon": "Coming soon", "premium.free": "Free",
  "premium.noContract": "No contract", "premium.cancelAnytime": "Cancel anytime",
  "premium.forCommunity": "For the Balkan community in Germany",
  "premium.function": "Feature",
};

// --- Language definitions ---
const translations: Record<Language, TranslationKeys> = {
  bs: {
    "nav.home": "Početna", "nav.qa": "Pitanja i odgovori", "nav.directory": "Imenik",
    "nav.login": "Prijava", "nav.register": "Registracija", "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Njemačkoj",
    "hero.slide1.subtitle": "Provjerene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "München, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, CV, intervju i radna prava — sve na jednom mjestu.",
    "cta.new.title": "Počni ovdje", "cta.new.desc": "Dokumenti, prijava, prvi koraci.",
    "cta.daily.title": "Život & savjeti", "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Trebam pomoć", "cta.help.desc": "Brza rješenja za probleme.",
    "countries.title": "Za cijeli Balkan",
    "categories.title": "Kategorije", "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?", "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.",
    "business.search": "Pretraži imenik", "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori", "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na našem jeziku.",
    "qa.search": "Pretraži...", "qa.all": "Sve teme", "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj sa drugim pojmom.",
    ...dirBs as any, ...missionsBs as any, ...portalBs as any, ...miscBs as any, ...homeBs as any, ...premiumBs as any,
  },
  hr: {
    "nav.home": "Početna", "nav.qa": "Pitanja i odgovori", "nav.directory": "Imenik",
    "nav.login": "Prijava", "nav.register": "Registracija", "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Njemačkoj",
    "hero.slide1.subtitle": "Provjerene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "München, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, životopis, intervju i radna prava — sve na jednom mjestu.",
    "cta.new.title": "Počni ovdje", "cta.new.desc": "Dokumenti, prijava, prvi koraci.",
    "cta.daily.title": "Život & savjeti", "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Trebam pomoć", "cta.help.desc": "Brza rješenja za probleme.",
    "countries.title": "Za cijeli Balkan",
    "categories.title": "Kategorije", "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?", "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.",
    "business.search": "Pretraži imenik", "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori", "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na tvom jeziku.",
    "qa.search": "Pretraži...", "qa.all": "Sve teme", "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj s drugim pojmom.",
    ...dirBs as any, ...missionsBs as any, ...portalBs as any, ...miscBs as any, ...homeBs as any, ...premiumBs as any,
    "dir.filterOrigin": "Zemlja podrijetla", "dir.fieldOrigin": "Zemlja podrijetla",
    "dir.backToDirectory": "Natrag na imenik",
  },
  sr: {
    "nav.home": "Početna", "nav.qa": "Pitanja i odgovori", "nav.directory": "Imenik",
    "nav.login": "Prijava", "nav.register": "Registracija", "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Nemačkoj",
    "hero.slide1.subtitle": "Proverene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "Minhen, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, CV, intervju i radna prava — sve na jednom mestu.",
    "cta.new.title": "Počni ovde", "cta.new.desc": "Dokumenta, prijava, prvi koraci.",
    "cta.daily.title": "Život & saveti", "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Treba mi pomoć", "cta.help.desc": "Brza rešenja za probleme.",
    "countries.title": "Za ceo Balkan",
    "categories.title": "Kategorije", "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?", "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za celu zajednicu.",
    "business.search": "Pretraži imenik", "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori", "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na tvom jeziku.",
    "qa.search": "Pretraži...", "qa.all": "Sve teme", "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj sa drugim pojmom.",
    ...dirBs as any, ...missionsBs as any, ...portalBs as any, ...miscBs as any, ...homeBs as any, ...premiumBs as any,
    "dir.subtitle": "Pronađi balkanske biznise u Nemačkoj.",
    "dir.filterOrigin": "Zemlja porekla", "dir.fieldOrigin": "Zemlja porekla",
    "dir.submitSubtitle": "Popuni formu i tvoj biznis će biti vidljiv nakon provere.",
    "dir.submitSuccess": "Biznis je dodat! Biće vidljiv nakon provere.",
    "missions.title": "Balkanske ambasade i konzulati u Nemačkoj",
    "missions.subtitle": "Pronađi diplomatska predstavništva balkanskih zemalja u Nemačkoj.",
  },
  me: {
    "nav.home": "Početna", "nav.qa": "Pitanja i odgovori", "nav.directory": "Imenik",
    "nav.login": "Prijava", "nav.register": "Registracija", "nav.logout": "Odjava",
    "hero.slide1.title": "Tvoj vodič za život u Njemačkoj",
    "hero.slide1.subtitle": "Provjerene informacije, korak po korak — na tvom jeziku.",
    "hero.slide2.title": "Gradovi koji postaju dom",
    "hero.slide2.subtitle": "Minhen, Berlin, Frankfurt — pronađi svoj put.",
    "hero.slide3.title": "Karijera bez granica",
    "hero.slide3.subtitle": "Posao, CV, intervju i radna prava — sve na jednom mjestu.",
    "cta.new.title": "Počni ovđe", "cta.new.desc": "Dokumenta, prijava, prvi koraci.",
    "cta.daily.title": "Život & savjeti", "cta.daily.desc": "Stan, posao, porezi, zdravstvo.",
    "cta.help.title": "Trebam pomoć", "cta.help.desc": "Brza rješenja za probleme.",
    "countries.title": "Za cijeli Balkan",
    "categories.title": "Kategorije", "categories.subtitle": "Izaberi temu i pronađi odgovor za par sekundi.",
    "business.title": "Imaš biznis?", "business.subtitle": "Dodaj svoj biznis u naš imenik i budi vidljiv za cijelu zajednicu.",
    "business.search": "Pretraži imenik", "business.add": "Dodaj svoj biznis",
    "qa.title": "Pitanja i odgovori", "qa.subtitle": "Pronađi odgovor na svoje pitanje — brzo i na tvom jeziku.",
    "qa.search": "Pretraži...", "qa.all": "Sve teme", "qa.results": "rezultata",
    "qa.empty": "Nema rezultata. Pokušaj sa drugim pojmom.",
    ...dirBs as any, ...missionsBs as any, ...portalBs as any, ...miscBs as any, ...homeBs as any, ...premiumBs as any,
  },
  sq: {
    "nav.home": "Ballina", "nav.qa": "Pyetje dhe përgjigje", "nav.directory": "Drejtoria",
    "nav.login": "Hyrje", "nav.register": "Regjistrohu", "nav.logout": "Dilni",
    "hero.slide1.title": "Udhëzuesi yt për jetën në Gjermani",
    "hero.slide1.subtitle": "Informacione të verifikuara, hap pas hapi — në gjuhën tënde.",
    "hero.slide2.title": "Qytete që bëhen shtëpi",
    "hero.slide2.subtitle": "Mynih, Berlin, Frankfurt — gjej rrugën tënde.",
    "hero.slide3.title": "Karrierë pa kufij",
    "hero.slide3.subtitle": "Punë, CV, intervistë dhe të drejtat e punës — gjithçka në një vend.",
    "cta.new.title": "Fillo këtu", "cta.new.desc": "Dokumentet, regjistrimi, hapat e parë.",
    "cta.daily.title": "Jeta & këshilla", "cta.daily.desc": "Banesë, punë, taksa, shëndetësi.",
    "cta.help.title": "Kam nevojë ndihmë", "cta.help.desc": "Zgjidhje të shpejta për probleme.",
    "countries.title": "Për gjithë Ballkanin",
    "categories.title": "Kategoritë", "categories.subtitle": "Zgjidh temën dhe gjej përgjigjen për disa sekonda.",
    "business.title": "Ke biznes?", "business.subtitle": "Shto biznesin tënd në drejtorinë tonë dhe bëhu i dukshëm.",
    "business.search": "Kërko drejtorinë", "business.add": "Shto biznesin tënd",
    "qa.title": "Pyetje dhe përgjigje", "qa.subtitle": "Gjej përgjigjen e pyetjes tënde — shpejt dhe në gjuhën tënde.",
    "qa.search": "Kërko...", "qa.all": "Të gjitha temat", "qa.results": "rezultate",
    "qa.empty": "Nuk ka rezultate. Provo me një term tjetër.",
    ...dirSq as any, ...missionsSq as any, ...portalSq as any, ...miscSq as any, ...homeBs as any, ...premiumBs as any,
  },
  xk: {
    "nav.home": "Ballina", "nav.qa": "Pyetje dhe përgjigje", "nav.directory": "Drejtoria",
    "nav.login": "Hyrje", "nav.register": "Regjistrohu", "nav.logout": "Dilni",
    "hero.slide1.title": "Udhëzuesi yt për jetën në Gjermani",
    "hero.slide1.subtitle": "Informacione të verifikuara, hap pas hapi — në gjuhën tënde.",
    "hero.slide2.title": "Qytete që bëhen shtëpi",
    "hero.slide2.subtitle": "Mynih, Berlin, Frankfurt — gjej rrugën tënde.",
    "hero.slide3.title": "Karrierë pa kufij",
    "hero.slide3.subtitle": "Punë, CV, intervistë dhe të drejtat e punës — gjithçka në një vend.",
    "cta.new.title": "Fillo këtu", "cta.new.desc": "Dokumentet, regjistrimi, hapat e parë.",
    "cta.daily.title": "Jeta & këshilla", "cta.daily.desc": "Banesë, punë, taksa, shëndetësi.",
    "cta.help.title": "Kam nevojë ndihmë", "cta.help.desc": "Zgjidhje të shpejta për probleme.",
    "countries.title": "Për gjithë Ballkanin",
    "categories.title": "Kategoritë", "categories.subtitle": "Zgjidh temën dhe gjej përgjigjen për disa sekonda.",
    "business.title": "Ke biznes?", "business.subtitle": "Shto biznesin tënd në drejtorinë tonë dhe bëhu i dukshëm.",
    "business.search": "Kërko drejtorinë", "business.add": "Shto biznesin tënd",
    "qa.title": "Pyetje dhe përgjigje", "qa.subtitle": "Gjej përgjigjen e pyetjes tënde — shpejt dhe në gjuhën tënde.",
    "qa.search": "Kërko...", "qa.all": "Të gjitha temat", "qa.results": "rezultate",
    "qa.empty": "Nuk ka rezultate. Provo me një term tjetër.",
    ...dirSq as any, ...missionsSq as any, ...portalSq as any, ...miscSq as any, ...homeBs as any, ...premiumBs as any,
  },
  mk: {
    "nav.home": "Почетна", "nav.qa": "Прашања и одговори", "nav.directory": "Именик",
    "nav.login": "Најава", "nav.register": "Регистрација", "nav.logout": "Одјава",
    "hero.slide1.title": "Твој водич за живот во Германија",
    "hero.slide1.subtitle": "Проверени информации, чекор по чекор — на твој јазик.",
    "hero.slide2.title": "Градови кои стануваат дом",
    "hero.slide2.subtitle": "Минхен, Берлин, Франкфурт — пронајди го твојот пат.",
    "hero.slide3.title": "Кариера без граници",
    "hero.slide3.subtitle": "Работа, CV, интервју и работнички права — сè на едно место.",
    "cta.new.title": "Почни тука", "cta.new.desc": "Документи, пријава, први чекори.",
    "cta.daily.title": "Живот & совети", "cta.daily.desc": "Стан, работа, даноци, здравство.",
    "cta.help.title": "Ми треба помош", "cta.help.desc": "Брзи решенија за проблеми.",
    "countries.title": "За цел Балкан",
    "categories.title": "Категории", "categories.subtitle": "Избери тема и пронајди одговор за неколку секунди.",
    "business.title": "Имаш бизнис?", "business.subtitle": "Додај го твојот бизнис во нашиот именик и биди видлив за целата заедница.",
    "business.search": "Пребарај именик", "business.add": "Додај го твојот бизнис",
    "qa.title": "Прашања и одговори", "qa.subtitle": "Пронајди одговор на твоето прашање — брзо и на твој јазик.",
    "qa.search": "Пребарај...", "qa.all": "Сите теми", "qa.results": "резултати",
    "qa.empty": "Нема резултати. Обиди се со друг поим.",
    "dir.title": "Деловен именик", "dir.subtitle": "Пронајди балкански бизниси во Германија.",
    "dir.add": "Додај бизнис", "dir.searchPlaceholder": "Пребарај по име, град...",
    "dir.filterCity": "Град", "dir.filterCategory": "Категорија", "dir.filterOrigin": "Земја на потекло",
    "dir.allCities": "Сите градови", "dir.allCategories": "Сите категории", "dir.allOrigins": "Сите земји",
    "dir.results": "резултати", "dir.clearFilters": "Избриши филтри", "dir.empty": "Нема бизниси за прикажување.",
    "dir.submitTitle": "Додај го твојот бизнис",
    "dir.submitSubtitle": "Пополни ја формата и твојот бизнис ќе биде видлив по проверка.",
    "dir.backToDirectory": "Назад на именик",
    "dir.fieldName": "Име на бизнис", "dir.fieldCategory": "Категорија", "dir.fieldCity": "Град",
    "dir.fieldOrigin": "Земја на потекло", "dir.fieldAddress": "Адреса", "dir.fieldPhone": "Телефон",
    "dir.fieldWebsite": "Веб страница", "dir.fieldDescription": "Опис",
    "dir.submit": "Испрати", "dir.submitting": "Се испраќа...",
    "dir.submitSuccess": "Бизнисот е додаден! Ќе биде видлив по проверка.",
    "dir.submitError": "Грешка. Обиди се повторно.",
    "dir.loginRequired": "Мора да бидеш најавен за да додадеш бизнис.",
    ...missionsMk as any, ...portalMk as any, ...miscMk as any, ...homeBs as any, ...premiumBs as any,
  },
  de: {
    "nav.home": "Startseite", "nav.qa": "Fragen & Antworten", "nav.directory": "Verzeichnis",
    "nav.login": "Anmelden", "nav.register": "Registrieren", "nav.logout": "Abmelden",
    "hero.slide1.title": "Dein Guide für das Leben in Deutschland",
    "hero.slide1.subtitle": "Geprüfte Informationen, Schritt für Schritt — in deiner Sprache.",
    "hero.slide2.title": "Städte, die zur Heimat werden",
    "hero.slide2.subtitle": "München, Berlin, Frankfurt — finde deinen Weg.",
    "hero.slide3.title": "Karriere ohne Grenzen",
    "hero.slide3.subtitle": "Job, Lebenslauf, Vorstellungsgespräch und Arbeitsrecht — alles an einem Ort.",
    "cta.new.title": "Starte hier", "cta.new.desc": "Dokumente, Anmeldung, erste Schritte.",
    "cta.daily.title": "Leben & Tipps", "cta.daily.desc": "Wohnung, Arbeit, Steuern, Gesundheit.",
    "cta.help.title": "Hilfe nötig", "cta.help.desc": "Schnelle Lösungen für Probleme.",
    "countries.title": "Für den gesamten Balkan",
    "categories.title": "Kategorien", "categories.subtitle": "Wähle ein Thema und finde die Antwort in Sekunden.",
    "business.title": "Hast du ein Geschäft?", "business.subtitle": "Füge dein Unternehmen in unser Verzeichnis ein und werde sichtbar.",
    "business.search": "Verzeichnis durchsuchen", "business.add": "Geschäft hinzufügen",
    "qa.title": "Fragen & Antworten", "qa.subtitle": "Finde die Antwort auf deine Frage — schnell und in deiner Sprache.",
    "qa.search": "Suchen...", "qa.all": "Alle Themen", "qa.results": "Ergebnisse",
    "qa.empty": "Keine Ergebnisse. Versuche einen anderen Suchbegriff.",
    "dir.title": "Branchenverzeichnis", "dir.subtitle": "Finde Balkan-Unternehmen in Deutschland.",
    "dir.add": "Geschäft hinzufügen", "dir.searchPlaceholder": "Nach Name, Stadt suchen...",
    "dir.filterCity": "Stadt", "dir.filterCategory": "Kategorie", "dir.filterOrigin": "Herkunftsland",
    "dir.allCities": "Alle Städte", "dir.allCategories": "Alle Kategorien", "dir.allOrigins": "Alle Länder",
    "dir.results": "Ergebnisse", "dir.clearFilters": "Filter löschen", "dir.empty": "Keine Unternehmen zum Anzeigen.",
    "dir.submitTitle": "Füge dein Geschäft hinzu",
    "dir.submitSubtitle": "Fülle das Formular aus und dein Geschäft wird nach Prüfung sichtbar.",
    "dir.backToDirectory": "Zurück zum Verzeichnis",
    "dir.fieldName": "Geschäftsname", "dir.fieldCategory": "Kategorie", "dir.fieldCity": "Stadt",
    "dir.fieldOrigin": "Herkunftsland", "dir.fieldAddress": "Adresse", "dir.fieldPhone": "Telefon",
    "dir.fieldWebsite": "Webseite", "dir.fieldDescription": "Beschreibung",
    "dir.submit": "Absenden", "dir.submitting": "Wird gesendet...",
    "dir.submitSuccess": "Geschäft hinzugefügt! Wird nach Prüfung sichtbar.",
    "dir.submitError": "Fehler. Versuche es erneut.",
    "dir.loginRequired": "Du musst angemeldet sein, um ein Geschäft hinzuzufügen.",
    ...missionsDe as any, ...portalDe as any, ...miscDe as any, ...homeDe as any, ...premiumDe as any,
  },
  en: {
    "nav.home": "Home", "nav.qa": "Q&A", "nav.directory": "Directory",
    "nav.login": "Sign in", "nav.register": "Sign up", "nav.logout": "Sign out",
    "hero.slide1.title": "Your guide to life in Germany",
    "hero.slide1.subtitle": "Verified information, step by step — in your language.",
    "hero.slide2.title": "Cities that become home",
    "hero.slide2.subtitle": "Munich, Berlin, Frankfurt — find your way.",
    "hero.slide3.title": "Career without borders",
    "hero.slide3.subtitle": "Jobs, CV, interview and work rights — all in one place.",
    "cta.new.title": "Start here", "cta.new.desc": "Documents, registration, first steps.",
    "cta.daily.title": "Life & tips", "cta.daily.desc": "Housing, work, taxes, healthcare.",
    "cta.help.title": "Need help", "cta.help.desc": "Quick solutions for problems.",
    "countries.title": "For the entire Balkans",
    "categories.title": "Categories", "categories.subtitle": "Pick a topic and find the answer in seconds.",
    "business.title": "Have a business?", "business.subtitle": "Add your business to our directory and become visible to the community.",
    "business.search": "Browse directory", "business.add": "Add your business",
    "qa.title": "Questions & Answers", "qa.subtitle": "Find the answer to your question — fast and in your language.",
    "qa.search": "Search...", "qa.all": "All topics", "qa.results": "results",
    "qa.empty": "No results. Try a different term.",
    "dir.title": "Business Directory", "dir.subtitle": "Find Balkan businesses in Germany.",
    "dir.add": "Add business", "dir.searchPlaceholder": "Search by name, city...",
    "dir.filterCity": "City", "dir.filterCategory": "Category", "dir.filterOrigin": "Country of origin",
    "dir.allCities": "All cities", "dir.allCategories": "All categories", "dir.allOrigins": "All countries",
    "dir.results": "results", "dir.clearFilters": "Clear filters", "dir.empty": "No businesses to display.",
    "dir.submitTitle": "Add your business",
    "dir.submitSubtitle": "Fill out the form and your business will be visible after review.",
    "dir.backToDirectory": "Back to directory",
    "dir.fieldName": "Business name", "dir.fieldCategory": "Category", "dir.fieldCity": "City",
    "dir.fieldOrigin": "Country of origin", "dir.fieldAddress": "Address", "dir.fieldPhone": "Phone",
    "dir.fieldWebsite": "Website", "dir.fieldDescription": "Description",
    "dir.submit": "Submit", "dir.submitting": "Submitting...",
    "dir.submitSuccess": "Business added! It will be visible after review.",
    "dir.submitError": "Error. Please try again.",
    "dir.loginRequired": "You must be signed in to add a business.",
    ...missionsEn as any, ...portalEn as any, ...miscEn as any, ...homeEn as any, ...premiumEn as any,
  },
};

export function getTranslation(lang: Language, key: keyof TranslationKeys): string {
  return translations[lang]?.[key] ?? translations.de[key] ?? key;
}
