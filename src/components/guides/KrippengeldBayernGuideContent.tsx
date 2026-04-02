import { ExternalLink, Search, FileText, Info, AlertTriangle } from "lucide-react";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const STEPS: StepData[] = [
  {
    deField: "Was ist Krippengeld?",
    bhsField: "Šta je Krippengeld (Bayern)?",
    whatToWrite:
      "Krippengeld je mjesečna finansijska pomoć roditeljima u Bayernu za pokrivanje troškova vrtića (Kinderkrippe ili Tagespflege) za djecu mlađu od 3 godine.\n\n• Do 100€ mjesečno po djetetu\n• Isplaćuje se DIREKTNO roditeljima\n• Zavisi od stvarnih troškova (maks. 100€)\n• Od 1. do 3. godine života djeteta\n• Ne utiče na Kindergeld\n\nPravna osnova: BayKiBiG (Bayerisches Kinderbildungs- und -betreuungsgesetz)",
    whereToFind:
      "ZBFS Bayern (Zentrum Bayern Familie und Soziales) — online ili pismeno.",
    commonMistake:
      "Misliti da Krippengeld postoji u cijeloj Njemačkoj — dostupno je SAMO u Bayernu.",
  },
  {
    deField: "Anspruchsvoraussetzungen",
    bhsField: "Ko može dobiti Krippengeld?",
    whatToWrite:
      "SVI uvjeti moraju biti ispunjeni:\n\n✅ Dijete ima između 1 i 3 godine i pohađa vrtić (Kinderkrippe ili Tagespflege)\n✅ Dijete i roditelj žive u Bayernu\n✅ Plaćaš vrtić (postoji ugovor s vrtićem ili Tagespflege)\n✅ Maksimalni godišnji prihod:\n  • 60.000€ (jedan roditelj)\n  • +5.000€ za svako dodatno dijete\n\nPrimjeri: 1 dijete → 60.000€ | 2 djece → 65.000€ | 3 djece → 70.000€",
    whereToFind:
      "Gleda se ukupni godišnji prihod porodice prema poreskom rješenju (Einkommensteuerbescheid).",
    commonMistake:
      "⚠️ Ko NEMA pravo: ako dijete ne ide u vrtić, ako prihod prelazi granicu, ako ne živiš u Bayernu.",
  },
  {
    deField: "Anspruch prüfen",
    bhsField: "Provjeri da li imaš pravo",
    whatToWrite:
      "Prije podnošenja zahtjeva, provjeri:\n\n• Godišnji prihod porodice\n• Broj djece\n• Troškove vrtića (mjesečni iznos)\n\n⚠️ VAŽNO: Ako si blizu granice prihoda, IPAK podnesi zahtjev — ZBFS vrši tačan obračun.",
    commonMistake:
      "Ne prijaviti se jer si blizu granice prihoda — ZBFS može utvrditi da ipak imaš pravo.",
  },
  {
    deField: "Erforderliche Unterlagen",
    bhsField: "Dokumenti za zahtjev",
    whatToWrite:
      "OBAVEZNO:\n□ Steuerbescheid (poresko rješenje)\n□ Ugovor s vrtićem / Tagespflege\n□ Potvrda o troškovima (Betreuungsgebühren)\n□ IBAN\n\nPO POTREBI:\n□ Meldebescheinigung\n□ Dokazi o dodatnim prihodima",
    whereToFind:
      "Poresko rješenje od Finanzamt, ugovor od vrtića, IBAN sa bankovnog izvoda.",
    commonMistake:
      "Ne priložiti ugovor s vrtićem — bez njega zahtjev ne može biti obrađen.",
    note:
      "Dokumente možeš dostaviti i naknadno — podnesi zahtjev što prije da ne izgubiš pravo.",
  },
  {
    deField: "Antrag einreichen",
    bhsField: "Kako i gdje podnijeti zahtjev?",
    whatToWrite:
      "OPCIJA 1 — Online (preporučeno):\n📱 zbfs.bayern.de/familienleistungen/krippengeld\n\nOPCIJA 2 — Pismeno:\n• Preuzmi formular sa ZBFS stranice\n• Pošalji poštom ili predaj lično\n\nNakon prijave dobijaš Bescheid — pismenu odluku s iznosom i trajanjem.",
    commonMistake:
      "Kasna prijava → NEMA retroaktivne isplate prije prijave. Podnesi zahtjev što prije!",
  },
  {
    deField: "Leistungshöhe",
    bhsField: "Koliko iznosi Krippengeld?",
    whatToWrite:
      "• Maksimalno 100€ mjesečno po djetetu\n• Ako plaćaš manje → dobijaš stvarni iznos\n\nPrimjeri:\n• Plaćaš 80€ → dobijaš 80€\n• Plaćaš 150€ → dobijaš 100€",
    commonMistake:
      "Očekivati uvijek 100€ — ako je trošak vrtića manji, dobijaš samo stvarni iznos.",
    note:
      "Krippengeld pokriva samo dio troškova vrtića — nije zamjena za puni iznos.",
  },
  {
    deField: "Häufige Fehler",
    bhsField: "Najčešće greške",
    whatToWrite:
      "• Kasna prijava → gubiš novac (nema retroaktivne isplate)\n• Pogrešno prijavljen prihod\n• Misliti da vrijedi u cijeloj Njemačkoj — samo Bayern\n• Misliti da ide automatski — moraš podnijeti zahtjev",
    commonMistake:
      "Čekati s prijavom — svaki mjesec bez zahtjeva je izgubljen novac.",
    note:
      "Ne živiš u Bayernu? Krippengeld postoji samo u Bayernu, ali postoje druge opcije pomoći za vrtić u tvom Bundeslandu.",
  },
];

export default function KrippengeldBayernGuideContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <GuideInfoHeader
        title="Krippengeld (Bayern)"
        source="ZBFS Bayern (Zentrum Bayern Familie und Soziales)"
        formName="Online zahtjev ili pismeno"
        whoCanApply="Roditelji u Bayernu s djecom od 1-3 godine koja pohađaju vrtić"
        processingTime="4–8 sedmica"
        requirements={[
          "Dijete između 1 i 3 godine, pohađa Kinderkrippe ili Tagespflege",
          "Prebivalište u Bayernu",
          "Ugovor s vrtićem i plaćanje Betreuungskosten",
          "Godišnji prihod do 60.000€ (+5.000€ po dodatnom djetetu)",
        ]}
        commonMistakes={[
          "Kasna prijava — nema retroaktivne isplate",
          "Misliti da vrijedi u cijeloj Njemačkoj — SAMO Bayern",
          "Misliti da ide automatski uz Kindergeld — odvojen zahtjev",
          "Pogrešno prijavljen prihod porodice",
        ]}
      />

      {/* Bayern-only warning */}
      <div className="rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
        <p className="text-xs leading-relaxed text-foreground/80 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
          <span>
            <strong>VAŽNO:</strong> Krippengeld (Kita Zuschuss) postoji SAMO u Bayernu.
            Ako živiš u drugom Bundeslandu, ovaj program se NE odnosi na tebe.
          </span>
        </p>
      </div>

      {/* Info box */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-foreground/80">
          📋 <strong>Krippengeld (Bayern)</strong> — finansijska pomoć
          roditeljima za troškove vrtića (Kinderkrippe / Tagespflege)
          za djecu mlađu od 3 godine.
        </p>
      </div>

      {/* Smart Guide Wizard */}
      <SmartGuideWizardShared steps={STEPS} />

      {/* Bottom tools & links */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 space-y-4 dark:border-green-800 dark:bg-green-950/20">
        <p className="text-sm font-bold">💡 Korisni linkovi</p>
        <div className="grid gap-2">
          <a
            href="https://www.zbfs.bayern.de/familienleistungen/krippengeld/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
          >
            <FileText className="h-3 w-3" /> ZBFS Bayern — Krippengeld <ExternalLink className="h-2.5 w-2.5" />
          </a>
          <a
            href="https://www.bayern.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
          >
            <Info className="h-3 w-3" /> Bayern.de — Informacije <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

        {/* Prominent CTA */}
        <a
          href="https://www.zbfs.bayern.de/familienleistungen/krippengeld/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-xs font-bold text-[#0f1f3d] shadow-md shadow-yellow-400/20 transition-all hover:shadow-lg hover:bg-yellow-300"
        >
          <Search className="h-3.5 w-3.5" /> Prijavi se sada — Krippengeld Bayern
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Online application CTA */}
      <div className="rounded-xl border bg-card p-5 text-center space-y-3">
        <p className="text-sm font-bold">📋 Spreman/na za prijavu?</p>
        <a
          href="https://www.zbfs.bayern.de/familienleistungen/krippengeld/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Online zahtjev Krippengeld <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Not in Bayern hint */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
        <p className="text-xs font-bold mb-1">Ne živiš u Bayernu?</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Krippengeld postoji samo u Bayernu. Ali postoje druge opcije pomoći za vrtić u tvom Bundeslandu.
        </p>
      </div>

      {/* Official link */}
      <div className="rounded-xl border bg-card p-5 text-center">
        <p className="text-xs text-muted-foreground mb-2">Više informacija o Krippengeld Bayern</p>
        <a
          href="https://www.zbfs.bayern.de/familienleistungen/krippengeld/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-3.5 w-3.5" /> ZBFS Bayern — Krippengeld
        </a>
      </div>
    </div>
  );
}
