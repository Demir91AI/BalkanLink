import { useNavigate } from "react-router-dom";
import GuideInfoHeader from "./guides/GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./guides/SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Kindergeld-Nummer / Antragsteller",
    bhsField: "Podnosilac zahtjeva",
    whatToWrite: "Ime, prezime, datum rođenja, adresa roditelja koji podnosi zahtjev",
    whereToFind: "Lična karta ili pasoš, Meldebescheinigung",
    format: "Prezime, Ime — kao na ličnom dokumentu",
    commonMistake: "Upisati ime djeteta umjesto roditelja — zahtjev podnosi RODITELJ",
    note: "Ako oba roditelja žive zajedno, zahtjev podnosi samo jedan",
  },
  {
    deField: "Steuer-Identifikationsnummer",
    bhsField: "Poreski identifikacioni broj (Steuer-ID)",
    whatToWrite: "11-cifreni Steuer-ID roditelja I djeteta",
    whereToFind: "Pismo od Finanzamt ili na platnoj listi (Lohnabrechnung)",
    format: "11 cifara, npr. 12 345 678 901",
    commonMistake: "Upisati Steuernummer umjesto Steuer-ID — to su DVA različita broja!",
    note: "Dijete dobija Steuer-ID automatski nakon prijave prebivališta (Anmeldung)",
  },
  {
    deField: "Bankverbindung (IBAN)",
    bhsField: "Bankovni podaci",
    whatToWrite: "IBAN računa na koji će se isplaćivati Kindergeld",
    whereToFind: "Online banking ili bankovska kartica",
    format: "DE + 20 cifara, npr. DE89 3704 0044 0532 0130 00",
    commonMistake: "IBAN mora glasiti na ime podnosioca zahtjeva — ne na ime djeteta ili partnera",
  },
  {
    deField: "Angaben zum Kind",
    bhsField: "Podaci o djetetu",
    whatToWrite: "Ime, prezime, datum i mjesto rođenja djeteta, adresa ako se razlikuje",
    whereToFind: "Geburtsurkunde (rodni list djeteta)",
    commonMistake: "Zaboraviti priložiti Geburtsurkunde — bez njega zahtjev je nepotpun",
    note: "Za svako dodatno dijete popuniti poseban obrazac (Anlage Kind)",
  },
  {
    deField: "Anlage Kind — Schulbescheinigung",
    bhsField: "Dodatak za dijete — potvrda o školovanju",
    whatToWrite: "Za djecu 18–25 godina: priložiti potvrdu o školovanju, studiranju ili Ausbildung",
    whereToFind: "Škola, univerzitet ili Ausbildungsbetrieb izdaje potvrdu",
    commonMistake: "Ne priložiti potvrdu za dijete starije od 18 — automatski odbijaju zahtjev",
    note: "Kindergeld za djecu 18+ traje samo uz aktivno školovanje ili traženje posla",
  },
  {
    deField: "Unterschrift",
    bhsField: "Potpis",
    whatToWrite: "Potpis podnosioca zahtjeva i datum",
    commonMistake: "Nedostaje potpis supružnika ako je potreban — provjeriti uputstvo na formularu",
    note: "Bez potpisa formular je nevažeći i vraćaju ga nazad",
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
          "Popunjen obrazac KG1",
          "Rodni list djeteta (Geburtsurkunde) — original ili ovjerena kopija",
          "Prijava prebivališta (Meldebescheinigung)",
          "Steuer-ID roditelja i djeteta",
          "Kopija pasoša ili lične karte",
          "Boravišna dozvola (za ne-EU državljane)",
        ]}
        commonMistakes={[
          "Nepotpuna dokumentacija — rodni list djeteta zaboravljen",
          "Pogrešan IBAN ili ime vlasnika računa",
          "Steuernummer umjesto Steuer-ID",
          "Nedostaje potpis supružnika",
        ]}
      />

      <SmartGuideWizardShared steps={STEPS} />

      {/* Musterformular kartica */}
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

      {/* Link na original */}
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
