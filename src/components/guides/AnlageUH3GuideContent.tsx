import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterformularCTA from "./MusterformularCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage UH3?",
    bhsField: "Šta je Anlage UH3?",
    whatToWrite: "Anlage UH3 provjerava alimentacijska prava djeteta (do 25 god.) prema roditelju koji ne živi u BG. Za svako dijete se popunjava zasebna UH3!",
    commonMistake: "Jedna UH3 za više djece — svako dijete treba vlastitu!",
  },
  {
    deField: "Abschnitt B–C: Kind & Eltern",
    bhsField: "Dijete i roditelji",
    whatToWrite: "Abschnitt B: Podaci djeteta.\nAbschnitt C: Podaci OBA roditelja — za svakog navedi: poznat/nepoznat/preminuo + adresu.",
    commonMistake: "Adresu odsutnog roditelja ne navesti — važno za pravo regresa Jobcentra!",
  },
  {
    deField: "Abschnitt D: Ehe & Vaterschaft",
    bhsField: "Brak i očinstvo",
    whatToWrite: "Da li su roditelji bili vjenčani pri rođenju djeteta?\n• Da → dalje sa Abschnitt E\n• Ne → Da li je očinstvo priznato? Priloži Vaterschaftsanerkennung.",
    commonMistake: "Kod nevjenčanih roditelja: ne priložiti Vaterschaftsanerkennung.",
  },
  {
    deField: "Abschnitt F: Unterhaltszahlungen",
    bhsField: "Alimentacijske isplate",
    whatToWrite: "Da li se alimentacija plaća?\n• Da → mjesečni iznos + Unterhaltstitel (ako postoji)\n• Ne → Jobcenter će kontaktirati obveznika",
    commonMistake: "Alimentaciju prešutjeti → Jobcenter će sam istražiti.",
  },
  {
    deField: "Abschnitt G: Unterhaltsvorschuss",
    bhsField: "Unterhaltsvorschuss od Jugendamta",
    whatToWrite: "Da li se prima Unterhaltsvorschuss?\n• Da → navedi iznos\n• Ne → Da li je podnesen zahtjev?\n• Odbijen/ukinut → navedi razlog",
    commonMistake: "Unterhaltsvorschuss ne tražiti → Jobcenter će pitati zašto nije podnesen zahtjev!",
    note: "Unterhaltsvorschuss se podnosi kod Jugendamt — do max. 18 god.",
  },
  {
    deField: "Abschnitt I: Schule/Ausbildung & Unterschrift",
    bhsField: "Škola/obrazovanje i potpis",
    whatToWrite: "Da li je dijete u školi ili na praksi?\n• Da → navedi školu i predviđeni završetak.\nPotpis: datum + vlastoručni potpis roditelja.",
    commonMistake: "Zaboraviti navesti školu — utječe na dužinu alimentacijske obaveze!",
  },
];

export default function AnlageUH3GuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage UH3 — Kindesunterhalt"
        source="Jobcenter (SGB II)"
        formName="Anlage UH3"
        whoCanApply="Za djecu/osobe do 25 god. kada jedan roditelj ne živi u Bedarfsgemeinschaft."
        processingTime="Obrađuje se uz Hauptantrag"
        requirements={[
          "Rodilišni list djeteta",
          "Posljednja poznata adresa alimentacijskog obveznika",
          "Unterhaltstitel / sporazum (ako postoji)",
          "Bescheid Jugendamta (Unterhaltsvorschuss)",
          "Vaterschaftsanerkennung (ako roditelji nikad nisu bili vjenčani)",
        ]}
        commonMistakes={[
          "Jedna UH3 za više djece — svako dijete treba vlastitu!",
          "Unterhaltsvorschuss ne zatražiti → Jobcenter pita zašto",
          "Nepoznat otac bez objašnjenja → uvijek kratko obrazloži",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
      <MusterCTA formName="Anlage UH3" institution="Bundesagentur für Arbeit" musterPath="/musterformular/anlage-uh3" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-uh3_ba015347.pdf" />
    </div>
  );
}
