import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterformularCTA from "./MusterformularCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage BB?",
    bhsField: "Šta je Anlage BB?",
    whatToWrite:
      "Anlage BB služi za podnošenje zahtjeva za jednokratni ili ponavljajući vanredni trošak koji nije pokriven redovnim Bürgergeld-Regelsatzom — npr. hitna popravka, medicinsko pomagalo ili nepredviđeni troškovi.\n\nPravna osnova: § 21 Abs. 6 SGB II",
    whereToFind: "Formular dobiješ u Jobcentru ili online na arbeitsagentur.de.",
    commonMistake: "Novac se smije koristiti SAMO za navedenu svrhu — čuvaj račune! Nikada ne predaj originale, samo kopije.",
  },
  {
    deField: "Abschnitt A: Antragstellende Person",
    bhsField: "Tvoji lični podaci",
    whatToWrite: "Upiši: Vorname (ime), Nachname (prezime), Geburtsdatum (datum rođenja) i BG-Nummer (broj Bedarfsgemeinschaft).",
    whereToFind: "BG-Nummer nađeš na svakom dopisu Jobcentra — gore desno.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Izostaviti BG-Nummer — usporava obradu zahtjeva.",
  },
  {
    deField: "Abschnitt B: Betroffene Person",
    bhsField: "Za koga je ovaj zahtjev?",
    whatToWrite: "Ako je trošak za tebe — upiši iste podatke kao u A. Ako je za drugu osobu u BG (npr. dijete) — upiši podatke te osobe.",
    commonMistake: "Zamijeniti podatke — ako je zahtjev za dijete, upiši podatke djeteta, ne svoje.",
  },
  {
    deField: "Abschnitt C: Art des Bedarfs (Feld 8–10)",
    bhsField: "Vrsta i obrazloženje troška",
    whatToWrite: "Polje 8: Opiši TAČNO šta ti treba. Npr. 'Popravka peći za grijanje' ili 'Naočale nakon krađe'.\nPolje 9: Označi učestalost — jednokratno, mjesečno, kvartalno itd.\nPolje 10: Obrazloži zašto je trošak nastao i zašto kredit (Darlehen) nije moguć.",
    commonMistake: "Nejasni opisi usporavaju obradu. Kod jednokratnog troška MORA biti obrazloženje zašto kredit nije moguć — bez toga se zahtjev često odbija.",
    example: "Popravka defektne peći u iznajmljenom stanu. Peć ne radi od 15.03. Stanodavac odbija popravku.",
  },
  {
    deField: "Felder 11–14: Höhe und Vorschuss",
    bhsField: "Iznos i predujam",
    whatToWrite: "Polje 11: Da li je iznos već poznat? Označi Da/Ne.\nPolje 12: Upiši iznos u eurima i priloži predračun (Kostenvoranschlag).\nPolje 13–14: Ako trebaš predujam (Vorschuss) — označi Da i navedi iznos.",
    format: "Iznos: XXX,XX €",
    commonMistake: "Ne priložiti predračun — zahtjev bez dokaza o troškovima se odbija.",
  },
  {
    deField: "Abschnitt D: Unterschrift",
    bhsField: "Potpis",
    whatToWrite: "Datum i vlastoručni potpis. Kod maloljetnih: potpisuje roditelj/staratelj. Ako postoji zakonski zastupnik (Betreuer): dodatna polja 17–18.",
    commonMistake: "Zaboraviti potpis — formular bez potpisa nije validan.",
  },
  {
    deField: "Wichtige Hinweise",
    bhsField: "Važne napomene i najčešće greške",
    whatToWrite: "• Novac smije biti korišten SAMO za navedenu svrhu — čuvaj račune!\n• Nikada ne predavaj originale, samo kopije.\n• Kod jednokratnog troška MORA biti obrazloženo zašto kredit nije moguć.\n• Predaj zahtjev ŠTO PRIJE — prije nastanka troška ili odmah nakon.",
    commonMistake: "Kasno podnošenje zahtjeva — nakon kupovine bez odobrenja, Jobcenter može odbiti refundaciju.",
  },
];

export default function AnlageBBGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage BB — Besonderer Bedarf"
        source="Jobcenter (SGB II)"
        formName="Anlage BB"
        whoCanApply="Bürgergeld-primaoci sa vanrednim troškovima"
        processingTime="2–4 sedmice"
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Anlage BB</strong> — zahtjev za jednokratni ili ponavljajući vanredni trošak
          koji nije pokriven redovnim Bürgergeld iznosom (Regelsatz).
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="anlage-bb" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-bb_ba015342.pdf" />
    </div>
  );
}
