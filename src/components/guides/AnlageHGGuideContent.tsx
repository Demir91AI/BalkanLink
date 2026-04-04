import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterformularCTA from "./MusterformularCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage HG?",
    bhsField: "Šta je Anlage HG?",
    whatToWrite:
      "Anlage HG utvrđuje da li Bedarfsgemeinschaft živi sa srodnicima ili tazbinom (roditelji, braća, svekrva itd.) u zajedničkom domaćinstvu. Jobcenter provjerava da li te osobe pružaju finansijsku podršku i kako se dijele troškovi stanovanja.\n\n⚠️ Za SVAKU srodnu osobu u domaćinstvu popuniti ODVOJENU Anlage HG!",
    whereToFind: "Formular dobiješ u Jobcentru ili na arbeitsagentur.de.",
    commonMistake: "Zaboraviti popuniti odvojenu Anlage HG za svaku srodnu osobu u domaćinstvu.",
  },
  {
    deField: "Abschnitt A & B: Persönliche Daten",
    bhsField: "Tvoji podaci i podaci srodnika",
    whatToWrite: "A: Tvoji podaci — ime, prezime, datum rođenja, BG-Nummer.\nB: Podaci srodne/tazbinske osobe u domaćinstvu.\n\nPolja 7–9: Koja osoba iz tvoje BG je u srodstvu? Navedi ime i srodstvo (npr. 'otac', 'svekrva').",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Ne navesti tačno srodstvo — Jobcenter mora znati ko je ko.",
  },
  {
    deField: "Feld 10–14: Finanzielle Unterstützung",
    bhsField: "Finansijska podrška od srodnika",
    whatToWrite: "Polje 10: Prima li neko iz tvoje BG novac od srodne osobe (džeparac, pomoć za domaćinstvo)?\n• Da → Polja 11–14: Ko prima, koliko, koliko često?\n• Ne → Nastavi sa Abschnitt C",
    commonMistake: "Ne prijaviti finansijsku podršku — može dovesti do povrata novca.",
  },
  {
    deField: "Abschnitt C: Unterkunft (Felder 15–20)",
    bhsField: "Stanovanje",
    whatToWrite: "Polje 15: Da li je srodnik vlasnik/zakupac stana?\n• Da → Polje 18: Živiš li besplatno? Ako ne: koliko plaćaš (19) i ukupni troškovi stana (20)\n• Ne → Polje 16: Živi li srodnik besplatno kod tebe? Ako ne: koliko doprinosi (17)",
    whereToFind: "Iznos stanarine nađeš u Mietvertrag-u ili na uplatnicama.",
    commonMistake: "Besplatno stanovanje kod roditelja se računa kao geldwerter Vorteil (materijalna korist) kod Bedarfsberechnung!",
    note: "Priloži kopiju Mietvertrag-a ili potvrdu o plaćanju kao dokaz.",
  },
  {
    deField: "Abschnitt D: Unterschrift",
    bhsField: "Potpis",
    whatToWrite: "Datum i vlastoručni potpis. Kod pravnog zastupnika: dodatna polja 23–24.",
    commonMistake: "Nikada ne predavaj originale dokumenata — samo kopije!",
  },
  {
    deField: "Wichtige Hinweise",
    bhsField: "Važne napomene",
    whatToWrite: "• Za SVAKU srodnu/tazbinsku osobu popuniti ODVOJENU Anlage HG\n• Besplatno stanovanje = materijalna korist koja se uračunava\n• Samo kopije dokumenata, nikada originale\n• Promjenu stambene situacije odmah prijaviti Jobcentru",
    commonMistake: "Ne prijaviti promjenu stambene situacije — može dovesti do povrata ili prekida primanja.",
  },
];

export default function AnlageHGGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage HG — Haushaltsgemeinschaft"
        source="Jobcenter (SGB II)"
        formName="Anlage HG"
        whoCanApply="Bürgergeld-primaoci koji žive sa srodnicima"
        processingTime="2–4 sedmice"
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Anlage HG</strong> — utvrđuje da li živiš sa srodnicima ili tazbinom
          u zajedničkom domaćinstvu i kako se dijele troškovi. Za svaku osobu odvojena Anlage HG!
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="anlage-hg" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-hg_ba015206.pdf" />
    </div>
  );
}
