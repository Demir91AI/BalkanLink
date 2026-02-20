import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Car } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function AutoAnmelden() {
  return (
    <DolazakPageTemplate
      title="Auto anmelden (Kfz-Zulassung)"
      subtitle="Registracija vozila u Njemačkoj – koraci, dokumenti i troškovi."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko mora prijaviti auto?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Svako ko kupuje auto u Njemačkoj mora ga <strong>prijaviti</strong> (Zulassung) prije vožnje.</li>
              <li>Ako donosiš auto iz inostranstva: <strong>umprijaviti</strong> u roku od mjesec dana.</li>
              <li>Korišteni auti iz EU moraju proći <strong>HU/TÜV</strong> provjeru.</li>
              <li>Bez registracije vožnja je <strong>ilegalna</strong> (osim sa Kurzzeitkennzeichen).</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Potrebni dokumenti",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Pasoš ili lična karta</strong></li>
              <li><strong>Meldebescheinigung</strong> (prijava prebivališta)</li>
              <li><strong>Fahrzeugbrief</strong> (Zulassungsbescheinigung Teil II) — dokaz vlasništva</li>
              <li><strong>Fahrzeugschein</strong> (Zulassungsbescheinigung Teil I) — kod preregistracije</li>
              <li><strong>HU/TÜV Bericht</strong> — važeći tehnički pregled</li>
              <li><strong>eVB-Nummer</strong> — elektronska potvrda osiguranja (dobijaš od osiguravajuće kuće)</li>
              <li><strong>SEPA mandat</strong> za porez na vozilo (Kfz-Steuer)</li>
              <li><strong>COC dokument</strong> (za uvezena vozila iz EU)</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Zaključi Kfz-Versicherung</strong> — Auto osiguranje (obavezna Haftpflicht + opciono Kasko). Uporedi ponude na check24.de ili verivox.de. Dobijaš <strong>eVB-Nummer</strong>.</li>
              <li><strong>Napravi ili prenesi TÜV/HU</strong> — Ako auto nema važeći TÜV, zakaži pregled (DEKRA, TÜV, GTÜ). Košta ~100-150 €.</li>
              <li><strong>Zakaži termin kod Zulassungsstelle</strong> — Online na web stranici tvog grada. Termini su često popunjeni sedmicama unaprijed!</li>
              <li><strong>Kupi tablice</strong> — Kod schilderprägera blizu Zulassungsstelle. Košta ~20-35 € za par tablica.</li>
              <li><strong>Dođi na termin sa svim dokumentima</strong> — Predaj eVB, Fahrzeugbrief, TÜV izvještaj, SEPA mandat, pasoš.</li>
              <li><strong>Primi Zulassungsbescheinigung</strong> — Teil I (Fahrzeugschein) dobijaš odmah. Teil II ostaje kod tebe.</li>
              <li><strong>Zalijepi naljepnice na tablice</strong> — TÜV i registracijske naljepnice se lijepe na Zulassungsstelle.</li>
              <li><strong>Prijavi se za Kfz-Steuer</strong> — Automatski preko SEPA mandata koji si dao. Porez se naplaćuje godišnje.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: <p>Kod <strong>Kfz-Zulassungsstelle</strong> tvog grada (dio Ordnungsamt ili Straßenverkehrsamt). Termin obavezan. Schilderpräger (izrada tablica) se nalazi obično direktno pored.</p>,
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Registracija novog auta: <strong>~30 €</strong>.</li>
              <li>Preregistracija: <strong>~25 €</strong>.</li>
              <li>Tablice: <strong>20-35 €</strong>.</li>
              <li>TÜV/HU: <strong>100-150 €</strong>.</li>
              <li>Kfz-Versicherung: <strong>30-200 €/mjesečno</strong> (zavisno od auta i paketa).</li>
              <li>Kfz-Steuer: <strong>50-400 € godišnje</strong> (zavisno od motora i emisija).</li>
              <li>Obrada na licu mjesta: <strong>~30 minuta</strong>.</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Voziti neregistriran auto — krivično djelo, kazna + oduzimanje.</li>
              <li>Zaboraviti eVB-Nummer — bez nje registracija nije moguća.</li>
              <li>Ne zakazati termin — bez termina čekaš satima ili te odbiju.</li>
              <li>Kupiti tablice prije termina sa pogrešnim gradom.</li>
              <li>Propustiti TÜV rok — auto ne smije u promet sa isteklim TÜV-om.</li>
              <li>Ne odjaviti staro vozilo — plaćaš porez i osiguranje dalje.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "KBA – Fahrzeugzulassung", url: "https://www.kba.de/DE/Themen/Zulassung/zulassung_node.html" },
        { type: "portal", label: "i-Kfz Online Zulassung", url: "https://www.i-kfz.de" },
      ]}
    />
  );
}
