import { Search, ExternalLink } from "lucide-react";
import LocalizedGuide from "./LocalizedGuide";
import type { GuideContent } from "@/lib/guide-i18n";
import type { StepData } from "./SmartGuideWizardShared";

const GUIDE_KEY = "kinderzuschlag";

const STEPS: StepData[] = [
  {
    deField: "Was ist Kinderzuschlag?",
    bhsField: "Šta je Kinderzuschlag?",
    whatToWrite:
      "Kinderzuschlag (KiZ) je namijenjen porodicama koje zarađuju dovoljno za sebe, ali ne i za pokriće troškova cijele porodice. Cilj je spriječiti da porodica mora tražiti Bürgergeld.\n\n• Maksimalno 297€ po djetetu mjesečno (Stand 2026)\n• Uključuje Sofortzuschlag od 25€/mj. po djetetu\n• Iznos se smanjuje ako prihod porodice raste\n• Isplaćuje se zajedno sa Kindergeldom od Familienkasse\n• Pravna osnova: § 6a BKGG",
    whereToFind:
      "Familienkasse pri Bundesagentur für Arbeit — online ili pismeno.",
    commonMistake:
      "Misliti da je KiZ automatski uključen u Kindergeld — to je potpuno odvojen zahtjev.",
    note:
      "KiZ + Wohngeld = moguće i Bildung und Teilhabe: besplatan ručak u školi/vrtiću, školski paket od 195€, oslobađanje od Kita naknada.",
  },
  {
    deField: "Anspruchsvoraussetzungen",
    bhsField: "Ko može dobiti Kinderzuschlag?",
    whatToWrite:
      "SVI uvjeti moraju biti ispunjeni:\n\n✅ Dijete živi u tvom domaćinstvu, mlađe od 25, nije u braku\n✅ Primaš Kindergeld za to dijete\n✅ Min. prihod: parovi 900€ bruto/mj., samohrani 600€ bruto/mj.\n✅ Prihod nije toliko visok da KiZ padne na 0\n✅ Uz prihod + KiZ + Kindergeld + Wohngeld pokriva se porodični Bedarf",
    whereToFind:
      "Šta je Bedarf porodice? Sačinjava ga: Regelbedarf roditelja i djece + eventualni Mehrbedarf + troškovi stanovanja. Familienkasse to izračunava sama.",
    commonMistake:
      "⚠️ Ko NEMA pravo: primatelji Sozialhilfe (SGB XII), BAföG korisnici (samo pod posebnim uvjetima), penzioneri (samo pod posebnim uvjetima).",
  },
  {
    deField: "KiZ-Lotse Prüfung",
    bhsField: "Provjeri da li imaš pravo — PRIJE prijave",
    whatToWrite:
      "⚠️ VAŽNO: Prije nego podneseš zahtjev, provjeri anspruch online putem KiZ-Lotse alata. KiZ-Lotse NE izračunava iznos — samo provjerava da li uopće imaš pravo.\n\n🔗 arbeitsagentur.de/familie-und-kinder/kiz-lotse\n\nAlat Familienkasse — besplatan i anoniman.",
    whereToFind:
      "Za KiZ-Lotse provjeru trebaš: bruto prihod porodice, broj djece i njihove godine, podatke o stanarini/troškovima stanovanja, informaciju primaš li već Kindergeld.",
    commonMistake:
      "Ne koristiti KiZ-Lotse prije prijave — možeš uštedjeti vrijeme ako nemaš pravo.",
  },
  {
    deField: "Erweiterter Zugang",
    bhsField: "Prošireni pristup (Erweiterter Zugang)",
    whatToWrite:
      "Čak i ako ne možeš pokriti cijeli porodični Bedarf, možeš ipak dobiti KiZ ako:\n• Ne primaš i nisi tražio/la Bürgergeld (SGB II)\n• Sa prihodom + KiZ + Wohngeld nedostaje maksimalno 100€ za pokriće Bedarfa porodice",
    commonMistake:
      "Misliti da nemaš pravo jer prihod nije dovoljan — provjeri KiZ-Lotse jer Erweiterter Zugang može pomoći. Ne prijaviti se jer se misli da je proces previše složen — online zahtjev je dostupan i brz.",
  },
  {
    deField: "Erforderliche Unterlagen",
    bhsField: "Dokumenti za zahtjev",
    whatToWrite:
      "OBAVEZNO:\n□ Einkommensnachweise — potvrde o prihodima svih članova\n□ Nachweise zu Wohnkosten — Mietvertrag ili potvrde o kamatama\n□ Vermögensnachweise — izvodi računa i imovina\n□ Kindergeld-Bescheid — potvrda da primaš Kindergeld\n\nPO POTREBI:\n□ Elterngeld-Bescheid\n□ BAföG-Bescheid\n□ Unterhaltsnachweis (alimentacija)",
    whereToFind:
      "Potvrde o prihodima od poslodavca, Kindergeld-Bescheid od Familienkasse, Mietvertrag od stanodavca.",
    commonMistake:
      "Ne priložiti Kindergeld-Bescheid — bez njega zahtjev ne može biti obrađen.",
    note:
      "Nedostaju ti dokumenti? Možeš podnijeti zahtjev bez svih dokumenata i naknadno ih dostaviti online ili poštom putem 'Mitteilung an die Familienkasse'.",
  },
  {
    deField: "Antrag einreichen",
    bhsField: "Kako i gdje podnijeti zahtjev?",
    whatToWrite:
      "OPCIJA 1 — Online (preporučeno):\n📱 con.arbeitsagentur.de/prod/kiz/ui/start\n\nOPCIJA 2 — Pismeno:\n• Preuzi formular sa arbeitsagentur.de\n• Predaj u svojoj Familienkasse\n\nNakon prijave dobijaš Bescheid — pismenu odluku s iznosom i periodom. KiZ se odobrava na 6 mjeseci, nakon toga treba novi zahtjev.",
    commonMistake:
      "Kasno podnošenje — KiZ se ne isplaćuje retroaktivno. Promjenu prihoda ili stanarine ne prijaviti Familienkasse → može doći do povrata novca. Misliti da Kindergeld automatski uključuje KiZ — KiZ je odvojen zahtjev.",
    note:
      "KiZ se isplaćuje zajedno sa Kindergeldom na isti račun.",
  },
  {
    deField: "Einkommen des Kindes",
    bhsField: "Šta ako dijete ima vlastiti prihod?",
    whatToWrite:
      "Prihodi djeteta se uzimaju u obzir — ali samo 45%:\n• Alimentacija (Unterhalt) → 45% se uračunava\n• Unterhaltsvorschuss → 45% se uračunava\n• Waisenrente → 45% se uračunava",
    commonMistake:
      "Misliti da se cijeli iznos alimentacije oduzima od KiZ — uračunava se samo 45%.",
    note:
      "Primjer: Dijete prima 200€ alimentacije mjesečno. Na KiZ se uračunava samo 90€ (45% od 200€). KiZ se smanjuje za 90€, ne za 200€.",
  },
];

