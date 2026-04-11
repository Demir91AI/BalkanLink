import {
  FileText, Euro, Users, Shield, Briefcase, AlertTriangle,
  Building, Calculator, Receipt, Archive, HelpCircle, Globe, LucideIcon,
} from "lucide-react";

export interface BiznisCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  slugs: string[];
}

export interface BiznisGuide {
  slug: string;
  title: string;
  germanTerm: string;
  categoryId: string;
  explanation: string;
  rules: string[];
  examples: string[];
  warnings: string[];
  myths: string[];
  sources: string[];
  lastUpdated: string;
}

export const BIZNIS_CATEGORIES: BiznisCategory[] = [
  { id: "osnove", label: "Osnove i razumijevanje", icon: FileText, slugs: ["sta-je-gewerbe", "ko-moze-otvoriti-gewerbe", "gewerbe-vs-freiberufler", "kleingewerbe", "vrste-gewerbea", "kada-treba-gewerbe"] },
  { id: "eu-vs-trecezemlje", label: "EU građani vs. građani trećih zemalja", icon: Globe, slugs: ["ko-smije-otvoriti-gewerbe"] },
  { id: "pokretanje", label: "Pokretanje poslovanja", icon: Building, slugs: ["kako-otvoriti-gewerbe", "potrebni-dokumenti", "troskovi-otvaranja", "gewerbeanmeldung", "nakon-prijave-gewerbea", "fragebogen-steuerliche-erfassung"] },
  { id: "porezi", label: "Porezi i finansije", icon: Euro, slugs: ["kleinunternehmerregelung", "umsatzsteuer", "gewerbesteuer", "einkommensteuer-gewerbe", "porezne-obaveze-rokovi"] },
  { id: "fakturisanje", label: "Fakturisanje i administracija", icon: Receipt, slugs: ["kako-izdati-racun", "obavezni-elementi-racuna", "knjigovodstvo-osnove", "cuvanje-dokumentacije", "poslovni-bankovni-racun"] },
  { id: "obaveze", label: "Obaveze i osiguranja", icon: Shield, slugs: ["ihk-hwk-obaveze", "obavezna-osiguranja"] },
  { id: "posebne-situacije", label: "Posebne situacije", icon: Users, slugs: ["gewerbe-uz-posao", "gewerbe-uz-buergergeld"] },
  { id: "greske-zatvaranje", label: "Greške i zatvaranje", icon: AlertTriangle, slugs: ["tipicne-greske", "kako-odjaviti-gewerbe", "promjena-podataka", "pauziranje-poslovanja"] },
  { id: "faq", label: "Najčešća pitanja", icon: HelpCircle, slugs: ["faq-gewerbe"] },
];

