import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterformularCTA from "./MusterformularCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage UH1?",
    bhsField: "Šta je Anlage UH1?",
    whatToWrite: "Anlage UH1 služi za provjeru alimentacijskih prava nakon rastave, razvoda ili raskida životnog partnerstva.",
    commonMistake: "Misliti da Jobcenter automatski zna za alimentaciju — moraš sam/a prijaviti!",
  },
  {
    deField: "Abschnitt C: Familiäre Situation",
    bhsField: "Porodična situacija",
    whatToWrite: "Označi odgovarajuće:\n• Oženjen/udata ali trajno odvojeno žive\n• Razveden/a\n• Životno partnerstvo raskinuto\n\nNavedi datum vjenčanja I datum rastave.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "Netačan datum rastave — utječe na pravni status alimentacije.",
  },
  {
    deField: "Abschnitt D: Daten des Ex-Partners",
    bhsField: "Podaci bivšeg partnera",
    whatToWrite: "Navedi: ime, prezime, datum rođenja, posljednju poznatu adresu.\n\nPosljednja poznata adresa je važna — Jobcenter može tražiti alimentaciju od bivšeg partnera!",
    commonMistake: "Adresa bivšeg partnera neaktualna — i 'unbekannt' (nepoznato) je validno.",
  },
  {
    deField: "Abschnitt E: Unterhaltszahlungen",
    bhsField: "Alimentacijske isplate",
    whatToWrite: "Da li se alimentacija plaća?\n• Da → navedi mjesečni iznos + priloži dokaze\n• Postoji li Unterhaltstitel (sudska odluka)? → priloži kopiju",
    commonMistake: "Alimentaciju prešutjeti → smatra se prihodom i obračunava se!",
  },
  {
    deField: "Abschnitt F–G: Vertretung & Unterschrift",
    bhsField: "Pravno zastupanje i potpis",
    whatToWrite: "Abschnitt F: Da li imaš advokata/zastupnika? Ako da → navedi podatke.\nAbschnitt G: Eventualne napomene.\nPotpis: Datum + vlastoručni potpis.",
    commonMistake: "Ne prijaviti materijalne usluge (npr. korištenje auta) — to se računa kao alimentacija!",
  },
];

export default function AnlageUH1GuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage UH1 — Trennungsunterhalt"
        source="Jobcenter (SGB II)"
        formName="Anlage UH1"
        whoCanApply="Osobe u BG koje su razdvojene, razvedene ili čije je životno partnerstvo raskinuto."
        processingTime="Obrađuje se uz Hauptantrag"
        requirements={[
          "Presuda o razvodu / sporazum o rastavi",
          "Unterhaltstitel ili pismeni dogovor",
          "Kontoauszüge (dokaz o primanjima alimentacije)",
          "Posljednja poznata adresa bivšeg partnera",
        ]}
        commonMistakes={[
          "Adresu bivšeg partnera ne navesti — i 'nepoznato' je validno",
          "Alimentaciju prešutjeti → smatra se prihodom",
          "Materijalne usluge (korištenje auta itd.) ne navesti",
        ]}
      />
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ⚠️ <strong>Alimentacijski zahtjevi moraju biti pokrenuti!</strong> Jobcenter može preuzeti alimentacijski zahtjev na sebe (§ 33 SGB II) i sam tražiti od obveznika.
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA musterSlug="anlage-uh1" pdfUrl="https://www.arbeitsagentur.de/datei/anlage-uh1_ba015345.pdf" />
    </div>
  );
}
