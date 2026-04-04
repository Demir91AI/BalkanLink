import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage UF?",
    bhsField: "Šta je Anlage UF (Unfallfragebogen)?",
    whatToWrite:
      "Anlage UF se popunjava kad si ti ili član tvoje BG povrijeđen/oštećen od strane treće osobe i zbog toga tražiš Bürgergeld. Jobcenter provjerava da li postoje zahtjevi za naknadu štete koji prelaze na Jobcenter (§ 116 SGB X).",
    whereToFind: "Formular dobiješ u Jobcentru. Predaj ga zajedno sa Bürgergeld zahtjevom.",
    commonMistake: "Nikada ne predavaj originale — samo kopije! Od trenutka prelaza zahtjeva NE smiješ ništa poduzimati što bi umanjilo pravo Jobcentra (npr. nagodba bez znanja Jobcentra).",
  },
  {
    deField: "Abschnitte A & B: Personen",
    bhsField: "Podaci o podnosiocu i oštećenoj osobi",
    whatToWrite: "A (1–4): Tvoji podaci — ime, prezime, datum, BG-Nr.\nB (5–11): Podaci oštećene osobe + Krankenkasse (8–9) i Rentenversicherungsträger (10–11). Ako si ti oštećen — isti podaci.",
    commonMistake: "Ne navesti podatke o zdravstvenom i penzionom osiguranju oštećene osobe.",
  },
  {
    deField: "Abschnitte C & D: Unfalldaten & Schädiger",
    bhsField: "Podaci o nesreći i štetniku",
    whatToWrite: "C: Dan nesreće (12), mjesto (13), broj štete (14).\nD: Podaci osobe koja je prouzrokovala štetu (15–26) — ime, adresa, osiguranje odgovornosti.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Ne navesti podatke o haftpflicht osiguranju štetnika — ključno za naknadu.",
  },
  {
    deField: "Abschnitte E & F: Schadensersatz & Verletzungen",
    bhsField: "Naknada štete i povrede",
    whatToWrite: "E (27–35): Da li već postoji postupak za naknadu štete? Ako da — navedi detalje, advokata i status.\nF (36–37): Opiši povrede konkretno. Ako postoji ljekarski nalaz → priloži kopiju + Anlage SE!",
    commonMistake: "Ako postoje povrede, UVIJEK priložiti i Anlage SE (Schweigepflichtentbindung).",
    example: "Schleudertrauma (HWS-Distorsion Grad II), nagnječenja lijeve ruke i koljena.",
  },
  {
    deField: "Abschnitte G & H: Polizei & Unfallart",
    bhsField: "Policija i vrsta nesreće",
    whatToWrite: "G (38–39): Da li je nesreća policijski evidentirana? Postoji li krivični postupak?\nH (40): Označi vrstu nesreće:\n• Arbeitsunfall → Abschnitt I\n• Verkehrsunfall → Abschnitt J\n• Sonstiges → Abschnitt K",
    commonMistake: "Ne priložiti policijski izvještaj ako postoji — važan dokaz.",
  },
  {
    deField: "Abschnitte I/J/K: Unfallspezifisch",
    bhsField: "Detalji prema vrsti nesreće",
    whatToWrite: "Ovisno o vrsti nesreće popuni odgovarajući dio:\n• I: Podaci o poslodavcu (radna nesreća)\n• J: Podaci o vozilima, osiguranjima, učesnicima (saobraćajna)\n• K: Opis drugih okolnosti",
    commonMistake: "Ne popuniti odgovarajući abschnitt za vrstu nesreće — formular se vraća.",
  },
  {
    deField: "Abschnitt L: Unterschrift",
    bhsField: "Potpis i važne napomene",
    whatToWrite: "Datum i potpis. Nikada originale, samo kopije!\n\nVažno: Nakon prelaza zahtjeva ne smiješ:\n• Sklapati nagodbe bez znanja Jobcentra\n• Poduzimati bilo šta što umanjuje pravo Jobcentra na naknadu",
    commonMistake: "Sklopiti nagodbu s osiguranjem bez znanja Jobcentra — može dovesti do povrata isplaćenog Bürgergeld-a.",
  },
];

export default function AnlageUFGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage UF — Unfallfragebogen"
        source="Jobcenter (SGB II)"
        formName="Anlage UF (7 stranica)"
        whoCanApply="Bürgergeld-primaoci čija potreba je nastala zbog nesreće/štete od treće osobe"
        processingTime="4–8 sedmica"
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Anlage UF</strong> — upitnik o nesreći/šteti od treće osobe.
          Jobcenter provjerava da li pravo na naknadu štete prelazi na Jobcenter (§ 116 SGB X).
          Uvijek priložiti i Anlage SE!
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="anlage-uf" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-uf_ba015340.pdf" />
    </div>
  );
}
