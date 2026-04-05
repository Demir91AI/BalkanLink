import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage WEP?",
    bhsField: "Šta je Anlage WEP?",
    whatToWrite: "Anlage WEP (Weitere Person) popunjava se za svaku dodatnu osobu stariju od 15 godina u BG — partner, supružnik, djeca 15–24 god.",
    commonMistake: "Misliti da Hauptantrag pokriva i partnera — partner treba vlastiti WEP!",
  },
  {
    deField: "Abschnitt A–B: Personen",
    bhsField: "Podnosilac i dodatna osoba",
    whatToWrite: "Abschnitt A: Podaci podnosioca zahtjeva.\nAbschnitt B: Podaci osobe za koju se WEP popunjava — uključujući odnos (Feld 13): supružnik, partner, dijete.",
    commonMistake: "'Partner' označiti bez da se popuni Anlage VE — to automatski pokreće provjeru!",
    note: "Odnos prema osobi određuje koje dodatne anlagen su potrebne.",
  },
  {
    deField: "Abschnitt C: Nationalität",
    bhsField: "Državljanstvo",
    whatToWrite: "Samo ako osoba NIJE njemački državljanin → navedi boravišnu dozvolu, Asylbewerberleistungen itd.",
    whenToLeaveEmpty: "Ako je osoba njemački državljanin → označi 'Nein' i preskoči.",
    commonMistake: "Ne navesti boravišnu dozvolu za osobu koja nije njemački državljanin.",
  },
  {
    deField: "Abschnitt D: Aktuelle Lebenssituation",
    bhsField: "Trenutna životna situacija",
    whatToWrite: "Navedi: bračni status, radnu sposobnost, trudnoću, školu/studij/praksu, kostenaufwändige Ernährung, invaliditet.",
    commonMistake: "Učenici 15–17 god. — ne priložiti Schulbescheinigung → zahtjev nepotpun.",
  },
  {
    deField: "Abschnitt E: Bisherige Lebenssituation",
    bhsField: "Prethodna situacija (zadnjih 5 godina)",
    whatToWrite: "Navedi: prethodni Bürgergeld/Sozialhilfe (3 god.), zaposlenja (5 god.), samozaposlenje, Entgeltersatzleistungen.",
    commonMistake: "Ne navesti samozaposlenje — ako je osoba samozaposlena, treba i Anlage EKS!",
  },
  {
    deField: "Abschnitt F–G: KV & Unterschrift",
    bhsField: "Zdravstveno osiguranje i potpis",
    whatToWrite: "Abschnitt F: Navedi zdravstveno osiguranje (GKV ili PKV) i potvrdu priloži.\nAbschnitt G: Provjeri listu potrebnih anlaga.\nPotpis: OBA potpisa su obavezna — podnosilac I osoba za koju se WEP popunjava.",
    commonMistake: "Samo jedan potpis staviti — trebaju OBA!",
  },
];

export default function AnlageWEPGuideContent() {
  return (
    <div className="space-y-8">
      <div className="mb-4 rounded-xl border border-blue-500/30 bg-blue-500/[0.08] p-4 flex items-start gap-3">
        <span className="text-xl shrink-0">💻</span>
        <div>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-1">Ovaj prilog se popunjava online</p>
          <p className="text-xs text-muted-foreground mb-2">Bürgergeld anlagen se podnose isključivo putem Jobcenter Digital portala. Papirna verzija se više ne prihvata u većini jobcentara.</p>
          <a href="https://jobcenter.digital" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors">🌐 Otvori Jobcenter Digital →</a>
        </div>
      </div>
      <GuideInfoHeader
        title="Anlage WEP — Weitere Person"
        source="Jobcenter (SGB II)"
        formName="Anlage WEP"
        whoCanApply="Za partnera, supružnika i djecu 15–24 god. koja žive u Bedarfsgemeinschaft."
        processingTime="Obrađuje se uz Hauptantrag/WBA"
        requirements={[
          "Personalausweis/Reisepass osobe",
          "Schulbescheinigung (za djecu 15–24)",
          "Dokaz o obrazovanju/praksi",
          "Potvrda zdravstvenog osiguranja",
        ]}
        commonMistakes={[
          "'Partner' označiti → automatski pokreće Anlage VE provjeru",
          "Školsku potvrdu za djecu 15–17 god. ne priložiti",
          "Samo jedan potpis — trebaju oba!",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
    </div>
  );
}
