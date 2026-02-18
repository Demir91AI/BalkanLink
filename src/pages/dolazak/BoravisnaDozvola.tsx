import { CheckCircle2, AlertTriangle, Clock, Building2, Users, FileText, ListChecks, CreditCard } from "lucide-react";
import DolazakPageTemplate from "./DolazakPageTemplate";

export default function BoravisnaDozvola() {
  return (
    <DolazakPageTemplate
      title="Boravišna dozvola i viza"
      subtitle="Sve o vizama, dozvolama boravka i EU plavoj karti za rad u Njemačkoj."
      sections={[
        {
          icon: <Users className="h-4 w-4 text-gold" />,
          title: "Ko treba boravišnu dozvolu?",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Građani EU/EEA/Švicarske</strong> — ne trebaju vizu ni dozvolu boravka. Slobodan pristup.</li>
              <li><strong>Državljani trećih zemalja</strong> — trebaju vizu za ulazak i potom boravišnu dozvolu.</li>
              <li><strong>Državljani BiH, Srbije, Crne Gore, S. Makedonije, Kosova, Albanije</strong> — trebaju vizu prije dolaska (osim za boravak do 90 dana).</li>
            </ul>
          ),
        },
        {
          icon: <FileText className="h-4 w-4 text-gold" />,
          title: "Vrste dozvola",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Aufenthaltserlaubnis</strong> — privremena dozvola (za posao, studij, porodicu).</li>
              <li><strong>Blaue Karte EU</strong> — za visokokvalificirane radnike (min. diploma + ugovor o radu sa minimalnom platom).</li>
              <li><strong>Niederlassungserlaubnis</strong> — trajna dozvola (nakon 5 godina legalnog boravka).</li>
              <li><strong>§16b</strong> — studentska viza.</li>
              <li><strong>§19c Abs. 1</strong> — za deficitarna zanimanja (Fachkräfte).</li>
            </ul>
          ),
        },
        {
          icon: <ListChecks className="h-4 w-4 text-gold" />,
          title: "Korak-po-korak",
          content: (
            <ol className="list-decimal space-y-2 pl-5">
              <li><strong>Provjeri da li ti treba viza</strong> — Na web stranici njemačke ambasade u tvojoj zemlji provjeri uslove.</li>
              <li><strong>Prikupi dokumente</strong> — Pasoš (valjan min. 6 mjeseci), ugovor o radu ili potvrda o upisu, zdravstveno osiguranje, dokaz o smještaju, finansijska sredstva.</li>
              <li><strong>Zakaži termin na ambasadi</strong> — Online putem sistema zakazivanja tvoje ambasade.</li>
              <li><strong>Predaj zahtjev na ambasadi</strong> — Lično, sa svim dokumentima u originalu + kopijama.</li>
              <li><strong>Biometrijski podaci</strong> — Otisci prstiju i fotografija se uzimaju na ambasadi.</li>
              <li><strong>Čekaj odluku</strong> — Obrada traje 4-12 sedmica (može i duže).</li>
              <li><strong>Preuzmi vizu</strong> — Viza se lijepi u pasoš. Obično važi 3-6 mjeseci.</li>
              <li><strong>Po dolasku: Ausländerbehörde</strong> — U roku od 90 dana moraš zatražiti Aufenthaltstitel kod lokalne Ausländerbehörde.</li>
              <li><strong>Zakaži termin kod Ausländerbehörde</strong> — Online ili telefonski. Ponesi sve dokumente + Meldebescheinigung.</li>
              <li><strong>Primi eAT karticu</strong> — Elektronska dozvola boravka (kartica) stiže poštom u roku od 4-6 sedmica.</li>
            </ol>
          ),
        },
        {
          icon: <Building2 className="h-4 w-4 text-gold" />,
          title: "Gdje se radi?",
          content: (
            <div>
              <p><strong>Prije dolaska:</strong> Njemačka ambasada ili konzulat u tvojoj zemlji.</p>
              <p className="mt-1"><strong>Nakon dolaska:</strong> Ausländerbehörde (Ured za strance) u tvom gradu.</p>
            </div>
          ),
        },
        {
          icon: <CreditCard className="h-4 w-4 text-gold" />,
          title: "Rokovi i troškovi",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Viza: <strong>75 € – 100 €</strong> (zavisno od vrste).</li>
              <li>Aufenthaltstitel: <strong>100 € – 147 €</strong>.</li>
              <li>Blaue Karte EU: <strong>100 €</strong>.</li>
              <li>Obrada: <strong>4-12 sedmica</strong> (ambasada), <strong>4-8 sedmica</strong> (Ausländerbehörde).</li>
            </ul>
          ),
        },
        {
          icon: <AlertTriangle className="h-4 w-4 text-warning" />,
          title: "Česte greške",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Kasno zakazivanje termina na ambasadi — termini su često zauzeti mjesecima unaprijed.</li>
              <li>Nepotpuna dokumentacija — svaki nedostajući dokument može značiti odbijanje.</li>
              <li>Pasoš sa isteklim rokom — mora biti valjan minimalno 6 mjeseci.</li>
              <li>Pogrešan tip vize — radna viza ≠ turistička viza.</li>
              <li>Prekoračenje 90 dana bez podnošenja zahtjeva za Aufenthaltstitel.</li>
              <li>Neobaviješten poslodavac o statusu vize.</li>
            </ul>
          ),
        },
      ]}
      links={[
        { type: "portal", label: "Online termin – ambasada", url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt" },
        { type: "info", label: "Službene informacije (BAMF)", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html" },
      ]}
    />
  );
}
