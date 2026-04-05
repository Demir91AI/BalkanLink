import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage KDU?",
    bhsField: "Šta je Anlage KDU?",
    whatToWrite: "Anlage KDU služi za navođenje troškova stanovanja (kirija i grijanje). Jobcenter preuzima troškove samo u 'angemessener' (primjerenoj) visini prema KdU-Richtwertima grada.",
    commonMistake: "Misliti da Jobcenter plaća svaku kiriju — postoje limiti po gradu i broju osoba!",
  },
  {
    deField: "Abschnitt A–B: Persönliche Daten & Unterkunft",
    bhsField: "Lični podaci i adresa stana",
    whatToWrite: "Abschnitt A: Ime, prezime, datum rođenja, BG-Nummer.\nAbschnitt B: Adresa stana, broj osoba, godina gradnje, broj soba, ukupna površina (m²).",
    format: "Površina u m² | Broj osoba u stanu",
    commonMistake: "Pogrešan broj osoba — utječe na granicu primjerenosti kirije!",
  },
  {
    deField: "Abschnitt C: Mietkosten",
    bhsField: "Troškovi najma",
    whatToWrite: "Razdvojeno navedi:\n• Grundmiete (osnovna kirija)\n• Nebenkosten (sporedni troškovi)\n• Heizkosten (grijanje)\n\nILI označi Pauschalmiete ako se plaća sve u jednom.",
    format: "Grundmiete: XXX € | Nebenkosten: XXX € | Heizkosten: XXX €",
    commonMistake: "Navesti grijanje zajedno sa Nebenkosten — uvijek razdvojiti! Označiti i Pauschalmiete i pojedinačne stavke — samo jedna opcija!",
  },
  {
    deField: "Abschnitt D: Eigentum (ako je primjenjivo)",
    bhsField: "Vlasništvo (ako imaš vlastiti stan/kuću)",
    whatToWrite: "Samo ako živiš u vlastitu nekretninu → navedi Grundsteuer, osiguranje, kredit i troškove održavanja.",
    whenToLeaveEmpty: "Ako živiš u najmu → preskoči Abschnitt D i idi na E.",
    commonMistake: "Popuniti Abschnitt D ako si u najmu — samo za vlasnike nekretnina.",
  },
  {
    deField: "Abschnitt E: Energiequellen & Heizung",
    bhsField: "Izvori energije i grijanje",
    whatToWrite: "Navedi vrstu goriva (gas, nafta, struja), vrstu grijanja (centralno, pojedinačno), način kuhanja i pripremu tople vode.",
    commonMistake: "Zaboraviti navesti izvor tople vode — može utjecati na obračun.",
  },
  {
    deField: "Abschnitt F–G: Direktzahlung & Unterschrift",
    bhsField: "Direktna uplata i potpis",
    whatToWrite: "Abschnitt F: Ako želiš da Jobcenter plaća kiriju direktno stanodavcu → navedi ime, adresu i IBAN stanodavca.\nAbschnitt G: Datum + potpis.",
    commonMistake: "Zaboraviti IBAN stanodavca kod direktne uplate → kirija se neće uplatiti.",
  },
];

export default function AnlageKDUGuideContent() {
  return (
    <div className="space-y-8">
      <div className="mb-4 rounded-xl border border-blue-500/30 bg-blue-500/[0.08] p-4 flex items-start gap-3">
        <span className="text-xl shrink-0">💻</span>
        <div>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-1">Ovaj prilog se popunjava online</p>
          <p className="text-xs text-muted-foreground mb-2">Bürgergeld anlagen se podnose isključivo putem Jobcenter Digital portala. Papirna verzija se više ne prihvata u većini jobcentara.</p>
          <a href="https://jobcenter.digital" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors">🌐 Otvori Jobcenter Digital →</a>
        </div>
      </div>
      <GuideInfoHeader
        title="Anlage KDU — Kosten der Unterkunft"
        source="Jobcenter (SGB II)"
        formName="Anlage KDU"
        whoCanApply="Svi podnosioci zahtjeva koji imaju troškove stanovanja (najam ili vlasništvo)."
        processingTime="Obrađuje se uz Hauptantrag/WBA"
        requirements={[
          "Aktualni Mietvertrag",
          "Posljednji obračun grijanja i sporednih troškova",
          "Mietbescheinigung (popunjava stanodavac)",
          "Kod vlasništva: Grundsteuerbescheid, osiguranje, kreditni ugovor",
        ]}
        commonMistakes={[
          "Grijanje navesti zajedno sa Nebenkosten — uvijek razdvojiti!",
          "Pauschalmiete I pojedinačne stavke označiti — samo jedna opcija",
          "IBAN stanodavca zaboraviti kod direktne uplate",
        ]}
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ℹ️ <strong>KdU-Richtwerte Berlin (2024):</strong><br />
          1 osoba: max. 563 € | 2 osobe: max. 678 € | 3 osobe: max. 815 €<br />
          <span className="text-muted-foreground">Izvor: Jobcenter Berlin — pri prekoračenju može uslijediti Kostensenkungsverfahren!</span>
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
    </div>
  );
}
