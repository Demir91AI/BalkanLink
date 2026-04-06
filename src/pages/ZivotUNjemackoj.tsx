import { useNavigate } from "react-router-dom";
import PageNavBar from "@/components/navigation/PageNavBar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Eye, TrendingUp, FileText, MessageSquare, Clock,
  AlertTriangle, Plane, CheckCircle, Euro, ListChecks,
  Globe, XCircle, BookOpen, Info, ExternalLink,
} from "lucide-react";

const T: Record<string, Record<string, string>> = {
  bs: {
    pageTitle: "Život i Dolazak u Njemačku",
    pageSubtitle: "Realne informacije za one koji ozbiljno razmišljaju o preseljenju",
    trustBadge: "Stand 2026 — informacije provjerene iz zvaničnih izvora",
    sec1Title: "Kako stvarno izgleda život u Njemačkoj?",
    card1Title: "Visoki troškovi života",
    card1Text: "Stanovanje, hrana i prevoz su znatno skuplji nego u većini balkanskih država, posebno u Münchenu, Frankfurtu i Hamburgu.",
    card2Title: "Stroga administracija",
    card2Text: "Njemačka je birokratska zemlja. Svaki korak zahtijeva dokumente, rokove i strpljenje. Nema 'improvizacije'.",
    card3Title: "Jezik je ključ",
    card3Text: "Bez njemačkog jezika, napredak je gotovo nemoguć. B2 nivo je praktični minimum za većinu radnih mjesta.",
    card4Title: "Radna kultura",
    card4Text: "Tačnost, odgovornost i disciplina nisu opcija — to je standard. Kašnjenje ili neozbiljnost se ne tolerišu.",
    realityTitle: "Realno stanje",
    realityText: "Prvih 3–6 mjeseci su najteži. Bez jezika i jasnog plana, dolazak može biti izuzetno stresan — finansijski i psihički. Priprema je sve.",
    sec2Title: "Kako možeš doći u Njemačku?",
    way1Tag: "§18 AufenthG", way1Title: "Radna viza",
    way1Desc: "Za kvalificirane radnike sa priznatom diplomom ili stručnom kvalifikacijom. Potreban je ugovor o radu i dokaz o kvalifikaciji.",
    way1For: "Za: Stručnjaci, IT, zdravstvo, zanatstvo",
    way2Tag: "§16a AufenthG", way2Title: "Ausbildung (stručno obrazovanje)",
    way2Desc: "Njemački sistem obuke koji kombinuje rad i školovanje. Traje 2–3 godine. Firma plaća malu platu tokom obuke.",
    way2For: "Za: Mlade do ~35 godina, osnovno njemačko znanje",
    way3Tag: "§16b AufenthG", way3Title: "Studij",
    way3Desc: "Upis na njemački univerzitet ili Fachhochschule. Potrebna je nostrifikacija diplome ili matura. Studij je besplatan na državnim univerzitetima.",
    way3For: "Za: Maturanti i studenti, B2/C1 njemački ili engleski",
    way4Tag: "Porodično pravo", way4Title: "Spajanje porodice",
    way4Desc: "Ako već imaš člana porodice sa boravišnom dozvolom ili državljanstvom u Njemačkoj, možeš aplicirati na osnovu porodičnog spajanja.",
    way4For: "Za: Bračni partneri, djeca, roditelji (u nekim slučajevima)",
    wayCta: "Pogledaj u Viza Navigatoru →",
    sec3Title: "Šta ti je potrebno?",
    req1Title: "Njemački jezik", req1Text: "Minimum B1, realno B2 za većinu poslova. Za Ausbildung je prihvatljiv B1.",
    req2Title: "Ugovor ili prihvatnica", req2Text: "Ugovor o radu, Ausbildungsvertrag ili pismo o prijemu na fakultet — bez toga nema vize.",
    req3Title: "Važeći pasoš", req3Text: "Pasoš mora biti važeći još najmanje 6 mjeseci od datuma podnošenja zahtjeva.",
    req4Title: "Pripremljeni dokumenti", req4Text: "CV na njemačkom, diplome, certifikati, izvod iz matične knjige, motivaciono pismo.",
    req5Title: "Strpljenje i rezervni plan", req5Text: "Procesi traju sedmicama ili mjesecima. Ambasade imaju dugo čekanje na termine. Planiraj unaprijed.",
    sec4Title: "Koliko novca treba za početak?",
    minLabel: "Apsolutni minimum", minAmount: "1.500€ – 2.500€", minNote: "Rizično — bez rezerve za neočekivane troškove",
    recLabel: "Preporučeni iznos", recAmount: "3.000€ – 6.000€", recNote: "Daje sigurnost za prve 2–3 mjeseca",
    exp1: "🏠 Kirija (WG soba): 400€ – 900€/mj ovisno o gradu",
    exp2: "🔑 Kaution (depozit): 1–3 mjesečne kirije (jednokratno)",
    exp3: "🛒 Hrana i osnovni troškovi: 300€ – 500€/mj",
    exp4: "🚌 Prevoz: 80€ – 120€/mj (javni prevoz)",
    expNote: "Iznosi se značajno razlikuju po gradu. München i Frankfurt su znatno skuplji od Dresdena, Erfurta ili manjih gradova.",
    sec5Title: "Kako početi? — Korak po korak",
    step1Title: "Odluči šta želiš", step1Text: "Rad, Ausbildung ili studij? Svaki put zahtijeva drugačiji pristup i drugačiju pripremu.",
    step2Title: "Pronađi konkretnu ponudu", step2Text: "Posao, Ausbildungsplatz ili upis na fakultet. Bez konkretne ponude, viza se ne može dobiti.",
    step3Title: "Pripremi dokumentaciju", step3Text: "CV na njemačkom, prevedene i apostilirane diplome, certifikati o jeziku, motivaciono pismo.",
    step4Title: "Zakaži termin u ambasadi", step4Text: "Termini su često popunjeni sedmicama unaprijed. Pripremi sve dokumente PRIJE zakazivanja.",
    step5Title: "Podnesi zahtjev za vizu", step5Text: "Lično u ambasadi. Donesi original i kopije svih dokumenata. Očekuj odluku za 4–12 sedmica.",
    step6Title: "Nakon dolaska: Anmeldung i boravišna dozvola", step6Text: "Prijava adrese (Anmeldung) je obavezna u roku od 14 dana. Zatim zakazivanje u Ausländerbehörde.",
    sec6Title: "Dolazak iz tvoje države",
    sec6Cta: "Za detaljne vizne tokove po državi, koristi Viza Navigator →",
    sec7Title: "Greške koje ljudi prave",
    err1Title: "Dolazak bez plana", err1Text: "Dolazak u Njemačku sa ciljem 'naći ću nešto' gotovo uvijek završava loše. Bez ugovora nema legalnog statusa.",
    err2Title: "Nedovoljno znanje jezika", err2Text: "Mnogi dolaze s A2/B1 i očekuju da će naći posao. Realnost je drugačija — bez B2 napredak je spor i frustrirajući.",
    err3Title: "Vjerovanje neprovjerenim agentima", err3Text: "Agencije koje obećavaju 'siguran posao u Njemačkoj' često naplaćuju usluge za koje ne treba plaćati ili su direktno prevara.",
    err4Title: "Nedovoljno finansijskih rezervi", err4Text: "Dolazak s manje od 2.000€ bez osiguranog smještaja je visokorizičan. Prva plata dolazi tek nakon 4–6 sedmica rada.",
    err5Title: "Pogrešna vrsta vize", err5Text: "Dolazak na turističku vizu sa ciljem traženja posla je ilegalno i može rezultovati zabranom ulaska u Schengen.",
    sec8Title: "Zvanični izvori informacija",
    sec8Intro: "Sve informacije na ovoj stranici zasnovane su na sljedećim zvaničnim izvorima. Direktno provjeri aktualne uslove.",
    src1Name: "Bundesagentur für Arbeit", src1Desc: "Zvanična agencija za zapošljavanje. Podaci o tržištu rada, Ausbildung i priznavanju kvalifikacija.",
    src2Name: "Make it in Germany", src2Desc: "Zvanični portal njemačke vlade za kvalificirane radnike iz inostranstva.",
    src3Name: "BAMF", src3Desc: "Savezni ured za migracije. Informacije o vizama, integraciji i jezičnim kursevima.",
    src4Name: "Auswärtiges Amt", src4Desc: "Njemačko Ministarstvo vanjskih poslova. Vizne informacije i lista potrebnih dokumenata.",
    visit: "Posjeti →",
    ctaTitle: "Spreman/na za sljedeći korak?",
    ctaVisa: "Viza Navigator →",
    ctaDeutsch: "BalkanLink Deutsch →",
    ctaForms: "Formulari →",
  },
  de: {
    pageTitle: "Leben & Einreise nach Deutschland",
    pageSubtitle: "Realistische Informationen für alle, die ernsthaft über einen Umzug nachdenken",
    trustBadge: "Stand 2026 — Informationen aus offiziellen Quellen geprüft",
    sec1Title: "Wie sieht das Leben in Deutschland wirklich aus?",
    card1Title: "Hohe Lebenshaltungskosten",
    card1Text: "Wohnen, Essen und Transport sind deutlich teurer als in den meisten Balkanländern, besonders in München, Frankfurt und Hamburg.",
    card2Title: "Strenge Bürokratie",
    card2Text: "Deutschland ist ein bürokratisches Land. Jeder Schritt erfordert Dokumente, Fristen und Geduld. Es gibt kein 'Improvisieren'.",
    card3Title: "Sprache ist der Schlüssel",
    card3Text: "Ohne Deutsch ist Fortschritt nahezu unmöglich. B2 ist das praktische Minimum für die meisten Arbeitsplätze.",
    card4Title: "Arbeitskultur",
    card4Text: "Pünktlichkeit, Verantwortung und Disziplin sind keine Option — sie sind Standard. Verspätungen oder Unzuverlässigkeit werden nicht toleriert.",
    realityTitle: "Die Realität",
    realityText: "Die ersten 3–6 Monate sind die schwierigsten. Ohne Sprache und klaren Plan kann die Ankunft extrem stressig sein — finanziell und psychisch. Vorbereitung ist alles.",
    sec2Title: "Wie kannst du nach Deutschland kommen?",
    way1Tag: "§18 AufenthG", way1Title: "Arbeitsvisum",
    way1Desc: "Für qualifizierte Arbeitnehmer mit anerkanntem Abschluss oder Berufsqualifikation. Ein Arbeitsvertrag und Qualifikationsnachweis sind erforderlich.",
    way1For: "Für: Fachkräfte, IT, Gesundheit, Handwerk",
    way2Tag: "§16a AufenthG", way2Title: "Ausbildung (Berufsausbildung)",
    way2Desc: "Das deutsche Ausbildungssystem kombiniert Arbeit und Schule. Dauer: 2–3 Jahre. Das Unternehmen zahlt ein kleines Gehalt während der Ausbildung.",
    way2For: "Für: Junge Menschen bis ~35 Jahre, Grundkenntnisse Deutsch",
    way3Tag: "§16b AufenthG", way3Title: "Studium",
    way3Desc: "Einschreibung an einer deutschen Universität oder Fachhochschule. Anerkennung des Abschlusses oder Abitur erforderlich. Studium ist an staatlichen Unis kostenlos.",
    way3For: "Für: Abiturienten und Studenten, B2/C1 Deutsch oder Englisch",
    way4Tag: "Familienrecht", way4Title: "Familiennachzug",
    way4Desc: "Wenn du bereits ein Familienmitglied mit Aufenthaltserlaubnis oder Staatsangehörigkeit in Deutschland hast, kannst du auf Basis des Familiennachzugs beantragen.",
    way4For: "Für: Ehepartner, Kinder, Eltern (in bestimmten Fällen)",
    wayCta: "Im Visa Navigator ansehen →",
    sec3Title: "Was brauchst du?",
    req1Title: "Deutsche Sprache", req1Text: "Minimum B1, realistisch B2 für die meisten Jobs. Für Ausbildung ist B1 akzeptabel.",
    req2Title: "Vertrag oder Zulassung", req2Text: "Arbeitsvertrag, Ausbildungsvertrag oder Zulassungsbescheid — ohne das gibt es kein Visum.",
    req3Title: "Gültiger Reisepass", req3Text: "Der Pass muss noch mindestens 6 Monate ab Antragsdatum gültig sein.",
    req4Title: "Vorbereitete Dokumente", req4Text: "Lebenslauf auf Deutsch, Diplome, Zertifikate, Geburtsurkunde, Motivationsschreiben.",
    req5Title: "Geduld und Plan B", req5Text: "Prozesse dauern Wochen oder Monate. Botschaften haben lange Wartezeiten. Plane voraus.",
    sec4Title: "Wie viel Geld brauchst du am Anfang?",
    minLabel: "Absolutes Minimum", minAmount: "1.500€ – 2.500€", minNote: "Riskant — keine Reserve für unerwartete Kosten",
    recLabel: "Empfohlener Betrag", recAmount: "3.000€ – 6.000€", recNote: "Gibt Sicherheit für die ersten 2–3 Monate",
    exp1: "🏠 Miete (WG-Zimmer): 400€ – 900€/Monat je nach Stadt",
    exp2: "🔑 Kaution: 1–3 Monatsmieten (einmalig)",
    exp3: "🛒 Lebensmittel und Grundkosten: 300€ – 500€/Monat",
    exp4: "🚌 Transport: 80€ – 120€/Monat (ÖPNV)",
    expNote: "Die Beträge unterscheiden sich erheblich je nach Stadt. München und Frankfurt sind deutlich teurer als Dresden, Erfurt oder kleinere Städte.",
    sec5Title: "Wie anfangen? — Schritt für Schritt",
    step1Title: "Entscheide was du willst", step1Text: "Arbeit, Ausbildung oder Studium? Jeder Weg erfordert einen anderen Ansatz und andere Vorbereitung.",
    step2Title: "Finde ein konkretes Angebot", step2Text: "Job, Ausbildungsplatz oder Uni-Zulassung. Ohne konkretes Angebot kann kein Visum beantragt werden.",
    step3Title: "Bereite die Dokumente vor", step3Text: "Lebenslauf auf Deutsch, übersetzte und apostillierte Diplome, Sprachzertifikate, Motivationsschreiben.",
    step4Title: "Termin bei der Botschaft", step4Text: "Termine sind oft wochenlang ausgebucht. Bereite alle Dokumente VOR der Terminbuchung vor.",
    step5Title: "Visumantrag einreichen", step5Text: "Persönlich bei der Botschaft. Originale und Kopien aller Dokumente mitbringen. Bearbeitungszeit: 4–12 Wochen.",
    step6Title: "Nach der Ankunft: Anmeldung und Aufenthaltstitel", step6Text: "Anmeldung innerhalb von 14 Tagen Pflicht. Danach Termin bei der Ausländerbehörde.",
    sec6Title: "Einreise aus deinem Land",
    sec6Cta: "Für detaillierte Visa-Flows pro Land nutze den Visa Navigator →",
    sec7Title: "Häufige Fehler",
    err1Title: "Ankunft ohne Plan", err1Text: "Nach Deutschland kommen mit dem Ziel 'ich werde schon etwas finden' endet fast immer schlecht. Ohne Vertrag kein legaler Status.",
    err2Title: "Unzureichende Sprachkenntnisse", err2Text: "Viele kommen mit A2/B1 und erwarten einen Job zu finden. Die Realität ist anders — ohne B2 ist Fortschritt langsam.",
    err3Title: "Vertrauen in unseriöse Agenten", err3Text: "Agenturen, die 'sichere Jobs in Deutschland' versprechen, verlangen oft Gebühren für Leistungen, die kostenlos sein sollten.",
    err4Title: "Unzureichende Finanzreserven", err4Text: "Ankunft mit weniger als 2.000€ ohne gesicherte Unterkunft ist hochriskant. Das erste Gehalt kommt erst nach 4–6 Wochen.",
    err5Title: "Falsche Visumkategorie", err5Text: "Einreise mit Touristenvisum zum Zweck der Jobsuche ist illegal und kann zu einem Schengen-Einreiseverbot führen.",
    sec8Title: "Offizielle Informationsquellen",
    sec8Intro: "Alle Informationen auf dieser Seite basieren auf den folgenden offiziellen Quellen. Prüfe direkt die aktuellen Bedingungen.",
    src1Name: "Bundesagentur für Arbeit", src1Desc: "Offizielle Arbeitsagentur. Daten zum Arbeitsmarkt, Ausbildung und Anerkennung von Qualifikationen.",
    src2Name: "Make it in Germany", src2Desc: "Offizielles Portal der Bundesregierung für Fachkräfte aus dem Ausland.",
    src3Name: "BAMF", src3Desc: "Bundesamt für Migration und Flüchtlinge. Informationen zu Visa, Integration und Sprachkursen.",
    src4Name: "Auswärtiges Amt", src4Desc: "Auswärtiges Amt. Visa-Informationen und erforderliche Dokumente.",
    visit: "Besuchen →",
    ctaTitle: "Bereit für den nächsten Schritt?",
    ctaVisa: "Visa Navigator →",
    ctaDeutsch: "BalkanLink Deutsch →",
    ctaForms: "Formulare →",
  },
};

