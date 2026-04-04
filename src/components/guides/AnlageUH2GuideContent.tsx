import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage UH2?",
    bhsField: "Šta je Anlage UH2?",
    whatToWrite: "Anlage UH2 provjerava alimentacijska prava trudne osobe prema ocu djeteta koji ne živi u Bedarfsgemeinschaft.",
    commonMistake: "Misliti da se UH2 popunjava nakon poroda — popunjava se čim se trudnoća navede u Hauptantragu!",
  },
  {
    deField: "Abschnitt C: Entbindungstermin",
    bhsField: "Predviđeni datum poroda",
    whatToWrite: "Navedi predviđeni datum poroda (iz Mutterpass-a).",
    whereToFind: "Mutterpass ili potvrda ginekologa.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Netačan datum — koristi datum iz Mutterpass-a.",
  },
  {
    deField: "Abschnitt D: Status des Kindsvaters",
    bhsField: "Status oca djeteta",
    whatToWrite: "Označi status:\n• Poznat → navedi ime, datum rođenja, adresu\n• Nepoznat → navedi (ali pazi na posljedice!)\n• Preminuo\n\nPosljednja poznata adresa je obavezna ako je poznata!",
    commonMistake: "Oca navesti kao 'nepoznatog' kad je poznat — može dovesti do isključenja iz primanja!",
  },
  {
    deField: "Abschnitt E: Vaterschaft",
    bhsField: "Priznanje očinstva",
    whatToWrite: "Da li je očinstvo već priznato (Vaterschaftsanerkennung)?\n• Da → priloži dokument\n• Ne → Jobcenter može pokrenuti postupak.",
    commonMistake: "Ne priložiti Vaterschaftsanerkennung ako već postoji.",
  },
  {
    deField: "Abschnitt F–G: Unterhalt & Unterschrift",
    bhsField: "Alimentacija i potpis",
    whatToWrite: "Abschnitt F: Da li se već plaća alimentacija?\n• Da → navedi iznos i priloži dokaze\n• Ne → Jobcenter može pokrenuti postupak\n\nAbschnitt G: Pravni zastupnik? Potpis: datum + vlastoručni potpis.",
    commonMistake: "Materijalne poklone (oprema za bebe) zaboraviti navesti.",
  },
];

export default function AnlageUH2GuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage UH2 — Unterhalt bei Schwangerschaft"
        source="Jobcenter (SGB II)"
        formName="Anlage UH2"
        whoCanApply="Trudne osobe čiji otac djeteta ne živi u Bedarfsgemeinschaft."
        processingTime="Obrađuje se uz Hauptantrag"
        requirements={[
          "Mutterpass / ljekarska potvrda o trudnoći",
          "Posljednja poznata adresa oca djeteta",
          "Vaterschaftsanerkennung (ako već postoji)",
          "Dokazi o primljenim alimentacijama",
        ]}
        commonMistakes={[
          "Oca navesti kao 'nepoznatog' kad je poznat",
          "Materijalne poklone ne navesti",
          "Vaterschaftsanerkennung ne priložiti ako postoji",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
    </div>
  );
}
