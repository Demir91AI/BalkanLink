import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage EKS?",
    bhsField: "Šta je Anlage EKS?",
    whatToWrite: "Anlage EKS sadrži detaljne podatke o prihodima i rashodima samozaposlene ili freelance osobe u BG. Dopunjuje Anlage EK.",
    commonMistake: "Misliti da EKS zamjenjuje EK — EKS se predaje DODATNO uz EK!",
    note: "EKS se mora predati DVAPUT: 1× na početku (vorläufig = procjena) i 1× nakon isteka (abschließend = stvarni podaci + dokazi).",
  },
  {
    deField: "Abschnitt C: Vorläufig oder Abschließend",
    bhsField: "Privremena ili konačna izjava",
    whatToWrite: "Označi da li je ovo:\n• Vorläufig (privremena) = procijenjene vrijednosti za narednih 6 mj.\n• Abschließend (konačna) = stvarne vrijednosti nakon isteka perioda.\n\nNavedi Bewilligungszeitraum (6 mjeseci).",
    commonMistake: "Zamijeniti vorläufig i abschließend — vorläufig je procjena, abschließend su stvarni podaci!",
  },
  {
    deField: "Abschnitt D: Firmendaten",
    bhsField: "Podaci o firmi",
    whatToWrite: "Navedi: ime firme, adresu, vrstu djelatnosti (Gewerbe), datum početka, pravni oblik (Einzelunternehmen, GbR itd.).",
    commonMistake: "Netačan pravni oblik može utjecati na obračun.",
  },
  {
    deField: "Abschnitt F: Details zur Tätigkeit",
    bhsField: "Detalji o djelatnosti",
    whatToWrite: "Korištenje kancelarije, osoblje (zaposlenici), PDV-obaveza (Umsatzsteuerpflicht), subvencije.",
    commonMistake: "Zaboraviti navesti korištenje kućne kancelarije (Homeoffice) — utječe na troškove.",
  },
  {
    deField: "Abschnitt G: Tabelle A — Einnahmen",
    bhsField: "Tabela A — Prihodi po mjesecima",
    whatToWrite: "Upiši mjesečne prihode:\n• A1: Poslovni prihodi (Betriebseinnahmen)\n• A2: Privatentnahmen\n• A3: Ostali prihodi\n• A5.1: Porez na promet (Umsatzsteuer)",
    commonMistake: "Privatentnahmen zaboraviti u Tabeli A — moraju biti navedene!",
  },
  {
    deField: "Abschnitt G: Tabelle B — Ausgaben",
    bhsField: "Tabela B — Rashodi po mjesecima",
    whatToWrite: "Tabela B (3 dijela):\n• B3: Troškovi prostora\n• B4: Osiguranja\n• B5: Reklama\n• B6: Prevoz\n• B11: Telefon\n• B15: Samo kamate kredita (Schuldzinsen), NE otplata!\n• B17/B18: Pretporez i PDV\n\nGewinn = Einnahmen minus Ausgaben",
    commonMistake: "Tilgungsraten (rate otplate) navesti kao rashod — samo Schuldzinsen (kamate) su odbitne, ne otplata!",
  },
  {
    deField: "Abschnitt E + H: Unterschriften",
    bhsField: "Potpisi",
    whatToWrite: "Abschnitt E: Potpis podnosioca zahtjeva.\nAbschnitt H: Potpis samozaposlene osobe (može biti druga osoba u BG).",
    commonMistake: "Zaboraviti potpis samozaposlene osobe — oba potpisa su obavezna!",
  },
];

export default function AnlageEKSGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage EKS — Einkommen Selbständige"
        source="Jobcenter (SGB II)"
        formName="Anlage EKS"
        whoCanApply="Svaka samozaposlena ili freelance osoba u Bedarfsgemeinschaft."
        processingTime="Obrađuje se uz Hauptantrag/WBA"
        requirements={[
          "Betriebswirtschaftliche Auswertung (BWA)",
          "Porezna rješenja / Vorauszahlungsbescheide",
          "Dokazi za poslovne rashode",
          "Fahrtenbuch (ako postoji poslovno vozilo)",
          "Kreditni ugovori (ako postoje poslovni krediti)",
        ]}
        commonMistakes={[
          "Privatentnahmen u Tabeli A zaboraviti",
          "Rate otplate navesti — samo kamate (Schuldzinsen) su odbitne!",
          "Vorläufig i abschließend zamijeniti",
        ]}
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ℹ️ <strong>EKS se mora predati DVAPUT:</strong><br />
          1× na početku (vorläufig = procjena) | 2× nakon isteka (abschließend = stvarni podaci + dokazi)
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
    </div>
  );
}