const BASE: GuideContent = {
  header: {
    title: "Dodatak za djecu (Kinderzuschlag)",
    source: "Familienkasse pri Bundesagentur für Arbeit",
    formName: "Online zahtjev ili pismeno (KiZ 1)",
    whoCanApply: "Porodice s manjim prihodima koje primaju Kindergeld",
    processingTime: "4–6 sedmica",
  },
  steps: STEPS,
};

export default function KinderzuschlagGuideContent() {
  return (
    <LocalizedGuide guideKey={GUIDE_KEY} base={BASE}>
      {/* Info box */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
              <p className="text-xs leading-relaxed text-foreground/80">
                📋 <strong>Kinderzuschlag (KiZ)</strong> — dodatna pomoć za porodice s manjim
                prihodima koje primaju Kindergeld, a ne ispunjavaju uvjete za Bürgergeld.
              </p>
            </div>
      
            {/* KiZ-Lotse CTA */}
            <div className="rounded-2xl border border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50/50 p-5 dark:border-yellow-700 dark:from-yellow-950/30 dark:to-amber-950/20">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/20 text-yellow-600 dark:text-yellow-400">
                  <Search className="h-5 w-5" />
                </span>
                <div className="space-y-2">
                  <p className="text-sm font-bold">Provjeri imaš li pravo — prije prijave</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    KiZ-Lotse NE izračunava iznos — samo provjerava da li uopće imaš pravo. Besplatan i anoniman.
                  </p>
                  <a
                    href="https://www.arbeitsagentur.de/familie-und-kinder/kiz-lotse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-xs font-bold text-[#0f1f3d] shadow-md shadow-yellow-400/20 transition-all hover:shadow-lg hover:bg-yellow-300"
                  >
                    <Search className="h-3.5 w-3.5" /> Provjeri pravo — KiZ-Lotse
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
      
            {/* Smart Guide Wizard */}
    </LocalizedGuide>
  );
}
