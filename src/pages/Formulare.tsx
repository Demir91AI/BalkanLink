import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, ChevronDown, ExternalLink, Download, CheckCircle2,
  Building2, Baby, Heart, Stethoscope, XCircle, Landmark, Crown, Lock,
  Receipt, Banknote, Briefcase, Home, Car, CreditCard, Users, Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
// Premium system hidden — everything free
import LegalDisclaimer from "@/components/LegalDisclaimer";

type LangKey = "de" | "bs" | "en" | "sq" | "mk";
type L9 = Record<LangKey, string>;
type L9Arr = Record<LangKey, string[]>;

function getLk(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  if (lang === "sq" || lang === "xk") return "sq";
  if (lang === "mk") return "mk";
  return "bs"; // bs, hr, sr, me
}

/* ── Category data ── */
interface GuideCategory {
  id: string;
  icon: typeof FileText;
  title: L9;
  description: L9;
  documents: L9Arr;
  steps: L9Arr;
  officialLink: string;
  officialLinkLabel: string;
  noOnlineForm?: boolean;
  templateLink?: string;
}

const categories: GuideCategory[] = [
  {
    id: "anmeldung",
    icon: Building2,
    title: { de: "Anmeldung & Ummeldung", bs: "Prijava i odjava prebivališta", en: "Registration & Re-registration", sq: "Regjistrimi & Ndryshimi i adresës", mk: "Пријава и одјава на живеалиште" },
    description: {
      de: "Innerhalb von 14 Tagen nach dem Einzug müssen Sie sich beim Einwohnermeldeamt anmelden. Bei Umzug innerhalb der Stadt ist eine Ummeldung nötig.",
      bs: "U roku od 14 dana od useljenja morate se prijaviti u nadležnom uredu. Kod preseljenja unutar grada potrebna je odjava/prijava.",
      en: "You must register at the residents' office within 14 days of moving in. Moving within the city requires re-registration.",
      sq: "Brenda 14 ditëve pas shpërnguljes duhet të regjistroheni në zyrën e banorëve. Për lëvizje brenda qytetit nevojitet ndryshim adrese.",
      mk: "Во рок од 14 дена по вселување мора да се пријавите во надлежниот уред. При селење во рамки на градот потребна е одјава/пријава.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Wohnungsgeberbestätigung", "Mietvertrag (empfohlen)", "Ggf. Heirats-/Geburtsurkunde"],
      bs: ["Lična karta / pasoš", "Potvrda stanodavca (Wohnungsgeberbestätigung)", "Ugovor o najmu (preporučeno)", "Eventualno vjenčani list / rodni list"],
      en: ["ID / Passport", "Landlord confirmation", "Rental contract (recommended)", "Marriage/birth certificate if applicable"],
      sq: ["Letërnjoftim / Pasaportë", "Konfirmimi i pronarit (Wohnungsgeberbestätigung)", "Kontratë qiraje (e rekomanduar)", "Certifikatë martese/lindjeje nëse ka"],
      mk: ["Лична карта / пасош", "Потврда од станодавец (Wohnungsgeberbestätigung)", "Договор за наем (препорачано)", "Евентуално венчаница / извод на родени"],
    },
    steps: {
      de: [
        "Termin beim Bürgeramt online buchen (z.B. über service.berlin.de oder lokale Webseite).",
        "Wohnungsgeberbestätigung vom Vermieter ausfüllen lassen.",
        "Alle Dokumente (Ausweis, Bestätigung, ggf. Mietvertrag) mitbringen.",
        "Vor Ort das Anmeldeformular ausfüllen und abgeben.",
        "Meldebescheinigung sofort mitnehmen — für Bankkonto, Steuer-ID etc. nötig.",
      ],
      bs: [
        "Rezervišite termin online kod nadležnog ureda (Bürgeramt).",
        "Neka vam stanodavac popuni potvrdu (Wohnungsgeberbestätigung).",
        "Ponesete sve dokumente: pasoš, potvrdu, ugovor o najmu.",
        "Na licu mjesta popunite formular za prijavu.",
        "Odmah preuzmite potvrdu o prijavi — treba vam za banku, porezni ID itd.",
      ],
      en: [
        "Book an appointment online at the local citizens' office.",
        "Have your landlord fill out the housing confirmation.",
        "Bring all documents: ID, confirmation, rental contract.",
        "Fill out the registration form on-site.",
        "Take the registration certificate — needed for bank, tax ID, etc.",
      ],
      sq: [
        "Rezervoni një takim online në zyrën e qytetarëve (Bürgeramt).",
        "Plotësoni konfirmimin e pronarit (Wohnungsgeberbestätigung).",
        "Sillni të gjitha dokumentet: pasaportë, konfirmim, kontratë qiraje.",
        "Plotësoni formularin e regjistrimit në vend.",
        "Merrni certifikatën e regjistrimit — nevojitet për bankë, ID tatimor etj.",
      ],
      mk: [
        "Резервирајте термин онлајн во надлежниот уред (Bürgeramt).",
        "Нека станодавецот ви ја пополни потврдата (Wohnungsgeberbestätigung).",
        "Понесете ги сите документи: пасош, потврда, договор за наем.",
        "На лице место пополнете го формуларот за пријава.",
        "Веднаш преземете ја потврдата за пријава — ви треба за банка, даночен ID итн.",
      ],
    },
    officialLink: "https://service.berlin.de/dienstleistung/120686/",
    officialLinkLabel: "Bürgeramt Online-Termin",
  },
  {
    id: "kindergeld",
    icon: Baby,
    title: { de: "Kindergeld beantragen", bs: "Zahtjev za Kindergeld", en: "Apply for Child Benefit", sq: "Aplikimi për Kindergeld", mk: "Барање за Kindergeld" },
    description: {
      de: "Kindergeld wird für jedes Kind bis 18 Jahre gezahlt (bis 25 bei Ausbildung). Der Antrag wird bei der Familienkasse gestellt.",
      bs: "Kindergeld se isplaćuje za svako dijete do 18. godine (do 25. uz školovanje). Zahtjev se podnosi kod Familienkasse.",
      en: "Child benefit is paid for every child under 18 (up to 25 if in education). Apply at the Family Benefits Office.",
      sq: "Kindergeld paguhet për çdo fëmijë deri në 18 vjeç (deri në 25 nëse vazhdon shkollimin). Aplikimi bëhet në Familienkasse.",
      mk: "Kindergeld се исплаќа за секое дете до 18 години (до 25 со школување). Барањето се поднесува кај Familienkasse.",
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Steuer-ID (Elternteil + Kind)", "Meldebescheinigung", "Aufenthaltstitel (Nicht-EU)", "Ggf. Schulbescheinigung (ab 18)"],
      bs: ["Rodni list djeteta", "Porezni ID (roditelj + dijete)", "Potvrda o prijavi", "Boravišna dozvola (ne-EU)", "Potvrda škole (od 18. godine)"],
      en: ["Child's birth certificate", "Tax ID (parent + child)", "Registration certificate", "Residence permit (non-EU)", "School certificate (from 18)"],
      sq: ["Certifikata e lindjes së fëmijës", "ID tatimor (prindi + fëmija)", "Certifikata e regjistrimit", "Leja e qëndrimit (jo-BE)", "Certifikatë shkollore (nga 18)"],
      mk: ["Извод на родени на детето", "Даночен ID (родител + дете)", "Потврда за пријава", "Дозвола за престој (не-ЕУ)", "Потврда од училиште (од 18 год.)"],
    },
    steps: {
      de: [
        "Formular KG1 (Hauptantrag) und Anlage Kind (KG1-AnlKi) herunterladen.",
        "Persönliche Daten, Steuer-ID und Bankverbindung eintragen.",
        "Für jedes Kind eine separate Anlage Kind ausfüllen.",
        "Alle Nachweise (Geburtsurkunde, Meldebescheinigung) beifügen.",
        "An die zuständige Familienkasse senden — online oder per Post.",
        "Bearbeitungszeit: ca. 4–6 Wochen. Nachzahlung ab Geburt möglich.",
      ],
      bs: [
        "Preuzmite formular KG1 i prilog za dijete (KG1-AnlKi).",
        "Unesite lične podatke, porezni ID i podatke o bankovnom računu.",
        "Za svako dijete popunite poseban prilog.",
        "Priložite dokaze (rodni list, potvrda o prijavi).",
        "Pošaljite nadležnoj Familienkasse — online ili poštom.",
        "Obrada traje 4–6 sedmica. Moguća retroaktivna isplata od rođenja.",
      ],
      en: [
        "Download form KG1 and child attachment (KG1-AnlKi).",
        "Enter personal data, tax ID, and bank details.",
        "Fill out a separate attachment for each child.",
        "Attach proof (birth certificate, registration).",
        "Send to the responsible Family Benefits Office — online or by post.",
        "Processing: approx. 4–6 weeks. Retroactive payment from birth possible.",
      ],
      sq: [
        "Shkarkoni formularin KG1 dhe shtojcën për fëmijën (KG1-AnlKi).",
        "Shkruani të dhënat personale, ID tatimor dhe të dhënat bankare.",
        "Për çdo fëmijë plotësoni shtojcë të veçantë.",
        "Bashkëngjitni dëshmitë (certifikatë lindjeje, regjistrim).",
        "Dërgoni në Familienkasse — online ose me postë.",
        "Përpunimi: rreth 4–6 javë. Pagesa retroaktive nga lindja e mundshme.",
      ],
      mk: [
        "Преземете го формуларот KG1 и прилогот за дете (KG1-AnlKi).",
        "Внесете лични податоци, даночен ID и банкарски податоци.",
        "За секое дете пополнете посебен прилог.",
        "Приложете докази (извод на родени, потврда за пријава).",
        "Испратете до надлежната Familienkasse — онлајн или по пошта.",
        "Обработка: околу 4–6 недели. Можна ретроактивна исплата од раѓање.",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen",
    officialLinkLabel: "Familienkasse Online",
  },
  {
    id: "elterngeld",
    icon: Heart,
    title: { de: "Elterngeld beantragen", bs: "Zahtjev za Elterngeld", en: "Apply for Parental Allowance", sq: "Aplikimi për Elterngeld", mk: "Барање за Elterngeld" },
    description: {
      de: "Elterngeld ersetzt 65–67% des Nettoeinkommens nach der Geburt. Der Antrag muss innerhalb von 3 Monaten gestellt werden.",
      bs: "Elterngeld nadoknađuje 65–67% neto primanja nakon porođaja. Zahtjev mora biti podnesen u roku od 3 mjeseca.",
      en: "Parental allowance replaces 65–67% of net income after birth. Must be applied within 3 months.",
      sq: "Elterngeld zëvendëson 65–67% të të ardhurave neto pas lindjes. Duhet aplikuar brenda 3 muajve.",
      mk: "Elterngeld надоместува 65–67% од нето примањата после породување. Барањето мора да се поднесе во рок од 3 месеци.",
    },
    documents: {
      de: ["Geburtsurkunde (Original)", "Gehaltsnachweise (12 Monate)", "Arbeitgeberbescheinigung", "Krankenversicherungsnachweis", "Mutterschaftsgeldbescheinigung"],
      bs: ["Rodni list (original)", "Platne liste (12 mjeseci)", "Potvrda poslodavca", "Zdravstveno osiguranje", "Potvrda o porodiljskom dodatku"],
      en: ["Birth certificate (original)", "Salary slips (12 months)", "Employer certificate", "Health insurance proof", "Maternity benefit certificate"],
      sq: ["Certifikata e lindjes (origjinal)", "Fletëpagesat (12 muaj)", "Certifikata e punëdhënësit", "Dëshmi e sigurimit shëndetësor", "Certifikata e benefitit të lehonisë"],
      mk: ["Извод на родени (оригинал)", "Платни листи (12 месеци)", "Потврда од работодавач", "Здравствено осигурување", "Потврда за породилен додаток"],
    },
    steps: {
      de: [
        "Zuständige Elterngeldstelle des Bundeslandes finden.",
        "Antrag herunterladen oder online über elterngeld-digital.de stellen.",
        "Bezugsmonate für beide Elternteile festlegen (max. 14 Monate Basiselterngeld).",
        "Einkommensnachweise der letzten 12 Monate vor Geburt beifügen.",
        "Arbeitgeberbescheinigung über geplante Elternzeit anfordern.",
        "Antrag innerhalb von 3 Monaten nach Geburt einreichen!",
      ],
      bs: [
        "Pronađite nadležnu Elterngeldstelle vaše savezne države.",
        "Preuzmite zahtjev ili ga podnesite online na elterngeld-digital.de.",
        "Odredite mjesece korištenja za oba roditelja (max. 14 mjeseci).",
        "Priložite dokaze o primanjima za 12 mjeseci prije porođaja.",
        "Zatražite potvrdu od poslodavca o roditeljskom odsustvu.",
        "Podnesite zahtjev u roku od 3 mjeseca od porođaja!",
      ],
      en: [
        "Find the parental allowance office of your federal state.",
        "Download the form or apply online at elterngeld-digital.de.",
        "Define benefit months for both parents (max. 14 months basic).",
        "Attach income proof for 12 months before birth.",
        "Request employer certificate for parental leave.",
        "Submit within 3 months after birth!",
      ],
      sq: [
        "Gjeni zyrën e Elterngeld të landit tuaj.",
        "Shkarkoni formularin ose aplikoni online në elterngeld-digital.de.",
        "Përcaktoni muajt e përfitimit për dy prindërit (max. 14 muaj baze).",
        "Bashkëngjitni dëshmitë e të ardhurave për 12 muajt para lindjes.",
        "Kërkoni certifikatën e punëdhënësit për pushimin prindëror.",
        "Dorëzoni brenda 3 muajve pas lindjes!",
      ],
      mk: [
        "Пронајдете ја надлежната Elterngeldstelle на вашата сојузна држава.",
        "Преземете барање или поднесете онлајн на elterngeld-digital.de.",
        "Одредете месеци за двата родители (макс. 14 месеци основно).",
        "Приложете докази за примања 12 месеци пред породување.",
        "Побарајте потврда од работодавач за родителско отсуство.",
        "Поднесете барање во рок од 3 месеци од породување!",
      ],
    },
    officialLink: "https://www.elterngeld-digital.de",
    officialLinkLabel: "Elterngeld Digital",
  },
  {
    id: "krankenversicherung",
    icon: Stethoscope,
    title: { de: "Krankenversicherung anmelden", bs: "Prijava zdravstvenog osiguranja", en: "Register Health Insurance", sq: "Regjistrimi i sigurimit shëndetësor", mk: "Пријава на здравствено осигурување" },
    description: {
      de: "In Deutschland besteht Versicherungspflicht. Arbeitnehmer werden automatisch versichert, Selbständige müssen sich selbst anmelden.",
      bs: "U Njemačkoj postoji obavezno osiguranje. Zaposlenici su automatski osigurani, samostalni moraju se sami prijaviti.",
      en: "Health insurance is mandatory in Germany. Employees are automatically insured; self-employed must register themselves.",
      sq: "Sigurimi shëndetësor është i detyrueshëm në Gjermani. Punëtorët sigurohen automatikisht; të vetëpunësuarit duhet të regjistrohen vetë.",
      mk: "Здравственото осигурување е задолжително во Германија. Вработените се автоматски осигурани, самостојните мора сами да се пријават.",
    },
    documents: {
      de: ["Meldebescheinigung", "Arbeitsvertrag oder Gewerbeanmeldung", "Reisepass / Aufenthaltstitel", "Ggf. Nachweis Vorversicherung", "Bankverbindung"],
      bs: ["Potvrda o prijavi", "Ugovor o radu ili prijava obrta", "Pasoš / boravišna dozvola", "Eventualno dokaz prethodnog osiguranja", "Bankovni podaci"],
      en: ["Registration certificate", "Employment contract or business registration", "Passport / residence permit", "Proof of prior insurance if applicable", "Bank details"],
      sq: ["Certifikata e regjistrimit", "Kontratë pune ose regjistrim biznesi", "Pasaportë / leje qëndrimi", "Dëshmi e sigurimit të mëparshëm nëse ka", "Të dhëna bankare"],
      mk: ["Потврда за пријава", "Договор за работа или пријава на дејност", "Пасош / дозвола за престој", "Евентуално доказ за претходно осигурување", "Банкарски податоци"],
    },
    steps: {
      de: [
        "Gesetzliche Krankenkasse wählen (z.B. AOK, TK, Barmer, DAK).",
        "Online-Antrag auf der Webseite der Krankenkasse ausfüllen.",
        "Meldebescheinigung und Arbeitsvertrag hochladen oder per Post senden.",
        "Versichertenkarte (eGK) wird innerhalb von 2–3 Wochen zugesendet.",
        "Arbeitgeber über die gewählte Kasse informieren.",
      ],
      bs: [
        "Odaberite zdravstvenu blagajnu (AOK, TK, Barmer, DAK itd.).",
        "Popunite online zahtjev na stranici blagajne.",
        "Učitajte ili pošaljite potvrdu o prijavi i ugovor o radu.",
        "Kartica osiguranika (eGK) stiže za 2–3 sedmice.",
        "Obavijestite poslodavca o odabranoj blagajni.",
      ],
      en: [
        "Choose a statutory health insurer (AOK, TK, Barmer, DAK, etc.).",
        "Fill out the online application on the insurer's website.",
        "Upload or mail registration certificate and employment contract.",
        "Insurance card (eGK) arrives within 2–3 weeks.",
        "Inform your employer about your chosen insurer.",
      ],
      sq: [
        "Zgjidhni siguruesin shëndetësor (AOK, TK, Barmer, DAK etj.).",
        "Plotësoni aplikimin online në faqen e siguruesit.",
        "Ngarkoni ose dërgoni certifikatën e regjistrimit dhe kontratën e punës.",
        "Karta e sigurimit (eGK) mbërrin brenda 2–3 javëve.",
        "Informoni punëdhënësin për siguruesin e zgjedhur.",
      ],
      mk: [
        "Изберете здравствена каса (AOK, TK, Barmer, DAK итн.).",
        "Пополнете онлајн барање на страницата на касата.",
        "Прикачете или испратете потврда за пријава и договор за работа.",
        "Картичка за осигурување (eGK) пристигнува за 2–3 недели.",
        "Информирајте го работодавачот за избраната каса.",
      ],
    },
    officialLink: "https://www.krankenkassen.de",
    officialLinkLabel: "Krankenkassen-Vergleich",
  },
  {
    id: "steuer",
    icon: Receipt,
    title: { de: "Steuer-ID & Steuerklasse", bs: "Porezni ID i porezna klasa", en: "Tax ID & Tax Class", sq: "ID Tatimor & Klasa Tatimore", mk: "Даночен ID и даночна класа" },
    description: {
      de: "Die Steuer-ID wird automatisch nach der Anmeldung per Post zugesandt. Die Steuerklasse kann beim Finanzamt geändert werden.",
      bs: "Porezni ID se automatski šalje poštom nakon prijave prebivališta. Porezna klasa se može promijeniti u Finanzamtu.",
      en: "The tax ID is sent by mail after registration. The tax class can be changed at the tax office.",
      sq: "ID tatimor dërgohet automatikisht me postë pas regjistrimit. Klasa tatimore mund të ndryshohet në zyrën tatimore.",
      mk: "Даночниот ID автоматски се испраќа по пошта после пријавата. Даночната класа може да се промени во Finanzamt.",
    },
    documents: {
      de: ["Meldebescheinigung", "Personalausweis / Reisepass", "Heiratsurkunde (bei Steuerklassenwechsel)", "Ggf. Scheidungsurteil"],
      bs: ["Potvrda o prijavi", "Lična karta / pasoš", "Vjenčani list (za promjenu klase)", "Eventualno presuda o razvodu"],
      en: ["Registration certificate", "ID / Passport", "Marriage certificate (for class change)", "Divorce decree if applicable"],
      sq: ["Certifikata e regjistrimit", "Letërnjoftim / Pasaportë", "Certifikatë martese (për ndryshim klase)", "Vendim divorci nëse ka"],
      mk: ["Потврда за пријава", "Лична карта / пасош", "Венчаница (за промена на класа)", "Евентуално пресуда за развод"],
    },
    steps: {
      de: [
        "Steuer-ID wird automatisch ca. 2–4 Wochen nach Anmeldung per Post zugesandt.",
        "Falls nicht erhalten: beim Bundeszentralamt für Steuern (BZSt) online nachfragen.",
        "Steuerklasse prüfen (I = ledig, III/V oder IV/IV = verheiratet).",
        'Steuerklassenwechsel über das Finanzamt beantragen (Formular "Antrag auf Steuerklassenwechsel").',
        "Arbeitgeber informieren — neue Klasse erscheint automatisch in der Lohnabrechnung.",
      ],
      bs: [
        "Porezni ID stiže automatski poštom 2–4 sedmice nakon prijave.",
        "Ako nije stigao: pitajte online kod Bundeszentralamt für Steuern (BZSt).",
        "Provjerite poreznu klasu (I = neoženjen, III/V ili IV/IV = oženjen).",
        'Promjenu klase zatražite kod Finanzamta (formular "Antrag auf Steuerklassenwechsel").',
        "Obavijestite poslodavca — nova klasa se automatski pojavljuje na platnoj listi.",
      ],
      en: [
        "Tax ID is sent automatically by mail 2–4 weeks after registration.",
        "If not received: request online at the Federal Central Tax Office (BZSt).",
        "Check tax class (I = single, III/V or IV/IV = married).",
        "Apply for tax class change at the tax office (form 'Antrag auf Steuerklassenwechsel').",
        "Inform employer — new class appears automatically on payslip.",
      ],
      sq: [
        "ID tatimor dërgohet automatikisht me postë 2–4 javë pas regjistrimit.",
        "Nëse nuk e keni marrë: kërkoni online tek BZSt.",
        "Kontrolloni klasën tatimore (I = i pamartuar, III/V ose IV/IV = i martuar).",
        "Aplikoni për ndryshim klase tek zyra tatimore.",
        "Informoni punëdhënësin — klasa e re shfaqet automatikisht në fletëpagesë.",
      ],
      mk: [
        "Даночен ID се испраќа автоматски по пошта 2–4 недели после пријава.",
        "Ако не е примен: прашајте онлајн кај BZSt.",
        "Проверете даночна класа (I = неожен, III/V или IV/IV = оженет).",
        "Промена на класа побарајте кај Finanzamt.",
        "Информирајте го работодавачот — новата класа автоматски се појавува на платна листа.",
      ],
    },
    officialLink: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html",
    officialLinkLabel: "BZSt – Steuer-ID",
  },
  {
    id: "bankkonto",
    icon: Banknote,
    title: { de: "Bankkonto eröffnen", bs: "Otvaranje bankovnog računa", en: "Open a Bank Account", sq: "Hapja e llogarisë bankare", mk: "Отворање банкарска сметка" },
    description: {
      de: "Ein deutsches Bankkonto ist für Gehalt, Miete und Sozialleistungen notwendig. Die Eröffnung ist auch online möglich.",
      bs: "Njemački bankovni račun je potreban za platu, kiriju i socijalna davanja. Otvaranje je moguće i online.",
      en: "A German bank account is needed for salary, rent, and social benefits. Opening is also possible online.",
      sq: "Një llogari bankare gjermane nevojitet për pagë, qira dhe përfitime sociale. Hapja është e mundshme edhe online.",
      mk: "Германска банкарска сметка е потребна за плата, кирија и социјални давања. Отворање е можно и онлајн.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Meldebescheinigung", "Aufenthaltstitel (Nicht-EU)", "Ggf. Arbeitsvertrag"],
      bs: ["Lična karta / pasoš", "Potvrda o prijavi", "Boravišna dozvola (ne-EU)", "Eventualno ugovor o radu"],
      en: ["ID / Passport", "Registration certificate", "Residence permit (non-EU)", "Employment contract if applicable"],
      sq: ["Letërnjoftim / Pasaportë", "Certifikata e regjistrimit", "Leje qëndrimi (jo-BE)", "Kontratë pune nëse ka"],
      mk: ["Лична карта / пасош", "Потврда за пријава", "Дозвола за престој (не-ЕУ)", "Евентуално договор за работа"],
    },
    steps: {
      de: [
        "Bank auswählen (z.B. Sparkasse, Deutsche Bank, Commerzbank, N26, ING).",
        "Online-Antrag ausfüllen oder Termin in der Filiale vereinbaren.",
        "PostIdent oder VideoIdent zur Identitätsprüfung durchführen.",
        "Meldebescheinigung und Ausweisdokument bereithalten.",
        "Girokarte und Online-Banking-Daten werden per Post zugesendet.",
        "IBAN dem Arbeitgeber und Behörden mitteilen.",
      ],
      bs: [
        "Odaberite banku (Sparkasse, Deutsche Bank, Commerzbank, N26, ING itd.).",
        "Popunite online zahtjev ili zakažite termin u poslovnici.",
        "Provedite PostIdent ili VideoIdent za identifikaciju.",
        "Pripremite potvrdu o prijavi i ličnu kartu/pasoš.",
        "Girokarte i podaci za online banking stižu poštom.",
        "Proslijedite IBAN poslodavcu i institucijama.",
      ],
      en: [
        "Choose a bank (Sparkasse, Deutsche Bank, Commerzbank, N26, ING, etc.).",
        "Fill out online application or schedule a branch appointment.",
        "Complete PostIdent or VideoIdent for identity verification.",
        "Have registration certificate and ID ready.",
        "Debit card and online banking details arrive by mail.",
        "Share IBAN with employer and authorities.",
      ],
      sq: [
        "Zgjidhni bankën (Sparkasse, Deutsche Bank, Commerzbank, N26, ING etj.).",
        "Plotësoni aplikimin online ose caktoni takim në degë.",
        "Kryeni PostIdent ose VideoIdent për verifikim identiteti.",
        "Mbani gati certifikatën e regjistrimit dhe dokumentin e identitetit.",
        "Karta e debitit dhe të dhënat e online banking mbërrijnë me postë.",
        "Ndani IBAN-in me punëdhënësin dhe autoritetet.",
      ],
      mk: [
        "Изберете банка (Sparkasse, Deutsche Bank, Commerzbank, N26, ING итн.).",
        "Пополнете онлајн барање или закажете термин во филијала.",
        "Спроведете PostIdent или VideoIdent за идентификација.",
        "Подгответе потврда за пријава и документ за идентификација.",
        "Картичка и податоци за онлајн банкарство пристигнуваат по пошта.",
        "Проследете IBAN на работодавач и институции.",
      ],
    },
    officialLink: "https://www.bafin.de/DE/Verbraucher/BankeBauspwortkassen/Kontoeröffnung/kontoeröffnung_node.html",
    officialLinkLabel: "BaFin – Kontoeröffnung",
  },
  {
    id: "arbeit",
    icon: Briefcase,
    title: { de: "Arbeit & Arbeitsvertrag", bs: "Posao i ugovor o radu", en: "Employment & Work Contract", sq: "Punësimi & Kontrata e punës", mk: "Работа и договор за работа" },
    description: {
      de: "Ein Arbeitsvertrag regelt Rechte und Pflichten. Vor Unterschrift sollte man alle Punkte genau prüfen.",
      bs: "Ugovor o radu reguliše prava i obaveze. Prije potpisa treba pažljivo provjeriti sve tačke.",
      en: "An employment contract defines rights and duties. Review all points carefully before signing.",
      sq: "Kontrata e punës rregullon të drejtat dhe detyrimet. Para nënshkrimit kontrolloni çdo pikë me kujdes.",
      mk: "Договорот за работа ги регулира правата и обврските. Пред потпишување внимателно проверете ги сите точки.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Aufenthaltstitel mit Arbeitserlaubnis", "Sozialversicherungsausweis", "Steuer-ID", "Bankverbindung", "Ggf. Zeugnisse / Diplome"],
      bs: ["Lična karta / pasoš", "Boravišna dozvola sa radnom dozvolom", "Kartica socijalnog osiguranja", "Porezni ID", "Bankovni podaci", "Eventualno diplome / svjedodžbe"],
      en: ["ID / Passport", "Residence permit with work permit", "Social insurance card", "Tax ID", "Bank details", "Diplomas / certificates if applicable"],
      sq: ["Letërnjoftim / Pasaportë", "Leje qëndrimi me leje pune", "Karta e sigurimit social", "ID tatimor", "Të dhëna bankare", "Diploma / certifikata nëse ka"],
      mk: ["Лична карта / пасош", "Дозвола за престој со работна дозвола", "Картичка за социјално осигурување", "Даночен ID", "Банкарски податоци", "Евентуално дипломи / сертификати"],
    },
    steps: {
      de: [
        "Arbeitsvertrag vor Unterschrift vollständig lesen.",
        "Probezeit prüfen (max. 6 Monate, Kündigungsfrist 2 Wochen).",
        "Arbeitszeit, Gehalt, Urlaubstage (mind. 20 Tage) und Kündigungsfristen prüfen.",
        "Sozialversicherungsausweis beim Rentenversicherungsträger beantragen (falls nicht vorhanden).",
        "Steuer-ID und Bankverbindung dem Arbeitgeber mitteilen.",
        "Krankenversicherung wählen und Arbeitgeber informieren.",
        "Vertrag unterschreiben — ein Exemplar immer aufbewahren!",
      ],
      bs: [
        "Ugovor o radu pročitajte kompletno prije potpisa.",
        "Provjerite probni rok (max. 6 mjeseci, otkazni rok 2 sedmice).",
        "Provjerite radno vrijeme, platu, dane godišnjeg odmora (min. 20) i otkazne rokove.",
        "Kartica socijalnog osiguranja — zatražite kod nositelja penzijskog osiguranja.",
        "Proslijedite porezni ID i bankovne podatke poslodavcu.",
        "Odaberite zdravstveno osiguranje i obavijestite poslodavca.",
        "Potpišite ugovor — uvijek zadržite jedan primjerak!",
      ],
      en: [
        "Read the employment contract fully before signing.",
        "Check probation period (max. 6 months, 2-week notice).",
        "Verify working hours, salary, vacation days (min. 20), and notice periods.",
        "Request social insurance card from pension insurance if not available.",
        "Provide tax ID and bank details to employer.",
        "Choose health insurance and inform employer.",
        "Sign the contract — always keep a copy!",
      ],
      sq: [
        "Lexoni kontratën e punës plotësisht para nënshkrimit.",
        "Kontrolloni periudhën e provës (max. 6 muaj, njoftim 2 javë).",
        "Verifikoni orarin, pagën, ditët e pushimit (min. 20) dhe afatet e njoftimit.",
        "Kërkoni kartën e sigurimit social nga siguruesi i pensionit.",
        "Dorëzoni ID tatimor dhe të dhëna bankare punëdhënësit.",
        "Zgjidhni sigurimin shëndetësor dhe informoni punëdhënësin.",
        "Nënshkruani kontratën — gjithmonë mbani një kopje!",
      ],
      mk: [
        "Договорот за работа прочитајте го целосно пред потпишување.",
        "Проверете пробен период (макс. 6 месеци, отказен рок 2 недели).",
        "Проверете работно време, плата, денови одмор (мин. 20) и отказни рокови.",
        "Картичка за социјално осигурување — побарајте кај пензиски фонд.",
        "Проследете даночен ID и банкарски податоци на работодавачот.",
        "Изберете здравствено осигурување и информирајте го работодавачот.",
        "Потпишете го договорот — секогаш задржете еден примерок!",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de",
    officialLinkLabel: "Agentur für Arbeit",
  },
  {
    id: "wohnung",
    icon: Home,
    title: { de: "Wohnung & Mietvertrag", bs: "Stan i ugovor o najmu", en: "Housing & Rental Contract", sq: "Banesa & Kontrata e qirasë", mk: "Стан и договор за наем" },
    description: {
      de: "Ein Mietvertrag ist Pflicht und sollte vor Unterschrift genau geprüft werden. Die Kaution beträgt max. 3 Kaltmieten.",
      bs: "Ugovor o najmu je obavezan i treba ga pažljivo pročitati. Kaucija iznosi max. 3 hladne kirije.",
      en: "A rental contract is mandatory and should be checked carefully. Deposit is max. 3 months cold rent.",
      sq: "Kontrata e qirasë është e detyrueshme dhe duhet kontrolluar me kujdes. Depozita max. 3 qira të ftohta.",
      mk: "Договорот за наем е задолжителен и треба внимателно да се прочита. Кауцијата е макс. 3 ладни кирии.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Meldebescheinigung", "Einkommensnachweis / Gehaltsnachweise", "SCHUFA-Auskunft", "Mieterselbstauskunft", "Ggf. Bürgschaft"],
      bs: ["Lična karta / pasoš", "Potvrda o prijavi", "Dokaz o primanjima / platne liste", "SCHUFA izvještaj", "Samoprijava stanara", "Eventualno garancija"],
      en: ["ID / Passport", "Registration certificate", "Income proof / salary slips", "SCHUFA report", "Tenant self-disclosure", "Guarantor letter if applicable"],
      sq: ["Letërnjoftim / Pasaportë", "Certifikata e regjistrimit", "Dëshmi të ardhurave / fletëpagesa", "Raport SCHUFA", "Vetëdeklarim qiramarrësi", "Garanci nëse ka"],
      mk: ["Лична карта / пасош", "Потврда за пријава", "Доказ за примања / платни листи", "SCHUFA извештај", "Самопријава на станар", "Евентуално гаранција"],
    },
    steps: {
      de: [
        "Wohnung auf Portalen suchen (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Besichtigungstermine vereinbaren und Unterlagen vorbereiten.",
        "SCHUFA-Auskunft online bestellen (kostenlos 1x/Jahr bei meineSCHUFA.de).",
        "Mietvertrag vor Unterschrift komplett lesen — auf Nebenkosten, Kündigungsfrist und Kaution achten.",
        "Übergabeprotokoll bei Einzug erstellen (Zustand der Wohnung dokumentieren).",
        "Innerhalb von 14 Tagen beim Bürgeramt anmelden.",
      ],
      bs: [
        "Stanove tražite na portalima (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Dogovorite termine za razgledanje i pripremite dokumente.",
        "Naručite SCHUFA izvještaj online (besplatno 1x godišnje na meineSCHUFA.de).",
        "Ugovor o najmu pročitajte kompletno — obratite pažnju na režije, otkazni rok i kauciju.",
        "Napravite zapisnik o primopredaji pri useljenju (dokumentirajte stanje stana).",
        "U roku od 14 dana prijavite se u Bürgeramtu.",
      ],
      en: [
        "Search apartments on portals (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Schedule viewing appointments and prepare documents.",
        "Order SCHUFA report online (free 1x/year at meineSCHUFA.de).",
        "Read rental contract fully — check utilities, notice period, and deposit.",
        "Create handover protocol when moving in (document apartment condition).",
        "Register at the citizens' office within 14 days.",
      ],
      sq: [
        "Kërkoni banesa në portale (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Caktoni takime vizitimi dhe përgatitni dokumentet.",
        "Porosisni raportin SCHUFA online (falas 1x/vit në meineSCHUFA.de).",
        "Lexoni kontratën e qirasë plotësisht — kontrolloni shpenzimet, afatin e njoftimit dhe depozitën.",
        "Krijoni protokollin e dorëzimit gjatë shpërnguljes (dokumentoni gjendjen e banesës).",
        "Regjistrohuni në zyrën e qytetarëve brenda 14 ditëve.",
      ],
      mk: [
        "Станови барајте на портали (ImmobilienScout24, WG-Gesucht, eBay Kleinanzeigen).",
        "Договорете термини за разгледување и подгответе документи.",
        "Нарачајте SCHUFA извештај онлајн (бесплатно 1x годишно на meineSCHUFA.de).",
        "Договорот за наем прочитајте го целосно — внимавајте на режии, отказен рок и кауција.",
        "Направете записник за примопредавање при вселување.",
        "Во рок од 14 дена пријавете се во Bürgeramt.",
      ],
    },
    officialLink: "https://www.mieterbund.de",
    officialLinkLabel: "Deutscher Mieterbund",
  },
  {
    id: "auto",
    icon: Car,
    title: { de: "Auto anmelden", bs: "Registracija automobila", en: "Register a Car", sq: "Regjistrimi i makinës", mk: "Регистрација на автомобил" },
    description: {
      de: "Ein Auto muss innerhalb weniger Tage nach Kauf bei der Zulassungsstelle angemeldet werden.",
      bs: "Automobil se mora registrirati u roku od nekoliko dana od kupovine kod Zulassungsstelle.",
      en: "A car must be registered at the vehicle registration office within a few days of purchase.",
      sq: "Makina duhet regjistruar në zyrën e regjistrimit brenda disa ditëve pas blerjes.",
      mk: "Автомобилот мора да се регистрира во рок од неколку дена од купувањето кај Zulassungsstelle.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "eVB-Nummer (Versicherungsbestätigung)", "Fahrzeugbrief (Zulassungsbescheinigung Teil II)", "Fahrzeugschein (Teil I)", "Nachweis der Hauptuntersuchung (HU/TÜV)", "SEPA-Lastschriftmandat für Kfz-Steuer"],
      bs: ["Lična karta / pasoš", "eVB-broj (potvrda o osiguranju)", "Prometna dozvola (Teil II)", "Saobraćajna dozvola (Teil I)", "TÜV izvještaj", "SEPA ovlaštenje za porez na vozilo"],
      en: ["ID / Passport", "eVB number (insurance confirmation)", "Vehicle registration Part II", "Vehicle registration Part I", "TÜV inspection report", "SEPA mandate for vehicle tax"],
      sq: ["Letërnjoftim / Pasaportë", "Numri eVB (konfirmim sigurimi)", "Leja e qarkullimit (Teil II)", "Leja e qarkullimit (Teil I)", "Raporti TÜV", "Mandati SEPA për taksën e automjetit"],
      mk: ["Лична карта / пасош", "eVB-број (потврда за осигурување)", "Сообраќајна дозвола (Teil II)", "Сообраќајна дозвола (Teil I)", "TÜV извештај", "SEPA овластување за данок на возило"],
    },
    steps: {
      de: [
        "Kfz-Versicherung abschließen und eVB-Nummer erhalten.",
        "Termin bei der Zulassungsstelle online buchen.",
        "Alle Dokumente (Ausweis, eVB, Fahrzeugbrief, TÜV) mitbringen.",
        "Kennzeichen bei einer Schilderprägestelle anfertigen lassen.",
        "Zulassungsbescheinigung Teil I und II erhalten.",
        "Kfz-Steuer wird automatisch vom Zoll eingezogen (SEPA-Mandat).",
      ],
      bs: [
        "Zaključite osiguranje vozila i dobijte eVB-broj.",
        "Zakažite termin online kod Zulassungsstelle.",
        "Ponesete sve dokumente (pasoš, eVB, prometna, TÜV).",
        "Tablice naručite kod Schilderprägestelle.",
        "Preuzmite saobraćajnu dozvolu Teil I i II.",
        "Porez na vozilo se automatski naplaćuje (SEPA ovlaštenje).",
      ],
      en: [
        "Get car insurance and obtain eVB number.",
        "Book appointment online at the vehicle registration office.",
        "Bring all documents (ID, eVB, registration papers, TÜV).",
        "Have license plates made at a plate maker.",
        "Receive registration certificates Part I and II.",
        "Vehicle tax is collected automatically (SEPA mandate).",
      ],
      sq: [
        "Siguroni automjetin dhe merrni numrin eVB.",
        "Rezervoni takim online tek zyra e regjistrimit.",
        "Sillni të gjitha dokumentet (ID, eVB, letrat e regjistrimit, TÜV).",
        "Bëni targat tek prodhuesi i targave.",
        "Merrni certifikatat e regjistrimit Teil I dhe II.",
        "Taksa e automjetit mblidhet automatikisht (mandat SEPA).",
      ],
      mk: [
        "Склучете осигурување на возило и добијте eVB-број.",
        "Закажете термин онлајн кај Zulassungsstelle.",
        "Понесете ги сите документи (пасош, eVB, сообраќајна, TÜV).",
        "Таблички нарачајте кај Schilderprägestelle.",
        "Преземете сообраќајна дозвола Teil I и II.",
        "Данок на возило автоматски се наплаќа (SEPA овластување).",
      ],
    },
    officialLink: "https://www.kba.de",
    officialLinkLabel: "Kraftfahrt-Bundesamt",
    noOnlineForm: true,
  },
  {
    id: "fuehrerschein",
    icon: CreditCard,
    title: { de: "Führerschein umschreiben", bs: "Prepis vozačke dozvole", en: "Convert Driving License", sq: "Konvertimi i patentës", mk: "Препис на возачка дозвола" },
    description: {
      de: "Führerscheine aus Nicht-EU-Ländern müssen innerhalb von 6 Monaten umgeschrieben werden. EU-Führerscheine gelten unbegrenzt.",
      bs: "Vozačke dozvole iz ne-EU zemalja moraju se prepisati u roku od 6 mjeseci. EU dozvole važe neograničeno.",
      en: "Non-EU driving licenses must be converted within 6 months. EU licenses are valid indefinitely.",
      sq: "Patentët nga vendet jo-BE duhet konvertuar brenda 6 muajve. Patentët e BE vlejnë pa afat.",
      mk: "Возачки дозволи од не-ЕУ земји мора да се препишат во рок од 6 месеци. ЕУ дозволи важат неограничено.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Meldebescheinigung", "Ausländischer Führerschein (Original + Übersetzung)", "Biometrisches Passfoto", "Sehtest-Bescheinigung", "Erste-Hilfe-Kurs-Bescheinigung"],
      bs: ["Lična karta / pasoš", "Potvrda o prijavi", "Strana vozačka dozvola (original + prijevod)", "Biometrijska fotografija", "Potvrda o pregledu vida", "Potvrda o kursu prve pomoći"],
      en: ["ID / Passport", "Registration certificate", "Foreign driving license (original + translation)", "Biometric photo", "Eye test certificate", "First aid course certificate"],
      sq: ["Letërnjoftim / Pasaportë", "Certifikata e regjistrimit", "Patenta e huaj (origjinal + përkthim)", "Foto biometrike", "Certifikata e testit të syve", "Certifikata e kursit të ndihmës së parë"],
      mk: ["Лична карта / пасош", "Потврда за пријава", "Странска возачка дозвола (оригинал + превод)", "Биометриска фотографија", "Потврда за преглед на вид", "Потврда за курс прва помош"],
    },
    steps: {
      de: [
        "Prüfen, ob der Führerschein aus einem anerkannten Land stammt (Prüfungspflicht ja/nein).",
        "Amtlich beglaubigte Übersetzung des Führerscheins anfertigen lassen.",
        "Sehtest bei einem Optiker oder Augenarzt machen.",
        "Erste-Hilfe-Kurs absolvieren (nur bei prüfungspflichtigen Ländern).",
        "Antrag bei der Führerscheinstelle mit allen Dokumenten einreichen.",
        "Ggf. theoretische und/oder praktische Prüfung ablegen.",
        "Deutschen Führerschein abholen.",
      ],
      bs: [
        "Provjerite da li dozvola dolazi iz priznate zemlje (obaveza polaganja da/ne).",
        "Naručite službeni prevod vozačke dozvole.",
        "Obavite pregled vida kod optičara ili oftalmologa.",
        "Položite kurs prve pomoći (samo za zemlje sa obaveznim polaganjem).",
        "Podnesite zahtjev sa svim dokumentima kod Führerscheinstelle.",
        "Eventualno položite teorijski i/ili praktični ispit.",
        "Preuzmite njemačku vozačku dozvolu.",
      ],
      en: [
        "Check if your license is from a recognized country (exam required yes/no).",
        "Get an officially certified translation of your license.",
        "Take an eye test at an optician or ophthalmologist.",
        "Complete first aid course (only for countries requiring exams).",
        "Submit application with all documents at the license office.",
        "Take theory and/or practical exam if required.",
        "Pick up your German driving license.",
      ],
      sq: [
        "Kontrolloni nëse patenta juaj vjen nga një vend i njohur (provim i detyrueshëm po/jo).",
        "Bëni përkthimin zyrtarisht të certifikuar të patentës.",
        "Bëni testin e syve tek optiku ose oftalmologu.",
        "Përfundoni kursin e ndihmës së parë (vetëm për vendet me provim të detyrueshëm).",
        "Dorëzoni aplikimin me të gjitha dokumentet tek zyra e patentës.",
        "Jepni provimin teorik dhe/ose praktik nëse kërkohet.",
        "Merrni patentën gjermane.",
      ],
      mk: [
        "Проверете дали дозволата е од призната земја (обврска за полагање да/не).",
        "Направете службен заверен превод на возачката дозвола.",
        "Направете преглед на вид кај оптичар или офталмолог.",
        "Положете курс прва помош (само за земји со обврска за полагање).",
        "Поднесете барање со сите документи кај Führerscheinstelle.",
        "Евентуално положете теоретски и/или практичен испит.",
        "Преземете ја германската возачка дозвола.",
      ],
    },
    officialLink: "https://www.adac.de/verkehr/rund-um-den-fuehrerschein/auslaendischer-fuehrerschein/",
    officialLinkLabel: "ADAC – Führerschein",
    noOnlineForm: true,
  },
  {
    id: "familiennachzug",
    icon: Users,
    title: { de: "Familiennachzug", bs: "Spajanje porodice", en: "Family Reunification", sq: "Bashkimi familjar", mk: "Спојување на семејство" },
    description: {
      de: "Familienangehörige aus Drittstaaten können unter bestimmten Voraussetzungen nachziehen. Der Antrag wird bei der Auslandsvertretung gestellt.",
      bs: "Članovi porodice iz trećih zemalja mogu se pod određenim uvjetima pridružiti. Zahtjev se podnosi kod ambasade.",
      en: "Family members from third countries can join under certain conditions. Application is made at the embassy.",
      sq: "Anëtarët e familjes nga vendet e treta mund të bashkohen nën kushte të caktuara. Aplikimi bëhet në ambasadë.",
      mk: "Членови на семејството од трети земји можат да се придружат под одредени услови. Барањето се поднесува во амбасада.",
    },
    documents: {
      de: ["Reisepass (gültig)", "Heiratsurkunde / Geburtsurkunde (beglaubigt + übersetzt)", "Aufenthaltstitel des in Deutschland lebenden Partners", "Nachweis ausreichenden Wohnraums", "Einkommensnachweis / Verpflichtungserklärung", "Ggf. A1-Sprachzertifikat Deutsch"],
      bs: ["Pasoš (važeći)", "Vjenčani list / rodni list (ovjeren + preveden)", "Boravišna dozvola partnera u Njemačkoj", "Dokaz o dovoljnom stambenom prostoru", "Dokaz o primanjima / izjava o obavezi", "Eventualno A1-certifikat njemačkog jezika"],
      en: ["Valid passport", "Marriage / birth certificate (certified + translated)", "Residence permit of partner in Germany", "Proof of sufficient living space", "Income proof / obligation declaration", "A1 German language certificate if applicable"],
      sq: ["Pasaportë (e vlefshme)", "Certifikatë martese / lindjeje (e certifikuar + e përkthyer)", "Leja e qëndrimit e partnerit në Gjermani", "Dëshmi hapësire të mjaftueshme jetese", "Dëshmi të ardhurave / deklaratë detyrimi", "Certifikatë A1 gjermanisht nëse ka"],
      mk: ["Пасош (важечки)", "Венчаница / извод на родени (заверен + преведен)", "Дозвола за престој на партнерот во Германија", "Доказ за доволен животен простор", "Доказ за примања / изјава за обврска", "Евентуално A1-сертификат за германски јазик"],
    },
    steps: {
      de: [
        "Termin bei der deutschen Auslandsvertretung (Botschaft/Konsulat) im Herkunftsland buchen.",
        "Alle Dokumente beglaubigen und übersetzen lassen.",
        "Visumsantrag für Familiennachzug ausfüllen.",
        "Ggf. A1-Sprachtest Deutsch ablegen (für Ehepartner).",
        "Nachweis ausreichenden Wohnraums und Einkommen vorbereiten.",
        "Visum wird geprüft — Bearbeitungszeit 2–6 Monate.",
        "Nach Einreise: Aufenthaltstitel bei der Ausländerbehörde beantragen.",
      ],
      bs: [
        "Zakažite termin u njemačkoj ambasadi/konzulatu u zemlji porijekla.",
        "Sve dokumente ovjerite i prevedite.",
        "Popunite zahtjev za vizu za spajanje porodice.",
        "Eventualno položite A1-ispit njemačkog jezika (za supružnike).",
        "Pripremite dokaz o stambenom prostoru i primanjima.",
        "Viza se provjerava — obrada traje 2–6 mjeseci.",
        "Nakon ulaska: podnesite zahtjev za boravišnu dozvolu kod Ausländerbehörde.",
      ],
      en: [
        "Book appointment at the German embassy/consulate in the country of origin.",
        "Have all documents certified and translated.",
        "Fill out visa application for family reunification.",
        "Take A1 German language test if required (for spouses).",
        "Prepare proof of living space and income.",
        "Visa is reviewed — processing takes 2–6 months.",
        "After arrival: apply for residence permit at the foreigners' authority.",
      ],
      sq: [
        "Rezervoni takim në ambasadën/konsullatën gjermane në vendin e origjinës.",
        "Certifikoni dhe përktheni të gjitha dokumentet.",
        "Plotësoni aplikimin për vizë bashkimi familjar.",
        "Jepni testin A1 të gjermanishtes nëse kërkohet (për bashkëshortë/t).",
        "Përgatitni dëshmi hapësire jetese dhe të ardhurave.",
        "Viza kontrollohet — përpunimi zgjat 2–6 muaj.",
        "Pas hyrjes: aplikoni për leje qëndrimi tek zyra e të huajve.",
      ],
      mk: [
        "Закажете термин во германска амбасада/конзулат во земјата на потекло.",
        "Сите документи заверете и преведете.",
        "Пополнете барање за виза за спојување на семејство.",
        "Евентуално положете A1-испит за германски јазик (за сопруг/а).",
        "Подгответе доказ за животен простор и примања.",
        "Визата се проверува — обработка трае 2–6 месеци.",
        "По влегување: поднесете барање за дозвола за престој кај Ausländerbehörde.",
      ],
    },
    officialLink: "https://www.make-it-in-germany.com/de/visum-aufenthalt/familiennachzug",
    officialLinkLabel: "Make it in Germany",
  },
  {
    id: "aufenthaltstitel",
    icon: Shield,
    title: { de: "Aufenthaltstitel & Verlängerung", bs: "Boravišna dozvola i produženje", en: "Residence Permit & Extension", sq: "Leja e qëndrimit & Zgjatja", mk: "Дозвола за престој и продолжување" },
    description: {
      de: "Nicht-EU-Bürger benötigen einen Aufenthaltstitel. Die Verlängerung muss rechtzeitig vor Ablauf beantragt werden.",
      bs: "Državljani ne-EU zemalja trebaju boravišnu dozvolu. Produženje se mora zatražiti pravovremeno prije isteka.",
      en: "Non-EU citizens need a residence permit. Extension must be applied for in time before expiry.",
      sq: "Qytetarët jo-BE kanë nevojë për leje qëndrimi. Zgjatja duhet aplikuar para skadimit.",
      mk: "Граѓаните од не-ЕУ земји потребуваат дозвола за престој. Продолжувањето мора да се побара навремено пред истекот.",
    },
    documents: {
      de: ["Reisepass (gültig)", "Biometrisches Passfoto", "Meldebescheinigung", "Arbeitsvertrag oder Studiennachweis", "Krankenversicherungsnachweis", "Einkommensnachweis", "Ggf. Integrationskurs-Bescheinigung"],
      bs: ["Pasoš (važeći)", "Biometrijska fotografija", "Potvrda o prijavi", "Ugovor o radu ili potvrda studija", "Dokaz o zdravstvenom osiguranju", "Dokaz o primanjima", "Eventualno potvrda o integrationom kursu"],
      en: ["Valid passport", "Biometric photo", "Registration certificate", "Employment contract or study proof", "Health insurance proof", "Income proof", "Integration course certificate if applicable"],
      sq: ["Pasaportë (e vlefshme)", "Foto biometrike", "Certifikata e regjistrimit", "Kontratë pune ose dëshmi studimi", "Dëshmi sigurimi shëndetësor", "Dëshmi të ardhurave", "Certifikatë kursi integrimi nëse ka"],
      mk: ["Пасош (важечки)", "Биометриска фотографија", "Потврда за пријава", "Договор за работа или потврда за студии", "Доказ за здравствено осигурување", "Доказ за примања", "Евентуално потврда за интеграционен курс"],
    },
    steps: {
      de: [
        "Termin bei der Ausländerbehörde online buchen (mind. 6–8 Wochen vor Ablauf).",
        "Alle erforderlichen Dokumente zusammenstellen.",
        "Antrag auf Verlängerung / Erteilung des Aufenthaltstitels ausfüllen.",
        "Gebühr bezahlen (ca. 70–100 €, je nach Titel).",
        "Fiktionsbescheinigung erhalten (falls Bearbeitungszeit länger als Gültigkeit).",
        "Aufenthaltstitel in elektronischer Form (eAT) wird per Post zugesendet.",
      ],
      bs: [
        "Zakažite termin kod Ausländerbehörde online (min. 6–8 sedmica prije isteka).",
        "Pripremite sve potrebne dokumente.",
        "Popunite zahtjev za produženje / izdavanje boravišne dozvole.",
        "Platite taksu (ca. 70–100 €, ovisno o vrsti).",
        "Dobijete Fiktionsbescheinigung (ako obrada traje duže od važnosti).",
        "Boravišna dozvola u elektronskom obliku (eAT) stiže poštom.",
      ],
      en: [
        "Book appointment at the foreigners' authority online (min. 6–8 weeks before expiry).",
        "Gather all required documents.",
        "Fill out application for extension / issuance of residence permit.",
        "Pay the fee (approx. €70–100, depending on type).",
        "Receive fictional certificate if processing takes longer than validity.",
        "Electronic residence permit (eAT) is sent by mail.",
      ],
      sq: [
        "Rezervoni takim online tek zyra e të huajve (min. 6–8 javë para skadimit).",
        "Mblidhni të gjitha dokumentet e nevojshme.",
        "Plotësoni aplikimin për zgjatje / lëshim të lejes së qëndrimit.",
        "Paguani tarifën (rreth 70–100 €, varësisht nga lloji).",
        "Merrni certifikatën fiktive nëse përpunimi zgjat më shumë se vlefshmëria.",
        "Leja elektronike e qëndrimit (eAT) dërgohet me postë.",
      ],
      mk: [
        "Закажете термин кај Ausländerbehörde онлајн (мин. 6–8 недели пред истек).",
        "Подгответе ги сите потребни документи.",
        "Пополнете барање за продолжување / издавање дозвола за престој.",
        "Платете такса (околу 70–100 €, зависно од видот).",
        "Добивате Fiktionsbescheinigung (ако обработката трае подолго од важноста).",
        "Дозвола за престој во електронска форма (eAT) пристигнува по пошта.",
      ],
    },
    officialLink: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwsendererErsteSchritte/Aufenthaltstitel/aufenthaltstitel-node.html",
    officialLinkLabel: "BAMF – Aufenthaltstitel",
  },
  {
    id: "kuendigung",
    icon: XCircle,
    title: { de: "Kündigungsschreiben", bs: "Otkazno pismo", en: "Termination Letter", sq: "Letër largimi", mk: "Отказно писмо" },
    description: {
      de: "Ein Kündigungsschreiben muss schriftlich erfolgen und bestimmte Fristen einhalten. Hier findest du eine Schritt-für-Schritt Anleitung.",
      bs: "Otkazno pismo mora biti u pisanom obliku i poštovati rokove. Ovdje pronalazite korak-po-korak uputstvo.",
      en: "A termination letter must be in writing and observe notice periods. Here's a step-by-step guide.",
      sq: "Letra e largimit duhet të jetë me shkrim dhe të respektojë afatet e njoftimit. Ja një udhëzues hap pas hapi.",
      mk: "Отказното писмо мора да биде во писмена форма и да ги почитува роковите. Овде наоѓате чекор-по-чекор упатство.",
    },
    documents: {
      de: ["Arbeitsvertrag (für Kündigungsfristen)", "Personalausweis", "Ggf. ärztliches Attest (Sonderkündigung)"],
      bs: ["Ugovor o radu (za rokove otkazivanja)", "Lična karta", "Eventualno ljekarski nalaz (vanredni otkaz)"],
      en: ["Employment contract (for notice periods)", "ID", "Medical certificate if applicable (special termination)"],
      sq: ["Kontratë pune (për afatet e njoftimit)", "Letërnjoftim", "Certifikatë mjekësore nëse ka (largim i veçantë)"],
      mk: ["Договор за работа (за отказни рокови)", "Лична карта", "Евентуално лекарски наод (вонреден отказ)"],
    },
    steps: {
      de: [
        "Kündigungsfrist im Arbeitsvertrag oder Tarifvertrag prüfen (Standard: 4 Wochen zum 15. oder Monatsende).",
        "Schriftliches Kündigungsschreiben verfassen — handschriftliche Unterschrift ist Pflicht!",
        "Adressat: Arbeitgeber mit vollständigem Firmennamen und Adresse.",
        "Datum, eigener Name, Betreff 'Kündigung' und gewünschtes Enddatum angeben.",
        "Persönlich gegen Empfangsbestätigung übergeben ODER per Einschreiben senden.",
        "Kopie des Schreibens und Zustellnachweis aufbewahren.",
      ],
      bs: [
        "Provjerite otkazni rok u ugovoru o radu (standard: 4 sedmice do 15. ili kraja mjeseca).",
        "Sastavite pismeni otkaz — vlastoručni potpis je obavezan!",
        "Primalac: poslodavac sa punim imenom firme i adresom.",
        "Navedite datum, vaše ime, naslov 'Kündigung' i željeni datum prestanka.",
        "Predajte lično uz potvrdu prijema ILI pošaljite preporučenom poštom.",
        "Sačuvajte kopiju pisma i dokaz o dostavi.",
      ],
      en: [
        "Check notice period in your contract (standard: 4 weeks to the 15th or end of month).",
        "Write a formal letter — handwritten signature required!",
        "Addressee: employer with full company name and address.",
        "Include date, your name, subject 'Kündigung', and desired end date.",
        "Hand-deliver with receipt confirmation OR send via registered mail.",
        "Keep a copy and proof of delivery.",
      ],
      sq: [
        "Kontrolloni afatin e njoftimit në kontratën e punës (standard: 4 javë deri më 15 ose fund muaji).",
        "Shkruani letrën zyrtare të largimit — nënshkrimi me dorë është i detyrueshëm!",
        "Marrësi: punëdhënësi me emrin e plotë të kompanisë dhe adresën.",
        "Përfshini datën, emrin tuaj, temën 'Kündigung' dhe datën e dëshiruar të përfundimit.",
        "Dorëzoni personalisht me konfirmim pranimi OSE dërgoni me postë të regjistruar.",
        "Mbani një kopje të letrës dhe dëshmi të dorëzimit.",
      ],
      mk: [
        "Проверете отказен рок во договорот за работа (стандард: 4 недели до 15. или крај на месец).",
        "Составете писмен отказ — сопственоручен потпис е задолжителен!",
        "Примач: работодавач со полно име на фирма и адреса.",
        "Наведете датум, вашето име, наслов 'Kündigung' и посакуван датум на престанок.",
        "Предајте лично со потврда за прием ИЛИ испратете со препорачана пошта.",
        "Зачувајте копија од писмото и доказ за достава.",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/kuendigung",
    officialLinkLabel: "Agentur für Arbeit",
  },
  {
    id: "jobcenter",
    icon: Landmark,
    title: { de: "Jobcenter & Behördengänge", bs: "Jobcenter i uredske obaveze", en: "Jobcenter & Office Visits", sq: "Jobcenter & Vizitat zyrtare", mk: "Jobcenter и канцелариски обврски" },
    description: {
      de: "Beim Jobcenter können Bürgergeld, Weiterbildungen und Eingliederungshilfen beantragt werden. Hier der Ablauf.",
      bs: "Kod Jobcentera možete zatražiti Bürgergeld, dodatno obrazovanje i pomoć pri integraciji. Evo kako.",
      en: "At the Jobcenter you can apply for Bürgergeld, further education, and integration support. Here's how.",
      sq: "Në Jobcenter mund të aplikoni për Bürgergeld, arsimim të mëtejshëm dhe ndihmë integrimi. Ja si.",
      mk: "Кај Jobcenter можете да побарате Bürgergeld, дополнително образование и помош при интеграција. Еве како.",
    },
    documents: {
      de: ["Personalausweis / Aufenthaltstitel", "Meldebescheinigung", "Mietvertrag + Nebenkostenabrechnung", "Kontoauszüge (3 Monate)", "Arbeitsvertrag / Kündigung", "Einkommensnachweise"],
      bs: ["Lična karta / boravišna dozvola", "Potvrda o prijavi", "Ugovor o najmu + režije", "Izvodi iz računa (3 mjeseca)", "Ugovor o radu / otkaz", "Dokazi o primanjima"],
      en: ["ID / residence permit", "Registration certificate", "Rental contract + utilities", "Bank statements (3 months)", "Employment contract / termination", "Income proof"],
      sq: ["Letërnjoftim / leje qëndrimi", "Certifikata e regjistrimit", "Kontratë qiraje + shpenzime", "Ekstrakte bankare (3 muaj)", "Kontratë pune / largim", "Dëshmi të ardhurave"],
      mk: ["Лична карта / дозвола за престој", "Потврда за пријава", "Договор за наем + режии", "Извод од сметка (3 месеци)", "Договор за работа / отказ", "Докази за примања"],
    },
    steps: {
      de: [
        "Online arbeitsuchend melden unter jobcenter.digital.",
        "Erstgespräch-Termin wird automatisch vergeben.",
        "Alle Dokumente zum Termin mitbringen (Checkliste beachten).",
        "Antrag auf Bürgergeld ausfüllen — Sachbearbeiter hilft vor Ort.",
        "Kosten der Unterkunft (KdU) werden separat geprüft.",
        "Eingliederungsvereinbarung besprechen und unterschreiben.",
        "Regelmäßige Folgetermine wahrnehmen.",
      ],
      bs: [
        "Prijavite se online kao tražilac posla na jobcenter.digital.",
        "Automatski dobijate termin za prvi razgovor.",
        "Ponesete sve dokumente na termin.",
        "Popunite zahtjev za Bürgergeld — službenik pomaže na licu mjesta.",
        "Troškovi stanovanja se provjeravaju odvojeno.",
        "Dogovorite i potpišite sporazum o integraciji.",
        "Redovno dolazite na zakazane termine.",
      ],
      en: [
        "Register as job-seeking online at jobcenter.digital.",
        "An initial meeting is automatically scheduled.",
        "Bring all documents to the appointment.",
        "Fill out the Bürgergeld application — staff help on-site.",
        "Housing costs are reviewed separately.",
        "Discuss and sign the integration agreement.",
        "Attend regular follow-up appointments.",
      ],
      sq: [
        "Regjistrohuni online si kërkues pune në jobcenter.digital.",
        "Takimi fillestar caktohet automatikisht.",
        "Sillni të gjitha dokumentet në takim.",
        "Plotësoni aplikimin për Bürgergeld — stafi ndihmon në vend.",
        "Kostot e strehimit kontrollohen veçmas.",
        "Diskutoni dhe nënshkruani marrëveshjen e integrimit.",
        "Merrni pjesë rregullisht në takimet pasuese.",
      ],
      mk: [
        "Пријавете се онлајн како барач на работа на jobcenter.digital.",
        "Автоматски добивате термин за прв разговор.",
        "Понесете ги сите документи на терминот.",
        "Пополнете барање за Bürgergeld — службеник помага на лице место.",
        "Трошоците за станување се проверуваат одделно.",
        "Договорете и потпишете спогодба за интеграција.",
        "Редовно доаѓајте на закажани термини.",
      ],
    },
    officialLink: "https://www.jobcenter.digital",
    officialLinkLabel: "Jobcenter Digital",
  },
];

const pageTitles: Record<LangKey, { title: string; subtitle: string }> = {
  de: { title: "Formulare & Hilfe", subtitle: "Praktische Schritt-für-Schritt Anleitungen für alle wichtigen Behördengänge." },
  bs: { title: "Formulari & Pomoć", subtitle: "Praktična uputstva korak po korak za sve važne uredske obaveze." },
  en: { title: "Forms & Help", subtitle: "Practical step-by-step guides for all important administrative tasks." },
  sq: { title: "Formularët & Ndihma", subtitle: "Udhëzues praktik hap pas hapi për të gjitha detyrat administrative të rëndësishme." },
  mk: { title: "Формулари & Помош", subtitle: "Практични упатства чекор по чекор за сите важни административни обврски." },
};

const labels: Record<LangKey, { documents: string; steps: string; officialLink: string; template: string; premiumTitle: string; premiumDesc: string; premiumCta: string; loginCta: string; noOnlineForm: string }> = {
  de: { documents: "Benötigte Dokumente", steps: "Schritt-für-Schritt Anleitung", officialLink: "Offizieller Link", template: "Vorlage herunterladen", premiumTitle: "Vollständige Anleitung nur mit BalkanLink Plus", premiumDesc: "Erhalte alle Schritte, Vorlagen und Dokument-Checklisten.", premiumCta: "Plus freischalten", loginCta: "Anmelden", noOnlineForm: "Formular persönlich im Rathaus oder Landratsamt erhältlich." },
  bs: { documents: "Potrebni dokumenti", steps: "Korak po korak uputstvo", officialLink: "Zvanični link", template: "Preuzmi predložak", premiumTitle: "Kompletno uputstvo samo sa BalkanLink Plus", premiumDesc: "Dobij sve korake, predloške i liste dokumenata.", premiumCta: "Aktiviraj Plus", loginCta: "Prijavi se", noOnlineForm: "Formular dostupan lično u Rathaus ili Landratsamt." },
  en: { documents: "Required Documents", steps: "Step-by-Step Guide", officialLink: "Official Link", template: "Download Template", premiumTitle: "Full guide available with BalkanLink Plus", premiumDesc: "Get all steps, templates, and document checklists.", premiumCta: "Unlock Plus", loginCta: "Sign in", noOnlineForm: "Form available in person at the town hall or district office." },
  sq: { documents: "Dokumentet e nevojshme", steps: "Udhëzues hap pas hapi", officialLink: "Linku zyrtar", template: "Shkarko shabllonin", premiumTitle: "Udhëzuesi i plotë vetëm me BalkanLink Plus", premiumDesc: "Merr të gjitha hapat, shabllonët dhe listat e dokumenteve.", premiumCta: "Aktivizo Plus", loginCta: "Hyr", noOnlineForm: "Formulari i disponueshëm personalisht në bashki ose zyrë rajonale." },
  mk: { documents: "Потребни документи", steps: "Чекор по чекор упатство", officialLink: "Официјален линк", template: "Преземи шаблон", premiumTitle: "Целосно упатство само со BalkanLink Plus", premiumDesc: "Добијте ги сите чекори, шаблони и чеклисти за документи.", premiumCta: "Активирај Plus", loginCta: "Најави се", noOnlineForm: "Формулар достапен лично во Rathaus или Landratsamt." },
};

export default function Formulare() {
  const { language } = useLanguage();
  const lk = getLk(language);
  const t = pageTitles[lk];
  const l = labels[lk];

  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{t.subtitle}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container max-w-3xl space-y-3">
          {categories.map((cat) => {
            const isOpen = openId === cat.id;
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-xl border bg-card shadow-sm"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(cat.id)}
                  className="group flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold">{cat.title[lk]}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{cat.description[lk]}</p>
                  </div>
                  <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Expandable content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t px-5 pb-6 pt-5 space-y-5">
                        {/* Description */}
                        <p className="text-sm leading-relaxed text-muted-foreground">{cat.description[lk]}</p>

                        {/* Documents — always visible (free preview) */}
                        <div>
                          <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            <FileText className="h-3.5 w-3.5" /> {l.documents}
                          </h3>
                          <ul className="space-y-1.5">
                            {cat.documents[lk].map((doc, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Steps — free for all */}
                        <div>
                          <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-gold" /> {l.steps}
                          </h3>
                          <ol className="space-y-2">
                            {cat.steps[lk].map((step, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-[10px] font-bold text-gold">
                                  {i + 1}
                                </span>
                                <span className="text-muted-foreground leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Official link + no-online-form fallback */}
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={cat.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {cat.officialLinkLabel}
                          </a>
                          {cat.templateLink && (
                            <a
                              href={cat.templateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                            >
                              <Download className="h-4 w-4" />
                              {l.template}
                            </a>
                          )}
                        </div>
                        {cat.noOnlineForm && (
                          <p className="text-xs text-muted-foreground italic">{l.noOnlineForm}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
