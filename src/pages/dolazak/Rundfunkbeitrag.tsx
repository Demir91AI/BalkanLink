import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Radio } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function Rundfunkbeitrag() {
  return (
    <DolazakPageTemplate
      title="Rundfunkbeitrag (GEZ)"
      subtitle="Obavezna TV i radio taksa – 18,36 € mjesečno po domaćinstvu."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko mora plaćati?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Svako domaćinstvo</strong> u Njemačkoj plaća Rundfunkbeitrag — neovisno o tome da li koristiš TV/radio.</li>
              <li>Jedan stan = jedan doprinos (18,36 € mjesečno).</li>
              <li>Ako živiš u zajedničkom stanu (WG) — plaća samo jedna osoba.</li>
              <li>Prijava je <strong>obavezna</strong> pri useljenju u stan.</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Prijavi se online</strong> — Na rundfunkbeitrag.de klikni „Wohnung anmelden".</li>
              <li><strong>Unesi podatke</strong> — Ime, adresa, datum useljenja.</li>
              <li><strong>Primi Beitragsnummer</strong> — Dolazi poštom u roku od 2-3 sedmice.</li>
              <li><strong>Postavi SEPA Lastschrift</strong> — Najlakši način: automatsko skidanje sa računa (mjesečno, kvartalno ili godišnje).</li>
              <li><strong>Čuvaj Beitragsnummer</strong> — Treba ti za sve buduće promjene.</li>
            </ol>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Oslobođenje od plaćanja",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Bürgergeld / Sozialhilfe primaoci</strong> — podnesi zahtjev za Befreiung sa aktuelnim rješenjem.</li>
              <li><strong>BAföG primaoci</strong> — sa BAföG rješenjem.</li>
              <li><strong>Osobe sa invaliditetom</strong> — sa odgovarajućim dokazom (RF Merkzeichen).</li>
              <li>Zahtjev za oslobođenje: online na rundfunkbeitrag.de.</li>
            </ul>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: <p>Kompletno <strong>online</strong> na rundfunkbeitrag.de. Nema potrebe za ličnim dolaskom. Sve se radi putem web formulara ili poštom.</p>,
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Prijava: <strong>odmah pri useljenju</strong>.</li>
              <li>Iznos: <strong>18,36 € mjesečno</strong> (55,08 € kvartalno).</li>
              <li>Troškovi prijave: <strong>Besplatno</strong>.</li>
              <li>Dugovi se kumuliraju retroaktivno — ne ignorisati!</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Ignorisati pismo od ARD/ZDF/Deutschlandradio — dugovi rastu sa kamatama.</li>
              <li>Plaćati dvaput u WG — samo jedna osoba prijavljuje domaćinstvo.</li>
              <li>Ne podnijeti zahtjev za oslobođenje iako imaš pravo.</li>
              <li>Zaboraviti odjaviti se pri iseljenju iz Njemačke.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "portal", label: "Rundfunkbeitrag Online", url: "https://www.rundfunkbeitrag.de" },
      ]}
    />
  );
}
