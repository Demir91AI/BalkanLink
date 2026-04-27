import LocalizedGuide from "./LocalizedGuide";
import type { GuideContent } from "@/lib/guide-i18n";
import type { StepData } from "./SmartGuideWizardShared";

const GUIDE_KEY = "steuerId";

const STEPS: StepData[] = [
  {
    deField: "Provjeri imaš li ga već",
    bhsField: "Korak 1 — Provjera",
    whatToWrite:
      "Nakon Anmeldung-a (prijave boravišta), Finanzamt ti automatski šalje Steuer-ID poštom na registrovanu adresu — u roku od 2–4 sedmice.",
    commonMistake:
      "Pismo izgleda nezvanično — mnogi ga bace misleći da je reklama. Pažljivo pregledaj poštu!",
    format: "Tačno 11 cifara, nikad se ne mijenja. Primjer: 65 929 310 054",
    whereToFind:
      "Pismo od Bundeszentralamt für Steuern koje stiže na adresu. Također na platnoj listi (Lohnsteuerbescheinigung) ili u ELSTER profilu.",
  },
  {
    deField: "Novo u Njemačkoj? Evo šta radiš",
    bhsField: "Korak 2 — Novi dolazak",
    whatToWrite:
      "1. Prijavi boravište (Anmeldung) u lokalnom Bürgeramt-u\n2. Sačekaj 2–4 sedmice — Steuer-ID stiže poštom automatski\n3. Nisi dobio? → Idi na Korak 3",
    commonMistake:
      "Misliti da treba ići u Finanzamt da zatražiš Steuer-ID — nije potrebno, dolazi automatski nakon Anmeldung-a.",
    note: "Bez Steuer-ID poslodavac ti odbija porez po najvišoj stopi (Steuerklasse 6). Predaj broj HR-u odmah čim ga dobiješ!",
  },
  {
    deField: "Zaboravio si ili nisi dobio?",
    bhsField: "Korak 3 — Ponovna dostava",
    whatToWrite:
      "Opcija A — Online (najbrže): Idi na identifikationsmerkmal.de → unesite ime, adresu i datum rođenja → broj stiže na registrovanu adresu poštom u roku od 2–4 sedmice.\n\nOpcija B — Direktno u Finanzamt-u: Odi lično s ličnom kartom ili pasošem. Na licu mjesta mogu provjeriti tvoj broj.\n\nOpcija C — Kod poslodavca: Ako si već radio u Njemačkoj, HR odjel vjerovatno ima tvoj broj u sistemu.",
    commonMistake:
      "Tražiti Steuer-ID u ELSTER portalu — tamo se nalazi samo Steuernummer, ne Steuer-ID.",
    whereToFind: "identifikationsmerkmal.de — zvanična stranica za online upit",
  },
];

const BASE: GuideContent = {
  header: {
    title: "🪪 Steuer-ID — Kompletan vodič",
    source: "Bundeszentralamt für Steuern",
    formName: "Steuerliche Identifikationsnummer",
    whoCanApply: "Svaka osoba prijavljena u Njemačkoj automatski dobija Steuer-ID. Sastoji se od 11 cifara i prati te cijeli život — ne mijenja se ni ako se seliš ili mijenjaš posao.",
    processingTime: "2–4 sedmice nakon Anmeldung-a (poštom)",
    requirements: [
          "Prijava prebivališta (Anmeldung) — Steuer-ID stiže automatski",
          "Prijavu kod poslodavca (bez njega ti odbijaju više poreza!)",
          "Poresku prijavu (Steuererklärung)",
          "Dječiji dodatak (Kindergeld)",
          "Otvaranje bankovnog računa",
        ],
    commonMistakes: [
          "Mješanje Steuer-ID i Steuernummer — Steuer-ID = 11 cifara, doživotni. Steuernummer = lokalni broj, mijenja se sa selidbom",
          "Baciti pismo od Finanzamt-a — sva pisma od Finanzamt čuvaj!",
          "Čekati da ih poslodavac pita — predaj broj HR-u odmah pri zapošljavanju",
          "Tražiti ga na pogrešnom mjestu — ne tražiti u ELSTER-u, to je za Steuernummer",
        ],
  },
  steps: STEPS,
};

export default function SteuerIdGuideContent() {
  return (
    <LocalizedGuide guideKey={GUIDE_KEY} base={BASE} free>

    </LocalizedGuide>
  );
}
