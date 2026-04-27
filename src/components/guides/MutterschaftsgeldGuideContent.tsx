import LocalizedGuide from "./LocalizedGuide";
import type { GuideContent } from "@/lib/guide-i18n";
import type { StepData } from "./SmartGuideWizardShared";

const GUIDE_KEY = "mutterschaftsgeld";

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

const BASE: GuideContent = {
  header: {
    title: "Porodiljski dodatak (Mutterschaftsgeld)",
    source: "Gesetzliche Krankenkasse / Bundesamt für Soziale Sicherung",
    formName: "Antrag na Krankenkasse (individualni formular svake kase)",
    whoCanApply: "Zaposlene žene sa vlastitim GKV članstvom",
    processingTime: "1–2 sedmice",
  },
  steps: STEPS,
};

export default function MutterschaftsgeldGuideContent() {
  return (
    <LocalizedGuide guideKey={GUIDE_KEY} base={BASE}>
      {/* Decision Tree */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold">Koja vrsta Mutterschaftsgeld ti pripada?</h3>
              <div className="grid gap-3">
                {DECISION_OPTIONS.map((opt) => (
                  <div
                    key={opt.label}
                    className={`group relative overflow-hidden rounded-2xl border ${opt.border} bg-card p-5 transition-all duration-300 shadow-sm hover:shadow-md`}
                  >
                    {/* gradient accent */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${opt.gradient}`} />
                    <div className="relative flex items-start gap-4">
                      <span className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${opt.badge}`}>
                        {opt.label}
                      </span>
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${opt.iconBg}`}>
                            <opt.icon className="h-4 w-4" />
                          </span>
                          <p className="text-[13px] font-semibold leading-tight">{opt.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-9">{opt.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-[11px] text-foreground/70 leading-relaxed">
                  ℹ️ Kako znati jesi li sama član GKV? Provjeri zdravstvenu karticu — ako piše <strong className="text-foreground">„Mitglied"</strong> a ne „Familienversichert", imaš vlastito članstvo.
                </p>
              </div>
            </div>
      
            {/* Smart Guide Wizard */}
    </LocalizedGuide>
  );
}
