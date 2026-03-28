import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Anspruchsvoraussetzungen",
    bhsField: "Ko može dobiti",
    whatToWrite: "Osobe s niskim primanjima koje plaćaju kiriju ili otplaćuju stambeni kredit",
    format: "Iznos zavisi od prihoda, broja ukućana i visine kirije — kalkulator na wohngeld.org",
    commonMistake: "Ne prijaviti jer misle da ne ispunjavaju uslov — uvijek provjeri kalkulatorom",
    note: "Uslov: ne smiješ primati Bürgergeld ili Sozialhilfe — jedno ili drugo, ne oboje",
  },
  {
    deField: "Antrag einreichen",
    bhsField: "Gdje se podnosi",
    whatToWrite: "Wohngeldstelle pri gradskoj upravi (Stadtverwaltung/Rathaus). Mnogi gradovi imaju online prijavu",
    whereToFind: "Dokumenti: Mietvertrag, zadnje 3 platne liste, Meldebescheinigung, IBAN",
    commonMistake: "Ići u Jobcenter umjesto Wohngeldstelle",
  },
  {
    deField: "Höhe und Dauer",
    bhsField: "Iznos i trajanje",
    whatToWrite: "Odobrava se na 12 mjeseci, zatim se podnosi nova prijava",
    format: "Odmah prijaviti promjene prihoda ili kirije",
    commonMistake: "Zaboraviti obnoviti prijavu nakon 12 mjeseci i izgubiti naknadu",
  },
  {
    deField: "Wohngeld und Nebenkosten",
    bhsField: "Wohngeld i Nebenkostenabrechnung",
    whatToWrite: "Wohngeld pokriva dio Kaltmiete — Nebenkosten se posebno razmatraju",
    commonMistake: "Ne prijaviti povećanje kirije Wohngeldstelle — može uticati na iznos naknade",
  },
];

export default function WohngeldGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Stambena naknada (Wohngeld)"
        source="Wohngeldstelle"
        formName="Antrag auf Wohngeld"
        whoCanApply="Osobe s niskim primanjima koje plaćaju kiriju ili otplaćuju stambeni kredit."
        processingTime="4-6 sedmica od podnošenja zahtjeva"
        requirements={[
          "Mietvertrag (ugovor o najmu)",
          "Zadnje 3 platne liste ili dokaz o prihodu",
          "Meldebescheinigung",
          "IBAN bankovnog računa",
          "Dokaz o Nebenkosten (komunalne troškove)",
        ]}
        commonMistakes={[
          "Ići u Jobcenter umjesto Wohngeldstelle",
          "Ne obnoviti prijavu nakon 12 mjeseci",
          "Ne prijaviti promjene prihoda ili kirije",
          "Misliti da ne ispunjavaš uslov bez provjere kalkulatorom",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">Više informacija o Wohngeld</p>
        <a href="https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm font-medium" style={{ color: "#3B82F6" }}>
          🔗 Službena stranica BMWSB
        </a>
      </div>
    </div>
  );
}
