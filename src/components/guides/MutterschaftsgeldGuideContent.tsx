import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Info, ExternalLink, ChevronRight, ChevronLeft, Baby } from "lucide-react";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

/* ── Decision-tree option cards ── */
interface OptionCardProps {
  label: string;
  tag: string;
  tagColor: string;
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

function OptionCard({ label, tag, tagColor, children, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/40"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: tagColor }}
        >
          {tag}
        </span>
        <span className="text-sm font-bold">{label}</span>
      </div>
      <div className="text-xs leading-relaxed text-muted-foreground">{children}</div>
    </button>
  );
}

/* ── Steps for the wizard ── */
const STEPS: StepData[] = [
  {
    deField: "Ärztliches Zeugnis einholen",
    bhsField: "Šta je Mutterschaftsgeld?",
    whatToWrite:
      "Mutterschaftsgeld osigurava prihod dok ne smiješ raditi — 6 sedmica prije i 8–12 sedmica nakon porođaja.",
    whereToFind:
      "Kod svoje gesetzliche Krankenkasse — svaka kasa ima vlastiti formular, najčešće na njihovoj web stranici.",
    format:
      "Max 13 €/dan od Krankenkasse. Ako ti je neto plaća bila viša od 13€/dan → poslodavac plaća razliku (Arbeitgeberzuschuss). Izračun: prosječna neto plaća zadnja 3 kalendarska mjeseca prije početka Mutterschutzfrist.",
    commonMistake:
      "Čekanje predugo s prijavom — prijavi se čim dobiješ potvrdu o terminu porođaja od doktora/babice",
    note:
      "Trajanje: Normalno 6+8 sedmica. Prijevremeni/višestruki porod: produžuje se. Carski rez: 12 sedmica poslije.",
  },
  {
    deField: "Versicherungsstatus prüfen",
    bhsField: "Koja vrsta ti pripada?",
    whatToWrite:
      "Opcija A — GKV vlastito članstvo: max 13€/dan + Arbeitgeberzuschuss. Opcija B — Privat/familienversichert: fiksno 210€ ukupno od BAS. Opcija C — Selbstständig s Krankentagegeld: kontaktiraj privatnu osiguravajuću kuću.",
    whereToFind:
      "Provjeri svoju zdravstvenu karticu — ako piše 'Mitglied' a ne 'Familienversichert', imaš vlastito članstvo.",
    commonMistake:
      "Misliti da familienversicherung daje pravo na Krankenkasse isplatu — ne daje, mora biti vlastito članstvo u GKV",
    note:
      "Privatno osigurane i familienversichert osobe podnose zahtjev na mutterschaftsgeld.de (Bundesamt für Soziale Sicherung) — fiksno 210€ jednokratno.",
  },
  {
    deField: "Unterlagen vorbereiten",
    bhsField: "Šta trebaš pripremiti?",
    whatToWrite:
      "Za Krankenkasse (GKV): Antrag sa web stranice kase + 'Zeugnis über den mutmaßlichen Tag der Entbindung' + nakon porođaja Geburtsurkunde. Za BAS: Online formular na mutterschaftsgeld.de + potvrda termina + potvrda da nisi sama član GKV.",
    whereToFind:
      "Zeugnis über Entbindungstag traži od ginekologa ili babice. To NIJE isto kao Mutterpass — posebna potvrda!",
    commonMistake:
      "Miješati Zeugnis über Entbindungstag sa Mutterpass-om — to su dva različita dokumenta",
  },
  {
    deField: "Antrag bei Krankenkasse",
    bhsField: "Kako podnijeti zahtjev?",
    whatToWrite:
      "Lični podaci (ime, adresa, IBAN), datum početka Mutterschutzfrist (6 sedmica prije porođaja), ime i adresa poslodavca.",
    whereToFind:
      "Direktno svojoj Krankenkasse — poštom ili online portalom. Svaka kasa ima vlastiti formular i vlastiti proces.",
    format: "Podnijeti ČIM dobiješ potvrdu o terminu porođaja — NE čekaj do početka Mutterschutzfrist.",
    commonMistake:
      "Arbeitgeberzuschuss se traži ODVOJENO — informiši HR/kadrovsku službu svog poslodavca",
  },
  {
    deField: "Nach der Geburt",
    bhsField: "Šta nakon porođaja?",
    whatToWrite:
      "Pošalji Geburtsurkunde svojoj Krankenkasse za nastavak isplate. Prijavi porođaj poslodavcu odmah. Razmisli o Elterngeld prijavi — može se retroaktivno za zadnja 3 Lebensmonate.",
    commonMistake:
      "Zaboraviti poslati Geburtsurkunde → isplata se prekida dok se ne pošalje. Kasno prijaviti Elterngeld → vrijedi samo 3 mjeseca retroaktivno.",
    note:
      'Primjer Zeugnis: "Name der Patientin: Marija Mustermann, Voraussichtlicher Tag der Entbindung: 15.06.2025, Unterschrift Arzt/Hebamme: ___"',
  },
  {
    deField: "Steuerliche Behandlung",
    bhsField: "Mutterschaftsgeld i porezi",
    whatToWrite:
      "Mutterschaftsgeld je porezno slobodan prihod — ali podliježe Progressionsvorbehalt. To znači da podiže poreznu stopu na ostale tvoje prihode.",
    commonMistake:
      "Misliti da nema poreske obaveze jer je oslobođeno — Steuererklärung je obavezna ako je iznos > 410€",
    note:
      "Ako si u toj godini primila više od 410€ Mutterschaftsgeld + Arbeitgeberzuschuss → MORAŠ predati Steuererklärung za tu godinu.",
  },
];

export default function MutterschaftsgeldGuideContent() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <GuideInfoHeader
        title="Porodiljski dodatak (Mutterschaftsgeld)"
        source="Gesetzliche Krankenkasse / Bundesamt für Soziale Sicherung"
        formName="Antrag na Krankenkasse (individualni formular svake kase)"
        whoCanApply="Zaposlene žene sa vlastitim članstvom u gesetzliche Krankenkasse tokom Mutterschutzfrist (6 sedmica prije + 8–12 sedmica nakon porođaja)."
        processingTime="1–2 sedmice od podnošenja"
        requirements={[
          "Zeugnis über den mutmaßlichen Tag der Entbindung (potvrda od ginekologa/babice)",
          "Antrag — preuzi sa web stranice svoje Krankenkasse",
          "Geburtsurkunde (nakon porođaja — za nastavak isplate)",
          "Lohnbescheinigung (potvrda o plati od poslodavca)",
        ]}
        commonMistakes={[
          "Prekasno podnijeti zahtjev — prijavi se čim dobiješ potvrdu o terminu",
          "Misliti da familienversicherung daje pravo — mora biti vlastito članstvo u GKV",
          "Zaboraviti poslati Geburtsurkunde nakon porođaja",
          "Ne informisati poslodavca na vrijeme o Elternzeit",
        ]}
      />

