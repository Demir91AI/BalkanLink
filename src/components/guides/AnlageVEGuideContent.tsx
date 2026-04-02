import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";
import { MusterCTA } from "./MusterCTA";

const STEPS: StepData[] = [
  {
    deField: "Was ist die Anlage VE?",
    bhsField: "Šta je Anlage VE?",
    whatToWrite:
      "Anlage VE utvrđuje da li dvije nesrodne osobe koje žive zajedno čine 'eheähnliche Gemeinschaft' (Einstehensgemeinschaft). Ako da — prihodi i imovina obje osobe se uzimaju u obzir pri izračunu Bürgergeld-a.",
    whereToFind: "Formular dobiješ u Jobcentru ili na arbeitsagentur.de.",
    commonMistake: "Ko prikriva VE riskira povrat novca i prekršajni postupak!",
  },
  {
    deField: "Abschnitt A: Antragstellende Person",
    bhsField: "Tvoji lični podaci",
    whatToWrite: "Ime, prezime, datum rođenja i BG-Nummer.",
    format: "Datum: DD.MM.YYYY",
    commonMistake: "BG-Nummer nađeš na svakom Jobcenter dopisu — gore desno.",
  },
  {
    deField: "Abschnitt B: Mitbewohner/in (Felder 5–12)",
    bhsField: "Podaci o cimeru/cimeri i provjera VE",
    whatToWrite: "Upiši podatke nesrodne osobe (5–7). Zatim odgovori na 5 pitanja:\n• Polje 8: Da li je osoba tvoj/a partner/ica?\n• Polje 9: Živite li zajedno duže od 1 godine?\n• Polje 10: Imate li zajedničko dijete?\n• Polje 11: Zajednički brinete o djetetu ili srodniku?\n• Polje 12: Imaš li pristup prihodu/imovini te osobe?",
    commonMistake: "Najmanje JEDNO 'Da' → Jobcenter pretpostavlja VE. Možeš to opovrgnuti u Abschnitt C.",
    note: "Obična cimer-situacija (WG) BEZ partnerske veze NIJE VE — ali to treba jasno obrazložiti.",
  },
  {
    deField: "Abschnitt C: Widerspruch (Feld 13)",
    bhsField: "Opovrgavanje pretpostavke o VE",
    whatToWrite: "Ako si odgovorio/la 'Da' na neko pitanje, ali NE živiš u VE — obrazloži konkretno:\n• Odvojene finansije\n• Nema zajedničkog domaćinstva\n• Nema partnerske veze\n• Samo dijelite stanarinu na osnovu zajedničkog ugovora",
    example: "Gospodin Primjer i ja smo cimeri. Vodimo potpuno odvojene domaćinstva: odvojeni računi, odvojena kupovina hrane, nema zajedničkih troškova. Ne postoji partnerska niti emocionalna veza.",
    commonMistake: "Previše kratko ili nekonkretno obrazloženje — budite detaljni!",
  },
  {
    deField: "Abschnitt D: Unterschrift",
    bhsField: "Potpis",
    whatToWrite: "Datum i vlastoručni potpis.",
    commonMistake: "Bez potpisa formular nije validan.",
  },
  {
    deField: "Wichtige Hinweise",
    bhsField: "Važne napomene",
    whatToWrite: "• Ko prikriva VE riskira povrat novca i prekršajni postupak\n• Obične WG bez partnerske veze NISU VE — obrazložite jasno\n• I kod VE obje osobe mogu podnijeti vlastite zahtjeve, ali prihod partnera se uračunava\n• Priložite dokaze (odvojeni ugovori, izvodi računa) ako opovrgavate VE",
    commonMistake: "Ne dostaviti nikakve dokaze uz opovrgavanje — Jobcenter može odbiti vaše obrazloženje bez dokaza.",
  },
];

export default function AnlageVEGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Anlage VE — Einstehensgemeinschaft"
        source="Jobcenter (SGB II)"
        formName="Anlage VE"
        whoCanApply="Bürgergeld-primaoci koji žive sa nesrodnom osobom"
        processingTime="2–4 sedmice"
      />
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Anlage VE</strong> — utvrđuje da li živiš u „eheähnliche Gemeinschaft"
          sa nesrodnom osobom (cimer, partner). Utiče na izračun Bürgergeld-a.
        </p>
      </div>
      <SmartGuideWizardShared steps={STEPS} />
      <MusterCTA slug="anlage-ve" label="Anlage VE" />
    </div>
  );
}
