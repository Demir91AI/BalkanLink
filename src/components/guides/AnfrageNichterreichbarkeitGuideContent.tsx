import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die ANE?",
    bhsField: "Šta je Anfrage zur Nichterreichbarkeit?",
    whatToWrite: "Formular za traženje odobrenja kad si privremeno nedostupan za Jobcenter — npr. godišnji odmor, kura, boravak u inostranstvu.",
    commonMistake: "Otputovati bez prijave → Jobcenter može obustaviti isplate!",
    note: "Podnesi zahtjev najmanje 5 radnih dana PRIJE planirane odsutnosti!",
  },
  {
    deField: "Abschnitt A: Persönliche Daten",
    bhsField: "Lični podaci",
    whatToWrite: "Upiši: ime, prezime, datum rođenja, Kundennummer i BG-Nummer.",
    whereToFind: "Kundennummer nađeš na svakom dopisu Jobcentra.",
    commonMistake: "Kundennummer zamijeniti sa BG-Nummer — to su dva različita broja!",
  },
  {
    deField: "Abschnitt B, Frage 6: Zeitraum",
    bhsField: "Period odsutnosti",
    whatToWrite: "Navedi tačne datume: OD — DO.\n\n⚠️ PRAVILO 3 SEDMICE:\nDo 3 sedmice/kalendarska godina: Bürgergeld nastavlja teći.\nOd 4. sedmice: Primanja se OBUSTAVLJAJU — uključujući zdravstveno osiguranje!",
    format: "Datum: DD.MM.YYYY — DD.MM.YYYY",
    commonMistake: "Prekoračiti 3 sedmice bez odobrenja → vraćanje novca + gubitak zdravstvenog osiguranja!",
  },
  {
    deField: "Frage 7: Grund der Abwesenheit",
    bhsField: "Razlog odsutnosti",
    whatToWrite: "Označi razlog:\n• Urlaub (godišnji odmor) → dalje sa Frage 9\n• Drugi razlog → Frage 8 (navedi mogućnost kontakta!) + Frage 9\n\nKod ne-odmora: MORAŠ navesti kako te mogu kontaktirati!",
    commonMistake: "Kod ne-odmorskih razloga zaboraviti kontakt podatke → zahtjev odbijen!",
  },
  {
    deField: "Frage 9: Leistungsanspruch",
    bhsField: "Pravo na primanja tokom odsutnosti",
    whatToWrite: "Potvrdi da ćeš biti odsutan samo u periodu za koji primaš primanja.\n\n• Do 3 sedmice: OK ✅\n• Preko 3 sedmice: primanja prestaju od 4. sedmice ❌",
    commonMistake: "Ostati duže od odobrenog perioda → obaveza vraćanja novca!",
  },
  {
    deField: "Abschnitt C–E: Hinweise & Einreichung",
    bhsField: "Napomene i predaja",
    whatToWrite: "Pročitaj napomene u Abschnitt C, D, E.\nPredaj formular:\n• Online-Postfach Jobcentra\n• Lično\n• Poštom (preporučeno pismo)",
    commonMistake: "Prekasno podnijeti (manje od 5 radnih dana) → odobrenje može biti odbijeno.",
  },
];

export default function AnfrageNichterreichbarkeitGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anfrage Nichterreichbarkeit (ANE)"
        source="Jobcenter (SGB II)"
        formName="Anfrage zur Nichterreichbarkeit"
        whoCanApply="Svi Bürgergeld primaoci (15+) koji planiraju privremenu odsutnost."
        processingTime="Odobrenje obično u roku od 5 radnih dana"
        requirements={[
          "Kod kure/rehabilitacije: ljekarska preporuka",
          "Kod volontiranja: dokaz o aktivnosti",
          "Kod traženja posla u inostranstvu: objašnjenje",
        ]}
        commonMistakes={[
          "Prekasno podnijeti — najmanje 5 radnih dana prije odsutnosti!",
          "Kontakt podatke zaboraviti kod ne-odmorskih razloga",
          "Ostati duže od odobrenog perioda → povrat novca!",
        ]}
      />
      <div className="rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          🚨 <strong>Pravilo 3 sedmice:</strong> Max. 3 sedmice/kalendarska godina možeš biti odsutan BEZ gubitka primanja.
          Od 4. sedmice: primanja se OBUSTAVLJAJU — uključujući zdravstveno osiguranje! Uvijek prvo zatraži odobrenje!
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="nichterreichbarkeit" pdfUrl="https://www.arbeitsagentur.de/datei/anfrage-nichterreichbarkeit_ba015340.pdf" />
    </div>
  );
}
