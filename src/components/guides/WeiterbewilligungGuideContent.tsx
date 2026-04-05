import MusterformularCTA from "@/components/guides/MusterformularCTA";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist der WBA?",
    bhsField: "Šta je Weiterbewilligungsantrag?",
    whatToWrite: "Antrag za produženje Bürgergelda nakon isteka perioda odobravanja (obično svakih 6 mjeseci).",
    commonMistake: "Čekati da istekne odobrenje pa tek onda podnijeti — nastaje praznina u isplatama!",
    note: "Podnesi WBA najmanje 4 sedmice prije isteka aktualnog Bescheida.",
  },
  {
    deField: "Abschnitt A: Persönliche Daten + BG-Nr.",
    bhsField: "Lični podaci i BG-broj",
    whatToWrite: "Upiši ime, prezime, datum rođenja i BG-Nummer. Na vrhu formulara upiši datum isteka aktualnog odobrenja.",
    whereToFind: "Datum isteka nađeš na aktualnom Bewilligungsbescheid od Jobcentra.",
    commonMistake: "Pogrešan BG-Nummer usporava obradu.",
  },
  {
    deField: "Abschnitt B: Adresse und Wohnsituation",
    bhsField: "Adresa i stanovanje",
    whatToWrite: "Navedi aktualnu adresu i sve osobe koje žive s tobom (ime, datum rođenja, odnos).",
    commonMistake: "Ne prijaviti nove ukućane ili promjenu adrese — može dovesti do povrata novca.",
  },
  {
    deField: "Abschnitt C/D: Unterkunftskosten",
    bhsField: "Troškovi stanovanja",
    whatToWrite: "Navedi aktualnu kiriju, Nebenkosten i troškove grijanja. Ako se kirija promijenila od zadnjeg zahtjeva — popuni odgovarajući dio.",
    format: "Grundmiete: XXX € | Nebenkosten: XXX € | Heizkosten: XXX €",
    commonMistake: "Ne prijaviti promjenu kirije — Jobcenter plaća samo poznati iznos.",
  },
  {
    deField: "Abschnitt E: Einkommen der BG",
    bhsField: "Prihodi svih članova BG",
    whatToWrite: "Navedi sve prihode BG: zaposlenje, samozaposlenje, socijalna davanja (Kindergeld itd.).\nSve promjene od zadnjeg zahtjeva moraju biti prijavljene!",
    commonMistake: "Ne prijaviti promjenu prihoda — može dovesti do Rückforderung (povrata novca).",
  },
  {
    deField: "Abschnitt F–H: Änderungen & Unterschrift",
    bhsField: "Planirane promjene i potpis",
    whatToWrite: "Abschnitt F: Najavi buduće promjene (selidba, novi posao, razvod itd.)\nAbschnitt G: Priloži kontoauszüge!\nAbschnitt H: Datum + potpis.",
    commonMistake: "Zaboraviti kontoauszüge — najčešći razlog za nepotpun zahtjev.",
  },
];

export default function WeiterbewilligungGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Weiterbewilligungsantrag (WBA)"
        source="Jobcenter (SGB II)"
        formName="Weiterbewilligungsantrag"
        whoCanApply="Svi postojeći Bürgergeld primaoci prije isteka aktualnog Bescheida."
        processingTime="2–4 sedmice"
        requirements={[
          "Kontoauszüge posljednja 3 mjeseca",
          "Nove platne liste (ako postoji zaposlenje)",
          "Aktuelna Mietbescheinigung / obračun grijanja",
          "Anlage EKS (ako je osoba samozaposlena)",
        ]}
        commonMistakes={[
          "Prekasno podnošenje → nastaje praznina u isplatama",
          "Promjene prihoda ne prijaviti → Rückforderung",
          "Kontoauszüge zaboraviti → zahtjev nepotpun",
        ]}
      />
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          ⏰ <strong>Tipp:</strong> Podnesi WBA najmanje 4 sedmice prije isteka. Online predaja na jobcenter.digital omogućava direktno učitavanje dokaza.
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterformularCTA
        musterSlug="weiterbewilligung"
        pdfUrl="https://www.arbeitsagentur.de/buergergeld/antrag"
        pdfLabel="Weiterbewilligung — Online zahtjev (BA)"
      />
    </div>
  );
}
