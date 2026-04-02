import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterCTA from "./MusterCTA";

const STEPS: StepData[] = [
  {
    deField: "Anspruchsvoraussetzungen",
    bhsField: "Ko može dobiti",
    whatToWrite: "Roditelji koji žive u Njemačkoj, brinu o djetetu i ne rade ili rade manje od 32 sata sedmično",
    format: "65-67% prethodne neto plaće, minimum 300€ maksimum 1800€ mjesečno",
    commonMistake: "Misliti da samo majka može dobiti — otac ima pravo na 2 dodatna Partnermonate",
    note: "Rok za prijavu: može se prijaviti retroaktivno za 3 mjeseca unazad — ne čekaj predugo!",
  },
  {
    deField: "ElterngeldPlus vs Basiselterngeld",
    bhsField: "ElterngeldPlus vs Basiselterngeld",
    whatToWrite: "Basiselterngeld: puna suma, maksimalno 14 mjeseci. ElterngeldPlus: polovina sume ali duplo duže — bolje ako planiraš raditi part-time",
    commonMistake: "Ne znati da postoji ElterngeldPlus i propustiti bolju opciju",
  },
  {
    deField: "Erforderliche Unterlagen",
    bhsField: "Potrebni dokumenti",
    whatToWrite: "Potvrda o prihodu zadnjih 12 mjeseci, Geburtsurkunde djeteta, Meldebescheinigung, IBAN",
    whereToFind: "Potvrda prihoda od poslodavca, ostalo iz ličnih dokumenata",
    commonMistake: "Ne uključiti bonuse i Weihnachtsgeld u izračun — utiče na iznos",
  },
  {
    deField: "Antrag einreichen",
    bhsField: "Gdje se podnosi",
    whatToWrite: "Elterngeldstelle — ne Familienkasse! Različita ustanova od Kindergeld",
    whereToFind: "Većina saveznih zemalja ima online prijavu na elterngeld-digital.de",
    commonMistake: "Ići na Familienkasse umjesto Elterngeldstelle",
  },
  {
    deField: "Kombination mit Kindergeld",
    bhsField: "Kombinacija s Kindergeld",
    whatToWrite: "Elterngeld i Kindergeld su RAZLIČITE naknade — prijaviti oba odvojeno. Kindergeld: 250€ po djetetu, prijava kod Familienkasse. Elterngeld: 65-67% plaće, prijava kod Elterngeldstelle",
    commonMistake: "Misliti da jedno isključuje drugo — oba se primaju istovremeno",
  },
];

export default function ElterngeldGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Roditeljska naknada (Elterngeld)"
        source="Elterngeldstelle"
        formName="Antrag auf Elterngeld"
        whoCanApply="Roditelji koji žive u Njemačkoj, brinu o djetetu i ne rade ili rade manje od 32h/sedmici."
        processingTime="4-8 sedmica od podnošenja kompletnog zahtjeva"
        requirements={[
          "Popunjen obrazac za Elterngeld",
          "Geburtsurkunde (rodni list djeteta)",
          "Potvrda o prihodu za zadnjih 12 mjeseci",
          "Meldebescheinigung",
          "IBAN bankovnog računa",
          "Boravišna dozvola (za ne-EU državljane)",
        ]}
        commonMistakes={[
          "Podnijeti zahtjev u Familienkasse umjesto Elterngeldstelle",
          "Ne uključiti bonuse i Weihnachtsgeld u izračun prihoda",
          "Propustiti rok od 3 mjeseca za retroaktivnu prijavu",
          "Ne znati za ElterngeldPlus opciju",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">Više informacija na Familienportal</p>
        <a href="https://familienportal.de/familienportal/familienleistungen/elterngeld" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm font-medium" style={{ color: "#3B82F6" }}>
          🔗 Službena stranica Elterngeld
        </a>
      </div>
    </div>
  );
}
