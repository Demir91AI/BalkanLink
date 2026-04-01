import { useNavigate } from "react-router-dom";
import GuideInfoHeader from "./guides/GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./guides/SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Steuerliche Identifikationsnummer",
    bhsField: "Poreski identifikacioni broj (Steuer-ID)",
    whatToWrite: "11-cifreni Steuer-ID podnosioca zahtjeva (roditelja). Ako tražiš za više djece, upiši svoj Steuer-ID na svakom formularu.",
    whereToFind: "Pismo od Bundeszentralamt für Steuern koje dobiješ nakon Anmeldung, ili na platnoj listi (Lohnabrechnung) pod 'Identifikationsnr.'",
    format: "11 cifara bez razmaka, npr. 12345678901",
    commonMistake: "Upisati Steuernummer umjesto Steuer-ID — to su DVA potpuno različita broja! Steuer-ID ima uvijek 11 cifara i ne mijenja se nikad.",
    example: "12 345 678 901",
    note: "Steuer-ID dobiješ automatski nakon prijave prebivališta. Ako ga nisi dobio, zatraži ponovo od Bundeszentralamt für Steuern.",
  },
  {
    deField: "Antragsteller — Name, Vorname, Geburtsdatum, Geburtsort, Geschlecht, Staatsangehörigkeit",
    bhsField: "Lični podaci podnosioca zahtjeva",
    whatToWrite: "Prezime, ime, datum rođenja, mjesto rođenja, spol i državljanstvo roditelja koji podnosi zahtjev.",
    whereToFind: "Lična karta, pasoš ili Meldebescheinigung.",
    format: "Prezime, Ime — tačno kao na ličnom dokumentu. Datum: DD.MM.GGGG",
    commonMistake: "Upisati ime djeteta umjesto roditelja — zahtjev podnosi RODITELJ, ne dijete! Također, ime mora biti identično kao na dokumentu (ne skraćeno).",
    example: "Prezime: Hadžić | Ime: Amina | Datum rođenja: 15.03.1990 | Mjesto: Sarajevo | Spol: weiblich | Državljanstvo: bosnisch-herzegowinisch",
    note: "Ako oba roditelja žive zajedno u istom domaćinstvu, zahtjev podnosi samo JEDAN roditelj.",
  },
  {
    deField: "Anschrift (Straße, Hausnummer, PLZ, Wohnort)",
    bhsField: "Adresa — potpuna prijavljena adresa u Njemačkoj",
    whatToWrite: "Ulica, kućni broj, poštanski broj i grad — tačno kako je prijavljeno na Meldebescheinigung.",
    whereToFind: "Meldebescheinigung ili pismo od Einwohnermeldeamt.",
    format: "Ulica + kućni broj, PLZ + Grad. Npr: Berliner Str. 45, 10115 Berlin",
    commonMistake: "Upisati staru adresu ili adresu iz domovine. Mora biti TRENUTNA prijavljena adresa u Njemačkoj.",
    example: "Berliner Str. 45, 10115 Berlin",
    whenToLeaveEmpty: "Nikada — adresa je obavezno polje.",
  },
  {
    deField: "Familienstand",
    bhsField: "Bračni status",
    whatToWrite: "Trenutni bračni status: ledig (neoženjen/neudana), verheiratet (oženjen/udana), geschieden (razveden/a), verwitwet (udovac/udovica), getrennt lebend (žive odvojeno).",
    whereToFind: "Lična karta, vjenčani list ili rješenje o razvodu.",
    format: "Zaokružiti odgovarajuću opciju na formularu.",
    commonMistake: "Ne ažurirati status nakon razvoda ili vjenčanja. Familienkasse provjerava podatke sa Finanzamt — nepodudaranje uzrokuje kašnjenje.",
    example: "verheiratet (oženjen/udana)",
    note: "Ako živiš sa partnerom bez braka (Lebensgemeinschaft), označiti 'ledig' ali navesti partnera u sljedećem koraku ako živi u istom domaćinstvu.",
  },
  {
    deField: "Ehegatte/Lebenspartner — Name, Vorname, Geburtsdatum, Steuer-ID",
    bhsField: "Podaci o bračnom/životnom partneru",
    whatToWrite: "Ime, prezime, datum rođenja i Steuer-ID supružnika ili registrovanog životnog partnera.",
    whereToFind: "Lična karta ili pasoš partnera, Steuer-ID pismo partnera.",
    format: "Prezime, Ime, DD.MM.GGGG, 11-cifreni Steuer-ID",
    commonMistake: "Izostaviti Steuer-ID partnera — Familienkasse to zahtijeva za provjeru da li partner već prima Kindergeld.",
    example: "Prezime: Hadžić | Ime: Emir | Datum: 22.07.1988 | Steuer-ID: 98 765 432 109",
    whenToLeaveEmpty: "Ako si ledig (neoženjen/neudana) i nemaš registrovanog partnera.",
  },
  {
    deField: "Zahlungsweg — IBAN, BIC, Kontoinhaber",
    bhsField: "Način isplate — IBAN, BIC, vlasnik računa",
    whatToWrite: "IBAN bankovnog računa na koji će se isplaćivati Kindergeld, BIC banke i ime vlasnika računa.",
    whereToFind: "Online banking aplikacija, bankovska kartica ili ugovor o računu.",
    format: "IBAN: DE + 20 cifara (ukupno 22 znaka). BIC: 8 ili 11 znakova.",
    commonMistake: "IBAN mora glasiti na ime podnosioca zahtjeva! Ako je račun na ime partnera, partner mora biti podnosilac. Račun djeteta se NE prihvata.",
    example: "IBAN: DE89 3704 0044 0532 0130 00 | BIC: COBADEFFXXX | Vlasnik: Amina Hadžić",
    note: "Kindergeld se isplaćuje isključivo na njemački bankovni račun (DE IBAN).",
  },
  {
    deField: "Angaben zu Kindern — Anlage Kind",
    bhsField: "Podaci o djeci",
    whatToWrite: "Za SVAKO dijete popuniti poseban obrazac 'Anlage Kind': ime, prezime, datum rođenja, mjesto rođenja, spol, Steuer-ID djeteta, adresa ako se razlikuje od podnosioca.",
    whereToFind: "Geburtsurkunde (rodni list djeteta), Steuer-ID pismo djeteta.",
    format: "Svako dijete = jedan Anlage Kind obrazac. Ime tačno kao na rodnom listu.",
    commonMistake: "Zaboraviti priložiti Geburtsurkunde — bez njega zahtjev je NEPOTPUN i vraćaju ga. Za djecu 18-25: obavezno priložiti potvrdu o školovanju (Schulbescheinigung).",
    example: "Dijete 1: Hadžić, Lena, 03.05.2020, Berlin, weiblich, Steuer-ID: 11 222 333 444",
    note: "Dijete dobija Steuer-ID automatski nakon prijave prebivališta (Anmeldung). Za djecu stariju od 18 priložiti potvrdu o školovanju, studiranju ili Ausbildung — inače zahtjev automatski odbijaju.",
  },
  {
    deField: "Unterschrift und Erklärung",
    bhsField: "Potpis i izjava",
    whatToWrite: "Datum i vlastoručni potpis podnosioca zahtjeva. Potpisom potvrđuješ da su svi podaci tačni i potpuni.",
    format: "Datum: DD.MM.GGGG + potpis",
    commonMistake: "Nedostaje potpis — bez potpisa formular je NEVAŽEĆI i vraćaju ga nazad. Također, zaboraviti upisati datum uz potpis.",
    example: "Datum: 01.04.2026 | Potpis: [vlastoručni]",
    note: "Ako se podaci promijene nakon podnošenja (preseljenje, razvod, novo dijete), OBAVEZNO obavijestiti Familienkasse pismeno u roku od mjesec dana.",
  },
];

