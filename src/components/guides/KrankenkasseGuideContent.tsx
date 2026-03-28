import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Krankenkasse wählen",
    bhsField: "Odabir Krankenkasse",
    whatToWrite: "Odaberi javnu zdravstvenu osiguravajuću kuću — možeš birati između TK, AOK, Barmer, DAK i dr.",
    commonMistake: "Misliti da moraš ići u Krankenkasse fizički — sve se može online ili poštom",
    note: "Preporuka: Techniker Krankenkasse (TK) — najpopularnija, odlična app, engleski servis",
  },
  {
    deField: "Anmeldung beim Arbeitgeber",
    bhsField: "Prijava kod poslodavca",
    whatToWrite: "Odaberi Krankenkasse i javi poslodavcu naziv — oni sve ostalo prijavljuju sami",
    format: "Samo reci ili napiši: 'Ich möchte bei der [naziv] versichert sein'",
    commonMistake: "Čekati da poslodavac odabere — imaš pravo sam odabrati",
    note: "Ako ne odabereš, poslodavac te prijavljuje u default Krankenkasse",
  },
  {
    deField: "Familienversicherung",
    bhsField: "Familienversicherung (za porodicu)",
    whatToWrite: "Supružnik i djeca mogu biti besplatno osigurani kroz tebe ako ne rade ili malo zarađuju",
    format: "Uslov: supružnik zarađuje manje od 505€ mjesečno",
    commonMistake: "Plaćati zasebno osiguranje kad može biti besplatno kroz Familienversicherung",
  },
  {
    deField: "Versicherungskarte",
    bhsField: "Versicherungskarte (kartica)",
    whatToWrite: "Elektronska zdravstvena kartica koju dobijaš poštom od Krankenkasse",
    format: "Stiže 2-4 sedmice nakon prijave",
    commonMistake: "Ići kod doktora bez kartice i ne znati da možeš uzeti privremenu potvrdu",
    note: "Ako nemaš karticu: uzmi Bescheinigung (potvrdu) od Krankenkasse — privremeno vrijedi kod doktora",
  },
  {
    deField: "Arztbesuch in Deutschland",
    bhsField: "Doktor u Njemačkoj",
    whatToWrite: "Pokaži Versicherungskarte — to je sve",
    format: "Hitna pomoć: Notrufnummer: 112 — uvijek besplatno",
    commonMistake: "Ići direktno u bolnicu za obične preglede — uvijek prvo kod Hausarzt (opći liječnik)",
  },
];

export default function KrankenkasseGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Zdravstveno osiguranje (Krankenkasse)"
        source="Gesetzliche Krankenversicherung"
        formName="Mitgliedsantrag Krankenkasse"
        whoCanApply="Svaka zaposlena osoba u Njemačkoj mora imati zdravstveno osiguranje."
        processingTime="Odmah nakon prijave kod poslodavca"
        requirements={[
          "Ugovor o radu",
          "Odabir Krankenkasse (npr. TK, AOK, Barmer)",
          "Pasoš ili lična karta",
          "Meldebescheinigung",
        ]}
        commonMistakes={[
          "Ne odabrati Krankenkasse na vrijeme",
          "Plaćati zasebno osiguranje za porodicu kad postoji Familienversicherung",
          "Ići direktno u bolnicu umjesto kod Hausarzt",
          "Ne znati za privremenu potvrdu (Bescheinigung) dok čekaš karticu",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">Više informacija o zdravstvenom osiguranju</p>
        <a href="https://www.krankenkassen.de" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm font-medium" style={{ color: "#3B82F6" }}>
          🔗 Pregled Krankenkassen
        </a>
      </div>
    </div>
  );
}