      {/* Info box */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
        <p className="text-sm leading-relaxed">
          📋 <strong>Mutterschaftsgeld nije jedan formular</strong> — svaka Krankenkasse ima vlastiti obrazac.
          Ovaj vodič te vodi kroz proces korak po korak.
        </p>
      </div>

      {/* Privatno vs GKV info */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
        <p className="text-sm leading-relaxed">
          ⚠️ <strong>Ako si privatno osigurana ili familienversichert:</strong><br />
          Ne primaš od Krankenkasse nego od Bundesamt für Soziale Sicherung — fiksno 210€ ukupno (jednokratno).
        </p>
      </div>

      {/* Decision tree — Korak 2 visual */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-bold flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          Koja vrsta Mutterschaftsgeld ti pripada?
        </h3>
        <div className="space-y-3">
          <OptionCard
            label="Gesetzlich versichert (vlastito članstvo)"
            tag="Opcija A"
            tagColor="#16a34a"
            selected={selectedOption === "A"}
            onClick={() => setSelectedOption(selectedOption === "A" ? null : "A")}
          >
            Primaš od svoje Krankenkasse — max <strong>13€/dan</strong> + Arbeitgeberzuschuss od poslodavca.
            {selectedOption === "A" && (
              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
                <p className="font-semibold text-foreground">→ Podnesi zahtjev direktno kod svoje Krankenkasse</p>
                <p className="mt-1">Svaka kasa ima vlastiti formular — provjeri na web stranici ili pozovi servisni broj.</p>
              </div>
            )}
          </OptionCard>

          <OptionCard
            label="Privat versichert ili familienversichert"
            tag="Opcija B"
            tagColor="#2563eb"
            selected={selectedOption === "B"}
            onClick={() => setSelectedOption(selectedOption === "B" ? null : "B")}
          >
            Primaš od Bundesamt für Soziale Sicherung (BAS) — fiksno <strong>210€ ukupno</strong> (jednokratno).
            {selectedOption === "B" && (
              <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
                <p className="font-semibold text-foreground">→ Prijava online na mutterschaftsgeld.de</p>
                <a
                  href="https://www.mutterschaftsgeld.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> Otvori mutterschaftsgeld.de
                </a>
              </div>
            )}
          </OptionCard>

          <OptionCard
            label="Selbstständig mit Krankentagegeldversicherung"
            tag="Opcija C"
            tagColor="#9333ea"
            selected={selectedOption === "C"}
            onClick={() => setSelectedOption(selectedOption === "C" ? null : "C")}
          >
            Imaš pravo na Krankentagegeld tokom Mutterschutzfrist — kontaktiraj svoju privatnu osiguravajuću kuću.
            {selectedOption === "C" && (
              <div className="mt-3 rounded-lg border border-violet-200 bg-violet-50 p-3 dark:border-violet-800 dark:bg-violet-950/30">
                <p className="font-semibold text-foreground">→ Kontaktiraj svoju privatnu osiguravajuću kuću direktno</p>
              </div>
            )}
          </OptionCard>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            <Info className="inline h-3 w-3 mr-1" />
            <strong>Kako znati jesi li sama član GKV?</strong> Provjeri svoju zdravstvenu karticu —
            ako piše "Mitglied" a ne "Familienversichert", imaš vlastito članstvo.
          </p>
        </div>
      </div>

      {/* Smart Guide Wizard */}
      <SmartGuideWizardShared steps={STEPS} />

      {/* Elterngeld next-step CTA */}
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5 dark:border-yellow-800 dark:bg-yellow-950/20">
        <p className="text-sm leading-relaxed">
          💡 <strong>Sljedeći korak: Elterngeld</strong><br />
          Nakon Mutterschaftsgelda obično slijedi Elterngeld.
          Prijavi ga što prije — vrijedi samo za zadnja 3 Lebensmonate.
        </p>
        <Link
          to="/formulari?topic=elterngeld"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Otvori Elterngeld vodič <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Muster CTA — no Musterformular, link to Krankenkasse */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: "#111827", border: "1px solid #3B82F6" }}
      >
        <div className="text-[32px] mb-3">📋</div>
        <h2 className="text-xl font-bold text-white">Vježbaj na Musterformularu</h2>
        <p className="mt-2 text-[13px] text-gray-400">
          Svaka Krankenkasse ima vlastiti formular.
          Nema jedinstvenog Musterformulara za Mutterschaftsgeld.
        </p>
        <a
          href="https://www.krankenkassenzentrale.de"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block w-full font-bold text-white py-3 px-6 rounded-[10px]"
          style={{ backgroundColor: "#3B82F6" }}
        >
          Idi na stranicu Krankenkasse →
        </a>
      </div>

      {/* Official link */}
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">Više informacija o Mutterschaftsgeld</p>
        <a
          href="https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium"
          style={{ color: "#3B82F6" }}
        >
          🔗 Više informacija — Familienportal.de
        </a>
      </div>
    </div>
  );
}
