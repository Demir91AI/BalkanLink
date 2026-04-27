import LocalizedGuide from "./LocalizedGuide";
import type { GuideContent } from "@/lib/guide-i18n";
import type { StepData } from "./SmartGuideWizardShared";

const GUIDE_KEY = "anlageSV";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage SV?",
    bhsField: "Šta je Anlage SV?",
    whatToWrite:
      "Anlage SV utvrđuje da li je osoba u Bedarfsgemeinschaft tokom primanja Bürgergeld-a obavezno osigurana u zakonskom zdravstvenom i osiguranju za njegu — ili je privatno osigurana.\n\nTakođer reguliše zahtjev za doplatak za premije osiguranja.",
    whereToFind: "Formular dobiješ u Jobcentru ili na arbeitsagentur.de.",
    commonMistake: "Mitgliedsbescheinigung Krankenkasse mora biti dostavljena u roku od 2 sedmice!",
  },
  {
    deField: "Abschnitt A & B: Persönliche Daten",
    bhsField: "Lični podaci (Antragsteller i osoba)",
    whatToWrite: "A: Tvoji podaci — ime, prezime, datum rođenja, BG-Nummer.\nB: Podaci osobe za koju se popunjava — može biti ista osoba.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "BG-Nummer izostaviti — nađeš ga na svakom Jobcenter dopisu.",
  },
  {
    deField: "Abschnitt C: Kranken- und Pflegeversicherung (8–11)",
    bhsField: "Status zdravstvenog osiguranja",
    whatToWrite: "4 pitanja određuju tvoj status:\n• Polje 8: Privatno osiguran? Da = nema obaveznog osiguranja kroz Bürgergeld\n• Polje 9: Samozaposlen? Da = nema obaveznog osiguranja\n• Polje 10: Beamtenstatus? Da = nema obaveznog osiguranja\n• Polje 11 (samo 55+): Posebna historija osiguranja",
    whereToFind: "Informacije o statusu osiguranja nađeš na polici osiguranja ili kontaktiranjem Krankenkasse.",
    commonMistake: "Ako su SVI odgovori 'Nein' → obavezno si osiguran i MORAŠ izabrati Krankenkasse + dostaviti Mitgliedsbescheinigung u roku od 2 sedmice.",
    note: "Privatno osigurani trebaju provjeriti da li je prelazak u Basistarif moguć — često jeftiniji.",
  },
  {
    deField: "Abschnitt D: Zuschuss (Feld 12)",
    bhsField: "Doplatak za premije osiguranja",
    whatToWrite: "Želiš li doplatak za premije osiguranja uprkos privatnom osiguranju? Označi Da i priloži aktuelni Beitragsbescheid.\n\nAko si privatno osiguran: priloži i Nachweis za Basistarif.",
    commonMistake: "Ne priložiti dokaz o visini premije — zahtjev za doplatak bez toga se ne obrađuje.",
  },
  {
    deField: "Abschnitt E: Unterschrift",
    bhsField: "Potpis i potvrda",
    whatToWrite: "Datum i potpis. Potvrdi da si pročitao/la merkblätter (informativne brošure).",
    commonMistake: "Ne potvrditi da su merkblätter pročitani — formular može biti vraćen.",
  },
  {
    deField: "Wichtige Hinweise",
    bhsField: "Važne napomene",
    whatToWrite: "• Mitgliedsbescheinigung u roku od 2 sedmice!\n• Privatno osigurani: provjeri Basistarif\n• Bez zdravstvenog osiguranja rizikuješ financijske posljedice i smanjenje primanja\n• Doplatak se isplaćuje do visine obaveznog osiguranja",
    commonMistake: "Ne sklopiti zdravstveno osiguranje uopće — može dovesti do smanjenja Bürgergeld primanja.",
  },
];

const BASE: GuideContent = {
  header: {
    title: "Anlage SV — Sozialversicherung",
    source: "Jobcenter (SGB II)",
    formName: "Anlage SV",
    whoCanApply: "Privatno osigurani ili neosigurani Bürgergeld-primaoci",
    processingTime: "2–4 sedmice",
  },
  steps: STEPS,
};

export default function AnlageSVGuideContent() {
  return (
    <LocalizedGuide guideKey={GUIDE_KEY} base={BASE}>
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
              <p className="text-xs leading-relaxed text-foreground/80">
                📋 <strong>Anlage SV</strong> — utvrđuje status zdravstvenog i osiguranja za njegu
                tokom primanja Bürgergeld-a. Reguliše i doplatak za premije privatnog osiguranja.
              </p>
            </div>
    </LocalizedGuide>
  );
}
