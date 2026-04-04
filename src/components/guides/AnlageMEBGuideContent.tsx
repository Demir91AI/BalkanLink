import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage MEB?",
    bhsField: "Šta je Anlage MEB?",
    whatToWrite:
      "Anlage MEB omogućava podnošenje zahtjeva za finansijski doplatak (Mehrbedarf) zbog posebnih troškova ishrane uzrokovanih medicinskom dijagnozom — npr. celijakija, bubrežna insuficijencija, mukoviscidoza.\n\nFormular uključuje i ljekarsku potvrdu (Ärztliche Bescheinigung) koju popunjava ljekar.",
    whereToFind: "Formular dobiješ u Jobcentru ili na arbeitsagentur.de.",
    commonMistake: "Ärztliche Bescheinigung mora navesti KONKRETNU dijagnozu I potrebnu dijetu — opšta potvrda se odbija.",
  },
  {
    deField: "Abschnitt A & B: Persönliche Daten",
    bhsField: "Lični podaci",
    whatToWrite: "A: Tvoji podaci — ime, prezime, datum rođenja, BG-Nummer.\nB: Podaci osobe za koju se traži Mehrbedarf — može biti ista osoba ili član BG.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Ako je zahtjev za dijete — upiši podatke djeteta u B, ne svoje.",
  },
  {
    deField: "Abschnitt C: Erstmalig oder erneut? (Feld 8)",
    bhsField: "Prvi put ili ponovljeni zahtjev?",
    whatToWrite: "Označi da li podnosiš zahtjev po prvi put (Erstmalig) ili ponovo (Erneut).\n\nKod ponovljenog zahtjeva: priloži aktuelnu ljekarsku potvrdu.",
    commonMistake: "Prethodna potvrda istekla — bez nove potvrde zahtjev se ne odobrava.",
  },
  {
    deField: "Ärztliche Bescheinigung — Patient",
    bhsField: "Ljekarska potvrda — dio za pacijenta",
    whatToWrite: "Pacijent popunjava:\n• Vlastiti podaci (ime, prezime, datum rođenja)\n• Potpis za oslobađanje od liječničke tajne\n\nLjekar popunjava:\n• Podaci o ljekaru (ime, adresa)\n• Pacijent potpisuje oslobađanje od Schweigepflicht",
    commonMistake: "Ne potpisati oslobađanje od Schweigepflicht — bez toga ljekar ne smije dostaviti podatke Jobcentru.",
    note: "Ärztliche Bescheinigung se predaje u ZATVORENOM kovertu — zaštita podataka!",
  },
  {
    deField: "Ärztliche Bescheinigung — Arzt",
    bhsField: "Ljekarska potvrda — dio za ljekara",
    whatToWrite: "Ljekar popunjava:\n• Polje 13: Krankheitsbild — označi dijagnozu (Zöliakie, Niereninsuffizienz, Mukoviszidose itd.)\n• Potrebna dijeta (Kostform)\n• Polje 16: Period preporuke (od—do)\n• Potpis i pečat ljekara",
    commonMistake: "Potvrda vrijedi max. 12 mjeseci. Za duži period — ljekar mora dati obrazloženje.",
    example: "Terminale Niereninsuffizienz mit Dialysetherapie → Nierendiät (phosphat-/kaliumarme Kost)",
  },
  {
    deField: "Abschnitt D: Unterschrift",
    bhsField: "Potpis antragstellera",
    whatToWrite: "Datum i vlastoručni potpis na glavnom formularu (ne na ljekarskoj potvrdi — ona ima zasebne potpise).",
    commonMistake: "Zamijeniti potpise — antragsteller potpisuje Abschnitt D, pacijent potpisuje ljekarsku potvrdu.",
  },
  {
    deField: "Wichtige Hinweise",
    bhsField: "Važne napomene",
    whatToWrite: "• Potvrda MORA navesti konkretnu dijagnozu I dijetu — opšte potvrde se odbijaju\n• Ärztliche Bescheinigung u ZATVORENOM kovertu!\n• Vrijedi max. 12 mjeseci — zatim nova potvrda\n• Obična promjena ishrane BEZ dodatnih troškova ne daje pravo na Mehrbedarf",
    commonMistake: "Misliti da svaka dijeta daje pravo na Mehrbedarf — samo medicinski nužna, skuplja ishrana.",
  },
];

export default function AnlageMEBGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage MEB — Mehrbedarf Ernährung"
        source="Jobcenter (SGB II)"
        formName="Anlage MEB + Ärztliche Bescheinigung"
        whoCanApply="Bürgergeld-primaoci sa medicinskom potrebom za posebnu ishranu"
        processingTime="3–6 sedmica"
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Anlage MEB</strong> — zahtjev za doplatak zbog skuplje ishrane
          uzrokovane medicinskom dijagnozom. Uključuje ljekarsku potvrdu u zatvorenom kovertu.
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="anlage-meb" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-meb_ba146202.pdf" />
    </div>
  );
}
