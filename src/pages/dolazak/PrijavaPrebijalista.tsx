import { CheckCircle2, AlertTriangle, Clock, Building2, Users, FileText, ListChecks } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function PrijavaPrebijalista() {
  return (
    <DolazakPageTemplate
      title="Prijava prebivališta (Anmeldung)"
      subtitle="Obavezna registracija adrese u roku od 14 dana nakon useljenja u stan u Njemačkoj."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko treba prijaviti prebivalište?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Svako ko se useljava u stan u Njemačkoj — bez obzira na državljanstvo.</li>
              <li>Građani EU i državljani trećih zemalja.</li>
              <li>I djeca i bebe moraju biti prijavljena.</li>
              <li>Rok: <strong>14 dana</strong> od useljenja (u nekim saveznim zemljama 7 dana).</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Šta ti treba?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Pasoš ili lična karta</strong> (original, ne kopija)</li>
              <li><strong>Potvrda stanodavca</strong> (Wohnungsgeberbestätigung) — stanodavac ti daje ovaj dokument.</li>
              <li><strong>Ugovor o najmu</strong> (preporučljivo, ali ne uvijek obavezno)</li>
              <li>Popunjen <strong>Anmeldung formular</strong> (Anmeldeformular) — dostupan online ili u uredu.</li>
              <li>Eventualno: viza ili dozvola boravka (za državljane trećih zemalja).</li>
              <li>Vjenčani list (ako prijavliuješ supružnika).</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Pronađi nadležni ured</strong> — Bürgerbüro ili Einwohnermeldeamt u tvom gradu. Traži na Google: „Anmeldung + [tvoj grad]".</li>
              <li><strong>Zakaži termin</strong> — Većina gradova zahtijeva online termin. Provjeri web stranicu grada.</li>
              <li><strong>Zatraži Wohnungsgeberbestätigung</strong> — Tvoj stanodavac mora ispuniti i potpisati ovaj dokument. Sadrži: ime stanodavca, adresa stana, datum useljenja.</li>
              <li><strong>Preuzmi i popuni Anmeldeformular</strong> — Dostupan na web stranici grada. Upiši: puno ime, datum rođenja, državljanstvo, bračno stanje, nova adresa, prethodna adresa.</li>
              <li><strong>Pripremi dokumente</strong> — Pasoš + potvrda stanodavca + popunjen formular. Stavi sve u mapu.</li>
              <li><strong>Dođi na termin</strong> — Na šalteru predaješ dokumente. Službenica provjerava podatke i unosi ih u sistem.</li>
              <li><strong>Primi Meldebescheinigung</strong> — Odmah na licu mjesta dobijaš potvrdu o prijavi (Anmeldebestätigung / Meldebescheinigung). Čuvaj ovaj dokument!</li>
              <li><strong>Steuer-ID dolazi poštom</strong> — U roku od 2-4 sedmice dobijaš Steuer-ID na novu adresu.</li>
              <li><strong>Obavijesti poslodavca</strong> — Dostavi novu adresu i Steuer-ID poslodavcu.</li>
              <li><strong>Ažuriraj ostale institucije</strong> — Banka, osiguravajuće kuće, škola za djecu itd.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: <p>U nadležnom <strong>Bürgerbüro</strong> ili <strong>Einwohnermeldeamt</strong> tvog grada. Adresu i termine pronaći na web stranici grada (npr. muenchen.de, berlin.de itd.).</p>,
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Rok: <strong>14 dana</strong> od useljenja.</li>
              <li>Troškovi: <strong>Besplatno</strong> (Anmeldung je besplatna).</li>
              <li>Kazna za kašnjenje: do <strong>1.000 €</strong> (rijetko se primjenjuje, ali moguće).</li>
              <li>Meldebescheinigung dobijaš <strong>odmah na licu mjesta</strong>.</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Kasniti sa prijavom duže od 14 dana — može doći do kazne.</li>
              <li>Zaboraviti Wohnungsgeberbestätigung — bez nje prijava nije moguća.</li>
              <li>Donijeti kopiju pasoša umjesto originala.</li>
              <li>Pogrešna adresa na formularu (mora se poklapati sa ugovorom o najmu).</li>
              <li>Ne zakazati termin — u velikim gradovima se čeka sedmicama bez termina.</li>
              <li>Preskočiti odjavu stare adrese ako se seliš unutar Njemačke.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "Službene informacije (BMI)", url: "https://www.bmi.bund.de/DE/themen/moderne-verwaltung/verwaltungsrecht/meldewesen/meldewesen-node.html" },
      ]}
    />
  );
}
