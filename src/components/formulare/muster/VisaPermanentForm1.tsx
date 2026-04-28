import {
  SectionTitle,
  GoldNote,
  RedNote,
  Label,
  FieldRow,
  Field,
  CB,
  PageBreak,
} from "./VisaFormPrimitives";

export default function VisaPermanentForm1() {
  return (
    <div className="rounded-lg border p-8 max-w-[800px] mx-auto space-y-6" style={{ borderColor: "#D0C8B0", background: "white" }}>
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-extrabold">Antrag auf Erteilung einer Niederlassungserlaubnis</h2>
        <p className="text-xs text-muted-foreground">gem. § 81 Abs. 1 Aufenthaltsgesetz (AufenthG)</p>
        <p className="text-xs text-muted-foreground">AUFENTHG-009-DE-FL – 10-2025</p>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mt-2 text-xs font-bold" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
          Ausgefüllt für: Niederlassungserlaubnis § 9 AufenthG
        </div>
      </div>
      <RedNote>📸 Seit dem 01.05.2025 sind ausschließlich digitale biometrische Lichtbilder zulässig!</RedNote>
      <GoldNote>
        Dieser Antrag wird bei der Ausländerbehörde am Wohnort gestellt — NICHT bei der Botschaft!
        Stellen Sie gleichzeitig auch den Antrag auf Daueraufenthalt-EU (AUFENTHG-014).
      </GoldNote>

      {/* SEITE 1 */}
      <PageBreak n={1} />
      <SectionTitle>Antragsteller/in</SectionTitle>
      <FieldRow>
        <Field label="Familienname, ggf. frühere(r) Name(n)" example="Mustermann" />
        <Field label="Vorname(n) (Rufname in Großbuchstaben)" example="MAX" />
      </FieldRow>
      <FieldRow cols={3}>
        <Field label="Geburtsdatum" example="01.01.1990" />
        <Field label="Geburtsort" example="Sarajevo, Bosnien und Herzegowina" />
        <Field label="Geburtsland" example="Bosnien und Herzegowina" />
      </FieldRow>
      <FieldRow>
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
        <Field label="Frühere Staatsangehörigkeit(en)" example="keine" />
      </FieldRow>
      <div className="flex flex-wrap gap-4 mb-3">
        <CB checked label="männlich" />
        <CB label="weiblich" />
      </div>
      <div className="flex flex-wrap gap-3 mb-3">
        <CB label="ledig" />
        <CB checked label="verheiratet — seit 12.06.2015" />
        <CB label="geschieden" />
        <CB label="verwitwet" />
      </div>
      <FieldRow>
        <div>
          <Field label="Derzeitiger Wohnsitz in Deutschland" example="Musterstraße 1, 80331 München" />
          <GoldNote>Anschrift muss mit aktueller Meldebescheinigung übereinstimmen.</GoldNote>
        </div>
        <div>
          <Field label="Ersteinreise am" example="15.03.2019" />
          <GoldNote>Datum der ersten Einreise — wichtig für Nachweis der 5-Jahresfrist!</GoldNote>
        </div>
      </FieldRow>
      <FieldRow>
        <Field label="Telefon" example="+49 89 123456" />
        <Field label="E-Mail" example="max.mustermann@email.de" />
      </FieldRow>
      <FieldRow>
        <Field label="Größe (cm)" example="180 cm" />
        <Field label="Augenfarbe" example="braun" />
      </FieldRow>

      <SectionTitle>Aufenthalt im Ausland</SectionTitle>
      <CB checked label="nein — Kein längerer Auslandsaufenthalt." />
      <GoldNote>Falls Sie sich länger als 6 Monate im Ausland aufgehalten haben: Ja ankreuzen und Daten angeben. Solche Aufenthalte können die 5-Jahresfrist unterbrechen!</GoldNote>

      <SectionTitle>Familienangehörige — Ehegatte</SectionTitle>
      <FieldRow cols={3}>
        <Field label="Name" example="Musterfrau Maria" />
        <Field label="Geburtsdatum" example="15.05.1992" />
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </FieldRow>
      <FieldRow>
        <Field label="Aufenthaltsrechtlicher Status" example="Aufenthaltserlaubnis §30" />
        <Field label="Gültig bis" example="30.06.2025" />
      </FieldRow>
      <GoldNote>Familienangehörige können gleichzeitig eigene NE-Anträge stellen wenn sie die Voraussetzungen erfüllen.</GoldNote>

      {/* SEITE 2 */}
      <PageBreak n={2} />
      <SectionTitle>Lebensunterhalt</SectionTitle>
      <CB checked label="Einkommen aus eigener Erwerbstätigkeit" />
      <FieldRow>
        <Field label="Monatlicher Netto-Verdienst" example="3.200 €" />
        <Field label="bei/als" example="TechGmbH München / Senior Softwareentwickler" />
      </FieldRow>
      <GoldNote>Für die NE muss der Lebensunterhalt OHNE Sozialhilfe gesichert sein. Gehaltsabrechnungen der letzten 3 Monate beifügen!</GoldNote>

      <div className="mt-3">
        <p className="text-sm font-medium mb-1">Beziehen Sie Leistungen nach SGB II/XII?</p>
        <CB checked label="nein" />
        <GoldNote>WICHTIG: Wer in den letzten 5 Jahren Hartz IV oder Sozialhilfe bezogen hat, muss dies angeben. Dies kann zur Ablehnung führen (Ausnahmen möglich).</GoldNote>
      </div>

      <SectionTitle>Aufenthaltsrechtlicher Status</SectionTitle>
      <CB checked label="Aufenthaltserlaubnis" />
      <FieldRow>
        <Field label="Bezeichnung" example="§ 18 AufenthG — Arbeitsvisa" />
        <Field label="Gültig bis" example="31.12.2025" />
      </FieldRow>
      <GoldNote>Aktuellen Aufenthaltstitel eintragen. Antrag VOR Ablauf stellen!</GoldNote>

      <SectionTitle>Krankenversicherung</SectionTitle>
      <CB checked label="ja" />
      <FieldRow>
        <Field label="bei" example="TK – Techniker Krankenkasse" />
        <Field label="Gültig bis" example="unbefristet" />
      </FieldRow>

      <SectionTitle>Rentenversicherung</SectionTitle>
      <CB checked label="Ich habe mindestens 60 Monate Pflichtbeiträge zur Rentenversicherung geleistet." />
      <GoldNote>60 Monate = 5 Jahre Pflichtbeiträge. Rentenversicherungsverlauf von der DRV beifügen (kostenlos auf drv.de)! Bei Blue Card Inhabern: bereits nach 21 oder 33 Monaten möglich.</GoldNote>

      {/* SEITE 3 */}
      <PageBreak n={3} />
      <SectionTitle>Wohnraum der Familie</SectionTitle>
      <FieldRow cols={3}>
        <Field label="Wohnfläche" example="95 m²" />
        <Field label="Für Personen" example="4" />
        <div><CB checked label="Mietvertrag liegt bei." /></div>
      </FieldRow>
      <GoldNote>Mindestens 12 m² pro Person = 4 × 12 = 48 m² Minimum. Ihre Wohnung mit 95 m² erfüllt dies ✓</GoldNote>

      <SectionTitle>Integration — Sprachkenntnisse</SectionTitle>
      <CB checked label="Ich habe ausreichende Kenntnisse der deutschen Sprache." />
      <CB checked label="ja, das Zeugnis über einen Integrationskurs liegt bei." />
      <GoldNote>B1-Nachweis PFLICHT für Niederlassungserlaubnis! Integrationskurszeugnis (Zertifikat Deutsch B1) oder gleichwertiger Nachweis beifügen.</GoldNote>

      <SectionTitle>Grundkenntnisse Rechts-/Gesellschaftsordnung</SectionTitle>
      <CB checked label="ja, das Zeugnis über einen Integrationskurs (Orientierungskurs) liegt bei." />
      <GoldNote>Orientierungskurs-Zeugnis oder Einbürgerungstest-Bescheinigung beifügen.</GoldNote>

      <SectionTitle>Sozialhilfe / Unterhaltspflichten</SectionTitle>
      <CB checked label="nein — keine Leistungen nach SGB II/XII" />

      {/* SEITE 4 */}
      <PageBreak n={4} />

      {/* Checklist */}
      <div className="rounded-lg p-4 space-y-2" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <h4 className="text-sm font-bold" style={{ color: "#92400E" }}>Vollständigkeits-Checkliste für Niederlassungserlaubnis:</h4>
        <div className="space-y-1.5 text-[12px]" style={{ color: "#92400E" }}>
          <CB checked label="Rentenversicherungsverlauf (mind. 60 Monate) — von DRV" />
          <CB checked label="B1-Sprachzeugnis (Integrationskurs oder gleichwertig)" />
          <CB checked label="Gehaltsabrechnungen letzter 3 Monate" />
          <CB checked label="Aktueller Aufenthaltstitel (Kopie)" />
          <CB checked label="Alle bisherigen Aufenthaltstitel der letzten 5 Jahre" />
          <CB checked label="Mietvertrag / Wohnraumbestätigung" />
          <CB checked label="Meldebescheinigung (nicht älter als 3 Monate)" />
          <CB checked label="Finanzamt-Bestätigung: keine Steuerrückstände" />
          <CB checked label="2 digitale biometrische Lichtbilder" />
          <CB checked label="Antrag auf Daueraufenthalt-EU (AUFENTHG-014) — gleichzeitig!" />
        </div>
      </div>

      <SectionTitle>Rechtsverstöße</SectionTitle>
      <div className="space-y-2">
        <CB checked label="nein — Wurden Sie wegen Rechtsverstößen verurteilt?" />
        <CB checked label="nein — Wurden Sie ausgewiesen oder abgeschoben?" />
        <CB checked label="nein — Wurde ein Einreiseantrag abgelehnt?" />
        <CB checked label="nein — Wird gegen Sie ermittelt?" />
      </div>
      <GoldNote>Bei Vorstrafen: Auch getilgte Strafen nach § 53 BZRG sind anzugeben! Das Verschweigen ist strafbar.</GoldNote>

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

      {/* Download Hint */}
      <div className="rounded-lg p-4 mt-4 space-y-2" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <p className="text-[12px]" style={{ color: "#92400E" }}>
          Das offizielle Formular erhältst du bei deiner Ausländerbehörde.
        </p>
        <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/DauerhafterAufenthalt/dauerhafter-aufenthalt-node.html"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: "#C9A84C" }}>
          🔗 BAMF – Niederlassungserlaubnis
        </a>
      </div>
    </div>
  );
}