const COUNTRIES = [
  { flag: "🇧🇦", name: "Bosna i Hercegovina", nameDe: "Bosnien und Herzegowina", embassy: "Njemačka ambasada Sarajevo", embassyDe: "Deutsche Botschaft Sarajevo", note: "Termini su često popunjeni 6–10 sedmica unaprijed. Planiraj na vrijeme.", noteDe: "Termine sind oft 6–10 Wochen im Voraus ausgebucht. Plane rechtzeitig." },
  { flag: "🇷🇸", name: "Srbija", nameDe: "Serbien", embassy: "Njemačka ambasada Beograd", embassyDe: "Deutsche Botschaft Belgrad", note: "Zahtjev se podnosi lično. Visoka tražnja — termini se pune brzo.", noteDe: "Antrag persönlich einreichen. Hohe Nachfrage — Termine füllen sich schnell." },
  { flag: "🇭🇷", name: "Hrvatska", nameDe: "Kroatien", embassy: "Njemačka ambasada Zagreb", embassyDe: "Deutsche Botschaft Zagreb", note: "Kao članica EU, Hrvati imaju slobodu kretanja i rada — viza za EU državljane nije potrebna.", noteDe: "Als EU-Mitglied haben Kroaten Freizügigkeit — kein Visum erforderlich." },
  { flag: "🇲🇪", name: "Crna Gora", nameDe: "Montenegro", embassy: "Njemačka ambasada Podgorica", embassyDe: "Deutsche Botschaft Podgorica", note: "Proces sličan BiH i Srbiji. Dodatni terminski pritisak u ljetnim mjesecima.", noteDe: "Ähnlicher Prozess wie BiH und Serbien. Zusätzlicher Termindruck im Sommer." },
  { flag: "🇲🇰", name: "Sjeverna Makedonija", nameDe: "Nordmazedonien", embassy: "Njemačka ambasada Skoplje", embassyDe: "Deutsche Botschaft Skopje", note: "Schengen viza i radna viza se podnose odvojeno. Provjeriti aktuelne uslove.", noteDe: "Schengen-Visum und Arbeitsvisum werden getrennt beantragt." },
  { flag: "🇦🇱", name: "Albanija", nameDe: "Albanien", embassy: "Njemačka ambasada Tirana", embassyDe: "Deutsche Botschaft Tirana", note: "Visoka tražnja za Ausbildung vizom. Preporučuje se rano apliciranje.", noteDe: "Hohe Nachfrage nach Ausbildungsvisum. Frühzeitige Bewerbung empfohlen." },
];

