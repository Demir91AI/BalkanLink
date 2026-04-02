import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import MusterCTA from "./MusterCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Arbeitsbescheinigung?",
    bhsField: "Šta je Arbeitsbescheinigung?",
    whatToWrite:
      "Arbeitsbescheinigung nach § 57 SGB II je službeni dokument koji popunjava ISKLJUČIVO POSLODAVAC na zahtjev Jobcentra. Dokumentuje završeni radni odnos — otkazni rok, otpremninu, uvjete otkaza.\n\n⚠️ Poslodavac je zakonski obavezan da popuni formular potpuno i tačno. Odbijanje ili lažni podaci su prekršaj (§ 63 SGB II).",
    whereToFind: "Formular dobiješ od Jobcentra i predaješ ga svom poslodavcu na popunjavanje.",
    commonMistake: "Ovo NE popunjavate vi — samo poslodavac! Arbeitnehmer predaje prazan formular poslodavcu.",
  },
  {
    deField: "Abschnitt A: Angaben zum Arbeitgeber",
    bhsField: "Podaci o poslodavcu",
    whatToWrite: "Poslodavac upisuje:\n• Ime firme (1)\n• Adresa (2–5)\n• Kontakt osobe za plate i kadrovska pitanja (6–9)\n• Betriebsnummer — broj firme za socijalno osiguranje (10)",
    commonMistake: "Betriebsnummer je obavezan — bez njega se formular vraća.",
  },
  {
    deField: "Abschnitt B: Angaben zum Arbeitnehmer",
    bhsField: "Podaci o radniku",
    whatToWrite: "Ime, prezime, adresa radnika (11–17).\nRentenversicherungsnummer ili datum rođenja (18).",
    format: "RVNR: XX XXXXXX X XXX",
    commonMistake: "Pogrešan ili nepotpun RVNR — provjeriti na prijavi za socijalno osiguranje.",
  },
  {
    deField: "Abschnitt C & D: Beschäftigung & Beendigung",
    bhsField: "Radni odnos i prestanak",
    whatToWrite: "C: Period zaposlenja (19), posljednje radno mjesto (20–21), datum kraja (22).\nD: Detalji otkaza:\n• Ko je dao otkaz? (AG/AN/Aufhebungsvertrag) (24)\n• Da li je pismeni? (25) Betriebsbedingt? (27)\n• Otkazni rok, socijalni odabir (Sozialauswahl) itd.",
    commonMistake: "Nijedno polje ne smije ostati prazno — nepotpun formular se vraća!",
  },
  {
    deField: "Abschnitt E: Leistungen bei Beendigung",
    bhsField: "Isplate pri prestanku radnog odnosa",
    whatToWrite: "Polje 50: Da li su isplate izvršene ili predstoje?\n• Urlaubsabgeltung — kompenzacija za neiskorišteni godišnji odmor (53–54)\n• Abfindung — otpremnina (55–59)\n• Vorruhestandsleistung — prijevremena penzija (60)",
    commonMistake: "Ne prijaviti otpremninu — može uticati na početak i iznos Bürgergeld-a.",
    example: "Otpremnina: 7.500€ bruto za 4 godine radnog staža.",
  },
  {
    deField: "Abschnitt F: Kündigungsfrist",
    bhsField: "Otkazni rok",
    whatToWrite: "Polja 62–68: Mjerodavni otkazni rok (zakonski/ugovorni/tarifni).\n• Koliko dana/sedmica/mjeseci?\n• Kraj roka: kraj sedmice, 15. u mjesecu, kraj mjeseca itd.\n• Da li je redovni otkaz isključen?",
    commonMistake: "Pogrešan otkazni rok može uticati na Sperrzeit (period bez primanja).",
  },
  {
    deField: "Abschnitt G: Unterschrift AG",
    bhsField: "Potpis poslodavca",
    whatToWrite: "Datum (69) i pravno obavezujući potpis poslodavca (70) + pečat firme.\n\n⚠️ Izmjene moraju biti potvrđene potpisom poslodavca.\n⚠️ I tokom radnog spora sud → poslodavac je obavezan izdati potvrdu.",
    commonMistake: "Poslodavac odbija popuniti formular — to je prekršaj po § 63 SGB II i poslodavac odgovara za nastalu štetu.",
  },
];

export default function ArbeitsbescheinigungGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Arbeitsbescheinigung § 57 SGB II"
        source="Jobcenter / Agentur für Arbeit"
        formName="Arbeitsbescheinigung (6 stranica)"
        whoCanApply="⚠️ Popunjava ISKLJUČIVO poslodavac"
        processingTime="Uz Bürgergeld zahtjev"
      />
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ⚠️ <strong>VAŽNO:</strong> Ovaj formular popunjava ISKLJUČIVO poslodavac!
          Arbeitnehmer (radnik) ga prima od Jobcentra i predaje poslodavcu na popunjavanje.
          Poslodavac je zakonski obavezan da ga popuni (§ 57 SGB II).
        </p>
      </div>
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Arbeitsbescheinigung</strong> — službeni dokument o završenom radnom
          odnosu, otkazu, otpremnini i otkaznim rokovima. Predaje se Jobcentru uz Bürgergeld zahtjev.
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterCTA slug="arbeitsbescheinigung" label="Arbeitsbescheinigung" />
    </div>
  );
}