export default function KindergeldGuideContent() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Dječji dodatak (Kindergeld)"
        source="Familienkasse pri Saveznoj agenciji za rad"
        formName="Antrag auf Kindergeld (KG1)"
        whoCanApply="Roditelji sa prebivalištem u Njemačkoj, za svako dijete do 18. godine (do 25. uz školovanje)."
        processingTime="4–6 sedmica od podnošenja kompletnog zahtjeva"
        requirements={[
          "Popunjen obrazac KG1 + Anlage Kind za svako dijete",
          "Rodni list djeteta (Geburtsurkunde) — original ili ovjerena kopija",
          "Prijava prebivališta (Meldebescheinigung)",
          "Steuer-ID roditelja i svakog djeteta",
          "Kopija pasoša ili lične karte",
          "Boravišna dozvola (za ne-EU državljane)",
          "Za djecu 18+: potvrda o školovanju (Schulbescheinigung)",
        ]}
        commonMistakes={[
          "Nepotpuna dokumentacija — rodni list djeteta zaboravljen",
          "Pogrešan IBAN ili ime vlasnika računa ne odgovara podnosiocu",
          "Steuernummer umjesto Steuer-ID (dva različita broja!)",
          "Nedostaje potpis ili datum uz potpis",
          "Za dijete 18+ nema priložene potvrde o školovanju",
        ]}
      />

      <SmartGuideWizardShared steps={STEPS} />

      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: "#111827", border: "1px solid #3B82F6" }}
      >
        <div className="text-[32px] mb-3">📋</div>
        <h2 className="text-xl font-bold text-white">Vježbaj na Musterformularu</h2>
        <p className="mt-1 text-sm font-semibold" style={{ color: "#EAB308" }}>
          Popuni kao original — pa znaš tačno šta ide gdje
        </p>
        <p className="mt-2 text-[13px] text-gray-400">
          Interaktivna kopija originalnog KG1 formulara. Bez državnih obilježja — samo za učenje i vježbu.
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          Original KG1 formulara dostupan na službenoj stranici Familienkasse.
        </p>
        <button
          onClick={() => navigate("/formulari/kindergeld/muster")}
          className="mt-4 w-full font-bold text-white py-3 px-6 rounded-[10px]"
          style={{ backgroundColor: "#3B82F6" }}
        >
          📋 Otvori Musterformular →
        </button>
      </div>

      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">
          Original KG1 formular preuzmi direktno od Bundesagentur für Arbeit
        </p>
        <a
          href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium"
          style={{ color: "#3B82F6" }}
        >
          🔗 Preuzmi originalni KG1 formular (PDF)
        </a>
      </div>
    </div>
  );
}
