import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterformularCTA from "./MusterformularCTA";

const STEPS: StepData[] = [
  {
    deField: "Anspruchsvoraussetzungen",
    bhsField: "Ko može dobiti",
    whatToWrite: "Osobe koje su sposobne za rad ali nemaju dovoljno prihoda ili su nezaposlene",
    format: "Samac: 563€/mj + troškovi stanovanja i grijanja",
    commonMistake: "Misliti da ne možeš dobiti ako radiš — možeš dobiti dopunu ako malo zarađuješ (Aufstocken)",
    note: "Uslov: moraš biti prijavljen u Jobcenter i aktivno tražiti posao",
  },
  {
    deField: "Antrag im Jobcenter",
    bhsField: "Prijava u Jobcenter",
    whatToWrite: "Idi lično u Jobcenter s dokumentima ili prijavi online na jobcenter-digital.de",
    whereToFind: "Dokumenti: Pasoš, Meldebescheinigung, IBAN, dokaz o stanu (Mietvertrag), dokaz o prihodu",
    commonMistake: "Čekati s prijavom — svaki dan kašnjenja znači izgubljen novac",
    note: "Rok: prijavi se što prije — isplata počinje od datuma prijave, ne retroaktivno",
  },
  {
    deField: "Mietzuschuss",
    bhsField: "Mietzuschuss (troškovi stanovanja)",
    whatToWrite: "Jobcenter plaća kiriju direktno stanodavcu u razumnom iznosu",
    format: "Stan mora biti 'angemessen' — odgovarajuće veličine za broj ukućana",
    commonMistake: "Uzeti preskup stan i misliti da će Jobcenter sve platiti",
  },
  {
    deField: "Pflichten gegenüber dem Jobcenter",
    bhsField: "Obaveze prema Jobcenter",
    whatToWrite: "Aktivno tražiti posao, javljati se na termine, prihvatiti razumne ponude posla",
    format: "Sankcije: ako ne ispunjavaš obaveze — Jobcenter može smanjiti iznos",
    commonMistake: "Ne javljati promjene (novi posao, promjena adrese) — može doći do povrata novca",
  },
  {
    deField: "Bürgergeld und Arbeit",
    bhsField: "Bürgergeld i rad",
    whatToWrite: "Možeš zarađivati do 100€ bez odbitka, dio iznad se djelomično odbija (Freibetrag)",
    format: "Jobcenter pomaže s prekvalifikacijom, kursevima, troškovima prijevoza na posao",
    commonMistake: "Misliti da je bolje ne raditi — rad se isplati, freibetrag postoji upravo zbog toga",
  },
];

export default function BurgergeldGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Građanska naknada (Bürgergeld)"
        source="Jobcenter"
        formName="Antrag auf Bürgergeld (SGB II)"
        whoCanApply="Osobe sposobne za rad koje nemaju dovoljno prihoda ili su nezaposlene."
        processingTime="2-4 sedmice od podnošenja zahtjeva"
        requirements={[
          "Pasoš ili lična karta",
          "Meldebescheinigung",
          "Mietvertrag (ugovor o najmu)",
          "Dokaz o prihodu ili otkazu",
          "IBAN bankovnog računa",
          "Boravišna dozvola (za ne-EU državljane)",
        ]}
        commonMistakes={[
          "Čekati s prijavom — svaki dan kašnjenja znači manje novca",
          "Ne prijaviti promjene prihoda ili adrese Jobcenteru",
          "Uzeti preskup stan i očekivati punu naknadu",
          "Misliti da ne možeš dobiti Bürgergeld ako radiš (Aufstocken postoji!)",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="buergergeld" pdfUrl="https://www.arbeitsagentur.de/datei/ba012914.pdf" />
    </div>
  );
}