const SOURCES = [
  { url: "https://www.arbeitsagentur.de", key: "src1" },
  { url: "https://www.make-it-in-germany.com", key: "src2" },
  { url: "https://www.bamf.de", key: "src3" },
  { url: "https://www.auswaertiges-amt.de", key: "src4" },
];

export default function ZivotUNjemackoj() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lang = (language === "de") ? "de" : "bs";
  const t = (key: string) => T[lang]?.[key] ?? T.bs[key] ?? key;

  const ways = [
    { tagKey: "way1Tag", titleKey: "way1Title", descKey: "way1Desc", forKey: "way1For" },
    { tagKey: "way2Tag", titleKey: "way2Title", descKey: "way2Desc", forKey: "way2For" },
    { tagKey: "way3Tag", titleKey: "way3Title", descKey: "way3Desc", forKey: "way3For" },
    { tagKey: "way4Tag", titleKey: "way4Title", descKey: "way4Desc", forKey: "way4For" },
  ];

  const reqs = [
    { titleKey: "req1Title", textKey: "req1Text" },
    { titleKey: "req2Title", textKey: "req2Text" },
    { titleKey: "req3Title", textKey: "req3Text" },
    { titleKey: "req4Title", textKey: "req4Text" },
    { titleKey: "req5Title", textKey: "req5Text" },
  ];

  const steps = [
    { titleKey: "step1Title", textKey: "step1Text" },
    { titleKey: "step2Title", textKey: "step2Text" },
    { titleKey: "step3Title", textKey: "step3Text" },
    { titleKey: "step4Title", textKey: "step4Text" },
    { titleKey: "step5Title", textKey: "step5Text" },
    { titleKey: "step6Title", textKey: "step6Text" },
  ];

  const errors = [
    { titleKey: "err1Title", textKey: "err1Text" },
    { titleKey: "err2Title", textKey: "err2Text" },
    { titleKey: "err3Title", textKey: "err3Text" },
    { titleKey: "err4Title", textKey: "err4Text" },
    { titleKey: "err5Title", textKey: "err5Text" },
  ];

  const SectionTitle = ({ icon: Icon, title, color = "#2D2D2D" }: { icon: any; title: string; color?: string }) => (
    <div className="flex items-center gap-2.5 mb-5">
      <Icon className="h-5 w-5 shrink-0" style={{ color }} />
      <h2 className="text-xl font-bold" style={{ color }}>{title}</h2>
    </div>
  );

  const cardIcons = [TrendingUp, FileText, MessageSquare, Clock];

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <PageNavBar />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-6 text-[13px]">
          <button onClick={() => navigate("/")} className="text-[#9CA3AF] hover:underline">
            {lang === "de" ? "Startseite" : "Početna"}
          </button>
          <span className="text-[#9CA3AF]">›</span>
          <span className="text-[#2D2D2D] font-medium">{t("pageTitle")}</span>
        </nav>

        {/* Header */}
        <div className="rounded-2xl p-6 sm:p-10 mb-8" style={{ background: "linear-gradient(135deg, #1a3a5c, #2d6a9f)" }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t("pageTitle")}</h1>
          <p className="text-white/80 text-sm sm:text-base mb-4">{t("pageSubtitle")}</p>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/70 bg-white/15 px-3 py-1 rounded-full">
            <Info className="h-3 w-3" /> {t("trustBadge")}
          </span>
        </div>

        {/* SECTION 1 — Reality Check */}
        <section className="mb-8">
          <SectionTitle icon={Eye} title={t("sec1Title")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {["card1", "card2", "card3", "card4"].map((k, i) => {
              const Icon = cardIcons[i];
              return (
                <div key={k} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <Icon className="h-5 w-5 text-[#2d6a9f] mb-2" />
                  <h3 className="font-bold text-[#2D2D2D] mb-1">{t(`${k}Title`)}</h3>
                  <p className="text-sm text-[#6B6B6B]">{t(`${k}Text`)}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-lg p-4 border-l-4 border-amber-400" style={{ background: "#fffbeb" }}>
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#2D2D2D] mb-1">{t("realityTitle")}</p>
                <p className="text-sm text-[#6B6B6B]">{t("realityText")}</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 2 — Ways */}
        <section className="mb-8">
          <SectionTitle icon={Plane} title={t("sec2Title")} />
          <div className="flex flex-col gap-4">
            {ways.map((w) => (
              <div key={w.tagKey} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <span className="inline-block text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#e8f4fd] text-[#2d6a9f] mb-2">
                  {t(w.tagKey)}
                </span>
                <h3 className="font-bold text-[#2D2D2D] mb-1">{t(w.titleKey)}</h3>
                <p className="text-sm text-[#6B6B6B] mb-2">{t(w.descKey)}</p>
                <p className="text-xs text-[#9CA3AF] mb-3">{t(w.forKey)}</p>
                <button onClick={() => navigate("/viza")} className="text-sm font-semibold text-[#2d6a9f] hover:underline">
                  {t("wayCta")}
                </button>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 3 — Requirements */}
        <section className="mb-8">
          <SectionTitle icon={CheckCircle} title={t("sec3Title")} />
          <div className="flex flex-col gap-3">
            {reqs.map((r) => (
              <div key={r.titleKey} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2D2D2D]">{t(r.titleKey)}</p>
                  <p className="text-sm text-[#6B6B6B]">{t(r.textKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 4 — Finances */}
        <section className="mb-8">
          <SectionTitle icon={Euro} title={t("sec4Title")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl border border-red-200 p-5" style={{ background: "#fff1f2" }}>
              <p className="text-2xl font-bold text-[#2D2D2D] mb-1">{t("minAmount")}</p>
              <p className="text-sm font-semibold text-[#2D2D2D] mb-1">{t("minLabel")}</p>
              <p className="text-xs text-[#6B6B6B]">{t("minNote")}</p>
            </div>
            <div className="rounded-xl border border-green-200 p-5" style={{ background: "#f0fdf4" }}>
              <p className="text-2xl font-bold text-[#2D2D2D] mb-1">{t("recAmount")}</p>
              <p className="text-sm font-semibold text-[#2D2D2D] mb-1">{t("recLabel")}</p>
              <p className="text-xs text-[#6B6B6B]">{t("recNote")}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {["exp1", "exp2", "exp3", "exp4"].map((k) => (
              <p key={k} className="text-sm text-[#2D2D2D]">{t(k)}</p>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] bg-gray-50 rounded-lg p-3">{t("expNote")}</p>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 5 — Steps */}
        <section className="mb-8">
          <SectionTitle icon={ListChecks} title={t("sec5Title")} />
          <div className="relative pl-8">
            <div className="absolute left-3 top-1 bottom-1 w-0.5 bg-[#2d6a9f]/20" />
            <div className="flex flex-col gap-6">
              {steps.map((s, i) => (
                <div key={s.titleKey} className="relative">
                  <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-[#2d6a9f] text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="font-bold text-[#2D2D2D]">{t(s.titleKey)}</p>
                  <p className="text-sm text-[#6B6B6B]">{t(s.textKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 6 — Countries */}
        <section className="mb-8">
          <SectionTitle icon={Globe} title={t("sec6Title")} />
          <div className="flex flex-col gap-3 mb-4">
            {COUNTRIES.map((c) => (
              <div key={c.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
                <span className="text-2xl shrink-0">{c.flag}</span>
                <div className="min-w-0">
                  <p className="font-bold text-[#2D2D2D]">{lang === "de" ? c.nameDe : c.name}</p>
                  <p className="text-sm text-[#6B6B6B]">{lang === "de" ? c.embassyDe : c.embassy}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{lang === "de" ? c.noteDe : c.note}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/viza")} className="text-sm font-semibold text-[#2d6a9f] hover:underline flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5" /> {t("sec6Cta")}
          </button>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 7 — Mistakes */}
        <section className="mb-8">
          <SectionTitle icon={XCircle} title={t("sec7Title")} color="#DC2626" />
          <div className="flex flex-col gap-3">
            {errors.map((e) => (
              <div key={e.titleKey} className="rounded-lg p-4 border-l-4 border-red-400 bg-red-50/50">
                <p className="font-bold text-[#2D2D2D] mb-1">❌ {t(e.titleKey)}</p>
                <p className="text-sm text-[#6B6B6B]">{t(e.textKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-t border-gray-100 my-8" />

        {/* SECTION 8 — Sources */}
        <section className="mb-8">
          <SectionTitle icon={BookOpen} title={t("sec8Title")} />
          <p className="text-sm text-[#6B6B6B] mb-5">{t("sec8Intro")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOURCES.map((s) => (
              <div key={s.key} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-[#2d6a9f]" />
                </div>
                <p className="font-bold text-[#2D2D2D] mb-1">{t(`${s.key}Name`)}</p>
                <p className="text-sm text-[#6B6B6B] mb-3">{t(`${s.key}Desc`)}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2d6a9f] hover:underline">
                  {t("visit")}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Strip */}
        <div className="rounded-2xl p-6 sm:p-10 text-center" style={{ background: "linear-gradient(135deg, #1a3a5c, #2d6a9f)" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">{t("ctaTitle")}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => navigate("/viza")} className="px-5 py-2.5 rounded-lg bg-white text-[#1a3a5c] font-semibold text-sm hover:bg-white/90 transition-colors">
              {t("ctaVisa")}
            </button>
            <button onClick={() => navigate("/deutsch-trainer")} className="px-5 py-2.5 rounded-lg border border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              {t("ctaDeutsch")}
            </button>
            <button onClick={() => navigate("/formulari")} className="px-5 py-2.5 rounded-lg border border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              {t("ctaForms")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
