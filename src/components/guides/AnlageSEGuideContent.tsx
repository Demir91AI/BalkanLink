import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterCTA from "./MusterCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage SE?",
    bhsField: "Šta je Anlage SE?",
    whatToWrite:
      "Anlage SE ovlašćuje Jobcenter da od ljekara, bolnica i klinika zatraži medicinsku dokumentaciju vezanu za nesreću. Uvijek se podnosi ZAJEDNO sa Anlage UF.\n\nOmogućava provjeru zahtjeva za naknadu štete bez dodatnih pregleda.",
    whereToFind: "Formular dobiješ u Jobcentru. Uvijek uz Anlage UF.",
    commonMistake: "Izjava je DOBROVOLJNA — ali bez nje Jobcenter može naložiti pregled kod svog ljekara (Ärztlicher Dienst).",
  },
  {
    deField: "Abschnitt A & B: Persönliche Daten",
    bhsField: "Podaci o podnosiocu i oštećenoj osobi",
    whatToWrite: "A (1–4): Tvoji podaci — ime, prezime, datum, BG-Nr.\nB (5–7): Podaci oštećene osobe — ako si ti oštećen, isti podaci.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Zamijeniti podatke antragstellera i oštećene osobe — mogu biti različite osobe.",
  },
  {
    deField: "Abschnitt C: Ärzte/Kliniken (Felder 8–22)",
    bhsField: "Ljekari i bolnice",
    whatToWrite: "Upiši ime i adresu do 3 ljekara/bolnica koji su te liječili.\n\nAko imaš više od 3 — popuni dodatnu Anlage SE.",
    commonMistake: "Ne navesti sve ljekare/bolnice koji su te liječili — Jobcenter može propustiti važnu dokumentaciju.",
    example: "1. Charité Berlin, Charitéplatz 1, 10117 Berlin\n2. Dr. med. Erika Beispiel, Arztstraße 3, 10119 Berlin",
  },
  {
    deField: "Abschnitt D: Einsichtnahme bei Versicherung",
    bhsField: "Uvid u nalaze kod osiguranja štetnika",
    whatToWrite: "Dobrovoljan pristanak da Jobcenter može pregledati ljekarske nalaze iz spisa protivničkog osiguranja.\n\nNavedi ime i adresu osiguranja (23–27).",
    commonMistake: "Ovo je dobrovoljno ali preporučljivo — ubrzava postupak naknade štete.",
  },
  {
    deField: "Abschnitt E & F: Übersendung & Auswahl",
    bhsField: "Dostava nalaza i odabir izjava",
    whatToWrite: "E: Pristanak na dostavu nalaza protivničkom osiguranju (dobrovoljno, ali preporučljivo).\nF, Polje 28: Označi za koje dijelove daješ pristanak:\n☑ Abschnitt C — Schweigepflichtentbindung za ljekare\n☑ Abschnitt D — Uvid u nalaze kod osiguranja\n☑ Abschnitt E — Dostava nalaza osiguranju",
    commonMistake: "Ne označiti za koje sekcije daješ pristanak — Polje 28 je obavezno.",
  },
  {
    deField: "Unterschriften (29–34)",
    bhsField: "Potpisi",
    whatToWrite: "Potrebni potpisi:\n• Oštećena osoba (29–30)\n• Antragsteller potvrđuje (31–32)\n• Eventualno Betreuer/Vormund (33–34)\n\nIzjava vrijedi samo za konkretan slučaj i prestaje po završetku postupka. Može se opozvati u svako vrijeme.",
    commonMistake: "Zaboraviti potpis oštećene osobe — ako je to druga osoba od antragstellera, potrebna su OBA potpisa.",
  },
];

export default function AnlageSEGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage SE — Schweigepflichtentbindung"
        source="Jobcenter (SGB II)"
        formName="Anlage SE (3 stranice)"
        whoCanApply="Bürgergeld-primaoci koji podnose Anlage UF"
        processingTime="Zajedno sa Anlage UF"
      />
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ⚠️ <strong>Anlage SE</strong> se UVIJEK podnosi zajedno sa Anlage UF (Unfallfragebogen).
          Izjava je dobrovoljna, ali bez nje Jobcenter može naložiti dodatne preglede.
        </p>
      </div>
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Schweigepflichtentbindung</strong> — ovlašćenje za Jobcenter da zatraži
          medicinsku dokumentaciju od ljekara i bolnica vezanu za nesreću.
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterCTA formName="Anlage SE" institution="Jobcenter" musterPath="/musterformular/anlage-se" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-se_ba015341.pdf" />
    </div>
  );
}
