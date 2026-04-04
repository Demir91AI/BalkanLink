import { AlertCircle, Info } from "lucide-react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-bold text-[15px] border-b-2 mb-3 pb-1" style={{ borderColor: "#E0D0B0" }}>{children}</h3>
);
const GoldNote = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#C9A84C" }} /> <span>{children}</span>
  </div>
);
const RedNote = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed" style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}>
    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /> <span>{children}</span>
  </div>
);
const BlueNote = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E40AF" }}>
    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#3B82F6" }} /> <span>{children}</span>
  </div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[11px] uppercase text-[#6B6B6B] mb-1 font-medium">{children}</label>
);
const Example = ({ children }: { children: React.ReactNode }) => (
  <span className="italic text-[13px]" style={{ color: "#C9A84C" }}>{children}</span>
);
const FieldRow = ({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) => (
  <div className="grid gap-4 mb-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>{children}</div>
);
const Field = ({ label, example, type = "text" }: { label: string; example: string; type?: string }) => (
  <div>
    <Label>{label}</Label>
    <input type={type} defaultValue={example} className="w-full rounded border px-2.5 py-1.5 text-sm" style={{ borderColor: "#C0C0C0" }} />
    <Example>z.B. {example}</Example>
  </div>
);
const CB = ({ checked = false, label }: { checked?: boolean; label: string }) => (
  <label className="flex items-center gap-2 text-sm cursor-pointer">
    <input type="checkbox" defaultChecked={checked} className="accent-[#C9A84C] h-4 w-4" /> {label}
  </label>
);
const PageBreak = ({ n, total = 5 }: { n: number; total?: number }) => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 border-t" style={{ borderColor: "#E0D0B0" }} />
    <span className="text-xs font-semibold text-muted-foreground">Seite {n} von {total}</span>
    <div className="flex-1 border-t" style={{ borderColor: "#E0D0B0" }} />
  </div>
);

