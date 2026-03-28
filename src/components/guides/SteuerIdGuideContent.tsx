import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Steuer-ID?",
    bhsField: "Šta je Steuer-ID",
    whatToWrite: "Tvoj lični 11-cifreni poreski identifikacioni broj koji dobijaš automatski kad se prijaviš u Njemačkoj",
    whereToFind: "Pismo od Bundeszentralamt für Steuern koje stiže na adresu par sedmica nakon Anmeldung. Također na platnoj listi (Lohnsteuerbescheinigung)",
    format: "Tačno 11 cifara, nikad se ne mijenja. Primjer: 65 929 310 054",
    commonMistake: "Miješati sa Steuernummer (format 12/345/67890) — to su dva potpuno različita broja",
  },
  {
    deField: "Steuer-ID erhalten",
    bhsField: "Kako dobiti Steuer-ID",
    whatToWrite: "Automatski stiže poštom 2-4 sedmice nakon Anmeldung prijave adrese",
    whereToFind: "Ako nisi dobio: idi na bzst.de i zatraži ponovnu dostavu — besplatno",
    commonMistake: "Misliti da treba ići u Finanzamt — nije potrebno, sve se radi online ili poštom",
  },
  {
    deField: "Verwendung der Steuer-ID",
    bhsField: "Gdje se koristi",
    whatToWrite: "Na poslu: daj poslodavcu odmah — bez Steuer-ID ne može te prijaviti. Kindergeld: obavezan za tebe i svako dijete. Bankovni račun: neki banke traže",
    commonMistake: "Dati poslodavcu Steuernummer umjesto Steuer-ID",
  },
  {
    deField: "Steuer-ID verloren",
    bhsField: "Izgubio sam Steuer-ID",
    whatToWrite: "Idi na bzst.de → 'Steuerliche Identifikationsnummer mitteilen' → upiši ime, adresu, datum rođenja",
    format: "Pismo stiže za 2-4 sedmice",
    commonMistake: "Zvati Finanzamt — ne mogu dati Steuer-ID telefonom iz sigurnosnih razloga",
  },
  {
    deField: "Steuer-ID für Kinder",
    bhsField: "Steuer-ID za dijete",
    whatToWrite: "Svako dijete dobija vlastiti Steuer-ID automatski nakon prijave rođenja",
    whereToFind: "Pismo na adresu odmah nakon registracije rođenja (Geburtsanmeldung)",
    commonMistake: "Kindergeld — bez Steuer-ID djeteta zahtjev ne može biti obrađen",
    note: "Potrebno za: Kindergeld — bez Steuer-ID djeteta zahtjev ne može biti obrađen",
  },
];

export default function SteuerIdGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Poreski identifikacioni broj (Steuer-ID)"
        source="Bundeszentralamt für Steuern"
        formName="Steuerliche Identifikationsnummer"
        whoCanApply="Svaka osoba prijavljena u Njemačkoj automatski dobija Steuer-ID."
        processingTime="2-4 sedmice nakon Anmeldung (poštom)"
        requirements={[
          "Prijava prebivališta (Anmeldung) — Steuer-ID stiže automatski",
          "Pasoš ili lična karta",
          "Meldebescheinigung",
        ]}
        commonMistakes={[
          "Miješati Steuer-ID (11 cifara) sa Steuernummer (format 12/345/67890)",
          "Čekati da Finanzamt pošalje — dolazi od Bundeszentralamt für Steuern",
          "Ne sačuvati pismo sa Steuer-ID",
        ]}
      />
      <SmartGuideWizardShared steps={STEPS} />
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">Više informacija na službenoj stranici BZSt</p>
        <a href="https://www.bzst.de" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm font-medium" style={{ color: "#3B82F6" }}>
          🔗 Službena stranica BZSt
        </a>
      </div>
    </div>
  );
}