export const BIZNIS_GUIDES: BiznisGuide[] = [
  // ═══ OSNOVE ═══
  {
    slug: "sta-je-gewerbe",
    title: "Šta je Gewerbe?",
    germanTerm: "Gewerbe / Gewerbebetrieb",
    categoryId: "osnove",
    explanation: "Gewerbe (obrt / poslovna djelatnost) je svaka samostalna, trajna, na zaradu usmjerena djelatnost koja nije slobodna profesija (Freiberuf), poljoprivreda ili šumarstvo. Zakonska definicija proizlazi iz Gewerbeordnung (GewO) i sudske prakse. U Njemačkoj je osnivanje Gewerbea ustavno zagarantovano pravo (čl. 12 Grundgesetz — sloboda zanimanja). Svako ko želi obavljati privrednu djelatnost u Njemačkoj mora prijaviti Gewerbe kod nadležnog Gewerbeamta (općinski ured za obrte), osim ako djelatnost spada pod slobodne profesije (Freiberuf) prema § 18 EStG. Gewerbe obuhvata širok spektar djelatnosti: od trgovine, ugostiteljstva, zanatstva, do IT usluga i online poslovanja. Prijava je relativno jednostavna i može se u mnogim gradovima obaviti online.",
    rules: [
      "Gewerbe je svaka poslovna djelatnost koja je: samostalna (selbständig), trajna (nachhaltig), usmjerena na zaradu (Gewinnerzielungsabsicht) i obavlja se u pravnom prometu (Teilnahme am allgemeinen wirtschaftlichen Verkehr).",
      "Prema GewO § 14, svako ko započne privrednu djelatnost dužan je prijaviti je nadležnom Gewerbeamtu.",
      "Prijava Gewerbea ne zahtijeva minimalni kapital za Einzelunternehmen ili Kleingewerbe.",
      "Gewerbe ne obuhvata slobodne profesije (Freiberufe), poljoprivredu i šumarstvo.",
      "Gewerbeschein (potvrda o prijavi) izdaje se obično istog dana ili u roku od nekoliko radnih dana.",
      "Nakon prijave, Finanzamt automatski dobiva obavijest i šalje Fragebogen zur steuerlichen Erfassung.",
    ],
    examples: [
      "Ahmed iz Sarajeva živi u Münchenu i želi otvoriti kafić. Ovo je klasičan Gewerbe — mora ga prijaviti kod Gewerbeamta u Münchenu.",
      "Marko iz Zagreba radi kao web developer u Berlinu. Ako želi raditi kao freelancer, pitanje je da li je to Gewerbe ili Freiberuf — za IT djelatnosti zavisi od konkretnog opisa posla. Čisto programiranje može biti Freiberuf, dok web design s gotovim temama može biti Gewerbe.",
      "Jelena iz Beograda prodaje ručno rađen nakit na Etsy-ju iz Hamburga. Ovo je Gewerbe jer se radi o trgovini fizičkim proizvodima.",
    ],
    warnings: [
      "Obavljanje privredne djelatnosti bez prijave Gewerbea je prekršaj (Ordnungswidrigkeit) i može rezultirati novčanom kaznom do 1.000 €.",
      "Čak i ako počneš zarađivati 'mali iznos', ako je djelatnost trajna i usmjerena na zaradu, moraš prijaviti Gewerbe.",
      "Građani trećih zemalja moraju PRVO provjeriti da li njihova boravišna dozvola uopće dozvoljava samozaposlenje — više u temi 'Ko smije otvoriti Gewerbe'.",
    ],
    myths: [
      "MIT: 'Gewerbe je samo za velike firme.' — NETAČNO. Gewerbe može prijaviti bilo ko, uključujući male poduzetnike i online prodavce.",
      "MIT: 'Ako zarađujem manje od 520 € mjesečno, ne trebam Gewerbe.' — NETAČNO. Iznos zarade je nebitan; bitna je namjera zarađivanja i trajnost djelatnosti.",
      "MIT: 'Gewerbe i firma su isto.' — NETAČNO. Gewerbe je širi pojam za privrednu djelatnost. Firma (npr. GmbH) je specifičan pravni oblik.",
    ],
    sources: [
      "Gewerbeordnung (GewO) § 1, § 14 — zakonski temelj definicije i prijave obrta",
      "Einkommensteuergesetz (EStG) § 15 — definicija prihoda iz Gewerbea",
      "Grundgesetz Art. 12 — sloboda zanimanja",
      "IHK.de — Gewerbeanmeldung: Informationen und Tipps",
      "BMWi/BMWK — Existenzgründungsportal",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "ko-moze-otvoriti-gewerbe",
    title: "Ko može otvoriti Gewerbe?",
    germanTerm: "Wer darf ein Gewerbe anmelden?",
    categoryId: "osnove",
    explanation: "U principu, svaka punoljetna i poslovno sposobna osoba može prijaviti Gewerbe u Njemačkoj. To uključuje njemačke državljane, EU/EEA građane i građane trećih zemalja — ali uz različite uslove. EU građani imaju slobodu poslovnog nastana (Niederlassungsfreiheit) i mogu prijaviti Gewerbe bez dodatnih dozvola. Građani trećih zemalja moraju imati boravišnu dozvolu koja eksplicitno dozvoljava samozaposlenje. Maloljetnici (od 7 godina) mogu prijaviti Gewerbe samo uz saglasnost zakonskog zastupnika i odobrenje Porodičnog suda (Familiengericht). Za određene djelatnosti (npr. zanatstvo, ugostiteljstvo, transport) potrebne su dodatne dozvole ili kvalifikacije neovisno o državljanstvu.",
    rules: [
      "Punoljetne, poslovno sposobne osobe mogu prijaviti Gewerbe.",
      "EU/EEA građani: slobodan pristup po FreizügG/EU — samo prijava kod Gewerbeamta.",
      "Građani trećih zemalja: boravišna dozvola mora sadržavati napomenu 'selbständige Tätigkeit gestattet' ili ekvivalentno.",
      "Za određene djelatnosti (Handwerk, Gastronomie, Transport) potrebne su dodatne dozvole (Meisterbrief, Gaststättenerlaubnis, Güterkraftverkehrsgenehmigung).",
      "Maloljetnici trebaju odobrenje zakonskog zastupnika i Familiengericht (§ 112 BGB).",
      "Osobe s Gewerbeverbot (zabrana obavljanja obrta izrečena od suda) ne smiju prijaviti Gewerbe.",
    ],
    examples: [
      "Ivana iz Hrvatske (EU građanka) živi u Frankfurtu i želi otvoriti frizerski salon. Može prijaviti Gewerbe odmah, ali za zanatski salon treba provjeriti Handwerksrolle (HWK).",
      "Emir iz BiH ima Niederlassungserlaubnis — može prijaviti Gewerbe bez dodatnih odobrenja jer trajna dozvola u pravilu dozvoljava samozaposlenje.",
      "Ana iz Srbije ima Aufenthaltserlaubnis zum Zweck der Beschäftigung (§ 18 AufenthG) — NE može automatski otvoriti Gewerbe. Mora prvo zatražiti odobrenje kod Ausländerbehörde.",
    ],
    warnings: [
      "Nikada ne prijavljuj Gewerbe ako nisi siguran/na da tvoja boravišna dozvola to dozvoljava — u suprotnom rizikiraš gubitak boravišnog statusa!",
      "Za zanatske djelatnosti (zulassungspflichtige Handwerke) treba Meisterbrief ili ekvivalentna kvalifikacija — prijava bez toga rezultira odbijanjem ili kaznom.",
      "Ako ti je izrečena sudska zabrana obavljanja djelatnosti (Gewerbeverbot), prijava Gewerbea je krivično djelo.",
    ],
    myths: [
      "MIT: 'Svako može otvoriti Gewerbe u Njemačkoj bez obzira na boravišni status.' — NETAČNO. Građani trećih zemalja moraju imati odgovarajuću dozvolu.",
      "MIT: 'Ako imam radnu dozvolu, automatski mogu otvoriti Gewerbe.' — NETAČNO. Radna dozvola (Beschäftigung) i dozvola za samozaposlenje su različite kategorije.",
      "MIT: 'Za svaki Gewerbe treba Meisterbrief.' — NETAČNO. Meisterbrief je potreban samo za 53 zulassungspflichtige Handwerke (Anlage A HwO).",
    ],
    sources: [
      "Gewerbeordnung (GewO) § 14 — prijava obrta",
      "FreizügG/EU — sloboda kretanja i poslovnog nastana za EU građane",
      "AufenthG § 21 — samozaposlenje stranaca",
      "BGB § 112 — odobrenje za maloljetnike",
      "Handwerksordnung (HwO) — zanatske djelatnosti",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "gewerbe-vs-freiberufler",
    title: "Gewerbe vs. Freiberufler",
    germanTerm: "Gewerbe vs. Freiberufler (Freie Berufe)",
    categoryId: "osnove",
    explanation: "U Njemačkoj postoje dva osnovna oblika samozaposlenja: Gewerbe (obrt) i Freiberuf (slobodna profesija). Razlika je pravno značajna jer određuje poreze, obaveze registracije i članstvo u komorama. Freiberufler su definirani u § 18 EStG i uključuju: ljekare, advokate, arhitekte, inženjere, novinare, prevodioce, umjetnike, IT konsultante (pod određenim uslovima) i slične profesije. Freiberufler ne prijavljuje Gewerbe kod Gewerbeamta, ne plaća Gewerbesteuer i nije član IHK. Umjesto toga, samo se registruje kod Finanzamta. Gewerbe obuhvata sve ostale privredne djelatnosti — od trgovine do zanatstva. Ključni test: da li djelatnost zahtijeva posebno stručno obrazovanje i ličnu, kreativnu komponentu? Ako da, vjerovatno je Freiberuf.",
    rules: [
      "Freiberufler: definiran u § 18 Abs. 1 EStG — katalog profesija (Katalogberufe) i slične djelatnosti.",
      "Freiberufler ne prijavljuje Gewerbe, ne plaća Gewerbesteuer (GewStG), nije obavezan član IHK.",
      "Gewerbe: sve privredne djelatnosti koje nisu Freiberuf, poljoprivreda ili šumarstvo.",
      "Gewerbetreibende moraju: prijaviti Gewerbe (GewO § 14), platiti Gewerbesteuer iznad freibetraga od 24.500 €/godišnje, biti član IHK/HWK.",
      "Finanzamt donosi konačnu odluku o klasifikaciji — ako imaš dilemu, konzultiraj Steuerberater.",
      "Mješovita djelatnost: ako obavljaš i Freiberuf i Gewerbe, moraš ih računovodstveno razdvojiti ili ćeš biti potpuno klasificiran kao Gewerbe.",
    ],
    examples: [
      "Prevodilac koji prevodi pravne dokumente: Freiberufler (kataloški zanimanje iz § 18 EStG).",
      "Web dizajner koji kreira custom dizajne: može biti Freiberufler ako je djelatnost kreativna i zahtijeva stručnost.",
      "Online shop koji prodaje robu: Gewerbe — prodaja fizičkih proizvoda je uvijek Gewerbe.",
      "IT konsultant koji savjetuje firme o arhitekturi softvera: Freiberufler (ali mora dokazati da radi inženjerski/savjetodavno, ne samo 'kodira').",
    ],
    warnings: [
      "Pogrešna klasifikacija (prijaviti se kao Freiberufler kad si zapravo Gewerbe) može rezultirati retroaktivnim plaćanjem Gewerbesteuer + penali!",
      "Finanzamt može u bilo kojem trenutku preispitati tvoju klasifikaciju — čuvaj dokumentaciju o prirodi svog rada.",
      "Mješovite djelatnosti su rizične: ako nemaš jasno razdvojeno, Finanzamt može SVE klasificirati kao Gewerbe.",
    ],
    myths: [
      "MIT: 'Freiberufler ne plaća nikakve poreze.' — NETAČNO. Freiberufler plaća Einkommensteuer i eventualno Umsatzsteuer, samo ne Gewerbesteuer.",
      "MIT: 'Programeri su automatski Freiberufler.' — NETAČNO. Zavisi od konkretne djelatnosti. Rutinsko kodiranje može biti Gewerbe.",
      "MIT: 'Ako napišem Freiberufler na prijavu, Finanzamt to mora prihvatiti.' — NETAČNO. Finanzamt vrši provjeru i može reklasificirati.",
    ],
    sources: [
      "Einkommensteuergesetz (EStG) § 18 — slobodne profesije",
      "Gewerbesteuergesetz (GewStG) § 2 — Gewerbesteuerpflicht",
      "GewO § 14 — prijava obrta",
      "IHK.de — Freiberufler oder Gewerbetreibender?",
      "BMWK — Existenzgründungsportal: Freie Berufe",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "kleingewerbe",
    title: "Kleingewerbe objašnjenje",
    germanTerm: "Kleingewerbe / Kleiner Gewerbebetrieb",
    categoryId: "osnove",
    explanation: "Kleingewerbe (mali obrt) je neformalni pojam za Gewerbebetrieb koji ne prelazi pragove Handelsgesetzbuch (HGB) i stoga nije obavezan da se registruje u Handelsregister. Kleingewerbe NIJE poseban pravni oblik — to je Einzelunternehmen (samostalni poduzetnik) koji posluje ispod HGB pragova. Vlasnik Kleingewerbea odgovara cijelom svojom privatnom imovinom. Važno: Kleingewerbe ne treba miješati s Kleinunternehmerregelung (§ 19 UStG) — to je porezna olakšica za malu obrtu a odnosi se na oslobođenje od Umsatzsteuer, i može se primijeniti na bilo koji oblik poslovanja.",
    rules: [
      "Kleingewerbe = Einzelunternehmen ispod HGB pragova — nije obavezan upis u Handelsregister.",
      "Nema minimalni kapital. Nema obavezu dvojnog knjigovodstva — dovoljna je Einnahmenüberschussrechnung (EÜR).",
      "Vlasnik odgovara neograničeno cijelom privatnom imovinom.",
      "Granice za Kleingewerbe (bez obaveze upisa u Handelsregister): godišnji promet ispod cca 600.000 € ili godišnji profit ispod 60.000 € (§ 241a HGB).",
      "Moraju se poštovati sve obaveze Gewerbea: prijava kod Gewerbeamta, članstvo u IHK, Gewerbesteuer iznad 24.500 € godišnjeg profita.",
      "Kleingewerbe može kombinovati s Kleinunternehmerregelung (§ 19 UStG) za oslobođenje od Umsatzsteuer.",
    ],
    examples: [
      "Sanja iz Podgorice prodaje kolače iz kuće u Düsseldorfu. Promet joj je 15.000 € godišnje. Ovo je tipičan Kleingewerbe — ne treba Handelsregister, koristi EÜR za računovodstvo.",
      "Dragan iz BiH popravljacompjutere kao samostalni obrt u Berlinu, zarađuje oko 25.000 € godišnje. Kleingewerbe + Kleinunternehmerregelung (ako je u prvoj godini ispod praga).",
    ],
    warnings: [
      "Neograničena lična odgovornost! Ako tvoj Kleingewerbe napravi dugove, vjerovnici mogu zaplijeniti tvoju privatnu imovinu.",
      "Kleingewerbe ≠ Kleinunternehmerregelung — to su dva potpuno različita pojma. Ne miješaj ih!",
      "Čak i Kleingewerbe mora voditi urednu evidenciju prihoda i rashoda za Finanzamt.",
    ],
    myths: [
      "MIT: 'Kleingewerbe je poseban pravni oblik.' — NETAČNO. To je Einzelunternehmen bez upisa u Handelsregister.",
      "MIT: 'Kleingewerbe ne plaća porez.' — NETAČNO. Einkommensteuer se plaća na sav profit; Gewerbesteuer iznad 24.500 € freibetraga.",
      "MIT: 'Kleingewerbe znači da ne trebam IHK članarinu.' — NETAČNO. IHK članarina je obavezna za sve Gewerbetreibende.",
    ],
    sources: [
      "HGB § 241a — pragovi za pojednostavljeno knjigovodstvo",
      "UStG § 19 — Kleinunternehmerregelung",
      "GewO § 14 — prijava obrta",
      "IHK.de — Kleingewerbe: Voraussetzungen und Pflichten",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "vrste-gewerbea",
    title: "Vrste Gewerbea — koji tip odabrati?",
    germanTerm: "Rechtsformen im Überblick",
    categoryId: "osnove",
    explanation: "Njemačko pravo nudi razne pravne oblike (Rechtsformen) za poslovnu djelatnost. Izbor pravnog oblika utiče na odgovornost osnivača, poreze, obavezu upisa u Handelsregister i minimalni kapital. Za balkanske početnike najrelevantniji oblici su: Einzelunternehmen/Kleingewerbe (bez kapitala, puna odgovornost), GbR (partnerstvo, bez kapitala, puna odgovornost svih partnera), UG haftungsbeschränkt (mini-GmbH, od 1 € kapitala, ograničena odgovornost), GmbH (25.000 € minimalni kapital, ograničena odgovornost) i e.K. (upisani trgovac, puna odgovornost, ali 'profesionalniji' status).",
    rules: [
      "Einzelunternehmen / Kleingewerbe: jedna osoba, nema min. kapitala, neograničena lična odgovornost, EÜR dovoljna, najjednostavnija opcija.",
      "e.K. (eingetragener Kaufmann): Einzelunternehmen upisan u Handelsregister — obavezan za veće promete, doppelte Buchführung, neograničena odgovornost, ali može koristiti firmu (npr. 'Müller IT e.K.').",
      "GbR (Gesellschaft bürgerlichen Rechts): 2+ partnera, nema min. kapitala, svi partneri odgovaraju neograničeno i solidarno. Od 2024 moguć upis u Gesellschaftsregister.",
      "UG (haftungsbeschränkt): 'Mini-GmbH', min. kapital od 1 € (preporučeno barem 500–1.000 €), odgovornost ograničena na ulog, obavezna retencija 25% dobiti dok se ne dostigne 25.000 €. Osnivanje kod notara.",
      "GmbH: min. kapital 25.000 € (50% mora biti uplaćeno pri osnivanju), ograničena odgovornost, najpopularniji oblik za ozbiljnije poslovne aktivnosti. Osnivanje kod notara, upis u Handelsregister.",
      "Freiberufler: slobodna profesija — poseban status, ne prijavljuje Gewerbe (vidjeti poseban vodič).",
    ],
    examples: [
      "Mirza želi prodavati ćevape na tržnici — Einzelunternehmen/Kleingewerbe je dovoljno za početak.",
      "Amir i Vedran otvaraju zajedno auto-praonicu — GbR je prirodan izbor, ali pažnja: obojica odgovaraju cijelom imovinom.",
      "Lejla pokreće IT startup i traži investitore — UG (haftungsbeschränkt) je dobar početak s minimalnim kapitalom i ograničenom odgovornošću.",
    ],
    warnings: [
      "Kod Einzelunternehmen i GbR odgovaraš cijelom privatnom imovinom — uključujući stan, auto i ušteđevinu!",
      "UG zvuči privlačno s 1 € kapitala, ali banke i partneri često traže veći kapital za kredibilnost. Premali kapital može značiti insolventnost već kod prvog problema.",
      "Promjena pravnog oblika (npr. iz Einzelunternehmen u GmbH) zahtijeva notara, poreznog savjetnika i može biti skupa. Bolje odmah odabrati pravi oblik.",
    ],
    myths: [
      "MIT: 'UG je isto što i GmbH.' — NETAČNO. UG je varijanta GmbH s nižim kapitalom, ali ima obavezu retencije dobiti i manje povjerenje partnera.",
      "MIT: 'GbR nema nikakve obaveze.' — NETAČNO. Svi partneri solidarno odgovaraju neograničeno, a od 2024 je moguć upis u Gesellschaftsregister.",
      "MIT: 'Moram imati 25.000 € na računu za GmbH.' — DJELIMIČNO TAČNO. Samo 12.500 € mora biti uplaćeno pri osnivanju, ostatak se može uplatiti naknadno.",
    ],
    sources: [
      "HGB — Handelsgesetzbuch (oblici poslovanja)",
      "GmbHG — Gesetz betreffend die GmbH",
      "BGB §§ 705 ff. — GbR",
      "BMWK Existenzgründungsportal — Rechtsformen",
      "IHK.de — Wahl der Rechtsform",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "kada-treba-gewerbe",
    title: "Kada ti treba Gewerbe, a kada ne",
    germanTerm: "Wann braucht man ein Gewerbe?",
    categoryId: "osnove",
    explanation: "Ne zahtijeva svaka zarađivačka aktivnost prijavu Gewerbea. Ključni kriteriji su: samostalnost (ne radiš po nalogu jednog poslodavca), trajnost (ne jednokratna aktivnost), namjera zarade i sudjelovanje u općem privrednom prometu. Privatna prodaja korištenih stvari (npr. na eBay-u) obično nije Gewerbe sve dok nije sistematska i trajna. Slobodne profesije (Freiberuf) ne prijavljuju Gewerbe. Hobiji koji ne donose zaradu nisu Gewerbe. Međutim, čim se hobij pretvori u redovni izvor prihoda, Gewerbe postaje obavezan.",
    rules: [
      "Gewerbe TREBA: ako je djelatnost samostalna, trajna, usmjerena na zaradu i sudjeluje u privrednom prometu.",
      "Gewerbe NE TREBA: za slobodne profesije (Freiberuf, § 18 EStG), poljoprivredu/šumarstvo, privatnu jednokratnu prodaju, hobi bez namjere zarade.",
      "Privatna prodaja na eBay/Kleinanzeigen: ako prodaješ vlastite korištene stvari povremeno — nije Gewerbe. Ako kupuješ i preprodaješ sistematski — jest Gewerbe.",
      "Online platforme (Etsy, Amazon FBA): gotovo uvijek zahtijeva Gewerbe jer se radi o trajnoj, na zaradu usmjerenoj djelatnosti.",
      "Jednorazna usluga (npr. pomoć prijatelju s prevodom za novac): nije Gewerbe. Ali ako to počneš raditi redovno — jest.",
    ],
    examples: [
      "Prodaješ svoj stari bicikl na eBay-u za 50 € — NE treba Gewerbe.",
      "Kupuješ telefone na veliko i preprodaješ na Kleinanzeigen — TREBA Gewerbe.",
      "Radiš kao freelance grafički dizajner za razne klijente — zavisi: ako je kreativna/umjetnička djelatnost, može biti Freiberuf. Ako više koristiš gotove template-ove, može biti Gewerbe.",
    ],
    warnings: [
      "Finanzamt i Gewerbeamt gledaju stvarnu ekonomsku aktivnost, ne tvoju namjeru. Ako oni procijene da je to Gewerbe, moraš ga retroaktivno prijaviti.",
      "Platforme kao Etsy i Amazon FBA prijavljuju tvoje prihode Finanzamtu — ne misli da možeš izbjeći prijavu.",
      "Neregistrirana djelatnost = Schwarzarbeit (rad na crno) u najgorem slučaju.",
    ],
    myths: [
      "MIT: 'Ako zarađujem manje od 410 € mjesečno, ne trebam Gewerbe.' — NETAČNO. Ne postoji minimalni iznos.",
      "MIT: 'Online prodaja je uvijek Gewerbe.' — NETAČNO. Privatna, povremena prodaja vlastitih stvari nije Gewerbe.",
      "MIT: 'Hobi ne može postati Gewerbe.' — NETAČNO. Čim hobi postane trajni izvor prihoda, Finanzamt ga tretira kao Gewerbe.",
    ],
    sources: [
      "GewO § 14 — prijava obrta",
      "EStG § 15 — prihodi iz Gewerbea",
      "EStG § 18 — slobodne profesije",
      "IHK.de — Gewerbepflicht: Wann muss ich anmelden?",
      "Finanzamt — Abgrenzung Hobby / Gewerbe",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ EU vs. TREĆE ZEMLJE ═══
  {
    slug: "ko-smije-otvoriti-gewerbe",
    title: "Ko smije otvoriti Gewerbe — EU vs. treće zemlje",
    germanTerm: "Gewerbeanmeldung: EU-Bürger vs. Drittstaatsangehörige",
    categoryId: "eu-vs-trecezemlje",
    explanation: "Ovo je najkritičnija tema za balkanske korisnike jer pogrešan korak može ugroziti boravišni status. Pravila za otvaranje Gewerbea razlikuju se fundamentalno između EU građana i građana trećih zemalja.\n\n**EU GRAĐANI** (Hrvatska, Slovenija, Bugarska, Rumunija itd.): Prema FreizügG/EU i Ugovoru o funkcioniranju EU (AEUV, čl. 49), imaju pravo slobodnog poslovnog nastana (Niederlassungsfreiheit). EU građanin može prijaviti Gewerbe pod identičnim uslovima kao i njemački državljanin — bez ikakvog dodatnog odobrenja. Dovoljno je prijaviti se kod Gewerbeamta s važećom ličnom kartom ili pasošem.\n\n**GRAĐANI TREĆIH ZEMALJA** (Bosna i Hercegovina, Srbija, Kosovo, Crna Gora, Sjeverna Makedonija, Albanija itd.): Moraju imati boravišnu dozvolu koja eksplicitno dozvoljava samozaposlenje (selbständige Tätigkeit). Ključni zakon je AufenthG § 21 (Selbständige Tätigkeit) koji definira uslove pod kojima stranac iz treće zemlje može dobiti dozvolu za samozaposlenje.\n\n**TIPOVI BORAVIŠNIH DOZVOLA I SAMOZAPOSLENJE:**\n\n• Niederlassungserlaubnis (§ 9 AufenthG) — trajna boravišna dozvola. U pravilu dozvoljava samozaposlenje bez dodatnog odobrenja jer ne sadrži ograničenja na vrstu zaposlenja.\n\n• Aufenthaltserlaubnis zum Zweck der Beschäftigung (§ 18 AufenthG) — dozvoljena je samo nesamostalna zaposlenja (Beschäftigung). Za samozaposlenje je potrebno posebno odobrenje ili promjena dozvole na § 21 AufenthG.\n\n• Blaue Karte EU (§ 18g AufenthG) — izdaje se visokokvalificiranim radnicima. U principu dozvoljena samo zaposlenja kod poslodavca. Samozaposlenje zahtijeva promjenu na § 21 AufenthG ili prelazak na Niederlassungserlaubnis.\n\n• Duldung (§ 60a AufenthG) — privremena suspenzija deportacije. U pravilu NE dozvoljava samozaposlenje, osim u izuzetnim slučajevima s odobrenjem Ausländerbehörde.\n\n• Asylbewerber (u toku azilnog postupka) — stroga ograničenja; samozaposlenje u pravilu nije dozvoljeno tokom azilnog postupka.\n\n**§ 21 AufenthG — DOZVOLA ZA SAMOZAPOSLENJE STRANACA:** Ova dozvola može se izdati ako postoji: (1) ekonomski interes ili regionalna potreba, (2) pozitivan uticaj na ekonomiju, (3) osigurano finansiranje. Za slobodne profesije (Freiberuf) uslovi su blaži — § 21 Abs. 5 AufenthG.\n\n**RAZLIKA § 21 vs § 18 AufenthG:** § 18 pokriva nesamostalno zaposlenje (rad za poslodavca). § 21 pokriva samozaposlenje (Gewerbe, Freiberuf). To su dvije potpuno odvojene pravne osnove. Radna dozvola po § 18 NE podrazumijeva pravo na samozaposlenje.\n\n**PRAKTIČNI KORACI — ŠTA PRVO?** Za građane trećih zemalja: (1) Provjeri svoju boravišnu dozvolu — piše li 'selbständige Tätigkeit gestattet'? (2) Ako NE piše — idi na Ausländerbehörde i zatraži promjenu/proširenje dozvole. (3) TEK NAKON dobijanja odobrenja od Ausländerbehörde idi na Gewerbeamt za prijavu Gewerbea.\n\n**WESTBALKAN-REGELUNG (§ 26 Abs. 2 BeschV):** Ova uredba omogućava građanima zapadnog Balkana (BiH, Srbija, Kosovo, Crna Gora, Sj. Makedonija, Albanija) da dobiju radnu dozvolu za BILO KOJI posao u Njemačkoj. Međutim, ovo je Beschäftigungserlaubnis — dozvola za rad KOD POSLODAVCA, NE za samozaposlenje! Westbalkan-Regelung korisnici koji žele otvoriti Gewerbe moraju zasebno zatražiti dozvolu za samozaposlenje (§ 21 AufenthG) od Ausländerbehörde.",
    rules: [
      "EU građani: slobodan pristup samozaposlenju po FreizügG/EU. Potrebna samo lična karta/pasoš + Gewerbeanmeldung.",
      "Građani trećih zemalja: OBAVEZNO provjeriti boravišnu dozvolu PRIJE prijave Gewerbea.",
      "Niederlassungserlaubnis (§ 9 AufenthG): u pravilu dozvoljava samozaposlenje.",
      "Aufenthaltserlaubnis § 18 AufenthG (Beschäftigung): NE dozvoljava automatski samozaposlenje — potrebna promjena na § 21.",
      "Blaue Karte EU: samozaposlenje nije pokriveno — potrebna promjena dozvole.",
      "§ 21 AufenthG: posebna dozvola za samozaposlenje — zahtijeva poslovni plan, dokaz finansiranja i pozitivan ekonomski uticaj.",
      "Westbalkan-Regelung: dozvoljava RAD kod poslodavca, NE samozaposlenje!",
      "Redoslijed za treće zemlje: Ausländerbehörde PRVO → Gewerbeamt TEK NAKON odobrenja.",
      "Otvaranje Gewerbea bez odgovarajuće dozvole = kršenje boravišnih uvjeta što može dovesti do opoziva dozvole boravka.",
    ],
    examples: [
      "Marko iz Hrvatske (EU): želi otvoriti autopraonicuUlmu. Odlazi direktno na Gewerbeamt s hrvatskim pasošem, prijavljuje Gewerbe istog dana. Nikakvo dodatno odobrenje nije potrebno.",
      "Adnan iz BiH ima Niederlassungserlaubnis: može prijaviti Gewerbe jer trajna dozvola ne ograničava vrstu zaposlenja.",
      "Milica iz Srbije ima Aufenthaltserlaubnis po § 18 AufenthG (radi kao medicinska sestra): želi otvoriti online shop. MORA PRVO otići na Ausländerbehörde i zatražiti odobrenje za selbständige Tätigkeit ili promjenu dozvole na § 21 AufenthG.",
      "Besim iz Kosova došao preko Westbalkan-Regelung: radi u fabrici, želi otvoriti frizerski salon. Westbalkan-Regelung NE pokriva samozaposlenje — mora zatražiti posebnu dozvolu po § 21 AufenthG.",
      "Dragan iz Crne Gore ima Blaue Karte: želi biti IT freelancer. Blaue Karte pokriva samo rad kod poslodavca — mora zatražiti promjenu dozvole ili čekati Niederlassungserlaubnis.",
    ],
    warnings: [
      "KRITIČNO: Otvaranje Gewerbea bez odgovarajuće boravišne dozvole koja dozvoljava samozaposlenje može rezultirati: (1) opozivom boravišne dozvole, (2) obavezom napuštanja Njemačke, (3) zabranom ponovnog ulaska.",
      "Gewerbeamt NE provjerava uvijek boravišni status detaljno — ali Ausländerbehörde dobiva obavijest i MOŽE pokrenuti provjeru!",
      "Westbalkan-Regelung ≠ dozvola za Gewerbe. Ne miješaj ove dvije stvari!",
      "Čak i Nebentätigkeit (sporedna djelatnost) za građane trećih zemalja zahtijeva provjeru boravišne dozvole.",
      "Nikada ne oslanjaj se na savjet prijatelja ili forume za ovu temu — konsultiraj Ausländerbehörde ili advokata za imigraciono pravo.",
    ],
    myths: [
      "MIT: 'Ako imam bilo kakvu boravišnu dozvolu, mogu otvoriti Gewerbe.' — NETAČNO. Samo određene dozvole to eksplicitno dozvoljavaju.",
      "MIT: 'Gewerbeamt će mi reći ako ne smijem otvoriti Gewerbe.' — NEPOUZDANO. Gewerbeamt ne vrši uvijek detaljnu provjeru boravišnog statusa.",
      "MIT: 'Westbalkan-Regelung mi dozvoljava da radim šta hoću u Njemačkoj.' — NETAČNO. Pokriva samo rad kod poslodavca (Beschäftigung), ne samozaposlenje.",
      "MIT: 'EU građani trebaju posebnu dozvolu za Gewerbe u Njemačkoj.' — NETAČNO. EU građani imaju jednaka prava kao njemački državljani po pitanju poslovnog nastana.",
      "MIT: 'Ako otvorim Gewerbe bez dozvole, Finanzamt neće ništa primijetiti.' — OPASNO NETAČNO. Informacije se razmjenjuju između institucija.",
    ],
    sources: [
      "Gewerbeordnung (GewO) § 14 — prijava obrta",
      "Aufenthaltsgesetz (AufenthG) § 21 — samozaposlenje stranaca",
      "AufenthG § 18, § 18g — zaposlenje i Blaue Karte",
      "AufenthG § 9 — Niederlassungserlaubnis",
      "FreizügG/EU — sloboda kretanja EU građana",
      "BAMF — službeni portal za migraciju i integraciju",
      "Make it in Germany (make-it-in-germany.com) — zvanični vladini portal",
      "BeschV § 26 Abs. 2 — Westbalkan-Regelung",
      "IHK.de — Gewerbeanmeldung für Ausländer",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ POKRETANJE ═══
  {
    slug: "kako-otvoriti-gewerbe",
    title: "Kako otvoriti Gewerbe korak po korak",
    germanTerm: "Gewerbeanmeldung Schritt für Schritt",
    categoryId: "pokretanje",
    explanation: "Otvaranje Gewerbea u Njemačkoj je relativno jednostavan postupak koji se može obaviti osobno na Gewerbeamtu (općinski ured za obrte), poštom ili u mnogim gradovima online. Cijena je obično 15–65 € zavisno od grada. Postupak: (1) Pripremi dokumente, (2) Ispuni obrazac za prijavu (Gewerbeanmeldung / GewA 1), (3) Predaj na Gewerbeamtu, (4) Primi Gewerbeschein, (5) Čekaj pismo od Finanzamta (Fragebogen). Cjelokupan proces traje obično od 1 dana do 2 sedmice.",
    rules: [
      "Korak 1: Pripremi dokumente — lična karta ili pasoš, za treće zemlje: boravišna dozvola s dozvolom za samozaposlenje, eventualno dodatne dozvole za regulirane djelatnosti.",
      "Korak 2: Ispuni obrazac GewA 1 (Gewerbeanmeldung) — dostupan na web stranici tvog grada ili na Gewerbeamtu.",
      "Korak 3: Predaj obrazac na Gewerbeamtu (lično, poštom ili online), plati naknadu (15–65 €).",
      "Korak 4: Dobijaš Gewerbeschein — potvrdu o prijavi obrta. Obično istog dana ili u roku od nekoliko dana.",
      "Korak 5: Gewerbeamt automatski obavještava Finanzamt, IHK/HWK, Berufsgenossenschaft i eventualno druge institucije.",
      "Korak 6: Finanzamt ti šalje Fragebogen zur steuerlichen Erfassung — moraš ga popuniti i vratiti u roku od 4 sedmice.",
    ],
    examples: [
      "Emir u Hamburgu: odlazi na Gewerbeamt HH-Mitte, donosi pasoš i Niederlassungserlaubnis, ispunjava GewA 1, plaća 20 €, dobija Gewerbeschein istog dana.",
      "Ivana u Münchenu: prijavljuje Gewerbe online preko münchen.de portala. Upload pasoša, ispunjava obrazac, plaća 40 € online. Gewerbeschein dolazi poštom za 5 dana.",
    ],
    warnings: [
      "Ne čekaj s prijavom! Retroaktivna prijava je moguća, ali Finanzamt može zahtijevati poreznu prijavu za prethodne periode.",
      "Za neke djelatnosti (Handwerk, Gastronomie, Makler) moraš PRVO dobiti posebne dozvole prije prijave Gewerbea.",
      "Greška u opisu djelatnosti na GewA 1 može rezultirati pogrešnom klasifikacijom od strane IHK i Finanzamta.",
    ],
    myths: [
      "MIT: 'Prijava Gewerbea traje sedmicama.' — NETAČNO. Obično traje od 15 minuta do nekoliko dana.",
      "MIT: 'Trebam poslovni prostor za prijavu.' — NETAČNO. Možeš prijaviti Gewerbe na kućnu adresu.",
      "MIT: 'Moram imati poslovni plan za Gewerbeamt.' — NETAČNO. Poslovni plan nije potreban za Gewerbeanmeldung (ali jeste za § 21 AufenthG za treće zemlje).",
    ],
    sources: [
      "GewO § 14 — Gewerbeanmeldung",
      "BMWK — Existenzgründungsportal",
      "IHK.de — Gewerbeanmeldung Schritt für Schritt",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "potrebni-dokumenti",
    title: "Potrebni dokumenti za otvaranje Gewerbea",
    germanTerm: "Erforderliche Unterlagen für die Gewerbeanmeldung",
    categoryId: "pokretanje",
    explanation: "Za prijavu Gewerbea potrebno je pripremiti određene dokumente koji variraju ovisno o državljanstvu, vrsti djelatnosti i pravnom obliku. Osnovni set dokumenata je relativno jednostavan, ali za regulirane djelatnosti ili građane trećih zemalja mogu biti potrebni dodatni dokumenti.",
    rules: [
      "Obavezno za sve: ispunjen obrazac GewA 1, važeća lična karta ili pasoš.",
      "Građani trećih zemalja: boravišna dozvola (Aufenthaltstitel) s dozvolom za samozaposlenje.",
      "Za Handwerk djelatnosti: Handwerkskarte ili izvod iz Handwerksrolle.",
      "Za ugostiteljstvo: Gaststättenerlaubnis + Gesundheitszeugnis (Belehrung nach § 43 IfSG).",
      "Za GmbH/UG: izvod iz Handelsregistra, akt o osnivanju (Gesellschaftsvertrag).",
      "Za neke djelatnosti: polizeiliche Führungszeugnis (potvrda o nekažnjavanju), Auskunft iz Gewerbezentralregister.",
      "Naknade: 15–65 € zavisno od grada i vrste djelatnosti.",
    ],
    examples: [
      "IT freelancer (Einzelunternehmen): pasoš + GewA 1 — to je sve.",
      "Restoran: pasoš + GewA 1 + Gaststättenerlaubnis + Gesundheitszeugnis + eventualno Führungszeugnis.",
      "Građanin BiH, Einzelunternehmen: pasoš + Aufenthaltstitel s dozvolom za samozaposlenje + GewA 1.",
    ],
    warnings: [
      "Bez odgovarajuće boravišne dozvole, Gewerbeamt može odbiti prijavu ili prijaviti Ausländerbehörde.",
      "Nedostajući dokumenti za regulirane djelatnosti znače odgodu ili odbijanje prijave.",
      "Obrazac GewA 1 mora biti tačno popunjen — pogrešan opis djelatnosti može stvoriti probleme s IHK i Finanzamtom.",
    ],
    myths: [
      "MIT: 'Trebam gomilu dokumenata za Gewerbe.' — Zavisi od djelatnosti. Za jednostavan obrt su potrebna samo 2-3 dokumenta.",
      "MIT: 'Diploma je obavezna.' — NETAČNO za većinu djelatnosti. Diploma/kvalifikacija je potrebna samo za regulirane profesije.",
    ],
    sources: [
      "GewO § 14 — Gewerbeanmeldung",
      "IfSG § 43 — Gesundheitsbelehrung",
      "HwO — Handwerksordnung",
      "IHK.de — Dokumente für die Gewerbeanmeldung",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "troskovi-otvaranja",
    title: "Troškovi otvaranja Gewerbea",
    germanTerm: "Kosten der Gewerbeanmeldung",
    categoryId: "pokretanje",
    explanation: "Otvaranje Gewerbea u Njemačkoj je relativno jeftino u usporedbi s mnogim drugim zemljama. Osnovni troškovi uključuju naknadu Gewerbeamtu (15–65 €), ali ukupni troškovi mogu rasti ovisno o vrsti djelatnosti i pravnom obliku. GmbH osnivanje npr. košta značajno više zbog notarskih troškova i minimalnog kapitala.",
    rules: [
      "Gewerbeanmeldung: 15–65 € (zavisno od grada).",
      "IHK članarina: od 0 € (za Kleingewerbe s niskim prometom) do nekoliko stotina € godišnje. Postoji oslobođenje za prve 2 godine i mali promet.",
      "Handwerkskammer (HWK): slično IHK, obavezno za zanatske djelatnosti.",
      "Notar (samo za GmbH/UG): 300–1.000 € za ovjeru Gesellschaftsvertrag.",
      "Handelsregister upis (samo za e.K., GmbH, UG): 150–300 €.",
      "GmbH minimalni kapital: 25.000 € (12.500 € pri osnivanju). UG: od 1 €.",
      "Eventualne dodatne dozvole (Gaststättenerlaubnis itd.): varira, obično 50–500 €.",
      "Steuerberater (porezni savjetnik): opciono ali preporučljivo, 100–300 € za inicijalno savjetovanje.",
    ],
    examples: [
      "Kleingewerbe u Berlinu: Gewerbeanmeldung 26 €, IHK prva godina 0 € = ukupno 26 €.",
      "UG u Münchenu: Gewerbeanmeldung 40 € + notar ~400 € + Handelsregister ~150 € + UG kapital (npr. 500 €) = cca 1.100 €.",
      "GmbH: Gewerbeanmeldung + notar (600-1000 €) + Handelsregister (300 €) + kapital 12.500-25.000 € = značajna investicija.",
    ],
    warnings: [
      "Ne zaboravi IHK članarinu — dolazi automatski nakon prijave i obavezna je za sve Gewerbetreibende.",
      "Troškovi Steuerberatera (poreznog savjetnika) su investicija, ne trošak — loše vođeno knjigovodstvo može koštati mnogo više.",
      "Za UG: 1 € kapitala zvuči privlačno, ali nedovoljan kapital može značiti brzu insolventnost.",
    ],
    myths: [
      "MIT: 'Otvaranje Gewerbea je skupo.' — NETAČNO za Kleingewerbe/Einzelunternehmen (26–65 €).",
      "MIT: 'IHK članarina je dobrovoljna.' — NETAČNO. Članstvo u IHK je zakonski obavezno za sve Gewerbetreibende.",
    ],
    sources: [
      "GewO § 14 — naknada za prijavu",
      "IHKG — zakon o IHK i obaveznom članstvu",
      "GmbHG — troškovi osnivanja GmbH",
      "BMWK — Existenzgründungsportal: Kosten",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "gewerbeanmeldung",
    title: "Gewerbeanmeldung objašnjen",
    germanTerm: "Gewerbeanmeldung (Formular GewA 1)",
    categoryId: "pokretanje",
    explanation: "Gewerbeanmeldung je zvanični obrazac (GewA 1) koji se predaje Gewerbeamtu pri prijavi obrta. Obrazac je standardiziran na saveznom nivou ali može imati lokalne varijacije. Pravilno popunjavanje je važno jer određuje kako će IHK i Finanzamt klasificirati tvoju djelatnost. Obrazac sadrži podatke o osobi, adresi, vrsti djelatnosti, pravnom obliku, datumu početka i eventualno broju zaposlenih.",
    rules: [
      "Obrazac GewA 1 sadrži: lične podatke (ime, adresa, datum rođenja, državljanstvo), adresu poslovnog prostora, datum početka djelatnosti, opis djelatnosti, pravni oblik, broj zaposlenih.",
      "Opis djelatnosti (Tätigkeitsbeschreibung) mora biti precizan i sveobuhvatan — npr. 'IT-Dienstleistungen, Webentwicklung und Beratung' umjesto samo 'IT'.",
      "Datum početka djelatnosti: može biti u prošlosti (retroaktivna prijava) — u tom slučaju pripremi se na pitanja Finanzamta.",
      "Poslovni prostor: može biti kućna adresa ako nema zakonskih ili ugovornih ograničenja (provjeri najamni ugovor!).",
      "Obrazac se može predati lično, poštom ili u nekim gradovima online.",
    ],
    examples: [
      "Opis djelatnosti: 'Handel mit Elektronikprodukten über das Internet' — jasno opisuje online prodaju elektronike.",
      "Loš opis: 'Sonstiges' ili 'Dienstleistungen' — previše neodređeno, može izazvati probleme.",
    ],
    warnings: [
      "Preopširan opis djelatnosti može značiti višu IHK članarinu ili pogrešnu Berufsgenossenschaft klasifikaciju.",
      "Preuzan opis može ograničiti buduće proširenje poslovanja — tada bi trebalo prijaviti promjenu (Gewerbeummeldung).",
      "Ako koristiš kućnu adresu, provjeri najamni ugovor — neki ne dozvoljavaju poslovnu upotrebu stana.",
    ],
    myths: [
      "MIT: 'Mogu napisati bilo šta kao djelatnost.' — NETAČNO. Opis mora biti precizan i odgovarati stvarnoj djelatnosti.",
      "MIT: 'Obrazac je komplikovan.' — NETAČNO. GewA 1 ima jednu stranicu i može se ispuniti za 10 minuta.",
    ],
    sources: [
      "GewO § 14 — Gewerbeanmeldung",
      "IHK.de — Ausfüllhinweise GewA 1",
      "BMWK — Existenzgründungsportal",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "nakon-prijave-gewerbea",
    title: "Šta se dešava nakon prijave Gewerbea",
    germanTerm: "Was passiert nach der Gewerbeanmeldung?",
    categoryId: "pokretanje",
    explanation: "Nakon prijave Gewerbea pokreće se automatski lanac obavijesti. Gewerbeamt informira Finanzamt, IHK/HWK, Berufsgenossenschaft (profesionalno osiguranje od nezgoda) i statistički ured. U narednim sedmicama i mjesecima ćeš dobiti pisma od svake od ovih institucija. Najvažniji korak je popunjavanje Fragebogena od Finanzamta — bez toga ne dobijaš porezni broj i ne možeš izdavati račune.",
    rules: [
      "1-7 dana: Gewerbeschein (potvrda prijave) dobijaš od Gewerbeamta.",
      "2-4 sedmice: Finanzamt šalje Fragebogen zur steuerlichen Erfassung — popuni ga u roku od 4 sedmice!",
      "2-6 sedmica: IHK/HWK šalje pismo o obaveznom članstvu i informacije o članarini.",
      "4-8 sedmica: Berufsgenossenschaft (BG) se javlja — obavezno osiguranje od nezgoda na radu. Član si čak i ako nemaš zaposlene.",
      "Razno: statistički ured, eventualno zdravstveni inspektorat (za prehrambene djelatnosti) itd.",
      "Nakon dobijanja Steuernummer od Finanzamta: možeš izdavati račune i formalno poslovati.",
    ],
    examples: [
      "Sanja prijavi Gewerbe 1. marta. Do 15. marta dobije Gewerbeschein. 20. marta stigne Fragebogen od Finanzamta. 1. aprila popuni i pošalje. Sredinom aprila dobije Steuernummer. Početkom maja stigne pismo od IHK i BG.",
    ],
    warnings: [
      "Ne ignoriši pisma od BG (Berufsgenossenschaft) — obavezno si član i moraš platiti doprinose, čak i ako si jedini zaposleni u svom Gewerbeu.",
      "Kašnjenje s Fragebogenom može rezultirati procjenom poreza od strane Finanzamta (Schätzung) — što je obično nepovoljnije za tebe.",
      "IHK članarina se MORA platiti — nije dobrovoljna!",
    ],
    myths: [
      "MIT: 'Nakon prijave sam odmah spreman za poslovanje.' — DJELIMIČNO TAČNO. Formalno da, ali bez Steuernummer ne možeš izdavati pravilne račune.",
      "MIT: 'BG me se ne tiče jer nemam zaposlene.' — NETAČNO. Obavezno članstvo postoji i za samozaposlene.",
    ],
    sources: [
      "GewO § 14 — prijava i obaveze",
      "AO § 138 — Fragebogen zur steuerlichen Erfassung",
      "SGB VII — obavezno osiguranje kod BG",
      "IHKG — obavezno članstvo u IHK",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "fragebogen-steuerliche-erfassung",
    title: "Fragebogen zur steuerlichen Erfassung",
    germanTerm: "Fragebogen zur steuerlichen Erfassung",
    categoryId: "pokretanje",
    explanation: "Fragebogen zur steuerlichen Erfassung je obavezni upitnik koji Finanzamt šalje nakon prijave Gewerbea. Od 2021. godine popunjava se isključivo elektronski putem ELSTER portala (elster.de). Ovaj upitnik određuje tvoj porezni status: da li ćeš koristiti Kleinunternehmerregelung, da li ćeš naplaćivati Umsatzsteuer, koji je tvoj očekivani godišnji promet i profit. Pogrešno popunjavanje može imati dugoročne porezne posljedice.",
    rules: [
      "Od 2021: popunjavanje isključivo preko ELSTER portala (online). Papirni obrazac se više ne prihvata.",
      "Rok: 4 sedmice od prijave Gewerbea.",
      "Ključna pitanja: očekivani promet i profit za prvu i drugu godinu, izbor Kleinunternehmerregelung (§ 19 UStG), oblik vođenja knjiga.",
      "Izbor Kleinunternehmerregelung (da/ne) — ako izabereš DA: ne naplaćuješ Umsatzsteuer ali ne možeš ni odbijati Vorsteuer. Ako izabereš NE: naplaćuješ 19%/7% USt ali možeš odbijati Vorsteuer na poslovne troškove.",
      "Promjena Kleinunternehmerregelung izbora je moguća, ali vezuje te na 5 godina ako se jednom odlučiš za Regelbesteuerung.",
      "Nakon obrade, Finanzamt izdaje Steuernummer i eventualno USt-IdNr.",
    ],
    examples: [
      "Ahmed očekuje 15.000 € prometa u prvoj godini. Bira Kleinunternehmerregelung jer ne želi komplikacije s USt. Ispravna odluka za mali obrt bez velikih poslovnih troškova.",
      "Lejla pokreće IT konsalting s očekivanim prometom od 80.000 €. Bira Regelbesteuerung jer želi odbijati Vorsteuer na skupu opremu (laptop, softver).",
    ],
    warnings: [
      "Previše optimistične procjene prometa/profita mogu rezultirati previsokim avansnim plaćanjima poreza (Vorauszahlungen).",
      "Previše pesimistične procjene mogu izazvati sumnju Finanzamta i zahtjev za dokazivanjem 'namjere zarade' (Gewinnerzielungsabsicht).",
      "Ako ne odgovoriš u roku, Finanzamt može napraviti Schätzung (procjenu) koja je obično nepovoljnija.",
    ],
    myths: [
      "MIT: 'Fragebogen mogu popuniti na papiru.' — NETAČNO od 2021. Samo preko ELSTER.",
      "MIT: 'Procjene u Fragebogenu su obavezujuće.' — NETAČNO. To su procjene, ali Finanzamt ih koristi za kalkulaciju avansnih plaćanja.",
    ],
    sources: [
      "AO § 138 — obaveza prijave kod Finanzamta",
      "UStG § 19 — Kleinunternehmerregelung",
      "ELSTER.de — zvanični portal",
      "IHK.de — Fragebogen: Tipps zum Ausfüllen",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ POREZI ═══
  {
    slug: "kleinunternehmerregelung",
    title: "Kleinunternehmerregelung",
    germanTerm: "Kleinunternehmerregelung (§ 19 UStG)",
    categoryId: "porezi",
    explanation: "Kleinunternehmerregelung (§ 19 UStG) je porezna olakšica koja oslobađa male poduzetnike od obaveze naplate i prijavljivanja Umsatzsteuer (PDV). Od 2025. godine važe novi pragovi: godišnji promet u prethodnoj godini do 25.000 € i očekivani promet u tekućoj godini do 100.000 €. Ovo je značajno povećanje u odnosu na prethodne pragove (22.000 € / 50.000 €). Kleinunternehmer ne naplaćuje Umsatzsteuer na računu, ali isto tako ne može odbijati Vorsteuer (ulazni PDV) na poslovne troškove.",
    rules: [
      "Pragovi od 01.01.2025: prethodni godišnji promet ≤ 25.000 € I očekivani tekući promet ≤ 100.000 €.",
      "Kleinunternehmer NE naplaćuje Umsatzsteuer na računu — na računu mora stajati napomena o § 19 UStG.",
      "Kleinunternehmer NE može odbijati Vorsteuer (ulazni PDV) na poslovne nabavke.",
      "Opcija za Regelbesteuerung: možeš se dobrovoljno odreći Kleinunternehmerregelung — ali onda si vezan 5 godina.",
      "Ne miješaj Kleinunternehmerregelung s Kleingewerbe — to su dva potpuno različita pojma!",
      "USt-Voranmeldung (mjesečna/kvartalna prijava PDV-a) nije potrebna za Kleinunternehmer.",
    ],
    examples: [
      "Mirza zarađuje 18.000 € godišnje od online prodaje. Koristi Kleinunternehmerregelung. Na računu piše: 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.' Klijenti plaćaju netto cijenu.",
      "Anela zarađuje 30.000 € godišnje — PRELAZI prag od 25.000 € iz prethodne godine i MORA naplaćivati Umsatzsteuer.",
    ],
    warnings: [
      "Ako tokom godine prelaziš prag od 100.000 €, od tog trenutka moraš početi naplaćivati Umsatzsteuer!",
      "Za B2B poslovanje (firme kao klijenti), Kleinunternehmerregelung može biti NEDOSTATAK jer klijenti ne mogu odbiti Vorsteuer s tvojih računa.",
      "Jednom kad se odrekneš Kleinunternehmerregelung, moraš čekati 5 godina da se vratiš.",
    ],
    myths: [
      "MIT: 'Kleinunternehmer ne plaća nikakav porez.' — NETAČNO. Einkommensteuer se plaća na profit, samo Umsatzsteuer je izuzeta.",
      "MIT: 'Prag je 22.000 €.' — ZASTARJELO. Od 2025. je prag 25.000 € (prethodni promet) / 100.000 € (očekivani).",
      "MIT: 'Kleinunternehmerregelung je isto što i Kleingewerbe.' — NETAČNO. Jedno je porezna olakšica, drugo je oblik Gewerbea.",
    ],
    sources: [
      "UStG § 19 — Kleinunternehmerregelung (s izmjenama od 01.01.2025)",
      "Jahressteuergesetz 2024 — novi pragovi",
      "IHK.de — Kleinunternehmerregelung 2025",
      "BMF — Umsatzsteuerliche Behandlung von Kleinunternehmern",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "umsatzsteuer",
    title: "Umsatzsteuer osnove",
    germanTerm: "Umsatzsteuer (USt / Mehrwertsteuer)",
    categoryId: "porezi",
    explanation: "Umsatzsteuer (USt), poznata i kao Mehrwertsteuer (MwSt / PDV), je porez na promet koji se naplaćuje na gotovo sve robe i usluge u Njemačkoj. Standardna stopa je 19%, smanjena stopa 7% (za hranu, knjige, javni prevoz itd.). Kao Gewerbetreibender, naplaćuješ USt od klijenata i uplaćuješ je Finanzamtu. Istovremeno, USt koji platiš na poslovne nabavke (Vorsteuer) možeš odbiti. Razliku uplaćuješ Finanzamtu putem USt-Voranmeldung (mjesečne ili kvartalne prijave).",
    rules: [
      "Standardna stopa: 19%. Smanjena stopa: 7% (hrana, knjige, kulturni događaji, javni prevoz).",
      "Gewerbetreibende su u principu obveznici USt — osim Kleinunternehmer (§ 19 UStG).",
      "USt-Voranmeldung: mjesečna (u prvoj i drugoj godini poslovanja, obavezno), zatim kvartalna ili godišnja zavisno od iznosa.",
      "Vorsteuerabzug: USt koji platiš na poslovne troškove možeš odbiti od USt koju naplaćuješ klijentima.",
      "Rok za USt-Voranmeldung: do 10. u mjesecu za prethodni mjesec/kvartal (ili do 10. drugog mjeseca ako imaš Dauerfristverlängerung).",
      "Jahreserklärung (godišnja USt prijava): do 31. jula naredne godine (ili do kraja februara ako koristiš Steuerberater).",
    ],
    examples: [
      "Izdaš račun od 1.000 € netto + 190 € USt (19%) = 1.190 € brutto. Kupiš laptop za 500 € + 95 € USt. Predaješ Finanzamtu: 190 € – 95 € = 95 € USt.",
      "Kleinunternehmer: ne naplaćuje USt, ali ne može odbiti 95 € na laptop — plaća punu cijenu od 595 €.",
    ],
    warnings: [
      "Kašnjenje s USt-Voranmeldung može rezultirati kaznenim kamatama (Säumniszuschlag) od 1% mjesečno.",
      "Pogrešno odbijanje Vorsteuer (npr. na privatne troškove) = porezna prijevara.",
      "U prvoj i drugoj godini USt-Voranmeldung je obavezno MJESEČNA — ne kvartalna!",
    ],
    myths: [
      "MIT: 'USt i MwSt su različiti porezi.' — NETAČNO. To su dva naziva za isti porez.",
      "MIT: 'USt je moj trošak.' — NETAČNO. USt samo naplaćuješ i prosljeđuješ Finanzamtu — to je 'durchlaufender Posten'.",
    ],
    sources: [
      "UStG — Umsatzsteuergesetz",
      "BMF — Umsatzsteuer Informationen",
      "IHK.de — Umsatzsteuer für Gründer",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "gewerbesteuer",
    title: "Gewerbesteuer objašnjenje",
    germanTerm: "Gewerbesteuer (GewSt)",
    categoryId: "porezi",
    explanation: "Gewerbesteuer je općinski porez na poslovnu djelatnost koji plaćaju svi Gewerbetreibende čiji godišnji profit prelazi Freibetrag od 24.500 € (za Einzelunternehmen i Personengesellschaften). Stopa zavisi od općine (Hebesatz) i kreće se obično od 200% do 900%, s prosjekom oko 400%. Za Einzelunternehmen i Personengesellschaften, Gewerbesteuer se djelimično umanjuje od Einkommensteuer (do faktora 4,0 × Steuermessbetrag). GmbH i UG nemaju Freibetrag i plaćaju Gewerbesteuer na cjelokupan profit.",
    rules: [
      "Freibetrag: 24.500 € za Einzelunternehmen i Personengesellschaften (GbR). GmbH/UG nemaju Freibetrag.",
      "Steuermesszahl: 3,5% na Gewerbeertrag (profit) iznad Freibetraga.",
      "Hebesatz: određuje općina — minimum 200%, prosjek oko 400%, veći gradovi 400–500%.",
      "Primjer kalkulacije: 50.000 € profit – 24.500 € Freibetrag = 25.500 € × 3,5% = 892,50 € × Hebesatz (npr. 400%) = 3.570 € Gewerbesteuer.",
      "Anrechnung: Einzelunternehmer može do 4,0 × Steuermessbetrag odbiti od Einkommensteuer.",
      "Vorauszahlungen: kvartalno (15.02., 15.05., 15.08., 15.11.).",
    ],
    examples: [
      "Senad ima Kleingewerbe u Berlinu, profit 30.000 €. Gewerbesteuer: (30.000 – 24.500) × 3,5% × 410% (Berlin Hebesatz) = 788,05 €. Ali većina se anrechnet na Einkommensteuer.",
      "GmbH u Münchenu, profit 100.000 €: 100.000 × 3,5% × 490% = 17.150 € Gewerbesteuer (bez Freibetraga!).",
    ],
    warnings: [
      "Lokacija Gewerbea direktno utiče na visinu Gewerbesteuer — gradovi imaju više Hebesätze nego seoske općine.",
      "GmbH/UG vlasnici: nema Freibetraga! Gewerbesteuer se plaća na svaki euro profita.",
      "Gewerbesteuer se NE anrechnet na Einkommensteuer za GmbH — samo za Einzelunternehmen i Personengesellschaften.",
    ],
    myths: [
      "MIT: 'Gewerbesteuer je duplo oporezivanje.' — DJELIMIČNO TAČNO za GmbH, ali za Einzelunternehmen se anrechnet na ESt.",
      "MIT: 'Kleingewerbe ne plaća Gewerbesteuer.' — Ovisi o profitu. Ispod 24.500 € — tačno. Iznad — plaća.",
    ],
    sources: [
      "GewStG — Gewerbesteuergesetz",
      "EStG § 35 — Anrechnung der Gewerbesteuer",
      "IHK.de — Gewerbesteuer für Gründer",
      "DIHK — Hebesätze der Gemeinden",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "einkommensteuer-gewerbe",
    title: "Einkommensteuer za Gewerbe",
    germanTerm: "Einkommensteuer (ESt) für Gewerbetreibende",
    categoryId: "porezi",
    explanation: "Einkommensteuer (porez na dohodak) je glavni porez koji svaki Gewerbetreibender plaća na svoj godišnji profit. Progresivne stope od 0% do 45% primjenjuju se na ukupni dohodak (uključujući Gewerbe profit). Grundfreibetrag (neoporezivi minimum) za 2025/2026 iznosi 12.084 € (2025), uz očekivano povećanje za 2026. Sav profit iz Gewerbea prijavljuje se u godišnjoj Einkommensteuererklärung.",
    rules: [
      "Grundfreibetrag 2025: 12.084 € — do ovog iznosa ne plaćaš Einkommensteuer.",
      "Progresivne stope: 14% (od 12.085 €) do 42% (od 68.430 €), Spitzensteuersatz 45% (od 277.826 €).",
      "Solidaritätszuschlag: 5,5% na Einkommensteuer, ali od 2021. oslobođen za većinu poreznih obveznika (Freigrenze 18.130 € ESt).",
      "Gewerbetreibende prijavljuju profit iz Gewerbea u Anlage G godišnje porezne prijave.",
      "Vorauszahlungen: Finanzamt određuje kvartalne avanse na osnovu procjene ili prošlogodišnjeg profita (10.03., 10.06., 10.09., 10.12.).",
      "Rok za godišnju prijavu: 31. juli naredne godine (s Steuerberaterom: do kraja februara godine nakon toga).",
    ],
    examples: [
      "Emir zarađuje 35.000 € netto profita iz Gewerbea. Minus Grundfreibetrag 12.084 €. Na preostalih 22.916 € plaća progresivnu stopu — efektivna stopa oko 17%.",
      "Ivana zarađuje 70.000 € — dio iznad 68.430 € oporezuje se sa 42% (Spitzensteuersatz).",
    ],
    warnings: [
      "Ne zaboravi da Vorauszahlungen moraju biti plaćene na vrijeme — kašnjenje rezultira Säumniszuschlag.",
      "Ako imaš i Gewerbe i zaposlenje (Nebenjob), profiti se ZBRAJAJU za Einkommensteuer — možeš završiti u višem razredu!",
      "Prikrivanje prihoda je porezna utaja (Steuerhinterziehung) — krivično djelo u Njemačkoj.",
    ],
    myths: [
      "MIT: 'Ako zarađujem ispod 12.084 €, ne moram podnositi poreznu prijavu.' — Zavisi. Finanzamt može zahtijevati prijavu čak i ispod Grundfreibetraga.",
      "MIT: 'Einkommensteuer je fiksna stopa.' — NETAČNO. Progresivne stope rastu s prihodom.",
    ],
    sources: [
      "EStG — Einkommensteuergesetz",
      "BMF — Einkommensteuer-Grundtabelle 2025/2026",
      "Bundesregierung — Grundfreibetrag Anpassung",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "porezne-obaveze-rokovi",
    title: "Porezne obaveze i rokovi",
    germanTerm: "Steuerliche Pflichten und Fristen",
    categoryId: "porezi",
    explanation: "Kao Gewerbetreibender imaš niz poreznih obaveza i rokova koje moraš poštovati. Nepoštivanje rokova rezultira automatskim penalima. Ključne obaveze uključuju: USt-Voranmeldung, Gewerbesteuer Vorauszahlung, Einkommensteuer Vorauszahlung, godišnje porezne prijave i vođenje evidencije.",
    rules: [
      "USt-Voranmeldung: mjesečno (prva 2 godine) ili kvartalno — rok do 10. u mjesecu za prethodni period.",
      "Dauerfristverlängerung: produženje roka za USt-Voranmeldung za 1 mjesec — zahtijeva depozit (1/11 prošlogodišnje USt).",
      "ESt-Vorauszahlung: kvartalno — 10.03., 10.06., 10.09., 10.12.",
      "GewSt-Vorauszahlung: kvartalno — 15.02., 15.05., 15.08., 15.11.",
      "Godišnje prijave (ESt, USt, GewSt): do 31.07. naredne godine (bez Steuerberatera) ili do 28.02. godine nakon toga (sa Steuerberaterom).",
      "Aufbewahrungspflicht: poslovnu dokumentaciju čuvaj 10 godina (računi, bankarski izvodi), pisma i ugovore 6 godina.",
      "Verspätungszuschlag: 0,25% poreza za svaki mjesec kašnjenja (min. 25 € mjesečno).",
    ],
    examples: [
      "Kalendar za Einzelunternehmer u prvoj godini: svaki mjesec USt-Voranmeldung, 4× godišnje ESt i GewSt avanse, godišnje prijave do 31.07.",
    ],
    warnings: [
      "Automatski penali: Finanzamt ne šalje podsjetnik — kašnjenje rezultira automatskim penalima.",
      "Neplaćeni avansi: Säumniszuschlag od 1% mjesečno na neplaćeni iznos.",
      "Steuerberater može produžiti rokove za godišnje prijave — investicija koja se isplati.",
    ],
    myths: [
      "MIT: 'Finanzamt šalje podsjetnik prije kazne.' — NETAČNO. Penali su automatski.",
      "MIT: 'Rokovi su fleksibilni.' — NETAČNO. Rokovi su zakonski i strogo se provode.",
    ],
    sources: [
      "AO — Abgabenordnung (rokovi i kazne)",
      "UStG § 18 — USt-Voranmeldung",
      "EStG § 37 — ESt Vorauszahlung",
      "GewStG § 19 — GewSt Vorauszahlung",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ FAKTURISANJE ═══
  {
    slug: "kako-izdati-racun",
    title: "Kako izdati pravilan račun",
    germanTerm: "Rechnungen richtig ausstellen",
    categoryId: "fakturisanje",
    explanation: "U Njemačkoj je svaki Gewerbetreibender dužan izdati račun (Rechnung) za svoje usluge ili proizvode drugom poslovnom subjektu (B2B), a na zahtjev i privatnim kupcima (B2C). Račun mora sadržavati zakonom propisane elemente prema § 14 UStG. Računi se mogu izdavati u papirnom ili elektronskom obliku. Od 2025. godine uvodi se obaveza e-Rechnung (elektronskog računa u strukturiranom formatu) za B2B transakcije u Njemačkoj, s faznim uvođenjem do 2028.",
    rules: [
      "Obaveza izdavanja računa: za B2B transakcije u roku od 6 mjeseci (§ 14 Abs. 2 UStG).",
      "Račun mora sadržavati sve obavezne elemente iz § 14 Abs. 4 UStG (vidjeti sljedeći vodič).",
      "Kleinbetragsrechnung (do 250 € brutto): smanjeni zahtjevi — nije potreban podatak o kupcu.",
      "Kleinunternehmer: mora na računu navesti napomenu o § 19 UStG ('Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.').",
      "Gutschrift (kreditna nota): kad kupac izdaje 'račun' u ime prodavca — mora biti jasno označena kao Gutschrift.",
      "E-Rechnung obaveza od 2025 (B2B): fazno uvođenje — od 2025 primanje obavezno, do 2027/2028 slanje.",
    ],
    examples: [
      "Izdaješ račun za web dizajn uslugu: 2.000 € netto + 380 € USt (19%) = 2.380 € brutto. Svi obavezni elementi moraju biti prisutni.",
      "Prodaš kafu na tržnici za 3,50 €: Kleinbetragsrechnung — dovoljno je ime, datum, opis, brutto iznos i porezna stopa.",
    ],
    warnings: [
      "Račun bez obaveznih elemenata: klijent NE može odbiti Vorsteuer — možeš izgubiti klijenta.",
      "Lažni ili netačni računi: porezna prijevara (Steuerhinterziehung) — krivično djelo!",
      "Ne zaboravi navesti § 19 napomenu ako si Kleinunternehmer — bez toga Finanzamt pretpostavlja da naplaćuješ USt.",
    ],
    myths: [
      "MIT: 'Račun na A4 papiru je jedini validan oblik.' — NETAČNO. Elektronski računi su potpuno validni.",
      "MIT: 'Mogu numerisati račune kako hoću.' — NETAČNO. Mora biti fortlaufende Nummer (neprekidan niz).",
    ],
    sources: [
      "UStG § 14 — Rechnungsstellung",
      "UStG § 14a — Pflichtangaben",
      "BMF — E-Rechnung Einführung 2025",
      "IHK.de — Pflichtangaben auf Rechnungen",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "obavezni-elementi-racuna",
    title: "Obavezni elementi na računu",
    germanTerm: "Pflichtangaben auf Rechnungen (§ 14 UStG)",
    categoryId: "fakturisanje",
    explanation: "Svaki račun (Rechnung) iznad 250 € brutto mora sadržavati sve obavezne elemente prema § 14 Abs. 4 UStG. Nedostajući elementi mogu rezultirati gubitkom prava na Vorsteuerabzug za kupca i problemima kod porezne kontrole za prodavca.",
    rules: [
      "1. Puno ime i adresa prodavca (Leistender)",
      "2. Puno ime i adresa kupca (Leistungsempfänger)",
      "3. Steuernummer ili USt-IdNr prodavca",
      "4. Datum izdavanja računa (Rechnungsdatum)",
      "5. Jedinstveni broj računa (fortlaufende Rechnungsnummer)",
      "6. Opis usluge/proizvoda (Menge und Art der Lieferung/Leistung)",
      "7. Datum isporuke ili period usluge (Liefer-/Leistungsdatum)",
      "8. Netto iznos, porezna stopa i iznos USt (Nettoentgelt, Steuersatz, Steuerbetrag)",
      "9. Brutto iznos (Gesamtbetrag)",
      "10. Eventualno: unaprijed dogovoreni popusti ili rabati",
      "11. Za Kleinunternehmer: napomena o § 19 UStG",
      "12. Za EU transakcije: napomena o Reverse-Charge postupku",
    ],
    examples: [
      "Ispravan račun: 'Rechnung Nr. 2026-042, Datum: 15.04.2026, Max Mustermann, Musterstraße 1, 10115 Berlin, StNr: 123/456/78901, an: Firma XY, Beschreibung: Webdesign April 2026, Netto: 2.000 €, USt 19%: 380 €, Brutto: 2.380 €, Leistungsdatum: April 2026'.",
    ],
    warnings: [
      "Nedostajući elementi = kupac ne može odbiti Vorsteuer. To može značiti gubitak klijenta!",
      "Račun bez Rechnungsnummer ili s dupliciranim brojevima: signal za Betriebsprüfung (poreznu reviziju).",
      "Steuernummer i USt-IdNr su dva različita broja — ne miješaj ih. Za domaće račune dovoljna je Steuernummer, za EU transakcije potrebna je USt-IdNr.",
    ],
    myths: [
      "MIT: 'Logo na računu je obavezan.' — NETAČNO. Logo je opcija, ali ne zakonski zahtjev.",
      "MIT: 'Datum isporuke može biti isti kao datum računa.' — Može, ali mora biti EKSPLICITNO navedeno, čak i kad je isti.",
    ],
    sources: [
      "UStG § 14 Abs. 4 — Pflichtangaben",
      "UStDV § 31–34 — Durchführungsbestimmungen",
      "IHK.de — Musterrechnung mit allen Pflichtangaben",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "knjigovodstvo-osnove",
    title: "Knjigovodstvo osnove",
    germanTerm: "Buchführung für Gewerbetreibende",
    categoryId: "fakturisanje",
    explanation: "Njemačko pravo razlikuje dva oblika knjigovodstva: einfache Buchführung (jednostavno — EÜR) i doppelte Buchführung (dvojno — Bilanz). Kleingewerbe i mali Gewerbetreibende obično koriste EÜR (Einnahmenüberschussrechnung), što je značajno jednostavnije. Obaveza dvojnog knjigovodstva nastaje kada se prekorače pragovi iz § 241a HGB (promet > 600.000 € ili profit > 60.000 € godišnje) ili ako si upisan u Handelsregister (e.K., GmbH, UG).",
    rules: [
      "EÜR (Einnahmenüberschussrechnung): dovoljna za Kleingewerbe, Freiberufler i Gewerbetreibende ispod HGB pragova. Princip: prihodi – rashodi = profit.",
      "Doppelte Buchführung (Bilanz): obavezna za e.K., GmbH, UG i Gewerbetreibende iznad pragova (promet > 600.000 € ili profit > 60.000 €).",
      "Belegpflicht: za svaku poslovnu transakciju mora postojati dokaz (Beleg) — račun, bankarski izvod, ugovor.",
      "Grundsatz: 'Keine Buchung ohne Beleg' — nema knjiženja bez dokaza.",
      "Digitalno knjigovodstvo je potpuno dozvoljeno — ali originalni dokumenti moraju biti čuvani ako su primljeni u papirnom obliku (GoBD).",
      "GoBD (Grundsätze ordnungsmäßiger Buchführung und Dokumentation): set pravila za digitalno i analogno vođenje poslovnih knjiga.",
    ],
    examples: [
      "Sanja vodi kafić kao Kleingewerbe: koristi EÜR — svaki mjesec unosi prihode i rashode u Excel ili Buchhaltungs-softver. Krajem godine predaje Anlage EÜR s poreznom prijavom.",
      "Amirova UG: obavezna dvojna bilanca — koristi softver (SevDesk, Lexoffice) ili angažuje Steuerberater.",
    ],
    warnings: [
      "Neuređeno knjigovodstvo kod porezne kontrole = kazne, Schätzung (procjena od Finanzamta) i eventualno krivična prijava.",
      "Bacanje originalnih računa = gubitak prava na Vorsteuerabzug i problemi kod Betriebsprüfung.",
      "GoBD krši čak i retroaktivno mijenjanje Excel tabela bez evidencije promjena — koristi specijalizirani softver!",
    ],
    myths: [
      "MIT: 'Za Kleingewerbe ne trebam voditi nikakvu evidenciju.' — NETAČNO. EÜR i čuvanje dokumenata su obavezni.",
      "MIT: 'Excel je dovoljan za knjigovodstvo.' — DJELIMIČNO. Za EÜR da, ali mora ispunjavati GoBD uslove (nepromjenjivost zapisa).",
    ],
    sources: [
      "HGB § 241a — pragovi za obavezu Bilanz",
      "EStG § 4 Abs. 3 — EÜR",
      "BMF — GoBD (Grundsätze ordnungsmäßiger Buchführung)",
      "AO § 147 — Aufbewahrungspflicht",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "cuvanje-dokumentacije",
    title: "Čuvanje računa i dokumentacije",
    germanTerm: "Aufbewahrungspflichten (§ 147 AO)",
    categoryId: "fakturisanje",
    explanation: "Njemački zakon propisuje stroge rokove za čuvanje poslovne dokumentacije. Kršenje ovih obaveza može rezultirati kaznama, gubitkom prava na porezne olakšice i problemima kod porezne kontrole. Rokovi počinju teći od kraja kalendarske godine u kojoj je dokument nastao.",
    rules: [
      "10 godina: računovodstvene knjige, inventare, otvorene bilanane, godišnje finansijske izvještaje, račune (ulazne i izlazne), bankarske izvode, blagajničke knjige.",
      "6 godina: poslovnu korespondenciju (pisma, emailovi s poslovnim sadržajem), ugovore, ponude.",
      "Rok počinje teći od 31.12. godine u kojoj je dokument nastao. Primjer: račun iz marta 2026 — rok čuvanja ističe 31.12.2036.",
      "Digitalno čuvanje je dozvoljeno pod GoBD uslovima: nepromjenjivost, čitljivost, pristupačnost.",
      "Finanzamt može zahtijevati uvid u dokumente tokom cijelog roka čuvanja.",
    ],
    examples: [
      "Račun iz januara 2026: moraš ga čuvati do 31.12.2036 (10 godina od kraja 2026).",
      "Email s poslovnim dogovorom iz maja 2026: čuvaj do 31.12.2032 (6 godina).",
    ],
    warnings: [
      "Uništavanje dokumenata prije roka = Ordnungswidrigkeit s mogućim kaznama.",
      "Digitalizovani dokumenti moraju biti čitljivi i neizmijenjeni — screenshot ili foto telefona može biti nedovoljan!",
      "Cloud čuvanje je ok ali mora biti pristupačno za Finanzamt na zahtjev.",
    ],
    myths: [
      "MIT: 'Poslije porezne prijave mogu baciti račune.' — NETAČNO. Rokovi čuvanja su nezavisni od porezne prijave.",
      "MIT: 'Dovoljno je skenirati dokumente.' — DJELIMIČNO. Mora ispunjavati GoBD — obični scan može biti dovoljan, ali originalni papirni dokumenti trebaju se čuvati ako ih zakon zahtijeva u originalu.",
    ],
    sources: [
      "AO § 147 — Aufbewahrungsfristen",
      "BMF — GoBD Regelungen",
      "HGB § 257 — Aufbewahrung von Unterlagen",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "poslovni-bankovni-racun",
    title: "Poslovni bankovni račun — da ili ne",
    germanTerm: "Geschäftskonto: Pflicht oder optional?",
    categoryId: "fakturisanje",
    explanation: "Za Einzelunternehmen i Kleingewerbe poslovni bankovni račun (Geschäftskonto) NIJE zakonski obavezan — možeš koristiti privatni račun za poslovanje. Međutim, za GmbH, UG i e.K. poseban poslovni račun je obavezan. Praktično, čak i za Kleingewerbe je preporučljivo imati odvojen račun radi preglednosti, lakšeg knjigovodstva i profesionalnog nastupa.",
    rules: [
      "Einzelunternehmen / Kleingewerbe: poslovni račun NIJE zakonski obavezan.",
      "GmbH, UG, e.K., GbR: poslovni račun je obavezan (odvojeno od privatnog).",
      "Mnoge banke zabranjuju poslovnu upotrebu privatnog računa u svojim uslovima korištenj— provjeri AGB!",
      "Poslovni računi imaju veće mjesečne naknade (5–30 €/mjesec) ali nude dodatne funkcije (podračuni, API, integracija s knjigovodstvenim softverom).",
      "Popularne opcije: N26 Business, Kontist, Qonto, Finom, Commerzbank, Sparkasse.",
    ],
    examples: [
      "Mirza ima Kleingewerbe — koristi privatni N26 račun ali u posebnom 'Space' odvaja poslovne transakcije. Funkcioniše, ali nije idealno za pregled.",
      "Lejlina UG: obavezno ima Geschäftskonto kod Qonto. Mjesečna naknada 9 €, ali automatski sync s Lexoffice knjigovodstvenim softverom.",
    ],
    warnings: [
      "Miješanje privatnih i poslovnih transakcija na jednom računu: noćna mora kod Betriebsprüfung (porezne kontrole).",
      "Neke banke će zatvoriti račun ako otkriju poslovnu upotrebu privatnog računa.",
      "PayPal Business račun NE zamjenjuje bankovni račun za poslovne svrhe.",
    ],
    myths: [
      "MIT: 'Svako ko ima Gewerbe mora imati Geschäftskonto.' — NETAČNO za Einzelunternehmen/Kleingewerbe.",
      "MIT: 'Geschäftskonto je skup.' — Postoje besplatne ili jeftine opcije (N26 Business, Kontist).",
    ],
    sources: [
      "HGB — obveza vođenja knjiga",
      "IHK.de — Geschäftskonto: Pflicht und Praxis",
      "Finanzamt — Aufzeichnungspflichten",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ OBAVEZE I OSIGURANJA ═══
  {
    slug: "ihk-hwk-obaveze",
    title: "IHK / HWK obaveze",
    germanTerm: "IHK- und HWK-Mitgliedschaft",
    categoryId: "obaveze",
    explanation: "Svaki Gewerbetreibender u Njemačkoj je zakonski obavezan član Industrie- und Handelskammer (IHK) ili Handwerkskammer (HWK), zavisno od vrste djelatnosti. IHK pokriva trgovinu, usluge, IT i ostale neindustrijske djelatnosti. HWK pokriva zanatske djelatnosti (Handwerk). Članstvo je obavezno po zakonu (IHKG), a članarina se plaća godišnje. IHK pruža savjetovanje, obuke, certifikate i zastupa interese privrednika.",
    rules: [
      "Članstvo u IHK je obavezno za sve Gewerbetreibende koji nisu u Handwerk sektoru.",
      "Članstvo u HWK je obavezno za zanatske djelatnosti (Handwerk).",
      "IHK članarina: zavisi od profita i prometa. Erste 2 godine: često oslobođenje ili minimalna članarina za Existenzgründer.",
      "Kleingewerbe s profitom ispod cca 5.200 € godišnje: obično oslobođen IHK članarine (0 €).",
      "IHK službe: besplatno savjetovanje za Gründer, informacije o propisima, certifikati (npr. Ausbildungsberechtigung).",
      "Doppelmitgliedschaft: ako obavljaš i Handwerk i ne-Handwerk djelatnost, možeš biti član obje komore.",
    ],
    examples: [
      "Online shop: član IHK. Prva godina, profit 8.000 €: IHK članarina oko 50 € godišnje.",
      "Vodoinstalater: član HWK. Članarina zavisi od prometa — obično 100–500 € godišnje.",
    ],
    warnings: [
      "IHK/HWK članarina je obavezna — neplaćanje rezultira opomenom i eventualnim prisilnim naplatom.",
      "Ne ignoriši IHK pisma — sadrže važne informacije o propisima koji utiču na tvoju djelatnost.",
    ],
    myths: [
      "MIT: 'IHK članstvo je dobrovoljno.' — NETAČNO. Zakonski obavezno za sve Gewerbetreibende (IHKG).",
      "MIT: 'IHK ne nudi ništa korisno.' — NETAČNO. Besplatno savjetovanje, Gründerberatung i informacije o propisima.",
    ],
    sources: [
      "IHKG — Gesetz zur vorläufigen Regelung des Rechts der IHK",
      "HwO — Handwerksordnung",
      "IHK.de — Mitgliedschaft und Beiträge",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "obavezna-osiguranja",
    title: "Obavezna osiguranja",
    germanTerm: "Pflichtversicherungen für Selbständige",
    categoryId: "obaveze",
    explanation: "Za samozaposlene u Njemačkoj postoji niz obaveznih i preporučljivih osiguranja. Za razliku od zaposlenih, samozaposleni moraju sami organizovati i platiti svoja osiguranja. Zdravstveno osiguranje je obavezno za sve. Penzijsko osiguranje je obavezno samo za neke djelatnosti. Berufsgenossenschaft (profesionalno osiguranje od nesreća) je obavezno za sve Gewerbetreibende.",
    rules: [
      "Krankenversicherung (zdravstveno): OBAVEZNO za sve. Opcije: gesetzliche KV (GKV) ili private KV (PKV). Samozaposleni plaćaju puni doprinos sami (nema podjele s poslodavcem).",
      "GKV za samozaposlene: minimalni mjesečni doprinos oko 200 € (s niskim prihodom), do maksimalno oko 1.050 € mjesečno (2025/2026).",
      "Berufsgenossenschaft (BG): OBAVEZNO za sve Gewerbetreibende — osiguranje od nesreća na radu. Doprinos zavisi od djelatnosti i prihoda.",
      "Rentenversicherung (penzijsko): obavezno samo za određene djelatnosti (Handwerker, Lehrer, Künstler/Publicist kroz KSK, Hebammen itd.). Za ostale samozaposlene: dobrovoljno ali preporučljivo.",
      "Berufshaftpflichtversicherung: obavezna za neke profesije (Architekten, Ärzte, Steuerberater), preporučljiva za sve.",
      "Betriebshaftpflichtversicherung: preporučljiva za sve — pokriva štete trećim stranama nastale u poslovanju.",
    ],
    examples: [
      "Emir otvara Kleingewerbe: obavezni troškovi — GKV ~250 €/mjesec + BG ~100 €/god = minimum oko 3.100 € godišnje samo za obavezna osiguranja.",
      "Ivana je samozaposlena arhitektica: obavezna Berufshaftpflicht (oko 500–1.500 €/god), plus zdravstveno i BG.",
    ],
    warnings: [
      "Bez zdravstvenog osiguranja: zakonski prekršaj! Moraš biti osiguran u svakom trenutku.",
      "Prelazak iz GKV u PKV je lak, ali povratak u GKV je izuzetno težak — dobro razmisli!",
      "BG članstvo je obavezno čak i ako nemaš zaposlene — ne ignoriši pisma od Berufsgenossenschaft.",
    ],
    myths: [
      "MIT: 'Samozaposleni ne moraju imati zdravstveno osiguranje.' — NETAČNO. Obavezno za sve u Njemačkoj.",
      "MIT: 'PKV je uvijek jeftinija za samozaposlene.' — NETAČNO. PKV je jeftinija za mlade, zdrave osobe bez djece. S godinama i porodicom, GKV je često povoljnija.",
      "MIT: 'Penzijsko osiguranje me se ne tiče.' — RIZIČNO. Bez penzijskog osiguranja, stariš bez prihoda. Barem privatna štednja je neophodna.",
    ],
    sources: [
      "SGB V — gesetzliche Krankenversicherung",
      "SGB VII — Berufsgenossenschaft",
      "SGB VI — Rentenversicherung",
      "Deutsche Rentenversicherung — Versicherungspflicht für Selbständige",
      "IHK.de — Sozialversicherung für Gründer",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ POSEBNE SITUACIJE ═══
  {
    slug: "gewerbe-uz-posao",
    title: "Gewerbe uz stalni posao",
    germanTerm: "Nebengewerbe neben Hauptbeschäftigung",
    categoryId: "posebne-situacije",
    explanation: "Otvaranje Gewerbea uz stalni posao (Nebengewerbe / Nebentätigkeit) je u Njemačkoj potpuno legalno i vrlo uobičajeno. Međutim, postoje pravne, porezne i ugovorne obaveze koje moraš poštovati. Tvoj ugovor o radu (Arbeitsvertrag) može sadržavati klauzulu o sporednim djelatnostima (Nebentätigkeitsklausel) koja zahtijeva obavještavanje ili odobrenje poslodavca. Porezno, prihodi iz Gewerbea se zbrajaju s platom za Einkommensteuer.",
    rules: [
      "Zakonski: svako ima pravo na sporednu djelatnost (Grundgesetz Art. 12). Poslodavac ne može zabraniti Nebentätigkeit, ali može zahtijevati obavještavanje.",
      "Ugovor o radu: provjeri Nebentätigkeitsklausel — mnogi ugovori zahtijevaju pisanu obavijest ili odobrenje poslodavca.",
      "Zabrana konkurencije: Nebentätigkeit ne smije konkurirati tvom poslodavcu (Wettbewerbsverbot).",
      "Radno vrijeme: ukupno radno vrijeme (posao + Gewerbe) ne smije prelaziti zakonski limit od 48h sedmično (ArbZG § 3).",
      "Porez: prihodi iz Gewerbea zbrajaju se s platom za Einkommensteuer. Obavezna godišnja porezna prijava.",
      "Sozialversicherung: dok je Hauptberuf tvoja primarna zaposlenja i Gewerbe je sporedni, nema dodatnih socijalnih doprinosa na Gewerbe prihode. Ali pažnja: ako Gewerbe postane 'hauptberuflich', moraš sam plaćati socijalne doprinose.",
      "Krankenversicherung: obavijesti svoju Krankenkasse o Nebentätigkeit!",
    ],
    examples: [
      "Damir radi 40h sedmično kao inženjer, a vikendom popravlja kompjutere kao Kleingewerbe. Obavijestio je poslodavca, ne konkurira mu, radi max 8h sedmično dodatno — sve je legalno.",
      "Anela radi kao medicinska sestra i ima online shop. Zarađuje 500 €/mjesec iz shopa. Porezno: plata + 6.000 € Gewerbe profit = viši porezni razred.",
    ],
    warnings: [
      "Neobavještavanje poslodavca o Nebentätigkeit može biti razlog za Abmahnung ili otkaz!",
      "Konkurentska djelatnost bez odobrenja = teška povreda ugovora o radu.",
      "Ako Gewerbe zarađuje više od tvoje plate ili troši više od 18-20h sedmično, Krankenkasse te može reklasificirati kao 'hauptberuflich selbständig' — onda sam plaćaš puni KV doprinos!",
    ],
    myths: [
      "MIT: 'Poslodavac može zabraniti Nebentätigkeit.' — NETAČNO generalno. Može zahtijevati obavijest i zabraniti samo konkurentsku djelatnost.",
      "MIT: 'Nebengewerbe ne plaća porez.' — NETAČNO. Prihodi se oporezuju kao i svaki drugi dohodak.",
      "MIT: 'Ne moram obavijestiti Krankenkasse.' — NETAČNO i može imati ozbiljne posljedice.",
    ],
    sources: [
      "GG Art. 12 — sloboda zanimanja",
      "ArbZG § 3 — maksimalno radno vrijeme",
      "EStG § 15 — prihodi iz Gewerbea",
      "SGB V § 5 — Krankenversicherungspflicht",
      "IHK.de — Nebengewerbe neben Hauptberuf",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "gewerbe-uz-buergergeld",
    title: "Gewerbe uz Bürgergeld / socijalnu pomoć",
    germanTerm: "Selbständigkeit und Bürgergeld (SGB II)",
    categoryId: "posebne-situacije",
    explanation: "U Njemačkoj je moguće voditi Gewerbe dok primaš Bürgergeld (ranije Hartz IV). Prihodi iz Gewerbea se umanjuju od Bürgergeld-a prema pravilima o odbicima (Freibeträge). Jobcenter može čak i podržati tvoje samozaposlenje kroz Einstiegsgeld ili druge mjere. Međutim, postoje stroga pravila o prijavljivanju prihoda i obaveze prema Jobcenteru.",
    rules: [
      "Samozaposlenje uz Bürgergeld je DOZVOLJENO — ne moraš zatvoriti Gewerbe da bi primao Bürgergeld.",
      "Prihodi iz Gewerbea se prijavljuju Jobcenteru i umanjuju Bürgergeld prema pravilima: Grundfreibetrag 100 €/mjesec, zatim 20% odbici na prihod od 100–520 €, 10% na 520–1.000 €.",
      "Profit (ne promet!) je relevantan za umanjenje — poslovne rashode možeš odbiti.",
      "Jobcenter može zahtijevati dokaz o profitabilnosti — ako Gewerbe dugoročno ne donosi dovoljan prihod, mogu zahtijevati zatvaranje.",
      "Einstiegsgeld (§ 16b SGB II): dodatak za podršku pokretanju samozaposlenja — traži ga od Jobcentera!",
      "Obaveze prema Jobcenteru ostaju: prijavljivanje, raspoloživost za posao (osim ako si oslobođen), mjere integracije.",
    ],
    examples: [
      "Senad prima Bürgergeld od 563 € i zarađuje 300 € mjesečno iz Gewerbea. Freibetrag: 100 € + 20% od 200 € (=40 €) = 140 € ostaje Senadu. 160 € se odbija od Bürgergeld-a. Prima: 563 – 160 = 403 € Bürgergeld + 300 € Gewerbe = 703 € ukupno.",
    ],
    warnings: [
      "Neprijavljivanje prihoda Jobcenteru = povreda obaveze koja može rezultirati sankcijama (umanjenje Bürgergeld-a)!",
      "Jobcenter može zahtijevati detaljnu evidenciju prihoda i rashoda — vodi uredne knjige.",
      "Ako se Gewerbe 'navodno' ne isplati ali zapravo zarađuješ: to je prevara socijalnog sistema — krivično djelo!",
    ],
    myths: [
      "MIT: 'Ne mogu imati Gewerbe dok primam Bürgergeld.' — NETAČNO. Potpuno je dozvoljeno.",
      "MIT: 'Sav prihod iz Gewerbea se odbija od Bürgergeld-a.' — NETAČNO. Postoje Freibeträge.",
      "MIT: 'Jobcenter će me tjerati da zatvorim Gewerbe.' — Obično ne, ali može zahtijevati ako Gewerbe dugoročno nije profitabilan.",
    ],
    sources: [
      "SGB II § 11 — Einkommensanrechnung",
      "SGB II § 11b — Freibeträge bei Erwerbseinkommen",
      "SGB II § 16b — Einstiegsgeld",
      "Bundesagentur für Arbeit — Selbständigkeit und Bürgergeld",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ GREŠKE I ZATVARANJE ═══
  {
    slug: "tipicne-greske",
    title: "Tipične greške novih poduzetnika",
    germanTerm: "Typische Fehler von Existenzgründern",
    categoryId: "greske-zatvaranje",
    explanation: "Mnogi novi poduzetnici u Njemačkoj prave slične greške koje mogu imati ozbiljne finansijske i pravne posljedice. Evo najčešćih grešaka i kako ih izbjeći.",
    rules: [
      "Greška 1: Neizdavanje ili nepravilno izdavanje računa — nedostajući elementi na računu, nepostojeća numeracija.",
      "Greška 2: Neredovno vođenje knjigovodstva — gomilanje računa i knjiženje tek pred poreznu prijavu.",
      "Greška 3: Miješanje privatnih i poslovnih finansija — korištenje jednog računa za sve.",
      "Greška 4: Zaboravljanje poreznih avansi (Vorauszahlungen) — rezultira penalima.",
      "Greška 5: Pogrešna procjena u Fragebogenu — previsoke ili preniske procjene.",
      "Greška 6: Ignorisanje IHK/HWK i Berufsgenossenschaft pisama.",
      "Greška 7: Neobavještavanje Ausländerbehörde (za treće zemlje) — može rezultirati gubitkom boravišnog statusa.",
      "Greška 8: Neadekvatno osiguranje — rad bez Haftpflichtversicherung.",
      "Greška 9: Pogrešan izbor pravnog oblika — npr. GbR bez razumijevanja solidarne odgovornosti.",
      "Greška 10: Neplaćanje Gewerbesteuer — zaboravljanje da ovaj porez postoji iznad 24.500 € profita.",
    ],
    examples: [
      "Ahmed je 2 godine vodio Gewerbe bez urednog knjigovodstva. Pri Betriebsprüfung, Finanzamt je napravio Schätzung: 15.000 € dodatnog poreza + kaznene kamate.",
      "Milica iz Srbije otvorila Gewerbe bez provjere boravišne dozvole — Ausländerbehörde joj je dala rok za odjavu Gewerbea ili prijeti opoziv dozvole.",
    ],
    warnings: [
      "Mnoge greške su NEPOVRATNE — jednom napravljena Schätzung od Finanzamta teško se osporava bez dokumenata.",
      "Kaznene kamate se kumuliraju — mali propust može postati veliki finansijski problem.",
      "Konsultiraj Steuerberater u prvoj godini — investicija koja sprečava skupe greške.",
    ],
    myths: [
      "MIT: 'Finanzamt oprašta greške novim poduzetnicima.' — NETAČNO. Penali su automatski i bez izuzetaka.",
      "MIT: 'Mogu sve sam/sama bez savjetnika.' — RIZIČNO. Steuerberater se isplati, posebno u prvoj godini.",
    ],
    sources: [
      "IHK.de — Häufige Fehler bei der Existenzgründung",
      "BMWK — Existenzgründungsportal: Fehler vermeiden",
      "Steuerberaterverband — Tipps für Gründer",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "kako-odjaviti-gewerbe",
    title: "Kako odjaviti Gewerbe",
    germanTerm: "Gewerbeabmeldung (GewA 3)",
    categoryId: "greske-zatvaranje",
    explanation: "Ako želiš zatvoriti svoj Gewerbe, moraš ga odjaviti kod Gewerbeamta koristeći obrazac GewA 3 (Gewerbeabmeldung). Odjava je obavezna i mora se izvršiti u razumnom roku nakon prestanka djelatnosti. Gewerbeamt zatim obavještava Finanzamt, IHK/HWK i Berufsgenossenschaft. Moraš još ispuniti konačnu poreznu prijavu (Steuererklärung) za period poslovanja.",
    rules: [
      "Obrazac GewA 3 predaješ na Gewerbeamtu — lično, poštom ili online.",
      "Naknada: obično besplatno ili do 20 €.",
      "Gewerbeamt automatski obavještava: Finanzamt, IHK/HWK, BG, statistički ured.",
      "Obaveza: konačna USt-Voranmeldung, konačna godišnja porezna prijava (ESt, USt, GewSt).",
      "Aufbewahrungspflicht: dokumenti moraju biti čuvani 6–10 godina NAKON odjave!",
      "Ako si GmbH/UG: odjava Gewerbea je samo dio procesa — potrebna je i Liquidation i brisanje iz Handelsregistra.",
    ],
    examples: [
      "Sanja zatvara svoj kafić 30. juna 2026. Popunjava GewA 3, predaje Gewerbeamtu. Podnosi konačne porezne prijave za januar–juni 2026. Čuva dokumente do 2036.",
    ],
    warnings: [
      "Neodjavljeni Gewerbe: nastaviš plaćati IHK članarinu i eventualno Gewerbesteuer!",
      "Konačna porezna prijava mora biti podnijeta — inače Finanzamt pravi Schätzung.",
      "Ne bacaj dokumente nakon odjave — Aufbewahrungspflicht teče od kraja godine odjave!",
    ],
    myths: [
      "MIT: 'Ako ne radim ništa, Gewerbe se automatski zatvara.' — NETAČNO. Moraš ga aktivno odjaviti.",
      "MIT: 'Nakon odjave nemam nikakve obaveze.' — NETAČNO. Konačna porezna prijava + čuvanje dokumenata.",
    ],
    sources: [
      "GewO § 14 — Gewerbeabmeldung",
      "AO § 147 — Aufbewahrungspflicht",
      "IHK.de — Gewerbeabmeldung: Was Sie beachten müssen",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "promjena-podataka",
    title: "Promjena podataka / djelatnosti",
    germanTerm: "Gewerbeummeldung (GewA 2)",
    categoryId: "greske-zatvaranje",
    explanation: "Ako se promijene bitni podaci tvog Gewerbea — adresa, vrsta djelatnosti, pravni oblik — moraš izvršiti Gewerbeummeldung (obrazac GewA 2) kod Gewerbeamta. Ovo nije nova prijava, već ažuriranje postojeće. Promjena se mora prijaviti u razumnom roku (obično 1-4 sedmice).",
    rules: [
      "Promjene koje zahtijevaju Gewerbeummeldung: promjena adrese (unutar iste općine), promjena ili proširenje djelatnosti, promjena pravnog oblika.",
      "Promjena općine: potrebna je Gewerbeabmeldung u staroj i Gewerbeanmeldung u novoj općini.",
      "Obrazac GewA 2: predaje se na Gewerbeamtu. Naknada: obično 10–30 €.",
      "Promjena djelatnosti može uticati na IHK/HWK klasifikaciju i Berufsgenossenschaft.",
      "Finanzamt se automatski obavještava — ali provjeri da li treba ažurirati i Fragebogen.",
    ],
    examples: [
      "Mirza seli svoj ured iz Kreuzberga u Charlottenburg (oboje Berlin): Gewerbeummeldung (GewA 2) kod Gewerbeamta.",
      "Sanja proširuje djelatnost kafića na catering: Gewerbeummeldung s novim opisom djelatnosti.",
    ],
    warnings: [
      "Neprijavljene promjene mogu rezultirati novčanom kaznom (Ordnungswidrigkeit).",
      "Promjena djelatnosti bez Ummeldung: možeš izgubiti osiguranje kod BG jer si registriran za drugu djelatnost.",
    ],
    myths: [
      "MIT: 'Male promjene ne trebam prijaviti.' — NETAČNO. Svaka bitna promjena mora biti prijavljena.",
      "MIT: 'Ummeldung je komplikovan proces.' — NETAČNO. Jednostavan obrazac, obično gotovo za 15 minuta.",
    ],
    sources: [
      "GewO § 14 — Ummeldung",
      "IHK.de — Gewerbeummeldung",
    ],
    lastUpdated: "April 2026",
  },
  {
    slug: "pauziranje-poslovanja",
    title: "Pauziranje poslovanja",
    germanTerm: "Gewerbe ruhen lassen",
    categoryId: "greske-zatvaranje",
    explanation: "Formalno, njemačko pravo NE poznaje koncept 'pauziranja' Gewerbea. Gewerbe je ili prijavljen ili odjavljen — nema sredine. Međutim, u praksi možeš svoj Gewerbe 'staviti na pauzu' tako da jednostavno ne obavljaš djelatnost i ne ostvaruješ prihode. Gewerbe ostaje formalno aktivan, ali nemaš obavezu generisanja prihoda. Obaveze koje OSTAJU: IHK članarina (ali može biti minimalna ili 0 € bez prihoda), porezne prijave (sa 0 € prihoda), BG članstvo.",
    rules: [
      "Formalno pauziranje NE POSTOJI u njemačkom pravu — Gewerbe je aktivan ili odjavljen.",
      "Praktično pauziranje: ne obavljaš djelatnost, prijaviš 0 € prihoda u poreznim prijavama.",
      "IHK članarina: može biti snižena ili 0 € za godine bez prihoda.",
      "Porezne obaveze: USt-Voranmeldung i godišnje prijave I DALJE se moraju podnositi (sa 0 €).",
      "BG članstvo ostaje aktivno — ali doprinos može biti minimalan.",
      "Ako 'pauza' traje dugo, Finanzamt može preispitati 'Gewinnerzielungsabsicht' (namjeru zarade) i tretirati troškove kao Liebhaberei (hobijsku aktivnost).",
    ],
    examples: [
      "Emir ide na porodiljsko odsustvo (Elternzeit) i pauzira IT konsalting Gewerbe na 12 mjeseci. Gewerbe ostaje aktivan, podnosi prazne prijave, IHK plaća minimum.",
    ],
    warnings: [
      "Duga pauza (više od 2-3 godine bez prihoda): Finanzamt može klasificirati djelatnost kao Liebhaberei i odbiti retroaktivno sve ranije gubitke.",
      "Troškovi tokom pauze (IHK, BG, Steuerberater) se i dalje akumuliraju.",
      "Ako ne planirate nastaviti u razumnom roku, odjava je bolja opcija — možeš uvijek ponovo prijaviti Gewerbe.",
    ],
    myths: [
      "MIT: 'Mogu Gewerbe staviti na pauzu kod Gewerbeamta.' — NETAČNO. Nema formalnog postupka pauziranja.",
      "MIT: 'Tokom pauze nemam nikakve obaveze.' — NETAČNO. Porezne prijave i IHK/BG obaveze ostaju.",
    ],
    sources: [
      "GewO § 14 — Gewerbeanmeldung / Abmeldung",
      "EStG § 15 — Gewinnerzielungsabsicht / Liebhaberei",
      "IHK.de — Gewerbe ruhen lassen",
    ],
    lastUpdated: "April 2026",
  },

  // ═══ FAQ ═══
  {
    slug: "faq-gewerbe",
    title: "Najčešća pitanja o Gewerbe-u",
    germanTerm: "Häufig gestellte Fragen zum Gewerbe",
    categoryId: "faq",
    explanation: "Ovdje su odgovori na najčešća pitanja koja balkanski korisnici postavljaju o Gewerbe-u u Njemačkoj. Svaki odgovor je baziran na aktuelnom zakonodavstvu za 2025/2026.",
    rules: [
      "P: Koliko košta otvaranje Gewerbea? — O: 15–65 € za Gewerbeanmeldung, zavisno od grada.",
      "P: Koliko dugo traje otvaranje? — O: Sam postupak: 15–30 minuta. Gewerbeschein: istog dana do max 2 sedmice.",
      "P: Mogu li otvoriti Gewerbe na kućnu adresu? — O: Da, osim ako najamni ugovor to zabranjuje.",
      "P: Trebam li poslovni plan za Gewerbeamt? — O: Ne za Gewerbeanmeldung. Da za § 21 AufenthG (treće zemlje) i za bankovne kredite.",
      "P: Mogu li imati više Gewerbea? — O: Možeš prijaviti više djelatnosti na jednom Gewerbeschein. Za potpuno odvojene djelatnosti, možeš prijaviti više Gewerbea.",
      "P: Trebam li Steuerberater? — O: Zakonski ne, ali praktično izuzetno preporučljivo, posebno u prvoj godini.",
      "P: Mogu li otvoriti Gewerbe bez njemačkog državljanstva? — O: Da, ali uslovi zavise od državljanstva (EU vs. treće zemlje).",
      "P: Šta je Steuernummer? — O: Porezni identifikacijski broj koji dobijaš od Finanzamta nakon prijave Gewerbea. Potreban za izdavanje računa.",
      "P: Šta je USt-IdNr? — O: Umsatzsteuer-Identifikationsnummer — EU porezni broj za međunarodne B2B transakcije. Traži ga od Bundeszentralamt für Steuern (BZSt).",
      "P: Koliko poreza plaćam? — O: Zavisi od profita: Einkommensteuer (0–45%), eventualno Gewerbesteuer (iznad 24.500 € freibetraga), eventualno Umsatzsteuer (19%/7% ako nisi Kleinunternehmer).",
    ],
    examples: [
      "Ahmed iz BiH: 'Imam Aufenthaltserlaubnis po Westbalkan-Regelung, mogu li otvoriti Gewerbe?' — Odgovor: Westbalkan-Regelung pokriva SAMO zaposlenje kod poslodavca. Za Gewerbe trebaš posebnu dozvolu po § 21 AufenthG od Ausländerbehörde.",
      "Ivana iz Hrvatske: 'Trebam li neku dozvolu za Gewerbe?' — Odgovor: Ne. Kao EU građanka imaš slobodu poslovnog nastana. Samo prijavi Gewerbe kod Gewerbeamta.",
    ],
    warnings: [
      "Za specifične situacije uvijek konsultiraj Steuerberater ili advokata — opći odgovori ne pokrivaju sve slučajeve.",
      "Zakonodavstvo se može promijeniti — provjeri aktuelne propise na zvaničnim izvorima.",
    ],
    myths: [
      "MIT: 'Sve odgovore na pitanja o Gewerbeu mogu naći na forumima.' — OPASNO. Forumi često sadrže zastarjele ili netačne informacije. Koristi zvanične izvore.",
    ],
    sources: [
      "GewO — Gewerbeordnung",
      "EStG — Einkommensteuergesetz",
      "UStG — Umsatzsteuergesetz",
      "AufenthG — Aufenthaltsgesetz",
      "IHK.de, BMWK, Make it in Germany — zvanični portali",
    ],
    lastUpdated: "April 2026",
  },
];

export function getBiznisGuidesByCategory(categoryId: string): BiznisGuide[] {
  return BIZNIS_GUIDES.filter((g) => g.categoryId === categoryId);
}

export function getBiznisGuideBySlug(slug: string): BiznisGuide | undefined {
  return BIZNIS_GUIDES.find((g) => g.slug === slug);
}
