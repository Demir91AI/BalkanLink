import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, CreditCard } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function SteuerIdPoreznaKlasa() {
  return (
    <DolazakPageTemplate
      title="Steuer-ID i porezna klasa"
      subtitle="Porezni identifikacijski broj i porezna klasa – obavezno za svakoga ko radi u Njemačkoj."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko dobija Steuer-ID?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Svako ko prijavi prebivalište u Njemačkoj automatski dobija <strong>Steuer-ID</strong> (porezni identifikacijski broj).</li>
              <li>Steuer-ID je <strong>11-cifreni</strong> broj koji ostaje isti cijeli život.</li>
              <li>Dolazi <strong>poštom</strong> na prijavljenu adresu u roku od 2-4 sedmice nakon Anmeldung-a.</li>
              <li>Potreban je za: zaposlenje, poreznu prijavu, banku, Kindergeld itd.</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Šta je porezna klasa (Steuerklasse)?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Klasa I</strong> — neoženjeni/neudati, razvedeni, udovci.</li>
              <li><strong>Klasa II</strong> — samohrani roditelji.</li>
              <li><strong>Klasa III</strong> — vjenčani, partner zarađuje znatno više (kombinacija sa V).</li>
              <li><strong>Klasa IV</strong> — vjenčani, oba partnera zarađuju slično.</li>
              <li><strong>Klasa V</strong> — vjenčani, partner sa manjom platom (kombinacija sa III).</li>
              <li><strong>Klasa VI</strong> — drugi posao (Nebenjob).</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Prijavi prebivalište</strong> — Steuer-ID se automatski generiše nakon Anmeldung-a.</li>
              <li><strong>Čekaj pismo</strong> — BZSt (Bundeszentralamt für Steuern) šalje Steuer-ID poštom (2-4 sedmice).</li>
              <li><strong>Zapiši broj</strong> — Čuvaj ovaj 11-cifreni broj. Trebat će ti cijeli život u Njemačkoj.</li>
              <li><strong>Predaj poslodavcu</strong> — Poslodavac treba tvoj Steuer-ID i datum rođenja za ELStAM (elektronsku poreznu karticu).</li>
              <li><strong>Provjeri poreznu klasu</strong> — Automatski se dodjeljuje na osnovu bračnog statusa. Provjeri na prvoj platnoj listi.</li>
              <li><strong>Promijeni klasu (ako treba)</strong> — Vjenčani parovi mogu promijeniti kombinaciju klasa putem online portala „Mein ELSTER".</li>
              <li><strong>Ako nisi dobio/la Steuer-ID</strong> — Kontaktiraj BZSt online ili telefonski.</li>
              <li><strong>Razlikuj Steuer-ID od Steuernummer</strong> — Steuer-ID = lični broj (doživotno). Steuernummer = dodjeljuje Finanzamt, može se promijeniti pri seljenju.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: (
            <div>
              <p><strong>Steuer-ID:</strong> Automatski od BZSt (Bundeszentralamt für Steuern) — ne trebaš ništa podnositi.</p>
              <p className="mt-1"><strong>Promjena porezne klase:</strong> Online putem „Mein ELSTER" ili u lokalnom Finanzamt-u.</p>
            </div>
          ),
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Steuer-ID dolazi: <strong>2-4 sedmice</strong> nakon Anmeldung-a.</li>
              <li>Troškovi: <strong>Besplatno</strong>.</li>
              <li>Promjena porezne klase: <strong>Besplatno</strong>, obrada 2-4 sedmice.</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Miješanje Steuer-ID i Steuernummer — to su dva različita broja.</li>
              <li>Izgubiti pismo sa Steuer-ID i ne znati kako ga ponovo zatražiti.</li>
              <li>Ne predati Steuer-ID poslodavcu — rezultat: porez po najvišoj stopi (klasa VI).</li>
              <li>Vjenčani parovi koji ne mijenjaju poreznu klasu i plaćaju previše poreza.</li>
              <li>Čekati predugo sa prvom poreznom prijavom.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "portal", label: "Mein ELSTER (online portal)", url: "https://www.elster.de/eportal/start" },
        { type: "info", label: "BZSt – Steuer-ID info", url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html" },
      ]}
    />
  );
}
