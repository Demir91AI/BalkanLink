import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, ShieldCheck, Users, Briefcase } from "lucide-react";
import GuideInfoHeader from "./GuideInfoHeader";
import SmartGuideWizardShared, { type StepData } from "./SmartGuideWizardShared";

const DECISION_OPTIONS = [
  {
    label: "A",
    title: "Gesetzlich versichert (vlastito članstvo)",
    icon: ShieldCheck,
    description: "Max 13€/dan od Krankenkasse + Arbeitgeberzuschuss od poslodavca",
    color: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  {
    label: "B",
    title: "Privat versichert ili familienversichert",
    icon: Users,
    description: "210€ ukupno jednokratno od Bundesamt für Soziale Sicherung",
    color: "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    label: "C",
    title: "Selbstständig mit privater Krankentagegeldversicherung",
    icon: Briefcase,
    description: "Kontaktiraj svoju privatnu osiguravajuću kuću",
    color: "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/20",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
] as const;

const STEPS: StepData[] = [
  {
    deField: "Versicherungsstatus prüfen",
    bhsField: "Koja vrsta Mutterschaftsgeld ti pripada?",
    whatToWrite:
      "Zavisi od tvoje zdravstvene osiguranja:\n\n• Gesetzlich versichert (vlastito članstvo) → Max 13€/dan od Krankenkasse + Arbeitgeberzuschuss od poslodavca\n• Privat versichert ili familienversichert → 210€ ukupno jednokratno od Bundesamt für Soziale Sicherung\n• Selbstständig mit privater Krankentagegeldversicherung → Kontaktiraj svoju privatnu osiguravajuću kuću",
    whereToFind:
      "Na svojoj zdravstvenoj kartici ili u dokumentima Krankenkasse.",
    commonMistake:
      "Misliti da familienversicherung daje pravo — mora biti vlastito članstvo u GKV.",
    note:
      "Kako znati jesi li sama član GKV? Provjeri zdravstvenu karticu — ako piše 'Mitglied' a ne 'Familienversichert', imaš vlastito članstvo.",
  },
  {
    deField: "Ärztliches Zeugnis einholen",
    bhsField: "Ärztliches Zeugnis einholen",
    whatToWrite:
      "Potvrda sadrži: ime, prezime, datum — i 'voraussichtlicher Tag der Entbindung' (procijenjeni datum porođaja).",
    whereToFind:
      "Kod svog ginekologa ili babice — svaka gesetzliche Krankenkasse ima vlastiti formular, najčešće na njihovoj web stranici.",
    format:
      "Zeugnis — NE Mutterpass. To su dvije različite stvari.",
    commonMistake:
      "Čekanje predugo s prijavom — prijavi se čim dobiješ potvrdu o terminu od doktora/babice.",
    note:
      "Trajanje: Normalno 6+8 sedmica. Prijevremeni/višestruki porod: produžuje se. Carski rez: 12 sedmica poslije.",
  },
  {
    deField: "Antrag bei der Krankenkasse",
    bhsField: "Antrag bei der Krankenkasse",
    whatToWrite:
      "• Lični podaci (ime, adresa, IBAN)\n• Datum početka Mutterschutzfrist (6 sedmica prije porođaja)\n• Prilaži Zeugnis über den Entbindungstag",
    whereToFind:
      "Direktno svojoj Krankenkasse — poštom ili online portalom. Svaka kasa ima vlastiti formular i vlastiti proces.",
    format:
      "Pismeno (preporučeno s potpisom) ili online — provjeri na web stranici svoje Krankenkasse.",
    commonMistake:
      "Ne informisati poslodavca na vrijeme o Elternzeit.",
    note:
      "Za privatno osigurane i familienversichert: Prijava ide na mutterschaftsgeld.de (Bundesamt für Soziale Sicherung).",
  },
  {
    deField: "Arbeitgeber informieren",
    bhsField: "Arbeitgeber informieren",
    whatToWrite:
      "Obavijesti HR/kadrovsku službu o terminu porođaja i Mutterschutzfrist — oni isplaćuju Arbeitgeberzuschuss.",
    whereToFind:
      "Arbeitgeberzuschuss se traži ODVOJENO od Krankenkasse. Poslodavac automatski zna da mora platiti razliku ako je tvoja neto plaća bila viša od 13€/dan.",
    format:
      "Nema posebnog formulara — pismena ili usmena obavijest HR-u.",
    commonMistake:
      "Zaboraviti informisati poslodavca — Arbeitgeberzuschuss se ne isplaćuje automatski.",
    note:
      "Arbeitgeberzuschuss: Ako ti je neto plaća bila viša od 13€/dan, poslodavac plaća razliku iznad Krankenkasse iznosa. Izračun: prosječna neto plaća zadnja 3 kalendarska mjeseca prije početka Mutterschutzfrist.",
  },
  {
    deField: "Geburtsurkunde einsenden",
    bhsField: "Geburtsurkunde einsenden",
    whatToWrite:
      "Pošalji rodni list djeteta (Geburtsurkunde) Krankenkasse za nastavak isplate Mutterschaftsgeld.",
    whereToFind:
      "Geburtsurkunde dobijaš od Standesamt-a — obično unutar 1–2 dana od porođaja.",
    commonMistake:
      "Zaboraviti poslati Geburtsurkunde → isplata se prekida dok se ne pošalje.",
    note:
      "Lohnbescheinigung (potvrda o plati od poslodavca) možda će biti potrebna — provjeri sa Krankenkasse.",
  },
  {
    deField: "Nächster Schritt: Elterngeld",
    bhsField: "Sljedeći korak: Elterngeld",
    whatToWrite:
      "Elterngeld se može prijaviti retroaktivno samo za zadnja 3 Lebensmonate — ne čekaj predugo.",
    commonMistake:
      "Kasno prijaviti Elterngeld — retroaktivno vrijedi samo za zadnja 3 Lebensmonate.",
    note:
      "Mutterschaftsgeld je porezno slobodan, ali podliježe Progressionsvorbehalt. Ako si primila više od 410€ Mutterschaftsgeld + Arbeitgeberzuschuss → obavezna je Steuererklärung za tu godinu.",
  },
];

export default function MutterschaftsgeldGuideContent() {
  return (
    <div className="space-y-8">
      <GuideInfoHeader
        title="Porodiljski dodatak (Mutterschaftsgeld)"
        source="Gesetzliche Krankenkasse / Bundesamt für Soziale Sicherung"
        formName="Antrag na Krankenkasse (individualni formular svake kase)"
        whoCanApply="Zaposlene žene sa vlastitim GKV članstvom"
        processingTime="1–2 sedmice"
      />

      {/* Decision Tree */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold">Koja vrsta Mutterschaftsgeld ti pripada?</h3>
        <div className="grid gap-3">
          {DECISION_OPTIONS.map((opt) => (
            <div key={opt.label} className={`rounded-xl border p-4 ${opt.color}`}>
              <div className="flex items-start gap-3">
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${opt.badge}`}>
                  {opt.label}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <opt.icon className="h-3.5 w-3.5 shrink-0" />
                    <p className="text-xs font-semibold">{opt.title}</p>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">{opt.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed rounded-lg bg-muted/50 p-3">
          ℹ️ Kako znati jesi li sama član GKV? Provjeri zdravstvenu karticu — ako piše <strong>„Mitglied"</strong> a ne „Familienversichert", imaš vlastito članstvo.
        </p>
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

      {/* Official link */}
      <div className="rounded-xl border bg-card p-5 text-center">
        <p className="text-xs text-muted-foreground mb-2">Više informacija o Mutterschaftsgeld</p>
        <a
          href="https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Više informacija — Familienportal.de
        </a>
      </div>
    </div>
  );
}
