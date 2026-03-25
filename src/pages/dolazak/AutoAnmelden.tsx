import { AlertTriangle, Clock, Building2, Users, FileText, ListChecks, Car, BookOpen, Shield } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function AutoAnmelden() {
  return (
    <DolazakPageTemplate
      title="Prijava vozila (Kfz, Lkw...)"
      subtitle="Registracija motornih vozila u Njemačkoj – obavezna za sve Kfz (automobili, kamioni, motocikli, prikolice). Nadležno tijelo: Kraftfahrt-Bundesamt (KBA)."
      sections={[
        {
          icon: <BookOpen className="h-4 w-4 text-gold" />,
          title: "Šta je Kfz-Zulassung?",
          content: (
            <div className="space-y-2">
              <p>Svako motorno vozilo koje se koristi na javnim cestama u Njemačkoj mora biti <strong>registrirano</strong> (zugelassen) kod nadležne Zulassungsbehörde. Kraftfahrt-Bundesamt (KBA) u Flensburgu je savezna institucija koja vodi centralni registar svih vozila u Njemačkoj — preko <strong>61 miliona registriranih vozila</strong> (stanje: januar 2026).</p>
              <p>Registracija se odnosi na:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Pkw</strong> — osobni automobili</li>
                <li><strong>Lkw</strong> — kamioni i teretna vozila</li>
                <li><strong>Krafträder</strong> — motocikli i mopedi</li>
                <li><strong>Anhänger</strong> — prikolice (preko 750 kg)</li>
                <li><strong>Elektrofahrzeuge</strong> — električni automobili (BEV, PHEV)</li>
                <li><strong>Wohnmobile</strong> — kamperi</li>
              </ul>
              <p className="text-xs text-muted-foreground">Bez važeće registracije vožnja je krivično djelo — kazna, oduzimanje vozila i prijava.</p>
            </div>
          ),
        },
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko mora prijaviti vozilo?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Svako ko <strong>kupuje vozilo</strong> u Njemačkoj (novo ili korišteno) mora ga registrirati prije vožnje.</li>
              <li>Ako donosiš vozilo <strong>iz inostranstva</strong>: obavezno umprijaviti (Umschreibung) — u pravilu u roku od mjesec dana.</li>
              <li>Vozila iz <strong>EU zemalja</strong> moraju proći <strong>HU (Hauptuntersuchung / TÜV)</strong> provjeru.</li>
              <li>Vozila iz <strong>zemalja van EU</strong>: dodatno potrebno Einzelgenehmigung (posebno odobrenje) ili COC dokument.</li>
              <li>Pri <strong>seljenju unutar Njemačke</strong>: umprijaviti vozilo na novu adresu (zamjena tablica ako mijenjaš okrug).</li>
              <li>Pri <strong>prodaji vozila</strong>: prodavac mora obavijestiti Zulassungsstelle.</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Potrebni dokumenti",
          content: (
            <div className="space-y-2">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Personalausweis ili pasoš</strong> — obavezan dokument identifikacije.</li>
                <li><strong>Meldebescheinigung</strong> — dokaz prijave prebivališta (ako nemaš njemačku ličnu kartu).</li>
                <li><strong>Zulassungsbescheinigung Teil II</strong> (Fahrzeugbrief) — dokaz vlasništva nad vozilom.</li>
                <li><strong>Zulassungsbescheinigung Teil I</strong> (Fahrzeugschein) — kod preregistracije već registriranog vozila.</li>
                <li><strong>HU-Bericht</strong> (TÜV izvještaj) — važeći tehnički pregled (ne stariji od mjesec dana za novu registraciju).</li>
                <li><strong>eVB-Nummer</strong> — elektronska potvrda osiguranja vozila (elektronische Versicherungsbestätigung). Dobijaš je od osiguravajuće kuće u roku od par minuta.</li>
                <li><strong>SEPA-Lastschriftmandat</strong> — za automatsko plaćanje poreza na vozilo (Kfz-Steuer) putem Zoll-a.</li>
                <li><strong>COC-Dokument</strong> (Certificate of Conformity) — za vozila uvezena iz EU.</li>
                <li><strong>Kaufvertrag</strong> — ugovor o kupoprodaji (preporučljivo).</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">Za Lkw (kamione) dodatno: Sicherheitsprüfung (SP) i eventualno dokaz o ekološkoj klasi.</p>
            </div>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Zaključi osiguranje vozila (Kfz-Versicherung)</strong> — Obavezna je najmanje Haftpflichtversicherung (osiguranje od odgovornosti). Opciono: Teilkasko ili Vollkasko. Uporedi ponude online. Dobijaš <strong>eVB-Nummer</strong> odmah putem e-maila ili SMS-a.</li>
              <li><strong>Obavi tehnički pregled (HU/TÜV)</strong> — Ako vozilo nema važeći TÜV, zakaži pregled kod ovlaštene organizacije (TÜV, DEKRA, GTÜ, KÜS). Cijena: ~100–150 €. Za vozila starija od 3 godine: HU svake 2 godine.</li>
              <li><strong>Zakaži termin kod Zulassungsstelle</strong> — Termin zakaži online putem web stranice tvog grada. U velikim gradovima termini su popunjeni sedmicama unaprijed!</li>
              <li><strong>Pripremi SEPA mandat</strong> — Za automatsko plaćanje Kfz-Steuer-a. Trebaš IBAN tvog njemačkog bankovnog računa.</li>
              <li><strong>Kupi registarske tablice</strong> — Kod Schilderpräger-a (izrada tablica) koji se obično nalazi neposredno pored Zulassungsstelle. Cijena: ~20–35 € za par tablica.</li>
              <li><strong>Dođi na termin sa svim dokumentima</strong> — Predaj eVB, Fahrzeugbrief, TÜV izvještaj, SEPA mandat, pasoš. Službenica sve provjerava i unosi u sistem.</li>
              <li><strong>Primi Zulassungsbescheinigung</strong> — Teil I (Fahrzeugschein) dobijaš odmah na licu mjesta. Teil II (Fahrzeugbrief) ostaje kod tebe na sigurnom mjestu.</li>
              <li><strong>Naljepnice na tablice</strong> — TÜV naljepnica (pozadi) i registracijska naljepnica (naprijed) lijepe se na Zulassungsstelle.</li>
              <li><strong>Kfz-Steuer</strong> — Automatski se naplaćuje godišnje putem SEPA mandata od Hauptzollamt-a. Iznos zavisi od zapremine motora, vrste goriva i CO₂ emisija.</li>
            </ol>
          ),
        },
        {
          icon: <Car className="h-4 w-4 text-gold" />,
          title: "Vrste registracije",
          content: (
            <div className="space-y-2">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Neuzulassung</strong> — registracija potpuno novog vozila (iz salona).</li>
                <li><strong>Umschreibung</strong> — preregistracija već registriranog vozila na novog vlasnika ili novu adresu.</li>
                <li><strong>Wiederzulassung</strong> — ponovna registracija odjavljenog vozila.</li>
                <li><strong>Kurzzeitkennzeichen</strong> — privremene tablice (5 dana) za probnu vožnju ili transport do TÜV-a.</li>
                <li><strong>Ausfuhrkennzeichen</strong> — izvozne tablice za transport vozila u inostranstvo.</li>
                <li><strong>Saisonkennzeichen</strong> — sezonska registracija (npr. april–oktobar za motocikle).</li>
                <li><strong>H-Kennzeichen</strong> — za oldtajmere starije od 30 godina (porezne olakšice).</li>
                <li><strong>E-Kennzeichen</strong> — za električna i plug-in hibridna vozila (pogodnosti: parkiranje, bus trake).</li>
              </ul>
            </div>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: (
            <div className="space-y-2">
              <p>Kod <strong>Kfz-Zulassungsstelle</strong> (Zulassungsbehörde) tvog grada — dio Ordnungsamt-a ili Straßenverkehrsamt-a. Termin je obavezan u većini gradova.</p>
              <p className="text-xs text-muted-foreground">Schilderpräger (izrada tablica) se nalazi obično direktno pored Zulassungsstelle.</p>
            </div>
          ),
        },
        {
          icon: <Clock className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Neuzulassung (novo vozilo): <strong>~30 €</strong>.</li>
              <li>Umschreibung (preregistracija): <strong>~25 €</strong>.</li>
              <li>Abmeldung (odjava): <strong>~7–10 €</strong>.</li>
              <li>Registarske tablice: <strong>20–35 €</strong>.</li>
              <li>HU/TÜV: <strong>100–150 €</strong> (+ AU: ~30 € dodatno).</li>
              <li>Kfz-Versicherung: <strong>30–200 €/mjesečno</strong> (zavisno od vozila, paketa i SF-Klasse).</li>
              <li>Kfz-Steuer: <strong>50–400 € godišnje</strong> (zavisno od motora i emisija; elektro vozila oslobođena do 2030).</li>
              <li>Obrada na licu mjesta: <strong>~30–60 minuta</strong>.</li>
            </ul>
          ),
        },
        {
          icon: <Shield className="h-4 w-4 text-gold" />,
          title: "Uvoz vozila iz Balkana ili EU",
          content: (
            <div className="space-y-2">
              <p>Ako donosiš vozilo iz matične zemlje:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Iz EU (npr. Hrvatska, Slovenija)</strong>: COC dokument + HU pregled + umprijaviti kod Zulassungsstelle.</li>
                <li><strong>Iz zemalja van EU (BiH, Srbija, Kosovo...)</strong>: Einzelgenehmigung (posebno odobrenje) ili Vollgutachten od TÜV-a — znatno skuplji i komplikovaniji proces.</li>
                <li>Carina: vozilo uvezeno iz zemalja van EU podliježe <strong>carinskim dažbinama (10%) i PDV-u (19%)</strong>.</li>
                <li>Rok za umprijavu: u pravilu <strong>mjesec dana</strong> nakon prijave prebivališta.</li>
                <li>Vozila sa stranim tablicama smiju se voziti <strong>max. 1 godinu</strong> u Njemačkoj (uz validan strani tehnički pregled).</li>
              </ul>
            </div>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Voziti neregistrirano vozilo — krivično djelo, kazna + oduzimanje.</li>
              <li>Zaboraviti eVB-Nummer — bez nje registracija nije moguća.</li>
              <li>Ne zakazati termin — bez termina čekaš satima ili te odbiju.</li>
              <li>Kupiti tablice prije termina sa pogrešnim gradom/okrugom.</li>
              <li>Propustiti TÜV rok — vozilo ne smije u promet sa isteklim TÜV-om, kazna do 60 €.</li>
              <li>Ne odjaviti staro vozilo (Abmeldung) — nastavlja se naplata poreza i osiguranja.</li>
              <li>Misliti da strane tablice vrijede neograničeno u Njemačkoj — max. 1 godina.</li>
              <li>Uvoziti vozilo iz BiH/Srbije bez provjere da li tip vozila uopće ima odobrenje u EU.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "info", label: "Kraftfahrt-Bundesamt (KBA) – službena stranica", url: "https://www.kba.de/DE/Home/home_node.html" },
        { type: "info", label: "BMDV – Fahrzeugzulassung informacije", url: "https://bmdv.bund.de/DE/Home/home.html" },
      ]}
    />
  );
}
