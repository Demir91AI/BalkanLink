import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist der Hauptantrag?",
    bhsField: "Šta je Hauptantrag?",
    whatToWrite: "Hauptantrag je centralni dokument za podnošenje zahtjeva za Bürgergeld prema SGB II. Bez njega nije moguće ostvariti nikakva primanja.",
    whereToFind: "Formular dobiješ u Jobcentru ili online na jobcenter.digital.",
    commonMistake: "Mnogi misle da se može podnijeti retroaktivno — Bürgergeld počinje tek od datuma prijave, ne unazad!",
  },
  {
    deField: "Abschnitt A: Persönliche Daten",
    bhsField: "Lični podaci",
    whatToWrite: "Upiši: Vorname, Nachname, Geburtsdatum, adresu, IBAN bankovnog računa, Rentenversicherungsnummer i Steuer-ID.",
    whereToFind: "Steuer-ID nađeš na poreskom rješenju ili dopisu Finanzamta. Rentenvers.-Nr. na pismu DRV-a.",
    format: "Datum: DD.MM.YYYY | IBAN: DE + 20 cifara",
    commonMistake: "IBAN bez BIC je dovoljno — ne treba ti međunarodna kontonummer.",
  },
  {
    deField: "Abschnitt B: Nationalität/Aufenthalt",
    bhsField: "Državljanstvo i boravak",
    whatToWrite: "Ako si njemački državljanin → označi 'Nein' kod svih pitanja o boravišnoj dozvoli. Ako nisi → navedi vrstu i rok važenja dozvole.",
    commonMistake: "Ne popuniti status boravka ako nisi njemački državljanin — zahtjev se odbija.",
  },
  {
    deField: "Abschnitt C: Antragsdatum",
    bhsField: "Datum zahtjeva",
    whatToWrite: "Izaberi 'ab sofort' (od odmah) ako je moguće. NIKADA ne postavljaj kasniji datum!",
    commonMistake: "Postaviti budući datum umjesto 'ab sofort' — svaki dan čekanja je izgubljen novac.",
    note: "Bürgergeld počinje od datuma prijave, ne retroaktivno!",
  },
  {
    deField: "Abschnitt D: Lebenssituation",
    bhsField: "Životna situacija",
    whatToWrite: "Navedi: bračni status, radnu sposobnost, trudnoću, školu/studij.\n\nOvo određuje koje dodatne anlagen su potrebne.",
    commonMistake: "Pogrešno procijeniti radnu sposobnost — ako nisi siguran, pitaj ljekara.",
  },
  {
    deField: "Abschnitt E–F: Bisherige Situation & KV",
    bhsField: "Prethodna situacija i zdravstveno",
    whatToWrite: "Abschnitt E: Navedi zaposlenja i primanja posljednjih 5 godina.\nAbschnitt F: Navedi zdravstveno osiguranje (GKV ili PKV) i priloži potvrdu.",
    whereToFind: "Potvrdu krankenkasse možeš zatražiti telefonski ili online.",
    commonMistake: "Zaboraviti potvrdu krankenkasse — zahtjev je nepotpun bez nje.",
  },
  {
    deField: "Abschnitt G–H: Wohnsituation & Anlagen",
    bhsField: "Stanovanje i potrebne anlagen",
    whatToWrite: "Abschnitt G: Navedi s kim živiš → ovo određuje koje dodatne formulare moraš priložiti.\nAbschnitt H: Provjeri listu potrebnih anlaga.\n\nPflicht: VM + EK (za svaku osobu 15+)\nPri najmu: KDU\nDijete <15: KI\nPartner: WEP\nSamozaposleni: EKS",
    commonMistake: "Zaboraviti Anlage VM — uvijek se prilaže uz Hauptantrag!",
  },
  {
    deField: "Abschnitt I: Unterschrift",
    bhsField: "Potpis i predaja",
    whatToWrite: "Datum + vlastoručni potpis. Bez potpisa je formular NEVAŽEĆI!\n\nPredaj u Jobcenter lično, poštom ili online na jobcenter.digital.",
    commonMistake: "Zaboraviti potpis — najčešći razlog za vraćanje formulara.",
  },
];

export default function HauptantragGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Hauptantrag Bürgergeld (HA)"
        source="Jobcenter (SGB II)"
        formName="Hauptantrag auf Bürgergeld"
        whoCanApply="Sve osobe koje prvi put podnose zahtjev za Bürgergeld."
        processingTime="2–6 sedmica od podnošenja"
        requirements={[
          "Personalausweis ili Reisepass",
          "Mietvertrag ili dokaz o vlasništvu",
          "Kontoauszüge posljednja 3 mjeseca (svi računi)",
          "Dokaz o prihodima (platne liste, rješenja)",
          "Potvrda zdravstvenog osiguranja",
          "Steuerliche Identifikationsnummer",
        ]}
        commonMistakes={[
          "Postaviti kasniji datum zahtjeva — primanja počinju tek od datuma prijave!",
          "Zaboraviti Anlage VM — uvijek ide uz Hauptantrag",
          "IBAN bez BIC je dovoljno — ne treba međunarodna kontonummer",
        ]}
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ℹ️ <strong>Koje anlagen su potrebne uz Hauptantrag?</strong><br />
          Pflicht: VM + EK (za svaku osobu 15+) | Pri najmu: KDU | Dijete &lt;15: KI | Partner: WEP | Samozaposleni: EKS
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="hauptantrag" pdfUrl="https://www.arbeitsagentur.de/datei/antrag-arbeitslosengeld-2_ba012907.pdf" />
    </div>
  );
}
