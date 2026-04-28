import {
  SectionTitle,
  GoldNote,
  RedNote,
  Label,
  Example,
  FieldRow,
  Field,
  CB,
  PageBreak,
} from "./VisaFormPrimitives";

export default function VisaFamilyForm() {
  return (
    <div className="rounded-lg border p-8 max-w-[800px] mx-auto space-y-6" style={{ borderColor: "#D0C8B0", background: "white" }}>
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-extrabold">Antrag auf Erteilung einer Aufenthaltserlaubnis</h2>
        <p className="text-xs text-muted-foreground">gem. § 81 Abs. 1 Aufenthaltsgesetz (AufenthG)</p>
        <p className="text-xs text-muted-foreground">AUFENTHG-009-DE-FL – 10-2025</p>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mt-2 text-xs font-bold" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}>
          Ausgefüllt für: Familiennachzug §§ 27–36 AufenthG
        </div>
      </div>
      <RedNote>📸 Seit dem 01.05.2025 sind ausschließlich digitale biometrische Lichtbilder zulässig!</RedNote>

      <BlueNote>Dieses Formular wird vom NACHZIEHENDEN Familienmitglied ausgefüllt — also von der Person, die nach Deutschland kommt, nicht von der Person die bereits in Deutschland lebt.</BlueNote>

      {/* SEITE 1 */}
      <PageBreak n={1} />
      <SectionTitle>Antragsteller/in (nachziehendes Familienmitglied)</SectionTitle>
      <FieldRow>
        <Field label="Familienname, ggf. Geburtsname" example='Mustermann (geb. Musterfau)' />
        <Field label="Vorname(n) (Rufname in Großbuchstaben)" example="MARIA" />
      </FieldRow>
      <FieldRow cols={3}>
        <Field label="Geburtsdatum" example="15.05.1992" />
        <Field label="Geburtsort" example="Sarajevo, Bosnien und Herzegowina" />
        <Field label="Geburtsland" example="Bosnien und Herzegowina" />
      </FieldRow>
      <FieldRow>
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
        <div>
          <Label>Geschlecht</Label>
          <div className="flex gap-4 mt-1">
            <CB label="männlich" />
            <CB checked label="weiblich" />
          </div>
        </div>
      </FieldRow>
      <div>
        <Label>Familienstand</Label>
        <div className="flex flex-wrap gap-3 mt-1">
          <CB label="ledig" />
          <CB checked label="verheiratet" />
          <CB label="eingetragene Lebenspartnerschaft" />
          <CB label="geschieden" />
          <CB label="verwitwet" />
        </div>
        <div className="mt-1"><Example>verheiratet seit 12.06.2018</Example></div>
      </div>
      <GoldNote>Heiratsurkunde muss beglaubigt und übersetzt vorliegen! Ehe muss dem deutschen Recht entsprechen.</GoldNote>

      <FieldRow>
        <div>
          <Field label="derzeitiger Wohnsitz in Deutschland (Straße, PLZ, Ort)" example="Musterstraße 1, 80331 München" />
          <GoldNote>Adresse des Ehegatten in Deutschland — hier wird die Familie zusammen wohnen.</GoldNote>
        </div>
        <Field label="Ersteinreise am" example="20.05.2025" />
      </FieldRow>
      <FieldRow>
        <Field label="Telefon" example="+49 89 123456" />
        <Field label="E-Mail" example="maria.mustermann@email.de" />
      </FieldRow>
      <FieldRow>
        <Field label="Größe (cm)" example="168" />
        <Field label="Augenfarbe" example="braun" />
      </FieldRow>

      <SectionTitle>Aufenthalt im Ausland</SectionTitle>
      <div className="flex gap-4">
        <CB checked label="nein" />
        <CB label="ja" />
      </div>
      <Example>Kein längerer Auslandsaufenthalt seit Einreise.</Example>

      <SectionTitle>Familienangehörige — Ehegatte (in DE lebend)</SectionTitle>
      <FieldRow>
        <Field label="Familienname" example="Mustermann" />
        <Field label="Vorname" example="MAX" />
      </FieldRow>
      <FieldRow cols={3}>
        <Field label="Geburtsdatum" example="01.01.1990" />
        <Field label="Geburtsort" example="Sarajevo" />
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </FieldRow>
      <div>
        <Label>Aufenthaltsrechtlicher Status des Ehegatten in DE</Label>
        <div className="mt-1"><CB checked label="Aufenthaltserlaubnis — §18 AufenthG — gültig bis 31.12.2026" /></div>
      </div>
      <GoldNote>Hier den aktuellen Aufenthaltstitel des in Deutschland lebenden Ehegatten eintragen.</GoldNote>

      <SectionTitle>Kinder</SectionTitle>
      <p className="text-xs font-semibold text-muted-foreground mb-2">Kind 1:</p>
      <FieldRow>
        <Field label="Familienname" example="Mustermann" />
        <Field label="Vorname" example="LENA" />
      </FieldRow>
      <FieldRow cols={3}>
        <div><Label>Geschlecht</Label><div className="flex gap-3 mt-1"><CB label="männl." /><CB checked label="weibl." /></div></div>
        <Field label="Geburtsdatum" example="10.10.2018" />
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </FieldRow>
      <GoldNote>Kinder unter 16 Jahren benötigen KEINE Deutschkenntnisse!</GoldNote>

      <p className="text-xs font-semibold text-muted-foreground mb-2 mt-4">Kind 2:</p>
      <FieldRow>
        <Field label="Familienname" example="Mustermann" />
        <Field label="Vorname" example="TOM" />
      </FieldRow>
      <FieldRow cols={3}>
        <div><Label>Geschlecht</Label><div className="flex gap-3 mt-1"><CB checked label="männl." /><CB label="weibl." /></div></div>
        <Field label="Geburtsdatum" example="05.03.2021" />
        <Field label="Staatsangehörigkeit" example="bosnisch-herzegowinisch" />
      </FieldRow>

      {/* SEITE 2 */}
      <PageBreak n={2} />
      <SectionTitle>Lebensunterhalt</SectionTitle>
      <CB checked label="Einkommen des Ehegatten aus Erwerbstätigkeit" />
      <div className="ml-6 mt-2 space-y-2">
        <FieldRow>
          <Field label="Monatlicher Netto-Verdienst" example="2.800 €" />
          <Field label="bei/als" example="TechGmbH München / Softwareentwickler" />
        </FieldRow>
      </div>
      <GoldNote>Der Lebensunterhalt der gesamten nachziehenden Familie muss durch den in Deutschland lebenden Ehegatten gesichert sein. Faustregel: ca. 1.000–1.200 € netto pro Person im Haushalt.</GoldNote>

      <div className="mt-3">
        <Label>Beziehen Sie Leistungen nach SGB II/XII?</Label>
        <div className="flex gap-4 mt-1"><CB checked label="nein" /><CB label="ja" /></div>
      </div>

      <SectionTitle>Aufenthaltsrechtlicher Status</SectionTitle>
      <GoldNote>Diese Sektion bezieht sich auf den STATUS DER ANTRAGSTELLERIN (Maria), nicht des Ehegatten.</GoldNote>
      <div className="mt-2"><CB checked label="Aufenthaltserlaubnis — § 30 AufenthG — Ehegattennachzug — gültig bis 19.11.2025" /></div>

      <SectionTitle>Krankenversicherung</SectionTitle>
      <CB checked label='ja, bei: "TK – Techniker Krankenkasse"' />
      <GoldNote>Alle nachziehenden Familienmitglieder müssen krankenversichert sein!</GoldNote>

      {/* SEITE 3 */}
      <PageBreak n={3} />
      <SectionTitle>Wohnraum der Familie</SectionTitle>
      <FieldRow cols={3}>
        <Field label="Wohnfläche (m²)" example="80" />
        <Field label="für Personen" example="4" />
        <div><Label>Nachweis</Label><CB checked label="Mietvertrag liegt bei" /></div>
      </FieldRow>
      <GoldNote>Mindestens 12 m² Wohnfläche pro Person erforderlich. 4 Personen × 12 m² = 48 m² Minimum. Ihre Wohnung mit 80 m² erfüllt diese Anforderung ✓</GoldNote>

      <SectionTitle>Rentenversicherung</SectionTitle>
      <GoldNote>Für die erste Aufenthaltserlaubnis beim Familiennachzug ist die Rentenversicherung noch NICHT relevant. Wichtig wird sie erst für die Niederlassungserlaubnis nach 5 Jahren.</GoldNote>

      <SectionTitle>Integration — Sprachkenntnisse</SectionTitle>
      <CB checked label="Ich habe ausreichende Kenntnisse der deutschen Sprache." />
      <div className="mt-2"><CB checked label="ja, das Zeugnis über einen Integrationskurs liegt bei." /></div>
      <GoldNote>Hier das Goethe-Zertifikat A1 oder höher beifügen! Ohne A1-Nachweis wird die Aufenthaltserlaubnis zum Ehegattennachzug nicht erteilt (Ausnahmen beachten).</GoldNote>

      <SectionTitle>Unterhaltspflichten</SectionTitle>
      <CB checked label="nein" />

      {/* SEITE 4 */}
      <PageBreak n={4} />
      <SectionTitle>Rechtsverstöße</SectionTitle>
      <div className="space-y-2">
        <CB checked label="Wurden Sie wegen Rechtsverstößen verurteilt? — nein" />
        <CB checked label="Wurden Sie ausgewiesen oder abgeschoben? — nein" />
        <CB checked label="Wurde ein Einreiseantrag abgelehnt? — nein" />
        <CB checked label="Wird gegen Sie ermittelt? — nein" />
      </div>
      <GoldNote>Bei Vorstrafen unbedingt angeben — Verschweigen ist strafbar (§ 95 AufenthG)!</GoldNote>

      <SectionTitle>Unterschrift</SectionTitle>
      <FieldRow>
        <Field label="Ort" example="München" />
        <Field label="Datum" example={new Date().toLocaleDateString("de-DE")} />
      </FieldRow>
      <div className="border-b-2 border-dashed mt-4 mb-1" style={{ borderColor: "#C0C0C0" }} />
      <p className="text-[11px] text-muted-foreground text-center">Eigenhändige Unterschrift des Antragstellers / der Antragstellerin</p>
      <GoldNote>Unterschrift muss eigenhändig geleistet werden. Bei Kindern unter 18 Jahren unterschreibt der gesetzliche Vertreter.</GoldNote>

      <BlueNote>
        § 54 Abs. 2 Nr. 8, 10 und § 82 AufenthG — Hinweise zu Ausweisungsinteresse und Mitwirkungspflichten.
        § 86 AufenthG — Datenschutzhinweis.
      </BlueNote>

      {/* Download hint */}
      <div className="rounded-lg p-4 mt-4" style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}>
        <p className="text-xs" style={{ color: "#92400E" }}>
          Das offizielle Formular erhältst du bei deiner zuständigen Ausländerbehörde.
        </p>
        <div className="flex flex-col gap-1 mt-2">
          <a href="https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: "#C9A84C" }}>
            🔗 BAMF – Familiennachzug
          </a>
          <a href="https://digital.diplo.de/visa"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: "#C9A84C" }}>
            🔗 Termin buchen (digital.diplo.de)
          </a>
        </div>
      </div>
    </div>
  );
}
