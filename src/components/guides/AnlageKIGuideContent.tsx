import LocalizedGuide from "./LocalizedGuide";
import type { GuideContent } from "@/lib/guide-i18n";
import type { StepData } from "./SmartGuideWizardShared";

const GUIDE_KEY = "anlageKI";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage KI?",
    bhsField: "Šta je Anlage KI?",
    whatToWrite: "Anlage KI sadrži podatke o djetetu mlađem od 15 godina u Bedarfsgemeinschaft. Za svako dijete se popunjava zasebna Anlage KI!",
    commonMistake: "Jedna KI za više djece — svako dijete treba vlastiti formular!",
  },
  {
    deField: "Abschnitt A–B: Personen & Kind",
    bhsField: "Podnosilac i podaci djeteta",
    whatToWrite: "Abschnitt A: Podaci podnosioca.\nAbschnitt B: Podaci djeteta — ime, prezime, datum rođenja, mjesto rođenja, državljanstvo, Steuer-ID.",
    whereToFind: "Steuer-ID djeteta nađeš na dopisu Finanzamta koji ste dobili nakon rođenja.",
    commonMistake: "Steuer-ID djeteta zaboraviti — pristiže automatski po rođenju, ali se može zatražiti ponovo.",
  },
  {
    deField: "Abschnitt C: Nationalität",
    bhsField: "Državljanstvo djeteta",
    whatToWrite: "Samo ako dijete NIJE njemački državljanin → navedi boravišnu dozvolu.",
    whenToLeaveEmpty: "Ako je dijete njemački državljanin → označi 'Nein'.",
    commonMistake: "Ne navesti boravišnu dozvolu za ne-njemačko dijete.",
  },
  {
    deField: "Abschnitt D: Lebenssituation des Kindes",
    bhsField: "Životna situacija djeteta",
    whatToWrite: "Navedi:\n• Odnos prema djetetu (biološko, usvojeno itd.)\n• Da li drugi roditelj živi izvan BG? → Ako DA → Anlage UH3 popuniti!\n• Wechselmodell (naizmjenični boravak)?\n• Škola (ako je upisano)\n• Posebni troškovi ishrane, zdravstveni problemi\n• Stationarna ustanova",
    commonMistake: "Zaboraviti Anlage UH3 ako drugi roditelj ne živi u BG!",
  },
  {
    deField: "Einnahmen des Kindes",
    bhsField: "Prihodi djeteta",
    whatToWrite: "Navedi SVE prihode djeteta:\n• Kindergeld (255€/mj.)\n• Unterhalt od drugog roditelja\n• Unterhaltsvorschuss od Jugendamta\n\nPriloži: Kindergeld-Bescheid.",
    commonMistake: "Prihode djeteta zaboraviti — Kindergeld i Unterhalt se OBRAČUNAVAJU!",
  },
  {
    deField: "Abschnitt F–G: KV & Unterschrift",
    bhsField: "Zdravstveno osiguranje i potpis",
    whatToWrite: "Abschnitt F: Zdravstveno osiguranje djeteta (obično familienversichert).\nAbschnitt G: Provjeri listu anlaga. Datum + potpis roditelja.",
    commonMistake: "Ne navesti da je dijete familienversichert.",
  },
];

const BASE: GuideContent = {
  header: {
    title: "Anlage KI — Kind unter 15 Jahren",
    source: "Jobcenter (SGB II)",
    formName: "Anlage KI",
    whoCanApply: "Roditelji/staratelji sa djecom mlađom od 15 godina u Bedarfsgemeinschaft.",
    processingTime: "Obrađuje se uz Hauptantrag",
    requirements: [
          "Rodilišni list djeteta",
          "Potvrda zdravstvenog osiguranja djeteta",
          "Schulbescheinigung (od upisa u školu)",
          "Kindergeld-Bescheid (Familienkasse)",
          "Dokazi o alimentaciji (ako drugi roditelj živi van BG)",
        ],
    commonMistakes: [
          "Jedna KI za više djece — svako dijete treba vlastiti formular!",
          "Prihode djeteta zaboraviti (Kindergeld, alimentacija)",
          "Anlage UH3 zaboraviti kad drugi roditelj ne živi u BG",
        ],
  },
  steps: STEPS,
};

export default function AnlageKIGuideContent() {
  return (
    <LocalizedGuide guideKey={GUIDE_KEY} base={BASE}>

    </LocalizedGuide>
  );
}
