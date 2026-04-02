import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterCTA from "./MusterCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage VM?",
    bhsField: "Šta je Anlage VM?",
    whatToWrite: "Anlage VM je samoizjava o imovini svih osoba u Bedarfsgemeinschaft. Jobcenter provjerava da li postoji iskoristiva imovina. Popunjava se JEDNOM za cijelu BG.",
    commonMistake: "Misliti da se VM popunjava za svaku osobu posebno — VM je jedna za cijelu BG!",
  },
  {
    deField: "Abschnitt B: Immobilien",
    bhsField: "Nekretnine",
    whatToWrite: "Navedi: da li posjeduješ vlastiti stan/kuću (Eigenheim)? Da li posjeduješ drugu nekretninu?\n\nVlastititi stan koji koristiš je obično zaštićen (Schonvermögen).",
    commonMistake: "Zaboraviti navesti nekretninu u drugoj zemlji — sve se mora prijaviti!",
  },
  {
    deField: "Abschnitt C: Kraftfahrzeuge",
    bhsField: "Vozila",
    whatToWrite: "Za svako vozilo navedi: vlasnik, marka, godina proizvodnje, kilometraža, procijenjena vrijednost.",
    format: "Vrijednost u € (procjena sa mobile.de ili ADAC)",
    commonMistake: "Precijeniti vrijednost vozila — koristi mobile.de za realnu procjenu. Auto do ca. 7.500 € je obično zaštićen.",
  },
  {
    deField: "Abschnitt D: Schenkungen",
    bhsField: "Pokloni (posljednjih 10 godina!)",
    whatToWrite: "Navedi SVE poklone u posljednjih 10 godina — uključujući novčane poklone trećim osobama.",
    commonMistake: "Zaboraviti poklone iz prošlosti — Jobcenter može ovo smatrati prebacivanjem imovine (Vermögensverschiebung)!",
  },
  {
    deField: "Abschnitt E: Konten & Geldanlagen",
    bhsField: "Računi i ulaganja",
    whatToWrite: "Navedi SVE:\n• Gotovina (Bargeld)\n• Girokonten (svi!)\n• Sparkonten\n• Wertpapiere (dionice)\n• Kriptovalute\n• Bausparvertrag\n• Riester renta\n• Osiguranja sa povratom\n\nPayPal, Trade Republic itd. su TAKOĐE računi!",
    commonMistake: "PayPal račun zaboraviti — to JE konto i mora biti naveden!\nKriptovalute zaboraviti — tretiraju se kao Wertpapiere!",
  },
  {
    deField: "Abschnitt F–G: Selbständigkeit & Unterschrift",
    bhsField: "Samozaposlenje i potpis",
    whatToWrite: "Abschnitt F: Samo ako je neko u BG samozaposlen — navedi ime, trajanje i status penzijskog osiguranja.\nAbschnitt G: Datum + potpis.",
    whenToLeaveEmpty: "Abschnitt F preskočiti ako niko u BG nije samozaposlen.",
    commonMistake: "Zaboraviti potpis.",
  },
];

export default function AnlageVMGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage VM — Vermögen"
        source="Jobcenter (SGB II)"
        formName="Anlage VM"
        whoCanApply="Svaka Bedarfsgemeinschaft — formular se popunjava JEDNOM za cijelu BG."
        processingTime="Obrađuje se uz Hauptantrag"
        requirements={[
          "Kontoauszüge (svi računi)",
          "KFZ-Zulassung + procjena vrijednosti",
          "Izvodi štednje / depozitne vrijednosti",
          "Bausparvertrag pregled",
          "Dokumenti o nekretninama (ako postoje)",
        ]}
        commonMistakes={[
          "PayPal račun zaboraviti — to JE konto!",
          "Kriptovalute zaboraviti — tretiraju se kao Wertpapiere",
          "Poklone posljednjih 10 godina zaboraviti",
        ]}
      />
      <div className="rounded-xl border border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ✅ <strong>Schonvermögen 2024 — šta je zaštićeno?</strong><br />
          • Po osobi: 15.000 € osnovni freibetrag<br />
          • Vlastiti stan (primjerene veličine)<br />
          • Starosna štednja do datuma penzionisanja<br />
          • Jedno primjereno vozilo (vrijednost do ca. 7.500 €)
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterCTA formName="Anlage VM" institution="Bundesagentur für Arbeit" musterPath="/musterformular/anlage-vm" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-vm_ba012912.pdf" />
    </div>
  );
}
