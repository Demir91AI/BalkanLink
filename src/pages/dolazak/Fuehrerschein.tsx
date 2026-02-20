import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Car } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function Fuehrerschein() {
  return (
    <DolazakPageTemplate
      title="Vozačka dozvola – zamjena i priznavanje"
      subtitle="Da li tvoja vozačka dozvola važi u Njemačkoj? Šta trebaš uraditi i do kada."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Koga se tiče?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>EU/EEA dozvole</strong> — važe neograničeno u Njemačkoj. Samo administrativna zamjena po isteku.</li>
              <li><strong>Dozvole iz Bosne, Srbije, Crne Gore, Sjeverne Makedonije</strong> — važe <strong>6 mjeseci</strong> nakon prijave prebivališta. Zatim obavezna zamjena.</li>
              <li><strong>Kosovo, Albanija</strong> — dozvola ne važi. Potreban potpuno novi ispit (teorija + praktični).</li>
              <li><strong>Turska</strong> — djelomično priznata, zavisi od savezne države.</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak (zamjena)",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Provjeri status svoje dozvole</strong> — Na web stranici Fahrerlaubnisbehörde provjeri da li tvoja zemlja ima sporazum sa Njemačkom.</li>
              <li><strong>Zakaži termin</strong> — Kod Fahrerlaubnisbehörde (odjel za vozačke dozvole) tvog grada.</li>
              <li><strong>Pripremi dokumente</strong> — Originalna dozvola, pasoš, Meldebescheinigung, biometrijska fotografija, Sehtest (test vida), Erste-Hilfe-Kurs (tečaj prve pomoći).</li>
              <li><strong>Podnesi zahtjev</strong> — Na terminu predaj sve dokumente. Plati naknadu.</li>
              <li><strong>Čekaj novu dozvolu</strong> — Obrada traje 4-8 sedmica. U međuvremenu dobijaš privremenu potvrdu.</li>
              <li><strong>Preuzmi novu dozvolu</strong> — Stara dozvola se zadržava ili poništava (zavisno od zemlje).</li>
            </ol>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Potrebni dokumenti",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Originalna vozačka dozvola</strong> + ovjereni prijevod (od sudskog tumača)</li>
              <li><strong>Pasoš ili lična karta</strong></li>
              <li><strong>Meldebescheinigung</strong></li>
              <li><strong>Biometrijska fotografija</strong> (35x45mm)</li>
              <li><strong>Sehtest</strong> (test vida – optičar ili okulista, košta ~7 €)</li>
              <li><strong>Erste-Hilfe-Kurs</strong> (tečaj prve pomoći – obavezno ako nikada polagao u EU)</li>
              <li>Eventualno: <strong>MPU</strong> (medicinsko-psihološki pregled) u posebnim slučajevima</li>
            </ul>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: <p>Kod <strong>Fahrerlaubnisbehörde</strong> tvog grada (dio Bürgeramt ili Ordnungsamt). Termin obavezno zakazati unaprijed putem web stranice grada.</p>,
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Rok za zamjenu: <strong>6 mjeseci</strong> od Anmeldung-a (za BiH, SRB, MNE, MKD).</li>
              <li>Troškovi zamjene: <strong>35–45 €</strong>.</li>
              <li>Sehtest: <strong>~7 €</strong>.</li>
              <li>Erste-Hilfe-Kurs: <strong>30–50 €</strong>.</li>
              <li>Ovjereni prijevod: <strong>30–80 €</strong>.</li>
              <li>Obrada: <strong>4-8 sedmica</strong>.</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Propustiti rok od 6 mjeseci — nakon toga voziš <strong>nelegalno</strong> (krivično djelo!).</li>
              <li>Ne napraviti ovjereni prijevod dozvole.</li>
              <li>Zaboraviti Sehtest ili Erste-Hilfe-Kurs — bez njih zahtjev je nepotpun.</li>
              <li>Misliti da EU dozvola zahtijeva zamjenu — ne, važi neograničeno.</li>
              <li>Voziti sa kosovskom dozvolom misleći da važi — ne važi, potreban novi ispit.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "BMVI – Führerschein Info", url: "https://www.bmvi.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/gueltigkeit-auslaendischer-fahrerlaubnisse-in-deutschland.html" },
        { type: "info", label: "Fahrerlaubnis-Infos (KBA)", url: "https://www.kba.de/DE/Themen/ZentraleRegister/FAER/faer_node.html" },
      ]}
    />
  );
}