export default function VisaPermanentForm2() {
  return (
    <div className="rounded-lg border p-8 max-w-[800px] mx-auto space-y-6" style={{ borderColor: "#D0C8B0", background: "white" }}>
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-extrabold">Antrag auf Daueraufenthalt – EU</h2>
        <p className="text-xs text-muted-foreground">AUFENTHG-014-DE-FL – 10-2025</p>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mt-2 text-xs font-bold" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
          § 9a AufenthG — Gleichzeitig mit NE-Antrag stellen!
        </div>
      </div>
      <RedNote>📸 Seit dem 01.05.2025 sind ausschließlich digitale biometrische Lichtbilder zulässig!</RedNote>
      <GoldNote>
        Diesen Antrag IMMER zusammen mit dem NE-Antrag (AUFENTHG-009) stellen!
        Der Daueraufenthalt-EU gibt dir EU-weite Mobilität — nach 18 Monaten kannst du in anderen EU-Staaten wohnen und arbeiten.
      </GoldNote>

      {/* SEITE 1 */}
      <PageBreak n={1} />
      <SectionTitle>Einreise und Aufenthalt — Persönliche Angaben</SectionTitle>
      <FieldRow>
        <Field label="Familienname" example="Mustermann" />
        <Field label="Vorname(n)" example="MAX" />
      </FieldRow>
      <FieldRow cols={3}>
        <Field label="Geburtsdatum" example="01.01.1990" />
        <Field label="Geburtsort" example="Sarajevo" />
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </FieldRow>
      <div className="flex flex-wrap gap-4 mb-3">
        <CB checked label="männlich" />
        <CB label="weiblich" />
      </div>
      <div className="flex flex-wrap gap-3 mb-3">
        <CB label="ledig" />
        <CB checked label="verheiratet — seit 12.06.2015" />
        <CB label="geschieden" />
      </div>
      <FieldRow cols={3}>
        <Field label="Größe (cm)" example="180 cm" />
        <Field label="Augenfarbe" example="braun" />
        <Field label="E-Mail" example="max.mustermann@email.de" />
      </FieldRow>

      <SectionTitle>Derzeitiger Aufenthaltstitel</SectionTitle>
      <CB checked label="Aufenthaltserlaubnis AufenthG" />
      <FieldRow cols={3}>
        <Field label="gemäß §" example="18 AufenthG" />
        <Field label="Aufenthaltszweck" example="Erwerbstätigkeit" />
        <Field label="Gültig bis" example="31.12.2025" />
      </FieldRow>
      <GoldNote>Aktuellen Aufenthaltstitel und § eintragen.</GoldNote>

      <SectionTitle>Aufenthaltsverlauf der letzten 5 Jahre</SectionTitle>
      <div className="space-y-2 text-sm">
        <FieldRow cols={3}>
          <Field label="von" example="15.03.2019" />
          <Field label="bis" example="14.03.2020" />
          <Field label="Aufenthaltszweck" example="Erwerbstätigkeit §18 AufenthG" />
        </FieldRow>
        <FieldRow cols={3}>
          <Field label="von" example="15.03.2020" />
          <Field label="bis" example="14.03.2022" />
          <Field label="Aufenthaltszweck" example="Erwerbstätigkeit §18 (Verlängerung)" />
        </FieldRow>
        <FieldRow cols={3}>
          <Field label="von" example="15.03.2022" />
          <Field label="bis" example="31.12.2025" />
          <Field label="Aufenthaltszweck" example="Erwerbstätigkeit §18 (Verlängerung)" />
        </FieldRow>
      </div>
      <GoldNote>Alle Aufenthaltstitel der letzten 5 Jahre eintragen — lückenlos! Zeigt ununterbrochenen rechtmäßigen Aufenthalt.</GoldNote>

      <SectionTitle>Aufenthalt im Ausland</SectionTitle>
      <CB checked label="nein — kein längerer Auslandsaufenthalt" />
      <GoldNote>Aufenthalte im Ausland über 6 Monate unterbrechen die 5-Jahresfrist. Kurze Urlaube (bis 6 Monate) sind unproblematisch.</GoldNote>

      <Field label="Einreise am" example="15.03.2019" />

      {/* SEITE 2 */}
      <PageBreak n={2} />
      <SectionTitle>Familienangehörige — Ehegatte</SectionTitle>
      <FieldRow cols={3}>
        <Field label="Name" example="Musterfrau Maria" />
        <Field label="Geburtsdatum" example="15.05.1992" />
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </FieldRow>
      <FieldRow>
        <Field label="Status" example="Aufenthaltserlaubnis §30" />
        <Field label="Gültig bis" example="30.06.2025" />
      </FieldRow>
      <GoldNote>Ehegatte kann gleichzeitig eigenen Antrag auf Daueraufenthalt-EU stellen!</GoldNote>

      <SectionTitle>Kinder</SectionTitle>
      <FieldRow cols={3}>
        <Field label="Name" example="Mustermann Lena" />
        <Field label="Geb." example="10.10.2018" />
        <Field label="Staatsang." example="bosnisch" />
      </FieldRow>
      <FieldRow cols={3}>
        <Field label="Name" example="Mustermann Tom" />
        <Field label="Geb." example="05.03.2021" />
        <Field label="Staatsang." example="bosnisch" />
      </FieldRow>

      <SectionTitle>Wohnraum</SectionTitle>
      <FieldRow cols={3}>
        <Field label="Wohnfläche" example="95 m²" />
        <Field label="Für Personen" example="4" />
        <div><CB checked label="Mietvertrag liegt bei." /></div>
      </FieldRow>
      <GoldNote>Wohnraumbestätigung oder Mietvertrag muss aktuell sein.</GoldNote>

      {/* SEITE 3 */}
      <PageBreak n={3} />
      <SectionTitle>Lebensunterhalt</SectionTitle>
      <CB checked label="Einkommen aus eigener Erwerbstätigkeit" />
      <FieldRow>
        <Field label="Monatlicher Netto-Verdienst" example="3.200 €" />
        <Field label="bei/als" example="TechGmbH München / Senior Softwareentwickler" />
      </FieldRow>
      <GoldNote>Für Daueraufenthalt-EU gelten dieselben Anforderungen wie für NE: Lebensunterhalt ohne Sozialhilfe gesichert.</GoldNote>

      <div className="mt-3">
        <p className="text-sm font-medium mb-1">Beziehen Sie Leistungen nach SGB II/XII?</p>
        <CB checked label="nein" />
      </div>

      <SectionTitle>Kranken- und Pflegeversicherung</SectionTitle>
      <CB checked label="gesetzlich kranken- und pflegeversichert" />
      <FieldRow>
        <Field label="bei" example="TK – Techniker Krankenkasse" />
        <div>
          <CB checked label="unbefristet" />
          <CB checked label="verlängert sich automatisch" />
        </div>
      </FieldRow>
      <GoldNote>Für den Daueraufenthalt-EU muss die Kranken- UND Pflegeversicherung UNBEFRISTET bestehen! GKV-Mitgliedschaft erfüllt dies automatisch.</GoldNote>

      <SectionTitle>Verpflichtung nach Abgabegesetzen</SectionTitle>
      <CB checked label="Ich habe keine Steuerrückstände — Bestätigung des Finanzamts liegt bei." />
      <GoldNote>Finanzamt-Bestätigung anfordern (kostenlos beim Wohnsitzfinanzamt).</GoldNote>

      <SectionTitle>Rentenversicherung</SectionTitle>
      <CB checked label="Ich habe mindestens 60 Monate Pflichtbeiträge zur Rentenversicherung geleistet. (Nachweis liegt bei)" />
      <GoldNote>Rentenversicherungsverlauf von DRV beifügen (drv.de — kostenlos).</GoldNote>

      <SectionTitle>Unterhaltspflichten</SectionTitle>
      <CB checked label="nein" />

      {/* SEITE 4 */}
      <PageBreak n={4} />
      <SectionTitle>Integration</SectionTitle>
      <CB checked label="ja, das Zeugnis über einen Integrationskurs liegt bei." />
      <GoldNote>Integrationskurszeugnis mit B1 und Orientierungskurs-Teil beifügen!</GoldNote>

      <SectionTitle>Rechtsverstöße</SectionTitle>
      <div className="space-y-2">
        <CB checked label="nein — Wurden Sie wegen Rechtsverstößen verurteilt?" />
        <CB checked label="nein — Wurden Sie ausgewiesen oder abgeschoben?" />
        <CB checked label="nein — Wurde ein Einreiseantrag abgelehnt?" />
        <CB checked label="nein — Wird gegen Sie ermittelt?" />
      </div>
      <GoldNote>Bei Vorstrafen vollständige Angaben — auch bei getilgten Strafen nach BZRG.</GoldNote>

      {/* SEITE 5 */}
      <PageBreak n={5} />

      {/* Checklist */}
      <div className="rounded-lg p-4 space-y-2" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h4 className="text-sm font-bold" style={{ color: "#92400E" }}>Vollständigkeits-Checkliste für Daueraufenthalt-EU:</h4>
        <div className="space-y-1.5 text-[12px]" style={{ color: "#92400E" }}>
          <CB checked label="Nachweis 5 Jahre rechtmäßiger Aufenthalt (alle Aufenthaltstitel)" />
          <CB checked label="Rentenversicherungsverlauf (mind. 60 Monate)" />
          <CB checked label="B1-Sprachzeugnis (Integrationskurs)" />
          <CB checked label="Unbefristete Kranken- + Pflegeversicherung" />
          <CB checked label="Gehaltsabrechnungen letzter 3 Monate" />
          <CB checked label="Finanzamt-Bestätigung (keine Steuerrückstände)" />
          <CB checked label="Meldebescheinigung (aktuell)" />
          <CB checked label="Mietvertrag / Wohnraumbestätigung" />
          <CB checked label="2 digitale biometrische Lichtbilder" />
          <CB checked label="NE-Antrag (AUFENTHG-009) — gleichzeitig!" />
        </div>
      </div>

      <SectionTitle>Unterschrift</SectionTitle>
      <FieldRow>
        <Field label="Ort, Datum" example="München, [aktuelles Datum]" />
        <div>
          <Label>Eigenhändige Unterschrift</Label>
          <div className="h-12 rounded border border-dashed flex items-center justify-center text-xs text-muted-foreground" style={{ borderColor: "#C0C0C0" }}>
            [Unterschrift]
          </div>
        </div>
      </FieldRow>

      <details className="text-xs text-muted-foreground mt-4">
        <summary className="cursor-pointer font-semibold">Hinweise gem. § 54, § 82, § 86 AufenthG</summary>
        <p className="mt-2 leading-relaxed">
          Ich versichere, vorstehende Angaben nach bestem Wissen und Gewissen gemacht zu haben.
          Mir ist bekannt, dass falsche oder unvollständige Angaben strafrechtliche Folgen haben können (§ 95 AufenthG).
        </p>
      </details>

      {/* Stellungnahme Amtsbereich */}
      <div className="rounded-lg p-4 mt-4 opacity-60" style={{ background: "#F5F5F5", border: "1px solid #D0D0D0" }}>
        <p className="text-xs font-semibold text-muted-foreground mb-2">Stellungnahme der Meldebehörde (Amtsbereich)</p>
        <GoldNote>Diese Seiten werden von der Ausländerbehörde ausgefüllt — nicht vom Antragsteller.</GoldNote>
      </div>

      {/* After EU info */}
      <BlueNote>
        Nach Erteilung des Daueraufenthalts-EU:
        → Nach 18 Monaten: Recht auf Wohnsitz und Arbeit in anderen EU-Staaten.
        → Du musst NICHT erneut ein Visum beantragen für andere EU-Länder.
        → Die Karte wird alle 5 Jahre erneuert (kostet ca. 75 €).
      </BlueNote>

      {/* Download Hint */}
      <div className="rounded-lg p-4 mt-4 space-y-2" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <p className="text-[12px]" style={{ color: "#92400E" }}>
          Das offizielle AUFENTHG-014 Formular erhältst du bei deiner Ausländerbehörde.
        </p>
        <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: "#C9A84C" }}>
          🔗 BAMF – Daueraufenthalt-EU
        </a>
      </div>
    </div>
  );
}
