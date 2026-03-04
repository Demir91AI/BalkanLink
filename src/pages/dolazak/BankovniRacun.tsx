import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Landmark } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function BankovniRacun() {
  return (
    <DolazakPageTemplate
      title="Otvaranje bankovnog računa"
      subtitle="Račun u banci je neophodan za prijem plate, plaćanje stanarine i sve ugovore u Njemačkoj."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko treba bankovni račun?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Svako ko živi i radi u Njemačkoj treba <strong>Girokonto</strong> (tekući račun).</li>
              <li>Potreban za: platu, stanarinu (Miete), zdravstveno osiguranje, GEZ, mobilni ugovor itd.</li>
              <li>Po zakonu (Zahlungskontengesetz) svako ima pravo na <strong>Basiskonto</strong> — čak i bez stalnog boravka.</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Šta ti treba?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Pasoš ili lična karta</strong> (original).</li>
              <li><strong>Meldebescheinigung</strong> (potvrda o prijavljenoj adresi).</li>
              <li>Eventualno: <strong>Aufenthaltstitel</strong> (dozvola boravka) za državljane trećih zemalja.</li>
              <li>Neki banke zahtijevaju: <strong>Steuer-ID</strong> ili ugovor o radu.</li>
              <li>Za online banke: smartphone sa NFC za VideoIdent postupak.</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Odaberi tip banke</strong> — Filijalska (Sparkasse, Volksbank, Commerzbank, Deutsche Bank) ili online banka (N26, DKB, ING, Comdirect).</li>
              <li><strong>Uporedi uslove</strong> — Mjesečna naknada, bankomat mreža, online banking, kartice.</li>
              <li><strong>Online prijava ili termin u filijali</strong> — Online banke: registracija putem aplikacije. Filijalske: zakaži termin.</li>
              <li><strong>Identifikacija (VideoIdent/PostIdent)</strong> — Online: video poziv sa pokazivanjem pasoša. Filijala: identifikacija na šalteru. Pošta: PostIdent u pošti.</li>
              <li><strong>Popuni podatke</strong> — Ime, adresa, datum rođenja, državljanstvo, Steuer-ID (ako ga imaš), zaposlenje.</li>
              <li><strong>Potpis i aktivacija</strong> — Digitalni ili fizički potpis ugovora.</li>
              <li><strong>Primi karticu i PIN</strong> — Girokard i/ili debitna Visa/Mastercard stižu poštom (5-10 radnih dana).</li>
              <li><strong>Aktiviraj online banking</strong> — Prijavi se u aplikaciju ili web portal banke.</li>
              <li><strong>Postavi trajne naloge</strong> — Stanarina, osiguranje, struja — postavi Dauerauftrag ili SEPA Lastschrift.</li>
              <li><strong>Obavijesti poslodavca</strong> — Dostavi IBAN za isplatu plate.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: <p>U filijali izabrane banke ili online putem aplikacije banke. <strong>Sparkasse</strong> i <strong>Volksbank</strong> imaju najgušću mrežu filijala. Online banke (N26, DKB) rade potpuno digitalno.</p>,
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Otvaranje: <strong>isti dan</strong> (online) ili <strong>1-3 radna dana</strong> (filijala).</li>
              <li>Kartica stiže: <strong>5-10 radnih dana</strong>.</li>
              <li>Troškovi: <strong>0 € – 10 € mjesečno</strong> (zavisno od banke i paketa).</li>
              <li>Basiskonto (osnovno pravo): maks. <strong>~8 € mjesečno</strong>.</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Pokušaj otvaranja računa bez Meldebescheinigung — većina banaka ga zahtijeva.</li>
              <li>Ne provjeriti Schufa uticaj — neke banke traže Schufa provjeru. Basiskonto ne zahtijeva.</li>
              <li>Odabrati skupi paket umjesto besplatnog računa.</li>
              <li>Zaboraviti ažurirati IBAN kod poslodavca nakon promjene banke.</li>
              <li>Ne aktivirati online banking — većina usluga u Njemačkoj se plaća preko banke.</li>
            </ul>
          ),
        },
      ]}
      links={[]}
    />
  );
}
