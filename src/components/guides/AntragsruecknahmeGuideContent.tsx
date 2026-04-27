import LocalizedGuide from "./LocalizedGuide";
import type { GuideContent } from "@/lib/guide-i18n";
import type { StepData } from "./SmartGuideWizardShared";

const GUIDE_KEY = "antragsruecknahme";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Antragsrücknahme?",
    bhsField: "Šta je Antragsrücknahme?",
    whatToWrite:
      "Sa ovim formularom povlačiš već podnesen zahtjev za Bürgergeld. Korisno ako se tvoja situacija promijenila (novi posao, drugi izvor primanja).\n\n⚠️ Povlačenje je NEOPOZIVO — primanja mogu početi tek od novog zahtjeva.\n⚠️ Formular vrijedi i BEZ potpisa — sama predaja je dovoljna.",
    whereToFind: "Formular dobiješ u Jobcentru ili na arbeitsagentur.de.",
    commonMistake: "Povlačenje se NE MOŽE poništiti! Nakon predaje zahtjev važi kao da nikad nije podnesen.",
  },
  {
    deField: "Abschnitt A: Angaben zur Person (1–9)",
    bhsField: "Lični podaci",
    whatToWrite: "Upiši:\n• Vorname, Nachname (1–2)\n• Geburtsdatum (3)\n• Adresa: Straße, Hausnr., PLZ, Ort (4–7)\n• Kundennummer (8) — na Jobcenter dopisima\n• BG-Nummer (9) — na Jobcenter dopisima",
    whereToFind: "Kundennummer i BG-Nummer nađeš na svakom Jobcenter dopisu — gore desno.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Ne znati Kundennummer — nađi je na bilo kojem Jobcenter pismu.",
  },
  {
    deField: "Abschnitt B: Erklärung (Feld 10)",
    bhsField: "Izjava o povlačenju",
    whatToWrite: "Polje 10: Upiši datum originalnog zahtjeva za Bürgergeld.\n\nTekst izjave je predštampan — pročitaj ga pažljivo prije predaje!\n\nPotvrđuješ da znaš:\n✓ Povlačenje se ne može poništiti\n✓ Primanja su moguća tek od novog zahtjeva\n✓ Zdravstveno osiguranje preko Jobcentra prestaje",
    commonMistake: "Ne kontaktirati Krankenkasse nakon povlačenja — odmah provjeriti dobrovoljno osiguranje!",
  },
  {
    deField: "Einreichen",
    bhsField: "Predaja i važne napomene",
    whatToWrite: "Predaj u Jobcentru (lično, poštom ili online).\n\n⚠️ Dokument je validan i BEZ potpisa!\n\nNakon povlačenja:\n• Nema više zdravstvenog osiguranja preko Jobcentra → ODMAH kontaktiraj Krankenkasse\n• Za dobrovoljno osiguranje moguć zahtjev za doplatak (§ 26 SGB II)\n• Za nova primanja — NOVI zahtjev mora biti podnesen",
    commonMistake: "Zaboraviti riješiti zdravstveno osiguranje — ostati bez osiguranja je ozbiljan rizik!",
    note: "Merkblätter 'Bürgergeld – SGB II' i 'Zuschuss zu KV/PV-Beiträgen (§ 26 SGB II)' moraju biti pročitani.",
  },
];

const BASE: GuideContent = {
  header: {
    title: "Erklärung der Antragsrücknahme",
    source: "Jobcenter (SGB II)",
    formName: "Antragsrücknahme (1 stranica)",
    whoCanApply: "Osobe koje žele povući Bürgergeld zahtjev",
    processingTime: "Odmah po predaji",
  },
  steps: STEPS,
};

export default function AntragsruecknahmeGuideContent() {
  return (
    <LocalizedGuide guideKey={GUIDE_KEY} base={BASE}>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
              <p className="text-xs leading-relaxed text-foreground/80">
                ⚠️ <strong>UPOZORENJE:</strong> Povlačenje zahtjeva je NEOPOZIVO!
                Nakon predaje, zahtjev važi kao da nikad nije podnesen. Zdravstveno osiguranje
                preko Jobcentra odmah prestaje — kontaktiraj Krankenkasse!
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
              <p className="text-xs leading-relaxed text-foreground/80">
                📋 <strong>Antragsrücknahme</strong> — formular za povlačenje već podnesenog
                Bürgergeld zahtjeva. Vrijedi i bez potpisa — predaja je dovoljna.
              </p>
            </div>
    </LocalizedGuide>
  );
}
