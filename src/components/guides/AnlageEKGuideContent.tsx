import MusterformularCTA from "@/components/guides/MusterformularCTA";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage EK?",
    bhsField: "Šta je Anlage EK?",
    whatToWrite: "Anlage EK sadrži podatke o prihodima svake osobe starije od 15 godina u Bedarfsgemeinschaft. Za svaku osobu se popunjava zasebna Anlage EK!",
    commonMistake: "Jedna Anlage EK za cijelu porodicu — svaka osoba 15+ treba vlastitu!",
  },
  {
    deField: "Abschnitt A–B: Personen",
    bhsField: "Podnosilac i osoba za koju važi EK",
    whatToWrite: "Abschnitt A: Podaci podnosioca zahtjeva.\nAbschnitt B: Podaci osobe za koju se EK popunjava. Ako je ista osoba → isti podaci u A i B.",
    commonMistake: "Zamijeniti podatke podnosioca i osobe za koju se EK popunjava.",
  },
  {
    deField: "Abschnitt C: Einkommensarten",
    bhsField: "Vrste prihoda",
    whatToWrite: "Označi SVE vrste prihoda:\n• Zaposlenje (Erwerbstätigkeit)\n• Samozaposlenje\n• Kindergeld (čak i ako dolazi za dijete!)\n• Renta, alimentacija, socijalna davanja\n• Minijob (520€ poslovi MORAJU biti navedeni!)",
    commonMistake: "Kindergeld zaboraviti — iako je za dijete, osoba koja ga prima mora ga navesti ovdje!\nMinijob zaboraviti — svi poslovi se moraju prijaviti.",
  },
  {
    deField: "Abschnitt C: Arbeitgeber-Daten",
    bhsField: "Podaci poslodavca",
    whatToWrite: "Ako imaš zaposlenje → navedi ime i adresu poslodavca, datum početka, vrstu ugovora.",
    whenToLeaveEmpty: "Ako nemaš zaposlenje → preskoči dio o poslodavcu.",
    commonMistake: "Ne popunjavati ako nemaš zaposlenje.",
  },
  {
    deField: "Abschnitt D: Werbungskosten",
    bhsField: "Troškovi putovanja na posao",
    whatToWrite: "Navedi udaljenost stan–posao (u km) i broj radnih dana sedmično. Ovo smanjuje iznos koji se obračunava!",
    format: "Udaljenost: XX km | Dani: X/sedmično",
    commonMistake: "Ne navesti troškove putovanja — smanjuju anrechenbares Einkommen!",
  },
  {
    deField: "Abschnitt E: Unterschrift",
    bhsField: "Potpis",
    whatToWrite: "Datum + vlastoručni potpis.",
    commonMistake: "Zaboraviti potpis.",
  },
];

export default function AnlageEKGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage EK — Einkommen"
        source="Jobcenter (SGB II)"
        formName="Anlage EK"
        whoCanApply="Svaka osoba starija od 15 godina u Bedarfsgemeinschaft."
        processingTime="Obrađuje se uz Hauptantrag/WBA"
        requirements={[
          "Lohnabrechnung(en) posljednja 3 mjeseca",
          "Kontoauszüge (dokaz o primanjima)",
          "Bescheide (Kindergeld, ALG I, renta itd.)",
          "Dokazi o troškovima putovanja na posao",
        ]}
        commonMistakes={[
          "Kindergeld zaboraviti — i to je prihod!",
          "Minijob ne navesti — čak i 520€ poslovi moraju biti prijavljeni",
          "Troškove putovanja ne navesti — smanjuju obračunati prihod",
        ]}
      />
      <div className="rounded-xl border border-orange-300 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ⚠️ Za svakog partnera i svaku osobu stariju od 15 godina potrebna je <strong>zasebna Anlage EK!</strong>
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA
        musterSlug="anlage-ek"
        pdfUrl="https://www.arbeitsagentur.de/buergergeld/antrag"
        pdfLabel="Anlage EK — Bürgergeld (BA)"
      />
    </div>
  );
}
